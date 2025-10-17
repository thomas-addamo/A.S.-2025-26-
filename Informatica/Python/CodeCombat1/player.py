from weapon import Weapon

class Player:
    def __init__(self, name: str, max_health: int, strength: int, dexterity: int):
        self.__name = name
        
        if max_health >= 1:
            self.__max_health = max_health
        else:
            print("Maximum health must be at least 1.")
            self.__max_health = 1

        self.__health = self.__max_health

        if 1 <= strength <= 20:
            self.__strength = strength
        else:
            print("Strength must be between 1 and 20.")
            self.__strength = max(1, min(strength, 20))

        if 1 <= dexterity <= 20:
            self.__dexterity = dexterity
        else:
            print("Dexterity must be between 1 and 20.")
            self.__dexterity = max(1, min(dexterity, 20))

        self.__weapon = None
        
    def equip_weapon(self, weapon: 'Weapon') -> None:
        self.__weapon = weapon

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
            if self.__weapon.get_type() == "melee":
                mod = self.modifier(self.__strength)
            else:
                mod = self.modifier(self.__dexterity)
        total_damage = max(0, base_damage + mod)
        enemy.take_damage(total_damage)
        return total_damage
    
    def __str__(self) -> str:
        weapon_str = str(self.__weapon) if self.__weapon else "No Weapon"
        return (f"Player(Name: {self.__name}, Health: {self.__health}/{self.__max_health}, "
                f"Strength: {self.__strength}, Dexterity: {self.__dexterity}, "
                f"Weapon: {weapon_str})")

#Getter for attributes
    def get_name(self) -> str:
        return self.__name
    def get_health(self) -> int:
        return self.__health
    def get_max_health(self) -> int:
        return self.__max_health
    def get_strength(self) -> int:
        return self.__strength
    def get_dexterity(self) -> int:
        return self.__dexterity
    def get_weapon(self) -> 'Weapon':
        return self.__weapon

#Setter for attributes
    def set_name(self, name: str) -> None:
        self.__name = name
    def set_max_health(self, max_health: int) -> None:
        if max_health >= 1:
            self.__max_health = max_health
        else:
            print("Maximum health must be at least 1.")
            self.__max_health = 1
        if self.__health > self.__max_health:
            self.__health = self.__max_health
    def set_strength(self, strength: int) -> None:
        if 1 <= strength <= 20:
            self.__strength = strength
        else:
            print("Strength must be between 1 and 20.")
            self.__strength = max(1, min(strength, 20))
    def set_dexterity(self, dexterity: int) -> None:
        if 1 <= dexterity <= 20:
            self.__dexterity = dexterity
        else:
            print("Dexterity must be between 1 and 20.")
            self.__dexterity = max(1, min(dexterity, 20))
    def set_weapon(self, weapon: 'Weapon') -> None:
        self.__weapon = weapon