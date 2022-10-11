<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useFormStore } from "@/store"
import { PhMicrophone, PhTrashSimple, PhPlay } from "@dnlsndr/vue-phosphor-icons";

const stream = ref<any>(); //@TODO we put the stream in pinia

const recorder = ref<MediaRecorder>();

const audioFile = ref<Blob>();
const audioFileURL = ref<string>();
const player = ref<HTMLAudioElement>();

//useForm --> piniaStore to save the content to from recordedChunks ref
const store = useFormStore();

const recordBtn = ref<HTMLElement>();

let recordingState = ref<String>(); //@todo enum

interface WaveCanvas extends HTMLCanvasElement{
  width: number;
  hight: number;
  bars: Array<Object>;
  analyser: AnalyserNode;
  frequencyArray: Float32Array;
}

// Reference to the canvas showing the wav
const canvas = ref<WaveCanvas>();
let width = ref<number>();
let height =ref<number>();


let now = ref<number>();

const interval =ref<number>();

// On mounted
onMounted(() => {

  navigator.mediaDevices.getUserMedia({
     audio: true,
     video: false
  })
  .then(
    soundAllowed
  )
  .catch(
    soundNotAllowed
  );
});

onUnmounted(() => {
  visualizeWaveStop();
});



const soundAllowed = (mediaStream: MediaStream) => {

  stream.value = mediaStream;
  visualizeWaveInit();  
}

const soundNotAllowed = () => {
  // @Todo
}


const visualizeWaveInit = () => {

  const audioContext = window.AudioContext;
  const audioContent = new audioContext();
  const streamSource = audioContent.createMediaStreamSource(stream.value );

  if (canvas.value != undefined) {
    width.value = 400; //@TODO: to be calculted dynamicly based on the viewport
    height.value = 100; 
    canvas.value.width = width.value * window.devicePixelRatio;
    canvas.value.height = height.value * window.devicePixelRatio;
    canvas.value.style.width = `${width.value}px`;
    canvas.value.style.height = `${height.value}px`;

    canvas.value.getContext( '2d' ).scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.value.bars = [];

    canvas.value.analyser = audioContent.createAnalyser();
    streamSource.connect(canvas.value.analyser);
    canvas.value.analyser.fftSize = 512;
    canvas.value.frequencyArray = new Float32Array(canvas.value.analyser.fftSize);

    now.value = parseInt(performance.now() / 32); // frequency
    }
  }

const visualizeWaveStart = () =>{

  //window.requestAnimationFrame(visualizeWaveLoop());

  interval.value = setInterval(
    () => {
      visualizeWaveLoop(); 
    }
    , 10
  );
}

const visualizeWaveLoop = (): FrameRequestCallback | any  => {
  
  if (canvas.value != undefined) {
    canvas.value.getContext( '2d' )?.clearRect(0, 0, canvas.value.width, canvas.value.height);
    let max = 0;

    if ( parseInt(performance.now() / 32)  > now.value) {
        now.value = parseInt(performance.now() / 32);


      canvas.value.analyser.getFloatTimeDomainData(canvas.value.frequencyArray);

      for (let i = 0; i< canvas.value.frequencyArray.length;  i++) {
        if(canvas.value.frequencyArray[i] > max) {
          max = canvas.value.frequencyArray[i];
        } 
      }    

      let freq = Math.floor(max * 1000);

      canvas.value.bars.push({
        x: 0,
        y: (height.value / 2) - (freq / 2),
        height: 10 + freq,
        width: 5
      });
    }
    visualizeWaveDraw();
  }

}


const visualizeWaveDraw = () => {

  for (let i=0; i< canvas.value.bars.length ; i++) {
    const bar = canvas.value.bars[i];
    canvas.value.getContext( '2d' ).fillStyle = `rgb(${bar.height * 2},0,0)`;
    canvas.value.getContext( '2d' ).fillRect(bar.x,bar.y,bar.width,bar.height);
    bar.x = bar.x + 2;
    
  }
}

