import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserNormal } from '../../../../shared/models/user-normal.model';
import { PasswordValidation } from '../../../../shared/directives/macth-password.validate';
import { SimpleCrypt } from 'ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  listUser: UserNormal;
  selectedUSer: UserNormal;
  showDialog: Boolean = false;
  isShowDialogAddUser: Boolean = false;
  isSuccessfully: Boolean = true;
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
  newUser: any;

  regexPassword = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?]{6,}$';
  private registerInfo: UserNormal = new UserNormal();

  constructor(
    private _userService: UserService,

  ) {
  }

  ngOnInit() {
    this.getUser();
    this.CreateValidatorRegisterForm();
    this.CreateRegisterForm();
  }
  getUser() {
    this._userService.getUserGP07()
      .subscribe((result) => { this.listUser = result })
  }
  onSelectUser(user: UserNormal): void {
    this.selectedUSer = user;
    this.showDialog = true;
    console.log(this.selectedUSer);
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
}
