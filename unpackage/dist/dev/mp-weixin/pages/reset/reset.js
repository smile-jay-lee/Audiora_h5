"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const uniEasyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _sfc_main = {
  data() {
    return {
      userId: common_vendor.index.getStorageSync("userId"),
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      showPwd1: false,
      showPwd2: false,
      showPwd3: false,
      password: "",
      components: { uniEasyinput }
    };
  },
  methods: {
    async resetPwd() {
      if (!this.oldPwd || !this.newPwd || !this.confirmPwd) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (this.newPwd !== this.confirmPwd) {
        common_vendor.index.showToast({ title: "两次新密码不一致", icon: "none" });
        return;
      }
      common_vendor.index.showLoading({ title: "重置中..." });
      try {
        const url = "/api/user/changePassword?userId=" + encodeURIComponent(this.userId) + "&oldPassword=" + encodeURIComponent(this.oldPwd) + "&newPassword=" + encodeURIComponent(this.newPwd) + "&confirmPassword=" + encodeURIComponent(this.confirmPwd);
        const res = await utils_request.request({
          url,
          method: "PUT"
        });
        common_vendor.index.__f__("log", "at pages/reset/reset.vue:84", "返回的消息：", res.data);
        common_vendor.index.hideLoading();
        if (res.data && res.data.code === "200") {
          common_vendor.index.showToast({ title: res.data.data || "密码修改成功", icon: "success" });
          common_vendor.index.reLaunch({ url: "/pages/login/login" });
        } else {
          common_vendor.index.showToast({ title: res.data.msg || "修改失败", icon: "none" });
        }
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
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
    a: $data.showPwd1 ? "text" : "password",
    b: $data.oldPwd,
    c: common_vendor.o(($event) => $data.oldPwd = $event.detail.value),
    d: common_vendor.p({
      type: $data.showPwd1 ? "eye" : "eye-slash",
      size: "24",
      color: "#bbb"
    }),
    e: common_vendor.o(($event) => $data.showPwd1 = !$data.showPwd1),
    f: $data.showPwd2 ? "text" : "password",
    g: $data.newPwd,
    h: common_vendor.o(($event) => $data.newPwd = $event.detail.value),
    i: common_vendor.p({
      type: $data.showPwd2 ? "eye" : "eye-slash",
      size: "24",
      color: "#bbb"
    }),
    j: common_vendor.o(($event) => $data.showPwd2 = !$data.showPwd2),
    k: $data.showPwd3 ? "text" : "password",
    l: $data.confirmPwd,
    m: common_vendor.o(($event) => $data.confirmPwd = $event.detail.value),
    n: common_vendor.p({
      type: $data.showPwd3 ? "eye" : "eye-slash",
      size: "24",
      color: "#bbb"
    }),
    o: common_vendor.o(($event) => $data.showPwd3 = !$data.showPwd3),
    p: common_vendor.o((...args) => $options.resetPwd && $options.resetPwd(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-76af0740"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/reset/reset.js.map
