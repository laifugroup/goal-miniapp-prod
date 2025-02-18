Page({
  data: {
    textContent: '',
    mediaList: [] as Array<{ tempFilePath: string; type: 'image' | 'video' }>,
    userInfo: {
      avatarUrl: 'https://wx2.sinaimg.cn/mw690/006GUdCXly1hqiu8wmoe5j31hc1hcwjx.jpg',
      nickName: '-'
    },
    goalInfo: {
      name: '~'
    },
    taskInfo: {
      title: '~',
      description: '~'
    }
  },

  onLoad(options: { taskId?: string }) {
    options.taskId='123'
    // 从options或其他接口获取任务信息
    if (options.taskId) {
      this.loadTaskInfo(options.taskId);
    } else {
      // 处理taskId不存在的情况
      wx.showToast({
        title: '任务ID不存在',
        icon: 'error'
      });
    }
  },

  async loadTaskInfo(taskId: string) {
    // TODO: 调用接口获取任务详情
    // 这里先模拟数据
    this.setData({
      userInfo: {
        avatarUrl: 'https://wx2.sinaimg.cn/mw690/006GUdCXly1hqiu8wmoe5j31hc1hcwjx.jpg',
        nickName: '李四'
      },
      goalInfo: {
        name: '30天减重10kg'
      },
      taskInfo: {
        title: '30天减重10kg',
        description: '每天100个俯卧撑'
      }
    });
  },

  onInput(e: WechatMiniprogram.Input) {
    this.setData({ textContent: e.detail.value });
  },
  async chooseMedia() {
    const res = await wx.chooseMedia({
      count: 9 - this.data.mediaList.length,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30
    });

    const newMedia = res.tempFiles.map(file => ({
      tempFilePath: file.tempFilePath,
      type: file.fileType as 'image' | 'video'
    }));

    this.setData({
      mediaList: [...this.data.mediaList, ...newMedia]
    });
  },

  removeMedia(e: WechatMiniprogram.Touch) {
    const index = e.currentTarget.dataset.index;
    const newList = this.data.mediaList.filter((_, i) => i !== index);
    this.setData({ mediaList: newList });
  },

  previewMedia(e: WechatMiniprogram.Touch) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.mediaList
      .filter(item => item.type === 'image')
      .map(item => item.tempFilePath);

    wx.previewImage({
      current: urls[index],
      urls
    });
  },

  submitCheckin() {
    if (!this.data.textContent && this.data.mediaList.length === 0) {
      wx.showToast({ title: '请填写内容或上传文件', icon: 'none' });
      return;
    }

    // 这里添加实际提交逻辑
    wx.showLoading({ title: '提交中...' });
    
    // 模拟提交
    setTimeout(() => {
      wx.hideLoading();
      wx.navigateTo({ url: '/pages/checkin-list/index' });
      this.setData({ textContent: '', mediaList: [] });
    }, 1500);
  }
});