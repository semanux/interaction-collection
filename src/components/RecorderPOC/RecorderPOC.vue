<template>
  <!-- Voice Record Title + Button -->
  <div class="form-group row">
    <label
      for="Audio"
      class="col-2 col-form-label labelTop"
    >Audio</label>
    <div class="col-1">
      <button
        @click="recordAudio()"
        type="button"
        id="button_record"
        class="btn btn-danger"
      >
        Record
      </button>
      <button
        type="button"
        id="button_stop"
        class="btn btn-success"
      >
        Stop
      </button>
      <div
        id="audio"
        class="audio"
        controls
      >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recorder: null
    }
  },
  methods: {
    recordAudio() {
      var device = navigator.mediaDevices.getUserMedia({ audio: true })
      device.then((stream) => {
        // use this!
        this.recorder = new MediaRecorder(stream)
        this.recorder.ondataavailable = (e) => {
          // ....
        }
      })
    },
    // called on button click
    stop() {
      this.recorder.stop()
    }
  }
}
</script>