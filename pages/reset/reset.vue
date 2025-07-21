<template>
  <view class="reverse-bg">
    <view class="reverse-mask">
      <view class="reverse-card">
        <view class="reverse-title">
          <view class="reverse-title-bar"></view>
          <text>修改密码</text>
        </view>
        <view class="reverse-form">
          <view class="reverse-label">*设置新密码</view>
          <view class="reverse-input-row">
            <input class="reverse-input" :type="showPwd1 ? 'text' : 'password'" v-model="oldPwd" placeholder="请输入原密码" />
            <view class="reverse-eye" @click="showPwd1 = !showPwd1">
              <uni-icons :type="showPwd1 ? 'eye' : 'eye-slash'" size="24" color="#bbb" />
            </view>
          </view>
          <!-- <view class="form">
            <uni-easyinput type="password" v-model="password" :passwordIcon="true" placeholder="请输入密码"
              :clearable="false" /> -->
          <!-- </view> -->
          <view class="reverse-label">*设置新密码</view>
          <view class="reverse-input-row">
            <input class="reverse-input" :type="showPwd2 ? 'text' : 'password'" v-model="newPwd" placeholder="请输入新密码" />
            <view class="reverse-eye" @click="showPwd2 = !showPwd2">
              <uni-icons :type="showPwd2 ? 'eye' : 'eye-slash'" size="24" color="#bbb" />
            </view>
          </view>
          <view class="reverse-label">*确认新密码</view>
          <view class="reverse-input-row">
            <input class="reverse-input" :type="showPwd3 ? 'text' : 'password'" v-model="confirmPwd"
              placeholder="请输入新密码" />
            <view class="reverse-eye" @click="showPwd3 = !showPwd3">
              <uni-icons :type="showPwd3 ? 'eye' : 'eye-slash'" size="24" color="#bbb" />
            </view>
          </view>
        </view>
        <button class="reverse-btn" @click="resetPwd">立即重置</button>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request.js'
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
export default {
  data() {
    return {
      userId: uni.getStorageSync('userId'),
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
      showPwd1: false,
      showPwd2: false,
      showPwd3: false,
      password: '',
      components: { uniEasyinput },
     }
  },
  methods: {
    async resetPwd() {
      if (!this.oldPwd || !this.newPwd || !this.confirmPwd) {
        uni.showToast({ title: '请填写完整信息', icon: 'none' })
        return
      }
      if (this.newPwd !== this.confirmPwd) {
        uni.showToast({ title: '两次新密码不一致', icon: 'none' })
        return
      }

      uni.showLoading({ title: '重置中...' })
      try {
        const url = '/api/user/changePassword?userId=' + encodeURIComponent(this.userId) +
          '&oldPassword=' + encodeURIComponent(this.oldPwd) +
          '&newPassword=' + encodeURIComponent(this.newPwd) +
          '&confirmPassword=' + encodeURIComponent(this.confirmPwd)
        const res = await request({
          url: url,
          method: 'PUT',
        })
        
        //这个页面停很久
        // uni.showToast({ title: `重置成功，用户ID：${this.userId}`, icon: 'success', duration: 200000 })
        console.log('返回的消息：', res.data)

        uni.hideLoading()
        if (res.data && res.data.code === "200") {
          uni.showToast({ title: res.data.data || '密码修改成功', icon: 'success' })
          uni.reLaunch({ url: '/pages/login/login' })
        } else {
          uni.showToast({ title: res.data.msg || '修改失败', icon: 'none' })
        }
      } catch (e) {
        uni.hideLoading()
        uni.showToast({ title: '网络错误', icon: 'none' })
      }
    }
  }
}
</script>

<style scoped>
.reverse-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #eae6fa 0%, #bfc8f7 100%);
}

.reverse-mask {
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

.reverse-card {
  width: 90vw;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(98, 0, 234, 0.08);
  padding: 48px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reverse-title {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 32px;
}

.reverse-title-bar {
  width: 6px;
  height: 28px;
  background: linear-gradient(90deg, #9c7af0 0%, #6200ea 100%);
  border-radius: 3px;
  margin-right: 12px;
}

.reverse-form {
  width: 100%;
  margin-bottom: 32px;
}

.reverse-label {
  font-size: 16px;
  color: #222;
  margin-bottom: 8px;
  font-weight: 500;
}

.reverse-input-row {
  width: 100%;
  position: relative;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}


.reverse-input {
  /* display: none; */
  width: 100%;
  height: 44px;
  border-radius: 12px;
  background: #fff;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(98, 0, 234, 0.04);
}

.reverse-eye {
  position: absolute;
  right: 12px;
  top: 10px;
  z-index: 3;
}

.reverse-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #9c7af0 0%, #6200ea 100%);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  margin-top: 8px;
  box-shadow: 0 4px 16px rgba(98, 0, 234, 0.12);
}
</style>
