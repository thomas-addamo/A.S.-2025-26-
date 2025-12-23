from spaceships import Spaceship, SupplyDrone, CargoShip, ExplorationProbe

class FleetManager:
    def __init__(self):
        self.fleet = []

    def add_ship(self, ship):
        if not isinstance(ship, Spaceship):
            raise TypeError("Ship deve essere un'istanza di Spaceship o di una sua sottoclasse")
        if any(s.name == ship.name for s in self.fleet):
            raise ValueError(f"Una nave con il nome '{ship.name}' è già presente nella flotta.")
        self.fleet.append(ship)

    def get_total_drone_value(self):
        total = 0
        for s in self.fleet:
            if isinstance(s, SupplyDrone):
                total += getattr(s, 'value', 0)
        return total

    def get_optimal_ship(self, distance):
        best = None
        best_remaining = -1
        for s in self.fleet:
            # skip ships that have no fuel
            if getattr(s, 'fuel', 0) <= 0:
                continue
            if isinstance(s, CargoShip):
                consumption = 2 * (distance // 10)
            elif isinstance(s, ExplorationProbe):
                consumption = 0 if distance < 100 else (distance // 10)
            else:
                consumption = distance // 10
            remaining = s.fuel - consumption
            if remaining >= 0 and remaining > best_remaining:
                best_remaining = remaining
                best = s
        return best