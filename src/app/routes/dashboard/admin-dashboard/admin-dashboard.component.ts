import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BlogMainService } from '../../home/blog-main.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {



  dataSource = []; // 文章数据
  pageSize = 4;

  pageIndex = 1;
  total = 0;



  constructor(private blogHomeIndexService: BlogMainService, private route: Router) { }

  ngOnInit() {

    this.getArtileList();
  }
  getArtileList() {
    const param = { pageIndex: this.pageIndex - 1, pageSize: this.pageSize };
    this.blogHomeIndexService.queryArticleByPage(param).subscribe(res => {
      this.dataSource = res.body.list;
      this.total = res.body.total;
    });
  }

  /**
   * 标题点击
   */
  rowClick(item: any) {
    this.route.navigateByUrl('/admin/article/edit?articleId=' + item.articleId);
    // window.open('/#/admin/article/edit?articleId=' + item.articleId);
  }
}
