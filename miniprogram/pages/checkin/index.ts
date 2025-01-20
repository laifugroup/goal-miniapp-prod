interface Creator {
  name: string;
  avatar?: string;
}

interface CheckinItem {
  id: number;
  title: string;
  creator: Creator;
  createDate: string;
  checked: boolean;
  currentDay: number;
  totalDays: number;
  progress?: number; // 进度百分比
}

Page({
    data: {
      currentTab: 0, // 当前选中的 tab
      checkinList: [] as CheckinItem[], // 打卡列表
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
  

    checkinDetail() {
      wx.navigateTo({
        url: '/pages/goal/index'
      });
    },
    
  
    // 修改模拟请求数据
    mockRequest(): Promise<CheckinItem[]> {
      return new Promise(resolve => {
        setTimeout(() => {
          const data = Array.from({ length: 10 }).map((_, i) => {
            const totalDays = 21; // 固定21天
            const currentDay = Math.floor(Math.random() * (totalDays + 1)); // 随机当前天数
            
            return {
              id: Date.now() + i,
              title: `每日晨跑5公里 ${this.data.page * 10 + i}`,
              creator: {
                name: '张三',  // 这里可以是动态数据
              },
              createDate: '2024-01-10',
              checked: Math.random() > 0.5, // 随机打卡状态
              currentDay,
              totalDays,
              progress: Math.floor((currentDay / totalDays) * 100) // 计算进度
            };
          });
          resolve(data);
        }, 500);
      });
    }
  });