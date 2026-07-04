from models.cluster import Cluster
from models.host import Host

from controller.scheduler_engine import SchedulerEngine

from simulation.simulation_config import SimulationConfig
from simulation.simulation_context import SimulationContext
from simulation.simulation_engine import SimulationEngine
from simulation.workload_generator import WorkloadGenerator


def create_cluster():

    cluster = Cluster()

    cluster.add_host(
        Host(
            host_id=1,
            total_cpu=40,
            total_memory=64
        )
    )

    cluster.add_host(
        Host(
            host_id=2,
            total_cpu=30,
            total_memory=48
        )
    )

    cluster.add_host(
        Host(
            host_id=3,
            total_cpu=30,
            total_memory=32
        )
    )

    return cluster


def main():

    cluster = create_cluster()

    scheduler = SchedulerEngine()

    config = SimulationConfig(
        max_ticks=20,
        tick_duration=1
    )

    workload_generator = WorkloadGenerator()

    context = SimulationContext(
        config=config,
        cluster=cluster,
        scheduler_engine=scheduler,
        workload_generator=workload_generator
    )

    engine = SimulationEngine(context)

    engine.initialize()

    engine.start()

    engine.run()
    from metrics.metrics import MetricsEngine

    metrics = MetricsEngine(context)

    snapshot = metrics.snapshot()

    print("\nSimulation Metrics\n")

    for key, value in snapshot.items():
        print(f"{key}: {value}")

    print("\nSimulation Completed\n")

    print(f"Total VMs Generated : {context.total_vm_count}")
    print(f"Completed VMs      : {len(context.completed_queue)}")
    print(f"Running VMs        : {len(context.running_queue)}")
    print(f"Waiting VMs        : {len(context.waiting_queue)}")

    print("\nCluster Status")

    for host in cluster.get_hosts():

        print(host)


if __name__ == "__main__":
    main()