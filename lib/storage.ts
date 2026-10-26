import fs from 'fs';
import path from 'path';
import { Shipment, PickupRequest, SiteContent, CustomerUser } from './types';
import { INITIAL_SHIPMENTS, INITIAL_PICKUPS, DEFAULT_SITE_CONTENT, INITIAL_CUSTOMERS } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const SHIPMENTS_FILE = path.join(DATA_DIR, 'shipments.json');
const PICKUPS_FILE = path.join(DATA_DIR, 'pickups.json');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(SHIPMENTS_FILE)) {
    fs.writeFileSync(SHIPMENTS_FILE, JSON.stringify(INITIAL_SHIPMENTS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(PICKUPS_FILE)) {
    fs.writeFileSync(PICKUPS_FILE, JSON.stringify(INITIAL_PICKUPS, null, 2), 'utf-8');
  }

  if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), 'utf-8');
  }

  if (!fs.existsSync(CUSTOMERS_FILE)) {
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(INITIAL_CUSTOMERS, null, 2), 'utf-8');
  }
}

export function getShipments(): Shipment[] {
  try {
    ensureDataFiles();
    const data = fs.readFileSync(SHIPMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading shipments:', error);
    return INITIAL_SHIPMENTS;
  }
}

export function getShipmentByAwb(awb: string): Shipment | null {
  const shipments = getShipments();
  const cleanAwb = awb.trim().toUpperCase();
  return shipments.find(s => s.awb.toUpperCase() === cleanAwb) || null;
}

export function saveShipment(shipment: Shipment): void {
  ensureDataFiles();
  const shipments = getShipments();
  const index = shipments.findIndex(s => s.awb.toUpperCase() === shipment.awb.toUpperCase());
  if (index >= 0) {
    shipments[index] = shipment;
  } else {
    shipments.unshift(shipment);
  }
  fs.writeFileSync(SHIPMENTS_FILE, JSON.stringify(shipments, null, 2), 'utf-8');
}

export function getPickupRequests(): PickupRequest[] {
  try {
    ensureDataFiles();
    const data = fs.readFileSync(PICKUPS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading pickups:', error);
    return INITIAL_PICKUPS;
  }
}

export function savePickupRequest(pickup: PickupRequest): void {
  ensureDataFiles();
  const pickups = getPickupRequests();
  const index = pickups.findIndex(p => p.id === pickup.id);
  if (index >= 0) {
    pickups[index] = pickup;
  } else {
    pickups.unshift(pickup);
  }
  fs.writeFileSync(PICKUPS_FILE, JSON.stringify(pickups, null, 2), 'utf-8');
}

export function getSiteContent(): SiteContent {
  try {
    ensureDataFiles();
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site content:', error);
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent): void {
  ensureDataFiles();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export function getCustomers(): CustomerUser[] {
  try {
    ensureDataFiles();
    const data = fs.readFileSync(CUSTOMERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading customers:', error);
    return INITIAL_CUSTOMERS;
  }
}

export function saveCustomer(user: CustomerUser): void {
  ensureDataFiles();
  const customers = getCustomers();
  const index = customers.findIndex(c => c.phone === user.phone || c.email === user.email);
  if (index >= 0) {
    customers[index] = user;
  } else {
    customers.push(user);
  }
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2), 'utf-8');
}
