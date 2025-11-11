from mazzo import Mazzo
from mano import Mano
from carta import Carta

class TavoloBlackJack:
    def __init__(self):
        self.mano_giocatore = Mano()
        self.mano_banco = Mano()

    @property
    def _crea_mazzo_standard(self):
        semi = ['Cuori', 'Quadri', 'Fiori', 'Picche']
        ranghi = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        self.__lista_carte = []
        for seme in semi:
            for rango in ranghi:
                self.__lista_carte.append(Carta(seme, rango))
        return Mazzo(self.__lista_carte)

    @_crea_mazzo_standard.setter
    def mescola_mazzo(self):
        self.mazzo = self._crea_mazzo_standard
        self.mazzo.mescola()
    
    def gioca_partita(self):
        self.mano_giocatore.svuota()
        self.mano_banco.svuota()
        self.mescola_mazzo

        for _ in range(2):
            self.mano_giocatore.aggiungi_carta(self.mazzo.pesca())
            self.mano_banco.aggiungi_carta(self.mazzo.pesca())


