import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssessmentService } from '../../assessment.service';


@Component({
  selector: 'app-create-code-assessment',
  templateUrl: './create-code-assessment.component.html',
  styleUrls: ['./create-code-assessment.component.css']
})
export class CreateCodeAssessmentComponent implements OnInit {
  batches: any[] = [];
  selectedBatch: string;
  duration: number;

  constructor(
    private assessmentService: AssessmentService,
    public dialogRef: MatDialogRef<CreateCodeAssessmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches(): void {
    this.assessmentService.fetchAllBatches().subscribe(
      (batches) => {
        this.batches = batches;
      },
      (error) => {
        console.error('Error fetching batches', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ batchname: this.selectedBatch, duration: this.duration });
  }
}
