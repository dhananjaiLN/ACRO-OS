function StatCard({

    title,

    value,

    icon,

    color = "text-cyan-300"

}) {

    return (

        <div

            className="
            rounded-2xl
            border
            border-cyan-500/15
            bg-[#09111f]
            p-5
            transition-all
            duration-300
            hover:border-cyan-400/40
            hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
            "

        >

            <div className="flex items-center justify-between">

                <span

                    className="
                    terminal
                    text-[11px]
                    tracking-[0.18em]
                    text-slate-500
                    "

                >

                    {title.toUpperCase()}

                </span>

                {icon && (

                    <div className="text-cyan-400">

                        {icon}

                    </div>

                )}

            </div>

            <h2

                className={`

                mt-4

                orbitron

                text-3xl

                font-semibold

                ${color}

                `}

            >

                {value}

            </h2>

        </div>

    );

}

export default StatCard;