import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-code-generate-component',
  templateUrl: './code-generate-component.component.html',
  styleUrl: './code-generate-component.component.css'
})
export class CodeGenerateComponentComponent {
  subject: string;
  topic: string;
  technology: string = 'Java';
  response: any;
  topics: string[] = ['Java', 'JavaScript'];
  description: string = '';
  isLoading: boolean = false;
  message=undefined;


  constructor(private assessmentService:AssessmentService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { 
     const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    console.log(navigation.extras);
    const state = navigation?.extras.state as { subject: string, topic: string };
    console.log(navigation.extras.state);
    this.subject = state.subject;
    this.topic = state.topic;
    console.log('Subject:', this.subject);
    console.log('Topic:', this.topic);
  }

  ngOnInit() {
   
  }

  onSubmit() {
    this.isLoading = true;
    this.assessmentService.fetchQuestionsByTopic(this.description).subscribe(
      (data) => {
        this.response = data;
        this.isLoading = false;
        console.log('API response:', data);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching code question:', error);
      }
    );
  }

  editQuestion() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: { field: this.response.question }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.response.question = result;
      }
    });
  }

  editTestCases() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: { field: this.response.testcases }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.response.testcases = result;
      }
    });
  }


  editOutline() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: { field: this.response.outline }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.response.outline = result;
      }
    });
  }
  editDescription() {}
  editSolution() {}
  addCodeQuestion() {
    this.isLoading = true;
    const data = {
      subject: this.subject,
      topic: this.topic,
      description: this.description,
      technology: this.technology,
      outline: this.response.outline.replace('```java','').replace('```', ''),
      question: this.response.question,
      testcases: this.response.testcases.replace('```java','').replace('```', '')
    };

    this.assessmentService.postCodeQuestion(data).subscribe(
      (result) => {
        this.isLoading = false;
        this.message="Posted Successfully";
        this.response = null; // Clear the response to show only the success message
      },
      (error) => {
        this.isLoading=false
        console.error('Error posting code question:', error);
        this.message="Error Posting";
      }
    );
  }
}
