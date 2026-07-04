import { Search } from "lucide-react";

function VMToolbar({

    search,

    setSearch,

    stateFilter,

    setStateFilter,

    sortBy,

    setSortBy

}) {

    return (

        <div

            className="
            flex
            items-center
            justify-between
            gap-5
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            p-5
            "

        >

            {/* Search */}

            <div

                className="
                flex
                items-center
                gap-3
                flex-1
                rounded-xl
                border
                border-cyan-500/10
                bg-[#0b1626]
                px-4
                py-3
                "

            >

                <Search

                    size={18}

                    className="text-cyan-400"

                />

                <input

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    placeholder="Search VM ID..."

                    className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-slate-200
                    placeholder:text-slate-500
                    "

                />

            </div>

            {/* State Filter */}

            <select

                value={stateFilter}

                onChange={(e) =>

                    setStateFilter(e.target.value)

                }

                className="
                rounded-xl
                border
                border-cyan-500/20
                bg-[#0b1626]
                px-4
                py-3
                text-slate-200
                "

            >

                <option value="ALL">

                    All States

                </option>

                <option value="Waiting">

                    Waiting

                </option>

                <option value="Running">

                    Running

                </option>

                <option value="Completed">

                    Completed

                </option>

            </select>

            {/* Sort */}

            <select

                value={sortBy}

                onChange={(e) =>

                    setSortBy(e.target.value)

                }

                className="
                rounded-xl
                border
                border-cyan-500/20
                bg-[#0b1626]
                px-4
                py-3
                text-slate-200
                "

            >

                <option value="arrival">

                    Arrival Time

                </option>

                <option value="priority">

                    Priority

                </option>

                <option value="waiting">

                    Waiting Time

                </option>

                <option value="remaining">

                    Remaining Time

                </option>

                <option value="cpu">

                    CPU Demand

                </option>

                <option value="memory">

                    Memory Demand

                </option>

            </select>

        </div>

    );

}

export default VMToolbar;