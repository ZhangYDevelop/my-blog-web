import { Component, OnInit } from '@angular/core';
import { App, SettingsService } from '@delon/theme';

import { BlogHomeService } from './blog-home.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-home-layout-header',
  templateUrl: './blog-home-header.component.html'
})
export class BlogHomeLayoutHeaderComponent implements OnInit {


  searchToggleStatus: boolean;

  categoryList: [];

  tagList = [];

  searchWord = '';

  get app(): App {
    return this.settings.app;
  }

  get collapsed(): boolean {
    return this.settings.layout.collapsed;
  }

  constructor(private settings: SettingsService, private blogHomeService: BlogHomeService,
    private router: Router, private router2: ActivatedRoute) {

    if (this.router2.snapshot.queryParams.wd) {
      this.searchWord = this.router2.snapshot.queryParams.wd;
    }
  }
  ngOnInit(): void {
    this.blogHomeService.queryAllTag().subscribe(res => {
      this.tagList = res.body;
    });

    this.blogHomeService.queryAllAtricleCategory().subscribe(res => {
      const parentList = res.body.filter(item => item.categoryPid === 0);
      parentList.forEach(element => {
        const child = res.body.filter(item => item.categoryPid === element.categoryId);
        element.child = child;
      });
      this.categoryList = parentList;
    });

  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  /**
   * 登录
   */
  toLogin() {
    this.router.navigateByUrl('/passport/login');
  }

  /**
   * 搜索
   */
  search(url) {
    if (!url) {
      this.search('/#/blog?wd=' + this.searchWord);
    }
    window.open(url);
  }

  keyDown(e) {
    const evt = window.event || e;
    if (evt.keyCode === 13) {
      this.search('/#/blog?wd=' + this.searchWord);
    }
  }

  /**
   * 菜单点击
   */
  menuClick(item) {
    this.searchWord = item.categoryId;
    this.search('/#/blog?categoryId=' + this.searchWord);
  }

  routeClick() {
    this.router.navigateByUrl('/');
  }
}
