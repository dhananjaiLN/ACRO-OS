function HUDPanel({

    title,
    subtitle,
    children,
    className = ""

}) {

    return (

        <section

            className={`
                relative
                flex 
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-cyan-500/20
                bg-[#08111f]/80
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-cyan-400/40
                hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
                ${className}
            `}

        >

            {/* Top Accent */}

            <div

                className="
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-full
                    bg-gradient-to-r
                    from-cyan-500
                    via-cyan-300
                    to-transparent
                "

            />

            {/* Decorative Corners */}

            <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-cyan-400/70 rounded-tl-xl"></div>

            <div className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-cyan-400/70 rounded-tr-xl"></div>

            <div className="absolute left-0 bottom-0 h-5 w-5 border-l-2 border-b-2 border-cyan-400/70 rounded-bl-xl"></div>

            <div className="absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-cyan-400/70 rounded-br-xl"></div>

            {/* Header */}

            <div

                className="
                    flex
                    items-center
                    justify-between
                    px-6
                    pt-5
                    pb-4
                    border-b
                    border-cyan-500/10
                "

            >

                <div>

                    <h2

                        className="
                            orbitron
                            text-lg
                            tracking-wider
                            text-cyan-300
                        "

                    >

                        {title}

                    </h2>

                    <p

                        className="
                            terminal
                            text-[11px]
                            tracking-[0.18em]
                            text-slate-500
                            mt-1
                        "

                    >

                        {subtitle}

                    </p>

                </div>

                {/* LIVE Indicator */}

                <div

                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-cyan-500/20
                        bg-[#0b1626]
                        px-3
                        py-1.5
                    "

                >

                    <span

                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-green-400
                            shadow-[0_0_10px_#4ade80]
                            animate-pulse
                        "

                    />

                    <span

                        className="
                            terminal
                            text-[10px]
                            tracking-[0.25em]
                            text-cyan-300
                        "

                    >

                        LIVE

                    </span>

                </div>

            </div>

            {/* Body */}

            <div className="relative flex-1 min-h-0 p-6">

                {children}

            </div>

            {/* Bottom Glow */}

            <div

                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-cyan-500/5
                    to-transparent
                "

            />

        </section>

    );

}

export default HUDPanel;