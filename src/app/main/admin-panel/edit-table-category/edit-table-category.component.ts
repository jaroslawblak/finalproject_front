import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../category.service';
import {ResourceService} from '../../../resource.service';
import {Resource} from '../../../model/Resource.model';
import {Category} from '../../../model/category.model';
import {ConfirmationService} from 'primeng/api';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-table-category',
  templateUrl: './edit-table-category.component.html',
  styleUrls: ['./edit-table-category.component.css']
})
export class EditTableCategoryComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;
  newCategory: Category;
  displayDialog: boolean;
  displayEditDialog: boolean;
  addCat: boolean;
  resources: Resource[];
  selectedResources: Resource[];
  selectedParentCat: Category[];
  ParentCatSettings: {};
  ResourceDropdownSettings: {};

  constructor(private categoryService: CategoryService,
              private resourceService: ResourceService,
              private confirmationService: ConfirmationService) {
    this.newCategory = new Category();
    this.categories = [];
    this.resources = [];
    this.selectedParentCat = [];
    this.selectedResources = [];
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.categories = cats;
      this.resourceService.getResources().subscribe(res => {
        this.resources = res;
      });
    });
    this.dropdownSettings();
  }

  selectCat(event: Event, cat: Category) {
    this.selectedCategory = cat;
    this.displayDialog = true;
  }
  removeCat(event: Event, cat: Category) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this category?',
      accept: () => {
        this.categoryService.deleteCategory(cat.id);
        window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedCategory = null;
  }

  saveEditedCat(editCatForm: NgForm) {
    this.newCategory = editCatForm.value;
    this.newCategory.id = this.selectedCategory.id;
    const resIds: number[] = [];
    this.selectedResources.filter(res => resIds.push(res.id));
    if (this.selectedParentCat[0] != null) {
      this.categoryService.getCategory(this.selectedParentCat[0].id).subscribe(cat => {
        this.newCategory.parentCategory = cat;
        this.categoryService.updateCategory(this.newCategory);
        this.categoryService.addNewResourcesForCategory(this.newCategory.id, resIds);
        window.location.reload();
      });
    } else {
      this.categoryService.updateCategory(this.newCategory);
      this.categoryService.addNewResourcesForCategory(this.newCategory.id, resIds);
      window.location.reload();
    }
  }


  editCat(event: Event, cat: Category) {
    this.selectedCategory = cat;
    console.log(this.selectedCategory);
    this.selectedParentCat = [];
    this.categoryService.getResourceForCategories(this.selectedCategory.id).subscribe(res => {
      this.selectedResources = res;
      if (this.selectedCategory.parentCategory != null) {
        console.log(this.selectedCategory.parentCategory);
        this.categoryService.getCategory(Number(this.selectedCategory.parentCategory)).subscribe(parentCat => {
          this.selectedParentCat = [];
          this.selectedParentCat.push(parentCat);
              this.displayEditDialog = true;
          });
      }
      this.displayEditDialog = true;
    });
  }

  addNewCat() {
    this.selectedParentCat = [];
    this.selectedResources = [];
    this.addCat = true;
  }

  saveNewCat(addCatForm: NgForm): void {
    this.newCategory = addCatForm.value;
      const resIds: number[] = [];

    if (this.selectedParentCat[0] != null) {
      this.categoryService.getCategory(this.selectedParentCat[0].id).subscribe(cat => {
        this.newCategory.parentCategory = cat;
        this.categoryService.saveCategory(this.newCategory);
        let tempCat: Category;
        this.categoryService.getCategoryByName(this.newCategory.name).subscribe(tempcat => {
          tempCat = tempcat;
          console.log(tempCat)
          if (this.selectedResources != null) {
            this.selectedResources.filter(res => resIds.push(res.id));
            this.categoryService.addNewResourcesForCategory(tempCat.id, resIds);
          }
          window.location.reload();
        });
      });
    } else {
      this.categoryService.saveCategory(this.newCategory);
      let tempCat: Category;
      this.categoryService.getCategoryByName(this.newCategory.name).subscribe(tempcat => {
        tempCat = tempcat;
        console.log(tempCat)
        if (this.selectedResources != null) {
          this.selectedResources.filter(res => resIds.push(res.id));
          this.categoryService.addNewResourcesForCategory(tempCat.id, resIds);
        }
        window.location.reload();
      });
    }
  }

  dropdownSettings() {
    this.ParentCatSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.ResourceDropdownSettings = {
      singleSelection: false,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
}
