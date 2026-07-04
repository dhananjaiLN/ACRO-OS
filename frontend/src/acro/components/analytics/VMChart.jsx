import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts";

function VMChart({

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
            h-[380px]
            "

        >

            <h3

                className="
                orbitron
                text-cyan-300
                mb-6
                "

            >

                Virtual Machine Activity

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

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line

                        type="monotone"

                        dataKey="running_vms"

                        name="Running"

                        stroke="#22C55E"

                        strokeWidth={3}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="waiting_vms"

                        name="Waiting"

                        stroke="#FACC15"

                        strokeWidth={3}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="completed_vms"

                        name="Completed"

                        stroke="#A855F7"

                        strokeWidth={3}

                        dot={false}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default VMChart;