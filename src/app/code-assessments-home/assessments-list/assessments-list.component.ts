import { Component, OnInit, viewChild } from '@angular/core';
import { AssessmentService } from '../../assessment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.css']
})
export class AssessmentsListComponent implements OnInit {
  assessments: any[] = [];

  constructor(private assessmentService: AssessmentService,private router:Router) {}

  ngOnInit(): void {
    this.assessmentService.getCodeAssessments().subscribe(
      data => {
        this.assessments = data;
      },
      error => {
        console.error('Error fetching assessments:', error);
      }
    );
  }
    viewDetails(assessment:string):void {
      this.router.navigate(['code-assessment-details', assessment]);
     
    }
  }

