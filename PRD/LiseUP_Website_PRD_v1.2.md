# LiseUP Web Platformu — Ürün Gereksinim Dokümanı (PRD)

**Sürüm:** 1.2
**Tarih:** Nisan 2026
**Hazırlayan:** LiseUP Ürün Ekibi
**Kapsam:** liseup.org web platformu (masaüstü + mobil responsive)
**Tagline:** *Liselinin ekibini, Kurumun yeteneğini bulduğu platform.*

> **v1.2 değişiklik özeti:** Başarı hikayesi editoryal politikası netleşti (olay bazlı yayın + anonim seçenek + pilot öncesi 3 aylık içerik stratejisi), risk skoru 3 fazlı kalibrasyon planı entegre edildi, Partner Okul marka kullanım politikası yeni bölüm olarak eklendi (Pilot Okul → Partner Okul geçişi + reklam izni), "Kalan Açık Sorular" 5'ten 2'ye indi. Detaylı değişiklik günlüğü için Bölüm 20.
>
> **v1.1 değişiklik özeti:** Yasal yapı (dernek + iktisadi işletme), hibrit okul-liseli bağlantı modeli, risk skorlu moderasyon, kademeli mesajlaşma, şeffaf okul görünürlüğü, 3 şehirli başlangıç stratejisi, 8 rollü admin yapısı ve önceki crosscheck'te tespit edilen 18 akış hatasının tamamı.

---

## 1. Genel Bakış ve Hedefler

### 1.1 Ürün Özeti

LiseUP, Türkiye'deki lise öğrencilerinin fikirlerini ekiplere dönüştürdüğü; kurumların (şirketler, girişim sermayesi fonları, STK'lar, üniversiteler) genç yetenekleri keşfettiği; okulların ise öğrencilerinin proje aktivitelerini gözlemleyip raporlayabildiği **sosyal amaçlı platformdur**.

Platform üç ana tarafı buluşturur:

1. **Liseli** — Fikrini paylaşır, ekip arar, yeteneğini sergiler, projelere katılır, kurumlardan fırsat yakalar.
2. **Kurum** — Proje ve yetenek keşfeder, doğrudan iletişim kurar, fırsat/ilan yayınlar.
3. **Okul** — Öğrenci aktivitelerini takip eder, rapor alır, velilerine etki dokümanı sunar.

### 1.2 Ürün Hedefleri

| Hedef | Ölçüm |
|---|---|
| Liseliler için "ekip kurma" sürtünmesini ortadan kaldırmak | Platform üstünden kurulan ekip sayısı / ay |
| Kurumlara yetenek havuzuna erişim vermek | Kuruma ulaşan başvuru / ay, kurum-liseli mesajlaşma oranı |
| Okullara somut etki raporu sunmak | Raporu okuyan okul yönetici sayısı, pilot → partner dönüşüm oranı |
| Pilot → ölçeklenebilir partnerlik dönüşümü | Pilot sonrası anlaşma imzalayan okul oranı |
| Güvenli bir küçük kullanıcı ortamı sağlamak | Moderasyon olayı / 1.000 kullanıcı, veli onay tamamlanma oranı |

### 1.3 Tasarım Felsefesi (Tek Cümlede)

> Lise öğrencisinin telefonda 3 dakikada profilini kurup ilk projesine başvurabileceği, okulun 5 tıkla dönemlik raporunu indirebileceği, kurumun ise aradığı profile filtrelerle 30 saniyede ulaşabileceği bir platform.

### 1.4 Başlangıç Coğrafyası

Platform **İstanbul, Ankara ve İzmir** odaklı başlar. Bu karar:
- Okul pilotları bu 3 şehirden seçilir.
- Fırsat ve proje öneri algoritması bu 3 şehre göre ağırlıklandırılır.
- Diğer şehirlerden kayıt kabul edilir ama "pilot dışı bölge" etiketiyle işaretlenir.
- 2027 itibarıyla Bursa, Antalya, Kocaeli, Eskişehir, Kayseri, Adana'ya genişleme.

---

## 2. Yasal Yapı ve Kurumsal Kimlik

### 2.1 Çift Yapı: Dernek + İktisadi İşletme

LiseUP, **"LiseUP Derneği"** ve onun **iktisadi işletmesi** olarak iki yapılı kurulur:

- **LiseUP Derneği:** Sosyal amacı taşır (lise öğrencilerinin girişimcilik ekosistemine erişimi). Bağış, üyelik aidatı, grant alır. Kâr dağıtmaz. Okul partnerliklerinin resmi muhatabı bu yapıdır.
- **İktisadi İşletme:** Derneğin ticari kolu. Kurumlara aylık abonelik ve branded fırsat hizmetlerini satar. Ticari gelirini vergisi ödendikten sonra derneğe aktarır, dernek bu geliri amaca döner.

### 2.2 Avantajlar

- Okul ve veli güvenilirliği (dernek algısı)
- Kurumsal gelir yasal zeminde (iktisadi işletme)
- Uzun vadede kamu yararına dernek statüsüne başvuru → bağışlara vergi avantajı
- 7 kurucu üye yeterli (mevcut 17 kişilik ekip fazlasıyla karşılar)

### 2.3 Kuruluş Timeline

| Tarih | Adım |
|---|---|
| Nisan–Mayıs 2026 | Hukuki danışman seçimi, tüzük taslağı |
| Mayıs 2026 | Kurucu üye protokolleri, dernek kuruluş başvurusu (İçişleri Bakanlığı) |
| Haziran 2026 | Dernek tüzel kişilik kazanımı, vergi dairesi kaydı |
| Temmuz 2026 | İktisadi işletme tescili, banka hesapları |
| Ağustos 2026 | KVKK VERBİS kaydı, noter işlemleri |
| Eylül 2026 | Platform pilot başlangıcı — yasal altyapı hazır |

### 2.4 Marka Dili

- Ana sayfa etiketi: **"Lise Öğrencilerine Ücretsiz • LiseUP Derneği"**
- Footer'da: "LiseUP Derneği — Sosyal amaçlı platform. İstanbul merkezli."
- Kurum pricing sayfasında: "Kurumsal abonelik geliri, Derneğimiz aracılığıyla platforma yatırılır."
- "Non-profit" İngilizce etiketi "Social Enterprise" olarak kullanılır.

### 2.5 Kurum Pricing Modeli

**Liseli ve Okul tarafı %100 ücretsizdir.** Kurum tarafı üç katmanlıdır:

| Katman | Kapsam | Ücretlendirme |
|---|---|---|
| **Discover** | Yetenek/proje keşfet, ayda 20 mesaj hakkı, 1 fırsat yayını/ay | Ücretsiz |
| **Engage** | Sınırsız mesaj, 10 fırsat/ay, analitik, kaydedilen profil CRM | Aylık abonelik (tutar pilot sonrası netleşir) |
| **Partner** | Branded yarışma/program, öne çıkarılmış fırsatlar, özel liste, API erişimi | Sözleşmeli |

Pilot döneminde (Eylül 2026 – Ocak 2027) tüm kurumlar Discover + Engage'e **ücretsiz erişir**; yetenek havuzunu büyütmek için. Ücretlendirme Şubat 2027'de aktive olur.

---

## 3. Kullanıcı Personaları

### 3.1 Liseli — "Deniz, 16"
- **Profil:** Ankara'da bir Anadolu lisesi 11. sınıf öğrencisi. Yazılıma merakı var, GitHub hesabı yeni açtı. Okulu henüz LiseUP partneri değil.
- **Acı Noktaları:** Proje fikri var ama yalnız. Ekip kurmak için Instagram'dan rastgele mesaj atıyor. Okulunda kodlayan başka öğrenci tanımıyor.
- **Hedefleri:** Fikrine ortak bulmak, CV'sine yazabileceği bir çıktı üretmek, iyi üniversitelere başvuruda fark yaratmak.
- **Cihaz:** %80 mobil, %20 masaüstü (okul kütüphanesi).
- **Beklentisi:** Hızlı kayıt, gamification, Instagram/Discord hissi — uzun formlar onu kaçırır.
- **LiseUP'taki statüsü:** "Bağımsız liseli" (partner okul dışı). Tam işlev kullanır ama "doğrulanmış" rozet taşımaz.

### 3.2 Liseli-2 — "Ece, 17"
- **Profil:** İstanbul'da özel okulda, tasarım/UX ile ilgili, Behance portfolyosu var. Okulu LiseUP pilot partneri.
- **Acı Noktaları:** Teknik arkadaş bulamıyor; tek başına ürün ortaya koyamıyor.
- **Hedefleri:** Projelerde tasarımcı rolü alıp portfolyosunu büyütmek.
- **Beklentisi:** Rol bazlı proje arama ("tasarımcı aranıyor"), portfolyosunu gösterebileceği zengin profil.
- **LiseUP'taki statüsü:** "Doğrulanmış öğrenci" — profilinde okul rozeti görünür, kurum aramalarında öncelikli sıralanır.

### 3.3 Okul Temsilcisi — "Serkan Öğretmen, 38"
- **Profil:** Özel lisede müdür yardımcısı, rehberlik + kariyer koordinatörü.
- **Acı Noktaları:** Yönetime "öğrencilerimiz dışarıda ne yapıyor?" sorusuna somut veri veremiyor. Veli sunumlarında aktivite raporu istiyor.
- **Hedefleri:** Öğrenci aktivitesini izlemek, aylık/dönemlik rapor almak, okulun "girişimci öğrenci yetiştiren okul" markasını güçlendirmek.
- **Cihaz:** %90 masaüstü.
- **Beklentisi:** İndirilebilir PDF raporlar, toplu gösterimi kolay dashboard, "veliye sunulabilir" format.

### 3.4 Kurum Temsilcisi — "Ayşe, 32"
- **Profil:** Bir erken aşama VC fonunda ekosistem ilişkileri yöneticisi.
- **Acı Noktaları:** Genç yetenek havuzu göremiyor, lise çağındaki girişimcilere ulaşmak için yapısal bir kanal yok.
- **Hedefleri:** Erken yaşta dikkat çekici projeleri keşfetmek, LinkedIn'den önce iletişim kurmak.
- **Beklentisi:** Filtreli yetenek arama, projeye tek tıkla mesaj, raporlanabilir etkileşim geçmişi.

### 3.5 Veli — "Hülya Hanım, 44"
- **Profil:** Deniz'in annesi, kurumsal sektörde orta düzey yönetici. Oğlunun her yaptığı online aktiviteden sorumlu hisseden bir ebeveyn.
- **Acı Noktaları:** "Bu platform nedir, oğlumla kim konuşuyor, hangi bilgiler paylaşılıyor?"
- **Beklentisi:** Şeffaf veli onay e-postası, istediği zaman hesabı denetleyebilme hakkı, net KVKK metni.
- **Platformdaki rolü:** Onay verir, gerektiğinde hesap kapatma talebi gönderebilir, aylık özet e-postası alır (opsiyonel).

### 3.6 Admin — LiseUP iç ekibi
- **Profil:** Platformu işleten çekirdek ekip (Çağan, Furkan, Mete, Mehmet ve 17 kişilik takım).
- **İhtiyaç:** İçerik moderasyonu, okul hesap açma, kurum onayları, genel analitik, kullanıcı destek.
- **Rol yapısı:** 8 farklı admin rolü (bkz Bölüm 11).

---

## 4. Okul-Liseli Bağlantı Modeli (Hibrit)

Bu bölüm platformun çekirdek mantığıdır ve diğer bütün akışları etkiler.

### 4.1 Üç Liseli Durumu

