import { HttpParams } from '@angular/common/http';

export class ReqestParamsUtils {


    /**
     * 
     * @param req 组装参数
     */
    public static getParams(req) {
        let options: HttpParams = new HttpParams();
        if (req) {
            Object.keys(req).forEach((key) => {
                options = options.set(key, req[key]);
            });
        }
        return options;
    }

}
