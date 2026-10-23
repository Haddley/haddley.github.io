// Two-piece snap-fit case for the ATtiny85 speed limiter, on an ElectroCookie mini prototype board.
// Version 2.
//
// - The base holds the board on feet. The M3 feet can be tapped so that the board is screwed down.
// - The terminal blocks stand in two columns along the long edges of the board, one pole per row,
//   because the five holes in each row of this board are joined. The wires enter through notches
//   in the long walls, near the -y end.
// - The notches are open at the top, so I can tighten the wires first and close the lid afterwards.
// - The lid has a screwdriver slot above each terminal block.
// - Two snap tabs on the lid click into pockets in the long walls of the base.
//
// Board sizes come from the product drawing. Values marked CHECK are placeholders
// that I have to measure before I print.
//
// Axes: x is the short side of the board (38.1 mm), y is the long side (50.8 mm).
// Rows 1 to 17 run along y, 2.54 mm apart, row 1 at +y. Columns A to E are at x < 0 and F to J at x > 0.

part = "both";          // "base", "lid", "both" (side by side) or "closed" (lid in place)

// ---- the board (from the product drawing)
board_w   = 38.1;       // 1.5 inch
board_l   = 50.8;       // 2 inch
board_t   = 1.6;        // CHECK: typical PCB thickness, not on the drawing
m2_dx     = 31.8;       // M2 holes, centre to centre across the board
m2_dy     = 44.5;       // M2 holes, centre to centre along the board
m2_d      = 2.2;
m3_dy     = 40.6;       // the two M3 holes sit in the middle channel, x = 0
m3_d      = 3.2;

// ---- the parts on the board
stand_h   = 3.0;        // gap under the board for the solder tails
comp_h    = 10.0;       // CHECK: height of the tallest part above the board (the terminal blocks)
top_gap   = 1.0;        // air above the tallest part

// ---- the board grid
pitch     = 2.54;
row_span  = 16*pitch;   // row 1 to row 17, which is also the M3 hole spacing
function row_y(r) = row_span/2 - pitch*(r - 1);
col_a_x   = -13.97;     // column A. Column J is at +13.97.

// ---- the terminal blocks: one pole per row, so that no two poles share a strip
tb4_rows  = [14, 17];   // first and last row of the 4P block, in column A
tb2_rows  = [16, 17];   // first and last row of the 2P block, in column J
tb_depth  = 8.0;        // CHECK: depth of a block body, across the wire entry direction
screw_slot_w = 5.0;     // slot width in the lid, wide enough for a small screwdriver
notch_margin = 1.5;     // extra room above and below the poles for each wire notch

// ---- holding the board down
tap_m3    = true;       // true: tap the M3 feet and screw the board down. false: plain locating pins.
m3_pilot  = 2.5;        // hole to tap for an M3 thread (CHECK against the tap that I use)
m3_hole_depth = 3.6;    // depth of the tapped hole, from the top of the foot. An M3 x 5 mm screw fits.

// ---- the walls
wall      = 1.6;
floor_t   = 1.6;
lid_t     = 1.6;
end_clr   = 0.5;        // gap between the board and the end walls
side_clr  = 1.8;        // gap between the board and the long walls, room for the snap tabs
tol       = 0.25;       // print tolerance

// ---- the snap tabs
snap_len   = 16.0;      // length of each tab along y
snap_y     = 4.0;       // middle of each tab along y, clear of the wire notches at -y
snap_h     = 9.0;       // height of the flexing blade
snap_t     = 1.2;       // thickness of the blade
snap_bump  = 0.5;       // how far the catch sticks out
snap_catch = 1.6;       // height of the catch
$fn = 48;

in_w   = board_w + 2*side_clr;
in_l   = board_l + 2*end_clr;
in_h   = stand_h + board_t + comp_h + top_gap;
out_w  = in_w + 2*wall;
out_l  = in_l + 2*wall;
base_h = floor_t + in_h;
board_top = floor_t + stand_h + board_t;

// y range covering the poles of a block, plus the notch margin
function ylo(rows) = row_y(rows[1]) - notch_margin - pitch/2;
function yhi(rows) = row_y(rows[0]) + notch_margin + pitch/2;

// ---------------------------------------------------------------- base
module feet() {
  // M3 feet carry the board. With tap_m3 each one has a hole for an M3 thread, and the board is
  // screwed down through its M3 hole. Otherwise each has a pin that only locates the board.
  for (y = [-m3_dy/2, m3_dy/2]) translate([0, y, floor_t]) {
    if (tap_m3) {
      difference() {
        cylinder(d = 7.0, h = stand_h);
        translate([0, 0, stand_h - m3_hole_depth]) cylinder(d = m3_pilot, h = m3_hole_depth + 1);
      }
    } else {
      cylinder(d = 7.0, h = stand_h);
      cylinder(d = m3_d - 0.4, h = stand_h + 0.6*board_t);
    }
  }
  // M2 feet in the corners
  for (x = [-m2_dx/2, m2_dx/2], y = [-m2_dy/2, m2_dy/2]) translate([x, y, floor_t]) {
    cylinder(d = 5.0, h = stand_h);
    cylinder(d = m2_d - 0.4, h = stand_h + 0.6*board_t);
  }
}

