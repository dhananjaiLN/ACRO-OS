from dataclasses import dataclass


@dataclass
class Process:

    pid: int

    name: str

    arrival_time: float

    burst_time: float

    priority: int

    cpu_usage: float

    memory_usage: float

    threads: int

    remaining_time: float = 0.0

    waiting_time: float = 0.0

    turnaround_time: float = 0.0

    response_time: float = -1.0

    completion_time: float = 0.0

    started: bool = False

    finished: bool = False

    def __post_init__(self):
        self.remaining_time = self.burst_time