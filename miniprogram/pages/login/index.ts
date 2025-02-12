import { loginWithWxCode } from '../../utils/api';

Page({
    data: {
        username: '',
    },
    onLoad() {
      //  this.handleLogin();
    },

    onPullDownRefresh() {
      wx.stopPullDownRefresh()
    },

    // 处理登录
    async handleLogin() {
        try {
            wx.login({
              success: res => {
                var wxCode=res.code
                const loginRes =   loginWithWxCode({ code:wxCode });
                loginRes.then((res)=>{
                  wx.setStorageSync('accessToken', res.data.accessToken);
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success'
                });
                    wx.reLaunch({
                      url:  '/pages/square/index'
                  });
                }).catch((error)=>{
                   wx.showToast({
                        title: error || '登录失败',
                        icon: 'error'
                    });
              })
              },
            })
        } catch (error) {
            console.log(error);
            wx.showToast({
                title:  '登录失败',
                icon: 'error'
            });
        }
    }
}); 