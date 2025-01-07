import { getPointsList } from '../../utils/api';
import { PointItemRsp } from '../../utils/types';

  
  Page({
    data: {
      pointsList: [] as PointItemRsp[], // 积分列表数据
      page: 1,        // 当前页码
      pageSize: 10,   // 每页条数
      hasMore: true,  // 是否还有更多数据
      refreshing: false // 是否正在刷新
    },
  
    onLoad() {
      this.loadData();
    },
  
    // 加载数据
    async loadData() {
     try {
        const { page, pageSize } = this.data;
        // 调用封装的API接口
        const res = await getPointsList({ page, pageSize });
        const newData = res.data.records
        this.setData({
          pointsList: page === 1 ? newData : this.data.pointsList.concat(newData),
          hasMore: newData.length >= pageSize
        });
     } catch (error) {
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        });
     }
    },
  
    // 下拉刷新
    onRefresh() {
      console.log("下拉刷新")
      this.setData({
        refreshing: true,
        page: 1
      });
      
      setTimeout(() => {
        this.loadData();
        this.setData({ refreshing: false });
      }, 1000);
    },
  
    // 上拉加载更多
    onReachBottom() {
      console.log("上拉加载更多")
      if (!this.data.hasMore) return;
      
      this.setData({
        page: this.data.page + 1
      });
      this.loadData();
    },
  
  });