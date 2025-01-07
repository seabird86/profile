import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CasourelComponent } from "../lib/component/casourel/casourel.component";

@Component({
    selector: 'app-home',
    imports: [MatCardModule, CasourelComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
