// Two-part 3D-printable case for an Arduino Uno R3 with a 2.8" TFT shield.
// part = "base", "lid" or "both" (side by side, for a preview).
// All sizes are millimetres. Check the three "measure" values against your own stack.
part = "both";

// --- Arduino Uno R3 (published board outline) ---
uno_l = 68.6;  uno_w = 53.3;
uno_holes = [[13.97, 2.54], [15.24, 50.8], [66.04, 7.62], [66.04, 35.56]];
usb_y   = 38.1;           // centre of the USB-B jack, from the board's lower edge (measure)
usb_w   = 13;  usb_h = 12;     // opening: jack is about 12 x 11, plus slack
dc_y    = 9.5;            // centre of the DC barrel jack (measure)
dc_w    = 10.5; dc_h = 12;
dc_cutout = true;         // set false if you will not use the DC jack

// --- 2.8" TFT shield and its screen (measure) ---
shield_l = 71; shield_w = 56;      // widest outline of shield + touch glass
stack_above = 20;                  // board top to top of touch glass (headers + shield + glass)
win_l = 59;  win_w = 44;           // window in the lid, a little larger than the 57.6 x 43.2 active area
win_dx = -3;  win_dy = 0;          // shift the window from the centre (negative = towards the USB wall)
ext = 2;                           // extra length added to the far (+x) end, away from the USB jack

// --- case ---
wall = 2;  floor_t = 2;  lid_t = 3;
standoff_h = 4;           // keeps the solder points under the Uno off the floor
post_d = 6;               // Uno screw posts: M3 self-tapping screws go through the Uno's 3.2 mm holes
lip_h = 2;  lip_w = 1.6;  // lid lip that centres the lid in the base
margin = 5.5;             // space each side so the corner screw bosses clear the shield
boss_r = 3;  screw_d = 2.6; screw_through = 3.4;
gap = 0.3;                // lid-to-base fit

cav_l = max(uno_l, shield_l) + 2 * margin + ext;
cav_w = max(uno_w, shield_w) + 2 * margin;
out_l = cav_l + 2 * wall;  out_w = cav_w + 2 * wall;
bx = (cav_l - ext - uno_l) / 2;  by = (cav_w - uno_w) / 2;   // Uno origin inside the cavity
board_top = floor_t + standoff_h + 1.6;
glass_top = board_top + stack_above;
base_h = glass_top + 0.5;                              // wall height; the lid sits on top
boss_h = base_h - lip_h - 0.1;                         // corner bosses leave room for the lid lip
$fn = 40;

module rrect(l, w, h, r = 3) {
  hull() for (x = [r, l - r], y = [r, w - r]) translate([x, y, 0]) cylinder(r = r, h = h);
}
module boss_positions() {
  for (x = [boss_r, cav_l - boss_r], y = [boss_r, cav_w - boss_r]) translate([wall + x, wall + y, 0]) children();
}

module base() {
  difference() {
    union() {
      difference() {
        rrect(out_l, out_w, base_h);
        translate([wall, wall, floor_t]) cube([cav_l, cav_w, base_h]);
      }
      boss_positions() cylinder(r = boss_r, h = boss_h);   // stops below the top so the lid lip fits
      for (h = uno_holes) translate([wall + bx + h[0], wall + by + h[1], floor_t])
        cylinder(d = post_d, h = standoff_h);
    }
    // pilot holes in the Uno posts for M3 self-tapping screws
    for (h = uno_holes) translate([wall + bx + h[0], wall + by + h[1], floor_t + standoff_h - 8])
      cylinder(d = screw_d, h = 9);
    boss_positions() translate([0, 0, base_h - 12]) cylinder(d = screw_d, h = 13);
    // USB-B opening in the left wall
    translate([-1, wall + by + usb_y - usb_w / 2, board_top - 0.5]) cube([wall + 2, usb_w, usb_h]);
    if (dc_cutout)
      translate([-1, wall + by + dc_y - dc_w / 2, board_top - 0.5]) cube([wall + 2, dc_w, dc_h]);
  }
}

module lid() {
  difference() {
    union() {
      rrect(out_l, out_w, lid_t);
      // lip that centres the lid in the base: a ring, so it clears the touch glass,
      // with a pad at each corner that sits on top of a boss
      translate([0, 0, -lip_h]) difference() {
        translate([wall + gap, wall + gap, 0]) cube([cav_l - 2 * gap, cav_w - 2 * gap, lip_h]);
        translate([wall + gap + lip_w, wall + gap + lip_w, -1])
          cube([cav_l - 2 * gap - 2 * lip_w, cav_w - 2 * gap - 2 * lip_w, lip_h + 2]);
      }
      boss_positions() translate([0, 0, -lip_h]) cylinder(r = boss_r - gap, h = lip_h);
    }
    // screen window
    translate([out_l / 2 + win_dx - win_l / 2, out_w / 2 + win_dy - win_w / 2, -3]) cube([win_l, win_w, lid_t + 4]);
    // screw holes with countersinks
    boss_positions() {
      translate([0, 0, -3]) cylinder(d = screw_through, h = lid_t + 4);
      translate([0, 0, lid_t - 1.7]) cylinder(d1 = screw_through, d2 = 6.4, h = 1.71);
    }
  }
}

if (part == "base") base();
else if (part == "lid") translate([0, 0, lid_t]) mirror([0, 0, 1]) translate([0, 0, 0]) lid();  // printed screen-side down
else { base(); translate([0, out_w + 10, 0]) translate([0, 0, lid_t]) mirror([0, 0, 1]) lid(); }
