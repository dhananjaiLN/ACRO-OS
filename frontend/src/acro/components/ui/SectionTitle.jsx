function SectionTitle({

    title,

    subtitle

}) {

    return (

        <div>

            <h2

                className="
                orbitron
                text-xl
                text-cyan-300
                tracking-wide
                "

            >

                {title}

            </h2>

            <p

                className="
                terminal
                text-xs
                tracking-[0.15em]
                text-slate-500
                mt-1
                "

            >

                {subtitle}

            </p>

        </div>

    );

}

export default SectionTitle;