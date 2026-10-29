---
title: "ATtiny85"
part: 4
description: "Moving the ATtiny85 speed limiter from a breadboard to a soldered ElectroCookie mini prototype board, with screw terminal blocks for the bike's wires and a two-piece 3D printed case that snaps shut inside the bike frame, then building it and testing it on the bike"
date: "2026-10-23"
categories: ["IOT","3D printing"]
tags: "attiny85, e-bike, prototype-board, terminal-blocks, openscad"
hidden: false
slug: "attiny4"
image: "/assets/images/attiny4/posts-meta.svg"
---

Here is the finished board, in its red case with the lid off. I have tested it on the bike. The motor cuts out at 25 km/h, as it did in Part 3, and it works great.

![](assets/images/attiny4/assembled.jpg)
*I soldered the parts to the board and fitted it in the case: the chip in the middle, the 4-pole terminal block at the bottom left, the 2-pole block at the bottom right, and the red and yellow wires standing on the right-hand side*

In [Part 3](/posts/attiny3/) the ATtiny85 cuts the motor above 25 km/h by pulling the brake line LOW, and the circuit lives on a solderless breadboard in the frame bag. A breadboard was the right tool for trying ideas. I would rather have a soldered board for the bike, so in this post I make the move, and I print a case that squeezes into the bike frame.

I moved the circuit to an **ElectroCookie Mini PCB Prototype Board**, a solderable board with gold-plated holes, and I used **Aribrnten 2.54 mm PCB mount terminal blocks** for the bike's wires. They come in a pack of 50, in 2, 3 and 4 poles, and the listing rates them at 150 V and 6 A.

## What has to move

The final circuit from Part 3 has only five parts:

- **The ATtiny85**, which I plug into an 8-pin socket. I used a socket adapter from a 66-piece kit of soldering-type DIP IC sockets with a 2.54 mm grid, in sizes from 6 to 28 pins. The socket makes the chip easy to remove and replace, and it means that I never heat the chip itself when I solder to the board.
- **A 1 kΩ resistor** between the speed wire and pin 7 (PB2)
- **A 220 Ω resistor** between the brake wire and pin 3 (PB4)
- **A 100 nF capacitor and a 10 µF capacitor**, marked 104 and 106, that decouple the supply between pin 8 (Vcc) and ground
- **Optionally, a second 100 nF capacitor** between pin 7 and ground, which filters short spikes on the speed wire. The breadboard circuit in Part 3 worked without it, so I left it off the board.

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

The view of the underside shows that the five holes of each half-row are joined by a strip, as they are on a breadboard. I checked the strips by eye before I soldered, and they were all good.

The gap between column E and column F is the same as the gap on a breadboard, so an ATtiny85 can straddle the channel: pins 1 to 4 go in column E, and pins 8 to 5 go in column F. Every pin then has four free holes on its own strip, as it would on a breadboard.

## Terminal blocks for the bike's wires

Each terminal block has pins on a 2.54 mm (0.1 inch) pitch, the same spacing as the holes on the board. I used one 2-pole block and one 4-pole block to attach the bike's wires to the board:

| Block | Pole | Connects to |
|---|---|---|
| 2P, power | 1 | +5 V, from the hub connector's red wire |
| 2P, power | 2 | Ground, from the hub connector's black wire |
| 4P, speed and brake | 1 | Red brake wire, which reads 5 V |
| 4P, speed and brake | 2 | White speed wire, motor side |
| 4P, speed and brake | 3 | White speed wire, controller side |
| 4P, speed and brake | 4 | Black brake wire, which reads 0 V, to ground |

I cut the white speed wire in half and joined a white wire to each cut end, so the motor half goes to pole 2 and the controller half to pole 3. The two brake wires are red and black.

On the board, the same connections give these nets:

| Net | What is on it |
|---|---|
| 5 V | Power pole 1, chip pin 8, and one side of each supply capacitor |
| Ground | Power pole 2, speed and brake pole 4, chip pin 4, and the other side of each capacitor |
| Speed | The two white poles (2 and 3) joined together, and the 1 kΩ resistor to chip pin 7 |
| Brake | The red brake pole (1), and the 220 Ω resistor to chip pin 3 |

:::under-the-hood Why the two white poles are joined
In Part 3 I simplified the design so that the two halves of the white wire join again, and the chip only listens to the speed. On the board, that join is a short wire or a solder bridge between the strips of poles 2 and 3 of the 4P block. The controller and the display get the speed straight from the motor, as they did before I touched the bike, and the 1 kΩ resistor takes a copy of the signal to the chip's input.
:::

