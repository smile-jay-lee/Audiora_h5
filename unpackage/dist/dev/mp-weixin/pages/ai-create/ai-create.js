"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      aiList: [
        {
          icon: "🎨",
          title: "AI绘画",
          desc: "根据需求生成图片"
        },
        {
          icon: "🎵",
          title: "AI音乐",
          desc: "根据需求生成音曲"
        },
        {
          icon: "🎬",
          title: "AI视频",
          desc: "根据需求生成视频"
        },
        {
          icon: "🖼️",
          title: "图片处理",
          desc: "按要求生成不同风格的图片"
        },
        {
          icon: "🔧",
          title: "老照片修复",
          desc: "修复老照片"
        },
        {
          icon: "📖",
          title: "AI翻译",
          desc: "翻译多种语言的文本"
        }
      ]
    };
  },
  methods: {
    goToAIDetail(item) {
      common_vendor.index.showToast({
        title: `使用${item.title}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.aiList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: common_vendor.o(($event) => $options.goToAIDetail(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c46fd3fe"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ai-create/ai-create.js.map
