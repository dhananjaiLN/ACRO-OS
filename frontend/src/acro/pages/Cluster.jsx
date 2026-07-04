import { useEffect, useState } from "react";

import HUDPanel from "../components/ui/HUDPanel";

import HostList from "../components/cluster/HostList";
import HostDetails from "../components/cluster/HostDetails";
import AddHostModal from "../components/cluster/AddHostModal";

import { getAllHosts } from "../services/ClusterService";

import { Plus } from "lucide-react";

function Cluster() {

    const [hosts, setHosts] = useState([]);

    const [selectedHostId, setSelectedHostId] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    async function loadHosts() {

        try {

            const data = await getAllHosts();

            setHosts(data);

            if (data.length === 0) {

                setSelectedHostId(null);

                return;

            }

            setSelectedHostId(previousId => {

                if (previousId === null) {

                    return data[0].host_id;

                }

                const exists = data.some(

                    host => host.host_id === previousId

                );

                return exists

                    ? previousId

                    : data[0].host_id;

            });

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadHosts();

        const timer = setInterval(

            loadHosts,

            1000

        );

        return () => clearInterval(timer);

    }, []);

    const selectedHost = hosts.find(

        host => host.host_id === selectedHostId

    );

    return (

        <div className="space-y-6">

            <HUDPanel

                title="Cluster Manager"

                subtitle="Cloud Infrastructure Control"

            >

                <div className="flex justify-end mb-6">

                    <button

                        onClick={() =>

                            setShowAddModal(true)

                        }

                        className="

                        flex

                        items-center

                        gap-2

                        rounded-xl

                        border

                        border-cyan-500/20

                        bg-cyan-500/10

                        hover:bg-cyan-500/20

                        px-5

                        py-3

                        transition-all

                        "

                    >

                        <Plus size={18} />

                        Add Host

                    </button>

                </div>

                <div

                    className="

                    grid

                    grid-cols-12

                    gap-6

                    "

                >

                    <div className="col-span-4">

                        <HostList

                            hosts={hosts}

                            selectedHost={selectedHost}

                            onSelect={(host) =>

                                setSelectedHostId(host.host_id)

                            }

                        />

                    </div>

                    <div className="col-span-8">

                        <HostDetails

                            host={selectedHost}

                            refreshHosts={loadHosts}

                        />

                    </div>

                </div>

            </HUDPanel>

            <AddHostModal

                open={showAddModal}

                onClose={() =>

                    setShowAddModal(false)

                }

                refreshHosts={loadHosts}

            />

        </div>

    );

}

export default Cluster;