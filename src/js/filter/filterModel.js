export default class Filter {
    constructor (){
        this.query = ''
    }

    async getParams(){
        try {
            const queryString = 'https://jsproject.webcademy.ru/itemsinfo'
            //Запрос к ссылке - будет промис с ответом от сервера
            const response = await fetch(queryString);
            //Возвращает промис с нормальным JS объекта
            const data = await response.json();
            //Достаем этот объект - this.params свойство объекта филтер
            this.params = await data
        } catch (error) {
            alert(error)
        }
        
    }

     //Получение данных с сервера при старте страницы
     async getResults(){
        try{
            const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = await data;
        }catch{
            alert("Error")
        }
    }


}