<template>
  <div class="wrap">
  <uploader
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    ref="uploader"
    :options="options"
    :file-status-text="statusText"
    :processParams="processParams"
  
    @file-success="onFileSuccess"
    class="uploader-example"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>请将文件拖拽到这里，或者</p>
      <uploader-btn>请选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
    <!-- <el-dialog
      title="提示"
      :visible.sync="upload_diglog"
      width="30%"
      :before-close="handleClose">
      <span>正在上传分块，请稍等。。。。</span>
    </el-dialog> -->
  </uploader>
  <el-progress class="progress" :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
    <div class="file_list_title">文件列表：</div>
    <div class="infinite-list" v-infinite-scroll="loadImage" style="overflow:auto;height: 900px">
      <div id="image_block" class="infinite-list-item" v-for="each_image of file_list"
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
  data () {
    return {
      page_size: 25, 
      percentage: 0,
      cur_index: 0,
      file_list: [],
      processParams(params) {//每一次分片传给后台的参数，params是该方法返回的形参，包含分片信息
          return {//返回一个对象，会添加到每一个分片的请求参数里面
            name: params.filename,
            code: params.identifier,
            totalChunks: params.totalChunks,
            chunkNumber: params.chunkNumber,
            currentChunkSize: params.currentChunkSize,
            file: params.file,
          };
        },
      // upload_diglog: false,
      loading: false,
      options: {
        target: '/api/upload_bigfile',   //上传地址
        chunkSize: 2 * 1024 * 1024,               //分片大小
        testChunks: false, // 是否开启服务器分片校验(秒传)
        maxChunkRetries: 3,  //最大自动失败重试上传次数
        checkChunkUploadedByResponse: function (chunk, message) {// 服务器分片校验，断点续传基础
            let objMessage = JSON.parse(message);
            if (objMessage.skipUpload) {
                return true;
            }
            return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
        },
        // headers: {
        //     Authorization: "Bearer " + "your accessToken"
        // },
      },
      statusText: {                       //对应的状态说明
        success: '上传成功',
        error: '上传出错了',
        uploading: '正在上传',
        paused: '暂停中',
        waiting: '等待中'
      }
    }
  },
  methods: {
    handleImageClick(url) {
      // let routeData = this.$router.resolve({ path: url});
      // window.open(routeData.href, '_blank');
      window.location.href = url
    },

    loadImage() {

      this.cur_index += this.page_size;
      var formdata = new FormData();
      formdata.append('start', this.cur_index);
      formdata.append("limit", this.page_size);
      formdata.append("file_class", "2")
      axios.post("/api/search_image", formdata)
                .then(this.handleUploadSucc)
    },
    handleUploadSucc(res) {
      // console.log(res)
      // this.file_list = []
      for(var d = 0; d < res.data.length; d ++) {
        this.file_list.push(res.data[d]);
      }
    },
   
    fileProgress(rootFile, file, chunk) {
    console.log(chunk)
    this.uploadProgress = Math.floor(this.uploader.progress() * 100)
    console.log('progress: '  + this.uploadProgress)
    },
    onFileSuccess(rootFile, file, message, chunk) { 
          //所有分片上传成功，发送合并分片请求，具体参数与后台确定，后台合并文件
          console.log("分块上传完成，开始合并～")
          console.log(message)
          this.loading = true;
          message = eval("(" + message + ")")

          this.ws = new WebSocket('ws://127.0.0.1:9090/api/merge_file')
          // 连接打开时触发
          this.ws.onopen = () => {  
            console.log("Connection open ...") 
            //把消息发过去
            let msg = {
              "TrueName": message.TrueName,
              "FileClass": message.FileClass,
              "Identifier": message.Identifier,
            }
            this.ws.send(JSON.stringify(msg));
          }
          // 接收到消息时触发  
          this.ws.onmessage = (evt) => { 
            console.log(evt) 
            // this.msgList.push(evt.data) 
            //接收进度条 信息
            let json_data = JSON.parse(evt.data);
            this.percentage = parseInt(json_data.percent)
            if (parseInt(json_data.percent) == 100) {
              // 说明上传完成了～
              this.loading = false;
              this.percentage = 0
              this.open();
              this.ws.close();
              this.file_list = [];
              var formdata = new FormData();
              formdata.append('start', 0);
              formdata.append("limit", this.page_size);
              formdata.append("file_class", "2")
              axios.post("/api/search_image", formdata)
                        .then(this.handleUploadSucc);
            }
          } 
          this.ws.onclose = () => {
            console.log('Connection close !!!')
          }
    },
    open() {
      this.$alert('上传成功～', '通知', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }, 
  mounted() {
    var formdata = new FormData();
    formdata.append('start', 0);
    formdata.append("limit", this.page_size);
    formdata.append("file_class", "2")
    axios.post("/api/search_image", formdata)
              .then(this.handleUploadSucc);


  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.uploader {
    /* border: 1px solid red; */
    float: left;
    /* margin-left: 20px; */
}
.wrap {
  border: 0.1px solid grey;
  width: 800px;
  float: left;
}
.progress {
  /* margin-top: 100px; */
  width: 300px;
  height: 300px;
  float: right;
}
#image_block {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  border: 1px solid grey;
}
#image_block:hover {
    background-color: #eaeaea;
}
.infinite-list {
  /* border: 1px solid red; */
  height: 800px;
  width: 500px;
  float: left;
}
.file_list_title {
  /* border: 1px solid red; */
  height: 30px;
  width: 500px;
  float: left;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
}
</style>
