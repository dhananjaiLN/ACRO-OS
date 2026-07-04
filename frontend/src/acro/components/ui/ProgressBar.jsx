function ProgressBar({

    value,

    color = "cyan"

}) {

    const colors = {

        cyan: "bg-cyan-400",

        green: "bg-green-400",

        yellow: "bg-yellow-400",

        red: "bg-red-500",

        purple: "bg-purple-500"

    };

    return (

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

            <div

                className={`

h-full

rounded-full

transition-all

duration-700

${colors[color]}

`}

                style={{

                    width: `${value}%`

                }}

            />

        </div>

    );

}

export default ProgressBar;