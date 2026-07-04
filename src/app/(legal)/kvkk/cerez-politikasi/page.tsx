import { LegalLayout } from "@/components/shared/legal-layout"
import { COMPANY_NAME, KVKK_LAST_UPDATED } from "@/lib/kvkk"

export default function CerezPolitikasiPage() {
  return (
    <LegalLayout title="Çerez Politikası" lastUpdated={KVKK_LAST_UPDATED}>
      <h2>1. Giriş</h2>
      <p>
        Bu Çerez Politikası, {COMPANY_NAME} (&quot;Şirket&quot;) tarafından işletilen
        web sitesinde kullanılan çerezler ve benzer teknolojilere ilişkin
        kullanıcıları bilgilendirmek amacıyla hazırlanmıştır.
      </p>

      <h2>2. Çerez Nedir?</h2>
      <p>
        Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla
        cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin
        düzgün çalışması, kullanıcı deneyiminin iyileştirilmesi ve site
        trafiğinin analiz edilmesi gibi amaçlarla kullanılır.
      </p>

      <h2>3. Çerez Türleri</h2>

      <h3>3.1. Zorunlu Çerezler</h3>
      <p>
        Bu çerezler, web sitemizin düzgün çalışması için gereklidir. Oturum
        açma, güvenlik ve site gezinimi gibi temel işlevleri sağlarlar. Bu
        çerezler devre dışı bırakılamaz.
      </p>

      <h3>3.2. Analitik Çerezler</h3>
      <p>
        Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığına dair anonim
        istatistikler toplar. Hangi sayfaların en çok ziyaret edildiğini,
        kullanıcıların sitede nasıl gezindiğini anlamamıza yardımcı olur. Tüm
        veriler anonimleştirilmiştir.
      </p>

      <h3>3.3. İşlevsel Çerezler</h3>
      <p>
        Bu çerezler, dil tercihi, tema seçimi gibi kullanıcı tercihlerini
        hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.
      </p>

      <h3>3.4. Pazarlama Çerezleri</h3>
      <p>
        Bu çerezler, ilgi alanlarınıza uygun reklamlar göstermek ve
        kampanyalarımızın etkinliğini ölçmek için kullanılır. Bu çerezler
        yalnızca açık rızanız ile kullanılır.
      </p>

      <h2>4. Kullandığımız Çerezler</h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Çerez Adı</th>
              <th className="px-4 py-3 text-left font-medium">Amaç</th>
              <th className="px-4 py-3 text-left font-medium">Süre</th>
              <th className="px-4 py-3 text-left font-medium">Tür</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 font-mono text-xs">sb-session</td>
              <td className="px-4 py-3">Kullanıcı oturumu yönetimi</td>
              <td className="px-4 py-3">Oturum</td>
              <td className="px-4 py-3">Zorunlu</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-mono text-xs">ai-commerce-theme</td>
              <td className="px-4 py-3">Tema tercihi (açık/koyu)</td>
              <td className="px-4 py-3">1 yıl</td>
              <td className="px-4 py-3">İşlevsel</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-mono text-xs">ai-commerce-cookie-consent</td>
              <td className="px-4 py-3">Çerez tercihlerinin kaydı</td>
              <td className="px-4 py-3">1 yıl</td>
              <td className="px-4 py-3">Zorunlu</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-mono text-xs">_ga</td>
              <td className="px-4 py-3">Google Analytics kullanıcı ayrımı</td>
              <td className="px-4 py-3">2 yıl</td>
              <td className="px-4 py-3">Analitik</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">_gid</td>
              <td className="px-4 py-3">Google Analytics oturum ayrımı</td>
              <td className="px-4 py-3">24 saat</td>
              <td className="px-4 py-3">Analitik</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Çerez Tercihlerinin Yönetilmesi</h2>
      <p>
        Çerez tercihlerinizi ilk ziyaretinizde görüntülenen çerez banner&apos;ı
        üzerinden yönetebilirsiniz. Ayrıca tarayıcı ayarlarınızdan tüm
        çerezleri engelleyebilir veya belirli çerez türlerine izin verebilirsiniz.
      </p>
      <p>
        Çerezleri devre dışı bırakmanız durumunda, web sitemizin bazı
        özellikleri düzgün çalışmayabilir. Tarayıcı bazında çerez yönetimi
        için aşağıdaki bağlantıları kullanabilirsiniz:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/tr/kb/cerezleri-silme-web-sitesi-bilgilerini-kaldirma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/tr-tr/microsoft-edge/taray-c-da-cerezleri-silme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>6. Üçüncü Taraf Çerezler</h2>
      <p>
        Web sitemizde, aşağıdaki üçüncü taraf hizmet sağlayıcıların
        çerezlerini kullanmaktayız:
      </p>
      <ul>
        <li><strong>Google Analytics:</strong> Kullanım istatistikleri</li>
        <li><strong>Supabase:</strong> Kimlik doğrulama ve oturum yönetimi</li>
        <li><strong>Stripe / iyzico:</strong> Ödeme işlemleri</li>
      </ul>

      <h2>7. Veri Aktarımı</h2>
      <p>
        Çerezler aracılığıyla toplanan kişisel verileriniz, KVKK&apos;nın 9.
        maddesi kapsamında gerekli güvenlik önlemleri alınarak yurt dışına
        aktarılabilir. Detaylı bilgi için{" "}
        <a href="/kvkk" className="text-primary hover:underline">
          KVKK Aydınlatma Metnimizi
        </a>{" "}
        inceleyebilirsiniz.
      </p>

      <h2>8. Güncellemeler</h2>
      <p>
        Bu Çerez Politikası, ihtiyaç duyulması halinde güncellenebilir.
        Güncellemeler web sitemizde yayınlandığı anda yürürlüğe girer.
      </p>

      <h2>9. İletişim</h2>
      <p>
        Çerez politikamız hakkında sorularınız için:
      </p>
      <ul>
        <li><strong>E-posta:</strong> kvkk@aicommerceos.com</li>
        <li><strong>Adres:</strong> Maslak Mahallesi, Büyükdere Caddesi, No:255, Maslak, Sarıyer, İstanbul</li>
      </ul>
    </LegalLayout>
  )
}
