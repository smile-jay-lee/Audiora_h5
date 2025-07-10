# Upload组件使用说明

## 📁 组件位置
`/components/upload.vue`

## 🚀 功能特点

- ✅ 完全可配置的文字内容
- ✅ 支持多种文件类型（图片、视频、音频）
- ✅ 文件大小限制可配置
- ✅ 实时预览功能
- ✅ 拖拽上传区域
- ✅ 完整的表单验证
- ✅ 响应式设计
- ✅ 事件回调机制

## 📋 Props配置

### config (Object) - 主要配置对象
```javascript
{
  title: '上传形象',              // 页面标题
  nameLabel: '形象名称',          // 名称字段标签
  namePlaceholder: '请输入作品名称', // 名称输入框占位符
  configTitle: '形象配置',        // 配置区域标题
  uploadMainText: '创建新形象',   // 上传区主文字
  uploadSubText: '点此区域上传',   // 上传区副文字
  confirmText: '确认上传',        // 确认按钮文字
  requirements: {                // 文件要求说明
    size: '竖屏9:16',
    format: 'MP4',
    quality: '1080P',
    duration: '不限',
    frameRate: '不限',
    fileSize: '不超过300M'
  },
  tips: [                       // 注意事项列表
    '确保面部特征没有被遮挡，并努力让面部清晰可见',
    '不要使用有多人的视频',
    '嘴巴要完整露出，避免遮挡',
    '人脸不要太大，确保整张人脸都在屏幕区域内，人脸不要出屏幕'
  ]
}
```

### accept (Array) - 允许的文件类型
```javascript
['image', 'video', 'audio']  // 默认: ['image', 'video']
```

### maxSize (Number) - 最大文件大小
```javascript
300  // 单位: MB，默认: 300
```

## 🎯 事件

### @back
返回按钮点击事件
```javascript
@back="handleBack"
```

### @upload-success
文件上传成功事件
```javascript
@upload-success="handleUploadSuccess"

// 回调数据格式
{
  name: '文件名称',
  file: FileObject,
  url: '文件临时路径',
  type: 'image|video|audio|file'
}
```

## 📝 使用示例

### 基础使用
```vue
<template>
  <upload-component
    :config="uploadConfig"
    @back="closeUpload"
    @upload-success="handleSuccess"
  />
</template>

<script>
import UploadComponent from '@/components/upload.vue'

export default {
  components: {
    UploadComponent
  },
  data() {
    return {
      uploadConfig: {
        title: '上传文件',
        nameLabel: '文件名称',
        namePlaceholder: '请输入文件名称',
        // ... 其他配置
      }
    }
  },
  methods: {
    closeUpload() {
      // 关闭上传界面逻辑
    },
    handleSuccess(data) {
      console.log('上传成功:', data)
      // 处理上传成功后的逻辑
    }
  }
}
</script>
```

### 不同场景配置

#### 1. 形象上传配置
```javascript
const avatarConfig = {
  title: '上传形象',
  nameLabel: '形象名称',
  namePlaceholder: '请输入形象名称',
  configTitle: '形象配置',
  uploadMainText: '创建新形象',
  uploadSubText: '点此区域上传',
  confirmText: '确认上传',
  requirements: {
    size: '竖屏9:16',
    format: 'MP4/JPG',
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
}
```

#### 2. 音频上传配置
```javascript
const audioConfig = {
  title: '上传音频',
  nameLabel: '音频名称',
  namePlaceholder: '请输入音频名称',
  configTitle: '音频配置',
  uploadMainText: '选择音频文件',
  uploadSubText: '点此区域上传',
  confirmText: '确认上传',
  requirements: {
    size: '不限',
    format: 'MP3/WAV',
    quality: '高品质',
    duration: '5分钟内',
    frameRate: '44.1kHz',
    fileSize: '不超过100M'
  },
  tips: [
    '支持MP3、WAV等常见音频格式',
    '建议使用高品质音频以获得更好效果',
    '音频时长建议在5分钟以内',
    '文件大小不要超过100M'
  ]
}
```

#### 3. 视频上传配置
```javascript
const videoConfig = {
  title: '上传视频',
  nameLabel: '视频名称',
  namePlaceholder: '请输入视频名称',
  configTitle: '视频配置',
  uploadMainText: '选择视频文件',
  uploadSubText: '点此区域上传',
  confirmText: '确认上传',
  requirements: {
    size: '16:9或9:16',
    format: 'MP4/MOV',
    quality: '1080P及以上',
    duration: '10分钟内',
    frameRate: '30fps',
    fileSize: '不超过500M'
  },
  tips: [
    '支持MP4、MOV等主流视频格式',
    '建议使用1080P及以上分辨率',
    '视频时长建议在10分钟以内',
    '文件大小不要超过500M'
  ]
}
```

## 🎨 样式自定义

组件使用了完整的scoped样式，主要颜色变量：
- 主色调: `#6366F1`
- 渐变色: `linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)`
- 背景色: `linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)`

如需自定义样式，可以通过CSS变量或深度选择器进行覆盖。

## 🔧 集成示例

参考 `/pages/avatar/avatar.vue` 的集成方式：

1. 导入组件
2. 配置props
3. 处理事件回调
4. 管理显示状态

## 📱 兼容性

- ✅ uni-app全平台
- ✅ H5
- ✅ 小程序
- ✅ App
- ✅ 响应式设计

## 🛠️ 依赖

- uView 2.x UI框架
- uni-app官方API

## 📞 技术支持

如有问题，请参考：
1. 组件内的注释说明
2. 使用示例文件
3. uni-app官方文档
