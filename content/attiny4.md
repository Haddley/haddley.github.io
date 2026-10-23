---
title: "ATtiny85"
part: 4
description: "Moving the ATtiny85 speed limiter from a breadboard to a soldered ElectroCookie mini prototype board, with screw terminal blocks for the bike's wires and a two-piece 3D printed case that snaps shut inside the bike frame"
date: "2026-10-23"
categories: ["IOT"]
tags: "attiny85, e-bike, prototype-board, terminal-blocks, openscad"
hidden: false
slug: "attiny4"
image: "/assets/images/attiny4/posts-meta.svg"
---

In [Part 3](/posts/attiny3/) the ATtiny85 cuts the motor above 25 km/h by pulling the brake line LOW, and the circuit lives on a solderless breadboard in the frame bag. A breadboard was the right tool for trying ideas. I would rather have a soldered board for the bike, so in this post I plan the move, and I plan a case that squeezes into the bike frame.

I am moving the circuit to an **ElectroCookie Mini PCB Prototype Board**, a solderable board with gold-plated holes, and I am using **Aribrnten 2.54 mm PCB mount terminal blocks** for the bike's wires.

:::brain-power Before you read on
On a breadboard, I push a wire into any hole and the board makes the connection. On a plain soldered board, what do I have to do myself for every connection, and which connections will many parts share?
:::

## What has to move

The final circuit from Part 3 has only five parts:

- **The ATtiny85**
- **A 1 kΩ resistor** between the speed wire and pin 7 (PB2)
- **A 220 Ω resistor** between the brake wire and pin 3 (PB4)
- **A 100 nF capacitor and a 10 µF capacitor** that decouple the supply between pin 8 (Vcc) and ground
- **Optionally, a second 100 nF capacitor** between pin 7 and ground, which filters short spikes on the speed wire

Six wires from the bike connect to it: the hub connector's red wire (+5 V) and black wire (ground), the two halves of the white speed wire, and the two brake wires, one that reads 5 V and one that reads 0 V.

## The board

The board is a quarter-size breadboard that is meant for soldering. It is double-sided and gold plated to prevent oxidation, and the product drawing gives these sizes:

| | Size |
|---|---|
| Board | 1.5 × 2 inches (38.1 × 50.8 mm) |
| Holes | 17 rows, in two blocks of five columns (A to E and F to J), with a channel between them |
| Hole size | 1.2 mm through holes, on a 0.1 inch (2.54 mm) pitch |
| M2 mounting holes (Ø2.2 mm) | Four, in the corners, 31.8 mm apart across and 44.5 mm apart along the board |
| M3 mounting holes (Ø3.2 mm) | Two, in the channel between the columns, 40.6 mm apart |

The view of the underside shows that the five holes of each half-row are joined by a strip, as they are on a breadboard. I will still check the strips with a meter before I solder.

The gap between column E and column F is the same as the gap on a breadboard, so an ATtiny85 can straddle the channel: pins 1 to 4 go in column E, and pins 8 to 5 go in column F. Every pin then has four free holes on its own strip, as it would on a breadboard.

### No separate + and − rails

A breadboard has a pair of power rails along its edges. I connect 5 V and ground to them once, and then I can take either one from any hole beside them. This board does not have separate + and − rails, so I have to make the 5 V and ground connections myself, with solder and short wires.

Ground matters most here, because several things share it. Pin 4 sits on a strip with four other holes, and five more things need ground.

:::pencil Count the ground connections
List everything in the circuit that has to connect to ground, apart from pin 4 itself. Pin 4 is in column E, so its strip has four free holes, A to D. Do all of the connections fit on that one strip?

:::answer
No. Five things need ground: the negative side of the 10 µF capacitor, the negative side of the 100 nF supply capacitor, the optional 100 nF capacitor on pin 7, the hub connector's black wire, and the brake wire that reads 0 V. That is five connections and only four free holes, so a short wire has to carry ground to a second strip. The 5 V strip is easier, because pin 8 has four free holes and only three things need 5 V: the power wire and the positive sides of the two supply capacitors.
:::
:::

## Terminal blocks for the bike's wires

Each terminal block has pins on a 2.54 mm (0.1 inch) pitch, the same spacing as the holes on the board, and the pack has blocks with 2, 3 and 4 poles. I plan to use two of them:

