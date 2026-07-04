from pydantic import BaseModel


class SchedulerRequest(BaseModel):
    algorithm: str

class HostCreateRequest(BaseModel):

    cpu: int
    memory: int

class HostUpdateRequest(BaseModel):

    cpu: int
    memory: int

class SimulationSettingsRequest(BaseModel):

    scenario: str

    load_intensity: str

    max_ticks: int

    arrival_probability: float