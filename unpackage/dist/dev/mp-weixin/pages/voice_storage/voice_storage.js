"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 语音列表
      voiceList: [
        {
          id: 1,
          name: "示例语音1.mp3",
          category: "个人录音",
          duration: 120,
          // 秒
          size: 2.5,
          // MB
          createTime: (/* @__PURE__ */ new Date()).getTime() - 864e5,
          url: "/static/demo_audio.mp3",
          isPlaying: false
        },
        {
          id: 2,
          name: "示例语音2.wav",
          category: "上传文件",
          duration: 85,
          size: 4.2,
          createTime: (/* @__PURE__ */ new Date()).getTime() - 1728e5,
          url: "/static/demo_audio2.mp3",
          isPlaying: false
        }
      ],
      // 分类
      categories: ["全部", "个人录音", "上传文件", "语音合成", "其他"],
      categoryList: [
        { name: "全部" },
        { name: "个人录音" },
        { name: "上传文件" },
        { name: "语音合成" },
        { name: "其他" }
      ],
      currentCategory: 0,
      // 弹窗控制
      showUploadModal: false,
      showRecordModal: false,
      showEditModal: false,
      // 录音相关
      recordTime: "00:00",
      recordTimer: null,
      recordStartTime: 0,
      recorderManager: null,
      // 编辑表单
      editForm: {
        id: "",
        name: "",
        category: ""
      },
      editIndex: -1,
      // 播放器相关
      currentPlayingVoice: null,
      audioContext: null,
      isPlaying: false,
      playCurrentTime: 0,
      playProgress: 0,
      playTimer: null
    };
  },
  computed: {
    // 筛选后的语音列表
    filteredVoiceList() {
      if (this.currentCategory === 0) {
        return this.voiceList;
      }
      const categoryName = this.categories[this.currentCategory];
      return this.voiceList.filter((item) => item.category === categoryName);
    },
    // 总时长
    totalDuration() {
      return this.voiceList.reduce((total, item) => total + item.duration, 0);
    },
    // 总大小
    totalSize() {
      return this.voiceList.reduce((total, item) => total + item.size, 0).toFixed(1);
    }
  },
  onLoad() {
    this.initAudio();
  },
  onUnload() {
    this.cleanup();
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 初始化音频
    initAudio() {
      this.recorderManager = common_vendor.index.getRecorderManager();
      this.recorderManager.onStart(() => {
        common_vendor.index.__f__("log", "at pages/voice_storage/voice_storage.vue:263", "录音开始");
        this.recordStartTime = Date.now();
        this.startRecordTimer();
      });
      this.recorderManager.onStop((res) => {
        common_vendor.index.__f__("log", "at pages/voice_storage/voice_storage.vue:269", "录音结束", res);
        this.stopRecordTimer();
        this.handleRecordResult(res);
      });
      this.audioContext = common_vendor.index.createInnerAudioContext();
      this.audioContext.onPlay(() => {
        this.isPlaying = true;
        this.startPlayTimer();
      });
      this.audioContext.onPause(() => {
        this.isPlaying = false;
        this.stopPlayTimer();
      });
      this.audioContext.onStop(() => {
        this.isPlaying = false;
        this.stopPlayTimer();
        this.currentPlayingVoice = null;
      });
      this.audioContext.onEnded(() => {
        this.isPlaying = false;
        this.stopPlayTimer();
        this.currentPlayingVoice.isPlaying = false;
        this.currentPlayingVoice = null;
      });
    },
    // 清理资源
    cleanup() {
      if (this.audioContext) {
        this.audioContext.stop();
        this.audioContext.destroy();
      }
      if (this.recordTimer) {
        clearInterval(this.recordTimer);
      }
      if (this.playTimer) {
        clearInterval(this.playTimer);
      }
    },
    // 分类切换
    onCategoryChange(index) {
      this.currentCategory = index;
    },
    // 选择文件上传
    async chooseFile() {
      this.showUploadModal = false;
      try {
        const res = await common_vendor.index.chooseFile({
          count: 1,
          type: "file",
          sourceType: ["album", "camera"]
        });
        const file = res.tempFiles[0];
        if (!this.isAudioFile(file.name)) {
          common_vendor.index.showToast({
            title: "请选择音频文件",
            icon: "none"
          });
          return;
        }
        this.addVoiceFile(file);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/voice_storage/voice_storage.vue:344", "选择文件失败:", error);
        common_vendor.index.showToast({
          title: "选择文件失败",
          icon: "none"
        });
      }
    },
    // 检查是否为音频文件
    isAudioFile(filename) {
      const audioExts = [".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"];
      const ext = filename.toLowerCase().substring(filename.lastIndexOf("."));
      return audioExts.includes(ext);
    },
    // 添加语音文件
    addVoiceFile(file) {
      const newVoice = {
        id: Date.now(),
        name: file.name,
        category: "上传文件",
        duration: 0,
        // 实际项目中需要获取音频时长
        size: (file.size / 1024 / 1024).toFixed(1),
        createTime: Date.now(),
        url: file.path,
        isPlaying: false
      };
      this.voiceList.unshift(newVoice);
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
      });
    },
    // 开始录音
    startRecord() {
      this.showUploadModal = false;
      this.showRecordModal = true;
      const options = {
        duration: 6e5,
        // 10分钟
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192e3,
        format: "mp3"
      };
      this.recorderManager.start(options);
    },
    // 开始录音计时
    startRecordTimer() {
      this.recordTimer = setInterval(() => {
        const elapsed = Date.now() - this.recordStartTime;
        const minutes = Math.floor(elapsed / 6e4);
        const seconds = Math.floor(elapsed % 6e4 / 1e3);
        this.recordTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }, 1e3);
    },
    // 停止录音计时
    stopRecordTimer() {
      if (this.recordTimer) {
        clearInterval(this.recordTimer);
        this.recordTimer = null;
      }
    },
    // 停止录音
    stopRecord() {
      this.recorderManager.stop();
    },
    // 取消录音
    cancelRecord() {
      this.recorderManager.stop();
      this.showRecordModal = false;
      this.recordTime = "00:00";
    },
    // 处理录音结果
    handleRecordResult(res) {
      this.showRecordModal = false;
      this.recordTime = "00:00";
      if (res.tempFilePath) {
        const newVoice = {
          id: Date.now(),
          name: `录音_${(/* @__PURE__ */ new Date()).toLocaleString()}.mp3`,
          category: "个人录音",
          duration: Math.floor(res.duration / 1e3),
          size: (res.fileSize / 1024 / 1024).toFixed(1),
          createTime: Date.now(),
          url: res.tempFilePath,
          isPlaying: false
        };
        this.voiceList.unshift(newVoice);
        common_vendor.index.showToast({
          title: "录音保存成功",
          icon: "success"
        });
      }
    },
    // 播放语音
    playVoice(item) {
      if (this.currentPlayingVoice && this.currentPlayingVoice.id !== item.id) {
        this.currentPlayingVoice.isPlaying = false;
        this.audioContext.stop();
      }
      if (item.isPlaying) {
        this.audioContext.pause();
        item.isPlaying = false;
      } else {
        this.audioContext.src = item.url;
        this.audioContext.play();
        item.isPlaying = true;
        this.currentPlayingVoice = item;
        this.playCurrentTime = 0;
        this.playProgress = 0;
      }
    },
    // 暂停播放
    pauseVoice() {
      this.audioContext.pause();
    },
    // 继续播放
    resumeVoice() {
      this.audioContext.play();
    },
    // 停止播放
    stopVoice() {
      this.audioContext.stop();
      if (this.currentPlayingVoice) {
        this.currentPlayingVoice.isPlaying = false;
      }
    },
    // 开始播放计时
    startPlayTimer() {
      this.playTimer = setInterval(() => {
        this.playCurrentTime = this.audioContext.currentTime;
        if (this.currentPlayingVoice) {
          this.playProgress = this.playCurrentTime / this.currentPlayingVoice.duration * 100;
        }
      }, 1e3);
    },
    // 停止播放计时
    stopPlayTimer() {
      if (this.playTimer) {
        clearInterval(this.playTimer);
        this.playTimer = null;
      }
    },
    // 进度条变化
    onProgressChange(value) {
      if (this.currentPlayingVoice) {
        const targetTime = value / 100 * this.currentPlayingVoice.duration;
        this.audioContext.seek(targetTime);
      }
    },
    // 编辑语音
    editVoice(item) {
      this.editForm = {
        id: item.id,
        name: item.name,
        category: item.category
      };
      this.editIndex = this.voiceList.findIndex((voice) => voice.id === item.id);
      this.showEditModal = true;
    },
    // 编辑分类选择
    onEditCategoryChange(value) {
      this.editForm.category = this.categories[value];
    },
    // 保存编辑
    saveEdit() {
      if (!this.editForm.name.trim()) {
        common_vendor.index.showToast({
          title: "请输入语音名称",
          icon: "none"
        });
        return;
      }
      if (this.editIndex >= 0) {
        this.voiceList[this.editIndex].name = this.editForm.name;
        this.voiceList[this.editIndex].category = this.editForm.category;
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        this.showEditModal = false;
      }
    },
    // 删除语音
    deleteVoice(item, index) {
      common_vendor.index.showModal({
        title: "确认删除",
        content: `确定要删除"${item.name}"吗？`,
        success: (res) => {
          if (res.confirm) {
            if (this.currentPlayingVoice && this.currentPlayingVoice.id === item.id) {
              this.audioContext.stop();
            }
            this.voiceList.splice(this.voiceList.findIndex((voice) => voice.id === item.id), 1);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 格式化时长
    formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },
    // 格式化文件大小
    formatSize(sizeMB) {
      return `${sizeMB}MB`;
    },
    // 格式化日期
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - timestamp;
      if (diff < 864e5) {
        return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
      } else if (diff < 6048e5) {
        const days = Math.floor(diff / 864e5);
        return `${days}天前`;
      } else {
        return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_tags2 = common_vendor.resolveComponent("uv-tags");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_picker2 = common_vendor.resolveComponent("uv-picker");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_slider2 = common_vendor.resolveComponent("uv-slider");
  (_easycom_uv_icon2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_uv_empty2 + _easycom_uv_button2 + _easycom_uv_tags2 + _easycom_uv_popup2 + _easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_picker2 + _easycom_uv_form2 + _easycom_uv_slider2)();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_tags = () => "../../uni_modules/uv-tags/components/uv-tags/uv-tags.js";
const _easycom_uv_popup = () => "../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_picker = () => "../../uni_modules/uv-picker/components/uv-picker/uv-picker.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_slider = () => "../../uni_modules/uv-slider/components/uv-slider/uv-slider.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_navbar + _easycom_uv_tabs + _easycom_uv_empty + _easycom_uv_button + _easycom_uv_tags + _easycom_uv_popup + _easycom_uv_input + _easycom_uv_form_item + _easycom_uv_picker + _easycom_uv_form + _easycom_uv_slider)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      name: "arrow-left",
      size: "18"
    }),
    c: common_vendor.o(($event) => $data.showUploadModal = true),
    d: common_vendor.p({
      name: "plus",
      size: "18"
    }),
    e: common_vendor.p({
      title: "语音存储",
      border: true,
      placeholder: true,
      ["bg-color"]: "#ffffff"
    }),
    f: common_vendor.t($data.voiceList.length),
    g: common_vendor.t($options.totalDuration),
    h: common_vendor.t($options.totalSize),
    i: common_vendor.o($options.onCategoryChange),
    j: common_vendor.p({
      list: $data.categoryList,
      current: $data.currentCategory,
      activeColor: "#007AFF",
      inactiveColor: "#666666",
      bold: false
    }),
    k: $options.filteredVoiceList.length === 0
  }, $options.filteredVoiceList.length === 0 ? {
    l: common_vendor.p({
      mode: "data",
      text: "暂无语音文件"
    }),
    m: common_vendor.o(($event) => $data.showUploadModal = true),
    n: common_vendor.p({
      type: "primary"
    })
  } : {}, {
    o: common_vendor.f($options.filteredVoiceList, (item, index, i0) => {
      return {
        a: "b80da2ca-6-" + i0,
        b: common_vendor.p({
          name: item.isPlaying ? "pause-circle-fill" : "play-circle-fill",
          size: "40",
          color: "#007AFF"
        }),
        c: common_vendor.o(($event) => $options.playVoice(item), item.id),
        d: common_vendor.t(item.name),
        e: common_vendor.t($options.formatDuration(item.duration)),
        f: common_vendor.t($options.formatSize(item.size)),
        g: common_vendor.t($options.formatDate(item.createTime)),
        h: "b80da2ca-7-" + i0,
        i: common_vendor.p({
          text: item.category,
          type: "info",
          size: "mini"
        }),
        j: common_vendor.o(($event) => $options.editVoice(item), item.id),
        k: "b80da2ca-8-" + i0,
        l: common_vendor.o(($event) => $options.deleteVoice(item, index), item.id),
        m: "b80da2ca-9-" + i0,
        n: item.id
      };
    }),
    p: common_vendor.p({
      name: "edit-pen",
      size: "16",
      color: "#909399"
    }),
    q: common_vendor.p({
      name: "trash",
      size: "16",
      color: "#F56C6C"
    }),
    r: common_vendor.o(($event) => $data.showUploadModal = false),
    s: common_vendor.p({
      name: "close",
      size: "18"
    }),
    t: common_vendor.p({
      name: "folder",
      size: "24",
      color: "#007AFF"
    }),
    v: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    w: common_vendor.p({
      name: "mic",
      size: "24",
      color: "#FF6B35"
    }),
    x: common_vendor.o((...args) => $options.startRecord && $options.startRecord(...args)),
    y: common_vendor.o(($event) => $data.showUploadModal = $event),
    z: common_vendor.p({
      mode: "bottom",
      ["border-radius"]: "20",
      ["safe-area-inset-bottom"]: true,
      modelValue: $data.showUploadModal
    }),
    A: common_vendor.t($data.recordTime),
    B: common_vendor.f(20, (n, k0, i0) => {
      return {
        a: n
      };
    }),
    C: Math.random() * 30 + 10 + "px",
    D: common_vendor.o($options.stopRecord),
    E: common_vendor.p({
      type: "primary"
    }),
    F: common_vendor.o($options.cancelRecord),
    G: common_vendor.p({
      type: "default"
    }),
    H: common_vendor.o(($event) => $data.showRecordModal = $event),
    I: common_vendor.p({
      mode: "center",
      ["border-radius"]: "20",
      width: "300",
      modelValue: $data.showRecordModal
    }),
    J: common_vendor.o(($event) => $data.editForm.name = $event),
    K: common_vendor.p({
      placeholder: "请输入语音名称",
      modelValue: $data.editForm.name
    }),
    L: common_vendor.p({
      label: "语音名称",
      prop: "name"
    }),
    M: common_vendor.o(($event) => $data.editForm.category = $event),
    N: common_vendor.p({
      placeholder: "请选择分类",
      readonly: true,
      modelValue: $data.editForm.category
    }),
    O: common_vendor.o($options.onEditCategoryChange),
    P: common_vendor.o(($event) => $data.editForm.category = $event),
    Q: common_vendor.p({
      range: $data.categories,
      modelValue: $data.editForm.category
    }),
    R: common_vendor.p({
      label: "分类",
      prop: "category"
    }),
    S: common_vendor.sr("editFormRef", "b80da2ca-18,b80da2ca-17"),
    T: common_vendor.p({
      model: $data.editForm
    }),
    U: common_vendor.o($options.saveEdit),
    V: common_vendor.p({
      type: "primary"
    }),
    W: common_vendor.o(($event) => $data.showEditModal = false),
    X: common_vendor.p({
      type: "default"
    }),
    Y: common_vendor.o(($event) => $data.showEditModal = $event),
    Z: common_vendor.p({
      mode: "center",
      ["border-radius"]: "20",
      width: "300",
      modelValue: $data.showEditModal
    }),
    aa: $data.currentPlayingVoice
  }, $data.currentPlayingVoice ? common_vendor.e({
    ab: common_vendor.t($data.currentPlayingVoice.name),
    ac: common_vendor.t($options.formatDuration($data.playCurrentTime)),
    ad: common_vendor.t($options.formatDuration($data.currentPlayingVoice.duration)),
    ae: $data.isPlaying
  }, $data.isPlaying ? {
    af: common_vendor.o($options.pauseVoice),
    ag: common_vendor.p({
      name: "pause",
      size: "20"
    })
  } : {
    ah: common_vendor.o($options.resumeVoice),
    ai: common_vendor.p({
      name: "play",
      size: "20"
    })
  }, {
    aj: common_vendor.o($options.stopVoice),
    ak: common_vendor.p({
      name: "close",
      size: "16"
    }),
    al: common_vendor.o($options.onProgressChange),
    am: common_vendor.o(($event) => $data.playProgress = $event),
    an: common_vendor.p({
      ["active-color"]: "#007AFF",
      ["inactive-color"]: "#E4E7ED",
      ["show-value"]: false,
      modelValue: $data.playProgress
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b80da2ca"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/voice_storage/voice_storage.js.map
