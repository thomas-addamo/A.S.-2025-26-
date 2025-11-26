from weapon import Weapon
from potion import Potion

class Player:
    def __init__(self, name: str, max_health: int, strength: int, dexterity: int, weapon: Weapon = None, potions: list[Potion] = None):
        if name == "":
            raise ValueError("Name cannot be empty.")
        if max_health < 1:
            raise ValueError("Maximum health must be at least 1.")

        if strength < 1 and strength > 20:
            raise ValueError("Strength must be between 1 and 20.")

        if dexterity < 1 and dexterity > 20:
            raise ValueError("Dexterity must be between 1 and 20.")

        self.__name = name
        self.__max_health = max_health
        self.__health = self.__max_health
        self.__strength = strength
        self.__currently_strength = self.__strength
        self.__dexterity = dexterity
        self.__currently_dexterity = self.__dexterity
        self.__weapon = weapon
        self.__buffs = []
        self.__potions = potions if potions is not None else []


    @property
    def name(self):
        return self.__name
    
    @name.setter
    def name(self, new_name):
        if new_name == "":
            raise ValueError("The new name cannot be empty.")
        else:
            self.__name = new_name
    
    @property
    def max_health(self):
        return self.__health
    
    @property
    def health(self):
        return self.__health
    
    @property
    def strength(self):
        return self.__currently_strength
    
    @strength.setter
    def strenght(self, new_strength):
        if 1 <= new_strength <= 20:
            self.__strength = new_strength
        else:
            raise ValueError("The new strength must be between 1 and 20.")
    
    @property
    def dexterity(self):
        return self.__currently_dexterity
    
    @dexterity.setter
    def dexterity(self, new_dexterity):
        if 1 <= new_dexterity <= 20:
            self.__dexterity = new_dexterity
        else:
            raise ValueError("The new dexterity must be between 1 and 20.")
    
    @property
    def weapon(self):
        return self.__weapon
    
    @weapon.setter
    def weapon(self, new_weapon):
        if isinstance(new_weapon) == Weapon:
            self.__weapon = new_weapon
        else:
            raise TypeError("The new weapon must be a Weapon.")

# Methods
    def modifier(self, value: int) -> int:
        return (value - 10) // 2

    def is_alive(self) -> bool:
        return self.__health > 0

    def take_damage(self, damage: int) -> int:
        self.__health -= damage
        if self.__health < 0:
            self.__health = 0
        return self.__health

    def attack(self, enemy: "Player") -> int:
        if self.__weapon is None:
            base_damage = 1
            mod = 0
        else:
            base_damage = self.__weapon.get_damage()
            if self.__weapon.type == "melee":
                mod = self.modifier(self.__currently_strength)
            else:
                mod = self.modifier(self.__currently_dexterity)
        total_damage = max(0, base_damage + mod)
        enemy.take_damage(total_damage)
        return total_damage

    def heal(self, amount: int) -> int:
        if self.__health + amount > self.__max_health:
            amount = self.__max_health - self.__health
            self.__health = self.__max_health
        else:
            self.__health += amount
        return amount

    def buff(self, effect: str, amount: int, duration: int) -> None:
        if effect == "buff_str":
            self.__currently_strength += amount
            self.__buffs.append([effect, amount, duration])
        elif effect == "buff_dex":
            self.__currently_dexterity += amount
            self.__buffs.append([effect, amount, duration])

    def tick_buffs(self) -> None:
        for buff in self.__buffs:
            buff[2] -= 1
            if buff[2] <= 0:
                if buff[0] == "buff_str":
                    self.__currently_strength -= buff[1]
                elif buff[0] == "buff_dex":
                    self.__currently_dexterity -= buff[1]

    def __str__(self) -> str:
        weapon_str = str(self.__weapon) if self.__weapon else "No Weapon"
        return (f"Player(Name: {self.__name}, Health: {self.__health}/{self.__max_health}, "
                f"Strength: {self.__strength}, Dexterity: {self.__dexterity}, "
                f"Buffs: {self.__buffs}, "
                f"Weapon: {weapon_str})"
                f"Potions: {self.__potions})")