import { get,post } from './request';
import { RspPage,PointItemRsp,LoginParams,PageParams, Rsp, LoginRsp, Banner, MessageParams, MessageResponse, UserInfo } from './types'; // 导入类型

export const login = (params: LoginParams): Promise<Rsp<LoginRsp>> => {
    return post('/v1/oauth2/login', params);
}; 


export const getBanners = (): Promise<Rsp<Banner[]>> => {
    return get('/v1/banners/square');
}; 

export const getMessages = (params: MessageParams): Promise<Rsp<MessageResponse>> => {
    return get('/v1/messages', params);
}; 

export const getUserInfo = (): Promise<Rsp<UserInfo>> => {
    return get('/v1/user/info');
}; 

// 获取积分列表
export const getPointsList = (params: PageParams): Promise<RspPage<PointItemRsp[]>>=> {
    return get('/v1/points/list',params);
  };