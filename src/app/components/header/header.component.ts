import { Component } from '@angular/core';
import {appData} from "../../constants/appData"


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logo: string = appData.logo
}
