import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebarencargado',
  templateUrl: './sidebarencargado.component.html',
  styleUrls: ['./sidebarencargado.component.css']
})
export class SidebarencargadoComponent {
  @Input() sideNavStatus:boolean=false;

}
