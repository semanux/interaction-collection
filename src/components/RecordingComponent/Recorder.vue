<script setup lang="ts">
import { onMounted } from "@vue/runtime-core"

const firstScript = () => {
  let recaptchaScript = document.createElement("script")
  recaptchaScript.setAttribute(
    "src",
    "https://code.jquery.com/jquery-2.2.0.min.js"
  )
  document.head.appendChild(recaptchaScript)
}

// <script src="https://code.jquery.com/jquery-2.2.0.min.js">
</script>
  //   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  //   <script src="record.js"></script>
</script>

<template>
  <div>
    <h1> MediaRecorder API example</h1>

    <p> For now it is supported only in Firefox(v25+) and Chrome(v47+)</p>
    <div id='gUMArea'>
      <div>
        Record:
        <input
          type="radio"
          name="media"
          value="video"
          checked
          id='mediaVideo'
        >Video
        <input
          type="radio"
          name="media"
          value="audio"
        >audio
      </div>
      <button
        class="btn btn-default"
        id='gUMbtn'
      >Request Stream</button>
    </div>
    <div id='btns'>
      <button
        class="btn btn-default"
        id='start'
      >Start</button>
      <button
        class="btn btn-default"
        id='stop'
      >Stop</button>
    </div>
    <div>
      <ul
        class="list-unstyled"
        id='ul'
      ></ul>
    </div>
  
  </div>
</template>