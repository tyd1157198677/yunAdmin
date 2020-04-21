<template>
  <div class="userList">
    <div class="header">
      <a-button class="header_top" size="large" type="primary">添加用户</a-button>
      <div class="header_bottom">
        <div class="search_left">
          <a-select class="select_identity" size="large" placeholder="身份">
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>

          <a-select class="select_logonmode" size="large" placeholder="注册方式">
            >
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>

          <a-select class="select_attribution" size="large" placeholder="归属">
            >
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled">Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>

        <div class="search_right">
          <a-input class="search_input" size="large" placeholder="用户名/手机号/备注">
            <a-icon slot="prefix" type="search" style="fontSize:30px;color:#909399FF" />
          </a-input>
          <a-button class="search_btn" size="large" type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <!-- 表单展示区 -->
    <div class="body">
      <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="key" v-if="data">
        <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
        <template slot="operation" slot-scope="text, record, index">
          <span>
            <a-button @click.native="showDetail()" size="small" type="link">详情</a-button>
            <a-button @click.native="recharge()" size="small" type="link">充值</a-button>
            <a-modal
              title="用户充值"
              v-model="visible"
              @ok="handleOk"
              :centered="true"
              :destroyOnClose="true"
              :mask="false"
              okText="确定"
            >
              <a-form-model v-bind="rechargeLayout" :model="rechargeForm">
                <a-form-model-item label="充值金额" :colon="false">
                  <a-input v-model="rechargeForm.rechargeAmount" type="text" placeholder="请输入充值金额" />
                </a-form-model-item>
                <a-form-model-item label="充值终端" :colon="false">
                  <a-radio-group v-model="rechargeForm.terminal">
                    <a-radio value="Android">Android</a-radio>
                    <a-radio value="iOS">iOS</a-radio>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="充值类型" :colon="false">
                  <a-radio-group v-model="rechargeForm.rechargeType" :colon="false">
                    <a-radio value="accountBalance">账户余额</a-radio>
                    <a-radio value="giveBalance">赠送余额</a-radio>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="有效期至" :colon="false">
                  <a-date-picker
                    v-model="rechargeForm.date"
                    show-time
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%;"
                  />
                </a-form-model-item>
                <a-form-model-item label="收款类型" :colon="false">
                  <a-radio-group v-model="rechargeForm.paymentType">
                    <a-radio value="publicDebt">公帐收款</a-radio>
                    <a-radio value="privateDebt">私帐收款</a-radio>
                  </a-radio-group>
                </a-form-model-item>
              </a-form-model>
            </a-modal>
            <a-button @click.native="openPrivilege()" size="small" type="link">开特权</a-button>
            <a-modal
              title="开通特权"
              v-model="isOpen"
              @ok="selectOk"
              :centered="true"
              :destroyOnClose="true"
              :mask="false"
              okText="确定"
              cancelText="取消"
            >
              <a-form-model v-bind="privilegeLayout" :model="privilegeForm">
                <a-form-model-item label="特权类型" :colon="false">
                  <a-radio-group v-model="privilegeForm.privilegeType">
                    <a-radio value="yearPri">年度特权</a-radio>
                    <a-radio value="InternalPri">内部特权</a-radio>
                    <a-radio value="customPri">自定义特权</a-radio>
                    <a-radio value="trialPri">试用特权</a-radio>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="所在地区" :colon="false">
                  <a-cascader
                    :options="regionData"
                    v-model="privilegeForm.region"
                    style="width: 60%;"
                    placeholder="请选择地区"
                  />
                </a-form-model-item>

                <a-form-model-item
                  v-if="privilegeForm.privilegeType==='trialPri'"
                  label="试用时间"
                  :colon="false"
                >
                  <a-select
                    placeholder="请选择试用时间"
                    v-model="privilegeForm.trialTime"
                    style="width: 60%;"
                  >
                    <a-select-option value="7">7天</a-select-option>
                    <a-select-option value="15">15天</a-select-option>
                    <a-select-option value="30">30天</a-select-option>
                    <a-select-option value="90">90天</a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item
                  v-if="privilegeForm.privilegeType==='customPri'"
                  label="开通价格"
                  :colon="false"
                >
                  <a-input
                    v-model="privilegeForm.rechargeAmount"
                    style="width: 60%;"
                    type="text"
                    placeholder="请输入价格"
                  />
                </a-form-model-item>

                <a-form-model-item
                  v-if="privilegeForm.privilegeType==='InternalPri'||privilegeForm.privilegeType==='customPri'"
                  label="有效期至"
                  :colon="false"
                >
                  <a-date-picker
                    v-model="privilegeForm.date"
                    show-time
                    type="date"
                    placeholder="请选择日期"
                    style="width: 60%;"
                  />
                </a-form-model-item>

                <a-form-model-item :colon="false">
                  <label style="color:black">同时开通企业账号</label>
                  <a-switch style="marginLeft:30px" v-model="privilegeForm.delivery" />
                </a-form-model-item>
              </a-form-model>
            </a-modal>
            <a-button @click.native="remove()" size="small" type="link">删除</a-button>
          </span>
        </template>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        style="border:0px"
        showSizeChanger
        :pageSize.sync="pageSize"
        @showSizeChange="onShowSizeChange"
        :total="500"
        v-model="current"
      />
      <!-- <pages></pages> -->
      <!-- <FooterPagination /> -->
    </div>
  </div>
