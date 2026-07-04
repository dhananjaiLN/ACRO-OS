from os_scheduler.workload_builder import WorkloadBuilder

from os_scheduler.scheduler_runner import SchedulerRunner

from os_scheduler.recommendation import RecommendationEngine


print("\nCollecting workload...\n")

workload = WorkloadBuilder.build()

print(f"Processes Selected : {len(workload)}")

print()

results = SchedulerRunner.run_all(

    workload

)

for algorithm, result in results.items():

    print("=" * 60)

    print(algorithm)

    print("=" * 60)

    for key, value in result["metrics"].items():

        print(f"{key:<30}{value}")

    print()

recommendation = RecommendationEngine.recommend(

    results

)

print("=" * 60)

print("FINAL RECOMMENDATION")

print("=" * 60)

print()

print(

    recommendation["recommended_scheduler"]

)

print()

print(

    recommendation["reason"]

)