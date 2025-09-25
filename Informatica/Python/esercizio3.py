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

