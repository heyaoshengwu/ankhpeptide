const fs = require('fs');
const path = require('path');

const msgsDir = '/opt/apeptide/messages';
const nsDir = '/opt/apeptide/scripts/ns';
const backupDir = '/opt/apeptide/scripts/ns-backup';

fs.mkdirSync(backupDir, { recursive: true });

const locales = fs.readdirSync(msgsDir).filter(f => f.endsWith('.json'));
const namespaces = fs.readdirSync(nsDir).filter(f => f.startsWith('NS-') && f.endsWith('.json'));

const nsMap = {};
for (const nf of namespaces) {
  const loc = nf.replace(/^NS-/, '').replace(/\.json$/, '');
  nsMap[loc] = JSON.parse(fs.readFileSync(path.join(nsDir, nf), 'utf8')).pages;
}

let ok = true;
for (const lf of locales) {
  const loc = lf.replace(/\.json$/, '');
  if (!nsMap[loc]) {
    console.error('MISSING namespace for', loc);
    ok = false;
    continue;
  }
  const msgFile = path.join(msgsDir, lf);
  const msg = JSON.parse(fs.readFileSync(msgFile, 'utf8'));
  fs.writeFileSync(path.join(backupDir, lf), JSON.stringify(msg, null, 2));
  msg.pages = nsMap[loc];
  fs.writeFileSync(msgFile, JSON.stringify(msg, null, 2));
  console.log('merged pages ->', lf);
}

console.log(ok ? 'ALL DONE' : 'INCOMPLETE');