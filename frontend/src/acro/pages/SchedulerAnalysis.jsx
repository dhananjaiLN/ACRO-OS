import { useState } from "react";
import SchedulerComparisonChart from "../components/analytics/SchedulerComparisonChart";
function SchedulerAnalysis() {

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState(null);

    async function analyze() {

        setLoading(true);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/live/analyze",
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            setAnalysis(data);

        }

        catch (err) {

            console.error(err);

        }

        setLoading(false);

    }

    return (

        <div className="p-10">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Scheduler Analysis

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Analyze your current operating system workload using multiple scheduling algorithms.

                    </p>

                </div>

                <button

                    onClick={analyze}

                    className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"

                >

                    {

                        loading

                            ?

                            "Analyzing..."

                            :

                            "Analyze Live Workload"

                    }

                </button>

            </div>

            {

                analysis &&

                <>

                    <div
                        className="
                        mt-10
                        rounded-3xl
                        border
                        border-cyan-400/30
                        bg-gradient-to-r
                        from-cyan-950
                        via-slate-900
                        to-slate-950
                        p-8
                        shadow-[0_0_40px_rgba(6,182,212,0.2)]
                        "
                    >

                        <p
                            className="
                            uppercase
                            tracking-[0.3em]
                            text-cyan-400
                            text-xs
                            terminal
                            "
                        >
                            AI Scheduler Recommendation
                        </p>

                        <div className="flex justify-between items-center mt-6">

                            <div>

                                <h1 className="text-5xl font-bold">

                                    ⭐ {analysis.recommendation.recommended_scheduler}

                                </h1>

                                <p className="mt-5 text-lg text-slate-300 max-w-3xl">

                                    {analysis.recommendation.reason}

                                </p>

                            </div>

                            <div
                                className="
                                rounded-2xl
                                border
                                border-cyan-500/20
                                bg-black/30
                                px-8
                                py-5
                                text-center
                                "
                            >

                                <p className="text-xs text-slate-400">

                                    PROCESSES

                                </p>

                                <p className="text-4xl font-bold text-cyan-400">

                                    {analysis.workload_size}

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="mt-10 overflow-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-cyan-500/20">

                                    <th className="py-4 text-left">

                                        Algorithm

                                    </th>

                                    <th>

                                        Waiting

                                    </th>

                                    <th>

                                        Response

                                    </th>

                                    <th>

                                        Turnaround

                                    </th>

                                    <th>

                                        Throughput

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    Object.entries(

                                        analysis.results

                                    ).map(

                                        ([algorithm, value]) => (

                                            <tr

                                                key={algorithm}

                                                className="border-b border-slate-800"

                                            >

                                                <td className="py-4 font-semibold">

                                                    {

                                                        algorithm === analysis.recommendation.recommended_scheduler

                                                            ?

                                                            "⭐ " + algorithm

                                                            :

                                                            algorithm

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        value.metrics.average_waiting_time

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        value.metrics.average_response_time

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        value.metrics.average_turnaround_time

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        value.metrics.throughput

                                                    }

                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                            </tbody>

                        </table>
                        <SchedulerComparisonChart analysis={analysis} />

                    </div>

                </>

            }

        </div>

    );

}

export default SchedulerAnalysis;