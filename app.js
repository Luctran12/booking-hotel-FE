/**
 * Stayora Mockup UI Application Logic
 * Pure JavaScript - Zero dependencies
 */

// Mock Data
const hotelsData = [
  {
    id: 'azure-bay',
    name: 'Azure Bay Resort',
    city: 'Da Nang, Vietnam',
    rating: 4.9,
    reviews: 326,
    price: 138,
    basePrice: 120,
    feePercent: 15,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85',
    tags: ['Beachfront', 'Pool', 'Breakfast'],
    description: 'A calm coastal retreat with sunrise views, thoughtful service, and modern Vietnamese character. Step into airy rooms, take a dip in the infinity pool, or linger over locally inspired dishes by the water.'
  },
  {
    id: 'lantern',
    name: 'The Lantern Hoi An',
    city: 'Hoi An, Vietnam',
    rating: 4.8,
    reviews: 208,
    price: 106,
    basePrice: 96,
    feePercent: 10,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85',
    tags: ['Old Town', 'Spa', 'Garden'],
    description: 'A graceful hideaway moments from Hoi An’s lantern-lit historic streets. Surrounded by lush gardens with authentic spa treatments and artisanal dining.'
  },
  {
    id: 'urban',
    name: 'Urban Nest Saigon',
    city: 'Ho Chi Minh City, Vietnam',
    rating: 4.6,
    reviews: 156,
    price: 80,
    basePrice: 72,
    feePercent: 11,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85',
    tags: ['City view', 'Gym', 'Workspace'],
    description: 'Effortless stays in the middle of the city’s most vibrant district. High-speed fiber, contemporary minimalist styling, and panoramic city views.'
  }
];

const bookingsData = [
  {
    id: 'STY-48291',
    hotel: 'Azure Bay Resort',
    guest: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '+84 912 345 678',
    dates: '18–21 Oct 2026',
    room: 'Ocean Suite',
    status: 'Confirmed',
    payment: 'Paid',
    total: '$414.00',
    base: '$360.00',
    fee: '$54.00 (15%)'
  },
  {
    id: 'STY-47520',
    hotel: 'The Lantern Hoi An',
    guest: 'Jamie Lee',
    email: 'jamie@example.com',
    phone: '+84 987 654 321',
    dates: '10–12 Oct 2026',
    room: 'Garden Deluxe',
    status: 'Completed',
    payment: 'Paid',
    total: '$318.00',
    base: '$288.00',
    fee: '$30.00 (10%)'
  }
];

