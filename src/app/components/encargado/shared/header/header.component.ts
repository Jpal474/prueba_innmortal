import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sideNavToggled=new EventEmitter<boolean>();
  menuStatus=false;
  public SideNavToggle(){
this.menuStatus=!this.menuStatus;
this.sideNavToggled.emit(this.menuStatus);
  }

}
