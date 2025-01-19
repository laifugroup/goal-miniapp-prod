import { getBanners } from '../../utils/api'; // 导入获取 banners 的函数
import { Banner, QuickAction } from '../../utils/types'; // 导入类型

Page({
    data: {
        banners: [] as Banner[], // 存储 banner 数据
        quickActions: []as QuickAction[] // 存储快捷按钮数据
    },

    onLoad() {
        this.fetchBanners();
        this.setQuickActions(); // 设置快捷按钮
    },

    async fetchBanners() {
        try {
            const response = await getBanners();
            console.log('Banners response:', response); // 添加日志
            if (response.data && Array.isArray(response.data)) {
                this.setData({
                    banners: response.data // 设置 banner 数据
                });
            }
        } catch (error) {
            console.error('获取 banners 失败:', error);
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
    }
});