Her liseli hesap, sistemde aşağıdaki üç durumdan birindedir:

#### A) **Bağımsız Liseli**
- Okulu LiseUP partneri değil veya okulu listede yok.
- Tam kullanıcı: proje açar, fırsat başvurur, ekip kurar, mesajlaşır.
- Kurum aramalarında görünür ama "doğrulanmış" rozet taşımaz.
- Öneri algoritmasında standart ağırlık.

#### B) **Doğrulanmış Liseli (Partner Okul)**
- Okulu LiseUP partneri + öğrenci okul bağlantısını onaylamış.
- Profilde okul rozeti görünür.
- Kurum aramalarında "Partner okul öğrencileri" filtresiyle öne çıkar.
- Aktivitesi okul panelinde görünür (Bölüm 9 — şeffaf görünürlük kuralları).
- Öneri algoritmasında +%30 ağırlık.

#### C) **Bağlantı Bekleyen Liseli**
- Okul partner oldu ancak öğrenci henüz bağlantı onayı vermedi.
- Platform işlevi kısıtsız (bağımsız gibi çalışır).
- Profilinde "Okulun LiseUP'a katıldı — bağlantıyı onayla" banner'ı görünür.
- 30 gün içinde onay gelmezse banner kaldırılır, "Okul Ayarları"ndan sonra tekrar erişilebilir.

### 4.2 Durum Geçişleri

```
Kayıt → Bağımsız Liseli (varsayılan)

Bağımsız Liseli
    ↓ (okul partnerlik anlaşması imzalandı + admin eşleştirme yaptı)
Bağlantı Bekleyen
    ↓ (öğrenci "Onayla" + veli onayı <18 ise)
Doğrulanmış Liseli
    ↓ (öğrenci isterse "Okuldan ayrıl")
Bağımsız Liseli
```

### 4.3 Retroaktif Bağlama (Okul Sonradan Partner Olursa)

Bir okul Eylül 2026'da partner olur. O okulda kayıtlı 40 bağımsız liseli sistemde vardır. Akış:

1. **Admin eşleştirme:** LiseUP admin paneli okul alan adı / öğrenci seçim listesi bazında eşleşmeleri tespit eder.
2. **Öğrenci bildirimi:** Her eşleşen öğrenciye **e-posta + platform bildirimi** gider: *"[Okul Adı] LiseUP partneri oldu. Okul bağlantınızı onaylar mısınız? (Kabul ederseniz proje ve aktiviteniz okul panelinde görünmeye başlar.)"*
3. **30 gün bekleme:** Onay gelene kadar durum "Bağlantı Bekleyen"dir. Bu süreçte okul paneli öğrenciyi **sadece "Toplam kayıtlı ama bağlanmamış: X" sayacında** görür, isim ve aktivite görünmez.
4. **Onay sonrası:** Veli onayı (<18) yenilenir (yeni bir veri paylaşım kapsamı için), sonra durum "Doğrulanmış"a geçer. Geçmiş aktivite retroaktif görünür.
5. **Ret durumunda:** Öğrenci "Bağlanmak istemiyorum" seçer → Bağımsız olarak kalır. Okul panelinde hiç görünmez. Gerekçe LiseUP'a iletilir (opsiyonel).

### 4.4 Birden Fazla Okul / Transfer Senaryoları

- Öğrenci profilinde okul alanı **değiştirilebilirdir.** Transferler, çift kayıt, yurt dışı liselileri için gereklidir.
- Aynı anda yalnızca bir okula bağlı olunabilir. Transfer durumunda "Eski okul" arşivine düşer, yeni okul eşleşmesi yapılır.
- Eski okulun panelinde: "Bu öğrenci ayrıldı" etiketiyle tarihsel aktivite görünür (okul partnerliği devam ediyorsa).

---

## 5. Bilgi Mimarisi (Site Haritası)

```
liseup.org
│
├── PUBLIC (Giriş gerektirmeyen)
│   ├── / (Anasayfa)
│   ├── /liseliler (Liseliler için landing)
│   ├── /okullar (Okullar için landing)
│   ├── /kurumlar (Kurumlar için landing)
│   ├── /hakkimizda
│   ├── /ekip
│   ├── /basari-hikayeleri
│   ├── /basari-hikayeleri/[slug]
│   ├── /blog
│   ├── /blog/[slug]
│   ├── /iletisim
│   ├── /sss
│   ├── /kvkk
│   ├── /gizlilik-politikasi
│   ├── /kullanim-kosullari
│   ├── /dernek (Dernek ve yasal yapı bilgisi)
│   ├── /giris
│   ├── /kayit (Rol seçici landing)
│   ├── /kayit/liseli
│   ├── /kayit/kurum
│   ├── /sifremi-unuttum
│   ├── /pilot-basvuru (Okullar için pilot başvuru formu)
│   ├── /veli-onay (E-posta linkinden gelir)
│   ├── /okul/davet (Davet tokeni ile okul hesabı kurulumu)
│   └── /404, /500 (Özel hata sayfaları)
│
├── LİSELİ PANELİ (/app)
│   ├── /app (Dashboard)
│   ├── /app/onboarding (İlk giriş turu)
│   ├── /app/profil
│   ├── /app/profil/duzenle
│   ├── /app/projeler
│   ├── /app/projeler/yeni
│   ├── /app/projeler/[id]
│   ├── /app/projeler/[id]/duzenle
│   ├── /app/projeler/[id]/basvurular (Proje sahibi görür)
│   ├── /app/projeler/[id]/sohbet (Ekip sohbeti)
│   ├── /app/projeler/[id]/gizle (Okul görünürlüğünden gizleme talebi)
│   ├── /app/kesfet
│   ├── /app/kesfet/projeler
│   ├── /app/kesfet/liseliler
│   ├── /app/firsatlar
│   ├── /app/firsatlar/[id]
│   ├── /app/basvurularim
│   ├── /app/mesajlar (Sadece proje bağlamlı + kurum mesajları)
│   ├── /app/mesajlar/[konusma_id]
│   ├── /app/basarilar
│   ├── /app/bildirimler
│   ├── /app/okul-baglanti (Okul bağlantı yönetimi)
│   ├── /app/veri-indir (KVKK veri portabilitesi)
│   └── /app/ayarlar
│
├── OKUL PANELİ (/okul)
│   ├── /okul (Dashboard)
│   ├── /okul/ogrenciler
│   ├── /okul/ogrenciler/[id]
│   ├── /okul/projeler
│   ├── /okul/projeler/gizleme-talepleri (Öğrenci proje gizleme talepleri)
│   ├── /okul/firsat-merkezi
│   ├── /okul/basari-vitrini
│   ├── /okul/raporlar
│   │   ├── /okul/raporlar/aylik
│   │   └── /okul/raporlar/donem-sonu
│   ├── /okul/partner-ayricaliklar
│   ├── /okul/temsilci-yonetimi
│   └── /okul/ayarlar
│
├── KURUM PANELİ (/kurum)
│   ├── /kurum (Dashboard)
│   ├── /kurum/kesfet/liseliler
│   ├── /kurum/kesfet/projeler
│   ├── /kurum/kaydedilenler
│   ├── /kurum/firsat-yayinla
│   ├── /kurum/firsatlarim
│   ├── /kurum/basvurular
│   ├── /kurum/mesajlar
│   ├── /kurum/profil
│   ├── /kurum/analitik
│   ├── /kurum/abonelik (Pricing, fatura)
│   └── /kurum/ayarlar
│
└── ADMIN PANELİ (/yonetim)
    ├── /yonetim
    ├── /yonetim/kullanicilar
    ├── /yonetim/liseliler/veli-onayi-bekleyen
    ├── /yonetim/okullar
    ├── /yonetim/okullar/pilot-basvurulari
    ├── /yonetim/kurumlar
    ├── /yonetim/kurumlar/onay-kuyrugu
    ├── /yonetim/moderasyon
    ├── /yonetim/moderasyon/yuksek-risk
    ├── /yonetim/moderasyon/sikayetler
    ├── /yonetim/firsatlar (Kurum fırsat moderasyonu + hassas flag yönetimi)
    ├── /yonetim/raporlar
    ├── /yonetim/eslestirme (Retroaktif okul-liseli eşleştirme)
    ├── /yonetim/sistem
    └── /yonetim/roller
```

---

## 6. Public Sayfalar — Detaylı İçerik

### 6.1 Anasayfa (`/`)

**Amaç:** Gelen ziyaretçiyi doğru kanala (Liseli / Okul / Kurum) yönlendirmek.

**Bölüm sırası (yukarıdan aşağı):**

1. **Hero**
   - H1: "Liselinin ekibini, kurumun yeteneğini bulduğu platform."
   - Alt başlık: "Fikir bende, ekip nerede? Burada."
   - Etiket rozeti: **"Lise Öğrencilerine Ücretsiz • LiseUP Derneği"**
   - 3 ana CTA butonu:
     - `Liseliyim → Fikrimi paylaşayım`
     - `Okulum → Pilot başlatalım`
     - `Kurumum → Yetenek keşfedeyim`
   - Arka plan: #3871DF tonlarında animasyonlu network grafiği

2. **Sosyal İspat Şeridi:** Pilot okullar / Partner kurumlar logo sliderı.

3. **Problem & Çözüm (iki kolon):** Sunumdaki mesaj birebir.

4. **Nasıl Çalışır (3 adım):** Kayıt ol → Profil/Proje oluştur → Ekip bul veya keşfedil.

