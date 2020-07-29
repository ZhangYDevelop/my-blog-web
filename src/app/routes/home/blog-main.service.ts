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

    constructor(private http: HttpClient) {

        this.articleUrl = environment.SERVER_URL + '/home/index';

        this.optionsUrl = environment.SERVER_URL  + '/home/options'

        this.siteGkUrl = environment.SERVER_URL + '/home/siteGk';

    }


    /**
     * 查询所有文章
     * 
     */
    queryArticleByPage(param): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleUrl, { params: param, observe: 'response' });
    }


     /**
     * 查询所有文章
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
}
