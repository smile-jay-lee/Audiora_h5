<template>
  <view class="upload-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="back-btn" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <view class="title">{{ config.title }}</view>
        <view class="menu-btn">
          <text class="menu-icon">⋯</text>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 名称输入 -->
      <view class="name-section">
        <view class="label">
          <text class="required">*</text>
          <text class="label-text">{{ config.nameLabel }}</text>
        </view>
        <view class="input-wrapper">
          <u-input 
            v-model="fileName" 
            :placeholder="config.namePlaceholder" 
            :border="false"
            :customStyle="{ 
              fontSize: '16px', 
              padding: '16px',
              backgroundColor: 'transparent'
            }"
          />
        </view>
      </view>

      <!-- 配置标题 -->
      <view class="config-section">
        <view class="config-title">
          <view class="title-bar"></view>
          <text class="title-text">{{ config.configTitle }}</text>
        </view>
      </view>

      <!-- 上传区域 -->
      <view class="upload-area" @click="chooseFile">
        <view class="upload-content">
          <view v-if="!selectedFile" class="upload-placeholder">
            <view class="upload-icon">
              <text class="icon">☁️</text>
              <text class="arrow">↗️</text>
            </view>
            <view class="upload-text">
              <text class="main-text">{{ config.uploadMainText }}</text>
              <text class="sub-text">{{ config.uploadSubText }}</text>
            </view>
          </view>
          
          <!-- 文件预览 -->
          <view v-else class="file-preview">
            <!-- 图片预览 -->
            <image 
              v-if="fileType === 'image'" 
              :src="fileUrl" 
              class="preview-image"
              mode="aspectFit"
            />
            <!-- 视频预览 -->
            <video 
              v-else-if="fileType === 'video'"
              :src="fileUrl"
              class="preview-video"
              :controls="true"
              :show-center-play-btn="true"
            />
            <!-- 音频预览 -->
            <view v-else-if="fileType === 'audio'" class="audio-preview">
              <text class="audio-icon">🎵</text>
              <text class="audio-name">{{ selectedFile.name }}</text>
            </view>
            <!-- 其他文件预览 -->
            <view v-else class="file-info">
              <text class="file-icon">📄</text>
              <text class="file-name">{{ selectedFile.name }}</text>
            </view>
            
            <!-- 删除按钮 -->
            <view class="delete-btn" @click.stop="removeFile">
              <text class="delete-icon">✕</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 文件要求说明 -->
      <view class="requirements">
        <view class="requirement-grid">
          <view class="requirement-item">
            <text class="req-label">尺寸：</text>
            <text class="req-value">{{ config.requirements.size }}</text>
          </view>
          <view class="requirement-item">
            <text class="req-label">格式：</text>
            <text class="req-value">{{ config.requirements.format }}</text>
          </view>
          <view class="requirement-item">
            <text class="req-label">清晰度：</text>
            <text class="req-value">{{ config.requirements.quality }}</text>
          </view>
          <view class="requirement-item">
            <text class="req-label">时长：</text>
            <text class="req-value">{{ config.requirements.duration }}</text>
          </view>
          <view class="requirement-item">
            <text class="req-label">帧率：</text>
            <text class="req-value">{{ config.requirements.frameRate }}</text>
          </view>
          <view class="requirement-item">
            <text class="req-label">文件大小：</text>
            <text class="req-value">{{ config.requirements.fileSize }}</text>
          </view>
        </view>
      </view>

      <!-- 注意事项 -->
      <view class="tips">
        <view v-for="(tip, index) in config.tips" :key="index" class="tip-item">
          <text class="tip-icon">✓</text>
          <text class="tip-text">{{ tip }}</text>
        </view>
      </view>
    </view>

    <!-- 底部确认按钮 -->
    <view class="bottom-action">
      <u-button 
        type="primary"
        size="large"
        :disabled="!canUpload"
        :loading="uploading"
        :customStyle="{ 
          width: '100%',
          height: '52px',
          borderRadius: '26px',
          fontSize: '18px',
          fontWeight: '600',
          background: canUpload ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' : '#E5E7EB',
          border: 'none'
        }"
        @click="confirmUpload"
      >
        {{ uploading ? '上传中...' : config.confirmText }}
      </u-button>
    </view>

    <!-- Toast提示 -->
    <u-toast ref="toast" />
  </view>
