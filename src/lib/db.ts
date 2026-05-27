import Database from 'better-sqlite3';
import path from 'path';

let _db: any = null;

function initDb() {
  if (_db) return _db;

  const dbPath = path.join(process.cwd(), 'hilal.db');
  const dbInstance = new Database(dbPath);

  // Enable WAL mode for better performance
  dbInstance.pragma('journal_mode = WAL');

  // Initialize database schema
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hero (
      id INTEGER PRIMARY KEY DEFAULT 1,
      badge TEXT NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      bgImage TEXT NOT NULL,
      btn1Text TEXT NOT NULL,
      btn2Text TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      desc TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      title TEXT NOT NULL,
      weight TEXT NOT NULL,
      count TEXT NOT NULL,
      category TEXT NOT NULL,
      subType TEXT,
      image TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      time TEXT NOT NULL,
      cat TEXT NOT NULL,
      img TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY DEFAULT 1,
      phone TEXT NOT NULL,
      phoneSub TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      whatsappSub TEXT NOT NULL,
      email TEXT NOT NULL,
      emailSub TEXT NOT NULL,
      addressTitle TEXT NOT NULL,
      addressSub TEXT NOT NULL,
      addressValue TEXT NOT NULL
    );
  `);

  // Seed default data if empty
  const adminCount = dbInstance.prepare('SELECT count(*) as count FROM admin').get() as { count: number };
  if (adminCount.count === 0) {
    // Default password: admin123 (hashed using SHA-256 for simple secure storage)
    // SHA-256 hash of "admin123": '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
    dbInstance.prepare('INSERT OR IGNORE INTO admin (username, password_hash) VALUES (?, ?)')
      .run('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9');
  }

  const heroCount = dbInstance.prepare('SELECT count(*) as count FROM hero').get() as { count: number };
  if (heroCount.count === 0) {
    dbInstance.prepare(`
      INSERT OR IGNORE INTO hero (id, badge, title, desc, bgImage, btn1Text, btn2Text)
      VALUES (1, ?, ?, ?, ?, ?, ?)
    `).run(
      "HİLAL LAVAŞ",
      "Gelenekten Geleceğe",
      "En kaliteli buğdaydan, hijyenik tesislerde üretilen lavaş ve unlu mamüller.",
      "https://placehold.co/1920x1080/e5e7eb/a1a1aa?text=HERO+ARKAPLAN",
      "TÜM ÜRÜNLER",
      "BİZİ TANIYIN"
    );
  }

  const categoryCount = dbInstance.prepare('SELECT count(*) as count FROM categories').get() as { count: number };
  if (categoryCount.count === 0) {
    const DEFAULT_CATEGORIES = [
      { id: 'lavas', name: 'LAVAŞ', desc: 'Yumuşacık, esnek ve dayanıklı yapısıyla her sofraya uyum sağlar.' },
      { id: 'gobit', name: 'GOBİT (YUVARLAK PİDE)', desc: 'Yuvarlak formu ve özel dokusuyla geleneksel lezzet.' },
      { id: 'tirnakli', name: 'TIRNAKLI PİDE', desc: 'Geleneksel taş fırın lezzeti, çıtır dokusu ile.' },
      { id: 'tortilla', name: 'TORTILLA', desc: 'Esnek yapısıyla tariflerinize lezzet katar.' },
      { id: 'donuk', name: 'DONUK ÜRÜNLER', desc: 'Lezzetini koruyan, pratik ve uzun ömürlü donuk ürünlerimiz.' },
    ];

    const insert = dbInstance.prepare('INSERT OR IGNORE INTO categories (id, name, desc) VALUES (?, ?, ?)');
    for (const cat of DEFAULT_CATEGORIES) {
      insert.run(cat.id, cat.name, cat.desc);
    }
  }

  const productCount = dbInstance.prepare('SELECT count(*) as count FROM products').get() as { count: number };
  if (productCount.count === 0) {
    const DEFAULT_PRODUCTS = [
      { id: 'sc1', name: "Geleneksel Lavaş", title: "30x30 cm", weight: "90 g", count: "20 Adet", image: "/images/product_lavas.png", category: 'showcase' },
      { id: 'sc2', name: "Tam Buğday Lavaş", title: "33x60 cm", weight: "120 g", count: "20 Adet", image: "/images/product_lavas_wheat.png", category: 'showcase' },
      { id: 'sc3', name: "Tortilla Dürüm", title: "25x25 cm", weight: "80 g", count: "9 Adet", image: "/images/product_tortilla.png", category: 'showcase' },
      { id: 'sc4', name: "Geleneksel Gobit", title: "20x20 cm", weight: "170 g", count: "20 Adet", image: "/images/product_gobit.png", category: 'showcase' },
      { id: 'lv1', name: null, title: '30x30 cm', weight: '90 g', count: '20 Adet', image: '/images/product_lavas.png', category: 'lavas' },
      { id: 'lv2', name: null, title: '33x60 cm', weight: '120 g', count: '20 Adet', image: '/images/product_lavas.png', category: 'lavas' },
      { id: 'lv3', name: null, title: '38x60 cm', weight: '150 g', count: '20 Adet', image: '/images/product_lavas.png', category: 'lavas' },
      { id: 'lv4', name: null, title: '33x80 cm', weight: '150 g', count: '20 Adet', image: '/images/product_lavas.png', category: 'lavas' },
      { id: 'gb1', name: null, title: '25x25 cm', weight: '170 g', count: '20 Adet', image: '/images/product_gobit.png', category: 'gobit' },
      { id: 'gb2', name: null, title: '20x20 cm', weight: '120 g', count: '20 Adet', image: '/images/product_gobit.png', category: 'gobit' },
      { id: 'gb3', name: null, title: '15x15 cm', weight: '70 g', count: '20 Adet', image: '/images/product_gobit.png', category: 'gobit' },
      { id: 'tp1', name: null, title: '20x20 cm', weight: '170 g', count: '20 Adet', image: '/images/product_pide.png', category: 'tirnakli' },
      { id: 'tp2', name: null, title: '15x15 cm', weight: '100 g', count: '20 Adet', image: '/images/product_pide.png', category: 'tirnakli' },
      { id: 'tp3', name: null, title: '10x10 cm', weight: '60 g', count: '20 Adet', image: '/images/product_pide.png', category: 'tirnakli' },
      { id: 'tr1', name: 'Taco', title: '15x15 cm', weight: '40 g', count: '9 Adet', image: '/images/product_tortilla.png', category: 'tortilla', subType: 'taco' },
      { id: 'tr2', name: 'Klasik', title: '20x20 cm', weight: '70 g', count: '9 Adet', image: '/images/product_tortilla.png', category: 'tortilla', subType: 'klasik' },
      { id: 'tr3', name: 'Burger', title: '25x25 cm', weight: '80 g', count: '9 Adet', image: '/images/product_tortilla.png', category: 'tortilla', subType: 'burger' },
      { id: 'tr4', name: 'Dürüm', title: '30x30 cm', weight: '90 g', count: '9 Adet', image: '/images/product_tortilla.png', category: 'tortilla', subType: 'durum' },
      { id: 'tr5', name: 'Premium', title: '33x33 cm', weight: '120 g', count: '9 Adet', image: '/images/product_tortilla.png', category: 'tortilla', subType: 'premium' },
      { id: 'dk1', name: 'Donuk Lavaş', title: '30x30 cm', weight: '90 g', count: '20 Adet', image: '/images/product_donuk_lavas.png', category: 'donuk', subType: 'lavas' },
      { id: 'dk2', name: 'Donuk Tortilla', title: '25x25 cm', weight: '80 g', count: '9 Adet', image: '/images/product_donuk_tortilla.png', category: 'donuk', subType: 'tortilla' },
      { id: 'dk3', name: 'Donuk Tırnaklı Pide', title: '20x20 cm', weight: '170 g', count: '20 Adet', image: '/images/product_donuk_pide.png', category: 'donuk', subType: 'tirnakli' },
      { id: 'dk4', name: 'Donuk Gobit', title: '20x20 cm', weight: '120 g', count: '20 Adet', image: '/images/product_donuk_gobit.png', category: 'donuk', subType: 'gobit' },
    ];

    const insert = dbInstance.prepare(`
      INSERT OR IGNORE INTO products (id, name, title, weight, count, category, subType, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of DEFAULT_PRODUCTS) {
      insert.run(p.id, p.name || null, p.title, p.weight, p.count, p.category, p.subType || null, p.image || null, null);
    }
  }

  const recipeCount = dbInstance.prepare('SELECT count(*) as count FROM recipes').get() as { count: number };
  if (recipeCount.count === 0) {
    const DEFAULT_RECIPES = [
      { title: 'Tavuklu Lavaş Dürüm', desc: 'Yumuşacık Hilal Lavaş ile hazırlanan pratik ve doyurucu tavuk dürüm.', time: '15 dk', cat: 'Ana Yemek', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=DURUM' },
      { title: 'Peynirli Gözleme', desc: 'Klasik lezzetlerin vazgeçilmezi peynirli gözleme tarifi.', time: '20 dk', cat: 'Kahvaltılık', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=GOZLEME' },
      { title: 'Lavaş Pizza', desc: 'Pratik lavaş pizza tarifi ile kısa sürede lezzet şöleni.', time: '25 dk', cat: 'Atıştırmalık', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=PIZZA' },
      { title: 'Kıymalı Börek', desc: 'Çıtır çıtır kıymalı börek tarifi, Hilal Lavaş ile çok daha kolay.', time: '25 dk', cat: 'Ana Yemek', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=BOREK' },
      { title: 'Lavaş Cips', desc: 'Fırında çıtır lavaş cips tarifi, sağlıklı atıştırmalık alternatifi.', time: '10 dk', cat: 'Atıştırmalık', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=CIPS' },
      { title: 'Fattoush Salata', desc: 'Ortadoğu\'nun ferahlatıcı lezzeti Hilal Lavaş ile.', time: '15 dk', cat: 'Vejetaryen', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=SALATA' },
      { title: 'Lavaş Rulo Tatlı', desc: 'Kolayca hazırlayabileceğiniz pratik ve lezzetli tatlı.', time: '15 dk', cat: 'Tatlı', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=TATLI' },
      { title: 'Su Böreği', desc: 'Geleneksel su böreği tarifi Hilal Lavaş ile kolay ve lezzetli.', time: '30 dk', cat: 'Ana Yemek', img: 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=SU+BOREGI' },
    ];

    const insert = dbInstance.prepare('INSERT OR IGNORE INTO recipes (title, desc, time, cat, img) VALUES (?, ?, ?, ?, ?)');
    for (const r of DEFAULT_RECIPES) {
      insert.run(r.title, r.desc, r.time, r.cat, r.img);
    }
  }

  const contactCount = dbInstance.prepare('SELECT count(*) as count FROM contact').get() as { count: number };
  if (contactCount.count === 0) {
    dbInstance.prepare(`
      INSERT OR IGNORE INTO contact (id, phone, phoneSub, whatsapp, whatsappSub, email, emailSub, addressTitle, addressSub, addressValue)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "+90 538 390 81 69",
      "Hafta içi 08:00 - 18:00",
      "+90 538 390 81 69",
      "Hızlı Destek Hattı",
      "info@hilallavas.com",
      "7/24 Bize Yazabilirsiniz",
      "Adres",
      "Saray Mah. 86 Cad. No:5/A",
      "Kahramankazan / ANKARA"
    );
  }

  _db = dbInstance;
  return _db;
}

// Proxy wrapper to lazy-initialize better-sqlite3 database only on first call
const db = new Proxy({}, {
  get(target, prop) {
    const instance = initDb();
    const value = Reflect.get(instance, prop);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
}) as any;

export default db;
