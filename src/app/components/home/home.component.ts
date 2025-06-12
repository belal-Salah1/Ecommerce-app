import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { GetDataService } from '../../services/get-data.service';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{

  imagesArray = [
    {
      id:1,
      imgSrc:'assets/images/banner/7dcc28ed89760319.webp'
    },
    {
      id:2,
      imgSrc:'assets/images/banner/9021283f0be266c1.webp'
    },
    {
      id:3,
      imgSrc:'assets/images/banner/ef637eb93bf1a887.webp'
    }
  ]
  catagorizeArray:any;
  applinceProductsArray:any=[];
  fashionProductsArray:any=[];

  constructor(private _GetDataService:GetDataService){
  }
  ngOnInit() {
    this.catagorizeArray= this._GetDataService.catagoriesData;
    this._GetDataService.productData.filter((prd:any)=>{
      if (prd.pdCategory == "appliances"){
        this.applinceProductsArray.push(prd)
      }
      if (prd.pdCategory == "fashion"){
        this.fashionProductsArray.push(prd)
      }
    })
  }
}