module snap_pockets() {
  // the catch tip reaches (snap_bump - tol) past the wall face, so the pocket needs only a little more than that
  pocket_d = snap_bump - tol + 0.3;
  z_b = base_h - snap_h;                       // blade bottom, with the lid in place
  for (s = [-1, 1])
    translate([s > 0 ? in_w/2 - 0.01 : -in_w/2 - pocket_d + 0.01, snap_y - (snap_len + 1)/2, z_b - 0.2])
      cube([pocket_d, snap_len + 1, snap_catch + 0.4]);
}

module base() {
  difference() {
    translate([-out_w/2, -out_l/2, 0]) cube([out_w, out_l, base_h]);
    translate([-in_w/2, -in_l/2, floor_t]) cube([in_w, in_l, in_h + 1]);
    // wire notches in the long walls, open at the top, from just above the board:
    // the 4P block (column A) on the -x wall and the 2P block (column J) on the +x wall
    translate([-out_w/2 - 1, ylo(tb4_rows), board_top])
      cube([wall + 2, yhi(tb4_rows) - ylo(tb4_rows), base_h - board_top + 1]);
    translate([out_w/2 - wall - 1, ylo(tb2_rows), board_top])
      cube([wall + 2, yhi(tb2_rows) - ylo(tb2_rows), base_h - board_top + 1]);
    snap_pockets();
  }
  feet();
}

// ---------------------------------------------------------------- lid
// The lid is drawn with its underside at z = 0, and the blades hang down (-z).
module snap_tab(s) {
  // blade, then a catch with a ramp on its lower face
  bx = s*(in_w/2 - tol - snap_t/2);
  translate([bx, 0, 0]) {
    translate([-snap_t/2, snap_y - snap_len/2, -snap_h]) cube([snap_t, snap_len, snap_h]);
    // catch: wedge on the outer face of the blade, at the bottom
    translate([0, snap_y + snap_len/2, -snap_h])
      rotate([90, 0, 0])
        linear_extrude(snap_len)
          polygon(s > 0
            ? [[snap_t/2, 0], [snap_t/2 + snap_bump, snap_catch*0.9], [snap_t/2 + snap_bump, snap_catch], [snap_t/2, snap_catch]]
            : [[-snap_t/2, 0], [-snap_t/2 - snap_bump, snap_catch*0.9], [-snap_t/2 - snap_bump, snap_catch], [-snap_t/2, snap_catch]]);
  }
}

module lid() {
  difference() {
    union() {
      translate([-out_w/2, -out_l/2, 0]) cube([out_w, out_l, lid_t]);
      // a shallow rim that sits inside the walls and keeps the lid from sliding
      translate([-(in_w - tol)/2, -(in_l - tol)/2, -1.2]) difference() {
        cube([in_w - tol, in_l - tol, 1.2]);
        translate([snap_t + 0.8, 0.8, -1]) cube([in_w - tol - 2*(snap_t + 0.8), in_l - tol - 1.6, 3]);
      }
      snap_tab(1);
      snap_tab(-1);
      // hold-down posts over the two M2 holes at +y, 0.3 mm above the board. They are only needed
      // when the board is not screwed down, and they stay at +y because the terminal blocks are at -y.
      if (!tap_m3)
        for (x = [-m2_dx/2, m2_dx/2])
          translate([x, m2_dy/2, -(base_h - board_top - 0.3)]) cylinder(d = 4.6, h = base_h - board_top - 0.3 + 0.01);
    }
    // screwdriver slots above the terminal blocks, one slot per block, along the poles
    translate([col_a_x - screw_slot_w/2, row_y(tb4_rows[1]) - pitch/2 - 0.5, -0.5])
      cube([screw_slot_w, row_y(tb4_rows[0]) - row_y(tb4_rows[1]) + pitch + 1, lid_t + 1]);
    translate([-col_a_x - screw_slot_w/2, row_y(tb2_rows[1]) - pitch/2 - 0.5, -0.5])
      cube([screw_slot_w, row_y(tb2_rows[0]) - row_y(tb2_rows[1]) + pitch + 1, lid_t + 1]);
  }
}

echo(str("Outside: ", out_w, " x ", out_l, " x ", base_h + lid_t, " mm (closed)"));

if (part == "base") base();
if (part == "lid")  translate([0, 0, lid_t]) rotate([180, 0, 0]) lid();
if (part == "both") {
  base();
  translate([out_w + 8, 0, lid_t]) rotate([180, 0, 0]) lid();
}
if (part == "closed") { base(); translate([0, 0, base_h]) lid(); }
