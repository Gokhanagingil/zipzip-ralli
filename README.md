# ZıpZıp Ralli

[![Quality checks](https://github.com/Gokhanagingil/zipzip-ralli/actions/workflows/ci.yml/badge.svg)](https://github.com/Gokhanagingil/zipzip-ralli/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/Gokhanagingil/zipzip-ralli/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Gokhanagingil/zipzip-ralli/actions/workflows/deploy-pages.yml)

## [Oyunu oyna →](https://gokhanagingil.github.io/zipzip-ralli/)

10 yaş civarı çocuklar için hazırlanmış, telefon ve tablette yatay oynanan, çevrimdışı kurulabilen küçük bir PWA araba oyunudur.

## Oynanış

- Sol taraftaki direksiyonu sürükleyerek arabayı yönlendir.
- Sağ taraftaki **ZIPLA!** düğmesiyle engellerin üzerinden atla.
- Yıldız, halka ve şimşekleri topla.
- Koni, kasa, su birikintisi ve gizemli çorap puan kaybettirir.
- Garajdan üç gövde modeli ve altı renk seçilebilir.
- Klavyede `A/D` veya ok tuşları yön verir; `Space` zıplatır; `Esc` duraklatır.

Oyun; karakter veya görsel varlık kopyalamadan, parlak renkler, absürt nesneler, komik yüzler ve karışık-medya çizgi film enerjisi taşıyan özgün bir görsel dil kullanır.

## Yerelde çalıştırma

PWA özellikleri için dosyayı çift tıklamak yerine küçük bir web sunucusu kullanın:

```bash
npm run serve
```

Sonra `http://localhost:4173` adresini açın. Bağımlılık kurulumu gerekmez; yalnızca Python 3 kullanılır.

## Telefona veya tablete kurma

Oyun HTTPS üzerinden yayımlandığında:

- iPhone/iPad: Safari → Paylaş → **Ana Ekrana Ekle**.
- Android: Chrome → Menü → **Uygulamayı yükle** veya **Ana ekrana ekle**.

GitHub Pages, Cloudflare Pages, Netlify veya benzeri herhangi bir statik barındırma hizmeti yeterlidir. `index.html`, `manifest.webmanifest`, `sw.js` ve `icons/` klasörünü birlikte yayımlayın.

## Teknik yapı

- Tek sayfalık HTML5 Canvas oyunu
- Harici oyun motoru ve çalışma zamanı bağımlılığı yok
- Dokunma, klavye, titreşim ve Web Audio efektleri
- Yatay ekran yönlendirmesi, tam ekran ve PWA manifesti
- Service worker ile çevrimdışı kullanım
- Kişisel veri, hesap, reklam, izleme veya ağ tabanlı skor tablosu yok

## Doğrulama

```bash
npm test
```

Kaynak ve lisans değerlendirmesi için [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) dosyasına bakın.
