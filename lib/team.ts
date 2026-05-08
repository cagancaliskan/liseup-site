export interface TeamMember {
  firstName: string;
  lastName: string;
  role: string;
  focus: string;
  gradient: [string, string];
  lead?: boolean;
}

export const LEADERSHIP: TeamMember[] = [
  {
    firstName: "Çağan",
    lastName: "Çalışkan",
    role: "Kurucu · Proje Yönetimi",
    focus: "Pilot operasyon, yasal yapı, dernek tüzüğü, genel strateji.",
    gradient: ["#3871DF", "#14306D"],
    lead: true,
  },
  {
    firstName: "Furkan",
    lastName: "Yılmaz",
    role: "Kurucu · Teknik",
    focus: "Platform mimarisi, moderasyon sistemi, KVKK altyapısı.",
    gradient: ["#2C5CC8", "#1F47A5"],
    lead: true,
  },
  {
    firstName: "Mete",
    lastName: "Yazıcı",
    role: "Kurucu · Ürün",
    focus: "UX, panel şartnameleri, kullanıcı araştırması, etkileşim kuralları.",
    gradient: ["#5F8FE4", "#1F47A5"],
    lead: true,
  },
  {
    firstName: "Mehmet Efe",
    lastName: "-",
    role: "Kurucu · Marka & Medya",
    focus: "Başarı hikayeleri editoryal, marka kullanım politikası, içerik.",
    gradient: ["#8BAFEE", "#2C5CC8"],
    lead: true,
  },
];

export const TEAM_ROLES = [
  "Okul Success",
  "Okul Success",
  "Okul Success",
  "Kurum Success",
  "Kurum Success",
  "İçerik Moderatör",
  "İçerik Moderatör",
  "Destek",
  "Destek",
  "Analist",
  "Teknik Admin",
  "İçerik Editör",
  "Sosyal Medya",
] as const;
