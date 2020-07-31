import { Component, OnInit } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Route, ActivatedRoute } from '@angular/router';
import { BlogMainService } from '../home/blog-main.service';

import * as $ from 'jquery'


@Component({
  selector: 'app-article-deatil',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
 
  articleId = ''; // 文章id 
  article: any = {}; // 文章
  constructor(private blogHomeIndexService: BlogMainService,private router: ActivatedRoute) {
    this.articleId =  this.router.snapshot.queryParams['articleId'];
  }
  ngOnInit() {
    this.blogHomeIndexService.getArticleByid(this.articleId).subscribe(res=> {
        if (res.body) {
          this.article = res.body;
          $('#articleContent').append(this.article.articleContent);
          // 增加浏览数量
          this.blogHomeIndexService.addArticleView(this.articleId).subscribe(res=> {});
        }
    })

   
  }
}
