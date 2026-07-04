import {

    getSettings,

    saveSettings

} from "../../services/api";

export async function getSimulationSettings() {

    const response = await getSettings();

    return response.data;

}

export async function updateSimulationSettings(

    settings

) {

    const response = await saveSettings(

        settings

    );

    return response.data;

}