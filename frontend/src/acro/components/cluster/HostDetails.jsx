import { useEffect, useState } from "react";

import {

    Cpu,
    MemoryStick,
    Server,
    Trash2,
    Power,
    PowerOff,
    Save

} from "lucide-react";

import {

    editHost,
    removeHost,
    onlineHost,
    offlineHost

} from "../../services/ClusterService";

function HostDetails({

    host,

    refreshHosts

}) {

    const [cpu, setCpu] = useState(0);

    const [memory, setMemory] = useState(0);

    useEffect(() => {

        if (!host) return;

        setCpu(host.total_cpu);

        setMemory(host.total_memory);

    }, [host]);

    if (!host) {

        return (

            <div className="h-full flex items-center justify-center text-slate-500">

                Select a Host

            </div>

        );

    }

    async function updateResources() {

        await editHost(

            host.host_id,

            Number(cpu),

            Number(memory)

        );

        refreshHosts();

    }

    async function enable() {

        await onlineHost(host.host_id);

        refreshHosts();

    }

    async function disable() {

        await offlineHost(host.host_id);

        refreshHosts();

    }

    async function remove() {

        if (

            window.confirm(

                `Delete HOST-${host.host_id}?`

            )

        ) {

            await removeHost(host.host_id);

            refreshHosts();

        }

    }

    return (

        <div

            className="
            h-full
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            p-6
            space-y-6
            "

        >

            {/* Header */}

            <div>

                <h2 className="orbitron text-2xl text-cyan-300">

                    HOST-{host.host_id}

                </h2>

                <p className="terminal text-xs text-slate-500 mt-1">

                    Cluster Compute Node

                </p>

            </div>

            {/* Status */}

            <div className="grid grid-cols-2 gap-4">

                <InfoTile

                    icon={<Server size={18}/>}

                    label="STATUS"

                    value={host.status}

                />

                <InfoTile

                    icon={<Cpu size={18}/>}

                    label="RUNNING VMs"

                    value={host.running_vms}

                />

            </div>

            {/* CPU */}

            <div>

                <label className="terminal text-xs text-slate-500">

                    TOTAL CPU

                </label>

                <input

                    type="number"

                    value={cpu}

                    onChange={(e)=>setCpu(e.target.value)}

                    className="w-full mt-2 rounded-lg bg-[#07101d] border border-cyan-500/20 p-3"

                />

            </div>

            {/* Memory */}

            <div>

                <label className="terminal text-xs text-slate-500">

                    TOTAL MEMORY

                </label>

                <input

                    type="number"

                    value={memory}

                    onChange={(e)=>setMemory(e.target.value)}

                    className="w-full mt-2 rounded-lg bg-[#07101d] border border-cyan-500/20 p-3"

                />

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4">

                <Button

                    icon={<Save size={16}/>}

                    text="Update"

                    onClick={updateResources}

                />

                {

                    host.enabled ?

                    <Button

                        icon={<PowerOff size={16}/>}

                        text="Disable"

                        onClick={disable}

                    />

                    :

                    <Button

                        icon={<Power size={16}/>}

                        text="Enable"

                        onClick={enable}

                    />

                }

                <Button

                    icon={<Trash2 size={16}/>}

                    text="Delete"

                    danger

                    onClick={remove}

                />

            </div>

        </div>

    );

}

function InfoTile({

    icon,

    label,

    value

}) {

    return (

        <div

            className="
            rounded-lg
            bg-[#07101d]
            border
            border-cyan-500/10
            p-4
            "

        >

            <div className="flex items-center gap-2 text-cyan-300">

                {icon}

                <span className="terminal text-xs">

                    {label}

                </span>

            </div>

            <h3 className="orbitron text-xl mt-3">

                {value}

            </h3>

        </div>

    );

}

function Button({

    icon,

    text,

    onClick,

    danger

}) {

    return (

        <button

            onClick={onClick}

            className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                p-3
                transition-all

                ${
                    danger

                    ?

                    "bg-red-600 hover:bg-red-700"

                    :

                    "bg-cyan-500/20 hover:bg-cyan-500/30"
                }

            `}

        >

            {icon}

            {text}

        </button>

    );

}

export default HostDetails;