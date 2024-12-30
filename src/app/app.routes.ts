import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { CasourelGuideComponent } from './angular/casourel-guide/casourel-guide.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'angular/casourel-guide', component: CasourelGuideComponent }
];