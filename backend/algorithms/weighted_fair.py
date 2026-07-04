from algorithms.base_scheduler import BaseScheduler


class WeightedFairScheduler(BaseScheduler):

    def __init__(self):
        super().__init__("Weighted Fair Share")

    def schedule(self, cluster, vm_list):

        return sorted(

            vm_list,

            key=lambda vm: (

                vm.weight,

                -vm.arrival_time

            ),

            reverse=True

        )