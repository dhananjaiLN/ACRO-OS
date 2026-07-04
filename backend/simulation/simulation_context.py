from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from models.vm import VM

from simulation.simulation_clock import SimulationClock
from simulation.simulation_config import SimulationConfig
from simulation.event_logger import EventLogger
from metrics.metrics import MetricsEngine


@dataclass
class SimulationContext:
    """
    Shared runtime context for a simulation execution.

    Owns references to runtime services and
    simulation-wide state.
    """

    config: SimulationConfig
    cluster: Any
    scheduler_engine: Any

    metrics_engine: Optional[Any] = None
    event_engine: Optional[Any] = None
    migration_engine: Optional[Any] = None
    workload_generator: Optional[Any] = None
    logger: EventLogger = field(init=False)

    clock: SimulationClock = field(init=False)

    # Master registry of every VM created during this simulation.
    # Queues track lifecycle state, while this registry provides
    # constant-time lookup by VM ID.
    all_vms: Dict[int, VM] = field(default_factory=dict)

    waiting_queue: List[VM] = field(default_factory=list)
    running_queue: List[VM] = field(default_factory=list)
    completed_queue: List[VM] = field(default_factory=list)

    

    def __post_init__(self) -> None:
        self.clock = SimulationClock(self.config)
        self.metrics = MetricsEngine(self)
        self.logger = EventLogger()

    def reset(self) -> None:

        self.clock.reset()

        self.all_vms.clear()
        self.waiting_queue.clear()
        self.running_queue.clear()
        self.completed_queue.clear()

        self.logger.events.clear()

        if self.workload_generator is not None:
            self.workload_generator.reset()

    @property
    def current_tick(self) -> int:
        return self.clock.current_tick

    @property
    def current_time(self) -> float:
        return self.clock.current_time

    def is_complete(self) -> bool:
        return self.clock.has_finished()

    def register_vm(self, vm: VM) -> None:
        """
        Register a newly created VM with the simulation.
        """

        self.all_vms[vm.vm_id] = vm
        self.waiting_queue.append(vm)

    def get_vm(self, vm_id: int) -> Optional[VM]:
        """
        Retrieve a VM by its unique identifier.
        """

        return self.all_vms.get(vm_id)

    @property
    def total_vm_count(self) -> int:
        """
        Total number of VMs created during this simulation.
        """

        return len(self.all_vms)