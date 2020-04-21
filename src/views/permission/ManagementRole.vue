<template>
  <div class="Role">
    <div class="header">
      <!-- 温馨提示 -->
      <div class="tips">
        <!-- <img class="tips_img" src="@/assets/img/icon_general_hint_16@2x (1).png" alt />
        <span class="tips_font">温馨提示：编辑角色，拥有该角色包含权限的账号会同步更改，请谨慎编辑！</span>-->
        <WarmPrompt />
      </div>
      <a-button class="btn" type="primary" size="large" @click="addRole">添加角色</a-button>
    </div>
    <div class="body">
      <a-table :columns="columns" :dataSource="data" :pagination="false" v-if="data">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="showRole()" size="small" type="link">查看</a-button>
            <a-button @click.native="removeTableRow()" size="small" type="link">删除</a-button>
          </span>
        </template>
      </a-table>
      <!-- 没数据时的页面 -->
      <div v-else>
        <!-- <errPage/> -->
        <a-empty description='暂无数据'/>
      </div>
    </div>
    <!-- 底部分页 -->
    <div class="footer">
      <FooterPagination></FooterPagination>
    </div>
  </div>
</template>

<script>
import WarmPrompt from "@/components/WarmPrompt.vue";
import FooterPagination from "@/components/FooterPagination.vue";
import errPage from "@/components/errPage.vue";
const columns = [
  {
    title: "角色",
    dataIndex: "role",
    width: "20%",
    scopedSlots: { customRender: "role" }
  },
  {
    title: "描述",
    dataIndex: "detail",
    width: "60%",
    scopedSlots: { customRender: "detail" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: "1",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "2",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "3",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "4",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "5",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "6",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "7",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "8",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "9",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  },
  {
    key: "10",
    role: "管理者",
    detail:
      "测试字数最多可以多少个汉字就是显示在这里最合适的不要超过这个字数限制不然就会不好看的也不好管理还要换"
  }
];
export default {
  components: {
    WarmPrompt,
    FooterPagination,
    errPage
  },
  data() {
    return {
      data,
      columns,
      editingKey: ""
    };
  },
  methods: {
    addRole() {
      this.$router.push({ name: "AddRole" });
    },
    //删除角色
    removeTableRow(){

    },
    //查看角色
    showRole(){

    }
  }
};
</script>

<style lang="scss" scoped>
.Role {
  width: 100%;
  padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  .header {
    width: 100%;
    .tips {
      width: 100%;
      background-color: #fffbe6;
      border: 1px solid #ffe58f;
      display: flex;
      align-items: center;
      .tips_img {
        padding: 0 1%;
      }
      .tips_font {
        font-size: 1.1rem;
      }
    }
    .btn {
      margin: 2.6% 0%;
      width: 8%;
    }
  }
  .body {
    width: 100%;
  }
  .footer {
    position: relative;
    width: 100%;
  }
}
</style>