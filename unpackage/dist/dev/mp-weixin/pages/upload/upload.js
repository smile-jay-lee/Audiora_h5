"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "UploadComponent",
  props: {
    // 配置选项
    config: {
      type: Object,
      default: () => ({
        title: "上传形象",
        nameLabel: "形象名称",
        namePlaceholder: "请输入作品名称",
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
      })
    },
    // 允许的文件类型
    accept: {
      type: Array,
      default: () => ["image", "video"]
    },
    // 最大文件大小 (MB)
    maxSize: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      fileName: "",
      selectedFile: null,
      fileUrl: "",
      fileType: "",
      uploading: false
    };
  },
  computed: {
    canUpload() {
      return this.fileName.trim().length > 0 && this.selectedFile;
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$emit("back");
      setTimeout(() => {
        if (this.$listeners && !this.$listeners.back) {
          common_vendor.index.navigateBack();
        }
      }, 0);
    },
    // 选择文件
    chooseFile() {
      common_vendor.index.showActionSheet({
        itemList: ["从相册选择", "拍摄"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.chooseMedia({
              count: 1,
              mediaType: this.accept,
              sourceType: ["album"],
              maxDuration: 60,
              camera: "back",
              success: (res2) => {
                this.handleFileSelect(res2.tempFiles[0]);
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/upload/upload.vue:252", "选择文件失败:", err);
                this.$refs.toast.show({
                  title: "选择文件失败",
                  type: "error"
                });
              }
            });
          } else if (res.tapIndex === 1) {
            common_vendor.index.chooseMedia({
              count: 1,
              mediaType: this.accept,
              sourceType: ["camera"],
              maxDuration: 60,
              camera: "back",
              success: (res2) => {
                this.handleFileSelect(res2.tempFiles[0]);
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/upload/upload.vue:271", "拍摄失败:", err);
                this.$refs.toast.show({
                  title: "拍摄失败",
                  type: "error"
                });
              }
            });
          }
        }
      });
    },
    // 处理文件选择
    handleFileSelect(file) {
      common_vendor.index.__f__("log", "at pages/upload/upload.vue:285", "选择的文件:", file);
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.maxSize) {
        this.$refs.toast.show({
          title: `文件大小不能超过${this.maxSize}MB`,
          type: "warning"
        });
        return;
      }
      let fileType = "file";
      if (file.tempFilePath) {
        const extension = file.tempFilePath.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
          fileType = "image";
        } else if (["mp4", "mov", "avi", "wmv", "3gp"].includes(extension)) {
          fileType = "video";
        } else if (["mp3", "wav", "aac", "m4a"].includes(extension)) {
          fileType = "audio";
        }
      }
      this.selectedFile = file;
      this.fileUrl = file.tempFilePath;
      this.fileType = fileType;
      if (!this.fileName.trim()) {
        const fileName = file.tempFilePath.split("/").pop().split(".")[0];
        this.fileName = fileName;
      }
      this.$refs.toast.show({
        title: "文件选择成功",
        type: "success"
      });
    },
    // 删除文件
    removeFile() {
      this.selectedFile = null;
      this.fileUrl = "";
      this.fileType = "";
      this.$refs.toast.show({
        title: "文件已移除",
        type: "default"
      });
    },
    // 确认上传
    confirmUpload() {
      if (!this.canUpload) {
        this.$refs.toast.show({
          title: "请完善上传信息",
          type: "warning"
        });
        return;
      }
      this.uploading = true;
      setTimeout(() => {
        this.uploading = false;
        this.$emit("upload-success", {
          name: this.fileName,
          file: this.selectedFile,
          url: this.fileUrl,
          type: this.fileType
        });
        this.$refs.toast.show({
          title: "上传成功！",
          type: "success"
        });
        setTimeout(() => {
          this.resetForm();
        }, 1500);
      }, 2e3);
    },
    // 重置表单
    resetForm() {
      this.fileName = "";
      this.selectedFile = null;
      this.fileUrl = "";
      this.fileType = "";
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_easycom_u_input2 + _easycom_u_button2 + _easycom_u_toast2)();
}
const _easycom_u_input = () => "../../node-modules/@climblee/uv-ui/components/uv-input/uv-input.js";
const _easycom_u_button = () => "../../node-modules/@climblee/uv-ui/components/uv-button/uv-button.js";
const _easycom_u_toast = () => "../../node-modules/@climblee/uv-ui/components/uv-toast/uv-toast.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_button + _easycom_u_toast)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.t($props.config.title),
    c: common_vendor.t($props.config.nameLabel),
    d: common_vendor.o(($event) => $data.fileName = $event),
    e: common_vendor.p({
      placeholder: $props.config.namePlaceholder,
      border: false,
      customStyle: {
        fontSize: "16px",
        padding: "16px",
        backgroundColor: "transparent"
      },
      modelValue: $data.fileName
    }),
    f: common_vendor.t($props.config.configTitle),
    g: !$data.selectedFile
  }, !$data.selectedFile ? {
    h: common_vendor.t($props.config.uploadMainText),
    i: common_vendor.t($props.config.uploadSubText)
  } : common_vendor.e({
    j: $data.fileType === "image"
  }, $data.fileType === "image" ? {
    k: $data.fileUrl
  } : $data.fileType === "video" ? {
    m: $data.fileUrl
  } : $data.fileType === "audio" ? {
    o: common_vendor.t($data.selectedFile.name)
  } : {
    p: common_vendor.t($data.selectedFile.name)
  }, {
    l: $data.fileType === "video",
    n: $data.fileType === "audio",
    q: common_vendor.o((...args) => $options.removeFile && $options.removeFile(...args))
  }), {
    r: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    s: common_vendor.t($props.config.requirements.size),
    t: common_vendor.t($props.config.requirements.format),
    v: common_vendor.t($props.config.requirements.quality),
    w: common_vendor.t($props.config.requirements.duration),
    x: common_vendor.t($props.config.requirements.frameRate),
    y: common_vendor.t($props.config.requirements.fileSize),
    z: common_vendor.f($props.config.tips, (tip, index, i0) => {
      return {
        a: common_vendor.t(tip),
        b: index
      };
    }),
    A: common_vendor.t($data.uploading ? "上传中..." : $props.config.confirmText),
    B: common_vendor.o($options.confirmUpload),
    C: common_vendor.p({
      type: "primary",
      size: "large",
      disabled: !$options.canUpload,
      loading: $data.uploading,
      customStyle: {
        width: "100%",
        height: "52px",
        borderRadius: "26px",
        fontSize: "18px",
        fontWeight: "600",
        background: $options.canUpload ? "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" : "#E5E7EB",
        border: "none"
      }
    }),
    D: common_vendor.sr("toast", "aa5cff34-2")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aa5cff34"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/upload/upload.js.map
