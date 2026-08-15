import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const files = [
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  ".nojekyll",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  ".github/workflows/ci.yml",
  ".github/workflows/deploy-pages.yml"
];

await Promise.all(files.map((file) => access(new URL(`../${file}`, import.meta.url), constants.R_OK)));

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"));
const worker = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const deployment = await readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8");

assert.match(index, /<html lang="tr"/);
assert.match(index, /id="zzr-game"/);
assert.match(index, /id="zzr-steer-zone"/);
assert.match(index, /id="zzr-jump"/);
assert.match(index, /id="zzr-countdown"/);
assert.match(index, /id="zzr-rank"/);
assert.match(index, /id="zzr-combo"/);
assert.match(index, /id="zzr-model-stats"/);
assert.match(index, /id="zzr-duel-switch"/);
assert.match(index, /id="zzr-ghost-gap"/);
assert.match(index, /id="zzr-steer-label"/);
assert.match(index, /id="zzr-jump-label"/);
assert.match(index, /data-mode="solo"/);
assert.match(index, /data-mode="coop"/);
assert.match(index, /data-mode="duel"/);
assert.match(index, /data-track="neighborhood"/);
assert.match(index, /data-track="candy"/);
assert.match(index, /data-track="space"/);
assert.match(index, /data-model="bubble"/);
assert.match(index, /data-model="cat"/);
assert.match(index, /data-model="buggy"/);
assert.match(index, /data-color="6" aria-label="Kırmızı"/);
assert.match(index, /const TRACKS =/);
assert.match(index, /const OPPONENT_SPECS =/);
assert.match(index, /const CAR_MODELS =/);
assert.match(index, /type === "ramp"/);
assert.match(index, /type === "shield"/);
assert.match(index, /type === "magnet"/);
assert.match(index, /type === "wall"/);
assert.match(index, /game\.speed = 0/);
assert.match(index, /game\.stallTimer = car\.wallStall/);
assert.match(index, /challenger: true/);
assert.match(index, /adaptivePace/);
assert.match(index, /function updateOpponents\(dt\)/);
assert.match(index, /function recordGhostSample\(dt, force\)/);
assert.match(index, /function ghostAtTime\(time\)/);
assert.match(index, /function drawGhost\(\)/);
assert.match(index, /function drawTurboEffects\(\)/);
assert.match(index, /function startDuelRoundTwo\(\)/);
assert.match(index, /function finishDuelRound\(\)/);
assert.match(index, /game\.raceTime \+= dt/);
assert.match(index, /game\.wallHits \+= 1/);
assert.match(index, /game\.boostTimer = Math\.max\(game\.boostTimer, 4\.2\)/);
assert.match(index, /const boostSpeed = game\.boostTimer > 0 \? 1\.3 : 1/);
assert.match(index, /function awardCombo\(basePoints/);
assert.match(index, /navigator\.serviceWorker\.register\("\.\/sw\.js\?v=5"/);
assert.match(index, /--zzr-viewport-height/);
assert.match(index, /function syncViewport\(\)/);
assert.match(index, /const CANVAS_PALETTE/);
assert.doesNotMatch(index, /<script[^>]+src=/, "Oyun çalışma zamanında harici betik yüklememeli");
assert.equal(manifest.display, "fullscreen");
assert.equal(manifest.orientation, "landscape");
assert.equal(manifest.start_url, "./?v=5");
assert.equal(manifest.icons.length, 2);
assert.match(worker, /CACHE_NAME = "zipzip-ralli-v5-two-player"/);
assert.match(worker, /caches\.match/);
assert.match(worker, /event\.request\.mode === "navigate"/);
assert.match(worker, /cache: "no-store"/);
assert.match(deployment, /actions\/checkout@v6/);
assert.match(deployment, /actions\/configure-pages@v5/);
assert.match(deployment, /actions\/upload-pages-artifact@v4/);
assert.match(deployment, /actions\/deploy-pages@v4/);
assert.match(deployment, /pages: write/);
assert.match(deployment, /id-token: write/);

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, indexOfId) => ids.indexOf(id) !== indexOfId);
assert.deepEqual([...new Set(duplicates)], []);

const inlineGame = index.match(/<script>\s*\(\(\) => \{([\s\S]*?)<\/script>/);
assert.ok(inlineGame, "Oyun JavaScript'i bulunamadı");
assert.doesNotMatch(inlineGame[1], /\?\.|\?\?/, "Oyun betiği eski mobil tarayıcılarda ayrıştırılabilmeli");
new Function(`(() => {${inlineGame[1]}`);

const gameStyles = index.match(/<style>\s*html,([\s\S]*?)<\/style>/);
assert.ok(gameStyles, "Mobil oyun stilleri bulunamadı");
assert.doesNotMatch(gameStyles[1], /color-mix|light-dark/, "Oyun stilleri temel mobil CSS renkleri kullanmalı");
assert.match(gameStyles[1], /bottom: 14px/);

console.log(`Doğrulama başarılı: ${files.length} PWA dosyası, ${ids.length} benzersiz id.`);
