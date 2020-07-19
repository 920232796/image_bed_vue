<template>
  <div class="index">
    <el-col :span="3">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="select"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">图片</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">文件</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">其他</span>
      </el-menu-item>
    </el-menu>
    </el-col>
  <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Upload from '@/components/Upload.vue'
// import ImageBed from "@/components/ImageBed.vue"

export default {
  name: 'Index',
  components: {
      
  },
  created() {
      this.$router.push("/Image");
  },
  methods: {
      select(index) {
        //   console.log(index)
          if (index == 1) {
              console.log(1);
              this.$router.push("/Image")
          } else {
              console.log(2);
              this.$router.push("/BigFile")
          }
      }
  }
}
</script>
