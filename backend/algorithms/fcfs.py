from algorithms.base_scheduler import BaseScheduler


class FCFSScheduler(BaseScheduler):

    def __init__(self):
        super().__init__("First Come First Serve")

    def schedule(self, cluster, vm_list):

        return sorted(
            vm_list,
            key=lambda vm: vm.arrival_time
        )