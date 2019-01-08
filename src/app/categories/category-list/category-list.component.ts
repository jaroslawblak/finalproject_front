import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // slides = [
  //   new Category("Sensors", "Lista czujników sensorów oraz wszelkich urządzeń pomiarowych", "assets/images/sensor.jpg"),
  //   new Category("Computers", "Lista laptopów", "assets/images/laptop.jpg"),
  //   {img: "http://placehold.it/350x150/333333"},
  //   {img: "http://placehold.it/350x150/666666"}
  // ];
  // slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  constructor() { }

  ngOnInit() {
  }

}
