+++
title = "Antescher: How Ant Attack Works"
date = 2026-08-11T12:00:00+01:00
draft = true
tags = ["retrocomputing", "zx-spectrum", "z80", "reverse-engineering", "games"]
description = "An interactive teardown of Sandy White's Ant Attack (ZX Spectrum, 1983): 4KB of hand-assembled Z80 and a 16KB city you can explore in the browser."
images = ["/images/blog/antescher/city-isometric.png"]
+++

In 1983 Sandy White wrote *Ant Attack* by hand, on paper, in Z80 mnemonics. He assembled it himself and typed the hex into an EEPROM emulator. The whole game is 4,096 bytes of code plus a 128×128 isometric city called Antescher, where every column of the world fits in a single byte.

<img src="/images/blog/antescher/spectrum-ingame.gif" alt="Ant Attack running on a ZX Spectrum: an isometric grey city, two ants closing on a figure, the message GOOD SHOT! across the middle, and a status panel reading AMMO 13, BOY 19, GIRL 20, TIME 732" style="image-rendering:pixelated;width:100%;max-width:512px;display:block;margin:1.6rem auto 0.5rem">

That is the whole game: a monochrome grey city, two ants, a figure, and a status panel. Almost everything on that screen is explained below — including why `GOOD SHOT!`, the ammo count and the score are all the same piece of code.

The city below is his too — 16,384 bytes lifted straight out of the tape image and drawn here using the game's own painter's-order algorithm. Rotate it.

{{< antescher src="iso-city" height="683" wide="true"
  title="The city of Antescher, rendered from the original 16KB map data, rotatable through four views"
  caption="Rotating does not transform a single coordinate. It changes the order the same array is walked in. That is the whole trick, and you are watching it happen." >}}

## Writing a game with no assembler

That first sentence deserves unpacking, because it describes a way of working that has essentially vanished.

Today you write code, and a chain of programs turns it into something the machine executes. A compiler or assembler converts your text into instruction bytes. A linker decides where everything lands in memory and fills in the addresses. You never see a byte, and you never care what address anything is at.

White had none of that. He did all three jobs himself, with a pen.

{{< antescher src="toolchain" height="239" wide="true"
  title="Diagram: paper, hand assembly, hex bytes, EPROM emulator, Spectrum, and back to paper when there is a bug"
  caption="The whole toolchain. The loop at the bottom is the expensive part." >}}

### What "mnemonics" means

A Z80 processor executes numbers. The number `0x7E` tells it "load the accumulator with the byte at the address in HL". Nobody can write a game in numbers, so you write `LD A,(HL)` instead — a *mnemonic*, a human-readable name for one instruction. There is a one-to-one mapping between the two, and it fills a table at the back of the Z80 manual.

An assembler is, at heart, that lookup performed by a machine. White did the lookup by eye, from the table, and wrote the resulting hex in a column down the side of the page.

{{< antescher src="hand-assembly" height="542"
  title="A worked example: eight Z80 instructions with their addresses, their hex bytes, and what each one does"
  caption="Eight instructions. Every byte in the second column was looked up or worked out by hand." >}}

### The bit that actually hurts

Opcodes are only a lookup, and lookups are tedious rather than hard. The addresses are the hard part.

Look at the two highlighted rows above. A `JR` — jump relative — doesn't store the address you want to reach. It stores the *distance* to it, as a signed byte, counted from the instruction after the jump. To write those two bytes you have to know exactly how long every instruction between here and there is, add them up, and get the sign right. `0x28 0x04` means "if zero, skip forward four bytes". `0x18 0xF7` means "go back nine".

Get one wrong and the machine jumps into the middle of an instruction, starts reading operands as opcodes, and dies — with no error message, no stack trace, and no way to know which of your 4,096 bytes was the bad one.

Now add the thing that makes it genuinely brutal: insert one instruction anywhere, and every address after it moves.

{{< antescher src="address-shift" height="374"
  title="Two layouts compared: routines packed tight, where inserting one instruction shifts every later address, versus routines parked on round boundaries with slack between them"
  caption="The same edit, made twice. This is the entire reason for the padding." >}}

