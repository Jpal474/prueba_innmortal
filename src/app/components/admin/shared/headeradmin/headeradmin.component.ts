import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin-encargado.service';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent {
  @Output() sideNavToggled=new EventEmitter<boolean>();
  menuStatus:boolean=false;
   
  constructor(
    private authService:AuthService,
  ){}


  SideNavToggle(){
this.menuStatus=!this.menuStatus;
this.sideNavToggled.emit(this.menuStatus);
  }

cerrarSesion(){
  this.authService.logOut();
}

}
