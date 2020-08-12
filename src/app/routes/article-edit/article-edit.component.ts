import { Component, OnInit, ViewChild } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { BlogMainService } from '../home/blog-main.service';

import * as $ from 'jquery';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ActivatedRoute, Router } from '@angular/router';
import { UEditorComponent } from 'ngx-ueditor';
import { ArticleEditService } from './article-edit.service';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
})
export class ArticleEditComponent implements OnInit {

  @ViewChild('editor') editor: UEditorComponent; // 编辑器

  articleId = ''; // 文章id 
  article: any = {}; // 文章
  articleContent = '';

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
        '|',
        'insertorderedlist',  // 有序列表
        'insertunorderedlist',  // 无序列表
        '|',
        'justifyleft',  // 左对齐
        'justifycenter',  // 居中对齐
        'justifyright', // 右对齐
        'justifyjustify', // 两端对齐
        '|',
        'link', // 超链接
        'unlink', // 取消链接
        'inserttable', // 插入表格
        '|',
        'simpleupload', // 单图上传
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


  constructor(private routeUrl: Router, private blogHomeIndexService: BlogMainService, private router: ActivatedRoute, private msg: NzMessageService, private articleEditService: ArticleEditService) {
    this.articleId = this.router.snapshot.queryParams.articleId;
  }
  ngOnInit() {
    this.blogHomeIndexService.getArticleByid(this.articleId).subscribe(res => {
      if (res.body) {
        this.article = res.body;
        this.articleContent = this.article.articleContent;
      }
    });
  }

  /**
   * 保存编辑文章信息
   */
  saveArticleInfo() {
    let summary = this.editor.Instance.getContentTxt();
    if (summary && summary.length > 300) {
      summary = summary.substring(0, 300);
    }
    const content = this.editor.Instance.getContent();
    const params = {
      articleId: this.article.articleId, articleTitle: this.article.articleTitle,
      articleContent: content, articleSummary: summary, articleStatus: this.article.articleStatus
    };
    this.articleEditService.updateArticle(params).subscribe(res => {
      this.msg.info('保存成功');
      this.routeUrl.navigateByUrl('/admin/dashboard/main');
    });
  }




}
