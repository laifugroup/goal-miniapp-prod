// app.ts

import { login as LoginApi } from '../miniprogram/utils/api';


App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        var code=res.code
        const res1 =   LoginApi({ username:code,password:code });
        console.log("code="+res1)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})