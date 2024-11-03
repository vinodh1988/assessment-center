import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent {
  question: any;
  correctAnswers: string[] = []; // Array to track correct answers (A, B, C, etc.)

  constructor(
    public dialogRef: MatDialogRef<EditQuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.question = { ...data.question, options: [...data.question.options] };

    // Initialize the correctAnswers array based on existing correct answers (A, B, C)
    this.correctAnswers = [...this.question.answer.map((ans: string) => ans.toUpperCase())];

    // Ensure the options array is initialized properly
    if (!this.question.options) {
      this.question.options = [''];
    }
  }

  // Method to add a new option to the question
  addOption() {
    this.question.options.push(''); // Add an empty option
  }

  // Method to delete an option from the question
  deleteOption(index: number) {
    const optionLabel = this.getOptionLabel(index);
    this.question.options.splice(index, 1); // Remove the option at the given index

    // Update the correctAnswers array
    const answerIndex = this.correctAnswers.indexOf(optionLabel);
    if (answerIndex !== -1) {
      this.correctAnswers.splice(answerIndex, 1); // Remove the corresponding answer if it's selected
    }
  }

  // Method to toggle the correct answer for an option (save as A, B, C, etc.)
  toggleCorrectAnswer(index: number, isChecked: boolean) {
    const optionLabel = this.getOptionLabel(index); // Get the alphabet for the option

    if (isChecked) {
      if (!this.correctAnswers.includes(optionLabel)) {
        this.correctAnswers.push(optionLabel); // Add the alphabet to the array
      }
    } else {
      const answerIndex = this.correctAnswers.indexOf(optionLabel);
      if (answerIndex !== -1) {
        this.correctAnswers.splice(answerIndex, 1); // Remove the alphabet from the array
      }
    }

    // Update the question.answer array based on selected correct answers
    this.question.answer = [...this.correctAnswers]; // Set the answer array
  }

  // Method to generate the option label (A, B, C, D, etc.)
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // Convert index to a letter (A = 65 in ASCII)
  }

  // Method to save the changes and close the modal
  save() {
     this.dialogRef.close(this.question); // Return the edited question data
  }

  // Method to close the modal without saving
  close() {
    this.dialogRef.close(); // Close the modal without returning any data
  }

  // Track by function to prevent unnecessary re-rendering of options list
  trackByIndex(index: number, item: any) {
    return index;
  }
}
