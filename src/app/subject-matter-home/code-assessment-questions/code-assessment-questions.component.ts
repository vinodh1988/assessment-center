import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../assessment.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCodeAssessmentComponent } from '../create-code-assessment/create-code-assessment.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-code-assessment-questions',
  templateUrl: './code-assessment-questions.component.html',
  styleUrls: ['./code-assessment-questions.component.css']
})
export class CodeAssessmentQuestionsComponent implements OnInit {
  subject: string;
  topic: string;
  codeQuestions: any[];

  constructor(private assessmentService: AssessmentService, private router: Router
    , private dialog: MatDialog, private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { subject: string; topic: string };
    this.subject = state.subject;
    this.topic = state.topic;
  }

  ngOnInit(): void {
    this.loadCodeQuestions();
  }

  loadCodeQuestions(): void {
    if (this.subject && this.topic) {
      this.assessmentService.getCodeQuestions(this.subject, this.topic).subscribe(
        (questions) => {
          console.log(questions)
          this.codeQuestions = questions;
        },
        (error) => {
          console.error('Error fetching code questions', error);
        }
      );
    }
  }

  openCreateAssessment(question: any): void {
    const dialogRef = this.dialog.open(CreateCodeAssessmentComponent, {
      width: '600px',
      data: { subject: this.subject, topic: this.topic, question }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const assessmentData = {
          subject: this.subject,
          topic: this.topic,
          question: question.question,
          outline: question.outline,
          batch: result.batchname,
          duration: result.duration,
          technology: question.technology,
          date: new Date().toDateString(),
          status:'active'
        };
        this.assessmentService.createCodeAssessment(assessmentData).subscribe(
          {
            next: (data) => {
                const snackBarRef = this.snackBar.open('Assessment created successfully', 'Close', {
                duration: 10000,
                });
              console.log('Assessment created successfully', data);
            },
            error: (error) => {
              const snackBarRef = this.snackBar.open('Assessment creation failed', 'Close', {
                duration: 10000,
                });
              console.error('Error creating assessment', error);
          }
        }
        )
        console.log('Batch Name:', result.batchname);
        console.log('Duration:', result.duration);
        // Handle the result as needed
      }
    });
  }
}
