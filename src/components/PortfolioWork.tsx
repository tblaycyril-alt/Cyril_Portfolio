import { useEffect, useRef, useState } from 'react';
import { MdArrowOutward, MdArrowBack } from 'react-icons/md';
import MastersCuisineProject from './MastersCuisineProject';
import GhMediaHubProject from './GhMediaHubProject';
import RamsSpicesProject from './RamsSpicesProject';
import TocyNovaCaseStudy from './TocyNovaCaseStudy';
import ChodaLinkCaseStudy from './ChodaLinkCaseStudy';
import GlowayCaseStudy from './GlowayCaseStudy';
import { projects, gallery } from '../data/portfolio';
import { importedProjects, visualStudies, ImportedVisualStudy, originalArtwork, ghArtwork } from './ImportedVisualWork';
import { smoother } from './Navbar';
import './styles/Work.css';
import './styles/Portfolio.css';

type Item = typeof projects[number] | typeof gallery[number];
type Preview = { src: string; alt: string };
const items: Item[] = [...projects, ...gallery, ...importedProjects];
const titleOf = (p: Item) => 'name' in p ? p.name : p.title;
const slugOf = (p: Item) => titleOf(p).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const hrefOf = (p: Item) => '/work/' + slugOf(p);
const categoryOf = (p: Item) => 'name' in p ? 'Product design' : visualStudies.find(study=>study.title===p.title)?.filter || (p.title === 'RAMS SPICES' ? 'Packaging' : 'Visual identity');
const coverFor = (p: Item) => titleOf(p)==='GH Media Hub' ? originalArtwork(ghArtwork[0][0]) : /^(https:\/\/|\/assets\/)/.test(p.image) ? p.image : '/assets/'+p.image+'.webp';
const coverAlt = (p: Item) => 'name' in p ? p.alt : p.title==='GH Media Hub' ? ghArtwork[0][1] : visualStudies.find(study=>study.title===p.title)?.artworks[0][1] || p.description;
const labelOf = (p: Item) => 'name' in p ? p.category : p.type;
const order = ['Gloway', 'TocyNova', 'ChodaLink', 'RAMS SPICES', 'GH Media Hub', 'Masters Cuisine', 'AUDEXA', 'ROOTS & RHYTHM GH', 'A Little Light', 'Form & Fibre'];
const sorted = [...items].sort((a,b) => (order.indexOf(titleOf(a)) < 0 ? 99 : order.indexOf(titleOf(a))) - (order.indexOf(titleOf(b)) < 0 ? 99 : order.indexOf(titleOf(b))));
const more: Record<string, Preview[]> = {
 Gloway: [
  {src:'/assets/gloway/gloway-merchant/stock.webp',alt:'Gloway stock and catalogue interface'},
  {src:'/assets/gloway/abunde/catalogue.webp',alt:'Abunde Group wholesale catalogue'},
  {src:'/assets/gloway/gloway-merchant/setup.webp',alt:'Gloway merchant setup checklist'}
 ],
 TocyNova: [
  {src:'/assets/tocynova/tocynova-desktop.svg',alt:'TocyNova desktop dashboard concept'},
  {src:'/assets/tocynova/system-top-4k.webp',alt:'TocyNova identity and app icon'}
 ],
 ChodaLink: [
  {src:'/assets/chodalink/page-11-4k.webp',alt:'ChodaLink grocery browsing screens'},
  {src:'/assets/chodalink/page-10-4k.webp',alt:'ChodaLink checkout interface'}
 ],
 'RAMS SPICES': [
  {src:'/assets/rams-spices/view-2.webp',alt:'Kebab spice packaging'},
  {src:'/assets/rams-spices/view-3.webp',alt:'Raw ginger tin packaging'},
  {src:originalArtwork('rams-range.jpg'),alt:'Ginger with Garlic and Kebab Spice with Dawadawa'}
 ],
 'GH Media Hub': [
  ...ghArtwork.slice(1).map(([file,alt])=>({src:originalArtwork(file),alt}))
 ],
 'Masters Cuisine': [
  {src:'/assets/masters-cuisine/view-2.webp',alt:'Catering promotion'},
  {src:'/assets/masters-cuisine/view-3.webp',alt:'Food and beverage promotion'}
 ]
};
function ProjectContent({item}: {item: Item}) {
 const isProject = 'name' in item;
 const study = visualStudies.find(study=>study.title===titleOf(item));
 return <article><p className="detail-kicker">{isProject?item.category:item.type}</p><h2 id="project-heading">{isProject?item.name:item.title}</h2><p className="detail-lead">{isProject?item.title:item.description}</p>{isProject&&<div className="detail-facts"><span>{item.status}</span><span>{item.role}</span><span>{item.platform}</span></div>}{!(isProject && item.name==='Gloway')&&<img src={isProject && item.name==='TocyNova' ? '/assets/tocynova/tocynova-showcase.svg' : isProject && item.name==='ChodaLink' ? '/assets/chodalink/page-9-4k.webp' : coverFor(item)} alt={coverAlt(item)}/>} {isProject?(item.name==='Gloway'?<GlowayCaseStudy/>:item.name==='TocyNova'?<TocyNovaCaseStudy/>:item.name==='ChodaLink'?<ChodaLinkCaseStudy/>:<><section><h3>The starting point</h3><p>{item.intro}</p><p>{item.problem}</p></section><section><h3>{item.decision}</h3><p>{item.rationale}</p><ol>{item.flow.map(step=><li key={step}>{step}</li>)}</ol></section>{item.images.map(([image,caption])=><figure key={image}><img loading="lazy" src={`/assets/${image}.webp`} alt={caption}/><figcaption>{caption}</figcaption></figure>)}<section><h3>Reflection & next steps</h3><p>{item.reflection}</p><p>{item.next}</p><p className="concept-note">{item.note}</p></section></>):item.title==='Masters Cuisine'?<MastersCuisineProject/>:item.title==='GH Media Hub'?<GhMediaHubProject/>:item.title==='RAMS SPICES'?<RamsSpicesProject/>:study?<ImportedVisualStudy study={study}/>:<p className="concept-note">Selected visual work. Mockups demonstrate design applications, not measured campaign outcomes.</p>}<a className="project-action" href={`mailto:tblay.cyril@gmail.com?subject=${encodeURIComponent('Let’s talk about '+(isProject?item.name:item.title))}`}>Discuss this project <MdArrowOutward/></a></article>;
}

