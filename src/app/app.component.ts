import { Component, NgZone, AfterViewInit, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { style, query, group, animate, trigger, transition } from '@angular/animations';
import { ScriptService } from '../../node_modules/ngx-script-loader';
import { AuthGuardService } from './shared/services/auth.service';
import { TitleService } from './shared/services/title.service';

const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' }), { optional: true }),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
    ]), { optional: true }),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
    ]), { optional: true })
  ])
];

const slideRight = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' }), { optional: true }),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)' }), { optional: true }),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
    ]), { optional: true }),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
    ]), { optional: true })
  ])
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', opacity: 1 }), { optional: true }),
        group([
          query(':enter', [
            style({ opacity: 0, width: '100%', height: '900px' }),
            animate('1000ms ease-in-out', style({ opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1, width: '100%', height: '900px' }),
            animate('200ms ease-in-out', style({ opacity: 0 }))], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Movie Point';
  show: Boolean = true;
  userNameLogin: String;
  isLogin: Boolean;
  constructor(
    private scriptService: ScriptService,
    public ngZone: NgZone,
    private _authGuardService: AuthGuardService,
    private _titleService : TitleService
  ) {

  }
  ngOnInit(): void {
    this.scriptService.loadScript('../../../../../assets/js/subiz-social.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script subiz');
    });
    this._titleService.init();
  }
  ngAfterViewChecked() {
    this._authGuardService.getHeaderFlag().subscribe((flag) => {
      this.show = flag;
    });
  }
}
