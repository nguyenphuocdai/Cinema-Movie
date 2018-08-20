import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private scriptService: ScriptService, ) { }

  ngOnInit() {
    this.scriptService.loadScript('../../../../../assets/js/plugin/chartist/plugin/chartist-plugin-tooltip.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script chartist-plugin-tooltip js');
    });
    this.scriptService.loadScript('../../../../../assets/js/plugin/chartist/chartist.min.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script chartist js');
    });
    this.scriptService.loadScript('../../../../../assets/js/demo.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script chartist js');
    });
  }

}
