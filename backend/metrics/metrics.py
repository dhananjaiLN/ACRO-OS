from models.cluster import Cluster


class MetricsEngine:

    """
    Collects runtime metrics from the simulation.

    Stores the complete history of every simulation tick
    in memory for analytics.
    """

    def __init__(self, context):

        self._context = context

        self.history = []

    def snapshot(self):

        cluster: Cluster = self._context.cluster

        completed_vms = self._context.completed_queue

        if len(completed_vms) > 0:

            average_wait = round(

                sum(

                    vm.waiting_time

                    for vm in completed_vms

                ) / len(completed_vms),

                2

            )

        else:

            average_wait = 0

        return {

            "tick": self._context.current_tick,

            "scheduler": (

                self._context

                .scheduler_engine

                .current_algorithm()

            ),

            "total_hosts": len(

                cluster.get_hosts()

            ),

            "total_vms": self._context.total_vm_count,

            "waiting_vms": len(

                self._context.waiting_queue

            ),

            "running_vms": len(

                self._context.running_queue

            ),

            "completed_vms": len(

                self._context.completed_queue

            ),

            "cpu_utilization": (

                cluster.cpu_utilization()

            ),

            "memory_utilization": (

                cluster.memory_utilization()

            ),

            "average_waiting_time": average_wait

        }

    def record(self):

        self.history.append(

            self.snapshot()

        )

    def get_history(self):

        return self.history

    def latest(self):

        if len(self.history) == 0:

            return self.snapshot()

        return self.history[-1]

    def reset(self):

        self.history.clear()