from player import Player
from weapon import Weapon
import random as r


if __name__ == "__main__":
    print("=== SIMULAZIONE COMBATTIMENTO ===\n")

    # crea due personaggi con statistiche casuali (1-20)
    p1 = Player(name="Gimli", max_health=50, strength=r.randint(1, 20), dexterity=r.randint(1, 20))
    p2 = Player(name="Legolas", max_health=45, strength=r.randint(1, 20), dexterity=r.randint(1, 20))

    print(f"{p1.name}: Forza={p1.strength}, Destrezza={p1.dexterity}")
    print(f"{p2.name}: Forza={p2.strength}, Destrezza={p2.dexterity}\n")

    # armi coerenti con la statistica prevalente
    w1 = Weapon(name="Spada a due mani", min_damage=8, max_damage=15, type="melee") if p1.strength >= p1.dexterity else Weapon(name="Balestra", min_damage=8, max_damage=13, type="ranged")
    w2 = Weapon(name="Spada a due mani", min_damage=8, max_damage=15, type="melee") if p2.strength >= p2.dexterity else Weapon(name="Balestra", min_damage=8, max_damage=13, type="ranged")

    p1.equip_weapon(w1)
    p2.equip_weapon(w2)

    print(f"{p1.name} equipaggia: {p1.weapon}")
    print(f"{p2.name} equipaggia: {p2.weapon}\n")

    print("=== INIZIO COMBATTIMENTO ===\n")

    turno = 1
    attacker, defender = p1, p2  # p1 inizia
    while p1.is_alive() and p2.is_alive():
        print(f"--- Turno {turno} ---")
        danni = attacker.attack(defender)
        print(f"{attacker.name} attacca {defender.name} e infligge {danni} danni!")
        print(f"{defender.name} (HP: {defender.health}/{defender.max_health})\n")

        # scambia i ruoli per il turno successivo
        attacker, defender = defender, attacker
        turno += 1

    print("=== FINE COMBATTIMENTO ===\n")

    if p1.is_alive() and not p2.is_alive():
        print(f"🏆 {p1.name} vince il combattimento! {p1}")
    elif p2.is_alive() and not p1.is_alive():
        print(f"🏆 {p2.name} vince il combattimento! {p2}")
    else:
        print("Pareggio!")
