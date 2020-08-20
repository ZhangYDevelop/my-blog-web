import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { App, SettingsService } from '@delon/theme';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HeaderAdminService } from './header.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  searchToggleStatus: boolean;


  menu = {};

  get app(): App {
    return this.settings.app;
  }

  get collapsed(): boolean {
    return this.settings.layout.collapsed;
  }

  constructor(private settings: SettingsService, private router: Router, private headerService: HeaderAdminService) { }


  ngOnInit(): void {
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  routeClick() {
    this.router.navigateByUrl('/');
  }

  /**
   * 菜单点击
   */
  menuClick(url: string) {
    this.router.navigateByUrl(url);
  }
}
