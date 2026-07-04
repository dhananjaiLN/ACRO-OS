class RecommendationEngine:

    @staticmethod
    def recommend(results):

        best_algorithm = None

        best_waiting = float("inf")

        for algorithm, result in results.items():

            waiting = result["metrics"]["average_waiting_time"]

            if waiting < best_waiting:

                best_waiting = waiting

                best_algorithm = algorithm

        return {

            "recommended_scheduler": best_algorithm,

            "reason": (

                f"{best_algorithm} achieved the "

                "lowest average waiting time."

            )

        }