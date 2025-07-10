"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "CreatePage",
  data() {
    return {
      // 基础数据
      workName: "",
      currentMode: "text",
      // text: 文本驱动, audio: 音效驱动
      showMenu: false,
      generating: false,
      // 选中的素材
      selectedCharacter: null,
      selectedVoice: null,
      selectedAudio: null,
      // 文本模式
      scriptText: "",
      // 音频模式
      audioPlaying: false,
      audioProgress: 0,
      // 弹窗状态
      characterPopup: false,
      voicePopup: false,
      audioPopup: false,
      // 素材列表
      characterList: [
        {
          id: 1,
          name: "小美",
          avatar: "/static/ai_person.png",
          type: "female"
        },
        {
          id: 2,
          name: "小帅",
          avatar: "/static/ai_person.png",
          type: "male"
        },
        {
          id: 3,
          name: "小可爱",
          avatar: "/static/ai_person.png",
          type: "child"
        }
      ],
      voiceList: [
        {
          id: 1,
          name: "甜美女声",
          description: "温柔甜美的女性声音",
          url: ""
        },
        {
          id: 2,
          name: "磁性男声",
          description: "低沉有磁性的男性声音",
          url: ""
        },
        {
          id: 3,
          name: "童声萝莉",
          description: "可爱的儿童声音",
          url: ""
        }
      ],
      audioList: [
        {
          id: 1,
          name: "轻松愉快",
          duration: "2:30",
          url: ""
        },
        {
          id: 2,
          name: "激昂励志",
          duration: "3:15",
          url: ""
        },
        {
          id: 3,
          name: "温馨浪漫",
          duration: "2:45",
          url: ""
        }
      ]
    };
  },
  computed: {
    // 是否可以预览
    canPreview() {
      if (this.currentMode === "text") {
        return this.selectedCharacter && this.selectedVoice && this.scriptText.trim().length > 0;
      } else {
        return this.selectedCharacter && this.selectedAudio;
      }
    },
    // 是否可以合成
    canGenerate() {
      return this.canPreview && this.workName.trim().length > 0;
    }
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/create/create.vue:394", "创作页面加载");
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 切换创作模式
    switchMode(mode) {
      this.currentMode = mode;
      if (mode === "text") {
        this.selectedAudio = null;
      } else {
        this.selectedVoice = null;
        this.scriptText = "";
      }
    },
    // 选择人物
    selectCharacter() {
      this.characterPopup = true;
    },
    chooseCharacter(character) {
      this.selectedCharacter = character;
      this.characterPopup = false;
      this.$refs.toast.show({
        title: `已选择人物：${character.name}`,
        type: "success"
      });
    },
    // 选择声音
    selectVoice() {
      this.voicePopup = true;
    },
    chooseVoice(voice) {
      this.selectedVoice = voice;
      this.voicePopup = false;
      this.$refs.toast.show({
        title: `已选择声音：${voice.name}`,
        type: "success"
      });
    },
    // 播放声音
    playVoice() {
      if (this.selectedVoice) {
        this.$refs.toast.show({
          title: "播放声音示例",
          type: "default"
        });
      }
    },
    playVoiceOption(voice) {
      this.$refs.toast.show({
        title: `播放 ${voice.name}`,
        type: "default"
      });
    },
    // 选择音频
    selectAudio() {
      this.audioPopup = true;
    },
    chooseAudio(audio) {
      this.selectedAudio = audio;
      this.audioPopup = false;
      this.$refs.toast.show({
        title: `已选择音频：${audio.name}`,
        type: "success"
      });
    },
    // 播放音频
    playAudio() {
      if (this.selectedAudio) {
        this.audioPlaying = !this.audioPlaying;
        if (this.audioPlaying) {
          this.simulateAudioProgress();
        }
      }
    },
    playAudioOption(audio) {
      this.$refs.toast.show({
        title: `播放 ${audio.name}`,
        type: "default"
      });
    },
    // 模拟音频播放进度
    simulateAudioProgress() {
      if (!this.audioPlaying)
        return;
      const interval = setInterval(() => {
        if (!this.audioPlaying) {
          clearInterval(interval);
          return;
        }
        this.audioProgress += 2;
        if (this.audioProgress >= 100) {
          this.audioProgress = 100;
          this.audioPlaying = false;
          clearInterval(interval);
          setTimeout(() => {
            this.audioProgress = 0;
          }, 1e3);
        }
      }, 100);
    },
    // 预览作品
    previewWork() {
      if (!this.canPreview) {
        this.$refs.toast.show({
          title: "请先完善素材选择",
          type: "warning"
        });
        return;
      }
      this.$refs.toast.show({
        title: "正在生成预览...",
        type: "loading"
      });
      setTimeout(() => {
        this.$refs.toast.show({
          title: "预览生成完成",
          type: "success"
        });
      }, 2e3);
    },
    // 开始合成
    startGenerate() {
      if (!this.canGenerate) {
        this.$refs.toast.show({
          title: "请完善作品信息",
          type: "warning"
        });
        return;
      }
      this.generating = true;
      setTimeout(() => {
        this.generating = false;
        this.$refs.toast.show({
          title: "作品合成完成！",
          type: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/my/my"
          });
        }, 1500);
      }, 3e3);
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_textarea2 = common_vendor.resolveComponent("u-textarea");
  const _easycom_u_line_progress2 = common_vendor.resolveComponent("u-line-progress");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_toast2 = common_vendor.resolveComponent("u-toast");
  (_easycom_u_input2 + _easycom_u_textarea2 + _easycom_u_line_progress2 + _easycom_u_button2 + _easycom_u_popup2 + _easycom_u_toast2)();
}
const _easycom_u_input = () => "../../node-modules/@climblee/uv-ui/components/uv-input/uv-input.js";
const _easycom_u_textarea = () => "../../node-modules/@climblee/uv-ui/components/uv-textarea/uv-textarea.js";
const _easycom_u_line_progress = () => "../../node-modules/@climblee/uv-ui/components/uv-line-progress/uv-line-progress.js";
const _easycom_u_button = () => "../../node-modules/@climblee/uv-ui/components/uv-button/uv-button.js";
const _easycom_u_popup = () => "../../node-modules/@climblee/uv-ui/components/uv-popup/uv-popup.js";
const _easycom_u_toast = () => "../../node-modules/@climblee/uv-ui/components/uv-toast/uv-toast.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_textarea + _easycom_u_line_progress + _easycom_u_button + _easycom_u_popup + _easycom_u_toast)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o(($event) => $data.showMenu = !$data.showMenu),
    c: common_vendor.o(($event) => $data.workName = $event),
    d: common_vendor.p({
      placeholder: "请输入作品名称",
      border: false,
      customStyle: {
        fontSize: "16px",
        padding: "12px 16px"
      },
      modelValue: $data.workName
    }),
    e: common_vendor.o((...args) => $options.selectCharacter && $options.selectCharacter(...args)),
    f: $data.selectedCharacter
  }, $data.selectedCharacter ? {
    g: $data.selectedCharacter.avatar,
    h: common_vendor.t($data.selectedCharacter.name)
  } : {}, {
    i: common_vendor.o((...args) => $options.selectCharacter && $options.selectCharacter(...args)),
    j: $data.currentMode === "text" ? 1 : "",
    k: common_vendor.o(($event) => $options.switchMode("text")),
    l: $data.currentMode === "audio" ? 1 : "",
    m: common_vendor.o(($event) => $options.switchMode("audio")),
    n: $data.currentMode === "text"
  }, $data.currentMode === "text" ? common_vendor.e({
    o: common_vendor.o((...args) => $options.selectVoice && $options.selectVoice(...args)),
    p: $data.selectedVoice
  }, $data.selectedVoice ? {
    q: common_vendor.t($data.selectedVoice.name),
    r: common_vendor.t($data.selectedVoice.description),
    s: common_vendor.o((...args) => $options.playVoice && $options.playVoice(...args))
  } : {}, {
    t: common_vendor.o((...args) => $options.selectVoice && $options.selectVoice(...args)),
    v: common_vendor.t($data.scriptText.length),
    w: common_vendor.o(($event) => $data.scriptText = $event),
    x: common_vendor.p({
      placeholder: "请输入台词内容，最多500字",
      maxlength: 500,
      autoHeight: true,
      customStyle: {
        minHeight: "120px",
        fontSize: "16px",
        lineHeight: "1.6",
        padding: "16px"
      },
      modelValue: $data.scriptText
    })
  }) : {}, {
    y: $data.currentMode === "audio"
  }, $data.currentMode === "audio" ? common_vendor.e({
    z: common_vendor.o((...args) => $options.selectAudio && $options.selectAudio(...args)),
    A: $data.selectedAudio
  }, $data.selectedAudio ? {
    B: common_vendor.t($data.selectedAudio.name),
    C: common_vendor.t($data.selectedAudio.duration),
    D: common_vendor.t($data.audioPlaying ? "⏸️" : "▶️"),
    E: common_vendor.o((...args) => $options.playAudio && $options.playAudio(...args)),
    F: common_vendor.p({
      percent: $data.audioProgress,
      activeColor: "#FF6B35",
      inactiveColor: "#E5E5E5",
      height: 4
    })
  } : {}, {
    G: common_vendor.o((...args) => $options.selectAudio && $options.selectAudio(...args))
  }) : {}, {
    H: $options.canPreview
  }, $options.canPreview ? {} : {}, {
    I: common_vendor.o($options.previewWork),
    J: common_vendor.p({
      type: "default",
      size: "large",
      customStyle: {
        width: "120px",
        height: "48px",
        borderRadius: "24px",
        fontSize: "16px"
      },
      disabled: !$options.canPreview
    }),
    K: common_vendor.t($data.generating ? "合成中..." : "🚀 开始合成"),
    L: common_vendor.o($options.startGenerate),
    M: common_vendor.p({
      type: "primary",
      size: "large",
      customStyle: {
        width: "120px",
        height: "48px",
        borderRadius: "24px",
        fontSize: "16px",
        background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
        border: "none"
      },
      disabled: !$options.canGenerate,
      loading: $data.generating
    }),
    N: common_vendor.o(($event) => $data.characterPopup = false),
    O: common_vendor.f($data.characterList, (character, k0, i0) => {
      return common_vendor.e({
        a: character.avatar,
        b: common_vendor.t(character.name),
        c: $data.selectedCharacter && $data.selectedCharacter.id === character.id
      }, $data.selectedCharacter && $data.selectedCharacter.id === character.id ? {} : {}, {
        d: character.id,
        e: $data.selectedCharacter && $data.selectedCharacter.id === character.id ? 1 : "",
        f: common_vendor.o(($event) => $options.chooseCharacter(character), character.id)
      });
    }),
    P: common_vendor.o(($event) => $data.characterPopup = $event),
    Q: common_vendor.p({
      mode: "bottom",
      round: 20,
      modelValue: $data.characterPopup
    }),
    R: common_vendor.o(($event) => $data.voicePopup = false),
    S: common_vendor.f($data.voiceList, (voice, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(voice.name),
        b: common_vendor.t(voice.description),
        c: common_vendor.o(($event) => $options.playVoiceOption(voice), voice.id),
        d: $data.selectedVoice && $data.selectedVoice.id === voice.id
      }, $data.selectedVoice && $data.selectedVoice.id === voice.id ? {} : {}, {
        e: voice.id,
        f: $data.selectedVoice && $data.selectedVoice.id === voice.id ? 1 : "",
        g: common_vendor.o(($event) => $options.chooseVoice(voice), voice.id)
      });
    }),
    T: common_vendor.o(($event) => $data.voicePopup = $event),
    U: common_vendor.p({
      mode: "bottom",
      round: 20,
      modelValue: $data.voicePopup
    }),
    V: common_vendor.o(($event) => $data.audioPopup = false),
    W: common_vendor.f($data.audioList, (audio, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(audio.name),
        b: common_vendor.t(audio.duration),
        c: common_vendor.o(($event) => $options.playAudioOption(audio), audio.id),
        d: $data.selectedAudio && $data.selectedAudio.id === audio.id
      }, $data.selectedAudio && $data.selectedAudio.id === audio.id ? {} : {}, {
        e: audio.id,
        f: $data.selectedAudio && $data.selectedAudio.id === audio.id ? 1 : "",
        g: common_vendor.o(($event) => $options.chooseAudio(audio), audio.id)
      });
    }),
    X: common_vendor.o(($event) => $data.audioPopup = $event),
    Y: common_vendor.p({
      mode: "bottom",
      round: 20,
      modelValue: $data.audioPopup
    }),
    Z: common_vendor.sr("toast", "98f0e4ec-8")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-98f0e4ec"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/create/create.js.map
