// Mock data used in marketing page previews, demonstrates what the platform
// will show once the Eylül 2026 pilot goes live. Flagged visually so users
// don't confuse these with real, active listings.

export type OpportunityCategory =
  | "hackathon"
  | "burs"
  | "yaz-programi"
  | "yarisma"
  | "staj"
  | "program";

export interface OpportunityMock {
  id: string;
  category: OpportunityCategory;
  categoryLabel: string;
  title: string;
  host: string;
  reward: string;
  daysLeft: number;
  applications: number;
  cityLabel: string;
  hot?: boolean;
}

export const MOCK_OPPORTUNITIES: OpportunityMock[] = [
  {
    id: "o-01",
    category: "hackathon",
    categoryLabel: "Hackathon",
    title: "Turkcell LAB Lise Kod Maratonu 2027",
    host: "Turkcell LAB",
    reward: "₺25.000 + Staj hakkı",
    daysLeft: 5,
    applications: 203,
    cityLabel: "İstanbul · Hibrit",
    hot: true,
  },
  {
    id: "o-02",
    category: "burs",
    categoryLabel: "Burs",
    title: "Koç Vakfı Anadolu Bursu · Lise Seviyesi",
    host: "Koç Vakfı",
    reward: "Tam eğitim bursu + mentörlük",
    daysLeft: 12,
    applications: 89,
    cityLabel: "Türkiye geneli",
  },
  {
    id: "o-03",
    category: "yaz-programi",
    categoryLabel: "Yaz Programı",
    title: "İTÜ Çekirdek Lise Girişimcilik Atölyesi",
    host: "İTÜ Çekirdek",
    reward: "Sertifika + ofis erişimi",
    daysLeft: 14,
    applications: 67,
    cityLabel: "İstanbul",
  },
  {
    id: "o-04",
    category: "yarisma",
    categoryLabel: "Yarışma",
    title: "Endeavor Türkiye Gen Z Pitch Yarışması",
    host: "Endeavor Türkiye",
    reward: "₺50.000 + 6 ay mentörlük",
    daysLeft: 7,
    applications: 142,
    cityLabel: "Online",
    hot: true,
  },
  {
    id: "o-05",
    category: "program",
    categoryLabel: "Program",
    title: "TEB Girişim Evi Junior, 4 Haftalık Program",
    host: "TEB Girişim Evi",
    reward: "Mentör eşleştirme + yatırım danışmanlığı",
    daysLeft: 21,
    applications: 54,
    cityLabel: "Ankara",
  },
  {
    id: "o-06",
    category: "staj",
    categoryLabel: "Staj",
    title: "Kworks Yaz Stajı, Startup Deneyimi",
    host: "Kworks",
    reward: "Ücretli · LinkedIn sertifikası",
    daysLeft: 9,
    applications: 178,
    cityLabel: "İstanbul",
  },
];

export interface ProjectMock {
  id: string;
  title: string;
  owner: string;
  pitch: string;
  rolesOpen: string[];
  cityLabel: string;
  teamCount: number;
  category: string;
}

export const MOCK_PROJECTS: ProjectMock[] = [
  {
    id: "p-01",
    title: "SesliKitap",
    owner: "Zeynep",
    pitch: "Görme engelli liseliler için ders içeriklerini sese çeviren bir kütüphane.",
    rolesOpen: ["Tasarımcı", "Yazılımcı"],
    cityLabel: "İstanbul · Hibrit",
    teamCount: 3,
    category: "Sosyal Etki",
  },
  {
    id: "p-02",
    title: "YKS Çalışma Odası",
    owner: "Ege",
    pitch: "YKS'ye hazırlanan liselilerin birlikte sanal çalışma yaptığı Pomodoro odası.",
    rolesOpen: ["Ürün Yöneticisi"],
    cityLabel: "Online",
    teamCount: 4,
    category: "Eğitim",
  },
];

export interface ProfileMock {
  firstName: string;
  lastInitial: string;
  classYear: string;
  city: string;
  schoolName: string;
  schoolVerified: boolean;
  skills: Array<{ label: string; level: "Başlangıç" | "Orta" | "İleri" }>;
  interests: string[];
  projectCount: number;
  badgeCount: number;
  portfolioLinks: Array<{ label: string; href: string }>;
}

