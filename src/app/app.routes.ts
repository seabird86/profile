import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { InfoComponent } from './about/info/info.component';
import { BlogComponent } from '@app/lib/component/blog/blog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'blog/:category/:id', component: BlogComponent },
    { path: 'about/info', component: InfoComponent, title: 'About me' },
    { path: '**', component: HomeComponent }
];