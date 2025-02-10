import { Component } from '@angular/core';
import { AssessmentService } from '../../assessment.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBatchCategoryComponent } from '../create-batch-category/create-batch-category.component';

@Component({
  selector: 'app-batch-category-home',
  templateUrl: './batch-category-home.component.html',
  styleUrl: './batch-category-home.component.css'
})
export class BatchCategoryHomeComponent {
  batchCategories: string[] = [];

  constructor(private as:AssessmentService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBatchCategories();
  }

  loadBatchCategories(): void {
    this.as.fetchBatchCategories()
      .subscribe(categories => {
        this.batchCategories = categories;
      });
  }

  addBatchCategory(): void {
    // Logic to add a new batch category can be added here
    const dialogRef = this.dialog.open(CreateBatchCategoryComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBatchCategories();  // Reload the categories after adding a new one
      }
    });
  }
}
