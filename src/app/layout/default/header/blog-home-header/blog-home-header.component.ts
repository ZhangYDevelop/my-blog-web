import { Component, OnInit } from '@angular/core';
import { App, SettingsService } from '@delon/theme';

import { Router } from '@angular/router';
import { BlogHomeService } from './blog-home.service';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-blog-home-layout-header',
  templateUrl: './blog-home-header.component.html'
})
export class BlogHomeLayoutHeaderComponent implements OnInit {


  searchToggleStatus: boolean;

  categoryList: [];

  tagList = [];

  get app(): App {
    return this.settings.app;
  }

  get collapsed(): boolean {
    return this.settings.layout.collapsed;
  }

  constructor(private settings: SettingsService, private blogHomeService: BlogHomeService,
     private router: Router) { }
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
}
