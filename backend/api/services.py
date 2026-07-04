import threading
import time

from controller.scheduler_engine import SchedulerEngine

from models.cluster import Cluster
from models.host import Host

from simulation.simulation_config import SimulationConfig
from simulation.simulation_context import SimulationContext
from simulation.simulation_engine import SimulationEngine
from simulation.workload_generator import WorkloadGenerator
from reports.report_generator import ReportGenerator


class SimulationService:

    def __init__(self):

        self.engine = None
        self.context = None

        self.is_running = False
        self.thread = None

        self.initialize()

    # ---------------------------------------------------------
    # Initialization
    # ---------------------------------------------------------

    def initialize(self):

        current_algorithm = "FCFS"

        if self.context is not None:
            current_algorithm = (
                self.context.scheduler_engine.current_algorithm_key()
            )

        cluster = Cluster()

        cluster.add_host(Host(1, 40, 64))
        cluster.add_host(Host(2, 30, 48))
        cluster.add_host(Host(3, 30, 32))

        scheduler = SchedulerEngine()
        scheduler.set_algorithm(current_algorithm)

        config = SimulationConfig(

            max_ticks=100,

            tick_duration=1

        )

        generator = WorkloadGenerator(seed=config.random_seed,scenario=config.scenario,intensity=config.load_intensity)

        generator.arrival_probability = config.arrival_probability

        self.context = SimulationContext(
            config=config,
            cluster=cluster,
            scheduler_engine=scheduler,
            workload_generator=generator
        )

        self.engine = SimulationEngine(self.context)

    # ---------------------------------------------------------
    # Background Simulation
    # ---------------------------------------------------------

    def _run_simulation(self):

        while (
            self.is_running
            and
            not self.context.is_complete()
        ):

            self.engine.run_tick()

            time.sleep(
                self.context.config.tick_duration
            )

        self.is_running = False
        self.thread = None

        self.context.logger.info(
            "Simulation completed."
        )

    # ---------------------------------------------------------
    # Simulation Controls
    # ---------------------------------------------------------

    def start(self):

        if self.is_running:

            return {

                "message": "Simulation already running."

            }

        if self.context.is_complete():

            self.initialize()

        self.engine.initialize()

        self.engine.start()

        self.is_running = True

        self.thread = threading.Thread(

            target=self._run_simulation,

            daemon=True

        )

        self.thread.start()

        self.context.logger.info(
            "Simulation started."
        )

        return {

            "message": "Simulation started."

        }

    def reset(self):

        self.is_running = False

        if self.thread is not None:

            self.thread.join(timeout=2)

            self.thread = None

        self.initialize()
        self.context.metrics.reset()
        self.context.logger.info(
            "Simulation reset."
        )

        return {

            "message": "Simulation reset successfully."

        }

    # ---------------------------------------------------------
    # Status
    # ---------------------------------------------------------

    def status(self):

        return {

            "running": self.is_running,

            "tick": self.context.current_tick,

            "total_vms": self.context.total_vm_count,

            "waiting_vms": len(self.context.waiting_queue),

            "running_vms": len(self.context.running_queue),

            "completed_vms": len(self.context.completed_queue),

            "scheduler": self.context.scheduler_engine.current_algorithm()

        }

    # ---------------------------------------------------------
    # Cluster
    # ---------------------------------------------------------

    def cluster(self):

        cluster = self.context.cluster

        hosts = cluster.get_hosts()

        total_cpu = cluster.total_cpu()
        available_cpu = cluster.available_cpu()

        total_memory = cluster.total_memory()
        available_memory = cluster.available_memory()

        online_hosts = sum(

            1

            for host in hosts

            if host.enabled

        )

        offline_hosts = len(hosts) - online_hosts

        return {

            "total_hosts": len(hosts),

            "online_hosts": online_hosts,

            "offline_hosts": offline_hosts,

            "total_cpu": total_cpu,

            "used_cpu": total_cpu - available_cpu,

            "available_cpu": available_cpu,

            "cpu_utilization": cluster.cpu_utilization(),

            "total_memory": total_memory,

            "used_memory": total_memory - available_memory,

            "available_memory": available_memory,

            "memory_utilization": cluster.memory_utilization()

        }

    # ---------------------------------------------------------
    # Hosts
    # ---------------------------------------------------------

    def hosts(self):

        hosts = []

        for host in self.context.cluster.get_hosts():

            hosts.append({

                "host_id": host.host_id,

                "enabled": host.enabled,

                "status": host.health_status(),

                "cpu_utilization": host.cpu_utilization(),

                "memory_utilization": host.memory_utilization(),

                "running_vms": len(host.vm_list),

                "available_cpu": host.available_cpu,

                "available_memory": host.available_memory,

                "total_cpu": host.total_cpu,

                "total_memory": host.total_memory

            })

        return hosts
    
    def create_host(self, cpu, memory):

        cluster = self.context.cluster

        used_ids = {

            host.host_id

            for host in cluster.get_hosts()

        }

        next_id = 1

        while next_id in used_ids:

            next_id += 1

        host = Host(

            next_id,

            cpu,

            memory

        )

        cluster.add_host(host)

        self.context.logger.info(

            f"Host-{next_id} added "

            f"(CPU={cpu}, MEM={memory})"

        )

        return {

            "success": True,

            "message": "Host created.",

            "host_id": next_id

        }
    
    def delete_host(self, host_id):

        success = self.context.cluster.remove_host(host_id)

        if not success:

            return {

                "success": False,

                "message": "Unable to remove host."

            }

        self.context.logger.info(

            f"Host-{host_id} removed."

        )

        return {

            "success": True

        }
    
    def enable_host(self, host_id):

        success = self.context.cluster.enable_host(host_id)

        if not success:

            return {

                "success": False

            }

        self.context.logger.info(

            f"Host-{host_id} enabled."

        )

        return {

            "success": True

        }
    
    def disable_host(self, host_id):

        success = self.context.cluster.disable_host(host_id)

        if not success:

            return {

                "success": False

            }

        self.context.logger.info(

            f"Host-{host_id} disabled."

        )

        return {

            "success": True

        }
    
    def update_host(

        self,

        host_id,

        cpu,

        memory

    ):

        success = self.context.cluster.update_host_resources(

            host_id,

            cpu,

            memory

        )

        if not success:

            return {

                "success": False,

                "message": "Invalid resource update."

            }

        self.context.logger.info(

            f"Host-{host_id} updated "

            f"(CPU={cpu}, MEM={memory})"

        )

        return {

            "success": True

        }

    # ---------------------------------------------------------
    # Virtual Machines
    # ---------------------------------------------------------

    def vms(self):

        vm_list = []

        for vm in self.context.all_vms.values():

            vm_list.append({

                "vm_id": vm.vm_id,

                "workload_type": vm.workload_type,

                "state": vm.state.value,

                "host": vm.host.host_id if vm.host else None,

                "priority": vm.priority,

                "weight": vm.weight,

                "cpu_demand": vm.cpu_demand,

                "memory_demand": vm.memory_demand,

                "cpu_allocated": vm.cpu_allocated,

                "memory_allocated": vm.memory_allocated,

                "remaining_time": vm.remaining_time,

                "waiting_time": vm.waiting_time,

                "arrival_time": vm.arrival_time

            })

        return vm_list

    # ---------------------------------------------------------
    # Scheduler
    # ---------------------------------------------------------

    def change_scheduler(self, algorithm: str):

        self.context.scheduler_engine.set_algorithm(
            algorithm
        )
        self.context.logger.info(
            f"Scheduler changed to {algorithm}"
        )

        return {

            "message": f"Scheduler changed to {algorithm}",

            "current_scheduler": (
                self.context.scheduler_engine.current_algorithm()
            )

        }
    # ---------------------------------------------------------
    # Simulation Settings
    # ---------------------------------------------------------

    def update_simulation_settings(

        self,

        scenario=None,

        load_intensity=None,

        max_ticks=None,

        arrival_probability=None

    ):

        config = self.context.config

        generator = self.context.workload_generator

        if scenario is not None:

            config.scenario = scenario

            generator.set_scenario(scenario)

        if load_intensity is not None:

            config.load_intensity = load_intensity

            generator.set_intensity(load_intensity)

        if max_ticks is not None:

            config.max_ticks = max_ticks

        if arrival_probability is not None:

            config.arrival_probability = arrival_probability

            generator.arrival_probability = arrival_probability

        self.context.logger.info(

            "Simulation settings updated."

        )

        return {

            "success": True,

            "scenario": config.scenario.value,

            "load_intensity": config.load_intensity.value,

            "max_ticks": config.max_ticks,

            "arrival_probability": config.arrival_probability

        }


    def simulation_settings(self):

        config = self.context.config

        return {

            "scenario": config.scenario.name,

            "load_intensity": config.load_intensity.name,

            "max_ticks": config.max_ticks,

            "arrival_probability": config.arrival_probability

        }
    
    # ---------------------------------------------------------
    # Metrics
    # ---------------------------------------------------------

    def metrics(self):

        return self.context.metrics.get_history()

    # ---------------------------------------------------------
    # Event Logs
    # ---------------------------------------------------------

    def logs(self):

        return self.context.logger.get_events()
    
    # ---------------------------------------------------------
    # Report
    # ---------------------------------------------------------
    
    def export_report(self):

        generator = ReportGenerator()

        filepath = "simulation_report.pdf"

        generator.generate(

            filepath,

            self.context.metrics.get_history(),

            self.context.config

        )

        return filepath
    


simulation_service = SimulationService()