from fastapi import APIRouter
from pydantic import BaseModel
from service.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()

class Message(BaseModel):
    content: str

@router.post("/chat")
def chat(msg: Message):
    reply = llm_service.get_reply(msg.content)
    return {"reply": reply}
# 0411早上好ujgcvhj