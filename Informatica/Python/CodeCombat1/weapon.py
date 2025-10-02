import random as r

class Weapon:
    def __init__(self, name: str, min_damage: int, max_damage: int, type: str):
        self.name = name

        if min_damage >= 1:
            self.min_damage = min_damage
        else:
            print("Minimum damage must be at least 1.")
            self.min_damage = 1

        if max_damage >= min_damage:
            self.max_damage = max_damage
        else:
            print("Maximum damage must be at least equal to minimum damage.")
            self.max_damage = min_damage + 1

        if type == "melee" or type == "ranged":
            self.type = type
        else:
            print("Type must be either 'melee' or 'ranged'.")
            self.type = "melee"

    def get_damage(self) -> int:
        return r.randint(self.min_damage, self.max_damage)
    
    def __str__(self) -> str:
        return f"Weapon(Name: {self.name}, Type: {self.type}, Damage: {self.min_damage}-{self.max_damage})"