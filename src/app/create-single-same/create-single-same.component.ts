import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssessmentService } from '../assessment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-single-same-component',
  templateUrl: './create-single-same.component.html',
  styleUrls: ['./create-single-same.component.css'],
})
export class CreateSingleSameComponent implements OnInit {
  assessmentForm: FormGroup;
  questionBanks: any[] = [];
  selectedBankNoq: number = 0;
  submitMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private snackBar: MatSnackBar,
    private router: Router
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
          this.questionBanks = response;
        } else {
          console.error('Unexpected format of question bank data', response);
        }
      },
      error => {
        console.error('Error fetching question banks:', error);
      }
    );

    // Watch for changes in the selected question bank
    this.assessmentForm.get('questionbanknames')?.valueChanges.subscribe((selectedBankName) => {
      const selectedBank = this.questionBanks.find(bank => bank.questionbankname === selectedBankName);
      this.selectedBankNoq = selectedBank ? selectedBank.noq : 0;
      this.assessmentForm.patchValue({ numberOfQuestions: this.selectedBankNoq });
    });
  }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      this.assessmentService.createSingleBankAssessment(this.assessmentForm.value).subscribe(
        (response: any) => {
          const assessmentLink = `http://tekendra.com/assessments/${response.assessmentcode}`;
          this.submitMessage = assessmentLink; // Store the link to display
          this.snackBar.open(`The assessment link is ${assessmentLink}`, 'Close', { duration: 5000 });
          
          // Redirect to dashboard after 5 seconds
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000);
        },
        error => {
          console.error('Error creating assessment:', error);
        }
      );
    }
  }
}
