import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../assessment.service';


@Component({
  selector: 'app-question-bank-dashboard',
  templateUrl: './question-bank-dashboard.component.html',
  styleUrls: ['./question-bank-dashboard.component.css']
})
export class QuestionBankDashboardComponent implements OnInit {
  QuestionBanks: any[] = [];
  totalQuestionBanks: number = 0;
  totalQuestions: number = 0;

  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.fetchQuestionBanks();
  }

  // Fetch top 10 question banks and total stats
  fetchQuestionBanks() {
    this.assessmentService.fetchQuestionBanks().subscribe(
      (response: any) => {
        this.QuestionBanks = response; // Get top 10 question banks
        this.totalQuestionBanks = response.length;
        this.totalQuestions = response.reduce((sum: number, bank: any) => sum + bank.noq, 0);
      },
      (error) => {
        console.error('Error fetching question banks:', error);
      }
    );
  }
}
