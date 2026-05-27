import db from './db';
import type { AdminStateData } from './adminState';

export function getAllData(): AdminStateData {
  const hero = db.prepare('SELECT * FROM hero WHERE id = 1').get() as any;
  const categories = db.prepare('SELECT * FROM categories').all() as any[];
  const products = db.prepare('SELECT * FROM products').all() as any[];
  const recipes = db.prepare('SELECT * FROM recipes').all() as any[];
  const contact = db.prepare('SELECT * FROM contact WHERE id = 1').get() as any;

  return {
    hero: {
      badge: hero.badge,
      title: hero.title,
      desc: hero.desc,
      bgImage: hero.bgImage,
      btn1Text: hero.btn1Text,
      btn2Text: hero.btn2Text,
    },
    categories: categories.map(c => ({
      id: c.id,
      name: c.name,
      desc: c.desc,
    })),
    products: products.map(p => ({
      id: p.id,
      name: p.name || undefined,
      title: p.title,
      weight: p.weight,
      count: p.count,
      category: p.category,
      subType: p.subType || undefined,
      image: p.image || undefined,
      description: p.description || undefined,
    })),
    recipes: recipes.map(r => ({
      id: r.id,
      title: r.title,
      desc: r.desc,
      time: r.time,
      cat: r.cat,
      img: r.img,
    })),
    contact: {
      phone: contact.phone,
      phoneSub: contact.phoneSub,
      whatsapp: contact.whatsapp,
      whatsappSub: contact.whatsappSub,
      email: contact.email,
      emailSub: contact.emailSub,
      addressTitle: contact.addressTitle,
      addressSub: contact.addressSub,
      addressValue: contact.addressValue,
    },
  };
}
