<template>
  <div class="loginWrapper">
    <h1 class="title">
      <el-image class="logo" src="../../src/assets/img/logo.png"></el-image>
      {{ setting.systemName }}
    </h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="loginForm"
    >
      <h2 class="font-normal">
        <el-image class="logo" src="../../src/assets/img/logo.png"></el-image>
        {{ setting.systemName }}
      </h2>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="17">
          <el-form-item prop="code">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item><el-image :src="codeUrl"></el-image></el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button class="block" type="primary" @click="submitForm()"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getCaptchaImage, getInfo, gotoLogin } from "@/api/login";
import { CodeData } from "@/type/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import setting from "@/setting.config";

interface State {
  ruleForm: {
    username: string;
    password: string;
    code: string;
  };
  rules: object;
  codeUrl: string | undefined;
  ruleFormRef: any;
  uuid: string | undefined;
  setting: object;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive<State>({
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "change",
          },
        ],
      },
      codeUrl: "",
      ruleFormRef: null,
      uuid: "",
      setting,
    });
    const submitForm = () => {
      state.ruleFormRef.validate(async (valid: boolean) => {
        if (valid) {
          const { token } = await gotoLogin({
            ...state.ruleForm,
            uuid: state.uuid,
          });
          if (token) {
            localStorage.setItem("token", token);
            ElMessage.success("登陆成功!");
            await getInfo();
            router.replace("/");
          }
        }
        setTimeout(() => {
          getCaptchaImageFun();
        }, 10);
      });
    };

    const getCaptchaImageFun = async () => {
      const { img, uuid }: CodeData = await getCaptchaImage();
      state.codeUrl = "data:image/jpg;base64," + img;
      state.uuid = uuid;
    };

    onMounted(() => {
      getCaptchaImageFun();
    });

    return {
      ...toRefs(state),
      submitForm,
    };
  },
});
</script>
<style scoped lang="scss">
.loginWrapper {
  background-image: url("../../assets/img/loginbg.jpeg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position-y: 50%;
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;

  .logo {
    width: 34px;
    vertical-align: middle;
  }

  .title {
    position: absolute;
    top: 0;
    left: 55px;
    letter-spacing: 4.4px;
    font-weight: normal;
  }

  .loginForm {
    padding: 50px;
    border-radius: 6px;
    box-shadow: 3px 3px 3px rgba(117, 162, 202, 35%);
    border: 2px solid rgba(17, 79, 135, 67%);
    background-color: #fff;
    width: 380px;
  }

  .block {
    width: 100%;
  }
}
</style>
