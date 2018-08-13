import { Component } from '@angular/core';
import { style, query, group, animate, trigger, transition } from '@angular/animations';
import { ScriptService } from '../../node_modules/ngx-script-loader';

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
    trigger('routerAnimations', [
      transition('home => login', slideRight),
      transition('login => home', slideLeft),
      transition('home => ticket', slideRight),
      transition('ticket => home', slideLeft),
      transition('login => ticket', slideLeft),
      transition('ticket => login', slideRight),
    ])
  ]
})
export class AppComponent {
  title = 'Movie Point';
  userNameLogin: String;
  isLogin: Boolean;
  constructor(
    private scriptService: ScriptService
  ) {
    // this.scriptService.loadScript('https://sp.zalo.me/plugins/sdk.js').subscribe(() => {

    // }, (error) => {
    //   console.log('Failed to load script sdk js');
    // });
  }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}

