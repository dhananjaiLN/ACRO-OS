from collections import deque
from copy import deepcopy
from os_scheduler.timeline import TimelineEvent

class RoundRobinScheduler:

    name = "Round Robin"

    @staticmethod
    def schedule(processes, quantum=4.0):

        processes = deepcopy(processes)

        processes.sort(
            key=lambda p: (
                p.arrival_time,
                p.pid
            )
        )

        queue = deque()

        completed = []
        timeline=[]
        current_time = 0.0

        index = 0

        n = len(processes)

        while len(completed) < n:

            while (
                index < n
                and
                processes[index].arrival_time <= current_time
            ):

                queue.append(processes[index])

                index += 1

            if not queue:

                current_time = processes[index].arrival_time

                continue

            process = queue.popleft()

            if not process.started:

                process.started = True

                process.response_time = (

                    current_time

                    - process.arrival_time

                )

            execution = min(

                quantum,

                process.remaining_time

            )
            timeline.append(

                TimelineEvent(

                    pid=process.pid,

                    name=process.name,

                    start=current_time,

                    end=current_time + execution,

                    algorithm="Round Robin"

                )

            )
            current_time += execution

            process.remaining_time -= execution

            while (

                index < n

                and

                processes[index].arrival_time <= current_time

            ):

                queue.append(processes[index])

                index += 1

            if process.remaining_time > 0:

                queue.append(process)

            else:

                process.finished = True

                process.completion_time = current_time

                process.turnaround_time = (

                    process.completion_time

                    - process.arrival_time

                )

                process.waiting_time = (

                    process.turnaround_time

                    - process.burst_time

                )

                completed.append(process)

        completed.sort(key=lambda p: p.pid)

        return {

            "processes": completed,

            "timeline": timeline

        }