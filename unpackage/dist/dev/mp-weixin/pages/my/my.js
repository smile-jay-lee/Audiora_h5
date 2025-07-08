"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        nickname: "音频爱好者",
        userId: "123456789",
        joinDate: "2023年3月",
        following: 156,
        followers: 892,
        favorites: 234
      },
      downloadCount: 12,
      notificationEnabled: true,
      appVersion: "1.2.3",
      showLogoutModal: false
    };
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      common_vendor.index.__f__("log", "at pages/my/my.vue:162", "加载用户信息");
    },
    editProfile() {
      common_vendor.index.showToast({
        title: "编辑个人资料",
        icon: "none"
      });
    },
    goToFollowing() {
      common_vendor.index.showToast({
        title: "查看关注列表",
        icon: "none"
      });
    },
    goToFollowers() {
      common_vendor.index.showToast({
        title: "查看粉丝列表",
        icon: "none"
      });
    },
    goToFavorites() {
      common_vendor.index.showToast({
        title: "查看收藏列表",
        icon: "none"
      });
    },
    goToHistory() {
      common_vendor.index.showToast({
        title: "查看播放历史",
        icon: "none"
      });
    },
    goToDownloads() {
      common_vendor.index.showToast({
        title: "下载管理",
        icon: "none"
      });
    },
    goToSubscriptions() {
      common_vendor.index.showToast({
        title: "订阅更新",
        icon: "none"
      });
    },
    goToPlaySettings() {
      common_vendor.index.showToast({
        title: "播放设置",
        icon: "none"
      });
    },
    goToAppearance() {
      common_vendor.index.showActionSheet({
        itemList: ["浅色模式", "深色模式", "跟随系统"],
        success: (res) => {
          const themes = ["浅色模式", "深色模式", "跟随系统"];
          common_vendor.index.showToast({
            title: `已切换到${themes[res.tapIndex]}`,
            icon: "none"
          });
        }
      });
    },
    goToNotifications() {
      common_vendor.index.showToast({
        title: "通知设置",
        icon: "none"
      });
    },
    toggleNotification(e) {
      this.notificationEnabled = e.detail.value;
      common_vendor.index.showToast({
        title: this.notificationEnabled ? "已开启通知" : "已关闭通知",
        icon: "none"
      });
    },
    goToPrivacy() {
      common_vendor.index.showToast({
        title: "隐私设置",
        icon: "none"
      });
    },
    goToFeedback() {
      common_vendor.index.showModal({
        title: "意见反馈",
        content: "请在应用商店评价或联系客服",
        showCancel: false
      });
    },
    goToAbout() {
      common_vendor.index.showModal({
        title: "关于Audiora",
        content: `版本: ${this.appVersion}

Audiora是一款专业的音频播放应用，为您提供优质的听觉体验。`,
        showCancel: false
      });
    },
    checkUpdate() {
      common_vendor.index.showLoading({
        title: "检查更新中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "当前已是最新版本",
          icon: "success"
        });
      }, 2e3);
    },
    showLogoutConfirm() {
      this.showLogoutModal = true;
    },
    hideLogoutConfirm() {
      this.showLogoutModal = false;
    },
    logout() {
      this.hideLogoutConfirm();
      common_vendor.index.showLoading({
        title: "退出中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已退出登录",
          icon: "success"
        });
      }, 1500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $options.editProfile && $options.editProfile(...args)),
    c: common_vendor.t($data.userInfo.nickname),
    d: common_vendor.t($data.userInfo.userId),
    e: common_vendor.t($data.userInfo.joinDate),
    f: common_vendor.t($data.userInfo.following),
    g: common_vendor.o((...args) => $options.goToFollowing && $options.goToFollowing(...args)),
    h: common_vendor.t($data.userInfo.followers),
    i: common_vendor.o((...args) => $options.goToFollowers && $options.goToFollowers(...args)),
    j: common_vendor.t($data.userInfo.favorites),
    k: common_vendor.o((...args) => $options.goToFavorites && $options.goToFavorites(...args)),
    l: common_vendor.o((...args) => $options.goToHistory && $options.goToHistory(...args)),
    m: common_vendor.t($data.downloadCount),
    n: common_vendor.o((...args) => $options.goToDownloads && $options.goToDownloads(...args)),
    o: common_vendor.o((...args) => $options.goToSubscriptions && $options.goToSubscriptions(...args)),
    p: common_vendor.o((...args) => $options.showLogoutConfirm && $options.showLogoutConfirm(...args)),
    q: $data.showLogoutModal
  }, $data.showLogoutModal ? {
    r: common_vendor.o((...args) => $options.hideLogoutConfirm && $options.hideLogoutConfirm(...args)),
    s: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    t: common_vendor.o(() => {
    }),
    v: common_vendor.o((...args) => $options.hideLogoutConfirm && $options.hideLogoutConfirm(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
