// 导航工具类
export default {
    // 跳转到形象库
    goToAvatar() {
        uni.navigateTo({
            url: '/pages/avatar/avatar'
        });
    },
    
    // 跳转到声音库
    goToVoice() {
        uni.navigateTo({
            url: '/pages/voice/voice'
        });
    },
    
    // 跳转到场景音库
    goToScene() {
        uni.navigateTo({
            url: '/pages/scene/scene'
        });
    },
    
    // 跳转到AI创作
    goToAICreate() {
        uni.navigateTo({
            url: '/pages/ai-create/ai-create'
        });
    }
}