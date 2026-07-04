import { useState } from "react";

import {

    Plus,
    X

} from "lucide-react";

import {

    addHost

} from "../../services/ClusterService";

function AddHostModal({

    open,

    onClose,

    refreshHosts

}) {

    const [cpu, setCpu] = useState(40);

    const [memory, setMemory] = useState(64);

    if (!open) {

        return null;

    }

    async function create() {

        await addHost(

            Number(cpu),

            Number(memory)

        );

        refreshHosts();

        onClose();

    }

    return (

        <div

            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            "

        >

            <div

                className="
                w-[520px]
                rounded-2xl
                border
                border-cyan-500/20
                bg-[#07101d]
                p-8
                shadow-[0_0_35px_rgba(34,211,238,0.2)]
                "

            >

                {/* Header */}

                <div className="flex justify-between items-center">

                    <div>

                        <h2

                            className="
                            orbitron
                            text-2xl
                            text-cyan-300
                            "

                        >

                            Add Compute Node

                        </h2>

                        <p

                            className="
                            terminal
                            text-xs
                            text-slate-500
                            mt-1
                            "

                        >

                            Register a new host in the cluster

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                    >

                        <X

                            size={22}

                            className="text-slate-400 hover:text-red-400"

                        />

                    </button>

                </div>

                {/* CPU */}

                <div className="mt-8">

                    <label

                        className="
                        terminal
                        text-xs
                        text-slate-500
                        "

                    >

                        CPU CORES

                    </label>

                    <input

                        type="number"

                        value={cpu}

                        onChange={(e)=>setCpu(e.target.value)}

                        className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-[#08111f]
                        p-4
                        "

                    />

                </div>

                {/* Memory */}

                <div className="mt-6">

                    <label

                        className="
                        terminal
                        text-xs
                        text-slate-500
                        "

                    >

                        MEMORY (GB)

                    </label>

                    <input

                        type="number"

                        value={memory}

                        onChange={(e)=>setMemory(e.target.value)}

                        className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-[#08111f]
                        p-4
                        "

                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 mt-10">

                    <button

                        onClick={onClose}

                        className="
                        px-6
                        py-3
                        rounded-xl
                        bg-slate-700
                        hover:bg-slate-600
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={create}

                        className="
                        flex
                        items-center
                        gap-2
                        px-6
                        py-3
                        rounded-xl
                        bg-cyan-500/20
                        hover:bg-cyan-500/30
                        border
                        border-cyan-500/20
                        "

                    >

                        <Plus size={18}/>

                        Create Host

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddHostModal;