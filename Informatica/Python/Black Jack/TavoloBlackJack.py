from mazzo import Mazzo
from mano import Mano
from carta import Carta

class TavoloBlackJack:
    def __init__(self):
        self.__mano_giocatore = Mano()
        self.__mano_banco = Mano()

    def __crea_mazzo_standard(self):
        semi = ['Cuori', 'Quadri', 'Fiori', 'Picche']
        ranghi = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        self.__lista_carte = []
        for seme in semi:
            for rango in ranghi:
                self.__lista_carte.append(Carta(seme, rango))
        return Mazzo(self.__lista_carte)

    def __calcola_punteggio(self, mano_obj: Mano):
        somma_valore_carte = 0
        for carta in mano_obj.carte:
            somma_valore_carte += carta.valore
        return somma_valore_carte

    def __turno_giocatore(self):
        while True:
            scelta = input("Vuoi pescare una carta? (s/n) ").lower()
            if scelta == "s":
                carta = self.mazzo.pesca()
                self.__mano_giocatore.aggiungi_carta(carta)
                print(f"Il tuo punteggio attuale è {self.__calcola_punteggio(self.__mano_giocatore)}")
                if self.__calcola_punteggio(self.__mano_giocatore) > 21:
                    print(f"Hai fatto {self.__calcola_punteggio(self.__mano_giocatore)}, quindi HAI PERSO! Il banco ha vinto.")
                    return False
            elif scelta == "n":
                return True
            else:
                print("Errore! Devi scrivere s oppure n!")
    
    def __turno_banco(self):
        while True:
            if self.__calcola_punteggio(self.__mano_banco) <= 16:
                carta = self.mazzo.pesca()
                self.__mano_banco.aggiungi_carta(carta)
                print(f"Il banco ha punteggio {self.__calcola_punteggio(self.__mano_banco)}")
                if self.__calcola_punteggio(self.__mano_banco) > 21:
                    print(f"Il banco ha fatto {self.__calcola_punteggio(self.__mano_banco)}, quindi ha sballato. HAI VINTO!")
                    return False
            else:
                return True
            
    def gioca_partita(self):
        self.mazzo = self.__crea_mazzo_standard()
        self.mazzo.mescola()

        for i in range(2):
            carta = self.mazzo.pesca()
            self.__mano_giocatore.aggiungi_carta(carta)
            carta = self.mazzo.pesca()
            self.__mano_banco.aggiungi_carta(carta)

        print(f"La mano iniziale del giocatore è {self.__mano_giocatore}")
        print(f"La prima carta iniziale del banco è {self.__mano_banco.carte[0]}")

        turno_giocatore = self.__turno_giocatore()
        if turno_giocatore == False:
            return
        turno_banco = self.__turno_banco()
        if turno_banco == False:
            return
        if self.__calcola_punteggio(self.__mano_giocatore) > self.__calcola_punteggio(self.__mano_banco):
            print(f"Hai vinto perché hai fatto {self.__calcola_punteggio(self.__mano_giocatore)} mentre il banco ha fatto {self.__calcola_punteggio(self.__mano_banco)}.")
        elif self.__calcola_punteggio(self.__mano_giocatore) < self.__calcola_punteggio(self.__mano_banco):
            print(f"Il banco ha vinto perché ha fatto {self.__calcola_punteggio(self.__mano_banco)} mentre tu hai fatto {self.__calcola_punteggio(self.__mano_giocatore)}.")
        else:
            print(f"Hai pareggiato.")
