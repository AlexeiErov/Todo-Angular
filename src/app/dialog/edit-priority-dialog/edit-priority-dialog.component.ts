import {Component, Inject, OnInit} from '@angular/core';
import {OperType} from '../OperType';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {
  priorityTitle: string;
  dialogTitle: string;
  operType: OperType;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialogRef: MatDialogRef<string>
  ) {
  }

  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }

  onConfirm() {
    this.dialogRef.close(this.priorityTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirmation',
        message: `Do you want to delete: "${this.priorityTitle}"? (Tasks priority will be changed to 'No priority')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
