Page({
    onLoad() {
        //this.checkLoginStatus();
        wx.reLaunch({
          url: '/pages/square/index' 
      });
    },

    checkLoginStatus() {
        const accessToken = wx.getStorageSync('accessToken');
        
        // 延迟 1.5 秒以展示启动页
        setTimeout(() => {
            wx.reLaunch({
                url: accessToken ? '/pages/square/index' : '/pages/square/index'
            });
        }, 2000);
    }
}); 