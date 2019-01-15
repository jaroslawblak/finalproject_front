import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  images: any[];
  constructor() { }

  ngOnInit() {
    this.images = [];
    this.images.push({source:'assets/images/laptop.jpg', alt:'Laptops', title:'Laptops'});
    this.images.push({source:'assets/images/sensors.jpg', alt:'Sensors', title:'Sensors'});
    this.images.push({source:'assets/images/robots.jpg', alt:'Robots', title:'Robots'});
    this.images.push({source:'assets/images/microscope.jpg', alt:'Microscopy', title:'Microscopy'});
    this.images.push({source:'assets/images/camera.jpg', alt:'Camera', title:'Camera'});
  }




}
