import api from "../../services/api";
import {

    getHosts,

    createHost,

    updateHost,

    deleteHost,

    enableHost,

    disableHost

} from "../../services/api";

export async function getCluster() {

    const response = await api.get("/cluster");

    return response.data;

}

export async function getAllHosts() {

    const response = await getHosts();

    return response.data;

}

export async function addHost(cpu, memory) {

    const response = await createHost(cpu, memory);

    return response.data;

}

export async function editHost(id, cpu, memory) {

    const response = await updateHost(

        id,

        cpu,

        memory

    );

    return response.data;

}

export async function removeHost(id) {

    const response = await deleteHost(id);

    return response.data;

}

export async function onlineHost(id) {

    const response = await enableHost(id);

    return response.data;

}

export async function offlineHost(id) {

    const response = await disableHost(id);

    return response.data;

}