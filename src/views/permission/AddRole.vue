<template>
  <div class="AddRole">
    <!-- 温馨提示 -->
    <div class="tips">
      <WarmPrompt />
    </div>
    <div class="form">
      <p class="title">基本信息</p>
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <!-- prop属性值为表单验证规则rules里的绑定 -->
        <!-- 账号 -->
        <a-form-model-item has-feedback label="角色名称" prop="checkRole" :colon="false" ref="name">
          <a-input
            v-model="ruleForm.checkRole"
            placeholder="请输入角色名称"
            type="text"
            @change="getvalue"
            autocomplete="off"
            :maxLength="8"
            allowClear
          />
        </a-form-model-item>
        <!-- 简介 -->
        <a-form-model-item has-feedback label="角色描述" :colon="false">
          <a-textarea placeholder="请输入角色描述..." style="resize: none" :rows="6" />
        </a-form-model-item>

        <!-- 权限设置 -->
        <p class="title">权限设置</p>
        <a-tree
          checkable
          :treeData="treeData"
          :defaultExpandedKeys="['0-0-0', '0-0-1']"
          :defaultSelectedKeys="['0-0-0', '0-0-1']"
          :defaultCheckedKeys="['0-0-0', '0-0-1']"
        >
          <span slot="title0000" style="color: #1890ff">添加角色</span>
          <span slot="title0001" style="color: #1890ff">编辑角色</span>
        </a-tree>

        <!-- 提交栏 -->
      </a-form-model>
    </div>
    <Submit></Submit>
    <!-- <div class="submit">
      <div class="submit_btn">
        <a-button class="btn" type="primary" size="large" @click="submitForm('ruleForm')">提交</a-button>
        <a-button class="btn" style="margin-left:20%" size="large" @click="resetForm('ruleForm')">取消</a-button>
      </div>
    </div>-->
  </div>
</template>

<script>
import WarmPrompt from "@/components/WarmPrompt.vue";
import Submit from "@/components/Submit";
import { validator } from "@/antUI/module.js";
export default {
  components: {
    WarmPrompt,
    Submit
  },
  data() {
    //树形图数据
    const treeData = [
      {
        title: "权限管理",
        key: "0-0",
        children: [
          {
            title: "角色管理",
            key: "0-0-0",
            style: { width: "100px" },
            children: [
              { key: "0-0-0-0", slots: { title: "title0000" } },
              { key: "0-0-0-1", slots: { title: "title0001" } }
            ]
          }
          //可用于扩展
          // {
          //   title: 'parent 1-1',
          //   key: '0-0-1',
          //   children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
          // },
        ]
      }
    ];
    //角色名称校验
    let validateRole = validator({
      reg: /[\u4e00-\u9fa5]/,
      isNull: "角色名称输入不能为空",
      formatErr: "字符必须为中文"
    });
    //验证器off
    return {
      treeData, //树形图
      ruleForm: {
        checkRole: ""
      },
      //表单验证规则
      rules: {
        checkRole: [
          { validator: validateRole, required: true, trigger: "blur" },
          { min: 2, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },

      //表单布局
      layout: {
        labelCol: { span: 4, offset: 1 },
        wrapperCol: { span: 17, offset: 2 }
      }
    };
  },
  methods: {
    getvalue() {
      // console.log(this.ruleForm.role)
    }
  }
};
</script>
<style>
.ant-tree li ul {
  display: flex;
}
.ant-tree li ul > li {
  padding: 8px 0 4px;
}
</style>
<style lang="scss" scoped>
.AddRole {
  width: 100%;
  height: 100%;
   padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  .tips {
    width: 100%;
    height: 4.6%;
    background-color: #fffbe6;
    border: 1px solid #ffe58f;
    margin-bottom: 2.5%;
    display: flex;
    // justify-content:center;
    align-items: center;
    .tips_img {
      height: 55%;
      padding: 0 1%;
    }
    .tips_font {
      font-size: 1.1rem;
    }
  }
  .title {
    font-size: 1.2rem;
    width: 20%;
    text-align: center;
    border-left: 5px solid #2b75edff;
  }
  .form {
    width: 36%;
    height: 82%;
  }
  // .submit {
  //   width: 100%;
  //   height: 9%;
  //   border-top: 1px solid #efefefff;
  //   display: flex;

  //   .submit_btn {
  //     width: 15%;
  //     height: 100%;
  //     padding-top: 1.2%;
  //     margin: 0% auto;
  //     display: flex;
  //     .btn {
  //       flex-grow: 1;
  //     }
  //   }
  // }
}
</style>