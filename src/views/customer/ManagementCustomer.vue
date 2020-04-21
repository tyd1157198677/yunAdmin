<template>
  <div class="Customer">
    <div class="header_nav">
      <span :class='["user_list",current=="0" ? "selectStyle" : ""]' @click="jumpRouter({name:'userList'},'0')">用户列表</span>
      <span :class='["black_list",current=="1" ? "selectStyle" : ""]' @click="jumpRouter({name:'blackList'},'1')">黑名单列表</span>
    </div>
    <div class="footer">
        <router-view/>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        current:'0'
      }
    },
    methods: {
        jumpRouter(routeObj,current) {
          this.current = current
            this.$router.push(routeObj)
        }
    },
};
</script>

<style lang="scss" scoped>
@mixin list{
  display: inline-block;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      
}
.selectStyle{
  font-weight:bolder;
  border-bottom: 4px solid #2B75EDFF;

}
.Customer {
  width: 100%;
  padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  height: 100%;
  .header_nav {
    width: 100%;
    height: 6%;
    display: flex;
    .user_list {
      @include list;
      margin-right: 3%;
    }
    .black_list {
      @include list;
    }
  }
  .footer{
      width:100%;
  }
}
</style>