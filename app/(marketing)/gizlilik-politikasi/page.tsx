import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/marketing/legal-page-shell";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "LiseUP platformunda kişisel verilerin gizliliğine ilişkin politika.",
};

const TOC = [
  { id: "genel", label: "Genel ilkeler" },
  { id: "cerezler", label: "Çerezler ve takip" },
  { id: "analitik", label: "Analitik" },
  { id: "ucuncu-taraf", label: "Üçüncü taraflar" },
  { id: "cocuk", label: "18 altı ek koruma" },
  { id: "mesaj", label: "Mesajlaşma gizliliği" },
  { id: "hassas", label: "Hassas fırsat koruması" },
  { id: "okul-gorunurluk", label: "Okul görünürlüğü" },
  { id: "guncelleme", label: "Politika güncellemesi" },
];

export default function GizlilikPage() {
  return (
    <LegalPageShell
      kicker="Gizlilik"
      title="Gizlilik politikası"
      lastUpdated="2026-04-24"
      effective="Kayıt onayından itibaren"
      toc={TOC}
    >
      <LegalSection id="genel" number="01" title="Genel ilkeler">
        <ul>
          <li>
            <strong>Veri minimizasyonu:</strong> Yalnızca hizmeti sağlamak için
            gerekli veri toplanır.
          </li>
          <li>
            <strong>Amaç sınırlaması:</strong> Veriler sadece açıklanan amaç için
            işlenir.
          </li>
          <li>
            <strong>Saklama süresi:</strong> Amaç dışı tutulmaz; gerektiğinden
            uzun saklanmaz.
          </li>
          <li>
            <strong>Şeffaflık:</strong> Hangi veriyi kimin gördüğü her zaman net.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="cerezler" number="02" title="Çerezler ve takip">
        <p>
          Platformda yalnızca <strong>kesinlikle gerekli çerezler</strong>{" "}
          (oturum, güvenlik) ve <strong>tercih çerezleri</strong> (tema, dil)
          kullanılır. Reklam takip çerezi yoktur. Üçüncü taraf reklam ağı
          kullanılmaz.
        </p>
      </LegalSection>

      <LegalSection id="analitik" number="03" title="Analitik">
        <p>
          Kullanıcı davranışını{" "}
          <strong>Plausible Analytics</strong> (gizlilik odaklı, çerezsiz) ile
          ve ürün tarafında <strong>PostHog</strong> (kendi sunucumuzda, IP
          anonimleştirmeli) ile izleriz. 18 yaş altı kullanıcıların davranışsal
          verileri agrega seviyede analiz edilir, bireysel profil çıkarılmaz.
        </p>
      </LegalSection>

      <LegalSection id="ucuncu-taraf" number="04" title="Üçüncü taraflar">
        <ul>
          <li>
            <strong>Barındırma:</strong> Yurt içi / AWS Frankfurt (AB bölgesi).
          </li>
          <li>
            <strong>E-posta:</strong> Resend veya Postmark (işlemsel mesajlar
            için).
          </li>
          <li>
            <strong>Moderasyon:</strong> OpenAI Moderation API (yalnızca içerik
            analizi; mesaj saklanmaz).
          </li>
          <li>
            <strong>Ödeme (kurum):</strong> İyzico veya benzeri PCI-DSS uyumlu
            sağlayıcı.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="cocuk" number="05" title="18 altı ek koruma">
        <ul>
          <li>
            Veri escrow mimarisi: veli onayı gelene kadar profil aktive olmaz.
          </li>
          <li>Soyad ve fotoğraf kurumlara varsayılan olarak kapalı.</li>
          <li>Yaş ve doğum tarihi kurumlara hiçbir zaman görünmez.</li>
          <li>Platform dışı iletişim bilgileri (telefon, IG) regex + LLM ile bloklanır.</li>
          <li>
            Hassas fırsat başvuruları ayrı şifrelenmiş tabloda, okul paneline
            hiç düşmez.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="mesaj" number="06" title="Mesajlaşma gizliliği">
        <ul>
          <li>
            Ekip sohbeti: yalnızca proje üyeleri görür. LiseUP moderasyonu
            flag edilen içeriği iç incelemeye alabilir.
          </li>
          <li>
            Liseli ↔ Kurum mesajları: kademeli, kurum ilk istek, liseli kabul
            ederse açılır.
          </li>
          <li>
            Okul paneli mesaj <strong>içeriğini asla göremez</strong>; sadece
            "mesajlaşma var/yok" metriği görünür.
          </li>
          <li>Mesaj saklama süresi: 2 yıl. Hesap kapatma → 30 günde silme.</li>
        </ul>
      </LegalSection>

      <LegalSection id="hassas" number="07" title="Hassas fırsat koruması">
        <p>
          Kurum tarafından yayımlanan fırsatlar LiseUP İçerik Moderatörü
          tarafından incelenir; ruh sağlığı, inanç, kimlik temelli programlar
          "hassas" etiketi alır. Hassas fırsatların başvuru verisi ayrı
          şifrelenmiş tabloda tutulur; okul paneline ve rapor istatistiklerine
          girmez.
        </p>
      </LegalSection>

      <LegalSection id="okul-gorunurluk" number="08" title="Okul görünürlüğü">
        <p>
          Partner okul paneli yalnızca <strong>doğrulanmış öğrenci</strong>
          verisini ve yalnızca <strong>görünür projeleri</strong> gösterir.
          Öğrenci her projesinde "okulumdan gizle" talep edebilir. Okul bu
          talebi 14 gün içinde değerlendirir; süre aşılırsa otomatik onay
          verilir (öğrenci lehine default).
        </p>
      </LegalSection>

      <LegalSection id="guncelleme" number="09" title="Politika güncellemesi">
        <p>
          Bu politikada önemli değişiklik yapıldığında kullanıcıya e-posta ve
          platform bildirimi ile önceden haber verilir. Güncel sürüm bu
          sayfanın üstündeki tarihte belirtilir.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
