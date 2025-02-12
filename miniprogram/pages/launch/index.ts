import { loginWithWxCode  } from '../../utils/api'; 


Page({
    onLoad() {
        this.checkLoginStatus();
      //   wx.reLaunch({
      //     url: '/pages/square/index' 
      // });
    },

    checkLoginStatus() {
        const accessToken = wx.getStorageSync('accessToken') || undefined;
        if (!accessToken) {
          wx.login({
            success: res => {
              var code=res.code
              const loginRes =   loginWithWxCode({ code:code});
              loginRes.then((res)=>{
                wx.setStorageSync('accessToken', res.data.accessToken);
                  wx.reLaunch({
                    url: '/pages/square/index' 
                });
              }).catch((error)=>{
                //自动登录失败，跳转到登录页面
                wx.navigateTo({
                  url: '/pages/login/index',
              })
            })
            },
          })
        }else{
           // 延迟 1.5 秒以展示启动页
        setTimeout(() => {
              wx.reLaunch({
                  url: '/pages/square/index'
              });
          }, 2000);
        }
    }
}); 