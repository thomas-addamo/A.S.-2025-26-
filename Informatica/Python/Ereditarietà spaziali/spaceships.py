from typing import final

class Spaceship:
    def __init__(self, name, fuel = 100):
        self.name = name
        self.fuel = fuel

    def fly(self, distance):
        if self.fuel <= 0:
            raise Exception(f"{self.name} non può volare: carburante esaurito.")
        print(f"{self.name} sta volando per {distance} anni luce.")
        self.fuel -= distance // 10
        print(f"{self.name} ha {self.fuel} unità di carburante rimanenti.")
        return True

    @final
    def dock(self):
        print(f"{self.name} si sta attraccando alla stazione spaziale.")

class CargoShip(Spaceship):
    def __init__(self, name, max_load):
        super().__init__(name)
        self.max_load = max_load
        self.current_load = 0

    def load(self, amount):
        if self.current_load + amount >= self.max_load:
            raise Exception(f"{self.name} non può caricare {amount} unità.")
        self.current_load += amount
        print(f"{self.name} ha caricato {amount} unità. Carico corrente: {self.current_load} unità.")

    def fly(self, distance):
        if super().fly(distance):
            extra = distance // 10
            self.fuel -= extra
            return True
        return False

@final
class ExplorationProbe(Spaceship):
    def __init__(self, name):
        super().__init__(name)

    def fly(self, distance):
        if distance < 100:
            print(f"{self.name} (sonda) sta volando per {distance} anni luce gratuitamente (motori a ioni).")
            return True
        return super().fly(distance)

    def scan(self):
        print(f"{self.name} sta scansionando l'area circostante per raccogliere dati scientifici.")

class SupplyDrone(Spaceship):
    def __init__(self, name, value, hack_time):
        super().__init__(name)
        self.value = value
        self.hack_time = hack_time

    def fly(self, distance):
        super().fly(distance)

if __name__ == "__main__":
    print("--- 1. TEST NAVE CARGO ---")
    # Deve accettare nome e carico massimo
    cargo = CargoShip("Nostromo", 1000)
    cargo.load(500)
    # Deve consumare il doppio: 100 ly = 10 base + 10 extra = 20 fuel
    cargo.fly(100)
    print(f"Carburante residuo nave cargo: {cargo.fuel} (Atteso: 80)")

    print("\n--- 2. TEST SONDA ---")
    probe = ExplorationProbe("Wall-E")
    # Distanza < 100: Consumo 0
    probe.fly(80)
    print(f"Carburante residuo sonda: {probe.fuel} (Atteso: 100)")
    probe.scan()

    # Test Sicurezza (Decommenta per vedere l'errore se hai usato @final correttamente)
    # class HackProbe(ExplorationProbe):
    #     pass