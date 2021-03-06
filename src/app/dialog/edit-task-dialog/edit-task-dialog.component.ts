import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {Priority} from '../../model/Priority';
import {Category} from '../../model/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

export class EditTaskDialogComponent implements OnInit {

  categories: Category[];
  priorities: Priority[];

  dialogTitle: string;
  task: Task;
  operType: OperType;

  tmpTitle: string;
  tmpPriority: Priority;
  tmpCategory: Category;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;
    this.tmpPriority = this.task.priority;
    this.tmpCategory = this.task.category;
    this.tmpDate = this.task.date;

    // this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    // this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

  }

  onConfirm(): void {

    this.task.title = this.tmpTitle;
    this.task.priority = this.tmpPriority;
    this.task.category = this.tmpCategory;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);

  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirmation',
        message: `Do you want to delete: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close('complete');

  }

  activate() {
    this.dialogRef.close('activate');
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  canActivateDeactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
