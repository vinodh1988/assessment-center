import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../assessment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {
  questionBanks: any[] = [];

  constructor(private assessmentService: AssessmentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchQuestionBanks();
  }

  fetchQuestionBanks() {
    this.assessmentService.fetchQuestionBanks().subscribe({
      next: (data: any[]) => {
        this.questionBanks = data;
      },
      error: (err) => {
        console.error('Error fetching question banks:', err);
      }
    });
  }

  // Navigate to the question list page for the selected question bank
  goToQuestionBankQuestions(questionBankName: string) {
    this.router.navigate(['/question-bank-questions'], { queryParams: { questionBankName } });
  }
}
