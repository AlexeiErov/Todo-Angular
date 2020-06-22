import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {IntroService} from './service/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategoryService} from './data/dao/impl/CategoryService';
import {CategorySearchValues} from './data/dao/search/SearchObjects';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'angular-todo';
  categories: Category[];

  unfinishedCountForCategoryAll: number;

  showStat = true;

  selectedCategory: Category = null;

  menuOpened: boolean;
  showBackdrop: boolean;
  menuMode: string;
  menuPosition: string;

  isMobile: boolean;
  isTablet: boolean;

  constructor(
    private categoryService: CategoryService,
    private introService: IntroService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.isMobile = deviceDetectorService.isMobile();
    this.isTablet = deviceDetectorService.isTablet();

    this.showStat = true ? !this.isMobile : false;

    this.setMenuValues();
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    // this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.fillAllCategories();

    this.selectCategory(null);

    if (!this.isMobile && !this.isTablet) {
      this.introService.startIntroJS(true);
    }
  }

  selectCategory(category: Category): void {

    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  deleteCategory(category: Category): void {
    // this.dataHandler.deleteCategory(category.id).subscribe(cat => {
    //   this.selectedCategory = null;
    //   this.categoryMap.delete(cat);
    //   this.onSearchCategory(this.searchCategoryText);
    //   this.updateTasks();
    // });
  }

  updateCategory(category: Category): void {
    // this.dataHandler.updateCategory(category).subscribe(() => {
    //   this.onSearchCategory(this.searchCategoryText);
    // });
  }


  onUpdateTask(task: Task): void {

    // this.dataHandler.updateTask(task).subscribe(() => {
    //   this.fillCategories();
    //   this.updateTasksAndStat();
    // });

  }


  onDeleteTask(task: Task): void {

    // this.dataHandler.deleteTask(task.id).pipe(
    //   concatMap(t => {
    //       return this.dataHandler.getUnfinishedCountInCategory(t.category).pipe(map(count => {
    //         return ({t, count});
    //       }));
    //     }
    //   )).subscribe(result => {
    //   const t = result.t as Task;
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count);
    //   }
    //
    //   this.updateTasksAndStat();
    // });
  }

  onSearchTasks(searchString: string): void {
    // this.searchTaskText = searchString;
    this.updateTasks();
  }


  onFilterTasksByStatus(status: boolean): void {
    // this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority): void {
    // this.priorityFilter = priority;
    this.updateTasks();
  }


  updateTasks(): void {
    // this.dataHandler.searchTasks(
    //   this.selectedCategory,
    //   this.searchTaskText,
    //   this.statusFilter,
    //   this.priorityFilter
    // ).subscribe((tasks: Task[]) => {
    //   this.tasks = tasks;
    // });
  }


  onAddTask(task: Task): void {
    // this.dataHandler.addTask(task).pipe(
    //   concatMap(ta => {
    //     return this.dataHandler.getUnfinishedCountInCategory(ta.category).pipe(map(count => {
    //       return ({t: ta, count});
    //     }));
    //   })
    // ).subscribe(result => {
    //
    //   const t = result.t as Task;
    //
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count);
    //   }
    //
    //   this.updateTasksAndStat();
    // });
  }

  addCategory(title: string): void {
    // this.dataHandler.addCategory(title).subscribe(() => this.fillCategories());
  }

  fillAllCategories(): void {

    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
    });

    // if (this.categoryMap) {
    //   this.categoryMap.clear();
    // }
    //
    // this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));
    //
    // this.categories.forEach(cat => {
    //   // this.dataHandler.getUnfinishedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    // });
  }

  searchCategory(categorySearchValues: CategorySearchValues) {
    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  updateTasksAndStat(): void {
    this.updateTasks();
    this.updateStat();
  }

  updateStat(): void {
    // zip(
    //   this.dataHandler.getTotalCountInCategory(this.selectedCategory),
    //   this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
    //   this.dataHandler.getUnfinishedCountInCategory(this.selectedCategory),
    //   this.dataHandler.getUnfinishedTotalCount())
    //
    //   .subscribe(array => {
    //     this.totalTasksCountInCategory = array[0];
    //     this.completedCountInCategory = array[1];
    //     this.unfinishedCountInCategory = array[2];
    //     this.unfinishedTotalTasksCount = array[3];
    //   });
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  onClosedMenu() {
    this.menuOpened = false;
  }

  setMenuValues() {
    this.menuPosition = 'left';

    if (this.isMobile) {
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }

  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
