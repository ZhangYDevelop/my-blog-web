import { Component, OnInit } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Route, ActivatedRoute } from '@angular/router';
import { BlogMainService } from '../home/blog-main.service';

import * as $ from 'jquery'
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-article-deatil',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {

  articleId = ''; // 文章id 
  article: any = {}; // 文章

  hotArticleList = []; // 热评文章

  randomArticleList = []; // 随机文章

  likeFlag = false;

  isVisible = false;

  radioValue = 'A';

  componentContent = ''; // 品论内容
  youkeName = '微博客~游~';

  similarArticleList = []; // 相关文章

  constructor(private blogHomeIndexService: BlogMainService, private router: ActivatedRoute, private msg: NzMessageService) {
    this.articleId = this.router.snapshot.queryParams['articleId'];

    this.youkeName = this.youkeName + Number((Math.random() * 100000000000).toFixed(0));
  }
  ngOnInit() {

    this.blogHomeIndexService.getHotCommonentArticle().subscribe(res => {
      this.hotArticleList = res.body;
    });

    this.blogHomeIndexService.getRandomArticle().subscribe(res => {
      this.randomArticleList = res.body;
    });

   

    this.blogHomeIndexService.getArticleByid(this.articleId).subscribe(res => {
      if (res.body) {
        this.article = res.body;
        $('#articleContent').append(this.article.articleContent);
        // 增加浏览数量
        this.blogHomeIndexService.addArticleView(this.articleId).subscribe(res => { });

        this.blogHomeIndexService.getSimilarArticleList(this.articleId).subscribe(res => {
          this.similarArticleList = res.body;
        });
    
      }
    })


  }


  /**
   * 标题点击
   * @param item
   */
  articleTitleClick(item: any) {
    window.open('/#/article/detail?articleId=' + item.articleId);
  }

  /**
   * 点赞
   */
  dianZan() {
    this.likeFlag = !this.likeFlag;
    if (this.likeFlag) {
      this.blogHomeIndexService.addArticleLikeNum(this.article.articleId, 1).subscribe(res => {
        this.article.articleLikeCount = parseInt( res.body);
      })
    } else {
      this.blogHomeIndexService.addArticleLikeNum(this.article.articleId, 0).subscribe(res => {
        this.article.articleLikeCount = parseInt( res.body);
      })
    }
  
  }

  daShang() {
    this.isVisible = true;
  }

  nzOnCancel() {
    this.isVisible = false;
  }

  /**
   * 提交评论
   */
  commitComponent() {

     const  params = {commentContent: this.componentContent, commentArticleId: this.articleId, commentAuthorName: this.youkeName};

     this.blogHomeIndexService.addComponent(params).subscribe(res => {
        if (res.body) {
            this.msg.info('评论成功');
        }
     });
  }
}
