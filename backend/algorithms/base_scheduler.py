from abc import ABC, abstractmethod


class BaseScheduler(ABC):

    def __init__(self, name):
        self.name = name

    @abstractmethod
    def schedule(self, cluster, vm_list):
        """
        Returns the ordered list of VMs to schedule.
        """
        pass

    def __str__(self):
        return self.name