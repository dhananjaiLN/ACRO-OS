import { getLogs } from "./api";

export async function fetchLogs() {

    const response = await getLogs();

    return response.data;

}