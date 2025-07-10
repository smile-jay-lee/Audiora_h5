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
    goToSoundLibrary() {
        uni.navigateTo({
            url: '/pages/sound_library/sound_library'
        });
    },
    
    // 跳转到AI创作
    goToAICreate() {
        uni.navigateTo({
            url: '/pages/create/create'
        });
    },
    gotoCreate() {
        uni.navigateTo({
            url: '/pages/create/create'
        });
    }
}