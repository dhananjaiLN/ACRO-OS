from collections import deque

from algorithms.base_scheduler import BaseScheduler


class RoundRobinScheduler(BaseScheduler):

    def __init__(self):

        super().__init__("Round Robin")

    def schedule(self, cluster, vm_list):

        queue = deque(

            sorted(
                vm_list,
                key=lambda vm: vm.arrival_time
            )

        )

        ordered = []

        while queue:

            ordered.append(queue.popleft())

        return ordered