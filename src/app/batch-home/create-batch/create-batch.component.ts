import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AssessmentService } from '../../assessment.service';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  batchname: string = '';
  month: string = '';
  year: number = new Date().getFullYear();
  batchcategory: string = '';
  batchCategories: string[] = [];

  currentYear: number = new Date().getFullYear();
  previousYear: number = new Date().getFullYear() - 1;

  constructor(
    private assessmentService: AssessmentService,
    public dialogRef: MatDialogRef<CreateBatchComponent>
  ) {}

  ngOnInit(): void {
    this.loadBatchCategories();
  }

  loadBatchCategories(): void {
    this.assessmentService.fetchBatchCategories().subscribe(categories => {
      this.batchCategories = categories;
    });
  }

  createBatch(form: NgForm): void {
    const batchData = {
      batchname: this.batchname,
      month: this.month,
      year: this.year,
      batchcategory: this.batchcategory
    };

    this.assessmentService.createBatch(batchData).subscribe(() => {
      this.dialogRef.close(true);  // Close the dialog and indicate success
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Close the dialog without doing anything
  }
}
