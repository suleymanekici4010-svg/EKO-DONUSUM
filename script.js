
// ATIK AYRIŞTIRMA SİSTEMİ

function atikBul() {

    let secim = document.getElementById("atikSecimi").value;
    let sonuc = document.getElementById("atikSonuc");

    let atiklar = {
        kagit: "📄 Kağıt ve karton atıklar: Kağıt geri dönüşüm kutusuna atılmalıdır.",
        plastik: "🧴 Plastik şişeler: Plastik ambalaj atık kutusuna atılmalıdır.",
        cam: "🍾 Cam kavanozlar: Cam atık kumbarasına atılmalıdır.",
        metal: "🥫 Metal kutular: Metal ambalaj atık kutusuna atılmalıdır.",
        pil: "🔋 Atık piller: Özel atık pil toplama kutularına bırakılmalıdır.",
        organik: "🍎 Meyve ve sebze atıkları: Uygun organik atık veya kompost kutusuna bırakılabilir."
    };

    if (secim === "") {
        sonuc.innerHTML = "Lütfen öncelikle bir atık türü seçiniz!";
        sonuc.style.color = "red";
    } else {
        sonuc.innerHTML = atiklar[secim];
        sonuc.style.color = "#16834b";
    }
}


// GERİ DÖNÜŞÜM BİLGİ YARIŞMASI

const sorular = [
    {
        soru: "1. Geri dönüşümün temel amacı nedir?",
        cevaplar: [
            "Atıkları artırmak",
            "Doğal kaynakları korumak",
            "Enerji tüketimini artırmak"
        ],
        dogru: 1
    },
    {
        soru: "2. Atık piller nereye atılmalıdır?",
        cevaplar: [
            "Normal çöp kutusuna",
            "Kağıt kutusuna",
            "Atık pil toplama kutusuna"
        ],
        dogru: 2
    },
    {
        soru: "3. Geri dönüşümün faydalarından biri nedir?",
        cevaplar: [
            "Çevre kirliliğini azaltmak",
            "Doğal kaynakları tüketmek",
            "Atık miktarını artırmak"
        ],
        dogru: 0
    },
    {
        soru: "4. Aşağıdakilerden hangisi cam atıktır?",
        cevaplar: [
            "Gazete",
            "Cam kavanoz",
            "Plastik poşet"
        ],
        dogru: 1
    },
    {
        soru: "5. Organik atıklara hangisi örnektir?",
        cevaplar: [
            "Pil",
            "Cam şişe",
            "Meyve kabuğu"
        ],
        dogru: 2
    }
];

let soruIndex = 0;
let puan = 0;
let cevaplandi = false;


// SORUYU EKRANA GETİRME

function soruyuGoster() {

    let soru = sorular[soruIndex];

    document.getElementById("soruMetni").innerText = soru.soru;

    let cevapAlan = document.getElementById("cevaplar");

    cevapAlan.innerHTML = "";

    soru.cevaplar.forEach(function(cevap, index) {

        let buton = document.createElement("button");

        buton.innerText = cevap;

        buton.onclick = function() {
            cevapVer(index);
        };

        cevapAlan.appendChild(buton);

    });

    document.getElementById("yarismaSonuc").innerText = "";

    document.getElementById("sonrakiSoru").hidden = true;

    cevaplandi = false;
}


// CEVABI KONTROL ETME

function cevapVer(secilenCevap) {

    if (cevaplandi) {
        return;
    }

    cevaplandi = true;

    let soru = sorular[soruIndex];

    let butonlar = document.querySelectorAll("#cevaplar button");

    if (secilenCevap === soru.dogru) {

        puan += 20;

        document.getElementById("yarismaSonuc").innerText =
            "Tebrikler! Doğru cevap verdiniz. 🎉";

        document.getElementById("yarismaSonuc").style.color = "green";

    } else {

        document.getElementById("yarismaSonuc").innerText =
            "Yanlış cevap! Doğru cevap: " + soru.cevaplar[soru.dogru];

        document.getElementById("yarismaSonuc").style.color = "red";

    }

    butonlar.forEach(function(buton, index) {

        buton.disabled = true;

        if (index === soru.dogru) {
            buton.style.background = "#b9e8c4";
        }

    });

    document.getElementById("puan").innerText = "Puan: " + puan;

    if (soruIndex === sorular.length - 1) {

        document.getElementById("sonrakiSoru").innerText =
            "Yarışmayı Bitir";

    } else {

        document.getElementById("sonrakiSoru").innerText =
            "Sonraki Soru →";

    }

    document.getElementById("sonrakiSoru").hidden = false;

}


// SONRAKİ SORUYA GEÇME

function sonrakiSoru() {

    soruIndex++;

    if (soruIndex < sorular.length) {

        soruyuGoster();

    } else {

        document.getElementById("soruMetni").innerText =
            "Yarışma Tamamlandı! 🌱";

        document.getElementById("cevaplar").innerHTML = "";

        document.getElementById("yarismaSonuc").innerText =
            "Toplam puanınız: " + puan + " / 100";

        document.getElementById("sonrakiSoru").hidden = true;

        document.getElementById("puan").innerText =
            "Tebrikler, yarışmayı tamamladınız!";

        let yenidenBaslat = document.createElement("button");

        yenidenBaslat.innerText = "Yeniden Başla";

        yenidenBaslat.onclick = function() {

            soruIndex = 0;
            puan = 0;

            document.getElementById("puan").innerText = "Puan: 0";

            soruyuGoster();

        };

        document.getElementById("cevaplar").appendChild(yenidenBaslat);

    }

}


// SAYFA AÇILDIĞINDA İLK SORUYU GÖSTER

soruyuGoster();
