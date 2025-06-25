interface KeywordsListSlide {
    id: number;
    Text: string;
}
export const KeywordsList: KeywordsListSlide [] = [
    {id: 1, Text: 'Cloth'},
    {id: 2, Text: 'Foods'},
    {id: 3, Text: 'Snacks'},
    {id: 4, Text: 'Dairy'},
    {id: 5, Text: 'Seafood'},
    {id: 6, Text: 'Toys'},
    {id: 7, Text: 'Jewelry'},
    {id: 8, Text: 'Bags'},
    {id: 9, Text: 'Perfume'},
]
import VegetableIMG from '/Vegetable.svg'
import FruitIMG from '/Fruit.svg'
import ColdDrinkIMG from '/ColdDrink.svg'
import BakaryIMG from '/Bakery.svg'
import FAstIMG from '/FastFood.svg'
import ChipsIMG from '/Chips.svg'
import EmptyCart from '/emptyCart.svg'

// import BlueBerryLogo from '../../../assets/blueBerryLogo.png'
export const Empty = EmptyCart



interface explorCatSlide {
    id: number;
    Text: string;
    acc: string;
    img: string;
}
export const explorCatList: explorCatSlide[] = [
    {id: 1, Text: 'Vegetable', acc: '485 items', img: VegetableIMG},
    {id: 2, Text: 'Fruits', acc: '291 items', img: FruitIMG},
    {id: 3, Text: 'Cold Drinks', acc: '46 items', img: ColdDrinkIMG},
    {id: 4, Text: 'Bakery', acc: '8 items', img: BakaryIMG},
    {id: 5, Text: 'Fast Food', acc: '195 items', img: FAstIMG},
    {id: 6, Text: 'Snacks', acc: '46 items', img: ChipsIMG},
]
// ALL PRODUCTS
import ONOIMG from './assets/ONO.jpg'
import LitchiIMG from './assets/Litchi.jpg'
import BananaChipsIMG from './assets/BananaChips.jpg'
import PotatoChipsIMG from './assets/PotatoChips.jpg'
import BlackPaperIMG from './assets/BlackPepper.jpg'
import ChillIMG from './assets/ChillSpice.jpg'
import AppleJice from './assets/AppleJuice.jpg'
import BananaIMG from './assets/Banana.jpg'
import ChocolateIMG from './assets/Chocolate.jpg'
import CornIMG from './assets/Corn.jpg'
import FlakeIMG from './assets/Flakes.jpg'
import Guava from './assets/Guava.jpg'
import CapcicumIMG from './assets/Capcicum.jpg'
import KesarMangoIMG from './assets/KesarMango.jpg'
import KwangtungIMG from './assets/Kwangtung.jpg'
import LeaveIMG from './assets/Leave.jpg'
import MangoJuiceIMG from './assets/MangoJuice.jpg'
import PotatoIMG from './assets/Potato.jpg'
import TomatoIMG from './assets/Tomato.jpg'
import Almond from './assets/Almond.jpg'
import Ginger from './assets/Ginger.jpg'
import Orange from './assets/Orange.jpg'
import Lemon from './assets/Lemon.jpg'
import Ketchup from './assets/Ketchup.jpg'
import Cherry from './assets/Cherry.jpg'
import Onion from './assets/Onion.jpg'
// import { Products } from './types';

