import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateBatchComponent } from './create-batch/create-batch.component';

@Component({
  selector: 'app-batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.css']
})
export class BatchHomeComponent {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openCreateBatchModal(): void {
    const dialogRef = this.dialog.open(CreateBatchComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Batch created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  openBatchReports(): void {
    // Logic to open batch reports can be added here
    console.log('Batch Reports clicked');
  }

  openBatchCategory(): void {
    // Logic to open batch category can be added here
    console.log('Batch Category clicked');
  }
}
