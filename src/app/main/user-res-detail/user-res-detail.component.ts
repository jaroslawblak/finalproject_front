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
  activePlace: Place;
  places: Place[];
  id: number;
  isActive: boolean;

  constructor(private resourceService: ResourceService,
              private categoryService: CategoryService,
              private placeService: PlaceService,
              private infoTransferService: InfoTransferService) {
    this.activeCategories = [];
    this.categories = [];
    this.places = [];
  }

  ngOnInit() {
    this.resourceService.currentMessage.subscribe(id => {
      this.id = id;
      this.resourceService.getResource(this.id).subscribe(data => {
        this.resource = data;
        console.log(this.resource);
        console.log(this.id);
        if (this.resource != null) {
          this.getActiveCategories();
          this.getAllCategories();
          this.getAllPlaces();
          this.activePlace = this.resource.placeId;
          console.log(this.activePlace);

        }
      });
      this.infoTransferService.displayEditState.subscribe(isActive => this.isActive = isActive);
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


  // getActivePlace() {
  //   console.log(this.resource.placeId);
  //
  //   this.placeService.getActivePlace(this.resource.placeId).subscribe(data => {
  //       this.activePlace = data;
  //       console.log(this.activePlace);
  //     });
  // }

  getAllPlaces() {
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
      console.log(this.places);
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


}
