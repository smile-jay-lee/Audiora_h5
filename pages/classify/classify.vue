<template>
	<view class="container">
		<!-- 分类导航 -->
		<view class="category-nav">
			<scroll-view scroll-x="true" class="nav-scroll">
				<view class="nav-item" 
					v-for="(item, index) in categoryList" 
					:key="index"
					:class="{'active': currentCategory === item.type}"
					@click="switchCategory(item.type)">
					<text class="nav-icon">{{item.icon}}</text>
					<text class="nav-text">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 筛选栏 -->
		<view class="filter-bar">
			<view class="filter-item" @click="showFilterPopup">
				<text>筛选</text>
				<text class="filter-icon">📋</text>
			</view>
			<view class="filter-item" @click="showSortPopup">
				<text>排序</text>
				<text class="filter-icon">🔄</text>
			</view>
		</view>
		
		<!-- 内容列表 -->
		<scroll-view scroll-y="true" class="content-scroll" @scrolltolower="loadMore">
			<view class="content-list">
				<view class="content-item" 
					v-for="(item, index) in filteredList" 
					:key="index"
					@click="playContent(item)">
					<image :src="item.cover" class="content-cover"></image>
					<view class="content-info">
						<text class="content-title">{{item.title}}</text>
						<text class="content-author">{{item.author}}</text>
						<view class="content-meta">
							<text class="content-category">{{getCategoryName(item.category)}}</text>
							<text class="content-duration">{{item.duration}}</text>
						</view>
						<view class="content-stats">
							<text class="stats-item">👁️ {{item.views}}</text>
							<text class="stats-item">👍 {{item.likes}}</text>
						</view>
					</view>
					<view class="content-actions">
						<view class="action-btn" @click.stop="toggleFavorite(item)">
							<text :class="{'favorited': item.isFavorited}">{{item.isFavorited ? '❤️' : '🤍'}}</text>
						</view>
						<view class="action-btn play-btn" @click.stop="playContent(item)">
							<text>▶️</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<view class="load-more" v-if="hasMore">
				<text>加载更多...</text>
			</view>
		</scroll-view>
		
		<!-- 筛选弹窗 -->
		<view class="popup-overlay" v-if="showFilter" @click="hideFilterPopup">
			<view class="popup-content" @click.stop>
				<view class="popup-header">
					<text class="popup-title">筛选条件</text>
					<text class="popup-close" @click="hideFilterPopup">✕</text>
				</view>
				<view class="filter-options">
					<view class="filter-group">
						<text class="filter-label">时长</text>
						<view class="filter-tags">
							<text class="filter-tag" 
								v-for="duration in durationOptions" 
								:key="duration.value"
								:class="{'active': selectedDuration === duration.value}"
								@click="selectDuration(duration.value)">
								{{duration.label}}
							</text>
						</view>
					</view>
					<view class="filter-group">
						<text class="filter-label">热度</text>
						<view class="filter-tags">
							<text class="filter-tag" 
								v-for="heat in heatOptions" 
								:key="heat.value"
								:class="{'active': selectedHeat === heat.value}"
								@click="selectHeat(heat.value)">
								{{heat.label}}
							</text>
						</view>
					</view>
				</view>
				<view class="popup-actions">
					<view class="popup-btn reset" @click="resetFilter">重置</view>
					<view class="popup-btn confirm" @click="applyFilter">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCategory: 'all',
				showFilter: false,
				selectedDuration: '',
				selectedHeat: '',
				hasMore: true,
				page: 1,
				categoryList: [
					{ icon: '📂', name: '全部', type: 'all' },
					{ icon: '📚', name: '有声书', type: 'book' },
					{ icon: '🎵', name: '音乐', type: 'music' },
					{ icon: '🎙️', name: '播客', type: 'podcast' },
					{ icon: '📰', name: '新闻', type: 'news' },
					{ icon: '🧘', name: '冥想', type: 'meditation' },
					{ icon: '🏃', name: '运动', type: 'sport' },
					{ icon: '👶', name: '儿童', type: 'children' },
					{ icon: '🎭', name: '戏曲', type: 'opera' }
				],
				durationOptions: [
					{ label: '全部', value: '' },
					{ label: '短篇(< 30分钟)', value: 'short' },
					{ label: '中篇(30-60分钟)', value: 'medium' },
					{ label: '长篇(> 60分钟)', value: 'long' }
				],
				heatOptions: [
					{ label: '全部', value: '' },
					{ label: '最新', value: 'latest' },
					{ label: '最热', value: 'hottest' },
					{ label: '评分最高', value: 'highest' }
				],
				allContentList: [
					{
						id: 1,
						title: '三体：黑暗森林',
						author: '刘慈欣',
						cover: '/static/audio1.jpg',
						duration: '15:30:45',
						category: 'book',
						views: '12.5万',
						likes: '8.2千',
						isFavorited: false
					},
					{
						id: 2,
						title: '夜听故事',
						author: '夜听主播',
						cover: '/static/audio2.jpg',
						duration: '25:20',
						category: 'podcast',
						views: '8.9万',
						likes: '5.6千',
						isFavorited: true
					},
					{
						id: 3,
						title: '轻松爵士乐',
						author: '爵士乐团',
						cover: '/static/audio3.jpg',
						duration: '1:45:30',
						category: 'music',
						views: '6.3万',
						likes: '4.1千',
						isFavorited: false
					},
					{
						id: 4,
						title: '睡前冥想',
						author: '冥想导师',
						cover: '/static/audio4.jpg',
						duration: '18:00',
						category: 'meditation',
						views: '15.2万',
						likes: '12.8千',
						isFavorited: true
					},
					{
						id: 5,
						title: '今日新闻摘要',
						author: '新闻播报员',
						cover: '/static/audio5.jpg',
						duration: '12:30',
						category: 'news',
						views: '23.6万',
						likes: '3.2千',
						isFavorited: false
					},
					{
						id: 6,
						title: '儿童故事大全',
						author: '故事姐姐',
						cover: '/static/audio6.jpg',
						duration: '35:45',
						category: 'children',
						views: '18.7万',
						likes: '15.3千',
						isFavorited: false
					}
				]
			}
		},
		computed: {
			filteredList() {
				let list = this.allContentList;
				
				// 按分类筛选
				if (this.currentCategory !== 'all') {
					list = list.filter(item => item.category === this.currentCategory);
				}
				
				// 按时长筛选
				if (this.selectedDuration) {
					list = list.filter(item => {
						const duration = this.parseDuration(item.duration);
						switch (this.selectedDuration) {
							case 'short':
								return duration < 30;
							case 'medium':
								return duration >= 30 && duration <= 60;
							case 'long':
								return duration > 60;
							default:
								return true;
						}
					});
				}
				
				return list;
			}
		},
		onLoad() {
			this.loadContent();
		},
		methods: {
			switchCategory(type) {
				this.currentCategory = type;
			},
			getCategoryName(type) {
				const category = this.categoryList.find(item => item.type === type);
				return category ? category.name : '';
			},
			showFilterPopup() {
				this.showFilter = true;
			},
			hideFilterPopup() {
				this.showFilter = false;
			},
			showSortPopup() {
				uni.showActionSheet({
					itemList: ['最新发布', '最多播放', '最多收藏', '时长最短', '时长最长'],
					success: (res) => {
						console.log('选择了排序方式:', res.tapIndex);
						this.sortContent(res.tapIndex);
					}
				});
			},
			selectDuration(value) {
				this.selectedDuration = value;
			},
			selectHeat(value) {
				this.selectedHeat = value;
			},
			resetFilter() {
				this.selectedDuration = '';
				this.selectedHeat = '';
			},
			applyFilter() {
				this.hideFilterPopup();
				// 应用筛选条件
			},
			toggleFavorite(item) {
				item.isFavorited = !item.isFavorited;
				uni.showToast({
					title: item.isFavorited ? '已收藏' : '已取消收藏',
					icon: 'none'
				});
			},
			playContent(item) {
				uni.showToast({
					title: `正在播放: ${item.title}`,
					icon: 'none'
				});
			},
			parseDuration(duration) {
				// 解析时长字符串，返回分钟数
				const parts = duration.split(':');
				if (parts.length === 3) {
					// 格式：小时:分钟:秒
					return parseInt(parts[0]) * 60 + parseInt(parts[1]);
				} else if (parts.length === 2) {
					// 格式：分钟:秒
					return parseInt(parts[0]);
				}
				return 0;
			},
			sortContent(sortType) {
				// 实现排序逻辑
				console.log('排序类型:', sortType);
				uni.showToast({
					title: '排序完成',
					icon: 'none'
				});
			},
			loadContent() {
				// 模拟加载内容
				console.log('加载分类内容');
			},
			loadMore() {
				if (!this.hasMore) return;
				
				// 模拟加载更多
				setTimeout(() => {
					this.page++;
					console.log('加载更多内容, 页码:', this.page);
					
					if (this.page >= 3) {
						this.hasMore = false;
					}
				}, 1000);
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	/* 分类导航 */
	.category-nav {
		background-color: white;
		border-bottom: 1rpx solid #eee;
	}

	.nav-scroll {
		white-space: nowrap;
		padding: 20rpx 0;
	}

	.nav-item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx 30rpx;
		margin: 0 10rpx;
		border-radius: 15rpx;
		transition: all 0.3s;
	}

	.nav-item.active {
		background-color: #6200EA;
		color: white;
	}

	.nav-icon {
		font-size: 32rpx;
		margin-bottom: 5rpx;
	}

	.nav-text {
		font-size: 24rpx;
	}

	/* 筛选栏 */
	.filter-bar {
		display: flex;
		justify-content: space-around;
		padding: 20rpx;
		background-color: white;
		border-bottom: 1rpx solid #eee;
	}

	.filter-item {
		display: flex;
		align-items: center;
		padding: 15rpx 30rpx;
		background-color: #f5f5f5;
		border-radius: 25rpx;
		font-size: 28rpx;
	}

	.filter-icon {
		margin-left: 10rpx;
		font-size: 24rpx;
	}

	/* 内容区域 */
	.content-scroll {
		flex: 1;
		padding: 20rpx;
	}

	.content-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.content-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: white;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
	}

	.content-cover {
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.content-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.content-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.content-author {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.content-meta {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.content-category {
		font-size: 24rpx;
		color: #6200EA;
		background-color: rgba(98, 0, 234, 0.1);
		padding: 5rpx 15rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.content-duration {
		font-size: 24rpx;
		color: #999;
	}

	.content-stats {
		display: flex;
		gap: 30rpx;
	}

	.stats-item {
		font-size: 24rpx;
		color: #999;
	}

	.content-actions {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.action-btn {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
		font-size: 24rpx;
	}

	.action-btn.play-btn {
		background-color: #6200EA;
		color: white;
	}

	.favorited {
		color: #FF5722;
	}

	/* 加载更多 */
	.load-more {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		color: #999;
		font-size: 28rpx;
	}

	/* 弹窗样式 */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		z-index: 1000;
	}

	.popup-content {
		width: 100%;
		background-color: white;
		border-radius: 30rpx 30rpx 0 0;
		padding: 40rpx;
		max-height: 80vh;
		overflow-y: auto;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.popup-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.popup-close {
		font-size: 40rpx;
		color: #999;
	}

	.filter-options {
		margin-bottom: 40rpx;
	}

	.filter-group {
		margin-bottom: 30rpx;
	}

	.filter-label {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		display: block;
	}

	.filter-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}

	.filter-tag {
		padding: 15rpx 30rpx;
		background-color: #f5f5f5;
		border-radius: 25rpx;
		font-size: 28rpx;
		color: #666;
		border: 2rpx solid transparent;
	}

	.filter-tag.active {
		background-color: #6200EA;
		color: white;
	}

	.popup-actions {
		display: flex;
		gap: 20rpx;
	}

	.popup-btn {
		flex: 1;
		padding: 25rpx;
		border-radius: 25rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}

	.popup-btn.reset {
		background-color: #f5f5f5;
		color: #666;
	}

	.popup-btn.confirm {
		background-color: #6200EA;
		color: white;
	}
</style>