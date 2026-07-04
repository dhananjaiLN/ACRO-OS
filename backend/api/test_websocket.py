import asyncio
import websockets


async def test():

    uri = "ws://localhost:8000/ws/live"

    async with websockets.connect(uri) as websocket:

        while True:
            message = await websocket.recv()
            print(message)


asyncio.run(test())