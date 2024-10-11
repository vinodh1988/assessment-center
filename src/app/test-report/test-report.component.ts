import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css'],
})
export class TestReportComponent implements OnInit {
  testResults: any[] = [];
  assessmentCode: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    // Retrieve the assessmentCode from the route parameters
    this.assessmentCode = this.route.snapshot.paramMap.get('assessmentCode');

    if (this.assessmentCode) {
      // Fetch the test results using the assessmentCode
      this.assessmentService.fetchTestResults(this.assessmentCode).subscribe(
        (response) => {
          this.testResults = response;
        },
        (error) => {
          console.error('Error fetching test results:', error);
        }
      );
    }
  }

  // Navigate to the details page
  viewDetails(result: any) {
    this.router.navigate(['/test-report-details'], {
      queryParams: { email: result.email, assessmentCode: this.assessmentCode },
    });
  }

  // Download the test results as an Excel file
  downloadExcelFile() {
    this.assessmentService.downloadExcel(this.testResults).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'test-results.xlsx';
        link.click();
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
}
