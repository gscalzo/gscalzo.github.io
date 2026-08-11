+++
title = "Antescher: How Ant Attack Works"
date = 2026-08-11T12:00:00+01:00
draft = false
tags = ["retrocomputing", "zx-spectrum", "z80", "reverse-engineering", "games"]
description = "An interactive teardown of Sandy White's Ant Attack (ZX Spectrum, 1983): 4KB of hand-assembled Z80 and a 16KB city you can explore in the browser."
+++

# Antescher: How Ant Attack Works

In 1983 Sandy White wrote *Ant Attack* by hand, on paper, in Z80 mnemonics. He assembled it himself and typed the hex into an EEPROM emulator. The whole game is 4,096 bytes of code plus a 128×128 isometric city called Antescher, where every column of the world fits in a single byte.

## A bit of history

Quicksilva published *Ant Attack* in November 1983 for the 48K ZX Spectrum, with a Commodore 64 port the following year. White had trained as a sculptor, and the game reads like it: the city came first. It is named Antescher after M. C. Escher, and he designed its arches and towers together with Angela Sutherland.

*Ant Attack* is usually credited as the first isometric game on a home computer, and one of the first 3D games of any kind that you could actually walk around in. Arcade cabinets like *Zaxxon* had used the projection a year earlier, but those were scrolling shooters on rails. Here you got a solid city, a camera you could rotate through four views, and the freedom to go anywhere. White called his rendering technique "soft solid" 3D and patented it. The game is also remembered for letting you choose to play the boy rescuing the girl or the girl rescuing the boy, which was close to unheard of in 1983.

White and Sutherland reused the engine for *Zombie Zombie* a year later, and by the end of 1984 Ultimate's *Knight Lore* had turned isometric 3D into a genre of its own. *Ant Attack* got there first.

## The teardown

I took the tape image apart and turned the notes into an interactive teardown. Some of what's in there:

- One byte does three jobs. Bits 0 to 5 describe the blocks in a column, bit 7 marks that someone is standing there. There is no separate collision map anywhere in memory.
- Rotating the city costs nothing because the map never moves. The four views are just four different orders of walking the same array.
- The block renderer, which White patented as Softsolid, has the cube pixels baked into the instructions as literal operands. Drawing a cube never reads memory.
- The five ants have no pathfinding. They share the player's movement code and step toward you along whichever axis is further away. Every famous tactic in the game falls out of that.
- The message printer is also the score display and the sound engine, because it leans on the Spectrum ROM's own character output.

The heightmap is a full volume, so the page can also do things the original never did: rotate the real city data, walk it in first person through a raycaster, and play a small game built on the same rules.

[Open the interactive teardown](/antescher/). It works best with a keyboard, but touch is supported too.

<iframe src="/antescher/" title="Antescher — how Ant Attack works, an interactive teardown" style="width:100%;height:85vh;border:1px solid #3A4152;border-radius:4px;background:#0B0D12" loading="lazy"></iframe>

Game, code, artwork and city design are Sandy White's. The teardown reproduces no disassembly and no sprite artwork, only structure measured from the tape.
