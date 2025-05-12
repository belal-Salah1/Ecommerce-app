import { TestBed } from "@angular/core/testing"
import { GetDataService } from "./get-data.service"

describe('GetDataService' , ()=>{
  let _getDataService: GetDataService;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [],
      imports: [],
    })
    _getDataService = TestBed.inject(GetDataService)
  })

  it('should be created', ()=>{
    expect(_getDataService).toBeTruthy()
  })
  describe('subCategorisFilterData', ()=>{
    it('should subCategorisFilterData have a length 12 ',  ()=>{
      expect(_getDataService.subCategorisFilterData.length).toBe(12)
    })
    it('should subCategorisFilterData have a valid catagorires', () =>{
      let firstItem = _getDataService.subCategorisFilterData[0]
      expect(firstItem).toEqual({
        id: 1,
        categories: 'appliances',
        subcategories: 'mobile',
      })
      let lastItem = _getDataService.subCategorisFilterData[11]
      expect(lastItem).toEqual({
        id: 12,
        categories: 'toys',
        subcategories: 'toys',
      })
    })
    it('should hava a unique ids', ()=>{
      let ids = _getDataService.subCategorisFilterData.map((item)=> item.id)
      let uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

  })
  describe('Catagrires data', ()=>{
    it('should have a length of 4 ', ()=>{
      expect(_getDataService.catagoriesData.length).toBe(4)
    })
    it('should have a unique ids and codes', ()=>{
      let ids = _getDataService.catagoriesData.map((item)=> item.id)
      let codes = _getDataService.catagoriesData.map((item)=> item.code)
      let uniqueIds = new Set(ids)
      let uniqueCodes = new Set(codes)
      expect(uniqueIds.size).toBe(ids.length)
      expect(uniqueCodes.size).toBe(codes.length)

    })
    it('should have a valid catagorires data', () =>{
      let firstItem = _getDataService.catagoriesData[0]
      expect(firstItem).toEqual({
        id: 1,
        code: 'fashion',
        imgSrc:'assets/images/categoriesimg/fashion.webp',
        name: 'Fasion',
      })
      let lastItem = _getDataService.catagoriesData[3]
      expect(lastItem).toEqual({
        id: 4,
        code: 'homeandfurniture',
        imgSrc:'assets/images/categoriesimg/home.webp',
        name: 'Home & Furniture',
      })
    })
  })
  describe('products data', ()=>{
    const requiredProperties = [
      'pdId',
      'pdCategory',
      'pdPrice',
      'pdDesc',
      'pdImg',
      'pdSubCategory',
    ];
    it('should have a length of 20 ', ()=>{
      expect(_getDataService.productData.length).toBe(20)
    })
    it('should have a unique ids and codes', ()=>{
      let ids = _getDataService.productData.map((item)=> item.pdId)
      let uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
    it('should have a valid propartires' , ()=>{
      _getDataService.productData.forEach((item, index)=>{
        requiredProperties.forEach((property)=>{
          expect(item.hasOwnProperty(property)).toBe(true)
        })
      })
    })

    it('should have valid catagories and subcategories', ()=>{
      let validCatagories = _getDataService.catagoriesData.map((item)=> item.code)
      let validSubCatagories = _getDataService.subCategorisFilterData.map((item)=> item.subcategories)
      _getDataService.productData.forEach((item)=>{
        expect(validCatagories).toContain(item.pdCategory)
        expect(validSubCatagories).toContain(item.pdSubCategory)
      } )
    })

  })


})
