Page({
    data: {
        // 兔小巢小程序 appId
        txcAppId: 'wx8abaf00ee8c3202e'
    },

    onLoad() {
        this.openTXC();
    },

    // 打开兔小巢小程序
    openTXC() {
        wx.navigateToMiniProgram({
            appId: this.data.txcAppId,
            path: 'pages/index?productId=681245', // 你的产品 ID
            success: () => {
                console.log('打开兔小巢成功');
            },
            fail: (err) => {
                console.error('打开兔小巢失败:', err);
                wx.showToast({
                    title: '打开失败，请重试',
                    icon: 'none'
                });
            }
        });
    }
}); 