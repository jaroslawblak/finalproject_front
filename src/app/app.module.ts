import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
//import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { MainComponent} from './main/main.component'
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { LoginComponent } from './home/login/login.component';
import { CategoryItemComponent } from './categories/category-list/category-item/category-item.component';
import { SlickModule } from 'ngx-slick';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { map } from 'rxjs/operators';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: HomeComponent},
  { path: 'main', component: MainComponent}
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    LoginComponent,
    CategoryItemComponent,
    MainComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
