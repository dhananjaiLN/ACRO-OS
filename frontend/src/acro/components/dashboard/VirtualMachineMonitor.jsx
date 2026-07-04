import { useEffect, useState } from "react";

import VMTable from "../vm/VMTable";

import {

    getVMs

} from "../../../services/api";

function VirtualMachineMonitor() {

    const [

        vms,

        setVMs

    ] = useState([]);

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

    return (

        <div className="h-full">

            <VMTable

                vms={vms}

                compact={true}

            />

        </div>

    );

}

export default VirtualMachineMonitor;