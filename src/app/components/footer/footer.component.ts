import { Component } from '@angular/core';
import {appData} from "../../constants/appData"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  logo: string = appData.logo
}
