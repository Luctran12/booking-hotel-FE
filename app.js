/**
 * AirCnC Mockup UI Application Logic
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
    id: 'CNC-48291',
    hotel: 'Azure Bay Resort',
    guest: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '+84 912 345 678',
    dates: '18–21 Oct 2026',
    nights: 3,
    room: 'Ocean Suite',
    roomNum: '401',
    status: 'Confirmed',
    payment: 'Paid via Card',
    total: '$414.00',
    base: '$360.00',
    fee: '$54.00 (15%)',
    net: '$306.00'
  },
  {
    id: 'CNC-47520',
    hotel: 'The Lantern Hoi An',
    guest: 'Jamie Lee',
    email: 'jamie@example.com',
    phone: '+84 987 654 321',
    dates: '10–12 Oct 2026',
    nights: 2,
    room: 'Garden Deluxe',
    roomNum: '102',
    status: 'Completed',
    payment: 'Paid via Card',
    total: '$318.00',
    base: '$288.00',
    fee: '$30.00 (10%)',
    net: '$258.00'
  },
  {
    id: 'CNC-49102',
    hotel: 'Azure Bay Resort',
    guest: 'David Park',
    email: 'david.park@example.com',
    phone: '+82 10 5555 4321',
    dates: '19–24 Oct 2026',
    nights: 5,
    room: 'Ocean Suite',
    roomNum: '201',
    status: 'Checked-in',
    payment: 'Paid via Card',
    total: '$690.00',
    base: '$600.00',
    fee: '$90.00 (15%)',
    net: '$510.00'
  },
  {
    id: 'CNC-48811',
    hotel: 'Azure Bay Resort',
    guest: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+44 7700 900123',
    dates: '20–23 Oct 2026',
    nights: 3,
    room: 'Sunset Studio Suite',
    roomNum: '301',
    status: 'Checked-in',
    payment: 'Paid via Card',
    total: '$483.00',
    base: '$420.00',
    fee: '$63.00 (15%)',
    net: '$357.00'
  },
  {
    id: 'CNC-46990',
    hotel: 'Azure Bay Resort',
    guest: 'Marcus Vance',
    email: 'm.vance@example.com',
    phone: '+1 415 555 0199',
    dates: '05–08 Oct 2026',
    nights: 3,
    room: 'Presidential Penthouse',
    roomNum: '402',
    status: 'Completed',
    payment: 'Paid via Card',
    total: '$966.00',
    base: '$840.00',
    fee: '$126.00 (15%)',
    net: '$714.00'
  }
];

// Hotel Owner State Management
let ownerHotelData = {
  name: 'Azure Bay Resort',
  classification: '5-Star Luxury Resort',
  stars: 5,
  commissionRate: 15,
  status: 'Active',
  email: 'hello@azurebay.example',
  phone: '+84 236 889 900',
  address: 'My Khe Beach, Vo Nguyen Giap, Da Nang, Vietnam',
  description: 'A calm coastal retreat with sunrise views, thoughtful service, and modern Vietnamese character. Step into airy rooms, take a dip in the infinity pool, or linger over locally inspired dishes by the water.',
  checkinTime: '14:00',
  checkoutTime: '12:00',
  activeTab: 'general',
  photos: [
    { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85', title: 'Main Resort Front & Pool', isCover: true },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85', title: 'Ocean Suite Balcony View', isCover: false },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85', title: 'Private Sun Deck & Loungers', isCover: false },
    { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85', title: 'Beachfront Dining Pavilion', isCover: false }
  ],
  amenities: [
    { id: 'beachfront', label: 'Beachfront Access', icon: 'beach_access', checked: true },
    { id: 'pool', label: 'Infinity Swimming Pool', icon: 'pool', checked: true },
    { id: 'wifi', label: 'High-speed Fiber Wi-Fi', icon: 'wifi', checked: true },
    { id: 'breakfast', label: 'Buffet Breakfast Included', icon: 'restaurant', checked: true },
    { id: 'spa', label: 'Full Service Spa & Massage', icon: 'spa', checked: true },
    { id: 'gym', label: '24/7 Fitness Center', icon: 'fitness_center', checked: false },
    { id: 'shuttle', label: 'Airport Shuttle Service', icon: 'airport_shuttle', checked: true },
    { id: 'ev', label: 'EV Charging Stations', icon: 'ev_station', checked: false },
    { id: 'roomservice', label: '24/7 In-room Dining', icon: 'room_service', checked: true },
    { id: 'pet', label: 'Pet Friendly Accommodations', icon: 'pets', checked: false }
  ],
  policies: {
    cancellation: 'moderate',
    quietHours: '22:00 – 07:00',
    minAge: '18',
    smoking: 'Non-smoking throughout all indoor rooms',
    children: 'Children under 6 stay free using existing bedding'
  }
};

let roomTypesData = [
  {
    id: 'rt-ocean-suite',
    name: 'Ocean Suite',
    size: 32,
    beds: '1 King Bed',
    capacity: 2,
    basePrice: 120,
    feePercent: 15,
    totalUnits: 4,
    active: true,
    highlights: 'Direct ocean view, private sun balcony, rain shower, deep soak bathtub'
  },
  {
    id: 'rt-garden-deluxe',
    name: 'Garden Deluxe',
    size: 28,
    beds: '1 Queen Bed',
    capacity: 2,
    basePrice: 92,
    feePercent: 15,
    totalUnits: 6,
    active: true,
    highlights: 'Tropical botanical garden view, outdoor patio, walk-in shower'
  },
  {
    id: 'rt-presidential-penthouse',
    name: 'Presidential Penthouse',
    size: 75,
    beds: '2 Queen Beds (Family)',
    capacity: 4,
    basePrice: 280,
    feePercent: 15,
    totalUnits: 2,
    active: true,
    highlights: 'Top floor panoramic horizon, private jacuzzi terrace, butler pantry'
  },
  {
    id: 'rt-sunset-studio',
    name: 'Sunset Studio Suite',
    size: 36,
    beds: '1 King Bed',
    capacity: 2,
    basePrice: 140,
    feePercent: 15,
    totalUnits: 4,
    active: true,
    highlights: 'West-facing sunset vista, workstation with Herman Miller chair, espresso bar'
  }
];

let physicalRoomsData = [
  // Floor 1 (Garden Level)
  { number: '101', floor: 1, type: 'Garden Deluxe', status: 'available', guest: null, notes: 'Housekeeping inspected & ready' },
  { number: '102', floor: 1, type: 'Garden Deluxe', status: 'occupied', guest: { name: 'Jamie Lee', bookingId: 'CNC-47520', checkout: '12 Oct 2026' }, notes: 'Late checkout requested (13:00)' },
  { number: '103', floor: 1, type: 'Garden Deluxe', status: 'cleaning', guest: null, notes: 'Stripped bedding; fresh linens in progress' },
  { number: '104', floor: 1, type: 'Garden Deluxe', status: 'available', guest: null, notes: 'Clean & ready' },

  // Floor 2 (Ocean Wing)
  { number: '201', floor: 2, type: 'Ocean Suite', status: 'occupied', guest: { name: 'David Park', bookingId: 'CNC-49102', checkout: '24 Oct 2026' }, notes: 'Honeymoon arrangement placed' },
  { number: '202', floor: 2, type: 'Ocean Suite', status: 'available', guest: null, notes: 'Ready for guest check-in' },
  { number: '203', floor: 2, type: 'Sunset Studio Suite', status: 'cleaning', guest: null, notes: 'Departed today 11:30' },
  { number: '204', floor: 2, type: 'Sunset Studio Suite', status: 'available', guest: null, notes: 'Inspected by supervisor' },

  // Floor 3 (Executive Level)
  { number: '301', floor: 3, type: 'Sunset Studio Suite', status: 'occupied', guest: { name: 'Elena Rostova', bookingId: 'CNC-48811', checkout: '23 Oct 2026' }, notes: 'Extra foam pillow requested' },
  { number: '302', floor: 3, type: 'Sunset Studio Suite', status: 'maintenance', guest: null, notes: 'Balcony sliding lock replacement in progress' },
  { number: '303', floor: 3, type: 'Ocean Suite', status: 'available', guest: null, notes: 'Ready' },

  // Floor 4 (Penthouse Level)
  { number: '401', floor: 4, type: 'Ocean Suite', status: 'occupied', guest: { name: 'Alex Morgan', bookingId: 'CNC-48291', checkout: '21 Oct 2026' }, notes: 'Arrived today; VIP welcome fruits provided' },
  { number: '402', floor: 4, type: 'Presidential Penthouse', status: 'available', guest: null, notes: 'Private jacuzzi tested & sanitized' }
];

let staffData = [
  { id: 'st-1', name: 'Linh Tran', role: 'Frontdesk Lead', shift: 'Morning (06:00 - 14:00)', email: 'linh.tran@azurebay.example', phone: '+84 934 112 233', status: 'Active' },
  { id: 'st-2', name: 'Nam Vu', role: 'Receptionist', shift: 'Evening (14:00 - 22:00)', email: 'nam.vu@azurebay.example', phone: '+84 912 778 899', status: 'Active' },
  { id: 'st-3', name: 'Sarah Vo', role: 'Housekeeping Supervisor', shift: 'Morning (06:00 - 14:00)', email: 'sarah.vo@azurebay.example', phone: '+84 908 445 566', status: 'Active' },
  { id: 'st-4', name: 'Minh Hoang', role: 'Night Duty Receptionist', shift: 'Night (22:00 - 06:00)', email: 'minh.h@azurebay.example', phone: '+84 977 334 455', status: 'On Leave' }
];

let ownerFinancials = {
  availableBalance: 3420.00,
  pendingClearance: 1280.00,
  lifetimeEarnings: 84650.00,
  connectedBank: 'Vietcombank (Danang Branch) · •••• 8892'
};

let payoutsData = [
  { id: 'PO-8921', date: '15 Oct 2026', gross: '$4,280.00', fee: '$642.00 (15%)', net: '$3,638.00', destination: 'Vietcombank •••• 8892', status: 'Deposited' },
  { id: 'PO-8760', date: '01 Oct 2026', gross: '$5,150.00', fee: '$772.50 (15%)', net: '$4,377.50', destination: 'Vietcombank •••• 8892', status: 'Deposited' },
  { id: 'PO-8612', date: '15 Sep 2026', gross: '$3,890.00', fee: '$583.50 (15%)', net: '$3,306.50', destination: 'Vietcombank •••• 8892', status: 'Deposited' },
  { id: 'PO-8490', date: '01 Sep 2026', gross: '$4,600.00', fee: '$690.00 (15%)', net: '$3,910.00', destination: 'Vietcombank •••• 8892', status: 'Deposited' }
];

let currentRoomFilter = 'all';
let currentBookingFilter = 'all';
let bookingSearchTerm = '';
let ownerChartMetric = 'bookings';

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
  document.getElementById('cancel-booking-ref').textContent = bookingId || 'CNC-48291';
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
    renderOwnerDashboard(el);
  } else if (section === 'hotel') {
    renderOwnerHotel(el);
  } else if (section === 'room-types') {
    renderOwnerRoomTypes(el);
  } else if (section === 'rooms') {
    renderOwnerRooms(el);
  } else if (section === 'staff') {
    renderOwnerStaff(el);
  } else if (section === 'bookings') {
    renderOwnerBookings(el);
  } else if (section === 'payouts') {
    renderOwnerPayouts(el);
  } else {
    renderGenericTable(section, el);
  }
}

// 1. OWNER DASHBOARD
function renderOwnerDashboard(el) {
  const activeRooms = physicalRoomsData.filter(r => r.status === 'occupied').length;
  const totalPhysical = physicalRoomsData.length;
  const occupancyPct = ((activeRooms / totalPhysical) * 100).toFixed(1);

  const cleaningCount = physicalRoomsData.filter(r => r.status === 'cleaning').length;
  const maintCount = physicalRoomsData.filter(r => r.status === 'maintenance').length;

  el.innerHTML = `
    <div class="section-header">
      <div>
        <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px;">
          <span class="section-eyebrow">Property Operations Console</span>
          <span class="chip chip-success" style="font-size:11px;">Active Listing</span>
          <span class="chip chip-primary" style="font-size:11px;">5-Star · 15% Platform Commission</span>
        </div>
        <h2 class="section-title">Good morning, Avery Chen</h2>
        <p class="section-desc">Performance summary and daily frontdesk overview for <b>Azure Bay Resort</b>.</p>
      </div>
      <div style="display:flex; gap: 8px; flex-wrap:wrap;">
        <button class="btn btn-outline" onclick="openAddRoomTypeModal()"><span class="material-symbols-outlined">add_business</span> Add Room Type</button>
        <button class="btn btn-primary" onclick="openRequestPayoutModal()"><span class="material-symbols-outlined">payments</span> Request Payout</button>
      </div>
    </div>

    <!-- Daily Operations Pulse -->
    <div class="ops-pulse-bar">
      <div class="ops-pulse-item">
        <div class="ops-pulse-icon green"><span class="material-symbols-outlined">how_to_reg</span></div>
        <div>
          <p style="font-size: 11.5px; color: var(--text-muted); font-weight:700;">CHECK-INS TODAY</p>
          <p style="font-size: 16px; font-weight: 900; color: var(--text-main);">4 Arrivals</p>
        </div>
      </div>
      <div class="ops-pulse-item">
        <div class="ops-pulse-icon blue"><span class="material-symbols-outlined">logout</span></div>
        <div>
          <p style="font-size: 11.5px; color: var(--text-muted); font-weight:700;">CHECK-OUTS TODAY</p>
          <p style="font-size: 16px; font-weight: 900; color: var(--text-main);">3 Departures</p>
        </div>
      </div>
      <div class="ops-pulse-item">
        <div class="ops-pulse-icon amber"><span class="material-symbols-outlined">cleaning_services</span></div>
        <div>
          <p style="font-size: 11.5px; color: var(--text-muted); font-weight:700;">HOUSEKEEPING</p>
          <p style="font-size: 16px; font-weight: 900; color: var(--text-main);">${cleaningCount} To Clean</p>
        </div>
      </div>
      <div class="ops-pulse-item">
        <div class="ops-pulse-icon red"><span class="material-symbols-outlined">build</span></div>
        <div>
          <p style="font-size: 11.5px; color: var(--text-muted); font-weight:700;">MAINTENANCE</p>
          <p style="font-size: 16px; font-weight: 900; color: var(--text-main);">${maintCount} Blocked</p>
        </div>
      </div>
      <div class="ops-pulse-item">
        <div class="ops-pulse-icon green"><span class="material-symbols-outlined">meeting_room</span></div>
        <div>
          <p style="font-size: 11.5px; color: var(--text-muted); font-weight:700;">OCCUPANCY</p>
          <p style="font-size: 16px; font-weight: 900; color: var(--text-main);">${activeRooms}/${totalPhysical} Rooms (${occupancyPct}%)</p>
        </div>
      </div>
    </div>

    <!-- 5 KPI Cards -->
    <div class="grid-4" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      <div class="metric-card">
        <div>
          <p class="metric-label">Monthly Gross Revenue</p>
          <p class="metric-val">$12,840</p>
          <span class="metric-change">↑ 8.5% growth vs last month</span>
        </div>
        <div class="metric-icon"><span class="material-symbols-outlined">monetization_on</span></div>
      </div>
      <div class="metric-card">
        <div>
          <p class="metric-label">Net Owner Payout (85%)</p>
          <p class="metric-val" style="color:var(--primary);">$10,914</p>
          <span class="metric-change" style="color:var(--text-muted);">AirCnC fee: $1,926 (15%)</span>
        </div>
        <div class="metric-icon"><span class="material-symbols-outlined">payments</span></div>
      </div>
      <div class="metric-card">
        <div>
          <p class="metric-label">Confirmed Bookings</p>
          <p class="metric-val">128</p>
          <span class="metric-change">↑ 12% velocity</span>
        </div>
        <div class="metric-icon"><span class="material-symbols-outlined">calendar_month</span></div>
      </div>
      <div class="metric-card">
        <div>
          <p class="metric-label">Average Daily Rate (ADR)</p>
          <p class="metric-val">$142.50</p>
          <span class="metric-change">Target: $135.00</span>
        </div>
        <div class="metric-icon"><span class="material-symbols-outlined">trending_up</span></div>
      </div>
    </div>

    <!-- Velocity Chart -->
    <div class="chart-box">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap:wrap; gap:10px;">
        <div>
          <h3 style="font-weight: 800; font-size:16px;">Booking & Revenue Velocity (Past 30 Days)</h3>
          <p style="font-size: 13px; color: var(--text-muted);">Dynamic performance trend over 12 rolling intervals</p>
        </div>
        <div style="display:flex; gap: 8px;">
          <button class="btn btn-sm ${ownerChartMetric === 'bookings' ? 'btn-primary' : 'btn-outline'}" onclick="toggleOwnerChartMetric('bookings')">Bookings</button>
          <button class="btn btn-sm ${ownerChartMetric === 'revenue' ? 'btn-primary' : 'btn-outline'}" onclick="toggleOwnerChartMetric('revenue')">Revenue ($)</button>
        </div>
      </div>
      <div class="chart-bars">
        ${[42, 68, 54, 82, 62, 90, 76, 98, 72, 106, 84, 118].map((val, idx) => {
          const displayVal = ownerChartMetric === 'bookings' ? `${val} bookings` : `$${val * 115}`;
          const heightPx = ownerChartMetric === 'bookings' ? val : Math.round(val * 1.2);
          return `
            <div class="chart-bar-wrap">
              <div class="chart-bar ${idx === 11 ? 'current' : ''}" style="height: ${Math.min(heightPx, 140)}px;" title="${displayVal}"></div>
              <span class="chart-label">W${Math.floor(idx/3)+1}.${(idx%3)+1}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Recent Reservations Quick Table -->
    <div style="margin-top: 32px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
        <h3 style="font-size:16px; font-weight:800;">Recent Guest Reservations</h3>
        <a class="btn btn-sm btn-outline" onclick="navigate('owner/bookings')">View all bookings →</a>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Guest Name</th>
              <th>Room Type</th>
              <th>Stay Dates</th>
              <th>Gross Total</th>
              <th>Net Payout</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${bookingsData.slice(0, 4).map(b => `
              <tr>
                <td><b>${b.id}</b></td>
                <td>
                  <b>${b.guest}</b><br>
                  <span style="font-size:11.5px; color:var(--text-muted);">${b.email}</span>
                </td>
                <td>${b.room} <span class="chip" style="font-size:11px;">#${b.roomNum || '401'}</span></td>
                <td>${b.dates} (${b.nights || 3} nights)</td>
                <td><b>${b.total}</b></td>
                <td style="color:var(--primary); font-weight:700;">${b.net || '$306.00'}</td>
                <td>
                  <span class="chip ${b.status === 'Confirmed' || b.status === 'Checked-in' ? 'chip-success' : ''}">${b.status}</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline" onclick="openBookingFolio('${b.id}')">View Folio</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 2. OWNER HOTEL PROFILE
function renderOwnerHotel(el) {
  const tab = ownerHotelData.activeTab || 'general';

  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Property Configuration</span>
        <h2 class="section-title">Hotel Profile & Brand Settings</h2>
        <p class="section-desc">Manage guest-facing information, photo media gallery, amenity checklist, and policies.</p>
      </div>
      <button class="btn btn-primary" onclick="saveHotelGeneralSettings()"><span class="material-symbols-outlined">save</span> Save All Changes</button>
    </div>

    <!-- Alert classification info -->
    <div class="alert alert-success" style="margin-bottom: 20px;">
      <span class="material-symbols-outlined">verified</span>
      <div><b>Verified 5-Star Luxury Classification</b> · Active on AirCnC marketplace · System commission rate: <b>15%</b> (automatic fee deduction on reservation checkouts).</div>
    </div>

    <!-- Sub-tabs -->
    <div class="portal-tabs">
      <button class="portal-tab-btn ${tab === 'general' ? 'active' : ''}" onclick="switchOwnerHotelTab('general')">
        <span class="material-symbols-outlined">info</span> General Info & Location
      </button>
      <button class="portal-tab-btn ${tab === 'media' ? 'active' : ''}" onclick="switchOwnerHotelTab('media')">
        <span class="material-symbols-outlined">photo_library</span> Media & Photo Gallery (${ownerHotelData.photos.length})
      </button>
      <button class="portal-tab-btn ${tab === 'amenities' ? 'active' : ''}" onclick="switchOwnerHotelTab('amenities')">
        <span class="material-symbols-outlined">hotel_class</span> Amenities & Services (${ownerHotelData.amenities.filter(a => a.checked).length})
      </button>
      <button class="portal-tab-btn ${tab === 'policies' ? 'active' : ''}" onclick="switchOwnerHotelTab('policies')">
        <span class="material-symbols-outlined">policy</span> House Rules & Cancellation
      </button>
    </div>

    <!-- Tab Contents -->
    ${tab === 'general' ? renderHotelTabGeneral() : ''}
    ${tab === 'media' ? renderHotelTabMedia() : ''}
    ${tab === 'amenities' ? renderHotelTabAmenities() : ''}
    ${tab === 'policies' ? renderHotelTabPolicies() : ''}
  `;
}

function renderHotelTabGeneral() {
  return `
    <div class="card" style="padding: 28px; max-width: 860px;">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Hotel Property Name *</label>
          <input class="form-control" id="oh-name" value="${ownerHotelData.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Official Star Rating</label>
          <input class="form-control" value="5-Star Luxury (Assigned by Platform Admin)" disabled style="background:var(--surface-alt);">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Contact Email *</label>
          <input class="form-control" id="oh-email" type="email" value="${ownerHotelData.email}">
        </div>
        <div class="form-group">
          <label class="form-label">Frontdesk Phone *</label>
          <input class="form-control" id="oh-phone" value="${ownerHotelData.phone}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Full Street Address *</label>
        <input class="form-control" id="oh-address" value="${ownerHotelData.address}">
      </div>
      <div class="form-group">
        <label class="form-label">Overview Description (shown on guest storefront) *</label>
        <textarea class="form-control" id="oh-desc" rows="3">${ownerHotelData.description}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Standard Check-in Time</label>
          <input class="form-control" id="oh-checkin" value="${ownerHotelData.checkinTime}">
        </div>
        <div class="form-group">
          <label class="form-label">Standard Check-out Time</label>
          <input class="form-control" id="oh-checkout" value="${ownerHotelData.checkoutTime}">
        </div>
      </div>
      <div style="margin-top: 16px;">
        <button class="btn btn-primary" onclick="saveHotelGeneralSettings()">Save Information</button>
      </div>
    </div>
  `;
}

function renderHotelTabMedia() {
  return `
    <div class="card" style="padding: 28px; max-width: 960px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <div>
          <h3 style="font-size:16px; font-weight:800;">Property Photo Gallery</h3>
          <p style="font-size:13px; color:var(--text-muted);">High-resolution photography displayed on guest storefront & search results.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="uploadHotelPhotoDemo()"><span class="material-symbols-outlined">add_photo_alternate</span> Add Photo URL</button>
      </div>

      <div class="owner-gallery-grid">
        ${ownerHotelData.photos.map((p, idx) => `
          <div class="owner-photo-card">
            <img src="${p.url}" alt="${p.title}">
            ${p.isCover ? '<span class="owner-photo-badge">COVER PHOTO</span>' : ''}
            <button class="owner-photo-delete" title="Delete Photo" onclick="deleteHotelPhoto(${idx})">
              <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
            </button>
          </div>
        `).join('')}
        
        <div class="owner-photo-upload-box" onclick="uploadHotelPhotoDemo()">
          <span class="material-symbols-outlined" style="font-size: 32px;">cloud_upload</span>
          <span style="font-size: 12.5px; font-weight: 700;">+ Upload New Image</span>
          <span style="font-size: 11px; opacity:0.8;">JPG, PNG up to 10MB</span>
        </div>
      </div>
    </div>
  `;
}

function renderHotelTabAmenities() {
  return `
    <div class="card" style="padding: 28px; max-width: 860px;">
      <h3 style="font-size:16px; font-weight:800;">Featured Amenities & Services</h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom: 16px;">Select all facilities provided at your resort. These appear in guest search filters.</p>
      
      <div class="amenity-toggle-grid">
        ${ownerHotelData.amenities.map(a => `
          <label class="amenity-checkbox-item">
            <input type="checkbox" ${a.checked ? 'checked' : ''} onchange="toggleAmenityDemo('${a.id}')">
            <span class="material-symbols-outlined" style="font-size:18px; color:var(--primary);">${a.icon}</span>
            <span>${a.label}</span>
          </label>
        `).join('')}
      </div>

      <div style="margin-top: 24px;">
        <button class="btn btn-primary" onclick="showPortalToast('Amenities updated successfully!')">Save Amenities</button>
      </div>
    </div>
  `;
}

function renderHotelTabPolicies() {
  const p = ownerHotelData.policies;
  return `
    <div class="card" style="padding: 28px; max-width: 860px;">
      <h3 style="font-size:16px; font-weight:800;">Cancellation Policy & House Rules</h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom: 20px;">Rules automatically communicated to guests in reservation confirmation receipts.</p>

      <div class="form-group">
        <label class="form-label">Cancellation Policy Preset</label>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 8px;">
          <div class="card" style="padding: 16px; border-color: ${p.cancellation === 'flexible' ? 'var(--primary)' : 'var(--border)'}; background: ${p.cancellation === 'flexible' ? 'var(--primary-light)' : 'var(--surface)'};">
            <label style="display:flex; align-items:center; gap: 8px; font-weight:700; cursor:pointer;">
              <input type="radio" name="cancel-policy" value="flexible" ${p.cancellation === 'flexible' ? 'checked' : ''} onchange="ownerHotelData.policies.cancellation='flexible'">
              Flexible (100% refund)
            </label>
            <p style="font-size:12px; color:var(--text-muted); margin-top: 6px;">Free cancellation up to 24 hours prior to check-in.</p>
          </div>

          <div class="card" style="padding: 16px; border-color: ${p.cancellation === 'moderate' ? 'var(--primary)' : 'var(--border)'}; background: ${p.cancellation === 'moderate' ? 'var(--primary-light)' : 'var(--surface)'};">
            <label style="display:flex; align-items:center; gap: 8px; font-weight:700; cursor:pointer;">
              <input type="radio" name="cancel-policy" value="moderate" ${p.cancellation === 'moderate' ? 'checked' : ''} onchange="ownerHotelData.policies.cancellation='moderate'">
              Moderate (50% refund)
            </label>
            <p style="font-size:12px; color:var(--text-muted); margin-top: 6px;">50% refund on cancellations prior to check-in.</p>
          </div>

          <div class="card" style="padding: 16px; border-color: ${p.cancellation === 'strict' ? 'var(--primary)' : 'var(--border)'}; background: ${p.cancellation === 'strict' ? 'var(--primary-light)' : 'var(--surface)'};">
            <label style="display:flex; align-items:center; gap: 8px; font-weight:700; cursor:pointer;">
              <input type="radio" name="cancel-policy" value="strict" ${p.cancellation === 'strict' ? 'checked' : ''} onchange="ownerHotelData.policies.cancellation='strict'">
              Strict (Non-refundable)
            </label>
            <p style="font-size:12px; color:var(--text-muted); margin-top: 6px;">No refund upon cancellation confirmation.</p>
          </div>
        </div>
      </div>

      <div class="form-row" style="margin-top: 16px;">
        <div class="form-group">
          <label class="form-label">Quiet Hours</label>
          <input class="form-control" id="oh-quiet" value="${p.quietHours}">
        </div>
        <div class="form-group">
          <label class="form-label">Minimum Check-in Age</label>
          <input class="form-control" id="oh-age" type="number" value="${p.minAge}">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Smoking Policy</label>
        <input class="form-control" id="oh-smoking" value="${p.smoking}">
      </div>

      <div class="form-group">
        <label class="form-label">Children & Extra Bed Rules</label>
        <input class="form-control" id="oh-children" value="${p.children}">
      </div>

      <div style="margin-top: 16px;">
        <button class="btn btn-primary" onclick="saveHotelPoliciesDemo()">Save Policy Settings</button>
      </div>
    </div>
  `;
}

// 3. OWNER ROOM TYPES & PRICING
function renderOwnerRoomTypes(el) {
  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Inventory Catalog</span>
        <h2 class="section-title">Room Types & Dynamic Pricing</h2>
        <p class="section-desc">Guest listing prices automatically reflect your net base price plus the <b>15% AirCnC marketplace commission</b>.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddRoomTypeModal()"><span class="material-symbols-outlined">add</span> Add Room Type</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Specs & Capacity</th>
            <th>Owner Base Rate</th>
            <th>AirCnC Fee (15%)</th>
            <th>Guest Listing Price</th>
            <th>Physical Units</th>
            <th>Marketplace Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${roomTypesData.map(rt => {
            const fee = (rt.basePrice * (rt.feePercent / 100));
            const listing = (rt.basePrice + fee);
            return `
              <tr>
                <td>
                  <b>${rt.name}</b><br>
                  <span style="font-size:12px; color:var(--text-muted);">${rt.highlights || 'Luxury accommodations'}</span>
                </td>
                <td>
                  <span style="font-size:12.5px;">${rt.size} m² · ${rt.beds}</span><br>
                  <span class="chip" style="font-size:11px; margin-top:2px;">Max ${rt.capacity} guests</span>
                </td>
                <td><b>$${rt.basePrice.toFixed(2)}</b> / night</td>
                <td style="color:var(--text-muted);">+$${fee.toFixed(2)}</td>
                <td><b style="font-size:15px; color:var(--primary);">$${listing.toFixed(2)}</b></td>
                <td><b>${rt.totalUnits} rooms</b></td>
                <td>
                  <span class="chip ${rt.active ? 'chip-success' : ''}">${rt.active ? 'Active' : 'Paused'}</span>
                </td>
                <td>
                  <div style="display:flex; gap: 6px;">
                    <button class="btn btn-sm btn-outline" onclick="openAddRoomTypeModal('${rt.id}')">Edit</button>
                    <button class="btn btn-sm btn-outline" style="${rt.active ? 'color:var(--warning);' : 'color:var(--success);'}" onclick="toggleRoomTypeStatus('${rt.id}')">
                      ${rt.active ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 4. OWNER PHYSICAL ROOMS & HOUSEKEEPING
function renderOwnerRooms(el) {
  const filtered = currentRoomFilter === 'all' 
    ? physicalRoomsData 
    : physicalRoomsData.filter(r => r.status === currentRoomFilter);

  // Group by floor
  const floors = [1, 2, 3, 4];

  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Housekeeping & Operational Status</span>
        <h2 class="section-title">Physical Rooms Matrix</h2>
        <p class="section-desc">Live floor-by-floor occupancy and cleaning status for frontdesk and operations teams.</p>
      </div>
      <button class="btn btn-outline" onclick="showPortalToast('Refreshing room sensor status...')"><span class="material-symbols-outlined">sync</span> Refresh Status</button>
    </div>

    <!-- Filter toolbar -->
    <div class="portal-toolbar">
      <div style="display:flex; gap: 8px; flex-wrap:wrap;">
        <button class="btn btn-sm ${currentRoomFilter === 'all' ? 'btn-primary' : 'btn-outline'}" onclick="filterPhysicalRooms('all')">All Rooms (${physicalRoomsData.length})</button>
        <button class="btn btn-sm ${currentRoomFilter === 'available' ? 'btn-primary' : 'btn-outline'}" onclick="filterPhysicalRooms('available')">🟢 Available (${physicalRoomsData.filter(r => r.status === 'available').length})</button>
        <button class="btn btn-sm ${currentRoomFilter === 'occupied' ? 'btn-primary' : 'btn-outline'}" onclick="filterPhysicalRooms('occupied')">🔵 Occupied (${physicalRoomsData.filter(r => r.status === 'occupied').length})</button>
        <button class="btn btn-sm ${currentRoomFilter === 'cleaning' ? 'btn-primary' : 'btn-outline'}" onclick="filterPhysicalRooms('cleaning')">🟡 Housekeeping (${physicalRoomsData.filter(r => r.status === 'cleaning').length})</button>
        <button class="btn btn-sm ${currentRoomFilter === 'maintenance' ? 'btn-primary' : 'btn-outline'}" onclick="filterPhysicalRooms('maintenance')">🔴 Maintenance (${physicalRoomsData.filter(r => r.status === 'maintenance').length})</button>
      </div>
      <span style="font-size: 12.5px; color: var(--text-muted);">💡 Click any room to update cleaning or maintenance status</span>
    </div>

    <!-- Floor groups -->
    ${floors.map(fl => {
      const floorRooms = filtered.filter(r => r.floor === fl);
      if (floorRooms.length === 0) return '';
      return `
        <div class="room-floor-group">
          <div class="room-floor-header">
            <span class="material-symbols-outlined" style="font-size:18px;">layers</span>
            <span>Floor ${fl} (${fl === 1 ? 'Garden Level' : fl === 2 ? 'Ocean Wing' : fl === 3 ? 'Executive Wing' : 'Penthouse Level'})</span>
          </div>
          <div class="room-matrix-grid">
            ${floorRooms.map(r => `
              <div class="room-node status-${r.status}" onclick="openRoomStatusModal('${r.number}')">
                <div class="room-node-num">Room ${r.number}</div>
                <div class="room-node-type" title="${r.type}">${r.type}</div>
                <span class="room-node-badge">${r.status.toUpperCase()}</span>
                ${r.guest ? `<div style="font-size:10.5px; margin-top:4px; font-weight:700; color:#1e40af; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">👤 ${r.guest.name}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// 5. OWNER GUEST BOOKINGS
function renderOwnerBookings(el) {
  let list = bookingsData.filter(b => b.hotel.includes('Azure Bay'));
  if (currentBookingFilter !== 'all') {
    list = list.filter(b => b.status.toLowerCase() === currentBookingFilter.toLowerCase());
  }
  if (bookingSearchTerm.trim()) {
    const q = bookingSearchTerm.toLowerCase();
    list = list.filter(b => b.id.toLowerCase().includes(q) || b.guest.toLowerCase().includes(q) || b.room.toLowerCase().includes(q));
  }

  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Reservation Ledger</span>
        <h2 class="section-title">Guest Bookings Management</h2>
        <p class="section-desc">Review guest folios, financial breakdowns, check-in statuses, and invoicing.</p>
      </div>
      <button class="btn btn-primary" onclick="showPortalToast('Exported bookings to CSV')"><span class="material-symbols-outlined">download</span> Export CSV</button>
    </div>

    <!-- Search & Filter Toolbar -->
    <div class="portal-toolbar">
      <div style="display:flex; gap: 8px; flex-wrap:wrap;">
        <button class="btn btn-sm ${currentBookingFilter === 'all' ? 'btn-primary' : 'btn-outline'}" onclick="filterOwnerBookings('all')">All Bookings</button>
        <button class="btn btn-sm ${currentBookingFilter === 'confirmed' ? 'btn-primary' : 'btn-outline'}" onclick="filterOwnerBookings('confirmed')">Confirmed</button>
        <button class="btn btn-sm ${currentBookingFilter === 'checked-in' ? 'btn-primary' : 'btn-outline'}" onclick="filterOwnerBookings('checked-in')">Checked-in</button>
        <button class="btn btn-sm ${currentBookingFilter === 'completed' ? 'btn-primary' : 'btn-outline'}" onclick="filterOwnerBookings('completed')">Completed</button>
      </div>
      <div style="display:flex; gap: 8px; align-items:center;">
        <input class="form-control" style="width: 240px; height: 36px; font-size:13px;" placeholder="Search guest or CNC code..." value="${bookingSearchTerm}" oninput="searchOwnerBookings(this.value)">
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Info</th>
            <th>Room & Unit</th>
            <th>Dates / Duration</th>
            <th>Gross Paid</th>
            <th>Platform Fee (15%)</th>
            <th>Net Owner Payout</th>
            <th>Status</th>
            <th>Folio Actions</th>
          </tr>
        </thead>
        <tbody>
          ${list.length === 0 ? `
            <tr><td colspan="9" style="text-align:center; padding:32px; color:var(--text-muted);">No matching bookings found for this filter.</td></tr>
          ` : list.map(b => `
            <tr>
              <td><b>${b.id}</b></td>
              <td>
                <b>${b.guest}</b><br>
                <span style="font-size:11.5px; color:var(--text-muted);">${b.phone}</span>
              </td>
              <td>
                ${b.room}<br>
                <span class="chip" style="font-size:11px;">Unit #${b.roomNum || '401'}</span>
              </td>
              <td>
                ${b.dates}<br>
                <span style="font-size:12px; color:var(--text-muted);">${b.nights || 3} nights</span>
              </td>
              <td><b>${b.total}</b></td>
              <td style="color:var(--text-muted);">${b.fee}</td>
              <td style="color:var(--primary); font-weight:800;">${b.net || '$306.00'}</td>
              <td>
                <span class="chip ${b.status === 'Confirmed' || b.status === 'Checked-in' ? 'chip-success' : ''}">${b.status}</span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline" onclick="openBookingFolio('${b.id}')">View Folio</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 6. OWNER STAFF MANAGEMENT
function renderOwnerStaff(el) {
  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Human Resources & Access</span>
        <h2 class="section-title">Hotel Staff Directory</h2>
        <p class="section-desc">Manage operational access roles, reception shifts, and housekeeping staff accounts.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddStaffModal()"><span class="material-symbols-outlined">person_add</span> Invite Staff Member</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Assigned Role</th>
            <th>Work Shift</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${staffData.map(s => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:grid; place-items:center; font-weight:800;">
                    ${s.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <b>${s.name}</b><br>
                    <span style="font-size:11px; color:var(--text-muted);">Staff ID: ${s.id}</span>
                  </div>
                </div>
              </td>
              <td><span class="chip chip-primary" style="font-size:12px;">${s.role}</span></td>
              <td>${s.shift}</td>
              <td>${s.email}</td>
              <td>${s.phone}</td>
              <td>
                <span class="chip ${s.status === 'Active' ? 'chip-success' : ''}">${s.status}</span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline" style="color:var(--error);" onclick="deleteStaffMember('${s.id}')">Remove</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 7. OWNER REVENUE PAYOUTS
function renderOwnerPayouts(el) {
  el.innerHTML = `
    <div class="section-header">
      <div>
        <span class="section-eyebrow">Financial Ledger & Settlements</span>
        <h2 class="section-title">Revenue & Payout History</h2>
        <p class="section-desc">Transparent tracking of gross guest transactions, 15% AirCnC marketplace deductions, and bank disbursements.</p>
      </div>
      <button class="btn btn-primary" onclick="openRequestPayoutModal()"><span class="material-symbols-outlined">payments</span> Request Payout</button>
    </div>

    <!-- Financial Cards -->
    <div class="grid-3" style="margin-bottom: 24px;">
      <div class="card" style="padding: 24px; border-left: 4px solid var(--primary);">
        <span style="font-size: 12.5px; color: var(--text-muted); font-weight:700;">AVAILABLE FOR IMMEDIATE PAYOUT</span>
        <p style="font-size: 32px; font-weight: 900; color: var(--primary); margin: 6px 0;">$${ownerFinancials.availableBalance.toFixed(2)}</p>
        <span style="font-size: 12px; color: var(--success); font-weight:700;">✓ Ready for direct deposit</span>
      </div>

      <div class="card" style="padding: 24px; border-left: 4px solid var(--warning);">
        <span style="font-size: 12.5px; color: var(--text-muted); font-weight:700;">PENDING CLEARANCE (IN-HOUSE GUESTS)</span>
        <p style="font-size: 32px; font-weight: 900; color: var(--text-main); margin: 6px 0;">$${ownerFinancials.pendingClearance.toFixed(2)}</p>
        <span style="font-size: 12px; color: var(--text-muted);">Releases 24h after guest check-out</span>
      </div>

      <div class="card" style="padding: 24px; border-left: 4px solid #6366f1;">
        <span style="font-size: 12.5px; color: var(--text-muted); font-weight:700;">LIFETIME NET EARNINGS DISBURSED</span>
        <p style="font-size: 32px; font-weight: 900; color: #4338ca; margin: 6px 0;">$${ownerFinancials.lifetimeEarnings.toFixed(2)}</p>
        <span style="font-size: 12px; color: var(--text-muted);">Verified Stripe Connect destination</span>
      </div>
    </div>

    <!-- Connected Bank Info Box -->
    <div class="card" style="padding: 20px 24px; margin-bottom: 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div style="display:flex; align-items:center; gap: 14px;">
        <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--primary-light); color:var(--primary); display:grid; place-items:center;">
          <span class="material-symbols-outlined" style="font-size:24px;">account_balance</span>
        </div>
        <div>
          <div style="display:flex; align-items:center; gap: 8px;">
            <h4 style="font-size:15px; font-weight:800;">Vietcombank (Danang Branch)</h4>
            <span class="chip chip-success" style="font-size:11px;">Primary Payout Account</span>
          </div>
          <p style="font-size:13px; color:var(--text-muted);">Account ending in •••• 8892 · Commercial Corporate Account · Automated bi-monthly settlements enabled</p>
        </div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="showPortalToast('Bank account settings are secured by Stripe Connect')">Manage Account</button>
    </div>

    <!-- Payouts Table -->
    <h3 style="font-size:16px; font-weight:800; margin-bottom: 12px;">Disbursement Ledger</h3>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Payout ID</th>
            <th>Disbursement Date</th>
            <th>Gross Revenue</th>
            <th>AirCnC Fee (15%)</th>
            <th>Net Deposited</th>
            <th>Destination</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${payoutsData.map(p => `
            <tr>
              <td><b>${p.id}</b></td>
              <td>${p.date}</td>
              <td>${p.gross}</td>
              <td style="color:var(--text-muted);">${p.fee}</td>
              <td><b style="color:var(--primary); font-size:14.5px;">${p.net}</b></td>
              <td>${p.destination}</td>
              <td>
                <span class="chip ${p.status === 'Deposited' ? 'chip-success' : 'chip-warning'}">${p.status}</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
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
            <input class="form-control" id="staff-booking-code" value="CNC-48291">
            <button class="btn btn-primary" onclick="alert('Booking CNC-48291 verified.')">Search</button>
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
              <td>Jamie Lee (CNC-47520)</td>
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

// --- HOTEL OWNER INTERACTIVE HANDLERS ---

function showPortalToast(msg) {
  const existing = document.querySelector('.portal-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'portal-toast';
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color:var(--primary); font-size:22px;">check_circle</span>
    <span style="font-size:13.5px; font-weight:700; color:var(--text-main);">${msg}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function switchOwnerHotelTab(tab) {
  ownerHotelData.activeTab = tab;
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerHotel(contentArea);
}

function saveHotelGeneralSettings() {
  const nameInput = document.getElementById('oh-name');
  const emailInput = document.getElementById('oh-email');
  const phoneInput = document.getElementById('oh-phone');
  const addressInput = document.getElementById('oh-address');
  const descInput = document.getElementById('oh-desc');
  const checkinInput = document.getElementById('oh-checkin');
  const checkoutInput = document.getElementById('oh-checkout');

  if (nameInput) ownerHotelData.name = nameInput.value;
  if (emailInput) ownerHotelData.email = emailInput.value;
  if (phoneInput) ownerHotelData.phone = phoneInput.value;
  if (addressInput) ownerHotelData.address = addressInput.value;
  if (descInput) ownerHotelData.description = descInput.value;
  if (checkinInput) ownerHotelData.checkinTime = checkinInput.value;
  if (checkoutInput) ownerHotelData.checkoutTime = checkoutInput.value;

  const topbarProp = document.getElementById('portal-topbar-property');
  if (topbarProp) {
    topbarProp.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">hotel</span> ${ownerHotelData.name}`;
  }

  showPortalToast('Hotel profile information updated successfully!');
}

function deleteHotelPhoto(idx) {
  if (ownerHotelData.photos.length <= 1) {
    alert('At least one photo must be kept for the property gallery.');
    return;
  }
  ownerHotelData.photos.splice(idx, 1);
  showPortalToast('Photo removed from property gallery');
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerHotel(contentArea);
}

function uploadHotelPhotoDemo() {
  const samplePhotos = [
    { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=85', title: 'Presidential Suite Bedroom' },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', title: 'Luxury Wellness Spa Pavilion' },
    { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85', title: 'Oceanfront Terrace Sunbed' }
  ];
  const nextPhoto = samplePhotos[ownerHotelData.photos.length % samplePhotos.length];
  ownerHotelData.photos.push({ ...nextPhoto, isCover: false });
  showPortalToast('New photo uploaded to gallery!');
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerHotel(contentArea);
}

function toggleAmenityDemo(id) {
  const item = ownerHotelData.amenities.find(a => a.id === id);
  if (item) {
    item.checked = !item.checked;
    showPortalToast(`${item.label} ${item.checked ? 'enabled' : 'disabled'}`);
  }
}

function saveHotelPoliciesDemo() {
  const quiet = document.getElementById('oh-quiet');
  const age = document.getElementById('oh-age');
  const smoking = document.getElementById('oh-smoking');
  const children = document.getElementById('oh-children');

  if (quiet) ownerHotelData.policies.quietHours = quiet.value;
  if (age) ownerHotelData.policies.minAge = age.value;
  if (smoking) ownerHotelData.policies.smoking = smoking.value;
  if (children) ownerHotelData.policies.children = children.value;

  showPortalToast('Cancellation policy and house rules updated!');
}

function toggleOwnerChartMetric(metric) {
  ownerChartMetric = metric;
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerDashboard(contentArea);
}

// Room Types Handlers
function openAddRoomTypeModal(id) {
  const title = document.getElementById('room-type-modal-title');
  const editId = document.getElementById('edit-room-type-id');
  const nameInput = document.getElementById('rt-name');
  const unitsInput = document.getElementById('rt-units');
  const sizeInput = document.getElementById('rt-size');
  const bedsSelect = document.getElementById('rt-beds');
  const capSelect = document.getElementById('rt-capacity');
  const priceInput = document.getElementById('rt-base-price');
  const highInput = document.getElementById('rt-highlights');

  if (id) {
    const rt = roomTypesData.find(r => r.id === id);
    if (rt) {
      if (title) title.textContent = `Edit Room Type: ${rt.name}`;
      if (editId) editId.value = rt.id;
      if (nameInput) nameInput.value = rt.name;
      if (unitsInput) unitsInput.value = rt.totalUnits;
      if (sizeInput) sizeInput.value = rt.size;
      if (bedsSelect) bedsSelect.value = rt.beds;
      if (capSelect) capSelect.value = `${rt.capacity} Guests`;
      if (priceInput) priceInput.value = rt.basePrice;
      if (highInput) highInput.value = rt.highlights || '';
    }
  } else {
    if (title) title.textContent = 'Add New Room Type';
    if (editId) editId.value = '';
    if (nameInput) nameInput.value = 'Deluxe Horizon Suite';
    if (unitsInput) unitsInput.value = 4;
    if (sizeInput) sizeInput.value = 40;
    if (bedsSelect) bedsSelect.value = '1 King Bed';
    if (capSelect) capSelect.value = '2 Guests';
    if (priceInput) priceInput.value = 150;
    if (highInput) highInput.value = 'Ocean view, Espresso maker, Rain shower, King bed';
  }

  updatePricingCalculator();
  openModal('modal-owner-room-type');
}

function updatePricingCalculator() {
  const priceInput = document.getElementById('rt-base-price');
  const base = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const fee = base * 0.15;
  const total = base + fee;

  const baseEl = document.getElementById('calc-base-val');
  const feeEl = document.getElementById('calc-fee-val');
  const totalEl = document.getElementById('calc-total-val');

  if (baseEl) baseEl.textContent = `$${base.toFixed(2)}`;
  if (feeEl) feeEl.textContent = `+$${fee.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)} / night`;
}

function saveRoomTypeDemo() {
  const editId = document.getElementById('edit-room-type-id').value;
  const name = document.getElementById('rt-name').value.trim() || 'Custom Suite';
  const units = parseInt(document.getElementById('rt-units').value) || 2;
  const size = parseInt(document.getElementById('rt-size').value) || 30;
  const beds = document.getElementById('rt-beds').value;
  const capacity = parseInt(document.getElementById('rt-capacity').value) || 2;
  const basePrice = parseFloat(document.getElementById('rt-base-price').value) || 100;
  const highlights = document.getElementById('rt-highlights').value.trim();

  if (editId) {
    const rt = roomTypesData.find(r => r.id === editId);
    if (rt) {
      rt.name = name;
      rt.totalUnits = units;
      rt.size = size;
      rt.beds = beds;
      rt.capacity = capacity;
      rt.basePrice = basePrice;
      rt.highlights = highlights;
      showPortalToast(`Room type "${name}" updated!`);
    }
  } else {
    const newRt = {
      id: `rt-${Date.now()}`,
      name,
      size,
      beds,
      capacity,
      basePrice,
      feePercent: 15,
      totalUnits: units,
      active: true,
      highlights
    };
    roomTypesData.push(newRt);
    showPortalToast(`Room type "${name}" created!`);
  }

  closeModal('modal-owner-room-type');
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerRoomTypes(contentArea);
}

function toggleRoomTypeStatus(id) {
  const rt = roomTypesData.find(r => r.id === id);
  if (rt) {
    rt.active = !rt.active;
    showPortalToast(`Room type "${rt.name}" is now ${rt.active ? 'ACTIVE' : 'PAUSED'}.`);
    const contentArea = document.getElementById('portal-dynamic-content');
    if (contentArea) renderOwnerRoomTypes(contentArea);
  }
}

// Physical Rooms Handlers
function filterPhysicalRooms(status) {
  currentRoomFilter = status;
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerRooms(contentArea);
}

function openRoomStatusModal(num) {
  const room = physicalRoomsData.find(r => r.number === String(num));
  if (!room) return;

  document.getElementById('m-room-id').value = room.number;
  document.getElementById('m-room-number').textContent = room.number;
  document.getElementById('m-room-typename').textContent = room.type;
  document.getElementById('m-room-floorname').textContent = `Floor ${room.floor}`;
  document.getElementById('m-room-select-status').value = room.status;
  document.getElementById('m-room-notes').value = room.notes || '';

  const guestBox = document.getElementById('m-room-guest-box');
  const guestDesc = document.getElementById('m-room-guest-desc');
  if (room.guest) {
    guestBox.style.display = 'block';
    guestDesc.textContent = `${room.guest.name} · Booking ${room.guest.bookingId} · Check-out ${room.guest.checkout}`;
  } else {
    guestBox.style.display = 'none';
  }

  openModal('modal-owner-room-status');
}

function toggleRoomStatusDetails() {
  const select = document.getElementById('m-room-select-status');
  const guestBox = document.getElementById('m-room-guest-box');
  const num = document.getElementById('m-room-id').value;
  const room = physicalRoomsData.find(r => r.number === String(num));

  if (select.value === 'occupied' && room && room.guest) {
    guestBox.style.display = 'block';
  } else if (select.value === 'occupied' && (!room || !room.guest)) {
    guestBox.style.display = 'block';
    document.getElementById('m-room-guest-desc').textContent = 'Walk-in Guest · Occupied by Frontdesk';
  } else {
    guestBox.style.display = 'none';
  }
}

function saveRoomStatusDemo() {
  const num = document.getElementById('m-room-id').value;
  const status = document.getElementById('m-room-select-status').value;
  const notes = document.getElementById('m-room-notes').value.trim();

  const room = physicalRoomsData.find(r => r.number === String(num));
  if (room) {
    room.status = status;
    room.notes = notes;
    if (status !== 'occupied') {
      room.guest = null;
    }
    showPortalToast(`Room ${num} updated to ${status.toUpperCase()}`);
  }

  closeModal('modal-owner-room-status');
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerRooms(contentArea);
}

// Bookings Handlers
function filterOwnerBookings(status) {
  currentBookingFilter = status;
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerBookings(contentArea);
}

function searchOwnerBookings(query) {
  bookingSearchTerm = query;
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerBookings(contentArea);
}

function openBookingFolio(id) {
  const b = bookingsData.find(item => item.id === id);
  if (!b) return;

  document.getElementById('m-folio-id').textContent = b.id;
  const folioContent = document.getElementById('m-folio-content');
  if (folioContent) {
    folioContent.innerHTML = `
      <div style="background:var(--surface-alt); padding:16px; border-radius:var(--radius-sm); margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="font-size:16px; font-weight:800;">${b.guest}</h4>
          <span class="chip ${b.status === 'Confirmed' || b.status === 'Checked-in' ? 'chip-success' : ''}">${b.status}</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted);">${b.email} · ${b.phone}</p>
      </div>

      <div class="card" style="padding:16px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Stay Dates:</span>
          <b>${b.dates} (${b.nights || 3} nights)</b>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Assigned Room:</span>
          <b>${b.room} (Unit #${b.roomNum || '401'})</b>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13.5px;">
          <span style="color:var(--text-muted);">Payment Method:</span>
          <span class="chip chip-success" style="font-size:11px;">Stripe Card (${b.payment})</span>
        </div>
      </div>

      <div style="background:var(--primary-light); border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:16px;">
        <h5 style="font-size:13.5px; font-weight:800; color:var(--primary-dark); margin-bottom:8px;">Financial Settlement Breakdown</h5>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;">
          <span>Gross Reservation Price:</span>
          <b>${b.total}</b>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; color:var(--text-muted);">
          <span>AirCnC Platform Commission (15%):</span>
          <span>-${b.fee || '$54.00'}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:15px; font-weight:900; color:var(--primary-dark); padding-top:8px; border-top:1px dashed rgba(15,118,110,0.3);">
          <span>Net Payout to Owner:</span>
          <span>${b.net || '$306.00'}</span>
        </div>
      </div>
    `;
  }

  openModal('modal-owner-booking-detail');
}

// Staff Handlers
function openAddStaffModal() {
  openModal('modal-owner-add-staff');
}

function saveStaffMemberDemo() {
  const name = document.getElementById('staff-name').value.trim();
  const email = document.getElementById('staff-email').value.trim();
  const phone = document.getElementById('staff-phone').value.trim();
  const role = document.getElementById('staff-role').value;
  const shift = document.getElementById('staff-shift').value;

  if (!name || !email) {
    alert('Please enter staff name and email address.');
    return;
  }

  const newStaff = {
    id: `st-${staffData.length + 1}`,
    name,
    role,
    shift,
    email,
    phone: phone || '+84 900 000 000',
    status: 'Active'
  };

  staffData.push(newStaff);
  closeModal('modal-owner-add-staff');
  showPortalToast(`Staff invitation sent to ${name}!`);
  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) renderOwnerStaff(contentArea);
}

function deleteStaffMember(id) {
  const idx = staffData.findIndex(s => s.id === id);
  if (idx !== -1) {
    const name = staffData[idx].name;
    staffData.splice(idx, 1);
    showPortalToast(`Staff member ${name} removed`);
    const contentArea = document.getElementById('portal-dynamic-content');
    if (contentArea) renderOwnerStaff(contentArea);
  }
}

// Payouts Handlers
function openRequestPayoutModal() {
  const availEl = document.getElementById('payout-avail-num');
  const amtInput = document.getElementById('payout-req-amt');
  if (availEl) availEl.textContent = `$${ownerFinancials.availableBalance.toFixed(2)}`;
  if (amtInput) amtInput.value = ownerFinancials.availableBalance.toFixed(0);
  openModal('modal-owner-request-payout');
}

function confirmPayoutDemo() {
  const amtInput = document.getElementById('payout-req-amt');
  const reqAmt = parseFloat(amtInput ? amtInput.value : 0) || 0;

  if (reqAmt <= 0) {
    alert('Please enter a valid payout disbursement amount.');
    return;
  }

  if (reqAmt > ownerFinancials.availableBalance) {
    alert('Requested amount exceeds available balance.');
    return;
  }

  ownerFinancials.availableBalance -= reqAmt;
  ownerFinancials.lifetimeEarnings += reqAmt;

  const newPayout = {
    id: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
    date: 'Today (Initiated)',
    gross: `$${(reqAmt * 1.176).toFixed(2)}`,
    fee: `$${(reqAmt * 0.176).toFixed(2)} (15%)`,
    net: `$${reqAmt.toFixed(2)}`,
    destination: 'Vietcombank •••• 8892',
    status: 'Processing'
  };

  payoutsData.unshift(newPayout);
  closeModal('modal-owner-request-payout');
  showPortalToast(`Instant payout of $${reqAmt.toFixed(2)} initiated!`);

  const contentArea = document.getElementById('portal-dynamic-content');
  if (contentArea) {
    const hash = window.location.hash;
    if (hash.includes('owner/payouts')) renderOwnerPayouts(contentArea);
    else if (hash.includes('owner/dashboard')) renderOwnerDashboard(contentArea);
  }
}
