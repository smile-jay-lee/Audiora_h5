<template>
  <view class="login-bg">
    <image class="login-bg-img"  mode="aspectFill"></image>
    <view class="login-mask">
      <view class="login-card">
        <view class="login-title">会员登录</view>
        <input class="login-input" type="text" placeholder="请输入账号" v-model="username" />
        <view class="login-input-pwd">
          <input class="login-input" :type="showPwd ? 'text' : 'password'" placeholder="请输入登录密码" v-model="password" />
          <view class="pwd-toggle" @click="showPwd = !showPwd">
            <uni-icons :type="showPwd ? 'eye' : 'eye-slash'" size="24" color="#bbb" />
          </view>
        </view>
        <button class="login-btn" @click="login">登录</button>
      </view>
    </view>
  </view>
</template>

<script>

import { request } from '@/utils/request.js';
export default {
  data() {
    return {
      username: '',
      password: '',
      showPwd: false
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        uni.showToast({ title: '请输入账号和密码', icon: 'none' })
        return
      }
      // 登录逻辑
      uni.showToast({ title: '登录中...' })
      try {
        const url = `/api/user/login?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;  const res = await request({
          url: url,
          method: 'POST'
        })
        // 隐藏加载提示
        uni.hideLoading()
        if (res.data && res.data.code === "200") {
          uni.showToast({ title: '登录成功', icon: 'success' })
          // 登录成功后的处理
          uni.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          uni.showToast({ title: '登录失败', icon: 'none' })
        }
      } catch (error) {
        uni.showToast({ title: '登录失败', icon: 'none' })
      }
    }
  }
}
</script>

<style scoped>
.login-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #eae6fa 0%, #bfc8f7 100%);
}

.login-bg-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  opacity: 0.7;
}

.login-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 90vw;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(98, 0, 234, 0.08);
  padding: 60px 32px 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  font-size: 32px;
  font-weight: bold;
  color: #222;
  margin-bottom: 40px;
  text-align: center;
}

.login-input {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #fff;
  border: none;
  outline: none;
  font-size: 18px;
  color: #333;
  margin-bottom: 24px;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(98, 0, 234, 0.04);
}

.login-input-pwd {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.pwd-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 3;
}

.login-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #9c7af0 0%, #6200ea 100%);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  margin-top: 16px;
  box-shadow: 0 4px 16px rgba(98, 0, 234, 0.12);
}
</style>
