"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentFilter: "all",
      showUploadModal: false,
      uploadProgress: 0,
      uploadStatus: "准备上传...",
      audioList: [
        {
          id: 1,
          title: "女声朗读-新闻播报",
          duration: "02:45",
          size: "2.1MB",
          uploadDate: "2024-01-15",
          type: "voice",
          typeText: "人声",
          cover: "/static/audio_cover1.png",
          playing: false
        },
        {
          id: 2,
          title: "背景音乐-轻快节奏",
          duration: "03:20",
          size: "3.8MB",
          uploadDate: "2024-01-14",
          type: "music",
          typeText: "音乐",
          cover: "/static/audio_cover2.png",
          playing: false
        },
        {
          id: 3,
          title: "提示音效-成功",
          duration: "00:03",
          size: "125KB",
          uploadDate: "2024-01-13",
          type: "effect",
          typeText: "音效",
          cover: "/static/audio_cover3.png",
          playing: false
        },
        {
          id: 4,
          title: "男声对话-客服语音",
          duration: "01:30",
          size: "1.5MB",
          uploadDate: "2024-01-12",
          type: "voice",
          typeText: "人声",
          cover: "/static/audio_cover4.png",
          playing: false
        },
        {
          id: 5,
          title: "环境音效-办公室",
          duration: "10:00",
          size: "8.9MB",
          uploadDate: "2024-01-10",
          type: "effect",
          typeText: "音效",
          cover: "/static/audio_cover5.png",
          playing: false
        }
      ]
    };
  },
  computed: {
    filteredAudioList() {
      if (this.currentFilter === "all") {
        return this.audioList;
      }
      return this.audioList.filter((audio) => audio.type === this.currentFilter);
    }
  },
  onLoad() {
    this.loadAudioList();
  },
  methods: {
    loadAudioList() {
      common_vendor.index.__f__("log", "at pages/sound_library/sound_library.vue:190", "加载音频列表");
    },
    filterAudio(type) {
      this.currentFilter = type;
    },
    uploadAudio() {
      common_vendor.index.chooseFile({
        count: 5,
        type: "custom",
        extension: [".mp3", ".wav", ".m4a", ".aac", ".flac"],
        success: (res) => {
          this.showUploadModal = true;
          this.simulateUpload(res.tempFilePaths);
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "选择文件失败",
            icon: "none"
          });
        }
      });
    },
    simulateUpload(files) {
      this.uploadProgress = 0;
      this.uploadStatus = "正在上传...";
      const timer = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(timer);
          this.uploadStatus = "上传完成！";
          setTimeout(() => {
            this.closeUploadModal();
            this.addNewAudio(files);
          }, 1e3);
        }
      }, 200);
    },
    addNewAudio(files) {
      files.forEach((file, index) => {
        const newAudio = {
          id: Date.now() + index,
          title: `新音频文件${this.audioList.length + index + 1}`,
          duration: "00:00",
          size: "未知",
          uploadDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          type: "voice",
          typeText: "人声",
          cover: "/static/default_audio_cover.png",
          playing: false
        };
        this.audioList.unshift(newAudio);
      });
      common_vendor.index.showToast({
        title: "上传成功",
        icon: "success"
      });
    },
    closeUploadModal() {
      this.showUploadModal = false;
      this.uploadProgress = 0;
    },
    // recordAudio() {
    // 	uni.showActionSheet({
    // 		itemList: ['录制语音'],
    // 		success: (res) => {
    // 			switch(res.tapIndex) {
    // 				case 0:
    // 					this.startRecording('voice');
    // 					break;
    // case 1:
    // 	this.startRecording('effect');
    // 	break;
    // case 2:
    // 	this.startRecording('music');
    // 	break;
    // 			}
    // 		}
    // 	});
    // },
    startRecording(type) {
      common_vendor.index.showModal({
        title: "开始录音",
        content: "点击确定开始录制音频",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "录音开始",
              icon: "none"
            });
          }
        }
      });
    },
    playAudio(audio) {
      this.audioList.forEach((item) => {
        if (item.id !== audio.id) {
          item.playing = false;
        }
      });
      audio.playing = !audio.playing;
      if (audio.playing) {
        common_vendor.index.showToast({
          title: "开始播放",
          icon: "none"
        });
      } else {
        common_vendor.index.showToast({
          title: "暂停播放",
          icon: "none"
        });
      }
    },
    downloadAudio(audio) {
      common_vendor.index.showLoading({
        title: "下载中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "下载完成",
          icon: "success"
        });
      }, 2e3);
    },
    editAudio(audio) {
      common_vendor.index.showModal({
        title: "编辑音频",
        editable: true,
        placeholderText: "请输入新的音频标题",
        // 只放提示，不放旧标题
        showCancel: true,
        success: ({ confirm, content, value }) => {
          if (!confirm)
            return;
          const newTitle = (content ?? value).trim();
          if (newTitle) {
            audio.title = newTitle;
            common_vendor.index.showToast({ title: "修改成功", icon: "success" });
          }
        }
      });
    },
    deleteAudio(audio, index) {
      common_vendor.index.showModal({
        title: "删除确认",
        content: `确定要删除"${audio.title}"吗？`,
        success: (res) => {
          if (res.confirm) {
            this.audioList.splice(this.audioList.indexOf(audio), 1);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uni_icons2 + _easycom_uv_icon2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uv_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "cloud-upload",
      color: "#ffffff",
      size: "24"
    }),
    b: common_vendor.o((...args) => $options.startRecording && $options.startRecording(...args)),
    c: common_vendor.f($options.filteredAudioList, (audio, index, i0) => {
      return common_vendor.e({
        a: audio.cover,
        b: !audio.playing
      }, !audio.playing ? {} : {}, {
        c: common_vendor.o(($event) => $options.playAudio(audio), audio.id),
        d: common_vendor.t(audio.title),
        e: common_vendor.t(audio.duration),
        f: common_vendor.t(audio.size),
        g: common_vendor.t(audio.uploadDate),
        h: "c8c0509f-1-" + i0,
        i: common_vendor.o(($event) => $options.deleteAudio(audio, index), audio.id),
        j: audio.id
      });
    }),
    d: common_vendor.p({
      name: "trash",
      color: "#ffffff"
    }),
    e: $options.filteredAudioList.length === 0
  }, $options.filteredAudioList.length === 0 ? {
    f: common_vendor.o((...args) => $options.uploadAudio && $options.uploadAudio(...args))
  } : {}, {
    g: $data.showUploadModal
  }, $data.showUploadModal ? {
    h: common_vendor.o((...args) => $options.closeUploadModal && $options.closeUploadModal(...args)),
    i: $data.uploadProgress + "%",
    j: common_vendor.t($data.uploadProgress),
    k: common_vendor.t($data.uploadStatus)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8c0509f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sound_library/sound_library.js.map
