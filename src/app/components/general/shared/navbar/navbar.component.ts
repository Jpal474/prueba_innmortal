import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

toPlatform(){
  document.getElementById("platform")?.scrollIntoView({behavior:"smooth"})
}
toBenefits(){
  document.getElementById("benefits")?.scrollIntoView({behavior:"smooth"})
}
toClients(){
  document.getElementById("clients")?.scrollIntoView({behavior:"smooth"})
}


}
