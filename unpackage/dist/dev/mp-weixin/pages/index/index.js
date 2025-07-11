"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_navigation = require("../../utils/navigation.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [
        "/static/ai_person_background.png",
        "/static/ai_person_background.png",
        "/static/ai_person_background.png"
      ]
    };
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/index/index.vue:118", "页面加载完成");
  },
  methods: {
    onImageError(e) {
      common_vendor.index.__f__("error", "at pages/index/index.vue:122", "图片加载失败:", e);
    },
    onImageLoad(e) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:125", "图片加载成功:", e);
    },
    goToFunction(type) {
    },
    /* 创建人物形象*/
    gotoavatar() {
      utils_navigation.Navigation.goToAvatar();
    },
    // createAvatar() {
    // 	uni.showToast({
    // 		title: '开始创建人物形象',
    // 		icon: 'none'
    // 	});
    // },
    // createVoice() {
    // 	uni.showToast({
    // 		title: '开始创建声音形象',
    // 		icon: 'none'
    // 	});
    // },
    // processMaterial() {
    // 	uni.showToast({
    // 		title: '开始素材处理',
    // 		icon: 'none'
    // 	});
    // },
    generateDigitalHuman() {
      common_vendor.index.showToast({
        title: "开始生成数字人",
        icon: "none"
      });
    },
    playVideo() {
      common_vendor.index.showToast({
        title: "播放视频",
        icon: "none"
      });
    },
    downloadVideo() {
      common_vendor.index.showToast({
        title: "下载视频",
        icon: "success"
      });
    },
    deleteVideo() {
      common_vendor.index.showModal({
        title: "删除确认",
        content: "确定要删除这个视频吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    goToVoice() {
      utils_navigation.Navigation.goToVoice();
    },
    gotoSoundLibrary() {
      utils_navigation.Navigation.goToSoundLibrary();
    },
    gotoCreate() {
      utils_navigation.Navigation.gotoCreate();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o((...args) => $options.onImageError && $options.onImageError(...args), index),
        c: common_vendor.o((...args) => $options.onImageLoad && $options.onImageLoad(...args), index),
        d: index
      };
    }),
    b: common_vendor.o((...args) => $options.gotoavatar && $options.gotoavatar(...args)),
    c: common_vendor.o((...args) => $options.goToVoice && $options.goToVoice(...args)),
    d: common_vendor.o((...args) => $options.gotoSoundLibrary && $options.gotoSoundLibrary(...args)),
    e: common_vendor.o((...args) => $options.gotoCreate && $options.gotoCreate(...args)),
    f: common_assets._imports_0,
    g: common_vendor.o((...args) => $options.playVideo && $options.playVideo(...args)),
    h: common_vendor.p({
      type: "download",
      size: "24"
    }),
    i: common_vendor.o((...args) => $options.downloadVideo && $options.downloadVideo(...args)),
    j: common_vendor.p({
      type: "trash",
      size: "24"
    }),
    k: common_vendor.o((...args) => $options.deleteVideo && $options.deleteVideo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
