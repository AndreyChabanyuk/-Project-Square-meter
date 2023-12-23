

import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventImitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel.js'
import Bids from './bids/bidsModel.js'




const state = {
    results: [],
    emitter: new EventImitter(),
    favourites: new Favourites()
}


//Маршруты
const routes = [ 
    { path: '/', component: homePage },  // Главная страница
    { path: 'item', component: singleItem  },// Открытие отдельной страницы с объектом
    { path: 'favourites', component: favouritesPage },// Маршрут для избранного
    { path: 'bids', component: bidsPage },//Маршрут для страницы с заявками
];


// Функция которая будет принимать в себя маршрут 
// и будет выдавать название компонента который нужно запустить

function findComponentByPath (path, routes){
    return routes.find(function(route){
        return route.path === path;
    });
}


async function renderCount(state){

    if(!state.bids) state.bids = new Bids()
    await state.bids.getBids()
    
    const html = `<i class="fas fa-file-alt"></i>${state.bids.bids.length} Заявки`
    document.querySelector('#bids-count').innerHTML = html
    
    if(!state.favourites) state.favourites = new Favourites()

    const markup = `<i class="fas fa-heart"></i>${state.favourites.favs.length} Избранное`
    document.querySelector('#favs-count').innerHTML = markup
    
}




//Задача роутера - понять что написано в адресной строке
// Достать нужный блок текста из нее- маршрут после домена сайта
// По домену сделать поиск внутри роутс
function router(){

    // Получаем адрес

    const pathArray = location.hash.split('/');

     // Преобразуем для получения названия маршрута 
    // и названия компонента необходимый для отображения

    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath;


    //Save route params
    state.routeParams = pathArray[2] ? pathArray[2] : '';

// Записываем в переменную название компонента которое соответствует данному пути
    // Если что-то было найдено это запишется в компонент
    // Если ничего не было найдено то вернется пустой объект и
    // в компонент будет записан errorPage

    const { component = errorPage } =
        findComponentByPath(currentPath, routes) || {};
        
    component(state);
}


window.addEventListener('hashchange', router);
window.addEventListener('load',router);
window.addEventListener('load', renderCount)