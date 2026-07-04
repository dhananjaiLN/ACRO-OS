from monitoring.process_monitor import ProcessMonitor

from os_scheduler.process_adapter import ProcessAdapter


class WorkloadBuilder:

    EXCLUDED_NAMES = {
        "System Idle Process",
        "Idle",
        "Registry"
    }

    EXCLUDED_STATUS = {
        "stopped",
        "zombie"
    }

    @classmethod
    def build(
        cls,
        top_n=20,
        min_cpu=0.5,
        min_memory=0.2
    ):

        raw_processes = ProcessMonitor.get_processes()

        filtered = []

        for process in raw_processes:

            if process["name"] in cls.EXCLUDED_NAMES:
                continue

            if process["status"] in cls.EXCLUDED_STATUS:
                continue

            if (
                process["cpu_percent"] < min_cpu
                and
                process["memory_percent"] < min_memory
            ):
                continue

            filtered.append(process)

        filtered.sort(
            key=lambda p: (
                p["cpu_percent"],
                p["memory_percent"]
            ),
            reverse=True
        )

        filtered = filtered[:top_n]

        return ProcessAdapter.convert(filtered)