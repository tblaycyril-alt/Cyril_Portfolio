const categories = [
 {title:'Brand & Business Materials',description:'Brochure layouts, stationery and a digital brand presentation that carry the core red-and-white identity.',items:[[2,'Services brochure'],[4,'Branded stationery'],[8,'Digital brand presentation']]},
 {title:'Signage & Promotional Displays',description:'The identity adapted for physical spaces, welcome flags and freestanding promotional displays.',items:[[5,'Window graphics'],[6,'Welcome flag'],[7,'Promotional flags'],[9,'Services display'],[10,'Audience milestone display'],[11,'Seasonal promotion display']]},
 {title:'Social Media & Campaign Posts',description:'Seasonal greetings, audience celebrations and photography promotions designed for digital channels.',items:[[14,'Christmas greeting'],[15,'New Year greeting'],[16,'50 million views celebration'],[17,'300K followers celebration'],[20,'Photography session promotion']]},
] as const;
function Artwork({index,caption}:{index:number;caption:string}) {
 return <figure><a href={`/assets/gh-media-hub/view-${index}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${caption}`}><img loading="lazy" src={`/assets/gh-media-hub/view-${index}.webp`} alt={`${caption} for GH Media Hub`}/></a><figcaption>{caption}</figcaption></figure>;
}
export default function GhMediaHubProject() {
 return <div className="ghmedia-project">
  <p className="detail-facts">My contribution: Brand applications, layout and campaign design</p>
  <p>Exterior signage introduces the core red and white identity.</p>
  <section><h3>The design focus</h3><p>GH Media Hub’s work spans business materials, physical brand applications and digital campaigns. The design challenge is to give each message a clear hierarchy while keeping the company recognizable.</p><h3>The visual approach</h3><p>Red, white and the GH Media Hub mark connect the work. Brochures organize service information, signage makes the identity visible in physical spaces, and social posts give campaign messages a clear focal point.</p></section>
  <section><h3>Adapting a visual system to different contexts</h3><p>The recurring red and white identity connects business documents, physical signage and digital campaigns. Each medium has a different communication priority: brochures need an organized reading sequence, signage needs recognition at a distance, and social posts need a clear focal message.</p><p>The design challenge is to maintain continuity without imposing the same composition on every format. Consistent identity elements support recognition while layout, scale and information density adapt to each application.</p><h3>Critical reflection</h3><p>Original grids, typography specifications and alternative layouts would further demonstrate the design process. The next evaluation would compare legibility, hierarchy and brand recognition across print, signage and mobile viewing. Campaign milestone numbers are not evidence of design performance.</p></section>
  {categories.map(category=><section key={category.title} className="ghmedia-category"><h3>{category.title}</h3><p>{category.description}</p><div className="project-artwork-grid">{category.items.map(([index,caption])=><Artwork key={index} index={index} caption={caption}/>)}</div></section>)}
  <p className="concept-note">Milestone figures within the campaign artwork are the subject of those posts, not measured outcomes attributable to the design. Select an artwork image to view it at full size.</p>
 </div>;
}
