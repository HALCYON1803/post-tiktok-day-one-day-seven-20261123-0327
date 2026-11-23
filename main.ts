// Day one, day seven — entry program.
//
// Copies VIDEO.json from this repository into the output directory and
// checks that it names a real TikTok video address. The video itself is
// read by the house from TikTok; nothing this program writes about the
// video is scored. Node 22, standard library only: no network, no clock,
// no files outside the repository. Two runs write identical bytes.
import fs from "node:fs";
import path from "node:path";

const COMPETITION = "post-tiktok-day-one-day-seven-20261123-0327";
const VIDEO_FILE = "VIDEO.json";

// A TikTok video address, as TikTok shows it in a browser:
// https://www.tiktok.com/@<handle>/video/<id> with digits-only id.
// A query string or fragment after it is read past, never kept.
const VIDEO_URL =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@([A-Za-z0-9._-]+)\/video\/(\d+)([?#].*)?$/;

function fail(message) {
  process.stderr.write(`error: ${message}\n`);
  process.exit(1);
}

function main() {
  const botDir = process.env.MAKEFUN_BOT_DIR || ".";
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

  const sourcePath = path.join(botDir, VIDEO_FILE);
  let raw;
  try {
    raw = fs.readFileSync(sourcePath);
  } catch {
    fail(`cannot read ${VIDEO_FILE} in ${botDir}`);
  }

  let video;
  try {
    video = JSON.parse(raw.toString("utf8"));
  } catch {
    fail(`${VIDEO_FILE} is not valid JSON`);
  }
  // The sealed scorer refuses a VIDEO.json over 16384 bytes.
  if (raw.length > 16384) {
    fail(`${VIDEO_FILE} is ${raw.length} bytes (limit 16384)`);
  }
  if (!video || typeof video !== "object" || Array.isArray(video)) {
    fail(`${VIDEO_FILE} must be a JSON object`);
  }
  if (typeof video.url !== "string") {
    fail(`${VIDEO_FILE} must carry a string "url"`);
  }

  const match = VIDEO_URL.exec(video.url);
  if (!match) {
    fail(
      `"url" is not a TikTok video address ` +
        `(expected https://www.tiktok.com/@<handle>/video/<id>)`,
    );
  }
  const handle = match[2];
  const videoId = match[3];
  // The video must come from this entrant's own public account.
  if (handle.toLowerCase() !== "halcyon1803") {
    fail(`"url" names @${handle}, not this entrant's @halcyon1803 account`);
  }
  const canonical = `https://www.tiktok.com/@${handle}/video/${videoId}`;

  fs.mkdirSync(outDir, { recursive: true });

  // The entry file itself, copied byte for byte.
  fs.writeFileSync(path.join(outDir, VIDEO_FILE), raw);

  // A deterministic manifest: fixed key order, fixed values, no clock,
  // no random data, so a second run writes the very same bytes.
  const manifest = {
    competition: COMPETITION,
    video_url: canonical,
    handle: `@${handle}`,
    video_id: videoId,
    validated: true,
  };
  const manifestText = JSON.stringify(manifest, null, 2) + "\n";
  fs.writeFileSync(path.join(outDir, "video.manifest.json"), manifestText);

  process.stdout.write(
    `ok: ${canonical} -> ${outDir}/${VIDEO_FILE}\n`,
  );
}

main();
