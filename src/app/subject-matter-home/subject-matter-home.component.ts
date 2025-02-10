import { Component } from '@angular/core';
import { AssessmentService } from '../assessment.service';
import { SubjectsFormComponent } from './subjects-form/subjects-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-subject-matter-home',
  templateUrl: './subject-matter-home.component.html',
  styleUrl: './subject-matter-home.component.css'
})
export class SubjectMatterHomeComponent {


  subjects: any[] = [];
  subjectstopics: any[] = [];
  constructor(private assessmentService: AssessmentService, private dialog: MatDialog,private router: Router) 
  {

  }
  ngOnInit() {
    this.assessmentService.getCodeQuestionsSubjectsTopics().subscribe
      
    (data => {
      this.subjectstopics = data;
      this.assessmentService.fetchAllSubjects().subscribe((data: any[]) => {
        this.subjects = data;
       
      });
    });
  
  }

  addSubject() {
    const dialogRef = this.dialog.open(SubjectsFormComponent, {
      width: '600px',
      data: {},
    maxHeight: '80vh', // Ensures the dialog has a maximum height of 80% of the viewport height
    hasBackdrop: true, // Adds a backdrop to the dialog
    panelClass: 'scrollable-dialog' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.subjects.push(result);
      }
    });
  }
  navigateToCodeGenerate(subject: string, topic: string) {
    console.log(subject,topic)
    this.router.navigate(['/code-generate'], { state: { subject: subject, topic: topic } });
  }

  getcount(subject: string,topic: string): number {
    return this.subjectstopics.filter((item) => item.subject === subject && item.topic === topic).length;
  }
 
  navigateToCodeList(subject: string, topic: string): void {
    this.router.navigate(['/code-questions'], { state: { subject, topic } });
  }
}
