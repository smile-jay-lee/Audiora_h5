"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      showPwd: false
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        common_vendor.index.showToast({ title: "请输入账号和密码", icon: "none" });
        return;
      }
      common_vendor.index.showToast({ title: "登录中..." });
      try {
        const url = `/api/user/login?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
        const res = await utils_request.request({
          url,
          method: "POST"
        });
        common_vendor.index.hideLoading();
        if (res.data && res.data.code === "200") {
          common_vendor.index.showToast({ title: "登录成功", icon: "success" });
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        } else {
          common_vendor.index.showToast({ title: "登录失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "登录失败", icon: "none" });
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
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.showPwd ? "text" : "password",
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.p({
      type: $data.showPwd ? "eye" : "eye-slash",
      size: "24",
      color: "#bbb"
    }),
    g: common_vendor.o(($event) => $data.showPwd = !$data.showPwd),
    h: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
