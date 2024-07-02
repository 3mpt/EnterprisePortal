<template>
  <div>
    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginFormRef"
        label-width="70px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const handleLogin = () => {
  localStorage.setItem('token', '123');
  console.log('login');
};
// 配置particles
const options = {
  background: {
    color: {
      value: '#0d47a1',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
const loginForm = reactive({
  username: '',
  password: '',
});
const loginFormRef = ref(null);
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符' },
  ],
});
const router = useRouter();
const submitForm = () => {
  // 1.表单验证
  loginFormRef.value.validate(async (valid) => {
    console.log(valid);
    if (valid) {
      console.log(loginForm);
      localStorage.setItem('token', '123456');
      router.push('/');
    }
  });
};
</script>
<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }

  .loginform {
    margin-top: 20px;
  }
}

/* vue中的深度选择能匹配到对应的id */
::v-deep .el-form-item__label {
  color: white;
}
</style>
