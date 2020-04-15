<template>
  <div class="home">
    <Upload/>
    <ImageBed/> 
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue'
import ImageBed from "@/components/ImageBed.vue"

export default {
  name: 'Home',
  components: {
    Upload,
    ImageBed
  }
}
</script>
