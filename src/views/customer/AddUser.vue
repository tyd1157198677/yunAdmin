<template>
  <div class="AddEmployees">
    <div class="form">
      <p class="title">用户资料</p>
      <a-form-model
        :model="ruleForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
        <!-- prop属性值为表单验证规则rules里的绑定 -->
        <!-- 账号 -->
        <a-form-model-item label="账号" prop="account" :colon="false" ref="name">
          <!-- <label for="psw">账号</label> -->
          <a-input v-model.trim="ruleForm.account" type="text" />
        </a-form-model-item>
        <!-- 姓名 -->
        <a-form-model-item label="姓名" prop="name" ref="name" :colon="false">
          <a-input v-model.trim="ruleForm.name" type="text" />
        </a-form-model-item>
        <!-- 性别 -->
        <a-form-model-item label="性别" :colon="false">
          <a-radio-group v-model.trim="ruleForm.resource">
            <a-radio value="1" style="margin-right:50px">男</a-radio>
            <a-radio value="2">女</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <!-- 上传头像 -->
        <a-form-model-item has-feedback label="头像" :colon="false">
          <div class="upload">
            <a-upload
              class="upload_btn"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <a-button class="btn">上传</a-button>
              <span class="upload_title">建议尺寸120*120px，JPG、PNG、JPEG格式，图片小于3M</span>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>
        <!-- 特权 -->
        <a-form-model-item label="特权" :colon="false">
          <a-switch v-model="ruleForm.tequan" />
        </a-form-model-item>
        <!-- 联系方式 -->
        <p class="title">联系方式</p>
        <a-form-model-item label="手机" :colon="false">
          <a-input v-model.trim="ruleForm.phone" type="tel"/>
        </a-form-model-item>
        <a-form-model-item label="微信" :colon="false">
          <a-input v-model.trim="ruleForm.weixin" />
        </a-form-model-item>
        <a-form-model-item label="邮箱" :colon="false">
          <a-input v-model.trim="ruleForm.email" />
        </a-form-model-item>
        <!-- 公司资料 -->
        <p class="title">公司资料</p>
        <!-- <a-form-model-item has-feedback label="行业" prop="role" :colon="false"> -->
        <a-form-model-item label="行业" :colon="false">
          <a-cascader
            style="margin-top: 0px"
            :options="options"
             v-model.trim="ruleForm.hangye" 
            @change="onChange"
            placeholder="请选择行业"
          >
            <a-icon type="caret-down" slot="suffixIcon" />
          </a-cascader>
        </a-form-model-item>
        <a-form-model-item label="公司" :colon="false">
          <a-input v-model="ruleForm.company" type="textarea" style="resize:none" />
        </a-form-model-item>
        <a-form-model-item label="职位" :colon="false">
          <a-input v-model="ruleForm.job" />
        </a-form-model-item>
        <a-form-model-item label="地区" :colon="false">
          <a-cascader
            style="margin-top: 0px"
            :options="options1"
             v-model.trim="ruleForm.diqu" 
            @change="onChange1"
            placeholder="请选择地区"
          >
            <a-icon type="caret-down" slot="suffixIcon" />
          </a-cascader>
        </a-form-model-item>
        <div class="beizhu">
          <p class="title">其他信息</p>
          <a-form-model-item label="备注" :colon="false">
            <a-input
              v-model="ruleForm.beizhu"
              type="textarea"
              style="resize:none"
              placeholder="请输入..."
            />
          </a-form-model-item>
        </div>
        <!-- 提交栏 -->
      </a-form-model>
    </div>
    <div class="sub">
      <a-button class="qu_xiao" @click="quxiao">取消</a-button>
      <a-button type="primary" @click="sive">保存</a-button>
    </div>
  </div>
