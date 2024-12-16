Link: <https://adventofcode.com/2024/day/16> <br>
Author: Eric Wastl ([@ericwastl](https://twitter.com/ericwastl)) (2024)

---

## --- Day 16: Reindeer Maze ---

It's time again for the [Reindeer Olympics](/2015/day/14)! This year, the big event is the **Reindeer Maze**, where the Reindeer compete for the **lowest score**.

You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked `S`) facing **East** and need to reach the End Tile (marked `E`). They can move forward one tile at a time (increasing their score by `1` point), but never into a wall (`#`). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by `1000` points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

```
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
```

There are many paths through this maze, but taking any of the best paths would incur a score of only **`7036`**. This can be achieved by taking a total of `36` steps forward and turning 90 degrees a total of `7` times:

```
###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
```

Here's a second example:

```
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
```

In this maze, the best paths cost **`11048`** points; following one such path would look like this:

```
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
```

Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. **What is the lowest score a Reindeer could possibly get?**
