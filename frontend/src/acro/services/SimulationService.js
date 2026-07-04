import {
    startSimulation,
    resetSimulation,
    getSimulationStatus,
    changeScheduler
} from "../../services/api";

export async function start() {
    return (await startSimulation()).data;
}

export async function reset() {
    return (await resetSimulation()).data;
}

export async function status() {
    return (await getSimulationStatus()).data;
}

export async function scheduler(name) {
    return (await changeScheduler(name)).data;
}