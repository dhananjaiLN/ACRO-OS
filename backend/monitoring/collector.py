import time

from monitoring.system_monitor import SystemMonitor
from monitoring.process_monitor import ProcessMonitor
from monitoring.resource_monitor import ResourceMonitor


class MonitoringCollector:

    @classmethod
    def collect(cls):

        process_data = ProcessMonitor.collect()

        return {

            "timestamp": time.time(),

            "system": SystemMonitor.collect(),

            "resources": ResourceMonitor.collect(),

            "processes": process_data,

            "top_processes": process_data["processes"][:5]

        }