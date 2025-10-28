import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { InfoComponent } from './about/info/info.component';
import { BlogDetailComponent } from '@app/blog/detail/blog-detail.component';
import { BlogComponent } from '@app/blog/blog.component';
import { ThemeComponent } from './theme/theme.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'blogs/:category/:id', component: BlogDetailComponent },
    { path: 'blogs', component: BlogComponent },
    { path: 'about/info', component: InfoComponent, title: 'About me' },
    { path: 'theme', component: ThemeComponent},
    { path: '**', component: HomeComponent }
];