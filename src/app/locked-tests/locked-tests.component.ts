import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-locked-tests',
  templateUrl: './locked-tests.component.html',
  styleUrl: './locked-tests.component.css'
})
export class LockedTestsComponent {
  testResults: any[] = [];
  assessmentCode: string | null = '';
  math:Math=Math;
  constructor(private route: ActivatedRoute, private assessmentService: AssessmentService) 
  {

  }

  ngOnInit(): void {
    // Retrieve the assessmentCode from the route parameters
    this.assessmentCode = this.route.snapshot.paramMap.get('assessmentCode');

    if (this.assessmentCode) {
      // Fetch the test results using the assessmentCode
      this.assessmentService.getLockedAssessments(this.assessmentCode).subscribe({
      next:   (response) => {
          this.testResults = response;
        }
      ,
      error:  e => console.log(e)
     } );
    }
  }

  unlockTest(assessmentcode,email):void{
     this.assessmentService.unlockTest(assessmentcode,email).subscribe({
      next: ()=>{
         alert("Test unlocked");
         this.ngOnInit();
      },
      error: ()=> {

      }
     })
  }

}
