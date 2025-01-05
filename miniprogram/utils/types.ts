// 请求参数类型
export interface LoginParams {
    username: string;
    password: string;
}

export interface Rsp<T> {
    code: number;
    message: string;
    data: T;
}

// 返回数据类型
export interface LoginRsp {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    tokenType?: string;
}

// Banners 返回数据类型
export interface Banner {
    id: string;
    imageUrl: string;
    link?: string;
}

export interface QuickAction {
    id: string;
    title: string;
    icon: string;
    path: string;
}

// 消息类型枚举
export enum MessageType {
    CHECKIN = 'checkin',
    REMINDER = 'reminder',
    SYSTEM = 'system'
}

// 消息项接口
export interface Message {
    id: string;
    type: MessageType;
    title: string;
    content: string;
    isRead: boolean;
    createTime: string;
}

// 消息列表请求参数
export interface MessageParams {
    type: MessageType;
    page: number;
    pageSize: number;
}

// 消息列表响应
export interface MessageResponse {
    list: Message[];
    total: number;
    unreadCount: {
        checkin: number;
        reminder: number;
        system: number;
    };
}

export interface UserInfo {
    id: string;
    nickName: string;
    avatarUrl: string;
    bio?: string;
    checkinDays: number;
    points: number;
    level: number;
}




