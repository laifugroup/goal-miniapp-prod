Page({
    data: {
      currentTab: 0, // 当前选中的 tab
      checkinList: [], // 打卡列表
      page: 1,
      loading: false,
      hasMore: true,
      uncheckedCount:11,
      reminderCount:22
    },
  
    onLoad() {
      this.loadData();
    },
  
    // 切换 tab
    switchTab(e: WechatMiniprogram.TouchEvent) {
      const index = e.currentTarget.dataset.index;
      this.setData({
        currentTab: index,
        page: 1,
        checkinList: [],
        hasMore: true
      });
      this.loadData();
    },
  
    // 加载数据
    async loadData() {
      if (this.data.loading || !this.data.hasMore) return;
  
      this.setData({ loading: true });
  
      // 模拟请求
      const newData = await this.mockRequest();
  
      this.setData({
        checkinList: this.data.page === 1 ? newData : [...this.data.checkinList, ...newData],
        loading: false,
        hasMore: newData.length >= 10
      });
    },
  
    // 下拉刷新
    onRefresh() {
      this.setData({
        page: 1,
        hasMore: true
      });
      this.loadData();
    },
  
    // 上拉加载更多
    onLoadMore() {
      if (!this.data.hasMore) return;
      this.setData({ page: this.data.page + 1 });
      this.loadData();
    },
  
    // 新建打卡
    createCheckin() {
      wx.navigateTo({
        url: '/pages/target/create'
      });
    },
  
    // 模拟请求
    mockRequest(): Promise<any[]> {
      return new Promise(resolve => {
        setTimeout(() => {
          const data = Array.from({ length: 10 }).map((_, i) => ({
            id: Date.now() + i,
            title: `打卡项目 ${this.data.page * 10 + i } 标签${this.data.currentTab}`,
            time: '2023-12-01',
            checked:true
          }));
          resolve(data);
        }, 500);
      });
    }
  });