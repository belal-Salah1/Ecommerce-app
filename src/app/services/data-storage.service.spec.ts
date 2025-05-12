import { TestBed } from "@angular/core/testing"
import { DataStorageService } from "./data-storage.service"

describe('data Storage Service ' , () => {
  let dataStorageService:DataStorageService
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[DataStorageService],
    })
     dataStorageService = TestBed.inject(DataStorageService)
     localStorage.clear()
  })
  it('should Be Created' , ()=>{
    expect(dataStorageService).toBeTruthy()
  })
  it('should store and retrive data from local storage ', ()=>{
    let mockData = {
      name:'belal',
      age:22,
      country:'pakistan'
    }
    dataStorageService.storeCartData(mockData)
    expect(dataStorageService.getCartData()).toEqual(mockData)
  })


})
