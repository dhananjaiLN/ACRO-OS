function StateBadge({ state }) {

    const value = state.toUpperCase();

    let color =
        "bg-slate-500/20 text-slate-300 border-slate-500/20";

    if (value === "RUNNING") {

        color =
            "bg-green-500/20 text-green-400 border-green-500/20";

    }

    else if (value === "WAITING") {

        color =
            "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

    }

    else if (value === "COMPLETED") {

        color =
            "bg-purple-500/20 text-purple-400 border-purple-500/20";

    }

    return (

        <span

            className={`
                px-3
                py-1
                rounded-full
                text-xs
                border
                font-semibold
                ${color}
            `}

        >

            {state}

        </span>

    );

}

function VMTable({

    vms,

    compact = false

}) {

    return (

        <div

            className="
            h-full
            overflow-y-auto
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            "

        >

            <table className="w-full">

                <thead

                    className="
                    sticky
                    top-0
                    bg-[#0b1626]
                    border-b
                    border-cyan-500/10
                    "

                >

                    <tr>

                        <th className="p-4 text-left">VM</th>

                        <th className="p-4 text-left">WORKLOAD</th>

                        <th className="p-4 text-left">STATE</th>

                        <th className="p-4 text-left">HOST</th>

                        <th className="p-4 text-left">CPU</th>

                        <th className="p-4 text-left">MEM</th>

                        <th className="p-4 text-left">REMAIN</th>

                        {

                            !compact &&

                            <th className="p-4 text-left">

                                WAIT

                            </th>

                        }

                        {

                            !compact &&

                            <th className="p-4 text-left">

                                PRIORITY

                            </th>

                        }

                        {

                            !compact &&

                            <th className="p-4 text-left">

                                WEIGHT

                            </th>

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        vms.length === 0 ?

                        (

                            <tr>

                                <td

                                    colSpan={compact ? 6 : 9}

                                    className="
                                    text-center
                                    py-12
                                    text-slate-500
                                    "

                                >

                                    No Virtual Machines Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            vms.map(vm => (

                                <tr

                                    key={vm.vm_id}

                                    className="
                                    border-b
                                    border-cyan-500/5
                                    hover:bg-cyan-500/5
                                    transition-colors
                                    "

                                >

                                    <td className="p-4 font-semibold text-cyan-300">

                                        VM-{vm.vm_id}

                                    </td>

                                    <td className="p-4 text-cyan-200">

                                        {vm.workload_type}

                                    </td>

                                    <td className="p-4">

                                        <StateBadge

                                            state={vm.state}

                                        />

                                    </td>

                                    <td className="p-4">

                                        {

                                            vm.host

                                            ?

                                            `HOST-${vm.host}`

                                            :

                                            "-"

                                        }

                                    </td>

                                    <td className="p-4">

                                        {vm.cpu_demand}

                                    </td>

                                    <td className="p-4">

                                        {vm.memory_demand}

                                    </td>

                                    <td className="p-4">

                                        {vm.remaining_time}

                                    </td>

                                    {

                                        !compact &&

                                        <td className="p-4">

                                            {vm.waiting_time}

                                        </td>

                                    }

                                    {

                                        !compact &&

                                        <td className="p-4">

                                            {vm.priority}

                                        </td>

                                    }

                                    {

                                        !compact &&

                                        <td className="p-4">

                                            {vm.weight}

                                        </td>

                                    }

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default VMTable;