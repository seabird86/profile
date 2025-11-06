import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BlogListComponent } from '@app/lib/component/blog-list/blog-list.component';


@Component({
    selector: 'app-home',
    imports: [MatCardModule, RouterLink, BlogListComponent, MatIconModule, MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
