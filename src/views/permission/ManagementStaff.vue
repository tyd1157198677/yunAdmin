<template>
  <div class="Staff">
    <div class="header">
      <a-button class="header_top" type="primary" @click="addEmployees">添加员工</a-button>
      <div class="header_bottom">
        <div class="search_left">
          <a-select class="select_role" size="large" placeholder="全部角色">
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>

          <a-select class="select_state" size="large" placeholder="全部状态">
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>

        <div class="search_right">
          <a-input class="search_input" />
          <a-button class="search_btn" size="large" type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <!-- 表格展示区域 -->
    <div class="body">
      <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="key" v-if="data">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="handleTableRow()" size="small" type="link">启用</a-button>
            <a-button @click.native="editTableRow()" size="small" type="link">编辑</a-button>
            <a-button @click.native="removeTableRow()" size="small" type="link">删除</a-button>
          </span>
        </template>
      </a-table>
      <!-- 没有数据的页面 -->
      <div v-else>
        <!-- <errPage/>> -->
        <a-empty description="暂无数据" />
      </div>
    </div>
    <!-- 底部分页 -->
    <div class="footer">
      <FooterPagination :pageCount="pageCount" :currentPage ='currentPage' @selectPage='selectPage'></FooterPagination>
    </div>  
    <!-- <div class="footer">
      <a-pagination class="pagination" :defaultCurrent="1" :total="500"/>
    </div>-->
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: "15%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "账号",
    dataIndex: "account",
    width: "15%",
    scopedSlots: { customRender: "account" }
  },
  {
    title: "角色",
    dataIndex: "role",
    width: "15%",
    scopedSlots: { customRender: "role" }
  },
  {
    title: "添加时间",
    dataIndex: "addtime",
    width: "20%",
    scopedSlots: { customRender: "addtime" }
  },
  {
    title: "状态",
    dataIndex: "state",
    width: "20%",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
import { confirm } from "@/antUI/module.js";
import FooterPagination from "@/components/FooterPagination.vue";
import errPage from "@/components/errPage.vue";
import axios from "axios";
export default {
  components: {
    FooterPagination,
    errPage
  },
 
    //TODO
  data() {
    return {
      pageCount: 0,
      data: "",
      columns,
      editingKey: "",
      currentPage:1   //当前选择的页数,默认为第一页
    };
  },
   //TODO
  mounted() {
    //如果缓存有数据则拿缓存的数据
    let { data,pageCount} = window.sessionStorage;
    if (data && pageCount) {
      this.data = JSON.parse(data);
      this.pageCount = JSON.parse(pageCount);
      return
    }
    //否则获取分页的数据
    //获取分页总数
      axios.get("/api/pagecount").then(result => {
        let {pageCount} = result.data
        this.pageCount = pageCount;
         window.sessionStorage.pageCount = JSON.stringify(pageCount)
        console.log(this.pageCount)
        //分页总数获取后请求获取第一页的信息
        axios.get("/api/getTable?id=0").then(result => {
          let {data} = result
          this.data = data;
          window.sessionStorage.data = JSON.stringify(data)
        });
      });
  },
  methods: {
      //TODO
    //选择分页跳转
    selectPage(pageNum){
      this.currentPage = pageNum      //获取到点击的页数
      //进行分页数请求
      axios.get(`/api/getTable?id=${pageNum}`).then(result => {
          let {data} = result
          this.data = data;
          window.sessionStorage.data = JSON.stringify(data)
        });
    },
  //TODO
    //添加员工跳转页面
    addEmployees() {
      this.$router.push({ name: "Add" });
    },
    //启用/停用员工
    handleTableRow() {
      confirm({
        icon: "exclamation-circle",
        title: "确定要停用该员工吗?",
        content: "停用后，该员工将不可登入，也不能有任何的操作。",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    //编辑员工
    editTableRow(key) {
      console.log(key);
    },
    //删除员工弹窗
    removeTableRow() {
      confirm({
        icon: "close-circle",
        title: "确定要删除该员工吗?",
        content: "删除后，该员工将不能登入该后台，且操作不可逆",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
<style>
.ant-modal-confirm-body > .anticon-info-circle {
  color: rgb(224, 224, 98) !important;
}
.ant-modal-confirm-body > .anticon-close-circle {
  color: red !important;
}
</style>
<style lang="scss" scoped>
.Staff {
  width: 100%;
  height: 100%;
  padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  .header {
    width: 100%;
    height: 17%;
    .header_top {
      width: 8%;
      height: 27%;
      margin-bottom: 1.8%;
    }
    .header_bottom {
      width: 100%;
      height: 27%;
      display: flex;
      justify-content: space-between;
      .search_left {
        width: 20%;
        .select_role {
          width: 47%;
          margin-right: 6%;
        }
        .select_state {
          width: 47%;
        }
      }
      .search_right {
        width: 30%;
        .search_input {
          width: 73%;
          height: 100%;
        }
        .search_btn {
          width: 25%;
          height: 100%;
          margin-left: 2%;
        }
      }
    }
  }
  .body {
    width: 100%;
    height: 67%;
  }
  .footer {
    position: relative;
    width: 100%;
    height: 16%;
  }
}
</style>