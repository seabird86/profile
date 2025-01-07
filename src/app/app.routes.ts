import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { CasourelGuideComponent } from '@app/angular/casourel-guide/casourel-guide.component';
import { HighlightjsGuideComponent } from '@app/angular/highlightjs-guide/highlightjs-guide.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'angular/casourel-guide', component: CasourelGuideComponent },
    { path: 'angular/highlightjs-guide', component: HighlightjsGuideComponent }
];