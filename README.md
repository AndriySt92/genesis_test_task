## Опис завдання

💡 Твоя задача — створити застосунок для навчання. Для цього вже підготовлено API —[https://www.postman.com/aninix/workspace/genesis-front-end-school/overview](https://www.postman.com/aninix/workspace/genesis-front-end-school/overview), його необхідно буде форкнути у свій акаунт postman та можна працювати.

Застосунок має гарно виглядати, але для інженера код важливіший. Тому можна вільно використати готові UI-бібліотеки. На ваш розсуд, які дані ви будете показувати користувачу.


Додаток містить дві сторінки:

- сторінка з курсами;
- сторінка з переглядом курсу;

Детально про сторінки:

- В стрічці з курсами необхідно відобразити останні 10 курсів. Курс містить:
    - Фото курсу.
    - Заголовок курсу.
    - Кількість уроків, навички та рейтинг.
    - На сторінці виводимо 10 курсів і додаємо пагінацію.
    - Додатково:
        - при ховері відтворювати відео без звуку.
- На сторінці з переглядом курсу відображається перше відео з даного курсу, деталі про курс та список уроків:
    - При кліку на урок (якщо він не заблокований) для перегляду відкриється поточне відео, користувач повинен розуміти, який урок з курсу переглядає.
    - Необхідно зберігати прогрес перегляду відео та уроку курсу (зберігати локально).
    - Якщо урок заблокований показати це користувачу.
    - Додатково:
        1. Зробити функціонал picture in picture (без сторонніх бібліотек):
            - Відео можна вивести поверх сторінки при кліку. При цьому відео знаходиться у правому нижньому куті сторінки й можна ходити по інших сторінках.
        2. Додати зміну швидкості програвання відео через клавіатуру (без сторонніх бібліотек) (комбінація клавіш на власний розсуд):
            - Так же вивести інформацію біля відео як цим користуватись.

Додаткові завдання:

- пропрацювати помилки від API (помилка мережі, ...);
- адаптив під мобільну версію;
- анімація завантаження відео;
- код покритий тестами;
_____

## Опис виконання завдання

В ході виконання завдання було виконанно всі пункти завдань окрім двох додаткових завдань: 
- пропрацювати помилки від API (помилка мережі, ...);
- код покритий тестами;

Під час виконання завдання виникли труднощі з відворення відео, оскільки формат відео m3u8. Даний формат не підтримується нативним HTML5 плеєром, тому було встановленно пакет react-hls-player для відворення даного формату. 

Додатково було додано функціонал для переключання відео на сторінці з переглядом відео курсу, однак деякі відео видають помилку 404 тому не відтворюються. Нажаль не вистачило часу реалізувати функціонал з повідомленням користувача при виникання даної помилки.

Також цікавим завданням було б реалізувати на сторінці відтворення відео, функціонал з відновленням прогресу перегляду курсу. Для цього потрібно зберігати в localStorage прогрес кожного уроку у вигляді масиву об'єктів із ключами:
  - id курсу
  - Номер уроку
  - Прогрес відео уроку
  
Та за допомогою useEffect встановлювати дані в useState після монтування розмітки.

## Використанні технології

 - React
 - Redux(redux-toolkit)
 - Typescript
 - SCSS
 - HTML

