from os_scheduler.algorithms.fcfs import FCFSScheduler
from os_scheduler.algorithms.sjf import SJFScheduler
from os_scheduler.algorithms.priority import PriorityScheduler
from os_scheduler.algorithms.round_robin import RoundRobinScheduler
from os_scheduler.algorithms.mlfq import MLFQScheduler

from os_scheduler.metrics import SchedulerMetrics


class SchedulerRunner:

    @staticmethod
    def run_all(workload):

        algorithms = {

            "FCFS": lambda: FCFSScheduler.schedule(workload),

            "SJF": lambda: SJFScheduler.schedule(workload),

            "Priority": lambda: PriorityScheduler.schedule(workload),

            "Round Robin": lambda: RoundRobinScheduler.schedule(

                workload,

                quantum=4

            ),

            "MLFQ": lambda: MLFQScheduler.schedule(workload)

        }

        results = {}

        for name, scheduler in algorithms.items():

            result = scheduler()

            metrics = SchedulerMetrics.calculate(

                result["processes"]

            )

            results[name] = {

                "metrics": metrics,

                "timeline": result["timeline"],

                "processes": result["processes"]

            }

        return results