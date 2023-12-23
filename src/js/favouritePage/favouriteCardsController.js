import FavouritesCards from "./favouritesCardsModel";
import * as view from './favouriteCardsView.js'


export default async function (state){
    
    //Получить список объектов которые в избранном
    const favsList = state.favourites.favs;
    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    //Отображаем контейнер и карточки
    view.renderPage(favouriteCards.cards)
    
    
    //Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener()

    //Функция для работы иконок "Добавить в избранное"
    function addToFavsListener(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
        
                //Находим ID объекта по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;
              
                //Добавляем/Убираем элемент из избранного
                state.favourites.toggleFav(currentId);
                
                //Включаем/Выключаем иконку избранного
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            })
        })
    }
    
}