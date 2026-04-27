export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export const primaryNav: NavLink[] = [
  { href: "/liseliler", label: "Liseliler", description: "Fikrini paylaş, ekip kur, fırsat yakala" },
  { href: "/okullar", label: "Okullar", description: "Öğrencilerin proje üretir, sen raporlarsın" },
  { href: "/kurumlar", label: "Kurumlar", description: "Genç yetenek havuzuna erken erişim" },
];

export const secondaryNav: NavLink[] = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/ekip", label: "Ekip" },
  { href: "/basari-hikayeleri", label: "Başarı Hikayeleri" },
  { href: "/blog", label: "Blog" },
];

export const footerNav = {
  platform: [
    { href: "/liseliler", label: "Liseliler" },
    { href: "/okullar", label: "Okullar" },
    { href: "/kurumlar", label: "Kurumlar" },
    { href: "/dernek", label: "Dernek" },
  ] satisfies NavLink[],
  kesfet: [
    { href: "/basari-hikayeleri", label: "Başarı Hikayeleri" },
    { href: "/blog", label: "Blog" },
    { href: "/sss", label: "SSS" },
    { href: "/pilot-basvuru", label: "Pilot Başvuru" },
  ] satisfies NavLink[],
  sirket: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/ekip", label: "Ekip" },
    { href: "/iletisim", label: "İletişim" },
  ] satisfies NavLink[],
  yasal: [
    { href: "/kvkk", label: "KVKK" },
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  ] satisfies NavLink[],
};
