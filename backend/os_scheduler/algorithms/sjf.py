from copy import deepcopy
from os_scheduler.timeline import TimelineEvent

class SJFScheduler:

    name = "SJF"

    @staticmethod
    def schedule(processes):

        processes = deepcopy(processes)

        remaining = sorted(
            processes,
            key=lambda p: (
                p.arrival_time,
                p.burst_time,
                p.pid
            )
        )

        completed = []
        timeline = []
        current_time = 0.0

        while remaining:

            available = [

                process

                for process in remaining

                if process.arrival_time <= current_time

            ]

            if not available:

                current_time = remaining[0].arrival_time

                continue

            process = min(

                available,

                key=lambda p: (
                    p.burst_time,
                    p.arrival_time,
                    p.pid
                )

            )

            remaining.remove(process)

            process.waiting_time = (

                current_time

                - process.arrival_time

            )

            if process.response_time == -1:

                process.response_time = process.waiting_time

            timeline.append(

                TimelineEvent(

                    pid=process.pid,

                    name=process.name,

                    start=current_time,

                    end=current_time + process.burst_time,

                    algorithm="SJF"

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

            completed.append(process)

        return {

            "processes": completed,

            "timeline": timeline

        }