<template>
  <div>
    <h5>Record Audio</h5>
    <button v-if="!recorder" @click="record()">Record Voice</button>
    <button v-else @click="stop()">Stop</button>
    <br />
    <div className="box" style="box" v-for="(recordedChunk, index) in 3">
      <audio
        v-if="newAudio"
        :src="newAudioURL"
        controls
        controlsList="nodownload"
      />
      <button @click="deleteEvents(0)">Delete</button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useFormStore } from "../stores/formStore"

const newAudio = ref(null as null | MediaSource | Blob)
const recorder = ref(null as null | MediaRecorder)

const store = useFormStore()
const newAudioURL = computed(() => {
  if (newAudio.value !== null) {
    return URL.createObjectURL(newAudio.value)
  }
  return undefined
})

const record = async () => {
  newAudio.value = null
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })

  const options = { mimeType: "audio/webm" }
  const recordedChunks = [] as Array<any>
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

  console.log("recorded chunks length", recordedChunks.length)

  recorder.value.addEventListener("stop", () => {
    newAudio.value = new Blob(recordedChunks)
    console.log("value of the newaudio", newAudio.value)
  })

  recorder.value.start()
}
const stop = async () => {
  store.setRecorder(recorder.value)
  recorder.value?.stop()
  recorder.value = null
}

const deleteEvents = async (index) => {
  console.log("deletingEventTriggered")
  await store.filterRecorder(index)
}
</script>

<style>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
}
</style>
