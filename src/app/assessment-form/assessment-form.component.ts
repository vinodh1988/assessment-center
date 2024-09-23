import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../assessment.service';


@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css'],
})
export class AssessmentFormComponent implements OnInit {
  assessmentForm: FormGroup;
  questionBanks: any[] = [];
  selectedBankNoq: number = 0; // To store the number of questions for the selected question bank
  submitMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private snackBar: MatSnackBar
  ) {
    this.assessmentForm = this.fb.group({
      assessmentName: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      questionbankname: ['', Validators.required],
      numberOfQuestions: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    // Fetch question banks using the service
    this.assessmentService.fetchQuestionBanks().subscribe(
      response => {
        if (response && Array.isArray(response)) {
          this.questionBanks = response; // Assign the fetched question banks
          console.log(this.questionBanks)
        } else {
          console.error('Unexpected format of question bank data', response);
        }
      },
      error => {
        console.error('Error fetching question banks:', error);
      }
    );

    // Watch for changes in the selected question bank
    this.assessmentForm.get('questionbankname')?.valueChanges.subscribe((selectedBankName) => {
      const selectedBank = this.questionBanks.find(bank => bank.questionbankname === selectedBankName);
      console.log(selectedBank)
      this.selectedBankNoq = selectedBank ? selectedBank.noq : 0;
      
      // Update the numberOfQuestions control's value to match the selected question bank
      this.assessmentForm.patchValue({ numberOfQuestions: this.selectedBankNoq });
    });
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      this.assessmentService.createAssessment(this.assessmentForm.value).subscribe(
        (response: any) => {
          const assessmentLink = `http://tekendra.com/assessments/${response.assessmentcode}`;
          this.submitMessage = assessmentLink; // Store the link to display
          this.snackBar.open(`The assessment link is ${assessmentLink}`, 'Close', { duration: 5000 });
          this.assessmentForm.reset(); // Reset the form after submission
        },
        error => {
          console.error('Error creating assessment:', error);
        }
      );
    }
  }
}
