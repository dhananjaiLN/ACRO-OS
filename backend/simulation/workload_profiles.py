from dataclasses import dataclass


@dataclass
class WorkloadProfile:

    name: str

    cpu: int

    memory: int

    execution_time: int

    priority: int

    weight: int

    cpu_sla: int

    memory_sla: int


WEB_SERVER = WorkloadProfile(

    name="Web Server",

    cpu=2,

    memory=4,

    execution_time=18,

    priority=4,

    weight=2,

    cpu_sla=2,

    memory_sla=4

)


DATABASE = WorkloadProfile(

    name="Database",

    cpu=8,

    memory=16,

    execution_time=40,

    priority=9,

    weight=5,

    cpu_sla=8,

    memory_sla=16

)


MICROSERVICE = WorkloadProfile(

    name="Microservice",

    cpu=1,

    memory=2,

    execution_time=10,

    priority=5,

    weight=2,

    cpu_sla=1,

    memory_sla=2

)


AI_INFERENCE = WorkloadProfile(

    name="AI Inference",

    cpu=12,

    memory=24,

    execution_time=20,

    priority=8,

    weight=6,

    cpu_sla=12,

    memory_sla=24

)


BATCH_JOB = WorkloadProfile(

    name="Batch Job",

    cpu=6,

    memory=8,

    execution_time=12,

    priority=2,

    weight=3,

    cpu_sla=6,

    memory_sla=8

)


WORKLOADS = [

    WEB_SERVER,

    DATABASE,

    MICROSERVICE,

    AI_INFERENCE,

    BATCH_JOB

]