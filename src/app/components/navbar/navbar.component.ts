import {  ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  @Input() cartCount:number = 0;
  logState!:boolean;
  constructor(private _dataStorageServise:DataStorageService,private _authService:AuthService){}
  ngOnInit(){
    this.cartCount = this._dataStorageServise.getCartData().length;
    this.logState = this._authService.getLogState();
  }
  SetUserLogOut(){
    this._authService.logOut();
  }



}
