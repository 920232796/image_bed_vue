<template>
  <div class="wrapper">
       <div class="upload">
    <el-upload
        class="upload-demo"
        :action="uploadImage"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleFileSucc"
        :file-list="fileList"
        :on-progress="updateProgress"
        :on-error="handleFileErr"
        list-type="picture">
        <el-button type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
        <div slot="tip" class="el-upload__tip">上传文件使用。</div>
    </el-upload>
        </div>
    <div class="infinite-list" v-infinite-scroll="loadImage" style="overflow:auto;height: 900px">
      <div id="image_block" class="infinite-list-item" v-for="each_image of image_list"
                              :key=each_image.id 
                              @click="handleImageClick(each_image.url)"
                              >          
        <div>{{each_image.true_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BigFile',
  props: {
    
  },
  data() {
    return {
      image_list: [],
      cur_index: 0,
      page_size: 25,//每页25个
      uploadImage: "/api/upload_image",
      fileList: [],
      fileArr: [],
    }
  },
  mounted() {
    var formdata = new FormData();
    formdata.append('start', 0);
    formdata.append("limit", this.page_size);
    formdata.append("file_class", "1")
    axios.post("/api/search_image", formdata)
              .then(this.handleUploadSucc);
  },
  methods: {
    updateProgress(event, file, fileList) {
      this.fileArr = fileList
      this.fileArr.forEach(item=>{
          if (item.percentage == 100) {

          } else {
            item.progressFlag = true
            item.progressPercent = Math.abs(item.percentage.toFixed(0));
          }
      })
    },
    loadImage() {
      console.log("hello");
      this.cur_index += this.page_size;
      var formdata = new FormData();
      formdata.append('start', this.cur_index);
      formdata.append("limit", this.page_size);
      formdata.append("file_class", "1")
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
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleFileSucc (response, file, fileList) {// 上传成功后返回这个函数 这个可以写个dialog 对话框 让别人知道已经导入成功！！
      
      console.log("hello success!")
      },
      handleFileErr(response, file, fileList) {
        console.log("err !");
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
