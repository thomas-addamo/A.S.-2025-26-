from weapon import Weapon

class Player:
    def __init__(self, name: str, max_health: int, strength: int, dexterity: int):
        self.name = name
        
        if max_health >= 1:
            self.max_health = max_health
        else:
            print("Maximum health must be at least 1.")
            self.max_health = 1

        self.health = self.max_health 

        if 1 <= strength <= 20:
            self.strength = strength
        else:
            print("Strength must be between 1 and 20.")
            self.strength = max(1, min(strength, 20))

        if 1 <= dexterity <= 20:
            self.dexterity = dexterity
        else:
            print("Dexterity must be between 1 and 20.")
            self.dexterity = max(1, min(dexterity, 20))

        self.weapon = None
        
    def equip_weapon(self, weapon: 'Weapon') -> None:
        self.weapon = weapon

    def modifier(self, value: int) -> int:
        return (value - 10) // 2

    def is_alive(self) -> bool:
        return self.health > 0
    
    def take_damage(self, damage: int) -> int:
        self.health -= damage
        if self.health < 0:
            self.health = 0
        return self.health

    def attack(self, enemy: "Player") -> int:
        if self.weapon is None:
            base_damage = 1
            mod = 0
        else:
            base_damage = self.weapon.get_damage()
            if self.weapon.type == "melee":
                mod = self.modifier(self.strength)
            else:
                mod = self.modifier(self.dexterity)
        total_damage = max(0, base_damage + mod)
        enemy.take_damage(total_damage)
        return total_damage
    
    def __str__(self) -> str:
        weapon_str = str(self.weapon) if self.weapon else "No Weapon"
        return (f"Player(Name: {self.name}, Health: {self.health}/{self.max_health}, "
                f"Strength: {self.strength}, Dexterity: {self.dexterity}, "
                f"Weapon: {weapon_str})")
