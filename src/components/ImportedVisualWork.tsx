const assetBase = 'https://tocy-studios-graphic-portfolio.tblay-cyrilgpt.chatgpt.site/assets/';
import { cachedArtwork } from '../data/cachedArtwork';
export const originalArtwork = (file: string) => cachedArtwork.includes(file) ? '/assets/imported-visual/'+file : assetBase + file;
type Artwork = readonly [string, string];
type VisualStudy = {
 title: string; type: string; filter: string; description: string; heading: string;
 rationale: string[]; artworks: Artwork[];
};
export const visualStudies: VisualStudy[] = [
 {
  title: 'AUDEXA', type: 'Visual identity · Brand applications', filter: 'Visual identity',
  description: 'An audio identity with a visual pulse.',
  heading: 'Sound becomes a visual signature.',
  rationale: [
   'An expressive A symbol, sound bars and a distinctive wordmark establish the visual identity. The selected mockups explore the identity on audio products, an app icon and branded merchandise.',
   'Lime accents, dark surfaces and flowing wave graphics connect the applications. The symbol works independently on speaker fabric, while the bottles use the wordmark and a repeating angular pattern. The cylindrical speaker uses the same lime symbol to maintain continuity across forms.'
  ],
  artworks: [
   ['audexa-logo.png','AUDEXA symbol, wordmark and app icon presentation'],
   ['audexa-icon.png','AUDEXA app icon on a phone home screen'],
   ['audexa-speaker.webp','Lime symbol applied to a portable speaker'],
   ['audexa-cylinder-lime.png','Lime symbol applied to a cylindrical speaker'],
   ['audexa-bottles.png','Lime and teal bottles with AUDEXA branding']
  ]
 },
 {
  title: 'ROOTS & RHYTHM GH', type: 'Event campaign · Visual communication', filter: 'Campaigns',
  description: 'A visual rhythm for an Afrohouse gathering.',
  heading: 'A system with room to move.',
  rationale: [
   'The coordinated event campaign uses bold stacked lettering, earthy textures and a patterned frame. The same visual language carries across the announcement, artist lineup and media accreditation.',
   'The announcement establishes the event name as the focal point. The lineup brings the performers forward, while the accreditation artwork adapts the same colours and framing to a different message.'
  ],
  artworks: [
   ['roots-main.jpg','Main event announcement'],
   ['roots-lineup.jpg','Artist lineup'],
   ['roots-media.jpg','Media accreditation announcement']
  ]
 },
 {
  title: 'A Little Light', type: 'Character illustration', filter: 'Illustration',
  description: 'Character, colour and a little curiosity.',
  heading: 'From linework to light.',
  rationale: [
   'A lantern headed character surrounded by luminous insects and foliage combines expressive proportions, detailed linework and warm lighting.',
   'The original development images trace the progression from line drawing to colour blocking and the finished illustration. Light, shadow and the dark backdrop give the final character depth.'
  ],
  artworks: [
   ['lantern-final.jpg','Finished character illustration'],
   ['lantern-line.jpg','Original line drawing'],
   ['lantern-colour.jpg','Colour development']
  ]
 },
 {
  title: 'Form & Fibre', type: 'Fashion illustration', filter: 'Illustration',
  description: 'Explorations in texture and silhouette.',
  heading: 'Material expressed through drawing.',
  rationale: [
   'Garment illustration studies explore woven textures, sculptural forms and geometric patterns. Coordinated front and back views describe the designs from both sides.',
   'The earth toned collection uses a shared visual language across varied silhouettes. Colourful lattice studies extend the exploration through contrast and intersecting lines.'
  ],
  artworks: [
   ['fashion-front.jpg','Woven texture studies: front views'],
   ['fashion-back.jpg','Woven texture studies: back views'],
   ['fashion-colour.jpg','Lattice studies: front views'],
   ['fashion-colour-back.jpg','Lattice studies: back views']
  ]
 }
];
export const importedProjects = visualStudies.map(study => ({
 title: study.title, type: study.type, description: study.description, image: originalArtwork(study.artworks[0][0])
}));
export const ghArtwork: Artwork[] = [
 ['gh-logo.jpg','GH Media Hub logo on a wall sign'],
 ['gh-letterhead.jpg','Branded letterhead'],
 ['gh-services.jpg','Services sign'],
 ['gh-brochure.jpg','Folded brochure presentation'],
 ['gh-audition.jpg','Audition announcement'],
 ['gh-boxing.jpg','Seasonal promotional artwork']
];
export const glowayArtwork: Artwork[] = [
 ['gloway-cover.jpg','GloCard front and reverse presented together'],
 ['glocard-front.jpg','GloCard front presentation mockup'],
 ['glocard-back.jpg','GloCard reverse presentation mockup'],
 ['gloway-fda.jpg','Informational campaign artwork'],
 ['gloway-import.jpg','Import campaign artwork']
];
export function OriginalArtwork({artworks}: {artworks: Artwork[]}) {
 return <div className="project-artwork-grid">{artworks.map(([file, caption]) => (
  <figure key={file}><a href={originalArtwork(file)} target="_blank" rel="noreferrer" aria-label={'Enlarge '+caption}><img src={originalArtwork(file)} alt={caption} loading="lazy" decoding="async"/></a><figcaption>{caption}</figcaption></figure>
 ))}</div>;
}
export function ImportedVisualStudy({study}: {study: VisualStudy}) {
 return <div className="imported-visual-study">
  <p className="detail-facts">Designer: Cyril · Tocy Studios</p>
  <section><h3>{study.heading}</h3>{study.rationale.map(p=><p key={p}>{p}</p>)}</section>
  <section><h3>{study.filter==='Illustration'?'Development and finished work':'Selected artwork and applications'}</h3><OriginalArtwork artworks={study.artworks.slice(1)}/></section>
  <p className="concept-note">Selected visual work. Illustrations and mockup presentations document creative development and design applications; no measured campaign or product outcomes are claimed.</p>
 </div>;
}
export function GlowayVisualWork(){
 return <section id="gloway-visual-communication"><p className="detail-kicker">Visual communication</p><h3>From a card to a campaign.</h3><p>Selected GloCard presentations and promotional graphics extend Gloway’s green and orange visual identity. The card artwork explores consistent brand details, while informational campaign pieces pair direct headlines with a central image to communicate trade topics.</p><OriginalArtwork artworks={glowayArtwork}/><p className="concept-note">Card mockups and campaign artwork are separate visual design applications, not evidence of product usability or commercial outcomes.</p></section>;
}
