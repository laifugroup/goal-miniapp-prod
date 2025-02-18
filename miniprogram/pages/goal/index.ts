interface Task {
  id: string;
  title: string;
  checkinCount: number;
  decomposeTime: string;
}

interface IMentor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    joinTime: string;
    remindCount: number;
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
    images: string[];
  }
  
  Page({
    data: {
      currentTab: 0 as number,
      hasJoined: false,
      todayChecked: false,
      currentDay: 1,
      tasks: [] as Task[],
      mentors: [] as IMentor[],
      checkInList: [] as IRecord[],
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
        // 模拟任务数据
        const tasks = [
          { 
            id: '1', 
            title: '每天跑步5公里', 
            checkinCount: 5, 
            decomposeTime: '2025-2-14' 
          },
          { 
            id: '2', 
            title: '练习钢琴', 
            checkinCount: 3, 
            decomposeTime: '2025-2-14' 
          },
          { 
            id: '3', 
            title: '阅读一小时', 
            checkinCount: 7, 
            decomposeTime: '2025-2-14' 
          },
          { 
            id: '4', 
            title: '背单词', 
            checkinCount: 10, 
            decomposeTime: '2025-2-14' 
          },
          { 
            id: '5', 
            title: '冥想', 
            checkinCount: 15, 
            decomposeTime: '2025-2-14' 
          }
        ];

        // 模拟导师数据
        const mentors = [
          { id: '1', name: '小明', avatar: '/assets/images/avatar1.png', title: '运动教练', joinTime: '2024-01-01', remindCount: 5 },
          { id: '2', name: '小红', avatar: '/assets/images/avatar1.png', title: '营养师', joinTime: '2024-01-02', remindCount: 3 },
          { id: '3', name: '小华', avatar: '/assets/images/avatar1.png', title: '心理咨询师', joinTime: '2024-01-03', remindCount: 8 },
          // ... 其他导师数据
        ];

        // 模拟打卡记录数据
        const checkInList = [
          {
            id: '1',
            username: '小明',
            avatar: '/assets/images/avatar1.png',
            content: '今天完成了5公里晨跑，感觉状态不错！',
            time: '2025-2-14 08:30',
            images: [
              'https://pic.rmb.bdstatic.com/bjh/down/ducut-cover-202410-77957995ec2ee2701019835658512dea.png?for=bg',
              'https://img2.baidu.com/it/u=985017315,3747835605&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=959',
              'https://pic.rmb.bdstatic.com/bjh/down/ducut-cover-202410-77957995ec2ee2701019835658512dea.png?for=bg',
              'https://img2.baidu.com/it/u=985017315,3747835605&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=959',
              'https://pic.rmb.bdstatic.com/bjh/down/ducut-cover-202410-77957995ec2ee2701019835658512dea.png?for=bg',
              'https://img2.baidu.com/it/u=985017315,3747835605&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=959'
            ]
          },
          {
            id: '2',
            username: '小红',
            avatar: '/assets/images/avatar1.png',
            content: '第一天打卡，天气真好，适合跑步',
            time: '2025-2-14 07:45',
            images: [
              'https://img0.baidu.com/it/u=259509125,2478581864&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1084',
              'https://img2.baidu.com/it/u=985017315,3747835605&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=959'
            ]
          },
          {
            id: '3',
            username: '小华',
            avatar: '/assets/images/avatar1.png',
            content: '坚持就是胜利，继续加油！',
            time: '2025-2-14 06:30',
            images: []
          }
        ];

        // 模拟激励记录数据
        const motivations = [
          {
            id: '1',
            mentorName: '小明教练',
            mentorAvatar: '/assets/images/avatar1.png',
            content: '坚持就是胜利！看到你每天按时完成训练，非常棒！继续保持这个劲头！',
            time: '2025-2-14 10:30',
            images: [
              'https://img0.baidu.com/it/u=259509125,2478581864&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1084',
              'https://img0.baidu.com/it/u=259509125,2478581864&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1084'
            ]
          },
          {
            id: '2',
            mentorName: '营养师小红',
            mentorAvatar: '/assets/images/avatar1.png',
            content: '今天的跑步配速很稳定，建议可以适当增加一些间歇训练，对提升耐力很有帮助。',
            time: '2025-2-14 15:45',
            images: [
              'https://img0.baidu.com/it/u=259509125,2478581864&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1084'
            ]
          },
          {
            id: '3',
            mentorName: '教练小华',
            mentorAvatar: '/assets/images/avatar1.png',
            content: '已经坚持一周了，进步很明显！别忘了做好拉伸，预防运动损伤。',
            time: '2025-2-14 19:20',
            images: []
          }
        ];

        // 更新页面数据
        this.setData({ 
          tasks,
          mentors,
          checkInList,
          motivations
        });

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
      const index = Number(e.currentTarget.dataset.index); // 确保 index 是数字类型
      this.setData({
        currentTab: index,
      });
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
  

    handleTaskCheckin(e: WechatMiniprogram.TouchEvent) {
      const taskId = e.currentTarget.dataset.taskId;
      wx.navigateTo({
        url: `/pages/checkin/index?taskId=${taskId}`
      });
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
    },

    // 刷新打卡记录
    async refreshRecords() {
      // 实现刷新打卡记录的逻辑
      wx.stopPullDownRefresh();
    },
  
    // 加载更多打卡记录
    async loadMoreRecords() {
      // 实现加载更多打卡记录的逻辑
    },
  
    // 刷新激励记录
    async refreshMotivations() {
      // 实现刷新激励记录的逻辑
      wx.stopPullDownRefresh();
    },
  
    // 加载更多激励记录
    async loadMoreMotivations() {
      // 实现加载更多激励记录的逻辑
    }
  });