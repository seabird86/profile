import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CasourelComponent } from "../lib/component/casourel/casourel.component";

@Component({
    selector: 'app-home',
    imports: [MatCardModule, CasourelComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
