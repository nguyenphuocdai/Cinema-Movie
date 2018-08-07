import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../../../../node_modules/ngx-script-loader';

@Component({
  selector: 'app-uat-feature',
  templateUrl: './uat-feature.component.html',
  styleUrls: ['./uat-feature.component.scss']
})
export class UATFeatureComponent implements OnInit {

  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('../../../../../assets/js/sha.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script sha js');
    });
  }
  ngOnInit() {
    this.scriptService.loadScript('../../../../../assets/js/authenticator.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script authenticator js');
    });
  }

}
