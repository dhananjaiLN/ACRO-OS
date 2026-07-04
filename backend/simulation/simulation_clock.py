from __future__ import annotations

from simulation.simulation_config import SimulationConfig


class SimulationClock:
    """
    Centralized simulation clock.

    Maintains simulation time and provides a single
    authoritative source of time for every module.
    """

    def __init__(self, config: SimulationConfig):
        self._config = config
        self._current_tick = 0

    @property
    def current_tick(self) -> int:
        """
        Returns the current simulation tick.
        """
        return self._current_tick

    @property
    def current_time(self) -> float:
        """
        Returns elapsed simulation time.
        """
        return self._current_tick * self._config.tick_duration

    @property
    def max_ticks(self) -> int:
        return self._config.max_ticks

    @property
    def tick_duration(self) -> float:
        return self._config.tick_duration

    def tick(self) -> None:
        """
        Advance the simulation by one tick.
        """
        if self.has_finished():
            raise RuntimeError(
                "Simulation has already reached the configured maximum number of ticks."
            )

        self._current_tick += 1

    def reset(self) -> None:
        """
        Reset the simulation clock.
        """
        self._current_tick = 0

    def has_finished(self) -> bool:
        """
        Returns True if the simulation has completed.
        """
        return self._current_tick >= self._config.max_ticks

    def remaining_ticks(self) -> int:
        """
        Returns the number of ticks remaining.
        """
        return max(0, self._config.max_ticks - self._current_tick)

    def progress(self) -> float:
        """
        Returns simulation completion percentage.

        Value is between 0.0 and 1.0.
        """
        if self._config.max_ticks == 0:
            return 1.0

        return self._current_tick / self._config.max_ticks

    def __str__(self) -> str:
        return (
            f"SimulationClock("
            f"tick={self.current_tick}, "
            f"time={self.current_time:.2f}s)"
        )