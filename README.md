# TopKino project

 * Сайт: http://topkino.tv
 * Дизайн и Front-end: [Jekins Designs](http://jekins.ru)


#### Установка необходимых компонентов:

* Установить Node.js: https://nodejs.org/
* Установить Grunt.js: ```npm i -g grunt-cli```


#### Сборка проекта:

* В консоли перейти в корень проекта
* Выполнить команду ```npm i```


#### Запуск проекта:

* Компиляция файлов проекта, команда: ```grunt```
* Запуск [сервера](http://localhost:7777/) и вотчера, команда: ```grunt serve```
* Запуск только вотчера, команда: ```grunt watch```
* Минификация изображений: ```grunt img```


#### Добавление блоков [БЭМ](https://ru.bem.info/method/naming-convention/):

* В корне проекта выполнить команду: ```./add название-блока less js```


===
## Для Windows:

* Уствновить CygWin: https://www.cygwin.com/
* В Cygwin перейти в корень проекта
* Выполнить команду: ```tr -d '\r' < add > add```
* Выполнить команду: ```chmod 777 add```