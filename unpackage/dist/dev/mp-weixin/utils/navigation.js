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
  goToSoundLibrary() {
    common_vendor.index.navigateTo({
      url: "/pages/sound_library/sound_library"
    });
  },
  // 跳转到AI创作
  goToAICreate() {
    common_vendor.index.navigateTo({
      url: "/pages/create/create"
    });
  },
  gotoCreate() {
    common_vendor.index.navigateTo({
      url: "/pages/create/create"
    });
  }
};
exports.Navigation = Navigation;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/navigation.js.map
