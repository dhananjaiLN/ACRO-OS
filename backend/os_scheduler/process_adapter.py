from monitoring.process_monitor import ProcessMonitor

from os_scheduler.process import Process


class ProcessAdapter:

    @staticmethod
    def _estimate_burst_time(cpu_percent: float, threads: int) -> float:
        """
        Estimate CPU burst time from live process characteristics.

        This is a heuristic, since operating systems do not expose
        the remaining CPU burst of a running process.
        """

        burst = max(cpu_percent * 0.5 + threads * 0.2, 1.0)

        return round(burst, 2)

    @staticmethod
    def _estimate_priority(cpu_percent: float) -> int:
        """
        Estimate scheduling priority.

        Higher CPU usage -> higher priority in our analysis model.
        """

        if cpu_percent >= 70:
            return 1

        if cpu_percent >= 40:
            return 2

        if cpu_percent >= 20:
            return 3

        if cpu_percent >= 10:
            return 4

        return 5

    @classmethod
    def convert(cls, processes=None):

        if processes is None:
            processes = ProcessMonitor.get_processes()

        adapted = []

        for process in processes:

            adapted.append(

                Process(

                    pid=process["pid"],

                    name=process["name"],

                    arrival_time=0.0,

                    burst_time=cls._estimate_burst_time(
                        process["cpu_percent"],
                        process["threads"]
                    ),

                    priority=cls._estimate_priority(
                        process["cpu_percent"]
                    ),

                    cpu_usage=process["cpu_percent"],

                    memory_usage=process["memory_percent"],

                    threads=process["threads"]

                )

            )

        return adapted