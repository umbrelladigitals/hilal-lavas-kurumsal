"use client";

import React, { useState } from 'react';
import { useAdminState, ProductItem, RecipeItem } from '../../lib/adminState';
import ImageUploader from '../ui/ImageUploader';
import { logoutAction } from '@/src/app/actions';
import { 
  Layout, 
  Package, 
  Utensils, 
  PhoneCall, 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  Sparkles, 
  Eye, 
  Search,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function Admin() {
  const { 
    categories,
    hero, 
    products, 
    recipes, 
    contact, 
    updateCategories,
    updateHero, 
    updateProducts, 
    updateRecipes, 
    updateContact 
  } = useAdminState();

  const [activeTab, setActiveTab] = useState<'hero' | 'products' | 'categories' | 'recipes' | 'contact'>('hero');
  const [notification, setNotification] = useState<string | null>(null);

  // ----------------------------------------------------
  // HERO FIELD STATES
  // ----------------------------------------------------
  const [heroBadge, setHeroBadge] = useState(hero.badge);
  const [heroTitle, setHeroTitle] = useState(hero.title);
  const [heroDesc, setHeroDesc] = useState(hero.desc);
  const [heroBg, setHeroBg] = useState(hero.bgImage);
  const [heroBtn1, setHeroBtn1] = useState(hero.btn1Text);
  const [heroBtn2, setHeroBtn2] = useState(hero.btn2Text);

  // ----------------------------------------------------
  // PRODUCTS FIELD STATES
  // ----------------------------------------------------
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'lv1');
  const [isAddProductMode, setIsAddProductMode] = useState(false);
  const [prodCategory, setProdCategory] = useState<string>('lavas');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const [prodName, setProdName] = useState(selectedProduct?.name || '');
  const [prodTitle, setProdTitle] = useState(selectedProduct?.title || '');
  const [prodWeight, setProdWeight] = useState(selectedProduct?.weight || '');
  const [prodCount, setProdCount] = useState(selectedProduct?.count || '');
  const [prodDesc, setProdDesc] = useState(selectedProduct?.description || '');
  const [prodImg, setProdImg] = useState(selectedProduct?.image || '');
  const [prodSubType, setProdSubType] = useState<'taco' | 'klasik' | 'burger' | 'durum' | 'premium' | undefined>(selectedProduct?.subType || 'klasik');
  
  const [catalogFilter, setCatalogFilter] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState('');

  // Keep fields synchronized when selected product changes
  const handleProductSelect = (id: string) => {
    setIsAddProductMode(false);
    setSelectedProductId(id);
    const target = products.find(p => p.id === id);
    if (target) {
      setProdName(target.name || '');
      setProdTitle(target.title || '');
      setProdWeight(target.weight || '');
      setProdCount(target.count || '');
      setProdDesc(target.description || '');
      setProdImg(target.image || '');
      setProdSubType(target.subType || 'klasik');
    }
  };

  const handleStartAddProduct = () => {
    setIsAddProductMode(true);
    setSelectedProductId('');
    setProdCategory('lavas');
    setProdName('');
    setProdTitle('');
    setProdWeight('90 g');
    setProdCount('20 Adet');
    setProdDesc('');
    setProdImg('');
    setProdSubType('klasik');
  };

  // ----------------------------------------------------
  // RECIPES FIELD STATES (Add / Edit Form)
  // ----------------------------------------------------
  const [recipeSearch, setRecipeSearch] = useState('');
  const [recipeFormId, setRecipeFormId] = useState<number | null>(null); // null = "add new" mode
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDesc, setRecipeDesc] = useState('');
  const [recipeTime, setRecipeTime] = useState('15 dk');
  const [recipeCat, setRecipeCat] = useState('Ana Yemek');
  const [recipeImg, setRecipeImg] = useState('https://placehold.co/600x400/e5e7eb/a1a1aa?text=TARIF');

  // ----------------------------------------------------
  // CONTACT FIELD STATES
  // ----------------------------------------------------
  const [conPhone, setConPhone] = useState(contact.phone);
  const [conPhoneSub, setConPhoneSub] = useState(contact.phoneSub);
  const [conWhatsapp, setConWhatsapp] = useState(contact.whatsapp);
  const [conWhatsappSub, setConWhatsappSub] = useState(contact.whatsappSub);
  const [conEmail, setConEmail] = useState(contact.email);
  const [conEmailSub, setConEmailSub] = useState(contact.emailSub);
  const [conAddrTitle, setConAddrTitle] = useState(contact.addressTitle);
  const [conAddrSub, setConAddrSub] = useState(contact.addressSub);
  const [conAddrVal, setConAddrVal] = useState(contact.addressValue);

  // ----------------------------------------------------
  // CATEGORIES FIELD STATES
  // ----------------------------------------------------
  const [catFormId, setCatFormId] = useState<string>(''); // empty implies adding a new one
  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const handleEditCategory = (c: any) => {
    setCatFormId(c.id);
    setCatId(c.id);
    setCatName(c.name);
    setCatDesc(c.desc);
    const formElement = document.getElementById('category-editor-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catId.trim() || !catName.trim()) {
      alert('Lütfen Kategori ID ve Kategori Adı alanlarını doldurun.');
      return;
    }
    
    // ID slugification (e.g., "Donuk Ürünler" -> "donuk-urunler")
    const cleanId = catId.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (catFormId) {
      const updated = categories.map(c => 
        c.id === catFormId ? { id: cleanId, name: catName, desc: catDesc } : c
      );
      updateCategories(updated);
      
      // Also update products if ID changed
      if (cleanId !== catFormId) {
        const updatedProducts = products.map(p => 
          p.category === catFormId ? { ...p, category: cleanId } : p
        );
        updateProducts(updatedProducts);
      }
      
      showNotification('Kategori başarıyla güncellendi ! 📁');
      setCatFormId('');
    } else {
      if (categories.find(c => c.id === cleanId)) {
        alert('Bu ID ile bir kategori zaten mevcut!');
        return;
      }
      updateCategories([...categories, { id: cleanId, name: catName, desc: catDesc }]);
      showNotification('Yeni kategori portföye eklendi ! 🎉');
    }
    // reset form
    setCatId('');
    setCatName('');
    setCatDesc('');
  };

  const handleDeleteCategory = (id: string) => {
    if (products.some(p => p.category === id)) {
      alert('Bu kategoriye ait ürünler bulunuyor. Öncelikle o ürünleri silin veya başka kategoriye taşıyın.');
      return;
    }
    if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      const filtered = categories.filter(c => c.id !== id);
      updateCategories(filtered);
      showNotification('Kategori sistemden tamamen kaldırıldı.');
      if (catFormId === id) setCatFormId('');
    }
  };

  // ----------------------------------------------------
  // SAVE TRIGGERS & MESSAGES
  // ----------------------------------------------------
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero({
      badge: heroBadge,
      title: heroTitle,
      desc: heroDesc,
      bgImage: heroBg,
      btn1Text: heroBtn1,
      btn2Text: heroBtn2
    });
    showNotification('Ana sayfa kampanya verileri başarıyla güncellendi ! 🔥');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddProductMode) {
      if (!prodTitle.trim() || !prodWeight.trim()) {
        alert('Lütfen en azından Ürün Boyutu / Ebatı ve Ağırlığı alanlarını doldurun.');
        return;
      }
      const prefix = prodCategory === 'lavas' ? 'lv' 
        : prodCategory === 'gobit' ? 'gb'
        : prodCategory === 'tirnakli' ? 'tp'
        : prodCategory === 'tortilla' ? 'tr' : 'sc';
      const newId = `${prefix}_${Date.now()}`;
      const newProduct: ProductItem = {
        id: newId,
        category: prodCategory,
        name: prodName.trim() ? prodName : undefined,
        title: prodTitle,
        weight: prodWeight,
        count: prodCount || '20 Adet',
        subType: prodCategory === 'tortilla' ? prodSubType : undefined,
        description: prodDesc.trim() ? prodDesc : undefined,
        image: prodImg.trim() ? prodImg : undefined,
      };
      
      const updated = [...products, newProduct];
      updateProducts(updated);
      setSelectedProductId(newId);
      setIsAddProductMode(false);
      showNotification(`"${prodTitle}" ürünü yeni ürün kategorisine başarıyla eklendi! 🎉`);
    } else {
      const updated = products.map(p => {
        if (p.id === selectedProductId) {
          return {
            ...p,
            name: prodName.trim() ? prodName : undefined,
            title: prodTitle,
            weight: prodWeight,
            count: prodCount,
            subType: p.category === 'tortilla' ? prodSubType : undefined,
            description: prodDesc.trim() ? prodDesc : undefined,
            image: prodImg.trim() ? prodImg : undefined,
          };
        }
        return p;
      });
      updateProducts(updated);
      showNotification(`"${prodTitle || prodName}" ürün spesifikasyonları güncellendi ve paket şablonları senkronize edildi! 👋`);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bu ürünü katalogdan tamamen silmek istediğinize emin misiniz?')) {
      const updated = products.filter(p => p.id !== id);
      updateProducts(updated);
      showNotification('Ürün katalogdan başarıyla kaldırıldı !');
      if (updated.length > 0) {
        const first = updated[0];
        setSelectedProductId(first.id);
        setProdName(first.name || '');
        setProdTitle(first.title);
        setProdWeight(first.weight);
        setProdCount(first.count);
        setProdDesc(first.description || '');
        setProdImg(first.image || '');
        setProdSubType(first.subType || 'klasik');
      } else {
        setSelectedProductId('');
        setProdName('');
        setProdTitle('');
        setProdWeight('');
        setProdCount('');
        setProdDesc('');
        setProdImg('');
        setProdSubType('klasik');
      }
    }
  };

  const handleSaveRecipeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeTitle.trim() || !recipeDesc.trim()) {
      alert('Lütfen yemek tarifi başlığı ve kısa açıklamasını doldurun.');
      return;
    }

    if (recipeFormId !== null) {
      // Edit mode
      const updated = recipes.map(r => {
        if (r.id === recipeFormId) {
          return {
            id: r.id,
            title: recipeTitle,
            desc: recipeDesc,
            time: recipeTime,
            cat: recipeCat,
            img: recipeImg
          };
        }
        return r;
      });
      updateRecipes(updated);
      showNotification('Yemek tarifi başarıyla revize edildi ! 🍲');
      // Reset form mode
      setRecipeFormId(null);
    } else {
      // Add mode
      const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
      const newItem: RecipeItem = {
        id: newId,
        title: recipeTitle,
        desc: recipeDesc,
        time: recipeTime,
        cat: recipeCat,
        img: recipeImg
      };
      updateRecipes([newItem, ...recipes]);
      showNotification('Yeni yemek tarifi sistem portföyüne eklendi ! 🎉');
    }

    // Reset fields
    setRecipeTitle('');
    setRecipeDesc('');
    setRecipeTime('15 dk');
    setRecipeCat('Ana Yemek');
    setRecipeImg('https://placehold.co/600x400/e5e7eb/a1a1aa?text=TARIF');
  };

  const handleEditRecipeClick = (r: RecipeItem) => {
    setRecipeFormId(r.id);
    setRecipeTitle(r.title);
    setRecipeDesc(r.desc);
    setRecipeTime(r.time);
    setRecipeCat(r.cat);
    setRecipeImg(r.img);
    // Scroll to form
    const formElement = document.getElementById('recipe-editor-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteRecipe = (id: number) => {
    if (confirm('Bu lezzetli yemek tarifini listeden kaldırmak istediğinize emin misiniz?')) {
      const filtered = recipes.filter(r => r.id !== id);
      updateRecipes(filtered);
      showNotification('Yemek tarifi portföyden silindi !');
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({
      phone: conPhone,
      phoneSub: conPhoneSub,
      whatsapp: conWhatsapp,
      whatsappSub: conWhatsappSub,
      email: conEmail,
      emailSub: conEmailSub,
      addressTitle: conAddrTitle,
      addressSub: conAddrSub,
      addressValue: conAddrVal
    });
    showNotification('İletişim, Whatsapp ve adres bilgileri tüm siteyle senkronize edildi ! 📞');
  };

  // Helper lists
  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(recipeSearch.toLowerCase()) ||
    r.cat.toLowerCase().includes(recipeSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2] relative w-full overflow-hidden text-gray-800">
      {/* Sleek, Compact Admin-Only Brand Header */}
      <header className="w-full bg-[#0a2919] text-[#FAF9F5] py-4 px-6 md:px-8 flex items-center justify-between border-b border-[#ebd7b1]/15 z-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-sans font-extrabold text-[#11462b] text-[15px] group-hover:scale-105 transition-transform">H</span>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-[12px] uppercase tracking-widest text-[#FAF9F5]">HİLAL LAVAŞ</span>
            <span className="font-sans text-[9px] font-bold text-amber-400 tracking-wider">KONTROL PANELİ</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[11.5px] font-sans font-bold uppercase tracking-wider text-amber-300 hover:text-amber-400 transition-colors">
            ← SİTEYE GERİ DÖN
          </Link>
          <span className="h-4 w-[1px] bg-white/20"></span>
          <span className="text-[11px] font-mono text-gray-300">Yunus Aktaş (Grafiker)</span>
          <span className="h-4 w-[1px] bg-white/20"></span>
          <button 
            onClick={async () => {
              await logoutAction();
              window.location.reload();
            }}
            className="text-[10px] font-sans font-extrabold uppercase tracking-wider px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer"
          >
            ÇIKIŞ YAP
          </button>
        </div>
      </header>

      {/* Floating dynamic toast notification */}
      {notification && (
        <div id="toast-notif" className="fixed bottom-6 right-6 z-50 bg-[#11462b] text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-fade-in max-w-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="font-sans font-extrabold text-[13px] leading-tight text-emerald-100 uppercase tracking-wider">BAŞARILI</p>
            <p className="font-sans text-[12px] font-semibold text-white/90 leading-normal mt-0.5">{notification}</p>
          </div>
        </div>
      )}

      {/* Hero Header Area for Admin */}
      <div className="w-full bg-[#11462b] text-[#FAF9F5] pt-10 pb-0 px-4 md:px-8 border-b border-[#f2eadc]/20 relative overflow-hidden flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-wheat-pattern opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl w-full flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 mb-8">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-300 font-sans font-extrabold text-[11px] tracking-[0.25em] uppercase">HİLAL UNLU MAMÜLLERİ</span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider bg-white/10 text-white rounded uppercase">KONTROL PANELİ</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-extrabold tracking-tight text-white mb-2 uppercase">İçerik Yönetimi & Entegrasyon</h1>
            <p className="text-[#f2eadc]/80 text-[12.5px] font-sans font-medium max-w-xl">
              Hilal Lavaş dijital vitrininin tüm dinamik alanlarını ve ürün katalog kartlarındaki gramaj, ebat ve adet değişkenlerini anlık olarak yönetin.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 self-start md:self-center">
            <Link href="/" className="flex items-center gap-1.5 px-4 h-11 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-white font-sans text-[12.5px] font-bold tracking-wider uppercase transition-colors">
              <Eye size={15} /> Siteyi Gör
            </Link>
            <Link href="/urunler" className="flex items-center gap-1.5 px-4 h-11 bg-amber-500 hover:bg-amber-600 rounded-lg text-[#11462b] font-sans text-[12.5px] font-extrabold tracking-wider uppercase transition-colors shadow-md">
              Kataloğu Aç <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="max-w-7xl w-full flex items-center justify-start gap-1 sm:gap-2 overflow-x-auto scrollbar-hide z-10 relative px-1">
          {[
            { id: 'hero', icon: Layout, label: 'Hero Yönetimi' },
            { id: 'categories', icon: Package, label: 'Kategori Yönetimi' },
            { id: 'products', icon: Package, label: 'Ürün Katalog Kartları' },
            { id: 'recipes', icon: Utensils, label: 'Yemek Tarifleri' },
            { id: 'contact', icon: PhoneCall, label: 'İletişim & Adres' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-t-xl font-sans font-extrabold text-[12.5px] uppercase tracking-wider transition-all whitespace-nowrap min-w-max border border-b-0 ${
                activeTab === tab.id
                  ? 'bg-[#F9F7F2] text-[#11462b] border-[#ebd7b1]/45 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-transparent'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
              {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1"></span>}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="w-full">
            
            {/* 1. HERO TAB */}
            {activeTab === 'hero' && (
              <div className="bg-white border border-[#ebd7b1]/45 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#11462b] uppercase tracking-wide">Ana Sayfa Kahraman (Hero) Alanı</h2>
                  <p className="text-gray-400 font-sans text-[12px] font-semibold mt-1">
                    Kullanıcıları karşılayan devasa tanıtım görseli, metin başlıkları ve aksiyon butonlarının içerik detaylarını doldurun.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Edited properties form */}
                  <form onSubmit={handleSaveHero} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kampanya Rozeti (Sub-Badge)</label>
                      <input 
                        type="text" 
                        value={heroBadge}
                        onChange={(e) => setHeroBadge(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-gray-50 focus:bg-white text-[13px] font-semibold transition-all" 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kahraman Başlık (Title)</label>
                      <input 
                        type="text" 
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-gray-50 focus:bg-white text-[13px] font-semibold transition-all" 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Açıklama Metni (Description)</label>
                      <textarea 
                        value={heroDesc}
                        onChange={(e) => setHeroDesc(e.target.value)}
                        rows={3}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-gray-50 focus:bg-white text-[13px] font-semibold transition-all" 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <ImageUploader 
                        value={heroBg} 
                        onChange={setHeroBg} 
                        label="Arka Plan Resim Görseli" 
                        hint="Ana sayfadaki büyük kahraman (hero) görseli arka planı." 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">1. Buton Metni</label>
                        <input 
                          type="text" 
                          value={heroBtn1}
                          onChange={(e) => setHeroBtn1(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-gray-50 focus:bg-white text-[13px] font-semibold transition-all" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">2. Buton Metni</label>
                        <input 
                          type="text" 
                          value={heroBtn2}
                          onChange={(e) => setHeroBtn2(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-gray-50 focus:bg-white text-[13px] font-semibold transition-all" 
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-12 bg-[#11462b] hover:bg-brand-green text-white font-sans font-extrabold text-[12.5px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md mt-2"
                    >
                      <Save size={16} /> Kampanyayı Kaydet
                    </button>
                  </form>

                  {/* Immediate layout preview box */}
                  <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                      <span>ANLIK ÖNİZLEME (PREVIEW)</span>
                    </p>
                    <div className="w-full border border-[#ebd7b1]/60 rounded-xl overflow-hidden aspect-[4/3] bg-[#FAF9F5] shadow-inner relative flex flex-col justify-center items-center p-4">
                      {/* Scale model of the hero banner */}
                      <div className="absolute inset-0 z-0">
                        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                      </div>
                      <div className="relative z-10 self-start text-left max-w-xs flex flex-col">
                        <span className="text-[9px] text-brand-orange font-bold tracking-widest uppercase mb-1">{heroBadge || 'BADGE'}</span>
                        <h3 className="text-lg font-extrabold text-[#11462b] leading-tight mb-2 tracking-tight">{heroTitle || 'Başlık Yazınız...'}</h3>
                        <p className="text-[11px] text-gray-600 font-medium mb-4 leading-normal line-clamp-3">{heroDesc || 'Açıklama giriniz...'}</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1.5 bg-[#11462b] text-white font-extrabold text-[8px] rounded uppercase select-none tracking-wider">{heroBtn1}</span>
                          <span className="px-3 py-1.5 bg-white border border-gray-200 text-[#11462b] font-semibold text-[8px] rounded uppercase select-none tracking-wider">{heroBtn2}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-800 text-[11px] font-medium leading-relaxed border border-amber-500/10">
                      <strong>İpucu:</strong> Arka plan görseli için yüksek çözünürlüklü Un fabrikası veya Lavaş üretim hattı görselleri tercih edebilirsiniz. URL kutusuna yeni linki yapıştırın ve anlık sonuca bakın.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 1.5 CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <div className="bg-white border border-[#ebd7b1]/45 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#11462b] uppercase tracking-wide flex items-center gap-2">
                      <Package className="text-amber-500" strokeWidth={2} size={22} /> Kategori Yönetimi
                    </h2>
                    <p className="text-gray-400 font-sans text-[12px] font-semibold mt-1 leading-normal">
                      Sistemdeki ürün kategorilerini yönetin. Yeni kategoriler ekleyebilir veya mevcutları düzenleyebilirsiniz.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCatFormId('');
                      setCatId('');
                      setCatName('');
                      setCatDesc('');
                      const formElement = document.getElementById('category-editor-form');
                      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="h-11 px-6 rounded-lg font-sans font-extrabold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 border shadow-sm shrink-0 bg-emerald-600 hover:bg-[#11462b] text-white border-emerald-600"
                  >
                    <Plus size={16} /> ➕ YENİ KATEGORİ
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT SIDE: Category List */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-3">
                      {categories.map(c => (
                        <div key={c.id} className="p-4 border border-gray-100 rounded-xl bg-[#FAF9F5] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[9px] font-extrabold text-gray-400 tracking-widest uppercase">ID: {c.id}</span>
                            <h4 className="font-sans font-extrabold text-[14px] text-[#11462b] leading-tight uppercase">{c.name}</h4>
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-sm">📝 {c.desc || 'Açıklama belirtilmemiş'}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleEditCategory(c)}
                              className="h-9 px-3.5 rounded-lg text-[11px] font-sans font-extrabold uppercase tracking-wider transition-all border flex items-center gap-1.5 bg-white text-gray-700 hover:text-[#11462b] hover:bg-gray-50 border-gray-200"
                            >
                              <Edit size={12} strokeWidth={2.5} /> Düzenle
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(c.id)}
                              className="h-9 w-9 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 transition-colors flex items-center justify-center"
                              title="Kategoriyi Sil"
                            >
                              <Trash2 size={13} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE: Add/Edit Form */}
                  <div className="lg:col-span-5 flex flex-col gap-5 border border-[#ebd7b1] bg-[#FCFAF5] rounded-2xl p-5 shadow-sm" id="category-editor-form">
                    <div className="border-b border-[#ebd7b1]/60 pb-3 flex items-center justify-between select-none">
                      <span className="text-[13px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider flex items-center gap-1.5">
                        {catFormId ? '✏️ KATEGORİ DÜZENLE' : '🌟 YENİ KATEGORİ EKLE'}
                      </span>
                      {catFormId && (
                        <button 
                          type="button" 
                          onClick={() => { setCatFormId(''); setCatId(''); setCatName(''); setCatDesc(''); }}
                          className="text-[10px] font-extrabold tracking-widest text-[#11462b] hover:text-brand-orange bg-white px-2.5 py-1 rounded border border-gray-200 uppercase"
                        >
                          X İPTAL ET
                        </button>
                      )}
                    </div>
                    
                    <form onSubmit={handleSaveCategory} className="flex flex-col gap-4">
                      {!catFormId && (
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kategori ID (örn: durum-lavas)</label>
                          <input 
                            type="text" 
                            required
                            value={catId}
                            onChange={(e) => setCatId(e.target.value)}
                            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-white text-[13px] font-semibold transition-all" 
                            placeholder="Sadece ingilizce karakter ve tire"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kategori Görünen Adı</label>
                        <input 
                          type="text" 
                          required
                          value={catName}
                          onChange={(e) => setCatName(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-white text-[13px] font-semibold transition-all" 
                          placeholder="Örn: Gurme Ürünler"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kısa Açıklama</label>
                        <textarea 
                          value={catDesc}
                          onChange={(e) => setCatDesc(e.target.value)}
                          rows={2}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] bg-white text-[12px] font-medium transition-all" 
                          placeholder="Kategori altında görünecek açıklama"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 mt-2 bg-[#11462b] hover:bg-brand-green text-white font-sans font-extrabold text-[12.5px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Save size={16} /> {catFormId ? 'GÜNCELLE' : 'EKLE'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRODUCTS TAB */}
            {activeTab === 'products' ? (() => {
              // Local search and filter states declared inside a self-invoking function scope in render to avoid state pollution,
              // or we can use state hooks. Let's declare our catalog filters
              const catalogItems = products.filter(p => {
                const catGroup = p.category || 'lavas';
                const matchesTab = (catalogFilter === 'all') || (catGroup === catalogFilter);
                
                const queryText = `${p.id} ${p.name || ''} ${p.title || ''} ${p.weight || ''} ${p.count || ''} ${p.category || ''}`.toLowerCase();
                const matchesSearch = !catalogSearch.trim() || queryText.includes(catalogSearch.toLowerCase());
                
                return matchesTab && matchesSearch;
              });

              return (
                <div className="bg-white border border-[#ebd7b1]/45 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] p-5 md:p-8 flex flex-col gap-6">
                  {/* Top Header & Intro text */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div>
                      <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#11462b] uppercase tracking-wide flex items-center gap-2">
                        <Package className="text-amber-500" strokeWidth={2} size={22} /> Ürün Başvuru Kataloğu Yönetimi (ERP)
                      </h2>
                      <p className="text-gray-400 font-sans text-[12px] font-semibold mt-1 leading-normal">
                        Sistemdeki tüm lavaş, pide ve tortilla ebatlarını kontrol edin. Yeni eklenen veya silinen ürünler anında <strong className="text-emerald-800">"Ürünler" sayfasında</strong> ve <strong className="text-emerald-800">"Ürün Detay" sayfalarında</strong> listelenir.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartAddProduct}
                      className={`h-11 px-6 rounded-lg font-sans font-extrabold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 border shadow-sm shrink-0 ${
                        isAddProductMode 
                          ? 'bg-amber-500 text-[#11462b] border-amber-500' 
                          : 'bg-emerald-600 hover:bg-[#11462b] text-white border-emerald-600'
                      }`}
                    >
                      <Plus size={16} /> ➕ Yenİ Katolog Ürünü Ekle
                    </button>
                  </div>

                  {/* Filter & Live Search Bar Panel */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/65 border border-gray-200/50 rounded-xl p-4.5">
                    
                    {/* Search query box */}
                    <div className="relative flex-grow max-w-md w-full">
                      <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text"
                        placeholder="Katalog içinde ara (örnek: 35x35, gokit, taco...)"
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[12.5px] font-semibold bg-white placeholder-gray-400 text-gray-800"
                      />
                      {catalogSearch && (
                        <button 
                          onClick={() => setCatalogSearch('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] font-extrabold"
                        >
                          Temizle
                        </button>
                      )}
                    </div>

                    {/* Category quick selectors row */}
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 select-none">
                      <span className="text-[10px] whitespace-nowrap font-extrabold text-gray-400 uppercase tracking-wider mr-2">Hızlı Filtre:</span>
                      {[
                        { key: 'all', label: 'TÜMÜ' },
                        ...categories.map(c => ({ key: c.id, label: c.name }))
                      ].map(pill => (
                        <button
                          key={pill.key}
                          type="button"
                          onClick={() => setCatalogFilter(pill.key)}
                          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-sans font-extrabold tracking-wider transition-all border ${
                            catalogFilter === pill.key
                              ? 'bg-[#11462b] text-white border-[#11462b] shadow-xs'
                              : 'bg-white text-gray-500 border-gray-200 hover:text-gray-800 hover:border-gray-300'
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* Main Catalog Layout Workspace Split: Table layout versus detail fields form */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT SIDE: Dynamic Interactive Catalog Matrix - Grid / List of Items (col-span-12 or xl:col-span-7) */}
                    <div className="xl:col-span-7 flex flex-col gap-4">
                      
                      <div className="flex items-center justify-between pb-1 select-none">
                        <span className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">
                          Mevcut Portföy Verileri ({catalogItems.length} kayıt listelendi)
                        </span>
                        {catalogSearch || catalogFilter !== 'all' ? (
                          <button 
                            onClick={() => { setCatalogFilter('all'); setCatalogSearch(''); }}
                            className="text-[11px] text-brand-orange hover:underline font-bold"
                          >
                            Tüm Filtreleri Sıfırla
                          </button>
                        ) : null}
                      </div>

                      {/* Items Grid List View */}
                      <div className="w-full flex flex-col gap-2 max-h-[660px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                        
                        {catalogItems.length === 0 ? (
                          <div className="py-12 px-4 border border-dashed border-gray-200 rounded-xl text-center bg-gray-50/50">
                            <Package className="mx-auto text-gray-300 mb-2" size={32} />
                            <p className="text-[13px] font-sans font-bold text-gray-400">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                            <p className="text-[11px] font-sans text-gray-400/90 mt-1">Farklı bir arama kelimesi yazmayı veya filtreyi değiştirmeyi deneyebilirsiniz.</p>
                          </div>
                        ) : (
                          catalogItems.map(p => {
                            const isSelected = !isAddProductMode && selectedProductId === p.id;
                            
                            // Style category badges
                            let catStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
                            let catNameLabel = "Lavaş";
                            if (p.category === 'gobit') {
                              catStyle = "bg-amber-50 text-amber-800 border-amber-100";
                              catNameLabel = "Gobit";
                            } else if (p.category === 'tirnakli') {
                              catStyle = "bg-orange-50 text-orange-800 border-orange-100";
                              catNameLabel = "Pide";
                            } else if (p.category === 'tortilla') {
                              catStyle = "bg-teal-50 text-teal-800 border-teal-100";
                              catNameLabel = "Tortilla";
                            } else if (p.category === 'showcase') {
                              catStyle = "bg-indigo-50 text-indigo-800 border-indigo-100";
                              catNameLabel = "Öne Çıkan";
                            }

                            return (
                              <div
                                key={p.id}
                                className={`p-3.5 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all min-h-[76px] ${
                                  isSelected 
                                    ? 'bg-amber-50/30 border-[#ebd7b1] shadow-sm' 
                                    : 'bg-white hover:bg-gray-50/50 border-gray-100'
                                }`}
                              >
                                {/* Left Section: Item Info */}
                                <div className="flex items-start gap-3">
                                  {/* Dummy pack visual helper mini-indicator */}
                                  <div className="w-10 h-12 rounded bg-gray-50 border border-gray-100 flex items-center justify-center font-serif text-[10px] font-extrabold text-gray-400 shrink-0 select-none">
                                    {p.category === 'lavas' && 'LVS'}
                                    {p.category === 'gobit' && 'GBT'}
                                    {p.category === 'tirnakli' && 'PİD'}
                                    {p.category === 'tortilla' && 'TRT'}
                                    {p.category === 'showcase' && 'KRT'}
                                  </div>
                                  
                                  <div className="flex flex-col gap-0.5 text-left">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`px-1.5 py-0.5 border rounded text-[9px] font-extrabold uppercase tracking-wide leading-none ${catStyle}`}>
                                        {catNameLabel}
                                      </span>
                                      <span className="font-mono text-[9.5px] font-extrabold text-gray-400 tracking-wider">
                                        ID ({p.id})
                                      </span>
                                    </div>
                                    
                                    <h4 className="font-sans font-extrabold text-[13px] text-gray-800 flex items-baseline gap-1.5 mt-0.5">
                                      <span>{p.name ? `${p.name} - ${p.title}` : p.title}</span>
                                    </h4>

                                    <div className="flex items-center gap-2 mt-1 flex-wrap text-gray-400 font-bold font-sans text-[11px] leading-none">
                                      <span className="text-gray-500 font-extrabold">{p.weight}</span>
                                      <span className="w-[1px] h-2 bg-gray-200"></span>
                                      <span className="text-gray-500 font-semibold">{p.count}</span>
                                      {p.subType && (
                                        <>
                                          <span className="w-[1px] h-2 bg-gray-200"></span>
                                          <span className="text-teal-700 uppercase text-[9.5px]">Tür: {p.subType}</span>
                                        </>
                                      )}
                                    </div>
                                    
                                    {/* Description summary snippet */}
                                    <p className="text-[10.5px] text-gray-400 italic font-medium leading-relaxed mt-1.5 line-clamp-1 max-w-sm sm:max-w-md">
                                      📝 Açıklama: {p.description || `Standart Hilal ${catNameLabel} detay şablonu yüklüdür.`}
                                    </p>
                                  </div>
                                </div>

                                {/* Right Section: Edit / Run Actions inline */}
                                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleProductSelect(p.id)}
                                    className={`h-9 px-3.5 rounded-lg text-[11px] font-sans font-extrabold uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                                      isSelected
                                        ? 'bg-[#11462b] text-white border-[#11462b]'
                                        : 'bg-white text-gray-700 hover:text-[#11462b] hover:bg-gray-50 border-gray-200'
                                    }`}
                                  >
                                    <Edit size={12} strokeWidth={2.5} /> Düzenle
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className="h-9 w-9 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 transition-colors flex items-center justify-center"
                                    title="Katalogdan Sil"
                                  >
                                    <Trash2 size={13} strokeWidth={2.5} />
                                  </button>
                                </div>

                              </div>
                            );
                          })
                        )}

                      </div>

                    </div>

                    {/* RIGHT SIDE: Rich Parameter Input Center / Editor form (col-span-12 or xl:col-span-5) */}
                    <div className="xl:col-span-5 flex flex-col gap-5 border border-gray-100 bg-[#FCFAF5] rounded-2xl p-4 md:p-6 shadow-xs">
                      
                      {/* Form Header indicator */}
                      <div className="border-b border-gray-200/60 pb-3 flex items-center justify-between select-none">
                        <span className="text-[12px] font-sans font-extrabold text-[#11462b] uppercase tracking-wider flex items-center gap-1.5">
                          {isAddProductMode ? '🌟 YENİ ÜRÜN TANIMLAMA MASASI' : '✏️ SEÇİLİ ÜRÜN AYARLARI'}
                        </span>
                        {isAddProductMode ? (
                          <button 
                            type="button" 
                            onClick={() => { setSelectedProductId(products[0]?.id || 'lv1'); setIsAddProductMode(false); }}
                            className="text-[10px] font-extrabold tracking-widest text-[#11462b] hover:text-brand-orange bg-white px-2.5 py-1 rounded border border-gray-200 uppercase"
                          >
                            X İPTAL ET
                          </button>
                        ) : (
                          <span className="text-[9.5px] font-mono text-gray-400 font-extrabold bg-[#11462b]/5 px-2 py-0.5 rounded leading-none uppercase">
                            DÜZENLİYOR: {selectedProduct?.id}
                          </span>
                        )}
                      </div>

                      {/* Actual Parameters Editor Form content */}
                      <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
                        
                        {/* 1. KATEGORİ SEÇİMİ (Only configurable when adding, or editable to modify dynamic target) */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">1. Kategori</label>
                          {isAddProductMode ? (
                            <select
                              value={prodCategory}
                              onChange={(e: any) => setProdCategory(e.target.value)}
                              className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[12.5px] font-semibold font-sans transition-all bg-white text-gray-800"
                            >
                              {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                              <option value="showcase">Öne Çıkan Ana Sayfa Ürünleri</option>
                            </select>
                          ) : (
                            <div className="w-full h-10 px-3.5 bg-gray-100 border border-gray-200 text-gray-500 rounded-lg text-[12px] font-bold flex items-center justify-between uppercase select-none leading-none">
                              <span>
                                {categories.find(c => c.id === selectedProduct?.category)?.name || 
                                 (selectedProduct?.category === 'showcase' ? 'Öne Çıkan Ana Sayfa Ürünleri' : selectedProduct?.category)}
                              </span>
                              <span className="text-[9.5px] font-extrabold text-[#11462b] opacity-80">(Kilitli)</span>
                            </div>
                          )}
                        </div>

                        {/* 2. TORTILLA ALT TİPİ (Only if category is tortilla) */}
                        {((isAddProductMode ? prodCategory : selectedProduct?.category) === 'tortilla') && (
                          <div className="flex flex-col gap-1.5 animate-fade-in bg-teal-500/5 p-3 rounded-lg border border-teal-500/10">
                            <label className="text-[11px] font-extrabold uppercase text-teal-800 tracking-wider">2. Tortilla Alttipi ve Ambalaj Stili</label>
                            <select
                              value={prodSubType}
                              onChange={(e: any) => setProdSubType(e.target.value)}
                              className="w-full h-10 px-3 border border-gray-2 text-[12.5px] font-semibold bg-white text-gray-800 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b]"
                            >
                              <option value="klasik">Klasik Tortilla (Yeşil Bantlı Paket/Lavaş)</option>
                              <option value="taco">Taco Tortilla (Turuncu Bantlı Paket/Lavaş)</option>
                              <option value="durum">Dürüm Tortilla (Mavi Bantlı Paket/Lavaş)</option>
                              <option value="burger">Burger Tortilla (Sarı Bantlı Paket/Lavaş)</option>
                              <option value="premium">Premium Tortilla (Mor Bantlı Paket/Lavaş)</option>
                            </select>
                          </div>
                        )}

                        {/* 3. ÖZEL ÜRÜN / VARYANT ADI (e.g., Kepekli, Tam Buğday, Tortilla Dürüm vb.) */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">2. Varyant / Ürün Adı</label>
                          <input 
                            type="text" 
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            placeholder="Örnek: Tam Buğday Lavaş, Sade Sandviç Ekmeği"
                            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 font-sans" 
                          />
                          <p className="text-[10px] text-gray-400 font-medium">Bu alanı boş bırakırsanız kategorinin genel adı ("Lavaş", "Gobit" vb.) kullanılır.</p>
                        </div>

                        {/* 4. EBAT / BOYUT + GRAMAJ + PAKET İÇİ (Row grid) */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Ebat / Ölçü</label>
                            <input 
                              type="text" 
                              required
                              placeholder="E.g. 35x35 cm"
                              value={prodTitle}
                              onChange={(e) => setProdTitle(e.target.value)}
                              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 font-sans" 
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Metrik Ağırlık</label>
                            <input 
                              type="text" 
                              required
                              placeholder="E.g. 90 g"
                              value={prodWeight}
                              onChange={(e) => setProdWeight(e.target.value)}
                              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 font-sans" 
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Paket İçi Adet sayısı</label>
                          <input 
                            type="text" 
                            required
                            placeholder="E.g. 20 Adet"
                            value={prodCount}
                            onChange={(e) => setProdCount(e.target.value)}
                            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold bg-white text-gray-800 font-sans" 
                          />
                        </div>

                        {/* 5. ÜRÜN DETAY SAYFASI AÇIKLAMASI (Populates on Detail page) */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-[#11462b] tracking-wider">3. Detay Sayfası Açıklama Metni (Özel)</label>
                          <textarea 
                            rows={3}
                            placeholder="Ürünün detay sayfasına (detay sayfasına tıklanınca) gitildiğinde görünmesini istediğiniz tanıtım paragrafını buraya yazın..."
                            value={prodDesc}
                            onChange={(e) => setProdDesc(e.target.value)}
                            className="w-full p-3.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[12.5px] font-semibold bg-white text-gray-800 font-sans resize-none leading-relaxed" 
                          />
                          <p className="text-[10px] text-gray-400 font-medium leading-normal">Boş bırakılırsa, sistem standart 'Hilal geleneksel lezzeti' tanıtım şablonunu yükleyecektir.</p>
                        </div>

                        {/* 6. MEDYA GÖRSELİ */}
                        <div className="flex flex-col gap-1.5 border-t border-gray-200/50 mt-2 pt-4">
                          <ImageUploader 
                            value={prodImg} 
                            onChange={setProdImg} 
                            label="4. ÜRÜN GÖRSELİ" 
                            hint="Arama ve ürün listelerinde görünecek ana ürün fotoğrafı (Stüdyo çekimi veya Mockup)." 
                          />
                        </div>

                        {/* Form controls buttons */}
                        <div className="flex flex-col gap-2 mt-4 border-t border-gray-200/50 pt-4">
                          <button
                            type="submit"
                            className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-extrabold text-[12px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Save size={14} /> {isAddProductMode ? 'Ürünü Kataloğa Ekle ve Kaydet' : 'Ürün Kataloğunu Güncelle'}
                          </button>
                        </div>

                      </form>

                    </div>

                  </div>

                </div>
              );
            })() : null}

            {/* 3. RECIPES TAB */}
            {activeTab === 'recipes' && (
              <div className="bg-white border border-[#ebd7b1]/45 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col gap-8">
                <div>
                  <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#11462b] uppercase tracking-wide">Yemek Tarifleri Yönetim İstasyonu</h2>
                  <p className="text-gray-400 font-sans text-[12px] font-semibold mt-1">
                    Hilal unlu mamulleri çeşitlerinin kullanılarak yapılabileceği yemek, dürüm, börek tariflerini listeleyin, yenilerini ekleyin veya revize edin.
                  </p>
                </div>

                {/* Sub-Ramp: Input Editor Form container */}
                <div id="recipe-editor-form" className="bg-[#fcfbfc] border border-gray-100 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="font-sans font-extrabold text-amber-900 text-[13.5px] flex items-center gap-1.5 leading-none uppercase select-none">
                    {recipeFormId !== null ? <Edit size={15} /> : <Plus size={15} />}
                    {recipeFormId !== null ? 'Seçili Yemek Tarifini Düzenle' : 'Portföye Yeni Tarif Tamamla'}
                  </h3>

                  <form onSubmit={handleSaveRecipeForm} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Tarif Başlığı</label>
                        <input 
                          type="text" 
                          value={recipeTitle}
                          onChange={(e) => setRecipeTitle(e.target.value)}
                          placeholder="E.g. Domatesli Kaşarlı Lavaş Pizza"
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kısa Açıklama & Hazırlanış Demetleri</label>
                        <textarea 
                          value={recipeDesc}
                          onChange={(e) => setRecipeDesc(e.target.value)}
                          rows={2}
                          placeholder="Lavaşların fırınlanıp malzemelerle buluştuğu çıtır çıtır pizzamız..."
                          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all resize-none" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Hazırlık Süresi</label>
                          <input 
                            type="text" 
                            value={recipeTime}
                            onChange={(e) => setRecipeTime(e.target.value)}
                            placeholder="E.g. 15 dk"
                            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Kategori</label>
                          <select
                            value={recipeCat}
                            onChange={(e) => setRecipeCat(e.target.value)}
                            className="w-full h-11 px-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all bg-white"
                          >
                            <option value="Kahvaltılık">Kahvaltılık</option>
                            <option value="Ana Yemek">Ana Yemek</option>
                            <option value="Atıştırmalık">Atıştırmalık</option>
                            <option value="Pratik Tarifler">Pratik Tarifler</option>
                            <option value="Tatlı">Tatlı</option>
                            <option value="Vejetaryen">Vejetaryen</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <ImageUploader 
                          value={recipeImg} 
                          onChange={setRecipeImg} 
                          label="Tarif Görseli Yükle / URL Ekle" 
                          hint="Tarif kartlarında ve detay sayfasında görüntülenecek yüksek çözünürlüklü görsel." 
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end gap-3.5 border-t border-gray-100 pt-3">
                      {recipeFormId !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setRecipeFormId(null);
                            setRecipeTitle('');
                            setRecipeDesc('');
                            setRecipeTime('15 dk');
                            setRecipeCat('Ana Yemek');
                            setRecipeImg('https://placehold.co/600x400/e5e7eb/a1a1aa?text=TARIF');
                          }}
                          className="px-5 h-11 rounded-lg text-gray-500 hover:text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 font-sans font-bold text-[12.5px] uppercase tracking-wider transition-colors"
                        >
                          Düzenlemeyi İptal Et
                        </button>
                      )}
                      <button 
                        type="submit"
                        className="px-8 h-11 bg-[#11462b] hover:bg-brand-green text-white font-sans font-extrabold text-[12.5px] uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        {recipeFormId !== null ? <Save size={15} /> : <Plus size={15} />}
                        {recipeFormId !== null ? 'Revizyonu Kaydet' : 'Tarifi Yayına Al'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search & Listing Table */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-sans font-extrabold text-gray-800 text-[14.5px] uppercase tracking-wider">Yayınlanmış Yemek Tarifleri ({filteredRecipes.length})</h3>
                    <div className="relative w-full sm:w-64">
                      <input 
                        type="text" 
                        value={recipeSearch}
                        onChange={(e) => setRecipeSearch(e.target.value)}
                        placeholder="Yayınlanmış tarif ara..." 
                        className="w-full h-10 pl-4 pr-10 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white text-[12.5px] font-sans font-semibold focus:outline-none"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="w-full overflow-hidden border border-gray-100 rounded-2xl shadow-xs">
                    <table className="w-full border-collapse text-left font-sans text-[12.5px]">
                      <thead>
                        <tr className="bg-[#FAF9F5] border-b border-gray-100 font-extrabold tracking-widest text-[#11462b] text-[10.5px] uppercase select-none">
                          <th className="p-4 w-12">Detay</th>
                          <th className="p-4">Tarif Başlığı</th>
                          <th className="p-4">Kategori</th>
                          <th className="p-4">Süre</th>
                          <th className="p-4 text-center">İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="font-semibold text-gray-700 divide-y divide-gray-100">
                        {filteredRecipes.map((r) => (
                          <tr key={r.id} className="hover:bg-gray-50/50">
                            <td className="p-4">
                              <div className="w-10 h-10 rounded overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                                <img src={r.img} alt="" className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="p-4 max-w-xs md:max-w-md">
                              <p className="font-extrabold text-gray-900 leading-tight text-[13px]">{r.title}</p>
                              <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-1 mt-0.5">{r.desc}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10.5px] font-extrabold tracking-wider rounded uppercase">
                                {r.cat}
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-gray-400 font-sans text-[11px]">{r.time}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditRecipeClick(r)}
                                  className="w-8 h-8 rounded bg-amber-100/30 hover:bg-amber-100 text-[#aa7a2c] flex items-center justify-center transition-colors border border-amber-500/10"
                                  title="Düzelt"
                                >
                                  <Edit size={13} />
                                </button>
                                <button
                                  onClick={() => handleDeleteRecipe(r.id)}
                                  className="w-8 h-8 rounded bg-red-50/40 hover:bg-red-50 text-red-600 flex items-center justify-center transition-colors border border-red-500/10"
                                  title="Kaldır"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            )}

            {/* 4. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="bg-white border border-[#ebd7b1]/45 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#11462b] uppercase tracking-wide">İletişim ve Entegrasyon Ayarları</h2>
                  <p className="text-gray-400 font-sans text-[12px] font-semibold mt-1">
                    Telefon, WhatsApp, E-Posta, fabrika adresi ve toptan sipariş bildirim adreslerini düzenleyin.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* form fields */}
                  <form onSubmit={handleSaveContact} className="flex flex-col gap-4">
                    
                    <div className="border-l-2 border-[#11462b] pl-3 py-1 mb-2">
                      <h3 className="font-sans font-extrabold text-[#11462b] text-[12px] uppercase tracking-wider">İletişim Kanalları</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Merkez Telefon</label>
                        <input 
                          type="text" 
                          value={conPhone}
                          onChange={(e) => setConPhone(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Telefon Altbilgi (Saat vb)</label>
                        <input 
                          type="text" 
                          value={conPhoneSub}
                          onChange={(e) => setConPhoneSub(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">WhatsApp Numarası</label>
                        <input 
                          type="text" 
                          value={conWhatsapp}
                          onChange={(e) => setConWhatsapp(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">WhatsApp Altbilgi</label>
                        <input 
                          type="text" 
                          value={conWhatsappSub}
                          onChange={(e) => setConWhatsappSub(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Mail adresi</label>
                        <input 
                          type="text" 
                          value={conEmail}
                          onChange={(e) => setConEmail(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13.5px] font-sans font-semibold transition-all" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Mail Altbilgi</label>
                        <input 
                          type="text" 
                          value={conEmailSub}
                          onChange={(e) => setConEmailSub(e.target.value)}
                          className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                        />
                      </div>
                    </div>

                    <div className="border-l-2 border-[#11462b] pl-3 py-1 mb-2 mt-4">
                      <h3 className="font-sans font-extrabold text-[#11462b] text-[12px] uppercase tracking-wider">Adres & Ofis Konumu</h3>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Şehir / İlçe Bölgesi (Primary Value)</label>
                      <input 
                        type="text" 
                        value={conAddrVal}
                        onChange={(e) => setConAddrVal(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Sokak / Cadde Detayı (Secondary Value)</label>
                      <input 
                        type="text" 
                        value={conAddrSub}
                        onChange={(e) => setConAddrSub(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#11462b] focus:border-[#11462b] text-[13px] font-semibold font-sans transition-all" 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-12 bg-[#11462b] hover:bg-brand-green text-white font-sans font-extrabold text-[12.5px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md mt-2"
                    >
                      <Save size={16} /> İletişim Verisini Kaydet
                    </button>
                  </form>

                  {/* layout indicators card */}
                  <div className="flex flex-col gap-4">
                    <p className="text-[11.5px] font-extrabold uppercase text-gray-400 tracking-wider">
                      SITE GENELİ İLETİŞİM GRİDİ
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 text-center flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#f3eedd] flex items-center justify-center text-[#11462b] mb-3">📞</div>
                        <span className="text-[13px] font-extrabold text-gray-800">Telefon</span>
                        <span className="text-[11px] text-gray-400 font-semibold mb-1 mt-0.5">{conPhoneSub}</span>
                        <span className="text-[12.5px] font-bold text-[#11462b] tracking-tight">{conPhone}</span>
                      </div>

                      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 text-center flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#f3eedd] flex items-center justify-center text-[#11462b] mb-3">💬</div>
                        <span className="text-[13px] font-extrabold text-gray-800">WhatsApp</span>
                        <span className="text-[11px] text-gray-400 font-semibold mb-1 mt-0.5">{conWhatsappSub}</span>
                        <span className="text-[12.5px] font-bold text-[#11462b] tracking-tight">{conWhatsapp}</span>
                      </div>

                      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 text-center flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#f3eedd] flex items-center justify-center text-[#11462b] mb-3">✉️</div>
                        <span className="text-[13px] font-extrabold text-gray-800">E-Posta</span>
                        <span className="text-[11px] text-gray-400 font-semibold mb-1 mt-0.5">{conEmailSub}</span>
                        <span className="text-[12px] font-bold text-[#11462b] tracking-tight truncate max-w-full">{conEmail}</span>
                      </div>

                      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 text-center flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#f3eedd] flex items-center justify-center text-[#11462b] mb-3">📍</div>
                        <span className="text-[13px] font-extrabold text-gray-800">{conAddrTitle}</span>
                        <span className="text-[11px] text-gray-400 font-semibold mb-1 mt-0.5">{conAddrSub}</span>
                        <span className="text-[12.5px] font-bold text-[#11462b] tracking-tight">{conAddrVal}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg text-[#1e5c3c] text-[11.5px] font-medium leading-relaxed border border-emerald-500/10">
                      <strong>Otomatik Güncelleme:</strong> Adres ve iletişim alanları sitenin en üst kısmında yer alan "Header" ve iletişim sayfasındaki bilgilendirme kartları ile anında otomatik birleşir. Herhangi bir kod değişikliği yapmanıza gerek kalmaz.
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

      </main>

      {/* Compact Admin Footer instead of customer footer */}
      <footer className="w-full bg-[#0a2919] text-gray-400 py-6 text-center text-[11px] font-sans font-semibold border-t border-[#ebd7b1]/15 mt-auto">
        <p>© 2026 Hilal Unlu Mamülleri Kontrol Paneli. Tüm Hakları Saklıdır.</p>
        <p className="mt-1 text-gray-500">Sistem Modu: Tarayıcı LocalStorage portföy senkronizasyonu aktiftir.</p>
      </footer>
    </div>
  );
}
