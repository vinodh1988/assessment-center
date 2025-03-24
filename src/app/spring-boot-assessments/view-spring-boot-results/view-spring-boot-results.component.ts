import { Component } from '@angular/core';
import { AssessmentService } from '../../assessment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-spring-boot-results',
  templateUrl: './view-spring-boot-results.component.html',
  styleUrl: './view-spring-boot-results.component.css'
})
export class ViewSpringBootResultsComponent {
  constructor(private assessmentService: AssessmentService,private router:Router) {}

  assessments: any[] = [];

  ngOnInit() {
    this.getSpringBootAssessments();
  }

  getSpringBootAssessments() {
    this.assessmentService.getSpringBootAssessments().subscribe((data: any[]) => {
      this.assessments = data;
    });
  }

  viewAssessment(assessment){
    this.router.navigate(['spring-boot-assessments/view-assessment-details'], { state: { assessment } });
  }
}
