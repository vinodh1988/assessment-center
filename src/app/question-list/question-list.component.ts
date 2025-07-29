import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AssessmentService } from '../assessment.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SimpleConfirmDialogComponent } from '../simple-confirm-dialog/simple-confirm-dialog.component'; // Import the new component
import { EditQuestionModalComponent } from '../edit-question-modal/edit-question-modal.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  questions: any[] = [];
  questionBankName: string = ''; // For new flow: Selected question bank
  availableBanks: any[] = []; // List of available question banks
  uploadToExisting = false; // Toggle for existing question bank flow
  existingQuestionNo: number = 1; // Starting question number for existing question bank

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,       
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private assessmentService: AssessmentService
  ) {
    // Retrieve data passed via route
    const state = this.router.getCurrentNavigation()?.extras.state as { questions: any[], uploadToExisting?: boolean };
    this.questions = state?.questions || [];
    this.uploadToExisting = state?.uploadToExisting || false;

    // Fetch question banks if it's the existing bank flow
    if (this.uploadToExisting) {
      this.fetchQuestionBanks();
    }

    // Replace '|||' with <br> for line breaks in the questions
    this.questions = this.questions.map(q => {
      return { ...q, question: q.question.replaceAll("|||", "<br>") };
    });
  }

  /**
   * Escape all HTML tags except <br>
   */
  escapeHTMLTags(content: string): SafeHtml {
    const sanitizedContent = content
      .replace(/<\/?(?!br)([^>]+)>/gi, match => match.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
      .replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

  // Fetch available question banks
  fetchQuestionBanks() {
    this.assessmentService.fetchQuestionBanks().subscribe({
      next: (banks: any[]) => {
        this.availableBanks = banks;
      },
      error: (error) => {
        console.error('Error fetching question banks:', error);
      },
      complete: () => {
        console.log('Fetch question banks complete.');
      }
    });
  }

  /**
   * Open the confirmation dialog for existing question banks.
   */
  openConfirmDialog() {
    const selectedBank = this.availableBanks.find(bank => bank.questionbankname === this.questionBankName);

    if (selectedBank) {
      // If the bank exists, set the starting question number
      this.existingQuestionNo = selectedBank.noq + 1;

      // Open the new confirmation dialog for existing question bank
      const dialogRef = this.dialog.open(SimpleConfirmDialogComponent, {
        width: '350px',
        data: {
          message: `Do you want to upload the questions to ${this.questionBankName}?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.uploadQuestionsWithExistingBank();
        }
      });

    } else {
      // Show the existing confirm dialog for new question banks
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { questions: this.questions, questionBankName: this.questionBankName }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.questionBankName) {
          this.questionBankName = result.questionBankName; // Get questionBankName from dialog
          this.uploadQuestions(); // Call the upload function
        }
      });
    }
  }

  /**
   * Upload questions with numbering for existing question banks.
   */
  uploadQuestionsWithExistingBank() {
    // Auto-number the questions based on existingQuestionNo
    this.questions = this.questions.map((q, index) => ({
      ...q,
      questionno: this.existingQuestionNo + index // Adjust question number
    }));

    const payload = { 
      questionBankName: this.questionBankName, // Existing question bank name
      questions: this.questions 
    };

    this.http.post('http://3.6.160.18:5000/questionsupload', payload).subscribe({
      next: (response) => {
        this.snackBar.open('Questions uploaded successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (error) => {
        this.snackBar.open('Error uploading questions. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        console.error('Error uploading questions:', error);
      },
      complete: () => {
        console.log('Questions upload complete.');
      }
    });
  }

  /**
   * Upload questions for new question banks.
   */
  uploadQuestions() {
    const payload = { 
      questionBankName: this.questionBankName, // New question bank name from dialog
      questions: this.questions 
    };

    this.http.post('http://3.6.160.18:5000/questionsupload', payload).subscribe({
      next: (response) => {
        this.snackBar.open('Questions uploaded successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (error) => {
        this.snackBar.open('Error uploading questions. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        console.error('Error uploading questions:', error);
      },
      complete: () => {
        console.log('Questions upload complete.');
      }
    });
  }

  // Open the Edit Question Modal
  editQuestion(index: number) {
    const dialogRef = this.dialog.open(EditQuestionModalComponent, {
      width: '600px',
      data: { question: this.questions[index] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questions[index] = result; // Update the question with the edited data
      }
    });
  }
}
