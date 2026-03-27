from player import Player
from weapon import Weapon
import random as r

"""
- Dentro il blocco `if __name__ == "__main__"`: esegui:
    1. Crea due personaggi con valori casuali di forza e destrezza (usa `randint`)
    2. Assegna a ciascun personaggio un’arma coerente: se la forza > destrezza → arma da mischia, altrimenti arma a distanza
    3. Equipaggia le armi
    4. Simula turni alternati di attacco:
        - stampa l’esito di ogni turno (danni inflitti, hp rimanenti)
        - ferma il ciclo quando uno (o entrambi) muoiono
    5. Stampa il vincitore, oppure “pareggio” se muoiono nello stesso turno
"""

if __name__ == "__main__":
    player1 = Player(name = "Hero", max_health=100, strength = r.randint(1, 20), dexterity = r.randint(1, 20))
    player2 = Player(name = "Villain", max_health=100, strength = r.randint(1, 20), dexterity = r.randint(1, 20))

    if player1.get_strength() > player1.get_dexterity():
        weapon1 = Weapon(name="Sword", min_damage=5, max_damage=10, type="melee")
    else:
        weapon1 = Weapon(name="Bow", min_damage=3, max_damage=8, type="ranged")

    if player2.get_strength() > player2.get_dexterity():
        weapon2 = Weapon(name="Axe", min_damage=6, max_damage=12, type="melee")
    else:
        weapon2 = Weapon(name="Crossbow", min_damage=4, max_damage=9, type="ranged")

    player1.equip_weapon(weapon1)
    player2.equip_weapon(weapon2)

    print(f"{player1.get_name()} (STR: {player1.get_strength()}, DEX: {player1.get_dexterity()}) equipped with {player1.get_weapon()}")
    print(f"{player2.get_name()} (STR: {player2.get_strength()}, DEX: {player2.get_dexterity()}) equipped with {player2.get_weapon()}")

    print("\nBattle start!\n")

    turn = 0
    while player1.is_alive() and player2.is_alive():
        if turn % 2 == 0:  #Why? Because player1 starts first
            damage = player1.attack(player2)
            print(f"{player1.get_name()} attacks {player2.get_name()} for {damage} damage. {player2.get_name()} has {player2.get_health()}/{player2.get_max_health()} HP left.")
        else:
            damage = player2.attack(player1)
            print(f"{player2.get_name()} attacks {player1.get_name()} for {damage} damage. {player1.get_name()} has {player1.get_health()}/{player1.get_max_health()} HP left.")
        turn += 1

    if player1.is_alive() and not player2.is_alive():
        print(f"{player1.get_name()} wins!")
    elif player2.is_alive() and not player1.is_alive():
        print(f"{player2.get_name()} wins!")
    else:
        print("It's a draw!")