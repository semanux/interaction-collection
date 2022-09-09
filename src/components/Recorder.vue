<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useFormStore } from "@/store"
import { PhMicrophone, PhTrashSimple } from "@dnlsndr/vue-phosphor-icons";

const stream = ref<any>();

//newAudio and Recorder  ref (with mediaSource + null + blob)
const newAudio = ref<Blob | MediaSource>();
const recorder = ref<MediaRecorder>();

const audioFile = ref<Blob | MediaSource>();
const audioFileURL = ref<string>();

//useForm --> piniaStore to save the content to from recordedChunks ref
const store = useFormStore();

const recordbtn = ref<HTMLElement>();

let recordingState = ref(null);

const showRecorder = computed(() => {
  if (recordingState.value !== null) {
    if (recordingState.value != 'stopped'){
      return true;
    } else {
      return false;
    }
  }
  return true;
});

// Reference to the canvas showing the wav
const canvas = ref<HTMLElement>();
let width = ref(0);
let height = ref(0);


let now = ref(0);

const interval = ref(0); 

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

  if (canvas.value != null) {
    width.value = 400; //@TODO: to be calculted dynamicly based on the viewport
    height.value = 100; 
    canvas.value.width = width.value * window.devicePixelRatio;
    canvas.value.height = height.value * window.devicePixelRatio;
    canvas.value.style.width = width.value  + 'px';
    canvas.value.style.height = height.value  + 'px';

    canvas.value.getContext( '2d' ).scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.value.bars = [];

    canvas.value.analyser = audioContent.createAnalyser();
    streamSource.connect(canvas.value.analyser);
    canvas.value.analyser.fftSize = 512;
    canvas.value.frequencyArray = new Float32Array(canvas.value.analyser.fftSize);

    now.value = parseInt(performance.now() / 50);
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
//console.log("arr", obj.frequencyArray)
canvas.value.getContext( '2d' ).clearRect(0, 0, canvas.value.width, canvas.value.height);
let max = 0;

if ( parseInt(performance.now() / 50)  > now.value) {
    now.value = parseInt(performance.now() / 50);


    canvas.value.analyser.getFloatTimeDomainData(canvas.value.frequencyArray);

    for (let i = 0; i< canvas.value.frequencyArray.length;  i++) {
      if(canvas.value.frequencyArray[i] > max) {
        max = canvas.value.frequencyArray[i];
      } 
    }    

    var freq = Math.floor(max * 1000);

    canvas.value.bars.push({
      x: width.value,
      y: (height.value / 2) - (freq / 2),
      height: freq,
      width: 5
    });
  }
  visualizeWaveDraw();

}


const visualizeWaveDraw = () => {

  for (let i=0; i< canvas.value.bars.length ; i++) {
    const bar = canvas.value.bars[i];
    canvas.value.getContext( '2d' ).fillStyle = `rgb(${bar.height * 2},0,0)`; //@TODO: perhaps we can use semanux colors to represent the wav.
    canvas.value.getContext( '2d' ).fillRect(bar.x,bar.y,bar.width,bar.height);
    bar.x = bar.x - 2;
    
    if (bar.x < 1) {
      canvas.value.bars.splice(i,1)
    }
    
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
    recordbtn.value.classList.remove('recording');
    stop();
  } else {
    recordingState.value = 'recording';
    recordbtn.value.classList.add('recording');

    let recordedChunks: Array<any> = [];


    try {
      newAudio.value = new Blob(recordedChunks);;

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

}

const deleteAudio = () => {
  recordingState.value = 'idle';
  console.log(showRecorder.value) ;
  audioFile.value = null;
  audioFileURL.value = null;

}


</script>


<template>

  <div id="wav-container" >
    <transition-group name="widgets" appear>
      <canvas
      key="canvas"
      v-show="recordingState == 'recording'"
      ref="canvas"
      id="canvas"
      />

      <button
        ref="recordbtn"
        v-if="showRecorder"
        key="recordbtn"
        id="record-btn"
        class="btn"
        @click="record()"
      >
        <PhMicrophone :size="64" color="white" weight="fill" />
      </button>
    </transition-group>
  </div>


  <div className="box" style="box"  v-if="audioFileURL">
    <audio

      :src="audioFileURL"
      controls
      controlsList="nodownload"
    />

    <button id="delete-btn" class="btn" @click="deleteAudio()">
      <PhTrashSimple :size="32" color="#ff2038" weight="fill" />
    </button>
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

#wav-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#canvas {
  width: 100%;
  height: 100%;
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

#record-btn{
  background-color: #05A6B5;
  background-image: linear-gradient(to bottom, #e430bd, #b461df, #7b7dee, #3d8eeb, #0099da, #00a6d3, #00afc2, #00b7ad, #3bc696, #78d173, #b6d74e, #fad532);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 5px 5px 2px rgb(0 0 0 / 30%) inset, 0px 0px 0px 0px #fff, 0px 0px 0px 5px #333;
}
#record-btn:hover {
    background-color:  #e430bd;
    background-image: linear-gradient(to top, #e430bd, #b461df, #7b7dee, #3d8eeb, #0099da, #00a6d3, #00afc2, #00b7ad, #3bc696, #78d173, #b6d74e, #fad532);
}
#record-btn.recording {
    background-color: #ff2038;
    background-image: linear-gradient(0deg, #ff2038 0%, #b30003 100%);
}

#delete-btn{
  background-color: #333;
  width: 60px;
  height: 60px;
  box-shadow: 0px 5px 5px 1px rgb(0 0 0 / 30%) inset, 0px 0px 0px 0px #fff, 0px 0px 0px 2px #333;
}
#delete-btn:hover{
  background-color:  #777;
}
</style>
