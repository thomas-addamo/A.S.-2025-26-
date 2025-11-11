import random as r

class Mazzo:
    def __init__(self, lista_carte: list):
        self.__carte = lista_carte

    def mescola(self):
        r.shuffle(self.__carte)
    
    def pesca(self):
        remove = self.__carte.pop()
        return remove

