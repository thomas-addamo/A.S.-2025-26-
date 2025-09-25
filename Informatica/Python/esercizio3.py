#creeremo la classe Punto 
import math

class Punto:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def calcola_distanza_origine(self):
        distanza = math.sqrt(self.x**2 + self.y**2)
        return distanza
    
    def calcola_distanza_altro_punto(self, altro_punto: 'Punto'):  #altro_punto è un'istanza della classe Punto
        differenza = math.sqrt(abs(self.x - altro_punto.x)**2 + abs(self.y - altro_punto.y)**2)          #sqrt fa la radice quadrata, abs il valore assoluto
        return differenza
    
    def visualizza_coordinate(self):
        print(f"Coordinate del punto: ({self.x}, {self.y})")

# Esempio di utilizzo della classe Punto
punto1 = Punto(3, 4)
punto2 = Punto(6, 8)

punto1.visualizza_coordinate()
punto2.visualizza_coordinate()

distanza_origine = punto1.calcola_distanza_origine()
print(f"Distanza dall'origine del punto 1: {distanza_origine}")

distanza_origine2 = punto2.calcola_distanza_origine()
print(f"Distanza dall'origine del punto 2: {distanza_origine2}")

distanza_tra_punti = punto1.calcola_distanza_altro_punto(punto2)
print(f"Distanza tra punto1 e punto2: {distanza_tra_punti}")

#<------------------------------------------------------------->

class Rettangolo:
    def __init__(self, p1: 'Punto', p2: 'Punto'):
        self.p1 = p1  #angolo in basso a sinistra
        self.p2 = p2  #angolo in alto a destra

    def base(self):
        return abs(self.p2.x - self.p1.x)  #lunghezza della base

    def altezza(self):
        return abs(self.p2.y - self.p1.y)  #altezza

    def area(self):
        return self.base() * self.altezza()  #calcola l'area

    def contiene(self, p: 'Punto'):
        if (self.p1.x <= p.x <= self.p2.x) and (self.p1.y <= p.y <= self.p2.y):
            return True
        else:
            return False

rettangolo = Rettangolo(Punto(1, 1), Punto(5, 4))
print(f"Base del rettangolo: {rettangolo.base()}")
print(f"Altezza del rettangolo: {rettangolo.altezza()}")
print(f"Area del rettangolo: {rettangolo.area()}")
punto_interno = Punto(3, 2)
punto_esterno = Punto(6, 5)
print(f"Il punto (3, 2) è interno al rettangolo? {rettangolo.contiene(punto_interno)}")
print(f"Il punto (6, 5) è interno al rettangolo? {rettangolo.contiene(punto_esterno)}") 
