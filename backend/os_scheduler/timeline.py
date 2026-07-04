from dataclasses import dataclass


@dataclass
class TimelineEvent:

    pid: int

    name: str

    start: float

    end: float

    algorithm: str