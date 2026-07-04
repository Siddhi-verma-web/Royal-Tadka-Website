/* =========================================================
   ROYAL SPICE — script.js
   All data + interactivity: menu, cart, filters, booking,
   gallery, testimonials, FAQ, theme, animations.
   ========================================================= */

/* ---------- HELPER FUNCTIONS ---------- */

// Smooth scroll function with navbar offset
function customSmoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  window.scrollTo({
    top: target.offsetTop - 90, // Navbar height ka offset adjust karne ke liye
    behavior: 'smooth'
  });
}

// Helper function to generate menu items properly with dynamic IDs
function item(name, desc, price, veg, rating, img, cat) {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name,
    desc,
    price,
    veg,
    rating,
    img,
    cat
  };
}

/* ---------- UPDATED DATA & MENU ARRAY ---------- */
const CATEGORIES = [
  { id:'indian',   name:'North Indian', emoji:'🍛', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=60' },
  { id:'south',    name:'South Indian', emoji:'🌶️', img:'https://img.freepik.com/premium-photo/traditional-idli-sambar-with-colorful-chutneys-south-indian-breakfast-featuring-steamed-rice-cakes-rich-sambar_1260445-4952.jpg?w=1380' },
  { id:'chinese',  name:'Chinese',      emoji:'🥡', img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
  { id:'italian',  name:'Italian',      emoji:'🍕', img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60' },
  { id:'mughlai',  name:'Mughlai',      emoji:'🥘', img:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=500&q=60' },
  { id:'streetfast', name:'Street & Fast Food', emoji:'🍔', img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
  { id:'desserts', name:'Desserts',     emoji:'🍰', img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=60' },
  { id:'shakes',   name:'Premium Shakes', emoji:'🥤', img:'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&q=60' },
  { id:'drinks',   name:'Drinks',       emoji:'☕', img:'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=60' },
];

const MENU = [
  // ---- Indian ----
  item('Butter Chicken','Tandoori chicken simmered in a velvety tomato-butter gravy',420,false,4.8,'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60','indian'),
  item('Paneer Butter Masala','Cottage cheese cubes in a rich cashew-tomato sauce',360,true,4.7,'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=60','indian'),
  item('Dal Makhani','Slow-cooked black lentils finished with cream and butter',280,true,4.6,'https://images.pexels.com/photos/28674561/pexels-photo-28674561.jpeg','indian'),
  item('Hyderabadi Biryani','Fragrant basmati layered with spiced meat, dum-cooked',450,false,4.9,'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg','indian'),
  item('Rogan Josh','Kashmiri-style lamb curry with aromatic whole spices',480,false,4.7,'https://images.pexels.com/photos/28674568/pexels-photo-28674568.jpeg','indian'),
  item('Malai Kofta','Paneer & potato dumplings in a mild creamy gravy',340,true,4.5,'https://images.pexels.com/photos/33643313/pexels-photo-33643313.jpeg','indian'),
  item('Butter Naan','Tandoor-baked bread brushed with white butter',70,true,4.6,'https://images.unsplash.com/photo-1655979284091-eea0e93405ee?auto=format&fit=crop&w=500&q=60','indian'),
  item('Rajma Chawal','Kidney bean curry served with steamed rice',260,true,4.4,'https://images.pexels.com/photos/12737913/pexels-photo-12737913.jpeg','indian'),
  item('Royal Thali','A regal spread of curries, breads, rice, dessert & more',599,true,4.9,'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?auto=format&fit=crop&w=500&q=60','indian'),

  // ---- South Indian ----
  item('Masala Dosa','Crisp rice crepe filled with spiced potato masala',180,true,4.7,'https://images.unsplash.com/photo-1743517894265-c86ab035adef?auto=format&fit=crop&w=500&q=60','south'),
  item('Idli Sambar','Steamed rice cakes with lentil sambar & chutneys',150,true,4.5,'https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg','south'),
  item('Medu Vada','Crispy urad-dal fritters served with coconut chutney',140,true,4.4,'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg','south'),
  item('Kadhi Chawal','Tangy yogurt curry with steamed rice',220,true,4.3,'https://images.pexels.com/photos/7161739/pexels-photo-7161739.jpeg','south'),

  // ---- Chinese ----
  item('Hakka Noodles','Wok-tossed noodles with crunchy vegetables',260,true,4.5,'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60','chinese'),
  item('Schezwan Fried Rice','Spicy Szechuan-style rice with vegetables',270,true,4.4,'https://images.pexels.com/photos/17910326/pexels-photo-17910326.jpeg','chinese'),
  item('Chilli Paneer','Crispy paneer tossed in a spicy Indo-Chinese sauce',320,true,4.6,'https://images.pexels.com/photos/29631461/pexels-photo-29631461.jpeg','chinese'),
  item('Chilli Chicken','Wok-fried chicken in a tangy chilli-garlic glaze',360,false,4.7,'https://images.pexels.com/photos/7353388/pexels-photo-7353388.jpeg','chinese'),
  item('Veg Momos','Steamed vegetable dumplings served with fiery red chutney',190,true,4.5,'https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg','chinese'),
  item('Fried Tandoori Momos','Crispy fried momos tossed in tandoori marination',220,true,4.6,'https://images.pexels.com/photos/36194798/pexels-photo-36194798.jpeg','chinese'),
  item('Manchow Soup','Hot & spicy soup topped with crunchy fried noodles',180,true,4.3,'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=500&q=60','chinese'),

  // ---- Italian ----
  item('Margherita Pizza','Classic tomato, mozzarella & fresh basil',380,true,4.6,'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60','italian'),
  item('White Sauce Pasta','Creamy alfredo pasta with exotic herbs & parmesan',340,true,4.5,'https://images.pexels.com/photos/14094369/pexels-photo-14094369.jpeg','italian'),
  item('Red Sauce Pasta','Penne tossed in a rich, tangy tomato-basil sauce',320,true,4.4,'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg','italian'),
  item('Garlic Bread','Toasted artisanal bread loaded with garlic butter & herbs',180,true,4.5,'https://images.unsplash.com/photo-1556008531-57e6eefc7be4?auto=format&fit=crop&w=500&q=60','italian'),
  item('Bruschetta','Toasted bread topped with seasoned tomato, basil & olive oil',220,true,4.3,'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=60','italian'),

  // ---- Mughlai ----
  item('Chicken Korma','Rich Mughlai almond-cashew gravy with tender chicken pieces',440,false,4.6,'https://images.pexels.com/photos/6113820/pexels-photo-6113820.jpeg','mughlai'),
  item('Shahi Paneer','Paneer cubes cooked in a royal saffron & nut cream gravy',360,true,4.6,'https://images.pexels.com/photos/20408433/pexels-photo-20408433.jpeg','mughlai'),
  item('Mutton Rogan','Slow-braised mutton in authentic Kashmiri Mughlai spices',520,false,4.8,'https://images.pexels.com/photos/9609849/pexels-photo-9609849.jpeg','mughlai'),

  // ---- Street & Fast Food ----
  item('Pav Bhaji','Buttery mashed-vegetable curry served with golden soft pav',220,true,4.6,'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=60','streetfast'),
  item('Chole Bhature','Spiced fluffy chickpeas served with large fried leavened bread',240,true,4.7,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/07/b4/b4/ef/a9/v1_E11/E113UO8O.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=71ed42e46c69f2c98640398d45d500aa71f223ad3a4263c712f2550713682c9a','streetfast'),
  item('Misal Pav','Spicy sprouted-lentil curry topped with farsan and lemon slice',200,true,4.5,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/c0/59/87/0a/bb/v1_E10/E108LB5E.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=2751de404171b28ea5b1bbd4463a9990bae81a0163e56cf5e2f029137641ffd0','streetfast'),
  item('Classic Samosa','Two pieces of crispy pastry shell stuffed with spiced potatoes',60,true,4.6,'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60','streetfast'),
  item('Crispy Veg Spring Rolls','Golden-fried wrappers filled with seasoned crunchy vegetables',180,true,4.4,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b6/44/f0/62/45/v1_E11/E117RU9A.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=5751b31b2f82b4713ffe674108e0b0745a90d60d5f47a8ff58816ccff81d2383','streetfast'),
  item('Masala Maggi','Classic comfort street noodles tossed with extra home spices',90,true,4.5,'https://images.pexels.com/photos/30506297/pexels-photo-30506297.jpeg','streetfast'),
  item('Crispy Veg Cutlets','Pan-seared potato and green vegetable patties coated in crumbs',130,true,4.3,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/97/84/ad/6b/d1/v1_E11/E1138T0J.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=8a5868a005e5a0627437437107a4691da8c7450d0c540587a4e3d799c5953e1b','streetfast'),
  item('Paneer Tikka Roll','Spiced char-grilled paneer wrapped in a soft buttery paratha',210,true,4.5,'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60','streetfast'),
  item('Royal Burger','Grilled double patty, melted cheese & signature secret house sauce',260,false,4.4,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60','streetfast'),
  item('Peri-Peri Crispy Fries','Golden potato skin-on fries tossed in hot peri-peri dust',140,true,4.3,'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=60','streetfast'),

  // ---- Desserts ----
  item('Rasmalai','Spongy cottage-cheese discs soaked in rich pistachio-saffron milk ',120,true,4.8,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/01/8a/a8/cc/b3/v1_E10/E108LBKM.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=1820994d5de392c030a4e7f7c3eebd176eafacaad3be17e2fd04be1e84598f84','desserts'),
  item('Kulfi Falooda','Traditional frozen saffron ice-cream with vermicelli layers',160,true,4.7,'https://images.pexels.com/photos/18646648/pexels-photo-18646648.jpeg','desserts'),
  item('Chocolate Lava Cake','Warm artisanal chocolate cake with an intense molten center',190,true,4.7,'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=60','desserts'),
  item('Gulab Jammun','Spongy spheres are soaked in a fragrant rose syrup',150,true,4.6,'https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg','desserts'),

  item('Ghewar','Crispy golden disc-shaped dessert soaked in sugar syrup',150,true,4.6,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/7f/58/26/fc/dc/v1_E10/E101QV2.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=71f3f4d5bdfcb48c6d649292609d5af744e7bf3ff577580f74cb9a96939324e5','desserts'),

  item('Rabdi Jalebi','Golden Jalebi with a rich rabdi filling',150,true,4.6,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/0d/a4/7a/56/3d/v1_E10/E108LQ3T.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=dfe6818dbd84497c299f88509e4ddc86056a274b3558600eb2350d214c7b645b','desserts'),


  // ---- Premium Shakes ----
  item('Classic Oreo Shake','Creamy vanilla blend mixed with crushed chocolate cookies',160,true,4.7,'https://images.pexels.com/photos/16825488/pexels-photo-16825488.jpeg','shakes'),
  item('Mango Lassi Shake','Thick, rich traditional yogurt-based sweet mango shake',130,true,4.8,'https://images.pexels.com/photos/20177321/pexels-photo-20177321.jpeg','shakes'),

  item('Strawberry Shake','Delicious strawberry smoothie with a hint of vanilla',130,true,4.8,'https://images.pexels.com/photos/4134385/pexels-photo-4134385.jpeg','shakes'),

   item('Dry Fruit Shake','A delicious blend of assorted dried fruits',200,true,4.8,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/36/03/bf/5e/48/v1_E10/E101YQQ.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=68d831bc385934a98c32aa47d3f678458ff647e47c9c763e5e59cba962fed2ff','shakes'),


  item('Royal Cold Coffee','Chilled house coffee whipped with dark chocolate cream and ice',100,true,4.4,'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=60','shakes'),

  // ---- Drinks ----
  item('Masala Chai','Authentic spiced Indian tea slow-brewed with fresh milk',60,true,4.7,'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=60','drinks'),
  item('Mint Virgin Mojito','Crisp carbonated cooler loaded with fresh mint and lime pulp',150,true,4.5,'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60','drinks'),

  item('Mango juice','Freshly squeezed mango juice',150,true,4.5,'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/46/8b/27/01/db/v1_E10/E105YY7N.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=fb572da5fb3a41d569bcdf815fdacfd3f1bf6f3276f7b5e4841903aab44a8d3d','drinks'),
];

const OFFERS = [
  { tag:'20% OFF', title:'Weekend Buffet', desc:'Unlimited royal thali, every Sat–Sun', cls:'c1', ribbon:'Popular' },
  { tag:'1+1', title:'Buy 1 Get 1 Free', desc:'On all mocktails, every weekday 4–7 PM', cls:'c2', ribbon:'' },
  { tag:'30% OFF', title:'Festival Specials', desc:'Diwali & Holi thali celebrations', cls:'c3', ribbon:'Limited' },
  { tag:'₹999', title:'Family Combo', desc:'Feast for 4 — starters, mains & dessert', cls:'c4', ribbon:'' },
  { tag:'15% OFF', title:'Student Discount', desc:'Valid ID required, all-day everyday', cls:'c5', ribbon:'' },
  { tag:'FREE', title:'Birthday Dessert', desc:'Complimentary dessert on your birthday', cls:'c6', ribbon:'New' },
];

const GALLERY = [
  { img:'https://i.pinimg.com/736x/6c/77/bf/6c77bf53b2cc138cbcfcd08ec30a32a1.jpg', cap:'Restaurant Interior' },
  { img:'https://images.unsplash.com/photo-1742599361498-79824d24e355?auto=format&fit=crop&w=500&q=60', cap:'Butter Chicken' },
  { img:'https://tse4.mm.bing.net/th/id/OIP.BhR6PuDEik_hTDxah7CGlAHaEK?cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3', cap:'Our Master Chefs' },
  { img:'https://i.pinimg.com/736x/2b/30/ef/2b30ef12db7c0072e0bf18ab45aa3ae0.jpg', cap:'Elegant Table Setting' },
  { img:'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg', cap:'Hyderabadi Biryani' },
  { img:'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?auto=format&fit=crop&w=500&q=60', cap:'Family Dining' },
  { img:'https://d1pbny5bq445o3.cloudfront.net/get/wp-content/uploads/2023/10/04104450/Restaurant-event-ideas.png', cap:'Festival Celebration' },
  { img:'https://i.pinimg.com/736x/56/9e/45/569e45d158cbc48e4bf4bba74cb20658.jpg', cap:'Royal Ambience' },
  { img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60', cap:'Street Food Specials' },
];

const WHY = [
  { icon:'fa-seedling', title:'Fresh Ingredients', desc:'Sourced fresh, every single morning' },
  { icon:'fa-mortar-pestle', title:'Master Chefs', desc:'Award-winning culinary experts' },
  { icon:'fa-motorcycle', title:'Fast Delivery', desc:'Hot food at your door in 30 mins' },
  { icon:'fa-shield-heart', title:'100% Hygiene', desc:'FSSAI-certified, spotless kitchen' },
  { icon:'fa-tags', title:'Affordable Prices', desc:'Luxury dining that doesn\'t break the bank' },
  { icon:'fa-gem', title:'Premium Dining', desc:'An ambience fit for royalty' },
  { icon:'fa-crown', title:'Authentic Taste', desc:'Recipes passed down four generations' },
  { icon:'fa-headset', title:'24×7 Support', desc:'We\'re always here for you' },
];

const STATS = [
  { num:5000, suffix:'+', label:'Happy Customers' },
  { num:500,   suffix:'+', label:'Dishes' },
  { num:50,    suffix:'+', label:'Expert Chefs' },
  { num:20,    suffix:'',  label:'Years Experience' },
  { num:100000, suffix:'+', label:'Orders Delivered' },
];

const TESTIMONIALS = [
  { name:'Ananya Sharma', loc:'Jaipur', text:'Royal Tadka feels like dining in a maharaja\'s palace — the butter chicken is simply unmatched.', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60' },
  { name:'Rohan Mehta', loc:'Delhi', text:'The ambience, the service, the biryani — every single detail feels curated with love.', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60' },
  { name:'Kavya Reddy', loc:'Hyderabad', text:'Best online ordering experience — live tracking and the food arrived piping hot!', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60' },
  { name:'Arjun Nair', loc:'Bengaluru', text:'Booked a table for our anniversary — the staff made it unforgettable. Highly recommend.', img:'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=60' },
];

const FAQ = [
  { q:'How do I book a table?', a:'Simply use the Table Booking section, fill in your details, date & time, and you\'ll receive an instant confirmation.' },
  { q:'What are your delivery charges?', a:'Delivery is free above ₹499. Below that, a flat ₹40 delivery charge applies within city limits.' },
  { q:'What is your refund & cancellation policy?', a:'Orders can be cancelled within 5 minutes of placing them for a full refund. After preparation begins, cancellations aren\'t possible.' },
  { q:'Do you have Jain / pure-veg options?', a:'Yes — every veg dish can be customised to Jain preferences (no onion/garlic) on request.' },
  { q:'What payment methods do you accept?', a:'We accept UPI, all major cards, net banking, and cash on delivery.' },
  { q:'What are your restaurant timings?', a:'We\'re open every day from 11:00 AM to 11:30 PM, including public holidays.' },
  { q:'Is parking available?', a:'Yes, we offer complimentary valet parking for all dine-in guests.' },
];

/* ---------- STATE (in-memory only, resets on page reload) ---------- */
let favourites = new Set();
let activeCategory = 'all';
let vegOnly = false;
const DELIVERY_FEE = 40;
const GST_RATE = 0.05;
let memCart = [];

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  initLoader();
  initNavbar();
  initTheme();
  initSearch();
  renderCategories();
  renderMenuFilters();
  renderMenu();
  renderOffers();
  renderGallery();
  renderWhy();
  renderStats();
  renderTestimonials();
  renderFAQ();
  initReveal();
  initBooking();
  initCartUI();
  initBackToTop();
  initNewsletter();
});

/* ---------- LOADER ---------- */
function initLoader(){
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 700);
  });
  // fallback in case load already fired
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2500);
}

/* ---------- NAVBAR ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';

    // active link highlight
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

/* ---------- THEME (dark/light) ---------- */
function initTheme(){
  const btn = document.getElementById('themeToggle');
  let dark = false;
  btn.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
}

/* ---------- SEARCH ---------- */
function initSearch(){
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  document.getElementById('searchToggle').addEventListener('click', () => {
    overlay.classList.add('open'); setTimeout(() => input.focus(), 300);
  });
  document.getElementById('searchClose').addEventListener('click', () => overlay.classList.remove('open'));
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!q) return;
   MENU.filter(m => m.name.toLowerCase().includes(q)).slice(0, 8).forEach(m => {
      const el = document.createElement('a');
      el.href = '#menu';
      el.className = 'search-result-item';
      el.innerHTML = `<img src="${m.img}" alt="${m.name}"><div><strong>${m.name}</strong><div style="font-size:.78rem;opacity:.7">₹${m.price}</div></div>`;
      el.addEventListener('click', () => {
        overlay.classList.remove('open');
        activeCategory = m.cat;
        syncThaliFilters();
        renderMenu();
      });
      results.appendChild(el);
    });
    if (!results.children.length) results.innerHTML = '<p style="color:#fff;opacity:.6">No dishes found.</p>';
  });
}


/* ---------- CATEGORIES ---------- */
function renderCategories(){
  const grid = document.getElementById('catGrid');
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" data-cat="${c.id}">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="cat-info"><span class="emoji">${c.emoji}</span><h3>${c.name}</h3></div>
    </div>`).join('');
  grid.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.dataset.cat;
      document.getElementById('menu').scrollIntoView({ behavior:'smooth' });
      syncThaliFilters();
      renderMenu();
    });
  });
}

/* ---------- MENU FILTERS (thali-style circular chips) ---------- */
function renderMenuFilters(){
  const wrap = document.getElementById('thaliFilters');
  const cats = [{id:'all', name:'All'}, ...CATEGORIES];
  wrap.innerHTML = cats.map(c => `<button class="thali-chip ${c.id=='all'?'active':''}" data-cat="${c.id}">${c.emoji||''} ${c.name}</button>`).join('');
  wrap.addEventListener('click', e => {
    const btn = e.target.closest('.thali-chip');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    syncThaliFilters();
    renderMenu();
  });
  document.getElementById('vegOnly').addEventListener('change', e => {
    vegOnly = e.target.checked;
    renderMenu();
  });
}
function syncThaliFilters(){
  document.querySelectorAll('.thali-chip').forEach(b => b.classList.toggle('active', b.dataset.cat === activeCategory));
}

/* ---------- MENU GRID ---------- */
function renderMenu(){
  const grid = document.getElementById('menuGrid');
  let items = MENU.filter(m => activeCategory === 'all' || m.cat === activeCategory);
  if (vegOnly) items = items.filter(m => m.veg);
  if (!items.length){
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-soft)">No dishes match this filter yet.</p>`;
    return;
  }
  grid.innerHTML = items.map(m => `
    <div class="menu-card">
      <div class="menu-card-img">
        <img src="${m.img}" alt="${m.name}" loading="lazy">
        <span class="badge ${m.veg?'veg':'nonveg'}"></span>
        <button class="fav-btn ${favourites.has(m.id)?'active':''}" data-fav="${m.id}"><i class="fa-solid fa-heart"></i></button>
      </div>
      <div class="menu-card-body">
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="menu-meta">
          <span class="rating"><i class="fa-solid fa-star"></i> ${m.rating}</span>
          <span class="price">₹${m.price}</span>
        </div>
        <button class="add-cart-btn" data-add="${m.id}"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
      </div>
    </div>`).join('');

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add);
      btn.classList.add('added');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
      setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart'; }, 1200);
    });
  });
  grid.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.fav;
      favourites.has(id) ? favourites.delete(id) : favourites.add(id);
      btn.classList.toggle('active');
    });
  });
}

