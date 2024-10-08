import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  selectedFile: File | null = null;
  loading = false;
  error = false;
  uploadToExistingBank = false; // Toggle to switch between two flows

  constructor(private assessmentService: AssessmentService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Upload to new or existing bank based on toggle
  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.loading = true;
      this.error = false;

      this.assessmentService.uploadQuestions(formData).subscribe({
        next: (data: any) => {
          this.loading = false;

          if (this.uploadToExistingBank) {
            // New flow: Navigate to question list with option to upload to existing bank
            this.router.navigate(['/questions'], { state: { questions: data, uploadToExisting: true } });
          } else {
            // Existing flow: Navigate to question list for new question bank
            this.router.navigate(['/questions'], { state: { questions: data } });
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = true;
          console.error('Error uploading file', error);
        },
        complete: () => {
          console.log('File upload process complete.');
        }
      });
    }
  }

  // Toggle between two flows
  toggleUploadFlow() {
    this.uploadToExistingBank = !this.uploadToExistingBank;
  }
}