</template>

<script>
export default {
  name: 'UploadComponent',
  props: {
    // 配置选项
    config: {
      type: Object,
      default: () => ({
        title: '上传形象',
        nameLabel: '形象名称',
        namePlaceholder: '请输入作品名称',
        configTitle: '形象配置',
        uploadMainText: '创建新形象',
        uploadSubText: '点此区域上传',
        confirmText: '确认上传',
        requirements: {
          size: '竖屏9:16',
          format: 'MP4',
          quality: '1080P',
          duration: '不限',
          frameRate: '不限',
          fileSize: '不超过300M'
        },
        tips: [
          '确保面部特征没有被遮挡，并努力让面部清晰可见',
          '不要使用有多人的视频',
          '嘴巴要完整露出，避免遮挡',
          '人脸不要太大，确保整张人脸都在屏幕区域内，人脸不要出屏幕'
        ]
      })
    },
    // 允许的文件类型
    accept: {
      type: Array,
      default: () => ['image', 'video']
    },
    // 最大文件大小 (MB)
    maxSize: {
      type: Number,
      default: 300
    }
  },
  
  data() {
    return {
      fileName: '',
      selectedFile: null,
      fileUrl: '',
      fileType: '',
      uploading: false
    }
  },
  
  computed: {
    canUpload() {
      return this.fileName.trim().length > 0 && this.selectedFile
    }
  },
  
  methods: {
    // 返回上一页
    goBack() {
      this.$emit('back')
      // 如果没有监听back事件，则默认返回
      setTimeout(() => {
        if (this.$listeners && !this.$listeners.back) {
          uni.navigateBack()
        }
      }, 0)
    },
    
    // 选择文件
    chooseFile() {
      const that = this
      
      uni.showActionSheet({
        itemList: ['从相册选择', '拍摄'],
        success: (res) => {
          if (res.tapIndex === 0) {
            // 从相册选择
            uni.chooseMedia({
              count: 1,
              mediaType: this.accept,
              sourceType: ['album'],
              maxDuration: 60,
              camera: 'back',
              success: (res) => {
                this.handleFileSelect(res.tempFiles[0])
              },
              fail: (err) => {
                console.log('选择文件失败:', err)
                this.$refs.toast.show({
                  title: '选择文件失败',
                  type: 'error'
                })
              }
            })
          } else if (res.tapIndex === 1) {
            // 拍摄
            uni.chooseMedia({
              count: 1,
              mediaType: this.accept,
              sourceType: ['camera'],
              maxDuration: 60,
              camera: 'back',
              success: (res) => {
                this.handleFileSelect(res.tempFiles[0])
              },
              fail: (err) => {
                console.log('拍摄失败:', err)
                this.$refs.toast.show({
                  title: '拍摄失败',
                  type: 'error'
                })
              }
            })
          }
        }
      })
    },
    
    // 处理文件选择
    handleFileSelect(file) {
      console.log('选择的文件:', file)
      
      // 检查文件大小
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > this.maxSize) {
        this.$refs.toast.show({
          title: `文件大小不能超过${this.maxSize}MB`,
          type: 'warning'
        })
        return
      }
      
      // 确定文件类型
      let fileType = 'file'
      if (file.tempFilePath) {
        const extension = file.tempFilePath.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
          fileType = 'image'
        } else if (['mp4', 'mov', 'avi', 'wmv', '3gp'].includes(extension)) {
          fileType = 'video'
        } else if (['mp3', 'wav', 'aac', 'm4a'].includes(extension)) {
          fileType = 'audio'
        }
      }
      
      this.selectedFile = file
      this.fileUrl = file.tempFilePath
      this.fileType = fileType
      
      // 如果名称为空，使用文件名
      if (!this.fileName.trim()) {
        const fileName = file.tempFilePath.split('/').pop().split('.')[0]
        this.fileName = fileName
      }
      
      this.$refs.toast.show({
        title: '文件选择成功',
        type: 'success'
      })
    },
    
    // 删除文件
    removeFile() {
      this.selectedFile = null
      this.fileUrl = ''
      this.fileType = ''
      
      this.$refs.toast.show({
        title: '文件已移除',
        type: 'default'
      })
    },
    
    // 确认上传
    confirmUpload() {
      if (!this.canUpload) {
        this.$refs.toast.show({
          title: '请完善上传信息',
          type: 'warning'
        })
        return
      }
      
      this.uploading = true
      
      // 模拟上传过程
      setTimeout(() => {
        this.uploading = false
        
        // 触发上传成功事件
        this.$emit('upload-success', {
          name: this.fileName,
          file: this.selectedFile,
          url: this.fileUrl,
          type: this.fileType
        })
        
        this.$refs.toast.show({
          title: '上传成功！',
          type: 'success'
        })
        
        // 重置表单
        setTimeout(() => {
          this.resetForm()
        }, 1500)
        
      }, 2000)
    },
    
    // 重置表单
    resetForm() {
      this.fileName = ''
      this.selectedFile = null
      this.fileUrl = ''
      this.fileType = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%);
  padding-bottom: 100px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  
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
      background: rgba(0, 0, 0, 0.05);
      
      .back-icon, .menu-icon {
        font-size: 18px;
        color: #333;
      }
    }
    
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
}

