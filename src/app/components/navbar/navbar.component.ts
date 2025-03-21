import { AfterViewInit, Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() cartCount:number = 0;
  constructor(private _dataStorageServise:DataStorageService){}
  ngOnInit(){
    this.cartCount = this._dataStorageServise.getCartData().length;
  }



}
