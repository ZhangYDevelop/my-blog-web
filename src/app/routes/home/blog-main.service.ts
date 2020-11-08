import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogMainService {

    private articleUrl = '';

    private articleSearchWdUrl = '';

    private optionsUrl = '';

    private siteGkUrl = '';

    private noticeUrl = '';

    private conmmoentUrl = '';

    private articleDetailUrl = '';

    private articleViewUrl = '';

    private mostCommonentArticleUrl = '';

    private randomArticleUrl = '';

    private likeUrl = '';

    private similarArticleUrl = '';

    private addComponentUrl = '';

    private deleteArticleUrl = '';

    private articleTongjiUrl = '';

    constructor(private http: HttpClient) {

        this.deleteArticleUrl = environment.SERVER_URL + '/admin/article/delete';

        this.addComponentUrl = environment.SERVER_URL + '/home/comment';

        this.likeUrl = environment.SERVER_URL + '/home/article/like';

        this.similarArticleUrl = environment.SERVER_URL + '/home/article/similarArticleList';

        this.randomArticleUrl = environment.SERVER_URL + '/home/article/randomArticleList';

        this.mostCommonentArticleUrl = environment.SERVER_URL + '/home/article/mostCommentArticleList';

        this.articleUrl = environment.SERVER_URL + '/home/index';

        this.articleSearchWdUrl = environment.SERVER_URL + '/home/index/search';

        this.articleDetailUrl = environment.SERVER_URL + '/home/article/detail';

        this.articleViewUrl = environment.SERVER_URL + '/home/article/view';

        this.optionsUrl = environment.SERVER_URL + '/home/options';

        this.siteGkUrl = environment.SERVER_URL + '/home/siteGk';

        this.noticeUrl = environment.SERVER_URL + '/home/notice/listNotice';

        this.conmmoentUrl = environment.SERVER_URL + '/home/comment/recentComment';

        this.articleTongjiUrl = environment.SERVER_URL + '/home/getArticleViewTongji';

    }


    /**
     * 
     * @param params 提交评论
     *
     */
    addComponent(params): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.addComponentUrl, params, { observe: 'response' });
    }

    /**
     * 增加文章点赞数
     * @param articleId 文章ID
     * @param type 类型
     */
    addArticleLikeNum(articleId, type): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.likeUrl}/${articleId}/${type}`, { observe: 'response' });
    }


    /**
     * 获取随机文章
     * 
     */
    getRandomArticle(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.randomArticleUrl, { observe: 'response' });
    }



    /**
     * 
     * @param articleid 获取相关文章
     */
    getSimilarArticleList(articleid): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.similarArticleUrl}/${articleid}`, { observe: 'response' });
    }


    /**
     * 获取热评文章
     * 
     */
    getHotCommonentArticle(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.mostCommonentArticleUrl, { observe: 'response' });
    }

    /**
     * 关键字查询所有文章
     * 
     */
    queryArticleByPageByKeyWd(param): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleSearchWdUrl, { params: param, observe: 'response' });
    }

    /**
     * 根据文章ID增加文章浏览数量
     * @param id 文章ID
     */
    addArticleView(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.articleViewUrl}/${id}`, { observe: 'response' });
    }


    /**
     * 查询所有文章
     * 
     */
    queryArticleByPage(param): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleUrl, { params: param, observe: 'response' });
    }

    /**
     * 根据文章id获取文章
     * @param id 文章ID
     */
    getArticleByid(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.articleDetailUrl}/${id}`, { observe: 'response' });
    }


    /**
     * 获取网站参数
     */
    queryOptions(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.optionsUrl, { observe: 'response' });
    }



    /**
     * 网站概况
     */
    getSiteGk(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.siteGkUrl, { observe: 'response' });
    }


    /**
     * 网站通知
     */
    getNotice(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.noticeUrl, { observe: 'response' });
    }

    /**
     * 获取评论
     */
    getCommonent(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.conmmoentUrl, { observe: 'response' });
    }

    deleteArticle(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.deleteArticleUrl}/${id}`, { observe: 'response' });
    }


    /**
     * 获取文章浏览量（根据天统计）
     */
    getArticleViewTongji(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleTongjiUrl, { observe: 'response' });
    }
}