.content {
  padding: 0 16px;
}

.name-section {
  margin: 20px 0;
  
  .label {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    .required {
      color: #EF4444;
      font-size: 16px;
      margin-right: 4px;
    }
    
    .label-text {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }
  }
  
  .input-wrapper {
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
  }
}

.config-section {
  margin: 20px 0 16px;
  
  .config-title {
    display: flex;
    align-items: center;
    
    .title-bar {
      width: 4px;
      height: 20px;
      background: #6366F1;
      border-radius: 2px;
      margin-right: 8px;
    }
    
    .title-text {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
  }
}

.upload-area {
  margin: 16px 0 24px;
  
  .upload-content {
    background: #FFFFFF;
    border: 2px dashed #D1D5DB;
    border-radius: 12px;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      
      .upload-icon {
        position: relative;
        margin-bottom: 16px;
        
        .icon {
          font-size: 48px;
          color: #6366F1;
        }
        
        .arrow {
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 20px;
          color: #6366F1;
        }
      }
      
      .upload-text {
        text-align: center;
        
        .main-text {
          display: block;
          font-size: 18px;
          color: #333;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .sub-text {
          font-size: 14px;
          color: #9CA3AF;
        }
      }
    }
    
    .file-preview {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      
      .preview-image, .preview-video {
        max-width: 100%;
        max-height: 250px;
        border-radius: 8px;
      }
      
      .audio-preview, .file-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .audio-icon, .file-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        
        .audio-name, .file-name {
          font-size: 14px;
          color: #666;
          text-align: center;
          word-break: break-all;
        }
      }
      
      .delete-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .delete-icon {
          color: #FFFFFF;
          font-size: 16px;
        }
      }
    }
  }
}

.requirements {
  margin: 24px 0;
  
  .requirement-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    
    .requirement-item {
      display: flex;
      align-items: center;
      
      .req-label {
        font-size: 14px;
        color: #6B7280;
        margin-right: 8px;
        white-space: nowrap;
      }
      
      .req-value {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
}

.tips {
  margin: 24px 0;
  
  .tip-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    
    .tip-icon {
      color: #6366F1;
      font-size: 14px;
      margin-right: 8px;
      margin-top: 2px;
      flex-shrink: 0;
    }
    
    .tip-text {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.5;
      flex: 1;
    }
  }
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  padding: 16px;
  border-top: 1px solid #E5E7EB;
  z-index: 100;
}
</style>
