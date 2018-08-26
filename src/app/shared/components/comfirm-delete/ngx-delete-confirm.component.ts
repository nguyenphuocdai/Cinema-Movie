import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'delete-confirm',
    template: `<div class="delete-confirm">
        <a href="javascript:void(0)" class="delete-confirm-btn" (click)="show = true">
            <div #ref><ng-content></ng-content></div>
            <i class="fa fa-trash" *ngIf="ref.childNodes.length == 0"></i>
        </a>
        <div class="delete-confirm-question" *ngIf="show === true">
            <p [innerHTML]="question"></p>
            <button class='btn-x-sm btn-left' (click)='sendConfirm()'><i class="fa fa-check"></i></button>
            <button class='btn-x-sm ' (click)='sendCancel()'><i class="fa fa-times"></i></button>
            
        </div>
    </div>`,
    styles: [`
        .delete-confirm {
            background-color: transparent;
        }

        .delete-confirm-btn {
        }

        .delete-confirm-question {
            color: white;
            background-color: #e03e3e;
            float: left;
            left: -10px;
            bottom: -10px;
            position: absolute;
            z-index: 1;
            padding: 5px 5px 5px 8px;
            border-radius: 7px;
        }
        .btn-left{
            margin-right: 15px;
        }
        .delete-confirm-question button {
            background-color: #fff;
        }

        .delete-confirm-question i {
            color: #ff747c;
        }

        .fa-times, fa-check {
            color: #ff747c;
        }`]
})
export class NgxDeleteConfirmComponent {
    @Input('question') question: string = 'Bạn có chắc là muốn xóa?';
    @Output('onConfirm') onConfirm: EventEmitter<any> = new EventEmitter();
    @Output('onCancel') onCancel: EventEmitter<any> = new EventEmitter();
    show: boolean = false;

    sendConfirm(): void {
        this.onConfirm.emit();
        this.show = false;
    }

    sendCancel(): void {
        this.onCancel.emit();
        this.show = false;
    }
}
