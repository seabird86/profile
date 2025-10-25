import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BlogListComponent } from '@app/lib/component/blog-list/blog-list.component';
import { CasourelComponent } from "../lib/component/casourel/casourel.component";
import { MatButtonModule } from '@angular/material/button'


@Component({
    selector: 'app-home',
    imports: [MatCardModule, CasourelComponent, RouterLink, BlogListComponent, MatIconModule, MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
