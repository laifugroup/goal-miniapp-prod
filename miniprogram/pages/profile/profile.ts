import { getUserInfo } from '../../utils/api';
import { UserInfo } from '../../utils/types';

Page({
    data: {
        userInfo: {} as UserInfo,
        menuItems: [
            { id: 'goals', icon: '🎯', title: '我的目标', badge: 3 },
            { id: 'records', icon: '📝', title: '训练记录' },
            { id: 'achievements', icon: '🏆', title: '我的成就', badge: 1 },
            { id: 'favorites', icon: '⭐', title: '我的收藏' },
            { id: 'settings', icon: '⚙️', title: '设置' }
        ]
    },
  // 跳转到积分明细页面
  navigateToPoints() {
    console.log("----->")
    wx.navigateTo({
      url: '/pages/points/index'
    });
  },
    onLoad() {
        this.fetchUserInfo();
    },
   // 下拉刷新
   async onPullDownRefresh() {
      await this.fetchUserInfo();
      wx.stopPullDownRefresh();
    },
    async fetchUserInfo() {
        try {
            const response = await getUserInfo();
            this.setData({
                userInfo: response.data
            });
        } catch (error) {
            console.error('获取用户信息失败:', error);
        }
    },

    onMenuItemTap(e: any) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/${id}/index`
        });
    },

    onEditProfile() {
        wx.navigateTo({
            url: '/pages/profile/edit/index'
        });
    }


    
}); 
