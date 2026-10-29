const categories = [
 {title:'Catering & Meal Promotions',description:'The service overview introduces the catering offer, while food photography leads the meal promotion. The logo and contact details stay visible across both layouts.',items:[[2,'Cuisine and catering services'],[3,'Food and beverage promotion']]},
 {title:'Pastries & Finger Foods',description:'Product-led compositions highlight pastries and finger foods through warm food photography, prominent product names and clear enquiry details.',items:[[4,'Pastries and finger foods'],[5,'Pastry promotion']]},
] as const;
export default function MastersCuisineProject() {
 return <div className="masters-project">
  <p className="detail-facts">My contribution: Logo design and promotional graphics</p>
  <section><h3>Brand Identity</h3><p>The logo presentation above combines culinary imagery with the Masters Cuisine name. A chef-inspired mark establishes an identity that carries into the promotional work.</p><h3>The design focus</h3><p>Masters Cuisine offers catering, meals and pastries. Its visual communication needs to make the brand recognizable while helping people see what is available and how to enquire.</p><h3>The visual approach</h3><p>Food photography, warm colours and repeated contact details connect the service and product promotions. Each layout changes the emphasis to match the food being featured.</p></section>
  {categories.map(category=><section key={category.title}><h3>{category.title}</h3><p>{category.description}</p><div className="project-artwork-grid">{category.items.map(([index,caption])=><figure key={index}><a href={`/assets/masters-cuisine/view-${index}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${caption}`}><img loading="lazy" src={`/assets/masters-cuisine/view-${index}.webp`} alt={`${caption} for Masters Cuisine`}/></a><figcaption>{caption}</figcaption></figure>)}</div></section>)}
 </div>;
}
