from fastapi import APIRouter

router = APIRouter(prefix="/damage", tags=["damage"])

@router.get("/")
def get_damage_list():
    # Возв список загруженных изображений и результатов анализа.
    return {"message": "Здесь будет список повреждений"}


@router.post("/upload")
async def upload_image():
    #Реализация загрузки изображений
    return {"message": "Изображение успешно загружено"}


@router.post("/analyze")
def analyze_damage():
    """
    Принимает изображение, отправляет в модель,
    сохраняет результат и возвращает его.
    """
    # здесь будет вызов нейросети
    return {"result": "Здесь будет результат анализа фото"}


