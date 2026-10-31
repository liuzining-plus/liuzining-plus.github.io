// One-time recovery from the published site. Never overwrites existing sources.
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const Turndown = require('turndown');
const root = path.resolve(__dirname, '..');
const original = path.join(root, '.recovery', 'original-site');
const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
// Hexo interprets front matter dates as site-local time before applying timezone.
const localDate = iso => new Date(Date.parse(iso) + 8 * 3600000).toISOString().replace('T', ' ').replace('Z', '');
td.addRule('strikethrough', { filter: ['del', 's'], replacement: content => `~~${content}~~` });
td.addRule('tables', { filter: 'table', replacement: (_, node) => `\n\n${node.outerHTML}\n\n` });
function write(relative, content) {
  const file = path.join(root, 'source', relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, { encoding: 'utf8', flag: 'wx' });
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
let posts = 0;
for (const file of walk(path.join(original, '2026')).filter(p => p.endsWith('index.html'))) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
  const body = $('[itemprop="articleBody"]');
  body.find('a.headerlink').remove();
  const title = $('h1.posttitle').text().trim();
  const date = $('meta[property="article:published_time"]').attr('content');
  const updated = $('meta[property="article:modified_time"]').attr('content');
  const permalink = path.relative(original, file).split(path.sep).slice(0, -1).join('/') + '/';
  body.find('figure.highlight').each((_, el) => {
    const figure = $(el);
    const language = (figure.attr('class') || '').split(/\s+/).find(c => c !== 'highlight') || '';
    const lines = figure.find('td.code pre > span.line').toArray().map(line => $(line).text());
    const pre = $('<pre></pre>');
    const code = $('<code></code>').addClass(`language-${language}`).text(lines.join('\n'));
    pre.append(code);
    figure.replaceWith(pre);
  });
  const frontmatter = [
    '---', `title: ${JSON.stringify(title)}`, `date: ${localDate(date)}`, `updated: ${localDate(updated)}`,
    `permalink: ${permalink}`, 'tags: []', 'categories: []', '---', ''
  ].join('\n');
  write(`_posts/${path.basename(path.dirname(file))}.md`, frontmatter + td.turndown(body.html()) + '\n');
  posts++;
}
for (const name of ['about', 'friends']) {
  const $ = cheerio.load(fs.readFileSync(path.join(original, name, 'index.html'), 'utf8'));
  const body = $('[itemprop="articleBody"]').html().trim();
  // Preserve the hand-written friends layout and style as raw HTML in Markdown.
  const content = name === 'friends' ? body : td.turndown(body);
  write(`${name}/index.md`, `---\ntitle: ${JSON.stringify($('title').text())}\nlayout: page\n---\n\n${content}\n`);
}
console.log(`Recovered ${posts} posts, about and friends from published HTML.`);
