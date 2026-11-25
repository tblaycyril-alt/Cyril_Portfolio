import { mkdir, readFile, writeFile } from 'node:fs/promises';
const base = 'https://tocy-studios-graphic-portfolio.tblay-cyrilgpt.chatgpt.site/assets/';
const files = ["audexa-logo.png","audexa-icon.png","audexa-speaker.webp","audexa-cylinder-lime.png","audexa-bottles.png","roots-main.jpg","roots-lineup.jpg","roots-media.jpg","lantern-final.jpg","lantern-line.jpg","lantern-colour.jpg","fashion-front.jpg","fashion-back.jpg","fashion-colour.jpg","fashion-colour-back.jpg","gh-logo.jpg","gh-letterhead.jpg","gh-services.jpg","gh-brochure.jpg","gh-audition.jpg","gh-boxing.jpg","gloway-cover.jpg","glocard-front.jpg","glocard-back.jpg","gloway-fda.jpg","gloway-import.jpg","rams-range.jpg"];
const folder = new URL('../public/assets/imported-visual/', import.meta.url);
const manifest = new URL('../src/data/cachedArtwork.ts', import.meta.url);
await mkdir(folder, { recursive: true });
const valid = (b) => b.length>128 && ((b[0]===255 && b[1]===216)||(b[0]===137 && b.subarray(1,4).toString()==='PNG')||(b.subarray(0,4).toString()==='RIFF' && b.subarray(8,12).toString()==='WEBP'));
const local = [];
for(let i=0;i<files.length;i+=6) await Promise.all(files.slice(i,i+6).map(async file=>{
 const dest=new URL(file,folder);
 try { if(valid(await readFile(dest))) {local.push(file);return;} } catch {}
 try {
  const res=await fetch(base+file,{signal:AbortSignal.timeout(12000)});
  if(!res.ok)throw new Error('HTTP '+res.status);
  const bytes=Buffer.from(await res.arrayBuffer());
  if(!valid(bytes))throw new Error('Not an image');
  await writeFile(dest,bytes); local.push(file);
 } catch(e){ console.warn('Using original artwork URL for '+file+': '+e.message); }
}));
await writeFile(manifest,'export const cachedArtwork: string[] = '+JSON.stringify(local.sort())+';\n');
console.log('Copied '+local.length+'/'+files.length+' original artwork assets into deployment.');
