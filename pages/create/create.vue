<template>
  <view class="create-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="back-btn" @click="goBack">
          <text class="back-icon">⬅️</text>
        </view>
        <view class="title">创作中心</view>
        <view class="menu-btn" @click="showMenu = !showMenu">
          <text class="menu-icon">⋯</text>
        </view>
      </view>
    </view>

    <!-- 作品名称输入 -->
    <view class="work-name-section">
      <view class="input-wrapper">
        <u-input 
          v-model="workName" 
          placeholder="请输入作品名称" 
          :border="false"
          :customStyle="{ fontSize: '16px', padding: '12px 16px' }"
        />
      </view>
    </view>

    <!-- 人物素材选择 -->
    <view class="character-section">
      <view class="section-header">
        <text class="section-title">🎭 人物素材</text>
        <text class="select-btn" @click="selectCharacter">选择</text>
      </view>
      <view class="character-preview" @click="selectCharacter">
        <view v-if="selectedCharacter" class="character-item">
          <image :src="selectedCharacter.avatar" class="character-avatar" mode="aspectFill" />
          <text class="character-name">{{ selectedCharacter.name }}</text>
        </view>
        <view v-else class="character-placeholder">
          <text class="placeholder-icon">➕</text>
          <text class="placeholder-text">点击选择人物形象</text>
        </view>
      </view>
    </view>

    <!-- 创作模式切换 -->
    <view class="mode-section">
      <view class="section-header">
        <text class="section-title">🎬 创作模式</text>
      </view>
      <view class="mode-tabs">
        <view 
          class="mode-tab" 
          :class="{ active: currentMode === 'text' }"
          @click="switchMode('text')"
        >
          <text class="mode-icon">📝</text>
          <text class="mode-label">文本驱动</text>
        </view>
        <view 
          class="mode-tab" 
          :class="{ active: currentMode === 'audio' }"
          @click="switchMode('audio')"
        >
          <text class="mode-icon">🎵</text>
          <text class="mode-label">音效驱动</text>
        </view>
      </view>
    </view>

    <!-- 文本驱动模式 -->
    <view v-if="currentMode === 'text'" class="text-mode">
      <!-- 声音素材选择 -->
      <view class="voice-section">
        <view class="section-header">
          <text class="section-title">🎤 声音素材</text>
          <text class="select-btn" @click="selectVoice">选择</text>
        </view>
        <view class="voice-preview" @click="selectVoice">
          <view v-if="selectedVoice" class="voice-item">
            <view class="voice-info">
              <text class="voice-name">{{ selectedVoice.name }}</text>
              <text class="voice-desc">{{ selectedVoice.description }}</text>
            </view>
            <view class="voice-play" @click.stop="playVoice">
              <text class="play-icon">▶️</text>
            </view>
          </view>
          <view v-else class="voice-placeholder">
            <text class="placeholder-icon">🎤</text>
            <text class="placeholder-text">点击选择声音素材</text>
          </view>
        </view>
      </view>

      <!-- 台词输入 -->
      <view class="script-section">
        <view class="section-header">
          <text class="section-title">📖 台词内容</text>
          <text class="word-count">{{ scriptText.length }}/500</text>
        </view>
        <view class="script-input">
          <u-textarea
            v-model="scriptText"
            placeholder="请输入台词内容，最多500字"
            :maxlength="500"
            :autoHeight="true"
            :customStyle="{ 
              minHeight: '120px',
              fontSize: '16px',
              lineHeight: '1.6',
              padding: '16px'
            }"
          />
        </view>
      </view>
    </view>

    <!-- 音效驱动模式 -->
    <view v-if="currentMode === 'audio'" class="audio-mode">
      <view class="audio-section">
        <view class="section-header">
          <text class="section-title">🎵 音频素材</text>
          <text class="select-btn" @click="selectAudio">选择</text>
        </view>
        <view class="audio-preview" @click="selectAudio">
          <view v-if="selectedAudio" class="audio-item">
            <view class="audio-info">
              <text class="audio-name">{{ selectedAudio.name }}</text>
              <text class="audio-duration">{{ selectedAudio.duration }}</text>
            </view>
            <view class="audio-controls">
              <view class="audio-play" @click.stop="playAudio">
                <text class="play-icon">{{ audioPlaying ? '⏸️' : '▶️' }}</text>
              </view>
              <view class="audio-progress">
                <u-line-progress 
                  :percent="audioProgress" 
                  :activeColor="'#FF6B35'"
                  :inactiveColor="'#E5E5E5'"
                  :height="4"
                />
              </view>
            </view>
          </view>
          <view v-else class="audio-placeholder">
            <text class="placeholder-icon">🎵</text>
            <text class="placeholder-text">点击选择音频素材</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作区 -->
    <view class="bottom-actions">
      <view class="preview-section" v-if="canPreview">
        <text class="preview-label">📱 作品预览</text>
        <view class="preview-placeholder">
          <text class="preview-icon">🎬</text>
          <text class="preview-text">点击试听合成效果</text>
        </view>
      </view>
      
      <view class="action-buttons">
        <u-button 
          type="default" 
          size="large"
          :customStyle="{ 
            width: '120px',
            height: '48px',
            borderRadius: '24px',
            fontSize: '16px'
          }"
          @click="previewWork"
          :disabled="!canPreview"
        >
          🎧 试听
        </u-button>
        <u-button 
          type="primary" 
          size="large"
          :customStyle="{ 
            width: '120px',
            height: '48px',
            borderRadius: '24px',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none'
          }"
          @click="startGenerate"
          :disabled="!canGenerate"
          :loading="generating"
        >
          {{ generating ? '合成中...' : '🚀 开始合成' }}
        </u-button>
      </view>
    </view>

    <!-- 人物选择弹窗 -->
    <u-popup v-model="characterPopup" mode="bottom" :round="20">
      <view class="character-popup">
        <view class="popup-header">
          <text class="popup-title">选择人物形象</text>
          <text class="popup-close" @click="characterPopup = false">✕</text>
        </view>
        <view class="character-list">
          <view 
            v-for="character in characterList" 
            :key="character.id"
            class="character-option"
            :class="{ selected: selectedCharacter && selectedCharacter.id === character.id }"
            @click="chooseCharacter(character)"
          >
            <image :src="character.avatar" class="option-avatar" mode="aspectFill" />
            <text class="option-name">{{ character.name }}</text>
            <text v-if="selectedCharacter && selectedCharacter.id === character.id" class="selected-icon">✓</text>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 声音选择弹窗 -->
    <u-popup v-model="voicePopup" mode="bottom" :round="20">
      <view class="voice-popup">
        <view class="popup-header">
          <text class="popup-title">选择声音素材</text>
          <text class="popup-close" @click="voicePopup = false">✕</text>
        </view>
        <view class="voice-list">
          <view 
            v-for="voice in voiceList" 
            :key="voice.id"
            class="voice-option"
            :class="{ selected: selectedVoice && selectedVoice.id === voice.id }"
            @click="chooseVoice(voice)"
          >
            <view class="voice-option-info">
              <text class="voice-option-name">{{ voice.name }}</text>
              <text class="voice-option-desc">{{ voice.description }}</text>
            </view>
            <view class="voice-option-play" @click.stop="playVoiceOption(voice)">
              <text class="play-icon">▶️</text>
            </view>
            <text v-if="selectedVoice && selectedVoice.id === voice.id" class="selected-icon">✓</text>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 音频选择弹窗 -->
    <u-popup v-model="audioPopup" mode="bottom" :round="20">
      <view class="audio-popup">
        <view class="popup-header">
          <text class="popup-title">选择音频素材</text>
          <text class="popup-close" @click="audioPopup = false">✕</text>
        </view>
        <view class="audio-list">
          <view 
            v-for="audio in audioList" 
            :key="audio.id"
            class="audio-option"
            :class="{ selected: selectedAudio && selectedAudio.id === audio.id }"
            @click="chooseAudio(audio)"
          >
            <view class="audio-option-info">
              <text class="audio-option-name">{{ audio.name }}</text>
              <text class="audio-option-duration">{{ audio.duration }}</text>
            </view>
            <view class="audio-option-play" @click.stop="playAudioOption(audio)">
              <text class="play-icon">▶️</text>
            </view>
            <text v-if="selectedAudio && selectedAudio.id === audio.id" class="selected-icon">✓</text>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- Toast提示 -->
    <u-toast ref="toast" />
  </view>
