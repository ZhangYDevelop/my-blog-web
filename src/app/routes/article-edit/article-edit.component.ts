import { Component, OnInit, ViewChild } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { BlogMainService } from '../home/blog-main.service';

import * as $ from 'jquery';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ActivatedRoute, Router } from '@angular/router';
import { UEditorComponent } from 'ngx-ueditor';
import { ArticleEditService } from './article-edit.service';

import { BlogHomeService } from 'src/app/layout/default/header/blog-home-header/blog-home.service';


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
        // 'simpleupload', // 单图上传
        'insertimage',
        'attachment'
      ]
    ],
    autoClearinitialContent: true,  // 自动清除初始内容
    wordCount: true, // 文字计数
    focus: false, // 初始化后获得焦点
    initialFrameHeight: 100, // 设置高度
    initialFrameWidth: '800', // 设置宽度
    enableDragUpload: true, // 启用拖放上传
    enablePasteUpload: true, // 启用粘贴上传
    imageScaleEnabled: true, // 启用图片拉伸缩放
    autoHeightEnabled: true, // 自动高度
  };

  categoryList: any = [];

  tagList = [];

  categoryLevel1: any;
  categoryLevel2: any;

  level2List = [];

  constructor(private routeUrl: Router, private blogHomeService: BlogHomeService, private blogHomeIndexService: BlogMainService, private router: ActivatedRoute, private msg: NzMessageService, private articleEditService: ArticleEditService) {
    if (this.router.snapshot.queryParams.articleId) {
      this.articleId = this.router.snapshot.queryParams.articleId;
    }
  }
  ngOnInit() {
    if (this.articleId) {
      this.blogHomeIndexService.getArticleByid(this.articleId).subscribe(res => {
        if (res.body) {
          this.article = res.body;
          this.articleContent = this.article.articleContent;
          // 分类
          this.blogHomeService.queryAllAtricleCategory().subscribe(res => {
            const parentList = res.body.filter(item => item.categoryPid === 0);
            parentList.forEach(element => {
              const child = res.body.filter(item => item.categoryPid === element.categoryId);
              element.child = child;
            });
            this.categoryList = parentList;

            if (this.article && this.article.categoryList && this.article.categoryList.length >= 1) {
              this.categoryLevel1 = this.article.categoryList[0].categoryId + '';

              const item = this.categoryList.find(temp => temp.categoryId === this.article.categoryList[0].categoryId);
              if (item) {
                this.level2List = item.child;
                this.level2List = [...this.level2List, item.child];
                this.categoryLevel2 = this.article.categoryList[1].categoryId + '';
              }
            }

          });

          // 标签
          this.blogHomeService.queryAllTag().subscribe(res => {
            this.tagList = res.body;
            this.tagList.forEach(item => {
              item['check'] = false;
            });

            if (this.article && this.article.tagList.length > 0) {
              this.article.tagList.forEach(element => {
                if (this.tagList.find(item => item.tagId === element.tagId)) {
                  this.tagList.find(item => item.tagId === element.tagId).check = true;
                }
              });
            }
          });

        }
      });
    }


    this.blogHomeService.queryAllAtricleCategory().subscribe(res => {
      const parentList = res.body.filter(item => item.categoryPid === 0);
      parentList.forEach(element => {
        const child = res.body.filter(item => item.categoryPid === element.categoryId);
        element.child = child;
      });
      this.categoryList = parentList;
    });


    this.blogHomeService.queryAllTag().subscribe(res => {
      this.tagList = res.body;
      this.tagList.forEach(item => {
        item['check'] = false;
      });
    });
  }



  /**
   * 保存编辑文章信息
   */
  saveArticleInfo() {
    let summary = this.editor.Instance.getContentTxt();
    if (summary && summary.length > 200) {
      summary = summary.substring(0, 200);
    }
    const content = this.editor.Instance.getContent();
    const tagIdList = this.tagList.filter(item => item.check === true);
    let taIdArray = [];
    if (tagIdList.length > 0) {
      taIdArray = tagIdList.map(item => item.tagId);
    }
    if (this.categoryLevel1) {
      this.categoryLevel1 = parseInt(this.categoryLevel1);
    }
    if (this.categoryLevel2) {
      this.categoryLevel2 = parseInt(this.categoryLevel2);
    }
    const params = {
      articleId: this.article.articleId, articleTitle: this.article.articleTitle,
      articleContent: content, articleSummary: summary, articleStatus: this.article.articleStatus,
      articleParentCategoryId: this.categoryLevel1, articleChildCategoryId: this.categoryLevel2,
      articleTagIds: taIdArray
    };
    if (this.articleId) {
      this.articleEditService.updateArticle(params).subscribe(res => {
        this.msg.info('保存成功');
        this.routeUrl.navigateByUrl('/admin/dashboard/main');
      });
    } else {
      params['articleStatus'] = 1;
      this.articleEditService.addArticle(params).subscribe(res => {
        this.msg.info('保存成功');
        this.routeUrl.navigateByUrl('/admin/dashboard/main');
      });
    }

  }


  goBack() {
    this.routeUrl.navigateByUrl('/admin/dashboard/main');
  }

  /**
   * 分类级别父级变化
   */
  level1Change(e: any) {
    const id = parseInt(e);
    const item = this.categoryList.find(temp => temp.categoryId === id);
    this.categoryLevel2 = '';
    if (item) {
      this.level2List = item.child;
      this.level2List = [...this.level2List, item.child];
    }
  }
}
