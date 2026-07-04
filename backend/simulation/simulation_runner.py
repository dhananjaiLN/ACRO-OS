from models.cluster import Cluster
from models.host import Host

from controller.scheduler_engine import SchedulerEngine

from simulation.simulation_config import SimulationConfig
from simulation.simulation_context import SimulationContext
from simulation.simulation_engine import SimulationEngine
from simulation.workload_generator import WorkloadGenerator


class SimulationRunner:
    """
    Bootstraps and runs an ACRO simulation.
    """

    def __init__(self):

        cluster = Cluster()

        cluster.add_host(Host(1, 40, 64))
        cluster.add_host(Host(2, 30, 48))
        cluster.add_host(Host(3, 30, 32))

        scheduler = SchedulerEngine()

        config = SimulationConfig(
            max_ticks=100,
            tick_duration=1.0,
        )

        generator = WorkloadGenerator(
            seed=config.random_seed
        )

        context = SimulationContext(
            config=config,
            cluster=cluster,
            scheduler_engine=scheduler,
            workload_generator=generator,
        )

        self.engine = SimulationEngine(context)

    def run(self):

        self.engine.initialize()

        self.engine.start()

        self.engine.run()

        return self.engine.context