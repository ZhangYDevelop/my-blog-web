import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogHomeService {

    private menuUrl = '';

    private categoryUrl = '';


    constructor(private http: HttpClient) {

        this.menuUrl = environment.SERVER_URL + '/home/tag/allTagList';

        this.categoryUrl = environment.SERVER_URL + '/home/category/map';
    }


    /**
     * 查询所标签
     * 
     */
    queryAllTag(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(this.menuUrl, { observe: 'response' });
    }

    /**
     * 查询所有文章分类
     */
    queryAllAtricleCategory(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.categoryUrl, { observe: 'response' });
    }
}
