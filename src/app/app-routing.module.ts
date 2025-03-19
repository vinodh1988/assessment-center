import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { TestReportComponent } from './test-report/test-report.component';
import { LockedTestsComponent } from './locked-tests/locked-tests.component';
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
import { AuthGuard } from './gaurds/auth.guard';
import { QuestionBankDashboardComponent } from './question-bank-dashboard/question-bank-dashboard.component';
import { AssessmentResultsDashboardComponent } from './assessment-results-dashboard/assessment-results-dashboard.component';
import { AssessmentHealthDashboardComponent } from './assessment-health-dashboard/assessment-health-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { CodeAssessmentsHomeComponent } from './code-assessments-home/code-assessments-home.component';
import { SubjectMatterHomeComponent } from './subject-matter-home/subject-matter-home.component';
import { CodeGenerateComponentComponent } from './code-generate-component/code-generate-component.component';
import { BatchHomeComponent } from './batch-home/batch-home.component';
import { BatchCategoryHomeComponent } from './batch-home/batch-category-home/batch-category-home.component';
import { CodeAssessmentQuestionsComponent } from './subject-matter-home/code-assessment-questions/code-assessment-questions.component';
import { AssessmentsListComponent } from './code-assessments-home/assessments-list/assessments-list.component';
import { CodeAssessmentDetailsComponent } from './code-assessments-home/code-assessment-details/code-assessment-details.component';
import { SpringBootAssessmentsComponent } from './spring-boot-assessments/spring-boot-assessments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // Add more routes here, all protected by the AuthGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'questions', component: QuestionListComponent,canActivate: [AuthGuard]},
  { path:'settings', component: SettingsComponent,canActivate: [AuthGuard]},
  { path: 'assessment-results-dashboard', component: AssessmentResultsDashboardComponent ,canActivate:[AuthGuard]},
  { path: 'assessment-health-dashboard/:assessmentCode', component: AssessmentHealthDashboardComponent,canActivate:[AuthGuard]},
  
  { path: 'assessment', component: AssessmentsDashboardComponent, canActivate: [AuthGuard] },
  { path: 'question-banks-home', component: QuestionBankDashboardComponent,  canActivate: [AuthGuard]  },
  { path: 'test-results', component: TestResultsComponent, canActivate: [AuthGuard] },
  { path: 'test-locks/:assessmentCode', component: LockedTestsComponent, canActivate: [AuthGuard]},
  { path: 'test-results/:assessmentCode', component: TestReportComponent, canActivate: [AuthGuard] },
  { path: 'question-banks', component: QuestionBankComponent , canActivate: [AuthGuard]},
  { path: 'question-bank-questions', component: QuestionBankQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'question-bank-upload',component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'test-report-details', component: TestReportDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-single-random', component: CreateSingleRandomComponent, canActivate: [AuthGuard]},
  { path: 'create-single-same', component: CreateSingleSameComponent , canActivate: [AuthGuard]},
  { path: 'create-multi-random', component: CreateMultiRandomComponent , canActivate: [AuthGuard]},
  { path: 'create-multi-same', component: CreateMultiSameComponent, canActivate: [AuthGuard] },
  { path: 'code-assessments-home', component: CodeAssessmentsHomeComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectMatterHomeComponent, canActivate: [AuthGuard] },
  { path: 'code-generate', component: CodeGenerateComponentComponent, canActivate: [AuthGuard] ,data: {  }},
  { path: 'batch-home',component: BatchHomeComponent, canActivate: [AuthGuard] },
  { path: 'batch-category', component: BatchCategoryHomeComponent , canActivate: [AuthGuard] },
  { path: 'code-questions', component: CodeAssessmentQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'code-assessments',component: AssessmentsListComponent, canActivate: [AuthGuard] },
  { path: 'code-assessment-details/:assessmentcode', component: CodeAssessmentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'sprint-boot-assessments',component: SpringBootAssessmentsComponent,canActivate:[AuthGuard]},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