| Block | Pole | Connects to |
|---|---|---|
| 2P, power | 1 | +5 V, from the hub connector's red wire |
| 2P, power | 2 | Ground, from the hub connector's black wire |
| 4P, speed and brake | 1 | White speed wire, motor side |
| 4P, speed and brake | 2 | White speed wire, controller side |
| 4P, speed and brake | 3 | Brake wire that reads 5 V |
| 4P, speed and brake | 4 | Brake wire that reads 0 V, to ground |

On the board, the same connections give these nets:

| Net | What is on it |
|---|---|
| 5 V | Power pole 1, chip pin 8, and the positive side of the supply capacitors |
| Ground | Power pole 2, speed and brake pole 4, chip pin 4, and the negative side of the capacitors |
| Speed | Speed and brake poles 1 and 2 joined together, and the 1 kΩ resistor to chip pin 7 |
| Brake | Speed and brake pole 3, and the 220 Ω resistor to chip pin 3 |

:::watch-it The poles of a block must not share a strip
Because the five holes of each half-row are joined, a terminal block that lies along a row would join all of its poles together. Each pole has to stand in its own row. So the blocks stand along the long edges of the board, with one pole in each row: the 4P block in column A, in rows 14 to 17, and the 2P block in column J, in rows 16 and 17. The wires then enter the blocks from the sides of the board and not from the end.
:::

:::under-the-hood Why speed poles 1 and 2 are joined
In Part 3 I simplified the design so that the two halves of the white wire join again, and the chip only listens to the speed. On the board, that join is a short wire or a solder bridge between the strips of two neighbouring poles of the 4P block. The controller and the display get the speed straight from the motor, as they did before I touched the bike, and the 1 kΩ resistor takes a copy of the signal to the chip's input.
:::

:::no-dumb-questions
**Q: Why use terminal blocks and not solder the bike's wires to the board?**

A: With a terminal block I can fasten and release each wire with a screwdriver, so I can take the board off the bike without cutting or resoldering anything. It also keeps a pull on a wire from tearing at a solder joint.

**Q: Why 2.54 mm?**

A: It is the same pitch as the 0.1 inch grid of the board's holes and of the ATtiny85's pins, so the pieces line up without any bending.
:::

:::under-the-hood What the product drawing says about the blocks
The seller's drawing gives the sizes that the board and the case depend on. The listing also says 150 V and 6 A.

| | Size |
|---|---|
| Length of a block with P poles | P × 2.54 + 0.4 mm, so 10.56 mm for 4P and 5.48 mm for 2P |
| Height above the board | 8.80 mm |
| Depth | 6.30 mm in all: the pins are 3.0 mm from the back face and 3.3 mm from the wire entry face |
| Pins | 0.8 × 0.5 mm, 3.5 mm long below the body, with a 1.3 mm hole recommended |

My board's holes are 1.2 mm, and the diagonal of a 0.8 × 0.5 mm pin is about 0.94 mm, so the pins should go in. With a 1.6 mm board, about 1.9 mm of each pin comes out of the underside, and the 3 mm of space under the board in the case is enough for it and its solder. The screws are on top, and the wire goes in from the side, which is why the lid has slots and the long walls have notches.
:::

:::watch-it Check the wire range
The drawing does not say which sizes of wire the clamp takes. Before I rely on it, I will check that the screws clamp the thin wires from the hub connector and the brake sensor.
:::

## A 3D printed case

The board also needs a case, and my plan is to squeeze the finished, printed box into the bike frame. The case has to do four things:

- hold the board and its two terminal blocks;
- have holes so that I can reach the terminal screws and feed the wires in;
- come in two pieces that snap together once the wires are secured;
- be small enough for the gap in the frame.

I model it in OpenSCAD with named parameters, in the same way as the parts in my [3D printing post](/posts/3dprinting3/), so that I can change the size to suit the space. Here is the first version:

![](assets/images/attiny4/case-open.png)
*The first version of the case, drawn in OpenSCAD: the base on the left and the lid on the right, upside down as it would print*

![](assets/images/attiny4/case-closed.png)
*The same case closed, with the lid in place*

The design has these parts:

