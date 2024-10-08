import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionModalComponent } from '../edit-question-modal/edit-question-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // For notifications

@Component({
  selector: 'app-question-bank-questions',
  templateUrl: './question-bank-questions.component.html',
  styleUrls: ['./question-bank-questions.component.css']
})
export class QuestionBankQuestionsComponent implements OnInit {
  questions: any[] = [];
  questionBankName: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  paginatedQuestions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // For notifications
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.questionBankName = params['questionBankName'];
      this.fetchQuestions();
    });
  }

  // Fetch questions for the selected question bank
  fetchQuestions() {
    this.assessmentService.fetchQuestions(this.questionBankName).subscribe({
      next: (data: any[]) => {
        this.questions = data.map(q => ({
          ...q,
          question: this.escapeHTMLTags(q.question), // Sanitize and format question text
          options: q.options.map(opt => this.escapeHTMLTags(opt)) // Sanitize and format options
        }));
        this.paginateQuestions();
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }

  // Pagination logic
  paginateQuestions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedQuestions = this.questions.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateQuestions();
  }

  // Edit existing question
  editQuestion(question: any) {
    const dialogRef = this.dialog.open(EditQuestionModalComponent, {
      width: '600px',
      data: { question }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the API to update the question
        this.assessmentService.updateOrAddQuestion(this.questionBankName, result).subscribe({
          next: () => {
            this.snackBar.open('Question updated successfully!', 'Close', { duration: 3000 });
            this.fetchQuestions(); // Refresh the questions
          },
          error: (err) => {
            this.snackBar.open('Error updating question', 'Close', { duration: 3000 });
            console.error('Error:', err);
          }
        });
      }
    });
  }

  // Add a new question
  addQuestion() {
    const newQuestion = { questionno: this.questions.length + 1, question: '', options: [], answer: [] };

    const dialogRef = this.dialog.open(EditQuestionModalComponent, {
      width: '600px',
      data: { question: newQuestion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the API to add the new question
        this.assessmentService.updateOrAddQuestion(this.questionBankName, result).subscribe({
          next: () => {
            this.snackBar.open('Question added successfully!', 'Close', { duration: 3000 });
            this.fetchQuestions(); // Refresh the questions
          },
          error: (err) => {
            this.snackBar.open('Error adding question', 'Close', { duration: 3000 });
            console.error('Error:', err);
          }
        });
      }
    });
  }

  /**
   * Escape all HTML tags except <br> and replace \n with <br>
   */
  escapeHTMLTags(content: string) {
    const sanitizedContent = content
      .replace(/<\/?(?!br)([^>]+)>/gi, match => match.replace(/</g, '&lt;').replace(/>/g, '&gt;')) // Escape HTML tags except <br>
      .replace(/\n/g, '<br>'); // Replace \n with <br> for new lines
    return sanitizedContent;
  }
}
