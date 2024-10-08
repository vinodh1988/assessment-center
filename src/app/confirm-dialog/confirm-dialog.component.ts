import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  questionBankName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog without submitting
  onCancel(): void {
    this.dialogRef.close();
  }

  // Submit the form
  onSubmit(): void {
    this.dialogRef.close({questionBankName:this.questionBankName}); // Pass back the questionBankName to the parent component
  }
}
