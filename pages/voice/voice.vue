<template>
    <view class="container">
        <!-- 页面标题 -->
        <view class="page-header">
            <view class="header-title">声音克隆</view>
            <!-- <view class="refresh-btn" @click="refreshPage">
                <text class="refresh-icon">🔄</text>
                <text class="refresh-text">刷新</text>
            </view> -->
        </view>
        
        <!-- 我的声音 -->
        <view class="section">
            <view class="section-header">
                <text class="section-title">我的声音</text>
                <text class="section-subtitle">用于文本驱动</text>
            </view>
            
            <view class="my-voice-card" @click="addVoice">
                <view class="voice-icon">
                    <text class="icon">🎙️</text>
                </view>
                <view class="voice-info">
                    <text class="voice-title">打造您的专属声音模型</text>
                    <text class="voice-subtitle">上传音频自动克隆</text>
                </view>
            </view>
        </view>
        
        <!-- 场景音库 -->
        <view class="section">
            <view class="section-header">
                <text class="section-title">场景音库</text>
                <text class="section-subtitle">用于文本驱动</text>
            </view>
            
            <view class="voice-grid">
                <view class="voice-item" v-for="(voice, index) in voiceList" :key="index" @click="selectVoice(voice)">
                    <view class="voice-avatar">
                        <image :src="voice.avatar" class="avatar-image" mode="aspectFill"></image>
                    </view>
                    <view class="voice-details">
                        <text class="voice-name">{{voice.name}}</text>
                        <text class="voice-tag">{{voice.tag}}</text>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 悬浮按钮 -->
        <!-- <view class="fab-button" @click="addVoice">
            <view class="fab-icon">
                <text class="fab-text">🎙️</text>
            </view>
            <text class="fab-label">添加克隆</text>
        </view> -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                voiceList: [
                    {
                        id: 1,
                        name: '暖心学姐',
                        tag: '标签1',
                        avatar: '/static/avatar1.png',
                        type: 'female'
                    },
                    {
                        id: 2,
                        name: '正直青年',
                        tag: '标签1',
                        avatar: '/static/avatar2.png',
                        type: 'male'
                    },
                    {
                        id: 3,
                        name: '率真小伙',
                        tag: '标签1',
                        avatar: '/static/avatar3.png',
                        type: 'male'
                    },
                    {
                        id: 4,
                        name: '清澈样样',
                        tag: '标签1',
                        avatar: '/static/avatar4.png',
                        type: 'female'
                    },
                    {
                        id: 5,
                        name: '开朗姐姐',
                        tag: '标签1',
                        avatar: '/static/avatar5.png',
                        type: 'female'
                    },
                    {
                        id: 6,
                        name: '甜美悦说',
                        tag: '标签1',
                        avatar: '/static/avatar6.png',
                        type: 'female'
                    },
                    {
                        id: 7,
                        name: '美丽温柔女声',
                        tag: '标签1',
                        avatar: '/static/avatar7.png',
                        type: 'female'
                    },
                    {
                        id: 8,
                        name: '知性女声',
                        tag: '标签1',
                        avatar: '/static/avatar8.png',
                        type: 'female'
                    },
                    {
                        id: 9,
                        name: '清爽男大',
                        tag: '标签1',
                        avatar: '/static/avatar9.png',
                        type: 'male'
                    },
                    {
                        id: 10,
                        name: '渊博小叔',
                        tag: '标签1',
                        avatar: '/static/avatar10.png',
                        type: 'male'
                    },
                    {
                        id: 11,
                        name: '清新女声',
                        tag: '标签1',
                        avatar: '/static/avatar11.png',
                        type: 'female'
                    },
                    {
                        id: 12,
                        name: '灿灿',
                        tag: '标签1',
                        avatar: '/static/avatar12.png',
                        type: 'female'
                    }
                ]
            }
        },
        onLoad() {
            this.loadVoiceList();
        },
        methods: {
            refreshPage() {
                uni.showLoading({
                    title: '刷新中...'
                });
                setTimeout(() => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '刷新成功',
                        icon: 'success'
                    });
                }, 1000);
            },
            
            createVoice() {
                uni.showModal({
                    title: '创建声音模型',
                    content: '请上传您的音频文件进行声音克隆',
                    success: (res) => {
                        if (res.confirm) {
                            uni.chooseFile({
                                count: 1,
                                type: 'custom',
                                extension: ['.mp3', '.wav', '.m4a'],
                                success: (res) => {
                                    uni.showToast({
                                        title: '文件上传成功',
                                        icon: 'success'
                                    });
                                }
                            });
                        }
                    }
                });
            },
            
            selectVoice(voice) {
                uni.showToast({
                    title: `选择了 ${voice.name}`,
                    icon: 'none'
                });
            },
            
            addVoice() {
                uni.showActionSheet({
                    itemList: ['录制新声音', '上传音频文件'],
                    success: (res) => {
                        switch(res.tapIndex) {
                            case 0:
                                this.recordVoice();
                                break;
                            case 1:
                                this.uploadVoice();
                                break;
                            // case 2:
                            //     this.selectFromLibrary();
                            //     break;
                        }
                    }
                });
            },
            
            recordVoice() {
                uni.showToast({
                    title: '开始录制',
                    icon: 'none'
                });
            },
            
            uploadVoice() {
                uni.chooseFile({
                    count: 1,
                    type: 'custom',
                    extension: ['.mp3', '.wav', '.m4a'],
                    success: (res) => {
                        uni.showToast({
                            title: '上传成功',
                            icon: 'success'
                        });
                    }
                });
            },
            
            selectFromLibrary() {
                uni.showToast({
                    title: '打开音库',
                    icon: 'none'
                });
            },
            
            loadVoiceList() {
                // 模拟加载数据
                console.log('加载声音列表');
            }
        }
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background-color: #f5f5f5;
        padding: 20rpx;
        padding-bottom: 140rpx;
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 4rpx solid #6200EA;
        margin-bottom: 40rpx;
    }
    
    .header-title {
        font-size: 40rpx;
        font-weight: bold;
        color: #333;
        padding-left: 20rpx;
    }
    
    .refresh-btn {
        display: flex;
        align-items: center;
        background-color: #6200EA;
        color: white;
        border-radius: 25rpx;
        padding: 15rpx 25rpx;
        font-size: 28rpx;
    }
    
    .refresh-icon {
        margin-right: 10rpx;
        font-size: 24rpx;
    }
    
    .refresh-text {
        font-size: 28rpx;
    }
    
    .section {
        margin-bottom: 60rpx;
    }
    
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 30rpx;
    }
    
    .section-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
    }
    
    .section-subtitle {
        font-size: 28rpx;
        color: #999;
    }
    
    .my-voice-card {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 20rpx;
        padding: 40rpx;
        border: 2rpx dashed #6200EA;
        margin-bottom: 40rpx;
    }
    
    .voice-icon {
        width: 120rpx;
        height: 120rpx;
        background: linear-gradient(135deg, #6200EA, #9C27B0);
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30rpx;
    }
    
    .icon {
        font-size: 60rpx;
        color: white;
    }
    
    .voice-info {
        flex: 1;
    }
    
    .voice-title {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
    }
    
    .voice-subtitle {
        font-size: 28rpx;
        color: #666;
    }
    
    .voice-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20rpx;
    }
    
    .voice-item {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 20rpx;
        padding: 30rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
        transition: transform 0.2s;
    }
    
    .voice-item:active {
        transform: scale(0.98);
    }
    
    .voice-avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20rpx;
        background-color: #f0f0f0;
    }
    
    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .voice-details {
        flex: 1;
    }
    
    .voice-name {
        display: block;
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 8rpx;
    }
    
    .voice-tag {
        font-size: 24rpx;
        color: #999;
        background-color: #f0f0f0;
        padding: 4rpx 12rpx;
        border-radius: 12rpx;
    }
    
    .fab-button {
        position: fixed;
        bottom: 140rpx;
        right: 40rpx;
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background: linear-gradient(135deg, #6200EA, #9C27B0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8rpx 25rpx rgba(98, 0, 234, 0.3);
        z-index: 100;
    }
    
    .fab-icon {
        margin-bottom: 5rpx;
    }
    
    .fab-text {
        font-size: 40rpx;
        color: white;
    }
    
    .fab-label {
        font-size: 20rpx;
        color: white;
        font-weight: bold;
    }
</style>