# LiseUP Web

> Liselinin ekibini, kurumun yeteneğini bulduğu platform.

Türkiye'nin lise fırsat + ekip platformu (`liseup.org`). Next.js 16 App Router üzerine kurulu frontend. PRD: `PRD/LiseUP_Website_PRD_v1.2.md`.

---

## 🎯 Pilot Toplantı Demo Rehberi

Auth backend henüz canlıda değil — pilot okul toplantısı için **`/giris` sayfasında 4 quick-login butonu** var. Sırasıyla rolleri gösterip aynı oturumda hızla geçiş yapabilirsin.

### Demo akışı (önerilen)

| Adım | Rota | Ne göster |
|---|---|---|
| 1 | `/` | Anasayfa — 3-rol pitch, mock fırsat feed, panel switcher, kinetic hero |
| 2 | `/okullar` | Okul marketing — pilot timeline, beklentiler, örnek rapor |
| 3 | `/pilot-basvuru` | 5-step başvuru formu — toplantıda canlı doldurabilirsin |
| 4 | `/giris` | "Demo girişi" kartı — 4 rol butonu |
| 5 | "Okul olarak gir" → `/okul` | **Okul paneli demo** — KPI, sparkline, gizleme talepleri, başarı vitrini |
| 6 | `/okul/raporlar/aylik` | **Aylık rapor preview** — pilot okul için kritik göstergeyi burada gör |
| 7 | `/okul/projeler/gizleme-talepleri` | Gizleme akışı + 14-gün SLA |
| 8 | `/okul/basari-vitrini` | Embed kodu + paylaş kartları |
| 9 | `/giris` → "Liseli olarak gir" | Liseli akışı (opsiyonel — okul tarafı asıl odak) |
| 10 | `/giris` → "Kurum olarak gir" | Kurum tarafı — yetenek keşfet + fırsat yayınla |

### Demo girişi (4 rol)

`/giris` sayfası altındaki sarı kartta:

- **Liseli** → `/app` (Deniz K., 11. Sınıf, Ankara)
- **Okul** → `/okul` (Serkan Yılmaz, Müdür Yrd., Ankara Atatürk L.)
- **Kurum** → `/kurum` (Ayşe Demir, Turkcell LAB)
- **Admin** → `/yonetim` (Çağan Çalışkan, Super Admin)

Her butona tıkladığında `liseup_session` cookie set edilir + ilgili panele redirect olur. Logout `/giris`'e geri döndürür.

### Demo verisi nereden geliyor?

`lib/mock-data.ts` — pilot toplantısı için hazırlanmış Türkçe mock data:
- 6 fırsat (Turkcell LAB, Koç Vakfı, Endeavor, İTÜ Çekirdek, Kworks, TEB)
- 6 doğrulanmış öğrenci + 1 bağlantı bekleyen
- 2 gizleme talebi (14-gün SLA aktif)
- 3 başarı hikayesi
- 4 bekleyen kurum onayı
- 4 moderasyon kuyruğu öğesi
- 8×14 yetki matrisi (PRD §11.2)

### Mobile demo

