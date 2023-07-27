import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent {
  @Output() sideNavToggled=new EventEmitter<boolean>();
  menuStatus:boolean=false;
  SideNavToggle(){
this.menuStatus=!this.menuStatus;
this.sideNavToggled.emit(this.menuStatus);
  }
}
