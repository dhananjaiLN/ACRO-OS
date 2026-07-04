import { useEffect, useState } from "react";

import HUDPanel from "../components/ui/HUDPanel";

import {

    getSimulationSettings,

    updateSimulationSettings

} from "../services/SettingsService";

function Settings() {

    const [

        scenario,

        setScenario

    ] = useState("MIXED");

    const [

        load,

        setLoad

    ] = useState("NORMAL");

    const [

        maxTicks,

        setMaxTicks

    ] = useState(100);

    const [

        arrivalProbability,

        setArrivalProbability

    ] = useState(0.6);

    async function loadSettings() {

        try {

            const data = await getSimulationSettings();

            setScenario(data.scenario);

            setLoad(data.load_intensity);

            setMaxTicks(data.max_ticks);

            setArrivalProbability(

                data.arrival_probability

            );

        }

        catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadSettings();

    }, []);

    async function saveSettings() {

        try {

            await updateSimulationSettings({

                scenario,

                load_intensity: load,

                max_ticks: Number(maxTicks),

                arrival_probability: Number(arrivalProbability)

            });

            alert("Simulation configuration updated.");

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <HUDPanel

            title="Simulation Settings"

            subtitle="Configure Simulation Behaviour"

        >

            <div className="space-y-6 max-w-3xl">

                <div>

                    <label className="block mb-2 text-cyan-300">

                        Simulation Scenario

                    </label>

                    <select

                        value={scenario}

                        onChange={e =>

                            setScenario(e.target.value)

                        }

                        className="w-full rounded-xl bg-[#08111f] border border-cyan-500/20 p-3"

                    >

                        <option value="MIXED">

                            Mixed Cloud

                        </option>

                        <option value="ENTERPRISE">

                            Enterprise

                        </option>

                        <option value="AI_CLUSTER">

                            AI Cluster

                        </option>

                        <option value="MICROSERVICES">

                            Microservices

                        </option>

                        <option value="DATABASE">

                            Database Cluster

                        </option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2 text-cyan-300">

                        Load Intensity

                    </label>

                    <select

                        value={load}

                        onChange={e =>

                            setLoad(e.target.value)

                        }

                        className="w-full rounded-xl bg-[#08111f] border border-cyan-500/20 p-3"

                    >

                        <option value="LIGHT">

                            Light

                        </option>

                        <option value="NORMAL">

                            Normal

                        </option>

                        <option value="HEAVY">

                            Heavy

                        </option>

                        <option value="BURST">

                            Burst

                        </option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2 text-cyan-300">

                        Maximum Simulation Ticks

                    </label>

                    <input

                        type="number"

                        value={maxTicks}

                        min={10}

                        onChange={e =>

                            setMaxTicks(e.target.value)

                        }

                        className="w-full rounded-xl bg-[#08111f] border border-cyan-500/20 p-3"

                    />

                </div>

                <div>

                    <label className="block mb-2 text-cyan-300">

                        Arrival Probability

                    </label>

                    <input

                        type="number"

                        step="0.05"

                        min="0"

                        max="1"

                        value={arrivalProbability}

                        onChange={e =>

                            setArrivalProbability(

                                e.target.value

                            )

                        }

                        className="w-full rounded-xl bg-[#08111f] border border-cyan-500/20 p-3"

                    />

                </div>

                <button

                    onClick={saveSettings}

                    className="
                    rounded-xl
                    bg-cyan-500
                    hover:bg-cyan-400
                    px-6
                    py-3
                    font-semibold
                    text-black
                    transition
                    "

                >

                    Save Configuration

                </button>

            </div>

        </HUDPanel>

    );

}

export default Settings;