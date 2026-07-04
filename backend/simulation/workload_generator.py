from __future__ import annotations

import random
from typing import List, Optional

from models.vm import VM

from simulation.workload_profiles import (
    WEB_SERVER,
    DATABASE,
    MICROSERVICE,
    AI_INFERENCE,
    BATCH_JOB
)

from simulation.simulation_scenarios import (
    SimulationScenario,
    LoadIntensity
)


class WorkloadGenerator:

    def __init__(

        self,

        seed: Optional[int] = None,

        scenario: SimulationScenario = SimulationScenario.MIXED,

        intensity: LoadIntensity = LoadIntensity.NORMAL

    ):

        self._random = random.Random(seed)

        self.scenario = scenario

        self.intensity = intensity

        self._next_vm_id = 1

    def reset(self):

        self._next_vm_id = 1

    def set_scenario(

        self,

        scenario: SimulationScenario

    ):

        self.scenario = scenario

    def set_intensity(

        self,

        intensity: LoadIntensity

    ):

        self.intensity = intensity

    def _arrival_settings(self):

        if self.intensity == LoadIntensity.LIGHT:

            return 0.30, 1

        if self.intensity == LoadIntensity.NORMAL:

            return 0.60, 2

        if self.intensity == LoadIntensity.HEAVY:

            return 0.90, 4

        return 1.00, 8

    def _choose_profile(self):

        if self.scenario == SimulationScenario.ENTERPRISE:

            return self._random.choices(

                [

                    WEB_SERVER,

                    DATABASE,

                    BATCH_JOB

                ],

                weights=[70, 20, 10],

                k=1

            )[0]

        if self.scenario == SimulationScenario.AI_CLUSTER:

            return self._random.choices(

                [

                    AI_INFERENCE,

                    BATCH_JOB,

                    DATABASE

                ],

                weights=[70, 20, 10],

                k=1

            )[0]

        if self.scenario == SimulationScenario.MICROSERVICES:

            return self._random.choices(

                [

                    MICROSERVICE,

                    WEB_SERVER,

                    DATABASE

                ],

                weights=[70, 20, 10],

                k=1

            )[0]

        if self.scenario == SimulationScenario.DATABASE:

            return self._random.choices(

                [

                    DATABASE,

                    WEB_SERVER

                ],

                weights=[80, 20],

                k=1

            )[0]

        return self._random.choice(

            [

                WEB_SERVER,

                DATABASE,

                MICROSERVICE,

                AI_INFERENCE,

                BATCH_JOB

            ]

        )

    def generate(

        self,

        current_tick: int

    ) -> List[VM]:

        probability, max_vms = self._arrival_settings()

        new_vms = []

        for _ in range(max_vms):

            if self._random.random() > probability:

                continue

            profile = self._choose_profile()

            vm = VM(

                vm_id=self._next_vm_id,

                cpu_demand=profile.cpu,

                memory_demand=profile.memory,

                priority=profile.priority,

                weight=profile.weight,

                cpu_sla=profile.cpu_sla,

                memory_sla=profile.memory_sla,

                workload_type=profile.name,

                arrival_time=current_tick,

                execution_time=profile.execution_time

            )

            self._next_vm_id += 1

            new_vms.append(vm)

        return new_vms