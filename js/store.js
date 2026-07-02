/* ════════════════════════════════════════════════════════
   AndyAzhTEC.com — store.js
   E-commerce lógica completa · Beta v0.3.0
════════════════════════════════════════════════════════ */
"use strict";

/* ── PRODUCT CATALOG ──────────────────────────────────
   Editá este array para cambiar / agregar productos.
   Cuando Supabase esté conectado, esto vendrá de la DB.
══════════════════════════════════════════════════════ */
const PRODUCTS = [
  // GPU
  { id:1, cat:'gpu', brand:'NVIDIA', name:'RTX 4070 Ti SUPER', desc:'16GB GDDR6X · PCIe 4.0 · DLSS 3.5 · La mejor relación precio/rendimiento 4K del mercado.', price:899, oldPrice:999, badge:'hot', icon:'fa-microchip', stars:4.8, reviews:142, specs:[['VRAM','16 GB GDDR6X'],['TDP','285W'],['Conector','16-pin'],['Puerto','PCIe 4.0 x16']] },
  { id:2, cat:'gpu', brand:'AMD',    name:'RX 7900 XTX',      desc:'24GB GDDR6 · PCIe 4.0 · FSR 3 · Rendimiento bruto top tier en rasterización 4K.', price:949, oldPrice:null, badge:'', icon:'fa-microchip', stars:4.6, reviews:98, specs:[['VRAM','24 GB GDDR6'],['TDP','355W'],['Puerto','PCIe 4.0 x16'],['Infinity Cache','96 MB']] },
  { id:3, cat:'gpu', brand:'NVIDIA', name:'RTX 4090',          desc:'24GB GDDR6X · El monstruo definitivo. Sin concesiones en rendimiento 4K+.', price:1699, oldPrice:1999, badge:'sale', icon:'fa-microchip', stars:5.0, reviews:67, specs:[['VRAM','24 GB GDDR6X'],['TDP','450W'],['CUDA Cores','16.384'],['Puerto','PCIe 4.0 x16']] },
  { id:4, cat:'gpu', brand:'NVIDIA', name:'RTX 4060 Ti 16GB',  desc:'16GB GDDR6 · La opción inteligente para 1440p con presupuesto ajustado.', price:449, oldPrice:499, badge:'new', icon:'fa-microchip', stars:4.3, reviews:201, specs:[['VRAM','16 GB GDDR6'],['TDP','165W'],['Puerto','PCIe 4.0 x16'],['DLSS','3.5']] },
  // Periféricos
  { id:5, cat:'perifericos', brand:'Logitech', name:'G Pro X Superlight 2', desc:'60g · Sensor HERO 2 · 32.000 DPI · El mouse de los pros de esports.', price:159, oldPrice:null, badge:'rec', icon:'fa-computer-mouse', stars:4.9, reviews:534, specs:[['Peso','60 g'],['Sensor','HERO 2'],['DPI','25.600'],['Polling Rate','2.000 Hz']] },
  { id:6, cat:'perifericos', brand:'Wooting',  name:'Wooting 60HE+',        desc:'Hall Effect Analog · Actuation ajustable · El teclado definitivo para FPS competitivo.', price:175, oldPrice:null, badge:'rec', icon:'fa-keyboard', stars:4.9, reviews:312, specs:[['Switch','Lekker HE'],['Actuation','0.1–4.0 mm ajustable'],['Layout','60%'],['Polling Rate','1000 Hz']] },
  { id:7, cat:'perifericos', brand:'Razer',    name:'DeathAdder V3 Pro',    desc:'64g · Sensor Focus Pro 30K · Shape ergonómica icónica premium.', price:149, oldPrice:179, badge:'sale', icon:'fa-computer-mouse', stars:4.7, reviews:289, specs:[['Peso','64 g'],['Sensor','Focus Pro 30K'],['DPI','30.000'],['Batería','90 hs']] },
  { id:8, cat:'perifericos', brand:'Glorious', name:'Model D 2 Pro',        desc:'55g · Sensor Glorious BAMF2 · Forma ergonómica que mejora la original.', price:99, oldPrice:null, badge:'new', icon:'fa-computer-mouse', stars:4.5, reviews:187, specs:[['Peso','55 g'],['Sensor','BAMF2'],['DPI','26.000'],['Cable','Ascended Cord']] },
  // Audio
  { id:9,  cat:'audio', brand:'SteelSeries', name:'Arctis Nova Pro Wireless', desc:'Hi-Res Audio · ANC híbrido · Multibase inalámbrico dual. El headset definitivo.', price:349, oldPrice:399, badge:'hot', icon:'fa-headphones', stars:4.8, reviews:423, specs:[['Driver','40 mm'],['Respuesta','10–40.000 Hz'],['ANC','Activa híbrida'],['Batería','22+10 hs (base)']] },
  { id:10, cat:'audio', brand:'HyperX',      name:'Cloud Alpha Wireless',     desc:'300 hs de batería · Drivers de 50mm · El mejor headset inalámbrico por precio.', price:199, oldPrice:229, badge:'sale', icon:'fa-headphones', stars:4.7, reviews:611, specs:[['Driver','50 mm'],['Batería','300 hs'],['Frecuencia','15–21.000 Hz'],['Peso','309 g']] },
  { id:11, cat:'audio', brand:'Beyerdynamic', name:'DT 770 PRO 80Ω',          desc:'Referencia del estudio. Aislamiento cerrado. Favorito de streamers y productores.', price:179, oldPrice:null, badge:'rec', icon:'fa-headphones', stars:4.8, reviews:892, specs:[['Impedancia','80 Ω'],['Driver','40 mm'],['Respuesta','5–35.000 Hz'],['Tipo','Cerrado']] },
  // Storage
  { id:12, cat:'storage', brand:'Samsung', name:'990 Pro 2TB NVMe',  desc:'PCIe 4.0 · 7.450 MB/s lectura · El SSD gaming que cambia las reglas.', price:189, oldPrice:null, badge:'rec', icon:'fa-hard-drive', stars:4.9, reviews:1205, specs:[['Interfaz','PCIe 4.0 NVMe'],['Lectura','7.450 MB/s'],['Escritura','6.900 MB/s'],['Forma','M.2 2280']] },
  { id:13, cat:'storage', brand:'WD',      name:'Black SN850X 2TB', desc:'PCIe 4.0 · 7.300 MB/s · Dashboard gamer con control de temperatura.', price:169, oldPrice:199, badge:'sale', icon:'fa-hard-drive', stars:4.7, reviews:678, specs:[['Interfaz','PCIe 4.0 NVMe'],['Lectura','7.300 MB/s'],['Escritura','6.600 MB/s'],['Cache','2 GB LPDDR4']] },
  { id:14, cat:'storage', brand:'Seagate', name:'FireCuda 530 4TB',  desc:'PCIe 4.0 · 7.300 MB/s · La opción de alta capacidad para game pass masivo.', price:389, oldPrice:449, badge:'', icon:'fa-hard-drive', stars:4.6, reviews:234, specs:[['Interfaz','PCIe 4.0 NVMe'],['Lectura','7.300 MB/s'],['Capacidad','4 TB'],['TBW','5100']] },
  // Cooling
  { id:15, cat:'cooling', brand:'Noctua',  name:'NH-D15 chromax.black', desc:'Doble torre · Silencioso · El mejor aircooler del mercado desde hace 10 años.', price:109, oldPrice:null, badge:'rec', icon:'fa-fan', stars:5.0, reviews:1893, specs:[['Tipo','Aircooler doble torre'],['Fans','2x NF-A15'],['TDP','250W+'],['Altura','165 mm']] },
  { id:16, cat:'cooling', brand:'Arctic',  name:'Liquid Freezer III 360',desc:'AIO 360mm · Bomba en el block · Bajo nivel de ruido excepcional por precio.', price:129, oldPrice:149, badge:'hot', icon:'fa-fan', stars:4.7, reviews:567, specs:[['Tipo','AIO 360mm'],['Fans','3x P12 Max'],['TDP','400W+'],['Bomba','en CPU block']] },
  // Monitor
  { id:17, cat:'monitor', brand:'LG',     name:'27GP850-B 27" 1440p', desc:'27" QHD · IPS · 165Hz 1ms · El monitor que usan los pros de esports.', price:399, oldPrice:449, badge:'hot', icon:'fa-desktop', stars:4.8, reviews:734, specs:[['Panel','IPS NanoIPS'],['Resolución','2560×1440'],['Hz','165 Hz'],['Tiempo respuesta','1 ms GtG']] },
  { id:18, cat:'monitor', brand:'Samsung',name:'Odyssey G7 32" 4K',   desc:'32" 4K OLED · 240Hz · El monitor que combina calidad de imagen y fluidez.', price:999, oldPrice:1199, badge:'new', icon:'fa-desktop', stars:4.9, reviews:312, specs:[['Panel','OLED QD'],['Resolución','3840×2160'],['Hz','240 Hz'],['HDR','HDR10+']] },
  // Silla
  { id:19, cat:'silla', brand:'Secretlab', name:'Titan EVO 2022',     desc:'Espuma fría de alta densidad · Cuero SoftWeave · El estándar de sillas gaming.', price:449, oldPrice:499, badge:'rec', icon:'fa-chair', stars:4.8, reviews:2341, specs:[['Material','SoftWeave / PU Leather'],['Altura reg.','Sí'],['Soporte lumbar','Magnético 4-way'],['Peso max','180 kg']] },
  { id:20, cat:'silla', brand:'Herman Miller', name:'Logitech x G Embody', desc:'Ergonomía científica · Para sesiones de +8hs sin dolor de espalda.', price:1695, oldPrice:null, badge:'', icon:'fa-chair', stars:5.0, reviews:456, specs:[['Marco','Espina central dinámica'],['Soporte','PostureFit SL'],['Garantía','12 años'],['Peso max','135 kg']] },
];

