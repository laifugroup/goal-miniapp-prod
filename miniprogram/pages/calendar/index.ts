Page({
    data: {
      streakDays: 5,
      rewardAmount: 200,
      isCheckedToday: false,
      checkedDates: [], // 本地存储的打卡记录
      curYear: new Date().getFullYear(), // 年份
      curMonth: new Date().getMonth() + 1,// 月份 1-12
      day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
      header_show: true, // 主标题是否显示
      prev: true, // 上一个月按钮是否显示
      next: true, // 下一个月按钮是否显示
      speciallist: [
        { date: '2025-02-01', background: 'orange', text: '已打卡'  },
        { date: '2025-02-02', background: 'orange', text: '未打卡' },
        { date: '2025-02-03', background: 'orange', text: '已打卡' },
        { date: '2025-02-04', background: 'orange', text: '已打卡' },
        { date: '2025-02-05', background: 'orange', text: '已打卡' },
        { date: '2025-02-06', background: 'orange', text: '已打卡' },
        { date: '2025-02-07', background: 'orange', text: '已打卡' },
        { date: '2025-02-08', background: 'orange', text:'未打卡',color: '#3ef', textBgcolor: '#fff' },
        { date: '2025-02-09', background: 'orange', text: '已打卡' },
        { date: '2025-02-10', background: 'orange', text: '已打卡' },
        { date: '2025-02-11', background: 'orange', text: '已打卡' },
        { date: '2025-02-12', background: 'orange', text: '未打卡' },
        ],
        circle_show: true,
        mystatus: [1,null,3,4,1,6,1,1,1,1,1 ]
    },
  
    onLoad() {
     
    },


    selectDate: function (e:any) {
      console.log(e)
      let clickDay = e.detail.date
      wx.showModal({
        title: '当前日期',
        content: '当前日期：' + clickDay 
      });
    },
     /**
    * 点击上个月
    */
   prevMonth: function (e:any) {
    console.log(e)
    const currentYear = e.detail.currentYear;
    const currentMonth = e.detail.currentMonth;
    // wx.showModal({
    //   title: '当前日期',
    //   content: '当前年份：' + currentYear + '年\n当前月份：' + currentMonth + '月'
    // });
  },
  /**
    * 点击下个月
    */
  nextMonth: function (e:any) {
    console.log(e)
    const currentYear = e.detail.currentYear;
    const currentMonth = e.detail.currentMonth;
    // wx.showModal({
    //   title: '当前日期',
    //   content: '当前年份：' + currentYear + '年\n当前月份：' + currentMonth + '月'
    // });
  }


})
  
   