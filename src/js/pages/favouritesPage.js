import favouriteCards from './../favouritePage/favouriteCardsController.js'


export default function (state){
    document.querySelector('#app').innerHTML = ''
    
   favouriteCards(state)
   
}