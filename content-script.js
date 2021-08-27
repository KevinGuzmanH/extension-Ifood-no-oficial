setTimeout(() => {
  
  console.clear();
  console.log("working1");


  async function getAllData() {
    let url =
      `https://marketplace.ifood.com.br/v2/merchants?latitude=6.25000626&longitude=-75.56267685&page=0&channel=COMEYA&size=55&features=&categories=&payment_types=&delivery_fee_from=0&delivery_fee_to=10000&delivery_time_from=0&delivery_time_to=240`;

    let headers = {
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      Accept: "*/*",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en,es-US;q=0.9,es-419;q=0.8,es;q=0.7",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    let restaurantData = await response.json();

    restaurantData = restaurantData.merchants.map((tienda) => tienda);

    restaurantData.sort((a, b) => (a.userRating > b.userRating ? 1 : -1));

    for (let index = 0; index < restaurantData.length; index++) {
      restaurantData[index].prop = "catalog";
      restaurantData[index].catalog = await getRestaurantCatalog(
        restaurantData[index].id
      ).then((x) => x);
      restaurantData[index].prop = "avgPrice";
      restaurantData[index].avgPrice = await calculateAverage(
        restaurantData[index].catalog.data.menu
      ).then((x) => x);
    }

    restaurantData.sort((a, b) => (a.avgPrice > b.avgPrice ? 1 : -1));
    console.log(restaurantData);
    return restaurantData.slice(1,16);
  }

  getAllData();

  async function calculateAverage(menu) {
    let price = 0;
    let items = 0;

    for (let index = 0; index < menu.length; index++) {
      menu[index].itens.forEach((element) => {
        price += element.unitMinPrice;
        items++;
      });
    }

    const average = price / items;

    return average;
  }

  async function getRestaurantCatalog(restaurantID) {
    let url = `https://wslatam.ifood.com.br/ifood-ws-v3/v1/merchants/${restaurantID}/catalog`;

    let headers = {
      authority: "wslatam.ifood.com.br",
      method: "GET",
      path: "/ifood-ws-v3/v1/merchants/b1d67ffd-d89c-4db6-96ee-6bce291bcdef/catalog",
      scheme: "https",
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "es-CO",
      access_key: "f5dd1b64-e336-4fb1-ac13-55bf2d555daa",
      account_id: "3d8034f7-dbd8-4fa5-8fdc-a25099ce4dee",
      app_version: "9.43.0",
      browser: "Windows",
      "cache-control": "no-cache, no-store",
      origin: "https://www.ifood.com.co",
      platform: "Desktop",
      referer: "https://www.ifood.com.co/",
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      secret_key: "d4f7f5a6-bd40-4ce2-83b9-9b0205f593a3",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "x-ifood-session-id": "b35c116e-e3f6-4f6f-b604-12e927e5e9e2",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return response.json();
  }

  let buttonsContainer = document.querySelector("#__next > div > header > div");
  let newBtn = `<a class="btn btn--link btn--size-m btn--iconize responsive-header__button" role="button" 
              aria-label="Promociones" tabindex="0" style="width: unset;">probando</a>`;

  buttonsContainer.insertAdjacentHTML("afterBegin", newBtn);

  let title = `<div class="restaurants-list__header"><h2 class="title" tabindex="0">Restaurantes con mejores precios en promedio - Analizados 300 Restaurantes</h2></div>`;

  let parentSection = document.querySelector("#__next > div > main > div > div.discoveries-container");

  let newSection = `<ul id="newSection" class="restaurants-list__container" aria-label="Restaurantes"></ul>`;

  parentSection.insertAdjacentHTML('beforeEnd',newSection);
  let restaurantslist = document.querySelector('#newSection');
  restaurantslist.insertAdjacentHTML('beforebegin',title);

        function put(restaurant) {

          let item = `<li class="restaurants-list__item-wrapper"><a class="restaurant-card__link" tabindex="0" data-test-id="restaurant-item-link" 
          href="/delivery/${restaurant.slug}/${restaurant.id}"><div class="restaurant-card">
          <div class="restaurant-card__figure"><img loading="lazy" src="https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/${restaurant.resources[0].fileName}" 
          alt="${restaurant.name}" class="restaurant-card__img-logo" crossorigin="anonymous"></div><h3 class="restaurant-card__title"><div class="restaurant-card__header">
          <span style="color: #3e3e3e;font-size: 0.875rem;line-height: 0.875rem;font-weight: 500;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: block; height: 18px;" class="${restaurant.name}">${restaurant.name}</span></div><div class="restaurant-card__info">
          <span aria-label="Evaluación: ${restaurant.userRating.toFixed(1)}" tabindex="0" class="restaurant-rating" data-test-id="restaurant-rating__evaluation">
          <span class="icon-marmita icon-marmita--star"><svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.483.314l1.128 2.39a.54.54 0 0 0 .405.308l2.522.383c.442.067.618.635.299.96l-1.825 1.86a.58.58 0 0 0-.155.499l.43 2.626c.076.46-.386.811-.78.594L5.25 
          8.694a.518.518 0 0 0-.502 0l-2.255 1.24c-.395.217-.857-.134-.782-.594l.431-2.626a.58.58 0 0 0-.155-.499L.163 4.355c-.32-.326-.143-.893.299-.96l2.522-.383a.54.54 0 0 0 
          .405-.308L4.517.314a.528.528 0 0 1 .966 0z"></path></svg></span>${restaurant.userRating.toFixed(1)}</span><span class="restaurant-card__separator"> • </span>${restaurant.mainCategory.name}<span class="restaurant-card__separator">
           • </span>${restaurant.distance} km</div></h3><div class="restaurant-card__footer"><div class="restaurant-card__mini-tag default">${restaurant.deliveryTime}-${restaurant.deliveryTime+10} min</div><span class="restaurant-card__separator">
            • </span><div class="restaurant-card__mini-tag nowrap">Envío $ ${restaurant.deliveryFee.value}</div></div></div></a></li>`;

          let newSection = document.querySelector('#newSection');
          newSection.insertAdjacentHTML('beforeEnd',item)
        }

        getAllData().then(
          restaurant => {restaurant.forEach(r => put(r))} 
        )
          
        
        
    
  }, 10000);
