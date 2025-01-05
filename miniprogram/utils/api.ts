import { post } from './request';

// 请求参数类型
interface LoginParams {
    username: string;
    password: string;
}
interface Rsp<T> {
    code: number;
    message: string;
    data: T
}
// 返回数据类型
interface LoginRsp{
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    tokenType?: string;
}



export const login = (params: LoginParams): Promise<Rsp<LoginRsp>> => {
    return post('/v1/oauth2/login', params);
}; 