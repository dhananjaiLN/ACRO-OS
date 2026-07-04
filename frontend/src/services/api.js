import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

// --------------------
// Simulation
// --------------------

export const startSimulation = () =>
    api.post("/simulation/start");

export const resetSimulation = () =>
    api.post("/simulation/reset");

export const getSimulationStatus = () =>
    api.get("/simulation/status");

// --------------------
// Cluster
// --------------------

export const getCluster = () =>
    api.get("/cluster");

export const getHosts = () =>
    api.get("/hosts");

export const createHost = (cpu, memory) =>
    api.post("/hosts", {
        cpu,
        memory
    });

export const updateHost = (hostId, cpu, memory) =>
    api.put(`/hosts/${hostId}`, {
        cpu,
        memory
    });

export const deleteHost = (hostId) =>
    api.delete(`/hosts/${hostId}`);

export const enableHost = (hostId) =>
    api.post(`/hosts/${hostId}/enable`);

export const disableHost = (hostId) =>
    api.post(`/hosts/${hostId}/disable`);

export const getVMs = () =>
    api.get("/vms");

// --------------------
// Scheduler
// --------------------

export const changeScheduler = (algorithm) =>
    api.post("/scheduler", {
        algorithm
    });

export default api;

// --------------------
// Simulation Settings
// --------------------

export const getSettings = () =>

    api.get("/settings");

export const saveSettings = (settings) =>

    api.post("/settings", settings);

// --------------------
// Metrics
// --------------------

export const getMetrics = () =>

    api.get("/metrics");

// --------------------
// Logs
// --------------------

export const getLogs = () =>
    api.get("/logs");

// --------------------
// Report
// --------------------

export const downloadReport = () =>

    api.get(

        "/report",

        {

            responseType: "blob"

        }

    );