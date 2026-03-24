"""
Pallina che rimbalza — esercizio completo
Basato sulla lezione: lezione.md
"""

import pygame
import sys

# ── Costanti ──────────────────────────────────────────────────
SCREEN_W      = 800
SCREEN_H      = 600
FPS           = 60

BALL_RADIUS   = 20
BALL_SPEED_X  = 5
BALL_SPEED_Y  = 4

BG_COLOR      = (20, 20, 40)      # sfondo scuro
BALL_COLOR    = (0, 200, 255)     # ciano

# ── Inizializzazione ──────────────────────────────────────────
pygame.init()
screen = pygame.display.set_mode((SCREEN_W, SCREEN_H))
pygame.display.set_caption("Pallina che rimbalza")
clock = pygame.time.Clock()

# ── Stato della pallina ───────────────────────────────────────
ball_x = SCREEN_W // 2
ball_y = SCREEN_H // 2
vel_x  = BALL_SPEED_X
vel_y  = BALL_SPEED_Y

# ── Loop di gioco ─────────────────────────────────────────────
running = True
while running:

    # 1. EVENTI
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. AGGIORNA
    ball_x += vel_x
    ball_y += vel_y

    # Rimbalzo bordo destro
    if ball_x + BALL_RADIUS >= SCREEN_W:
        ball_x = SCREEN_W - BALL_RADIUS
        vel_x  = -vel_x

    # Rimbalzo bordo sinistro
    if ball_x - BALL_RADIUS <= 0:
        ball_x = BALL_RADIUS
        vel_x  = -vel_x

    # Rimbalzo bordo inferiore
    if ball_y + BALL_RADIUS >= SCREEN_H:
        ball_y = SCREEN_H - BALL_RADIUS
        vel_y  = -vel_y

    # Rimbalzo bordo superiore
    if ball_y - BALL_RADIUS <= 0:
        ball_y = BALL_RADIUS
        vel_y  = -vel_y

    # 3. DISEGNA
    screen.fill(BG_COLOR)
    pygame.draw.circle(screen, BALL_COLOR, (ball_x, ball_y), BALL_RADIUS)
    pygame.display.flip()

    # Limita a FPS iterazioni/secondo
    clock.tick(FPS)

pygame.quit()
sys.exit()
