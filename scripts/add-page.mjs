import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const value = (name, fallback = '') => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};

const required = ['slug', 'title', 'url'];
const missing = required.filter((name) => !value(name));

if (missing.length) {
  console.error(`缺少参数：${missing.map((name) => `--${name}`).join('、')}`);
  console.error('示例：pnpm add:page -- --slug focus-clock --title 专注时钟 --english "Focus Clock" --url https://example.com');
  process.exit(1);
}

const registryPath = resolve('projects.json');
const entries = JSON.parse(await readFile(registryPath, 'utf8'));
const slug = value('slug');

if (entries.some((entry) => entry.slug === slug)) {
  console.error(`页面 ${slug} 已存在，请直接修改 projects.json。`);
  process.exit(1);
}

entries.unshift({
  slug,
  title: value('title'),
  englishTitle: value('english', value('title')),
  description: value('description'),
  url: value('url'),
  accent: value('accent', '#d73322'),
  date: value('date', new Date().toISOString().slice(0, 10)),
  tags: value('tags', 'EXPERIMENT').split(',').map((tag) => tag.trim().toUpperCase()).filter(Boolean),
});

await writeFile(registryPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`已将 ${value('title')} 加到主页面。`);