- **Feet:** the board rests on feet in the base, so that the solder tails have room underneath. The two feet under the M3 holes are solid, with a hole that I can tap.
- **Wire notches:** a notch in each long wall, level with each block, is open at the top. I can tighten the wires first, and then the lid closes the notch over them.
- **Screwdriver slots:** the lid has a slot above each block, along its poles.
- **Snap tabs:** two flexible tabs on the lid click into pockets in the long walls of the base.

:::no-dumb-questions
**Q: What are the tapped M3 posts for?**

A: I have an M3 tap, which I used on a printed part in my [3D printing post about a Raspberry Pi mount](/posts/3dprinting2/). An M3 screw through the board's M3 hole goes into a tapped hole in the foot below it, so the board is held down firmly and does not rattle on the bike. The corner M2 holes only carry the board on small pins.

**Q: Why are the wire notches open at the top?**

A: So that the wires can be tightened before the case is closed. The lid then covers the top of each notch, and leaves an opening just big enough for the wires.

**Q: Why does the case need two sets of measurements?**

A: The board and what stands on it set the smallest inside size, and the frame sets the largest outside size. The case has to fit between them.
:::

:::pencil Which two measurements decide the box?
Before I can finish the case, I need two sets of measurements. What are they, and where does each one come from?

:::answer
The inside size comes from the board and what stands on it: the 50.8 × 38.1 mm board, the height of the terminal blocks and the chip, and the room that the wires need. The outside size comes from the gap in the bike frame. If the first set is bigger than the second, the layout has to change and not the box.
:::
:::

With the sizes in the file today, the closed case is 44.9 × 55 × 17.6 mm. The height comes from the 8.8 mm terminal blocks, plus the space under the board and the lid. I have assumed that the 10 µF capacitor is no taller than the blocks, or that it lies flat, and that the board is 1.6 mm thick, which its drawing does not give.

:::watch-it Check the snap tabs and the frame
A snap tab is a thin blade that bends, and a blade that is printed standing up can crack across its layers when it bends. I will print the first copy and see, and I may print the lid on its side, or use a tougher material, if a tab breaks. A bike frame is also wet and bumpy, so the case should keep water off the board, hold the board firmly, and give the wires slack and some strain relief.
:::

## Download the first version

These files are the first version of the case. The terminal block and board sizes come from the product drawings, but I have not yet measured the gap in my bike frame, or the real board, so do not print them for your own bike yet. The STL files are in printing orientation, with the base standing in its tray and the lid on its back.

| Part | File | Notes |
|---|---|---|
| Base | [case_base.stl](/assets/files/attiny4/case_base.stl) | Feet for the board, tapped M3 posts, wire notches, and pockets for the snap tabs. |
| Lid | [case_lid.stl](/assets/files/attiny4/case_lid.stl) | Screwdriver slots over the terminal blocks, and two snap tabs. Print it flat on its plate. |
| Source | [case.scad](/assets/files/attiny4/case.scad) | The OpenSCAD model. Change the values marked CHECK, such as the board thickness, and export again. |

The size of the case follows from those values, so a change to a block or board size changes the outside size.

## Where it stands

This post is the plan. I will check every connection with a meter before I connect the board to the bike, and I will look at the speed and brake lines the same way that I did on the breadboard. The case is waiting for one measurement that matters most, the gap in the frame, and for a check of the real board's thickness.

:::bullet-points Recap
- The Part 3 circuit has five parts and six wires to the bike, so it fits on a small board.
- The ElectroCookie board is a quarter-size breadboard with 5-hole strips and no separate + and − rails, so power and ground are wired by hand.
- Ground has five connections and only four free holes on pin 4's strip, so a short wire carries it to a second strip.
- Each terminal block pole needs its own row, so the blocks stand along the long edges of the board.
- A two-piece printed case has screwdriver slots, wire notches open at the top, snap tabs, and tapped M3 posts that hold the board down.
- The 8.8 mm blocks give a case of 44.9 × 55 × 17.6 mm, and it has to fit the gap in the frame.
:::

## References

- [Part 3: the speed limiter through the brake line](/posts/attiny3/)
- [Part 2: the speed limiter, simulated in Tinkercad](/posts/attiny2/)
- [3D Printing, Part 3: two printed versions of the back half of a rear light](/posts/3dprinting3/)
- [3D Printing, Part 2: a mount for a Raspberry Pi and a breadboard](/posts/3dprinting2/)
- [The bikespeed repository: code, circuit and design notes](https://github.com/Haddley/bikespeed)