:::no-dumb-questions
**Q: Why use terminal blocks and not solder the bike's wires to the board?**

A: With a terminal block I can fasten and release each wire with a screwdriver, so I can take the board off the bike without cutting or resoldering anything. It also keeps a pull on a wire from tearing at a solder joint.

**Q: Why 2.54 mm?**

A: It is the same pitch as the 0.1 inch grid of the board's holes and of the ATtiny85's pins, so the pieces line up without any bending.
:::


## The component layout

Here is the circuit laid out on the board. The white board, its gold holes, and the letters and numbers match the ElectroCookie board, and the green blocks are the Aribrnten terminal blocks.

![](assets/images/attiny4/board-layout.svg)
*The component layout on the ElectroCookie mini prototype board, seen from above, with the 4P terminal block in column A and the 2P block in column J*

Here is the same board seen from below, where I solder. Column A is now on the right, and the gold bars are the strips that join each half-row of five holes. The only wire on this side is the yellow bridge between D15 and C16. I put it there, and not at the poles, so that each pad has room around it.

![](assets/images/attiny4/board-layout-below.svg)
*The same layout seen from below, with each soldered joint marked and the bridge under the board*

I used solid 22 AWG wires from my TUOFENG kit for the short links, in red for 5 V, black for ground and yellow for the speed signal. The number 22 is the American Wire Gauge size, and it means a copper conductor about 0.64 mm across, with a cross-section of about 0.33 mm². The PVC insulation takes the whole wire to 1.55 mm, so the bare conductor fits the board's 1.2 mm holes, and the insulation does not. Both of my capacitors are ceramic, so they have no polarity and can go in either way round.

The markings on the two capacitors are three-digit codes. The first two digits are the value in picofarads, and the third is the number of zeros that follow. So 104 is 10 followed by four zeros, which is 100,000 pF or 100 nF, and 106 is 10 followed by six zeros, which is 10,000,000 pF or 10 µF.

## A 3D printed case

The board also needs a case, and the finished, printed box goes into the bike frame. The case has to do four things:

- hold the board and its two terminal blocks;
- have holes so that I can reach the terminal screws and feed the wires in;
- come in two pieces that snap together once the wires are secured;
- be small enough for the gap in the frame.

I model it in OpenSCAD with named parameters, in the same way as the parts in my [3D printing post](/posts/3dprinting3/), so that I can change the size to suit the space. Here is the first version:

![](assets/images/attiny4/case-open.png)
*The first version of the case, drawn in OpenSCAD: the base on the left and the lid on the right, upside down as it would print*

![](assets/images/attiny4/case-closed.png)
*The same case closed, with the lid in place*

Here is a preview of the finished item, with the lid beside the base. This picture is drawn from the same layout as the diagram above, so the parts are where the diagram puts them.

![](assets/images/attiny4/case-lid-off.png)
*A preview of the finished item with the lid beside the base: the board in the base, the chip in the middle, the terminal blocks at the left and right edges, and the bike's wires leaving through the notches in the long walls*

:::test-drive Turn the finished item around
Drag the model below to turn it, and scroll or pinch to zoom. Look at the case from the side, to see how the wires leave through the notches, and from above, to see where the parts sit on the board. In the model, the lid lies beside the base.
:::

:::demo model /assets/files/attiny4/lid-off.glb
:::

I also saved the same model as [lid-off.glb](/assets/files/attiny4/lid-off.glb) and [scene.gltf](/assets/files/attiny4/scene.gltf), which open in most 3D viewers.

The design has these parts:

- **Feet:** the board rests on feet in the base, so that the solder tails have room underneath. The two feet under the M3 holes are solid, with a hole for an M3 screw.
- **Wire notches:** a notch in each long wall, level with each block, is open at the top. I can tighten the wires first, and then the lid closes the notch over them.
- **Screwdriver slots:** the lid has a slot above each block, along its poles.
- **Snap tabs:** two flexible tabs on the lid click into pockets in the long walls of the base.

:::no-dumb-questions
**Q: What are the M3 posts for?**

A: An M3 screw through each of the board's two M3 holes holds the board down firmly. The corner M2 holes only carry the board on small pins.
:::

