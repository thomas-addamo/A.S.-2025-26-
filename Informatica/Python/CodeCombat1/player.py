from weapon import Weapon


class Player:
    """Giocatore con statistiche base, punti vita e un'eventuale arma.

    Incapsula gli attributi tramite name mangling e fornisce proprietà per l'accesso.
    """

    def __init__(self, name: str, max_health: int, strength: int, dexterity: int):
        # attributi privati
        self.__name: str = ""
        self.__max_health: int = 1
        self.__health: int = 1
        self.__strength: int = 10
        self.__dexterity: int = 10
        self.__weapon: Weapon | None = None

        # usa i setter per validazione e coerenza
        self.name = name
        self.max_health = max_health
        self.health = self.__max_health  # start full HP
        self.strength = strength
        self.dexterity = dexterity

    # --- proprietà con getter/setter ---
    @property
    def name(self) -> str:
        return self.__name

    @name.setter
    def name(self, value: str) -> None:
        self.__name = str(value).strip() or "Unnamed"

    @property
    def max_health(self) -> int:
        return self.__max_health

    @max_health.setter
    def max_health(self, value: int) -> None:
        v = int(value)
        if v < 1:
            print("Maximum health must be at least 1.")
            v = 1
        self.__max_health = v
        # se gli HP correnti superano il massimo, clamp
        if hasattr(self, "_Player__health") and self.__health > self.__max_health:
            self.__health = self.__max_health

    @property
    def health(self) -> int:
        return self.__health

    @health.setter
    def health(self, value: int) -> None:
        v = int(value)
        if v < 0:
            v = 0
        if v > self.__max_health:
            v = self.__max_health
        self.__health = v

    @property
    def strength(self) -> int:
        return self.__strength

    @strength.setter
    def strength(self, value: int) -> None:
        v = int(value)
        if not 1 <= v <= 20:
            print("Strength must be between 1 and 20.")
            v = max(1, min(v, 20))
        self.__strength = v

    @property
    def dexterity(self) -> int:
        return self.__dexterity

    @dexterity.setter
    def dexterity(self, value: int) -> None:
        v = int(value)
        if not 1 <= v <= 20:
            print("Dexterity must be between 1 and 20.")
            v = max(1, min(v, 20))
        self.__dexterity = v

    @property
    def weapon(self) -> Weapon | None:
        return self.__weapon

    @weapon.setter
    def weapon(self, value: Weapon | None) -> None:
        if value is not None and not isinstance(value, Weapon):
            raise TypeError("weapon must be a Weapon or None")
        self.__weapon = value

    # --- metodi pubblici ---
    def equip_weapon(self, weapon: 'Weapon') -> None:
        self.weapon = weapon

    def modifier(self, value: int) -> int:
        return (int(value) - 10) // 2

    def is_alive(self) -> bool:
        return self.__health > 0

    def take_damage(self, damage: int) -> int:
        self.health = self.__health - int(damage)
        return self.__health

    def attack(self, enemy: "Player") -> int:
        if self.__weapon is None:
            base_damage = 1
            mod = 0
        else:
            base_damage = self.__weapon.get_damage()
            if self.__weapon.type == "melee":
                mod = self.modifier(self.__strength)
            else:
                mod = self.modifier(self.__dexterity)
        total_damage = max(0, base_damage + mod)
        enemy.take_damage(total_damage)
        return total_damage

    def __str__(self) -> str:
        weapon_str = str(self.__weapon) if self.__weapon else "Nessuna arma"
        return (f"{self.__name} (HP: {self.__health}/{self.__max_health}) - "
                f"Forza={self.__strength}, Destrezza={self.__dexterity}, "
                f"Arma: {weapon_str}")