const visualizeWaveStop = () => {
  clearInterval(interval.value);
}


//record function to sync the function value
const record = async () => {
  // Toggle start/stop recording
  if (recordingState.value === 'recording')
  {
    recordingState.value = 'stopped';
    recordBtn.value?.classList.remove('recording');
    canvas.value?.classList.add('player-mode');
    stop();
  } else {
    recordingState.value = 'recording';
    recordBtn.value?.classList.add('recording');
    canvas.value?.classList.remove('player-mode');
    
    let recordedChunks: Array<any> = [];

    try {

      const options = { mimeType: "audio/webm" };
      recorder.value = new MediaRecorder(stream.value, options);
      recorder.value.ondataavailable = (e: BlobEvent) => {

        recordedChunks.push(e.data);
        console.log("value of the recorder.value", recorder.value);
        store.setRecorder(recordedChunks);

        if (recorder.value.state === 'inactive') {
              audioFile.value = new Blob(recordedChunks);
              console.log("value of the newaudio", audioFile.value);
              audioFileURL.value = URL.createObjectURL(audioFile.value);
        }

      }


    } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`Audio error:  ${err}`);
        // eslint-disable-next-line no-console
        console.error('Audio error: ', err);
    }

    recorder.value.start();
    visualizeWaveStart();

  }
}

const stop = () => {
  store.setRecorder(recorder.value);
  recorder.value?.stop();

  visualizeWaveStop();

  // Redraw the bars.
  redrawBars();
}

const playAudio = async () => {
  if (player.value != undefined){ 

    let posX = 0;
    let duration = 0;
    let speed = 0;

    // Due to a chrome bug, https://bugs.chromium.org/p/chromium/issues/detail?id=642012
    // it is not possible to get the WebM duration unless it is played once.
    // Therefore the junk below:
    let c = 0;
    while(player.value.duration === Infinity && c < 10) {
      await new Promise(r => setTimeout(r, 10));
      player.value.play();
      c++;
    }
    duration = player.value?.duration;

    speed =  width.value / (duration * 100);
    
    // Audio player waveform represntaion.
    if (canvas.value != undefined) {
      let ctx = canvas.value.getContext( '2d' );
      ctx.strokeStyle = "Red";
      ctx.lineWidth = 5;

      const playbackLoop = (): FrameRequestCallback | any => {

        // Redraw the bars.
        redrawBars(posX);

        posX += speed;
        if (posX < 0 || posX > width.value) {
          speed = 0;
          clearInterval(interval);
        }

        ctx.beginPath();
        ctx.moveTo(posX, 0);
        ctx.lineTo(posX, 100);
        ctx.stroke();
      }

      let interval = setInterval(
         () =>{playbackLoop()}
        , 10
      );

    }

    player.value.play();

    // Send to server.
    upload();
  } 

}

const redrawBars = (posX: number | null = null) => {
  let ctx = canvas.value.getContext( '2d' );
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    for (let i=0; i< canvas.value.bars.length ; i++) {
      const bar = canvas.value.bars[i];

      // Calculate the bar position and width based on the number of bars.        
      let w =  width.value / canvas.value.bars.length - 2; // -2 for some space between the bars. @Todo: Should be dynamic base on the duration.
      let x = i * (width.value / canvas.value.bars.length);

      if (posX != null && x < posX) {
        ctx.fillStyle = `rgb(${bar.height * 2},0,0)`;
      } else {
        ctx.fillStyle = `rgb(0,0,0)`;
      }

      ctx.fillRect(x,
                   bar.y,
                   w,
                   bar.height
      ); 
    }
}

const deleteAudio = () => {
  recordingState.value = 'idle';
  audioFile.value = null;
  audioFileURL.value = null;
  visualizeWaveInit(); // dump the previous waveform
}

