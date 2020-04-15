<template>
  <div class="wrapper">
    <div class="infinite-list" v-infinite-scroll="loadImage" style="overflow:auto;height: 900px">
      <div id="image_block" class="infinite-list-item" v-for="each_image of image_list"
                              :key=each_image.id 
                              @click="handleImageClick(each_image.url)"
                              >          
        <img :src="each_image.url" alt="no" width="300px" height="160px">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImageBed',
  props: {
    
  },
  data() {
    return {
      image_list: [],
      cur_index: 0,
      page_size: 25,//每页25个
    }
  },
  mounted() {
    var formdata = new FormData();
    formdata.append('start', 0);
    formdata.append("limit", this.page_size);
    axios.post("/api/search_image", formdata)
              .then(this.handleUploadSucc);
  },
  methods: {
    loadImage() {
      console.log("hello");
      this.cur_index += this.page_size;
      var formdata = new FormData();
      formdata.append('start', this.cur_index);
      formdata.append("limit", this.page_size);
      axios.post("/api/search_image", formdata)
                .then(this.handleUploadSucc)
    },
    handleUploadSucc(res) {
      // console.log(res)
      for(var d = 0; d < res.data.length; d ++) {
        this.image_list.push(res.data[d]);
      }
    },
    handleImageClick(url) {
      // let routeData = this.$router.resolve({ path: url});
      // window.open(routeData.href, '_blank');
      window.location.href = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .wrapper {
  height: 900px;
  width: 100%;
  border: 1px solid red;

} */
#image_block {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  border: 1px solid grey;
}
#image_block:hover {
    background-color: #eaeaea;
  }
</style>
