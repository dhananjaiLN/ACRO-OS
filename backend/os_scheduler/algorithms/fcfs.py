from copy import deepcopy
from os_scheduler.timeline import TimelineEvent

class FCFSScheduler:

    name = "FCFS"

    @staticmethod
    def schedule(processes):

        processes = deepcopy(processes)

        processes.sort(
            key=lambda p: (
                p.arrival_time,
                p.pid
            )
        )
        timeline = []
        current_time = 0.0

        for process in processes:

            if current_time < process.arrival_time:
                current_time = process.arrival_time

            process.waiting_time = (
                current_time - process.arrival_time
            )

            if process.response_time == -1:
                process.response_time = process.waiting_time

            timeline.append(

                TimelineEvent(

                    pid=process.pid,

                    name=process.name,

                    start=current_time,

                    end=current_time + process.burst_time,

                    algorithm="FCFS"

                )

            )

            current_time += process.burst_time

            process.completion_time = current_time

            process.turnaround_time = (
                process.completion_time
                - process.arrival_time
            )

            process.remaining_time = 0.0

            process.started = True

            process.finished = True

        return {

            "processes": processes,

            "timeline": timeline

        }