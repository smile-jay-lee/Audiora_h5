<template>
	<view class="container">
		<view class="header">
			<text class="title">AI创作</text>
		</view>
		
		<view class="content">
			<view class="ai-list">
				<view class="ai-item" v-for="(item, index) in aiList" :key="index" @click="goToAIDetail(item)">
					<view class="ai-icon">{{item.icon}}</view>
					<view class="ai-info">
						<text class="ai-title">{{item.title}}</text>
						<text class="ai-desc">{{item.desc}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aiList: [
					{
						icon: '🎨',
						title: 'AI绘画',
						desc: '根据需求生成图片'
					},
					{
						icon: '🎵',
						title: 'AI音乐',
						desc: '根据需求生成音曲'
					},
					{
						icon: '🎬',
						title: 'AI视频',
						desc: '根据需求生成视频'
					},
					{
						icon: '🖼️',
						title: '图片处理',
						desc: '按要求生成不同风格的图片'
					},
					{
						icon: '🔧',
						title: '老照片修复',
						desc: '修复老照片'
					},
					{
						icon: '📖',
						title: 'AI翻译',
						desc: '翻译多种语言的文本'
					}
				]
			}
		},
		methods: {
			goToAIDetail(item) {
				uni.showToast({
					title: `使用${item.title}`,
					icon: 'none'
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.header {
		background-color: #6200EA;
		padding: 20rpx;
		text-align: center;
	}

	.title {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
	}

	.content {
		padding: 20rpx;
	}

	.ai-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
	}

	.ai-item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		text-align: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.ai-icon {
		font-size: 60rpx;
		margin-bottom: 20rpx;
	}

	.ai-info {
		display: flex;
		flex-direction: column;
	}

	.ai-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.ai-desc {
		font-size: 24rpx;
		color: #666;
		line-height: 1.4;
	}
</style>
