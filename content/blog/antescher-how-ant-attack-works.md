+++
title = "Antescher: How Ant Attack Works"
date = 2026-08-11T12:00:00+01:00
draft = false
tags = ["retrocomputing", "zx-spectrum", "z80", "reverse-engineering", "games"]
description = "An interactive teardown of Sandy White's Ant Attack (ZX Spectrum, 1983): 4KB of hand-assembled Z80 and a 16KB city you can explore in the browser."
images = ["/images/blog/antescher/city-isometric.png"]
+++

My Spectrum turned up late. Italy ran behind on home computers, so by the time one arrived in our house the machine was past its prime everywhere else, and the tapes we had were older still. I was a kid at school, which is exactly the right age not to know or care that you are late to something. Every game took minutes to load off cassette and I loved all of them indiscriminately.

*Ant Attack* was the one that stopped me. Everything else on that machine was flat, and this was a place. You could walk behind a wall and come out the far side of it. Turn the view and the whole city swung round with you, still solid, still standing. I filed it under magic, which is what a child calls something the machine has no business being able to do.

<img src="/images/blog/antescher/spectrum-ingame.gif" alt="Ant Attack running on a ZX Spectrum: an isometric grey city, two ants closing on a figure, the message GOOD SHOT! across the middle, and a status panel reading AMMO 13, BOY 19, GIRL 20, TIME 732" style="image-rendering:pixelated;width:100%;max-width:512px;display:block;margin:1.6rem auto 0.5rem">

That's the whole thing: a grey city, two ants, a figure, a status panel. In 1983 Sandy White wrote it by hand, on paper, in Z80 mnemonics, and typed the hex into an EPROM emulator. It is 4,096 bytes of code plus a 128×128 isometric city called Antescher, where every column of the world fits into a single byte.

Four thousand and ninety-six bytes: the renderer, the ants, the physics, the sound and the scoring, all of it.

I never found out how, and the question stuck. Everything below I measured from the tape image.

