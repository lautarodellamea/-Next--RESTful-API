// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"


/* 
Esta sera la fomra de la cookie, no guardo el precio, solo el id y valor acumulado
El usuario no podra manipular el precio en las cookies
cookie: cart
{
'uui-123-1': 4,
'uui-123-2': 2,
'uui-123-3': 1
}
*/


export const getCookieCart = (): { [id: string]: number } => {

  if (hasCookie('cart')) {
    // cart:"%7B%22UUID-ABC-1%22%3A1%2C%22UUID-ABC-2%22%3A5%7D" la veremos asi en inspeccionar del navegador porque viaja como un string y esta es la serializacion 
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
    return cookieCart
  }


  return {}
}


export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))

}



export const removeProductFromCart = (id: string) => {

  const cookieCart = getCookieCart()

  delete cookieCart[id]

  setCookie('cart', JSON.stringify(cookieCart))

}



export const removeSingleItemFromCart = (id: string) => {

  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie('cart', JSON.stringify(cookieCart));
}