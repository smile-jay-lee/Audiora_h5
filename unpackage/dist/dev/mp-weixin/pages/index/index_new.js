"use strict";
const common_vendor = require("../../common/vendor.js");
const uvSwiper = () => "../../node-modules/@climblee/uv-ui/components/uv-swiper/uv-swiper.js";
const _sfc_main = {
  components: {
    uvSwiper
  },
  data() {
    return {
      swiperList: [
        "/static/ai_person_background.png",
        "/static/logo.png",
        "/static/ai_person.png"
      ]
    };
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/index/index_new.vue:39", "页面加载完成");
  }
};
if (!Array) {
  const _component_uv_swiper = common_vendor.resolveComponent("uv-swiper");
  _component_uv_swiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      list: $data.swiperList,
      height: "300",
      autoplay: true,
      circular: true,
      interval: 3e3
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ed6d699a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index_new.js.map
