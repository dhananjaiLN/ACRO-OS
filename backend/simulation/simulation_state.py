from enum import Enum


class SimulationState(Enum):
    """
    Represents the lifecycle state of the simulation.
    """

    INITIALIZED = "INITIALIZED"
    RUNNING = "RUNNING"
    PAUSED = "PAUSED"
    STOPPED = "STOPPED"
    COMPLETED = "COMPLETED"