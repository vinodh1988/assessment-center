import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
 // Adjust path if needed
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../../assessment.service';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
})
export class AddQuestionModalComponent {
  addQuestionForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionModalComponent>,
    private assessmentService: AssessmentService,
    private snackBar: MatSnackBar
  ) {
    this.addQuestionForm = this.fb.group({
      name: [''],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submit(): void {
    if (this.addQuestionForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.addQuestionForm.get('name')?.value);
      formData.append('file', this.selectedFile);

      this.assessmentService.uploadSpringBootCodeQuestions(
        this.addQuestionForm.get('name')?.value,
        formData
      ).subscribe({
        next: () => {
          this.snackBar.open('Question uploaded successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close();
        },
        error: (error:any) => {
          console.log(error);
          
          this.snackBar.open('Failed to upload the question.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
