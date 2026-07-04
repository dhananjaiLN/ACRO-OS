import asyncio
import traceback

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from monitoring.collector import MonitoringCollector

router = APIRouter()


@router.websocket("/ws/live")
async def live_monitor(websocket: WebSocket):

    await websocket.accept()

    print("WebSocket connected")

    try:

        while True:

            try:
                data = MonitoringCollector.collect()

                await websocket.send_json(data)

                print("Packet sent")

            except Exception as e:
                print("ERROR SENDING DATA")
                traceback.print_exc()
                break

            await asyncio.sleep(1)

    except WebSocketDisconnect:
        print("Client disconnected")