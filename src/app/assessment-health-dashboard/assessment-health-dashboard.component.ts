import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-assessment-health-dashboard',
  templateUrl: './assessment-health-dashboard.component.html',
  styleUrls: ['./assessment-health-dashboard.component.css'],
})
export class AssessmentHealthDashboardComponent implements OnInit {
  assessmentCode: string | null = '';
  assessmentDetails: any;
  testResults: any[] = [];
  passRate: number = 0;
  averageScore: number = 0;
  visibility: boolean =true;

  constructor(private route: ActivatedRoute, private assessmentService: AssessmentService,private router:Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.assessmentCode = this.route.snapshot.paramMap.get('assessmentCode');
    if (this.assessmentCode) {
      this.loadAssessmentDetails();
      this.loadTestResults();
    }
  }

  loadAssessmentDetails() {
    this.assessmentService.getTestDetails(this.assessmentCode!).subscribe(
      (response) => {
        this.assessmentDetails = response;
      },
      (error) => {
        console.error('Error fetching assessment details:', error);
      }
    );
  }

  loadTestResults() {
    this.assessmentService.fetchTestResults(this.assessmentCode).subscribe(
      { 
        next:
      (response) => {
        this.testResults = response;
      
        this.calculateStats();
        this.initializeCharts();
      },
      error:
      (error) => {

        if (error.status === 404) {
          // Handle 404 error
          console.log('Error 404: Resource not found');
          this.visibility = false;
        }
        
        console.error('Error fetching test results:', error);
      } }
    );
  }

  calculateStats() {
    
    const totalParticipants = this.testResults.length;
    const totalPass = this.testResults.filter(result => result.percentage >= 60).length;
    const totalScore = this.testResults.reduce((sum, result) => sum + result.percentage, 0);

    this.passRate = (totalPass / totalParticipants) * 100;
    this.averageScore = totalScore / totalParticipants;
  }

  initializeCharts() {
   
    // Initialize Pass/Fail chart
    new Chart('passFailChart', {
      type: 'doughnut',
      data: {
        labels: ['Pass', 'Fail'],
        datasets: [{
          data: [
            this.testResults.filter(result => result.percentage >= 60).length,
            this.testResults.filter(result => result.percentage < 60).length
          ],
          backgroundColor: ['#4CAF50', '#F44336'],
        }],
      },
    });

    // Initialize Score Distribution chart
    new Chart('scoreDistributionChart', {
      type: 'bar',
      data: {
        labels: this.testResults.map(result => result.name),
        datasets: [{
          label: 'Score (%)',
          data: this.testResults.map(result => result.percentage),
          backgroundColor: '#2196F3',
        }],
      },
    });

    // Initialize Time Spent chart (Dummy Data)
    new Chart('timeSpentChart', {
      type: 'pie',
      data: {
        labels: ['Below Average', 'Above Average', 'Good','Excellent'],
        datasets: [{
          data: [
            this.testResults.filter(result => result.percentage <= 60).length,
            this.testResults.filter(result => result.percentage < 75 ).length,
            this.testResults.filter(result => result.percentage <= 90).length,
            this.testResults.filter(result => result.percentage >=90).length

          ],
          backgroundColor: ['#4CAF50', '#F44336','#1f618d','#2ecc71'],
        }],
      },
    });
  }

  unlockParticipant(email: string) {
    this.assessmentService.unlockTest(this.assessmentCode!, email).subscribe(
      () => {
        alert(`Unlocked test for ${email}`);
      },
      (error) => {
        console.error('Error unlocking test:', error);
      }
    );
  }

  viewDetails(result: any) {
    this.router.navigate(['/test-report-details'], {
      queryParams: { email: result.email, assessmentCode: this.assessmentCode },
    });
  }
  downloadPDF() {
    // Clone the container element so you don't affect the actual DOM
    const containerClone = this.elementRef.nativeElement.querySelector('.assessment-health-dashboard').cloneNode(true) as HTMLElement;
  
    // Select canvas elements from the original container (where charts are rendered)
    const canvasElements = this.elementRef.nativeElement.querySelectorAll('canvas');
    const clonedCanvasElements = containerClone.querySelectorAll('canvas');
  
    canvasElements.forEach((canvas: HTMLCanvasElement, index: number) => {
      if (clonedCanvasElements[index]) {
        const imageData = canvas.toDataURL('image/png'); // Convert the canvas to a data URL (base64-encoded image)
        const img = document.createElement('img');
        img.src = imageData;
        img.style.width = canvas.style.width;
        img.style.height = canvas.style.height;
  
        // Replace canvas with the generated image in the cloned container
        clonedCanvasElements[index].replaceWith(img);
      } else {
        console.warn(`No matching cloned canvas element found for index ${index}`);
      }
    });
  
    // Find and remove all elements with the class 'skip-pdf' within the cloned container
    const elementsToSkip = containerClone.querySelectorAll('.skip-pdf');
    elementsToSkip.forEach((el: any) => el.remove());
  
    // Now get the innerHTML of the filtered container with charts as images
    const filteredHtml = containerClone.innerHTML;
  
    const data = {
      html: filteredHtml
    };
  
    this.assessmentService.downloadBatchPDF(data).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'batch-report.pdf';
        link.click();
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
  }
  
}
