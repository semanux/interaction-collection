<template>

  <div>
    <h5>Record Audio</h5>
    <button
      v-if="!recorder"
      @click="record()"
      class="button is-info"
    >Record Voice</button>

    <button
      v-else
      @click="stop()"
      class="button is-danger"
    >Stop</button>

    <br />

    <audio
      v-if="newAudio"
      :src="newAudioURL"
      controls
    ></audio>

    <hr />

  </div>

</template>

<script setup lang="ts">
import { ref } from "vue"
const newMessageText = ref('')
const loading = ref(false)
const messages =ref([])
const newAudio = ref(null as null || MediaSource || Blob) 
const recorder = ref(null as null || MediaRecorder)

const newAudioURL = () => {
  return URL.createObjectURL(newAudio.value)
}

const record = async () => {
  newAudio.value = null
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })

  const options = { mimeType: "audio/webm" }
  const recordedChunks = [] as Array<any>
  recorder.value = new MediaRecorder(stream, options)

  recorder.value.addEventListener("dataavailable", (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data)
    }
  })

  recorder.value.addEventListener("stop", () => {
    newAudio = new Blob(recordedChunks)
    console.log(newAudio)
  })

  recorder.value.start()
}
const stop = async () => {
  recorder.value.stop()
  recorder.value = null
}
</script>
