import { Pool } from 'pg';
import { Shipment, PickupRequest, SiteContent, CustomerUser } from './types';
import { INITIAL_SHIPMENTS, INITIAL_PICKUPS, DEFAULT_SITE_CONTENT, INITIAL_CUSTOMERS } from './data';

const connectionString = 
  process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_QR5HJ7ajNiXp@ep-sweet-cell-b4710xop-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Create singleton pool for Next.js
declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

const pool = global.__dbPool || new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
});

if (process.env.NODE_ENV !== 'production') {
  global.__dbPool = pool;
}

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;

  try {
    const client = await pool.connect();
    try {
      // 1. Create tables if they do not exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS shipments (
          awb VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS pickups (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS site_content (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS customers (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL
        );
      `);

      // 2. Check and seed initial shipments if empty
      const shipCount = await client.query('SELECT COUNT(*) FROM shipments');
      if (parseInt(shipCount.rows[0].count, 10) === 0) {
        for (const s of INITIAL_SHIPMENTS) {
          await client.query(
            'INSERT INTO shipments (awb, data) VALUES ($1, $2) ON CONFLICT (awb) DO NOTHING',
            [s.awb, JSON.stringify(s)]
          );
        }
      }

      // 3. Check and seed initial pickups if empty
      const pickupCount = await client.query('SELECT COUNT(*) FROM pickups');
      if (parseInt(pickupCount.rows[0].count, 10) === 0) {
        for (const p of INITIAL_PICKUPS) {
          await client.query(
            'INSERT INTO pickups (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
            [p.id, JSON.stringify(p)]
          );
        }
      }

      // 4. Check and seed initial site content if empty
      const contentCount = await client.query('SELECT COUNT(*) FROM site_content');
      if (parseInt(contentCount.rows[0].count, 10) === 0) {
        await client.query(
          'INSERT INTO site_content (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
          ['main', JSON.stringify(DEFAULT_SITE_CONTENT)]
        );
      }

      // 5. Check and seed initial customers if empty
      const custCount = await client.query('SELECT COUNT(*) FROM customers');
      if (parseInt(custCount.rows[0].count, 10) === 0) {
        for (const c of INITIAL_CUSTOMERS) {
          await client.query(
            'INSERT INTO customers (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
            [c.id, JSON.stringify(c)]
          );
        }
      }

      isInitialized = true;
      console.log('Neon PostgreSQL connected and schema verified.');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Failed to initialize Neon DB:', error);
  }
}

// SHIPMENTS
export async function getShipments(): Promise<Shipment[]> {
  await initDb();
  try {
    const res = await pool.query('SELECT data FROM shipments ORDER BY updated_at DESC');
    if (res.rows.length > 0) {
      return res.rows.map(r => r.data as Shipment);
    }
  } catch (error) {
    console.error('Error fetching shipments from Neon DB:', error);
  }
  return INITIAL_SHIPMENTS;
}

export async function getShipmentByAwb(awb: string): Promise<Shipment | null> {
  await initDb();
  try {
    const cleanAwb = awb.trim().toUpperCase();
    const res = await pool.query(
      'SELECT data FROM shipments WHERE UPPER(awb) = $1 LIMIT 1',
      [cleanAwb]
    );
    if (res.rows.length > 0) {
      return res.rows[0].data as Shipment;
    }
  } catch (error) {
    console.error(`Error fetching AWB ${awb} from Neon DB:`, error);
  }
  // Fallback to in-memory initial shipments
  return INITIAL_SHIPMENTS.find(s => s.awb.toUpperCase() === awb.trim().toUpperCase()) || null;
}

export async function saveShipment(shipment: Shipment): Promise<void> {
  await initDb();
  try {
    await pool.query(
      `INSERT INTO shipments (awb, data, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (awb) DO UPDATE 
       SET data = $2, updated_at = NOW()`,
      [shipment.awb, JSON.stringify(shipment)]
    );
  } catch (error) {
    console.error('Error saving shipment to Neon DB:', error);
    throw error;
  }
}

// PICKUPS
export async function getPickupRequests(): Promise<PickupRequest[]> {
  await initDb();
  try {
    const res = await pool.query('SELECT data FROM pickups ORDER BY created_at DESC');
    if (res.rows.length > 0) {
      return res.rows.map(r => r.data as PickupRequest);
    }
  } catch (error) {
    console.error('Error fetching pickups from Neon DB:', error);
  }
  return INITIAL_PICKUPS;
}

export async function savePickupRequest(pickup: PickupRequest): Promise<void> {
  await initDb();
  try {
    await pool.query(
      `INSERT INTO pickups (id, data, created_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (id) DO UPDATE 
       SET data = $2`,
      [pickup.id, JSON.stringify(pickup)]
    );
  } catch (error) {
    console.error('Error saving pickup to Neon DB:', error);
    throw error;
  }
}

// SITE CONTENT (CMS)
export async function getSiteContent(): Promise<SiteContent> {
  await initDb();
  try {
    const res = await pool.query("SELECT data FROM site_content WHERE id = 'main' LIMIT 1");
    if (res.rows.length > 0) {
      return res.rows[0].data as SiteContent;
    }
  } catch (error) {
    console.error('Error fetching site content from Neon DB:', error);
  }
  return DEFAULT_SITE_CONTENT;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await initDb();
  try {
    await pool.query(
      `INSERT INTO site_content (id, data, updated_at) 
       VALUES ('main', $1, NOW()) 
       ON CONFLICT (id) DO UPDATE 
       SET data = $1, updated_at = NOW()`,
      [JSON.stringify(content)]
    );
  } catch (error) {
    console.error('Error saving site content to Neon DB:', error);
    throw error;
  }
}

// CUSTOMERS
export async function getCustomers(): Promise<CustomerUser[]> {
  await initDb();
  try {
    const res = await pool.query('SELECT data FROM customers');
    if (res.rows.length > 0) {
      return res.rows.map(r => r.data as CustomerUser);
    }
  } catch (error) {
    console.error('Error fetching customers from Neon DB:', error);
  }
  return INITIAL_CUSTOMERS;
}

export default pool;
