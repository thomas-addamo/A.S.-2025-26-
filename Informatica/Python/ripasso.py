# 1. CLASSE GENITORE
class Spaceship:
    def __init__(self, name, shield):
        self.name = name
        self.shield = shield

    def fly(self):
        print(f"🚀 {self.name} sta viaggiando nel vuoto siderale.")


# 2. CLASSE FIGLIA - ESTENSIONE
# Usa super() per mantenere la logica del padre e aggiungere cose
class CargoShip(Spaceship):
    def __init__(self, name, shield, max_tonnage):
        super().__init__(name, shield)  # Chiama il costruttore del padre
        self.max_tonnage = max_tonnage
        self.current_load = 0

    def fly(self):
        print(f"📦 Controlli di carico completati ({self.current_load} ton).")
        super().fly()  # Esegue il volo standard

    def load(self, amount):
        self.current_load += amount
        print(f"Carico imbarcato.")


# 3. CLASSE FIGLIA - SOSTITUZIONE (OVERRIDE TOTALE)
# Riscrive completamente il metodo fly
class StarFighter(Spaceship):
    def fly(self):
        print(f"⚔️ {self.name} accende i post-bruciatori! Modalità combattimento!")


# --- TEST ---
print("--- COSTRUZIONE FLOTTA ---")
generic_ship = Spaceship("Explorer 1", 50)
heavy_cargo = CargoShip("Nostromo", 200, 5000)
fighter = StarFighter("Red Leader", 80)

print("\n--- DECOLLO ---")
generic_ship.fly()  # Usa metodo base
print("-" * 20)
heavy_cargo.fly()  # Usa metodo esteso (codice figlio + codice padre)
print("-" * 20)
fighter.fly()  # Usa metodo sovrascritto (solo codice figlio)