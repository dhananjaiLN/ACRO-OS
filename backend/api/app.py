from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.websocket import router as websocket_router
from api.live_analysis import router as live_router

from api.routes import router

app = FastAPI(
    title="Adaptive Cloud Resource Orchestrator",
    version="1.0.0",
    description="Backend API for ACRO"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(live_router)
app.include_router(websocket_router)