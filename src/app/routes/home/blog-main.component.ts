import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { BlogMainService } from './blog-main.service';
import { environment } from '@env/environment';
import { env } from 'process';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-main.component.html'
})
export class BlogHomeComponent implements OnInit {

   articleList = [];

   pageSize = 0;

   pageIndex = 8;

   options: any = {}; // 网站基本信息

   isVisible = false;

   siteGk = [];

  constructor(private blogHomeIndexService: BlogMainService) {

  }
  ngOnInit() {

    const param = { pageIndex: this.pageIndex, pageSize: this.pageSize };
    this.blogHomeIndexService.queryArticleByPage(param).subscribe(res => {
      this.articleList = res.body.list;
      this.articleList.forEach(item => {
          item.imgStr = environment.fileDownPath + '/thumbnail/random/img_' + item.articleId % 15 + '.jpg'
      });
    });

    this.blogHomeIndexService.queryOptions().subscribe(res => {
      this.options = res.body;
      if (this.options) {
        this.options.optionAboutsiteAvatar = environment.fileDownPath + this.options.optionAboutsiteAvatar  
        this.options.optionAboutsiteWechat = environment.fileDownPath + this.options.optionAboutsiteWechat;
      }
     
    })

    this.blogHomeIndexService.getSiteGk().subscribe(res => {
        this.siteGk = res.body;
    });
  }


  gitHubClick() {
     window.open(this.options.optionAboutsiteGithub)
  }

  weixinClick() {
    this.isVisible = true;
  }

  nzOnCancel() {
    this.isVisible = false;
  }
}
