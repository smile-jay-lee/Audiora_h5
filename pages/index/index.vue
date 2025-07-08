<template>
	<view class="container">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="header-title">数字人平台</text>
			<view class="header-actions">
				<view class="action-btn">⋯</view>
				<view class="action-btn">—</view>
				<view class="action-btn">⊙</view>
			</view>
		</view>
		
		<!-- AI横幅 -->
		<view class="ai-banner">
			<view class="ai-banner-bg">
				<text class="ai-text">AI</text>
			</view>
			<view class="ai-indicator">
				<view class="indicator-dot active"></view>
				<view class="indicator-dot"></view>
				<view class="indicator-dot"></view>
			</view>
		</view>
		
		<!-- 功能模块 -->
		<view class="function-section">
			<view class="function-grid">
				<view class="function-item" @click="goToFunction('video')">
					<view class="function-icon video-icon">
						<text class="icon-emoji">🧍</text>
					</view>
					<text class="function-title">创建人物形象</text>
					<text class="function-subtitle">表情动作 / 作态还原</text>
				</view>
				
				<view class="function-item" @click="goToFunction('voice')">
					<view class="function-icon voice-icon">
						<text class="icon-emoji">🎙</text>
					</view>
					<text class="function-title">创建声音形象</text>
					<text class="function-subtitle">上传音频 / 克隆声音</text>
				</view>
				
				<view class="function-item" @click="goToFunction('scene')">
					<view class="function-icon scene-icon">
						<text class="icon-emoji">🎛</text>
					</view>
					<text class="function-title">素材处理</text>
					<text class="function-subtitle">人物素材和声音编辑</text>
				</view>
				
				<view class="function-item" @click="goToFunction('subtitle')">
					<view class="function-icon subtitle-icon">
						<text class="icon-emoji">🎬</text>
					</view>
					<text class="function-title">生成数字人</text>
					<text class="function-subtitle">选择声音配置字幕生成</text>
				</view>
			</view>
		</view>
		
		<!-- 内容生成区域 -->
		<view class="content-generation">
			<view class="section-title">📂 内容生成区域</view>
			<view class="video-preview">
				<view class="video-container">
					<image src="/static/video-preview.jpg" class="video-thumbnail" mode="aspectFill"></image>
					<view class="video-overlay">
						<view class="play-button" @click="playVideo">
							<text class="play-icon">▶</text>
						</view>
						<view class="video-counter">2</view>
					</view>
					<view class="video-actions">
						<view class="action-download" @click="downloadVideo">
							<text class="action-icon">📥</text>
						</view>
						<view class="action-delete" @click="deleteVideo">
							<text class="action-icon">🗑️</text>
						</view>
					</view>
				</view>
				<view class="video-info">
					<text class="video-filename">文本驱动 | 2025-07-04 11:51.MP3</text>
				</view>
			</view>
		</view>
		
		<!-- 悬浮创作按钮
		<view class="create-float-btn" @click="startCreate">
			<image src="/static/create-icon.png" class="create-icon"></image>
			<text class="create-text">开始创作</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 不再需要原有的音频播放相关数据
			}
		},
		onLoad() {
			// 页面加载时的初始化
		},
		methods: {
			goToFunction(type) {
				switch(type) {
					case 'video':
						this.createAvatar();
						break;
					case 'voice':
						this.createVoice();
						break;
					case 'scene':
						this.processMaterial();
						break;
					case 'subtitle':
						this.generateDigitalHuman();
						break;
				}
			},
			createAvatar() {
				uni.showToast({
					title: '开始创建人物形象',
					icon: 'none'
				});
			},
			createVoice() {
				uni.showToast({
					title: '开始创建声音形象',
					icon: 'none'
				});
			},
			processMaterial() {
				uni.showToast({
					title: '开始素材处理',
					icon: 'none'
				});
			},
			generateDigitalHuman() {
				uni.showToast({
					title: '开始生成数字人',
					icon: 'none'
				});
			},
			playVideo() {
				uni.showToast({
					title: '播放视频',
					icon: 'none'
				});
			},
			downloadVideo() {
				uni.showToast({
					title: '下载视频',
					icon: 'success'
				});
			},
			deleteVideo() {
				uni.showModal({
					title: '删除确认',
					content: '确定要删除这个视频吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
						}
					}
				});
			},
			startCreate() {
				uni.showActionSheet({
					itemList: ['创建人物形象', '创建声音形象', '素材处理', '生成数字人'],
					success: (res) => {
						const types = ['video', 'voice', 'scene', 'subtitle'];
						this.goToFunction(types[res.tapIndex]);
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
		padding: 0;
		padding-bottom: 120rpx;
	}

	/* 顶部标题栏 */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #fff;
	}

	.header-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.header-actions {
		display: flex;
		gap: 20rpx;
	}

	.action-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #666;
	}

	/* AI横幅 */
	.ai-banner {
		margin: 20rpx;
		height: 300rpx;
		position: relative;
		border-radius: 20rpx;
		overflow: hidden;
		background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
	}

	.ai-banner-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
		background-image: 
			radial-gradient(circle at 20% 50%, rgba(120, 220, 255, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ai-text {
		font-size: 120rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 0 20rpx rgba(255, 255, 255, 0.3);
	}

	.ai-indicator {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 10rpx;
	}

	.indicator-dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.indicator-dot.active {
		background-color: #fff;
	}

	/* 功能模块 */
	.function-section {
		padding: 20rpx;
	}

	.function-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
	}

	.function-item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
		text-align: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
		transition: transform 0.2s;
	}

	.function-item:active {
		transform: scale(0.98);
	}

	.function-icon {
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto 20rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.function-icon.voice-icon {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.function-icon.scene-icon {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.function-icon.subtitle-icon {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.icon-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 10rpx;
	}

	.icon-emoji {
		font-size: 60rpx;
		color: #fff;
	}

	.function-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.function-subtitle {
		display: block;
		font-size: 24rpx;
		color: #999;
		line-height: 1.4;
	}

	/* 内容生成区域 */
	.content-generation {
		margin: 20rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		padding-left: 10rpx;
	}

	/* 视频预览区域 */
	.video-preview {
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.video-container {
		position: relative;
		height: 400rpx;
		background-color: #f0f0f0;
	}

	.video-thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.video-overlay {
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

	.video-counter {
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-actions {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.action-download,
	.action-delete {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
		transition: transform 0.2s;
	}

	.action-download:active,
	.action-delete:active {
		transform: scale(0.95);
	}

	.action-icon {
		font-size: 40rpx;
	}

	.video-info {
		padding: 20rpx;
		border-top: 1rpx solid #eee;
	}

	.video-filename {
		font-size: 28rpx;
		color: #666;
		line-height: 1.4;
	}

	/* 悬浮创作按钮 */
	.create-float-btn {
		position: fixed;
		bottom: 150rpx;
		right: 30rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
		z-index: 1000;
	}

	.create-icon {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 8rpx;
	}

	.create-text {
		font-size: 20rpx;
		color: #fff;
		font-weight: bold;
	}
</style>