</template>

<script>
export default {
  name: 'CreatePage',
  data() {
    return {
      // 基础数据
      workName: '',
      currentMode: 'text', // text: 文本驱动, audio: 音效驱动
      showMenu: false,
      generating: false,
      
      // 选中的素材
      selectedCharacter: null,
      selectedVoice: null,
      selectedAudio: null,
      
      // 文本模式
      scriptText: '',
      
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
          name: '小美',
          avatar: '/static/ai_person.png',
          type: 'female'
        },
        {
          id: 2,
          name: '小帅',
          avatar: '/static/ai_person.png',
          type: 'male'
        },
        {
          id: 3,
          name: '小可爱',
          avatar: '/static/ai_person.png',
          type: 'child'
        }
      ],
      
      voiceList: [
        {
          id: 1,
          name: '甜美女声',
          description: '温柔甜美的女性声音',
          url: ''
        },
        {
          id: 2,
          name: '磁性男声',
          description: '低沉有磁性的男性声音',
          url: ''
        },
        {
          id: 3,
          name: '童声萝莉',
          description: '可爱的儿童声音',
          url: ''
        }
      ],
      
      audioList: [
        {
          id: 1,
          name: '轻松愉快',
          duration: '2:30',
          url: ''
        },
        {
          id: 2,
          name: '激昂励志',
          duration: '3:15',
          url: ''
        },
        {
          id: 3,
          name: '温馨浪漫',
          duration: '2:45',
          url: ''
        }
      ]
    }
  },
  
  computed: {
    // 是否可以预览
    canPreview() {
      if (this.currentMode === 'text') {
        return this.selectedCharacter && this.selectedVoice && this.scriptText.trim().length > 0
      } else {
        return this.selectedCharacter && this.selectedAudio
      }
    },
    
    // 是否可以合成
    canGenerate() {
      return this.canPreview && this.workName.trim().length > 0
    }
  },
  
  onLoad() {
    console.log('创作页面加载')
  },
  
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 切换创作模式
    switchMode(mode) {
      this.currentMode = mode
      // 清空对应模式的选择
      if (mode === 'text') {
        this.selectedAudio = null
      } else {
        this.selectedVoice = null
        this.scriptText = ''
      }
    },
    
    // 选择人物
    selectCharacter() {
      this.characterPopup = true
    },
    
    chooseCharacter(character) {
      this.selectedCharacter = character
      this.characterPopup = false
      this.$refs.toast.show({
        title: `已选择人物：${character.name}`,
        type: 'success'
      })
    },
    
    // 选择声音
    selectVoice() {
      this.voicePopup = true
    },
    
    chooseVoice(voice) {
      this.selectedVoice = voice
      this.voicePopup = false
      this.$refs.toast.show({
        title: `已选择声音：${voice.name}`,
        type: 'success'
      })
    },
    
    // 播放声音
    playVoice() {
      if (this.selectedVoice) {
        this.$refs.toast.show({
          title: '播放声音示例',
          type: 'default'
        })
        // TODO: 实际播放逻辑
      }
    },
    
    playVoiceOption(voice) {
      this.$refs.toast.show({
        title: `播放 ${voice.name}`,
        type: 'default'
      })
      // TODO: 实际播放逻辑
    },
    
    // 选择音频
    selectAudio() {
      this.audioPopup = true
    },
    
    chooseAudio(audio) {
      this.selectedAudio = audio
      this.audioPopup = false
      this.$refs.toast.show({
        title: `已选择音频：${audio.name}`,
        type: 'success'
      })
    },
    
    // 播放音频
    playAudio() {
      if (this.selectedAudio) {
        this.audioPlaying = !this.audioPlaying
        if (this.audioPlaying) {
          this.simulateAudioProgress()
        }
      }
    },
    
    playAudioOption(audio) {
      this.$refs.toast.show({
        title: `播放 ${audio.name}`,
        type: 'default'
      })
      // TODO: 实际播放逻辑
    },
    
    // 模拟音频播放进度
    simulateAudioProgress() {
      if (!this.audioPlaying) return
      
      const interval = setInterval(() => {
        if (!this.audioPlaying) {
          clearInterval(interval)
          return
        }
        
        this.audioProgress += 2
        if (this.audioProgress >= 100) {
          this.audioProgress = 100
          this.audioPlaying = false
          clearInterval(interval)
          
          // 重置进度
          setTimeout(() => {
            this.audioProgress = 0
          }, 1000)
        }
      }, 100)
    },
    
    // 预览作品
    previewWork() {
      if (!this.canPreview) {
        this.$refs.toast.show({
          title: '请先完善素材选择',
          type: 'warning'
        })
        return
      }
      
      this.$refs.toast.show({
        title: '正在生成预览...',
        type: 'loading'
      })
      
      // 模拟预览生成
      setTimeout(() => {
        this.$refs.toast.show({
          title: '预览生成完成',
          type: 'success'
        })
      }, 2000)
    },
    
    // 开始合成
    startGenerate() {
      if (!this.canGenerate) {
        this.$refs.toast.show({
          title: '请完善作品信息',
          type: 'warning'
        })
        return
      }
      
      this.generating = true
      
      // 模拟合成过程
      setTimeout(() => {
        this.generating = false
        this.$refs.toast.show({
          title: '作品合成完成！',
          type: 'success'
        })
        
        // 跳转到作品详情或列表页
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/my/my'
          })
        }, 1500)
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.create-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%);
  padding-bottom: 200px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #E5E5E5;
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    
    .back-btn, .menu-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      background: #F5F5F5;
      
      .back-icon, .menu-icon {
        font-size: 18px;
      }
    }
    
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
}

