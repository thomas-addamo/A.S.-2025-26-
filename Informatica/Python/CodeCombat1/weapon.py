import random as r

class Weapon:
    def __init__(self, name: str, min_damage: int, max_damage: int, type: str):
        self.__name = name

        if min_damage >= 1:
            self.__min_damage = min_damage
        else:
            print("Minimum damage must be at least 1.")
            self.__min_damage = 1

        if max_damage >= min_damage:
            self.__max_damage = max_damage
        else:
            print("Maximum damage must be at least equal to minimum damage.")
            self.__max_damage = min_damage + 1

        if type == "melee" or type == "ranged":
            self.__type = type
        else:
            print("Type must be either 'melee' or 'ranged'.")
            self.__type = "melee"

    def get_damage(self) -> int:
        return r.randint(self.__min_damage, self.__max_damage)

    def __str__(self) -> str:
        return f"Weapon(Name: {self.__name}, Type: {self.__type}, Damage: {self.__min_damage}-{self.__max_damage})"
    

    # Getter for attributes
    def get_name(self) -> str:
        return self.__name

    def get_min_damage(self) -> int:
        return self.__min_damage

    def get_max_damage(self) -> int:
        return self.__max_damage

    def get_type(self) -> str:
        return self.__type

    # Setter for attributes
    def set_name(self, name: str) -> None:
        self.__name = name

    def set_min_damage(self, min_damage: int) -> None:
        if min_damage >= 1:
            self.__min_damage = min_damage
        else:
            print("Minimum damage must be at least 1.")
            self.__min_damage = 1

    def set_max_damage(self, max_damage: int) -> None:
        if max_damage >= self.__min_damage:
            self.__max_damage = max_damage
        else:
            print("Maximum damage must be at least equal to minimum damage.")
            self.__max_damage = self.__min_damage + 1

    def set_type(self, type: str) -> None:
        if type == "melee" or type == "ranged":
            self.__type = type
        else:
            print("Type must be either 'melee' or 'ranged'.")
            self.__type = "melee"
