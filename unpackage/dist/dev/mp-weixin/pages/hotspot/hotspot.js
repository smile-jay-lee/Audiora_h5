"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hotList: [
        {
          icon: "🔥",
          title: "音频当日热点",
          desc: "一分钟盘点当日热点"
        },
        {
          icon: "📝",
          title: "智能文案",
          desc: "根据需求生成文案"
        },
        {
          icon: "🔍",
          title: "文案抓取",
          desc: "提取视频中的文案"
        },
        {
          icon: "🤖",
          title: "DeepSeek",
          desc: "使用deepseek大语言模型"
        }
      ]
    };
  },
  methods: {
    goToHotDetail(item) {
      common_vendor.index.showToast({
        title: `查看${item.title}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.hotList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: common_vendor.o(($event) => $options.goToHotDetail(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0390a392"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/hotspot/hotspot.js.map
