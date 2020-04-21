<template>
  <div class="UserDetail">
    <div class="body">
      <div class="body_top">
        <div class="user">
          <p class="user_title">用户资料</p>
          <div class="user_msg">
            <img class="user_img" src="@/assets/img/head_upload@2x.png" alt />
            <div class="user_name">
              <span>骑着蜗牛上高速</span>
              <span>13066314447</span>
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button type="primary" size="large" @click.native="openRedPacket()">启用红包</a-button>
          <a-modal
            title="启用红包"
            v-model="isShow"
            @ok="handleOk"
            :centered="true"
            :destroyOnClose="true"
            :mask="false"
            okText="确定"
            cancelText="取消"
          >
            <a-form-model v-bind="redPacketLayout" :model="redPacketForm">
              <a-form-model-item label="红包总金额" :colon="false">
                <a-input
                  v-model="redPacketForm.count"
                  style="width: 70%;"
                  type="text"
                  placeholder="请输入总金额"
                />
              </a-form-model-item>
              <a-form-model-item label="单笔提现最低金额" :colon="false">
                <a-input
                  v-model="redPacketForm.minMoney"
                  style="width: 70%;"
                  type="text"
                  placeholder="请输入金额"
                />
                <p
                  class="font_style"
                  style="fontSize:5px;color:red;display:flex;justifyContent:center"
                >金额保留两位小数0.00</p>
              </a-form-model-item>
            </a-form-model>
          </a-modal>
          <a-button class="addBlackList" @click="addBlackList" type="primary" size="large">加入黑名单</a-button>
          <a-button type="danger" size="large">删除用户</a-button>
        </div>
      </div>
      <div class="body_bottom">
        <div class="detail_left">
          <div>真实姓名：李四</div>
          <div>性别：男</div>
          <div>手机号码：13066314468</div>
          <div>特权用户：是</div>
          <div>赠送余额：1000.00</div>
        </div>
        <div class="detail_middle">
          <div>行业：无</div>
          <div>职位：无</div>
          <div>公司：无</div>
          <div>到期时间：2021-02-16</div>
          <div>余额到期：2022-02-16</div>
        </div>
        <div class="detail_right">
          <div>所在地区：广东省-广州市-花都区</div>
          <div>邮 箱：无</div>
          <div>微 信：无</div>
          <div>账户余额：0.00</div>
          <div>备 注：无</div>
        </div>
      </div>
    </div>
    <div class="br"></div>
    <div class="footer">
      <a-tabs defaultActiveKey="1" size="large">
        <a-tab-pane tab="跟进记录" key="1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane tab="学习记录" key="2">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="购买记录" key="3">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane tab="余额明细" key="4">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="红包明细" key="5">Content of Tab Pane 3</a-tab-pane>
        <a-button type="primary" slot="tabBarExtraContent">添加跟进</a-button>
      </a-tabs>
      <!-- <div class="footer_top">
        <span
        :class="{selectStyle:index == num,selectTap:true}"
          v-for="(item,index) in btnList"
          :key="index"
          @click="tab(index)"
        >{{ item }}</span>
        <a-button slot="tabBarExtraContent">Extra Action</a-button>
      </div>
      <div class="footer_bottom"></div> -->
    </div>
  </div>
</template>

<script>
// import { confirm } from "@/antUI/module.js";
export default {
  data() {
    return {
      num: "0",
      btnList: ["跟进记录", "学习记录", "购买记录", "余额明细", "红包明细"],
      isShow: false,
      redPacketForm: {
        minMoney: "",
        count: ""
      },
      redPacketLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
    };
  },
  methods: {
    //加入黑名单
    addBlackList() {
      confirm({
        icon: "exclamation-circle",
        title: "确定要将该用户添加到黑名单吗?",
        content: "加入黑名单后，该用户的账号将不能在本平台所有的端登录。",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    //红包弹窗
    openRedPacket() {
      this.isShow = true;
    },
    //点击确定后执行
    handleOk() {
      this.isShow = false;
    },
    //选项卡
    tab(index) {
      this.num = index;
    }
  }
};
</script>
<style>
ant-form-item-label {
  text-align: left;
  width: 75px;
}
</style>
<style lang="scss" scoped>
//选中样式
.selectStyle {
  font-weight: bolder;
  border-bottom: 4px solid #2b75edff;
}
.UserDetail {
  background-color: #fff;
  .body {
    padding: 1.2% 1.2% 0% 1.2%;
    width: 100%;
    .body_top {
      display: flex;
      justify-content: space-between;
      .user {
        width: 30%; //345px      1152px
        .user_title {
          width: 25%;
          font-size: 1.2rem;
          text-align: center;
          border-left: 5px solid #2b75edff;
        }
        .user_msg {
          display: flex; //353
          .user_img {
            width: 17%;
            margin: 0 3.5% 0 4.5%;
            border-radius: 100%;
          }
          .user_name {
            width: 83%;
            display: flex;
            margin: auto 0;
            line-height: 200%;
            flex-direction: column;
          }
        }
      }
      .btn {
        width: 40%; //460px      1152px
        display: flex;
        justify-content: flex-end;
        .addBlackList {
          margin: 0 5%;
        }
      }
    }
    .body_bottom {
      display: flex;
      padding: 1.2%;
      justify-content: space-between;
      box-sizing: border-box;
      div {
        line-height: 300%;
      }
    }
  }
  .br {
    height: 30px;
    background-color: #f5f7faff;
  }
  .footer {
    padding: 1% 1.2% 0% 1.2%;
    .footer_top {
      display: flex;
      .selectTap {
        line-height: 400%;
        margin-right: 2%;
      }
    }
  }
}
</style>