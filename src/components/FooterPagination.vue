<template>
      <a-pagination class="pagination" :current="currentPage" :total="pageCount" @change="selectPage"/>  
</template>

<script>
    export default {
      props:{
        pageCount:{
          type:Number
          
          },       //页面总数
        currentPage:Number     //默认打开页数
      },
      methods: {
        selectPage(page) {
          let pageNum = page
           // 通知父组件绑定的自定义事件close执行(事件名: closeTip)
          this.$emit('selectPage',pageNum)
        }
      },     
    }
</script>

<style lang="scss" scoped>
    .pagination {
      padding-top: 4%;
      box-sizing: border-box;
      position: absolute;
      right: 0%;
    }
</style>