/* ---------- OFFERS ---------- */
function renderOffers(){
  document.getElementById('offersGrid').innerHTML = OFFERS.map(o => `
    <div class="offer-card ${o.cls}">
      ${o.ribbon ? `<span class="offer-ribbon">${o.ribbon}</span>` : ''}
      <div class="offer-tag">${o.tag}</div>
      <h4>${o.title}</h4>
      <p>${o.desc}</p>
    </div>`).join('');
}

/* ---------- GALLERY ---------- */
function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = GALLERY.map((g,i) => `
    <div class="gallery-item" data-idx="${i}">
      <img src="${g.img}" alt="${g.cap}" loading="lazy">
      <div class="gallery-cap">${g.cap}</div>
    </div>`).join('');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  grid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => {
      lbImg.src = GALLERY[el.dataset.idx].img.replace('w=500','w=1400');
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
}

/* ---------- WHY CHOOSE US ---------- */
function renderWhy(){
  document.getElementById('whyGrid').innerHTML = WHY.map(w => `
    <div class="why-card reveal">
      <i class="fa-solid ${w.icon}"></i>
      <h4>${w.title}</h4>
      <p>${w.desc}</p>
    </div>`).join('');
}

/* ---------- STATS (animated counters) ---------- */
function renderStats(){
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = STATS.map((s,i) => `
    <div class="stat-item"><div class="num" data-target="${s.num}" data-suffix="${s.suffix}">0</div><div class="label">${s.label}</div></div>`).join('');

  const nums = grid.querySelectorAll('.num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:.5 });
  nums.forEach(n => obs.observe(n));
}
function animateCount(el){
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix;
  const duration = 1600;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const val = Math.floor(p * target);
    el.textContent = val.toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- TESTIMONIALS ---------- */
function renderTestimonials(){
  const track = document.getElementById('testiTrack');
  const dots = document.getElementById('testiDots');
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card">
      <img src="${t.img}" alt="${t.name}">
      <div class="testi-stars">★★★★★</div>
      <p>"${t.text}"</p>
      <h5>${t.name}</h5>
      <span>${t.loc}</span>
    </div>`).join('');
  dots.innerHTML = TESTIMONIALS.map((_,i) => `<button data-i="${i}" class="${i===0?'active':''}"></button>`).join('');

  let idx = 0;
  function go(i){
    idx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${idx*100}%)`;
    dots.querySelectorAll('button').forEach((b,j) => b.classList.toggle('active', j===idx));
  }
  dots.addEventListener('click', e => { if (e.target.dataset.i !== undefined) go(+e.target.dataset.i); });
  setInterval(() => go(idx+1), 5000);
}

/* ---------- FAQ ACCORDION ---------- */
function renderFAQ(){
  const wrap = document.getElementById('faqAccordion');
  wrap.innerHTML = FAQ.map((f,i) => `
    <div class="acc-item">
      <div class="acc-head"><span>${f.q}</span><i class="fa-solid fa-plus"></i></div>
      <div class="acc-body"><p>${f.a}</p></div>
    </div>`).join('');
  wrap.querySelectorAll('.acc-item').forEach(item => {
    item.querySelector('.acc-head').addEventListener('click', () => {
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');
      wrap.querySelectorAll('.acc-item').forEach(o => { o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight = null; });
      if (!isOpen){ item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal, .why-card, .cat-card, .menu-card, .offer-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold:.12 });
  els.forEach(el => obs.observe(el));
  // Re-observe dynamically added cards periodically (simple approach)
  setTimeout(() => document.querySelectorAll('.why-card, .cat-card').forEach(el => obs.observe(el)), 300);
}

/* ---------- CART ---------- */
function addToCart(id){
  const menuItem = MENU.find(m => m.id === id);
  const existing = memCart.find(c => c.id === id);
  if (existing) existing.qty++;
  else memCart.push({ ...menuItem, qty:1 });
  updateCartUI();
  showToast(`${menuItem.name} added to cart`);
}
function updateCartUI(){
  const count = memCart.reduce((a,c) => a + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  const list = document.getElementById('cartItemsList');
  if (!memCart.length){
    list.innerHTML = `<p class="cart-empty">Your cart is empty. Add something delicious from the menu!</p>`;
  } else {
    list.innerHTML = memCart.map(c => `
      <div class="cart-item">
        <img src="${c.img}" alt="${c.name}">
        <div class="cart-item-info">
          <h5>${c.name}</h5>
          <span>₹${c.price} × ${c.qty}</span>
        </div>
        <div class="qty-controls">
          <button data-dec="${c.id}">−</button>
          <span>${c.qty}</span>
          <button data-inc="${c.id}">+</button>
        </div>
        <button class="remove-item" data-remove="${c.id}"><i class="fa-solid fa-trash"></i></button>
      </div>`).join('');
  }
  renderBill();
}
function renderBill(){
  const subtotal = memCart.reduce((a,c) => a + c.price*c.qty, 0);
  const gst = subtotal * GST_RATE;
  const delivery = subtotal > 0 ? (subtotal > 499 ? 0 : DELIVERY_FEE) : 0;
  const discount = window.__promoDiscount || 0;
  const total = Math.max(subtotal + gst + delivery - discount, 0);
  document.getElementById('billSummary').innerHTML = `
    <div class="row"><span>Subtotal</span><span>₹${subtotal.toFixed(0)}</span></div>
    <div class="row"><span>GST (5%)</span><span>₹${gst.toFixed(0)}</span></div>
    <div class="row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹'+delivery}</span></div>
    ${discount ? `<div class="row"><span>Promo Discount</span><span>-₹${discount.toFixed(0)}</span></div>` : ''}
    <div class="row total"><span>Total</span><span>₹${total.toFixed(0)}</span></div>`;
}
function initCartUI(){
  document.getElementById('cartToggle').addEventListener('click', () => {
    document.getElementById('order').scrollIntoView({ behavior:'smooth' });
  });
  document.getElementById('cartItemsList').addEventListener('click', e => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const rem = e.target.closest('[data-remove]');
    if (inc){ memCart.find(c => c.id === inc.dataset.inc).qty++; updateCartUI(); }
    if (dec){
      const c = memCart.find(c => c.id === dec.dataset.dec);
      c.qty--; if (c.qty <= 0) memCart = memCart.filter(x => x.id !== c.id);
      updateCartUI();
    }
    if (rem){ memCart = memCart.filter(c => c.id !== rem.dataset.remove); updateCartUI(); }
  });
  document.getElementById('applyPromo').addEventListener('click', () => {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    const subtotal = memCart.reduce((a,c) => a + c.price*c.qty, 0);
    if (code === 'ROYAL10' && subtotal > 0){
      window.__promoDiscount = subtotal * 0.10;
      showToast('Promo code applied — 10% off!');
    } else {
      window.__promoDiscount = 0;
      showToast(subtotal === 0 ? 'Add items to your cart first' : 'Invalid promo code', true);
    }
    renderBill();
  });
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!memCart.length){ showToast('Your cart is empty', true); return; }
    const tracker = document.getElementById('orderTracker');
    tracker.hidden = false;
    tracker.scrollIntoView({ behavior:'smooth', block:'center' });
    showToast('Order placed successfully!');
    let step = 0;
    const steps = tracker.querySelectorAll('.step');
    const eta = document.getElementById('etaTime');
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length){ clearInterval(interval); eta.textContent = 'Delivered'; return; }
      steps[step].classList.add('active');
      eta.textContent = (32 - step*10) + ' mins';
    }, 2200);
  });
  updateCartUI();
}

/* ---------- BOOKING ---------- */
function initBooking(){
  const form = document.getElementById('bookingForm');
  const modal = document.getElementById('bookingModal');
  const dateInput = form.querySelector('[name="date"]');
  dateInput.min = new Date().toISOString().split('T')[0];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    document.getElementById('bookingModalText').textContent =
      `Thank you, ${data.get('name')}! Your table for ${data.get('guests')} on ${data.get('date')} at ${data.get('time')} is confirmed. A confirmation has been sent to ${data.get('email')}.`;
    modal.classList.add('open');
    form.reset();
  });
  document.getElementById('closeBookingModal').addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ---------- NEWSLETTER ---------- */
function initNewsletter(){
  document.getElementById('newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('Subscribed! Watch your inbox for festive offers.');
    e.target.reset();
  });
}

/* ---------- TOASTS ---------- */
function showToast(msg, isError=false){
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderLeftColor = 'var(--maroon)';
  toast.innerHTML = `<i class="fa-solid ${isError?'fa-circle-exclamation':'fa-circle-check'}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
