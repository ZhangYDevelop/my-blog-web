import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { env } from 'process';
import { Observable } from 'rxjs';
import { ReqestParamsUtils } from '../helps/request-params-utils';
import { User } from '../passport/login/login.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private sentMessageUrl = '';

    private userUrl = '';

    private userList = '';

    private userGroupList = '';

    constructor(private http: HttpClient) {

        this.sentMessageUrl = environment.cimSocketUrl + '/api/message/send';

        this.userUrl = environment.SERVER_URL + '/admin/user/getUserByUserName';

        this.userList = environment.SERVER_URL + '/admin/user/listUser';

        this.userGroupList = environment.cimSocketUrl + '/api/userGroup/getUserGroupListUserName';
    }

    /**
     * 
     * @param params 发送消息，返回发送消息的时间戳
     */
    sendMessage(params): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.sentMessageUrl, params, { observe: 'response' });
    }

    /**
     * 
     * @param params 根据用户名获取登录用户信息
     */
    getUserByUserName(params): Observable<HttpResponse<User>> {
        const reqParam = ReqestParamsUtils.getParams(params);
        return this.http.get<User>(this.userUrl, { params: reqParam, observe: 'response' });
    }

    /**
     * 获取所有聊天用户
     */
    getUserList(): Observable<HttpResponse<User[]>> {
        return this.http.get<User[]>(this.userList, { observe: 'response' });
    }

    

    getUserGroupByUserName(params): Observable<HttpResponse<any>> {
        const reqParam = ReqestParamsUtils.getParams(params);
        return this.http.get<any>(this.userGroupList, {params: reqParam, observe: 'response' });
    }


}
