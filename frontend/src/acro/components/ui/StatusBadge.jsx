function StatusBadge({

    online,

    text

}) {

    return (

        <div

            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-500/20
            bg-[#09111f]
            px-4
            py-2
            "

        >

            <div

                className={`

                h-2.5

                w-2.5

                rounded-full

                ${

                    online

                    ?

                    "bg-green-400 shadow-[0_0_12px_#4ade80]"

                    :

                    "bg-red-400 shadow-[0_0_12px_#f87171]"

                }

                `}

            />

            <span

                className="
                terminal
                text-xs
                tracking-[0.15em]
                text-slate-300
                "

            >

                {text}

            </span>

        </div>

    );

}

export default StatusBadge;