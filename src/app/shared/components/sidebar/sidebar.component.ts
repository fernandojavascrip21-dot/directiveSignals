import { Component } from '@angular/core';

interface MenuItem{
  title:string,
  route:string
}

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public reactiveMenu:MenuItem[]=[
    {title:'Basico', route:'./reactive/basic'},
    {title:'Dinamicos', route:'./reactive/dynamic'},
    {title:'Switches', route:'./reactive/switches'}
  ]

    public authMenu:MenuItem[]=[
    {title:'Registro', route:'./auth'},
  ]

}
