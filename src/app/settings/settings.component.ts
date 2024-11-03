import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private dialog: MatDialog) {}

  openUpdateDialog(settingType: string): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '400px',
      data: { type: settingType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`${settingType} updated successfully`);
      }
    });
  }
}
