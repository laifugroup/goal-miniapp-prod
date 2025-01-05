Page({
    data: {
        settingItems: [
            { id: 'notification', title: '消息通知', type: 'switch', value: true },
            { id: 'privacy', title: '隐私设置', type: 'arrow' },
            { id: 'about', title: '关于我们', type: 'arrow' },
            { id: 'feedback', title: '意见反馈', type: 'arrow' },
            { id: 'clear', title: '清除缓存', type: 'arrow' }
        ]
    },

    onSwitchChange(e: any) {
        const { id } = e.currentTarget.dataset;
        const { value } = e.detail;
        console.log(`Switch ${id} changed to ${value}`);
        // 处理开关变化
    },

    onItemTap(e: any) {
        const { id } = e.currentTarget.dataset;
        // 处理点击事件
        switch (id) {
            case 'privacy':
                wx.navigateTo({ url: '/pages/settings/privacy/index' });
                break;
            case 'about':
                wx.navigateTo({ url: '/pages/settings/about/index' });
                break;
            case 'feedback':
                wx.navigateTo({ url: '/pages/settings/feedback/index' });
                break;
            case 'clear':
                this.clearCache();
                break;
        }
    },

    clearCache() {
        wx.showModal({
            title: '提示',
            content: '确定要清除缓存吗？',
            success: (res) => {
                if (res.confirm) {
                    wx.clearStorage({
                        success: () => {
                            wx.showToast({
                                title: '清除成功',
                                icon: 'success'
                            });
                        }
                    });
                }
            }
        });
    },

    onLogout() {
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: (res) => {
                if (res.confirm) {
                    wx.clearStorageSync();
                    wx.reLaunch({
                        url: '/pages/login/login'
                    });
                }
            }
        });
    }
}); 