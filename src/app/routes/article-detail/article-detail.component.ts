import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';


import { BlogMainService } from '../home/blog-main.service';

import * as $ from 'jquery';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ActivatedRoute } from '@angular/router';
import { UEditorComponent } from 'ngx-ueditor';


@Component({
  selector: 'app-article-deatil',
  templateUrl: './article-detail.component.html'
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

  ueditor_config = {
    toolbars: [
      [
        'FullScreen', // 全屏
        'bold', // 加粗
        'italic', // 斜体
        'underline', // 下划线
        '|',
        'forecolor',  // 字体颜色
        'backcolor',  // 背景色
        'fontfamily', // 字体
        'fontsize', // 字号
        'insertcode', // 代码语言
      ]
    ],
    autoClearinitialContent: true,  // 自动清除初始内容
    wordCount: true, // 文字计数
    focus: false, // 初始化后获得焦点
    initialFrameHeight: 100, // 设置高度
    initialFrameWidth: '100%', // 设置宽度
    enableDragUpload: true, // 启用拖放上传
    enablePasteUpload: true, // 启用粘贴上传
    imageScaleEnabled: true, // 启用图片拉伸缩放
    autoHeightEnabled: true, // 自动高度
  };

  @ViewChild('editor') editor: UEditorComponent; // 编辑器

  constructor(private blogHomeIndexService: BlogMainService, private router: ActivatedRoute, private msg: NzMessageService) {
    this.articleId = this.router.snapshot.queryParams.articleId;

    this.youkeName = this.youkeName + Number((Math.random() * 100000000000).toFixed(0));
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const href: string = targetElement.href;
    if (!href) {
      return false;
    }
    if (href.startsWith('http://www.xiaoyuge.com.cn') || href.startsWith('http://81.70.31.159')) { // 附件下载
      const fileName = targetElement.innerHTML;
      const xhr = new XMLHttpRequest();
      xhr.open('get', href, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'blob';
      xhr.onload = function (e) {
        if (this.status === 200) {
          const blob = this.response;
          const link = document.createElement('a');
          const val = URL.createObjectURL(blob);
          link.href = val;
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(href);
        } else {
        }
      };
      xhr.send();
    } else {
      window.open(href);
    }
    return false;
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
        // 处理p标签
        const contentStr = this.article.articleContent.replace(/<([\/]?)(p)((:?\s*)(:?[^>]*)(:?\s*))>/g, '<$1div$3>');
        $('#content').append(contentStr);
        $('#content div').css('width', '100%');

        // 增加浏览数量
        this.blogHomeIndexService.addArticleView(this.articleId).subscribe(() => { });

        // tslint:disable-next-line:no-shadowed-variable
        this.blogHomeIndexService.getSimilarArticleList(this.articleId).subscribe(res => {
          this.similarArticleList = res.body;
        });

      }
    });


  }


  /**
   * 标题点击
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
        // tslint:disable-next-line:radix
        this.article.articleLikeCount = parseInt(res.body);
      });
    } else {
      this.blogHomeIndexService.addArticleLikeNum(this.article.articleId, 0).subscribe(res => {
        // tslint:disable-next-line:radix
        this.article.articleLikeCount = parseInt(res.body);
      });
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

    const params = { commentContent: this.componentContent, commentArticleId: this.articleId, commentAuthorName: this.youkeName };

    this.blogHomeIndexService.addComponent(params).subscribe(res => {
      if (res.body) {
        this.msg.info('评论成功');
      }
    });
  }
}
