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
  {categories.map(category=><section key={category.title} className="ghmedia-category"><h3>{category.title}</h3><p>{category.description}</p><div className="project-artwork-grid">{category.items.map(([index,caption])=><Artwork key={index} index={index} caption={caption}/>)}</div></section>)}
  <p className="concept-note">Milestone figures within the campaign artwork are the subject of those posts, not measured outcomes attributable to the design. Select an artwork image to view it at full size.</p>
 </div>;
}
