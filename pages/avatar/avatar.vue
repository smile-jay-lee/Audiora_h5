<template>
    <view class="container">
        <!-- 上传组件 -->
        <upload-component
            v-if="showUpload"
            :config="uploadConfig"
            :accept="['image', 'video']"
            :max-size="300"
            @back="closeUpload"
            @upload-success="handleUploadSuccess"
        />
        
        <!-- 形象库主界面 -->
        <view v-else>
            <!-- 页面标题 -->
            <view class="page-header">
                <view class="header-title">形象库</view>
            </view>
            
            <!-- 形象列表 -->
            <view class="avatar-grid">
                <view class="avatar-item" v-for="(avatar, index) in avatarList" :key="index">
                    <view class="avatar-preview">
                        <image :src="avatar.image" class="avatar-image" mode="aspectFill"></image>
                        <view class="avatar-overlay">
                            <view class="play-button" @click="playAvatar(avatar)">
                                <text class="play-icon">▶</text>
                            </view>
                            <view class="avatar-number">{{index + 1}}</view>
                        </view>
                        <view class="avatar-actions">
                            <view class="action-delete" @click="deleteAvatar(index)">
                                <text class="action-icon">🗑️</text>
                            </view>
                        </view>
                    </view>
                    <view class="avatar-info">
                        <text class="avatar-time">{{avatar.createTime}}</text>
                    </view>
                </view>
            </view>
            
            <!-- 创建按钮 -->
            <view class="create-button" @click="createAvatar">
                <view class="create-icon">👤</view>
                <text class="create-text">创建形象</text>
            </view>
        </view>
    </view>
</template>

<script>
import UploadComponent from '@/components/upload.vue'

    export default {
        components: {
            UploadComponent
        },
        data() {
            return {
                showUpload: false,
                uploadConfig: {
                    title: '上传形象',
                    nameLabel: '形象名称',
                    namePlaceholder: '请输入形象名称',
                    configTitle: '形象配置',
                    uploadMainText: '创建新形象',
                    uploadSubText: '点此区域上传',
                    confirmText: '确认上传',
                    requirements: {
                        size: '竖屏9:16',
                        format: 'MP4',
                        quality: '1080P',
                        duration: '不限',
                        frameRate: '不限',
                        fileSize: '不超过300M'
                    },
                    tips: [
                        '确保面部特征没有被遮挡，并努力让面部清晰可见',
                        '不要使用有多人的视频',
                        '嘴巴要完整露出，避免遮挡',
                        '人脸不要太大，确保整张人脸都在屏幕区域内，人脸不要出屏幕'
                    ]
                },
                avatarList: [
                    {
                        id: 1,
                        image: '/static/ai_person_background.png',
                        createTime: '2023-06-12 19:35:32'
                    },
                    {
                        id: 2,
                        image: '/static/ai_person_background.png',
                        createTime: '2023-06-11 15:20:15'
                    },
                    {
                        id: 3,
                        image: '/static/ai_person_background.png',
                        createTime: '2023-06-10 10:45:30'
                    }
                ]
            }
        },
        onLoad() {
            this.loadAvatarList();
        },
        methods: {
            loadAvatarList() {
                // 加载形象列表
                console.log('加载形象列表');
            },
            playAvatar(avatar) {
                uni.showToast({
                    title: '播放形象',
                    icon: 'none'
                });
            },
            deleteAvatar(index) {
                uni.showModal({
                    title: '删除确认',
                    content: '确定要删除这个形象吗？',
                    success: (res) => {
                        if (res.confirm) {
                            this.avatarList.splice(index, 1);
                            uni.showToast({
                                title: '删除成功',
                                icon: 'success'
                            });
                        }
                    }
                });
            },
            createAvatar() {
                this.showUpload = true
            },
            closeUpload() {
                this.showUpload = false
            },
            handleUploadSuccess(data) {
                console.log('形象上传成功:', data)
                
                // 添加新形象到列表
                const newAvatar = {
                    id: Date.now(),
                    image: data.url,
                    name: data.name,
                    createTime: new Date().toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).replace(/\//g, '-')
                }
                
                this.avatarList.unshift(newAvatar)
                
                // 关闭上传界面
                this.closeUpload()
                
                uni.showToast({
                    title: '形象创建成功！',
                    icon: 'success'
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        min-height: 100vh;
        background-color: #f5f5f5;
        padding: 20rpx;
    }
    
    .page-header {
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
    
    .avatar-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20rpx;
        padding-bottom: 120rpx;
    }
    
    .avatar-item {
        background-color: white;
        border-radius: 20rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }
    
    .avatar-preview {
        position: relative;
        height: 400rpx;
        background-color: #f0f0f0;
    }
    
    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .avatar-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .play-button {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
    }
    
    .play-icon {
        font-size: 48rpx;
        color: #333;
        margin-left: 8rpx;
    }
    
    .avatar-number {
        position: absolute;
        bottom: 20rpx;
        left: 20rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .avatar-actions {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
    }
    
    .action-delete {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
    }
    
    .action-icon {
        font-size: 40rpx;
    }
    
    .avatar-info {
        padding: 20rpx;
    }
    
    .avatar-time {
        font-size: 28rpx;
        color: #666;
    }
    
    .create-button {
        position: fixed;
        bottom: 120rpx;
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
    
    .create-icon {
        font-size: 40rpx;
        color: white;
        margin-bottom: 5rpx;
    }
    
    .create-text {
        font-size: 20rpx;
        color: white;
        font-weight: bold;
    }
</style>