class LiveMonitorService {

    constructor() {
        this.socket = null;
    }

    connect(onMessage) {

        if (
            this.socket &&
            this.socket.readyState === WebSocket.OPEN
        ) {
            return;
        }

        this.socket = new WebSocket(
            `${import.meta.env.VITE_WS_URL}/ws/live`
        );

        this.socket.onopen = () => {
            console.log("Connected to ACRO Live Monitor");
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        this.socket.onerror = (error) => {
            console.error(error);
        };

        this.socket.onclose = () => {
            console.log("Disconnected from Live Monitor");
        };
    }

    disconnect() {

        if (this.socket) {
            this.socket.close();
        }

    }

}

export default new LiveMonitorService();