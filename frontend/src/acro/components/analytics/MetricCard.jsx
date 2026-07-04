function MetricCard({

    title,

    value,

    color

}) {

    return (

        <div

            className="
            rounded-xl
            border
            border-cyan-500/10
            bg-[#08111f]
            p-5
            "

        >

            <p

                className="
                terminal
                text-xs
                tracking-[0.18em]
                text-slate-500
                "

            >

                {title}

            </p>

            <h2

                className={`
                orbitron
                text-4xl
                mt-3
                ${color}
                `}

            >

                {value}

            </h2>

        </div>

    );

}

export default MetricCard;