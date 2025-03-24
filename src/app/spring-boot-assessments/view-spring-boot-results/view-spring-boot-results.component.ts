import { Component } from '@angular/core';
import { AssessmentService } from '../../assessment.service';


@Component({
  selector: 'app-view-spring-boot-results',
  templateUrl: './view-spring-boot-results.component.html',
  styleUrl: './view-spring-boot-results.component.css'
})
export class ViewSpringBootResultsComponent {
  constructor(private assessmentService: AssessmentService) {}

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
    
  }
}