const upload = async () => {
  let formData = new FormData(); 
  formData.append("uploaded_file", audioFile.value, "myfile.webm");
    await fetch('http://localhost:8080/upload', {
    method: "POST", 
    body: formData
  }); 
  return true;
}



</script>


<template>

  <div class="wav-container" >
    <transition-group  name="widgets" appear>

      <button
        v-if="recordingState != 'stopped'"
        ref="recordBtn"
        key="recordBtn"
        class="btn record-btn"
        @click="record()"
      >
        <ph-microphone size="69%" color="white" weight="fill" />
      </button>

      <button
        v-if="audioFileURL"
        class="btn play-btn"
        @click="playAudio()"
      >
        <ph-play size="69%" color="white" weight="fill" />
      </button>

      <canvas
      key="canvas"
      v-show="recordingState != 'idle' && recordingState != null"
      ref="canvas"
      class="wave-canvas"
      />

      <button
        v-if="audioFileURL"
        class="btn delete-btn"
        @click="deleteAudio()"
      >
        <ph-trash-simple size="69%" color="#ff2038" weight="fill" />
      </button>

    </transition-group>
  </div>


  <div className="box" style="box"  v-if="audioFileURL">
    <audio
      ref="player"
      :src="audioFileURL"
      controls
      controlsList="nodownload"
      v-show = "false"
    />



  </div>

</template>


<style scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
}

body {
  background: #111;
  overflow: hidden;
}

.wav-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.wave-canvas {
  width: 100%;
  height: 100%;
}

.wave-canvas.player-mode{
  margin: 10px;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  border-top-left-radius: 100px;
  box-shadow: rgb(0 0 0 / 30%) 0px 5px 5px 1px inset, rgb(255 255 255) 0px 0px 0px 0px, rgb(51 51 51) 0px 0px 0px 2px;
}

.widgets-enter-from{
  opacity: 0;
  transform: scale(0.6);
}
.widgets-enter-to{
  opacity: 1;
  transform: scale(1);
}
.widgets-enter-active{
  transition: all 0.3s ease;
}
.widgets-leave-from{
  opacity: 1;
  transform: scale(1);
}
.widgets-leave-to{
  opacity: 0;
  transform: scale(0.6);
}
.widgets-leave-active{
  transition: all 0.3s ease;
}
.widgets-move{
  transition: all 0.3s ease;
}

.btn{
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.record-btn{
  background-color: #05A6B5;
  background-image: linear-gradient(to bottom, #e430bd, #b461df, #7b7dee, #3d8eeb, #0099da, #00a6d3, #00afc2, #00b7ad, #3bc696, #78d173, #b6d74e, #fad532);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 5px 5px 2px rgb(0 0 0 / 30%) inset, 0px 0px 0px 0px #fff, 0px 0px 0px 5px #333;
}
.record-btn:hover {
  background-color:  #e430bd;
  background-image: linear-gradient(to top, #e430bd, #b461df, #7b7dee, #3d8eeb, #0099da, #00a6d3, #00afc2, #00b7ad, #3bc696, #78d173, #b6d74e, #fad532);
}
.record-btn.recording {
  background-color: #ff2038;
  background-image: linear-gradient(0deg, #ff2038 0%, #b30003 100%);
}

.delete-btn{
  background-color: #333;
  width: 69px;
  height: 69px;
  box-shadow: 0px 5px 5px 1px rgb(0 0 0 / 30%) inset, 0px 0px 0px 0px #fff, 0px 0px 0px 2px #333;
}
.delete-btn:hover{
  background-color:  #777;
}

.play-btn{
  background-color: #00b7ad;
  width: 69px;
  height: 69px;
  box-shadow: 0px 5px 5px 1px rgb(0 0 0 / 30%) inset, 0px 0px 0px 0px #fff, 0px 0px 0px 2px #333;
}
.play-btn:hover{
  background-color:  #0c5550;
}
</style>
