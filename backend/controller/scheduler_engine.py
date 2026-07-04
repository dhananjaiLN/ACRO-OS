from algorithms.fcfs import FCFSScheduler
from algorithms.priority import PriorityScheduler
from algorithms.round_robin import RoundRobinScheduler
from algorithms.weighted_fair import WeightedFairScheduler
from algorithms.sla_aware import SLAAwareScheduler
from algorithms.adaptive import AdaptiveScheduler


class SchedulerEngine:

    def __init__(self):

        self.algorithms = {

            "FCFS": FCFSScheduler(),

            "Priority": PriorityScheduler(),

            "Round Robin": RoundRobinScheduler(),

            "Weighted Fair": WeightedFairScheduler(),

            "SLA Aware": SLAAwareScheduler(),

            "Adaptive": AdaptiveScheduler()

        }

        self._current_algorithm_key = "FCFS"

        self.current_scheduler = self.algorithms[
            self._current_algorithm_key
        ]

    def available_algorithms(self):

        return list(self.algorithms.keys())

    def set_algorithm(self, algorithm):

        if algorithm not in self.algorithms:

            raise ValueError(
                f"{algorithm} not found."
            )

        self._current_algorithm_key = algorithm

        self.current_scheduler = self.algorithms[
            algorithm
        ]

    def current_algorithm(self):

        return self.current_scheduler.name

    def current_algorithm_key(self):

        return self._current_algorithm_key

    def schedule(self, cluster, vms):

        return self.current_scheduler.schedule(
            cluster,
            vms
        )