# Programma di confronto sconti tra due negozi

def negozio1(spesa):
    """Calcola sconto e totale per il primo negozio."""
    if spesa <= 0:
        return None, None
    if spesa > 500:
        sconto = spesa * 0.20
    else:
        sconto = spesa * 0.10
    totale = spesa - sconto
    return sconto, totale


def negozio2(spesa):
    """Calcola sconto e totale per il secondo negozio."""
    if spesa <= 0:
        return None, None
    if spesa <= 300:
        sconto = spesa * 0.10
    else:
        parte1 = 300 * 0.10
        parte2 = (spesa - 300) * 0.20
        sconto = parte1 + parte2
    totale = spesa - sconto
    return sconto, totale


def confronto(spesa):
    """Determina quale negozio è più conveniente."""
    s1, t1 = negozio1(spesa)
    s2, t2 = negozio2(spesa)

    if s1 is None or s2 is None:
        print("Errore: inserisci una spesa positiva e maggiore di zero.")
        return

    print(f"\n--- RISULTATI ---")
    print(f"Spesa iniziale: €{spesa:.2f}")
    print(f"Negozio 1 -> Sconto: €{s1:.2f} | Totale: €{t1:.2f}")
    print(f"Negozio 2 -> Sconto: €{s2:.2f} | Totale: €{t2:.2f}")

    if t1 < t2:
        print("Conviene acquistare nel Negozio 1 ✅")
    elif t2 < t1:
        print("Conviene acquistare nel Negozio 2 ✅")
    else:
        print("È indifferente: il prezzo finale è lo stesso nei due negozi.")


# --- Programma principale ---
spesa = float(input("Inserisci l'importo della spesa (€): "))
confronto(spesa)
