import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderAdminService {

    private menuUrl = '';
    constructor(private http: HttpClient) {

        this.menuUrl = environment.SERVER_URL + '/admin/menu/list';
    }

    getAdminMenuList(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.menuUrl, { observe: 'response' });
    }

}
