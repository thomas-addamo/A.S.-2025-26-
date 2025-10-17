import random as r


class Weapon:
    """Rappresenta un'arma con danni min/max e tipo (melee/ranged).

    Incapsula gli attributi tramite name mangling e fornisce getter/setter con validazione.
    """

    def __init__(self, name: str, min_damage: int, max_damage: int, type: str):
        # attributi privati
        self.__name: str = ""
        self.__min_damage: int = 1
        self.__max_damage: int = 1
        self.__type: str = "melee"

        # usa i setter per applicare le validazioni
        self.name = name
        self.min_damage = max(1, int(min_damage))
        # imposta provvisoriamente max >= min
        self.max_damage = int(max_damage) if int(max_damage) >= self.__min_damage else self.__min_damage + 1
        self.type = type

    # --- proprietà con getter/setter ---
    @property
    def name(self) -> str:
        return self.__name

    @name.setter
    def name(self, value: str) -> None:
        self.__name = str(value).strip() or "Unnamed Weapon"

    @property
    def min_damage(self) -> int:
        return self.__min_damage

    @min_damage.setter
    def min_damage(self, value: int) -> None:
        v = int(value)
        if v < 1:
            print("Minimum damage must be at least 1.")
            v = 1
        self.__min_damage = v
        # garantisce coerenza con max
        if self.__max_damage < self.__min_damage:
            self.__max_damage = self.__min_damage

    @property
    def max_damage(self) -> int:
        return self.__max_damage

    @max_damage.setter
    def max_damage(self, value: int) -> None:
        v = int(value)
        if v < self.__min_damage:
            print("Maximum damage must be at least equal to minimum damage.")
            v = self.__min_damage + 1
        self.__max_damage = v

    @property
    def type(self) -> str:
        return self.__type

    @type.setter
    def type(self, value: str) -> None:
        v = str(value).strip().lower()
        if v not in ("melee", "ranged"):
            print("Type must be either 'melee' or 'ranged'.")
            v = "melee"
        self.__type = v

    # --- comportamento ---
    def get_damage(self) -> int:
        return r.randint(self.__min_damage, self.__max_damage)

    def __str__(self) -> str:
        # es. "Spada (5–10 dmg)"
        return f"{self.__name} ({self.__min_damage}–{self.__max_damage} dmg)"
