import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategorySearchValues} from '../../data/dao/search/SearchObjects';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  // --------------- Inputs ---------------------------------

  @Input('selectedCategory')
  set setCategory(selectedCategory: Category) {
    this.selectedCategory = selectedCategory;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('categorySearchValues')
  set setCategorySearchValues(categorySearchValues: CategorySearchValues) {
    this.categorySearchValues = categorySearchValues;
  }

  @Input('unfinishedCountForCategoryAll')
  set unfinishedCount(unfinishedCountForCategoryAll: number) {
    this.unfinishedCountForCategoryAll = unfinishedCountForCategoryAll;
  }


  // --------------- Outputs ---------------------------------

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<CategorySearchValues>();


  categories: Category[];
  selectedCategory;
  categorySearchValues: CategorySearchValues;
  unfinishedCountForCategoryAll: number;

  indexMouseMove: number;
  showEditIconCategory: boolean;

  isMobile: boolean;
  isTablet: boolean;

  filterTitle: string;
  filterChanged: boolean;


  constructor(
    private dialog: MatDialog,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.isMobile = deviceDetectorService.isMobile();
    this.isTablet = deviceDetectorService.isMobile();
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(show: boolean, index: number): void {
    this.indexMouseMove = index;
    this.showEditIconCategory = show;
  }

  openEditDialog(category: Category): void {

    // const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
    //   width: '400px',
    //   data: [category.title, 'Edit category', OperType.EDIT]
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'delete') {
    //     this.deleteCategory.emit(category);
    //     return;
    //   }
    //
    //   if (result as string) {
    //     category.title = result as string;
    //
    //     this.updateCategory.emit(category);
    //     return;
    //   }
    // });

  }

  openAddDialog(): void {
    // const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
    //   data: ['', 'Add new category', OperType.ADD], width: '400px'
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.addCategory.emit(result as string);
    //   }
    // });
  }

  search() {
    this.filterChanged = false;

    if (!this.categorySearchValues) {
      return;
    }

    this.categorySearchValues.title = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValues);
  }

  showCategory(category: Category) {


  }

  clearAndSearch() {
    this.filterTitle = null;
    this.search();
  }

  checkFilterChanged() {
    this.filterChanged = false;

    if (this.filterTitle !== this.categorySearchValues.title) {
      this.filterChanged = true;
    }

    return this.filterChanged;

  }
}
