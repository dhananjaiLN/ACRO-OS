import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";

function HostCard({

    id,

    cpu,

    memory,

    status,

    enabled

}){

    return(

        <div

            className="

rounded-xl

border

border-cyan-500/10

bg-[#08111f]

p-5

space-y-4

"

        >

            <div className="flex justify-between">

                <h3

                    className="

orbitron

text-cyan-300"

                >

                    HOST-{id}

                </h3>

                <StatusBadge

                    online={enabled}

                    text={status}

                />

            </div>

            <div>

                <div className="flex justify-between mb-2">

                    <span>CPU</span>

                    <span>{cpu}%</span>

                </div>

                <ProgressBar

                    value={cpu}

                    color="cyan"

                />

            </div>

            <div>

                <div className="flex justify-between mb-2">

                    <span>MEM</span>

                    <span>{memory}%</span>

                </div>

                <ProgressBar

                    value={memory}

                    color="purple"

                />

            </div>

        </div>

    );

}

export default HostCard;