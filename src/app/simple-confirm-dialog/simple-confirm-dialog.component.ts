import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-confirm-dialog',
  templateUrl: './simple-confirm-dialog.component.html',
  styleUrls: ['./simple-confirm-dialog.component.css']
})
export class SimpleConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Method to handle cancel action
  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog and return 'false' to the caller
  }

  // Method to handle confirm action
  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return 'true' to the caller
  }
}
