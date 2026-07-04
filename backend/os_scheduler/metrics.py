class SchedulerMetrics:

    @staticmethod
    def calculate(processes):

        if not processes:
            return {}

        n = len(processes)

        avg_waiting = sum(
            p.waiting_time
            for p in processes
        ) / n

        avg_turnaround = sum(
            p.turnaround_time
            for p in processes
        ) / n

        avg_response = sum(
            p.response_time
            for p in processes
        ) / n

        total_burst = sum(
            p.burst_time
            for p in processes
        )

        total_completion = max(
            p.completion_time
            for p in processes
        )

        throughput = (
            n / total_completion
            if total_completion > 0
            else 0
        )

        cpu_utilization = (
            (total_burst / total_completion) * 100
            if total_completion > 0
            else 0
        )

        return {

            "processes": n,

            "average_waiting_time": round(
                avg_waiting,
                2
            ),

            "average_turnaround_time": round(
                avg_turnaround,
                2
            ),

            "average_response_time": round(
                avg_response,
                2
            ),

            "throughput": round(
                throughput,
                3
            ),

            "cpu_utilization": round(
                cpu_utilization,
                2
            )
        }