import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

const COLORS = [
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#A855F7",
    "#EF4444"
];

function SchedulerComparisonChart({ analysis }) {

    if (!analysis) return null;

    const data = Object.entries(analysis.results).map(

        ([algorithm, value], index) => ({

            algorithm,

            waiting: Number(value.metrics.average_waiting_time.toFixed(1)),

            response: Number(value.metrics.average_response_time.toFixed(1)),

            turnaround: Number(value.metrics.average_turnaround_time.toFixed(1)),

            color: COLORS[index]

        })

    );

    return (

        <div
            className="
            mt-8
            rounded-3xl
            border
            border-cyan-500/20
            bg-gradient-to-br
            from-[#111827]
            to-[#091321]
            p-8
            "
        >

            <div className="mb-8">

                <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs">

                    PERFORMANCE COMPARISON

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    Scheduler Performance

                </h2>

            </div>

            <div style={{ width: "100%", height: 420 }}>

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <CartesianGrid
                            stroke="#1f2937"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="algorithm"
                            tick={{ fill: "#94A3B8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: "#94A3B8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip

                            contentStyle={{

                                background: "#08111f",

                                border: "1px solid #06B6D4",

                                borderRadius: "12px"

                            }}

                        />

                        <Bar
                            dataKey="waiting"
                            radius={[8,8,0,0]}
                        >

                            {

                                data.map((entry,index)=>(

                                    <Cell

                                        key={index}

                                        fill={entry.color}

                                    />

                                ))

                            }

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default SchedulerComparisonChart;