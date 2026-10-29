const views = [
 ['Kebab spice packaging', 'The kebab spice variant uses its own colour emphasis within the same brand system.'],
 ['Raw ginger tin', 'The identity is adapted to a cylindrical format while retaining the product information hierarchy.'],
 ['Single serving packaging', 'The visual identity carried into a smaller packaging format.'],
 ['Product sachets', 'Additional sachet applications across the spice range.'],
 ['Branded apparel', 'The identity extended beyond packaging.'],
];
export default function RamsSpicesProject() {
 return <div className="rams-project">
  <p className="detail-facts">My contribution: Packaging design, visualization and brand applications</p>
  <p>Ginger and garlic packaging pairs the brand mark with clear product naming and ingredient imagery.</p>
  <section><h3>The design focus</h3><p>Ram’s Spices is presented across several product types and packaging formats. The design focus is to keep the range connected while making individual products distinguishable.</p><h3>The visual approach</h3><p>A recurring brand mark, product names and food cues connect the range. The same identity is adapted across pouches, sachets and a tin, with branded apparel extending the presentation beyond packaging.</p></section>
  <section><h3>The finished work</h3><p>Packaging and brand application mockups covering ginger, garlic and kebab spice products. Select any image to view it at full size.</p>{views.map(([title,caption],i)=><figure key={title}><a href={`/assets/rams-spices/view-${i+2}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${title}`}><img loading="lazy" src={`/assets/rams-spices/view-${i+2}.webp`} alt={`${title} for Ram’s Spices`}/></a><figcaption><strong>{title}</strong> — {caption}</figcaption></figure>)}</section>
 </div>;
}
