#Programmazione ad oggetti
#fino ad ora abbiamo programmato a modo imperativo

#la programmazione ad oggetti è un paradigma di programmazione che utilizza "oggetti" e le loro interazioni per progettare applicazioni e programmi informatici.
#un oggetto è una struttura dati che contiene sia dati (attributi) che funzioni (metodi) che operano su quei dati.

class Player:
    def __init__(self, name = "John Doe", health = 78, shield = 7, attack = 9):  #il metodo __init__ è il costruttore della classe
        self.name = name
        if health < 1:
            health = 100
            print("Health impostata a 100")
        self.hp = health
        self.shield = shield
        self.attack = attack

p1 = Player("Adamo", 93, 5, 7)                     #QUESTA E' L'ISTANZAZIONE DI UN OGGETTO
print(p1.name, p1.hp, p1.shield, p1.attack)        #ovvro il momento in cui viene creato un oggetto a partire da una classe
p2 = Player("Giovanna", -8, 6, 5)                     
print(p2.name, p2.hp, p2.shield, p2.attack)
p3 = Player("Eva")                                 #se non passo i parametri, vengono usati quelli di default
print(p3.name, p3.hp, p3.shield, p3.attack)
p4 = Player()                                      #se non passo i parametri, vengono usati quelli di default
print(p4.name, p4.hp, p4.shield, p4.attack)