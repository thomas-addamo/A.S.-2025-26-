class Carta:
    def __init__(self, seme: str, rango: str):
        self.__seme = seme
        self.__rango = rango

    @property
    def valore(self) -> int:
        if self.__rango in ['J', 'Q', 'K']:
            return 10
        elif self.__rango == 'A':
            return 11
        else:
            return int(self.__rango)

    @property
    def rango(self) -> str:
        return self.__rango
    
    def __str__(self) -> str:
        return f"{self.__rango} di {self.__seme}"