</template>
<script>
import { FormModel, Upload } from "ant-design-vue";
import { validator } from "@/antUI/module.js";
import Submit from "@/components/Submit";
import area from "../../../public/area";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  components: {
    Submit,
    AUpload: Upload
  },
  data() {
    //验证器on
    //账号校验器
    let validateAccount = validator({
      reg: /[1-9]/,
      isNull: "账号不能为空",
      formatErr: "账号格式错误"
    });
    //姓名校验器
    let validateName = validator({
      reg: /[\u4e00-\u9fa5_a-zA-Z]/,
      isNull: "姓名不能为空",
      formatErr: "名字必须为中文"
    });
    //验证器off
    return {
      previewVisible: false,
      previewImage: "",
      
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: require("@/assets/img/head_upload@2x.png")
        }
      ],
      ruleForm: {
        account: "", //账号
        name: "", //姓名
        resource: "1", //性别
        url: require("@/assets/img/head_upload@2x.png"),
        tequan: true,
        phone: "",
        weixin: "",
        email: "",
        hangye: [],
        company: "",
        job: "",
        diqu: [],
        beizhu: ""
      },
      //表单验证规则
      rules: {
        account: [
          { validator: validateAccount, required: true, trigger: "blur" },
          { max: 11, message: "账号长度为11位数", trigger: "blur" }
        ],
        // role: [{ required: true, message: "请选择", trigger: "blur" }],
        name: [
          {
            validator: validateName,
            required: true,
            whitespace: true,
            trigger: "blur"
          },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ]
      },
      //表单布局
      labelCol: { span: 2 },
      wrapperCol: { span: 15 },
      //   地区选择
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing"
            }
          ]
        }
      ],
      options1: area,
    };
  },
  created(){
    // console.log(this.area);
  },
  methods: {
    //上传图片
    // uploadPic() {},
    //  handleChange(info) {
    //   if (info.file.status === 'uploading') {
    //     this.loading = true;
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     getBase64(info.file.originFileObj, imageUrl => {
    //       this.imageUrl = imageUrl;
    //       this.loading = false;
    //     });
    //   }
    // },
    // beforeUpload(file) {
    //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //   if (!isJpgOrPng) {
    //     this.$message.error('You can only upload JPG file!');
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     this.$message.error('Image must smaller than 2MB!');
    //   }
    //   return isJpgOrPng && isLt2M;
    // },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      // console.log(file.status);
      this.fileList = [file];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //行业选择
    onChange(value) {
      this.ruleForm.hangye=value
      console.log(value);
    },
    //地区选择
    onChange1(value) {
      this.ruleForm.diqu=value
      console.log(value);
    },
    //保存
    sive() {
      console.log(this.ruleForm);
    },
    //取消
    quxiao() {
      // this.ruleForm=""
    }
  }
};
</script>
<style lang="less">
.ant-form-item-label {
  margin: 0 20px;
}
</style>
<style lang="less" socped>
.AddEmployees {
  width: 100%;
  height: 100%;
  //   padding: 1.2% 1.2% 0% 0;
  background-color: #fff;
  .form {
    width: 70%;
    .title {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(48, 49, 51, 1);
      border-left: 3px solid #2b75edff;
    }
    .upload {
      display: flex;
      width: 100%;
      padding-top: 10px;
      .ant-upload {
        display: table-cell;
        width: 100%;
        height: 100%;
        text-align: left;
        margin-left: 10px;
        padding-top: 4px;
        .ant-upload-list-picture-card-container {
          height: 120px;
          width: 120px;
        }
      }
      .ant-upload-list-picture-card .ant-upload-list-item {
        position: relative;
        height: 104px;
        width: 104px;
        padding: 0px;
        border: 0px solid #d9d9d9;
        border-radius: 4px;
      }
      .ant-upload.ant-upload-select-picture-card {
        width: 70%;
        height: 150px;
        margin-right: 8px;
        margin-bottom: 0px;
        vertical-align: top;
        background-color: #fff;
        border: 0px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
      }
      .btn {
        display: block;
        border: 0;
        width: 59px;
        height: 32px;
        background: rgba(234, 235, 236, 1);
        border-radius: 4px;
        margin-top: -5px;
      }
      .upload_title {
        display: block;
        margin-top: 30px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(144, 147, 153, 1);
      }
    }
    .beizhu {
      margin-bottom: 84px;
    }
  }
  .sub {
    margin: 20px 0;
    border-top: 1px solid #efefef;
    margin-left: -30px;
    padding-top: 30px;
    width: 120%;
    text-align: center;
    .qu_xiao {
      margin-right: 50px;
    }
  }
}
</style>