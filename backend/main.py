from fastapi import FastAPI
from api.chat import router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
#运行的时候，连前端一起挂载
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")
@app.get("/")
def home():
    return {"message": "服务运行成功"}
#早上好