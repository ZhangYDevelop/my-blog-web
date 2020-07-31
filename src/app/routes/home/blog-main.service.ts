import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogMainService {

    private articleUrl = '';

    private optionsUrl = '';

    private siteGkUrl = '';

    private noticeUrl = '';

    private conmmoentUrl = '';

    private articleDetailUrl = '';

    private articleViewUrl = '';

    constructor(private http: HttpClient) {

        this.articleUrl = environment.SERVER_URL + '/home/index';

        this.articleDetailUrl = environment.SERVER_URL + '/home/article/detail';

        this.articleViewUrl = environment.SERVER_URL + '/home/article/view'; 

        this.optionsUrl = environment.SERVER_URL  + '/home/options'

        this.siteGkUrl = environment.SERVER_URL + '/home/siteGk';

        this.noticeUrl = environment.SERVER_URL + '/home/notice/listNotice';

        this.conmmoentUrl = environment.SERVER_URL + '/home/comment/recentComment'

    }

    /**
     * 根据文章ID增加文章浏览数量
     * @param id
     */
    addArticleView(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.articleViewUrl}/${id}`, {  observe: 'response' });
    }


    /**
     * 查询所有文章
     * 
     */
    queryArticleByPage(param): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleUrl , { params: param, observe: 'response' });
    }

    /**
     * 根据文章id获取文章
     * @param id
     */
    getArticleByid(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.articleDetailUrl}/${id}`, {  observe: 'response' });
    }


     /**
     * 参数
     * 
     */
    queryOptions(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.optionsUrl, {  observe: 'response' });
    }

    

      /**
     * 网站概况
     * 
     */
    getSiteGk(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.siteGkUrl, {  observe: 'response' });
    }

    
      /**
     * 网站通知
     * 
     */
    getNotice(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.noticeUrl, {  observe: 'response' });
    }

    /**
     * 获取评论
     */
    getCommonent(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.conmmoentUrl, {  observe: 'response' });
    }
    
}
