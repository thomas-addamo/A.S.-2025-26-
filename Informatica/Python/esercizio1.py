"""
ESERCIZIO
Creare la classe Rettangolo in cui vengono specificati obbligatoriamente base e altezza.
Il costruttore deve impostare tre proprietà dell'oggetto: base, altezza e area.
Crea due oggetti r1 e r2 con valori random di base e altezza.
"""
import random as r

class Rettangolo:
    def __init__(self, base, altezza):
        self.base = base
        self.altezza = altezza
        self.area = base * altezza

def get_lato ():
    return r.randint(1, 10)

r1 = Rettangolo(get_lato(), get_lato())
r2 = Rettangolo(get_lato(), get_lato())

print(f"Rettangolo 1: base = {r1.base}, altezza = {r1.altezza}, area = {r1.area}")
print(f"Rettangolo 2: base = {r2.base}, altezza = {r2.altezza}, area = {r2.area}")
