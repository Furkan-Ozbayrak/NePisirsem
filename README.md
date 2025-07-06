# 🍽️ Ne Pişirsem – AI-Assisted Recipe Suggestion App

**Ne Pişirsem**, evde bulunan malzemelere göre kullanıcıya yemek tarifi önerileri sunan bir mobil uygulamadır. React Native ve Firebase Firestore kullanılarak geliştirilmiştir. Uygulama, kullanıcıdan aldığı girişlerle veritabanındaki tarifleri eşleştirerek en uygun yemekleri listeler.

---

## 🚀 Özellikler

- 📋 Malzeme girişine göre tarif filtreleme  
- 🔍 Firestore üzerinden hızlı ve gerçek zamanlı veri çekme  
- ⚡ Performans odaklı sade arayüz  
- 📱 Mobil uyumlu ve TypeScript destekli React Native kod yapısı  

---

## 🛠️ Kullanılan Teknolojiler

- **React Native** – Mobil uygulama geliştirme  
- **TypeScript** – Tip güvenli JS kod yapısı  
- **Firebase Firestore** – Gerçek zamanlı NoSQL veritabanı  
- **Expo CLI** – Mobil uygulamayı test ve geliştirme aracı  

---

## 📸 Uygulama Ekran Görüntüleri

<h4>🏠 Ana Sayfa</h4>
<p float="left">
  <img src="./screenshots/Home-screens.png" width="250"/>
</p>

<h4>🛒 Ürün Listesi</h4>
<p float="left">
  <img src="./screenshots/Select.png" width="250"/>
  <img src="./screenshots/select2.png" width="250"/>
</p>

<h4>🔍 Arama & Sepet</h4>
<p float="left">
  <img src="./screenshots/Search.png" width="250"/>
  <img src="./screenshots/Basket.png" width="250"/>
</p>

<h4>🍽️ Önerilen Tarifler & Detay</h4>
<p float="left">
  <img src="./screenshots/Recommended-dishes.png" width="250"/>
  <img src="./screenshots/YemekDetail.png" width="250"/>
</p>

---

## 🧩 Kurulum
⚠️ Firebase bağlantısı için assets/FireBase/FireStore.tsx içinde gerekli yapılandırmaları yapmayı unutmayın.
```bash
git clone https://github.com/Furkan-Ozbayrak/ne-pisirsem.git
cd ne-pisirsem/NePisirsem
npm install
npx expo start