:::watch-it Do the snap tabs hold, and does it fit the frame?
A snap tab is a thin blade that bends, and a blade that is printed standing up can crack across its layers when it bends. I printed the files as they are, and both tabs held. They keep the lid shut without gripping too hard, and I can still take the lid off with a little gentle pressure. A bike frame can also be wet and bumpy, and this case is only partly ready for that. The M3 screws hold the board down firmly. The case is not waterproof, because the lid has a screwdriver slot above each terminal block and the wire notches stay open around the wires. It also has no strain relief for the wires, which leave through the notches and are held only by the terminal screws.
:::

## Download the case files

These are the files that I printed, on a Bambu Lab P1S printer with Bambu PLA in black and red, and the first version worked. The case fits my bike frame easily, and the lid closes over the real board. Your frame is not the same as mine, so measure the gap in your frame, and the thickness of your board, before you print. The STL files are in printing orientation, with the base standing in its tray and the lid on its back.

| Part | File | Notes |
|---|---|---|
| Base | [case_base.stl](/assets/files/attiny4/case_base.stl) | Feet for the board with M3 screw holes, wire notches, and pockets for the snap tabs. |
| Lid | [case_lid.stl](/assets/files/attiny4/case_lid.stl) | Screwdriver slots over the terminal blocks, and two snap tabs. Print it flat on its plate. |
| Source | [case.scad](/assets/files/attiny4/case.scad) | The OpenSCAD model. Change the values marked CHECK, such as the board thickness, and export again. |

The size of the case follows from those values, so a change to a block or board size changes the outside size.

## The assembled board

The photo at the top of this post shows the assembled board. It follows the layout above, with one small change. I mounted the yellow bridge wire on top of the board, where the layout has it underneath, because I found that easier. The terminal blocks stand along the two long edges, the chip sits in the middle rows, and the black wires carry ground between the strips. The two resistors lie close to the board, and the two capacitors stand at the top.

The case fits the frame easily. It goes in the space at the top of the frame, above the battery.

To connect it to the bike, I opened up the cable between the controller and the hub motor. I tapped a red wire into the 5 V wire and a black wire into the ground wire, and I cut the white speed wire in half and joined a white wire to each cut end. The other ends of these four wires go into the terminal blocks on the board. They are 24 AWG stranded silicone wire from a hook-up wire kit with six colours, 30 ft spools, and a 300 V rating. A 24 AWG conductor is about 0.51 mm across, a little thinner than the 22 gauge solid core on the board. The stranded wire is flexible, so it suits the run from the bike's cable to the board, and the solid core stays on the board.

I also bought two cables on eBay to make the connections:

- a waterproof 6 mm M6 e-bike splitter cable with one female connector and two male connectors, which the listing sells in 2, 3 and 5 pin versions. I plugged it into the join in the bike's brake cable;
- a 1 m waterproof brake cable with a 6 mm M6 2-pin female Julet connector at one end and bare wires at the other. It plugs into the splitter. Its two bare wires, one red and one black, go into the red and black poles of the 4-pole terminal block, exactly as planned.

The bike's brake cable comes apart at a connector, so I did not have to cut it. The splitter keeps the brake lever and the controller connected, and the extra connector carries the brake signal to the board.

I programmed the ATtiny85 before I plugged it into the socket on the board.

:::bullet-points Recap
- The Part 3 circuit has five parts and six wires to the bike, so it fits on a small board.
- The ElectroCookie board is a quarter-size breadboard for soldering, with 5-hole strips.
- The terminal blocks stand along the two long edges of the board, and each grips its wire with a screw.
- The ATtiny85 sits in an 8-pin socket, so I can remove and replace it, and I programmed it before I fitted it.
- A two-piece printed case has screwdriver slots, wire notches open at the top, snap tabs, and M3 posts that hold the board down.
- I printed the case from these files. The snap tabs hold, I can still take the lid off with a little gentle pressure, and it fits easily in my frame, in the space above the battery.
- The layout needed only one small change: I mounted the yellow bridge wire on top of the board and not underneath, because that was easier. I opened the cable between the controller and the hub motor, tapped into the red 5 V and black ground wires, and cut the white speed wire in half with both cut ends on the board. The motor cuts out at 25 km/h, and it works great on the bike.
:::

## References

- [Part 3: the speed limiter through the brake line](/posts/attiny3/)
- [Part 2: the speed limiter, simulated in Tinkercad](/posts/attiny2/)
- [3D Printing, Part 3: two printed versions of the back half of a rear light](/posts/3dprinting3/)
- [3D Printing, Part 2: a mount for a Raspberry Pi and a breadboard](/posts/3dprinting2/)
- [The bikespeed repository: code, circuit and design notes](https://github.com/Haddley/bikespeed)
