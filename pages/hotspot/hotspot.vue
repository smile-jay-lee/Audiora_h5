<template>
	<view class="container">
		<view class="header">
			<text class="title">热点</text>
		</view>
		
		<view class="content">
			<view class="hot-list">
				<view class="hot-item" v-for="(item, index) in hotList" :key="index" @click="goToHotDetail(item)">
					<view class="hot-icon">{{item.icon}}</view>
					<view class="hot-info">
						<text class="hot-title">{{item.title}}</text>
						<text class="hot-desc">{{item.desc}}</text>
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
				hotList: [
					{
						icon: '🔥',
						title: '音频当日热点',
						desc: '一分钟盘点当日热点'
					},
					{
						icon: '📝',
						title: '智能文案',
						desc: '根据需求生成文案'
					},
					{
						icon: '🔍',
						title: '文案抓取',
						desc: '提取视频中的文案'
					},
					{
						icon: '🤖',
						title: 'DeepSeek',
						desc: '使用deepseek大语言模型'
					}
				]
			}
		},
		methods: {
			goToHotDetail(item) {
				uni.showToast({
					title: `查看${item.title}`,
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

	.hot-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.hot-item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.hot-icon {
		font-size: 60rpx;
		margin-right: 30rpx;
	}

	.hot-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.hot-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.hot-desc {
		font-size: 28rpx;
		color: #666;
	}
</style>
