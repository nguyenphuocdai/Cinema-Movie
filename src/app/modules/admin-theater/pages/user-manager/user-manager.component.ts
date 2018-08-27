import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserNormal } from '../../../../shared/models/user-normal.model';
import { PasswordValidation } from '../../../../shared/directives/macth-password.validate';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';
import { CacheService } from '../../../../shared/services/cache.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  listUser: UserNormal;
  selectedUser: UserNormal;
  showDialog: Boolean = false;
  isShowDialogAddUser: Boolean = false;
  isSuccessfully: Boolean = false;
  isAddSuccessfully: Boolean = false;
  isEditSuccessfully: Boolean = false;
  registerError: Boolean = false;
  private registerForm: FormGroup;
  private account: FormControl;
  private password: FormControl;
  private passwordConFirm: FormControl;
  private username: FormControl;
  private email: FormControl;
  private typeUser: FormControl;
  private typeGroup: FormControl;
  private phoneNumber: FormControl;
  private agree: FormControl;
  private formIsSubmitting: boolean;
  private updateInfoUser: UserNormal = new UserNormal();
  private editForm: FormGroup;


  newUser: any;
  private msg: Boolean = false;

  regexPassword = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?]{6,}$';
  private registerInfo: UserNormal = new UserNormal();

  constructor(
    private _userService: UserService,
    private _cacheService: CacheService
  ) {
    this.selectedUser = this._cacheService.get('CurrentUserAdmin');
  }

  ngOnInit() {
    this.getUser();
    // initial form add
    this.CreateValidatorRegisterForm();
    this.CreateRegisterForm();
    // initial form edit
    this.CreateValidatorEditForm();
    this.CreateEditForm();
  }
  getUser() {
    this._userService.getUserGP07()
      .subscribe((result) => { this.listUser = result })
  }

  showDialogAdd() {
    this.isShowDialogAddUser = true;
  }

  private CreateRegisterForm() {
    this.registerForm = new FormGroup({
      account: this.account,
      password: this.password,
      passwordConFirm: this.passwordConFirm,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      typeUser: this.typeUser,
      typeGroup: this.typeGroup,
      agree: this.agree
    }, {
        validators: PasswordValidation.MatchPassword
      });
  }

  private CreateValidatorRegisterForm() {
    this.account = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_-]{8,15}$/)]);
    this.password = new FormControl('', [Validators.required, Validators.pattern(this.regexPassword)]);
    this.passwordConFirm = new FormControl('', [Validators.required]);
    this.typeUser = new FormControl('QuanTri', [Validators.required]);
    this.typeGroup = new FormControl('GP07', [Validators.required]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(/[^\s@]+@[^\s@]+\.[^\s@]+$/)]);
    this.phoneNumber = new FormControl('', [Validators.required, Validators.pattern(/^(01[2689]|09|08)[0-9]{8}$/)]);
    this.agree = new FormControl('', Validators.requiredTrue);
  }
  registerUser() {
    const simpleCrypt = new SimpleCrypt();

    this.formIsSubmitting = true;
    this.registerInfo.TaiKhoan = this.account.value;
    this.registerInfo.MatKhau = simpleCrypt.encode(LocalKey.keyCryto, this.password.value).replace(/[^a-zA-Z0-9]/g, '_');
    this.registerInfo.HoTen = this.username.value;
    this.registerInfo.Email = this.email.value;
    this.registerInfo.SoDT = this.phoneNumber.value;
    this.registerInfo.MaNhom = this.typeGroup.value;
    this.registerInfo.MaLoaiNguoiDung = this.typeUser.value;
    this.registerInfo.TenLoaiNguoiDung = this.typeUser.value === "KhachHang" ? 'Khách hàng' : 'Quản trị';
    this.registerInfo.SSID = simpleCrypt.encode(LocalKey.keyCryto, this.password.value);
    this.registerInfo.SecretKey = this._userService.makeid();
    console.log(this.registerInfo);
    this._userService.registerUser(this.registerInfo)
      .subscribe(
        (result) => {
          setTimeout(() => {
            this.newUser = result;
            console.log(this.newUser);
            this.isShowDialogAddUser = false;
            this.isSuccessfully = true;
            this.isAddSuccessfully = true;
            this.formIsSubmitting = false;
            this.resetForm(this.registerForm);
          }, 3000)
        }, (error) => {
          this.formIsSubmitting = false;
          this.registerError = true;
          console.log(error);
        }
      );
  }
  resetForm(form: FormGroup) {
    return form.reset();
  }

  deleteUser(account: string) {
    this._userService.deleteUser(account)
      .subscribe(
        (result) => {
          console.log(result);
          this.getUser();
        }
        , (error) => { console.log(error) }
      )
  }

  private sendDelete($event: any, account: string): void {
    this.msg = true;
    this.deleteUser(account);
    setTimeout(() => {
      this.msg = false;
    }, 5000)
  }
  private sendCancel($event: any): void {
    // this.msg = 'Backoff!'
  }

  onSelectUser(user: UserNormal): void {
    this.selectedUser = user;
    this.showDialog = true;
    this.CreateValidatorEditForm();
    this.CreateEditForm();
    console.log(this.selectedUser);
    console.log(this.editForm.value);
  }


  private CreateEditForm() {
    this.editForm = new FormGroup({
      account: this.account,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      typeUser: this.typeUser,
      typeGroup: this.typeGroup,
      agree: this.agree
    });
  }

  private CreateValidatorEditForm() {
    this.account = new FormControl({ value: this.selectedUser.TaiKhoan.trim(), disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9_-]{8,15}$/)]);
    this.typeUser = new FormControl(this.selectedUser.MaLoaiNguoiDung, [Validators.required]);
    this.typeGroup = new FormControl(this.selectedUser.MaNhom, [Validators.required]);
    this.username = new FormControl(this.selectedUser.HoTen, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]);
    this.email = new FormControl(this.selectedUser.Email, [Validators.required, Validators.pattern(/[^\s@]+@[^\s@]+\.[^\s@]+$/)]);
    this.phoneNumber = new FormControl(this.selectedUser.SoDT, [Validators.required, Validators.pattern(/^(01[2689]|09|08)[0-9]{8}$/)]);
    this.agree = new FormControl('', Validators.requiredTrue);
  }
  updateUser() {
    this.formIsSubmitting = true;
    const simpleCrypt = new SimpleCrypt();

    this.updateInfoUser.TaiKhoan = this.account.value;
    this.updateInfoUser.MatKhau = this.selectedUser.MatKhau;
    this.updateInfoUser.SoDT = this.phoneNumber.value;
    this.updateInfoUser.MaNhom = this.typeGroup.value;
    this.updateInfoUser.Email = this.email.value;
    this.updateInfoUser.MaLoaiNguoiDung = this.typeUser.value;
    this.updateInfoUser.TenLoaiNguoiDung = this.typeUser.value === "KhachHang" ? 'Khách hàng' : 'Quản trị'
    this.updateInfoUser.HoTen = this.username.value;
    this.updateInfoUser.SSID = simpleCrypt.encode(LocalKey.keyCryto, this.password.value);
    this.updateInfoUser.SecretKey = this._userService.makeid();

    this._userService.updateUser(this.updateInfoUser)
      .subscribe(
        (result) => {
          setTimeout(() => {
            this.showDialog = false;
            this.isSuccessfully = true;
            this.isEditSuccessfully = true;
          }, 3000);
          this.newUser = this.updateInfoUser;
          console.log(result);
        },
        (err) => {
          this.formIsSubmitting = false;
          this.registerError = false;
        }
      );
  }
}
