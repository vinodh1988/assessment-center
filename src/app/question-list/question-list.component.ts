import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditQuestionModalComponent } from '../edit-question-modal/edit-question-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  questions: any[] = [];
  questionBankName: string = ''; // Property for question bank name

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,       
    private http: HttpClient,        
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    // Retrieve data passed via route
    const state = this.router.getCurrentNavigation()?.extras.state as { questions: any[] };
    this.questions = state?.questions || [];

    // Replace '|||' with <br> for line breaks in the questions
   /* this.questions = this.questions.map(q => {
      return { ...q, question: q.question.replaceAll("\n", "<br>") };
    });*/
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

  // Method to open the Edit Modal
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

  /**
   * Open the confirmation dialog and get the questionBankName.
   */
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { questions: this.questions } // Pass the questions to the confirmation dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.questionBankName) {
        this.questionBankName = result.questionBankName; // Get questionBankName from dialog
        this.uploadQuestions(); // Call the upload function
      }
    });
  }

  /**
   * Upload the questions to the backend API.
   */
  uploadQuestions() {
    const payload = { 
      questionBankName: this.questionBankName, // Include questionBankName in the payload
      questions: this.questions 
    };

    console.log(payload)

    this.http.post('http://localhost:5000/questionsupload', payload).subscribe(
      (response) => {
        this.snackBar.open('Questions uploaded successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        this.snackBar.open('Error uploading questions. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        console.error('Error uploading questions:', error);
      }
    );
  }
}
