import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from '../../categories/category.model';
import {MultiSelectModule} from 'primeng/multiselect';
import {Resource} from '../../Resource.model';
import {ResourceService} from '../../resource.service';
import {UserTableInfoComponent} from '../user-table-info/user-table-info.component';
import {CategoryService} from '../../category.service';
import {PlaceService} from '../../place.service';
import {Place} from '../../place.model';
import {InfoTransferService} from '../../info-transfer.service';


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

  updateResource() {
    console.log(this.resource);
    console.log(this.activePlace);

  }


}
