import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { BlogMainService } from './blog-main.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-main.component.html'
})
export class BlogHomeComponent implements OnInit {

  private articleList = [];

  private pageSize = 0;

  private pageIndex = 8;

  constructor(private blogHomeIndexService: BlogMainService) {

  }
  ngOnInit() {

    const param = { pageIndex: this.pageIndex, pageSize: this.pageSize };
    this.blogHomeIndexService.queryArticleByPage(param).subscribe(res => {
      this.articleList = res.body.list;
    });
  }


}
