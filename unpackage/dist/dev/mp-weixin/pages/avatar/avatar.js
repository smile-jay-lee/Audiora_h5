"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatarList: [
        {
          id: 1,
          image: "/static/ai_person_background.png",
          createTime: "2023-06-12 19:35:32"
        },
        {
          id: 2,
          image: "/static/ai_person_background.png",
          createTime: "2023-06-11 15:20:15"
        },
        {
          id: 3,
          image: "/static/ai_person_background.png",
          createTime: "2023-06-10 10:45:30"
        }
      ]
    };
  },
  onLoad() {
    this.loadAvatarList();
  },
  methods: {
    loadAvatarList() {
      common_vendor.index.__f__("log", "at pages/avatar/avatar.vue:68", "加载形象列表");
    },
    playAvatar(avatar) {
      common_vendor.index.showToast({
        title: "播放形象",
        icon: "none"
      });
    },
    deleteAvatar(index) {
      common_vendor.index.showModal({
        title: "删除确认",
        content: "确定要删除这个形象吗？",
        success: (res) => {
          if (res.confirm) {
            this.avatarList.splice(index, 1);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    createAvatar() {
      common_vendor.index.showToast({
        title: "创建新形象",
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.avatarList, (avatar, index, i0) => {
      return {
        a: avatar.image,
        b: common_vendor.o(($event) => $options.playAvatar(avatar), index),
        c: common_vendor.t(index + 1),
        d: common_vendor.o(($event) => $options.deleteAvatar(index), index),
        e: common_vendor.t(avatar.createTime),
        f: index
      };
    }),
    b: common_vendor.o((...args) => $options.createAvatar && $options.createAvatar(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e7391881"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/avatar/avatar.js.map
