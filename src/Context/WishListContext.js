import axios from "axios";
import { createContext } from "react";

export let WishContext =createContext(0);

let userToken = localStorage.getItem('userToken');
let headers = {token: userToken}

function addToWishList(productId) {
    return axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',
    {productId:productId},
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}

function removeFromWishList(productId) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}
function getWishList() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist',
    {headers})
    .then((response)=> response)
    .catch((err)=>err)
}

export default function WishContextProvider(props) {
    return <WishContext.Provider value={{addToWishList, getWishList, removeFromWishList}}>
        {props.children}
    </WishContext.Provider>
}