That is the problem he solved by parking each routine at a round address and leaving a gap after it. Give yourself slack and an edit stays local. It costs a few hundred wasted bytes and buys back the ability to change your mind — and it is still visible in the binary today, which is how we can tell how the game was built. [More on that below](#the-hand-assembly-fingerprint).

### And the "EPROM emulator"

A Spectrum loads programs from cassette tape, which takes several minutes and means a rebuild is a coffee break. An EPROM emulator sidesteps that: it is a box of RAM that plugs into a machine and pretends to be a memory chip, so you can load code into it directly and the computer runs it as though it had always been there. Type the bytes in, hit run, watch it crash, edit the paper, type it again.

So "typed the hex into an EEPROM emulator" means keying in four thousand pairs of hexadecimal digits, by hand, and doing it again after every change.

With that in mind, everything in the rest of this post reads differently. The tricks below aren't cleverness for its own sake. Every one of them is a man buying back time and space from a process that charged him for both.

## A bit of history

<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start;margin:1.6rem 0 0.5rem">
  <img src="/images/blog/antescher/quicksilva-inlay.jpg" alt="The Quicksilva cassette inlay for Ant Attack: a giant ant looming over a walled city, with the text ANT ATTACK — SOFTSOLID 3D FROM QUICKSILVA and, at the foot, RUNS IN 48K ON THE SINCLAIR SPECTRUM, Patent Pending" style="flex:1 1 260px;min-width:0;margin:0">
  <img src="/images/blog/antescher/spectrum-title-screen.png" alt="The Ant Attack title screen: QUICKSILVA present ... ANT ATTACK, copyright Sandy White 1983, SOFT SOLID 3-D Pat.Pending, in red on yellow with a magenta border" style="flex:1 1 260px;min-width:0;margin:0">
</div>

The cassette inlay and the title screen, both making the same claim in the same breath: *Softsolid 3D*, *Pat. Pending*. He was advertising the rendering technique on the box, and it turns out to be the single strangest thing in the code.

Quicksilva published *Ant Attack* in November 1983 for the 48K ZX Spectrum, with a Commodore 64 port the following year. White had trained as a sculptor, and the game reads like it: the city came first. It is named Antescher after M. C. Escher, and he designed its arches and towers together with Angela Sutherland.

*Ant Attack* is usually credited as the first isometric game on a home computer, and one of the first 3D games of any kind that you could actually walk around in. Arcade cabinets like *Zaxxon* had used the projection a year earlier, but those were scrolling shooters on rails. Here you got a solid city, a camera you could rotate through four views, and the freedom to go anywhere. White called his rendering technique "soft solid" 3D and patented it. The game is also remembered for letting you choose to play the boy rescuing the girl or the girl rescuing the boy, which was close to unheard of in 1983.

White and Sutherland reused the engine for *Zombie Zombie* a year later, and by the end of 1984 Ultimate's *Knight Lore* had turned isometric 3D into a genre of its own. *Ant Attack* got there first.

![Close-up of the north corner of Antescher, with Sandy White's SW signature built into the city wall](/images/blog/antescher/city-closeup.png)

White even signed the work: the blocks near the north wall spell out "@SW". That close-up, like every figure in this post, is rendered from the 16KB of map data on the original tape, not from an emulator.

What follows is the whole teardown. Everything below was measured from the tape image.

## One byte is the whole world

The city is a flat 128 × 128 array at `0xC000–0xFFFF`. Exactly 16KB, exactly half the game's memory image, no header and no compression. One byte per ground column.

{{< antescher src="byte-layout" height="209"
  title="Bit layout of a city byte: bit 7 marks an entity, bits 0 to 5 mark a block at each height" >}}

### What's actually in there

Counted off the real bytes rather than taken on trust:

{{< antescher src="map-stats" height="271"
  title="Statistics counted from the 16,384 bytes of city data" >}}

Those 836 columns with internal gaps are the arches and overhangs — a block at height 4 with nothing under it at 2 and 3. They are why the city reads as architecture rather than terrain, and why the Escher reference in the name earns itself. Bit 7 is clear everywhere on tape because it is scratch space: the engine sets it as entities move and clears it behind them.

### Three jobs, one array

There is no separate collision geometry anywhere in the memory map, and no spatial index. The same byte answers all three questions the engine ever asks about a location.

{{< antescher src="one-byte-three-jobs" height="390"
  title="Diagram: one city byte feeds the renderer, terrain collision and entity collision"
  caption="The design decision that made 16KB of map affordable" >}}

## Where everything lives

The tape loads a single 32,767-byte block at `0x8000`. Code is the first 4KB and nothing else. Every byte above `0x9000` is data.

{{< antescher src="memory-map" height="433"
  title="Memory map of Ant Attack from 0x8000 to 0xFFFF" >}}

### The hand-assembly fingerprint

Tracing forward from the four entry points the BASIC loader calls (`0x8000`, `0x8090`, `0x8097`, `0x8EF2`) reaches 56 routines. Forty-five of them start on a 16-, 32-, 64- or 128-byte boundary, with dead padding in the gaps between.

That is not what an assembler produces. It is the fingerprint of the process described at the top of this post, left in the binary: each routine parked at a round address he could hold in his head, with slack after it, so that editing routine *n* never forced him to recompute every address downstream. The padding is the price of having no symbol table — and forty years on it is still the clearest evidence in the file that no assembler was ever involved.

> **Worth noticing** — Not one instruction writes into `0x8000–0x8FFF`. Zero self-modifying code, in 1983, in a game built for speed — when patching your own operands was the standard trick. He didn't need it, because of what the block stamper does instead.

## The frame

Four stages. The interesting part is what isn't in them: no depth buffer, no display list, no dirty rectangles, no sorting pass.

{{< antescher src="frame-pipeline" height="707"
  title="Diagram: the four stages of one Ant Attack frame"
  caption="One pass, one copy, no tearing" >}}

Everything downstream of the cull reads the 672-byte window, never the full map. The window is small enough to stay hot, and it is the only place the four view orientations are resolved — after it, nothing in the pipeline knows a rotation ever happened.

### Why rotation is free

The map is never transformed. The four views are four *walk orders* over the same array. Change two step values in a table and the world spins.

{{< antescher src="walk-orders" height="237"
  title="The four view directions as four traversal orders over the same array" >}}

*CRASH* noticed the effect in its very first issue, in February 1984, and ran three shots of one scene to show it off — "playing television studios", they called it. What the magazine was photographing was two step values changing in a four-entry table.

<figure style="margin:1.8rem 0">
<div style="display:flex;gap:8px;flex-wrap:wrap">
  <img src="/images/blog/antescher/crash-view-1.gif" alt="Ant Attack scene viewed from the first of four directions: two figures standing on a long wall" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
  <img src="/images/blog/antescher/crash-view-2.gif" alt="The same Ant Attack scene rotated one quarter turn, the wall now running left to right" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
  <img src="/images/blog/antescher/crash-view-3.gif" alt="The same Ant Attack scene from a third direction, the two figures still on the same wall" style="flex:1 1 180px;min-width:0;margin:0;image-rendering:pixelated">
</div>
<figcaption style="margin-top:0.6rem;font-size:0.82rem;opacity:0.65;text-align:center">Three views of the same scene, from the <em>CRASH</em> issue 1 review. The figures never moved. Neither did the map.</figcaption>
</figure>

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

### Stamping a block

Painter's algorithm. Far corner first, near corner last, ground upward. Later writes cover earlier ones, so occlusion resolves itself and no depth test is ever needed.

```
draw_blocks():
    for col in window:                  -- far → near
        h = window[col] & 0x3F
        for z in 0..5:
            if h & (1 << z):
                stamp_cube(sx, sy - z*dz)
```

> **The patented bit** — `stamp_cube` is not a loop over sprite bytes. The cube's pixel pattern is compiled into the instruction stream as literal operands — two routines carry sixteen immediate stores each. No source pointer, no counter, no memory read. A cube costs roughly the time to write its own bytes and nothing more. That is Softsolid, and it is why he never needed self-modifying code.

```
stamp_cube(addr):
    store literal_0  → addr
    store literal_1  → addr + stride
    store literal_2  → addr + stride*2
    ... fully unrolled, no loop, no read
```

## Masked, and four ways round

Blocks are opaque, so they can be stamped straight over whatever was there. People and ants are irregular silhouettes that have to sit *inside* the architecture, so they need a mask. Hence four bytes per pixel row rather than two.

The demo below is a synthetic figure, not White's artwork, but the mechanic is exactly his: AND cuts a hole the shape of the sprite, OR drops the sprite into it, and the background survives right up to the silhouette edge.

{{< antescher src="sprite-blit" height="246"
  title="Four stages of a masked sprite blit: background, AND mask, the hole it cuts, and the OR'd figure" >}}

```
blit_sprite(gfx, addr):
    for row in 0..15:
        lmask, ldata, rmask, rdata = next 4 bytes

        screen[addr]   = (screen[addr]   & lmask) | ldata
        screen[addr+1] = (screen[addr+1] & rmask) | rdata
        addr += screen_row_stride
```

16 rows × 4 bytes = **64 bytes per frame**, and the region from `0xB700` to `0xBFFF` is 2,304 bytes — exactly 36 slots.

### Nine states, four directions

Scan the slots for non-blank density and they fall into nine clean groups of four. The facing value at offset +4 of an entity record is the index into its group of four.

{{< antescher src="sprite-slots" height="409"
  title="The 36 sprite slots grouped into nine sets of four directions" >}}

The group at `0xBA00` gives itself away: 16 non-blank bytes out of 64 in all four slots, where every other group runs 22–53. That is a tiny object with a large transparent surround — the grenade. The group at `0xBD00` is the only one whose four slots vary wildly (15, 44, 53, 33), so it isn't four rotations of one thing; it's a sequence. Explosion stages.

Sprite artwork itself isn't reproduced here — that's still White's work. Load the tape in an emulator and point a memory viewer at `0xB700` if you want to see the figures.

## Eight records, no allocation

Eight entities exist. Boy, girl, five ants, one grenade. That is the entire cast, fixed at assembly time, walked with IX through `0xB480`. When the grenade isn't in flight it parks outside the city and draws as the ammo box — there is nothing to allocate because nothing is ever created or destroyed.

{{< antescher src="entity-record" height="374"
  title="The sixteen fields of an Ant Attack entity record" >}}

Offset +7 is where the physics lives, and it is four bits: jumping, walking, immune to gravity, auto-jump on obstacle. Set the gravity-immune bit on an ant and it floats. Offset +6 at 255 is a permanently paralysed ant — that is the entire implementation of a successful grenade.

{{< antescher src="player-state" height="253"
  title="State diagram of the player: standing, walking, jumping, falling, hurt and throwing"
  caption="Player state — every transition is a flag bit at +7" >}}

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

## Five ants, 303 bytes

The routine at `0x8BD1` is 303 bytes and touches entity records. It is the largest single behavioural block in the game and it is the ants.

There is no pathfinding. An ant compares its own coordinates with the player's, picks the axis with the larger difference, and steps that way. It uses the same `move()` as the player, so it collides with the same city bytes, gets the same auto-jump on a one-block step, and falls under the same gravity. The illusion of pursuit comes almost entirely from the architecture: ants funnel through the same doorways and gaps you do, and the swarming happens because five of them independently take the same greedy step.

{{< antescher src="ant-state" height="209"
  title="State diagram of an ant: roaming, pursuing, biting, stunned and paralysed"
  caption="Ant state — \"sleep = 255\" is the only permanent kill" >}}

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

> **Consequence** — Because ants navigate by the same city bytes you do, every tactic the game is famous for is emergent rather than authored. Leading ants onto a high ledge, breaking line of sight through an arch, using a one-block step they'll auto-jump but a two-block step they won't — none of that is coded. It falls out of five greedy walkers sharing your physics.

## Counting terminators instead of keeping a table

The routine at `0x8E02` is called from 15 sites, more than anything else in the game. It is the message printer, and it is where the score, the ammo count and the sound effects all actually live.

To find message *n* it points HL at `0x9000` and runs a repeated byte-scan for `0xFF`, *n* times. There is no pointer table at all — the count of terminators *is* the index. A 34-entry address table would have cost 68 bytes; this costs about ten and no data at all.

{{< antescher src="message-printer" height="436"
  title="Flowchart of the message printer at 0x8E02"
  caption="Text, colour, live counters and sound in one byte stream" >}}

Setting IY back to `0x5C3A` is the move that makes it all work. That is the Spectrum ROM's system-variable base, and restoring it means he can call straight into the ROM's character output through `RST 10h` — so every message inherits the entire Sinclair control-code vocabulary for free. Colours, AT positioning, the lot. He never wrote a text renderer.

On top of that he layers exactly three codes of his own. `0x7D` recolours the whole viewport. `0x7E` prints a memory location as a decimal number — which is how the ammo count and the score display update without any dedicated code. Anything `≥ 0x80` fires a sound effect, with the low nibble as the effect and the high nibble as a repeat count.

Scroll back to the screenshot at the top of this post and you are looking at that mechanism from the outside. `GOOD SHOT!` across the middle of the city. `AMMO 13 · BOY 19 · GIRL 20 · TIME 732` along the bottom, four live counters printed straight out of memory. The coloured panel behind them. No text renderer, no HUD subsystem, no score module — one byte string, walked once.

> **What this means** — The score isn't a subsystem. It's a variable at `0xB420` and a `0x7E` byte sitting in the middle of a sentence. Beat a level and the game calls `message(n)`; the congratulation, the colour change, the new figure and the fanfare are all the same string.

## How the pieces talk

Almost every arrow in this system terminates at the same 16KB array. That is the architecture in one picture: there is no world model, no scene graph, no event system. There is a byte array, eight records, and a stamping routine.

{{< antescher src="system-map" height="1192"
  title="Diagram of the whole Ant Attack system, every path routing through the city array"
  caption="Everything routes through one array" >}}

## Antescher from the ground

The city was only ever seen from one fixed angle. But the data doesn't care about the angle — the heightmap is a full volume, so it can be walked. Same 16KB, cast as rays instead of stamped as cubes.

Step-up and gravity here use the rules from the entity records above: a one-block rise is climbed automatically, a two-block rise is a wall, and you fall until a bit is set beneath you.

{{< antescher src="first-person" height="731" wide="true"
  title="Walk the city of Antescher in first person, rendered from the original map data"
  caption="Nothing is modelled. Every surface you can see is one bit in one byte." >}}

## The engine, running

Every rule below is one from the teardown, wired together: greedy ant pursuit, grid movement with auto-jump, gravity by bit test, bit 7 as the entity flag, permanent paralysis as `sleep = 255`, and painter's-order drawing where entities are stamped in the same walk as the blocks they stand between.

Find the other figure, then get back to the gate you came in through. The real map, the real rules, original code and figures.

{{< antescher src="play" height="731" wide="true"
  title="Playable isometric demonstration of the Ant Attack engine"
  caption="Rotate mid-chase and watch the ants keep coming on exactly the same lines. They never knew the camera moved — the walk order changed, the world didn't." >}}

## How this was worked out

The tape image parses as two blocks: an 8,203-byte BASIC program autostarting at line 3720, and one 32,767-byte code block loading at `0x8000`. Scanning the BASIC for USR tokens gives the four entry points, and a recursive-descent trace from those separates code from padding and builds the call graph. Each routine was then profiled by which memory regions its 16-bit immediates point into — that's what identifies the cull, the stampers, the entity walkers and the message printer without having to read every instruction.

The city render on this page decodes the real 16KB and walks it with the same painter's ordering the game uses. The block counts, the height histogram and the 836 overhang columns are all counted from those bytes.

A few things here are inference rather than proof, and are worth treating as such: the specific identity of each sprite group, and the exact form of the step table behind the four views. The structure is measured; the labels are read off the structure.

For the full annotated listing, Derek Bolli's `ant-attack-zasm.zip` reassembles to a working tape. Icemark's hacking notes carry the entity field offsets. SkoolKit is the tool if you want to build your own.

---

Every figure above is its own standalone page under `/antescher/embed/`, embedded here in an iframe — so the city viewer, the raycaster and the playable engine can each be opened, linked or reused on their own. There is also a [single-page version of the whole teardown](/antescher/) if you'd rather read it full-bleed.

Game, code, artwork and city design remain Sandy White's. This is a structural teardown for study — no disassembly listing is reproduced here, and the sprite artwork is not extracted from the tape.

**Images.** The isometric city renders are generated from the map data on the tape. The in-game screenshot and title screen come from the [Spectrum Computing archive](https://spectrumcomputing.co.uk/entry/210/ZX-Spectrum/Ant_Attack); the cassette inlay is from the World of Spectrum mirror on the Internet Archive; the three rotated views are from the *Ant Attack* review in [*CRASH* issue 1](https://www.crashonline.org.uk/01/antattack.htm), February 1984. Cover illustration by David John Rowe. All are reproduced here for criticism and review, and remain the property of their respective owners.
