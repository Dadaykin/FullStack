from fastapi import APIRouter

router = APIRouter(prefix="/damage", tags=["damage"])

@router.get("/")
def get_damage_list():
    return {"message": "Здесь будет список оценок повреждений"}

@router.post("/analyze")
def analyze_damage():
    return {"result": "Здесь будет результат анализа фото"}
