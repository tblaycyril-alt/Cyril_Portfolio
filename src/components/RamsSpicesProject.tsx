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
  <section><h3>One identity, distinguishable products</h3><p>The recurring brand mark creates a connection between products, while names, ingredient imagery and variant colours distinguish the individual spices. The design needs to communicate both the identity of the range and the specific product being selected.</p><p>Adapting the hierarchy from pouches and sachets to a cylindrical tin introduces constraints in available space, viewing angle and reading order. Branded apparel extends recognition beyond the packaging format.</p><h3>Critical reflection and proposed evaluation</h3><p>The mockups show the proposed range and applications. Original packaging sketches, alternative compositions and typography studies would provide stronger evidence of conceptual development. A future evaluation could ask representative shoppers to identify and distinguish the products, locate key information and assess readability at realistic package sizes. No audience testing or commercial outcome is claimed.</p></section>
  <section><h3>The finished work</h3><p>Packaging and brand application mockups covering ginger, garlic and kebab spice products. Select any image to view it at full size.</p>{views.map(([title,caption],i)=><figure key={title}><a href={`/assets/rams-spices/view-${i+2}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${title}`}><img loading="lazy" src={`/assets/rams-spices/view-${i+2}.webp`} alt={`${title} for Ram’s Spices`}/></a><figcaption><strong>{title}</strong> — {caption}</figcaption></figure>)}</section>
 </div>;
}
