import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-test-report-details',
  templateUrl: './test-report-details.component.html',
  styleUrls: ['./test-report-details.component.css']
})
export class TestReportDetailsComponent implements OnInit {
  assessmentCode: string = '';
  email: string = '';
  questionBankName: string = '';
  questions: any[] = [];
  answers: any[] = [];
  correctAnswers: any[] = [];
  optionLetters: string[][] = [];
  name: string="";
  constructor(
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private elementRef: ElementRef  // To access DOM elements
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.assessmentCode = params['assessmentCode'];
      this.email = params['email'];
      this.loadTestDetails();
    });
  }

  loadTestDetails() {
    this.assessmentService.getTestDetails(this.assessmentCode).subscribe((testDetails) => {
      this.questionBankName = testDetails.questionbankname;

      this.assessmentService.getStatus(this.assessmentCode, this.email).subscribe((status) => {
        this.questions = status.questionnos;
        this.answers = status.answers;
        this.name = status.name;

        const questionNos = this.questions.map((q: any) => q.questionno);
        this.assessmentService.fetchCorrectAnswers(this.questionBankName, questionNos).subscribe(
          (correctAnswers) => {
            this.correctAnswers = correctAnswers;
            this.optionLetters = this.questions.map(q =>
              q.options.map((_, index) => String.fromCharCode(65 + index))
            );
          }
        );
      });
    });
  }

  // Capture container's HTML and CSS and send to server for PDF generation
  downloadPDF() {
    const containerHtml = this.elementRef.nativeElement.querySelector('.container').innerHTML;
 

    const data = {
      html: containerHtml
    };

    this.assessmentService.downloadPDF(data).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'test-report-details.pdf';
      link.click();
    }, error => {
      console.error('Error downloading PDF:', error);
    });
  }

}
