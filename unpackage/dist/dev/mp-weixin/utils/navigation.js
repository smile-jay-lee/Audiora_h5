"use strict";
const common_vendor = require("../common/vendor.js");
const Navigation = {
  // 跳转到形象库
  goToAvatar() {
    common_vendor.index.navigateTo({
      url: "/pages/avatar/avatar"
    });
  },
  // 跳转到声音库
  goToVoice() {
    common_vendor.index.navigateTo({
      url: "/pages/voice/voice"
    });
  },
  // 跳转到场景音库
  goToScene() {
    common_vendor.index.navigateTo({
      url: "/pages/scene/scene"
    });
  },
  // 跳转到AI创作
  goToAICreate() {
    common_vendor.index.navigateTo({
      url: "/pages/ai-create/ai-create"
    });
  }
};
exports.Navigation = Navigation;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/navigation.js.map
