import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleEditService {

    private editArticleUrl = '';



    constructor(private http: HttpClient) {

        this.editArticleUrl = environment.SERVER_URL + '/admin/article/editSubmit';

    }



    /**
     *  更新文章
     */
    updateArticle(params): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.editArticleUrl, params, { observe: 'response' });
    }

    // addArticleLikeNum(articleId, type): Observable<HttpResponse<any>> {
    //     return this.http.get<any>(`${this.likeUrl}/${articleId}/${type}`, {  observe: 'response' });
    // }




}
