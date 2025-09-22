"""
ESERCIZIO 1
"""
import random as d
import math

class Rettangolo:
    def __init__(self, base, altezza):
        self.base = base
        self.altezza = altezza
        self.area = base * altezza

    def perimetro(self):
        return 2 * (self.base + self.altezza)
    
    def is_quadrato(self):
        return self.base == self.altezza
    
    def ridimensiona(self, fattore):
        self.base *= fattore
        self.altezza *= fattore
        self.area = self.base * self.altezza

    def visualizza(self):
        print(f"Base: {self.base}, Altezza: {self.altezza}, Area: {self.area}")
        print(f"Perimetro: {self.perimetro()}")
        if self.is_quadrato():
            print("È un quadrato")
        else:
            print("Non è un quadrato")

def get_lato ():
    return d.randint(1, 10)

class Cerchio:
    def __init__(self, raggio):
        self.raggio = raggio
        self.area = math.pi * raggio * raggio
        self.circonferenza = 2 * math.pi * self.raggio

    def visualizza(self):
        print(f"Raggio: {self.raggio}, Area: {self.area}, Circonferenza: {self.circonferenza}")

def get_raggio ():
    return d.randint(1, 50)

r1 = Rettangolo(get_lato(), get_lato())
r2 = Rettangolo(get_lato(), get_lato())

r1.visualizza()
r2.visualizza()

c1 = Cerchio(get_raggio())
c1.visualizza()
