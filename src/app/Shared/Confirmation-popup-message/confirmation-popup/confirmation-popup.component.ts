import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent {
  @Input() title: string = 'confirmation';
  @Input() message: string = 'Are you sure you want to Delete?'
  //@Output() confirm = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>(); 

  onConfirm(choice: boolean) {
    this.confirm.emit(choice);
  }

  // Handle X button (close without confirming)
  handleClose() {
    this.onClose.emit();
  }
}
