import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/marketing/legal-page-shell";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "LiseUP platformunu kullanırken geçerli koşullar.",
};

const TOC = [
  { id: "taraflar", label: "Taraflar" },
  { id: "hizmet", label: "Hizmet tanımı" },
  { id: "hesap", label: "Hesap yükümlülükleri" },
  { id: "icerik", label: "İçerik ve moderasyon" },
  { id: "mesajlasma", label: "Mesajlaşma kuralları" },
  { id: "yasak", label: "Yasak davranışlar" },
  { id: "ucret", label: "Ücretlendirme" },
  { id: "fikri-haklar", label: "Fikri haklar" },
  { id: "sorumluluk", label: "Sorumluluk sınırlaması" },
  { id: "fesh", label: "Fesih" },
  { id: "uyusmazlik", label: "Uyuşmazlık çözümü" },
];

export default function KullanimKosullariPage() {
  return (
    <LegalPageShell
      kicker="Kullanım koşulları"
      title="Platform kullanım koşulları"
      lastUpdated="2026-04-24"
      effective="Kayıt onayından itibaren"
      toc={TOC}
    >
      <LegalSection id="taraflar" number="01" title="Taraflar">
        <p>
          Bu koşullar, LiseUP Derneği (ve iktisadi işletmesi) ile Platform'u
          kullanan kişi / kurum arasındaki hukuki ilişkiyi düzenler. Platform
          üyeliği bu koşulların kabulüyle başlar.
        </p>
      </LegalSection>

      <LegalSection id="hizmet" number="02" title="Hizmet tanımı">
        <ul>
          <li>Liseli kullanıcılar: proje açma, ekip kurma, fırsat başvurusu, profilleme.</li>
          <li>Okul kullanıcıları: öğrenci aktivitesi izleme, rapor, başarı vitrini.</li>
          <li>Kurum kullanıcıları: yetenek keşfi, fırsat yayını, mesajlaşma (kademeli).</li>
        </ul>
      </LegalSection>

      <LegalSection id="hesap" number="03" title="Hesap yükümlülükleri">
        <ul>
          <li>Gerçek kimlik bilgilerini girmek (sahte hesap yasaktır).</li>
          <li>Şifreyi korumak; başkasıyla paylaşmamak.</li>
          <li>18 yaş altı kullanıcılar veli onayını tamamlamak zorundadır.</li>
          <li>Hesap aktivitesinden kullanıcı sorumludur.</li>
        </ul>
      </LegalSection>

      <LegalSection id="icerik" number="04" title="İçerik ve moderasyon">
        <p>
          Yayımlanan her proje risk skoru alır (0–100):
        </p>
        <ul>
          <li>0–30 (düşük): anında yayın, post-hoc şikayet akışına tabi.</li>
          <li>31–60 (orta): anında yayın + öncelikli inceleme.</li>
          <li>61–100 (yüksek): manuel onay kuyruğu (SLA 4 saat gündüz).</li>
        </ul>
        <p>
          LiseUP, platform bütünlüğünü korumak amacıyla içeriği reddetme,
          düzenlenmesini isteme veya kaldırma hakkını saklı tutar.
        </p>
      </LegalSection>

      <LegalSection id="mesajlasma" number="05" title="Mesajlaşma kuralları">
        <ul>
          <li>Liseli ↔ Liseli genel DM yoktur; yalnızca ekip sohbetinde.</li>
          <li>
            Kurum → Liseli: kurum ilk mesaj atar, liseli kabul ederse konuşma
            açılır. 14 gün içinde kabul edilmezse istek otomatik silinir.
          </li>
          <li>
            Kurum tarafı: günlük 50 ilk-mesaj limiti, aynı template 24 saatte
            10'dan fazla gönderilemez (spam engeli).
          </li>
          <li>
            Platform dışı iletişim bilgisi (telefon, Instagram, TikTok vb.)
            paylaşımı bloklanır.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="yasak" number="06" title="Yasak davranışlar">
        <ul>
          <li>Küfür, nefret söylemi, taciz, cinsel içerik.</li>
          <li>Yetişkin içerikli fırsat yayını.</li>
          <li>Sahte profil, manipülatif içerik, reklam spamı.</li>
          <li>Telif hakkı ihlali.</li>
          <li>Otomatik botla kazıma (scraping).</li>
          <li>18 yaş altı kullanıcıyı platform dışına çıkarmaya yönelik her türlü girişim.</li>
        </ul>
      </LegalSection>

      <LegalSection id="ucret" number="07" title="Ücretlendirme">
        <ul>
          <li>
            Liseli ve okul tarafı <strong>%100 ücretsizdir</strong>, şu an ve
            ileride.
          </li>
          <li>
            Kurum tarafı üç katmanlıdır: Discover (ücretsiz), Engage (aylık
            abonelik, pilot sonrası), Partner (sözleşmeli).
          </li>
          <li>
            Pilot dönemi (Eyl 2026 – Oca 2027) tüm kurumlara Discover + Engage
            ücretsiz.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="fikri-haklar" number="08" title="Fikri haklar">
        <p>
          Kullanıcı yükledikleri içeriğe ilişkin haklarını saklı tutar. LiseUP,
          platform hizmetini sunmak için <strong>sınırlı, geri alınabilir,
          münhasır olmayan</strong> kullanım lisansı alır (proje görseli
          sistemde gösterme, başarı vitrini için paylaşım onayı alınarak kullanım vb.).
        </p>
      </LegalSection>

      <LegalSection id="sorumluluk" number="09" title="Sorumluluk sınırlaması">
        <p>
          LiseUP, platform aracılığıyla kurulan ekip veya kurum-liseli
          ilişkilerinin iş/sözleşmesel sonuçlarından taraf değildir. Platform
          bir <strong>eşleştirme ve iletişim aracıdır</strong>; taraflar
          arasındaki anlaşmalar taraflar sorumluluğundadır.
        </p>
      </LegalSection>

      <LegalSection id="fesh" number="10" title="Fesih">
        <ul>
          <li>Kullanıcı hesabını istediği zaman silebilir (30 gün geri dönüş + tam silme).</li>
          <li>
            LiseUP, koşulları ihlal eden hesabı askıya alabilir veya sonlandırabilir.
          </li>
          <li>Fesih sonrası veri saklama politikası bu belgedeki sürelere tabidir.</li>
        </ul>
      </LegalSection>

      <LegalSection id="uyusmazlik" number="11" title="Uyuşmazlık çözümü">
        <p>
          Bu koşullardan doğan uyuşmazlıklarda öncelikle uzlaşma yoluna
          gidilir. Uzlaşmazlık halinde <strong>İstanbul Merkez mahkemeleri
          ve icra daireleri</strong> yetkilidir. Uygulanacak hukuk Türk hukukudur.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