export const PIMG = FlakeIMG
import { Products } from './types';
export const exportProduct: Products = {
    Allproducts: [
    {id: 1, name: 'Ground Nuts Oil Pack', price: 15.25, DelPrice: 20, img: ONOIMG, rating: 0, type: 'Snacks' },
    {id: 2, name: 'Organic Litchi Juice', price: 25.00, DelPrice: 30, img: LitchiIMG, rating: 0, type: 'Juice'},
    {id: 3, name: 'Spicy Banana Chips', price: 17.99, DelPrice: 22, img: BananaChipsIMG, rating: 0, type: 'Snacks'},
    {id: 4, name: 'Spicy Potato Chips', price: 15.99, DelPrice: 20, img: PotatoChipsIMG, rating: 0, type: 'Snacks'},
    {id: 5, name: 'Black Pepper Spice', price: 50.99, DelPrice: 55, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    {id: 6, name: 'Small Chili Spice pack', price: 20.00, DelPrice: 23, img: ChillIMG, rating: 0, type: 'Snacks'},
    {id: 7, name: ' Fresh Apple Juice', price: 51.99, DelPrice: 20, img: AppleJice, rating: 0, type: 'Juice'},
    {id: 8, name: 'Organic Banana', price: 25.00, DelPrice: 30, img: BananaIMG, rating: 0, type: 'Fruit'},
    {id: 9, name: 'Organic Corn', price: 41.00, DelPrice: 23, img: CornIMG, rating: 0, type: 'Fruit'},
    {id: 10, name: 'Mix Fruits Chocolate', price: 15.99, DelPrice: 20, img: ChocolateIMG, rating: 0, type: 'Snacks'},
    {id: 11, name: 'Flakes', price: 150.99, DelPrice: 155, img: FlakeIMG, rating: 0, type: 'Snacks'},
    {id: 12, name: 'Guava', price: 20.00, DelPrice: 23, img: Guava, rating: 0, type: 'Fruit'},
    {id: 13, name: 'Capcicum', price: 50.99, DelPrice: 55, img: CapcicumIMG, rating: 0, type: 'Vegetable'},
    {id: 14, name: 'Kesar Mango', price: 20.99, DelPrice: 23, img: KesarMangoIMG, rating: 0, type: 'Fruit'},
    {id: 15, name: 'Kwangtung', price: 15.00, DelPrice: 20, img: KwangtungIMG, rating: 0, type: 'Fruit'},
    {id: 16, name: 'Leave', price: 5.99, DelPrice: 8.99, img: LeaveIMG, rating: 0, type: 'Vegetable'},
    {id: 17, name: 'Fresh Mango Juice', price: 7.99, DelPrice: 12.99, img: MangoJuiceIMG, rating: 0, type: 'Juice'},
    {id: 18, name: 'Ecuado Potato', price: 15.00, DelPrice: 20.99, img: PotatoIMG, rating: 0, type: 'Vegetable'},
    {id: 19, name: 'Tomato', price: 17.00, DelPrice: 22.66, img: TomatoIMG, rating: 0, type: 'Vegetable'},
    {id: 20, name: 'Guava', price: 20.99, DelPrice: 23.00, img: Guava, rating: 0, type: 'Fruit'},
    {id: 21, name: 'Mix Almond nuts juice pack', price: 20.99, DelPrice: 23, img: Almond, rating: 0, type: 'Juice'},
    {id: 22, name: 'Jamica Ginger', price: 20.99, DelPrice: 23.00, img: Ginger, rating: 0, type: 'Vegetable'},
    {id: 23, name: 'Organic Orange', price: 20.99, DelPrice: 23.00, img: Orange, rating: 0, type: 'Fruit'},
    {id: 24, name: 'Organic Lemon', price: 20.00, DelPrice: 23.00, img: Lemon, rating: 0, type: 'Fruit'},
    {id: 25, name: 'Tomato Ketchup', price: 55.99, DelPrice: 75.00, img: Ketchup, rating: 0},
    {id: 26, name: 'Red Cherry Serbia', price: 20.00, DelPrice: 23.00, img: Cherry, rating: 0, type: 'Fruit'},
    {id: 27, name: 'Onions', price: 20, DelPrice: 23.99, img: Onion, rating: 0, type: 'Vegetable'},
    {id: 28, name: 'Ground Nuts Oil Pack', price: 15.25, DelPrice: 20, img: ONOIMG, rating: 0, type: 'Snacks' },
    {id: 29, name: 'Organic Litchi Juice', price: 25.00, DelPrice: 30, img: LitchiIMG, rating: 0, type: 'Juice'},
    {id: 30, name: 'Spicy Banana Chips', price: 17.99, DelPrice: 22, img: BananaChipsIMG, rating: 0, type: 'Snacks'},
    {id: 31, name: 'Spicy Potato Chips', price: 15.99, DelPrice: 20, img: PotatoChipsIMG, rating: 0, type: 'Snacks'},
    {id: 32, name: 'Black Pepper Spice', price: 50.99, DelPrice: 55, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    {id: 33, name: 'Small Chili Spice pack', price: 20.00, DelPrice: 23, img: ChillIMG, rating: 0, type: 'Snacks'},
    {id: 34, name: ' Fresh Apple Juice', price: 51.99, DelPrice: 20, img: AppleJice, rating: 0, type: 'Juice'},
    {id: 35, name: 'Organic Banana', price: 25.00, DelPrice: 30, img: BananaIMG, rating: 0, type: 'Fruit'},
    {id: 36, name: 'Organic Corn', price: 41.00, DelPrice: 23, img: CornIMG, rating: 0, type: 'Fruit'},
    {id: 37, name: 'Mix Fruits Chocolate', price: 15.99, DelPrice: 20, img: ChocolateIMG, rating: 0, type: 'Snacks'},
    {id: 38, name: 'Flakes', price: 150.99, DelPrice: 155, img: FlakeIMG, rating: 0, type: 'Snacks'},
    {id: 39, name: 'Guava', price: 20.00, DelPrice: 23, img: Guava, rating: 0, type: 'Fruit'},
    {id: 40, name: 'Capcicum', price: 50.99, DelPrice: 55, img: CapcicumIMG, rating: 0, type: 'Vegetable'},
    {id: 41, name: 'Kesar Mango', price: 20.99, DelPrice: 23, img: KesarMangoIMG, rating: 0, type: 'Fruit'},
    {id: 42, name: 'Kwangtung', price: 15.00, DelPrice: 20, img: KwangtungIMG, rating: 0, type: 'Fruit'},
    {id: 43, name: 'Leave', price: 5.99, DelPrice: 8.99, img: LeaveIMG, rating: 0, type: 'Vegetable'},
    {id: 44, name: 'Fresh Mango Juice', price: 7.99, DelPrice: 12.99, img: MangoJuiceIMG, rating: 0, type: 'Juice'},
    {id: 45, name: 'Ecuado Potato', price: 15.00, DelPrice: 20.99, img: PotatoIMG, rating: 0, type: 'Vegetable'},
    {id: 46, name: 'Tomato', price: 17.00, DelPrice: 22.66, img: TomatoIMG, rating: 0, type: 'Vegetable'},
    {id: 47, name: 'Guava', price: 20.99, DelPrice: 23.00, img: Guava, rating: 0, type: 'Fruit'},
    {id: 48, name: 'Mix Almond nuts juice pack', price: 20.99, DelPrice: 23, img: Almond, rating: 0, type: 'Juice'},
    {id: 49, name: 'Jamica Ginger', price: 20.99, DelPrice: 23.00, img: Ginger, rating: 0, type: 'Vegetable'},
    {id: 50, name: 'Organic Orange', price: 20.99, DelPrice: 23.00, img: Orange, rating: 0, type: 'Fruit'},
    {id: 51, name: 'Organic Lemon', price: 20.00, DelPrice: 23.00, img: Lemon, rating: 0, type: 'Fruit'},
    {id: 52, name: 'Tomato Ketchup', price: 55.99, DelPrice: 75.00, img: Ketchup, rating: 0},
    {id: 53, name: 'Red Cherry Serbia', price: 20.00, DelPrice: 23.00, img: Cherry, rating: 0, type: 'Fruit'},
    {id: 54, name: 'Onions', price: 20, DelPrice: 23.99, img: Onion, rating: 0, type: 'Vegetable'},
    
    ],
    RelatedProducts: [
    {id: 1, name: 'Ground Nuts Oil Pack', price: 15.55, DelPrice: 20.99, img: ONOIMG, rating: 0, type: 'Snacks'},
    {id: 2, name: 'Organic Litchi Juice Pack', price: 25.99, DelPrice: 30.00, img: LitchiIMG, rating: 0, type: 'Juice'},
    {id: 3, name: 'Spicy Banana Chips', price: 17.00, DelPrice: 22.55, img: BananaChipsIMG, rating: 0, type: 'Snacks'},
    {id: 4, name: 'Spicy Potato Chips', price: 15.99, DelPrice: 20.99, img: PotatoChipsIMG, rating: 0, type: 'Snacks'},
    {id: 5, name: 'Black Pepper Spice Pack', price: 50.99, DelPrice: 55.00, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    {id: 6, name: 'Small Chili Spice Pack', price: 20.00, DelPrice: 23.00, img: ChillIMG, rating: 0, type: 'Snacks'},
    ],
    NewArrival: [
    {id: 1, name: 'Ground Nuts Oil Pack', price: 15.00, DelPrice: 20.99, img: ONOIMG, rating: 0, type: 'Snacks'},
    {id: 2, name: 'Kwangtung', price: 15.00, DelPrice: 20.99, img: KwangtungIMG, rating: 0, type: 'Fruit'},
    {id: 3, name: 'Capcicum', price: 50.00, DelPrice: 55.99, img: CapcicumIMG, rating: 0, type: 'Fruit'},
    {id: 4, name: 'Tomato Ketchup', price: 55.00, DelPrice: 75.55, img: Ketchup, rating: 0},
    {id: 5, name: 'Black Pepper Spice Pack', price: 50.55, DelPrice: 55.00, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    {id: 6, name: 'Flakes', price: 150.99, DelPrice: 155.00, img: FlakeIMG, rating: 0, type: 'Snacks'},
    {id: 7, name: 'Red Cherry Serbia', price: 20.55, DelPrice: 23.00, img: Cherry, rating: 0, type: 'Fruit'},
    {id: 8, name: 'Kwangtung', price: 15, DelPrice: 20, img: KwangtungIMG, rating: 0, type: 'Fruit'},
    {id: 9, name: 'Mix Almond nuts juice pack', price: 20.00, DelPrice: 23.55, img: Almond, rating: 0, type: 'Juice'},
    {id: 10, name: 'Spicy Banana Chips', price: 17.00, DelPrice: 22.00, img: BananaChipsIMG, rating: 0, type: 'Snacks'},
    {id: 11, name: 'Spicy Potato Chips', price: 15.00, DelPrice: 20.99, img: PotatoChipsIMG, rating: 0, type: 'Snacks'},
    {id: 12, name: 'Black Pepper Spice', price: 32.99, DelPrice: 37.00, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    ],
    Fruits: [
    {id: 1, name: 'Kesar Mango', price: 20, DelPrice: 23, img: KesarMangoIMG, rating: 0, type: 'Fruit'},
    {id: 2, name: 'Kwangtung', price: 15, DelPrice: 20, img: KwangtungIMG, rating: 0, type: 'Fruit'},
    {id: 3, name: 'Organic Orange', price: 20, DelPrice: 23, img: Orange, rating: 0, type: 'Fruit'},
    {id: 4, name: 'Organic Lemon', price: 20, DelPrice: 23, img: Lemon, rating: 0, type: 'Fruit'},    
    {id: 5, name: 'Organic Banana', price: 25, DelPrice: 30, img: BananaIMG, rating: 0, type: 'Fruit'},
    {id: 6, name: 'Organic Corn', price: 41, DelPrice: 53, img: CornIMG, rating: 0, type: 'Fruit'},
    ],
    Vegetables: [
    {id: 1, name: 'Leave', price: 5, DelPrice: 8, img: LeaveIMG, rating: 0, type: 'Vegetable'},
    {id: 2, name: 'Onions', price: 20, DelPrice: 23, img: Onion, rating: 0, type: 'Vegetable'},
    {id: 3, name: 'Tomato', price: 17, DelPrice: 22, img: TomatoIMG, rating: 0, type: 'Vegetable'},
        
    ],
    Juice: [
    {id: 1, name: 'Fresh Mango Juice', price: 7.99, DelPrice: 12.99, img: MangoJuiceIMG, rating: 0, type: 'Juice'},
    {id: 2, name: 'Mix Almond nuts juice pack', price: 20.99, DelPrice: 23, img: Almond, rating: 0, type: 'Juice'},
    {id: 3, name: 'Almond nuts juice pack', price: 20.00, DelPrice: 23.55, img: Almond, rating: 0, type: 'Juice'},
    {id: 4, name: 'Organic Litchi Juice Pack', price: 25.99, DelPrice: 30.00, img: LitchiIMG, rating: 0, type: 'Juice'},
    {id: 5, name: 'Organic Litchi Juice', price: 25.00, DelPrice: 30, img: LitchiIMG, rating: 0, type: 'Juice'},
    
  ],
    Snacks: [
    {id: 1, name: 'Spicy Banana Chips', price: 17, DelPrice: 22, img: BananaChipsIMG, rating: 0, type: 'Snacks'},
    {id: 2, name: 'Spicy Potato Chips', price: 15, DelPrice: 20, img: PotatoChipsIMG, rating: 0, type: 'Snacks'},
    {id: 3, name: 'Black Pepper Spice', price: 50, DelPrice: 55, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    ],
    DealofDay: [
    {id: 1, name: 'Mix Fruits Chocolate', price: 15, DelPrice: 20, img: ChocolateIMG, rating: 0, type: 'Snacks'},
    {id: 2, name: ' Fresh Apple Juice', price: 15, DelPrice: 20, img: AppleJice, rating: 0, type: 'Juice'},
    {id: 3, name: 'Mix Almond nuts juice pack', price: 20, DelPrice: 23, img: Almond, rating: 0, type: 'Juice'},
    {id: 4, name: 'Fresh Mango Juice', price: 7, DelPrice: 12, img: MangoJuiceIMG, rating: 0, type: 'Juice'},
    {id: 5, name: 'Black Pepper Spice', price: 32, DelPrice: 37, img: BlackPaperIMG, rating: 0, type: 'Snacks'},
    {id: 6, name: 'Organic Corn', price: 41, DelPrice: 53, img: CornIMG, rating: 0, type: 'Fruit'},
    
    ]

}




interface BannerSlide {
    id: number;
    Text: string;
    Flat: string;
    IMG: string;
    back: string;
    shop: string;
    Other: string;
    OtherII: string;
}

import Cucumber from './assets/Cucumber.png'
import Apple from './assets/Apple.png'
import Cheess from './assets/Cheess.png'


export const slides: BannerSlide[] = [
    {id: 1, Text: `Explore`, Other: `& Fresh Fruits`, 
        OtherII: 'Healthy' ,
        Flat: 'Flat 30% Off', IMG: Apple, back: '', 
        shop: 'Shop Now'},
    {id: 2, Text: `Explore`, OtherII: 'Warm', 
        Other: `Fast Food Fruits & Snacks`, 
        Flat: 'Flat 30% Off', IMG: Cheess, back: '', 
        shop: 'Shop Now'},
    {id: 3, Text: `Explore` , OtherII: 'Organic', 
        Other: `& Fresh Vegetables`, 
        Flat: 'Flat 30% Off', 
        IMG: Cucumber, back: '', 
        shop: 'Shop Now'}
]

import categoryIMG from './assets/categoryIMG.jpg'
 export const catIIMG: string = categoryIMG
import { iProduct  } from './types';
export const onQuickView =(product: iProduct)=> {
       console.log(product)
     }

       export const NavList = [
            {id: 1, Text: 'All' , span: '/', path: ''},
            {id: 2, Text: 'Snacks & Spicies', span: '/', path: 'snacks'},
            {id: 3, Text: 'Fruits', span: '/', path: 'fruits'},
            {id: 4, Text: 'Vegetables', path: 'vegetables'}
        ]

interface Supportlist {
    id: number;
    Text: string;
    Discription: string;
    IMG: string;
}
import shipping from './assets/shipping.png'
import supportimg from './assets/Support.png'
import Return from './assets/Return.png'
import Payment from './assets/Payment.png'

export const support: Supportlist[] = [
    {id: 1, Text: 'Free Shipping', Discription: 'Free shipping on all Us order or above $200', IMG: shipping},
    {id: 2, Text: '24x7 Support', Discription: 'Contact us 24 hours a day, 7 days a week', IMG: supportimg },
    {id: 3, Text: '30 Days Return', Discription: 'Simply return it within 30 days for an exchange', IMG: Return },
    {id: 4, Text: 'Payment Secure', Discription: 'Contact us 24 hours a day, 7 days a week', IMG: Payment },
]
import Vendro from './assets/Vendro.jpg'
import VendroII from './assets/VendroII.jpg'
import VendroIII from './assets/VendroIII.jpg'
import VendroIV from './assets/VendroIV.jpg'

import VendorLogo from './assets/vendorLogo.jpg'
import VendorLogoII from './assets/VendorLogoII.jpg'
import VendorLogoIII from './assets/VendorLogoIII.jpg'
import VendorLogoIV from './assets/VendorLogoIV.jpg'


//   const [selectVendor, setSelectVendor] = useState<Vendorl>(vendorList[0])
import { iVendors } from './types';

export const vendorList: iVendors[] = [
    {id: 1, Text: 'Mirah Fastion Pvt. Ltd',IMG: Vendro, Logo: VendorLogo,
            sales: 'Fruits (230) / Vegetables (300) / Snacks (1480)', TotalSales: '2500'},
    {id: 2, Text: 'Ellah Fastion Pvt. Ltd',IMG: VendroII, Logo: VendorLogoII,
            sales: 'Fruits (150) / Vegetables (450) / Snacks (905)', TotalSales: '3900'},
    {id: 3, Text: 'Mairo Fastion Group of Company', IMG: VendroIII, Logo: VendorLogoIII,
            sales: 'Fruits (30) / Vegetables (30) / Snacks (80)', TotalSales: '1500'},
    {id: 4, Text: 'Mairah Fastion Ltd',IMG: VendroIV, Logo: VendorLogoIV, 
            sales: 'Fruits (100) / Vegetables (94) / Snacks (10)', TotalSales: '900'}
]

import Isabella from './assets/Isabella.jpg'
import Nikki from './assets/Nikki.jpg'
import Smith from './assets/Smith.jpg'

interface Testimonial {
    id: number;
    Name: string;
    Discription: string;
    IMG: string;
    Post: string;
}
export const TestimonialsList: Testimonial[] =[
    {id: 1, Name: 'Isabella Oliver', IMG: Isabella, 
        Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui quaerat cupiditate earum repudiandae quae inventore blanditiis, voluptatum sapiente quasi minus reiciendis recusandae reprehenderit quos veritatis deleniti. Iusto, asperiores voluptate?', 
        Post: 'Manager' },
    {id: 2, Name: 'Nikki Albort', IMG: Nikki, 
        Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui quaerat cupiditate earum repudiandae quae inventore blanditiis, voluptatum sapiente quasi minus reiciendis recusandae reprehenderit quos veritatis deleniti. Iusto, asperiores voluptate?', 
        Post: 'Team Leader' },
    {id: 3, Name: 'Stephen Smith', IMG: Smith, 
        Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui quaerat cupiditate earum repudiandae quae inventore blanditiis, voluptatum sapiente quasi minus reiciendis recusandae reprehenderit quos veritatis deleniti. Iusto, asperiores voluptate?', 
        Post: 'Co Founder' }
]


// Define interfaces
interface iLocationData {
  [country: string]: {
    states: {
      [state: string]: string[];
    };
  };
}

// The locationData object
export const locationData: iLocationData = {
  USA: {
    states: {
      Alabama: ['Birmingham', 'Montgomery', 'Mobile'],
      Alaska: ['Anchorage', 'Fairbanks', 'Juneau'],
      Arizona: ['Phoenix', 'Tucson', 'Mesa'],
      Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville'],
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Colorado: ['Denver', 'Colorado Springs', 'Aurora'],
      Connecticut: ['Bridgeport', 'New Haven', 'Stamford'],
      Delaware: ['Wilmington', 'Dover', 'Newark'],
      Florida: ['Miami', 'Orlando', 'Tampa'],
      Georgia: ['Atlanta', 'Savannah', 'Augusta'],
      Hawaii: ['Honolulu', 'Hilo', 'Kailua'],
      Idaho: ['Boise', 'Meridian', 'Nampa'],
      Illinois: ['Chicago', 'Springfield', 'Naperville'],
      Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville'],
      Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport'],
      Kansas: ['Wichita', 'Overland Park', 'Kansas City'],
      Kentucky: ['Louisville', 'Lexington', 'Bowling Green'],
      Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport'],
      Maine: ['Portland', 'Lewiston', 'Bangor'],
      Maryland: ['Baltimore', 'Frederick', 'Rockville'],
      Massachusetts: ['Boston', 'Worcester', 'Springfield'],
      Michigan: ['Detroit', 'Grand Rapids', 'Warren'],
      Minnesota: ['Minneapolis', 'Saint Paul', 'Rochester'],
      Mississippi: ['Jackson', 'Gulfport', 'Southaven'],
      Missouri: ['Kansas City', 'St. Louis', 'Springfield'],
      Montana: ['Billings', 'Missoula', 'Great Falls'],
      Nebraska: ['Omaha', 'Lincoln', 'Bellevue'],
      Nevada: ['Las Vegas', 'Henderson', 'Reno'],
      NewHampshire: ['Manchester', 'Nashua', 'Concord'],
      NewJersey: ['Newark', 'Jersey City', 'Paterson'],
      NewMexico: ['Albuquerque', 'Las Cruces', 'Rio Rancho'],
      NewYork: ['New York City', 'Buffalo', 'Rochester'],
      NorthCarolina: ['Charlotte', 'Raleigh', 'Greensboro'],
      NorthDakota: ['Fargo', 'Bismarck', 'Grand Forks'],
      Ohio: ['Columbus', 'Cleveland', 'Cincinnati'],
      Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman'],
      Oregon: ['Portland', 'Eugene', 'Salem'],
      Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown'],
      RhodeIsland: ['Providence', 'Warwick', 'Cranston'],
      SouthCarolina: ['Columbia', 'Charleston', 'North Charleston'],
      SouthDakota: ['Sioux Falls', 'Rapid City', 'Aberdeen'],
      Tennessee: ['Nashville', 'Memphis', 'Knoxville'],
      Texas: ['Houston', 'Dallas', 'Austin'],
      Utah: ['Salt Lake City', 'West Valley City', 'Provo'],
      Vermont: ['Burlington', 'South Burlington', 'Rutland'],
      Virginia: ['Virginia Beach', 'Norfolk', 'Chesapeake'],
      Washington: ['Seattle', 'Spokane', 'Tacoma'],
      WestVirginia: ['Charleston', 'Huntington', 'Morgantown'],
      Wisconsin: ['Milwaukee', 'Madison', 'Green Bay'],
      Wyoming: ['Cheyenne', 'Casper', 'Laramie'],
    }
  },
  Canada: {
    states: {
      Alberta: ['Calgary', 'Edmonton', 'Red Deer'],
      BritishColumbia: ['Vancouver', 'Victoria', 'Kelowna'],
      Manitoba: ['Winnipeg', 'Brandon', 'Steinbach'],
      NewBrunswick: ['Moncton', 'Saint John', 'Fredericton'],
      NewfoundlandAndLabrador: ['St. John\'s', 'Mount Pearl', 'Corner Brook'],
      NorthwestTerritories: ['Yellowknife', 'Hay River', 'Inuvik'],
      NovaScotia: ['Halifax', 'Sydney', 'Dartmouth'],
      Nunavut: ['Iqaluit', 'Rankin Inlet', 'Arviat'],
      Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
      PrinceEdwardIsland: ['Charlottetown', 'Summerside', 'Stratford'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      Saskatchewan: ['Saskatoon', 'Regina', 'Prince Albert'],
      Yukon: ['Whitehorse', 'Dawson City', 'Watson Lake'],
    }
  },
  UK: {
    states: {
      England: ['London', 'Manchester', 'Liverpool'],
      Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
      Wales: ['Cardiff', 'Swansea', 'Newport'],
      'Northern Ireland': ['Belfast', 'Derry', 'Lisburn'],
    }
  },
  Australia: {
    states: {
      'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
      Victoria: ['Melbourne', 'Geelong', 'Ballarat'],
      Queensland: ['Brisbane', 'Gold Coast', 'Cairns'],
      'Western Australia': ['Perth', 'Fremantle', 'Bunbury'],
      'South Australia': ['Adelaide', 'Mount Gambier', 'Whyalla'],
      Tasmania: ['Hobart', 'Launceston', 'Devonport'],
      'Australian Capital Territory': ['Canberra'],
      'Northern Territory': ['Darwin', 'Alice Springs', 'Palmerston'],
    }
  },
  Nigeria: {
    states: {
      Abia: ['Umuahia', 'Aba', 'Ohafia'],
      Adamawa: ['Yola', 'Mubi', 'Numan'],
      AkwaIbom: ['Uyo', 'Eket', 'Ikot Ekpene'],
      Anambra: ['Awka', 'Onitsha', 'Nnewi'],
      Bauchi: ['Bauchi', 'Azare', 'Misau'],
      Bayelsa: ['Yenagoa', 'Brass', 'Ogbia'],
      Benue: ['Makurdi', 'Gboko', 'Otukpo'],
      Borno: ['Maiduguri', 'Biu', 'Damboa'],
      CrossRiver: ['Calabar', 'Ikom', 'Ogoja'],
      Delta: ['Asaba', 'Warri', 'Sapele'],
      Ebonyi: ['Abakaliki', 'Afikpo', 'Onueke'],
      Edo: ['Benin City', 'Auchi', 'Ekpoma'],
      Ekiti: ['Ado Ekiti', 'Ikere', 'Ilawe'],
      Enugu: ['Enugu', 'Nsukka', 'Awgu'],
      Gombe: ['Gombe', 'Kaltungo', 'Dukku'],
      Imo: ['Owerri', 'Orlu', 'Okigwe'],
      Jigawa: ['Dutse', 'Hadejia', 'Birnin Kudu'],
      Kaduna: ['Kaduna', 'Zaria', 'Kafanchan'],
      Kano: ['Kano', 'Wudil', 'Gaya'],
      Katsina: ['Katsina', 'Daura', 'Funtua'],
      Kebbi: ['Birnin Kebbi', 'Argungu', 'Yauri'],
      Kogi: ['Lokoja', 'Okene', 'Idah'],
      Kwara: ['Ilorin', 'Offa', 'Omu-Aran'],
      Lagos: ['Ikeja', 'Epe', 'Badagry'],
      Nasarawa: ['Lafia', 'Keffi', 'Akwanga'],
      Niger: ['Minna', 'Suleja', 'Bida'],
      Ogun: ['Abeokuta', 'Ijebu Ode', 'Sagamu'],
      Ondo: ['Akure', 'Ondo', 'Owo'],
      Osun: ['Osogbo', 'Ife', 'Ilesa'],
      Oyo: ['Ibadan', 'Ogbomosho', 'Oyo'],
      Plateau: ['Jos', 'Pankshin', 'Barkin Ladi'],
      Rivers: ['Port Harcourt', 'Bonny', 'Omoku'],
      Sokoto: ['Sokoto', 'Tambuwal', 'Wurno'],
      Taraba: ['Jalingo', 'Wukari', 'Bali'],
      Yobe: ['Damaturu', 'Potiskum', 'Nguru'],
      Zamfara: ['Gusau', 'Kaura Namoda', 'Anka'],
      FCT: ['Abuja', 'Gwagwalada', 'Kuje'],
    }
  }
};