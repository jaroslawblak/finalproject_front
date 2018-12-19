import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {CategoryDetailComponent} from './categories/category-detail/category-detail.component';
import {LoginComponent} from './home/login/login.component';
import {CategoryItemComponent} from './categories/category-list/category-item/category-item.component';
import {SlickModule} from 'ngx-slick';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import { UserTableInfoComponent } from './main/user-table-info/user-table-info.component';
import {UserResourcesService} from './main/user-table-info/user-resources.service';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: HomeComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'main/profile', component: UserProfileComponent, canActivate: [AuthGuard]}

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
    HomeComponent,
    UserTableInfoComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DialogModule,
    CalendarModule
  ],
  providers: [UserResourcesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

