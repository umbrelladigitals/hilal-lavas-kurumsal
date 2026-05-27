"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  saveHeroAction,
  syncCategoriesAction,
  syncProductsAction,
  syncRecipesAction,
  saveContactAction,
} from '@/src/app/actions';

export interface CategoryItem {
  id: string;
  name: string;
  desc: string;
}

export interface HeroState {
  badge: string;
  title: string;
  desc: string;
  bgImage: string;
  btn1Text: string;
  btn2Text: string;
}

export interface ProductItem {
  id: string;
  name?: string;
  title: string;
  weight: string;
  count: string;
  category: string;
  subType?: 'taco' | 'klasik' | 'burger' | 'durum' | 'premium';
  image?: string;
  description?: string;
}

export interface RecipeItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  cat: string;
  img: string;
}

export interface ContactState {
  phone: string;
  phoneSub: string;
  whatsapp: string;
  whatsappSub: string;
  email: string;
  emailSub: string;
  addressTitle: string;
  addressSub: string;
  addressValue: string;
}

export interface AdminStateData {
  categories: CategoryItem[];
  hero: HeroState;
  products: ProductItem[];
  recipes: RecipeItem[];
  contact: ContactState;
}

interface AdminContextType extends AdminStateData {
  updateCategories: (data: CategoryItem[]) => void;
  updateHero: (data: HeroState) => void;
  updateProducts: (data: ProductItem[]) => void;
  updateRecipes: (data: RecipeItem[]) => void;
  updateContact: (data: ContactState) => void;
}

const AdminStateContext = createContext<AdminContextType | undefined>(undefined);

export function useAdminState() {
  const context = useContext(AdminStateContext);
  if (!context) {
    throw new Error('useAdminState must be used within an AdminStateProvider');
  }
  return context;
}

interface ProviderProps {
  children: React.ReactNode;
  initialData: AdminStateData;
}

export function AdminStateProvider({ children, initialData }: ProviderProps) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialData.categories);
  const [hero, setHero] = useState<HeroState>(initialData.hero);
  const [products, setProducts] = useState<ProductItem[]>(initialData.products);
  const [recipes, setRecipes] = useState<RecipeItem[]>(initialData.recipes);
  const [contact, setContact] = useState<ContactState>(initialData.contact);

  // Sync state if initialData changes on server revalidation
  useEffect(() => {
    setCategories(initialData.categories);
    setHero(initialData.hero);
    setProducts(initialData.products);
    setRecipes(initialData.recipes);
    setContact(initialData.contact);
  }, [initialData]);

  const updateCategories = async (data: CategoryItem[]) => {
    setCategories(data);
    try {
      await syncCategoriesAction(data);
    } catch (err) {
      console.error('Failed to sync categories to database:', err);
    }
  };

  const updateHero = async (data: HeroState) => {
    setHero(data);
    try {
      await saveHeroAction(data);
    } catch (err) {
      console.error('Failed to sync hero to database:', err);
    }
  };

  const updateProducts = async (data: ProductItem[]) => {
    setProducts(data);
    try {
      await syncProductsAction(data);
    } catch (err) {
      console.error('Failed to sync products to database:', err);
    }
  };

  const updateRecipes = async (data: RecipeItem[]) => {
    setRecipes(data);
    try {
      await syncRecipesAction(data);
    } catch (err) {
      console.error('Failed to sync recipes to database:', err);
    }
  };

  const updateContact = async (data: ContactState) => {
    setContact(data);
    try {
      await saveContactAction(data);
    } catch (err) {
      console.error('Failed to sync contact to database:', err);
    }
  };

  const value: AdminContextType = {
    categories,
    hero,
    products,
    recipes,
    contact,
    updateCategories,
    updateHero,
    updateProducts,
    updateRecipes,
    updateContact,
  };

  return React.createElement(AdminStateContext.Provider, { value }, children);
}
