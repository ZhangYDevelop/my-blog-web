import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-component-foot',
  templateUrl: './foot.component.html'
})
export class FootComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  beianClick() {
    window.open('http://beian.miit.gov.cn');
  }

}
