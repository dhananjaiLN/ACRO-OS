import { useEffect, useMemo, useState } from "react";

import HUDPanel from "../components/ui/HUDPanel";

import VMSummary from "../components/vm/VMSummary";
import VMToolbar from "../components/vm/VMToolbar";
import VMTable from "../components/vm/VMTable";

import { getVMs } from "../../services/api";

function VirtualMachines() {

    const [vms, setVMs] = useState([]);

    const [search, setSearch] = useState("");

    const [stateFilter, setStateFilter] = useState("ALL");

    const [sortBy, setSortBy] = useState("arrival");

    async function loadVMs() {

        try {

            const response = await getVMs();

            setVMs(response.data);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadVMs();

        const timer = setInterval(

            loadVMs,

            1000

        );

        return () => clearInterval(timer);

    }, []);

    const filteredVMs = useMemo(() => {

        let data = [...vms];

        if (search.trim() !== "") {

            data = data.filter(vm =>

                vm.vm_id

                    .toString()

                    .includes(search)

            );

        }

        if (stateFilter !== "ALL") {

            data = data.filter(

                vm => vm.state === stateFilter

            );

        }

        switch (sortBy) {

            case "priority":

                data.sort(

                    (a, b) =>

                        b.priority - a.priority

                );

                break;

            case "waiting":

                data.sort(

                    (a, b) =>

                        b.waiting_time - a.waiting_time

                );

                break;

            case "remaining":

                data.sort(

                    (a, b) =>

                        b.remaining_time - a.remaining_time

                );

                break;

            case "cpu":

                data.sort(

                    (a, b) =>

                        b.cpu_demand - a.cpu_demand

                );

                break;

            case "memory":

                data.sort(

                    (a, b) =>

                        b.memory_demand - a.memory_demand

                );

                break;

            default:

                data.sort(

                    (a, b) =>

                        a.arrival_time - b.arrival_time

                );

        }

        return data;

    }, [

        vms,

        search,

        stateFilter,

        sortBy

    ]);

    const waiting = vms.filter(

        vm => vm.state === "Waiting"

    ).length;

    const running = vms.filter(

        vm => vm.state === "Running"

    ).length;

    const completed = vms.filter(

        vm => vm.state === "Completed"

    ).length;

    return (

        <div className="space-y-6">

            <HUDPanel

                title="Virtual Machine Manager"

                subtitle="Live Workload Monitoring"

            >

                <div className="space-y-6">

                    <VMSummary

                        total={vms.length}

                        waiting={waiting}

                        running={running}

                        completed={completed}

                    />

                    <VMToolbar

                        search={search}

                        setSearch={setSearch}

                        stateFilter={stateFilter}

                        setStateFilter={setStateFilter}

                        sortBy={sortBy}

                        setSortBy={setSortBy}

                    />

                    <VMTable

                        vms={filteredVMs}

                    />

                </div>

            </HUDPanel>

        </div>

    );

}

export default VirtualMachines;