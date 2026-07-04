from dataclasses import dataclass
from typing import Optional

from simulation.simulation_scenarios import (
    SimulationScenario,
    LoadIntensity
)


@dataclass
class SimulationConfig:
    """
    Runtime configuration for the simulation.

    These values can be modified from the Settings page
    before a simulation starts.
    """

    max_ticks: int = 100

    tick_duration: float = 1.0

    random_seed: Optional[int] = None

    scenario: SimulationScenario = SimulationScenario.MIXED

    load_intensity: LoadIntensity = LoadIntensity.NORMAL

    arrival_probability: float = 0.60