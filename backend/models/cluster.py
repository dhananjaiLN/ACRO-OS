from models.host import Host


class Cluster:

    def __init__(self):

        self.hosts = []

    def add_host(self, host: Host):

        self.hosts.append(host)

    def get_host(self, host_id):

        for host in self.hosts:

            if host.host_id == host_id:

                return host

        return None
    
    def remove_host(self, host_id):

        host = self.get_host(host_id)

        if host is None:

            return False

        if len(host.vm_list) > 0:

            return False

        self.hosts.remove(host)

        return True
    
    def enable_host(self, host_id):

        host = self.get_host(host_id)

        if host is None:

            return False

        host.enable()

        return True
    
    def disable_host(self, host_id):

        host = self.get_host(host_id)

        if host is None:

            return False

        if len(host.vm_list) > 0:

            return False

        host.disable()

        return True
    
    def update_host_resources(

        self,

        host_id,

        cpu,

        memory

    ):

        host = self.get_host(host_id)

        if host is None:

            return False

        return host.update_resources(

            cpu,

            memory

        )

    def get_hosts(self):

        return self.hosts

    def total_cpu(self):

        return sum(
            host.total_cpu
            for host in self.hosts
        )

    def total_memory(self):

        return sum(
            host.total_memory
            for host in self.hosts
        )

    def available_cpu(self):

        return sum(
            host.available_cpu
            for host in self.hosts
        )

    def available_memory(self):

        return sum(
            host.available_memory
            for host in self.hosts
        )

    def cpu_utilization(self):

        used = self.total_cpu() - self.available_cpu()

        return round(
            used / self.total_cpu() * 100,
            2
        )

    def memory_utilization(self):

        used = self.total_memory() - self.available_memory()

        return round(
            used / self.total_memory() * 100,
            2
        )

    def healthiest_host(self):

        if len(self.hosts) == 0:
            return None

        return min(
            self.hosts,
            key=lambda h: h.cpu_utilization()
        )

    def overloaded_hosts(self):

        return [
            host
            for host in self.hosts
            if host.cpu_utilization() > 90
        ]

    def healthy_hosts(self):

        return [
            host
            for host in self.hosts
            if host.cpu_utilization() < 70
        ]

    def reset(self):

        for host in self.hosts:

            host.reset()
    
    def allocate_schedule(self, ordered_vms):
        """
        Allocate an ordered list of VMs to suitable hosts.

        Returns the list of successfully allocated VMs.
        """

        allocated = []

        for vm in ordered_vms:

            host = self._find_host_for_vm(vm)

            if host is None:
                continue

            if host.allocate_vm(vm):
                allocated.append(vm)

        return allocated

    def release_vm(self, vm):
        """
        Release a VM from the host it is currently running on.

        Returns True if the VM was found and released,
        otherwise returns False.
        """

        for host in self.hosts:

            if vm in host.vm_list:

                host.remove_vm(vm)

                return True

        return False
    def running_vms(self):
        """
        Returns every running VM across all hosts.
        """

        running = []

        for host in self.hosts:
            running.extend(host.vm_list)

        return running


    def tick(self):
        """
        Advance execution of every running VM by one simulation tick.

        Returns:
            List of VMs that completed during this tick.
        """

        completed = []

        for host in self.hosts:

            # Iterate over a copy since VMs may complete
            for vm in host.vm_list[:]:

                if vm.tick():
                    completed.append(vm)

        return completed

    def __repr__(self):

        return (
            f"Cluster("
            f"Hosts={len(self.hosts)}, "
            f"CPU={self.cpu_utilization()}%, "
            f"MEM={self.memory_utilization()}%"
            f")"
        )
    def _find_host_for_vm(self, vm):
        """
        Select the least utilized host that can accommodate the VM.

        This keeps workload balanced across the cluster while preserving
        the separation between scheduling (VM ordering) and placement
        (host selection).
        """

        candidates = [

            host

            for host in self.hosts

            if host.enabled
            and host.can_allocate(vm)

        ]

        if not candidates:
            return None

        return min(

            candidates,

            key=lambda host: (
                host.cpu_utilization(),
                host.memory_utilization()
            )

        )