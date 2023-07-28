import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sideNavToggled=new EventEmitter<boolean>();
  menuStatus=false;
 
constructor(
  private authService:AuthService,
){}

  public SideNavToggle(){
this.menuStatus=!this.menuStatus;
this.sideNavToggled.emit(this.menuStatus);
  }

cerrarSesion(){
  this.authService.logOut()
}

}
