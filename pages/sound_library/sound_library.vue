<template>
	<view class="container">
		<!-- 页面标题 -->
		<view class="page-header">
			<view class="header-title">音频库</view>
			<view class="header-actions">
				<!-- <view class="upload-btn" @click="startRecording"> -->
				<view class="upload-btn" @click="uploadAudio">
                    <text class="upload-text">上传</text>
					<uni-icons type="cloud-upload" color="#ffffff" size="24"></uni-icons>
				</view>
			</view>
		</view>
		
		<!-- 筛选栏 -->
		<!-- <view class="filter-bar"> -->
			<!-- <view class="filter-item" :class="{active: currentFilter === 'all'}" @click="filterAudio('all')">
				<text class="filter-text">全部</text>
			</view> -->
			<!-- <view class="filter-item" :class="{active: currentFilter === 'voice'}" @click="filterAudio('voice')">
				<text class="filter-text">人声</text>
			</view>
			<view class="filter-item" :class="{active: currentFilter === 'music'}" @click="filterAudio('music')">
				<text class="filter-text">音乐</text>
			</view>
			<view class="filter-item" :class="{active: currentFilter === 'effect'}" @click="filterAudio('effect')">
				<text class="filter-text">音效</text>
			</view> -->
		<!-- </view> -->
		
		<!-- 音频列表 -->
		<view class="audio-list">
			<view class="audio-item" v-for="(audio, index) in filteredAudioList" :key="audio.id">
				<view class="audio-info">
					<view class="audio-cover">
						<image :src="audio.cover" class="cover-image" mode="aspectFill"></image>
						<view class="play-overlay" @click="playAudio(audio)">
							<u-icon v-if="!audio.playing" name="play-circle" color="#ffffff"  size="40" @click="playAudio"></u-icon>
							<u-icon v-else name="pause-circle" color="#ffffff" size="40" @click="pauseAudio"></u-icon>
						</view>
					</view>
					
					<view class="audio-details">
						<text class="audio-title">{{audio.title}}</text>
						<text class="audio-subtitle">{{audio.duration}} | {{audio.size}}</text>
						<text class="audio-date">{{audio.uploadDate}}</text>
						<!-- <view class="audio-tags">
							<text class="tag" :class="audio.type">{{audio.typeText}}</text>
						</view> -->
					</view>
				</view>
				
				<view class="audio-actions">
					<!-- <view class="action-btn download" @click="downloadAudio(audio)">
					   <uv-icon name="arrow-downward" color="#ffffff"></uv-icon>
					</view>
					<view class="action-btn edit" @click="editAudio(audio)">
						<uv-icon name="edit-pen" color="#ffffff"></uv-icon>
					</view> -->
					<view class="action-btn delete" @click="deleteAudio(audio, index)">
						<!-- <text class="action-icon">🗑️</text> -->
                         <uv-icon name="trash" color="#ffffff"></uv-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredAudioList.length === 0">
			<view class="empty-icon">🎵</view>
			<text class="empty-title">暂无音频文件</text>
			<text class="empty-subtitle">点击上传按钮添加您的音频</text>
			<view class="empty-btn" @click="uploadAudio">
				<text class="empty-btn-text">立即上传</text>
			</view>
		</view>
		
		<!-- 悬浮录音按钮 -->
		<!-- <view class="fab-button" @click="recordAudio">
			<view class="fab-icon">
				<text class="fab-text">🎙️</text>
			</view>
			<text class="fab-label">录音</text>
		</view> -->
		
		<!-- 上传进度弹窗 -->
		<view class="upload-modal" v-if="showUploadModal">
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">上传音频</text>
					<view class="close-btn" @click="closeUploadModal">
						<text class="close-icon">✕</text>
					</view>
				</view>
				<view class="upload-progress">
					<view class="progress-bar">
						<view class="progress-fill" :style="{width: uploadProgress + '%'}"></view>
					</view>
					<text class="progress-text">{{uploadProgress}}%</text>
				</view>
				<text class="upload-status">{{uploadStatus}}</text>
			</view>
		</view>
	</view>
</template>

<script>

