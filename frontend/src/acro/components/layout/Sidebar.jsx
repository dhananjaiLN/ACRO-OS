import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Server,
    Boxes,
    ChartSpline,
    Terminal,
    Activity,
    Settings,
    Circle
} from "lucide-react";

const modules = [

    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/"
    },

    {
        name: "Cluster",
        icon: Server,
        path: "/cluster"
    },

    {
        name: "Virtual Machines",
        icon: Boxes,
        path: "/vms"
    },

    {
        name: "Analytics",
        icon: ChartSpline,
        path: "/analytics"
    },

    {
    name: "Live Monitor",
    icon: Activity,
    path: "/live-monitor"
    },

    {
    name: "Scheduler Analysis",
    icon: Activity,
    path: "/scheduler-analysis"
    },
    
    {
        name: "Architecture",
        icon: Terminal,
        path: "/architecture"
    }

];

function Sidebar() {

    return (

        <aside
            className="
            w-72
            border-r
            border-cyan-500/20
            bg-[#07101d]/90
            backdrop-blur-xl
            flex
            flex-col
            justify-between
            p-6
            "
        >

            {/* TOP */}

            <div>

                <p
                    className="
                    terminal
                    text-xs
                    tracking-[0.25em]
                    text-cyan-400
                    mb-8
                    "
                >

                    SYSTEM MODULES

                </p>

                {

                    modules.map((module) => {

                        const Icon = module.icon;

                        return (

                            <NavLink

                                key={module.name}

                                to={module.path}

                                className={({ isActive }) => `

                                flex

                                items-center

                                gap-4

                                rounded-xl

                                px-4

                                py-4

                                mb-3

                                transition-all

                                duration-300

                                ${

                                    isActive

                                        ?

                                        "bg-cyan-500/20 border border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,.25)]"

                                        :

                                        "hover:bg-cyan-500/10"

                                }

                                `}

                            >

                                <Icon

                                    size={20}

                                    className="text-cyan-300"

                                />

                                <span className="tracking-wide">

                                    {module.name}

                                </span>

                            </NavLink>

                        );

                    })

                }

            </div>

            {/* BOTTOM */}

            <div>

                <div
                    className="
                    border-t
                    border-cyan-500/20
                    pt-6
                    "
                >

                    <NavLink

                        to="/settings"

                        className={({ isActive }) => `

                        flex

                        items-center

                        gap-4

                        rounded-xl

                        px-4

                        py-4

                        transition-all

                        ${

                            isActive

                            ?

                            "bg-cyan-500/20 border border-cyan-400"

                            :

                            "hover:bg-cyan-500/10"

                        }

                        `}

                    >

                        <Settings

                            size={20}

                            className="text-cyan-300"

                        />

                        Settings

                    </NavLink>

                </div>

                <div
                    className="
                    mt-8
                    rounded-xl
                    border
                    border-cyan-500/10
                    bg-[#08111f]
                    p-4
                    "
                >

                    <div className="flex items-center gap-2">

                        <Circle

                            size={10}

                            fill="#22c55e"

                            color="#22c55e"

                        />

                        <span className="terminal text-xs text-green-400">

                            BACKEND CONNECTED

                        </span>

                    </div>

                    <p className="terminal text-[10px] text-slate-500 mt-3">

                        ACRO OS v1.0

                    </p>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;