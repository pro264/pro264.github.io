const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const md = fs.readFileSync(path.join(root, 'itinerary.md'), 'utf8');

function esc(s) {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

const lines = md.split(/\r?\n/);
let html = '';
let table = [];

function flushTable() {
  if (!table.length) return;
  const rows = table
    .filter(r => /^\|/.test(r))
    .map(r => r.trim().slice(1, -1).split('|').map(c => inline(c.trim())));
  if (rows.length) {
    html += '<table>';
    rows.forEach((row, i) => {
      if (i === 1 && row.every(c => /^:?-+:?$/.test(c))) return;
      const tag = i === 0 ? 'th' : 'td';
      html += '<tr>' + row.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
    });
    html += '</table>';
  }
  table = [];
}

let inCode = false;
let code = [];

function flushCode() {
  if (!code.length) return;
  html += `<pre>${esc(code.join('\n'))}</pre>`;
  code = [];
}

for (const line of lines) {
  if (line.startsWith('```')) {
    if (inCode) {
      flushCode();
      inCode = false;
    } else {
      flushTable();
      inCode = true;
    }
    continue;
  }
  if (inCode) {
    code.push(line);
    continue;
  }
  if (/^\|/.test(line)) {
    table.push(line);
    continue;
  }
  flushTable();
  if (!line.trim()) continue;
  if (line.startsWith('# ')) html += `<h1>${inline(line.slice(2))}</h1>`;
  else if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`;
  else if (line.startsWith('- ')) html += `<div class="li">${inline(line.slice(2))}</div>`;
  else html += `<p>${inline(line)}</p>`;
}
flushTable();
flushCode();

const doc = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>新疆伊犁-独库公路自驾行程 PDF版</title>
<style>
@page { size: A4; margin: 16mm; }
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
  color: #1f2937;
  line-height: 1.62;
  font-size: 13px;
}
h1 { font-size: 26px; margin: 0 0 12px; color: #0f766e; line-height: 1.22; }
h2 { font-size: 18px; margin: 24px 0 8px; padding-top: 10px; border-top: 1px solid #e5e7eb; color: #111827; }
p { margin: 4px 0; }
.li { margin: 3px 0 3px 16px; }
.li:before { content: "• "; color: #0f766e; margin-left: -12px; }
table { width: 100%; border-collapse: collapse; margin: 10px 0 18px; font-size: 11px; page-break-inside: auto; }
tr { page-break-inside: avoid; }
th, td { border: 1px solid #e5e7eb; padding: 6px 7px; vertical-align: top; }
th { background: #ecfdf5; color: #064e3b; }
code { background: #f3f4f6; padding: 1px 4px; border-radius: 4px; }
pre { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; white-space: pre-wrap; }
.cover { background: linear-gradient(135deg, #ecfeff, #fff7ed); border: 1px solid #d1fae5; border-radius: 14px; padding: 18px; margin-bottom: 18px; }
.muted { color: #6b7280; }
</style>
</head>
<body>
<div class="cover">
  <h1>新疆伊犁-独库公路自驾行程</h1>
  <p class="muted">2026年6月17日-6月30日 · 洛阳出发 · 伊宁取车 · 乌鲁木齐还车 · UQ2621返程</p>
</div>
${html}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'itinerary-print.html'), doc, 'utf8');
console.log('created share/itinerary-print.html');
