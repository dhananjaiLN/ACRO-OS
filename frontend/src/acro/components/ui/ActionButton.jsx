function ActionButton({

    children,

    icon,

    onClick,

    disabled = false,

    variant = "cyan"

}) {

    const colors = {

        cyan:
            "bg-cyan-500 hover:bg-cyan-400 text-black",

        purple:
            "bg-purple-600 hover:bg-purple-500 text-white",

        red:
            "bg-red-600 hover:bg-red-500 text-white"

    };

    return (

        <button

            onClick={onClick}

            disabled={disabled}

            className={`

            flex

            items-center

            justify-center

            gap-2

            rounded-xl

            px-6

            py-3

            font-semibold

            transition-all

            duration-300

            disabled:opacity-50

            disabled:cursor-not-allowed

            ${colors[variant]}

            `}

        >

            {icon}

            {children}

        </button>

    );

}

export default ActionButton;