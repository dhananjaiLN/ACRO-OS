import HUDPanel from "../components/ui/HUDPanel";

import MissionControl from "../components/dashboard/MissionControl";

import ClusterOverview from "../components/cluster/ClusterOverview";

import HostGrid from "../components/cluster/HostGrid";

import KernelConsole from "../components/logs/KernelConsole";

import VirtualMachineMonitor from "../components/dashboard/VirtualMachineMonitor";

function Dashboard() {

    return (

        <div className="grid grid-cols-12 gap-6">

            {/* ========================================= */}

            {/* Mission Control */}

            {/* ========================================= */}

            <HUDPanel

                title="Mission Control"

                subtitle="Simulation Controller"

                className="col-span-12"

            >

                <MissionControl />

            </HUDPanel>

            {/* ========================================= */}

            {/* Cluster */}

            {/* ========================================= */}

            <HUDPanel

                title="Cluster Overview"

                subtitle="Live Cluster Metrics"

                className="col-span-8"

            >

                <ClusterOverview />

            </HUDPanel>

            <HUDPanel

                title="Compute Nodes"

                subtitle="Host Health"

                className="col-span-4"

            >

                <HostGrid />

            </HUDPanel>


            {/* ========================================= */}

            {/* Kernel */}

            {/* ========================================= */}

            <HUDPanel

                title="Kernel Console"

                subtitle="Live System Events"

                className="col-span-12 h-[320px]"

            >

                <KernelConsole />

            </HUDPanel>

            {/* ========================================= */}

            {/* Virtual Machines */}

            {/* ========================================= */}

            <HUDPanel

                title="Virtual Machine Monitor"

                subtitle="Running / Waiting / Completed"

                className="col-span-12 h-[420px]"

            >

                <VirtualMachineMonitor />

            </HUDPanel>

        </div>

    );

}

export default Dashboard;