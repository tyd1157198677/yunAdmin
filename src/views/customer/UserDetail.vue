<template>
  <div class="UserDetail">
    <div class="body">
      <div class="body_top">
        <div class="user">
          <p class="user_title">用户资料</p>
          <span class="edit" @click="editeUser">编辑</span>
          <div class="user_msg">
            <a-avatar
              style="backgroundColor:#F5F7FA;width:60px;height:60px"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <!-- <img class="user_img" src="@/assets/img/head_upload@2x.png" alt /> -->
            <div class="user_name">
              <span class="user_name_title">骑着蜗牛上高速</span>
              <span class="user_number">13066314447</span>
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button type="primary" :class="key=='2'? 'btns':''" :disabled="key==2"  size="large" @click.native="openRedPacket">启用红包</a-button>
          <a-modal
            title="启用红包"
            v-model="isShow"
            @ok="handleOk"
            :centered="true"
            :destroyOnClose="true"
            width="430px"
            :bodyStyle="{'padding-bottom':'15px'}"
          >
          <template slot="footer">
            <a-button  type="primary" @click="handleOk">确定</a-button>
          </template>
              <div style="display:flex;line-height:40px"><span style="width:90px;color:rgba(48,49,51,1);font-size:14px;">红包总金额</span><a-input type="text" placeholder="请输入总金额" style="width:63%;height:40px;" /></div>
              <div  style="display:flex;margin-top:24px;height:40px;line-height:40px"><span style="width:140px;color:rgba(48,49,51,1);font-size:14px;">单笔提现最低金额</span><a-input type="text" placeholder="请输入金额" style="width:50%;height:40px;" /></div>
              <div style="margin:20px 50px 0px 0px;color:red;font-size:12px;text-align:right">{{baoliu}}</div>
          </a-modal> 
          <a-button class="addBlackList" @click.native="addBlackList(key)" type="primary" size="large">{{blacklist}}</a-button>
          <a-button type="danger" size="large" @click.native="remove">删除用户</a-button>
        </div>
      </div>
      <div class="body_bottom">
        <div class="detail_left">
          <div>
            真实姓名
            <span class="user_details">我是谁</span>
          </div>
          <div>
            性别
            <span class="user_details">男</span>
          </div>
          <div>
            手机号码
            <span class="user_details">13066314468</span>
          </div>
          <div>
            特权用户
            <span class="user_details">我</span>
          </div>
          <div>
            赠送余额
            <span class="user_details">1000.00</span>
          </div>
        </div>
        <div class="detail_middle">
          <div>
            行业
            <span class="user_details">无</span>
          </div>
          <div>
            职位
            <span class="user_details">无</span>
          </div>
          <div>
            公司
            <span class="user_details">无</span>
          </div>
          <div>
            到期时间
            <span class="user_details">2021-02-16</span>
          </div>
          <div>
            余额到期
            <span class="user_details">2021-02-16</span>
          </div>
        </div>
        <div class="detail_right">
          <div>
            所在地区
            <span class="user_details">广东省-广州市-花都区</span>
          </div>
          <div>
            邮 箱
            <span class="user_details">无</span>
          </div>
          <div>
            微 信
            <span class="user_details">无</span>
          </div>
          <div>
            账户余额
            <span class="user_details">0.00</span>
          </div>
          <div>
            备 注
            <span class="user_details">无</span>
          </div>
        </div>
      </div>
    </div>
    <div class="br"></div>
    <div class="footer">
      <a-tabs defaultActiveKey="1" class="tabs_tit" size="large" @change="callback">
        <a-tab-pane tab="跟进记录" key="1">
          <div class="gj_record" v-for="(item, index) in gjCon" :key="index">
            <div class="user">
              <div class="user_msg">
                <a-avatar
                  style="backgroundColor:#F5F7FA;width:40px;height:40px"
                  :src="item.url"
                />
                <div class="user_name">
                  <span class="user_name_title">{{item.nickName}}</span>
                  <span class="user_time">{{item.time}}</span>
                </div>
              </div>
              <div class="f_content">{{item.content}}</div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="学习记录" key="2">
          <a-table
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            rowKey="key"
            style="color:rgba(48,49,51,1);font-weight:500;"
          >
            <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
            <template slot="userName" slot-scope="text, record, index">
              <img :src="record.url" alt />
              <span class="kecheng_title">{{record.userName}}</span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="购买记录" key="3">
          <a-table :columns="columns1" :dataSource="data1" :pagination="false" rowKey="key">
            <!-- slot-scope="text, record, index"是给事件传入三个参数，record为下面点击的const data中的对应对象，index为点击的index-->
            <template slot="ke_title" slot-scope="text, record, index">
              <img :src="record.url" alt />
              <span class="kecheng_title">{{record.ke_title}}</span>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="余额明细" key="4">
          <div class="balance_money">
            <a-table :columns="columns3" :dataSource="data3" :pagination="false" rowKey="key"></a-table>
          </div>
        </a-tab-pane>
        </a-tab-pane>
        <a-tab-pane tab="红包明细" key="5">
          <div class="redbeg">
            <a-table :columns="columns2" :dataSource="data2" :pagination="false" rowKey="key"></a-table>
          </div>
        </a-tab-pane>
        <a-button type="primary" :disabled="key==2" :class="key=='2'? 'btns':''" v-if="num==1" slot="tabBarExtraContent" @click="add_genjin">添加跟进</a-button>
      </a-tabs>
      <a-modal
            title="添加跟进"
            v-model="isShow1"
            :centered="true"
            :destroyOnClose="true"
            width="430px"
            :bodyStyle="{'padding-bottom':'15px'}"
          >
          <template slot="footer">
            <a-button  type="primary" @click="handleOk1">确定</a-button>
          </template>
              <div>
                <a-input v-model="genjin_content" type="textarea" placeholder="请输入跟进内容"
                 style="width:100%; resize:none;height:150px;
                 background:rgba(245,247,250,1);border:2px solid rgba(245,247,250,1);
                 out-line:none;box-shadow: none;"/>
                 <div class="err_msg" style="height:20px;line-height:20px;color:red">{{err_msg}}</div>
              </div>
          </a-modal>
    </div>
  </div>
