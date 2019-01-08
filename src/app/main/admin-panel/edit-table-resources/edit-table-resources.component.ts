import { Component, OnInit } from '@angular/core';
import {Resource} from '../../../model/Resource.model';
import {ConfirmationService} from 'primeng/api';
import {ResourceService} from '../../../resource.service';
import {UserService} from '../../../user.service';
import {NgForm} from '@angular/forms';
import {isNumber} from 'util';
import {Category} from '../../../model/category.model';
import {Place} from '../../../model/place.model';
import {PlaceService} from '../../../place.service';
import {CategoryService} from '../../../category.service';

@Component({
  selector: 'app-edit-table-resources',
  templateUrl: './edit-table-resources.component.html',
  styleUrls: ['./edit-table-resources.component.css']
})
export class EditTableResourcesComponent implements OnInit {
  resources: Resource[];
  places: Place[];
  categories: Category[];
  selectedRes: Resource;
  newRes: Resource;
  displayDialog: boolean;
  displayEditDialog: boolean;
  addRes: boolean;
  ParentResSettings: {};
  PlaceSettings: {};
  CategoriesSettings: {};
  selectedParentRes: Resource[];
  selectedPlace: Place[];
  selectedCategories: Category[];

  constructor(private resourceService: ResourceService,
              private userService: UserService,
              private placeService: PlaceService,
              private categoryService: CategoryService,
              private confirmationService: ConfirmationService) {
    this.newRes = new Resource();
    this.selectedParentRes = [];
    this.resources = [];
    this.places = [];
    this.categories = [];
    this.selectedPlace = [];
    this.selectedCategories = [];
  }

  ngOnInit() {
    this.resourceService.getResources().subscribe(res => {
      this.resources = res;
      this.placeService.getAllPlaces().subscribe(places => {
        this.places = places;
        this.categoryService.getAllCategories().subscribe(categories => {
          this.categories = categories;
        });
      });
    });
    this.dropdownSettings();
  }

  selectRes(event: Event, res: Resource) {
    this.selectedRes = res;
    this.displayDialog = true;
    if (this.selectedRes.parentResource != null) {
      this.resourceService.getResource(Number(this.selectedRes.parentResource))
        .subscribe(resource => this.selectedRes.parentResource = resource);
    }
  }

  editRes(event: Event, res: Resource) {
    this.selectedRes = res;
    this.categoryService.getActiveCategories(this.selectedRes.id).subscribe(sCat => {
      this.selectedParentRes = [];
      this.selectedPlace = [];
      this.selectedCategories = [];
      this.selectedPlace.push(this.selectedRes.place);
      console.log(this.selectedPlace);
      this.selectedCategories = sCat;
      if (this.selectedRes.parentResource != null) {
        this.selectedParentRes.push(this.selectedRes.parentResource);
      } else {
        this.selectedParentRes = [];
      }
      this.displayEditDialog = true;
    });

  }

  saveEditedRes(editUserForm: NgForm) {
    this.newRes = editUserForm.value;
    if (this.selectedPlace[0] == null) {
      alert('Choose a place for resource!');
      return;
    }
    const categoryIds: number[] = [];
    this.newRes.id = this.selectedRes.id;
    if (this.selectedParentRes[0] != null) {
      this.resourceService.getResource(this.selectedParentRes[0].id).subscribe(data => {
        this.newRes.parentResource = data;
        this.newRes.place = this.selectedPlace[0];
        this.selectedCategories.filter(category => categoryIds.push(category.id));
        this.resourceService.updateResource(this.newRes);
        this.categoryService.updateResToCategory(this.newRes.id, categoryIds);
        window.location.reload();
      });
    } else {
        this.newRes.place = this.selectedPlace[0];
        this.selectedCategories.filter(category => categoryIds.push(category.id));
        this.resourceService.updateResource(this.newRes);
        this.categoryService.updateResToCategory(this.newRes.id, categoryIds);
        window.location.reload();
      }
  }

  removeRes(event: Event, res: Resource) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this resource?',
      accept: () => {
        this.resourceService.deleteResource(res.id);
        window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedRes = null;
  }

  addNewRes() {
    this.selectedPlace = [];
    this.selectedParentRes = [];
    this.addRes = true;
  }

  saveNewRes(addResForm: NgForm): void {
    this.newRes = addResForm.value;
    const categoryIds: number[] = [];
    if (this.selectedPlace[0] == null) {
      alert('You need to choose a place for resource!');
      return;
    }
    this.newRes.place = this.selectedPlace[0];
    console.log(this.newRes);
    if (this.selectedParentRes[0] != null) {
      this.resourceService.getResource(this.selectedParentRes[0].id).subscribe(parentRes => {
        this.newRes.parentResource = parentRes;
        this.resourceService.saveResource(this.newRes);
        window.location.reload();
      });
    } else {
      this.resourceService.saveResource(this.newRes);
      window.location.reload();
    }
  }

  dropdownSettings() {
    this.ParentResSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.PlaceSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.CategoriesSettings = {
      singleSelection: false,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
}
