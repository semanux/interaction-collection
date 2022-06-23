<template>

  <div>
    <h5>Record Audio</h5>
    <button
      v-if="!recorder"
      @click="record()"
    >
      Record Voice
    </button>

    <button
      v-else
      @click="stop()"
    >
      Stop
    </button>

    <br />

    <audio
      v-if="newAudio"
      :src="newAudioURL"
      controls
      controlsList="nodownload"
    />

    <hr />

  </div>

</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const newAudio = ref(null as null | MediaSource | Blob);
const recorder = ref(null as null | MediaRecorder);

const newAudioURL = computed(() => {
  if(newAudio.value !== null) {
    return URL.createObjectURL(newAudio.value);
  }
  return undefined;
});

const record = async () => {
  newAudio.value = null;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  const options = { mimeType: "audio/webm" };
  const recordedChunks = [] as Array<any>;
  recorder.value = new MediaRecorder(stream, options);

  recorder.value.addEventListener("dataavailable", (e: BlobEvent) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  })

  recorder.value.addEventListener("stop", () => {
    newAudio.value = new Blob(recordedChunks);
    console.log(newAudio);
  })

  recorder.value.start();

}
const stop = async () => {
  recorder.value?.stop();
  recorder.value = null;
}

</script>