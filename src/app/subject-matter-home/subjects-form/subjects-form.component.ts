import { Component } from '@angular/core';
import { AssessmentService } from '../../assessment.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subjects-form',
  templateUrl: './subjects-form.component.html',
  styleUrl: './subjects-form.component.css'
})
export class SubjectsFormComponent {
  
  subject: string = '';
  response: any;
  editableTopics: string[] = [];

  constructor(
    private topicService: AssessmentService,
    public dialogRef: MatDialogRef<SubjectsFormComponent>
  ) {}

  onSubmit() {
    this.topicService.fetchTopics(this.subject).subscribe(
      (data) => {
        this.response = data;
        console.log(this.response);
        this.editableTopics = this.response.topics;
        console.log(this.editableTopics)
      },
      (error) => {
        console.error('Error fetching topics:', error);
      }
    );
  }

  saveChanges() {
    const updatedResponse = {
      subject: this.response.subject,
      topics: this.editableTopics // Use the edited topics
    };
  this.topicService.createSubjectMatter(updatedResponse).subscribe(
    (result) => {
    console.log('Subject matter created successfully:', result);
    console.log('Updated Response:', updatedResponse);
    this.dialogRef.close(updatedResponse);
    },
    (error) => {
    console.error('Error creating subject matter:', error);
    }
  );
    // Just print the updatedResponse to the console
  
  }
}
