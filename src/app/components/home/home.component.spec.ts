import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HomeComponent } from "./home.component"
import { GetDataService } from "../../services/get-data.service"
import { provideRouter } from "@angular/router"

describe('home component', () => {
  let fixture: ComponentFixture<HomeComponent>
  let comp: HomeComponent
  let _GetDataService:jasmine.SpyObj<GetDataService>;

  beforeEach(async () => {
    const getDataSpy = jasmine.createSpyObj('GetDataService', ['getData'], {
      productData: []
    });
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]),{provide:GetDataService, useValue:getDataSpy}],
    }).compileComponents();
     _GetDataService = TestBed.inject(GetDataService) as jasmine.SpyObj<GetDataService>;
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  describe('images array', () => {
    let mockEleOne = {
      id: 1,
      imgSrc: 'assets/images/banner/7dcc28ed89760319.webp'
    };
    let mockEleThree = {
      id: 3,
      imgSrc: 'assets/images/banner/ef637eb93bf1a887.webp'
    };

    it('should have three elements with id and img src', () => {
      expect(comp.imagesArray.length).toBe(3);
      expect(comp.imagesArray[0]).toEqual(mockEleOne);
      expect(comp.imagesArray[2]).toEqual(mockEleThree);
    });
  });

  describe('ngOnInit',()=>{

    beforeEach(() => {
      comp.ngOnInit();
      fixture.detectChanges();
    })
    xit('should call the getDataService and set the catagorizeArray', () => {
      let mockCatagorizeArray = [  {
        id: 1,
        name: 'Fasion',
        imgSrc: 'assets/images/categoriesimg/fashion.webp',
        code: 'fashion',
      },
      {
        id: 2,
        name: 'Toys',
        imgSrc: ' assets/images/categoriesimg/toys.webp',
        code: 'toys',
      },
      {
        id: 3,
        name: 'Appliance',
        imgSrc: ' assets/images/categoriesimg/appliance.webp',
        code: 'appliances',
      },
      {
        id: 4,
        name: 'Home & Furniture',
        imgSrc: 'assets/images/categoriesimg/home.webp',
        code: 'homeandfurniture',
      },]
      comp.ngOnInit();
      expect(comp.catagorizeArray).toEqual(mockCatagorizeArray);

    })
    it('should filter fashion and appliance products',()=>{
      const mockProducts = [
        { pdId: 2, pdName: 'iphone 15', pdPrice: 25000, pdCategory: 'appliances' },
        { pdId: 3, pdName: 'iphone 16', pdPrice: 30000, pdCategory: 'fashion' },
        { pdId: 4, pdName: 'iphone 17', pdPrice: 35000, pdCategory: 'appliances' },
      ];
      Object.defineProperty(_GetDataService, 'productData', { get: () => mockProducts });
      let fashionPrdsCount =_GetDataService.productData.filter((prd:any)=>prd.pdCategory == "fashion").length;
      let appliancePrdsCount =_GetDataService.productData.filter((prd:any)=>prd.pdCategory == "appliances").length;
      comp.ngOnInit();
      expect(comp.applinceProductsArray.length).toBe(appliancePrdsCount);
      expect(comp.fashionProductsArray.length).toBe(fashionPrdsCount);
    })
  })



})