export const MOCK_PROFILE: ProfileMock = {
  firstName: "Deniz",
  lastInitial: "K.",
  classYear: "11. Sınıf",
  city: "Ankara",
  schoolName: "Ankara Atatürk Lisesi",
  schoolVerified: true,
  skills: [
    { label: "React", level: "Orta" },
    { label: "Figma", level: "Orta" },
    { label: "Python", level: "Başlangıç" },
    { label: "Veri Analizi", level: "Başlangıç" },
  ],
  interests: ["Yazılım", "Sosyal Etki", "Eğitim Teknolojisi"],
  projectCount: 2,
  badgeCount: 4,
  portfolioLinks: [
    { label: "github.com/deniz", href: "#" },
    { label: "figma.com/@deniz", href: "#" },
  ],
};

// ==================== App-Side Mocks (Pass 2) ====================

export type NotificationKind =
  | "project-application"
  | "corp-message"
  | "opportunity-opened"
  | "school-link"
  | "badge-earned"
  | "system";

export interface NotificationMock {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  href?: string;
}

export const MOCK_NOTIFICATIONS: NotificationMock[] = [
  {
    id: "n1",
    kind: "project-application",
    title: "Ece projene başvurdu",
    body: "SesliKitap · Tasarımcı rolü için",
    time: "12 dk önce",
    unread: true,
    href: "/app/projeler",
  },
  {
    id: "n2",
    kind: "corp-message",
    title: "Turkcell LAB seninle konuşmak istiyor",
    body: "Kabul edersen sohbet açılır",
    time: "2 sa önce",
    unread: true,
    href: "/app/mesajlar",
  },
  {
    id: "n3",
    kind: "opportunity-opened",
    title: "Endeavor Gen Z Pitch açıldı",
    body: "İlgi alanlarınla uyumlu · son 7 gün",
    time: "Bugün",
    unread: true,
    href: "/app/firsatlar",
  },
  {
    id: "n4",
    kind: "school-link",
    title: "Okulun LiseUP'a katıldı",
    body: "Ankara Atatürk Lisesi · bağlantıyı onayla",
    time: "Dün",
    unread: false,
    href: "/app/okul-baglanti",
  },
  {
    id: "n5",
    kind: "badge-earned",
    title: "Yeni rozet: İlk Proje",
    body: "İlk projeni açtın, tebrikler",
    time: "3 gün önce",
    unread: false,
    href: "/app/basarilar",
  },
  {
    id: "n6",
    kind: "system",
    title: "18 yaşına 2 ay kaldı",
    body: "Yakında yetişkin hesap geçişi olacak",
    time: "1 hafta önce",
    unread: false,
  },
];

export interface ActiveProjectMock {
  id: string;
  title: string;
  role: string;
  status: "Açık" | "Yayında" | "Tamamlandı" | "Taslak";
  teamCount: number;
  openRoles: number;
  city: string;
  isOwner: boolean;
  cover: [string, string];
}

export const MOCK_ACTIVE_PROJECTS: ActiveProjectMock[] = [
  {
    id: "ap1",
    title: "SesliKitap",
    role: "Proje sahibi",
    status: "Yayında",
    teamCount: 3,
    openRoles: 2,
    city: "İstanbul · Hibrit",
    isOwner: true,
    cover: ["#3871DF", "#14306D"],
  },
  {
    id: "ap2",
    title: "YKS Çalışma Odası",
    role: "Ürün Yöneticisi",
    status: "Açık",
    teamCount: 4,
    openRoles: 1,
    city: "Online",
    isOwner: false,
    cover: ["#2C5CC8", "#1F47A5"],
  },
];

export interface ApplicationMock {
  id: string;
  target: "project" | "opportunity";
  title: string;
  host: string;
  status: "Beklemede" | "İnceleniyor" | "Kabul" | "Reddedildi";
  date: string;
}

export const MOCK_APPLICATIONS: ApplicationMock[] = [
  {
    id: "a1",
    target: "project",
    title: "İklim Atölyesi",
    host: "Burak · İstanbul",
    status: "İnceleniyor",
    date: "2 gün önce",
  },
  {
    id: "a2",
    target: "opportunity",
    title: "Turkcell LAB Kod Maratonu",
    host: "Turkcell LAB",
    status: "Beklemede",
    date: "Bugün",
  },
  {
    id: "a3",
    target: "opportunity",
    title: "Koç Vakfı Anadolu Bursu",
    host: "Koç Vakfı",
    status: "İnceleniyor",
    date: "5 gün önce",
  },
  {
    id: "a4",
    target: "project",
    title: "Mahalle Haberleri",
    host: "Ela · Ankara",
    status: "Kabul",
    date: "1 hafta önce",
  },
];

