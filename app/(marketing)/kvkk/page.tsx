import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/marketing/legal-page-shell";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kullanıcıların haklarını açıklayan aydınlatma metni.",
};

const TOC = [
  { id: "veri-sorumlusu", label: "Veri sorumlusu" },
  { id: "islenen-veriler", label: "İşlenen kişisel veriler" },
  { id: "isleme-amaci", label: "İşleme amacı" },
  { id: "hukuki-sebep", label: "Hukuki sebep" },
  { id: "18-alti", label: "18 yaş altı özel kurallar" },
  { id: "veri-escrow", label: "Veri escrow mimarisi" },
  { id: "aktarim", label: "Veri aktarımı" },
  { id: "haklariniz", label: "Haklarınız" },
  { id: "saklama", label: "Saklama süreleri" },
  { id: "iletisim", label: "İletişim" },
];

export default function KvkkPage() {
  return (
    <LegalPageShell
      kicker="KVKK"
      title="Kişisel verilerin korunması aydınlatma metni"
      lastUpdated="2026-04-24"
      effective="Kayıt onayından itibaren"
      toc={TOC}
    >
      <LegalSection id="veri-sorumlusu" number="01" title="Veri sorumlusu">
        <p>
          LiseUP Derneği (ve iktisadi işletmesi), 6698 sayılı Kişisel Verilerin
          Korunması Kanunu (KVKK) kapsamında veri sorumlusudur. VERBİS kayıt
          numarası Ağustos 2026'da dernek kuruluşuyla birlikte yayımlanacaktır.
        </p>
      </LegalSection>

      <LegalSection id="islenen-veriler" number="02" title="İşlenen kişisel veriler">
        <p>
          Platformda sunulan hizmet türüne göre aşağıdaki veri kategorileri
          işlenir:
        </p>
        <ul>
          <li>
            <strong>Liseli için:</strong> ad, soyad, doğum tarihi, e-posta, şifre
            hash, okul bilgisi, şehir, ilgi alanları, yetenekler, portfolyo
            linkleri, projeler, başvurular, mesajlar.
          </li>
          <li>
            <strong>Veli (18 altı için):</strong> ad, soyad, yakınlık derecesi,
            e-posta, opsiyonel TC (bağış vergi indirimi için).
          </li>
          <li>
            <strong>Okul temsilcisi için:</strong> ad, soyad, ünvan, iş e-postası,
            telefon, okul profil verileri.
          </li>
          <li>
            <strong>Kurum için:</strong> kurum adı, vergi/MERSIS numarası,
            yetkili ad-soyad, iş e-postası, telefon, faaliyet alanı.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="isleme-amaci" number="03" title="İşleme amacı">
        <ul>
          <li>Platform hizmetinin sunulması (kayıt, profil, proje, mesajlaşma)</li>
          <li>Eşleştirme algoritması (liseli ↔ proje, liseli ↔ fırsat)</li>
          <li>Okul raporlaması (sadece doğrulanmış öğrenciler, hassas olmayan veriler)</li>
          <li>Kurum keşif ve iletişim yönetimi</li>
          <li>Moderasyon ve güvenlik (risk skorlu içerik kontrolü)</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>
      </LegalSection>

      <LegalSection id="hukuki-sebep" number="04" title="Hukuki sebep">
        <p>
          Kişisel veriler, KVKK madde 5/2(c) "sözleşmenin kurulması veya ifası
          için gerekli olması" ve madde 5/2(e) "bir hakkın tesisi, kullanılması
          veya korunması için zorunlu olması" kapsamında işlenir. 18 yaş altı
          kullanıcılar için <strong>veli açık rızası</strong> alınır (KVKK md.
          5/1).
        </p>
      </LegalSection>

      <LegalSection id="18-alti" number="05" title="18 yaş altı için özel kurallar">
        <ul>
          <li>
            18 yaş altı kaydı için <strong>veli açık rızası zorunludur</strong>.
            Onay dijital imza (kutucuk + "onaylıyorum" butonu) ile alınır, noter
            şartı yoktur (KVKK yazılı beyan yeterlidir).
          </li>
          <li>
            Veli onayı gelene kadar veriler ana profile taşınmaz,{" "}
            <strong>şifreli veri escrow tablosunda</strong> bekler.
          </li>
          <li>
            72 saat içinde onay gelmezse kayıt otomatik olarak silinir.
          </li>
          <li>Veli istediği zaman hesabı iptal etme hakkına sahiptir.</li>
          <li>
            Soyad ve fotoğraf kurumlara varsayılan olarak kapalıdır. Yaş ve
            doğum tarihi kurumlara hiçbir zaman görünmez.
          </li>
          <li>
            Hassas fırsat (ruh sağlığı, inanç, kimlik temelli) başvuruları okul
            paneline mimari olarak düşmez.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="veri-escrow" number="06" title="Veri escrow mimarisi">
        <p>
          18 yaş altı kullanıcılar için veri escrow: kayıt verisi ayrı bir
          şifrelenmiş tabloda tutulur, profil aktive edilmez. Veli onayı
          gelmezse tablo 72 saatte otomatik temizlenir. Onay gelirse veri ana
          tabloya taşınır. Bu yaklaşım, KVKK "veri minimizasyonu" ilkesinin
          somut uygulamasıdır.
        </p>
      </LegalSection>

      <LegalSection id="aktarim" number="07" title="Veri aktarımı">
        <p>
          Kişisel veriler yalnızca aşağıdaki sınırlı kapsamda aktarılır:
        </p>
        <ul>
          <li>
            <strong>Yurt içi bulut sağlayıcı:</strong> Altyapı hizmeti için
            (barındırma, e-posta, dosya). Sözleşmeli ve VERBİS uyumlu.
          </li>
          <li>
            <strong>Moderasyon servisleri:</strong> OpenAI Moderation API (yalnızca
            otomatik içerik analizi, veri saklanmaz).
          </li>
          <li>
            <strong>Yasal taleplerle:</strong> Mahkeme veya yetkili kurum
            kararıyla.
          </li>
        </ul>
        <p>
          Yurt dışına veri aktarımı, kullanıcının açık rızası olmadan yapılmaz.
        </p>
      </LegalSection>

      <LegalSection id="haklariniz" number="08" title="KVKK madde 11 haklarınız">
        <ul>
          <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            İşlenme amacını ve bunların amacına uygun kullanılıp
            kullanılmadığını öğrenme
          </li>
          <li>
            Yurt içinde veya yurt dışında aktarılan üçüncü kişileri bilme
          </li>
          <li>
            Eksik veya yanlış işlenmişse düzeltilmesini isteme (ayarlardan
            doğrudan yapılabilir)
          </li>
          <li>
            Silme veya yok etme talep etme (ayarlar → hesabı sil, 30 gün
            içinde tam silme)
          </li>
          <li>
            <strong>Veri portabilitesi:</strong> profil, proje, mesaj, başvuru
            verilerini JSON + PDF formatında indirme (ayda 1 hak)
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="saklama" number="09" title="Saklama süreleri">
        <ul>
          <li>Aktif hesap verisi: kullanıcı silene kadar</li>
          <li>Mesajlar: 2 yıl</li>
          <li>Moderasyon kararları: 5 yıl (yasal gereklilik)</li>
          <li>Silinmiş hesap: 30 günlük geri dönüş penceresi + tam silme</li>
          <li>Yedekler: 90 gün rotasyon</li>
          <li>
            Veli onayı gelmeyen kayıtlar: 72 saat sonra otomatik silinir
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="iletisim" number="10" title="İletişim ve şikayet">
        <p>
          KVKK başvurularınız için{" "}
          <a
            href="mailto:kvkk@liseup.org"
            className="text-[var(--color-brand-500)] hover:underline"
          >
            kvkk@liseup.org
          </a>
          . Başvurular 30 gün içinde yanıtlanır. Sonuçtan memnun kalmazsanız
          Kişisel Verileri Koruma Kurumu'na şikayet hakkınız saklıdır.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
