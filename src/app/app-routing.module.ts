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

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path:'questions', component: QuestionListComponent},
  { path: 'create-assessment', component: AssessmentFormComponent },
  { path: 'test-results', component: TestResultsComponent },
  { path: 'test-locks/:assessmentCode', component: LockedTestsComponent},
  { path: 'test-results/:assessmentCode', component: TestReportComponent },
  { path: 'question-banks', component: QuestionBankComponent },
  { path: 'question-bank-questions', component: QuestionBankQuestionsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
