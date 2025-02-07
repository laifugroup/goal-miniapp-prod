import { getBanners } from '../../utils/api'; // 导入获取 banners 的函数
import { Banner, QuickAction } from '../../utils/types'; // 导入类型

Page({
    data: {
        banners: [] as Banner[], // 存储 banner 数据
        quickActions: []as QuickAction[], // 存储快捷按钮数据
        checkinList: [] as CheckinItem[], // 打卡列表
        page: 1,
        refreshing: false,
    },

    onLoad() {
        this.fetchBanners();
        this.setQuickActions(); // 设置快捷按钮
        this.loadData()
    },

    async fetchBanners() {
        try {
            const response = await getBanners();
            if (response.data && Array.isArray(response.data)) {
                this.setData({
                    banners: response.data // 设置 banner 数据
                });
            }
        } catch (error) {
            console.error('获取 banners 失败:', error);
        }
    },
    // 上拉加载更多
    onReachBottom() {
        console.log("onReachBottom")
      this.setData({ page: this.data.page + 1 });
      this.loadData();
    },

       // 下拉刷新
    onPullDownRefresh() {
        console.log("onPullDownRefresh")
      this.setData({
        page: 1,
        hasMore: true
      });
      this.loadData();
    },

     // 加载数据
     async loadData() {
        if (this.data.refreshing ) return;
        this.setData({ refreshing: true });
       try{
            // 模拟请求
        const newData = await this.mockRequest1();
    
        this.setData({
          checkinList: this.data.page === 1 ? newData : [...this.data.checkinList, ...newData],
          refreshing: false,
          hasMore: newData.length >= 10
        });
       }catch(error){
          wx.showToast({
              title: '加载失败',
              icon: 'error'
            });
       }
       finally{
          console.log("stopPullDownRefresh")
           wx.stopPullDownRefresh()
       }
      },

    // 添加图片加载事件处理
    onImageLoad(e: any) {
        console.log('Image loaded:', e);
    },

    setQuickActions() {
        const quickActions: QuickAction[] = [
            { id: 'target', title: '目标激励', icon: '🎯', path: '/pages/target/index' },
            { id: 'weight', title: '庆典活动', icon: '⚖️', path: '/pages/weight/index' },
            //{ id: 'muscle', title: '增肌计划', icon: '💪', path: '/pages/muscle/index' },
            { id: 'start', title: '开始训练', icon: '🏃', path: '/pages/training/index' },
            { id: 'nutrition', title: '营养指导', icon: '🥗', path: '/pages/nutrition/index' } ,
           // { id: 'cardio', title: '有氧训练', icon: '🏋️', path: '/pages/cardio/index' },
           // { id: 'yoga', title: '瑜伽课程', icon: '🧘', path: '/pages/yoga///index' },
           // { id: 'sleep', title: '睡眠管理', icon: '😴', path: '/pages/sleep/index' },
            { id: 'progress', title: '进度追踪', icon: '📈', path: '/pages/progress/index' },
          //  { id: 'settings', title: '设置', icon: '⚙️', path: '/pages/settings/index' }
        ];
        this.setData({
            quickActions // 设置快捷按钮数据
        });
    },


      // 修改模拟请求数据
      mockRequest1(): Promise<CheckinItem[]> {
        return new Promise(resolve => {
          setTimeout(() => {
            const data = Array.from({ length: 10 }).map((_, i) => {
              const totalDays = 21; // 固定21天
              const currentDay = Math.floor(Math.random() * (totalDays + 1)); // 随机当前天数
              
              return {
                id: Date.now() + i,
                title: `坚持锻炼，30天减重10斤 ${this.data.page * 10 + i}`,
                creator: {
                  name: '李四张三',  // 这里可以是动态数据
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