// Admin demo - vanilla JS, mock data, tab switching.
// All HTML built from in-file constants. No user input is ever interpolated,
// so the HTML-string injection below is XSS-safe by construction.
// We use Range.createContextualFragment + replaceChildren for the same effect.
(() => {

  // -------- Tab switching --------
  const tabs = document.querySelectorAll('.admin-tab');
  const panels = document.querySelectorAll('.admin-panel');
  const setActive = (tabName) => {
    tabs.forEach(t => {
      const isActive = t.dataset.tab === tabName;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === tabName));
    if (history.replaceState) history.replaceState(null, '', '#' + tabName);
  };
  tabs.forEach(t => t.addEventListener('click', () => setActive(t.dataset.tab)));
  if (location.hash) {
    const tab = location.hash.slice(1);
    if (document.querySelector('.admin-tab[data-tab="' + tab + '"]')) setActive(tab);
  }

  // -------- Mock data --------
  const ORDERS = [
    { id: 'ATG-2418', name: 'Jamie L.', items: '2x Mocha Choca Latte, 1x Cinnamon Scone', total: 16.50, status: 'pending', mins: 1 },
    { id: 'ATG-2417', name: 'Devon S.', items: 'Almond Joy To The World, Breakfast Sandwich', total: 11.50, status: 'brewing', mins: 3 },
    { id: 'ATG-2416', name: 'Scott J.', items: '2x Cold Brew, BLT, Chicken Salad', total: 19.00, status: 'brewing', mins: 5 },
    { id: 'ATG-2415', name: 'Maya R.', items: 'Italian Soda (raspberry), Cupcake', total: 7.50, status: 'ready', mins: 7 },
    { id: 'ATG-2414', name: 'Walk-in', items: 'Americano Band, Waffle (Elvis)', total: 11.50, status: 'ready', mins: 8 },
    { id: 'ATG-2413', name: 'Ben K.', items: 'Fleetwood Macchiato, Cinnamon Scone', total: 9.00, status: 'picked', mins: 14 },
    { id: 'ATG-2412', name: 'Lena T.', items: 'Chai Tea Latte, Chocolate Chip Scone', total: 9.00, status: 'picked', mins: 16 },
    { id: 'ATG-2411', name: 'Walk-in', items: '2x Kid Lemonade, Sandwich', total: 10.50, status: 'picked', mins: 22 },
    { id: 'ATG-2410', name: 'Kevin M.', items: 'Duke Of Earl, Cupcake', total: 7.50, status: 'picked', mins: 28 },
    { id: 'ATG-2409', name: 'Ali B.', items: 'Summer Breeze, Chicken Salad', total: 11.00, status: 'picked', mins: 35 },
    { id: 'ATG-2408', name: 'Walk-in', items: 'Mocha Choca Latte', total: 5.50, status: 'picked', mins: 41 },
    { id: 'ATG-2407', name: 'Pat D.', items: 'Cold Brew w/ Cold Foam, Scone', total: 9.50, status: 'picked', mins: 47 },
  ];

  const TOP_TODAY = [
    { name: 'Mocha Choca Latte, Ya Ya', count: 22, revenue: 121 },
    { name: 'Fleetwood Macchiato', count: 18, revenue: 99 },
    { name: 'Cold Brew w/ Cold Foam', count: 14, revenue: 84 },
    { name: 'Cupcake (cherry)', count: 12, revenue: 36 },
    { name: 'Chicken Salad', count: 11, revenue: 71.50 },
  ];

  const TOP_30 = [
    { name: 'Mocha Choca Latte, Ya Ya', count: 612, revenue: 3366 },
    { name: 'Fleetwood Macchiato', count: 488, revenue: 2684 },
    { name: 'Americano Band', count: 402, revenue: 2211 },
    { name: 'Cinnamon Scone', count: 360, revenue: 1260 },
    { name: 'Almond Joy To The World', count: 312, revenue: 1716 },
    { name: 'Cold Brew w/ Cold Foam', count: 298, revenue: 1788 },
    { name: 'BLT', count: 244, revenue: 1464 },
  ];

  const MENU = {
    playlist: [
      { name: 'Mocha Choca Latte, Ya Ya', desc: 'Mocha latte. Ghirardelli chocolate, choice of milk.', price: 5.50, on: true },
      { name: 'Fleetwood Macchiato',     desc: 'Caramel macchiato. Vanilla, two shots.',                price: 5.50, on: true },
      { name: 'Almond Joy To The World', desc: 'Chocolate and coconut latte.',                          price: 5.50, on: true },
      { name: 'Happy Together',          desc: 'Chocolate and caramel mocha.',                          price: 5.50, on: true },
      { name: 'Cinnamon Girl',           desc: 'Cinnamon latte.',                                       price: 5.50, on: true },
      { name: 'Americano Band',          desc: 'Up to four shots of espresso and water.',               price: 5.50, on: true },
      { name: 'Go Your Own Way',         desc: 'Build your own. 11 syrup options.',                     price: 5.50, on: true },
      { name: 'Chai Tea Latte',          desc: 'Chai concentrate, choice of milk.',                     price: 5.50, on: true },
    ],
    food: [
      { name: 'Scones',                desc: 'Chocolate chip or cinnamon.',                             price: 3.50, on: true },
      { name: 'Waffles',               desc: 'Elvis or Still The One.',                                 price: 6.00, on: true },
      { name: 'Breakfast Sandwiches',  desc: 'Eggs and cheese on croissant or English muffin.',         price: 6.00, on: true },
      { name: 'Cupcakes',              desc: 'Rotating weekly. This week: cherry buttercream.',         price: 3.00, on: true },
      { name: 'Chicken Salad',         desc: 'Fruit and nut or traditional. Croissant +1.',             price: 6.50, on: true },
      { name: 'BLT',                   desc: 'Bacon, lettuce, tomato. Croissant +1.',                   price: 6.00, on: true },
    ],
    others: [
      { name: 'Italian Soda',          desc: '8 flavors. Splash of milk and whipped cream optional.',   price: 4.50, on: true },
      { name: 'Summer Breeze',         desc: 'Lemonade plus passion tea plus strawberry.',              price: 4.50, on: true },
      { name: 'Hot Tea',               desc: 'Earl Grey, English Breakfast, lemon ginger.',             price: 3.50, on: true },
      { name: 'Duke Of Earl',          desc: 'London Fog. Earl Grey plus vanilla steamed milk.',        price: 4.50, on: true },
      { name: 'Cold Brew w/ Cold Foam',desc: 'Slow-steeped plus house cold foam.',                      price: 6.00, on: true },
      { name: 'Kids Drinks',           desc: 'Lemonade or chocolate milk.',                             price: 2.25, on: true },
      { name: 'Extra Espresso Shot',   desc: 'Add a shot to any drink.',                                price: 1.00, on: true },
    ],
  };

  const EVENTS = [
    { day: 14, mo: 'May', name: 'Open Mic - Singer-Songwriter Night',          time: '7:00 - 9:30 PM',     host: 'Hosted by The Stage Crew',     status: 'live' },
    { day: 17, mo: 'May', name: 'Single-Origin Tasting - Ethiopia Yirgacheffe',time: '10:00 - 11:30 AM',   host: '$8 - Limited 12 seats',        status: 'live' },
    { day: 21, mo: 'May', name: 'Acoustic Tuesday - Bring an Axe',             time: '6:00 - 8:00 PM',     host: 'Free - BYO instrument',        status: 'live' },
    { day: 25, mo: 'May', name: 'Latte Art Workshop',                          time: '9:00 - 11:00 AM',    host: '$25 - Includes drink',         status: 'scheduled' },
    { day:  4, mo: 'Jun', name: 'Vinyl Sunday - Side B',                       time: '11:00 AM - 4:00 PM', host: 'Bring a record - play it on the bar', status: 'scheduled' },
    { day:  8, mo: 'Jun', name: 'Closed for Private Event',                    time: 'All day',            host: 'Westside HS reunion',          status: 'draft' },
  ];

  const CUSTOMERS = [
    { name: 'Scott Jackson',  email: 'scott.j@gmail.com',   visits: 18, spend: '$842',   fav: 'Mocha Choca Latte',         status: 'live' },
    { name: 'Devon Singh',    email: 'dsingh@hey.com',       visits: 16, spend: '$684',   fav: 'Fleetwood Macchiato',       status: 'live' },
    { name: 'Maya Rivera',    email: 'maya@rivera.studio',   visits: 14, spend: '$521',   fav: 'Italian Soda - raspberry',  status: 'live' },
    { name: 'Ben Kowalski',   email: 'ben.k@gmail.com',      visits: 12, spend: '$478',   fav: 'Cold Brew w/ Cold Foam',    status: 'live' },
    { name: 'Lena Tang',      email: 'lena@design.co',        visits: 11, spend: '$402',   fav: 'Chai Tea Latte',            status: 'live' },
    { name: 'Pat Donovan',    email: 'pat.donovan@me.com',    visits: 10, spend: '$387',   fav: 'Americano Band',            status: 'live' },
    { name: 'Ali Bhatt',      email: 'ali@bhatt.law',         visits:  9, spend: '$341',   fav: 'Summer Breeze',             status: 'live' },
    { name: 'Kevin Morrison', email: 'kevin.m@outlook.com',   visits:  9, spend: '$298',   fav: 'Duke Of Earl',              status: 'live' },
    { name: 'Jamie Liu',      email: 'jamie@liu.dev',         visits:  8, spend: '$272',   fav: 'Mocha Choca Latte',         status: 'live' },
    { name: 'Walk-ins',       email: '-',                     visits: 84, spend: '$1,420', fav: '-',                          status: 'scheduled' },
  ];

  const INVENTORY = [
    { item: 'Espresso beans - Direct trade blend', on: '12 lb',     reorder: '5 lb',     vendor: 'Ipsento Roasters', status: 'ok'  },
    { item: 'Whole milk',                         on: '4 gal',     reorder: '6 gal',     vendor: 'Smith Dairy',      status: 'low' },
    { item: 'Oat milk',                           on: '14 cartons',reorder: '8 cartons', vendor: 'Oatly',            status: 'ok'  },
    { item: 'Almond milk',                        on: '11 cartons',reorder: '6 cartons', vendor: 'Califia',          status: 'ok'  },
    { item: 'Vanilla syrup',                      on: '7 bottles', reorder: '3 bottles', vendor: 'Monin',            status: 'ok'  },
    { item: 'Cherry syrup',                       on: '2 bottles', reorder: '3 bottles', vendor: 'Monin',            status: 'low' },
    { item: 'Croissants (frozen)',                on: '38 ct',     reorder: '24 ct',     vendor: 'Bay Bakery',       status: 'ok'  },
    { item: 'Eggs (large)',                       on: '4 dozen',   reorder: '6 dozen',   vendor: 'Local farm',       status: 'low' },
    { item: 'Bacon',                              on: '8 lb',      reorder: '4 lb',      vendor: 'Local farm',       status: 'ok'  },
    { item: 'Chocolate powder',                   on: '6 cans',    reorder: '3 cans',    vendor: 'Ghirardelli',      status: 'ok'  },
  ];

  const STAFF = [
    { name: 'Maria Chen',   role: 'Lead Barista', shifts: ['7-3', '7-3', 'OFF', '7-3', '7-3', '8-2', 'OFF'] },
    { name: 'Jordan Reese', role: 'Barista',      shifts: ['OFF', '11-7', '11-7', '11-7', 'OFF', '11-5', '8-3'] },
    { name: 'Sam Park',     role: 'Barista PM',   shifts: ['3-7', '3-7', '3-7', 'OFF', '3-7', 'OFF', '11-5'] },
    { name: 'Tory Webb',    role: 'Kitchen',      shifts: ['7-3', '7-3', '7-3', '7-3', 'OFF', '8-2', 'OFF'] },
    { name: 'Drew Patel',   role: 'Kitchen PM',   shifts: ['OFF', 'OFF', '11-7', '11-7', '11-7', '11-5', '11-5'] },
    { name: 'Rae Lopez',    role: 'Floor',        shifts: ['7-3', 'OFF', '7-3', '7-3', '7-3', 'OFF', 'OFF'] },
  ];

  const HOURS = [
    ['Mon', '7:00 AM - 7:00 PM'],
    ['Tue', '7:00 AM - 7:00 PM'],
    ['Wed', '7:00 AM - 7:00 PM'],
    ['Thu', '7:00 AM - 8:00 PM'],
    ['Fri', '7:00 AM - 9:00 PM'],
    ['Sat', '8:00 AM - 9:00 PM'],
    ['Sun', '8:00 AM - 4:00 PM'],
  ];

  const REV_7 = [
    { d: 'Wed', v: 1418 },
    { d: 'Thu', v: 1532 },
    { d: 'Fri', v: 2104 },
    { d: 'Sat', v: 2184 },
    { d: 'Sun', v: 1648 },
    { d: 'Mon', v: 514  },
    { d: 'Tue', v: 1847 },
  ];

  const REV_30 = (() => {
    const days = [];
    const base = 1500;
    for (let i = 30; i > 0; i--) {
      const dow = (new Date(2026, 4, 6 - i + 1)).getDay();
      const factor = [0.9, 0.55, 0.85, 0.92, 1.05, 1.4, 1.3][dow] || 1;
      const noise = 0.85 + ((i * 13) % 30) / 100;
      days.push({ d: i, v: Math.round(base * factor * noise) });
    }
    return days;
  })();

  const HEATMAP = [
    { day: 'Mon', vol: 22 },
    { day: 'Tue', vol: 31 },
    { day: 'Wed', vol: 28 },
    { day: 'Thu', vol: 38 },
    { day: 'Fri', vol: 56 },
    { day: 'Sat', vol: 72 },
    { day: 'Sun', vol: 48 },
  ];

  // -------- Helpers --------
  const fmt$ = n => '$' + (typeof n === 'number' ? n.toFixed(2) : n);

  // Render an HTML string into element #id, replacing existing children.
  // Uses Range.createContextualFragment so the generated nodes inherit
  // the element's parent context (correct for tbody, etc.).
  const render = (id, html) => {
    const el = document.getElementById(id);
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
    const range = document.createRange();
    range.selectNodeContents(el);
    el.appendChild(range.createContextualFragment(html));
  };

  const orderRow = (o, withAction) =>
    '<tr>' +
      '<td class="order-num">' + o.id + '</td>' +
      '<td>' + o.name + '</td>' +
      '<td>' + o.items + '</td>' +
      '<td class="total">' + fmt$(o.total) + '</td>' +
      '<td><span class="status ' + o.status + '">' + o.status + '</span></td>' +
      '<td>' + o.mins + 'm ago</td>' +
      (withAction ? '<td><button class="admin-row-action">View</button></td>' : '') +
    '</tr>';

  // -------- Renderers --------
  const renderDashboard = () => {
    const max = Math.max.apply(null, REV_7.map(d => d.v));
    render('dashBars', REV_7.map(d =>
      '<div style="height:' + Math.round((d.v / max) * 100) + '%" data-label="' + d.d + '" data-value="' + fmt$(d.v) + '"></div>'
    ).join(''));
    render('dashTopItems', TOP_TODAY.map((i, idx) =>
      '<li><span><span class="rank">' + (idx + 1) + '</span>' + i.name + '</span><span>' + i.count + ' - ' + fmt$(i.revenue) + '</span></li>'
    ).join(''));
    const live = ORDERS.filter(o => ['pending', 'brewing', 'ready'].indexOf(o.status) >= 0);
    render('dashOrders', live.map(o => orderRow(o, false)).join(''));
  };

  const renderOrders = () => {
    render('ordersTable', ORDERS.map(o => orderRow(o, true)).join(''));
  };

  const renderMenu = (section) => {
    const items = MENU[section || 'playlist'] || [];
    render('menuTable', items.map(i =>
      '<tr>' +
        '<td><strong>' + i.name + '</strong></td>' +
        '<td style="color: var(--text-dim); font-size: 0.78rem;">' + i.desc + '</td>' +
        '<td class="total">' + fmt$(i.price) + '</td>' +
        '<td><span class="status ' + (i.on ? 'ok' : 'draft') + '">' + (i.on ? 'Available' : 'Hidden') + '</span></td>' +
        '<td><button class="admin-row-action">Edit</button></td>' +
      '</tr>'
    ).join(''));
  };
  document.querySelectorAll('#menuSections button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#menuSections button').forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active');
      renderMenu(b.dataset.section);
    });
  });

  const renderAnalytics = () => {
    const max = Math.max.apply(null, REV_30.map(d => d.v));
    render('anaBars', REV_30.map(d =>
      '<div style="height:' + Math.round((d.v / max) * 100) + '%" data-label="' + d.d + '" data-value="' + fmt$(d.v) + '"></div>'
    ).join(''));
    render('anaTopItems', TOP_30.map((i, idx) =>
      '<li><span><span class="rank">' + (idx + 1) + '</span>' + i.name + '</span><span>' + i.count + ' - ' + fmt$(i.revenue) + '</span></li>'
    ).join(''));
    const maxVol = Math.max.apply(null, HEATMAP.map(h => h.vol));
    render('anaHeatmap', HEATMAP.map(h =>
      '<div style="background: rgba(244, 194, 71, ' + (h.vol / maxVol).toFixed(2) + ')" data-label="' + h.day + ' - ' + h.vol + '"></div>'
    ).join(''));
  };

  const renderEvents = () => {
    render('eventsGrid', EVENTS.map(e =>
      '<article class="admin-event">' +
        '<div class="admin-event-date"><div class="day">' + e.day + '</div><div class="mo">' + e.mo + '</div></div>' +
        '<div class="admin-event-body">' +
          '<h4>' + e.name + '</h4>' +
          '<p>' + e.host + '</p>' +
          '<div class="meta"><span class="status ' + e.status + '">' + e.status + '</span> - ' + e.time + '</div>' +
        '</div>' +
      '</article>'
    ).join(''));
  };

  const renderCustomers = () => {
    render('customersTable', CUSTOMERS.map(c =>
      '<tr>' +
        '<td><strong>' + c.name + '</strong></td>' +
        '<td style="color: var(--text-dim);">' + c.email + '</td>' +
        '<td>' + c.visits + '</td>' +
        '<td class="total">' + c.spend + '</td>' +
        '<td>' + c.fav + '</td>' +
        '<td><span class="status ' + c.status + '">' + (c.status === 'live' ? 'Member' : 'Anon') + '</span></td>' +
      '</tr>'
    ).join(''));
  };

  const renderInventory = () => {
    render('inventoryTable', INVENTORY.map(i =>
      '<tr>' +
        '<td><strong>' + i.item + '</strong></td>' +
        '<td>' + i.on + '</td>' +
        '<td style="color: var(--text-dim);">' + i.reorder + '</td>' +
        '<td style="color: var(--text-dim);">' + i.vendor + '</td>' +
        '<td><span class="status ' + i.status + '">' + (i.status === 'low' ? 'Reorder' : 'Stocked') + '</span></td>' +
      '</tr>'
    ).join(''));
  };

  const renderStaff = () => {
    render('staffTable', STAFF.map(s =>
      '<tr>' +
        '<td><strong>' + s.name + '</strong></td>' +
        '<td style="color: var(--text-dim); font-size: 0.78rem;">' + s.role + '</td>' +
        s.shifts.map(sh => '<td style="font-family: var(--font-mono); font-size: 0.78rem; color: ' + (sh === 'OFF' ? 'var(--text-faint)' : 'var(--ink)') + ';">' + sh + '</td>').join('') +
      '</tr>'
    ).join(''));
  };

  const renderHours = () => {
    render('settingsHours', HOURS.map(h => '<div><span>' + h[0] + '</span><span>' + h[1] + '</span></div>').join(''));
  };

  renderDashboard();
  renderOrders();
  renderMenu();
  renderAnalytics();
  renderEvents();
  renderCustomers();
  renderInventory();
  renderStaff();
  renderHours();
})();
