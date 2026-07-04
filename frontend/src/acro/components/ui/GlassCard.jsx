function GlassCard({ children, className = "" }) {

    return (

        <div
            className={`
                relative
                overflow-hidden

                rounded-xl

                border
                border-cyan-500/20

                bg-slate-900/70

                backdrop-blur-xl

                shadow-[0_0_20px_rgba(0,229,255,0.08)]

                transition-all
                duration-300

                hover:border-cyan-400/40
                hover:shadow-[0_0_35px_rgba(0,229,255,0.15)]

                ${className}
            `}
        >

            <div

                className="absolute inset-0
                           bg-gradient-to-br
                           from-cyan-500/5
                           via-transparent
                           to-purple-500/5
                           pointer-events-none"

            />

            <div className="relative">

                {children}

            </div>

        </div>

    );

}

export default GlassCard;