import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssessmentService } from '../assessment.service';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
  inputValue: string = '';  // The value to update
  label: string = '';       // Label based on type

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    public assessmentService: AssessmentService
  ) {
    // Set label and placeholder text based on the setting type
    if (data.type === 'openai') {
      this.label = 'OpenAI API Key';
    } else if (data.type === 'app') {
      this.label = 'Application API Key';
    } else if (data.type === 'password') {
      this.label = 'New Password';
    }
  }

  updateSetting(): void {
    if (this.data.type === 'openai') {
      this.assessmentService.updateOpenAIKey(this.inputValue).subscribe({
        next: () => {
          console.log('OpenAI API Key updated successfully');
          this.dialogRef.close(true);
        },
        error: error => console.error('Error updating OpenAI API Key', error)
      });
    } else if (this.data.type === 'app') {
      this.assessmentService.updateAppApiKey(this.inputValue).subscribe({
        next: () => {
          console.log('Application API Key updated successfully');
          this.dialogRef.close(true);
        },
        error: error => console.error('Error updating Application API Key', error)
      });
    } else if (this.data.type === 'password') {
      this.assessmentService.updatePassword('yourUsername', this.inputValue).subscribe({
        next: () => {
          console.log('Password updated successfully');
          this.dialogRef.close(true);
        },
        error: error => console.error('Error updating Password', error)
      });
    }
  }
}
