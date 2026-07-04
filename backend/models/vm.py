from enum import Enum


class VMState(Enum):
    WAITING = "Waiting"
    RUNNING = "Running"
    COMPLETED = "Completed"
    MIGRATING = "Migrating"
    FAILED = "Failed"


class VM:

    def __init__(
        self,
        vm_id,
        cpu_demand,
        memory_demand,
        priority,
        weight,
        cpu_sla,
        memory_sla,
        workload_type,
        arrival_time=0,
        execution_time=5
    ):

        self.vm_id = vm_id

        self.cpu_demand = cpu_demand
        self.memory_demand = memory_demand

        self.priority = priority
        self.weight=weight

        self.cpu_sla = cpu_sla
        self.memory_sla = memory_sla
        self.workload_type = workload_type

        self.cpu_allocated = 0
        self.memory_allocated = 0

        self.host = None

        self.state = VMState.WAITING

        self.arrival_time = arrival_time

        self.execution_time = execution_time

        self.remaining_time = execution_time

        self.waiting_time = 0

        self.turnaround_time = 0

        self.starvation_count = 0

        self.sla_violations = 0

    def tick(self):

        if self.state != VMState.RUNNING:
            return False

        self.remaining_time -= 1

        if self.remaining_time <= 0:

            self.state = VMState.COMPLETED

            return True

        return False

    def reset_allocation(self):

        self.cpu_allocated = 0
        self.memory_allocated = 0
        self.host = None

        if self.state != VMState.COMPLETED:
            self.state = VMState.WAITING

    def meets_sla(self):

        return (
            self.cpu_allocated >= self.cpu_sla
            and
            self.memory_allocated >= self.memory_sla
        )

    def __repr__(self):

        return (
            f"VM("
            f"id={self.vm_id}, "
            f"priority={self.priority}, "
            f"weight={self.weight}, "
            f"cpu={self.cpu_demand}, "
            f"mem={self.memory_demand}, "
            f"state={self.state.value}, "
            f"remaining={self.remaining_time}"
            f")"
        )