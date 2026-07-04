import {

    BrowserRouter,

    Routes,

    Route,

    Navigate

} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Cluster from "../pages/Cluster";
import VirtualMachines from "../pages/VirtualMachines";
import Scheduler from "../pages/Scheduler";
import Analytics from "../pages/Analytics";
import Migration from "../pages/Migration";
import Architecture from "../pages/Architecture";
import Settings from "../pages/Settings";
import LiveMonitor from "../pages/LiveMonitor";
import SchedulerAnalysis from "../pages/SchedulerAnalysis";

function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/cluster" element={<Cluster />} />

                    <Route path="/vms" element={<VirtualMachines />} />

                    <Route path="/scheduler" element={<Scheduler />} />

                    <Route path="/analytics" element={<Analytics />} />

                    <Route path="/live-monitor" element={<LiveMonitor />} />

                    <Route path="/scheduler-analysis" element={<SchedulerAnalysis />}/>

                    <Route path="/migration" element={<Migration />} />

                    <Route path="/architecture" element={<Architecture />} />

                    <Route path="/settings" element={<Settings />} />

                </Route>

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRouter;