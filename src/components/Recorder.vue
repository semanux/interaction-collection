<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useFormStore } from "@/store"
import { PhMicrophone } from "@dnlsndr/vue-phosphor-icons";


//newAudio and Recorder  ref (with mediaSource + null + blob)
const newAudio = ref(null as null | MediaSource | Blob);
const recorder = ref(null as null | MediaRecorder);
const recordedChunks = [] as Array<any>;

//useForm --> piniaStore to save the content to from recordedChunks ref
const store = useFormStore();
const newAudioURL = computed(() => {
  if (newAudio.value !== null) {
    return URL.createObjectURL(newAudio.value)
  }
  return undefined
});

const recordbtn = ref(null as HTMLElement | null);

// Reference to the canvas showing the wav
const canvas = ref(null as HTMLElement | null);
let width = ref(0);
let height = ref(0);
let analyser = ref(null as AnalyserNode | null);
let frequencyArray = ref(null as Float32Array | null);
//let bars = ref(null as Array<any> | null);

let now = ref(0);

// On mounted
onMounted(() => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(soundAllowed).catch(soundNotAllowed)
});



const soundAllowed = (stream: MediaStream) => {

  visualizeWaveInit(stream);
  visualizeWaveLoop();
  //window.requestAnimationFrame(visualizeWaveLoop());

  setInterval(
    () => {
      visualizeWaveLoop(); 
    }
    , 10
    );
  }

const soundNotAllowed = () => {
  // @Todo
}


const visualizeWaveInit = (stream: MediaStream) => {

  const audioContext = window.AudioContext;
  const audioContent = new audioContext();
  const streamSource = audioContent.createMediaStreamSource(stream);

  console.log('canvas is,', canvas);
  //obj.canvas = document.getElementById( 'canvas' );
  // obj.ctx = canvas.value.getContext( '2d' );
  width.value = window.innerWidth * 0.4;
  height.value = window.innerHeight * 0.4;
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

    var freq = Math.floor(max * 650);

    canvas.value.bars.push({
      x: width.value,
      y: (height.value / 2) - (freq / 2),
      height: freq,
      width: 5
    });
  }
  draw();

}


const draw = () => {

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

//record function to sync the function value
const record = async () => {

  if (recordbtn.value.classList.contains('recording'))
  {
    recordbtn.value.classList.remove('recording');
    stop();
  } else {
    recordbtn.value.classList.add('recording');

    newAudio.value = null
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })

    const options = { mimeType: "audio/webm" }
    recorder.value = new MediaRecorder(stream, options)
    recorder.value.addEventListener("dataavailable", (e: BlobEvent) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data)
        //ISSUE
        console.log("value of the recorder.value", recorder.value)
        // store.setRecorder(recorder.value)
        // store.setRecorder(e.data)
        console.log("recorded chunks length", recordedChunks.length)
        store.setRecorder(recordedChunks)
      }
    })

    console.log("recorded chunks length", recordedChunks.length);
    recorder.value.start();
  }


}
const stop = () => {
  newAudio.value = new Blob(recordedChunks)
  console.log("value of the newaudio", newAudio.value)
  store.setRecorder(recorder.value)
  recorder.value?.stop()
  recorder.value = null
}

const deleteEvents = async (index) => {
  console.log("deletingEventTriggered")
  await store.filterRecorder(index)
}


</script>


<template>

    <button ref="recordbtn" id="record-btn" @click="record()">
      <PhMicrophone :size="64" color="white" weight="fill" />
    </button>

    <br />

    <div id="wav-container">
      <canvas
       ref="canvas"
       id="canvas"
      />
    </div>


    <div className="box" style="box" v-for="(recordedChunk, index) in 1">
      <audio
        v-if="newAudio"
        :src="newAudioURL"
        controls
        controlsList="nodownload"
      />

      <button @click="deleteEvents(0)">Delete</button>
    </div>
    <hr />

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


#canvas {
  width: 100%;
  height: 100%;
  margin: auto;

}

#record-btn{
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
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
</style>
