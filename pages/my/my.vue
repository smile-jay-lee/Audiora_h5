<template>
	<view class="container">
		<!-- 用户信息头部 -->
		<view class="user-header">
			<view class="user-info">
				<image class="avatar" src="/static/avatar.jpg" @click="editProfile"></image>
				<view class="user-details">
					<text class="username">{{userInfo.nickname}}</text>
					<text class="user-id">ID: {{userInfo.userId}}</text>
					<text class="join-date">加入于 {{userInfo.joinDate}}</text>
				</view>
			</view>
			<!-- <view class="user-stats">
				<view class="stat-item" @click="goToFollowing">
					<text class="stat-number">{{userInfo.following}}</text>
					<text class="stat-label">关注</text>
				</view>
				<view class="stat-item" @click="goToFollowers">
					<text class="stat-number">{{userInfo.followers}}</text>
					<text class="stat-label">粉丝</text>
				</view>
				<view class="stat-item" @click="goToFavorites">
					<text class="stat-number">{{userInfo.favorites}}</text>
					<text class="stat-label">收藏</text>
				</view>
			</view> -->
		</view>
		
		<!-- 快捷功能 -->
		<view class="quick-actions">
			<view class="action-item" @click="gotoavatar">
				<view class="action-icon">👤</view>
				<text class="action-text">形象库</text>
				<text class="action-arrow">></text>
			</view>
			<view class="action-item" @click="goToDownloads">
				<view class="action-icon">🎙️</view>
				<text class="action-text">声音库</text>
				<!-- <text class="action-badge">{{downloadCount}}</text> -->
				<text class="action-arrow">></text>
			</view>
			<view class="action-item" @click="goToSubscriptions">
				<view class="action-icon">🎬</view>
				<text class="action-text">场景音库</text>
				<text class="action-arrow">></text>
			</view>
			<view class="action-item" @click="goToSubscriptions">
				<view class="action-icon">🎨</view>
				<text class="action-text">我的作品</text>
				<text class="action-arrow">></text>
			</view>
			<view class="action-item" @click="goToSubscriptions">
				<view class="action-icon">📚</view>
				<text class="action-text">使用教程</text>
				<text class="action-arrow">></text>
			</view>
			<view class="action-item" @click="goToSubscriptions">
				<view class="action-icon">🔒</view>
				<text class="action-text">修改密码</text>
				<text class="action-arrow">></text>
			</view>
		</view>
		
		<!-- 设置选项 */
		<view class="settings-section">
			<view class="section-title">设置</view>
			<view class="setting-item" @click="goToPlaySettings">
				<view class="setting-icon">🎵</view>
				<view class="setting-info">
					<text class="setting-title">播放设置</text>
					<text class="setting-desc">音质、播放模式等</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
			<view class="setting-item" @click="goToAppearance">
				<view class="setting-icon">🎨</view>
				<view class="setting-info">
					<text class="setting-title">外观设置</text>
					<text class="setting-desc">主题、字体大小等</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
			<view class="setting-item" @click="goToNotifications">
				<view class="setting-icon">🔔</view>
				<view class="setting-info">
					<text class="setting-title">通知设置</text>
					<text class="setting-desc">推送通知管理</text>
				</view>
				<view class="setting-switch">
					<switch :checked="notificationEnabled" @change="toggleNotification" />
				</view>
			</view>
			<view class="setting-item" @click="goToPrivacy">
				<view class="setting-icon">🔒</view>
				<view class="setting-info">
					<text class="setting-title">隐私设置</text>
					<text class="setting-desc">账号安全、隐私保护</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
		</view>
		
		<!-- 其他功能 */
		<view class="other-section">
			<view class="section-title">其他</view>
			<view class="setting-item" @click="goToFeedback">
				<view class="setting-icon">💭</view>
				<view class="setting-info">
					<text class="setting-title">意见反馈</text>
					<text class="setting-desc">帮助我们改进产品</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
			<view class="setting-item" @click="goToAbout">
				<view class="setting-icon">ℹ️</view>
				<view class="setting-info">
					<text class="setting-title">关于Audiora</text>
					<text class="setting-desc">版本 {{appVersion}}</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
			<view class="setting-item" @click="checkUpdate">
				<view class="setting-icon">🔄</view>
				<view class="setting-info">
					<text class="setting-title">检查更新</text>
					<text class="setting-desc">保持应用最新版本</text>
				</view>
				<text class="setting-arrow">></text>
			</view>
		</view>
		
		<!-- 退出登录 -->
		<view class="logout-section">
			<view class="logout-btn" @click="showLogoutConfirm">
				<text class="logout-text">退出登录</text>
			</view>
		</view>
		
		<!-- 登录确认弹窗 -->
		<view class="modal-overlay" v-if="showLogoutModal" @click="hideLogoutConfirm">
			<view class="modal-content" @click.stop>
				<view class="modal-title">确认退出</view>
				<view class="modal-message">确定要退出当前账号吗？</view>
				<view class="modal-actions">
					<view class="modal-btn cancel" @click="hideLogoutConfirm">取消</view>
					<view class="modal-btn confirm" @click="logout">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navigation from '@/utils/navigation.js'
	
	export default {
		data() {
			return {
				userInfo: {
					nickname: '音频爱好者',
					userId: '123456789',
					joinDate: '2023年3月',
					following: 156,
					followers: 892,
					favorites: 234
				},
				downloadCount: 12,
				notificationEnabled: true,
				appVersion: '1.2.3',
				showLogoutModal: false
			}
		},
		onLoad() {
			this.loadUserInfo();
		},
		methods: {
			loadUserInfo() {
				// 模拟加载用户信息
				console.log('加载用户信息');
			},
			editProfile() {
				uni.showToast({
					title: '编辑个人资料',
					icon: 'none'
				});
			},
			goToFollowing() {
				uni.showToast({
					title: '查看关注列表',
					icon: 'none'
				});
			},
			goToFollowers() {
				uni.showToast({
					title: '查看粉丝列表',
					icon: 'none'
				});
			},
			goToFavorites() {
				uni.showToast({
					title: '查看收藏列表',
					icon: 'none'
				});
			},
			// goToHistory() {
			// 	uni.showToast({
			// 		title: '查看播放历史',
			// 		icon: 'none'
			// 	});
			// },
			goToDownloads() {
				uni.showToast({
					title: '下载管理',
					icon: 'none'
				});
			},
			goToSubscriptions() {
				uni.showToast({
					title: '订阅更新',
					icon: 'none'
				});
			},
			goToPlaySettings() {
				uni.showToast({
					title: '播放设置',
					icon: 'none'
				});
			},
			goToAppearance() {
				uni.showActionSheet({
					itemList: ['浅色模式', '深色模式', '跟随系统'],
					success: (res) => {
						const themes = ['浅色模式', '深色模式', '跟随系统'];
						uni.showToast({
							title: `已切换到${themes[res.tapIndex]}`,
							icon: 'none'
						});
					}
				});
			},
			goToNotifications() {
				uni.showToast({
					title: '通知设置',
					icon: 'none'
				});
			},
			toggleNotification(e) {
				this.notificationEnabled = e.detail.value;
				uni.showToast({
					title: this.notificationEnabled ? '已开启通知' : '已关闭通知',
					icon: 'none'
				});
			},
			goToPrivacy() {
				uni.showToast({
					title: '隐私设置',
					icon: 'none'
				});
			},
			goToFeedback() {
				uni.showModal({
					title: '意见反馈',
					content: '请在应用商店评价或联系客服',
					showCancel: false
				});
			},
			goToAbout() {
				uni.showModal({
					title: '关于Audiora',
					content: `版本: ${this.appVersion}\n\nAudiora是一款专业的音频播放应用，为您提供优质的听觉体验。`,
					showCancel: false
				});
			},
			checkUpdate() {
				uni.showLoading({
					title: '检查更新中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '当前已是最新版本',
						icon: 'success'
					});
				}, 2000);
			},
			showLogoutConfirm() {
				this.showLogoutModal = true;
			},
			hideLogoutConfirm() {
				this.showLogoutModal = false;
			},
			logout() {
				this.hideLogoutConfirm();
				uni.showLoading({
					title: '退出中...'
				});
				
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '已退出登录',
						icon: 'success'
					});
					
					// 模拟跳转到登录页面
					// uni.reLaunch({
					//     url: '/pages/login/login'
					// });
				}, 1500);
			},
			gotoavatar() {
				Navigation.goToAvatar();
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	/* 用户信息头部 */
	.user-header {
		background: linear-gradient(135deg, #6200EA, #9C27B0);
		color: white;
		padding: 40rpx 30rpx;
		border-radius: 0 0 40rpx 40rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-right: 30rpx;
		border: 4rpx solid rgba(255, 255, 255, 0.3);
	}

	.user-details {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.username {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.user-id {
		font-size: 28rpx;
		opacity: 0.8;
		margin-bottom: 5rpx;
	}

	.join-date {
		font-size: 24rpx;
		opacity: 0.7;
	}

	.user-stats {
		display: flex;
		justify-content: space-around;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stat-number {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 5rpx;
	}

	.stat-label {
		font-size: 24rpx;
		opacity: 0.8;
	}

	/* 快捷功能 */
	.quick-actions {
		background-color: white;
		margin: 30rpx 30rpx 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.action-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.action-item:last-child {
		border-bottom: none;
	}

	.action-icon {
		font-size: 40rpx;
		margin-right: 20rpx;
	}

	.action-text {
		flex: 1;
		font-size: 32rpx;
		color: #333;
	}

	.action-badge {
		background-color: #FF5722;
		color: white;
		font-size: 20rpx;
		padding: 5rpx 12rpx;
		border-radius: 15rpx;
		margin-right: 10rpx;
	}

	.action-arrow {
		font-size: 28rpx;
		color: #ccc;
	}

	/* 设置区域 */
	.settings-section,
	.other-section {
		margin: 20rpx 30rpx;
	}

	.section-title {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		padding-left: 10rpx;
	}

	.setting-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
	}

	.setting-icon {
		font-size: 36rpx;
		margin-right: 20rpx;
	}

	.setting-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.setting-title {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 5rpx;
	}

	.setting-desc {
		font-size: 24rpx;
		color: #999;
	}

	.setting-arrow {
		font-size: 28rpx;
		color: #ccc;
	}

	.setting-switch {
		margin-left: 20rpx;
	}

	/* 退出登录 */
	.logout-section {
		margin: 40rpx 30rpx;
	}

	.logout-btn {
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		text-align: center;
		border: 2rpx solid #FF5722;
	}

	.logout-text {
		color: #FF5722;
		font-size: 32rpx;
		font-weight: bold;
	}

	/* 弹窗样式 */
	.modal-overlay {
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

	.modal-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.modal-message {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		margin-bottom: 40rpx;
		line-height: 1.5;
	}

	.modal-actions {
		display: flex;
		gap: 20rpx;
	}

	.modal-btn {
		flex: 1;
		padding: 25rpx;
		border-radius: 15rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}

	.modal-btn.cancel {
		background-color: #f5f5f5;
		color: #666;
	}

	.modal-btn.confirm {
		background-color: #FF5722;
		color: white;
	}
</style>