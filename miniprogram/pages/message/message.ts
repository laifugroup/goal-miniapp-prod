import { getMessages } from '../../utils/api';
import { Message, MessageType } from '../../utils/types';

Page({
    data: {
        activeTab: MessageType.CHECKIN,
        tabs: [
            { type: MessageType.CHECKIN, name: '打卡消息', unread: 0 },
            { type: MessageType.REMINDER, name: '提醒消息', unread: 0 },
            { type: MessageType.SYSTEM, name: '系统消息', unread: 0 }
        ],
        messages: [] as Message[],
        page: 1,
        pageSize: 20,
        loading: false,
        hasMore: true
    },

    onLoad() {
        this.loadMessages(true);
    },

    // 切换 tab
    onTabChange(e: any) {
        const activeTab = e.currentTarget.dataset.type;
        this.setData({ 
            activeTab,
            messages: [],
            page: 1,
            hasMore: true
        }, () => {
            this.loadMessages(true);
        });
    },

    // 加载消息
    async loadMessages(refresh = false) {
        if (this.data.loading || (!refresh && !this.data.hasMore)) return;

        this.setData({ loading: true });

        try {
            const { activeTab, page, pageSize } = this.data;
            const response = await getMessages({
                type: activeTab,
                page,
                pageSize
            });

            const { list, total, unreadCount } = response.data;
            const newMessages = refresh ? list : [...this.data.messages, ...list];
            
            this.setData({
                messages: newMessages,
                page: page + 1,
                hasMore: newMessages.length < total,
                'tabs[0].unread': unreadCount.checkin,
                'tabs[1].unread': unreadCount.reminder,
                'tabs[2].unread': unreadCount.system,
                loading: false
            });
        } catch (error) {
            console.error('获取消息失败:', error);
            this.setData({ loading: false });
        }
    },

    // 下拉刷新
    async onPullDownRefresh() {
        await this.loadMessages(true);
        wx.stopPullDownRefresh();
    },

    // 上拉加载
    onReachBottom() {
        this.loadMessages();
    }
}); 