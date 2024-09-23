// src/app/services/assessment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private baseUrl = 'http://15.207.18.117:5000'; // Update this URL according to your backend server configuration

  constructor(private http: HttpClient) {}

  // Method to upload questions
  uploadQuestions(file: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, file);
  }

  // Method to fetch available question banks
  fetchQuestionBanks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questionbanks`);
  }

  // Method to create a new assessment
  createAssessment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/assessments`, data);
  }

  // Method to fetch all assessments
  fetchAllAssessments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assessments`);
  }

  // Method to fetch test results for a specific assessment
  fetchTestResults(assessmentCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assessments/evaluate`, {
      params: { assessmentCode },
    });

 
  }

  
  downloadExcel(data: any): Observable<Blob> {
    const url = `${this.baseUrl}/downloadExcel`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.post(url, data, {
      headers: headers,
      responseType: 'blob' // The response type is set to 'blob' to handle binary data
    });
  }
}
