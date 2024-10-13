import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestResultsComponent } from './test-results/test-results.component';
import { TestReportComponent } from './test-report/test-report.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import this module
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentSuccessComponent } from './components/assessment-success/assessment-success.component';
import { LockedTestsComponent } from './locked-tests/locked-tests.component';
import { EditQuestionModalComponent } from './edit-question-modal/edit-question-modal.component';
import { SimpleConfirmDialogComponent } from './simple-confirm-dialog/simple-confirm-dialog.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { QuestionBankQuestionsComponent } from './question-bank-questions/question-bank-questions.component';
import { TestReportDetailsComponent } from './test-report-details/test-report-details.component';
import { CreateSingleRandomComponent } from './create-single-random/create-single-random.component';
import { CreateSingleSameComponent } from './create-single-same/create-single-same.component';
import { CreateMultiRandomComponent } from './create-multi-random/create-multi-random.component';
import { CreateMultiSameComponent } from './create-multi-same/create-multi-same.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { QuestionBankDashboardComponent } from './question-bank-dashboard/question-bank-dashboard.component';
import { AssessmentResultsDashboardComponent } from './assessment-results-dashboard/assessment-results-dashboard.component';
import { AssessmentHealthDashboardComponent } from './assessment-health-dashboard/assessment-health-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { NotFoundComponent } from './not-found/not-found.component';

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
    EditQuestionModalComponent,
    SimpleConfirmDialogComponent,
    QuestionBankComponent,
    QuestionBankQuestionsComponent,
    TestReportDetailsComponent,
    CreateSingleRandomComponent,
    CreateSingleSameComponent,
    CreateMultiRandomComponent,
    CreateMultiSameComponent,
    AssessmentsDashboardComponent,
    HomeComponent,
    LoginComponent,
    QuestionBankDashboardComponent,
    AssessmentResultsDashboardComponent,
    AssessmentHealthDashboardComponent,
    NotFoundComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
