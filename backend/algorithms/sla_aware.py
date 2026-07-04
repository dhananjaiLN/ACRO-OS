from algorithms.base_scheduler import BaseScheduler


class SLAAwareScheduler(BaseScheduler):

    def __init__(self):

        super().__init__("SLA Aware")

    def schedule(self, cluster, vm_list):

        """
        Higher SLA requirements are scheduled first.

        If two VMs have equal SLA,
        higher priority wins.
        """

        return sorted(

            vm_list,

            key=lambda vm: (

                vm.cpu_sla +

                vm.memory_sla,

                vm.priority,

                vm.waiting_time

            ),

            reverse=True

        )