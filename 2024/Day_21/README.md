Link: <https://adventofcode.com/2024/day/21> <br>
Author: Eric Wastl ([@ericwastl](https://twitter.com/ericwastl)) (2024)

---

## --- Day 21: Keypad Conundrum ---

As you teleport onto Santa's [Reindeer-class starship](/2019/day/25), The Historians begin to panic: someone from their search party is **missing**. A quick life-form scan by the ship's computer reveals that when the missing Historian teleported, he arrived in another part of the ship.

The door to that area is locked, but the computer can't open it; it can only be opened by **physically typing** the door codes (your puzzle input) on the numeric keypad on the door.

The numeric keypad has four rows of buttons: `789`, `456`, `123`, and finally an empty gap followed by `0A`. Visually, they are arranged like this:

```
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
```

Unfortunately, the area outside the door is currently **depressurized** and nobody can go near the door. A robot needs to be sent instead.

The robot has no problem navigating the ship and finding the numeric keypad, but it's not designed for button pushing: it can't be told to push a specific button directly. Instead, it has a robotic arm that can be controlled remotely via a **directional keypad**.

The directional keypad has two rows of buttons: a gap / `^` (up) / `A` (activate) on the first row and `<` (left) / `v` (down) / `>` (right) on the second row. Visually, they are arranged like this:

```
    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+
```

When the robot arrives at the numeric keypad, its robotic arm is pointed at the `A` button in the bottom right corner. After that, this directional keypad remote control must be used to maneuver the robotic arm: the up / down / left / right buttons cause it to move its arm one button in that direction, and the `A` button causes the robot to briefly move forward, pressing the button being aimed at by the robotic arm.

For example, to make the robot type `029A` on the numeric keypad, one sequence of inputs on the directional keypad you could use is:

- `<` to move the arm from `A` (its initial position) to `0`.
- `A` to push the `0` button.
- `^A` to move the arm to the `2` button and push it.
- `>^^A` to move the arm to the `9` button and push it.
- `vvvA` to move the arm to the `A` button and push it.

In total, there are three shortest possible sequences of button presses on this directional keypad that would cause the robot to type `029A`: `<A^A>^^AvvvA`, `<A^A^>^AvvvA`, and `<A^A^^>AvvvA`.

Unfortunately, the area containing this directional keypad remote control is currently experiencing **high levels of radiation** and nobody can go near it. A robot needs to be sent instead.

When the robot arrives at the directional keypad, its robot arm is pointed at the `A` button in the upper right corner. After that, a **second, different** directional keypad remote control is used to control this robot (in the same way as the first robot, except that this one is typing on a directional keypad instead of a numeric keypad).

There are multiple shortest possible sequences of directional keypad button presses that would cause this robot to tell the first robot to type `029A` on the door. One such sequence is `v<<A>>^A<A>AvA<^AA>A<vAAA>^A`.

Unfortunately, the area containing this second directional keypad remote control is currently **`-40` degrees**! Another robot will need to be sent to type on that directional keypad, too.

There are many shortest possible sequences of directional keypad button presses that would cause this robot to tell the second robot to tell the first robot to eventually type `029A` on the door. One such sequence is `<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A`.

Unfortunately, the area containing this third directional keypad remote control is currently **full of Historians**, so no robots can find a clear path there. Instead, **you** will have to type this sequence yourself.

Were you to choose this sequence of button presses, here are all of the buttons that would be pressed on your directional keypad, the two robots' directional keypads, and the numeric keypad:

```
<va<aa>>^AvAA<^A>A<v<a>>^AvA^A<va>^A<v<a>^A>AAvA^A<v<a>A>^AAAvA<^A>A
v<<a>>^A</a><a>AvA<^AA>A<vaaa>^A
<a^a>^^AvvvA
029A
</a^a></vaaa></a></v<a></v<a></va></v<a></va<aa>
```

In summary, there are the following keypads:

- One directional keypad that **you** are using.
- Two directional keypads that **robots** are using.
- One numeric keypad (on a door) that a **robot** is using.

It is important to remember that these robots are not designed for button pushing. In particular, if a robot arm is ever aimed at a **gap** where no button is present on the keypad, even for an instant, the robot will **panic** unrecoverably. So, don't do that. All robots will initially aim at the keypad's `A` key, wherever it is.

To unlock the door, **five** codes will need to be typed on its numeric keypad. For example:

```
029A
980A
179A
456A
379A
```

For each of these, here is a shortest sequence of button presses you could type to cause the desired code to be typed on the numeric keypad:

```
029A: <va<aa>>^AvAA<^A>A<v<a>>^AvA^A<va>^A<v<a>^A>AAvA^A<v<a>A>^AAAvA<^A>A
980A: <v<a>>^AAAvA^A<va<aa>>^AvAA<^A>A<v<a>A>^AAAvA<^A>A<va>^A<a>A
179A: <v<a>>^A<va<a>>^AAvAA<^A>A<v<a>>^AAvA^A<va>^AA</va></v<a></va<a></v<a></a><a>A<v<a>A>^AAAvA<^A>A
456A: <v<a>>^AA<va<a>>^AAvAA<^A>A<va>^A</va></va<a></v<a></v<a></a><a>A<va>^A</va></a><a>A<v<a>A>^AAvA<^A>A
379A: <v<a>>^AvA^A<va<aa>>^AAvA<^A>AAvA^A<va>^AA</va></va<aa></v<a></v<a></a><a>A<v<a>A>^AAAvA<^A>A
</v<a></a></va></v<a></va<aa></v<a></v<a></v<a></va></v<a></va<aa>
```

The Historians are getting nervous; the ship computer doesn't remember whether the missing Historian is trapped in the area containing a **giant electromagnet** or **molten lava**. You'll need to make sure that for each of the five codes, you find the **shortest sequence** of button presses necessary.

The **complexity** of a single code (like `029A`) is equal to the result of multiplying these two values:

- The **length of the shortest sequence** of button presses you need to type on your directional keypad in order to cause the code to be typed on the numeric keypad; for `029A`, this would be `68`.
- The **numeric part of the code** (ignoring leading zeroes); for `029A`, this would be `29`.

In the above example, complexity of the five codes can be found by calculating `68 * 29`, `60 * 980`, `68 * 179`, `64 * 456`, and `64 * 379`. Adding these together produces **`126384`**.

Find the fewest number of button presses you'll need to perform in order to cause the robot in front of the door to type each code. **What is the sum of the complexities of the five codes on your list?**