/* ── STORE APP ────────────────────────────────────────── */
const StoreApp = (function () {

  // ── State ──
  let cart     = [];
  let wishlist = [];
  let filtered = [...PRODUCTS];
  let currentCat   = 'all';
  let currentPrice = 2000;

  // ── DOM shortcuts ──
  const $ = id => document.getElementById(id);

  /* ─────────────── INIT ─────────────────────────────── */
  function init() {
    loadCart();
    loadWishlist();
    renderProducts(filtered);
    renderDeals();
    startDealsTimer();
    initSearch();
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeAccount(); closeProduct(); }
    });
  }

  /* ─────────────── PRODUCTS ─────────────────────────── */
  function renderProducts(list) {
    const grid = $('productsGrid');
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem">
        <i class="fa-solid fa-magnifying-glass fa-2x" style="display:block;margin-bottom:1rem"></i>
        No hay productos que coincidan con tu búsqueda.
      </div>`;
      return;
    }
    grid.innerHTML = list.map(p => productCardHTML(p)).join('');
  }

  function productCardHTML(p) {
    const badgeMap = { hot:'badge-hot HOT', new:'badge-new NUEVO', rec:'badge-rec TOP PICK', sale:'badge-sale OFERTA' };
    const badgeHTML = p.badge ? `<span class="p-card-badge ${badgeMap[p.badge].split(' ')[0]}">${badgeMap[p.badge].split(' ').slice(1).join(' ')}</span>` : '';
    const wishActive = wishlist.some(w => w.id === p.id) ? 'active' : '';
    const stars = starsHTML(p.stars);
    const oldPriceHTML = p.oldPrice ? `<span class="p-card-old">$${p.oldPrice}</span>` : '';

    return `<div class="p-card" onclick="StoreApp.openProduct(${p.id})">
      ${badgeHTML}
      <button class="p-card-wish ${wishActive}" onclick="event.stopPropagation();StoreApp.toggleWish(${p.id},this)" aria-label="Guardar">
        <i class="fa-${wishActive ? 'solid' : 'regular'} fa-heart"></i>
      </button>
      <div class="p-card-img"><i class="fa-solid ${p.icon}"></i></div>
      <div class="p-card-body">
        <div class="p-card-brand">${esc(p.brand)}</div>
        <div class="p-card-name">${esc(p.name)}</div>
        <div class="p-card-desc">${esc(p.desc)}</div>
        <div class="p-card-stars">${stars}<span>(${p.reviews})</span></div>
        <div class="p-card-price-row">
          <span class="p-card-price">$${p.price}</span>
          ${oldPriceHTML}
        </div>
        <button class="p-card-add" onclick="event.stopPropagation();StoreApp.addToCart('${esc(p.name)}',${p.price},'${p.cat}')">
          <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    </div>`;
  }

  function starsHTML(n) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<i class="fa-${i <= Math.floor(n) ? 'solid' : (i - n < 1 ? 'solid fa-star-half-stroke' : 'regular')} fa-star"></i>`;
    }
    return html;
  }

  /* ─────────────── PRODUCT DETAIL MODAL ─────────────── */
  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const body = $('prodModalBody');
    const wishActive = wishlist.some(w => w.id === p.id);
    const oldPriceHTML = p.oldPrice ? `<span class="pmd-old">$${p.oldPrice}</span>` : '';
    const specsHTML = (p.specs || []).map(([k,v]) =>
      `<div class="pmd-spec"><span class="pmd-spec-key">${esc(k)}</span><span class="pmd-spec-val">${esc(v)}</span></div>`
    ).join('');

    body.innerHTML = `
      <div class="pmd-left">
        <i class="fa-solid ${p.icon}"></i>
      </div>
      <div class="pmd-right" style="padding-top:3rem">
        <div class="pmd-brand">${esc(p.brand)}</div>
        <div class="pmd-name">${esc(p.name)}</div>
        <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.5rem">
          ${starsHTML(p.stars)}
          <span style="color:var(--text-muted);font-size:0.8rem">(${p.reviews} reseñas)</span>
        </div>
        <div class="pmd-desc">${esc(p.desc)}</div>
        <div class="pmd-specs">${specsHTML}</div>
        <div class="pmd-price-row">
          <span class="pmd-price">$${p.price}</span>
          ${oldPriceHTML}
        </div>
        <div class="pmd-actions">
          <button class="btn btn-primary" style="flex:1" onclick="StoreApp.addToCart('${esc(p.name)}',${p.price},'${p.cat}');StoreApp.closeProduct()">
            <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
          </button>
          <button class="p-card-wish ${wishActive ? 'active' : ''}" style="width:44px;height:44px;font-size:1.1rem"
                  onclick="StoreApp.toggleWish(${p.id},this)" aria-label="Guardar en lista">
            <i class="fa-${wishActive ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    $('prodModalOverlay').classList.add('open');
    $('prodModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProduct() {
    $('prodModalOverlay')?.classList.remove('open');
    $('prodModal')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ─────────────── FILTER / SORT ─────────────────────── */
  function filterCat(btn, catOverride) {
    const cat = catOverride || (btn?.dataset.cat) || 'all';
    currentCat = cat;

    // Update nav buttons
    document.querySelectorAll('.cat-nav-btn').forEach(b => b.classList.remove('active'));
    const target = document.querySelector(`.cat-nav-btn[data-cat="${cat}"]`);
    if (target) target.classList.add('active');

    applyFilters();

    // Update section title
    const titleEl = $('productsSectionTitle');
    if (titleEl) {
      const names = { all:'Todos los productos', gpu:'GPU / CPU', perifericos:'Periféricos',
        audio:'Audio', storage:'Storage', cooling:'Cooling', monitor:'Monitores', silla:'Sillas & Escritorios' };
      titleEl.innerHTML = `<i class="fa-solid fa-star"></i> ${names[cat] || cat}`;
    }

    // Scroll to products
    $('productsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function filterPrice(val) {
    currentPrice = parseInt(val);
    $('priceMaxLabel').textContent = currentPrice >= 2000 ? '$2000+' : `$${currentPrice}`;
    applyFilters();
  }

  function applyFilters() {
    filtered = PRODUCTS.filter(p => {
      if (currentCat !== 'all' && p.cat !== currentCat) return false;
      if (p.price > currentPrice) return false;
      return true;
    });
    // Apply current sort
    const sortVal = $('sortSelect')?.value || 'default';
    sortProducts(sortVal, false);
    renderProducts(filtered);
  }

  function sort(val) { sortProducts(val, true); }

  function sortProducts(val, render = true) {
    switch (val) {
      case 'price-asc':  filtered.sort((a,b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a,b) => b.price - a.price); break;
      case 'name':       filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
      default:           filtered.sort((a,b) => a.id - b.id); break;
    }
    if (render) renderProducts(filtered);
  }

  /* ─────────────── SEARCH ────────────────────────────── */
  function initSearch() {
    const input = $('searchInput');
    const sugg  = $('searchSuggestions');
    if (!input || !sugg) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = input.value.trim().toLowerCase();
        if (!q) { sugg.classList.remove('open'); sugg.innerHTML=''; return; }
        const matches = PRODUCTS.filter(p =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
        ).slice(0, 6);
        if (!matches.length) { sugg.classList.remove('open'); return; }
        sugg.innerHTML = matches.map(p => `
          <div class="ss-item" onclick="StoreApp.openProduct(${p.id});document.getElementById('searchInput').value='';document.getElementById('searchSuggestions').classList.remove('open')">
            <i class="fa-solid ${p.icon}"></i>
            <span>${esc(p.name)}</span>
            <span style="margin-left:auto;font-family:'Orbitron',monospace;font-size:0.78rem;color:var(--cyan)">$${p.price}</span>
          </div>`).join('');
        sugg.classList.add('open');
      }, 180);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.store-search')) sugg.classList.remove('open');
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { search(); sugg.classList.remove('open'); }
    });
  }

  function search() {
    const q = ($('searchInput')?.value || '').trim().toLowerCase();
    if (!q) { filtered = [...PRODUCTS]; }
    else {
      filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }
    renderProducts(filtered);
    $('productsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ─────────────── DEALS ─────────────────────────────── */
  function renderDeals() {
    const row = $('dealsRow');
    if (!row) return;
    const deals = PRODUCTS.filter(p => p.oldPrice).slice(0, 8);
    row.innerHTML = deals.map(p => {
      const disc = Math.round((1 - p.price / p.oldPrice) * 100);
      return `<div class="deal-card" onclick="StoreApp.openProduct(${p.id})">
        <span class="deal-discount">-${disc}%</span>
        <div class="deal-icon"><i class="fa-solid ${p.icon}"></i></div>
        <div class="deal-name">${esc(p.name)}</div>
        <div class="deal-price-row">
          <span class="deal-price">$${p.price}</span>
          <span class="deal-old">$${p.oldPrice}</span>
        </div>
      </div>`;
    }).join('');
  }

  function startDealsTimer() {
    const el = $('dealsTimer');
    if (!el) return;
    let h = 11, m = 42, s = 7;
    setInterval(() => {
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; m = 59; s = 59; }
      el.innerHTML = `<i class="fa-solid fa-clock"></i> ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
  }

  /* ─────────────── CART ──────────────────────────────── */
  function loadCart() {
    try { cart = JSON.parse(localStorage.getItem('atec_store_cart') || '[]'); } catch(_) { cart = []; }
    renderCart();
  }
  function saveCart() {
    try { localStorage.setItem('atec_store_cart', JSON.stringify(cart)); } catch(_) {}
  }

  function addToCart(name, price, cat) {
    const idx = cart.findIndex(i => i.name === name);
    if (idx >= 0) {
      cart[idx].qty++;
    } else {
      const p = PRODUCTS.find(x => x.name === name);
      cart.push({ name, price, cat, qty: 1, icon: p ? p.icon : 'fa-box' });
    }
    saveCart();
    renderCart();
    toast(`<i class="fa-solid fa-cart-plus"></i> ${name} agregado al carrito`);
    // Badge bounce
    const badge = $('hdrCartBadge');
    if (badge) { badge.style.transform='scale(1.5)'; setTimeout(()=>badge.style.transform='',300); }
  }

  function removeFromCart(name) {
    const idx = cart.findIndex(i => i.name === name);
    if (idx < 0) return;
    if (cart[idx].qty > 1) cart[idx].qty--;
    else cart.splice(idx, 1);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const badge   = $('hdrCartBadge');
    const body    = $('sCartBody');
    const footer  = $('sCartFooter');
    const subtotalEl = $('sCartSubtotal');
    const totalEl    = $('sCartTotal');

    const totalQty = cart.reduce((s,i) => s+i.qty, 0);
    const subtotal = cart.reduce((s,i) => s+i.price*i.qty, 0);
    const shipping = subtotal >= 150 ? 'Gratis' : '$15';
    const total    = subtotal + (shipping === 'Gratis' ? 0 : 15);

    if (badge) badge.textContent = totalQty;

    if (!body) return;
    if (!cart.length) {
      body.innerHTML = `<div class="s-cart-empty">
        <i class="fa-solid fa-box-open fa-3x"></i>
        <p>Tu carrito está vacío</p>
        <button class="btn btn-outline" style="margin-top:1rem" onclick="StoreApp.toggleCart()">
          Seguir comprando
        </button>
      </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    body.innerHTML = cart.map(item => `
      <div class="s-cart-item">
        <div class="sci-icon"><i class="fa-solid ${item.icon || 'fa-box'}"></i></div>
        <div class="sci-info">
          <div class="sci-name" title="${esc(item.name)}">${esc(item.name)}</div>
          <div class="sci-price">$${(item.price * item.qty).toLocaleString('en-US')}</div>
        </div>
        <div class="sci-controls">
          <div class="sci-qty">
            <button onclick="StoreApp.removeFromCart('${esc(item.name)}')"><i class="fa-solid fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="StoreApp.addToCart('${esc(item.name)}',${item.price},'${item.cat}')"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="sci-remove" onclick="StoreApp.removeAll('${esc(item.name)}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (footer) {
      footer.style.display = 'block';
      $('sCartSubtotal').textContent = `$${subtotal.toLocaleString('en-US')}`;
      $('sCartShipping').textContent = shipping;
      $('sCartTotal').innerHTML = `<span>$${total.toLocaleString('en-US')}</span>`;
    }
  }

  function removeAll(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    renderCart();
  }

  function toggleCart() {
    const drawer  = $('sCartDrawer');
    const overlay = $('sCartOverlay');
    if (!drawer) return;
    const open = drawer.classList.toggle('open');
    overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    // Close account if open
    if (open) closeAccount();
  }

  /* ─────────────── WISHLIST ──────────────────────────── */
  function loadWishlist() {
    try { wishlist = JSON.parse(localStorage.getItem('atec_wishlist') || '[]'); } catch(_) { wishlist = []; }
  }
  function saveWishlist() {
    try { localStorage.setItem('atec_wishlist', JSON.stringify(wishlist)); } catch(_) {}
  }
  function toggleWish(id, btn) {
    const idx = wishlist.findIndex(w => w.id === id);
    if (idx >= 0) {
      wishlist.splice(idx, 1);
      btn.classList.remove('active');
      btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      toast('<i class="fa-regular fa-heart"></i> Quitado de sugerencias');
    } else {
      const p = PRODUCTS.find(x => x.id === id);
      if (p) wishlist.push({ id: p.id, name: p.name, price: p.price, icon: p.icon });
      btn.classList.add('active');
      btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      toast('<i class="fa-solid fa-heart" style="color:var(--violet)"></i> Guardado en sugerencias');
    }
    saveWishlist();
    renderWishlist();
  }
  function renderWishlist() {
    const el = $('wishlistList');
    if (!el) return;
    if (!wishlist.length) {
      el.innerHTML = `<div class="orders-guest">
        <i class="fa-solid fa-heart-crack fa-3x" style="color:var(--text-muted);margin-bottom:1rem"></i>
        <p>Aún no guardaste ningún producto.</p>
        <p style="color:var(--text-muted);font-size:0.82rem;margin-top:0.5rem">
          Hacé click en <i class="fa-solid fa-heart" style="color:var(--violet)"></i> en cualquier producto.
        </p>
      </div>`;
      return;
    }
    el.innerHTML = wishlist.map(w => `
      <div class="s-cart-item">
        <div class="sci-icon"><i class="fa-solid ${w.icon || 'fa-box'}"></i></div>
        <div class="sci-info">
          <div class="sci-name">${esc(w.name)}</div>
          <div class="sci-price">$${w.price}</div>
        </div>
        <div class="sci-controls">
          <button class="btn btn-outline" style="padding:0.35rem 0.75rem;font-size:0.75rem"
                  onclick="StoreApp.addToCart('${esc(w.name)}',${w.price},'')">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  /* ─────────────── ACCOUNT MODAL ─────────────────────── */
  function openAccount(tab) {
    // Close cart if open
    $('sCartDrawer')?.classList.remove('open');
    $('sCartOverlay')?.classList.remove('open');

    $('accountOverlay').classList.add('open');
    $('accountModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (tab) switchTab(tab);
    if (tab === 'wishlist') renderWishlist();
    if (tab === 'checkout') renderCheckout();
  }

  function closeAccount() {
    $('accountOverlay')?.classList.remove('open');
    $('accountModal')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function switchTab(name, btn) {
    // Update tabs
    document.querySelectorAll('.acc-tab').forEach(t => t.classList.remove('active'));
    const target = btn || document.querySelector(`.acc-tab[data-tab="${name}"]`);
    if (target) target.classList.add('active');

    // Update panels
    document.querySelectorAll('.acc-panel').forEach(p => p.classList.remove('active'));
    const panel = $(`tab-${name}`);
    if (panel) panel.classList.add('active');

    if (name === 'wishlist') renderWishlist();
    if (name === 'checkout') renderCheckout();
  }

  function renderCheckout() {
    const el = $('checkoutItems');
    const totalEl = $('checkoutTotal');
    if (!el) return;
    if (!cart.length) {
      el.innerHTML = '<p style="color:var(--text-muted);text-align:center">Tu carrito está vacío.</p>';
      if (totalEl) totalEl.innerHTML = '';
      return;
    }
    el.innerHTML = cart.map(i => `
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid rgba(168,85,247,0.1);font-size:0.85rem">
        <span>${esc(i.name)} × ${i.qty}</span>
        <span style="font-family:'Orbitron',monospace;color:var(--cyan)">$${(i.price * i.qty).toLocaleString('en-US')}</span>
      </div>`).join('');
    const total = cart.reduce((s,i) => s+i.price*i.qty, 0);
    if (totalEl) totalEl.innerHTML = `<span>Total</span><span>$${total.toLocaleString('en-US')}</span>`;
  }

  /* ─────────────── AUTH HANDLERS (visual) ─────────────── */
  function handleLogin(e) {
    e.preventDefault();
    // TODO: conectar con Clerk real (ver TASKS.txt U-05)
    toast('<i class="fa-solid fa-circle-check"></i> Login con Clerk próximamente (ver TASKS.txt)');
    closeAccount();
  }

  function handleRegister(e) {
    e.preventDefault();
    const pass = $('regPass')?.value || '';
    const conf = $('regPassConf')?.value || '';
    if (pass !== conf) {
      toast('<i class="fa-solid fa-circle-xmark" style="color:#ef4444"></i> Las contraseñas no coinciden');
      return;
    }
    // TODO: conectar con Clerk real
    toast('<i class="fa-solid fa-circle-check"></i> Registro con Clerk próximamente (ver TASKS.txt)');
    closeAccount();
  }

  function socialLogin(provider) {
    toast(`<i class="fa-brands fa-${provider}"></i> OAuth con Clerk · Próximamente`);
  }

  function togglePass(id, btn) {
    const input = $(id);
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = `<i class="fa-solid fa-eye${show ? '-slash' : ''}"></i>`;
  }

  // Password strength indicator
  document.addEventListener('DOMContentLoaded', () => {
    const passInput = $('regPass');
    const strength  = $('passStrength');
    if (!passInput || !strength) return;
    passInput.addEventListener('input', () => {
      const v = passInput.value;
      let bars = '<div class="pass-strength-bar"></div>'.repeat(4);
      strength.innerHTML = bars;
      let cls = '';
      if (v.length >= 12 && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^a-zA-Z0-9]/.test(v)) cls = 'strength-strong';
      else if (v.length >= 8) cls = 'strength-medium';
      else if (v.length >= 1) cls = 'strength-weak';
      strength.className = `pass-strength ${cls}`;
    });
  });

  /* ─────────────── TOAST ─────────────────────────────── */
  let toastTimer;
  function toast(msg) {
    const el = $('storeToast');
    if (!el) return;
    clearTimeout(toastTimer);
    el.innerHTML = msg;
    el.classList.add('show');
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  /* ─────────────── UTILS ─────────────────────────────── */
  function esc(s) {
    if (typeof s !== 'string') return String(s);
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ─────────────── PUBLIC API ─────────────────────────── */
  return {
    init, filterCat, filterPrice, applyFilters, sort,
    search, openProduct, closeProduct,
    addToCart, removeFromCart, removeAll, toggleCart,
    toggleWish,
    openAccount, closeAccount, switchTab,
    handleLogin, handleRegister, socialLogin, togglePass,
  };
})();

// Kick off
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', StoreApp.init);
} else {
  StoreApp.init();
}
