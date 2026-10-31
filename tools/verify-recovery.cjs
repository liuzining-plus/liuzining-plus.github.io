// Compare recovered article content with the original published HTML snapshot.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const root = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function read(file) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
  const body = $('[itemprop="articleBody"]');
  const code = body.find('figure.highlight td.code pre').toArray().map(el =>
    $(el).children('span.line').toArray().map(line => $(line).text()).join('\n').trimEnd()
  );
  body.find('figure.highlight, a.headerlink').remove();
  const text = body.text().replace(/\s+/g, '');
  const images = body.find('img').toArray().map(el => $(el).attr('src'));
  const links = body.find('a').toArray().map(el => $(el).attr('href'));
  return { text, code, images, links, date: $('time').first().attr('datetime') };
}
const original = path.join(root, '.recovery/original-site');
const files = walk(path.join(original, '2026')).filter(file => file.endsWith('index.html'));
assert.equal(files.length, 8);
for (const file of files) {
  const relative = path.relative(original, file);
  assert.deepEqual(read(path.join(root, 'public', relative)), read(file), relative);
}
for (const name of ['about', 'friends']) {
  assert.deepEqual(read(path.join(root, 'public', name, 'index.html')), read(path.join(original, name, 'index.html')), name);
}
const home = cheerio.load(fs.readFileSync(path.join(root, 'public/index.html'), 'utf8'));
assert.equal(home('#writing .post-list li').length, 8);
assert.match(home('meta[property="og:url"]').attr('content'), /^https:\/\/liuzining-plus\.github\.io\//);
for (const file of walk(path.join(root, 'public')).filter(file => file.endsWith('.html'))) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
  for (const el of $('script[src], link[rel="stylesheet"][href]').toArray()) {
    const url = $(el).attr('src') || $(el).attr('href');
    if (url.startsWith('/')) assert.ok(fs.existsSync(path.join(root, 'public', url)), `${file}: missing ${url}`);
  }
}
console.log('PASS: 8 posts + About/Friends preserve text, code blocks, images, links and post dates; homepage and local assets verified.');
