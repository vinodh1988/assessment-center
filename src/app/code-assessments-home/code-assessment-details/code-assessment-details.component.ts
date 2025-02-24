import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../../assessment.service';


@Component({
  selector: 'app-code-assessment-details',
  templateUrl: './code-assessment-details.component.html',
  styleUrls: ['./code-assessment-details.component.css']
})
export class CodeAssessmentDetailsComponent implements OnInit {
  assessmentDetails: any;
  completedAssessments: any[] = [];
  showCode: boolean = false;

  constructor(private route: ActivatedRoute, private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    console.log('CodeAssessmentDetailsComponent');
    const assessmentCode = this.route.snapshot.paramMap.get('assessmentcode');
    if (assessmentCode) {
      this.assessmentService.getCompletedAssessmentDetails(assessmentCode).subscribe(
     
        data => {
          console.log(assessmentCode);
          console.log(data);
          if (data.length > 0) {
            // Set the first record as the assessment details
           ;
            // Set the remaining records as completed assessments
            this.completedAssessments = data;
          }
        },
        error => {
          console.error('Error fetching assessment details:', error);
        }
      );
    }

      this.assessmentService.getCodeAssessmentDetails(assessmentCode).subscribe(
      details => {
        this.assessmentDetails = details;
      },
      error => {
        console.error('Error fetching code assessment details:', error);
      }
      );

  }

  toggleCode(index: number): void {
    this.completedAssessments[index].showCode = !this.completedAssessments[index].showCode;
  }
}