export interface ConversationMock {
  id: string;
  title: string;
  last: string;
  who: string;
  time: string;
  unread: number;
  kind: "team" | "corp" | "inquiry";
}

export const MOCK_CONVERSATIONS: ConversationMock[] = [
  {
    id: "c1",
    title: "SesliKitap · Ekip",
    last: "Cover'ı güncelledim, siz de baksanız?",
    who: "Zeynep",
    time: "32 dk önce",
    unread: 2,
    kind: "team",
  },
  {
    id: "c2",
    title: "Turkcell LAB",
    last: "Kabul edersen konuşmayı başlatalım.",
    who: "Turkcell LAB",
    time: "2 sa önce",
    unread: 1,
    kind: "corp",
  },
  {
    id: "c3",
    title: "YKS Çalışma Odası · Ekip",
    last: "Bugün saat 19:00 uygun mu?",
    who: "Ege",
    time: "Dün",
    unread: 0,
    kind: "team",
  },
];

export interface BadgeMock {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export const MOCK_BADGES: BadgeMock[] = [
  {
    id: "b1",
    emoji: "🚀",
    title: "İlk Proje",
    description: "İlk projeni açtın",
    earned: true,
    earnedAt: "2026-04-02",
  },
  {
    id: "b2",
    emoji: "🤝",
    title: "Ekip Oyuncusu",
    description: "3 farklı projede yer al",
    earned: false,
  },
  {
    id: "b3",
    emoji: "🏆",
    title: "Fırsat Avcısı",
    description: "5 fırsata başvur",
    earned: true,
    earnedAt: "2026-04-18",
  },
  {
    id: "b4",
    emoji: "🔥",
    title: "Süreklilik",
    description: "7 gün üst üste aktif ol",
    earned: true,
    earnedAt: "2026-04-20",
  },
  {
    id: "b5",
    emoji: "🎓",
    title: "Tamamlayıcı",
    description: "3 projeyi tamamla",
    earned: false,
  },
  {
    id: "b6",
    emoji: "🌐",
    title: "Doğrulanmış",
    description: "Partner okul öğrencisi",
    earned: true,
    earnedAt: "2026-04-01",
  },
  {
    id: "b7",
    emoji: "🌟",
    title: "Mentör",
    description: "5+ olumlu referans al",
    earned: false,
  },
];

export interface ActivityEventMock {
  id: string;
  kind: "applied" | "joined" | "matched" | "opened" | "completed" | "viewed";
  title: string;
  subtitle?: string;
  time: string;
}

export const MOCK_ACTIVITY: ActivityEventMock[] = [
  {
    id: "ev1",
    kind: "applied",
    title: "Ece SesliKitap projene başvurdu",
    subtitle: "Tasarımcı rolü · 12 dk önce",
    time: "12 dk",
  },
  {
    id: "ev2",
    kind: "viewed",
    title: "Turkcell LAB profilini görüntüledi",
    subtitle: "2 sa önce",
    time: "2 sa",
  },
  {
    id: "ev3",
    kind: "opened",
    title: "Endeavor Gen Z Pitch Yarışması açıldı",
    subtitle: "Son 7 gün · 142 başvuru",
    time: "Bugün",
  },
  {
    id: "ev4",
    kind: "matched",
    title: "YKS Çalışma Odası projesine önerildin",
    subtitle: "Ürün Yöneticisi rolü · dün",
    time: "Dün",
  },
  {
    id: "ev5",
    kind: "joined",
    title: "Mahalle Haberleri ekibine katıldın",
    subtitle: "1 hafta önce",
    time: "1 hf",
  },
];

// ==================== Okul Panel Mocks (Pass 3) ====================

export interface OkulStudentMock {
  id: string;
  firstName: string;
  lastInitial: string;
  classYear: string;
  city: string;
  status: "Doğrulanmış" | "Bağlantı Bekleyen";
  activeProjects: number;
  applications: number;
  lastActivity: string;
  topSkill: string;
}

export const MOCK_OKUL_STUDENTS: OkulStudentMock[] = [
  {
    id: "stu-1",
    firstName: "Deniz",
    lastInitial: "K.",
    classYear: "11. Sınıf",
    city: "Ankara",
    status: "Doğrulanmış",
    activeProjects: 2,
    applications: 4,
    lastActivity: "12 dk önce",
    topSkill: "Yazılım",
  },
  {
    id: "stu-2",
    firstName: "Ela",
    lastInitial: "B.",
    classYear: "12. Sınıf",
    city: "Ankara",
    status: "Doğrulanmış",
    activeProjects: 1,
    applications: 6,
    lastActivity: "2 sa önce",
    topSkill: "Tasarım",
  },
  {
    id: "stu-3",
    firstName: "Mert",
    lastInitial: "A.",
    classYear: "10. Sınıf",
    city: "Ankara",
    status: "Doğrulanmış",
    activeProjects: 3,
    applications: 2,
    lastActivity: "Bugün",
    topSkill: "Donanım",
  },
  {
    id: "stu-4",
    firstName: "Zeynep",
    lastInitial: "T.",
    classYear: "11. Sınıf",
    city: "Ankara",
    status: "Doğrulanmış",
    activeProjects: 1,
    applications: 3,
    lastActivity: "Dün",
    topSkill: "Tasarım",
  },
  {
    id: "stu-5",
    firstName: "Ege",
    lastInitial: "Ş.",
    classYear: "9. Sınıf",
    city: "Ankara",
    status: "Bağlantı Bekleyen",
    activeProjects: 0,
    applications: 1,
    lastActivity: "3 gün önce",
    topSkill: "-",
  },
  {
    id: "stu-6",
    firstName: "Bora",
    lastInitial: "M.",
    classYear: "12. Sınıf",
    city: "Ankara",
    status: "Doğrulanmış",
    activeProjects: 2,
    applications: 5,
    lastActivity: "1 hafta önce",
    topSkill: "Yazılım",
  },
];

export interface HideRequestMock {
  id: string;
  studentName: string;
  projectTitle: string;
  reason?: string;
  submittedAt: string;
  daysLeft: number; // SLA window
}

export const MOCK_HIDE_REQUESTS: HideRequestMock[] = [
  {
    id: "h1",
    studentName: "Deniz K.",
    projectTitle: "Sosyal Etki Raporu",
    reason:
      "Bu proje hassas içerik üzerine, okul panelinde görünmesini tercih etmiyorum.",
    submittedAt: "2 gün önce",
    daysLeft: 12,
  },
  {
    id: "h2",
    studentName: "Mert A.",
    projectTitle: "Aile Takvimi App",
    submittedAt: "5 gün önce",
    daysLeft: 9,
  },
];

export interface SuccessStoryMock {
  id: string;
  title: string;
  studentName: string;
  category: string;
  date: string;
  excerpt: string;
}

export const MOCK_SUCCESS_STORIES: SuccessStoryMock[] = [
  {
    id: "s1",
    title: "TÜBİTAK 2204-A Lise Araştırma Yarışması, 2.lik",
    studentName: "Ela B.",
    category: "Yarışma",
    date: "Mart 2027",
    excerpt:
      "Mahalle Haberleri projesi ile 2. olduk. Ekipte 4 lise + 1 mentör vardı.",
  },
  {
    id: "s2",
    title: "Endeavor Türkiye Gen Z Pitch, finalist",
    studentName: "Bora M.",
    category: "Pitch",
    date: "Şubat 2027",
    excerpt: "Ekibimle finallere kaldık, mentörlük desteği aldık.",
  },
  {
    id: "s3",
    title: "Koç Vakfı Anadolu Bursu, kabul",
    studentName: "Mert A.",
    category: "Burs",
    date: "Ocak 2027",
    excerpt:
      "Profilimle başvurdum, görüşmeye çağrıldım. 4 yıllık tam burs aldım.",
  },
];

// ==================== Kurum Panel Mocks (Pass 3) ====================

export interface KurumApplicationMock {
  id: string;
  studentInitials: string;
  studentFirstName: string;
  classYear: string;
  city: string;
  opportunity: string;
  status: "Yeni" | "İncelendi" | "Mülakat" | "Kabul" | "Reddedildi";
  submittedAt: string;
  matchScore: number;
}

export const MOCK_KURUM_APPLICATIONS: KurumApplicationMock[] = [
  {
    id: "ka1",
    studentInitials: "DK",
    studentFirstName: "Deniz",
    classYear: "11. Sınıf",
    city: "Ankara",
    opportunity: "Turkcell LAB Kod Maratonu",
    status: "Yeni",
    submittedAt: "12 dk önce",
    matchScore: 92,
  },
  {
    id: "ka2",
    studentInitials: "EY",
    studentFirstName: "Ece",
    classYear: "10. Sınıf",
    city: "İstanbul",
    opportunity: "Turkcell LAB Kod Maratonu",
    status: "İncelendi",
    submittedAt: "2 sa önce",
    matchScore: 87,
  },
  {
    id: "ka3",
    studentInitials: "BM",
    studentFirstName: "Bora",
    classYear: "12. Sınıf",
    city: "İzmir",
    opportunity: "Yaz Stajı 2027",
    status: "Mülakat",
    submittedAt: "Dün",
    matchScore: 84,
  },
  {
    id: "ka4",
    studentInitials: "MA",
    studentFirstName: "Mira",
    classYear: "11. Sınıf",
    city: "Ankara",
    opportunity: "Turkcell LAB Kod Maratonu",
    status: "Kabul",
    submittedAt: "3 gün önce",
    matchScore: 96,
  },
  {
    id: "ka5",
    studentInitials: "KR",
    studentFirstName: "Kaan",
    classYear: "11. Sınıf",
    city: "İstanbul",
    opportunity: "Yaz Stajı 2027",
    status: "Reddedildi",
    submittedAt: "1 hafta önce",
    matchScore: 62,
  },
];

export interface PublishedOpportunityMock {
  id: string;
  title: string;
  category: string;
  status: "Yayında" | "Taslak" | "Kapalı";
  applications: number;
  daysOpen: number;
  publishedAt: string;
}

export const MOCK_PUBLISHED_OPPORTUNITIES: PublishedOpportunityMock[] = [
  {
    id: "po1",
    title: "Turkcell LAB Kod Maratonu 2027",
    category: "Hackathon",
    status: "Yayında",
    applications: 203,
    daysOpen: 14,
    publishedAt: "2 hafta önce",
  },
  {
    id: "po2",
    title: "Turkcell LAB Yaz Stajı 2027",
    category: "Staj",
    status: "Yayında",
    applications: 156,
    daysOpen: 21,
    publishedAt: "3 hafta önce",
  },
  {
    id: "po3",
    title: "Genç Yazılımcılar Bursu (Taslak)",
    category: "Burs",
    status: "Taslak",
    applications: 0,
    daysOpen: 0,
    publishedAt: "-",
  },
];

// ==================== Admin Panel Mocks (Pass 4) ====================

export interface PendingKurumMock {
  id: string;
  name: string;
  industry: string;
  contactName: string;
  email: string;
  vergiNo: string;
  submittedAt: string;
  riskLevel: "Düşük" | "Orta" | "Yüksek";
}

export const MOCK_PENDING_KURUMS: PendingKurumMock[] = [
  {
    id: "pk1",
    name: "ABC Yatırım A.Ş.",
    industry: "Finans",
    contactName: "Ayşe Demir",
    email: "ayse@abcyatirim.com",
    vergiNo: "1234567890",
    submittedAt: "2 sa önce",
    riskLevel: "Düşük",
  },
  {
    id: "pk2",
    name: "Yıldız Teknoloji",
    industry: "Teknoloji",
    contactName: "Mehmet Kaya",
    email: "mkaya@yildiztech.com",
    vergiNo: "0987654321",
    submittedAt: "5 sa önce",
    riskLevel: "Düşük",
  },
  {
    id: "pk3",
    name: "Genç Vakıf",
    industry: "STK",
    contactName: "Selin Aydın",
    email: "selin@gencvakif.org",
    vergiNo: "5544332211",
    submittedAt: "Dün",
    riskLevel: "Orta",
  },
  {
    id: "pk4",
    name: "Yeni Medya Group",
    industry: "Medya",
    contactName: "Burak Yılmaz",
    email: "burak@yenimedya.com",
    vergiNo: "1122334455",
    submittedAt: "2 gün önce",
    riskLevel: "Yüksek",
  },
];

export interface ModerationItemMock {
  id: string;
  kind: "project" | "message" | "opportunity";
  title: string;
  author: string;
  riskScore: number; // 0-100
  flags: string[];
  submittedAt: string;
}

export const MOCK_MODERATION_QUEUE: ModerationItemMock[] = [
  {
    id: "m1",
    kind: "project",
    title: "Açık Atölye, fizik / kod / sanat",
    author: "Bora M.",
    riskScore: 78,
    flags: ["Yüksek dil skoru", "Görsel uyumsuzluğu"],
    submittedAt: "12 dk önce",
  },
  {
    id: "m2",
    kind: "message",
    title: "İletişim bilgisi sızıntısı (regex)",
    author: "Mehmet (kurum)",
    riskScore: 84,
    flags: ["Telefon numarası", "Sosyal medya handle"],
    submittedAt: "32 dk önce",
  },
  {
    id: "m3",
    kind: "opportunity",
    title: "Yarışma yayını, Genç Vakıf",
    author: "Selin Aydın",
    riskScore: 45,
    flags: ["Hedef kitle muğlak"],
    submittedAt: "1 sa önce",
  },
  {
    id: "m4",
    kind: "project",
    title: "Sınıf Birinciliği Sıralama Botu",
    author: "Kaan R.",
    riskScore: 67,
    flags: ["Etik uyarı"],
    submittedAt: "2 sa önce",
  },
];

export interface ReportMock {
  id: string;
  category: "Spam" | "Taciz" | "Sahte profil" | "Uygunsuz" | "Diğer";
  target: string;
  reportedBy: string;
  submittedAt: string;
  priority: "Düşük" | "Yüksek";
}

export const MOCK_REPORTS: ReportMock[] = [
  {
    id: "r1",
    category: "Sahte profil",
    target: "@huseyin_x",
    reportedBy: "Deniz K.",
    submittedAt: "30 dk önce",
    priority: "Yüksek",
  },
  {
    id: "r2",
    category: "Spam",
    target: "Mesaj, kurum/Yıldız Teknoloji",
    reportedBy: "Ela B.",
    submittedAt: "Bugün",
    priority: "Düşük",
  },
];

export interface PilotApplicationMock {
  id: string;
  schoolName: string;
  city: string;
  studentCount: number;
  contactName: string;
  preferredStart: string;
  submittedAt: string;
  status: "Yeni" | "Görüşme planlandı" | "Sözleşme aşaması";
}

export const MOCK_PILOT_APPLICATIONS: PilotApplicationMock[] = [
  {
    id: "pa1",
    schoolName: "Beykent Koleji",
    city: "İstanbul",
    studentCount: 720,
    contactName: "Ayşe Korkmaz (Müdür Yrd.)",
    preferredStart: "Eylül 2026",
    submittedAt: "Bugün",
    status: "Yeni",
  },
  {
    id: "pa2",
    schoolName: "Kadıköy Anadolu Lisesi",
    city: "İstanbul",
    studentCount: 540,
    contactName: "Cem Demir (Rehber)",
    preferredStart: "Eylül 2026",
    submittedAt: "Dün",
    status: "Görüşme planlandı",
  },
];

export interface MatchSuggestionMock {
  id: string;
  studentName: string;
  classYear: string;
  schoolDomain: string;
  schoolName: string;
  confidence: number; // 0-100
}

export const MOCK_MATCH_SUGGESTIONS: MatchSuggestionMock[] = [
  {
    id: "ms1",
    studentName: "Ozan T.",
    classYear: "11. Sınıf",
    schoolDomain: "@beykent.k12.tr",
    schoolName: "Beykent Koleji",
    confidence: 94,
  },
  {
    id: "ms2",
    studentName: "Lara S.",
    classYear: "10. Sınıf",
    schoolDomain: "@kadikoy.k12.tr",
    schoolName: "Kadıköy Anadolu Lisesi",
    confidence: 88,
  },
  {
    id: "ms3",
    studentName: "Yusuf D.",
    classYear: "12. Sınıf",
    schoolDomain: "@beykent.k12.tr",
    schoolName: "Beykent Koleji",
    confidence: 86,
  },
  {
    id: "ms4",
    studentName: "İrem K.",
    classYear: "9. Sınıf",
    schoolDomain: "@izmirakl.k12.tr",
    schoolName: "İzmir Amerikan Lisesi",
    confidence: 79,
  },
  {
    id: "ms5",
    studentName: "Berke M.",
    classYear: "11. Sınıf",
    schoolDomain: "@kadikoy.k12.tr",
    schoolName: "Kadıköy Anadolu Lisesi",
    confidence: 71,
  },
];

export interface FeatureFlagMock {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPct?: number;
}

export const MOCK_FEATURE_FLAGS: FeatureFlagMock[] = [
  {
    id: "ff1",
    name: "team_chat_v2",
    description: "Yeni ekip sohbeti UI (Pass 5'te WebSocket).",
    enabled: false,
    rolloutPct: 0,
  },
  {
    id: "ff2",
    name: "moderation_phase_2",
    description: "Risk skoru ince ayar (Kasım–Aralık 2026).",
    enabled: false,
  },
  {
    id: "ff3",
    name: "kurum_pricing_active",
    description: "Engage abonelik aktive (pilot sonrası).",
    enabled: false,
  },
  {
    id: "ff4",
    name: "command_palette",
    description: "Cmd+K hızlı arama (zaten aktif).",
    enabled: true,
    rolloutPct: 100,
  },
  {
    id: "ff5",
    name: "school_branding_subdomains",
    description: "Multi-tenant okul subdomain (v1.5).",
    enabled: false,
  },
];

// 8x14 permission matrix per PRD §11.2
export const ADMIN_ROLES = [
  "Super Admin",
  "Teknik Admin",
  "İçerik Moderatör",
  "Okul Success",
  "Kurum Success",
  "İçerik Editör",
  "Destek",
  "Analist",
] as const;

export interface PermissionRow {
  module: string;
  values: boolean[]; // index aligns with ADMIN_ROLES
}

export const PERMISSION_MATRIX: PermissionRow[] = [
  { module: "Kullanıcı silme",     values: [true,  false, false, false, false, false, false, false] },
  { module: "Rol atama",           values: [true,  false, false, false, false, false, false, false] },
  { module: "Sistem ayarları",     values: [true,  true,  false, false, false, false, false, false] },
  { module: "Proje moderasyon",    values: [true,  false, true,  false, false, false, false, false] },
  { module: "Şikayet yönetimi",    values: [true,  false, true,  false, false, false, true,  false] },
  { module: "Okul pilot açma",     values: [true,  false, false, true,  false, false, false, false] },
  { module: "Okul eşleştirme",     values: [true,  false, false, true,  false, false, false, false] },
  { module: "Okul rapor onayı",    values: [true,  false, false, true,  false, false, false, false] },
  { module: "Kurum onay",          values: [true,  false, false, false, true,  false, false, false] },
  { module: "Hassas fırsat flag",  values: [true,  false, true,  false, true,  false, false, false] },
  { module: "Blog yayın",          values: [true,  false, false, false, false, true,  false, false] },
  { module: "Başarı hikayesi",     values: [true,  false, false, true,  false, true,  false, false] },
  { module: "Destek ticket",       values: [true,  false, false, false, false, false, true,  false] },
  { module: "Analitik dashboard",  values: [true,  true,  true,  true,  true,  true,  true,  true ] },
];

export interface StudentMock {
  id: string;
  firstName: string;
  initials: string;
  classYear: string;
  city: string;
  school?: string;
  verified: boolean;
  skills: string[];
  gradient: [string, string];
}

export const MOCK_STUDENTS: StudentMock[] = [
  {
    id: "s1",
    firstName: "Ece",
    initials: "EY",
    classYear: "10. Sınıf",
    city: "İstanbul",
    school: "Beykent Koleji",
    verified: true,
    skills: ["Tasarım", "Araştırma"],
    gradient: ["#2C5CC8", "#1F47A5"],
  },
  {
    id: "s2",
    firstName: "Bora",
    initials: "BM",
    classYear: "12. Sınıf",
    city: "İzmir",
    verified: false,
    skills: ["Python", "Donanım"],
    gradient: ["#5F8FE4", "#1F47A5"],
  },
  {
    id: "s3",
    firstName: "Mira",
    initials: "MA",
    classYear: "11. Sınıf",
    city: "Ankara",
    school: "TED Ankara Koleji",
    verified: true,
    skills: ["Yazılım", "Ürün"],
    gradient: ["#3871DF", "#14306D"],
  },
  {
    id: "s4",
    firstName: "Kaan",
    initials: "KR",
    classYear: "11. Sınıf",
    city: "İstanbul",
    verified: false,
    skills: ["Video", "Anlatı"],
    gradient: ["#8BAFEE", "#2C5CC8"],
  },
  {
    id: "s5",
    firstName: "Elif",
    initials: "EÇ",
    classYear: "10. Sınıf",
    city: "İzmir",
    school: "İzmir Amerikan Koleji",
    verified: true,
    skills: ["Biyoloji", "Araştırma"],
    gradient: ["#3871DF", "#1F47A5"],
  },
];
