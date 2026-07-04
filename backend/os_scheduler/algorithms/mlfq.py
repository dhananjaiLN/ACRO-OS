from collections import deque
from copy import deepcopy

from os_scheduler.timeline import TimelineEvent


class MLFQScheduler:

    name = "MLFQ"

    @staticmethod
    def schedule(processes):

        processes = deepcopy(processes)

        processes.sort(
            key=lambda p: (
                p.arrival_time,
                p.pid
            )
        )

        q0 = deque()
        q1 = deque()
        q2 = deque()

        timeline = []

        completed = []

        current_time = 0.0

        index = 0

        n = len(processes)

        while len(completed) < n:

            while (
                index < n
                and
                processes[index].arrival_time <= current_time
            ):

                q0.append(processes[index])

                index += 1

            if q0:

                process = q0.popleft()

                quantum = 2.0

            elif q1:

                process = q1.popleft()

                quantum = 4.0

            elif q2:

                process = q2.popleft()

                quantum = process.remaining_time

            else:

                current_time = processes[index].arrival_time

                continue

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

                    algorithm="MLFQ"

                )

            )

            current_time += execution

            process.remaining_time -= execution

            while (

                index < n

                and

                processes[index].arrival_time <= current_time

            ):

                q0.append(processes[index])

                index += 1

            if process.remaining_time <= 0:

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

                continue

            if quantum == 2:

                q1.append(process)

            elif quantum == 4:

                q2.append(process)

            else:

                q2.append(process)

        completed.sort(key=lambda p: p.pid)

        return {

            "processes": completed,

            "timeline": timeline

        }