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

<script setup>
var newMessageText = ""
var loading = false
var messages = []
var newAudio = null
var recorder = null

const newAudioURL = () => {
  return URL.createObjectURL(newAudio)
}

const record = async () => {
  newAudio = null
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })

  const options = { mimeType: "audio/webm" }
  const recordedChunks = []
  recorder = new MediaRecorder(stream, options)

  recorder.addEventListener("dataavailable", (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data)
    }
  })

  recorder.addEventListener("stop", () => {
    newAudio = new Blob(recordedChunks)
    console.log(newAudio)
  })

  recorder.start()
}
const stop = async () => {
  recorder.stop()
  recorder = null
}
</script>
