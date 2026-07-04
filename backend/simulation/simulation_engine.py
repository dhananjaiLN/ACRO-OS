from __future__ import annotations

from simulation.simulation_context import SimulationContext
from simulation.simulation_state import SimulationState


class SimulationEngine:
    """
    Coordinates the execution of a simulation.

    The SimulationEngine owns the simulation lifecycle but
    delegates scheduling, allocation, metrics collection,
    and other responsibilities to dedicated components.
    """

    def __init__(self, context: SimulationContext):
        self._context = context
        self._state = SimulationState.INITIALIZED
        self._completed_this_tick = []

    @property
    def state(self) -> SimulationState:
        return self._state

    @property
    def context(self) -> SimulationContext:
        return self._context

    def initialize(self) -> None:
        """
        Prepare the simulation for execution.
        """
        self._context.reset()
        self._state = SimulationState.INITIALIZED

    def start(self) -> None:
        """
        Start the simulation.
        """
        if self._state == SimulationState.RUNNING:
            raise RuntimeError("Simulation is already running.")

        self._state = SimulationState.RUNNING

    def pause(self) -> None:
        """
        Pause the simulation.
        """
        if self._state != SimulationState.RUNNING:
            raise RuntimeError("Simulation is not running.")

        self._state = SimulationState.PAUSED

    def resume(self) -> None:
        """
        Resume a paused simulation.
        """
        if self._state != SimulationState.PAUSED:
            raise RuntimeError("Simulation is not paused.")

        self._state = SimulationState.RUNNING

    def stop(self) -> None:
        """
        Stop the simulation.
        """
        self._state = SimulationState.STOPPED

    def run(self) -> None:
        """
        Execute the simulation until completion.
        """
        if self._state != SimulationState.RUNNING:
            raise RuntimeError(
                "Simulation must be in RUNNING state before calling run()."
            )

        while not self._context.is_complete():
            self.run_tick()

        self._state = SimulationState.COMPLETED

    def run_tick(self) -> None:
        """
        Execute one complete simulation tick.
        """

        if self._state != SimulationState.RUNNING:
            raise RuntimeError(
                "Simulation is not currently running."
            )

        self._generate_workloads()

        self._schedule_waiting_vms()

        self._update_waiting_times()

        self._execute_running_vms()

        self._finalize_completed_vms()

        self._context.clock.tick()

        self._context.logger.info(f"Tick {self._context.current_tick}")

        self.context.metrics.record()

    def before_tick(self) -> None:
        """
        Perform pre-scheduling tasks for the current simulation tick.
        """

        generator = self._context.workload_generator

        if generator is None:
            return

        new_vms = generator.generate(
            self._context.current_tick
        )

        self._context.waiting_queue.extend(new_vms)

    def execute_tick(self) -> None:
        """
        Execute one scheduling cycle.

        Scheduling order is determined by the SchedulerEngine.
        Resource allocation is delegated to the Cluster.
        """

        if not self._context.waiting_queue:
            return

        ordered_vms = self._context.scheduler_engine.schedule(
            self._context.cluster,
            self._context.waiting_queue,
        )

        allocated = self._context.cluster.allocate_schedule(
            ordered_vms
        )

        for vm in allocated:

            if vm not in self._context.running_queue:

                self._context.running_queue.append(vm)

        self._context.waiting_queue = [

            vm

            for vm in self._context.waiting_queue

            if vm.host is None

        ]

    def after_tick(self) -> None:
        """
        Advance all running VMs by one simulation tick and
        release completed workloads.
        """

        completed = []

        for vm in self._context.running_queue:

            if vm.tick():
                completed.append(vm)

        for vm in completed:

            self._context.cluster.release_vm(vm)

            self._context.running_queue.remove(vm)

            self._context.completed_queue.append(vm)
    
    def _generate_workloads(self) -> None:
        """
        Generate new workloads arriving during the current simulation tick
        and register them with the simulation context.
        """

        generator = self._context.workload_generator

        if generator is None:
            return

        new_vms = generator.generate(
            self._context.current_tick
        )

        for vm in new_vms:

            self._context.register_vm(vm)

            self._context.logger.info(
                f"VM-{vm.vm_id} generated "
                f"(CPU={vm.cpu_demand}, MEM={vm.memory_demand})"
            )
    
    def _schedule_waiting_vms(self) -> None:

        if not self._context.waiting_queue:
            return

        ordered = self._context.scheduler_engine.schedule(
            self._context.cluster,
            self._context.waiting_queue
        )

        allocated = self._context.cluster.allocate_schedule(
            ordered
        )

        for vm in allocated:

            if vm not in self._context.running_queue:

                self._context.running_queue.append(vm)

            self._context.logger.success(
                f"VM-{vm.vm_id} allocated to HOST-{vm.host.host_id}"
            )

        self._context.waiting_queue = [

            vm

            for vm in self._context.waiting_queue

            if vm.host is None

        ]
    
    def _execute_running_vms(self) -> None:
        """
        Advance execution of every running VM.
        """

        self._completed_this_tick = self._context.cluster.tick()
    
    def _finalize_completed_vms(self) -> None:
        """
        Release completed VMs and move them to the completed queue.
        """

        for vm in self._completed_this_tick:

            self._context.cluster.release_vm(vm)

            if vm in self._context.running_queue:
                self._context.running_queue.remove(vm)

            self._context.completed_queue.append(vm)

            self._context.logger.info(
                f"VM-{vm.vm_id} completed execution"
            )

        self._completed_this_tick.clear()

    def _update_waiting_times(self):

        for vm in self._context.waiting_queue:

            vm.waiting_time += 1