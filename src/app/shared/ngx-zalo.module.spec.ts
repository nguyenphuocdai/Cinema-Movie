import { NgxZaloModule } from './ngx-zalo.module';

describe('NgxZaloModule', () => {
  let ngxZaloModule: NgxZaloModule;

  beforeEach(() => {
    ngxZaloModule = new NgxZaloModule();
  });

  it('should create an instance', () => {
    expect(ngxZaloModule).toBeTruthy();
  });
});
