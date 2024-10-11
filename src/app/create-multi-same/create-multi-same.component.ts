import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentService } from '../assessment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-multi-same',
  templateUrl: './create-multi-same.component.html',
  styleUrls: ['./create-multi-same.component.css'],
})
export class CreateMultiSameComponent implements OnInit {
  assessmentForm: FormGroup;
  questionBanks: any[] = [];
  selectedBanks: any[] = []; // Keep track of selected banks
  numberOfQuestionsMap: { [key: string]: number } = {}; // Map to store the number of questions per bank
  totalQuestions: number = 0;
  submitMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Initialize the form
    this.assessmentForm = this.fb.group({
      assessmentName: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    // Fetch available question banks
    this.assessmentService.fetchQuestionBanks().subscribe(
      (response) => {
        this.questionBanks = response;
      },
      (error) => {
        console.error('Error fetching question banks:', error);
      }
    );
  }

  // Handle question bank selection
  onBankSelectionChange(event: any, bank: any): void {
    const isSelected = event.target.checked;
    if (isSelected) {
      // Add to selected banks and initialize with default number of questions
      this.selectedBanks.push(bank);
      this.numberOfQuestionsMap[bank.questionbankname] = bank.noq; // Set default to total available questions
    } else {
      // Remove from selected banks
      this.selectedBanks = this.selectedBanks.filter((b) => b.questionbankname !== bank.questionbankname);
      delete this.numberOfQuestionsMap[bank.questionbankname];
    }
    this.calculateTotalQuestions();
  }

  // Handle changes to the number of questions for a bank
  onQuestionsChange(bankName: string, event: any): void {
    const value = parseInt(event.target.value, 10);
    this.numberOfQuestionsMap[bankName] = value || 0; // Update the value or set to 0 if invalid
    this.calculateTotalQuestions();
  }

  // Calculate total number of questions
  calculateTotalQuestions(): void {
    this.totalQuestions = Object.values(this.numberOfQuestionsMap).reduce((sum, num) => sum + num, 0);
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return this.assessmentForm.valid && this.selectedBanks.length > 0 && this.totalQuestions > 0;
  }

  // Submit the form
  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = {
        assessmentName: this.assessmentForm.value.assessmentName,
        duration: this.assessmentForm.value.duration,
        questionbanknames: this.selectedBanks.map((b) => b.questionbankname),
        numberOfQuestions: Object.values(this.numberOfQuestionsMap),
      };

      // API call to create the assessment
      this.assessmentService.createMultiBankAssessment(formData).subscribe(
        (response: any) => {
          const assessmentLink = `http://tekendra.com/assessments/${response.assessmentcode}`;
          this.submitMessage = assessmentLink;
          this.snackBar.open(`Assessment created: ${assessmentLink}`, 'Close', { duration: 5000 });

          // Reset the form after submission
          this.assessmentForm.reset();
          this.selectedBanks = [];
          this.numberOfQuestionsMap = {};
          this.totalQuestions = 0;

          // Redirect to the dashboard after a delay
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        },
        (error) => {
          console.error('Error creating assessment:', error);
        }
      );
    }
  }
}
