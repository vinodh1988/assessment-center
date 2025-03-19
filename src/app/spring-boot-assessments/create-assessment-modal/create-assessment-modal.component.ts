import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../../assessment.service';
// Adjust path as needed

@Component({
  selector: 'app-create-assessment-modal',
  templateUrl: './create-assessment-modal.component.html',
})
export class CreateAssessmentModalComponent implements OnInit {
  assessmentForm: FormGroup;
  batches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateAssessmentModalComponent>
  ) {
    this.assessmentForm = this.fb.group({
      name: [''],
      batch: ['']
    });
  }

  ngOnInit(): void {
    this.fetchBatches();
  }

  fetchBatches(): void {
    this.assessmentService.fetchAllBatches().subscribe({
      next: (response) => {
        this.batches = response; // Assuming response is an array of objects with 'batchname'
      },
      error: () => {
        this.snackBar.open('Failed to load batches!', 'Close', { duration: 3000 });
      }
    });
  }

  submit(): void {
    if (this.assessmentForm.valid) {
      const payload = {
        name: this.assessmentForm.get('name')?.value,
        batchname: this.assessmentForm.get('batch')?.value
      };

      this.assessmentService.createSpringBootAssessment(payload).subscribe({
        next: () => {
          this.snackBar.open('Assessment created successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(); // Close modal on success
        },
        error: () => {
          this.snackBar.open('Failed to create assessment.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
