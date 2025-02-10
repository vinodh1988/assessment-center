import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssessmentService } from '../../assessment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-batch-category',
  templateUrl: './create-batch-category.component.html',
  styleUrl: './create-batch-category.component.css'
})
export class CreateBatchCategoryComponent {
  batchcategory: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateBatchCategoryComponent>,
    private assessmentService: AssessmentService
  ) {}

  createBatchCategory(form: NgForm): void {
    const batchData = { batchcategory: this.batchcategory };
    this.assessmentService.createBatchCategory(batchData).subscribe(() => {
      this.dialogRef.close(true);  // Close the dialog and indicate success
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Close the dialog without doing anything
  }
}
