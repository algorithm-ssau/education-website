# Описание API
## Регистрация нового пользователя:  
  URL: http://127.0.0.1:8000/api/users/  
Request Body: 
```
{
    "user": {
        "username": "user1",
        "email": "user1@user.user",
        "password": "qweasdzxc"
    }
}
```
## Залогиниться 
URL: http://127.0.0.1:8000/api/users/login/  
Request Body: 
```
{
    "user": {
        "username": "user1",
        "email": "user1@user.user",
        "password": "qweasdzxc"
    }
}
```
## Изменить данные пользователя 
URL: http://127.0.0.1:8000/api/user  
Headers: Authorization: Token <токен пользователя>  
Request Body:  
```
{
    "user": {
        "username": "новое имя",
        "email": "новая почта",
        "password": "новый пароль"
    }
}
```
## Создать курс
URL: http://127.0.0.1:8000/create_course/  
Headers: Authorization: Token <токен пользователя>  
Request Body:  
```
{
    "title": "Название курса",
    "description": "Описание курса"
}
```
## Добавить блок с теорией в курс
URL: http://127.0.0.1:8000/courses/course_id/add_theory_block/  
Headers: Authorization: Token <токен пользователя>  
Request Body:  
```
{
    "text": "Текст теории",
    "video_url": "https://example.com/video",
    "image": null,
    "captioned_image": null,
    "caption": "Подпись к изображению"
}
```
## Добавить задание в курс  
URL: http://127.0.0.1:8000/courses/course_id/add_task_block/  
Headers: Authorization: Token <токен пользователя>  
Request Body:  
```
{
    "task_text": "Описание задания",
    "comment": "Комментарий"
}
```