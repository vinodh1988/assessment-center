import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  assessments: any[] = [];

  constructor(private assessmentService: AssessmentService, private router: Router) {}

  ngOnInit(): void {
    this.assessmentService.fetchAllAssessments().subscribe({
     next: response => {
        this.assessments = response;
      },
      error: error => {
        console.error('Error fetching assessments:', error);

      }
    }
    );
  }

  viewTestReport(assessmentCode: string): void {
    this.router.navigate([`/test-results/${assessmentCode}`]);
  }
}
