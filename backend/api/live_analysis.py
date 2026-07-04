from fastapi import APIRouter

from os_scheduler.workload_builder import WorkloadBuilder
from os_scheduler.scheduler_runner import SchedulerRunner
from os_scheduler.recommendation import RecommendationEngine

router = APIRouter()


@router.post("/live/analyze")
def analyze_live_system():

    workload = WorkloadBuilder.build()

    results = SchedulerRunner.run_all(workload)

    recommendation = RecommendationEngine.recommend(results)

    response = {
        "workload_size": len(workload),
        "results": {},
        "recommendation": recommendation
    }

    for algorithm, result in results.items():

        response["results"][algorithm] = {
            "metrics": result["metrics"],
            "timeline": [
                {
                    "pid": event.pid,
                    "name": event.name,
                    "start": event.start,
                    "end": event.end,
                    "algorithm": event.algorithm
                }
                for event in result["timeline"]
            ]
        }

    return response