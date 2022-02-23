<template>
  <div class="login-page">
    <el-form ref="loginForm" class="login-page__form" :model="loginForm" :rules="loginRules">
      <h3 class="login-page__title">流数据计算平台</h3>

      <el-form-item prop="username">
        <i class="el-icon-user tip-icon"></i>
        <el-input ref="username" v-model="loginForm.username" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已启动" manual placement="right">
        <el-form-item prop="password">
          <i class="el-icon-lock tip-icon"></i>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        type="primary"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import FormRules from '@/utils/form-rules'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [FormRules.required('请输入用户名', 'blur')],
        password: [FormRules.required('请输入密码', 'blur')]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-page {
  .el-input {
    display: inline-block;
    width: 85%;
    height: 47px;
    input {
      height: 47px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      -webkit-appearance: none;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    color: #454545;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-page {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: $bg;

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .login-page__title {
    position: relative;
    margin: 0px auto 40px auto;
    font-size: 26px;
    font-weight: bold;
    color: $light_gray;
    text-align: center;
  }
}
.show-pwd {
  position: absolute;
  top: 7px;
  right: 10px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}

.login-page__form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.tip-icon {
  margin-left: 16px;
  font-size: 24px;
  color: $dark_gray;
  vertical-align: middle;
}
</style>