function ProjectCard({item,index,paused}: {item:Item;index:number;paused:boolean}) {
 const [frame,setFrame] = useState(0);
 const [visible,setVisible] = useState(false);
 const [interacting,setInteracting] = useState(false);
 const ref=useRef<HTMLElement>(null);
 const importedPreviews=visualStudies.find(study=>study.title===titleOf(item))?.artworks.slice(1).map(([file,alt])=>({src:originalArtwork(file),alt}));
 const previews: Preview[] = [{src:coverFor(item),alt:coverAlt(item)},...(importedPreviews || more[titleOf(item)] || [])];
 const next=previews[(frame+1)%previews.length]?.src;
 useEffect(()=>{
  const node=ref.current;
  if(!node) return;
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.15});
  observer.observe(node); return ()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(paused || !visible || interacting || previews.length<2 || !next) return;
  let active=true;
  const timer=window.setTimeout(()=>{
    const image=new Image();
    image.onload=()=>{if(active) setFrame(f=>(f+1)%previews.length)};
    image.onerror=()=>{if(active) setFrame(0)};
    image.src=next;
  },5000+((index*1493+frame*791)%5001));
  return ()=>{active=false;window.clearTimeout(timer)};
 },[frame,paused,visible,interacting,index,next,previews.length]);
 return <article ref={ref} className="selected-project" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocus={()=>setInteracting(true)} onBlur={()=>setInteracting(false)}>
  <a href={hrefOf(item)} data-cursor="disable" aria-label={'Explore '+titleOf(item)}>
   <div className="selected-project-image">
    <img key={previews[frame].src} src={previews[frame].src} alt={previews[frame].alt} loading="lazy" decoding="async" onError={()=>setFrame(0)}/>
    <span className="selected-project-cta">{'name' in item?'Explore case study':'View project'} <MdArrowOutward aria-hidden="true"/></span>
   </div>
   <div className="selected-project-caption"><div><h3>{titleOf(item)}</h3><p>{labelOf(item)}</p><small>{'name' in item?item.status:'Selected visual work'}</small></div><span className="selected-project-index">{String(index+1).padStart(2,'0')} <MdArrowOutward aria-hidden="true"/></span></div>
  </a>
 </article>;
}
export default function PortfolioWork(){
 const [filter,setFilter]=useState('All');
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>setReduced(media.matches);
  media.addEventListener('change',change);
  return ()=>media.removeEventListener('change',change);
 },[]);
 useEffect(()=>{
  if(window.location.hash!=='#work') return;
  const timers=[350,1200,2500].map(delay=>window.setTimeout(()=>{
   if(window.location.hash==='#work'){
    if(smoother) smoother.scrollTo('#work',false,'top top');
    else document.getElementById('work')?.scrollIntoView({behavior:'instant'});
   }
  },delay));
  return ()=>timers.forEach(timer=>window.clearTimeout(timer));
 },[]);
 const visible=sorted.filter(p=>filter==='All'||categoryOf(p)===filter);
 return <section className="work-section selected-work" id="work"><div className="work-container section-container">
  <div className="selected-work-heading"><h2>Selected <span>work</span><sup>({String(sorted.length).padStart(2,'0')})</sup></h2><p>Product design, visual identities, campaigns and illustration.</p></div>
  <div className="selected-work-controls"><div className="selected-filters" role="group" aria-label="Filter projects">{['All','Product design','Visual identity','Packaging','Campaigns','Illustration'].map(f=><button key={f} type="button" data-cursor="disable" aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div>{!reduced&&<button type="button" className="selected-preview-control" data-cursor="disable" onClick={()=>setPaused(p=>!p)}>{paused?'Play previews':'Pause previews'}</button>}</div>
  <p className="selected-work-status" role="status">{filter==='All'?'Showing all ':'Showing '}{visible.length} {visible.length===1?'project':'projects'}</p>
  <div className="selected-project-grid">{visible.map(item=><ProjectCard key={titleOf(item)} item={item} index={sorted.indexOf(item)} paused={paused||reduced}/>)}</div>
 </div></section>;
}

export function PortfolioProjectPage(){
 const slug=window.location.pathname.replace(/^\/work\//,'').replace(/\/$/,'');
 const item=sorted.find(p=>slugOf(p)===slug);
 useEffect(()=>{
  document.title=item?titleOf(item)+' | Tocy Studios':'Project not found | Tocy Studios';
 },[item]);
 const next=item?sorted[(sorted.indexOf(item)+1)%sorted.length]:null;
 return <main className="portfolio-detail standalone-project">
  <header className="standalone-header"><a href="/#work"><MdArrowBack aria-hidden="true"/> All projects</a><a href="/" aria-label="Tocy Studios home"><img src="/assets/tocy-logo.svg" alt="Tocy Studios"/></a></header>
  {item?<><ProjectContent item={item}/>{next&&<a className="standalone-next" href={hrefOf(next)}><div><span>Next project</span><strong>{titleOf(next)}</strong></div><MdArrowOutward aria-hidden="true"/></a>}</>:<article><h2>Project not found</h2><a href="/#work">Return to selected work</a></article>}
 </main>;
}
