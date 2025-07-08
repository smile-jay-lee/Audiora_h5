"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 不再需要原有的音频播放相关数据
    };
  },
  onLoad() {
  },
  methods: {
    goToFunction(type) {
      switch (type) {
        case "video":
          this.createAvatar();
          break;
        case "voice":
          this.createVoice();
          break;
        case "scene":
          this.processMaterial();
          break;
        case "subtitle":
          this.generateDigitalHuman();
          break;
      }
    },
    createAvatar() {
      common_vendor.index.showToast({
        title: "开始创建人物形象",
        icon: "none"
      });
    },
    createVoice() {
      common_vendor.index.showToast({
        title: "开始创建声音形象",
        icon: "none"
      });
    },
    processMaterial() {
      common_vendor.index.showToast({
        title: "开始素材处理",
        icon: "none"
      });
    },
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
    startCreate() {
      common_vendor.index.showActionSheet({
        itemList: ["创建人物形象", "创建声音形象", "素材处理", "生成数字人"],
        success: (res) => {
          const types = ["video", "voice", "scene", "subtitle"];
          this.goToFunction(types[res.tapIndex]);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.goToFunction("video")),
    b: common_vendor.o(($event) => $options.goToFunction("voice")),
    c: common_vendor.o(($event) => $options.goToFunction("scene")),
    d: common_vendor.o(($event) => $options.goToFunction("subtitle")),
    e: common_assets._imports_0,
    f: common_vendor.o((...args) => $options.playVideo && $options.playVideo(...args)),
    g: common_vendor.o((...args) => $options.downloadVideo && $options.downloadVideo(...args)),
    h: common_vendor.o((...args) => $options.deleteVideo && $options.deleteVideo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
