'use server';

import db from '@/src/lib/db';
import { getSession, setSession, clearSession, hashPassword } from '@/src/lib/auth';
import { revalidatePath } from 'next/cache';
import type { CategoryItem, ProductItem, RecipeItem, HeroState, ContactState } from '@/src/lib/adminState';

// Helper to check authorization in server actions
async function requireAuth() {
  const sessionUser = await getSession();
  if (!sessionUser) {
    throw new Error('Yetkisiz işlem! Lütfen giriş yapın.');
  }
}

// ----------------------------------------------------
// AUTH ACTIONS
// ----------------------------------------------------

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, error: 'Lütfen kullanıcı adı ve şifreyi doldurun.' };
  }

  try {
    const user = db.prepare('SELECT * FROM admin WHERE username = ?').get(username) as any;
    if (!user) {
      return { success: false, error: 'Hatalı kullanıcı adı veya şifre.' };
    }

    const hashed = hashPassword(password);
    if (user.password_hash !== hashed) {
      return { success: false, error: 'Hatalı kullanıcı adı veya şifre.' };
    }

    // Set cookie session
    await setSession({ username: user.username });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'Giriş sırasında bir hata oluştu: ' + err.message };
  }
}

export async function logoutAction() {
  await clearSession();
  revalidatePath('/admin');
  return { success: true };
}

export async function updateAdminPasswordAction(formData: FormData) {
  await requireAuth();
  
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  if (!currentPassword || !newPassword) {
    return { success: false, error: 'Lütfen tüm şifre alanlarını doldurun.' };
  }

  try {
    const session = await getSession();
    const user = db.prepare('SELECT * FROM admin WHERE username = ?').get(session.username) as any;

    if (user.password_hash !== hashPassword(currentPassword)) {
      return { success: false, error: 'Mevcut şifre hatalı.' };
    }

    db.prepare('UPDATE admin SET password_hash = ? WHERE username = ?')
      .run(hashPassword(newPassword), session.username);

    return { success: true, message: 'Şifreniz başarıyla güncellendi.' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// HERO ACTIONS
// ----------------------------------------------------

export async function saveHeroAction(data: HeroState) {
  await requireAuth();
  try {
    db.prepare(`
      UPDATE hero 
      SET badge = ?, title = ?, desc = ?, bgImage = ?, btn1Text = ?, btn2Text = ?
      WHERE id = 1
    `).run(data.badge, data.title, data.desc, data.bgImage, data.btn1Text, data.btn2Text);

    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// CATEGORY ACTIONS (BULK SYNC)
// ----------------------------------------------------

export async function syncCategoriesAction(categories: CategoryItem[]) {
  await requireAuth();
  
  const transaction = db.transaction((list: CategoryItem[]) => {
    // 1. Delete existing
    db.prepare('DELETE FROM categories').run();
    
    // 2. Insert new list
    const insert = db.prepare('INSERT INTO categories (id, name, desc) VALUES (?, ?, ?)');
    for (const c of list) {
      insert.run(c.id, c.name, c.desc);
    }
  });

  try {
    transaction(categories);
    revalidatePath('/');
    revalidatePath('/urunler');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// PRODUCT ACTIONS (BULK SYNC)
// ----------------------------------------------------

export async function syncProductsAction(products: ProductItem[]) {
  await requireAuth();
  
  const transaction = db.transaction((list: ProductItem[]) => {
    // 1. Delete existing
    db.prepare('DELETE FROM products').run();
    
    // 2. Insert new list
    const insert = db.prepare(`
      INSERT INTO products (id, name, title, weight, count, category, subType, image, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    for (const p of list) {
      insert.run(
        p.id,
        p.name || null,
        p.title,
        p.weight,
        p.count,
        p.category,
        p.subType || null,
        p.image || null,
        p.description || null
      );
    }
  });

  try {
    transaction(products);
    revalidatePath('/');
    revalidatePath('/urunler');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// RECIPE ACTIONS (BULK SYNC)
// ----------------------------------------------------

export async function syncRecipesAction(recipes: RecipeItem[]) {
  await requireAuth();
  
  const transaction = db.transaction((list: RecipeItem[]) => {
    // 1. Delete existing
    db.prepare('DELETE FROM recipes').run();
    
    // 2. Insert new list
    const insert = db.prepare(`
      INSERT INTO recipes (id, title, desc, time, cat, img)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    for (const r of list) {
      insert.run(r.id, r.title, r.desc, r.time, r.cat, r.img);
    }
  });

  try {
    transaction(recipes);
    revalidatePath('/tarifler');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// CONTACT ACTIONS
// ----------------------------------------------------

export async function saveContactAction(data: ContactState) {
  await requireAuth();
  try {
    db.prepare(`
      UPDATE contact 
      SET phone = ?, phoneSub = ?, whatsapp = ?, whatsappSub = ?, email = ?, emailSub = ?, addressTitle = ?, addressSub = ?, addressValue = ?
      WHERE id = 1
    `).run(
      data.phone,
      data.phoneSub,
      data.whatsapp,
      data.whatsappSub,
      data.email,
      data.emailSub,
      data.addressTitle,
      data.addressSub,
      data.addressValue
    );

    revalidatePath('/');
    revalidatePath('/iletisim');
    revalidatePath('/urunler');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
