<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@climblee/uv-ui/index.scss';
</style>

<style>
	/*每个页面公共css */
	page {
		background-color: #f5f5f5;
	}
	
	/* 全局字体设置 */
	view, text, button, input, textarea {
		box-sizing: border-box;
	}
	
	/* 通用按钮样式 */
	.btn-primary {
		background-color: #6200EA;
		color: white;
		border-radius: 25rpx;
		padding: 20rpx 40rpx;
		font-size: 28rpx;
		text-align: center;
		border: none;
	}
	
	.btn-secondary {
		background-color: #f5f5f5;
		color: #666;
		border-radius: 25rpx;
		padding: 20rpx 40rpx;
		font-size: 28rpx;
		text-align: center;
		border: 1rpx solid #ddd;
	}
	
	/* 通用卡片样式 */
	.card {
		background-color: white;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
		overflow: hidden;
	}
	
	/* 通用分割线 */
	.divider {
		height: 1rpx;
		background-color: #eee;
		margin: 20rpx 0;
	}
	
	/* 通用文本省略 */
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.text-ellipsis-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	/* 通用flex布局 */
	.flex {
		display: flex;
	}
	
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.flex-column {
		display: flex;
		flex-direction: column;
	}
	
	/* 通用间距 */
	.mt-10 { margin-top: 10rpx; }
	.mt-20 { margin-top: 20rpx; }
	.mt-30 { margin-top: 30rpx; }
	.mb-10 { margin-bottom: 10rpx; }
	.mb-20 { margin-bottom: 20rpx; }
	.mb-30 { margin-bottom: 30rpx; }
	.ml-10 { margin-left: 10rpx; }
	.ml-20 { margin-left: 20rpx; }
	.mr-10 { margin-right: 10rpx; }
	.mr-20 { margin-right: 20rpx; }
	
	.p-10 { padding: 10rpx; }
	.p-20 { padding: 20rpx; }
	.p-30 { padding: 30rpx; }
	.pt-10 { padding-top: 10rpx; }
	.pt-20 { padding-top: 20rpx; }
	.pb-10 { padding-bottom: 10rpx; }
	.pb-20 { padding-bottom: 20rpx; }
	.pl-10 { padding-left: 10rpx; }
	.pl-20 { padding-left: 20rpx; }
	.pr-10 { padding-right: 10rpx; }
	.pr-20 { padding-right: 20rpx; }
</style>