</template>

<script>
import { confirm } from "@/antUI/module.js";
export default {
  data() {
    return {
      columns: [
        {
          title: "课程名称",
          dataIndex: "userName",
          width: "25%",
          scopedSlots: { customRender: "userName" }
        },
        {
          title: "课程类型",
          dataIndex: "ke_type",
          width: "20%",
          scopedSlots: { customRender: "ke_type" }
        },
        {
          title: "讲师",
          dataIndex: "reacher_name",
          width: "20%",
          scopedSlots: { customRender: "reacher_name" }
        },
        {
          title: "学习时间",
          dataIndex: "study_time",
          width: "25%",
          scopedSlots: { customRender: "study_time" }
        },
        {
          align:"right",
          title: "学习时长",
          dataIndex: "study_lengh",
          width: "8%",
          scopedSlots: { customRender: "study_lengh" }
        }
      ],
      data: [
        {
          key: "1",
          userName: "传统企业如何转型 升级",
          ke_type: "视频",
          reacher_name: "高建华",
          study_time: "2020-12-12  12：22：30",
          study_lengh: "1小时22分",
          url: require("../../assets/img/QQ截图20200418153606.png")
        },
        {
          key: "2",
          userName: "做好销售你需要知道的24个成交法则",
          ke_type: "音频",
          reacher_name: "彭成本",
          study_time: "2020-12-12  12：22：30",
          study_lengh: "1小时23分",
          url: require("../../assets/img/QQ截图20200418175400.png")
        },
        {
          key: "3",
          userName: "做好销售你需要知道的24个成交法则",
          ke_type: "音频",
          reacher_name: "彭成炳",
          study_time: "2020-12-12  12：22：30",
          study_lengh: "1小时23分",
          url: require("../../assets/img/QQ截图20200418175400.png")
        }
      ],
      columns1: [
        {
          title: "课程名称",
          dataIndex: "ke_title",
          width: "25%",
          scopedSlots: { customRender: "ke_title" }
        },
        {
          title: "金额",
          dataIndex: "price",
          width: "10%",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "交易状态",
          dataIndex: "state",
          width: "15%",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "支付方式",
          dataIndex: "pay_style",
          width: "14%",
          scopedSlots: { customRender: "pay_style" }
        },
        {
          title: "交易时间",
          dataIndex: "trading_time",
          width: "25%",
          scopedSlots: { customRender: "trading_time" }
        },
        {
          align:"right",
          title: "订单号",
          dataIndex: "order_num",
          width: "15%",
          scopedSlots: { customRender: "order_num" }
        }
      ],
      data1: [
        {
          key: "1",
          url: require("../../assets/img/QQ截图20200418153606.png"),
          ke_title: "做好销售你需要知道的24个成交法则",
          price: "99.90",
          state: "已支付",
          pay_style: "赠送余额",
          trading_time: "2020-12-12  12：22：30",
          order_num: "1582184948713"
        },
        {
          key: "2",
          url: require("../../assets/img/QQ截图20200418175400.png"),
          ke_title: "做好销售你需要知道的24个成交法则,这是你要知道",
          price: "99.90",
          state: "已支付",
          pay_style: "赠送余额",
          trading_time: "2020-12-12  12：22：30",
          order_num: "1582184948713"
        }
      ],
      columns2: [
        {
          title: "提现金额",
          dataIndex: "tx_money",
          width: "22%",
          scopedSlots: { customRender: "tx_money" }
        },
        {
          title: "提现时间",
          dataIndex: "tx_time",
          width: "22%",
          scopedSlots: { customRender: "tx_time" }
        },
        {
          title: "提现类型",
          dataIndex: "tx_style",
          width: "22%",
          scopedSlots: { customRender: "tx_style" }
        },
        {
          title: "状态",
          dataIndex: "state",
          width: "22%",
          scopedSlots: { customRender: "state" }
        },
        {
          align:"right",
          title: "操作人",
          dataIndex: "operationer",
          width: "12%",
          scopedSlots: { customRender: "operationer" },
          // align:right
        }
      ],
      data2: [
        {
          key: "1",
          tx_money: "19.99",
          tx_time: "2020-02-19 17:03:11",
          tx_style: "帐户余额",
          state: "已返款",
          operationer: "财务甲"
        },
        {
          key: "2",
          tx_money: "19.99",
          tx_time: "2020-02-19 17:03:11",
          tx_style: "帐户余额",
          state: "审核中",
          operationer: "财务乙"
        }
      ],
      columns3: [
        {
          title: "流水号",
          dataIndex: "serial_num",
          width: "18%",
          scopedSlots: { customRender: "serial_num" }
        },
        {
          title: "金额",
          dataIndex: "amount",
          width: "13%",
          scopedSlots: { customRender: "amount" }
        },
        {
          title: "类型",
          dataIndex: "style",
          width: "18%",
          scopedSlots: { customRender: "style" }
        },
        {
          title: "时间",
          dataIndex: "time",
          width: "20%",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "来源",
          dataIndex: "source",
          width: "10%",
          scopedSlots: { customRender: "source" },
        },
        {
          align:"right",
          title: "备注",
          dataIndex: "note",
          width: "30%",
          scopedSlots: { customRender: "note" },
        }
      ],
      data3: [
        {
          key: "1",
          serial_num:"1582103002421",
          amount: "-19.99",
          style: "赠送余额消费",
          time: "2020-02-19 17:03:11",
          source: "安卓",
          note: "财务甲"
        },
        {
          key: "2",
          serial_num:"1582103002421",
          amount: "-19.99",
          style: "余额消费",
          time: "2020-02-19 17:03:11",
          source: "安卓",
          note: "_ _"
        },
        {
          key: "3",
          serial_num:"1582103002421",
          amount: "+119.99",
          style: "赠送余额消费",
          time: "2020-02-19 17:03:11",
          source: "后台",
          note: "后台管理员 admin 给用户充值余额"
        }
        
      ],
      user_detail:{
        account: "", //账号
        name: "", //姓名
        resource: "1", //性别
        url: require("@/assets/img/head_upload@2x.png"),
        tequan: "",
        phone: "",
        weixin: "",
        email: "",
        hangye: "",
        company: "",
        job: "",
        diqu: {
          sheng: "",
          shi: "",
          qu: ""
        },
        beizhu: ""
      },//用户详情
      key:this.$route.query.key,
      err_msg:"",//添加跟进内容为空提示
      blacklist:"加入黑名单",//是加入黑名单还是移除黑名单
      num: "1",//为1时显示跟进记录
      baoliu:"金额保留两位小数：0.00",//保留两位小数
      isShow: false,//红包弹框
      isShow1:false,//跟进弹框
      gjCon:[
        {
          url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          nickName:"骑着蜗牛上高速",
          time:"2009-11-14 12:22",
          content:"这是一条跟进记录，今天联系了这个用户"
        },
        {
          url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          nickName:"骑着蜗牛上高速",
          time:"2009-11-15 12:25",
          content:"但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度，从而使得他由被动接受信息直接转型为主动了解信息"
        }
      ],
      genjin_content:"",//跟进内容
      //红包弹框金额
      redPacketForm: {
        minMoney: "",
        count: ""
      }
    };
  },
  created(){
    this.get_detail()
    if (this.key==2) {
      this.blacklist="移除黑名单"
    }
    console.log(this.key);
  },
  methods: {
    //编辑
    editeUser() {
      this.$router.push({
        path: "AddUser",
        query:{info:this.user_detail}
      });
    },
    //加入黑名单
    addBlackList(v) {
      console.log(v);
      if (v==1) {
        confirm({
        icon: "exclamation-circle",
        title: "确定要将该用户添加到黑名单吗?",
        content: "加入黑名单后，该用户的账号将不能在本平台所有的端登录。",
        onOk:()=> {
          this.key=2
          this.blacklist="移除黑名单"
        }
      });
      }else{
        confirm({
        icon: "exclamation-circle",
        title: "确定要将该用户移除黑名单吗?",
        content: "移除黑名单后，该用户的账号可以在本平台所有的端登录。",
        onOk:()=> {
          this.key=1
          this.blacklist="加入黑名单"
        }
      })
     }; 
    },
    //移除用户
    remove() {
      confirm({
        icon: "close-circle",
        title: "确定要删除该客户吗?",
        content: "删除后，该用户在平台的所有数据都将清空，且无法恢复",
        onOk:()=> {
          console.log("OK");
        }
      });
    },
    //红包弹窗
    openRedPacket() {
      this.isShow = true;
    },
    //点击确定后执行
    handleOk(e) {
      setTimeout(() => {
        this.isShow = false;
      }, 100);
    },
    
    //选项卡
    callback(index) {
      this.num = index;
    },
    //得到详情
    get_detail(){
      this.user_detail=this.$route.query.info;
    },
      //添加跟进
    add_genjin(){
      this.isShow1=true
      this.genjin_content=""
    },
    //添加跟进内容后确定
    handleOk1(){
        console.log(this.genjin_content);
        
        if ( this.genjin_content=="") {
          return this.err_msg="内容不能为空！"
        }else{
          this.err_msg=""
          this.gjCon.push({
          url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          nickName:"骑着蜗牛上高速",
          time:this.dateTime(),
          content:this.genjin_content
          })
          this.isShow1 = false;
        }
        
        // console.log(this.genjin_content);
    },
    dateTime(){
          let newDate = new Date()
          let year   = newDate.getFullYear();
          let month  = newDate.getMonth()+1;
          let day    = newDate.getDate();
          let hour   = newDate.getHours(); 
          let minute = newDate.getMinutes(); 
          let second = newDate.getSeconds(); 
          return year+"-"+month+"-"+day+" "+hour+":"+minute
      }
  }
};
</script>
<style>
  .ant-table-column-title {
  font-size: 15px;
  font-weight: 800;
  color: rgba(48, 49, 51, 1);
}
.ant-form-item-label {
  text-align: left;
  width: 75px;
}
.ant-spin-nested-loading {
  padding-bottom: 36px;
}
.ant-tabs-nav .ant-tabs-tab-active {
    color: #1890ff;
    font-weight: 800;
}
</style>
<style lang="less" scoped>
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
        // padding-bottom: 100px;
        .edit {
          width: 25px;
          height: 17px;
          font-size: 12px;
          color: #2b75ed;
          cursor:pointer
        }
        .user_title {
          font-size: 14px;
          font-weight: 500;
          color: rgba(48, 49, 51, 1);
          display: inline-block;
          text-align: center;
          border-left: 3px solid #2b75edff;
          padding-left: 15px;
          margin-right: 20px;
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
            flex-direction: column;
            .user_name_title {
              font-size: 14px;
              font-weight: 800;
              color: rgba(48, 49, 51, 1);
              padding-left: 15px;
              padding-bottom: 5px;
            }
            .user_number {
              color: #909399;
              font-size: 12px;
              padding-left: 15px;
            }
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
        .btns{
          background:rgba(100,101,102,1);
          border: 1px solid rgba(100,101,102,1);
          color: #fff;
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
        font-size: 14px;
        color: rgba(144, 147, 153, 1);
        .user_details {
          font-size: 14px;
          height: 20px;
          margin-left: 23px;
          font-weight: 400;
          color: rgb(32, 33, 34);
        }
      }
    }
    
  }
  .br {
    height: 24px;
    width: 120%;
    margin-left: -50px;
    background-color: #f5f7faff;
  }
  .footer {
    height: 100%;
    padding-bottom: 50px;
    .tabs_tit{
        color:black;
        font-weight: 600;
    }
    .btns{
      background:rgba(100,101,102,1);
      border: 1px solid rgba(100,101,102,1);
      color: #fff;
    }
    .gj_record {
      .user {
        width: 100%; //345px      1152px
        //
        .edit {
          width: 25px;
          height: 17px;
          font-size: 12px;
          color: #2b75ed;
        }
        .user_title {
          font-size: 14px;
          font-weight: 800;
          color: rgba(48, 49, 51, 1);
          display: inline-block;
          text-align: center;
          border-left: 3px solid #2b75edff;
          padding-left: 15px;
          // margin-right: 20px;
        }
        .f_content {
          width: 100%;
          padding: 12px 16px;
          background: rgba(245, 247, 250, 1);
          border-radius: 4px;
          color: #303133;
          font-size: 12px;
          margin: 10px 0 24px 60px;
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
            flex-direction: column;
            .user_name_title {
              font-size: 14px;
              font-weight: 800;
              color: rgba(48, 49, 51, 1);
              padding-left: 15px;
              padding-bottom: 5px;
            }
            .user_time {
              color: rgba(144, 147, 153, 1);
              font-size: 12px;
              padding-left: 15px;
            }
          }
        }
      }
    }
    .redbeg{
      padding-bottom: 100px;
    }
    .balance_money{
      padding-bottom: 70px;
      }
    .study_jilu {
      .study_edail {
        display: flex;
        background-color: #f5f7faff;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        span {
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: rgba(48, 49, 51, 1);
        }
      }
    }
    .footer_top {
      display: flex;
      .selectTap {
        line-height: 400%;
        margin-right: 2%;
      }
    }
  }
  /deep/.ant-table-row-cell-break-word {
    height: 60px;

    img {
      width: 90px;
      height: 60px;
      display: block;
      float: left;
    }
    .kecheng_title {
      display: inline-block;
      width: 114px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(48, 49, 51, 1);
      margin-left: 12px;
    }
    
  }
}
</style>