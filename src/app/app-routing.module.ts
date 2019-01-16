import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: AddComponent },
  { path: 'details', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
