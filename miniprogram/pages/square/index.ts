import { getBanners } from '../../utils/api'; // 导入获取 banners 的函数
import { Banner, QuickAction } from '../../utils/types'; // 导入类型

Page({
    data: {
        banners: [] as Banner[], // 存储 banner 数据
        tabs: [], // 存储标签页数据
        currentTab: 1, // 当前选中的标签页
        checkinList: [] as CheckinItem[], // 打卡列表
        page: 1,
        refreshing: false,
        hasMore: true,
    },

    onLoad() {
        this.fetchBanners();
        this.setTabs(); // 设置标签页
        this.loadData();
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
        if (!this.data.hasMore) return;
        console.log("上拉加载更多")
      this.setData({ page: this.data.page + 1 });
      this.loadData();
    },

       // 下拉刷新
    onPullDownRefresh() {
        console.log("下拉刷新")
      this.setData({
        page: 1
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
          hasMore: this.data.page<=2
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


    checkinDetail(){
        wx.navigateTo({
            url: '/pages/goal/index'
          });
    },

    setTabs() {
        const tabs = [
            { id: 1, name: '健康目标' },
            { id: 2, name: '学习目标' },
            { id: 3, name: '工作目标' },
            { id: 4, name: '生活习惯' }
        ];
        this.setData({ tabs });
    },

    switchTab(e: any) {
        const id = e.currentTarget.dataset.id;
        if (this.data.currentTab !== id) {
            this.setData({
                currentTab: id,
                page: 1,
                checkinList: [],
                hasMore: true
            });
            this.loadData();
        }
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