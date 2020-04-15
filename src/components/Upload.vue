<template>
  <div class="upload">
    <el-upload
        class="upload-demo"
        :action="uploadImage"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleFileSucc"
        :file-list="fileList"
        list-type="picture">
        <el-button type="primary">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
        <div slot="tip" class="el-upload__tip">图床系统，只可以上传图片文件</div>
    </el-upload>
    
  </div>
</template>

<script>
export default {
    name: 'Upload',
    data() {
      return {
          uploadImage: "/api/upload_image",
          fileList: []
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleFileSucc (response, file, fileList) {// 上传成功后返回这个函数 这个可以写个dialog 对话框 让别人知道已经导入成功！！
          
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload {
    /* width: 100%;
    margin: 0 auto; */
    text-align: center;
}

</style>
