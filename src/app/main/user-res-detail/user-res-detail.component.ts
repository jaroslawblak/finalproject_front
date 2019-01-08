import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category.model';
import {Resource} from '../../model/Resource.model';
import {ResourceService} from '../../resource.service';
import {CategoryService} from '../../category.service';
import {PlaceService} from '../../place.service';
import {Place} from '../../model/place.model';
import {InfoTransferService} from '../../info-transfer.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-res-detail',
  templateUrl: './user-res-detail.component.html',
  styleUrls: ['./user-res-detail.component.css'],
})
export class UserResDetailComponent implements OnInit {

  categories: Category[];
  activeCategories: Category[];
  resource: Resource;
  activeParentResource: Resource[];
  resources: Resource[];
  activePlace: Place[];
  places: Place[];
  categorySettings = {};
  placeSettings = {};
  resourceSettings = {};
  id: number;
  isActive: boolean;

  constructor(private resourceService: ResourceService,
              private categoryService: CategoryService,
              private placeService: PlaceService,
              private infoTransferService: InfoTransferService) {
    this.activeCategories = [];
    this.categories = [];
    this.places = [];
    this.activePlace = [];
    this.resources = [];
    this.activeParentResource = [];
    this.dropdownSettings();
  }

  ngOnInit() {
    this.resourceService.currentMessage.subscribe(id => {
      this.id = id;
      this.resourceService.getResource(this.id).subscribe(data => {
        console.log(data);
        this.activeCategories = [];
        this.categories = [];
        this.places = [];
        this.activePlace = [];
        this.resources = [];
        this.activeParentResource = [];
        this.resource = data;
        console.log(this.resource);
        if (this.resource != null) {
          this.getAllResources();
          if (this.resource.parentResource != null) {
            this.activeParentResource.push(this.resource.parentResource);
          } else {
            this.activeParentResource = [];
          }
          this.getAllPlaces();
          if (this.resource.place != null) {
            this.activePlace.push(this.resource.place);
          } else {
            this.activePlace = [];
          }
          this.getAllCategories();
          this.getActiveCategories();
        }
      });
      this.infoTransferService.displayEditState.subscribe(isActive => this.isActive = isActive);
    });
  }

  getAllResources() {
    this.resourceService.getResources().subscribe(res => {
      this.resources = res;
    });
  }

  getActiveCategories() {
    this.categoryService.getActiveCategories(this.id).subscribe(data => {
      this.activeCategories = data;
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getAllPlaces() {
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });

  }

  dismissEdit() {
    this.infoTransferService.changeDisplayEditState(false);
  }

  getDate(value: any) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy/MM/dd');
}
  dropdownSettings() {
    this.categorySettings = {
      singleSelection: false,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.placeSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.resourceSettings = this.placeSettings;
  }

  prepareResourceForSaveThenSave() {
    if (this.resource.name == null || this.resource.type == null ||
      this.resource.state == null || this.resource.place == null || this.resource.addTime === '') {
      alert('Fill all required fields.');
      return;
    }
    const categoryIds: number[] = [];
    if (this.activeParentResource != null) {
      this.placeService.getActivePlace(this.activePlace[0].id).subscribe(place => {
        this.resource.place = place;
        this.resourceService.getResource(this.activeParentResource[0].id).subscribe(data => {
          this.resource.parentResource = data;
          this.activeCategories.filter(category => categoryIds.push(category.id));
          this.resourceService.saveResource(this.resource);
          this.categoryService.updateResToCategory(this.resource.id, categoryIds);
          this.infoTransferService.changeDisplayEditState(false);
        });
      });
    } else {
      this.placeService.getActivePlace(this.activePlace[0].id).subscribe(place => {
        this.resource.place = place;
        this.resource.parentResource = null;
        this.activeCategories.filter(category => categoryIds.push(category.id));
        this.resourceService.saveResource(this.resource);
        this.categoryService.updateResToCategory(this.resource.id, categoryIds);
        this.infoTransferService.changeDisplayEditState(false);
      });
    }
    window.location.reload();

  }
}
