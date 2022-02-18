import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'List of Sales' }
  },
  {
    path: 'gallery-details',
    component: GalleryDetailsComponent,
    data: { title: 'Sales Details' }
  },
  { path: '',
    redirectTo: '/gallery',
    pathMatch: 'full'
  },
  { path: 'login',
    component:LoginComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
