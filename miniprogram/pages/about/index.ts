Page({
    data: {
        version: '1.0.0',
        items: [
            { title: '官方网站', content: 'www.example.com' },
            { title: '联系电话', content: '400-123-4567' },
            { title: '电子邮箱', content: 'support@example.com' },
            { title: '公司地址', content: '北京市朝阳区xxx大厦' }
        ]
    },

    copyText(e: any) {
        const { text } = e.currentTarget.dataset;
        wx.setClipboardData({
            data: text,
            success: () => {
                wx.showToast({
                    title: '复制成功',
                    icon: 'success'
                });
            }
        });
    }
}); 