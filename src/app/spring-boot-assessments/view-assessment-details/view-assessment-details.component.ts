import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../assessment.service';


@Component({
  selector: 'app-view-assessment-details',
  templateUrl: './view-assessment-details.component.html',
  styleUrl: './view-assessment-details.component.css'
})
export class ViewAssessmentDetailsComponent {

  assessmentDetails: any;
  assessmentResults: any[] = [];
  showResults: boolean = false;
  selectedResult: any;

  constructor(private route: ActivatedRoute, private assessmentService: AssessmentService,private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.assessmentDetails = navigation.extras.state;
      this.assessmentDetails=this.assessmentDetails.assessment;
      console.log(this.assessmentDetails);
      this.getCompletedSpringBootAssessment(this.assessmentDetails.assessmentcode);
    }
  }

  getCompletedSpringBootAssessment(assessmentCode: string) {
    this.assessmentService.getCompletedSpringBootAssessment(assessmentCode).subscribe(data => {
      this.assessmentResults = data;
    });
  }

  toggleResults(result) {
    this.selectedResult = result;
    this.showResults = !this.showResults;
  }
}

