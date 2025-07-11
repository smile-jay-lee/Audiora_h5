"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      voiceList: [
        {
          id: 1,
          name: "暖心学姐",
          tag: "标签1",
          avatar: "/static/avatar1.png",
          type: "female"
        },
        {
          id: 2,
          name: "正直青年",
          tag: "标签1",
          avatar: "/static/avatar2.png",
          type: "male"
        },
        {
          id: 3,
          name: "率真小伙",
          tag: "标签1",
          avatar: "/static/avatar3.png",
          type: "male"
        },
        {
          id: 4,
          name: "清澈样样",
          tag: "标签1",
          avatar: "/static/avatar4.png",
          type: "female"
        },
        {
          id: 5,
          name: "开朗姐姐",
          tag: "标签1",
          avatar: "/static/avatar5.png",
          type: "female"
        },
        {
          id: 6,
          name: "甜美悦说",
          tag: "标签1",
          avatar: "/static/avatar6.png",
          type: "female"
        },
        {
          id: 7,
          name: "美丽温柔女声",
          tag: "标签1",
          avatar: "/static/avatar7.png",
          type: "female"
        },
        {
          id: 8,
          name: "知性女声",
          tag: "标签1",
          avatar: "/static/avatar8.png",
          type: "female"
        },
        {
          id: 9,
          name: "清爽男大",
          tag: "标签1",
          avatar: "/static/avatar9.png",
          type: "male"
        },
        {
          id: 10,
          name: "渊博小叔",
          tag: "标签1",
          avatar: "/static/avatar10.png",
          type: "male"
        },
        {
          id: 11,
          name: "清新女声",
          tag: "标签1",
          avatar: "/static/avatar11.png",
          type: "female"
        },
        {
          id: 12,
          name: "灿灿",
          tag: "标签1",
          avatar: "/static/avatar12.png",
          type: "female"
        }
      ]
    };
  },
  onLoad() {
    this.loadVoiceList();
  },
  methods: {
    refreshPage() {
      common_vendor.index.showLoading({
        title: "刷新中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    },
    createVoice() {
      common_vendor.index.showModal({
        title: "创建声音模型",
        content: "请上传您的音频文件进行声音克隆",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.chooseFile({
              count: 1,
              type: "custom",
              extension: [".mp3", ".wav", ".m4a"],
              success: (res2) => {
                common_vendor.index.showToast({
                  title: "文件上传成功",
                  icon: "success"
                });
              }
            });
          }
        }
      });
    },
    selectVoice(voice) {
      common_vendor.index.showToast({
        title: `选择了 ${voice.name}`,
        icon: "none"
      });
    },
    addVoice() {
      common_vendor.index.showActionSheet({
        itemList: ["录制新声音", "上传音频文件"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.recordVoice();
              break;
            case 1:
              this.uploadVoice();
              break;
          }
        }
      });
    },
    recordVoice() {
      common_vendor.index.showToast({
        title: "开始录制",
        icon: "none"
      });
    },
    uploadVoice() {
      common_vendor.index.chooseFile({
        count: 1,
        type: "custom",
        extension: [".mp3", ".wav", ".m4a"],
        success: (res) => {
          common_vendor.index.showToast({
            title: "上传成功",
            icon: "success"
          });
        }
      });
    },
    selectFromLibrary() {
      common_vendor.index.showToast({
        title: "打开音库",
        icon: "none"
      });
    },
    loadVoiceList() {
      common_vendor.index.__f__("log", "at pages/voice/voice.vue:247", "加载声音列表");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.addVoice && $options.addVoice(...args)),
    b: common_vendor.f($data.voiceList, (voice, index, i0) => {
      return {
        a: voice.avatar,
        b: common_vendor.t(voice.name),
        c: common_vendor.t(voice.tag),
        d: index,
        e: common_vendor.o(($event) => $options.selectVoice(voice), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa0f82ad"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/voice/voice.js.map
