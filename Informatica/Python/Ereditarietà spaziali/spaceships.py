class Spaceship:
    def __init__(self, name, fuel = 100):
        self.name = name
        self.fuel = fuel

    def fly(self, distance):
        print(f"{self.name} is flying {distance} lightyears.")
        self.fuel -= distance // 10  # Consumes 1 unit of fuel per 10 lightyears (integer division)
        if self.fuel <= 0:
            raise Exception(f"{self.name} has run out of fuel!")
        print(f"{self.name} has {self.fuel} units of fuel left.")

