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
import {AuthGuard} from './guards/auth.guard';
import { UserTableInfoComponent } from './main/user-table-info/user-table-info.component';
import {UserResourcesService} from './main/user-table-info/user-resources.service';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { UserResDetailComponent } from './main/user-res-detail/user-res-detail.component';
import { AdminPanelComponent } from './main/admin-panel/admin-panel.component';
import {AdminGuard} from './guards/admin.guard';
import {CarouselModule} from 'primeng/carousel';
import { EditTableUsersComponent } from './main/admin-panel/edit-table-users/edit-table-users.component';
import { EditTableUserResourcesComponent } from './main/admin-panel/edit-table-user-resources/edit-table-user-resources.component';
import { EditTableResourcesComponent } from './main/admin-panel/edit-table-resources/edit-table-resources.component';
import { EditTableDocumentsComponent } from './main/admin-panel/edit-table-documents/edit-table-documents.component';
import { EditTablePlacesComponent } from './main/admin-panel/edit-table-places/edit-table-places.component';
import { EditTableResourcesCategoriesComponent } from './main/admin-panel/edit-table-resources-categories/edit-table-resources-categories.component';
import { EditTableCategoryComponent } from './main/admin-panel/edit-table-category/edit-table-category.component';
import { EditTableChildrenOfResourceComponent } from './main/admin-panel/edit-table-children-of-resource/edit-table-children-of-resource.component';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TicketComponent } from './main/ticket/ticket.component';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {SelectButtonModule} from 'primeng/selectbutton';




const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: HomeComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'main/admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'main/ticket', component: TicketComponent},
  {path: 'main/admin/edit/Users', component: EditTableUsersComponent},
  {path: 'main/admin/edit/User-Resources', component: EditTableUserResourcesComponent},
  {path: 'main/admin/edit/Resources', component: EditTableResourcesComponent},
  {path: 'main/admin/edit/Documents', component: EditTableDocumentsComponent},
  {path: 'main/admin/edit/Places', component: EditTablePlacesComponent},
  {path: 'main/admin/edit/Resources-Categories', component: EditTableResourcesCategoriesComponent},
  {path: 'main/admin/edit/Category', component: EditTableCategoryComponent},
  {path: 'main/admin/edit/Children-of-resource', component: EditTableChildrenOfResourceComponent},
];

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
    UserResDetailComponent,
    AdminPanelComponent,
    EditTableUsersComponent,
    EditTableUserResourcesComponent,
    EditTableResourcesComponent,
    EditTableDocumentsComponent,
    EditTablePlacesComponent,
    EditTableResourcesCategoriesComponent,
    EditTableCategoryComponent,
    EditTableChildrenOfResourceComponent,
    TicketComponent,

  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    CarouselModule,
    DataViewModule,
    PanelModule,
    ConfirmDialogModule,
    CardModule,
    TableModule,
    PaginatorModule,
    SelectButtonModule
  ],
  providers: [UserResourcesService, AuthGuard, AdminGuard, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