<nav class="ant-toc" aria-labelledby="ant-toc-h">
<style>
.ant-toc{margin:2rem 0;padding:1rem 1.15rem .95rem;border:1px solid rgba(120,132,155,.3);border-radius:12px}
.ant-toc p{margin:0 0 .75rem;font-size:.87rem;opacity:.78}
.ant-toc ul{margin:0;padding:0;list-style:none;columns:2;column-gap:1.7rem}
.ant-toc li{margin:0 0 .34rem;break-inside:avoid;font-size:.88rem;line-height:1.45}
.ant-toc a{text-decoration:none;border-bottom:1px solid transparent}
.ant-toc a:hover{border-bottom-color:currentColor}
.ant-toc .live{margin-left:.35rem;font-family:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:#2563eb;opacity:.9}
.dark .ant-toc{border-color:rgba(142,153,176,.3)}
.dark .ant-toc .live{color:#60a5fa}
@media (max-width:640px){.ant-toc ul{columns:1}}
</style>
<p id="ant-toc-h">It's a long one, and three of the figures are things you drive rather than read. Start anywhere:</p>
<ul>
<li><a href="#a-bit-of-history">A bit of history</a><span class="live">live</span></li>
<li><a href="#writing-a-game-with-no-assembler">Writing a game with no assembler</a></li>
<li><a href="#where-everything-lives">Where everything lives</a></li>
<li><a href="#one-byte-is-the-whole-world">One byte is the whole world</a></li>
<li><a href="#drawing-a-frame">Drawing a frame</a></li>
<li><a href="#sprites-that-sit-inside-the-architecture">Sprites inside the architecture</a></li>
<li><a href="#eight-records-no-allocation">Eight records, no allocation</a></li>
<li><a href="#five-ants-303-bytes">Five ants, 303 bytes</a></li>
<li><a href="#the-message-printer-runs-the-hud">The message printer runs the HUD</a></li>
<li><a href="#everything-routes-through-one-array">Everything routes through one array</a></li>
<li><a href="#antescher-from-the-ground">Antescher from the ground</a><span class="live">live</span></li>
<li><a href="#the-engine-running">The engine, running</a><span class="live">live</span></li>
<li><a href="#how-this-was-worked-out">How this was worked out</a></li>
</ul>
</nav>

## A bit of history

Quicksilva published [*Ant Attack*](https://worldofspectrum.org/archive/software/games/ant-attack-quicksilva-ltd) in November 1983 for the 48K ZX Spectrum, with a Commodore 64 port the year after. You walk into a walled city, find the other figure and bring them out through the gate while five giant ants converge on you. It's usually credited as the first isometric game on a home computer: *Zaxxon* had used the projection in the arcades a year earlier, but on rails, where this gave you a solid city, four views and the freedom to wander. It also let you play the boy rescuing the girl or the girl rescuing the boy, which in 1983 was close to unheard of.

<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start;margin:1.6rem 0 0.5rem">
  <img src="/images/blog/antescher/quicksilva-inlay.jpg" alt="The Quicksilva cassette inlay for Ant Attack: a giant ant looming over a walled city, with the text ANT ATTACK — SOFTSOLID 3D FROM QUICKSILVA and, at the foot, RUNS IN 48K ON THE SINCLAIR SPECTRUM, Patent Pending" style="flex:1 1 260px;min-width:0;margin:0">
  <img src="/images/blog/antescher/spectrum-title-screen.png" alt="The Ant Attack title screen: QUICKSILVA present ... ANT ATTACK, copyright Sandy White 1983, SOFT SOLID 3-D Pat.Pending, in red on yellow with a magenta border" style="flex:1 1 260px;min-width:0;margin:0">
</div>

The inlay and the title screen make the same claim in the same breath: *Softsolid 3D*, *Pat. Pending*. He had found a way of drawing solid blocks fast enough to fill a screen with them, and thought it worth patenting. It's the strangest thing in the code.

He had trained as a sculptor and the game reads like it, because the city came first. It's named Antescher after M. C. Escher, and he designed its arches and towers with Angela Sutherland. Talking to [*Sinclair User*](https://sinclairuser.com/021/grphics.htm) while the game was new, he put it in exactly those terms: the shapes it makes "have more to do with the forms in sculpture than with mathematics". They reused the engine for [*Zombie Zombie*](https://en.wikipedia.org/wiki/Zombie_Zombie), and [*Knight Lore*](https://en.wikipedia.org/wiki/Knight_Lore) made isometric 3D a genre the year after. *Ant Attack* got there first.

Where the ants came from he doesn't say anywhere I can find. But a walled concrete city overrun by giant ants is [*Them!*](https://en.wikipedia.org/wiki/Them!) almost move for move, the 1954 picture that invented the giant-bug genre and ended in the storm drains under Los Angeles. Escher gave him the architecture, the drive-in gave him what walks through it.

The city is still on the tape. Here is all 16,384 bytes of it, drawn with the game's own painter's-order algorithm. Go on, rotate it.

{{< antescher src="iso-city" height="683" wide="true" kind="experiment"
  hint="rotate the city through its four views"
  title="The city of Antescher, rendered from the original 16KB map data, rotatable through four views"
  caption="Rotating doesn't transform a coordinate. It changes the order the same array gets walked in." >}}

![Close-up of the north corner of Antescher, with Sandy White's SW signature built into the city wall](/images/blog/antescher/city-closeup.png)

He signed it, too: the blocks near the north wall spell out "@SW", which is about right for the man who built the city before he built the game.

## Writing a game with no assembler

White had no assembler and no linker, so he did both jobs himself, with a pen: every opcode looked up by hand off the table at the back of the Z80 manual, every byte written as hex down the side of the page.

The addresses are what hurt. A `JR` (jump relative) stores not the address you want but the *distance* to it, as a signed byte, so you have to know how long everything in between is and get the sign right. Get one wrong and the machine reads operands as opcodes and dies, with no error and no clue which of your 4,096 bytes was the bad one.

{{< antescher src="hand-assembly" height="542"
  title="A worked example: eight Z80 instructions with their addresses, their hex bytes, and what each one does"
  caption="Every byte in the second column was looked up or worked out by hand." >}}

Changing a line was worse, because inserting one instruction shifts every address after it and breaks every jump reaching across it. So he parked each routine at a round address and left a gap, letting it grow into its own slack while nothing downstream moved. A few hundred bytes of deliberate emptiness buys back the ability to change your mind, which on a deadline is the better trade every time.

{{< antescher src="address-shift" height="374"
  title="Two layouts compared: routines packed tight, where inserting one instruction shifts every later address, versus routines parked on round boundaries with slack between them"
  caption="The same edit, made twice. This is the entire reason for the padding." >}}

That padding is still in the binary. Tracing from the four entry points the BASIC loader calls (`0x8000`, `0x8090`, `0x8097`, `0x8EF2`) reaches 56 routines, and 45 start on a 16-, 32-, 64- or 128-byte boundary with dead space between. No assembler produces that. He loaded the result through an EPROM emulator, retyping four thousand pairs of hex digits after every change. Every trick below is a man buying back time and space from a process that charged him for both.

## Where everything lives

The tape loads one 32,767-byte block at `0x8000`. Code is the first 4KB and nothing else, so everything above `0x9000` is data.

{{< antescher src="memory-map" height="433"
  title="Memory map of Ant Attack from 0x8000 to 0xFFFF" >}}

Nothing writes into `0x8000–0x8FFF`, so there's no self-modifying code anywhere, in a game built for speed, at a time when patching your own operands was a standard way to buy back cycles. He didn't need it, for a reason the block stamper will make obvious.

## One byte is the whole world

The city is a flat 128 × 128 array at `0xC000–0xFFFF`: exactly 16KB, exactly half the game's memory image, no header and no compression. One byte per ground column, meaning everything stacked above a single square of ground in eight bits. Half of everything the game is, spent on the place rather than the program.

{{< antescher src="byte-layout" height="209"
  title="Bit layout of a city byte: bit 7 marks an entity, bits 0 to 5 mark a block at each height" >}}

{{< antescher src="map-stats" height="271"
  title="Statistics counted from the 16,384 bytes of city data" >}}

The number that matters is 836, the count of columns with a gap inside them: a block at height 4 with nothing holding it up at 2 and 3. Those are the arches and the overhangs, and they are why the city reads as architecture rather than terrain. Bit 7 is clear on tape because it's scratch space, set and cleared at runtime as things move.

There's no separate collision geometry and no spatial index, because the same byte answers all three questions the engine ever asks about a location:

- what do I draw here?
- can I stand here?
- is somebody already standing here?

{{< antescher src="one-byte-three-jobs" height="390"
  title="Diagram: one city byte feeds the renderer, terrain collision and entity collision"
  caption="The design decision that made 16KB of map affordable" >}}

Every trick below follows from that one decision.

## Drawing a frame

A frame runs in four stages, and what's missing is the striking part: no depth buffer, no display list, no dirty rectangles, no sorting pass.

{{< antescher src="frame-pipeline" height="707"
  title="Diagram: the four stages of one Ant Attack frame"
  caption="One pass, one copy, no tearing" >}}

The first stage is the cull, which copies the patch of map you can currently see into a 672-byte window. Everything downstream reads that window, never the full map, and the cull is the only place in the game where the four view orientations exist. After it, nothing knows a rotation happened.

Which is why rotating is free. The map is never transformed, not one coordinate of it. The four views are four *walk orders* over the same array: change two step values in a four-entry table and the world spins.

{{< antescher src="walk-orders" height="237"
  title="The four view directions as four traversal orders over the same array" >}}

```
-- the cull, and the only place "rotation" exists
cull(view):
    ax, ay, bx, by = STEP_TABLE[view]    -- 4 entries × 4 bytes

    for row in visible_rows:
        for col in visible_cols:
            x = origin_x + row*ax + col*bx
            y = origin_y + row*ay + col*by
            window[row][col] = city[y*128 + x]
```

*CRASH* ran three shots of one scene in its very first issue, February 1984, to show the effect off. "Playing television studios", they called it. They were photographing two step values changing in a four-entry table, which is also the trick that got me as a child.

<figure style="margin:1.8rem 0">
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <img src="/images/blog/antescher/crash-view-1.gif" alt="Ant Attack scene viewed from the first of four directions: two figures standing on a long wall" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
  <img src="/images/blog/antescher/crash-view-2.gif" alt="The same Ant Attack scene rotated one quarter turn, the wall now running left to right" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
  <img src="/images/blog/antescher/crash-view-3.gif" alt="The same Ant Attack scene from a third direction, the two figures still on the same wall" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
</div>
<figcaption style="margin-top:0.6rem;font-size:0.82rem;opacity:0.65;text-align:center">Three views of the same scene, from the <em>CRASH</em> issue 1 review. The figures never moved. Neither did the map.</figcaption>
</figure>

The drawing itself is the painter's algorithm: far corner to near, ground upward, later writes covering earlier ones. Occlusion sorts itself out for free, because anything nearer is drawn later and lands on top, so no depth test is ever needed.

```
draw_blocks():
    for col in window:                  -- far → near
        h = window[col] & 0x3F
        for z in 0..5:
            if h & (1 << z):
                stamp_cube(sx, sy - z*dz)
```

And `stamp_cube` is the thing off the cassette inlay. Speed was the point from the start: "we thought about how slow the existing games for the machine were," he told *Sinclair User*. The obvious way to draw a cube is to store its pixels and loop over them, which costs a pointer, a counter and a memory read per byte. White's version stores nothing and reads nothing: the cube's pattern is compiled into the instruction stream as literal operands, two routines of sixteen immediate stores each, so a cube costs about the time it takes to write its own bytes. That's Softsolid, and it's why he never needed self-modifying code.

## Sprites that sit inside the architecture

Blocks are opaque and can be stamped over anything. People and ants can't, because they're irregular silhouettes that have to appear *inside* the city, behind arches and between towers. They need a mask, which doubles their cost: a row is sixteen pixels, two bytes of image, and the mask makes it four. AND punches a hole the shape of the figure, OR drops the figure into it, and the background survives right up to the silhouette edge.

{{< antescher src="sprite-blit" height="246"
  title="Four stages of a masked sprite blit: background, AND mask, the hole it cuts, and the OR'd figure"
  caption="A synthetic figure, but the mechanic is White's" >}}

```
blit_sprite(gfx, addr):
    for row in 0..15:
        lmask, ldata, rmask, rdata = next 4 bytes

        screen[addr]   = (screen[addr]   & lmask) | ldata
        screen[addr+1] = (screen[addr+1] & rmask) | rdata
        addr += screen_row_stride
```

Sixteen rows at four bytes is 64 bytes per sprite image, and `0xB700` to `0xBFFF` is 2,304 bytes: exactly 36 of them, nothing wasted and nothing spare. Scan them for non-blank density and they fall into nine groups of four, the four being directions, indexed by the facing value at offset +4.

{{< antescher src="sprite-slots" height="409"
  title="The 36 sprite slots grouped into nine sets of four directions" >}}

Two groups give themselves away. `0xBA00` holds 16 non-blank bytes out of 64 in all four slots where every other group runs 22 to 53: a small object in a lot of transparent surround, which is the grenade. `0xBD00` is the only group whose slots vary wildly, at 15, 44, 53 and 33, so it isn't four rotations of anything. It's the explosion.

## Eight records, no allocation

Eight entities exist: the boy, the girl, five ants and one grenade. That's the whole cast, fixed at assembly time and walked through `0xB480` with IX, the Z80 register made for the job, since you point it at a record and every field is a fixed offset. When the grenade isn't in flight it parks outside the city and draws as the ammo box. Nothing is created or destroyed, so there's nothing to allocate.

{{< antescher src="entity-record" height="374"
  title="The sixteen fields of an Ant Attack entity record" >}}

The physics lives at offset +7, and it's four bits: jumping, walking, immune to gravity, auto-jump on obstacle. Set the gravity bit on an ant and it floats. One along, +6 holding 255 is a permanently paralysed ant, which is the entire implementation of a grenade that lands well.

Four bits and a byte, and that's the entire physics system. My version would have started with an `Entity` base class, an `Ant` subclass and a `PhysicsComponent`, and the class names alone would have used more memory than his implementation.

```
move(e, dx, dy):
    col = city[(e.y+dy)*128 + (e.x+dx)]

    if col & (1 << e.z):          -- wall at head height
        if e.flags & AUTO_JUMP: start_jump(e)
        return
    if col & 0x80:                  -- somebody is already there
        return collide(e, occupant)

    city[old] &= 0x7F                -- clear my bit 7
    e.x += dx;  e.y += dy
    city[new] |= 0x80                -- set it where I am now

gravity(e):
    if e.flags & NO_GRAVITY: return
    while not (city[e.y*128+e.x] & (1 << (e.z-1))):
        e.z -= 1
        e.fall += 1
    if e.fall > THRESHOLD: message(NASTY_FALL)
```

That is the three-jobs diagram cashing out: `move` reads a city byte for the wall, reads bit 7 for the occupant, and writes bit 7 to announce itself. No collision system exists as a separate thing to maintain.

## Five ants, 303 bytes

The routine at `0x8BD1` is 303 bytes and touches entity records, which makes it the largest block of behaviour in the game. It's the ants, and there's no pathfinding in it. An ant compares its coordinates with the player's, picks the axis with the larger difference and steps that way. That's the whole brain, and it calls the same `move()` you do, so it gets the same auto-jump and the same gravity.

```
update_ant(a, player):
    if a.sleep > 0:
        if a.sleep != 255: a.sleep -= 1   -- 255 never decrements
        return

    dx = sign(player.x - a.x)
    dy = sign(player.y - a.y)

    if abs(player.x - a.x) > abs(player.y - a.y):
        move(a, dx, 0)  or  move(a, 0, dy)
    else:
        move(a, 0, dy)  or  move(a, dx, 0)

    a.facing = direction_of(dx, dy)      -- indexes the 4 sprites
    a.frame  = (a.frame + a.speed) & 3

    if adjacent(a, player): bite(player)
```

The pursuit feels much smarter than one comparison per step, and the credit belongs to the city. Ants funnel through the same doorways you do because they're reading your city bytes, and they swarm because five of them take the same greedy step. Every tactic the game is famous for falls out of that: the high ledge, the arch that breaks pursuit, the one-block step they'll auto-jump against the two-block step they won't. None of it is coded anywhere.

## The message printer runs the HUD

The routine at `0x8E02` is called from 15 sites, more than anything else in the game. It prints messages, and it's also where the score, the ammo count and the sound effects live.

To find message *n* it points HL at `0x9000` and scans for the terminator `0xFF`, *n* times. There's no pointer table anywhere: the count of terminators *is* the index. A 34-entry address table would have cost 68 bytes, and this costs about ten and no data at all. It's slower, obviously, but a message only ever gets printed because something just happened to a human, which is about the slowest clock in the building.

{{< antescher src="message-printer" height="436"
  title="Flowchart of the message printer at 0x8E02"
  caption="Text, colour, live counters and sound in one byte stream" >}}

The move that makes it work is setting IY back to `0x5C3A`, the Spectrum ROM's system-variable base. With that restored he can call the ROM's own character output through `RST 10h`, so every message inherits the entire Sinclair control-code vocabulary for free: colours, AT positioning, the lot. He never wrote a text renderer at all.

On top he layers three codes of his own. `0x7D` recolours the viewport. `0x7E` prints a memory location as a decimal number, which is how the ammo count and the score stay current with no code behind them. Anything `≥ 0x80` fires a sound effect, low nibble the effect, high nibble the repeat count.

Which is what you were looking at in the screenshot at the top: `GOOD SHOT!` across the city, four live counters along the bottom, the coloured panel behind them, all one byte string walked once. The score isn't a subsystem. It's a variable at `0xB420` and a `0x7E` byte in the middle of a sentence.

## Everything routes through one array

Where you'd expect a world model, a scene graph and an event system, there's a byte array, eight records and a routine that stamps cubes.

{{< antescher src="system-map" height="1192"
  title="Diagram of the whole Ant Attack system, every path routing through the city array"
  caption="Everything routes through one array" >}}

## Antescher from the ground

The city was only ever meant to be seen from one angle, but the data doesn't care. Six bits of height per column is a full volume, so it can be walked rather than looked at: same 16KB, cast as rays instead of stamped as cubes, with the entity rules above still deciding what you climb and where you fall.

White never saw the place like this and never intended anyone else to. But the bytes were always a volume, and it seemed a shame not to go and stand in it.

{{< antescher src="first-person" height="731" wide="true" kind="experiment"
  hint="walk the streets at ground level"
  title="Walk the city of Antescher in first person, rendered from the original map data"
  caption="Nothing is modelled. Every surface you can see is one bit in one byte." >}}

## The engine, running

Every rule below comes from the teardown above: greedy pursuit, grid movement with auto-jump, gravity by bit test, bit 7 as the entity flag, paralysis as `sleep = 255`, and painter's-order drawing that stamps entities in the same walk as the blocks they stand between. Find the other figure, then get back to the gate.

{{< antescher src="play" height="731" wide="true" kind="experiment"
  hint="find the other figure, then get back to the gate"
  title="Playable isometric demonstration of the Ant Attack engine"
  caption="Rotate mid-chase and the ants keep coming on the same lines. They never knew the camera moved." >}}

## How this was worked out

The tape image parses as two blocks: an 8,203-byte BASIC program autostarting at line 3720, and one 32,767-byte code block at `0x8000`. Scanning the BASIC for USR tokens gives the four entry points, and a recursive-descent trace from those separates code from padding. Profiling each routine by where its 16-bit immediates point identifies the cull, the stampers, the entity walkers and the message printer without reading every instruction.

A few things are inference rather than proof: the identity of each sprite group, and the exact form of the step table. The structure is measured. The labels are read off it, and I could be wrong about some.

Further reading: [Derek Bolli's disassembly](https://derekbolli.wordpress.com/2015/05/24/ant-attack-disassembly-for-zx-spectrum/) reassembles to a working tape, [Icemark's notes](https://www.icemark.com/dataformats/mirrors/3D%20Ant%20Attack.htm) carry the entity offsets, [SkoolKit](https://skoolkit.ca/) builds your own, the tape is at [Spectrum Computing](https://spectrumcomputing.co.uk/entry/210/ZX-Spectrum/Ant_Attack) and [World of Spectrum](https://worldofspectrum.org/archive/software/games/ant-attack-quicksilva-ltd), the period pieces are [*Sinclair User*](https://sinclairuser.com/021/grphics.htm) and [*CRASH*](https://www.crashonline.org.uk/01/antattack.htm), and Steven Knock has [a PC remake](https://github.com/steven-knock/ant-attack).

He had 4,096 bytes to say everything he had to say, and spent a few hundred on padding so he could still change his mind. I've got no such excuse, so I'll stop here.

## Disclaimer

The teardown itself, the tracing and the byte counting, was done with Fable. Claude helped me brainstorm the structure and clean up the prose. The ideas, the conclusions and any mistakes in them are mine.

---

Every figure above is its own page under `/antescher/embed/`, so the city viewer, the raycaster and the engine can each be opened or reused on their own.

Game, code, artwork and city design remain Sandy White's. No disassembly listing is reproduced here and the sprite artwork is not extracted from the tape. Screenshot and title screen from [Spectrum Computing](https://spectrumcomputing.co.uk/entry/210/ZX-Spectrum/Ant_Attack), inlay from the World of Spectrum mirror on the Internet Archive, rotated views from [*CRASH* issue 1](https://www.crashonline.org.uk/01/antattack.htm), cover illustration by David John Rowe, all reproduced for criticism and review.
