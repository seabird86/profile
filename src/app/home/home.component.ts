import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BlogListComponent } from '@app/lib/component/blog-list/blog-list.component';
import { CasourelComponent } from "../lib/component/casourel/casourel.component";


@Component({
    selector: 'app-home',
    imports: [MatCardModule, CasourelComponent, RouterLink, BlogListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
