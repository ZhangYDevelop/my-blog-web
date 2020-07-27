import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogMainService {

    private articleUrl = '';

    constructor(private http: HttpClient) {

        this.articleUrl = environment.SERVER_URL + '/home/index';

    }


    /**
     * 查询所有文章
     * 
     */
    queryArticleByPage(param): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.articleUrl, { params: param, observe: 'response' });
    }


}