.work-name-section {
  margin: 16px;
  
  .input-wrapper {
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

.character-section, .mode-section, .voice-section, .script-section, .audio-section {
  margin: 16px;
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    
    .select-btn {
      font-size: 14px;
      color: #FF6B35;
      padding: 4px 12px;
      border-radius: 12px;
      background: #FFF5F2;
    }
    
    .word-count {
      font-size: 12px;
      color: #999;
    }
  }
}

.character-preview, .voice-preview, .audio-preview {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .character-item, .voice-item, .audio-item {
    display: flex;
    align-items: center;
    
    .character-avatar {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      margin-right: 12px;
    }
    
    .character-name {
      font-size: 16px;
      color: #333;
    }
    
    .voice-info, .audio-info {
      flex: 1;
      
      .voice-name, .audio-name {
        font-size: 16px;
        color: #333;
        display: block;
        margin-bottom: 4px;
      }
      
      .voice-desc, .audio-duration {
        font-size: 12px;
        color: #999;
      }
    }
    
    .voice-play, .audio-play {
      width: 36px;
      height: 36px;
      border-radius: 18px;
      background: #FF6B35;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .play-icon {
        color: #FFFFFF;
        font-size: 14px;
      }
    }
    
    .audio-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .audio-progress {
        width: 80px;
      }
    }
  }
  
  .character-placeholder, .voice-placeholder, .audio-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    border: 2px dashed #E5E5E5;
    border-radius: 8px;
    
    .placeholder-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    .placeholder-text {
      font-size: 14px;
      color: #999;
    }
  }
}

