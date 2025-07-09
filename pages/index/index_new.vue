<template>
	<view class="container">
		<!-- 调试信息 -->
		<view class="debug-info">
			<text>页面加载成功</text>
			<text>组件测试</text>
		</view>
		
		<!-- 手动导入的 uv-swiper -->
		<view class="swiper-wrapper">
			<uv-swiper 
				:list="swiperList" 
				height="300"
				:autoplay="true"
				:circular="true"
				:interval="3000">
			</uv-swiper>
		</view>
	</view>
</template>

<script>
	import uvSwiper from '@climblee/uv-ui/components/uv-swiper/uv-swiper.vue'
	
	export default {
		components: {
			uvSwiper
		},
		data() {
			return {
				swiperList: [
					'/static/ai_person_background.png',
					'/static/logo.png',
					'/static/ai_person.png'
				]
			}
		},
		onLoad() {
			console.log('页面加载完成');
		}
	}
</script>

<style scoped>
	.container {
		padding: 30rpx;
		background-color: #f8f9fa;
		min-height: 100vh;
	}
	
	.debug-info {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	
	.debug-info text {
		display: block;
		margin-bottom: 10rpx;
		color: #333;
	}
	
	.swiper-wrapper {
		margin-bottom: 40rpx;
		border-radius: 15rpx;
		overflow: hidden;
		border: 2rpx solid #ccc;
		height: 300rpx;
	}
</style>

