interface IMentor {
    id: string;
    name: string;
    avatar: string;
  }
  
  interface IRecord {
    id: string;
    username: string;
    avatar: string;
    content: string;
    time: string;
    images: string[];
  }
  
  interface IMotivation {
    id: string;
    mentorName: string;
    mentorAvatar: string;
    content: string;
    time: string;
  }
  
  Page({
    data: {
      currentTab: 'records' as 'records' | 'motivations',
      hasJoined: false,
      todayChecked: false,
      currentDay: 1,
      mentors: [] as IMentor[],
      records: [] as IRecord[],
      motivations: [] as IMotivation[],
      creator: {
        avatar: '/assets/images/avatar1.png',
        name: '来刘'
      },
    },
  
    onLoad() {
      this.fetchData();
    },
  
    // 获取页面数据
    async fetchData() {
      try {
        // 模拟数据，实际应该从服务器获取
        const mentors = [
          { id: '1', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '2', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '3', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '4', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '5', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '6', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '7', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '8', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '9', name: '小明', avatar: '/assets/images/avatar1.png' },
          { id: '10', name: '小明', avatar: '/assets/images/avatar1.png' },

          // ... 更多数据
        ];
  
        this.setData({ mentors });
        await this.fetchRecords();
        await this.fetchMotivations();
      } catch (error) {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
      }
    },
  
    // 切换标签
    switchTab(e: WechatMiniprogram.TouchEvent) {
      const tab = e.currentTarget.dataset.tab as 'records' | 'motivations';
      this.setData({ currentTab: tab });
    },
  
    // 参与挑战
    async handleJoin() {
      try {
        // 调用参与接口
        await wx.showModal({
          title: '确认参与',
          content: '是否确认参与该挑战？'
        });
        
        this.setData({ hasJoined: true });
        wx.showToast({ title: '参与成功' });
      } catch (error) {
        wx.showToast({
          title: '参与失败',
          icon: 'none'
        });
      }
    },
  
    // 打卡
    async handleCheckin() {
      if (this.data.todayChecked) {
        return wx.showToast({
          title: '今日已打卡',
          icon: 'none'
        });
      }
  
      try {
        // 调用打卡接口
        this.setData({ todayChecked: true });
        wx.showToast({ title: '打卡成功' });
      } catch (error) {
        wx.showToast({
          title: '打卡失败',
          icon: 'none'
        });
      }
    },
  
    // 预览图片
    previewImage(e: WechatMiniprogram.TouchEvent) {
      const { urls, current } = e.currentTarget.dataset;
      wx.previewImage({ urls, current });
    },
  
    // 获取打卡记录
    async fetchRecords() {
      // 实现获取打卡记录的逻辑
    },
  
    // 获取激励记录
    async fetchMotivations() {
      // 实现获取激励记录的逻辑
    }
  });