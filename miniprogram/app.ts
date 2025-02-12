// app.ts

import { login as LoginApi } from './utils/api'; 


App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // const accessToken = wx.getStorageSync('accessToken') || "";
    // console.log("accessToken="+accessToken)
    // if (!accessToken) {
    //   wx.login({
    //     success: res => {
    //       var code=res.code
    //       const loginRes =   LoginApi({ username:code,password:code });
    //       loginRes.then((res)=>{
    //         wx.setStorageSync('accessToken', res.data.accessToken);
    //       })
    //     },
    //   })
    // }
  },
})