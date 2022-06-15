<template>

  <!-- omitted... -->
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

<script>
export default {
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null
    }
  },
  computed: {
    // omitted...

    newAudioURL() {
      return URL.createObjectURL(this.newAudio)
    }
  },
  methods: {
    async record() {
      this.newAudio = null

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })

      const options = { mimeType: "audio/webm" }
      const recordedChunks = []
      this.recorder = new MediaRecorder(stream, options)

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data)
        }
      })

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks)
        console.log(this.newAudio)
      })

      this.recorder.start()
    },
    async stop() {
      this.recorder.stop()
      this.recorder = null
    }
  }
}
</script>
