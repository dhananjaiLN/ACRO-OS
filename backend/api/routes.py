from fastapi import APIRouter

from fastapi.responses import FileResponse

from api.services import simulation_service

from api.schemas import (SchedulerRequest , HostCreateRequest,HostUpdateRequest,SimulationSettingsRequest)

from simulation.simulation_scenarios import (SimulationScenario,LoadIntensity)

from monitoring.collector import MonitoringCollector

router = APIRouter()


@router.get("/")
def home():

    return {

        "project": "Adaptive Cloud Resource Orchestrator",

        "status": "Running"

    }


@router.get("/health")
def health():

    return {

        "status": "healthy"

    }


@router.get("/simulation/status")
def simulation_status():

    return simulation_service.status()

@router.post("/simulation/start")
def start_simulation():

    simulation_service.start()

    return {

        "message": "Simulation completed successfully."

    }

@router.get("/hosts")
def get_hosts():

    return simulation_service.hosts()

@router.post("/hosts")
def create_host(request: HostCreateRequest):

    return simulation_service.create_host(

        request.cpu,

        request.memory

    )

@router.put("/hosts/{host_id}")
def update_host(

    host_id: int,

    request: HostUpdateRequest

):

    return simulation_service.update_host(

        host_id,

        request.cpu,

        request.memory

    )

@router.delete("/hosts/{host_id}")
def delete_host(host_id: int):

    return simulation_service.delete_host(host_id)

@router.post("/hosts/{host_id}/enable")
def enable_host(host_id: int):

    return simulation_service.enable_host(host_id)

@router.post("/hosts/{host_id}/disable")
def disable_host(host_id: int):

    return simulation_service.disable_host(host_id)

@router.get("/vms")
def get_vms():

    return simulation_service.vms()

@router.post("/scheduler")
def change_scheduler(request: SchedulerRequest):

    return simulation_service.change_scheduler(
        request.algorithm
    )

@router.post("/simulation/reset")
def reset_simulation():

    return simulation_service.reset()

@router.get("/cluster")
def get_cluster():

    return simulation_service.cluster()

@router.get("/settings")
def get_simulation_settings():

    return simulation_service.simulation_settings()


@router.post("/settings")
def update_simulation_settings(

    request: SimulationSettingsRequest

):

    return simulation_service.update_simulation_settings(

        scenario=SimulationScenario[

            request.scenario

        ],

        load_intensity=LoadIntensity[

            request.load_intensity

        ],

        max_ticks=request.max_ticks,

        arrival_probability=request.arrival_probability

    )

@router.get("/metrics")
def get_metrics():

    return simulation_service.metrics()

@router.get("/logs")
def get_logs():

    return simulation_service.logs()

@router.get("/report")
def export_report():

    filepath = simulation_service.export_report()

    return FileResponse(

        path=filepath,

        filename="ACRO_Cloud_Scheduling_Performance_Report.pdf",

        media_type="application/pdf"

    )

@router.get("/live/system")
def get_live_system():

    return MonitoringCollector.collect()["system"]


@router.get("/live/processes")
def get_live_processes():

    return MonitoringCollector.collect()["processes"]


@router.get("/live/resources")
def get_live_resources():

    return MonitoringCollector.collect()["resources"]


@router.get("/live/all")
def get_live_monitoring():

    return MonitoringCollector.collect()