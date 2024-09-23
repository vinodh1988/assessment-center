import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  questions: any[] = [];

  constructor(
    private route: Router,           // Router for navigation
    private dialog: MatDialog,       // MatDialog for confirmation dialog
    private http: HttpClient,        // HttpClient for API requests
    private snackBar: MatSnackBar    // MatSnackBar for user notifications
  ) {
    // Get the data passed from the upload component via route state
    const state = this.route.getCurrentNavigation()?.extras.state as { questions: any[] };
    this.questions = state?.questions || [];
  }

  // Method to open the confirmation dialog
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { questions: this.questions } // Passing questions to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contains the questionBankName from the dialog form
        this.uploadQuestions(result);
      }
    });
  }

  // Method to upload the questions and questionBankName to the backend API
  uploadQuestions(questionBankName: string) {
    const payload = {
      questionBankName: questionBankName,  // The name entered in the modal form
      questions: this.questions            // The array of questions from the previous component
    };


    console.log(payload)
    // Perform the HTTP POST request to the backend API
    this.http.post('http://15.207.18.117:5000/questionsupload', payload).subscribe(
      (response) => {
        // Show success snackbar notification
        this.snackBar.open('Questions uploaded successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        // Show error snackbar notification
        this.snackBar.open('Error uploading questions. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        console.error('Error uploading questions:', error);
      }
    );
  }
}