5. **Neden Şimdi:** 3 metrik (%88 Gen Z girişimcilik, İstanbul #1, 478 aktif fon).

6. **Başarı Hikayeleri (Carousel).**

7. **Ekip Önizleme:** 4 yönetim kartı + "17 kişilik ekibimiz" linki.

8. **Footer:**
   - Logo, tagline, info@liseup.org
   - 4 sütun: Platform / Keşfet / Şirket / Yasal
   - Sosyal medya
   - "LiseUP Derneği — İstanbul" rozeti
   - Telif satırı + KVKK linki

### 6.2 Liseliler İçin (`/liseliler`)

1. Hero: "Fikir bende, ekip nerede?" + "Hemen ücretsiz kaydol" CTA
2. Ne yapabilirsin? (4 kart): Fikrini paylaş / Projeye katıl / Fırsatlara başvur / Kurumlardan mesaj al
3. Portfolyo değerin
4. Güvenlik ve Ebeveyn Onayı: Veli onayı + mesajlaşma kuralları + hassas içerik koruması açıkça yazılır
5. SSS (6 ana soru — veli onayı, okul görünürlüğü, güvenlik dahil)
6. CTA tekrar

### 6.3 Okullar İçin (`/okullar`)

1. Hero: "Öğrencileriniz proje üretir, siz raporlarsınız."
2. Okulunuza Değer (6 kart — sunumdaki liste)
3. Pilot Nasıl Çalışıyor (Eylül 2026 / Ekim-Aralık 2026 / Ocak 2027)
4. Pilot Okuldan Beklentimiz
5. Sizin Beklentiniz
6. Örnek Rapor Önizleme
7. Pilot Başvuru CTA → `/pilot-basvuru` sayfasına yönlendirir

### 6.4 Kurumlar İçin (`/kurumlar`)

1. Hero: "478 fonun, her biri aynı pitch'lere bakıyor. Siz bir adım önce bakın."
2. Ne yapabilirsiniz? (4 kart)
3. Kullanım senaryoları (VC / Teknoloji / STK)
4. Gizlilik ve moderasyon
5. **Pricing bölümü net:** Discover (ücretsiz) / Engage (aylık abonelik) / Partner (sözleşmeli) — pilot dönemi ücretsiz notu
6. CTA: "Kurum hesabı oluştur"

### 6.5 Dernek Sayfası (`/dernek`)

- Dernek kuruluş bilgileri
- Tüzük PDF linki
- Yönetim kurulu üyeleri
- Yıllık faaliyet raporu (ilk yıl sonunda)
- Bağış kanalları
- Kurumsal gelir şeffaflık raporu (yıllık)

### 6.6 Pilot Başvuru (`/pilot-basvuru`)

Okul yönetiminin doldurduğu form:
- Okul adı, şehir, ilçe
- Öğrenci sayısı
- Temsilci ad-soyad, ünvan, e-posta, telefon
- Okul tipi (devlet / özel)
- Kısa motivasyon metni
- Görüşme için uygun tarih aralığı
- Tercih edilen pilot başlangıç dönemi

Form gönderildikten sonra: "Başvurunuz alındı. 5 iş günü içinde size dönüş yapacağız."

### 6.7 Diğer Public Sayfalar

- **Hakkımızda:** LiseUP'ın kuruluş hikayesi, vizyon-misyon, dernek statüsü.
- **Ekip:** 4 yönetim kartı + grid.
- **Blog:** Kategoriler, yazar sistemi (iç ekip + davetli dış yazar), moderasyon akışı.
- **İletişim:** info@liseup.org, iletişim formu.
- **SSS:** 3 sekme (Liseli / Okul / Kurum).
- **KVKK / Gizlilik / Kullanım Koşulları:** 18 yaş altı özel bölüm, veri portabilitesi hakkı, saklama süreleri, mesajlaşma kuralları.
- **404 / 500:** Özel tasarım, "aradığınız sayfa yok ama şu projeler var" gibi yönlendirici.

### 6.8 Başarı Hikayeleri — Editoryal Politika (v1.2 — netleşti)

**Filtreleme:** Başarı Hikayeleri sayfası Okul / Kategori / Yıl filtreleriyle listelenir. Her hikaye için öğrenciden açık onay (imzalı form) alınır, "Beni kaldır" hakkı her zaman aktiftir.

**Yayın kriteri — "Major Başarı":** Başarı hikayesi sabit takvimle değil, **olay bazlı** yayınlanır. Aşağıdakiler "major başarı" sayılır:
- Platform üstünden başlatılan ve somut çıktıyla tamamlanan proje
- Yarışma derecesi (il/ülke/uluslararası)
- Kurum teklifi kabulü (staj, mentörlük, yatırım)
- Prestijli program/staj/burs kabulü
- Basında öne çıkan ürün veya inisiyatif

Küçük aktiviteler (kayıt olma, ilk profil, ilk proje açma) hikaye değil rozet materyalidir.

**Editoryal Akış (5 adım):**

1. **Tetiklenme:** Başarı olayı sisteme düşer — proje tamamlama, fırsat kabulü, harici başarı bildirimi (öğrenci veya okul tarafından).
2. **İnceleme:** İçerik Editörü (Medya ekibi — Mehmet Efe takımı) hikayeyi editoryal standart için inceler.
3. **Röportaj & Onay:** Öğrenci ile röportaj yapılır, hikaye taslağı paylaşılır, imzalı yayın onayı alınır. <18 öğrenciler için veli onayı da alınır.
4. **Okul Bilgilendirme:** Doğrulanmış öğrenciyse okul Success Manager'ı ile paylaşılır — okul logosu/branding kullanımı onayı alınır (Bölüm 9.9 kapsamında).
5. **Yayın:** Başarı Hikayeleri sayfası + sosyal medya + ilgili okul başarı vitrini + newsletter.

**Anonim Hikaye Seçeneği (v1.2 — yeni):**
- Öğrenci kimliğini açıklamak istemezse hikaye **sadece ilk isim + kategori** ile yayınlanabilir.
- Özellikle hassas başarılar için önemli: ruh sağlığı alanında proje, LGBTQ+ kuruluş fırsatına kabul, travma/şiddet araştırmaları, dini içerikli program kabulleri vb.
- Anonim hikayelerde okul bilgisi de gizlenir — gerçek kimlik izlerinin tamamı maskelenir.
- Anonim seçenek öğrenciye röportaj aşamasında net olarak sunulur.

**"Beni kaldır" hakkı:**
- Öğrenci dilediği zaman hikayenin arşive alınmasını talep edebilir.
- Talep sonrası 7 gün içinde hikaye yayından kaldırılır.
- Arşivlenmiş sosyal medya postları için "makul gayret" ilkesi — tamamen silinemez ama LiseUP hesapları güncellenir.

**Pilot Öncesi İçerik Stratejisi (Haziran–Ağustos 2026):**

Pilot Eylül 2026'da başlayacağı için bu 3 aylık pencerede gerçek öğrenci başarı hikayesi olmayacak. Blog ve hazırlık içeriği:

| Ay | Tema | İçerik Türü | Yaklaşık yazı sayısı |
|---|---|---|---|
| Haziran 2026 | "Neden Kurduk" serisi | Kurucu ekip (Çağan, Furkan, Mete, Mehmet) kendi lise deneyimleri ve LiseUP motivasyonu | 4 yazı |
| Temmuz 2026 | Lise girişimciliği konjonktürü | Davetli yazar mülakatları (genç girişimciler, eğitimciler, VC'ler), sektör rehberleri | 2–4 yazı |
| Ağustos 2026 | Pilot okul tanıtımı | Pilot okul(lar)ın hikayesi, pilot öğrencileriyle ön tanışma içerikleri, "Eylül'de görüşürüz" teaserları | 2–3 yazı |
| Eylül 2026+ | Olay bazlı | Gerçek platform başarı hikayeleri yayın ritmine geçer | Sıklık olaya bağlı |

Pilot sonrası (Ekim 2026+) yayın sıklığı ortalama 2 haftada 1 olarak şekillenir, ancak **sabit takvim yoktur** — başarı oldukça yayın yapılır.

---

## 7. Kayıt ve Kimlik Akışları

### 7.1 Liseli Kayıt Akışı

**Adım 1 — Temel Bilgi:**
- Ad, soyad, doğum tarihi, e-posta, şifre, KVKK onay.
- Doğum tarihi validasyonu: sistem tarihiyle tutarlılık kontrolü.

**Adım 2 — Yaş Kontrolü ve Veli Akışı:**
- ≥18 → normal akış devam eder.
- <18 → **"Veli e-posta adresi"** alanı eklenir (zorunlu).
- Öğrenci e-postası ile veli e-postası aynı olamaz.

**Adım 3 — Okul Seçimi:**
- Şehir → İlçe → Okul listesi (arama).
- Okul listede yoksa "Okulumu ekle" (manuel onay kuyruğuna düşer, 48 saat içinde admin inceler).
- **Okul e-posta doğrulaması (opsiyonel ama güçlü sinyal):** Bilinen okul alan adlarında @okul.k12.tr → ek doğrulama e-postası. Doğrulama varsa kayıt onay öncesinde "doğrulanmış" bayrağı alır.

**Adım 4 — İlgi Alanları:**
- Min 3 etiket seçimi (Yazılım, Tasarım, Biyoloji, İş/Finans, İletişim/PR, Donanım/Robotik, Sanat, Sürdürülebilirlik, Sosyal Bilimler, Sağlık vb. — 15 ana kategori).

**Adım 5 — Veri Escrow (<18 için kritik):**
- Kayıt tamamlandığında <18 kullanıcının verileri **ayrı şifrelenmiş "beklemede" tablosunda tutulur.** Ana profil oluşturulmaz.
- Veliye otomatik e-posta gönderilir.
- Öğrenci ekranında: "Veli onayı bekleniyor. E-postaya 72 saat içinde dönüş gelmezse kaydınız silinir."

**Adım 6 — Veli Onayı (<18 için):**
- Veli `/veli-onay?token=...` sayfasında:
  - LiseUP nedir (kısa video + yazı)
  - Çocuğunuzun paylaşacağı veriler
  - Kimlerle iletişim kurabileceği
  - Kendi ad-soyad, yakınlık derecesi, TC (opsiyonel — bağış vergi indirimi için gelecekte kullanılır)
  - KVKK açık rıza + kullanım koşulları onayı
  - Dijital imza kutusu (checkbox + "onaylıyorum" butonu; noter şartı yok, **KVKK açık rıza için yazılı beyan yeterli**)
- Onay sonrası veli alır: hesap özet e-postası + istediğinde hesap iptal linki.

**Adım 7 — Hesap Aktivasyon:**
- Veli onayı geldiğinde verdata escrow'dan ana tabloya taşınır, profil aktive olur.
- Liseli "Onboarding turuna" yönlendirilir (`/app/onboarding`): 4 ekranlık interaktif tur.

**Adım 8 — Profil Tamamlama:**
- Bio (opsiyonel, 280 karakter)
- Skill tag'leri + seviyeler
- Portfolyo linkleri
- Avatar fotoğrafı (opsiyonel)

**"Onay Bekliyor" modu kaldırıldı (v1.0'daki hata düzeltmesi):** v1.0'da liseli veli onayı gelmeden profilini kullanabiliyordu. **v1.1'de veri KVKK kapsamında escrow'dadır, profil aktive değildir.**

**72 saat kuralı:** Veli onayı 72 saat içinde gelmezse kayıt **tamamen silinir.** Liseli yeniden kayıt olabilir.

### 7.2 Okul Kayıt Akışı

Okullar self-servis kayıt olmaz. Süreç:

1. **Pilot başvuru:** `/pilot-basvuru` formundan başvuru.
2. **LiseUP ekibi görüşme:** Okul Success ekibi (bkz Bölüm 11) 5 iş günü içinde iletişime geçer.
3. **Protokol imzası:** Dernek ile okul arasında partnerlik protokolü.
4. **Hesap oluşturma:** Admin panelden okul hesabı açılır, temsilciye `/okul/davet?token=...` e-posta linki gönderilir.
5. **Temsilci kurulum:** Şifre belirle, profil doldur, okul marka öğeleri yükle, iletişim tercihleri seç.
6. **Öğrenci eşleştirme:** Retroaktif eşleştirme akışı (Bölüm 4.3) tetiklenir. Okul temsilcisi eşleştirme sonuçlarını dashboard'da izler.

### 7.3 Kurum Kayıt Akışı

1. `/kayit/kurum` — Kurum adı, vergi/MERSIS no, yetkili ad-soyad, iş e-postası (**@kurumsal.com zorunlu; Gmail/Hotmail reddedilir**), telefon.
2. **Manuel doğrulama (Kurum Success ekibi, SLA: 48 saat):**
   - Web sitesi kontrolü
   - Vergi levhası / ticari sicil doğrulaması
   - Faaliyet alanı uyumluluğu
   - Risk skoru: ilişkili kişilerin geçmişi (varsa)
3. Onay → kurum Discover katmanında aktif, fırsat yayınlayabilir.
4. Engage'e geçmek için abonelik (pilot dönemi sonrası).
5. Ret → neden ile birlikte geri bildirim e-postası.

---

## 8. Liseli Paneli — Detaylı Sayfa Şartnamesi

### 8.1 Dashboard (`/app`)

**Bölümler (üstten alta):**
- **Karşılama kartı:** "Merhaba Deniz 👋 Bu hafta 2 yeni proje ilgi alanında."
- **Okul bağlantı banner'ı (varsa):** "Okulun LiseUP'a katıldı. Bağlantıyı onayla?" (Bölüm 4.3)
- **Aksiyon önerileri:** Profil tamamlama, aktif proje yoksa ilk proje, okunmamış mesaj.
- **Önerilen Projeler (4 kart):** İlgi alanı + şehir (zorunlu alan artık) + sınıf seviyesi.
- **Önerilen Fırsatlar (3 kart):** Son başvuru tarihlerine göre sıralı.
- **Aktif Projelerim (liste).**
- **Etkinlik akışı:** "Ece projene başvurdu", "Yarışma X açıldı", "Profilin bir kurum tarafından görüntülendi".

### 8.2 Profil (`/app/profil`)

**Bölümler:**
- Kapak ve Avatar, Ad, Okul (Bağımsız/Doğrulanmış etiketiyle), sınıf, şehir.
- **Doğrulanmış liseliler için okul rozeti:** Okul logosu + "Partner Okul Öğrencisi".
- Hakkımda (280 karakter).
- Yetenekler (tag + seviye).
- İlgi Alanları.
- Portfolyo (linkler + 3 öne çıkan iş).
- Deneyimler (yarışmalar, kurslar, projeler).
- Rozetler.
- Referanslar (moderasyonlu).

**Profil Görünürlük Toggle'ları (v1.1 — iki ayrı kontrol):**
- `Diğer liselilere görünür` — varsayılan: **açık** (ekip kurma için gerekli)
- `Doğrulanmış kurumlara görünür` — varsayılan: **açık** (platform değeri için gerekli; kapatılabilir)
- `Soyad kurumlara görünür` — varsayılan: **kapalı** (<18 için güvenlik)
- `Foto kurumlara görünür` — varsayılan: **kapalı** (<18 için güvenlik; kabul ettiği kurum mesajında açılır)

> **UX kararı:** Profil sayfasının mobil ilk görünümü LinkedIn değil, Instagram hissi vermeli — foto büyük, bio kısa, rozetler görsel.

### 8.3 Projelerim (`/app/projeler`)

**Liste görünümü:** Kart grid — proje görseli, başlık, durum, ekip sayısı, açık rol sayısı.

**Proje Oluşturma (`/app/projeler/yeni`) — Adımlar:**
1. **Temel:** Başlık, 1 cümle pitch, ana kategori.
2. **Detay:** Uzun açıklama (markdown), hedef.
3. **Ekip:** Aranan roller + kaç kişi + rol başına gerekli yetenekler.
4. **Lokasyon (v1.1 — zorunlu):** Şehir seçici (TR tüm şehirler) + "Online" / "Hibrit" seçenekleri. Öneri algoritması bu alana dayanır.
5. **Zaman:** Başlangıç-bitiş (opsiyonel), haftalık zaman taahhüdü.
6. **Görsel:** Kapak / kısa video / Figma embed.
7. **Gizlilik:** Açık (herkes başvurabilir) / Davet (sadece davet ettiklerim).
8. **Önizle & Yayınla:** Risk skoru hesaplanır (Bölüm 12). Düşük riskli → anında yayın. Yüksek riskli → manuel moderasyon kuyruğu (SLA: 4 saat, saat 22:00–08:00 arası sabah 09:00'a ötelenir).

**Proje Detay Sayfası:**
- Üst: Kapak, başlık, durum, sahip.
- Sol: Açıklama, hedefler, yol haritası.
- Sağ: Ekip kartları, açık roller + "Başvur" butonu, konum, okul görünürlük etiketi.
- Alt: Güncellemeler (timeline), yorumlar (moderasyonlu).

**Okul Görünürlük Etiketi (Bölüm 9.4):**
- Varsayılan: "Okula görünür" 📊
- Öğrenci "Okulumdan gizle" talep etti → etiket "Gizleme talebi gönderildi (okul inceliyor)"
- Okul onayladı → "Okula gizli" (sadece öğrenciye ve ekibine görünür)
- Okul reddetti → "Gizleme reddedildi — okul görebilir"

**Proje Tamamlama Akışı (v1.1 — yeni):**
- Proje sahibi "Tamamlandı" statüsüne alır.
- Sistem ekibe 3 soru sorar: Ne yaptık? Ne öğrendik? Neyi farklı yapardık?
- Ekip cevapları birleştirir → otomatik **"Proje Retrospektifi"** dokümanı.
- Ekip üyelerine sertifika (PDF) sistemle üretilir: LiseUP logosu + okul logosu (doğrulanmış öğrenciler için) + proje özeti + imzalı.
- Doğrulanmış öğrenciler için okul bilgilendirilir, başarı vitrinine aday olarak işaretlenir.
- Öğrenci "Başarı hikayesi olarak paylaşmak ister misin?" sorusuna cevap verir.

### 8.4 Proje Başvuru Akışı (v1.1 — yeni detay)

Liseli bir projeye başvurduğunda:

1. **Başvuru formu:** Proje sahibi tarafından özelleştirilebilir, varsayılan 3 soru:
   - Bu role neden uygun olduğunu düşünüyorsun?
   - Benzer deneyimin var mı? (link paylaşabilirsin)
   - Haftada ne kadar vakit ayırabilirsin?
2. **Gönderildi:** Başvuru proje sahibine bildirilir. **Henüz mesajlaşma AÇILMAZ.**
3. **Proje sahibi inceler:**
   - **Kabul:** Liseli ekibe eklenir, proje sohbeti otomatik açılır, ilgili taraflarda "Hoş geldin" bildirimi.
   - **Ret:** Liseliye bildirim gider — isteğe bağlı ret nedeni.
   - **Bilgi iste:** Proje sahibi liseliyle konuşmak isterse 1:1 mesajlaşma açılır (bu DM **sadece bu bağlamda** geçerlidir, kabul/ret kararı sonrası kapanır veya ekip sohbetine dönüşür).
4. **Her iki taraf da <18 ise:** Aynı moderasyon (mesaj filtreleme, iletişim bilgisi bloklaması) uygulanır.

### 8.5 Keşfet (`/app/kesfet`)

Sekmeli: **Projeler | Liseliler**.

**Filtreler (sol sidebar):**
- Kategori
- Aranan rol
- Şehir (default: İstanbul/Ankara/İzmir)
- Ekip boyutu
- Müsaitlik durumu
- Sıralama: En Yeni / En Popüler / Yakınımdakiler / Benzer İlgi Alanı

**Liseliler sekmesi:**
- Grid profil kartları
- **Liseli-liseli DM yok** — kartta "Ortak projeye davet et" veya "Projeme başvur çağrısı" aksiyonları.
- "Kaydet" (favorilere ekle, sonra projende çağırmak için).

### 8.6 Fırsatlar (`/app/firsatlar`)

- Yarışma, yaz okulu, burs, staj, program fırsatları.
- Her kart: kapak, başlık, kurum logosu, kategori, son başvuru, şehir/online.
- **Hassas fırsat etiketi:** Admin tarafından "hassas" flag alınmış fırsatlar özel bir badge ile görünür. Bu fırsatlara yapılan başvurular **okul panelinde görünmez** (Bölüm 9).
- Başvuru yöntemi: LiseUP dahili form (otomatik takip) veya dış link (manuel takip).

### 8.7 Başvurularım (`/app/basvurularim`)

- Sekmeli: Projelere Başvurularım | Fırsat Başvurularım.
- Dış link fırsat başvuruları için **"Başvurdum olarak işaretle"** manuel butonu. Sistem deadline sonrası hatırlatır.
- Sütunlar: Ad, Durum, Tarih, Aksiyon.

### 8.8 Mesajlar (`/app/mesajlar`)

**Erişim kuralları (v1.1 kademeli model):**

| Taraflar | DM durumu |
|---|---|
| Liseli ↔ Liseli (genel) | ❌ Kapalı |
| Liseli ↔ Liseli (ortak proje üyesi) | ✅ Ekip sohbetinde |
| Liseli ↔ Proje sahibi (başvuru incelemesi) | ⚠️ Proje sahibi "Bilgi iste" başlatırsa açılır |
| Liseli ↔ Kurum (kurum başlatır) | ✅ Kademeli: kurum ilk mesaj → liseli kabul ederse devam |
| Liseli ↔ Kurum (liseli başlatır) | ⚠️ Yalnızca kurum fırsatı hakkında, fırsat detayından "Soru sor" ile |
| Kurum ↔ Kurum | ❌ Yok |

**Güvenlik kuralları:**
- Tüm <18 mesajlar moderasyon algoritmasından geçer (küfür, iletişim bilgisi sızıntısı, yetişkin içeriği).
- **İletişim bilgisi (telefon, adres, Instagram, TikTok handle, WhatsApp)** regex + LLM kontrolü ile bloklanır. Blok olan mesajda kullanıcı uyarılır.
- Her mesajda "Şikayet et" butonu.
- 2 yıllık saklama süresi. Hesap kapatma → 30 günde silinir.
- Kurum tarafı için **rate limit:** Gün başına max 50 ilk mesaj (spam engeli), aynı template 24 saat içinde 10'dan fazla gönderilemez (template detection).

### 8.9 Başarılar ve Rozetler (`/app/basarilar`)

Rozet örnekleri:
- 🚀 **İlk Proje** — ilk projesini açtı
- 🤝 **Ekip Oyuncusu** — 3 farklı projede yer aldı
- 🏆 **Fırsat Avcısı** — 5 fırsata başvurdu
- 🌟 **Mentör** — 5+ olumlu referans aldı
- 🔥 **Süreklilik** — 7 gün üst üste aktif
- 🎓 **Tamamlayıcı** — 3 projeyi tamamladı
- 🌐 **Doğrulanmış** — Partner okul öğrencisi

**Streak kuralı:** Kaybolan streak ceza hissi vermez. "2 gün kaçırdın, tekrar başlayalım mı?" samimi mikrokopyayla.

### 8.10 Diğer Sayfalar

- **Bildirimler:** Tüm bildirimler, kategori filtresi, "Hepsini okundu".
- **Okul Bağlantı:** Durumu görüntüle, bağlantıyı onayla/reddet, okul değiştir.
- **Veri İndir (KVKK portabilite):** Tüm profil, proje, mesaj, başvuru verisi JSON + PDF formatında indirilir. Ayda 1 hak.
- **Ayarlar:** Hesap (e-posta, şifre, 2FA), profil görünürlüğü, bildirim tercihleri, gizlilik, veli bilgileri (<18), dil (TR/EN), karanlık mod, hesabı arşivle/sil.

### 8.11 18 Yaşına Bastığında (v1.1 — yeni akış)

- Sistem doğum tarihini takip eder.
- 18. doğum gününden 7 gün önce: bildirim — "Yakında 18 yaşında olacaksın. Bazı kısıtlamalar kalkacak, profilinde güncelleme yapman istenecek."
- 18. doğum günü: otomatik geçiş — "Profilini güncelle: artık yetişkin hesap sahipliğindesin. Veli onayı kaldırıldı. Profil görünürlük ayarlarını tekrar gözden geçir."
- Veli bilgilendirilir: "Çocuğunuz 18 yaşına girdi, hesabı artık kendi sorumluluğundadır. Velilik onayınız arşivlenmiştir."
- Yetişkin mesaj kısıtlamaları kalkar (iletişim bilgisi bloklama hariç — bu platform politikası).

### 8.12 Hesap Silme

- Liseli "Hesabımı sil" → onay ekranı → 30 günlük geri dönüş penceresi → tam silme.
- Veli (<18 için) aynı hakka sahip, veli paneli üstünden kullanır.
- Başarı hikayesinde yer alan öğrenci silindiğinde hikaye anonimleştirilir veya kaldırılır (hikaye öncesinde verilen onaya göre).

---

## 9. Okul Paneli — Detaylı Sayfa Şartnamesi

### 9.1 Dashboard (`/okul`)

**Üst şerit — 4 KPI kartı:**
- Aktif Öğrenci (doğrulanmış)
- Bağlantı Bekleyen Öğrenci
- Açık Proje (görünür)
- Kurum Teklifleri (doğrulanmış öğrencilere)

**Zaman grafiği:** Son 30 gün aktivite trendi.

**Öne çıkanlar:**
- Haftanın öğrenci başarısı
- Haftanın projesi
- Bekleyen görevler (veli onayı, gizleme talebi, yeni eşleşme).

**Hızlı aksiyonlar:** Aylık raporu indir, öğrencilere duyuru, fırsat merkezi, proje gizleme taleplerine git.

### 9.2 Öğrenci Aktivite Paneli (`/okul/ogrenciler`)

**Tablo görünümü (sadece doğrulanmış öğrenciler):**
| Öğrenci | Sınıf | Aktif Proje | Başvuru (hassas olmayanlar) | Son Aktivite | Durum |
|---|---|---|---|---|---|

**Filtreler:** Sınıf seviyesi, aktivite düzeyi, kategori.

**Öğrenci detay yan paneli:**
- Profil özeti
- Projeleri (gizleme talebi olanlar hariç)
- Başvuruları (**hassas fırsat başvuruları görünmez**)
- Platform içi aktivite zamanı (agrega)
- **Mesaj içeriği GÖRÜNMEZ** — sadece "mesajlaşma var/yok" metriği.

**Ayrı sekme: Bağlantı Bekleyen Öğrenciler**
- Sayaç + isim listesi (sadece okul alan adıyla eşleşenler, kişisel veri minimum).
- "Hatırlatma e-postası gönder" (ayda 1 hak).

### 9.3 Projeler (`/okul/projeler`)

- Okul öğrencilerinin açtığı tüm **görünür** projeler.
- Filtreler: sınıf, kategori, durum.
- **Bir projeye tıklandığında:** proje detay sayfası (sadece okuma).
- Paylaş: "Okul sosyal medyamızda paylaş" için görsel üretici.

### 9.4 Gizleme Talepleri (`/okul/projeler/gizleme-talepleri`)

**v1.1 — yeni sayfa.** Karar #5 gereği.

**Akış:**
1. Öğrenci projesini açarken veya sonradan "Okulumdan gizle" talebi gönderir + opsiyonel gerekçe.
2. Okul panelinde bu talep belirir.
3. Okul temsilcisi inceler:
   - **Onay:** Proje okul panelinde ve raporlarda görünmez olur. Öğrenciye bildirim.
   - **Red:** Proje görünür kalır. Öğrenciye gerekçeli bildirim. (Sınırı: okul keyfi ret yapamaz; 3 ret sonrasında LiseUP admin uyarılır, politika incelemesi açılır.)
4. **SLA:** Okul 14 gün içinde yanıt vermezse sistem otomatik onay verir (öğrenci lehine default).

**Hassas fırsat başvuruları:** Bu akışa girmez. Admin tarafında "hassas" flag alan fırsatların başvuruları zaten okul paneline **hiç gelmez.** Öğrencinin gizleme talebi yapmasına gerek yoktur.

### 9.5 Fırsat Merkezi (`/okul/firsat-merkezi`)

- Türkiye genelinde lise seviyesinde açılan tüm **hassas olmayan** fırsatların özet görünümü.
- Kategori filtresi, "Öğrencilerime duyur" butonu, haftalık özet e-postası.

### 9.6 Başarı Vitrini (`/okul/basari-vitrini`)

- Okul öğrencilerinin elde ettiği başarılar.
- Paylaşılabilir kart görselleri (Instagram / LinkedIn formatında).
- Iframe embed kodu okul web sitesi için.
- **Her başarı için öğrenci onayı zorunludur** — onay vermeyen öğrenci burada görünmez.

### 9.7 Raporlar

**Aylık Rapor (`/okul/raporlar/aylik`):**
- Her ayın 1'inde otomatik üretilir.
- PDF + interaktif dashboard.
- İçerik: Özet KPI, öğrenci katılım dağılımı, aktif proje analizi, öne çıkan 5 hikaye, kurum etkileşimi, gelecek ay aksiyonları.
- **Veri kaynağı:** Sadece doğrulanmış öğrenciler + görünür projeler + hassas olmayan başvurular.

**Dönem Sonu Etki Raporu (`/okul/raporlar/donem-sonu`):**
- Veli sunumuna uygun PDF + PowerPoint export.
- Yıllık karşılaştırma, başarı hikayeleri detay, velilere özet sayfa.
- Admin onayından geçer (okul ve LiseUP branding kontrolü için).

### 9.8 Partner Ayrıcalıklar, Temsilci Yönetimi, Ayarlar

- **Partner Ayrıcalıklar:** Anlaşma özeti, kullanılan özellikler, Success Manager iletişim kanalı.
- **Temsilci Yönetimi:**
  - Ana temsilci + ek kullanıcılar (rehber öğretmen, müdür yardımcısı, müdür).
  - Rol: **Yönetici** (tüm yetki) / **Görüntüleyen** (sadece okuma).
  - **Offboarding akışı (v1.1):** Öğretmen ayrıldığında ana temsilci yetkisini çeker, hesap arşive alınır. Belge için "sorumluluk devri" tutanağı PDF üretilir.
- **Ayarlar:** Okul profili, logo, marka renkleri, bildirim tercihleri, veri silme talebi.

### 9.9 Partner Okul Marka Kullanım Politikası (v1.2 — yeni)

Bu bölüm LiseUP ile okul arasındaki iki yönlü logo ve isim kullanım kurallarını belirler. Partnerlik protokolünün eki olarak imzalanır ve her iki tarafı bağlar.

#### 9.9.1 Pilot Okul → Partner Okul Geçişi

| Dönem | Etiket | Süre |
|---|---|---|
| Eylül 2026 – Ocak 2027 | **"Pilot Okul"** | Pilot dönemi boyunca |
| Şubat 2027+ | **"Partner Okul"** | Pilot sonrası resmi partnerlik |

"Pilot Okul" etiketi iki tarafa da avantaj sağlar: LiseUP için "deneme aşaması" şeffaflığı, okul için "öncü katılımcı" itibarı. Pilot sonrası değerlendirmede tarafların partnerliğe devam kararı ile etiket otomatik "Partner Okul"a dönüşür.

#### 9.9.2 LiseUP'un Okul Logosu/Adı Kullanım Hakkı

Okul, partnerlik protokolü imzalanmasıyla aşağıdaki alanlarda LiseUP'a logo ve isim kullanım izni verir:

- ✅ **LiseUP web sitesi:** Ana sayfa partner şeridi, `/okullar` sayfası, `/basari-hikayeleri` ilgili hikayeler.
- ✅ **LiseUP sosyal medya:** Tanıtım içerikleri, başarı hikayesi paylaşımları, genel duyurular (LinkedIn, Instagram, X, YouTube).
- ✅ **LiseUP kurumsal sunumları:** Yatırımcılara, kurumlara, basına yapılan sunumlarda "partner okullarımız" bağlamında.
- ✅ **LiseUP basın bültenleri:** Haber değeri taşıyan içeriklerde okul adı geçebilir.
- ✅ **LiseUP newsletter ve e-posta iletişim materyalleri.**

#### 9.9.3 Ücretli Reklam İstisnası (önemli)

**Ücretli reklam materyallerinde** okul logosu veya adı kullanımı genel partnerlik iznine dahil değildir. Bu kapsama şunlar girer:

- Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads
- Outdoor reklam (billboard, ulaşım, bina)
- TV, radyo, gazete reklamları
- Sponsorlu içerik ve sponsored post'lar

Her ücretli reklam kampanyası için LiseUP **ayrıca yazılı izin** talebinde bulunur. Okul bu talebi reddedebilir; ret halinde reklamda logo/ad kullanılmaz.

#### 9.9.4 Okulun LiseUP Logosu/Adı Kullanım Hakkı

Okul, kendi kanallarında LiseUP'ı tanıtabilir:

- ✅ **Okul web sitesi:** Kariyer, rehberlik, aktiviteler sayfalarında.
- ✅ **Okul sosyal medya:** Öğrenci aktiviteleri, proje tanıtımları, başarı paylaşımları.
- ✅ **Veli sunumları ve bültenler:** LiseUP aktivite raporları, yıllık değerlendirmeler.
- ✅ **Okul tanıtım günleri:** LiseUP'ın okul tarafındaki değerini aktarma.

**Kullanım dili kuralı:** Okul LiseUP'tan **"partner platform"** veya **"iş birliği yaptığımız platform"** olarak bahseder. "Müşteri olduğumuz", "hizmet aldığımız", "abone olduğumuz" ifadeleri **kullanılmaz**. Bu dil kuralı, hem LiseUP'un dernek kimliğini hem de okul-platform arasındaki eşit partnerlik algısını korur.

#### 9.9.5 İptal Politikası

Okul partnerliği sonlandırma hakkına her zaman sahiptir. İptal sonrası:

- **LiseUP tarafı:** 30 gün içinde tüm aktif materyallerinden (web sitesi, sosyal medya profilleri, kurumsal sunumlar) okul logosu ve adını kaldırır.
- **Arşivlenmiş içerik:** Geçmişte yapılmış sosyal medya postları gibi arşiv içeriğinde "makul gayret" ilkesi uygulanır — pratik olarak tümünü silmek mümkün değildir ama LiseUP eski postları gizleme veya güncelleme konusunda iyi niyetle hareket eder.
- **Okul tarafı:** 30 gün içinde kendi materyallerinden LiseUP logosunu ve partnerlik referanslarını kaldırma taahhüdünde bulunur.
- **Aktif başarı hikayeleri:** Okul öğrencilerinin platformda yayımlanmış hikayeleri, öğrencinin bireysel onayı devam ettiği sürece yayında kalır. Okul logosu ise hikayeden çıkarılır.

#### 9.9.6 İzin Metni ve Saklama

Marka kullanım politikası partnerlik protokolünün **Ek-A** bölümü olarak imzalanır. Her iki tarafın yetkilileri tarafından ıslak imzalı veya dijital (e-imza) olarak kayıt altına alınır. LiseUP admin panelinde tüm protokol PDF'leri arşivlenir (bkz Bölüm 11.3 Okul Yönetimi).

---

## 10. Kurum Paneli — Detaylı Sayfa Şartnamesi

### 10.1 Dashboard (`/kurum`)

- KPI şeridi: Yayındaki Fırsat, Alınan Başvuru, Kaydettiğim Profil, Aktif Mesajlaşma.
- Abonelik durumu (Discover / Engage / Partner), kullanılan kota.
- Öneri bölümleri: Aradığınız profile uyan yeni liseliler, öne çıkan projeler, benzer kurumların takip ettikleri.

### 10.2 Yetenek Keşfet (`/kurum/kesfet/liseliler`)

**Filtreler:**
- Yetenekler (multi-select)
- İlgi alanı
- Sınıf seviyesi (9-12)
- Şehir (default: İst/Ank/İzm)
- Okul (opsiyonel)
- **Doğrulama durumu:** Bağımsız / Doğrulanmış (Partner Okul) filtresi
- Portfolyo var mı?
- Aktif proje var mı?

**Liste:** Profil kartları — foto (sadece öğrenci açıkça izin verirse, aksi halde avatar), **ad** (soyad gizli), yetenekler, okul (doğrulanmışsa logolu), kısa bio. **Yaş ve doğum tarihi asla görünmez.**

**Aksiyonlar:** Kaydet, Mesaj gönder (kota kontrolü).

### 10.3 Proje Keşfet (`/kurum/kesfet/projeler`)

Filtreler: kategori, şehir, ekip boyutu, tamamlanma aşaması, doğrulanmış okul öğrencileri içeriyor mu.

### 10.4 Fırsat Yayınlama (`/kurum/firsat-yayinla`)

Step-by-step form:
1. Fırsat türü (Yarışma / Program / Staj / Burs / Etkinlik)
2. Başlık, açıklama, ödüller, kriterler
3. Takvim
4. Hedef kitle (sınıf seviyesi, şehir)
5. Başvuru yöntemi: LiseUP dahili form / dış link
6. Medya: kapak, logo
7. **Kurum kendi kendine "hassas" etiketi atayamaz.** LiseUP moderasyonu inceler, hassas görürse etiketler.
8. Önizle & Yayınla (moderasyon — Bölüm 12).

### 10.5 Başvurular, Mesajlar, Profil, Analitik, Abonelik

- **Başvurular:** Liste + filtre + toplu işlemler.
- **Mesajlar:** Bölüm 8.8 kuralları.
- **Kurum Profili:** Hakkında, logo, sektör, web sitesi, aktif fırsatlar, başarı hikayeleri. (v1.0'daki "platformda geçirilen süre" public metriği kaldırıldı — iç metrik olarak kalır.)
- **Analitik:** Profil görüntüleme, fırsat başvuru oranları, mesaj yanıt oranları, kaydedilen profil heatmap.
- **Abonelik:** Katman görünür, yükseltme, fatura geçmişi.

---

## 11. Admin Paneli ve Roller

### 11.1 8 Rollü Yetki Yapısı

| Rol | Yetki | Uygun pozisyon |
|---|---|---|
| **Super Admin** | Tüm yetki (kullanıcı silme, sistem ayarları, rol atama, finansal panel) | 4 kurucu (Çağan, Furkan, Mete, Mehmet) |
| **Teknik Admin** | Sistem ayarları, feature flags, bakım modu, hata izleme, veritabanı bakım | Teknik ekip alt üyeleri |
| **İçerik Moderatörü** | Proje/mesaj/profil onayı, şikayet yönetimi, risk skoru ince ayar | 2-3 kişi (7/24 vardiya) |
| **Okul Success** | Okul CRM, pilot yönetimi, rapor hazırlama, feedback görüşmeleri, öğrenci eşleştirme onayı | Operasyon ekibi |
| **Kurum Success** | Kurum onayı, fırsat moderasyonu, hassas flag atama, kurum desteği | Operasyon ekibi |
| **İçerik Editörü** | Blog yayını, başarı hikayesi hazırlama, sosyal medya paneli | Medya ekibi (Mehmet takımı) |
| **Destek** | Kullanıcı destek ticket'ları, SSS güncelleme | Destek ekibi |
| **Analist** | Sadece okuma — dashboard, metrik, rapor | Ürün/strateji ekibi |

### 11.2 İzin Matrisi (Özet)

| Modül | Super | Teknik | İçerik Mod | Okul Success | Kurum Success | İçerik Ed. | Destek | Analist |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Kullanıcı silme | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Rol atama | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Sistem ayarları | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Proje moderasyon | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Şikayet yönetimi | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Okul pilot açma | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Okul eşleştirme | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Okul raporları onay | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Kurum onay | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Hassas fırsat flag | ✓ | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Blog yayın | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Başarı hikayesi | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ |
| Destek ticket | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Analitik dashboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Finansal panel | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

### 11.3 Ana Modüller

- **Kullanıcı Yönetimi:** Liseli/okul/kurum kullanıcı listesi, askıya alma, hesap silme, veli onay durumları, veri escrow tablosu.
- **Okul Yönetimi:** Pilot başvuruları kuyruğu, aktif okullar, CRM notları, protokol PDF arşivi.
- **Kurum Onay Kuyruğu:** Bekleyen kurum kayıtları, doğrulama checklist.
- **Moderasyon:** Risk skoru dashboard'u, bekleyen projeler, şikayet edilen içerikler, auto-flag edilen mesajlar.
- **Fırsat Yönetimi:** Kurumlardan gelen fırsatların moderasyonu, hassas flag atama, öne çıkarma.
- **Eşleştirme (Retroaktif):** Yeni partner okul → bağımsız liseliler eşleşme paneli.
- **Raporlar:** Okullar için üretilen raporların önizlemesi, onaylaması, yayınlaması.
- **Sistem:** Özellik bayrakları (feature flags), bakım modu, e-posta şablonları, bildirim şablonları.
- **Roller:** Rol atama, izin matrisi ince ayar.

---

## 12. Moderasyon Sistemi (v1.1 — yeni bölüm)

### 12.1 Risk Skorlu Proje Moderasyonu

Her yeni proje yayın öncesi otomatik risk skoru alır (0-100).

**Skor bileşenleri:**
- Dil analizi: Küfür, nefret söylemi, cinsel içerik (ağırlık: 40)
- Görsel analizi: Uygunsuz görsel, kopya logo (ağırlık: 25)
- Meta analizi: Kullanıcı hesap yaşı, geçmiş moderasyon olayları (ağırlık: 15)
- İçerik uyum: Lise seviyesine uygun mu, yasal risk (ağırlık: 20)

**Eşikler:**
- **0-30 (Düşük):** Anında yayın. Post-hoc şikayet akışına tabi.
- **31-60 (Orta):** Anında yayın + öncelikli incele etiketi (moderatör 24 saat içinde göz atar).
- **61-100 (Yüksek):** Manuel onay kuyruğu (SLA: 4 saat gündüz, sabah 09:00'a ötelenir gece).

**3 Fazlı Kalibrasyon Planı (v1.2 — netleşti):**

Başlangıç eşikleri tahmini. Gerçek kalibrasyon gerçek platform verisiyle aşamalı olarak yapılır.

**Faz 1 — Çift Gözlü Doğrulama (Eylül–Ekim 2026):**
- Pilot dönemin ilk 50 projesi **hem otomatik skor hem manuel moderatör** tarafından incelenir.
- Eşik pilot sıkı ayarıyla başlar: 0-20 (düşük) / 21-50 (orta) / 51-100 (yüksek).
- Her proje için "risk skoru" ve "insan kararı" kayıt altına alınır.
- Amaç: modelin hangi durumlarda yanlış sınıflandırdığını tespit etmek.

**Faz 2 — İnce Ayar (Kasım–Aralık 2026):**
- Faz 1 verisi analiz edilir.
- Eşikler veri doğruluğuna göre kaydırılır, skor bileşen ağırlıkları güncellenir.
- Hedef: **%95 otomatik-insan kararı uyumu.**
- Bu fazda hâlâ tüm yüksek risk projeler manuel incelemede.

**Faz 3 — Sürdürülebilir Mod (Ocak 2027+):**
- Sadece yüksek risk skoru (>70) manuel kuyruğa düşer.
- Orta ve düşük risk auto-publish, post-hoc şikayet akışına güvenir.
- Model her 3 ayda bir yeniden kalibre edilir (yeni veri + değişen kullanıcı davranışı için).

Bu faz planı sürdürülebilir moderasyon yükü için kritik. Faz 1 atlanırsa model güvenilirliği olmaz; direkt Faz 3'e geçmek güvenlik riskidir.

### 12.2 Mesaj Moderasyonu

- Liseli (<18) içeren tüm mesajlaşma real-time moderasyondan geçer.
- İletişim bilgisi sızıntısı: regex (telefon, e-posta) + LLM kontrolü (örn. "benim igim @deniz_16", "Dicord sunucum..." gibi maskeli versiyonlar).
- Cinsel içerik, yetişkin dili, nefret söylemi LLM flagler.
- Flag olan mesaj: gönderilmeden önce kullanıcıya uyarı, gönderilirse mesaj gizli + moderatör incelemesi (SLA: 2 saat).
- İkinci ihlal: 24 saat mesaj kısıtlaması. Üçüncü: hesap askıya alma + velilere bildirim.

### 12.3 Hassas Fırsat Yönetimi

- Kurumdan gelen her fırsat admin moderasyon kuyruğuna düşer.
- İçerik Moderatörü veya Kurum Success rolü "hassas" flag'i atayabilir.
- Hassas kategoriler (öneri liste, genişletilebilir):
  - Siyasi gençlik kolları
  - Din/inanç temelli programlar
  - LGBTQ+ odaklı programlar
  - Ruh sağlığı programları
  - Cinsiyet/şiddet/travma içerikli araştırmalar
- Hassas flag etkisi:
  - Fırsat liseli panelinde görünür (erişim kısıtlanmaz).
  - Başvuru okul panelinde görünmez.
  - Başvuru verisi ayrı şifrelenmiş tabloda tutulur.
  - Rapor istatistiklerinde agrega olarak bile yer almaz.

### 12.4 Şikayet Akışı

- Her içerikte "Şikayet et" butonu.
- Şikayet kategorileri: Spam, taciz, sahte profil, uygunsuz içerik, telif ihlali, diğer.
- SLA: 4 saat (yüksek öncelik kategoriler), 24 saat (diğerleri).
- Şikayet eden kullanıcıya karar bildirilir (gizlilik esasına uygun).

---

## 13. Mesajlaşma ve Etkileşim Kuralları (v1.1 — yeni)

Bölüm 8.8'deki tablonun gerekçeleri:

- **Liseli ↔ Liseli genel DM kapalı:** Güvenlik sebebiyle. Ekip kurma bağlamında "projeye çağır" ve "başvur" yeterli.
- **Ekip sohbeti:** Proje kabul sonrası otomatik açılır. Grup sohbeti formatında, proje sahibi yönetir.
- **Liseli → Kurum (fırsat soru):** Fırsat detay sayfasından "Soru sor" butonu. Tek seferlik soru kanalı; kurum yanıtlar, kapanır. Başvuru süresince max 2 soru hakkı.
- **Kurum → Liseli:** Kademeli. İlk mesaj "bekleyen istek" klasörüne düşer. Liseli kabul ederse açılır. 14 gün içinde kabul edilmezse otomatik silinir.
- **Yetişkin liseliler (≥18):** İletişim bilgisi bloklama dışında kısıtlamalar kalkar. Ancak platform bağlamı dışı DM yine açılmaz (ürün politikası).

### 13.1 Ekip Sohbeti Özellikleri

- Grup metin, dosya (max 10MB), link önizleme.
- Proje sahibi "sessize al", "üye çıkart", "sohbet arşivle" yetkili.
- Proje tamamlandığında sohbet 90 gün daha aktif, sonra arşive (okunabilir, yazılamaz).

---

## 14. Şehir Stratejisi ve Öneri Algoritması (v1.1 — yeni)

### 14.1 3 Şehir Odaklı Başlangıç

**İstanbul + Ankara + İzmir** stratejik sebepleri:
- Yüksek lise öğrenci yoğunluğu
- Girişimcilik ekosisteminin merkezi
- Pilot okul erişilebilirliği
- Medya görünürlüğü için önemli
- Kurum havuzu bu şehirlerde

### 14.2 Şehir Alanı Zorunluluğu

- Liseli profili: şehir zorunlu.
- Proje: şehir veya "Online" / "Hibrit" zorunlu.
- Fırsat: şehir veya "Online" zorunlu.
- Kurum: HQ şehri zorunlu.

### 14.3 Öneri Algoritması

**Liseli için proje önerisi (ağırlıklar):**
- İlgi alanı örtüşmesi: 40%
- Şehir/online uygunluğu: 25% (aynı şehir: +25, hibrit: +15, online: +10, farklı şehir: 0)
- Yetenek örtüşmesi (aranan rol ↔ liseli yetenekleri): 20%
- Doğrulanmış okul bonusu: +%10 eğer proje sahibi aynı okuldan ise
- Yenilik: 5% (yeni projeler hafif bonus)

**Fırsat önerisi:**
- Sınıf seviyesi uygunluğu: 35%
- Kategori/ilgi alanı: 30%
- Son başvuru yakınlığı: 20%
- Şehir: 15%

**Kurum için yetenek önerisi:**
- Aranan yetenek örtüşmesi: 45%
- Doğrulanmış öğrenci: +%15
- Portfolyo var mı: +%10
- Aktif proje var mı: +%10
- Şehir: 15%
- Yenilik (son 30 gün aktif): 5%

### 14.4 Genişleme Planı

- Q1 2027: Bursa, Antalya, Kocaeli eklenir (3 şehir → 6).
- Q3 2027: Eskişehir, Kayseri, Adana, Gaziantep (6 → 10).
- 2028: Tüm Türkiye + yurt dışı Türk liselileri modülü.

---

## 15. UX Prensipleri ve Tasarım Sistemi

### 15.1 Temel Prensipler

1. **Mobile-first.** Liseliler %80+ mobil. Hiçbir kritik akış mobilde ikinci sınıf olamaz.
2. **3 tık kuralı.** Ana sayfadan kritik aksiyona max 3 tıkla.
3. **Uzun forma hayır.** Kayıt adımları dengelidir; her adımda 3-4 alan.
4. **Kaynak şeffaflığı.** "Neden bu öneri?" ikonu öneri kartlarında.
5. **Güven işaretçileri her yerde.** Doğrulanmış kurum, partner okul rozeti, moderasyondan geçmiş etiketi.
6. **Gamification dozunda.** Rozet ve streak motivasyon için; ceza hissi yok.
7. **Dil: Türkçe-birinci.** EN opsiyonel. Gen Z samimi dil — cringe değil.
8. **Karanlık mod.** `prefers-color-scheme` default, ayarlardan override.

### 15.2 Marka Kimliği

**Renkler:**
- **Primary:** `#3871DF` (elektrik mavisi) — tüm CTA, marka öğeleri, heading vurguları.
- **Beyaz:** `#FFFFFF` — ana zemin, primary üstü metin.
- **Neutrals (Slate ölçeği):** `#0F172A`, `#1E293B`, `#334155`, `#64748B`, `#94A3B8`, `#CBD5E1`, `#E2E8F0`, `#F1F5F9`, `#F8FAFC` — metin, arka plan, çizgiler.
- **Semantic (sadece fonksiyonel, marka değil):**
  - Success: `#16A34A`
  - Warning: `#F59E0B`
  - Error: `#DC2626`
  - Info: `#3B82F6`

**Felsefe:** Monokromatik mavi + beyaz + gri. Aksan rengi yok. Bu sadelik markayı "ciddi, güvenilir, modern" hissettirir — lise öğrenci platformlarının çoğu şeker renkleriyle çocuksu görünürken LiseUP profesyonel durur.

**Tipografi:** *(Marketing redesign W1 — kilitlenmiş stack)*
- **Display:** `Livvic` (Black: 900, Bold: 700, SemiBold: 600, Medium: 500) — hero ve section heading
- **Body:** `Inter` (Regular: 400, Medium: 500, SemiBold: 600, Bold: 700) — Pro/Studio aesthetic, de-facto B2B SaaS body face
- **Mono:** `JetBrains Mono` (Regular: 400, Medium: 500) — eyebrow label, metadata, kod blokları

> **Karar notu (W1):** Önceki PRD versiyonu `Garet` (paid Indian Type Foundry license) önerirdi. Marketing redesign brainstorming sonucunda Pro/Studio aesthetic için `Inter` seçildi: `next/font/google` ile zero-cost yüklenir, Latin Extended subseti Türkçe karakterleri (`İ ı ğ ş ç ö ü`) temiz render eder, OpenType özellikleri (tabular nums, alternates) Engage tier analitik yüzeylerinde işe yarar.

**Ölçek (Modular hybrid — display 1.250 Major Third):**
- Display: 80 / 100 / 128 (mobile / desktop / xl) — Livvic 900
- Hero secondary: 50 / 64 — Livvic 700
- Section heading: 32 / 40 — Livvic 700
- Sub-heading: 25 — Livvic 700
- Lede / large body: 20 — Inter 400/500
- Body: 16 — Inter 400 — line-height 1.55
- Small body: 14 — Inter 400 — line-height 1.5
- Caption / metadata: 12 — JetBrains Mono 500 uppercase, letter-spacing 0.12em

**Satır Yüksekliği:** Display 0.92–1.05, Heading 1.1–1.2, Body 1.45–1.55.

**Letter-spacing:** Display `-0.025em`, Heading `-0.02em`, Body `0`, Mono labels `0.12em`.

### 15.3 Komponent Kütüphanesi

shadcn/ui üzerine kurulu, özel varyantlarla:
- Button (primary / secondary / ghost / destructive / icon)
- Input, Textarea, Select, Combobox, Datepicker
- Card (proje kartı, liseli kartı, fırsat kartı özel varyantlar)
- Dialog, Sheet (mobilde drawer), Popover, Tooltip
- Tabs, Accordion
- Toast, Alert
- Badge (yetenek, durum, rozet, doğrulama)
- Progress, Skeleton
- DataTable
- Command (⌘K hızlı arama)

### 15.4 Mikrokopy Kuralları

- "Profil" değil "Profilim" (sahiplenme)
- "Mesaj gönder" değil "Konuşmaya başla" (düşük sürtünme)
- Hata mesajları insani: "E-posta adresi geçersiz görünüyor"
- Boş durumlar illüstrasyonlu + aksiyonlu: "Henüz bir projen yok. İlk adımı atalım mı?"
- Onay bekleyen durumlar: "Velin onaylarsa hemen başlayabilirsin" (pozitif çerçeve)

### 15.5 Onboarding Turu (v1.1 — yeni)

**İlk giriş sonrası 4 ekran (`/app/onboarding`):**
1. "Hoş geldin [isim]! LiseUP'ta 3 şey yapabilirsin." (ikonlu kartlar)
2. "Profilin portfolyoya dönüşür" (profil ekran demo)
3. "Ekibini burada kurarsın" (proje oluştur + başvur demo)
4. "Kurumlar seni keşfeder" (örnek mesaj preview) + "Başlayalım" CTA

Tur atlanabilir; ayarlardan tekrar açılabilir.

### 15.6 Erişilebilirlik

- Klavye ile tam gezinti
- Ekran okuyucu destekli aria-label
- Minimum tıklama alanı 44×44px
- Odak göstergesi (focus ring) her zaman görünür
- Form hataları hem renk hem metinle

### 15.7 Performans Hedefleri

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- İlk yükleme (public): < 200KB JS bundle
- Uygulama içi: code-split, lazy loading

---

## 16. Teknik Notlar

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui. SSR/ISR (SEO için kritik).
- **Backend:** Node.js/TypeScript (tRPC veya NestJS) veya Python (FastAPI). Ekip yetkinliğine göre.
- **DB:** PostgreSQL (ana) + Redis (cache, rate limit) + escrow için ayrı şifrelenmiş şema.
- **Auth:** Email + şifre + opsiyonel Google OAuth. Minor akışı özel.
- **Dosya:** S3-uyumlu depolama.
- **Arama:** Meilisearch veya Algolia.
- **Mesajlaşma:** WebSocket (Pusher, Ably veya self-hosted).
- **E-posta:** Transactional (Resend/Postmark) + Marketing (MailerLite).
- **Analitik:** Plausible (public) + PostHog (ürün).
- **Hata izleme:** Sentry.
- **CI/CD:** GitHub Actions + Vercel (frontend) + Railway/Fly.io veya AWS (backend).
- **Moderasyon:** OpenAI Moderation API + regex + custom LLM prompt (iletişim bilgisi sızıntısı için).
- **Dil:** i18n başlangıçtan next-intl ile.
- **PDF Üretim:** Raporlar için Puppeteer + HTML şablonlar.
- **PPTX Export:** Dönem sonu raporu için pptxgenjs.

---

## 17. Güvenlik, KVKK ve Yasal Yükümlülükler

### 17.1 KVKK Uyumu

- 18 yaş altı için **açık veli onayı** (KVKK md. 5).
- **Veri escrow:** Onay gelmeden veri profile taşınmaz, şifreli ayrı tabloda tutulur.
- **Veri minimizasyonu:** Sadece gerekli veri toplanır.
- **Silme hakkı:** 30 gün içinde tüm kişisel veri silinir.
- **Veri taşıma hakkı (v1.1 — yeni):** JSON + PDF formatında tüm kişisel veri indirilebilir (`/app/veri-indir`).
- **VERBİS kaydı:** Dernek ve iktisadi işletme ayrı ayrı kaydedilir (Temmuz-Ağustos 2026).

### 17.2 İçerik Güvenliği

- User-generated content moderasyondan geçer.
- Liseli ↔ Kurum mesajlaşma: kademeli, moderasyonlu (Bölüm 8.8).
- Liseli profilinde soyad, e-posta, telefon, adres kurumlara görünmez.
- İletişim bilgisi sızıntısı regex + LLM ile engellenir.

### 17.3 Yaş Doğrulama Sınırlılıkları (v1.1 — şeffaflık)

- Doğum tarihi kullanıcı beyanına dayanır. Tam doğrulama teknik olarak mümkün değil.
- Mitigasyon: okul e-posta doğrulaması (bilinen alan adları), okul temsilcisi cross-check (partner okul), şüpheli hesap flag'i (meta analiz).
- **Known limitation olarak KVKK metninde açıkça belirtilir.**

### 17.4 Moderasyon SLA'ları

- Düşük riskli proje: anında
- Orta riskli proje: 24 saat pasif gözden geçirme
- Yüksek riskli proje: 4 saat (gündüz)
- Şikayet edilen içerik (yüksek öncelik): 4 saat
- Flag edilen mesaj: 2 saat
- Kurum başvuru onayı: 48 saat
- Proje gizleme talebi (okul): 14 gün (aşılırsa otomatik onay)
- Bekleyen veli onayı: 72 saat (aşılırsa otomatik silme)

### 17.5 Veri Saklama

- Aktif hesap verisi: sınırsız (kullanıcı silene kadar)
- Mesajlar: 2 yıl
- Moderasyon kararları: 5 yıl (yasal gereklilik)
- Silinmiş hesap verisi: 30 günlük geri dönüş penceresi + full silme
- Yedekler: 90 gün rotasyon

---

## 18. Başarı Metrikleri ve Analitik

### 18.1 North Star Metrik

**"Aylık Aktif Liseli-Kurum Bağlantısı"** — bir liselinin kurum tarafından mesajlandığı veya fırsatına başvurduğu aylık olay sayısı.

### 18.2 Takip Edilecek Metrikler

| Kategori | Metrik |
|---|---|
| Edinim | Haftalık yeni kayıt (liseli/okul/kurum) |
| Aktivasyon | Kayıt → profil %80 dolum süresi, veli onay tamamlanma oranı |
| Katılım | DAU/MAU, haftalık proje oluşturma, haftalık başvuru |
| Tutundurma | W1, W4, W12 retention |
| Ekosistem | Eşleşen ekip sayısı, gönderilen mesaj, yapılan başvuru |
| Okul değeri | Pilot → partner dönüşüm oranı, aylık rapor açılma oranı, gizleme talebi oranı |
| Kurum değeri | Engage katman dönüşüm oranı, mesaj yanıt oranı, fırsat başvuru sayısı |
| Güvenlik | Şikayet oranı, moderasyon SLA uyumu, hassas flag doğruluğu |
| Şehir | Şehir bazlı kayıt dağılımı (İst/Ank/İzm hedef: %70+) |

### 18.3 Pilot Dönemi Başarı Kriterleri (Eylül 2026 - Ocak 2027)

- 1-2 pilot okul %100 partnerlik dönüşümü hedefi
- Pilot okulda öğrenci aktivasyonu: %60+ kayıt oranı
- Ortalama aylık aktif liseli: pilot okul başına 40+
- Kurum sayısı: 20+ onaylı kurum
- Proje sayısı: 50+ aktif proje
- Moderasyon olayı: <%5 flag oranı

---

## 19. Yol Haritası

### 19.1 MVP (Mayıs–Ağustos 2026 — Pilot öncesi)

- Public sayfalar
- Kayıt akışları (liseli + veli escrow + okul davet + kurum)
- Liseli paneli: Profil, Proje, Keşfet, Fırsat, Mesaj (temel), Bildirim, Başvuru
- Okul paneli: Dashboard, Aktivite, Aylık rapor (PDF)
- Kurum paneli: Keşfet, Mesaj, Fırsat yayın
- Admin: 8 rollü yetki + temel moderasyon + kurum onay + okul eşleştirme
- Risk skorlu proje moderasyonu (ilk versiyon, sıkı eşik)
- Mobil responsive
- **Dernek kuruluşu (Mayıs-Haziran) + İktisadi işletme (Temmuz)**

### 19.2 v1.0 (Eylül 2026 — Pilot başlangıcı)

- Dönem sonu etki raporu (PDF + PPTX)
- Gamification (rozetler, streak)
- Başarı hikayeleri public
- Blog
- Proje tamamlama akışı (retrospektif, sertifika)
- Proje gizleme talebi sistemi
- Hassas fırsat flag mekanizması
- 18 yaş geçiş akışı

### 19.3 v1.5 (Ocak 2027 — Pilot değerlendirme sonrası)

- Multi-tenant okul markalama (subdomain)
- Kurumsal analitik paneli
- Haftalık dijest e-postaları
- Referans sistemi
- Kurum pricing aktive (Engage abonelik)
- 3 şehir → 6 şehir genişleme (Bursa, Antalya, Kocaeli)

### 19.4 v2.0 (2027 Q3-Q4 — Ölçeklenme)

- Mobil uygulama (React Native)
- Video profil / video pitch
- API ve kurum entegrasyonları
- Okul-kurum sponsorluk eşleştirme
- Yurt dışı Türk liselileri modülü
- Kamu yararına dernek statüsü başvurusu

---

## 20. Değişiklik Günlüğü

### 20.1 v1.1 → v1.2 Değişiklikleri

| # | Bölüm | Değişiklik |
|---|---|---|
| 1 | Bölüm 6.8 (yeni) | Başarı Hikayeleri editoryal politikası kendi alt bölümüne taşındı: olay bazlı yayın kriteri (major başarı tanımı), 5 adımlı editoryal akış, anonim hikaye seçeneği, "beni kaldır" hakkı SLA'sı, pilot öncesi 3 aylık içerik stratejisi (Haz-Tem-Ağu 2026 tablolu plan) |
| 2 | Bölüm 12.1 | Risk skoru kalibrasyonu **3 fazlı plan** olarak netleşti: Faz 1 (Eyl-Eki 2026 çift gözlü doğrulama) → Faz 2 (Kas-Ara 2026 ince ayar, %95 doğruluk hedefi) → Faz 3 (Oca 2027+ sürdürülebilir mod) |
| 3 | Bölüm 9.9 (yeni) | **Partner Okul Marka Kullanım Politikası** eklendi: Pilot Okul → Partner Okul etiket geçişi, iki yönlü logo kullanım hakları, ücretli reklam istisnası (ayrı yazılı izin), kullanım dili kuralı ("partner platform", "müşteri" değil), iptal politikası ve 30 günlük temizleme taahhüdü |
| 4 | Bölüm 20.3 | Kalan açık sorular 5'ten 2'ye indi: #3 (başarı hikayesi editoryal), #4 (risk eşikleri kalibrasyon), #5 (logo kullanım sınırları) kapatıldı ve ana dokümana entegre edildi |

### 20.2 v1.0 → v1.1 Değişiklikleri

#### Kritik Düzeltmeler

| # | Alan | v1.0 Sorunu | v1.1 Çözümü |
|---|---|---|---|
| 1 | Okul-Liseli bağlantı | Model tanımsızdı | 3 durumlu hibrit model (Bölüm 4), retroaktif eşleşme akışı |
| 2 | Profil görünürlük | "Sadece kurumlara açık" varsayılanı liseli-liseli ekip kurmayı engelliyordu | 4 ayrı toggle (Bölüm 8.2), liseliler arası default açık |
| 3 | `/kayit/okul` | Public rota olarak listelenmiş ama self-servis kayıt yok | Rota kaldırıldı, `/pilot-basvuru` eklendi |
| 4 | Veli onayı öncesi veri | Liseli profili veli onayı gelmeden aktif kullanabiliyordu | Veri escrow mimarisi, 72 saat otomatik silme (Bölüm 7.1) |
| 5 | Yasal yapı | "Non-profit" muğlak | Dernek + iktisadi işletme yapısı netleşti (Bölüm 2) |
| 6 | Proje moderasyon | <24 saat SLA momentum öldürücüydü | Risk skorlu auto-publish + post-hoc review (Bölüm 12.1) |
| 7 | Liseli-Liseli DM | Belirsiz güvenlik açığı | Kademeli model: DM sadece proje bağlamında (Bölüm 13) |
| 8 | Liseli → Kurum iletişim | Yön kuralları yoktu | Fırsat bazlı "Soru sor" kanalı, max 2/başvuru |
| 9 | Dış link fırsat başvuru | Otomatik takip tanımsız | Manuel "Başvurdum" butonu + hatırlatma (Bölüm 8.7) |
| 10 | Proje öneri algoritması şehir | Proje şehri zorunlu alan değildi | Lokasyon alanı zorunlu (Bölüm 8.3, 14.2) |

#### Yeni Eklenen Bölümler

- Bölüm 2 (Yasal Yapı ve Kurumsal Kimlik)
- Bölüm 4 (Okul-Liseli Bağlantı Modeli)
- Bölüm 12 (Moderasyon Sistemi detaylı)
- Bölüm 13 (Mesajlaşma ve Etkileşim Kuralları)
- Bölüm 14 (Şehir Stratejisi ve Öneri Algoritması)
- 18 yaşına basma akışı (Bölüm 8.11)
- Proje tamamlama akışı + retrospektif (Bölüm 8.3)
- Proje başvuru detay akışı (Bölüm 8.4)
- Okul gizleme talepleri sistemi (Bölüm 9.4)
- KVKK veri portabilitesi (Bölüm 8.10, 17.1)
- Yaş doğrulama sınırlılıkları şeffaflığı (Bölüm 17.3)
- Onboarding turu (Bölüm 15.5)
- 8 rollü admin yetki matrisi (Bölüm 11)
- Kurum rate limit + spam engeli (Bölüm 8.8)
- Okul temsilcisi offboarding (Bölüm 9.8)
- 404/500 özel sayfa tanımı (Bölüm 5)

#### v1.0'daki "Açık Sorular"ın Çözümü (v1.1'de)

- Marka renkleri → `#3871DF` + beyaz + Livvic/Inter (Bölüm 15.2 — W1 marketing redesign'da Garet → Inter geçişi)
- Kurum pricing → Discover/Engage/Partner modeli (Bölüm 2.5)
- Veli onayı hukuki format → KVKK açık rıza yeterli, dijital beyan (Bölüm 7.1)
- Mesaj saklama süresi → 2 yıl (Bölüm 17.5)
- Okul raporunda öğrenci bilgi seviyesi → kimlik bazlı + öğrenci opt-out + hassas fırsat filtresi (Bölüm 9, 12.3)
- İlk pilot okul sayısı → 1-2 (Bölüm 19.1)
- Proje yayın moderasyonu → risk skorlu hibrit (Bölüm 12.1)

### 20.3 Kalan Açık Sorular (v1.3 için)

Aşağıdaki iki soru hâlâ karara bağlı değildir; bunlar veriyle veya dış süreçlerle çözülecektir:

1. **Dernek tüzüğü içerik detayları** — *Durum: Hukuki süreç.*
   Dernek amacı, üyelik şartları, organ yapısı (Yönetim Kurulu + Denetim Kurulu kompozisyonu), aidat politikası. Nisan-Mayıs 2026'da hukuki danışmanla oturulup tüzük taslağı hazırlanacak, sonra kurucu ekip onayıyla Haziran 2026'da kuruluş başvurusu yapılacak.

2. **Engage abonelik tutarı** — *Durum: Ocak 2027 değerlendirme.*
   Kurum "Engage" katmanı aylık ücreti pilot dönemi (Eylül 2026 - Ocak 2027) verisi ile kararlaştırılacak. Pilot boyunca tüm kurumlara ücretsiz erişim. Ocak 2027'de pilot değerlendirme toplantısında kurum davranışı, mesajlaşma hacmi, kullanım derinliği verileriyle tutar belirlenecek. Referans aralıklar: 2.500 TL (hacim stratejisi) / 7.500 TL (dengeli) / 15.000 TL (premium).

---

## 21. Sonraki Adımlar

Bu PRD v1.2 ekip içi review sonrası v1.3'e evrilecektir. Bölüm sahipleri:

- **Çağan Çalışkan (Proje Yönetimi):** Bölüm 2 (Yasal yapı), Bölüm 19 (Yol haritası), pilot operasyon, Bölüm 20.3 Soru #1 (dernek tüzüğü)
- **Furkan Yılmaz (Teknik):** Bölüm 12 (Moderasyon + 3 fazlı kalibrasyon), Bölüm 16 (Teknik notlar), Bölüm 17 (KVKK teknik)
- **Mete Yazıcı (Ürün):** Bölüm 4, 8, 9, 10 (Panel şartnameleri), Bölüm 13 (Etkileşim kuralları), Bölüm 15 (UX), Bölüm 20.3 Soru #2 (Engage pricing)
- **Mehmet Efe (Marka/Medya):** Bölüm 6.8 (Başarı hikayesi editoryal), Bölüm 9.9 (Marka kullanım politikası operasyonu), Bölüm 15.2 (Marka kimliği)

**Yan dokümanlar (v1.3 ile birlikte):**
- Style Guide (tasarım token'ları, logo kullanımı, marka rehberi)
- API Contract (endpoint listesi)
- Database Schema
- Test Plan (kritik akışlar E2E)
- Content Strategy (pilot öncesi 3 aylık blog takvim detay)
- Legal Pack (dernek tüzüğü, partnerlik protokolü Ek-A marka kullanım, KVKK metinleri, kullanım koşulları)

---

*LiseUP — Liselinin ekibini, kurumun yeteneğini bulduğu platform.*
*LiseUP Derneği • info@liseup.org*
