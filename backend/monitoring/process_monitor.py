import time
import psutil


class ProcessMonitor:

    @staticmethod
    def get_processes(
        limit=None,
        observation_time=2.0
    ):

        process_map = {}

        # Prime CPU counters
        for process in psutil.process_iter():
            try:
                process.cpu_percent(None)
            except (
                psutil.NoSuchProcess,
                psutil.AccessDenied,
                psutil.ZombieProcess
            ):
                pass

        time.sleep(observation_time)

        for process in psutil.process_iter(
            [
                "pid",
                "name",
                "username",
                "status",
                "memory_percent",
                "num_threads",
                "create_time"
            ]
        ):
            try:

                cpu = process.cpu_percent(None)

                info = process.info

                process_map[info["pid"]] = {
                    "pid": info["pid"],
                    "name": info["name"],
                    "user": info["username"],
                    "status": info["status"],
                    "cpu_percent": round(cpu, 2),
                    "memory_percent": round(
                        info["memory_percent"],
                        2
                    ),
                    "threads": info["num_threads"],
                    "created": info["create_time"]
                }

            except (
                psutil.NoSuchProcess,
                psutil.AccessDenied,
                psutil.ZombieProcess
            ):
                continue

        processes = list(process_map.values())

        processes.sort(
            key=lambda process: (
                process["cpu_percent"],
                process["memory_percent"]
            ),
            reverse=True
        )

        if limit:
            return processes[:limit]

        return processes

    @staticmethod
    def get_process_count():

        return len(psutil.pids())

    @classmethod
    def collect(cls):

        return {
            "total_processes": cls.get_process_count(),
            "processes": cls.get_processes()
        }