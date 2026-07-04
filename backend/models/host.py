from models.vm import VM, VMState


class Host:

    def __init__(
        self,
        host_id: int,
        total_cpu: int,
        total_memory: int
    ):

        self.host_id = host_id

        self.total_cpu = total_cpu
        self.total_memory = total_memory

        self.available_cpu = total_cpu
        self.available_memory = total_memory

        self.vm_list = []
        self.enabled = True

    def can_allocate(self, vm: VM):

        return (
            vm.cpu_demand <= self.available_cpu
            and
            vm.memory_demand <= self.available_memory
        )

    def allocate_vm(self, vm: VM):

        if not self.enabled:

            return False

        if not self.can_allocate(vm):

            return False

        self.available_cpu -= vm.cpu_demand
        self.available_memory -= vm.memory_demand

        vm.cpu_allocated = vm.cpu_demand
        vm.memory_allocated = vm.memory_demand

        vm.host = self
        vm.state = VMState.RUNNING

        self.vm_list.append(vm)

        return True

    def remove_vm(self, vm: VM):

        if vm not in self.vm_list:
            return

        self.available_cpu += vm.cpu_allocated
        self.available_memory += vm.memory_allocated

        vm.reset_allocation()

        self.vm_list.remove(vm)

    def enable(self):

        self.enabled = True


    def disable(self):

        self.enabled = False


    def update_resources(

        self,

        cpu,

        memory

    ):

        used_cpu = self.total_cpu - self.available_cpu
        used_memory = self.total_memory - self.available_memory

        if cpu < used_cpu:

            return False

        if memory < used_memory:

            return False

        self.total_cpu = cpu
        self.total_memory = memory

        self.available_cpu = cpu - used_cpu
        self.available_memory = memory - used_memory

        return True

    def cpu_utilization(self):

        used = self.total_cpu - self.available_cpu

        return round((used / self.total_cpu) * 100, 2)

    def memory_utilization(self):

        used = self.total_memory - self.available_memory

        return round((used / self.total_memory) * 100, 2)

    def health_status(self):

        if not self.enabled:

            return "Offline"

        cpu = self.cpu_utilization()

        if cpu >= 90:
            return "Critical"

        if cpu >= 70:
            return "High"

        if cpu >= 40:
            return "Moderate"

        return "Healthy"

    def reset(self):
        """
        Reset the host to its initial state.

        All VMs currently allocated to this host are first reset
        so that their allocation information and execution state
        remain consistent with the host.
        """

        for vm in self.vm_list:
            vm.reset_allocation()

        self.vm_list.clear()

        self.available_cpu = self.total_cpu
        self.available_memory = self.total_memory

    def __repr__(self):

        return (

            f"Host("

            f"id={self.host_id}, "

            f"CPU={self.available_cpu}/{self.total_cpu}, "

            f"MEM={self.available_memory}/{self.total_memory}, "

            f"VMs={len(self.vm_list)}, "

            f"Enabled={self.enabled}"

            f")"

        )