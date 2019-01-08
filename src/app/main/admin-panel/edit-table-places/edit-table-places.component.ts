import { Component, OnInit } from '@angular/core';
import {Place} from '../../../model/place.model';
import {Resource} from '../../../model/Resource.model';
import {PlaceService} from '../../../place.service';
import {ResourceService} from '../../../resource.service';
import {ConfirmationService} from 'primeng/api';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-table-places',
  templateUrl: './edit-table-places.component.html',
  styleUrls: ['./edit-table-places.component.css']
})
export class EditTablePlacesComponent implements OnInit {
  places: Place[];
  selectedPlace: Place;
  newPlace: Place;
  displayDialog: boolean;
  displayEditDialog: boolean;
  addPlace: boolean;
  resources: Resource[];
  selectedResources: Resource[];
  selectedParentPlace: Place[];
  ParentPlaceSettings: {};
  ResourceDropdownSettings: {};

  constructor(private placeService: PlaceService,
              private resourceService: ResourceService,
              private confirmationService: ConfirmationService) {
    this.newPlace = new Place();
    this.places = [];
    this.resources = [];
    this.selectedParentPlace = [];
    this.selectedResources = [];
  }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe(places => {
      this.places = places;
      this.resourceService.getResources().subscribe(res => {
        this.resources = res;
      });
    });
    this.dropdownSettings();
  }

  selectPlace(event: Event, place: Place) {
    this.selectedPlace = place;
    this.displayDialog = true;
  }
  removePlace(event: Event, place: Place) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this place?',
      accept: () => {
        this.placeService.deletePlace(place.id);
        window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedPlace = null;
  }

  saveEditedPlace(editPlaceForm: NgForm) {
    this.newPlace = editPlaceForm.value;
    this.newPlace.id = this.selectedPlace.id;
    const resIds: number[] = [];
    this.selectedResources.filter(res => resIds.push(res.id));
    if (this.selectedParentPlace[0] != null) {
      this.placeService.getPlace(this.selectedParentPlace[0].id).subscribe(place => {
        this.newPlace.parentPlace = place;
        this.placeService.updatePlace(this.newPlace);
        this.placeService.addNewResourcesForPlace(this.newPlace.id, resIds);
        window.location.reload();
      });
    } else {
      this.placeService.updatePlace(this.newPlace);
      this.placeService.addNewResourcesForPlace(this.newPlace.id, resIds);
      window.location.reload();
    }
  }


  editPlace(event: Event, place: Place) {
    this.selectedPlace = place;
    console.log(this.selectedPlace);
    this.selectedParentPlace = [];
    this.placeService.getResourceForPlace(this.selectedPlace.id).subscribe(res => {
      this.selectedResources = res;
      if (this.selectedPlace.parentPlace != null) {
        console.log(this.selectedPlace.parentPlace);
        this.placeService.getPlace(Number(this.selectedPlace.parentPlace)).subscribe(parentPlace => {
          this.selectedParentPlace = [];
          this.selectedParentPlace.push(parentPlace);
          this.displayEditDialog = true;
        });
      }
      this.displayEditDialog = true;
    });
  }

  addNewPlace () {
    this.selectedParentPlace = [];
    this.selectedResources = [];
    this.addPlace = true;
  }

  saveNewPlace(addPlaceForm: NgForm): void {
    this.newPlace = addPlaceForm.value;
    const resIds: number[] = [];

    if (this.selectedParentPlace[0] != null) {
      this.placeService.getPlace(this.selectedParentPlace[0].id).subscribe(place => {
        this.newPlace.parentPlace = place;
        this.placeService.savePlace(this.newPlace);
        let tempPlace: Place;
        this.placeService.getPlaceByName(this.newPlace.name).subscribe(tempPlaceX => {
          tempPlace = tempPlaceX;
          console.log(tempPlace);
          if (this.selectedResources != null) {
            this.selectedResources.filter(res => resIds.push(res.id));
            this.placeService.addNewResourcesForPlace(tempPlace.id, resIds);
          }
          window.location.reload();
        });
      });
    } else {
      this.placeService.savePlace(this.newPlace);
      let tempPlace: Place;
      this.placeService.getPlaceByName(this.newPlace.name).subscribe(tempPlaceX => {
        tempPlace = tempPlaceX;
        console.log(tempPlace);
        if (this.selectedResources != null) {
          this.selectedResources.filter(res => resIds.push(res.id));
          this.placeService.addNewResourcesForPlace(tempPlace.id, resIds);
        }
        window.location.reload();
      });
    }
  }

  dropdownSettings() {
    this.ParentPlaceSettings = {
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
