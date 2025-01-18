Page({
    data: {
      targetTypes: [
        { id: 1, name: '健康目标' },
        { id: 2, name: '学习目标' },
        { id: 3, name: '工作目标' },
        { id: 4, name: '生活习惯' }
      ],
      selectedType: null,
      description: '',
      deposit: '',
      minDate: new Date().toISOString().split('T')[0], // 今天
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0], // 一年后
      selectedDate: '',
      showAgreementPopup: false,  // 控制协议弹窗显示
      hasAgreed: false,          // 是否同意协议
    },
  
    // 处理类型选择
    handleTypeChange(e: WechatMiniprogram.PickerChange) {
      const index = e.detail.value
      this.setData({
        selectedType: this.data.targetTypes[index]
      })
    },
  
    
  // 处理日期选择
  handleDateChange(e: WechatMiniprogram.PickerChange) {
    this.setData({
      selectedDate: e.detail.value
    })
  },

    // 处理描述输入
    handleDescriptionChange(e: WechatMiniprogram.TextareaInput) {
      this.setData({
        description: e.detail.value
      })
    },
  
    // 处理保证金输入
    handleDepositChange(e: WechatMiniprogram.InputInput) {
      this.setData({
        deposit: e.detail.value
      })
    },


    handleAgreementChange(e: WechatMiniprogram.CheckboxGroupChange) {
      this.setData({
        hasAgreed: e.detail.value.includes('agreed')
      });
    },

    
  // 显示协议弹窗
  showAgreement() {
    this.setData({
      showAgreementPopup: true
    });
  },

  // 隐藏协议弹窗
  hideAgreement() {
    this.setData({
      showAgreementPopup: false
    });
  },

 

  // 防止弹窗穿透
  preventTouchMove() {
    return;
  },

  


  
    // 提交表单
    handleSubmit() {
      const { selectedType, description, deposit } = this.data
  
      if (!this.data.hasAgreed) {
        wx.showToast({
          title: '请先同意用户服务协议',
          icon: 'none'
        });
        return;
      }

      if (!selectedType) {
        wx.showToast({ title: '请选择目标类型', icon: 'none' })
        return
      }

      if (!this.data.selectedDate) {
        wx.showToast({ title: '请选择截止日期', icon: 'none' })
        return
      }
  
      if (!description.trim()) {
        wx.showToast({ title: '请输入目标描述', icon: 'none' })
        return
      }
  
      if (!deposit || Number(deposit) <= 0) {
        wx.showToast({ title: '请输入有效的保证金金额', icon: 'none' })
        return
      }


      if (!this.data.hasAgreed) {
        this.setData({ showAgreementModal: true })
        return
      }
  
      // 提交逻辑
      wx.showLoading({ title: '正在创建...' })
      // 这里可以添加你的提交逻辑
    }
  })