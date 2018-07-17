<template>
  <div class="spotify">
    <Tracks msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tracks from '@/components/Tracks.vue'

export default {
  name: 'spotify',
  components: {
    Tracks
  }
}
</script>