// Router Implementation
function navigate(route) {
  window.location.hash = route;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const rootRoute = parts[0];

  // Update active view section
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Top role button state
  document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
  const guestHeader = document.getElementById('guest-header');

  if (['owner', 'staff', 'admin'].includes(rootRoute)) {
    guestHeader.style.display = 'none';
    const activeBtn = document.querySelector(`.role-btn[data-role="${rootRoute}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const portalSec = document.getElementById('view-portal');
    if (portalSec) {
      portalSec.classList.add('active');
      renderPortal(rootRoute, parts[1] || 'dashboard');
    }
  } else {
    guestHeader.style.display = 'block';
    const guestBtn = document.querySelector(`.role-btn[data-role="guest"]`);
    if (guestBtn) guestBtn.classList.add('active');

    const targetView = document.getElementById(`view-${rootRoute}`) || document.getElementById('view-home');
    if (targetView) targetView.classList.add('active');

    if (rootRoute === 'hotels' && parts[1]) {
      renderHotelDetail(parts[1]);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initHotels();
  initBookingFlow();
  handleRoute();
});

// Render Home Hotel Cards
function initHotels() {
  const container = document.getElementById('home-hotel-grid');
  if (!container) return;

  container.innerHTML = hotelsData.map(hotel => `
    <div class="card">
      <div class="card-img-wrap">
        <img class="card-img" src="${hotel.image}" alt="${hotel.name}" loading="lazy">
        <span class="card-badge">Featured Stay</span>
        <button class="card-favorite" onclick="toggleFavorite(this)"><span class="material-symbols-outlined">favorite</span></button>
      </div>
      <div class="card-body">
        <div class="card-header-flex">
          <div>
            <h3 class="card-title">${hotel.name}</h3>
            <p class="card-location"><span class="material-symbols-outlined" style="font-size:16px;">location_on</span> ${hotel.city}</p>
          </div>
        </div>
        <div class="card-rating">
          <span class="material-symbols-outlined rating-star" style="font-size:18px;">star</span>
          <span class="rating-score">${hotel.rating}</span>
          <span class="rating-count">(${hotel.reviews} reviews)</span>
        </div>
        <div class="card-tags">
          ${hotel.tags.map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
        <div class="card-footer-flex">
          <div>
            <p class="card-price-label">from · fee included</p>
            <p class="card-price-val">$${hotel.price} <span>/ night</span></p>
          </div>
          <button class="btn btn-outline-primary" onclick="navigate('hotels/${hotel.id}')">View stay</button>
        </div>
      </div>
    </div>
  `).join('');
}

// State Variables for Interactive Mockup
let currentGuests = 2;
let currentRooms = 1;
let currentPriceMax = 150;
let currentSearchMode = 'results';

// Guest Popover Management
function toggleGuestsPopover(popoverId, event) {
  if (event) event.stopPropagation();
  const popover = document.getElementById(popoverId);
  if (!popover) return;
  const isOpen = popover.classList.contains('open');
  closeAllGuestsPopovers();
  if (!isOpen) {
    popover.classList.add('open');
  }
}

function closeAllGuestsPopovers() {
  document.querySelectorAll('.guests-popover').forEach(p => p.classList.remove('open'));
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.guests-popover') && !e.target.closest('.search-field')) {
    closeAllGuestsPopovers();
  }
});

function adjustCount(type, delta) {
  if (type === 'guests') {
    currentGuests = Math.max(1, Math.min(12, currentGuests + delta));
  } else if (type === 'rooms') {
    currentRooms = Math.max(1, Math.min(6, currentRooms + delta));
  }

  const gText = `${currentGuests} guest${currentGuests > 1 ? 's' : ''}`;
  const rText = `${currentRooms} room${currentRooms > 1 ? 's' : ''}`;
  const summary = `${gText} · ${rText}`;

  const homeLabel = document.getElementById('home-guests-label');
  if (homeLabel) homeLabel.textContent = summary;

  const searchLabel = document.getElementById('search-guests-label');
  if (searchLabel) searchLabel.textContent = summary;

  const descGuests = document.getElementById('search-desc-guests');
  if (descGuests) descGuests.textContent = summary;

  const valGHome = document.getElementById('val-guests');
  if (valGHome) valGHome.textContent = currentGuests;

  const valGSearch = document.getElementById('val-guests-search');
  if (valGSearch) valGSearch.textContent = currentGuests;

  const valRHome = document.getElementById('val-rooms');
  if (valRHome) valRHome.textContent = currentRooms;

  const valRSearch = document.getElementById('val-rooms-search');
  if (valRSearch) valRSearch.textContent = currentRooms;
}

function syncSearchDates(fromId, toId) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  if (!fromEl || !toEl) return;
  if (fromEl.value >= toEl.value) {
    const nextDay = new Date(fromEl.value);
    nextDay.setDate(nextDay.getDate() + 2);
    toEl.value = nextDay.toISOString().split('T')[0];
  }
}

function onPriceSliderChange(val) {
  currentPriceMax = parseInt(val, 10);
  const display = document.getElementById('filter-price-display');
  if (display) {
    display.textContent = `$60 — $${val} / night`;
  }
  renderSearchResults(currentSearchMode);
}

function resetPriceFilter() {
  const slider = document.getElementById('filter-price-slider');
  if (slider) {
    slider.value = 250;
    onPriceSliderChange(250);
  }
}

// Search Results State & Filters
function initSearch() {
  renderSearchResults('results');
}

function setSearchMode(mode) {
  document.querySelectorAll('.preview-mode-btn').forEach(b => b.classList.remove('btn-primary'));
  const btn = document.querySelector(`.preview-mode-btn[data-mode="${mode}"]`);
  if (btn) btn.classList.add('btn-primary');

  renderSearchResults(mode);
}

function renderSearchResults(mode) {
  currentSearchMode = mode;
  const container = document.getElementById('search-results-list');
  if (!container) return;

  if (mode === 'loading') {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--primary); animation: spin 1s infinite linear;">progress_activity</span>
        <p style="margin-top: 16px; font-weight: 700; color: var(--text-secondary);">Searching stays in Da Nang...</p>
      </div>
      <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
    `;
    return;
  }

  if (mode === 'empty') {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 60px 20px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--warning);">search_off</span>
        <h3 style="margin-top: 14px; font-size: 18px; font-weight: 800;">No stays match these filters</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your dates, budget range, or clearing amenities.</p>
        <button class="btn btn-outline" style="margin-top: 20px;" onclick="setSearchMode('results')">Reset filters</button>
      </div>
    `;
    return;
  }

  if (mode === 'error') {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 60px 20px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error);">error</span>
        <h3 style="margin-top: 14px; font-size: 18px; font-weight: 800;">We couldn't load stays</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">This is a UI mockup error state. Please retry to recover.</p>
        <button class="btn btn-primary" style="margin-top: 20px;" onclick="setSearchMode('results')">Try again</button>
      </div>
    `;
    return;
  }

  // Filter by price range
  const filteredHotels = hotelsData.filter(h => h.price <= currentPriceMax);
  if (filteredHotels.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 60px 20px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--warning);">price_change</span>
        <h3 style="margin-top: 14px; font-size: 18px; font-weight: 800;">No stays available up to $${currentPriceMax}/night</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Please drag the slider to increase your budget or reset filter.</p>
        <button class="btn btn-outline" style="margin-top: 20px;" onclick="resetPriceFilter()">Reset price filter</button>
      </div>
    `;
    return;
  }

  // Normal results list
  container.innerHTML = filteredHotels.map(hotel => `
    <div class="card card-horizontal" style="margin-bottom: 20px;">
      <div class="card-img-wrap">
        <img class="card-img" src="${hotel.image}" alt="${hotel.name}">
        <span class="card-badge">Instant confirmation</span>
      </div>
      <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="card-header-flex">
            <div>
              <h3 class="card-title">${hotel.name}</h3>
              <p class="card-location"><span class="material-symbols-outlined" style="font-size:16px;">location_on</span> ${hotel.city} · 4.2 km from center</p>
            </div>
            <button class="card-favorite" style="position:static;" onclick="toggleFavorite(this)"><span class="material-symbols-outlined">favorite</span></button>
          </div>
          <div class="card-rating">
            <span class="material-symbols-outlined rating-star" style="font-size:18px;">star</span>
            <span class="rating-score">${hotel.rating}</span>
            <span class="rating-count">(${hotel.reviews} reviews)</span>
          </div>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin: 8px 0;">${hotel.description}</p>
          <div class="card-tags">
            ${hotel.tags.map(t => `<span class="chip">${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer-flex">
          <div>
            <p class="card-price-label">from · platform fee included</p>
            <p class="card-price-val">$${hotel.price} <span>/ night</span></p>
          </div>
          <button class="btn btn-primary" onclick="navigate('hotels/${hotel.id}')">Select room</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Hotel Detail Renderer
function renderHotelDetail(hotelId) {
  const hotel = hotelsData.find(h => h.id === hotelId) || hotelsData[0];
  document.getElementById('detail-hotel-name').textContent = hotel.name;
  document.getElementById('detail-hotel-location').innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">location_on</span> ${hotel.city} · 4.2 km from city center`;
  document.getElementById('detail-hotel-desc').textContent = hotel.description;
  document.getElementById('detail-hotel-price').textContent = `$${hotel.price}`;
  document.getElementById('detail-main-img').src = hotel.image;
  const targetView = document.getElementById('view-hotels');
  if (targetView) targetView.classList.add('active');
}

// Multi-step Booking Flow
let bookingStep = 1;
function initBookingFlow() {
  goToStep(1);
}

function goToStep(step) {
  bookingStep = step;
  document.querySelectorAll('.step-item').forEach(item => {
    const s = parseInt(item.getAttribute('data-step'), 10);
    item.classList.remove('active', 'completed');
    if (s === step) item.classList.add('active');
    else if (s < step) item.classList.add('completed');
  });

  document.querySelectorAll('.booking-step-content').forEach(c => c.style.display = 'none');
  const activeContent = document.getElementById(`booking-step-${step}`);
  if (activeContent) activeContent.style.display = 'block';

  window.scrollTo({ top: 100, behavior: 'smooth' });
}

function processPayment() {
  const payBtn = document.getElementById('btn-pay-now');
  payBtn.disabled = true;
  payBtn.innerHTML = `<span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">progress_activity</span> Processing mock card...`;

  setTimeout(() => {
    payBtn.disabled = false;
    payBtn.innerHTML = `Pay $414.00`;
    goToStep(4);
  }, 1200);
}

// Booking Lookup
function lookupBooking() {
  const code = document.getElementById('lookup-code').value.trim();
  const resBox = document.getElementById('lookup-result');
  const found = bookingsData.find(b => b.id.toLowerCase() === code.toLowerCase()) || bookingsData[0];

  resBox.style.display = 'block';
  resBox.innerHTML = `
    <div class="alert alert-success">
      <span class="material-symbols-outlined">check_circle</span>
      <div>
        <strong>Booking Found: ${found.id}</strong>
        <p style="margin-top: 4px;">Hotel: <b>${found.hotel}</b> (${found.room})</p>
        <p>Guest: ${found.guest} · Dates: ${found.dates}</p>
        <p>Status: <span class="chip chip-success" style="padding: 2px 8px; font-size: 11px;">${found.status}</span> · Payment: <b>${found.payment} (${found.total})</b></p>
        <div style="margin-top: 12px; display: flex; gap: 8px;">
          <button class="btn btn-sm btn-outline" onclick="openCancelModal('${found.id}')">Request cancellation</button>
          <button class="btn btn-sm btn-primary" onclick="navigate('review')">Write review</button>
        </div>
      </div>
    </div>
  `;
}

// Modal System
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function openCancelModal(bookingId) {
  document.getElementById('cancel-booking-ref').textContent = bookingId || 'STY-48291';
  openModal('modal-cancel');
}

function confirmCancelBooking() {
  closeModal('modal-cancel');
  alert('Cancellation request submitted in this UI mockup. Refund evaluation follows property rules.');
}

function toggleFavorite(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('.material-symbols-outlined');
  if (btn.classList.contains('active')) {
    icon.style.fontVariationSettings = "'FILL' 1";
    icon.style.color = '#ef4444';
  } else {
    icon.style.fontVariationSettings = "'FILL' 0";
    icon.style.color = 'inherit';
  }
}

// Management Portals Renderer (Owner, Staff, Admin)
const portalConfig = {
  owner: {
    title: 'Hotel Owner Workspace',
    roleTag: 'Owner Portal · Azure Bay Resort',
    nav: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'hotel', label: 'Hotel Profile', icon: 'apartment' },
      { id: 'room-types', label: 'Room Types', icon: 'bed' },
      { id: 'rooms', label: 'Physical Rooms', icon: 'meeting_room' },
      { id: 'staff', label: 'Staff Accounts', icon: 'group' },
      { id: 'bookings', label: 'Guest Bookings', icon: 'calendar_month' },
      { id: 'payouts', label: 'Revenue Payouts', icon: 'payments' }
    ]
  },
  staff: {
    title: 'Hotel Staff Portal',
    roleTag: 'Staff Operations · Front Desk',
    nav: [
      { id: 'dashboard', label: 'Frontdesk Overview', icon: 'dashboard' },
      { id: 'rooms', label: 'Room Status', icon: 'meeting_room' },
      { id: 'bookings', label: 'Arrivals & Bookings', icon: 'calendar_month' },
      { id: 'checkin', label: 'Guest Check-in', icon: 'how_to_reg' },
      { id: 'checkout', label: 'Guest Check-out', icon: 'logout' }
    ]
  },
  admin: {
    title: 'System Admin Workspace',
    roleTag: 'System Administration · Platform Level',
    nav: [
      { id: 'dashboard', label: 'Platform Dashboard', icon: 'dashboard' },
      { id: 'hotels', label: 'Hotel Approvals', icon: 'domain_verification' },
      { id: 'fee-config', label: 'Platform Fee Settings', icon: 'tune' },
      { id: 'facilities', label: 'Facility Categories', icon: 'category' },
      { id: 'users', label: 'User Accounts', icon: 'manage_accounts' },
      { id: 'payouts', label: 'Platform Payouts', icon: 'account_balance' }
    ]
  }
};

function renderPortal(role, section) {
  const conf = portalConfig[role] || portalConfig.owner;
  const navList = document.getElementById('portal-nav-list');
  const roleTitle = document.getElementById('portal-role-tag');
  const contentArea = document.getElementById('portal-dynamic-content');

  roleTitle.textContent = conf.roleTag;

  // Render Sidebar
  navList.innerHTML = conf.nav.map(item => `
    <li class="portal-nav-item">
      <a class="${item.id === section ? 'active' : ''}" onclick="navigate('${role}/${item.id}')">
        <span class="material-symbols-outlined">${item.icon}</span>
        <span>${item.label}</span>
      </a>
    </li>
  `).join('');

  // Render Content based on Role & Section
  if (role === 'owner') renderOwnerSection(section, contentArea);
  else if (role === 'staff') renderStaffSection(section, contentArea);
  else if (role === 'admin') renderAdminSection(section, contentArea);
}

function renderOwnerSection(section, el) {
  if (section === 'dashboard') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Owner Overview</span>
          <h2 class="section-title">Good morning, Avery</h2>
          <p class="section-desc">Here is today's overview for Azure Bay Resort.</p>
        </div>
        <button class="btn btn-primary" onclick="navigate('owner/room-types')"><span class="material-symbols-outlined">add</span> Manage Room Types</button>
      </div>
      <div class="grid-4">
        <div class="metric-card">
          <div>
            <p class="metric-label">Bookings this month</p>
            <p class="metric-val">128</p>
            <span class="metric-change">↑ 12% vs last month</span>
          </div>
          <div class="metric-icon"><span class="material-symbols-outlined">calendar_month</span></div>
        </div>
        <div class="metric-card">
          <div>
            <p class="metric-label">Upcoming check-ins</p>
            <p class="metric-val">14</p>
            <span class="metric-change">Next 7 days</span>
          </div>
          <div class="metric-icon"><span class="material-symbols-outlined">check_circle</span></div>
        </div>
        <div class="metric-card">
          <div>
            <p class="metric-label">Available rooms</p>
            <p class="metric-val">32</p>
            <span class="metric-change">Mock inventory</span>
          </div>
          <div class="metric-icon"><span class="material-symbols-outlined">bed</span></div>
        </div>
        <div class="metric-card">
          <div>
            <p class="metric-label">Monthly Revenue</p>
            <p class="metric-val">$12,840</p>
            <span class="metric-change">↑ 8.5% growth</span>
          </div>
          <div class="metric-icon"><span class="material-symbols-outlined">trending_up</span></div>
        </div>
      </div>
      <div class="chart-box">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-weight: 800;">30-Day Booking Velocity</h3>
            <p style="font-size: 13px; color: var(--text-muted);">Mock reservation activity trend</p>
          </div>
          <span class="chip chip-primary">Last 30 Days</span>
        </div>
        <div class="chart-bars">
          ${[42, 68, 54, 82, 62, 90, 76, 98, 72, 106, 84, 118].map((val, idx) => `
            <div class="chart-bar-wrap">
              <div class="chart-bar ${idx === 11 ? 'current' : ''}" style="height: ${val}px;" title="${val} bookings"></div>
              <span class="chart-label">W${Math.floor(idx/3)+1}.${(idx%3)+1}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (section === 'hotel') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Property Details</span>
          <h2 class="section-title">Azure Bay Resort Information</h2>
        </div>
        <button class="btn btn-primary" onclick="alert('Hotel profile updated successfully!')">Save changes</button>
      </div>
      <div class="alert alert-success">
        <span class="material-symbols-outlined">verified</span>
        <div><b>Active Property</b> · 5-Star Classification assigned by Admin · Platform commission: 15%</div>
      </div>
      <div class="card" style="padding: 28px; max-width: 860px;">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Hotel Name</label>
            <input class="form-control" value="Azure Bay Resort">
          </div>
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input class="form-control" value="hello@azurebay.example">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Address</label>
          <input class="form-control" value="My Khe Beach, Vo Nguyen Giap, Da Nang, Vietnam">
        </div>
        <div class="form-group">
          <label class="form-label">Overview Description</label>
          <textarea class="form-control" rows="3">A calm coastal retreat with sunrise views, thoughtful service, and modern Vietnamese character.</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Check-in Time</label>
            <input class="form-control" value="14:00">
          </div>
          <div class="form-group">
            <label class="form-label">Check-out Time</label>
            <input class="form-control" value="12:00">
          </div>
        </div>
      </div>
    `;
  } else if (section === 'room-types') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Inventory Management</span>
          <h2 class="section-title">Room Types & Pricing</h2>
          <p class="section-desc">Listing price automatically includes the 15% platform commission.</p>
        </div>
        <button class="btn btn-primary" onclick="alert('Open create room type modal')"><span class="material-symbols-outlined">add</span> Add Room Type</button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Base Price</th>
              <th>Commission (15%)</th>
              <th>Listing Price</th>
              <th>Total Units</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Ocean Suite</b><br><span style="font-size:12px; color:var(--text-muted);">32 m² · 1 King bed</span></td>
              <td>$120.00 / night</td>
              <td>+$18.00</td>
              <td><b>$138.00</b></td>
              <td>4 rooms</td>
              <td><span class="chip chip-success">Active</span></td>
              <td><button class="btn btn-sm btn-outline">Edit</button></td>
            </tr>
            <tr>
              <td><b>Garden Deluxe</b><br><span style="font-size:12px; color:var(--text-muted);">28 m² · 1 Queen bed</span></td>
              <td>$92.00 / night</td>
              <td>+$14.00</td>
              <td><b>$106.00</b></td>
              <td>6 rooms</td>
              <td><span class="chip chip-success">Active</span></td>
              <td><button class="btn btn-sm btn-outline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else {
    renderGenericTable(section, el);
  }
}

function renderStaffSection(section, el) {
  if (section === 'checkin' || section === 'checkout') {
    const isCheckin = section === 'checkin';
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Front Desk Desk Operations</span>
          <h2 class="section-title">Guest ${isCheckin ? 'Check-in' : 'Check-out'}</h2>
          <p class="section-desc">Search booking code to verify guest and complete room handover.</p>
        </div>
      </div>
      <div class="card" style="padding: 28px; max-width: 720px;">
        <div class="form-group">
          <label class="form-label">Booking Reference Code</label>
          <div style="display:flex; gap: 8px;">
            <input class="form-control" id="staff-booking-code" value="STY-48291">
            <button class="btn btn-primary" onclick="alert('Booking STY-48291 verified.')">Search</button>
          </div>
        </div>
        <div class="card" style="padding: 20px; background: var(--surface-alt); margin: 20px 0;">
          <h4 style="font-size: 16px; font-weight: 800;">Alex Morgan · Ocean Suite</h4>
          <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 4px;">18–21 Oct 2026 · 2 Guests · Stripe Paid ($414.00)</p>
          <div style="margin-top: 12px;">
            <span class="chip chip-success">Verified Paid</span>
            <span class="chip">Assigned Room: 401</span>
          </div>
        </div>
        <div id="staff-action-result" style="display:none;" class="alert alert-success">
          <span class="material-symbols-outlined">check_circle</span>
          <div>${isCheckin ? 'Check-in confirmed! Keycard issued for Room 401.' : 'Check-out completed! Room marked for housekeeping.'}</div>
        </div>
        <button class="btn btn-primary btn-lg" onclick="document.getElementById('staff-action-result').style.display='flex';">
          <span class="material-symbols-outlined">${isCheckin ? 'key' : 'done_all'}</span> Confirm ${isCheckin ? 'Check-in' : 'Check-out'}
        </button>
      </div>
    `;
  } else if (section === 'rooms') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Housekeeping & Operations</span>
          <h2 class="section-title">Physical Rooms Availability</h2>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Room #</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Occupied By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Room 101</b></td>
              <td>Garden Deluxe</td>
              <td><span class="chip chip-success">Available</span></td>
              <td>—</td>
              <td><button class="btn btn-sm btn-outline" onclick="alert('Set to Maintenance')">Set Maintenance</button></td>
            </tr>
            <tr>
              <td><b>Room 102</b></td>
              <td>Garden Deluxe</td>
              <td><span class="chip chip-warning">Occupied</span></td>
              <td>Jamie Lee (STY-47520)</td>
              <td><button class="btn btn-sm btn-outline" onclick="alert('View details')">View</button></td>
            </tr>
            <tr>
              <td><b>Room 401</b></td>
              <td>Ocean Suite</td>
              <td><span class="chip chip-success">Available (Ready)</span></td>
              <td>Alex Morgan (Arriving Today)</td>
              <td><button class="btn btn-sm btn-outline" onclick="alert('Set Occupied')">Handover</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else {
    renderGenericTable(section, el);
  }
}

function renderAdminSection(section, el) {
  if (section === 'hotels') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">Platform Governance</span>
          <h2 class="section-title">Hotel Applications & Approvals</h2>
          <p class="section-desc">Admin assigns hotel star classification and platform fee tier.</p>
        </div>
        <button class="btn btn-primary" onclick="openModal('modal-create-hotel')"><span class="material-symbols-outlined">add</span> Create Hotel & Owner</button>
      </div>
      <div id="approval-notice" style="display:none;" class="alert alert-success">
        <span class="material-symbols-outlined">check_circle</span>
        <div><b>Riverside House Hoi An</b> has been approved as a 4-Star property with a 10% platform fee.</div>
      </div>
      <div class="card" style="padding: 24px; margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span class="chip chip-warning">Pending Approval</span>
            <h3 style="font-size: 18px; font-weight:800; margin-top: 8px;">Riverside House Hoi An</h3>
            <p style="color: var(--text-muted); font-size: 13px;">Submitted 16 Sep 2026 by Taylor Nguyen · 12 Nguyen Thai Hoc, Hoi An</p>
          </div>
          <div style="display:flex; gap: 8px; align-items:center;">
            <select class="form-control" style="width: auto;" id="admin-star-select">
              <option value="3">3-Star (8% fee)</option>
              <option value="4" selected>4-Star (10% fee)</option>
              <option value="5">5-Star (15% fee)</option>
            </select>
            <button class="btn btn-primary" onclick="approveHotelDemo()">Approve</button>
            <button class="btn btn-outline" style="color:var(--error); border-color:var(--error);" onclick="alert('Application rejected with reason.')">Reject</button>
          </div>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Classification</th>
              <th>Platform Commission</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Azure Bay Resort</b><br><span style="font-size:12px;color:var(--text-muted);">Da Nang</span></td>
              <td>5-Star ★★★★★</td>
              <td>15%</td>
              <td><span class="chip chip-success">Active</span></td>
              <td><button class="btn btn-sm btn-outline">Manage</button></td>
            </tr>
            <tr>
              <td><b>The Lantern Hoi An</b><br><span style="font-size:12px;color:var(--text-muted);">Hoi An</span></td>
              <td>4-Star ★★★★☆</td>
              <td>10%</td>
              <td><span class="chip chip-success">Active</span></td>
              <td><button class="btn btn-sm btn-outline">Manage</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else if (section === 'fee-config') {
    el.innerHTML = `
      <div class="section-header">
        <div>
          <span class="section-eyebrow">System Commission Settings</span>
          <h2 class="section-title">Platform Fee by Hotel Classification</h2>
          <p class="section-desc">Updated commission applies to new bookings. Existing bookings maintain their snapshotted rate.</p>
        </div>
        <button class="btn btn-primary" onclick="alert('Platform fee tiers saved!')">Save fee rules</button>
      </div>
      <div class="grid-3" style="margin-top: 24px;">
        <div class="card" style="padding: 24px;">
          <h3 style="font-weight: 800;">3-Star Hotels</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin: 4px 0 16px;">Budget & Boutique tier</p>
          <div class="form-group">
            <label class="form-label">Platform Fee (%)</label>
            <input class="form-control" type="number" value="8">
          </div>
        </div>
        <div class="card" style="padding: 24px;">
          <h3 style="font-weight: 800;">4-Star Hotels</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin: 4px 0 16px;">Premium Comfort tier</p>
          <div class="form-group">
            <label class="form-label">Platform Fee (%)</label>
            <input class="form-control" type="number" value="10">
          </div>
        </div>
        <div class="card" style="padding: 24px;">
          <h3 style="font-weight: 800;">5-Star Luxury</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin: 4px 0 16px;">Full Resort & Spa tier</p>
          <div class="form-group">
            <label class="form-label">Platform Fee (%)</label>
            <input class="form-control" type="number" value="15">
          </div>
        </div>
      </div>
    `;
  } else {
    renderGenericTable(section, el);
  }
}

function approveHotelDemo() {
  document.getElementById('approval-notice').style.display = 'flex';
}

function renderGenericTable(section, el) {
  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Management Portal</span>
        <h2 class="section-title">${section.toUpperCase()} Data</h2>
        <p class="section-desc">Demo records configured for client review.</p>
      </div>
      <button class="btn btn-primary" onclick="alert('Add record modal')"><span class="material-symbols-outlined">add</span> Create New</button>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Reference ID</th>
            <th>Name / Details</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${bookingsData.map(b => `
            <tr>
              <td><b>${b.id}</b></td>
              <td>${b.guest} (${b.hotel})</td>
              <td>${b.room}</td>
              <td><span class="chip ${b.status === 'Confirmed' ? 'chip-success' : ''}">${b.status}</span></td>
              <td><button class="btn btn-sm btn-outline" onclick="alert('Viewing record ${b.id}')">View</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
