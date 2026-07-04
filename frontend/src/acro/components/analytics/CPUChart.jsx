import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer

} from "recharts";

function CPUChart({

    data

}) {

    return (

        <div

            className="
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            p-5
            h-[350px]
            "

        >

            <h3

                className="
                orbitron
                text-cyan-300
                mb-6
                "

            >

                CPU Utilization

            </h3>

            <ResponsiveContainer

                width="100%"

                height="90%"

            >

                <LineChart

                    data={data}

                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="tick"

                    />

                    <YAxis

                        domain={[0, 100]}

                    />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="cpu_utilization"

                        stroke="#00E5FF"

                        strokeWidth={3}

                        dot={false}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default CPUChart;