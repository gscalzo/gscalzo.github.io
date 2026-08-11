+++
title = "Antescher: How Ant Attack Works"
date = 2026-08-11T12:00:00+01:00
draft = false
tags = ["retrocomputing", "zx-spectrum", "z80", "reverse-engineering", "games"]
description = "An interactive teardown of Sandy White's Ant Attack (ZX Spectrum, 1983): 4KB of hand-assembled Z80, a 16KB city that is renderer, collision map and entity index at once — explorable in your browser."
+++

# Antescher: How Ant Attack Works

In 1983 Sandy White wrote *Ant Attack* by hand, on paper, in Z80 mnemonics, assembled it himself and typed the hex into an EEPROM emulator. The result: 4,096 bytes of code driving a 128×128 isometric city — Antescher — where every column of the world is a single byte that serves as renderer input, collision geometry and entity index all at once.

I took the tape image apart and turned the findings into an interactive teardown. It covers:

- **The one-byte world** — bits 0–5 are blocks at that height, bit 7 is "someone is standing here". No separate collision map, no spatial index.
- **Why rotation is free** — the city is never transformed; the four views are four walk orders over the same array.
- **Softsolid** — the patented block stamper: cube pixels compiled into the instruction stream as literal operands, no loop, no memory read.
- **Five ants in 303 bytes** — no pathfinding, just greedy steps through the same physics you use, which is where all the famous tactics emerge from.
- **A message printer** that is also the score display and the sound engine, riding on the Spectrum ROM's own character output.

And because the 16KB heightmap is a full volume, the page lets you do things the original never could: rotate the real city data, walk it in first person through a raycaster, and play a small game built from the exact rules described in the teardown.

**[Open the full interactive teardown →](/antescher/)** (best on a keyboard, works on touch too)

<iframe src="/antescher/" title="Antescher — how Ant Attack works, an interactive teardown" style="width:100%;height:85vh;border:1px solid #3A4152;border-radius:4px;background:#0B0D12" loading="lazy"></iframe>

Game, code, artwork and city design remain Sandy White's — the teardown reproduces no disassembly listing and no sprite artwork, only structure measured from the tape image.
