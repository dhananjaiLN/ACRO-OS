from enum import Enum


class SimulationScenario(Enum):

    MIXED = "Mixed Cloud"

    ENTERPRISE = "Enterprise"

    AI_CLUSTER = "AI Cluster"

    MICROSERVICES = "Microservices"

    DATABASE = "Database Cluster"


class LoadIntensity(Enum):

    LIGHT = "Light"

    NORMAL = "Normal"

    HEAVY = "Heavy"

    BURST = "Burst"