.mode-tabs {
  display: flex;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .mode-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    border-radius: 8px;
    transition: all 0.3s;
    
    &.active {
      background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
      
      .mode-icon, .mode-label {
        color: #FFFFFF;
      }
    }
    
    .mode-icon {
      font-size: 20px;
      margin-bottom: 6px;
    }
    
    .mode-label {
      font-size: 12px;
      color: #666;
    }
  }
}

.script-input {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-top: 1px solid #E5E5E5;
  padding: 16px;
  z-index: 100;
  
  .preview-section {
    margin-bottom: 16px;
    
    .preview-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      display: block;
    }
    
    .preview-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      background: #F8F9FA;
      border-radius: 8px;
      border: 1px dashed #DDD;
      
      .preview-icon {
        font-size: 24px;
        margin-right: 8px;
      }
      
      .preview-text {
        font-size: 14px;
        color: #999;
      }
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
}

// 弹窗样式
.character-popup, .voice-popup, .audio-popup {
  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 16px;
    border-bottom: 1px solid #E5E5E5;
    
    .popup-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .popup-close {
      font-size: 20px;
      color: #999;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .character-list, .voice-list, .audio-list {
    padding: 16px 20px;
    max-height: 50vh;
    overflow-y: auto;
    
    .character-option, .voice-option, .audio-option {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #F5F5F5;
      position: relative;
      
      &.selected {
        background: #FFF5F2;
        border-radius: 8px;
        padding: 12px;
        margin: 4px 0;
        border-bottom: none;
      }
      
      .option-avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 12px;
      }
      
      .option-name {
        font-size: 16px;
        color: #333;
      }
      
      .voice-option-info, .audio-option-info {
        flex: 1;
        
        .voice-option-name, .audio-option-name {
          font-size: 16px;
          color: #333;
          display: block;
          margin-bottom: 4px;
        }
        
        .voice-option-desc, .audio-option-duration {
          font-size: 12px;
          color: #999;
        }
      }
      
      .voice-option-play, .audio-option-play {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        
        .play-icon {
          font-size: 12px;
        }
      }
      
      .selected-icon {
        color: #FF6B35;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
