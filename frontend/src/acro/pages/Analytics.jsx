import { useEffect, useState } from "react";

import HUDPanel from "../components/ui/HUDPanel";

import SchedulerSummary from "../components/analytics/SchedulerSummary";
import CPUChart from "../components/analytics/CPUChart";
import MemoryChart from "../components/analytics/MemoryChart";
import VMChart from "../components/analytics/VMChart";
import SimulationSummary from "../components/analytics/SimulationSummary";  

import {

    getMetrics

} from "../services/MetricsService";

import {

    exportReport

} from "../services/ReportService";

function Analytics() {

    const [

        metrics,

        setMetrics

    ] = useState([]);

    async function loadMetrics() {

        try {

            const data = await getMetrics();

            setMetrics(data);

        }

        catch (err) {

            console.error(err);

        }

    }
    async function handleExport() {

        try {

            const blob = await exportReport();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download =

                "ACRO_Cloud_Scheduling_Performance_Report.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadMetrics();

        const timer = setInterval(

            loadMetrics,

            1000

        );

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="space-y-6">

            <HUDPanel

                title="Simulation Analytics"

                subtitle="Performance Monitoring & Scheduler Evaluation"

            >
                <div className="flex justify-end">

                    <button

                        onClick={handleExport}

                        className="
                        rounded-xl
                        bg-cyan-500
                        hover:bg-cyan-400
                        text-black
                        font-semibold
                        px-5
                        py-3
                        transition
                        "

                    >

                        Export Report

                    </button>

                </div>

                <div className="space-y-8">

                    <SchedulerSummary

                        data={metrics}

                    />
                    <SimulationSummary

                        data={metrics}

                    />

                    <div

                        className="
                        grid
                        grid-cols-2
                        gap-6
                        "

                    >

                        <CPUChart

                            data={metrics}

                        />

                        <MemoryChart

                            data={metrics}

                        />

                    </div>

                    <VMChart

                        data={metrics}

                    />

                </div>

            </HUDPanel>

        </div>

    );

}

export default Analytics;