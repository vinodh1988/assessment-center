import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private baseUrl = 'http://13.90.102.109:5000'; // Update this URL according to your backend server configuration

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

  getLockedAssessments(assessmentCode: string): Observable<any> {
    const url = `${this.baseUrl}/lockedstatus?assessmentCode=${assessmentCode}`;
    return this.http.get(`${url}`);
  }

  unlockTest(assessmentCode: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/assessment/unlock`, { assessmentCode: assessmentCode, email: email });
  }

  // Fetch questions for a specific question bank
  fetchQuestions(questionBankName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questionslist`, { params: { questionBankName } });
  }

  updateOrAddQuestion(questionBankName: string, question: any): Observable<any> {
    const payload = { questionBankName, question };
    return this.http.put(`${this.baseUrl}/question`, payload);
  }

  getStatus(assessmentCode: string, email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/assessments/status?assessmentcode=${assessmentCode}&email=${email}`);
  }

  // Fetch test details by assessmentCode
  getTestDetails(assessmentCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/testdetails/${assessmentCode}`);
  }

  // Fetch correct answers by questionBankName and array of question numbers
  fetchCorrectAnswers(questionBankName: string, questionnos: number[]): Observable<any[]> {
    const payload = { questionBankName, questionnos };
    return this.http.post<any[]>(`${this.baseUrl}/questions`, payload);
  }

  createSingleBankAssessment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-assessment-single-bank`, data);
  }

  createMultiBankAssessment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-assessment-multi-bank`, data);
  }

  createMultiBankCombinedAssessment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-full-combined-assessment`, data);
  }

  // Method to fetch all subjects
  fetchAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/subjects`);
  }

  // Method to fetch topics for a specific subject
  fetchTopics(subject: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/topics`, { subject });
  }

  // Method to create a new subject matter
  createSubjectMatter(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-subject-matter`, data);
  }

  fetchQuestionsByTopic(topic: string): Observable<any[]> {
    const url = `${this.baseUrl}/codequestion`;
    const payload = { topic };
    return this.http.post<any[]>(url, payload);
  }

  // Method to post a code question
  postCodeQuestion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/codequestions`, data);
  }

  // Method to fetch all batch categories
  fetchBatchCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/batchcategories`);
  }

  // Method to fetch all batches
  fetchAllBatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/batches`);
  }

  // Method to post batch details
  postBatchDetails(batchDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/batches`, batchDetails);
  }

  // Method to create a new batch category
  createBatchCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/batchcategories`, data);
  }

  createBatch(batchData: { batchname: string, month: string, year: number, batchcategory: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/batches`, batchData);
  }
  
  // Method to create a code assessment
  createCodeAssessment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/code-assessments`, data);
  }



createSpringBootAssessment(payload: { name: string; batchname: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/spring-assessments`, payload);
}

getSpringBootAssessments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/spring-assessments`);
}
  getCodeAssessments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/code-assessments`);
  }
  // Method to fetch assessment details by assessment code
  getCompletedAssessmentDetails(assessmentcode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/completed-assessments`, {
      params: { assessmentcode }
    });
  }
  // Method to fetch code assessment details by assessment code
  getCodeAssessmentDetails(assessmentCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/code-assessments/${assessmentCode}`);
  }
 
  getCompletedSpringBootAssessment(assessmentcode: string): Observable<any> {
    const url = `${this.baseUrl}/spring-assessments/completed`;
    return this.http.get<any>(url, {
      params: { assessmentcode }
    });
  }

  updateSpringBootAssessment(assessmentCode: string, updateData: any): Observable<any> {
    const url = `${this.baseUrl}/spring-assessments/update`;
    return this.http.put(url, { assessmentCode, ...updateData });
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

  // Method to upload code questions for Spring Boot
  uploadSpringBootCodeQuestions(data: FormData): Observable<any> {
    const url = `${this.baseUrl}/spring-boot-code-questions`;
  
    return this.http.post(url, data);
  }
  // Method to get the count of code questions by topic and subject
  getCodeQuestionsSubjectsTopics(): Observable<any> {
    const url = `${this.baseUrl}/codequestions/subjects-topics`;
    return this.http.get<string>(url);
  }

  getCodeQuestions(subject:string,topic:string): Observable<any> {
    const url = `${this.baseUrl}/codequestions?subject=${subject}&topic=${topic}`;
    return this.http.get<string>(url);
  }
  downloadPDF(data: { html: string }): Observable<Blob> {
    const url = `${this.baseUrl}/generate-pdf`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, {
      headers: headers,
      responseType: 'blob' // Expect binary file (PDF)
    });
  }

  downloadBatchPDF(data: { html: string }): Observable<Blob> {
    const url = `${this.baseUrl}/generate-batch-pdf`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, {
      headers: headers,
      responseType: 'blob' // Expect binary file (PDF)
    });
  }

  // New methods for updating OpenAI API key, Application API key, and Password
  updateOpenAIKey(newKey: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/update_openai_key`, { openai_api_key: newKey }, { headers });
  }

  updateAppApiKey(newKey: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/update_app_api_key`, { app_api_key: newKey }, { headers });
  }

  updatePassword(username: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/update_password`, { username, new_password: newPassword }, { headers });
  }

  // Helper method to get Authorization headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Adjust if using a different storage location
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
