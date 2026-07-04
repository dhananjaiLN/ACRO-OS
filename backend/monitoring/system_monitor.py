import platform
import psutil
from datetime import datetime


class SystemMonitor:

    @staticmethod
    def get_cpu_info():
        return {
            "usage_percent": psutil.cpu_percent(),
            "physical_cores": psutil.cpu_count(logical=False),
            "logical_cores": psutil.cpu_count(logical=True),
            "frequency": psutil.cpu_freq().current if psutil.cpu_freq() else None
        }

    @staticmethod
    def get_memory_info():
        memory = psutil.virtual_memory()

        return {
            "total": memory.total,
            "available": memory.available,
            "used": memory.used,
            "usage_percent": memory.percent
        }

    @staticmethod
    def get_swap_info():
        swap = psutil.swap_memory()

        return {
            "total": swap.total,
            "used": swap.used,
            "free": swap.free,
            "usage_percent": swap.percent
        }

    @staticmethod
    def get_disk_info():
        disk = psutil.disk_usage("/")

        return {
            "total": disk.total,
            "used": disk.used,
            "free": disk.free,
            "usage_percent": disk.percent
        }

    @staticmethod
    def get_system_info():
        boot_time = datetime.fromtimestamp(psutil.boot_time())

        return {
            "system": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "machine": platform.machine(),
            "processor": platform.processor(),
            "boot_time": boot_time.strftime("%Y-%m-%d %H:%M:%S")
        }

    @classmethod
    def collect(cls):
        return {
            "system": cls.get_system_info(),
            "cpu": cls.get_cpu_info(),
            "memory": cls.get_memory_info(),
            "swap": cls.get_swap_info(),
            "disk": cls.get_disk_info()
        }