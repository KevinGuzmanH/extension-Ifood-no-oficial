
setTimeout(() => {
  console.clear();
  console.log("working1");

async function getAllData(){
    
  let url = 'https://marketplace.ifood.com.br/v2/merchants?latitude=6.25000626&longitude=-75.56267685&page=0&channel=COMEYA&size=30&features=&categories=&payment_types=&delivery_fee_from=0&delivery_fee_to=10000&delivery_time_from=0&delivery_time_to=240';

  let headers = {
    'sec-ch-ua-mobile':	'?0',
    'User-Agent':	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua':	'"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'Accept':	'*/*',
    'Sec-Fetch-Site':	'none',
    'Sec-Fetch-Mode':	'cors',
    'Sec-Fetch-Dest':	'empty',
    'Accept-Encoding':	'gzip, deflate, br',
    'Accept-Language':	'en,es-US;q=0.9,es-419;q=0.8,es;q=0.7'
  };

  const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      },
     );
    
     
      let restaurantData = await response.json();

      restaurantData = restaurantData.merchants.map( tienda => tienda);
      
      restaurantData.sort((a,b) => (a.userRating > b.userRating) ? 1 : -1);
      console.log(restaurantData);

      for (let index = 0; index < restaurantData.length; index++) {
         restaurantData[index].prop = 'catalog';
         restaurantData[index].catalog = await getRestaurantCatalog(restaurantData[index].id).then(x => x);
         restaurantData[index].prop = 'avgPrice';
         restaurantData[index].avgPrice = await calculateAverage(restaurantData[index].catalog.data.menu).then(x => x);
      }

      restaurantData.sort((a,b) => (a.avgPrice > b.avgPrice) ? 1 : -1);
      console.log(restaurantData);

};

getAllData();

async function calculateAverage(menu){
  let price = 0;
  let items = 0;

  for (let index = 0; index < menu.length; index++) {
    menu[index].itens.forEach(element => {
        price += element.unitMinPrice;
        items++;
    });    
  }
  
  const average = price/items;

  return average
  
}

async function getRestaurantCatalog(restaurantID){
    
  let url = `https://wslatam.ifood.com.br/ifood-ws-v3/v1/merchants/${restaurantID}/catalog`;

  let headers = {
    'authority': 'wslatam.ifood.com.br',
    'method': 'GET',
    'path': '/ifood-ws-v3/v1/merchants/b1d67ffd-d89c-4db6-96ee-6bce291bcdef/catalog',
    'scheme': 'https',
    'accept': 'application/json, text/plain, */*',
    'accept-encoding':'gzip, deflate, br',
    'accept-language': 'es-CO',
    'access_key': 'f5dd1b64-e336-4fb1-ac13-55bf2d555daa',
    'account_id': '3d8034f7-dbd8-4fa5-8fdc-a25099ce4dee',
    'app_version': '9.43.0',
    'browser': 'Windows',
    'cache-control': 'no-cache, no-store',
    'origin': 'https://www.ifood.com.co',
    'platform': 'Desktop',
    'referer': 'https://www.ifood.com.co/',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'secret_key': 'd4f7f5a6-bd40-4ce2-83b9-9b0205f593a3',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'x-ifood-session-id': 'b35c116e-e3f6-4f6f-b604-12e927e5e9e2',
  };

  const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      },
     );
    return response.json(); 
  ;

};

let buttonsContainer = document.querySelector('#restaurants-list > div:nth-child(2) > div > div > div > div > div');
let pageButton = document.querySelector('#restaurants-list > div:nth-child(2) > div > div > div > div > div > div:nth-child(4)');

let newButton = document.createElement('div');

}, 11000);