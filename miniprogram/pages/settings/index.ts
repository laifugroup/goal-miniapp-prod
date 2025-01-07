Page({
    data: {
        settingItems: [
            { id: 'notification', title: '消息通知', type: 'switch', value: true },
            { id: 'privacy', title: '隐私政策', type: 'arrow' },
            { id: 'about', title: '关于我们', type: 'arrow' },
            { id: 'feedback', title: '意见反馈', type: 'arrow' },
            { id: 'clear', title: '清除缓存', type: 'arrow' }
        ],
        txcAppId: 'wx8abaf00ee8c3202e'  // 兔小巢小程序 appId
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
                wx.navigateTo({ url: '/pages/privacy/index' });
                break;
            case 'about':
                wx.navigateTo({ url: '/pages/about/index' });
                break;
            case 'feedback':
                this.openFeedback();
                break;
            case 'clear':
                this.clearCache();
                break;
        }
    },

    // 打开兔小巢反馈
    openFeedback() {

        wx.openEmbeddedMiniProgram({
            appId: this.data.txcAppId,
            extraData :{
              // 把1368数字换成你的产品ID，否则会跳到别的产品
              id : "681245",
              // 自定义参数，具体参考文档
              customData : {
                  clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
              }
            }
          })
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