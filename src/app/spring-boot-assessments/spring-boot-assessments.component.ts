import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { CreateAssessmentModalComponent } from './create-assessment-modal/create-assessment-modal.component';

@Component({
  selector: 'app-spring-boot-assessments',
  templateUrl: './spring-boot-assessments.component.html',
  styleUrl: './spring-boot-assessments.component.css'
})
export class SpringBootAssessmentsComponent {
  constructor(private dialog: MatDialog) {}

  openAddQuestionModal(): void {
    this.dialog.open(AddQuestionModalComponent, {
      width: '500px',
     
    });
  }

  openCreateAssessmentModal(): void {
    this.dialog.open(CreateAssessmentModalComponent, {
      width: '500px'
    });
  }
}
