// RecycleData.js

export const recycleDataMap = {
  Plastic: [
    { id: '1', title: 'PET #1', desc: 'Thin plastic bottles (water, soda)' },
    { id: '2', title: 'PP #5', desc: 'Yogurt containers, straws, caps' },
    { id: '3', title: 'HDPE #2', desc: 'Thick plastic bottles (milk, detergent)' },
  ],
  Metal: [
    { id: '1', title: 'Aluminum', desc: 'Soda cans, foil (clean)' },
    { id: '2', title: 'Steel', desc: 'Food cans, bottle caps' },
  ],
  Paper: [
    { id: '1', title: 'Newspaper', desc: 'Old newspapers, flyers' },
    { id: '2', title: 'Cardboard', desc: 'Shipping boxes (flattened)' },
    { id: '3', title: 'Office Paper', desc: 'Printer paper, envelopes' },
  ],
  Glass: [
    { id: '1', title: 'Clear Glass', desc: 'Bottles and jars (no lids)' },
    { id: '2', title: 'Green/Brown Glass', desc: 'Beer bottles, sauce jars' },
  ],
  Electronic: [
    { id: '1', title: 'E-Waste', desc: 'Old phones, computers, chargers' },
    { id: '2', title: 'Batteries', desc: 'Rechargeable & lithium-ion' },
  ],
  Organic: [
    { id: '1', title: 'Food Scraps', desc: 'Vegetables, fruit peels' },
    { id: '2', title: 'Yard Waste', desc: 'Leaves, grass, branches' },
  ],
};

export const nonRecycleDataMap = {
  Plastic: [
    { id: '1', title: 'PVC #3', desc: 'Pipes, cling wrap, blister packs' },
    { id: '2', title: 'PS #6', desc: 'Foam cups, Styrofoam trays' },
    { id: '3', title: 'Other #7', desc: 'Mixed plastics, unknown items' },
  ],
  Metal: [
    { id: '1', title: 'Paint Cans', desc: 'Even if empty' },
    { id: '2', title: 'Aerosol Cans', desc: 'Hairspray, deodorant' },
  ],
  Paper: [
    { id: '1', title: 'Soiled Paper', desc: 'Greasy pizza boxes, tissue paper' },
    { id: '2', title: 'Waxed Paper', desc: 'Juice boxes, laminated paper' },
  ],
  Glass: [
    { id: '1', title: 'Ceramics', desc: 'Plates, mugs' },
    { id: '2', title: 'Window Glass', desc: 'Mirrors, broken glass' },
  ],
  Electronic: [
    { id: '1', title: 'Broken Bulbs', desc: 'CFL/LED light bulbs' },
    { id: '2', title: 'Non-recyclable Cables', desc: 'Frayed or damaged wires' },
  ],
  Organic: [
    { id: '1', title: 'Meat & Bones', desc: 'Not suitable for compost' },
    { id: '2', title: 'Dairy Products', desc: 'Milk, cheese, butter' },
  ],
};
