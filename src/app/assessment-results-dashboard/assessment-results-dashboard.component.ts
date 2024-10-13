import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-assessment-results-dashboard',
  templateUrl: './assessment-results-dashboard.component.html',
  styleUrls: ['./assessment-results-dashboard.component.css']
})
export class AssessmentResultsDashboardComponent implements OnInit {
  activeAssessments: any[] = [];
  expiredAssessments: any[] = [];

  // Pagination variables
  activePage: number = 1;
  expiredPage: number = 1;
  assessmentsPerPage: number = 10; // Number of assessments per page
  activeTotalPages: number = 1;
  expiredTotalPages: number = 1;
  paginatedActiveAssessments: any[] = [];
  paginatedExpiredAssessments: any[] = [];

  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.fetchAssessments();
  }

  fetchAssessments(): void {
    this.assessmentService.fetchAllAssessments().subscribe((assessments: any[]) => {
      // Filter active and expired assessments
      this.activeAssessments = assessments.filter(assessment => assessment.status === 'active').reverse();
      this.expiredAssessments = assessments.filter(assessment => assessment.status === 'expired').reverse();

      // Calculate total pages
      this.activeTotalPages = Math.ceil(this.activeAssessments.length / this.assessmentsPerPage);
      this.expiredTotalPages = Math.ceil(this.expiredAssessments.length / this.assessmentsPerPage);

      // Paginate assessments
      this.paginateAssessments();
    });
  }

  paginateAssessments(): void {
    const startActive = (this.activePage - 1) * this.assessmentsPerPage;
    const endActive = startActive + this.assessmentsPerPage;
    this.paginatedActiveAssessments = this.activeAssessments.slice(startActive, endActive);

    const startExpired = (this.expiredPage - 1) * this.assessmentsPerPage;
    const endExpired = startExpired + this.assessmentsPerPage;
    this.paginatedExpiredAssessments = this.expiredAssessments.slice(startExpired, endExpired);
  }

  nextPage(type: 'active' | 'expired'): void {
    if (type === 'active' && this.activePage < this.activeTotalPages) {
      this.activePage++;
    } else if (type === 'expired' && this.expiredPage < this.expiredTotalPages) {
      this.expiredPage++;
    }
    this.paginateAssessments();
  }

  prevPage(type: 'active' | 'expired'): void {
    if (type === 'active' && this.activePage > 1) {
      this.activePage--;
    } else if (type === 'expired' && this.expiredPage > 1) {
      this.expiredPage--;
    }
    this.paginateAssessments();
  }
}