</template>

<script>
// import pages from '@/components/pages.vue'
import FooterPagination from "@/components/FooterPagination.vue";
import { confirm } from "@/antUI/module.js";
//表头数据
const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    width: "10%",
    scopedSlots: { customRender: "userName" }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    width: "10%",
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "身份",
    dataIndex: "identity",
    width: "10%",
    scopedSlots: { customRender: "identity" }
  },
  {
    title: "注册时间",
    dataIndex: "joinDate",
    width: "15%",
    scopedSlots: { customRender: "joinDate" }
  },
  {
    title: "注册方式",
    dataIndex: "logonMode",
    width: "10%",
    scopedSlots: { customRender: "logonMode" }
  },
  {
    title: "归属",
    dataIndex: "attribution",
    width: "10%",
    scopedSlots: { customRender: "attribution" }
  },
  {
    title: "备注",
    dataIndex: "note",
    width: "10%",
    scopedSlots: { customRender: "note" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
//表单数据
const data = [
  {
    key: "1",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "2",
    userName: "李四22233",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "3",
    userName: "李四3333",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "4",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "5",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "6",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "7",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "8",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "9",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  },
  {
    key: "10",
    userName: "李四33",
    phone: "13066314466",
    identity: "普通会员",
    joinDate: "2020-12-12  12：22：30",
    logonMode: "app",
    attribution: "平台",
    note: "--"
  }
];
//三级联动数据源
const regionData = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];
export default {
  components: {
    FooterPagination
    // pages
  },
  data() {
    return {
      pageSize: 20,
      current: 4,
      data, //表单数据
      columns, //表头数据
      regionData, //三级联动数据源
      visible: false, //充值开关
      isOpen: false, //开特权开关
      rechargeForm: {
        data: "", //有效期
        terminal: "Android", //充值终端
        rechargeType: "giveBalance", //充值类型
        paymentType: "publicDebt", //收款类型
        rechargeAmount: "" //充值金额
      },
      privilegeForm: {
        privilegeType: "", //特权类型
        region: undefined, //地区
        data: "", //有效区
        trialTime: undefined, //试用时间
        delivery: true //是否开通企业账号
      },
      rechargeLayout: {
        //充值布局
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      privilegeLayout: {
        //特权布局
        labelCol: { span: 3 },
        wrapperCol: { span: 21 }
      }
    };
  },
  methods: {
    //查看客户详情
    showDetail() {
      this.$router.push({ path: "userDetail" });
    },
    //控制充值开关
    recharge() {
      this.visible = true;
    },
    //充值框点确定后执行
    handleOk() {
      this.visible = false;
    },
    //开特权开关
    openPrivilege() {
      this.isOpen = true;
    },
    //开特权弹窗确定后执行
    selectOk() {
      this.isOpen = false;
      console.log(this.privilegeForm);
    },
    //删除该用户
    remove() {
      confirm({
        icon: "close-circle",
        title: "确定要删除该客户吗?",
        content: "删除后，该用户在平台的所有数据都将清空，且无法恢复",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    }
  },
  watch: {
    pageSize(val) {
      console.log("pageSize", val);
    },
    current(val) {
      console.log("current", val);
    }
  }
};
</script>
<style>
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.ant-modal-confirm-body > .anticon-close-circle {
  color: red !important;
}
</style>
<style lang="scss" scoped>
.userList {
  width: 100%;
  height: 100%;
  background: #fff;
  .header {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    .header_top {
      margin-top: 1.5%;
    }
    .header_bottom {
      width: 100%;
      margin: 1.5% 0%;
      display: flex;
      justify-content: space-between;
      .search_left {
        width: 30%;
        .select_identity {
          width: 30.5%;
        }
        .select_logonmode {
          width: 30.5%;
          // margin: 0% 4%;
        }
        .select_attribution {
          width: 30.5%;
        }
      }
      .search_right {
        width: 30%;
        .search_input {
          width: 73%;
        }
        .search_btn {
          width: 25%;
          margin-left: 2%;
        }
      }
    }
  }
  .body {
    width: 100%;
  }
  .footer {
    text-align: right;
    margin: 30px 10px;
  }
  .ant-table-wrapper{
    height: 100%;
    width: 100%;
    // background: #fff;
  }
}
</style>