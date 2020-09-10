import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { BlogMainService } from './blog-main.service';

import { environment } from '@env/environment';

import { ActivatedRoute } from '@angular/router';

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

  noticeList = [];

  commonentList = [];

  noticeStr = '';

  editorContent = '';

  wd = ''; // 搜索关键字
  categoryId = ''; // 分类ID

  hotArticleList = []; // 热评文章

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

  articleViewData = [];

  constructor(private blogHomeIndexService: BlogMainService, private router: ActivatedRoute) {
    if (this.router.snapshot.queryParams.wd) {
      this.wd = this.router.snapshot.queryParams.wd;
    }
    if (this.router.snapshot.queryParams.categoryId) {
      this.categoryId = this.router.snapshot.queryParams.categoryId;
    }
  }

  ngOnInit() {

    this.handlerArticleList();


    this.blogHomeIndexService.queryOptions().subscribe(res => {
      this.options = res.body;
      if (this.options) {
        this.options.optionAboutsiteAvatar = environment.fileDownPath + this.options.optionAboutsiteAvatar;
        this.options.optionAboutsiteWechat = environment.fileDownPath + this.options.optionAboutsiteWechat;
      }

    });

    this.blogHomeIndexService.getSiteGk().subscribe(res => {
      this.siteGk = res.body;
    });

    this.blogHomeIndexService.getNotice().subscribe(res => {
      this.noticeList = res.body;
    });

    this.blogHomeIndexService.getCommonent().subscribe(res => {
      if (res.body) {
        this.commonentList = res.body;
      }

    });

    this.blogHomeIndexService.getHotCommonentArticle().subscribe(res => {
      this.hotArticleList = res.body;
    });
    this.blogHomeIndexService.getArticleViewTongji().subscribe(res => {
      if (res.body) {
        this.articleViewData = res.body;
        this.handlerEcharts();
      }
    });

  }

  handlerEcharts() {
    const echarts = require('echarts');
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('feeBarChart'));
    // 绘制图表

    myChart.setOption({
      tooltip: { trigger: 'axis' },
      calculable: true,
     
      xAxis: {
        data: this.articleViewData.map(item => item.days)
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [{
        type: 'line',
        name: 'PV',
        smooth: 0.6,
            symbol: 'none',
            lineStyle: {
                color: '#2adc8a',
                width: 2
        },
        data: this.articleViewData.map(item => item.count)
      }]
    });
  }


  handlerArticleList() {

    if (this.wd || this.categoryId) {
      const param = { pageIndex: this.pageIndex, pageSize: this.pageSize, keywords: this.wd, categoryId: this.categoryId };
      this.blogHomeIndexService.queryArticleByPageByKeyWd(param).subscribe(res => {
        this.handlerArticleData(res.body.list);
      });
    } else {
      const param = { pageIndex: this.pageIndex, pageSize: this.pageSize };
      this.blogHomeIndexService.queryArticleByPage(param).subscribe(res => {
        this.handlerArticleData(res.body.list);
      });
    }
  }


  handlerArticleData(data) {
    this.articleList = data;
    this.articleList.forEach(item => {
      item.imgStr = environment.fileDownPath + '/thumbnail/random/img_' + item.articleId % 15 + '.jpg';
    });
  }

  gitHubClick() {
    window.open(this.options.optionAboutsiteGithub);
  }

  weixinClick() {
    this.isVisible = true;
  }

  nzOnCancel() {
    this.isVisible = false;
  }

  /**
   * 标题点击
   */
  titleClick(item: any) {
    window.open('/#/article/detail?articleId=' + item.articleId);
  }
}
