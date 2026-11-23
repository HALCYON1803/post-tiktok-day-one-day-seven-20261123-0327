# Day one, day seven

![make.fun](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327.svg)
![rank](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/HALCYON1803/post-tiktok-day-one-day-seven-20261123-0327/rank.svg)
![reward](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/HALCYON1803/post-tiktok-day-one-day-seven-20261123-0327/reward.svg)

A short TikTok video about the same tiny agent-built game on the day it
was made and after a week of daily updates.

## The game: Star Collector

One map, one start, camera standing still. Day 1: an empty field, one
hero, one star, no enemies, no score HUD. Day 7: the same map and the
same start — eight stars, three moving enemies, drifting particles, a
score HUD, a power-up orb and a parallax background. The video cuts
between identical moments a week apart so the change is the whole story,
and closes on the newer build being played, inviting viewers to start
theirs at [make.fun](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327).

The video ends with make.fun's referral end card from the press pack,
carrying referral code `dmrvxv79`.

## The entry program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this
repository into the output directory, validates that its `url` is a real
TikTok video address (`https://www.tiktok.com/@<handle>/video/<id>`), and
writes a deterministic `video.manifest.json`. No network, no wall clock,
no files outside the repository — two runs write identical bytes.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## The video

`VIDEO.json` at the repository root names the video's full address on
TikTok. The rendered video file handed to the poster is `video.mp4`
(1080x1920, H.264 + AAC, 22 seconds), kept outside this repository.

Bounty: [Day one, day seven on make.fun](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