import UniIcons from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue';

	export default {
		data() {
			return {
				currentFilter: 'all',
				showUploadModal: false,
				uploadProgress: 0,
				uploadStatus: '准备上传...',
				audioList: [
					{
						id: 1,
						title: '女声朗读-新闻播报',
						duration: '02:45',
						size: '2.1MB',
						uploadDate: '2024-01-15',
						type: 'voice',
						typeText: '人声',
						cover: '/static/audio_cover1.png',
						playing: false
					},
					{
						id: 2,
						title: '背景音乐-轻快节奏',
						duration: '03:20',
						size: '3.8MB',
						uploadDate: '2024-01-14',
						type: 'music',
						typeText: '音乐',
						cover: '/static/audio_cover2.png',
						playing: false
					},
					{
						id: 3,
						title: '提示音效-成功',
						duration: '00:03',
						size: '125KB',
						uploadDate: '2024-01-13',
						type: 'effect',
						typeText: '音效',
						cover: '/static/audio_cover3.png',
						playing: false
					},
					{
						id: 4,
						title: '男声对话-客服语音',
						duration: '01:30',
						size: '1.5MB',
						uploadDate: '2024-01-12',
						type: 'voice',
						typeText: '人声',
						cover: '/static/audio_cover4.png',
						playing: false
					},
					{
						id: 5,
						title: '环境音效-办公室',
						duration: '10:00',
						size: '8.9MB',
						uploadDate: '2024-01-10',
						type: 'effect',
						typeText: '音效',
						cover: '/static/audio_cover5.png',
						playing: false
					}
				]
			}
		},
		computed: {
			filteredAudioList() {
				if (this.currentFilter === 'all') {
					return this.audioList;
				}
				return this.audioList.filter(audio => audio.type === this.currentFilter);
			}
		},
		onLoad() {
			this.loadAudioList();
		},
		methods: {
			loadAudioList() {
				// 加载音频列表
				console.log('加载音频列表');
			},
			
			filterAudio(type) {
				this.currentFilter = type;
			},
			
			uploadAudio() {
    // 显示选择操作的弹窗
    uni.showActionSheet({
        itemList: ['选择本地文件', '选择聊天窗口中的音频', '开始录制'],
        success: (res) => {
            switch(res.tapIndex) {
                case 0:
                    this.chooseLocalFile();
                    break;
                case 1:
                    this.chooseChatAudio();
                    break;
                case 2:
                    this.startRecording();
                    break;
            }
        },
        fail: (err) => {
            console.log('用户取消选择');
        }
    });
},

chooseLocalFile() {
    // 在小程序中使用 chooseMedia 选择本地文件
    uni.chooseMedia({
        count: 5,
        mediaType: ['video', 'audio'],
        sourceType: ['album', 'camera'], // 从相册或拍摄
        success: (res) => {
            this.showUploadModal = true;
            // 注意：tempFiles 替代 tempFilePaths
            this.simulateUpload(res.tempFiles.map(file => file.tempFilePath));
        },
        fail: (err) => {
            uni.showToast({
                title: '选择文件失败',
                icon: 'none'
            });
        }
    });
},

chooseChatAudio() {
    // 这里可以跳转到聊天记录页面或者显示聊天记录中的音频列表
    uni.showModal({
        title: '选择聊天音频',
        content: '即将跳转到聊天记录，选择音频文件',
        success: (res) => {
            if (res.confirm) {
                // 跳转到聊天记录页面
                uni.navigateTo({
                    url: '/pages/chat/chat?selectMode=audio'
                });
                
                // 或者显示聊天音频列表弹窗
                // this.showChatAudioModal = true;
            }
        }
    });
},

startRecording() {
    uni.showModal({
        title: '开始录制',
        content: '即将开始录制音频，请准备好麦克风',
        success: (res) => {
            if (res.confirm) {
                this.startAudioRecording();
            }
        }
    });
},

startAudioRecording() {
    // 获取录音管理器
    const recorderManager = uni.getRecorderManager();
    
    // 录音配置
    const options = {
        duration: 60000, // 录音时长，单位 ms，最大值 600000（10分钟）
        sampleRate: 16000, // 采样率
        numberOfChannels: 1, // 录音通道数
        encodeBitRate: 96000, // 编码码率
        format: 'mp3', // 音频格式
        frameSize: 50 // 指定帧大小，单位 KB
    };
    
    // 开始录音
    recorderManager.start(options);
    
    // 显示录音状态
    uni.showLoading({
        title: '录音中...',
        mask: true
    });
    
    // 监听录音开始
    recorderManager.onStart(() => {
        console.log('录音开始');
        uni.showToast({
            title: '录音开始',
            icon: 'none'
        });
    });
    
    // 监听录音结束
    recorderManager.onStop((res) => {
        console.log('录音结束', res);
        uni.hideLoading();
        
        // 显示录音结果
        uni.showModal({
            title: '录音完成',
            content: `录音时长: ${Math.floor(res.duration / 1000)}秒\n文件大小: ${(res.fileSize / 1024).toFixed(2)}KB`,
            confirmText: '保存',
            cancelText: '重录',
            success: (modalRes) => {
                if (modalRes.confirm) {
                    // 保存录音文件
                    this.saveRecordedAudio(res);
                } else {
                    // 重新录制
                    this.startAudioRecording();
                }
            }
        });
    });
    
    // 监听录音错误
    recorderManager.onError((err) => {
        console.error('录音错误:', err);
        uni.hideLoading();
        uni.showToast({
            title: '录音失败',
            icon: 'none'
        });
    });
    
    // 设置录音自动停止（可选）
    setTimeout(() => {
        recorderManager.stop();
    }, 60000); // 60秒后自动停止
},

saveRecordedAudio(recordResult) {
    // 显示上传进度
    this.showUploadModal = true;
    this.uploadStatus = '正在保存录音...';
    
    // 模拟保存过程
    this.simulateUpload([recordResult.tempFilePath]);
    
    // 添加录音信息到列表
    const newAudio = {
        id: Date.now(),
        title: `录音_${new Date().toLocaleTimeString()}`,
        duration: this.formatDuration(recordResult.duration),
        size: this.formatFileSize(recordResult.fileSize),
        uploadDate: new Date().toISOString().split('T')[0],
        type: 'voice',
        typeText: '人声',
        cover: '/static/default_audio_cover.png',
        playing: false,
        filePath: recordResult.tempFilePath
    };
    
    this.audioList.unshift(newAudio);
},

formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
},

formatFileSize(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
},

			closeUploadModal() {
				this.showUploadModal = false;
				this.uploadProgress = 0;
			},
			
			// recordAudio() {
			// 	uni.showActionSheet({
			// 		itemList: ['录制语音'],
			// 		success: (res) => {
			// 			switch(res.tapIndex) {
			// 				case 0:
			// 					this.startRecording('voice');
			// 					break;
							// case 1:
							// 	this.startRecording('effect');
							// 	break;
							// case 2:
							// 	this.startRecording('music');
			// 			}
			// 		}
			// 	});
			// },
			
			startRecording(type) {
				uni.showModal({
					title: '开始录音',
					content: '点击确定开始录制音频',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '录音开始',
								icon: 'none'
							});
							// 这里实现真实的录音功能
						}
					}
				});
			},
			
			playAudio(audio) {
				// 停止其他音频
				this.audioList.forEach(item => {
					if (item.id !== audio.id) {
						item.playing = false;
					}
				});
				
				// 切换当前音频播放状态
				audio.playing = !audio.playing;
				
				if (audio.playing) {
					uni.showToast({
						title: '开始播放',
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: '暂停播放',
						icon: 'none'
					});
				}
			},
			
			downloadAudio(audio) {
				uni.showLoading({
					title: '下载中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '下载完成',
						icon: 'success'
					});
				}, 2000);
			},
			
			editAudio(audio) {
			uni.showModal({
				title: '编辑音频',
				editable: true,
				placeholderText: '请输入新的音频标题', // 只放提示，不放旧标题
				showCancel: true,
				success: ({ confirm, content, value }) => {
				if (!confirm) return
				const newTitle = (content ?? value).trim()
				if (newTitle) {
					audio.title = newTitle
					uni.showToast({ title: '修改成功', icon: 'success' })
				}
				}
			})
			},

			deleteAudio(audio, index) {
				uni.showModal({
					title: '删除确认',
					content: `确定要删除"${audio.title}"吗？`,
					success: (res) => {
						if (res.confirm) {
							this.audioList.splice(this.audioList.indexOf(audio), 1);
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 140rpx;
	}
	
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		background-color: white;
		/* border-bottom: 1rpx solid #eee; */
	}
	
	.header-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
	}
	
	.header-actions {
		display: flex;
		gap: 20rpx;
	}
	
	.upload-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background:  #9c7af0;
		color: white;
		border-radius: 25rpx;
		padding: 15rpx 25rpx;
		font-size: 28rpx;
	}
	
	.upload-icon {
		margin-right: 10rpx;
		font-size: 24rpx;
	}
	
	.upload-text {
		font-size: 28rpx;
	}
	
	.filter-bar {
		display: flex;
		padding: 20rpx 30rpx;
		background-color: white;
		border-bottom: 1rpx solid #eee;
	}
	
	.filter-item {
		padding: 15rpx 30rpx;
		border-radius: 25rpx;
		margin-right: 20rpx;
		background-color: #f5f5f5;
		transition: all 0.3s;
	}
	
	.filter-item.active {
		background-color: #9c7af0;
	}
	
	.filter-item.active .filter-text {
		color: white;
	}
	
	.filter-text {
		font-size: 28rpx;
		color: #666;
	}
	
	.audio-list {
		padding: 20rpx;
	}
	
	.audio-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}
	
	.audio-info {
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.audio-cover {
		position: relative;
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
		overflow: hidden;
		margin-right: 30rpx;
		background-color: #f0f0f0;
	}
	
	.cover-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.play-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.play-icon,
	.pause-icon {
		color: white;
		font-size: 40rpx;
	}
	
	.audio-details {
		flex: 1;
	}
	
	.audio-title {
		display: block;
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.audio-subtitle {
		display: block;
		font-size: 24rpx;
		color: #666;
		margin-bottom: 8rpx;
	}
	
	.audio-date {
		display: block;
		font-size: 24rpx;
		color: #999;
		margin-bottom: 10rpx;
	}
	
	.audio-tags {
		display: flex;
		gap: 10rpx;
	}
	
	.tag {
		font-size: 22rpx;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
		color: white;
	}
	
	.tag.voice {
		background-color: #4CAF50;
	}
	
	.tag.music {
		background-color: #FF9800;
	}
	
	.tag.effect {
		background-color: #2196F3;
	}
	
	.audio-actions {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.action-btn {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
		transition: transform 0.2s;
	}
	
	.action-btn:active {
		transform: scale(0.95);
	}
	
	/* .action-btn.download {
		background-color: #9c7af0;
	}
	
	.action-btn.edit {
		background-color: #9c7af0;
	} */
	
	.action-btn.delete {
		background-color: #f55050;
	}
	
	.action-icon {
		font-size: 30rpx;
		color: white;
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 50rpx;
		text-align: center;
	}
	
	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 30rpx;
		opacity: 0.5;
	}
	
	.empty-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 15rpx;
	}
	
	.empty-subtitle {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 40rpx;
		line-height: 1.5;
	}
	
	.empty-btn {
		background: linear-gradient(135deg, #6200EA, #9C27B0);
		color: white;
		border-radius: 25rpx;
		padding: 20rpx 40rpx;
	}
	
	.empty-btn-text {
		font-size: 32rpx;
		color: white;
	}
	
	.fab-button {
		position: fixed;
		bottom: 140rpx;
		right: 40rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #FF5722, #FF8A65);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 25rpx rgba(255, 87, 34, 0.3);
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
	
	.upload-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	
	.modal-content {
		background-color: white;
		border-radius: 20rpx;
		padding: 40rpx;
		margin: 60rpx;
		min-width: 500rpx;
	}
	
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.modal-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
	
	.close-btn {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.close-icon {
		font-size: 32rpx;
		color: #666;
	}
	
	.upload-progress {
		margin-bottom: 20rpx;
	}
	
	.progress-bar {
		width: 100%;
		height: 20rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(135deg, #6200EA, #9C27B0);
		transition: width 0.3s;
	}
	
	.progress-text {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		display: block;
	}
	
	.upload-status {
		font-size: 26rpx;
		color: #999;
		text-align: center;
		display: block;
	}
</style>
