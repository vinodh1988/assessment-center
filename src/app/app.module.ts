import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestResultsComponent } from './test-results/test-results.component';
import { TestReportComponent } from './test-report/test-report.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import this module
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentSuccessComponent } from './components/assessment-success/assessment-success.component';
import { LockedTestsComponent } from './locked-tests/locked-tests.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    QuestionListComponent,
    ConfirmDialogComponent,
    AssessmentFormComponent,
    TestResultsComponent,
    TestReportComponent,
    AssessmentSuccessComponent,
    LockedTestsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