Tablet/telefon için responsive tasarım çalışır — `/giris`'te küçük ekranda demo butonları stacklenir, sidebar mobil drawer'a düşer. Pilot toplantıda tablet üzerinde de gezinebilirsin.

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript strict
- **Styling:** Tailwind CSS v4 with `@theme` token spine
- **Components:** shadcn/ui (base-ui primitives + Radix Slot ile asChild button)
- **Icons:** lucide-react
- **Motion:** motion (micro-interactions) + Lenis (marketing only) + Canvas 2D (hero network)
- **Forms:** react-hook-form + zod (Pass 5'te aktive)
- **Theme:** next-themes (system default + light/dark toggle)
- **Package manager:** npm
- **Locale:** Türkçe (`<html lang="tr">`), `latin-ext` font subset

## Direction

- **Register:** Professional-restraint, Youth/Education sub-voice (PRD §15.2)
- **Palette:** `#3871DF` elektrik mavisi (primary) + slate. Monokromatik disiplin
- **Typography:** Livvic (display) + Inter (body, Pro/Studio fit) + JetBrains Mono
- **Motion:** Marketing'de Lenis + kinetic. Panel'lerde clean app-UI (120-220ms)
- **Yasak:** § marks, Roman rakamlar, italic CTA, drop cap (editorial register'a ait)

---

## Local Geliştirme

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # start production server
npm run lint
```

Dev modunda `liseup_session` cookie auto-seed olur — login akışından geçmeden direkt panellere ulaşabilirsin.

---

## Vercel Deploy (Pilot Toplantı için)

```bash
# İlk kurulum (vercel CLI gerekir)
npm i -g vercel
vercel login

# Deploy
vercel --prod

# Veya vercel.com → "Import Git Repository"
```

**Env vars (şu an gerekli olan):** Yok. Pass 5'te ekleneceler:
- `DATABASE_URL` (Postgres)
- `BETTER_AUTH_SECRET`
- `RESEND_API_KEY`
- `OPENAI_API_KEY`
- `PUSHER_APP_ID` + key + secret + cluster

Şu anki demo mode için herhangi bir env var ayarlamana gerek yok. `vercel --prod` doğrudan çalışır.

**Domain:** Vercel otomatik `*.vercel.app` subdomain verir. Toplantıdan önce `liseup-pilot.vercel.app` gibi anlamlı bir alias atayabilirsin (Vercel dashboard → Settings → Domains).

---

## Yapı (4 Pass — Tamamlandı)

| Pass | Kapsam | Durum |
|---|---|---|
| 1 + 1.5/1.6/1.7 | Public marketing site + auth shells (showcase-tier hero, bento, panel switcher) | ✅ |
| 2 | Liseli paneli `/app/*` — Dashboard, Profil, Projeler (CRUD), Keşfet, Fırsatlar, Mesajlar, Rozetler, Bildirimler, Ayarlar | ✅ |
| 3 | Okul `/okul/*` + Kurum `/kurum/*` panelleri — Dashboard, Öğrenciler, Aylık rapor, Gizleme, Yetenek keşif, Fırsat yayınla, Başvurular, Analitik | ✅ |
| 4 | Admin `/yonetim/*` — 15 route, 8×14 yetki matrisi, moderasyon, eşleştirme, sistem | ✅ |
| 5 | Real backend (Better Auth, Postgres + Drizzle, OpenAI moderation, Pusher mesajlaşma, Resend email, Puppeteer PDF) | ❌ Pilot toplantı sonrası |

**Total: 81 route**, hepsi statik prerender (dynamic [id] hariç).

---

## Klasör Yapısı

```
liseup_web/
├── PRD/                         # Ürün PRD v1.2
├── app/
│   ├── (marketing)/             # Public marketing — / /liseliler /okullar vd.
│   ├── (auth)/                  # /giris /kayit /sifremi-unuttum /davet/okul
│   ├── app/                     # Liseli paneli /app/*
│   ├── okul/                    # Okul paneli /okul/*
│   ├── kurum/                   # Kurum paneli /kurum/*
│   ├── yonetim/                 # Admin paneli /yonetim/*
│   ├── globals.css              # Token spine
│   └── layout.tsx               # Root layout
├── components/
│   ├── marketing/               # Hero, bento, panel switcher, mock primitives
│   ├── auth/                    # AuthShell
│   ├── app/                     # AppShell + liseli primitives + reusable cards
│   ├── okul/                    # OkulShell + okul-specific
│   ├── kurum/                   # KurumShell + kurum-specific
│   ├── admin/                   # AdminShell (slate-950 console)
│   ├── shared/                  # Logo, ThemeToggle, theme-provider
│   └── ui/                      # shadcn primitives
├── lib/
│   ├── fonts.ts                 # Livvic + Inter + JetBrains Mono
│   ├── utils.ts                 # cn()
│   ├── session.ts               # 4 mock session reader
│   ├── auth-actions.ts          # signIn / quickLoginAs / signOut
│   ├── mock-data.ts             # ~30 mock dataset
│   ├── nav.ts                   # marketing nav
│   ├── app-nav.ts               # liseli nav
│   ├── okul-nav.ts              # okul nav
│   ├── kurum-nav.ts             # kurum nav
│   ├── admin-nav.ts             # admin nav (grouped)
│   └── team.ts                  # team grid
├── middleware.ts                # Cookie check, auto-seed in dev
└── public/
```

---

## Plandan Sapmalar (Notlu)

| Plan | Uygulanan | Neden |
|---|---|---|
| pnpm | npm | pnpm sistemde kurulu değil |
| Garet self-host | **Inter** via next/font Google | Pro/Studio aesthetic kararı — Garet ücretli, Inter de-facto B2B SaaS body face |
| shadcn new-york + Radix | shadcn base-nova + Button override | base-ui primitives kuruyor; button-asChild için Radix Slot |
| Stub auth (dev only) | **Stub auth + production-ready quick-login** | Pilot toplantı için real signIn action + 4-rol switcher |
| `/okul/davet` | **`/davet/okul`** | URL prefix çakışması (`/okul/*` panel ile) |

---

## Pilot Toplantı Sonrası — Pass 5 Roadmap

1. **Better Auth + veli akışı:** email-password + Google OAuth + magic link + veli onay 72h escrow + cron silme
2. **Postgres + Drizzle:** ana / hassas / escrow şemaları
3. **OpenAI Moderation API + custom LLM:** iletişim bilgisi sızıntı tespiti
4. **Pusher / Ably WebSocket:** mesajlaşma real-time
5. **Resend transactional email:** kayıt + veli onay + bildirim mailleri
6. **Puppeteer PDF + pptxgenjs:** aylık rapor + dönem sonu rapor
7. **Plausible + PostHog:** analytics
8. **Sentry:** hata izleme
9. **VERBİS kayıt + KVKK aydınlatma metni güncellemeleri**
