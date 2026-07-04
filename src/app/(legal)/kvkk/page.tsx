import { LegalLayout } from "@/components/shared/legal-layout"
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WEBSITE, DATA_OFFICER_NAME, KVKK_LAST_UPDATED } from "@/lib/kvkk"

export default function KVVKPage() {
  return (
    <LegalLayout title="KVKK Aydınlatma Metni" lastUpdated={KVKK_LAST_UPDATED}>
      <h2>1. Veri Sorumlusu ve Temsilcisi</h2>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel
        verileriniz aşağıda bilgileri yer alan {COMPANY_NAME} (&quot;Şirket&quot; veya &quot;Veri
        Sorumlusu&quot;) tarafından veri sorumlusu sıfatıyla işlenmektedir.
      </p>
      <ul>
        <li><strong>Şirket Unvanı:</strong> {COMPANY_NAME}</li>
        <li><strong>Adres:</strong> {COMPANY_ADDRESS}</li>
        <li><strong>E-posta:</strong> {COMPANY_EMAIL}</li>
        <li><strong>Telefon:</strong> {COMPANY_PHONE}</li>
        <li><strong>Web Sitesi:</strong> {COMPANY_WEBSITE}</li>
        <li><strong>Veri Sorumlusu Yetkilisi:</strong> {DATA_OFFICER_NAME}</li>
      </ul>

      <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
      <p>
        Kişisel verileriniz aşağıda belirtilen amaçlar doğrultusunda KVKK&apos;nın 5. ve 6.
        maddelerinde belirtilen kişisel veri işleme şartları dahilinde işlenmektedir:
      </p>
      <ul>
        <li>Hesap oluşturma ve kullanıcı kaydı işlemlerinin gerçekleştirilmesi</li>
        <li>Kullanıcıların ürün yükleme, düzenleme ve dışa aktarma işlemlerinin yürütülmesi</li>
        <li>Yapay zeka destekli görsel işleme ve içerik oluşturma hizmetlerinin sunulması</li>
        <li>Ödeme işlemlerinin gerçekleştirilmesi ve faturalandırma</li>
        <li>Müşteri desteği ve kullanıcı taleplerinin yanıtlanması</li>
        <li>Hizmet kalitesinin artırılması ve kullanıcı deneyiminin iyileştirilmesi</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi ve resmî mercilerle paylaşılması</li>
        <li>Kötüye kullanımın önlenmesi ve güvenliğin sağlanması</li>
      </ul>

      <h2>3. İşlenen Kişisel Veriler</h2>
      <p>
        Platformumuz kapsamında aşağıdaki kişisel verileriniz işlenebilmektedir:
      </p>
      <ul>
        <li><strong>Kimlik Verileri:</strong> Ad, soyad</li>
        <li><strong>İletişim Verileri:</strong> E-posta adresi, telefon numarası</li>
        <li><strong>Kullanıcı Hesap Verileri:</strong> Kullanıcı adı, şifre (hashlenmiş), profil fotoğrafı</li>
        <li><strong>İşlem Verileri:</strong> Proje görselleri, yapay zeka çıktıları, yükleme geçmişi</li>
        <li><strong>Ödeme Verileri:</strong> Fatura bilgileri, ödeme geçmişi (kredi kartı bilgileri saklanmaz)</li>
        <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı bilgileri, oturum kayıtları, log kayıtları</li>
        <li><strong>Pazarlama Verileri:</strong> Çerez tercihleri, kampanya katılım bilgileri</li>
      </ul>

      <h2>4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
      <p>
        Kişisel verileriniz; web sitemiz, mobil uygulamamız, çağrı merkezimiz, e-posta
        kanalları ve benzeri araçlar aracılığıyla otomatik veya kısmen otomatik yöntemlerle
        toplanmaktadır. Verileriniz aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
      </p>
      <ul>
        <li>Açık rızanız (pazarlama amaçlı işlemeler için)</li>
        <li>Sözleşmenin kurulması ve ifası (hesap oluşturma, hizmet sunumu)</li>
        <li>Hukuki yükümlülüklerin yerine getirilmesi (muhasebe, yasal saklama)</li>
        <li>Veri sorumlusunun meşru menfaati (güvenlik, hizmet kalitesi)</li>
      </ul>

      <h2>5. Kişisel Verilerin Aktarılması</h2>
      <p>
        Kişisel verileriniz, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen şartlar
        çerçevesinde aşağıdaki alıcı gruplarına aktarılabilir:
      </p>
      <ul>
        <li>
          <strong>Yurt İçi Aktarımlar:</strong> Hukuken yetkili kamu kurum ve
          kuruluşları, resmî merciler, iş ortaklarımız, tedarikçilerimiz (bulut
          altyapı sağlayıcıları, ödeme hizmet sağlayıcıları)
        </li>
        <li>
          <strong>Yurt Dışı Aktarımlar:</strong> Yapay zeka hizmet sağlayıcıları
          (OpenAI, Google, Replicate vb.), bulut depolama sağlayıcıları. Bu
          aktarımlar, KVKK&apos;nın 9. maddesi ve ilgili mevzuat kapsamında gerekli
          önlemler alınarak gerçekleştirilmektedir.
        </li>
      </ul>

      <h2>6. Veri Saklama Süreleri</h2>
      <p>
        Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili
        yasal mevzuatta öngörülen saklama süreleri kadar muhafaza edilmektedir:
      </p>
      <ul>
        <li>
          <strong>Hesap Verileri:</strong> Hesabın aktif olduğu süre boyunca + 3 yıl
        </li>
        <li>
          <strong>Proje Verileri:</strong> Proje silinene kadar + 1 yıl
        </li>
        <li>
          <strong>Ödeme Verileri:</strong> 10 yıl (Vergi Usul Kanunu gereği)
        </li>
        <li>
          <strong>Log Kayıtları:</strong> 2 yıl
        </li>
        <li>
          <strong>Çerez Verileri:</strong> 1 yıl
        </li>
      </ul>

      <h2>7. Veri Sahibinin Hakları</h2>
      <p>
        KVKK&apos;nın 11. maddesi uyarınca, veri sahibi olarak aşağıdaki haklara
        sahipsiniz:
      </p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
        <li>Düzeltme, silme veya yok etme işlemlerinin üçüncü kişilere bildirilmesini isteme</li>
        <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
        <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
      </ul>

      <h2>8. Veri Sahibi Başvuru Yöntemleri</h2>
      <p>
        Yukarıda belirtilen haklarınıza ilişkin başvurularınızı, KVKK&apos;nın 13.
        maddesi uyarınca aşağıdaki yöntemlerle iletebilirsiniz:
      </p>
      <ul>
        <li>
          <strong>E-posta:</strong> {COMPANY_EMAIL} adresine kayıtlı e-posta
          hesabınızdan göndereceğiniz bir e-posta ile
        </li>
        <li>
          <strong>Web Formu:</strong>{" "}
          <a href="/kvkk/veri-sahibi" className="text-primary hover:underline">
            Veri Sahibi Başvuru Formu
          </a>{" "}
          sayfamız üzerinden
        </li>
        <li>
          <strong>Posta:</strong> {COMPANY_ADDRESS} adresine ıslak imzalı
          dilekçe ile
        </li>
        <li>
          <strong>KEP:</strong> Kayıtlı Elektronik Posta adresinizden Şirket KEP
          adresimize ileteceğiniz bir elektronik posta ile
        </li>
      </ul>

      <h2>9. Veri Güvenliği</h2>
      <p>
        Kişisel verilerinizin güvenliğini sağlamak amacıyla KVKK&apos;nın 12. maddesi
        gereği aşağıdaki teknik ve idari tedbirler alınmaktadır:
      </p>
      <ul>
        <li>Veriler SSL/TLS şifreleme ile iletilir</li>
        <li>Şifreler bcrypt algoritması ile hashlenerek saklanır</li>
        <li>Sunucular 7/24 izlenir ve güvenlik duvarı ile korunur</li>
        <li>Düzenli penetrasyon testleri gerçekleştirilir</li>
        <li>Personel veri güvenliği konusunda eğitilir</li>
        <li>Veri ihlali durumunda KVKK&apos;nın 12. maddesi gereği bildirim yapılır</li>
      </ul>

      <h2>10. Otomatik Karar Verme ve Profil Oluşturma</h2>
      <p>
        Platformumuz, yapay zeka destekli görsel işleme ve içerik oluşturma
        hizmetleri sunmaktadır. Bu hizmetler kapsamında otomatik sistemler
        tarafından ürün görselleriniz işlenir. Ancak bu işlemler yalnızca
        talep ettiğiniz hizmetin sağlanması amacıyla gerçekleştirilir ve
        hakkınızda hukuki sonuç doğuran otomatik kararlar alınmaz.
      </p>

      <h2>11. Güncellemeler ve Değişiklikler</h2>
      <p>
        Bu aydınlatma metni, mevzuat değişiklikleri ve hizmetlerimizdeki
        güncellemeler doğrultusunda zaman zaman revize edilebilir.
        Değişiklikler, güncellenmiş metnin web sitemizde yayınlanmasıyla
        birlikte yürürlüğe girer. Önemli değişikliklerde kullanıcılarımıza
        e-posta yoluyla bildirim yapılacaktır.
      </p>

      <h2>12. İletişim</h2>
      <p>
        KVKK kapsamındaki soru, talep ve başvurularınız için bizimle
        iletişime geçebilirsiniz:
      </p>
      <ul>
        <li><strong>E-posta:</strong> {COMPANY_EMAIL}</li>
        <li><strong>Telefon:</strong> {COMPANY_PHONE}</li>
        <li><strong>Adres:</strong> {COMPANY_ADDRESS}</li>
      </ul>

      <p className="mt-10 text-xs text-muted-foreground border-t pt-6">
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ve ilgili
        mevzuat kapsamında hazırlanmıştır. Son güncelleme: {KVKK_LAST_UPDATED}
      </p>
    </LegalLayout>
  )
}
