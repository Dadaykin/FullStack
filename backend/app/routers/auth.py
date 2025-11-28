

@router.post("/register")
def register(username: str, password: str):
    return {"message": "Регистрация успешна"}

@router.post("/login")
def login():
    "аутентификация"
    return {"message": "аутентификация успешна"}


@router.get("/me")
def get_my_profile(user: dict = Depends(get_current_user)):
    """Получение информации о текущем пользователе"""
    pass


@router.put("/me/update")
def update_my_profile(user_data: dict, user: dict = Depends(get_current_user)):
    """Редактирование информации профиля (имя, email и т.д.)"""
    pass



@router.put("/me/password")
def change_password(old_password: str, new_password: str, user: dict = Depends(get_current_user)):
    """Изменение пароля пользователя"""
    pass


@router.delete("/me")
def delete_my_account(user: dict = Depends(get_current_user)):
    """Удаление собственного аккаунта"""
    pass


