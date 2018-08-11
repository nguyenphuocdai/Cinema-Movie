import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(abstractControl: AbstractControl) {
        // tslint:disable-next-line:prefer-const
        let password = abstractControl.get('password').value;
        // tslint:disable-next-line:prefer-const
        let confirmPassword = abstractControl.get('passwordConFirm').value;
        if (password === null || confirmPassword === null) {
            return null;
        }
        if (password.length === 0 || confirmPassword.length === 0) {
            return null;
        }

        if (password !== confirmPassword) {
            abstractControl.get('passwordConFirm').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
