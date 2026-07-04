import {

    getMetrics as fetchMetrics

} from "../../services/api";

export async function getMetrics() {

    const response = await fetchMetrics();

    return response.data;

}