import { login } from '../../utils/api';

Page({
    data: {
        username: '',
        password: ''
    },

    // 处理用户名输入
    onUsernameInput(e: WechatMiniprogram.Input) {
        this.setData({
            username: e.detail.value
        });
    },

    // 处理密码输入
    onPasswordInput(e: WechatMiniprogram.Input) {
        this.setData({
            password: e.detail.value
        });
    },

    // 处理登录
    async handleLogin() {
        const { username, password } = this.data;
        
        if (!username || !password) {
            wx.showToast({
                title: '请输入用户名和密码',
                icon: 'none'
            });
            return;
        }

        try {
            const res = await login({ username, password });
            if (res.data.accessToken) {
                wx.setStorageSync('accessToken', res.data.accessToken);
                wx.showToast({
                    title: '登录成功',
                    icon: 'success'
                });
                wx.reLaunch({
                    url: '/pages/index/index'
                });
            } else {
                wx.showToast({
                    title: res.message || '登录失败',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.log(error);
            wx.showToast({
                title: '登录失败',
                icon: 'error'
            });
        }
    }
}); 