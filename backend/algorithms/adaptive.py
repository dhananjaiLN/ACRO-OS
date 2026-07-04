from algorithms.base_scheduler import BaseScheduler


class AdaptiveScheduler(BaseScheduler):

    def __init__(self):
        super().__init__("Adaptive Scheduler")

        # Configurable scoring weights
        self.priority_weight = 0.30
        self.waiting_weight = 0.25
        self.sla_weight = 0.20
        self.resource_weight = 0.15
        self.efficiency_weight = 0.10

    def calculate_score(self, cluster, vm):

        priority_score = vm.priority * self.priority_weight

        waiting_score = vm.waiting_time * self.waiting_weight

        sla_score = (
            vm.cpu_sla + vm.memory_sla
        ) * self.sla_weight

        weight_score = vm.weight * self.resource_weight

        # Resource Efficiency
        cluster_cpu = cluster.available_cpu()
        cluster_mem = cluster.available_memory()

        cpu_ratio = vm.cpu_demand / max(cluster_cpu, 1)
        mem_ratio = vm.memory_demand / max(cluster_mem, 1)

        resource_score = (1 - (cpu_ratio + mem_ratio) / 2) * self.efficiency_weight

        return (
            priority_score
            + waiting_score
            + sla_score
            + weight_score
            + resource_score
        )

    def schedule(self, cluster, vm_list):

        ordered = sorted(

            vm_list,

            key=lambda vm: self.calculate_score(
                cluster,
                vm
            ),

            reverse=True

        )

        return ordered