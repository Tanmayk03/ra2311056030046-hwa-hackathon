# Happy While Away — Golden Retriever: rig and animation guide

## Files

| File | Pose | viewBox | Default expression |
|---|---|---|---|
| `golden-retriever.svg` | **Main.** Sitting, looking at the visitor | 0 0 600 580 | Open smile, tongue out |
| `golden-retriever-standing-wag.svg` | Standing side-on, head facing visitor, tail up | 0 0 720 540 | Open smile |
| `golden-retriever-head-tilt.svg` | Sitting, curious head tilt | 0 0 600 580 | Small "o" mouth, one brow raised |
| `golden-retriever-lying.svg` | Lying down (sphinx pose) | 0 0 720 500 | Calm closed smile |
| `golden-retriever-playful.svg` | Play bow, rear up, tail high | 0 0 720 540 | Big excited grin |
| `preview.png` | All five poses on the brand colours | — | — |

All five files use the same head, palette, outline weight and proportions, generated from one source. Every file has the same group IDs, so the same animation code works in every pose.

Each file has a transparent background, no filters, no embedded rasters and no external references. They use only `path`, `ellipse`, `circle`, gradients and two clip paths (for the eyes). They pass `xmllint` and render correctly in browsers and librsvg. Groups have `inkscape:label` names, so they show up named in Inkscape's Objects panel.

## How the rig is built

* **Animatable groups never have a `transform` attribute.** Pose offsets sit on a parent `*-rig` group (`head-rig`, `ear-left-rig`, `pupil-left-rig`, `brow-left-rig`, …). A CSS `transform` on the animatable group therefore never overwrites the pose.
* Every animatable group has:
  * `id` and a matching `class="hwa-<id>"`. Use the **class** for styling if more than one of these SVGs is inlined on the same page, because IDs would repeat.
  * `data-anim`, the intended motion.
  * `data-origin="x y"`, the pivot point in that group's **local** user units.
  * an inline `style="transform-box:view-box; transform-origin:Xpx Ypx"` that already sets the pivot, so a plain `transform: rotate()` turns around the right point.
* The head is drawn in its own local coordinates: skull centre is `0,0` and the neck pivot is `0,80`. `head-rig` places it in each pose. That's why every face part has the same origin in every file.
* Left and right are from the **viewer's** point of view: `ear-left` is on the left of the screen.
* Gradient and clip-path IDs start with `hwa-`, so they're unlikely to clash with other IDs on the site.

## Layer order (back to front)

`shadow` → `tail` → `body` / legs (order depends on the pose) → `head-rig`
Inside `head`: `skull` → `ear-*` → `blush` → `eye-*` (contains `pupil-*`) → `brow-*` → `nose` → `mouth`

## Group IDs, intended animation and transform origins

### Shared head groups (same in every file, head-local coordinates)

| ID | Intended animation | `transform-origin` | Notes |
|---|---|---|---|
| `head-rig` | Position and pose only. Don't animate. | — | Holds `translate()` and the pose rotation |
| `head` | Head tilt (rotate ±12°), nod, look-toward-cursor lean | `0px 80px` (neck) | |
| `ear-left` | Ear flop or perk (rotate −8° to +14°) | `-58px -64px` (ear root) | A positive angle lifts the ear outward |
| `ear-right` | Ear flop or perk (rotate +8° to −14°) | `58px -64px` (ear root) | A negative angle lifts the ear outward |
| `eye-left` | Blink: `scaleY(1 → 0.1 → 1)` | `-40px -8px` (eye centre) | Scales its pupil with it |
| `eye-right` | Blink | `40px -8px` | |
| `pupil-left` | Look at mouse or touch point: `translate(±5px, ±5px)` | `-40px -8px` | Clipped inside the eye, so it can't leave the eye |
| `pupil-right` | Look at mouse or touch point | `40px -8px` | Move both pupils by the same amount |
| `brow-left` / `brow-right` | Raise in surprise or curiosity: `translateY(-6px)` | `∓42px -44px` | |
| `nose` | Sniff: `scale(1 → 1.08)` | `0px 30px` | |
| `mouth` | Pant or react: `scaleY(0.9 → 1.1)` | `0px 50px` | Content differs by pose (open, excited, closed, curious) |
| `skull`, `blush` | Static | — | |

### Body groups (origins in SVG viewBox units)

| ID | Intended animation | Sitting / head tilt | Standing | Lying | Playful |
|---|---|---|---|---|---|
| `dog` | Small playful bounce (`translateY(-12px)`), entrance slide | `300px 540px` | `380px 490px` | `440px 474px` | `410px 492px` |
| `body` | Breathing: `scale(1, 1.02)` | `300px 524px` | `380px 414px` | `420px 456px` | `430px 432px` |
| `tail` | Wag (rotate) | `392px 488px` · −10° to 12° (floor sweep) | `238px 276px` · ±18° | `604px 424px` · ±6° | `574px 232px` · ±22° |
| `front-legs` | Paw lift, step, pounce | `300px 380px` | `490px 350px` | `290px 396px` | `304px 478px` |
| `front-leg-left` / `front-leg-right` | Single paw lift or "high five" (rotate) | `272px 380px` / `328px 380px` | — | — | — |
| `back-legs` | Settle, push off, hop | `300px 527px` | `256px 350px` | `482px 452px` | `546px 290px` |
| `shadow` | Optional. Scale down slightly during the bounce | — | — | — | — |

If you'd rather not use pixel origins, `transform-box: fill-box` with these percentages works as an approximation:

* `head`: `50% 95%`
* `tail`: `0% 100%` in the sitting pose, `100% 100%` in the standing pose
* `eye-*`: `50% 50%`
* `ear-left`: `90% 5%`
* `ear-right`: `10% 5%`
* `body`: `50% 100%`

## Animation notes for a natural resting pose

* **Resting state:** breathing only, plus a blink every 3 to 6 seconds at random intervals (a blink takes about 150 ms).
* **Tail:** wag in short bursts when something happens (the door opens, on hover, on tap), not all the time.
* **Head tilt:** use it as a hover or idle reaction, held for about 1 second. The head-tilt file is the final frame of that motion.
* **Ears:** give them a small delayed follow-through after a head tilt or bounce (about 80 ms behind, 4° to 6°).
* **Pupils:** follow the pointer within ±5 px. On touch devices, look at the last tap point and then return to centre.
* **Entrance from the left:** the standing pose already faces right (the head is at the front of the body). Slide `dog` in from the left with legs stepping and the tail wagging, then cross-fade or swap to `golden-retriever.svg` (sitting) when it stops near the hero.
* **Background contrast:** the warm golden fill and the `#A8611F` outline stand out against `#176DB9`, `#12243A`, `#C4E8FC`, `#EBF8FC` and white. The shadow is navy (`#12243A`) at 13% opacity, so it stays subtle on every brand colour.

## Palette

| Use | Colour |
|---|---|
| Fur | `#F8C76B` → `#EFAE4C` → `#E0993A` |
| Ears and far legs | `#E29A3A` → `#C97A26` |
| Cream (muzzle, chest) | `#FFF6E3` → `#FBE2B2` |
| Paws | `#FBDDA0` |
| Outline | `#A8611F` |
| Eye and mouth line | `#3B2216` |
| Iris | `#A2622E` → `#4A2513` |
| Tongue | `#F8A3B0` → `#E06F80` |
