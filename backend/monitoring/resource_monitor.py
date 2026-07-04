import psutil


class ResourceMonitor:

    @staticmethod
    def get_disk_io():
        disk_io = psutil.disk_io_counters()

        if disk_io is None:
            return {}

        return {
            "read_count": disk_io.read_count,
            "write_count": disk_io.write_count,
            "read_bytes": disk_io.read_bytes,
            "write_bytes": disk_io.write_bytes
        }

    @staticmethod
    def get_network_io():
        network = psutil.net_io_counters()

        if network is None:
            return {}

        return {
            "bytes_sent": network.bytes_sent,
            "bytes_received": network.bytes_recv,
            "packets_sent": network.packets_sent,
            "packets_received": network.packets_recv
        }

    @classmethod
    def collect(cls):
        return {
            "disk_io": cls.get_disk_io(),
            "network": cls.get_network_io()
        }