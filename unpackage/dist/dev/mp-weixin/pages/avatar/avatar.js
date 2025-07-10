"use strict";
const common_vendor = require("../../common/vendor.js");
const UploadComponent = () => "../../components/upload.js";
const _sfc_main = {
  components: {
    UploadComponent
  },
  data() {
    return {
      showUpload: false,
      uploadConfig: {
        title: "上传形象",
        nameLabel: "形象名称",
        namePlaceholder: "请输入形象名称",
        configTitle: "形象配置",
        uploadMainText: "创建新形象",
        uploadSubText: "点此区域上传",
        confirmText: "确认上传",
        requirements: {
          size: "竖屏9:16",
          format: "MP4",
          quality: "1080P",
          duration: "不限",
          frameRate: "不限",
          fileSize: "不超过300M"
        },
        tips: [
          "确保面部特征没有被遮挡，并努力让面部清晰可见",
          "不要使用有多人的视频",
          "嘴巴要完整露出，避免遮挡",
          "人脸不要太大，确保整张人脸都在屏幕区域内，人脸不要出屏幕"
        ]
      },
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
      common_vendor.index.__f__("log", "at pages/avatar/avatar.vue:110", "加载形象列表");
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
      this.showUpload = true;
    },
    closeUpload() {
      this.showUpload = false;
    },
    handleUploadSuccess(data) {
      common_vendor.index.__f__("log", "at pages/avatar/avatar.vue:140", "形象上传成功:", data);
      const newAvatar = {
        id: Date.now(),
        image: data.url,
        name: data.name,
        createTime: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).replace(/\//g, "-")
      };
      this.avatarList.unshift(newAvatar);
      this.closeUpload();
      common_vendor.index.showToast({
        title: "形象创建成功！",
        icon: "success"
      });
    }
  }
};
if (!Array) {
  const _component_upload_component = common_vendor.resolveComponent("upload-component");
  _component_upload_component();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showUpload
  }, $data.showUpload ? {
    b: common_vendor.o($options.closeUpload),
    c: common_vendor.o($options.handleUploadSuccess),
    d: common_vendor.p({
      config: $data.uploadConfig,
      accept: ["image", "video"],
      ["max-size"]: 300
    })
  } : {
    e: common_vendor.f($data.avatarList, (avatar, index, i0) => {
      return {
        a: avatar.image,
        b: common_vendor.o(($event) => $options.playAvatar(avatar), index),
        c: common_vendor.t(index + 1),
        d: common_vendor.o(($event) => $options.deleteAvatar(index), index),
        e: common_vendor.t(avatar.createTime),
        f: index
      };
    }),
    f: common_vendor.o((...args) => $options.createAvatar && $options.createAvatar(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e7391881"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/avatar/avatar.js.map
