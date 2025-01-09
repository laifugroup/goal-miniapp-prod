Page({
  data: {
    isVip:false,
    vipExpireDate:"2025-12-31",
    
    isRefreshing: false
  },

  onLoad() {
    this.loadData();
  },

  // 加载数据
  async loadData() {
    try {
      const [vipStatus] = await Promise.all([
        this.getVipStatus(),
      ]);

      this.setData({
        isVip: true,
        vipExpireDate: "",
        isRefreshing: false
      });
    } catch (error) {
      console.error('数据加载失败:', error);
      this.setData({ isRefreshing: false });
    } finally {
      wx.stopPullDownRefresh();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ isRefreshing: true });
    this.loadData();
  },

  // 获取VIP状态
  async getVipStatus() {
    // ... 原有获取VIP状态的逻辑
  }
})