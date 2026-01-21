#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, opts = {}) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const tmp = path.join(root, '.gh-pages');

if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found. Run `npm run build` first.');
  process.exit(1);
}

try {
  run('git fetch origin');

  if (fs.existsSync(tmp)) {
    console.log('.gh-pages worktree exists; removing...');
    run(`git worktree remove "${tmp}" --force`);
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  try {
    run(`git worktree add -B gh-pages "${tmp}" origin/gh-pages`);
  } catch (e) {
    console.log('Remote gh-pages branch not found; creating local gh-pages worktree from HEAD');
    run(`git worktree add -B gh-pages "${tmp}"`);
  }

  // Remove existing files in worktree (preserve .git)
  for (const name of fs.readdirSync(tmp)) {
    if (name === '.git') continue;
    fs.rmSync(path.join(tmp, name), { recursive: true, force: true });
  }

  // Copy build content into worktree
  function copyRecursive(src, dest) {
    for (const name of fs.readdirSync(src)) {
      const s = path.join(src, name);
      const d = path.join(dest, name);
      const stat = fs.statSync(s);
      if (stat.isDirectory()) {
        fs.mkdirSync(d, { recursive: true });
        copyRecursive(s, d);
      } else {
        fs.copyFileSync(s, d);
      }
    }
  }

  copyRecursive(buildDir, tmp);

  run(`git -C "${tmp}" add --all`);
  try {
    run(`git -C "${tmp}" commit -m "Deploy to gh-pages: ${new Date().toISOString()}"`);
  } catch (e) {
    console.log('No changes to commit');
  }

  run(`git -C "${tmp}" push origin gh-pages --force`);

  run(`git worktree remove "${tmp}" --force`);
  fs.rmSync(tmp, { recursive: true, force: true });

  console.log('Deployment complete.');
} catch (err) {
  console.error('Deployment failed:', err);
  process.exit(1);
}
