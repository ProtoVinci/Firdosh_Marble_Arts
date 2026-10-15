const fs = require("fs");
const path = require("path");

const root = process.cwd();
const workDir = path.join(root, "public", "work");
const srcDirs = [
  path.join(root, "src"),
];

function collect(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) collect(p, out);
    else if (/\.(ts|tsx|jsx|js)$/.test(e.name)) out.push(p);
  }
  return out;
}

const source = srcDirs.flatMap((d) => collect(d));
const blob = source.map((f) => fs.readFileSync(f, "utf8")).join("\n");

const files = fs.readdirSync(workDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const unused = [];
const used = [];

for (const f of files) {
  // content.ts stores these without the /work/ prefix
  const slug = f.replace(/\.[^.]+$/, "");
  const referenced =
    blob.includes(`/${slug}.jpg`) ||
    blob.includes(`/${slug}.jpeg`) ||
    blob.includes(`/${slug}.png`);
  (referenced ? used : unused).push(f);
}

console.log(`${files.length} files in public/work`);
console.log(`  used:   ${used.length}`);
console.log(`  unused: ${unused.length}\n`);
for (const f of unused) console.log(`    ${f}`);

const apply = process.argv.includes("--apply");
if (apply && unused.length) {
  for (const f of unused) fs.unlinkSync(path.join(workDir, f));
  console.log(`\nremoved ${unused.length} unused images`);
} else if (apply) {
  console.log("\nnothing to remove");
}