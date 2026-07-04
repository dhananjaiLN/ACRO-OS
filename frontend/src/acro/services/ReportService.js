import api from "../../services/api";

export async function exportReport() {

    const response = await api.get(

        "/report",

        {

            responseType: "blob"

        }

    );

    return response.data;

}