from algorithms.base_scheduler import BaseScheduler


class PriorityScheduler(BaseScheduler):

    def __init__(self):
        super().__init__("Priority Scheduling")

    def schedule(self, cluster, vm_list):

        return sorted(

            vm_list,

            key=lambda vm: (

                vm.priority,

                -vm.arrival_time

            ),

            reverse=True

        )