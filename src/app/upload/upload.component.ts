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

  constructor(private assessmentService: AssessmentService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.loading = true;
      this.error = false;

      this.assessmentService.uploadQuestions(formData).subscribe(
        (data: any) => {
          this.loading = false;
          this.router.navigate(['/questions'], { state: { questions: data } });
        },
        error => {
          this.loading = false;
          this.error = true;
          console.error('Error uploading file', error);
        }
      );
    }
  }
}
