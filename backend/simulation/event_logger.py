from collections import deque
import time


class EventLogger:

    def __init__(self):

        self.events = deque(maxlen=300)

    def info(self,message):

        self.events.append({

            "time":time.strftime("%H:%M:%S"),

            "level":"INFO",

            "message":message

        })

    def warning(self,message):

        self.events.append({

            "time":time.strftime("%H:%M:%S"),

            "level":"WARNING",

            "message":message

        })

    def error(self,message):

        self.events.append({

            "time":time.strftime("%H:%M:%S"),

            "level":"ERROR",

            "message":message

        })

    def get_events(self):

        return list(self.events)
    
    def success(self, message):

        self.events.append({

            "time": time.strftime("%H:%M:%S"),

            "level": "SUCCESS",

            "message": message

        })