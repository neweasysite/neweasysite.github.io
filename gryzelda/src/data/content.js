// @ts-nocheck
/* Tabele świata: questy, rekwizyty, klasy, skille, kolory terenu, dźwięk.
   To jest treść gry — tu się edytuje fabułę i liczby, nie rysowanie. */
import { api } from "../runtime/api.js";

function wn(target, key, value) {
  target[key] = value;
}

api.initData = function initData() {
  ((api.mk = "v1.4.5"),
    (api.T = 16),
    (api.oe = 320),
    (api.de = 180),
    (api.xi = !1),
    (api.zp = 30),
    (api.wp = 8),
    (api.Pf = 28),
    (api.Lf = 0));
  api.Kf = "gryzelda-rpg-save-v2";
  ((api.Qi = [
    {
      id: "kam1",
      name: "Teczka przetargowa",
      giver: "kamila",
      after: "kamMost",
      ask: "Pani Kamilo, co\u015B si\u0119 pali?",
      offer:
        "Pali si\u0119 termin! Wiatr porwa\u0142 mi teczk\u0119 z ofertami na remont drogi i pogna\u0142 j\u0105 na wsch\xF3d, przez ca\u0142\u0105 \u0141\u0105k\u0119 Czekania, a\u017C za rzek\u0119. Bez niej przetarg si\u0119 uniewa\u017Cni, a ja b\u0119d\u0119 pisa\u0107 pismo w sprawie pisma.",
      accept:
        "Teczka jest czerwona, gruba i ma piecz\u0105tk\u0119 \u201EPILNE\u201D. Czyli wygl\u0105da jak ka\u017Cda inna. Szukaj za rzek\u0105, wiatr wia\u0142 mocno, a ja krzycza\u0142am jeszcze mocniej.",
      prog: "Teczka wci\u0105\u017C w terenie. Termin wci\u0105\u017C p\u0142onie. Ja wci\u0105\u017C pij\u0119 kaw\u0119.",
      turn: "Oddaj teczk\u0119 przetargow\u0105",
      done: "Jest! Trzy oferty: jedna od firmy, jedna od glut\xF3w i jedna napisana kredk\u0105. Najta\u0144sza jest od glut\xF3w, wi\u0119c mamy problem. Masz 55 groszy, zas\u0142u\u017Cy\u0142a\u015B na premi\u0119 uznaniow\u0105.",
      reward: { c: 55, xp: 55 },
      steps: [
        {
          t: "item",
          z: 1,
          tx: 58,
          ty: 13,
          name: "Pusta ok\u0142adka teczki",
          ic: "okladka",
          hint: "\u0141\u0105ka Czekania: za rzek\u0105, na wschodzie",
          fin: "Sama ok\u0142adka! W \u015Brodku karteczka: \u201ETECZKA U NAS. GLUTY\u201D. Ob\u015Blimaczony \u015Blad prowadzi do Lasu Szept\xF3w, na po\u0142udnie.",
        },
        {
          t: "item",
          z: 2,
          tx: 40,
          ty: 32,
          name: "Teczka przetargowa",
          ic: "kam1",
          hint: "Las Szept\xF3w: po\u0142udnie, \u015Bladem glut\xF3w",
          fin: "Teczka! Troch\u0119 lepka, ale oferty w \u015Brodku. Gluty chcia\u0142y chyba z\u0142o\u017Cy\u0107 odwo\u0142anie. Wracaj do Pani Kamili.",
        },
      ],
    },
    {
      id: "kam2",
      name: "Protok\xF3\u0142 odbioru rob\xF3t",
      giver: "kamila",
      after: "kam1",
      ask: "Co\u015B jeszcze do za\u0142atwienia?",
      offer:
        "Pan Zdzisiek ko\u0144czy \u0142ata\u0107 drog\u0119. Potrzebuj\u0119 od niego protoko\u0142u odbioru rob\xF3t, podpisanego i ostemplowanego. P\xF3jdziesz? Ja nie mog\u0119, mam spotkanie w sprawie ustalenia terminu spotkania.",
      accept:
        "Zdzisiek kr\u0119ci si\u0119 przy drodze na zach\xF3d od stawu. Poznasz go po pomara\u0144czowej kamizelce i \u0142opacie, o kt\xF3r\u0105 si\u0119 opiera.",
      prog: "Czekam na protok\xF3\u0142. Bez niego droga jest naprawiona tylko teoretycznie.",
      turn: "Oddaj protok\xF3\u0142 odbioru",
      done: "Podpis jest, piecz\u0105tka jest, odcisk pachnie ticketem, ale jest. Dziura te\u017C jest, tylko teraz zgodnie z dokumentacj\u0105. Masz 70 groszy i punkt rozwoju.",
      reward: { c: 70, xp: 70, p: 1 },
      steps: [
        {
          t: "talk",
          to: "zdzich",
          ask: "Pani Kamila prosi o protok\xF3\u0142 odbioru",
          hint: "Pan Zdzisiek, Wioska (droga na zach\xF3d od stawu)",
          txt: "Protok\xF3\u0142 mam. Piecz\u0105tki nie mam. Po\u017Cyczy\u0142 j\u0105 Staszek z Zachodnich P\xF3l, bo chcia\u0142 ostemplowa\u0107 stracha na wr\xF3ble, \u017Ceby by\u0142 urz\u0119dowy. Odbierz j\u0105, bo bez piecz\u0105tki to nie protok\xF3\u0142, tylko wypracowanie.",
          ok: "Id\u0119 po piecz\u0105tk\u0119",
        },
        {
          t: "talk",
          to: "staszek",
          ask: "Pan Zdzisiek chce z powrotem piecz\u0105tk\u0119",
          hint: "Staszek, Zachodnie Pola Ticket\xF3w (zach\xF3d od Wioski)",
          txt: "Piecz\u0105tk\u0119? No w\u0142a\u015Bnie... Zjad\u0142 j\u0105 ticket. Taki bezczelny, lata\u0142 nad polem, po\u0142kn\u0105\u0142 i teraz stempluje wszystko, w co trafi. Rozgo\u0144 tickety, kt\xF3ry\u015B j\u0105 wypluje.",
          ok: "Rozgoni\u0119 tickety",
        },
        {
          t: "kill",
          kind: "ticket",
          z: 9,
          n: 3,
          at: [
            [10, 8],
            [30, 20],
            [42, 6],
          ],
          hint: "rozgo\u0144 tickety na Zachodnich Polach (kt\xF3ry\u015B ma piecz\u0105tk\u0119)",
          fin: "Brzd\u0119k! Ticket wyplu\u0142 piecz\u0105tk\u0119. Troch\u0119 o\u015Bliniona, ale stempluje. Zanie\u015B j\u0105 Panu Zdzi\u015Bkowi.",
        },
        {
          t: "talk",
          to: "zdzich",
          ask: "Mam piecz\u0105tk\u0119 od ticketa",
          hint: "Pan Zdzisiek, Wioska",
          txt: "Pac, pac, pac! Ostemplowane w trzech egzemplarzach. Odcisk wyszed\u0142 w kszta\u0142cie ticketa, ale urz\u0119dowo wa\u017Cny. Prosz\u0119 zanie\u015B\u0107 Pani Kamili, zanim zmieni wz\xF3r formularza.",
          ok: "Zanios\u0119",
        },
      ],
    },
    {
      id: "kam3",
      name: "Wniosek o dofinansowanie",
      giver: "kamila",
      after: "kam2",
      ask: "Mam jeszcze si\u0142\u0119 na papierologi\u0119",
      offer:
        "Pierwszy most Zdzicha stoi na głównej drodze. Wschodnia, ta niższa, dalej jest wodą. Składam wniosek, żeby i tam poszły deski, bez szukania ich po łące. Potrzebuję trzech załączników: opinii Naczelnika Piotra, harmonogramu od zegarmistrza Horacego z wieży i opinii środowiskowej od Pustelnika Mirka z Bagien. Potem komisja zada pytania kontrolne, a ja mam już za mało kawy we krwi.",
      accept:
        "Kolejno\u015B\u0107 dowolna, byle wszystkie trzy. Mirek mieszka na Po\u0142udniowych Bagnach i rozmawia z lud\u017Ami raz w roku. Masz szcz\u0119\u015Bcie, ten rok jeszcze trwa.",
      prog: "Za\u0142\u0105czniki: {s}/3. Komisja czeka. Ja czekam na kaw\u0119.",
      quiz: [
        {
          q: "Pytanie 1: Ile piecz\u0105tek potrzeba na wniosek o wydanie piecz\u0105tki?",
          a: ["Jedna", "Dwie, w tym jedna na samej piecz\u0105tce", "Zero, wystarczy u\u015Bmiech"],
          ok: 1,
        },
        {
          q: "Pytanie 2: Termin sk\u0142adania ofert mija w pi\u0105tek o 15:00. Kiedy wp\u0142ynie pierwsza oferta?",
          a: ["W poniedzia\u0142ek rano", "W pi\u0105tek o 14:59", "Nigdy"],
          ok: 1,
        },
        {
          q: "Pytanie 3: Co robimy, gdy przetarg wygra\u0142 glut?",
          a: [
            "Podpisujemy umow\u0119, gluty s\u0105 tanie",
            "Sprawdzamy, czy spe\u0142nia warunki, a potem go rozlewamy",
            "Uciekamy przez okno",
          ],
          ok: 1,
        },
      ],
      wrong:
        "Komisja kr\u0119ci nosem. Spr\xF3bujmy jeszcze raz od pocz\u0105tku, tym razem z kaw\u0105.",
      turn: "Mam za\u0142\u0105czniki, czas na komisj\u0119",
      done: "Wniosek przyjęty. Na wschodniej drodze, tej niższej, stoi drugi most. Desek drugi raz nie nosisz, papier je położył. Masz 90 groszy i punkt. Awansowałaś na moją ulubioną petentkę.",
      reward: { c: 90, xp: 90, p: 1 },
      steps: [
        {
          t: "talk",
          to: "piotr",
          ask: "Opinia Naczelnika do wniosku Pani Kamili",
          hint: "Naczelnik Piotr, Wioska (zach\xF3d)",
          txt: "Opinia? Pozytywna. Pod warunkiem, \u017Ce most nie b\u0119dzie prowadzi\u0142 prosto do mnie, bo zaraz wszyscy b\u0119d\u0105 przychodzi\u0107 po po\u017Cyczk\u0119. Podpisane.",
          ok: "Dzi\u0119kuj\u0119",
        },
        {
          t: "talk",
          to: "horacy",
          ask: "Harmonogram budowy mostu do wniosku",
          hint: "Zegarmistrz Horacy, Wie\u017Ca Zegarowa w Wiosce",
          txt: "Harmonogram: most powstanie, zanim ten zegar si\u0119 sp\xF3\u017Ani. Czyli nigdy, bo m\xF3j zegar si\u0119 nie sp\xF3\u017Ania. To inni si\u0119 spiesz\u0105. Wpisz \u201Ew terminie\u201D, komisje to lubi\u0105.",
          ok: "Wpisz\u0119",
        },
        {
          t: "talk",
          to: "mirek",
          ask: "Opinia \u015Brodowiskowa do wniosku o most",
          hint: "Pustelnik Mirek, Po\u0142udniowe Bagna SLA",
          txt: "Most nad \u0141\u0105k\u0105? \u017Baby nie protestuj\u0105. Ja protestuj\u0119, ale z zasady, wi\u0119c si\u0119 nie liczy. Podpisuj\u0119 li\u015Bciem \u0142opianu. Jest wodoodporny.",
          ok: "Dzi\u0119ki, panie Mirku",
        },
      ],
    },
    {
      id: "kam4",
      name: "Kontrola z RIO",
      giver: "kamila",
      after: "kam3",
      gate: ["seal"],
      ask: "Pani Kamilo, czemu pani tak blado?",
      offer:
        "Bo Regionalna Izba Obrachunkowa przys\u0142a\u0142a kontrolera do naszego dofinansowania. Przyjecha\u0142 wczoraj, poszed\u0142 \u201Eobejrze\u0107 teren\u201D i nie wr\xF3ci\u0142. Naczelnik Piotr podobno widzia\u0142, dok\u0105d szed\u0142. Jak kontroler zaginie, to kontrola trwa wiecznie. A ja mam urlop w sierpniu.",
      accept:
        "Uwa\u017Caj na niego. Na szkoleniach m\xF3wili, \u017Ce kontrolerzy z RIO po trzech dniach w terenie dziczej\u0105.",
      prog: "Kontroler dalej w terenie. Kontrola dalej trwa. M\xF3j urlop dalej si\u0119 oddala.",
      turn: "Oddaj protok\xF3\u0142 pokontrolny",
      done: "\u201EBez zastrze\u017Ce\u0144\u201D! Piecz\u0105tka troch\u0119 krzywa, ale to tylko dodaje autentyczno\u015Bci. Masz 120 groszy i punkt. I moj\u0105 dozgonn\u0105 wdzi\u0119czno\u015B\u0107, w trzech egzemplarzach.",
      reward: { c: 120, xp: 150, p: 1 },
      steps: [
        {
          t: "talk",
          to: "piotr",
          ask: "Widzia\u0142 pan kontrolera z RIO?",
          hint: "Naczelnik Piotr, Wioska (zach\xF3d)",
          txt: "Kontroler? Pyta\u0142, gdzie trzymamy najstarsze dokumenty. Powiedzia\u0142em, \u017Ce w Ruinach Kolejki, bo tam le\u017C\u0105 zg\u0142oszenia z poprzedniej epoki. Poszed\u0142 i m\xF3wi\u0142 do siebie: \u201EWszystko skontroluj\u0119\u201D. Ruiny chyba odpowiedzia\u0142y. We\u017A co\u015B mocniejszego ni\u017C kawa.",
          ok: "Id\u0119 do Ruin",
        },
        {
          t: "kill",
          kind: "shield",
          z: 4,
          n: 1,
          at: [[27, 22]],
          elite: "Kontroler z RIO",
          hint: "pokonaj Kontrolera z RIO w Ruinach Kolejki (elitarny!)",
          fin: "Kontroler z RIO pada, wci\u0105\u017C \u015Bciskaj\u0105c piecz\u0105tk\u0119 \u201ENIEPRAWID\u0141OWO\u015ACI\u201D. Z segregatora wysun\u0105\u0142 si\u0119 protok\xF3\u0142 pokontrolny.",
        },
        {
          t: "item",
          z: 4,
          tx: 27,
          ty: 22,
          name: "Protok\xF3\u0142 pokontrolny",
          ic: "okladka",
          hint: "Ruiny Kolejki: tam, gdzie pad\u0142 Kontroler",
          fin: "Protok\xF3\u0142! Na ostatniej stronie: \u201EBez zastrze\u017Ce\u0144. Prosz\u0119 ju\u017C mnie nie bi\u0107\u201D. Zanie\u015B go Pani Kamili.",
        },
      ],
    },
    {
      id: "kam5",
      name: "Wykonawca Widmo",
      giver: "kamila",
      after: "kam4",
      gate: ["undead"],
      ask: "Co\u015B nowego w referacie?",
      offer:
        "Firma, która miała zamienić deski Zdzicha na prawdziwy most, wzięła zaliczkę i zniknęła. Kurier Darek mówi, że polecone do nich wracają z Krainy Nieumarłego Supportu z dopiskiem „adresat nieumarły”. Odzyskaj zaliczkę. Albo chociaż fakturę. Albo chociaż długopis.",
      accept:
        "Konkretnie: koperta z zaliczk\u0105, \u017Cadnych aneks\xF3w, \u017Cadnych \u201Eto ju\u017C na dniach\u201D. Tak, wiem, \u017Ce idziesz do nieumar\u0142ych. Zaliczka sama si\u0119 nie rozliczy.",
      prog: "Zaliczka dalej w za\u015Bwiatach. Ksi\u0119gowa dalej patrzy na mnie tak, jakbym to ja j\u0105 wyda\u0142a.",
      turn: "Oddaj odzyskan\u0105 zaliczk\u0119",
      done: "Ca\u0142a koperta?! Pierwsza odzyskana zaliczka w historii gminy. Ksi\u0119gowa si\u0119 pop\u0142aka\u0142a. Masz 150 groszy i punkt. Opowiadaj wszystko, mam pi\u0119\u0107 minut. No dobra, dziesi\u0119\u0107.",
      reward: { c: 150, xp: 200, p: 1 },
      steps: [
        {
          t: "talk",
          to: "darek",
          ask: "Gdzie si\u0119 podzia\u0142 wykonawca mostu?",
          hint: "Kurier Darek, Wioska",
          txt: "Wykonawca? Odsy\u0142aj\u0105 mi polecone z Krainy Nieumar\u0142ych. Ostatnie z dopiskiem \u201Eprace w toku od 2009\u201D. Siedzi tam na wsch\xF3d od \u015Bcie\u017Cki i straszy petent\xF3w harmonogramem. Jak go spotkasz, nie podpisuj \u017Cadnego aneksu.",
          ok: "Nie podpisz\u0119",
        },
        {
          t: "kill",
          kind: "zombie",
          z: 13,
          n: 1,
          at: [[24, 12]],
          elite: "Wykonawca Widmo",
          hint: "pokonaj Wykonawc\u0119 Widmo w Krainie Nieumar\u0142ych (elitarny!)",
          fin: "Wykonawca Widmo rozpada si\u0119, j\u0119cz\u0105c \u201Etermin by\u0142 orientacyjny...\u201D. Na ziemi zosta\u0142a koperta.",
        },
        {
          t: "item",
          z: 13,
          tx: 24,
          ty: 12,
          name: "Koperta z zaliczk\u0105",
          ic: "moneta",
          hint: "Kraina Nieumar\u0142ych: tam, gdzie straszy\u0142 Wykonawca",
          fin: "Zaliczka, prawie ca\u0142a. Brakuje tylko na kaw\u0119, kt\xF3r\u0105 Widmo pi\u0142o na budowie. Pan Zdzisiek powinien to zobaczy\u0107, zanim uwierzy.",
        },
        {
          t: "talk",
          to: "zdzich",
          ask: "Panie Zdzisiu, odzyska\u0142am zaliczk\u0119!",
          hint: "Pan Zdzisiek, Wioska",
          txt: "Zaliczka? Odzyskana? W gminie? Pierwszy raz od czas\xF3w, kiedy \u0142opaty by\u0142y z drewna. (Opiera si\u0119 mocniej o \u0142opat\u0119 ze wzruszenia.) Le\u0107 z tym do Pani Kamili, zanim kto\u015B og\u0142osi przetarg na jej wydanie.",
          ok: "Lec\u0119",
        },
      ],
    },
    {
      id: "kam6",
      name: "Odbi\xF3r ko\u0144cowy",
      giver: "kamila",
      after: "kam5",
      ask: "Co dalej po tej zaliczce?",
      offer:
        "Most ma nowego wykonawc\u0119, teraz odbi\xF3r ko\u0144cowy. Komisja przys\u0142a\u0142a Rzeczoznawc\u0119 i Inspektora Nadzoru. Problem: obaj pomylili teren budowy z poligonem i atakuj\u0105 wszystko, co ma kask. I wszystko, co go nie ma. Rzeczoznawca szar\u017Cuje po Zachodnich Polach, Inspektor okopa\u0142 si\u0119 na Bagnach SLA.",
      accept:
        "Przekonaj ich do podpisu. Delikatnie, ale skutecznie. Jak w urz\u0119dzie, tylko z wi\u0119ksz\u0105 liczb\u0105 siniak\xF3w.",
      prog: "Odbi\xF3r ko\u0144cowy: {s}/2 podpis\xF3w. Most czeka. Ja czekam. Kawa stygnie.",
      turn: "Oba podpisy s\u0105!",
      done: "Odbi\xF3r ko\u0144cowy bez uwag! Most oficjalnie istnieje, nie tylko w kosztorysie. Masz 200 groszy i dwa punkty. A teraz siadaj i m\xF3w, co u ciebie. Tak normalnie, po kole\u017Ce\u0144sku.",
      reward: { c: 200, xp: 260, p: 2 },
      steps: [
        {
          t: "kill",
          kind: "charger",
          z: 9,
          n: 1,
          at: [[30, 14]],
          elite: "Rzeczoznawca Szar\u017Cuj\u0105cy",
          hint: "pokonaj Rzeczoznawc\u0119 Szar\u017Cuj\u0105cego na Zachodnich Polach (elitarny!)",
          fin: "Rzeczoznawca hamuje w bru\u017Adzie i podpisuje wycen\u0119: \u201Eboli bardzo, warto\u015B\u0107 rynkowa: du\u017Ca\u201D. Teraz Inspektor Nadzoru na Po\u0142udniowych Bagnach SLA.",
        },
        {
          t: "kill",
          kind: "shield",
          z: 11,
          n: 1,
          at: [[18, 20]],
          elite: "Inspektor Nadzoru",
          hint: "pokonaj Inspektora Nadzoru na Po\u0142udniowych Bagnach (elitarny!)",
          fin: "Inspektor sk\u0142ada tarcz\u0119 i podpisuje odbi\xF3r: \u201EBez uwag. Prosz\u0119 ju\u017C nie nadzorowa\u0107 mnie broni\u0105\u201D. Wracaj do Pani Kamili.",
        },
      ],
    },
    {
      id: "zdz1",
      name: "Zaginiony pacho\u0142ek",
      giver: "zdzich",
      after: "kamMost",
      ask: "Czemu pan tak smutno patrzy na drog\u0119?",
      offer:
        "Bo zgubi\u0142em pacho\u0142ek! Pomara\u0144czowy, w paski, jedyny w gminie. Gluty go wytoczy\u0142y w stron\u0119 Lasu Szept\xF3w. Grzybiarz Edek tam \u0142azi od \u015Bwitu, mo\u017Ce co\u015B widzia\u0142. Bez pacho\u0142ka wszyscy wpadaj\u0105 w dziur\u0119.",
      accept:
        "Edek zbiera grzyby w zachodniej cz\u0119\u015Bci lasu. Jak co\u015B wie, to powie. Jak nie wie, to te\u017C powie, tylko d\u0142u\u017Cej.",
      prog: "Pacho\u0142ek dalej w terenie, dziura dalej w drodze, a ja dalej oparty o \u0142opat\u0119.",
      turn: "Oddaj pacho\u0142ek",
      done: "M\xF3j pacho\u0142ek! Pachnie piwnic\u0105 i glutem. Masz 50 groszy. I nie m\xF3w nikomu, \u017Ce \u0142opata to m\xF3j g\u0142\xF3wny element konstrukcyjny.",
      reward: { c: 50, xp: 55 },
      steps: [
        {
          t: "talk",
          to: "edek",
          ask: "Widzia\u0142 pan pomara\u0144czowy pacho\u0142ek?",
          hint: "Grzybiarz Edek, Las Szept\xF3w (zach\xF3d)",
          txt: "Widzia\u0142em! Gluty toczy\u0142y go przez las a\u017C do chaty na p\xF3\u0142nocnym wschodzie. Chyba chc\u0105 z niego zrobi\u0107 czapk\u0119 dla Kr\xF3la. Szukaj pod chat\u0105, w korzeniach. Gluty lubi\u0105 piwnice, tam jest wilgotno i nikt nie sprz\u0105ta.",
          ok: "Sprawdz\u0119 pod chat\u0105",
        },
        {
          t: "item",
          z: 34,
          tx: 7,
          ty: 6,
          name: "Pacho\u0142ek drogowy",
          ic: "zdz1",
          hint: "Korzenie pod Chat\u0105 w Lesie (Las Szept\xF3w, p\xF3\u0142nocny wsch\xF3d)",
          fin: "Pacho\u0142ek! Kto\u015B mu domalowa\u0142 oczy. Wracaj do Pana Zdzi\u015Bka.",
        },
      ],
    },
    {
      id: "gra1",
      name: "Szarlotka na zgod\u0119",
      giver: "grazyna",
      ask: "Pani Gra\u017Cyno, potrzebuje pani czego\u015B?",
      offer:
        "Pok\u0142\xF3ci\u0142am si\u0119 z kuzynk\u0105 Halin\u0105 z Lasu o przepis na szarlotk\u0119. Upiek\u0119 jej na zgod\u0119, ale brakuje mi dzikich jab\u0142ek z po\u0142udnia \u0141\u0105ki Czekania i szczypty cynamonu od Igi z Apteki. Potem zaniesiesz j\u0105 Halinie. Do Lasu. Daleko. I nie podjadaj, policz\u0119 kawa\u0142ki.",
      accept:
        "Jab\u0142onka ro\u015Bnie na samym po\u0142udniu \u0141\u0105ki. Iga ma aptek\u0119 w Wiosce, przy g\u0142\xF3wnej drodze. Kolejno\u015B\u0107 nie gra roli, byle jab\u0142ka nie by\u0142y od glut\xF3w.",
      prog: "Szarlotka czeka na sk\u0142adniki. Ja czekam na pochwa\u0142y.",
      turn: "Halina przyj\u0119\u0142a szarlotk\u0119",
      done: "Zgoda? I powiedzia\u0142a, \u017Ce jej przepis lepszy? To znaczy, \u017Ce jej smakowa\u0142o. Masz 60 groszy i punkt. I plotk\u0119: Pan Zdzisiek ma podobno pacho\u0142ek z certyfikatem.",
      reward: { c: 60, xp: 60, p: 1 },
      steps: [
        {
          t: "item",
          z: 1,
          tx: 20,
          ty: 29,
          name: "Dzikie jab\u0142ka",
          ic: "jablka",
          hint: "\u0141\u0105ka Czekania: samo po\u0142udnie",
          fin: "Kosz dzikich jab\u0142ek. Kwa\u015Bne jak mina Pani Kamili przed kaw\u0105. Teraz cynamon od Igi z Apteki.",
        },
        {
          t: "talk",
          to: "iga",
          ask: "Gra\u017Cyna prosi o szczypt\u0119 cynamonu",
          hint: "Iga, Apteka w Wiosce",
          txt: "Cynamon? Mam. Leczy, rozgrzewa i ko\u0144czy k\u0142\xF3tnie rodzinne. Nie wszystkie, ale te o szarlotk\u0119 zawsze. Pozdr\xF3w Gra\u017Cyn\u0119 i powiedz, \u017Ce nie sprzedaj\u0119 plotek na recept\u0119.",
          ok: "Bior\u0119 cynamon",
        },
        {
          t: "talk",
          to: "grazyna",
          ask: "Mam jab\u0142ka i cynamon",
          hint: "Gra\u017Cyna, Wioska (przy karczmie)",
          txt: "Pieczemy! (Czterdzie\u015Bci minut i trzy plotki p\xF3\u017Aniej.) Gotowe! Ciep\u0142a, z kruszonk\u0105. Zanie\u015B Halinie do Lasu Szept\xF3w. Jej chata jest na wschodzie. Nie biegaj z ni\u0105 po krzakach.",
          ok: "Nios\u0119 do Haliny",
        },
        {
          t: "talk",
          to: "halina",
          ask: "Szarlotka na zgod\u0119 od Gra\u017Cyny",
          hint: "Wied\u017Ama Halina, Las Szept\xF3w (wsch\xF3d)",
          txt: "Od Gra\u017Cynki? Hmpf. Z kruszonk\u0105? ...No dobra. Zgoda. Ale przepis i tak mam lepszy. Powiedz jej to delikatnie. Albo wcale.",
          ok: "Przeka\u017C\u0119... delikatnie",
        },
      ],
    },
    {
      id: "gra2",
      name: "Plotka obiegowa",
      giver: "grazyna",
      after: "gra1",
      ask: "Ma pani co\u015B nowego?",
      offer:
        "Mam! Bogdan farbuje brod\u0119. Na bia\u0142o. \u017Beby wygl\u0105da\u0107 m\u0105drzej. Rozpu\u015B\u0107 to: Ola na \u0141\u0105ce, Edek w Lesie, Staszek na Zachodnich Polach. Potem wr\xF3\u0107 i powiedz, w jakiej wersji plotka do mnie wr\xF3ci\u0142a. To naukowy eksperyment.",
      accept: "M\xF3w z przekonaniem. Plotka bez przekonania to tylko informacja.",
      prog: "Plotka obieg\u0142a {s}/3 s\u0142uchaczy. Czekam, a\u017C wr\xF3ci z odsetkami.",
      turn: "Plotka obieg\u0142a okolic\u0119",
      done: "Wr\xF3ci\u0142a do mnie wersja, \u017Ce to JA farbuj\u0119 brod\u0119. Ja nie mam brody! ...Prawda? Dobra, nauka wymaga ofiar. Masz 45 groszy.",
      reward: { c: 45, xp: 60 },
      steps: [
        {
          t: "talk",
          to: "ola",
          ask: "S\u0142ysza\u0142a\u015B, \u017Ce Bogdan farbuje brod\u0119?",
          hint: "Pasterka Ola, \u0141\u0105ka Czekania",
          txt: "Bogdan? Brod\u0119? Na bia\u0142o? Nie wierz\u0119! ...Powiem owcom. Owce powiedz\u0105 baranowi. Baran nikomu, bo nie odpowiada. Jak support.",
          ok: "Id\u0119 dalej",
        },
        {
          t: "talk",
          to: "edek",
          ask: "S\u0142ysza\u0142 pan, \u017Ce Bogdan farbuje brod\u0119?",
          hint: "Grzybiarz Edek, Las Szept\xF3w",
          txt: "Farbuje? Pewnie grzybami! Bia\u0142y... to musi by\u0107 purchawka. Powiem so\u015Bnie, ona zna wszystkich.",
          ok: "Super, dzi\u0119ki",
        },
        {
          t: "talk",
          to: "staszek",
          ask: "S\u0142ysza\u0142e\u015B, \u017Ce Bogdan farbuje brod\u0119?",
          hint: "Staszek, Zachodnie Pola Ticket\xF3w",
          txt: "Bogdan? My\u015Bla\u0142em, \u017Ce to Gra\u017Cyna farbuje! Zaraz... a mo\u017Ce farbuje si\u0119 broda Bogdana na Gra\u017Cyn\u0119? Niewa\u017Cne, przeka\u017C\u0119 dalej. Ticketom te\u017C.",
          ok: "Wracam do Gra\u017Cyny",
        },
      ],
    },
    {
      id: "fil2",
      name: "Pi\u0142ka w kropki",
      giver: "filip",
      ask: "Czemu masz tak\u0105 min\u0119?",
      offer:
        "Kopn\u0105\u0142em pi\u0142k\u0119 tak mocno, \u017Ce przelecia\u0142a przez ca\u0142\u0105 \u0141\u0105k\u0119! My\u015Bliwy Zenek wszystko widzi, bo siedzi w krzakach ca\u0142ymi dniami. Zapytaj go. Mama m\xF3wi, \u017Ce jak jej nie znajd\u0119, now\u0105 dostan\u0119 dopiero na urodziny. A urodziny s\u0105 za STO dni.",
      accept:
        "Jest czerwona w bia\u0142e kropki. Gluty si\u0119 jej boj\u0105, bo my\u015Bl\u0105, \u017Ce to muchomor.",
      prog: "Pi\u0142ka dalej w \u015Bwiecie. Do urodzin zosta\u0142o sto dni minus jeden.",
      turn: "Oddaj pi\u0142k\u0119",
      done: "MOJA PI\u0141KA! Nadgryziona, ale moja! Jeste\u015B najlepsza! Masz 20 groszy i punkt rozwoju. Taki prawdziwy, z gry.",
      reward: { c: 20, xp: 50, p: 1 },
      steps: [
        {
          t: "talk",
          to: "zenek",
          ask: "Widzia\u0142 pan czerwon\u0105 pi\u0142k\u0119 w kropki?",
          hint: "My\u015Bliwy Zenek, \u0141\u0105ka Czekania (po\u0142udniowy wsch\xF3d)",
          txt: "Widzia\u0142em. Nietoperz j\u0105 porwa\u0142 do Lasu Szept\xF3w, my\u015Bla\u0142, \u017Ce to muchomor z bonusem. Te nietoperze to banda. Przego\u0144 kilka, to reszta wypu\u015Bci \u0142up.",
          ok: "Przegoni\u0119 nietoperze",
        },
        {
          t: "kill",
          kind: "bat",
          z: 2,
          n: 3,
          at: [
            [20, 11],
            [35, 23],
            [10, 30],
          ],
          hint: "przego\u0144 nietoperze w Lesie Szept\xF3w",
          fin: "Ostatni nietoperz pisn\u0105\u0142 i upu\u015Bci\u0142 co\u015B czerwonego. Polecia\u0142o na p\xF3\u0142nocny wsch\xF3d lasu!",
        },
        {
          t: "item",
          z: 2,
          tx: 50,
          ty: 4,
          name: "Pi\u0142ka w kropki",
          ic: "fil2",
          hint: "Las Szept\xF3w: p\xF3\u0142nocny wsch\xF3d",
          fin: "Pi\u0142ka! Lekko nadgryziona, ale wci\u0105\u017C okr\u0105g\u0142a. Wracaj do Filipa.",
        },
      ],
    },
    {
      id: "fil1",
      name: "Zagadki Filipa",
      giver: "filip",
      after: "fil2",
      gate: ["seal"],
      ask: "A co teraz, jak piłka wróciła?",
      offer:
        "Mia\u0142em! Ca\u0142a ksi\u0119ga zagadek taty. Ale tata zgubi\u0142 j\u0105 w Ruinach Kolejki, jak ucieka\u0142 przed zg\u0142oszeniem, kt\xF3re go goni\u0142o. Przyniesiesz? Wtedy zadam ci trzy najtrudniejsze i dostaniesz moje najcenniejsze grosze.",
      accept:
        "Ruiny s\u0105 na p\xF3\u0142noc od Wioski, za t\u0105 bram\u0105 z Piecz\u0119ci\u0105. Ksi\u0119ga ma \u017C\xF3\u0142t\u0105 ok\u0142adk\u0119 i pachnie strachem.",
      prog: "Jak znajdziesz księgę, przeczytaj okładkę. Tata pożyczał kartki i nie mówił komu.",
      quiz: [
        {
          q: "Co ma z\u0119by, ale nie gryzie?",
          a: ["Grzebie\u0144", "Glut", "Pani Kamila przed kaw\u0105"],
          ok: 0,
        },
        {
          q: "Co biegnie, chocia\u017C nie ma n\xF3g?",
          a: ["Kolejka do supportu", "Czas", "Mruczek po kie\u0142bas\u0119"],
          ok: 1,
        },
        {
          q: "Im wi\u0119cej z niej zabierasz, tym wi\u0119ksza si\u0119 robi. Co to?",
          a: ["Dziura w drodze", "Kupka grzyb\xF3w", "Kiesze\u0144 Mietka"],
          ok: 0,
        },
      ],
      wrong:
        "Hahaha, nie! Od pocz\u0105tku. M\xF3j tata te\u017C za pierwszym razem nie zgad\u0142.",
      turn: "Mam ksi\u0119g\u0119, dawaj zagadki",
      done: "Wszystkie dobrze! Jeste\u015B m\u0105drzejsza od mojego taty, ale nie m\xF3w mu. Masz 40 groszy, to ca\u0142y m\xF3j maj\u0105tek plus kieszonkowe na przysz\u0142y miesi\u0105c.",
      reward: { c: 40, xp: 60 },
      steps: [
        {
          t: "item",
          z: 4,
          tx: 30,
          ty: 22,
          name: "Ksi\u0119ga Zagadek",
          ic: "ksiega",
          hint: "Ruiny Kolejki Zg\u0142osze\u0144: g\u0142\xF3wny hol",
          fin: "Na okładce stoi: „Pożyczone Zbyszkowi na rymy”. Ostatniej strony nie ma w księdze — to stąd wiadomo, że ma ją bard z karczmy.",
        },
        {
          t: "talk",
          to: "zbyszek",
          ask: "Na okładce księgi taty: „Pożyczone Zbyszkowi na rymy”. Masz tę stronę?",
          hint: "Napis na okładce księgi wskazuje barda Zbyszka, Karczma w Wiosce",
          txt: "A, ta dedykacja na okładce! Pożyczyłem ostatnią stronę na rymy i użyłem jej jako podkładki pod kufel. Rymy wyszły mokre, ale ładne. Proszę — tylko nie czytaj na głos, bo rymuje się z „glut”.",
          ok: "Dzi\u0119ki, Zbyszku",
        },
      ],
    },
    {
      id: "dar1",
      name: "Paczka bez adresu",
      giver: "darek",
      ask: "Pan kurier? Co si\u0119 sta\u0142o?",
      offer:
        "Mam paczk\u0119 bez adresu, czyli tak\u0105, kt\xF3ra dostarcza si\u0119 sama. No i si\u0119 dostarczy\u0142a, gdzie\u015B na Zachodnie Pola Ticket\xF3w. Status w systemie: \u201EPaczka w drodze\u201D. Od trzech tygodni. Znajd\u017A chocia\u017C awizo, to b\u0119d\u0119 wiedzia\u0142, gdzie jej szuka\u0107.",
      accept:
        "Awizo zostawiam zwykle w najdziwniejszym miejscu. Na Polach to pewnie gdzie\u015B na po\u0142udniowym zachodzie, tam nikt nie chodzi.",
      prog: "Paczka wci\u0105\u017C w drodze. Status: \u201Eawizo zostawione w krzakach\u201D.",
      turn: "Paczka dor\u0119czona",
      done: "Dor\u0119czono do r\u0105k w\u0142asnych Pustelnika Mirka? To on jeszcze \u017Cyje? Pip! Status: \u201EDor\u0119czono\u201D. System jest zadowolony, ja te\u017C. Masz 75 groszy i punkt.",
      reward: { c: 75, xp: 80, p: 1 },
      steps: [
        {
          t: "item",
          z: 9,
          tx: 6,
          ty: 24,
          name: "Awizo",
          ic: "awizo",
          hint: "Zachodnie Pola Ticket\xF3w: po\u0142udniowy zach\xF3d",
          fin: "Awizo: \u201EPaczka przekierowana do Depotu Zagubionych Paczek. Odbi\xF3r osobisty. Adresat: \xBBPustelnik, Bagna\xAB\u201D. Depot jest na p\xF3\u0142nocnym zachodzie P\xF3l.",
        },
        {
          t: "item",
          z: 10,
          tx: 6,
          ty: 6,
          name: "Paczka bez adresu",
          ic: "dar1",
          hint: "Depot Zagubionych Paczek (p\xF3\u0142nocny zach\xF3d P\xF3l)",
          fin: "Paczka! Na boku kto\u015B dopisa\u0142: \u201EMirek, Bagna SLA\u201D. Pora na dor\u0119czenie, Bagna s\u0105 na po\u0142udnie od Wioski.",
        },
        {
          t: "talk",
          to: "mirek",
          ask: "Czy to pana paczka?",
          hint: "Pustelnik Mirek, Po\u0142udniowe Bagna SLA",
          txt: "Moja! Zam\xF3wi\u0142em j\u0105 trzy lata temu: zestaw \u201ECisza i spok\xF3j\u201D. W \u015Brodku... dzwonek do drzwi. Ironia losu. Powiedz kurierowi, \u017Ce odebrane. I \u017Ce nie mam drzwi.",
          ok: "Przeka\u017C\u0119 Darkowi",
        },
      ],
    },
    {
      id: "dar2",
      name: "Polecony za potwierdzeniem",
      giver: "darek",
      after: "dar1",
      gate: ["undead"],
      ask: "Znowu co\u015B do dor\u0119czenia?",
      offer:
        "Polecony do Krainy Nieumar\u0142ego Supportu! Adresat: sta\u017Cysta Kuba. Ja tam nie p\xF3jd\u0119, tam wszystko jest na czas nieokre\u015Blony, a ja mam umow\u0119 na czas okre\u015Blony. Potrzebuj\u0119 podpisu na potwierdzeniu odbioru.",
      accept:
        "Sta\u017Cysta na pewno tam jest. Sta\u017Cy\u015Bci zawsze s\u0105. Nawet jak ich nie ma.",
      prog: "Potwierdzenie odbioru wci\u0105\u017C puste. System ju\u017C dzwoni. Do mnie.",
      turn: "Mam podpisane potwierdzenie",
      done: "Podpis jest! Troch\u0119 dr\u017C\u0105cy, ale prawdziwy. Status: \u201EDor\u0119czono w za\u015Bwiatach\u201D. Nowa kategoria w systemie! Masz 90 groszy i punkt.",
      reward: { c: 90, xp: 110, p: 1 },
      steps: [
        {
          t: "talk",
          to: "kuba",
          ask: "Polecony dla sta\u017Cysty Kuby",
          hint: "Sta\u017Cysta Kuba, Kraina Nieumar\u0142ego Supportu",
          txt: "Do mnie? Polecony?! ...To umowa o prac\u0119! Na czas nieokre\u015Blony! Podpisa\u0142bym, ale te telefony z helpdesku dzwoni\u0105 tak g\u0142o\u015Bno, \u017Ce nie s\u0142ysz\u0119 w\u0142asnych my\u015Bli. A bez my\u015Bli nie podpisuj\u0119. Ucisz ze dwa.",
          ok: "Ucisz\u0119 telefony",
        },
        {
          t: "kill",
          kind: "phone",
          z: 13,
          n: 2,
          at: [
            [20, 10],
            [26, 22],
          ],
          hint: "ucisz dzwoni\u0105ce telefony w Krainie Nieumar\u0142ych",
          fin: "Cisza. Ostatni telefon zd\u0105\u017Cy\u0142 jeszcze powiedzie\u0107 \u201EPana po\u0142\u0105czenie jest dla nas...\u201D i zgas\u0142. Wracaj do Kuby.",
        },
        {
          t: "talk",
          to: "kuba",
          ask: "Telefony uciszone, podpisz potwierdzenie",
          hint: "Sta\u017Cysta Kuba, Kraina Nieumar\u0142ych",
          txt: "Podpisuj\u0119! Pierwszy podpis na umowie w \u017Cyciu. Wysz\u0142o troch\u0119 krzywo, bo r\u0119ka mi dr\u017Cy ze szcz\u0119\u015Bcia. I ze strachu. G\u0142\xF3wnie ze strachu.",
          ok: "Gratulacje!",
        },
      ],
    },
    {
      id: "ola1",
      name: "Gluty w koniczynie",
      giver: "ola",
      ask: "Gdzie s\u0105 twoje owce?",
      offer:
        "Część stoi tu i udaje, że ich nie ma. Reszta schowała się w młynie, w środku, przy schodach. Gluty zjadają koniczynę! Zjedzą wszystko, co zielone, a potem się na tym poślizgną. Rozlej pięć glutów na Łące, to te nieśmiałe wyjdą. Beczka i tak nie ruszy się bez dzwonka.",
      accept:
        "Uwa\u017Caj, gluty s\u0105 lepkie. I nie m\xF3w owcom, \u017Ce boj\u0119 si\u0119 glut\xF3w bardziej ni\u017C one.",
      prog: "Owce dalej obra\u017Cone. Rozlane gluty: {n}/5.",
      turn: "Beczka ma dzwonek!",
      done: "Dzwoni! Beczka wysz\u0142a, reszta za ni\u0105, pierwsza bekn\u0119\u0142a, druga zjad\u0142a mi kapelusz. Czyli wszystko wraca do normy. Masz 55 groszy i punkt.",
      reward: { c: 55, xp: 60, p: 1 },
      steps: [
        {
          t: "kill",
          kind: "slime",
          z: 1,
          n: 5,
          at: [
            [8, 21],
            [14, 9],
            [27, 12],
            [46, 20],
            [53, 12],
          ],
          hint: "rozlej gluty na \u0141\u0105ce Czekania",
          fin: "Owce wychodz\u0105! Opr\xF3cz Beczki, najstarszej. Ola wo\u0142a: \u201EBeczka nie wyjdzie bez dzwonka! Gluty go zawlok\u0142y na strych M\u0142yna!\u201D",
        },
        {
          t: "item",
          z: 33,
          tx: 10,
          ty: 4,
          name: "Dzwonek Beczki",
          ic: "dzwonek",
          hint: "Strych M\u0142yna (M\u0142yn na \u0141\u0105ce, schody w \u015Brodku)",
          fin: "Dzwonek! Dzy\u0144. Gdzie\u015B na \u0141\u0105ce owca podnios\u0142a g\u0142ow\u0119. Wracaj do Oli.",
        },
      ],
    },
    {
      id: "rys1",
      name: "Z\u0142ota b\u0142ystka",
      giver: "rysiek",
      ask: "Bior\u0105 dzisiaj?",
      offer:
        "Bior\u0105, tylko nie ryby, a gluty. Zgubi\u0142em z\u0142ot\u0105 b\u0142ystk\u0119, kiedy goni\u0142em z\u0142otego gluta. My\u015Bla\u0142em, \u017Ce to z\u0142ota rybka, a to by\u0142 zwyk\u0142y bezczelny glut. B\u0142ystka polecia\u0142a do Lasu Szept\xF3w, na wsch\xF3d.",
      accept:
        "Z\u0142ota, b\u0142yszcz\u0105ca, z haczykiem. Uwa\u017Caj na palce. I na gluty. I na moj\u0105 reputacj\u0119.",
      prog: "Bez b\u0142ystki \u0142owi\u0119 na kawa\u0142ek kanapki. Ryby si\u0119 ze mnie \u015Bmiej\u0105.",
      turn: "Oddaj naprawion\u0105 b\u0142ystk\u0119",
      done: "Moja b\u0142ystka! I haczyk prosty jak nigdy! Ryb\u0119, kt\xF3r\u0105 na ni\u0105 z\u0142owi\u0119, b\u0119dzie TAKA! (Rysiek rozk\u0142ada r\u0119ce coraz szerzej.) Masz 50 groszy.",
      reward: { c: 50, xp: 55 },
      steps: [
        {
          t: "item",
          z: 2,
          tx: 51,
          ty: 21,
          name: "Z\u0142ota b\u0142ystka",
          ic: "rys1",
          hint: "Las Szept\xF3w: wsch\xF3d",
          fin: "B\u0142ystka! Haczyk wygi\u0119ty w precla. Z takim to ryba si\u0119 tylko po\u015Bmieje. Kowalka Wanda w Wiosce na pewno go wyklepie.",
        },
        {
          t: "talk",
          to: "wanda",
          ask: "Wyklepie pani haczyk b\u0142ystki?",
          hint: "Kowalka Wanda, Ku\u017Ania w Wiosce",
          txt: "Haczyk krzywy jak t\u0142umaczenie Mietka z rachunku. (Brzd\u0119k, brzd\u0119k.) Prosz\u0119, prosty. Teraz z\u0142apie nawet ryb\u0119, kt\xF3ra nie chce. Nie bior\u0119 grosza, to by\u0142a rozgrzewka.",
          ok: "Dzi\u0119kuj\u0119, pani Wando",
        },
      ],
    },
    {
      id: "edk1",
      name: "Koszyk grzybiarza",
      giver: "edek",
      ask: "Du\u017Co dzi\u015B grzyb\xF3w?",
      offer:
        "Grzyb\xF3w pe\u0142no, tylko koszyka nie mam! Odstawi\u0142em go na chwil\u0119, \u017Ceby pogada\u0107 z sosn\u0105, i nietoperze mi go zwin\u0119\u0142y. Maj\u0105 chytre oczka. Przego\u0144 te z\u0142odziejki, mo\u017Ce kt\xF3ra\u015B powie, gdzie go schowa\u0142y.",
      accept:
        "Wiklinowy, z kraciast\u0105 chusteczk\u0105. W \u015Brodku jest kanapka z d\u017Cemem, nie zjadaj.",
      prog: "Wci\u0105\u017C bez koszyka. Zbieram grzyby do kapelusza i mam teraz pieczark\u0119 na g\u0142owie.",
      turn: "Oddaj koszyk",
      done: "M\xF3j koszyk! I kanapka nietkni\u0119ta, szacunek. Masz 50 groszy i punkt. I rad\u0119: grzyby, kt\xF3re m\xF3wi\u0105, lepiej omija\u0107.",
      reward: { c: 50, xp: 55, p: 1 },
      steps: [
        {
          t: "kill",
          kind: "bat",
          z: 2,
          n: 3,
          at: [
            [20, 11],
            [35, 23],
            [10, 30],
          ],
          hint: "przego\u0144 nietoperze w Lesie Szept\xF3w",
          fin: "Ostatni nietoperz przed ucieczk\u0105 pisn\u0105\u0142 co\u015B o \u201Ewielkim wiatraku\u201D. Nietoperze zanios\u0142y koszyk a\u017C do M\u0142yna na \u0141\u0105ce Czekania!",
        },
        {
          t: "item",
          z: 20,
          tx: 3,
          ty: 9,
          name: "Koszyk grzybiarza",
          ic: "edk1",
          hint: "Wn\u0119trze M\u0142yna (\u0141\u0105ka Czekania)",
          fin: "Koszyk! Kanapka w \u015Brodku, nietkni\u0119ta. Nietoperze nie lubi\u0105 d\u017Cemu. Wracaj do Edka do Lasu.",
        },
      ],
    },
    {
      id: "sta1",
      name: "Strach na tickety",
      giver: "staszek",
      ask: "Czemu stoisz jak strach na wr\xF3ble?",
      offer:
        "Bo jestem strachem na tickety! Tylko \u017Ce one si\u0119 mnie nie boj\u0105. Lataj\u0105, wisz\u0105 nad polem i przypominaj\u0105 o terminach. Przego\u0144 cztery, to reszta zrozumie aluzj\u0119.",
      accept:
        "Tickety strzelaj\u0105 papierem, uwa\u017Caj. Pom\xF3g\u0142bym, ale mam alergi\u0119 na formularze.",
      prog: "Tickety dalej wisz\u0105 nad polem. Przegonione: {n}/4.",
      turn: "Pole \u015Bpiewa!",
      done: "Cisza! S\u0142yszysz? Tylko ballada i pszenica. Pierwszy raz od lat s\u0142ysz\u0119, jak ro\u015Bnie. Masz 70 groszy i punkt. I s\u0142omk\u0119 na pami\u0105tk\u0119.",
      reward: { c: 70, xp: 80, p: 1 },
      steps: [
        {
          t: "kill",
          kind: "ticket",
          z: 9,
          n: 4,
          at: [
            [14, 16],
            [24, 22],
            [36, 9],
            [40, 23],
          ],
          hint: "przego\u0144 tickety na Zachodnich Polach",
          fin: "Uciek\u0142y, ale ju\u017C wida\u0107, \u017Ce wr\xF3c\u0105. Staszek krzyczy z daleka: \u201EPotrzebna piosenka odstraszaj\u0105ca! Bard Zbyszek z karczmy w Wiosce ma ich pe\u0142no!\u201D",
        },
        {
          t: "talk",
          to: "zbyszek",
          ask: "Staszek prosi o piosenk\u0119 na tickety",
          hint: "Bard Zbyszek, Karczma w Wiosce",
          txt: "Piosenka odstraszaj\u0105ca? Mam! \u201EBallada o zamkni\u0119tym zg\u0142oszeniu\u201D. Tickety jej nienawidz\u0105, bo ma szcz\u0119\u015Bliwe zako\u0144czenie. Zanu\u0107 j\u0105 Staszkowi. Fa\u0142szuj \u015Bmia\u0142o, tak dzia\u0142a lepiej.",
          ok: "Zanuc\u0119 Staszkowi",
        },
      ],
    },
    {
      id: "mir1",
      name: "Cisza na bagnach",
      giver: "mirek",
      ask: "Pustelnik na bagnach? Czemu?",
      offer:
        "Uciek\u0142em tu od zgie\u0142ku, a tu chodz\u0105 zombie z helpdesku i j\u0119cz\u0105: \u201Eczy pr\xF3bowa\u0142 pan wy\u0142\u0105czy\u0107 i w\u0142\u0105czy\u0107?\u201D. Pr\xF3bowa\u0142em. Siebie. Nie pomog\u0142o. Ucisz trzech, prosz\u0119.",
      accept:
        "Tylko delikatnie, oni te\u017C kiedy\u015B byli lud\u017Ami. Konsultantami, ale jednak.",
      prog: "Wci\u0105\u017C s\u0142ysz\u0119 \u201EPana zg\u0142oszenie jest dla nas wa\u017Cne\u201D. Uciszone zombie: {n}/3.",
      turn: "Oddaj zatyczki z mchu",
      done: "Zatyczki! Mi\u0119towe! (wk\u0142ada) ...S\u0142ucham? Nic nie s\u0142ysz\u0119! Cudownie! Masz 70 groszy i punkt. I m\u0105dro\u015B\u0107 pustelnika: nigdy nie czytaj regulaminu do ko\u0144ca.",
      reward: { c: 70, xp: 80, p: 1 },
      steps: [
        {
          t: "kill",
          kind: "zombie",
          z: 11,
          n: 3,
          at: [
            [22, 26],
            [8, 24],
            [26, 8],
          ],
          hint: "ucisz zombie na Po\u0142udniowych Bagnach",
          fin: "Ciszej, ale w oddali dalej co\u015B j\u0119czy. Mirek wo\u0142a: \u201ENa reszt\u0119 pomog\u0105 tylko zatyczki z mchu! Ro\u015Bnie w Korzeniach SLA, wej\u015Bcie w starym d\u0119bie na zachodzie bagien!\u201D",
        },
        {
          t: "item",
          z: 23,
          tx: 12,
          ty: 4,
          name: "Zatyczki z mchu",
          ic: "zatyczki",
          hint: "Korzenie SLA (d\u0105b na zachodzie Bagien)",
          fin: "Mi\u0119ciutki mech, idealny do uszu. Tylko \u017Ce co\u015B si\u0119 w nim rusza. Lepiej, \u017Ceby Iga z Apteki w Wiosce go najpierw wygotowa\u0142a.",
        },
        {
          t: "talk",
          to: "iga",
          ask: "Wygotuje pani mech na zatyczki?",
          hint: "Iga, Apteka w Wiosce",
          txt: "Mech z Bagien SLA do uszu? Bez gotowania? Chyba \u017Ce kto\u015B lubi s\u0142ysze\u0107, jak mu w g\u0142owie kwitn\u0105 paprocie. (Bul, bul.) Gotowe, sterylne i pachn\u0105ce mi\u0119t\u0105. Zanie\u015B pustelnikowi.",
          ok: "Zanios\u0119 Mirkowi",
        },
      ],
    },
    {
      id: "hen1",
      name: "Krecha Henia",
      giver: "henio",
      gate: ["lever1"],
      ask: "Czemu pan taki smutny nad tym kuflem?",
      offer:
        "Kufel pusty, a Mietek m\xF3wi, \u017Ce krecha pe\u0142na. Id\u017A, pogadaj z nim, niech mi da jeszcze jedn\u0105 na krech\u0119. Tylko wiarygodnie! Tak urz\u0119dowo.",
      accept:
        "Mietek stoi za barem. Powiedz, \u017Ce Henio jest wyp\u0142acalny. Nie m\xF3w tylko od kiedy.",
      prog: "Kufel czeka. Ja czekam. Kufel czeka na mnie, a ja na kufel.",
      turn: "Krecha wymazana!",
      done: "Wymazana?! I lemoniada za darmo? To lepsze ni\u017C kredyt! Masz 45 groszy, znalaz\u0142em pod sto\u0142em. Nie pytaj, ile jeszcze tam le\u017Cy.",
      reward: { c: 45, xp: 55 },
      steps: [
        {
          t: "talk",
          to: "mietek",
          ask: "Henio prosi o kolejk\u0119 na krech\u0119",
          hint: "Mietek, Karczma",
          txt: "Na krech\u0119? Jego krecha jest d\u0142u\u017Csza ni\u017C kolejka do supportu! Ale dobra: Henio zgubi\u0142 kiedy\u015B w Ruinach Kolejki moj\u0105 star\u0105 monet\u0119 karczemn\u0105, t\u0119 z dziurk\u0105. Le\u017Ca\u0142a w zachodnim skrzydle, za krat\u0105 z d\u017Awigni\u0105. Przynie\u015B j\u0105, to wyma\u017C\u0119 krech\u0119.",
          ok: "Poszukam monety",
        },
        {
          t: "item",
          z: 4,
          tx: 6,
          ty: 18,
          name: "Moneta z dziurk\u0105",
          ic: "moneta",
          hint: "Ruiny Kolejki: zachodnie skrzyd\u0142o (za krat\u0105)",
          fin: "Moneta z dziurk\u0105! Przez dziurk\u0119 wida\u0107, jak bardzo Henio jest zad\u0142u\u017Cony. Wracaj do Mietka.",
        },
        {
          t: "talk",
          to: "mietek",
          ask: "Mam monet\u0119 Henia",
          hint: "Mietek, Karczma",
          txt: "Prawdziwa! Pami\u0119tam, jak za ni\u0105 kupi\u0142em pierwszy kocio\u0142. Krecha Henia: wymazana. Lemoniada na koszt firmy. Jedna! Niech przestanie \u015Bpiewa\u0107 z bardem.",
          ok: "Przeka\u017C\u0119 Heniowi",
        },
      ],
    },
    {
      id: "kub1",
      name: "Raport sta\u017Cysty",
      giver: "kuba",
      ask: "Sta\u017Cysta w Krainie Nieumar\u0142ych?",
      offer:
        "Mam zanie\u015B\u0107 raport kwartalny Duchowi Helpdesku, ale boj\u0119 si\u0119 duch\xF3w. I raport\xF3w. Kierownik m\xF3wi, \u017Ce sta\u017C to przygoda. Zaniesiesz za mnie?",
      accept:
        "Duch unosi si\u0119 na zach\xF3d od g\u0142\xF3wnej \u015Bcie\u017Cki. M\xF3wi \u201Eprosz\u0119 czeka\u0107\u201D, wi\u0119c pewnie jeszcze tam jest.",
      prog: "Raport wci\u0105\u017C w obiegu. Ja wci\u0105\u017C na sta\u017Cu. Czwarty rok.",
      turn: "Raport zatwierdzony",
      done: "Zatwierdzony bez czytania?! To najwy\u017Csza forma uznania w korporacji! Masz 80 groszy i punkt. Mo\u017Ce wreszcie mnie zatrudni\u0105.",
      reward: { c: 80, xp: 100, p: 1 },
      steps: [
        {
          t: "talk",
          to: "ghost",
          ask: "Raport kwartalny od sta\u017Cysty Kuby",
          hint: "Duch Helpdesku, Kraina Nieumar\u0142ych (zach\xF3d od \u015Bcie\u017Cki)",
          txt: "Raport bez pieczątki z laboratorium polowego? Nie przyjmę. Procedura. Iga została w aptece w Wiosce i do Nieumarłych nie wchodzi. Pieczątkę trzyma laborantka Gienia, na zachodzie tej krainy. Proszę iść. Ja poczekam. To moja specjalność.",
          ok: "Idę do Gieni",
        },
        {
          t: "talk",
          to: "gienia",
          ask: "Duch prosi o pieczątkę Igi pod raportem Kuby",
          hint: "Laborantka Gienia, Laboratorium Polowe (zachód Krainy Nieumarłych)",
          txt: "Pieczątka Igi? Zostawiła mi ją, bo sama nie wchodzi do Nieumarłych — mówi, że tutejsze fiolki same się eskalują. Przykładam. Zielony tusz, archiwalny. Jak duch marudzi, niech marudzi urzędowo.",
          ok: "Zaniosę duchowi",
        },
        {
          t: "talk",
          to: "ghost",
          ask: "Raport z pieczątką Igi, przybitą przez Gienię",
          hint: "Duch Helpdesku, Kraina Nieumarłych",
          txt: "Zielona pieczątka Igi, a obok gryzmoł Gieni... tusz archiwalny, mówi pani? Zatwierdzony bez czytania. Przekaż stażyście: kwartał zaliczony.",
          ok: "Przeka\u017C\u0119 Kubie",
        },
      ],
    },
    {
      id: "wan1",
      name: "Z\u0142om na kowad\u0142o",
      giver: "wanda",
      after: "spin1",
      gate: ["seal"],
      ask: "Potrzebuje pani czegoś na kowadło?",
      offer:
        "Miecz t\u0119pi si\u0119 od samych formularzy. Przynie\u015B trzy od\u0142amki pancerza pluskiew spamu z holu Ruin Kolejki. Zrobi\u0119 z tego co\u015B, co nie p\u0119ka przy pierwszym tickecie.",
      accept:
        "Pluskwy najpierw mrugaj\u0105 czerwonym, potem strzelaj\u0105 wachlarzem. Sta\u0144 z boku, nie w korespondencji.",
      prog: "Kowad\u0142o puste. Od\u0142amki: {n}/3.",
      turn: "Od\u0142amki na kowadle",
      done: "Brzd\u0119k. Masz 40 groszy i punkt. Ostrze ju\u017C mniej przypomina skarg\u0119, a bardziej narz\u0119dzie.",
      reward: { c: 40, xp: 70, p: 1 },
      steps: [
        {
          t: "kill",
          kind: "spam",
          z: 4,
          n: 3,
          at: [
            [20, 18],
            [30, 20],
            [35, 21],
          ],
          hint: "rozbij pluskwy spamu w holu Ruin Kolejki",
          fin: "Trzy od\u0142amki! S\u0142ycha\u0107, jak chc\u0105 na kowad\u0142o. Wracaj do Wandy.",
        },
      ],
    },
    {
      id: "rom1",
      name: "Protok\xF3\u0142 zamkni\u0119cia \u015Bwiata",
      giver: "roma",
      gate: ["audit"],
      ask: "Archiwum jeszcze czego\u015B chce?",
      offer:
        "AUDYT-BOT le\u017Cy, ale bez protoko\u0142u zamkni\u0119cia kolejka wraca jak bumerang. Zanie\u015B piecz\u0119\u0107 Bogdanowi do Wioski. On wie, gdzie stempluje si\u0119 koniec \u015Bwiata.",
      accept:
        "Nie zgub piecz\u0119ci. Ostatnia, kt\xF3r\u0105 zgubili\u015Bmy, otworzy\u0142a bram\u0119 i po\u0142ow\u0119 aktu pierwszego.",
      prog: "Bogdan jeszcze nie podstemplowa\u0142. \u015Awiat wisi na s\u0142owie.",
      turn: "\u015Awiat zamkni\u0119ty urz\u0119dowo",
      done: "Protok\xF3\u0142 w trzech egzemplarzach, jeden dla ciebie. Masz 150 groszy, dwa punkty i cisz\u0119 w kolejce. Prawdziw\u0105.",
      reward: { c: 150, xp: 180, p: 2 },
      steps: [
        {
          t: "talk",
          to: "bogdan",
          ask: "Protok\xF3\u0142 zamkni\u0119cia z Archiwum",
          hint: "Mistrz Bogdan, Wioska",
          txt: "Root, audyt, piecz\u0119\u0107... (stempluje tak mocno, \u017Ce kapliczka podskakuje). Zamkni\u0119te. Numer sprawy: zero. Powiedz Romie, \u017Ce kolejka oficjalnie nie istnieje.",
          ok: "Zaniosę wieść",
        },
      ],
    },
    {
      id: "pas1",
      name: "Zgubiony dzwonek",
      giver: "wicek",
      ask: "Czemu pan liczy owce z miną supportu?",
      offer:
        "Bunia — ta z czarnym uchem — zgubiła dzwonek w zagrodzie na wschodzie. Bez dzwonka liczę ją dwa razy albo wcale. Znajdziesz? Leży w trawie, w środku płotu.",
      accept:
        "Zagroda jest na wschodzie przysiółka. Wejście od drogi, tam gdzie żywopłot jest przerwany. Dzwonek jest mały i złośliwy.",
      prog: "Bez dzwonka Bunia jest teoretyczna. Owca teoretyczna i tak zjada kapustę.",
      turn: "Dzwonek się odnalazł",
      done: "Dzyń! Czyli jednak jest dwanaście. Masz 35 groszy. I nie mów Buni, że ją przeliczyłem.",
      reward: { c: 35, xp: 45 },
      steps: [
        {
          t: "item",
          z: 38,
          tx: 35,
          ty: 20,
          name: "Dzwonek Buni",
          ic: "dzwonek",
          hint: "Przysiółek za Młynem: środek zagrody na wschodzie",
          fin: "Dzwonek! Nadal pachnie owcą i trochę ticketem. Wracaj do pasterza Wicka.",
        },
      ],
    },
    {
      id: "gar1",
      name: "Garnek w obiegu",
      giver: "genowefa",
      ask: "Coś się dzieje w przysiółku?",
      offer:
        "Franek pożyczył mój garnek „na chwilę”. Chwila trwa od śniadania. Stoi przy drodze, między chatami, i udaje, że naprawia płot. Odbierz garnek, zanim zupa dostanie numer sprawy.",
      accept: "Nie daj się zaprosić na zupę. Ostatni, który spróbował, dostał odpowiedź automatyczną.",
      prog: "Garnek wciąż w obiegu. Ja wciąż bez obiadu.",
      turn: "Garnek wrócił",
      done: "Ciepły! I pusty, Bogu dzięki. Masz 30 groszy i plotkę: Wicek liczy owce, a owce liczą jego.",
      reward: { c: 30, xp: 40 },
      steps: [
        {
          t: "talk",
          to: "franek",
          ask: "Genowefa chce swój garnek z powrotem",
          hint: "Franek od Płota, Przysiółek za Młynem (przy drodze)",
          txt: "Garnek? A, ten. Zupa wyszła, ticket nie. Oddaj Genowefie, tylko nie wąchaj pokrywki. I powiedz, że płot jest prawie prosty. Prawie.",
          ok: "Zaniosę, bez wąchania",
        },
      ],
    },
    {
      id: "pas2",
      name: "Baran za płotem",
      giver: "wicek",
      after: "pas1",
      ask: "Ma pan jeszcze jakąś owcę poza spisem?",
      offer:
        "Support — tak, ten od Oli — przeskoczył płot i poszedł w prawo, na pastwisko. Zostawił kłak za kratą w kamiennej zagrodzie. Hela wie, które kamienie gdzie. Bez kłaka nie zamknę sprawy barana.",
      accept:
        "Zagroda jest na pastwisku, w prawo od przysiółka. Dwa kamienie, dwie płyty. Pchasz na boki i do góry. Jak utkną: Dziennik → Przywróć. Za kratą czeka skrzynia.",
      prog: "Baran wciąż poza kolejką. Kłak za kratą.",
      turn: "Kłak barana",
      done: "Wełna z pieczątką! Support oficjalnie istnieje. Masz 60 groszy i punkt. Baran nadal nie odbiera.",
      reward: { c: 60, xp: 75, p: 1 },
      steps: [
        {
          t: "talk",
          to: "hela",
          ask: "Wicek szuka kłaka barana Supporta",
          hint: "Pasterka Hela, Pastwisko za Płotem (w prawo od przysiółka)",
          txt: "Support? Zostawił wełnę w kamiennej zagrodzie, tej z kratą. Dwa kamienie, dwie płyty przy północnej ścianie. Pchasz z boku i do góry, aż siądą. Potem krata puszcza: za nią skrzynia i kłak. Nie pchaj ich w kąt.",
          ok: "Pójdę pchać kamienie",
        },
        {
          t: "item",
          z: 44,
          tx: 9,
          ty: 1,
          name: "Kłak Supporta",
          ic: "welna",
          hint: "Kamienna Zagroda na pastwisku: kamienie na płyty, kłak i skrzynia za kratą",
          fin: "Kłak! Pachnie baranem i urzędem. Wracaj do Wicka.",
        },
      ],
    },
    {
      id: "hel1",
      name: "Waga siana",
      giver: "hela",
      ask: "Co tu ważycie poza owcami?",
      offer:
        "Owczy spis leży za kratą w stodole, tej z belkami. Waga jest uparta: lewa belka w dół (beczy), środkowa zostaje w górze (śpi), prawa w dół (pilnuje). Potem Użyj przy belce, nie przy mnie. Jak się pomyli, przekładaj jeszcze raz. Za kratą jest też skrzynia.",
      accept: "Spis jest na papierze w kratkę. Nie poprawiaj liczb, owce się obrażają.",
      prog: "Spis wciąż za kratą. Siano nie lubi być liczone na oko.",
      turn: "Owczy spis",
      done: "Zgadza się co do kłaka. Masz 50 groszy i punkt. Środkowa belka dalej śpi, i dobrze.",
      reward: { c: 50, xp: 70, p: 1 },
      steps: [
        {
          t: "item",
          z: 45,
          tx: 9,
          ty: 1,
          name: "Owczy spis",
          ic: "awizo",
          hint: "Stodoła na pastwisku: lewa w dół, środkowa zostaw, prawa w dół, potem Użyj",
          fin: "Spis! Dwanaście owiec, jeden baran i przypis: „nie liczyć dwa razy”. Wracaj do Heli.",
        },
      ],
    },
    {
      id: "ola2",
      name: "Kłak na czubku",
      giver: "ola",
      after: "ola1",
      ask: "Co u Beczki?",
      offer:
        "Zostawiła kłak na czubku młyna. Schody są w środku, na samym środku, nie z boku. Wejdź na strych, potem jeszcze wyżej. Kłak leży przy beczce, jakby sam chciał być liczonym.",
      accept: "Nie spadnij. Młyn liczy piętra lepiej niż ja owce.",
      prog: "Kłak wciąż na górze. Beczka udaje, że to nie jej.",
      turn: "Kłak z czubka młyna",
      done: "Jej! Teraz mam kłak, dzwonek i owcę, która wygląda na zadowoloną. Masz 45 groszy.",
      reward: { c: 45, xp: 55 },
      steps: [
        {
          t: "item",
          z: 41,
          tx: 4,
          ty: 2,
          name: "Kłak z czubka",
          ic: "welna",
          hint: "Czubek Młyna: schody w środku młyna, potem w górę ze strychu",
          fin: "Kłak z wiatrem w środku. Wracaj do Oli.",
        },
      ],
    },
    {
      id: "spin1",
      name: "Urządzenie transportowe",
      giver: "wanda",
      after: "rys1",
      ask: "Haczyk już prosty. Ma pani jeszcze robotę?",
      offer:
        "Haczyk jest prosty, a w Depocie leży spinacz archiwalny. Spię je w broń do haków: gwoździe, lampy, pale przy wodzie. Wody to nie wypije. Spinacz leży na półce, nie za kratą.",
      accept: "Duży, zardzewiały, z gumką. Nie kuję z tego miecza.",
      prog: "Bez spinacza jestem kowalką, nie urzędem.",
      turn: "Spiąć haczyk z spinaczem",
      done: "Proszę. Leży przy broniach. Weź spinacz do ręki i uderz w stronę haka. Użyj zostaje do rozmowy i do kamieni.",
      reward: { c: 40, xp: 70 },
      steps: [
        {
          t: "item",
          z: 10,
          tx: 16,
          ty: 8,
          name: "Spinacz archiwalny",
          ic: "rys1",
          hint: "Depot Zagubionych Paczek, półka w hali",
          fin: "Spinacz! Gumka jeszcze trzyma. Wracaj do Wandy.",
        },
      ],
    },
    {
      id: "kamMost",
      name: "Trzy deski",
      giver: "zdzich",
      ask: "Czemu pan tak patrzy w stronę łąki?",
      offer:
        "Bo droga się tam urywa. Kładki zgniły, została rzeka. Trzy deski leżą na zachodniej drodze, zaraz za wsią, zanim droga w ogóle skręci do wody. Nie przy moście, mostu nie ma. Zanieś je Kamili. Ja niosę łopatę, ona niesie pieczątkę.",
      accept:
        "Zachodnia droga, tuż po wejściu na łąkę. Widać je z ścieżki. Jak Kamila podpisze, wróć do mnie. Dopiero wtedy kładę deski na głównej drodze.",
      prog: "Deski leżą na drodze albo Kamila jeszcze nie stempluje.",
      turn: "Kamila podpisała odbiór",
      done: "Podpis jest. Kładę trzy deski tam, gdzie droga urywała się na wodzie. Możesz iść. To nie jest most docelowy. To trzy deski.",
      reward: { c: 40, xp: 45 },
      steps: [
        {
          t: "item",
          z: 1,
          tx: 8,
          ty: 15,
          name: "Trzy deski",
          ic: "deski",
          hint: "Łąka Czekania: zachodnia droga, zaraz za wsią, daleko od rzeki",
          fin: "Deski. Leżały na zachodzie, nie przy wodzie. Kamila ma je tylko podpisać.",
        },
        {
          t: "talk",
          to: "kamila",
          ask: "Zdzich przysłał deski. Podpisze pani odbiór?",
          hint: "Pani Kamila, Wioska",
          txt: "Trzy deski, jeden formularz. Podpisuję odbiór tymczasowy. Na wodę kładzie je Zdzich, na drodze, tam gdzie ścieżka. Reszta rzeki zostaje wodą. Wracaj do niego.",
          ok: "Wracam do Zdzicha",
        },
      ],
    },
    {
      id: "falsz1",
      name: "Wezwanie na słupek",
      giver: "staszek",
      after: "sta1",
      ask: "Coś jeszcze straszy na polu?",
      offer:
        "Ticket, którego z dołu nie chciałem czytać. Jak go zdejmiesz, zanieś do Zbyszka. On fałszuje tak, że papier ucieka.",
      accept: "Słupek jest na Polach. Hak, nie drabinę.",
      prog: "Ticket wciąż wisi albo Zbyszek jeszcze go nie przeczytał.",
      turn: "Ticket zdjęty",
      done: "Zbyszek mówi, że to wezwanie do ciebie, oddane do nadawcy. Masz fałsz. Użyj w pustkę.",
      reward: { c: 35, xp: 60 },
      steps: [
        {
          t: "item",
          z: 9,
          tx: 18,
          ty: 14,
          name: "Ticket do ciebie",
          ic: "dar1",
          hint: "Zachodnie Pola Ticketów, słupek",
          fin: "Twoje nazwisko, krzywo. Zbyszek w karczmie to przeczyta.",
        },
        {
          t: "talk",
          to: "zbyszek",
          ask: "Przeczytaj ticket ze słupka",
          hint: "Bard Zbyszek, karczma w Wiosce",
          txt: "Do bohaterki, wioska, nieodebrane. Treść: proszę nie przychodzić. Zaśpiewam ci fałsz, od tego tickety gubią adresata. Użyj, kiedy nikogo nie ma obok i żaden hak nie wisi przed tobą.",
          ok: "Fałszuję",
        },
      ],
    },
    {
      id: "helSzal",
      name: "Kłak z muru",
      giver: "hela",
      after: "hel1",
      gate: ["baranHook"],
      ask: "Znalazłam kłak na murze.",
      offer:
        "Support przeskakuje, kłak zostaje. Przyniosłaś go, to utkaję szalik. Pierwsze uderzenie po kapliczce spłynie. Drugie już nie.",
      accept: "Nie pierze się. Owce by się obraziły.",
      prog: "Kłak schnie na płocie.",
      turn: "UTKAJ szalik",
      done: "Masz. Jedno darmowe uderzenie między kapliczkami. Potem znowu jest tylko wełną.",
      reward: { c: 30, xp: 50 },
      steps: [],
    },
  ]),
    (api.ep = {
      kamila: 2,
      zdzich: 2,
      grazyna: 2,
      filip: 3,
      darek: 2,
      ola: 3,
      edek: 2,
      staszek: 2,
      mirek: 1,
      kuba: 2,
      rysiek: 0,
      henio: 0,
      hela: 2,
    }),
    (api.bp = {
      zdzich: [
        "Dzie\u0144 dobry! To nie jest dziura w drodze, tylko inwestycja w toku.",
        "Pracuj\u0119 tu od rana. G\u0142\xF3wnie trzymam \u0142opat\u0119, \u017Ceby nie uciek\u0142a.",
        "Za wsią droga dochodzi do rzeki i staje. Dalej sam nie niosę.",
        "Pani Kamila m\xF3wi, \u017Ce papiery s\u0105 w terminie. Nie powiedzia\u0142a w kt\xF3rym.",
      ],
      grazyna: [
        "S\u0142ysza\u0142a\u015B? Mietek dolewa wody do gulaszu. A Bogdan wybiela brod\u0119, \u017Ceby wygl\u0105da\u0107 m\u0105drzej.",
        "Ja nie plotkuj\u0119. Ja tylko szybko przekazuj\u0119 informacje dalej.",
        "Bard Zbyszek \u015Bpiewa tak, \u017Ce moje pelargonie same si\u0119 zamkn\u0119\u0142y.",
        "Pod Lasem Szeptów są lochy, a na dnie magiczny sygnet. Trzyma go jakiś Morok. Ja tylko przekazuję dalej.",
      ],
      filip: [
        "Cze\u015B\u0107! Jestem Filip i jestem prawie doros\u0142y. Prawie-prawie.",
        "Umiem gwizda\u0107, liczy\u0107 do tysi\u0105ca i robi\u0107 min\u0119 jak glut. Patrz! ...No, prawie.",
        "Jak dorosn\u0119, to b\u0119d\u0119 bohaterem. Albo kurierem. Kurier ma fajniejsze auto.",
      ],
      darek: [
        "Kurier Darek. Dostawa w 24 godziny. Kt\xF3rych, tego nie precyzujemy.",
        "Zostawi\u0142em awizo na drzewie. Drzewo nie odebra\u0142o.",
        "Dzwoni\u0142em domofonem, ale w Wiosce nie ma domofon\xF3w, wi\u0119c krzycza\u0142em.",
      ],
      ola: [
        "Owce licz\u0119 przed snem, a w dzie\u0144 to one licz\u0105 mnie.",
        "To \u0141\u0105ka Czekania, bo owce czekaj\u0105 na traw\u0119, a trawa na deszcz.",
        "M\xF3j baran nazywa si\u0119 Support, bo te\u017C nigdy nie odpowiada. Część stada jest tu, reszta poszła za płot, na pastwisko.",
      ],
      rysiek: [
        "Ciii... ryby s\u0142uchaj\u0105.",
        "Raz z\u0142owi\u0142em tak\u0105 ryb\u0119, \u017Ce sama nie uwierzy\u0142a.",
        "W\u0119dkarstwo to cierpliwo\u015B\u0107. Prawie jak czekanie na support, tylko czasem co\u015B bierze.",
      ],
      edek: [
        "Grzyby to moje \u017Cycie. Gluty to moja zmora: wygl\u0105daj\u0105 jak kurki, a gryz\u0105 jak sprawozdanie roczne.",
        "Tego zielonego, \u015Bwiec\u0105cego, nie jedz. Halina je zbiera, a sama ju\u017C \u015Bwieci.",
        "W tym lesie trzeba szepta\u0107. Ja szepcz\u0119 do borowik\xF3w.",
        "Na dole lasu, tam gdzie kończy się ścieżka, ktoś wykopał schody. Halina mówi, że to katakumby. Ja tam grzybów nie zbieram.",
      ],
      staszek: [
        "Siej\u0119 zbo\u017Ce, a wyrastaj\u0105 tickety. Co\u015B jest nie tak z t\u0105 gleb\u0105.",
        "M\xF3j traktor ma wi\u0119cej b\u0142\u0119d\xF3w ni\u017C system zg\u0142osze\u0144.",
        "Jak b\u0119dzie urodzaj, sprzedam pszenic\u0119. Jak nie, sprzedam tickety na makulatur\u0119.",
      ],
      mirek: [
        "Pustelnik Mirek. Rozmawiam z lud\u017Ami raz w roku. Masz szcz\u0119\u015Bcie, to dzisiaj.",
        "Kiedy\u015B by\u0142em kierownikiem projektu. Teraz kieruj\u0119 \u017Cabami. S\u0142uchaj\u0105 lepiej.",
        "Bagno uczy pokory. Wchodzisz i od razu jeste\u015B ni\u017Cej.",
        "Słyszałem o schodach w lesie. Im niżej, tym gorsze liczby. Na dnie ponoć artefakt, od którego świat milknie.",
      ],
      henio: [
        "Siedz\u0119 tu od otwarcia karczmy. Albo od zamkni\u0119cia, ju\u017C nie pami\u0119tam.",
        "Wiesz, \u017Ce ja tu siedz\u0119 ca\u0142y czas? Nawet jak wychodzisz z karczmy. A mo\u017Ce wtedy znikam? Nigdy nie sprawdza\u0142em.",
        "Bard \u015Bpiewa trzeci\u0105 godzin\u0119. To dopiero by\u0142o intro.",
        "Bard śpiewał o Mieczu Zagłady i o sygnetcie, który zamyka każdą sprawę jednym uderzeniem. Albo o zupie. Trzecią godzinę już nie rozróżniam.",
      ],
      kuba: [
        "Sta\u017Cysta Kuba. Pracuj\u0119 za do\u015Bwiadczenie. Do\u015Bwiadczenie m\xF3wi mi, \u017Cebym ucieka\u0142.",
        "Kierownik m\xF3wi, \u017Ce Kraina Nieumar\u0142ych to rozwi\u0105zanie tymczasowe. Jak wszystko tutaj: na zawsze.",
        "Robi\u0119 kaw\u0119 dla zombie. Nie pij\u0105, ale lubi\u0105 zapach.",
      ],
      gienia: [
        "Laborantka Gienia. Iga została w aptece, a ja tu pilnuję, żeby fiolki same się nie eskalowały.",
        "Pieczątka jest zielona, bo tusz archiwalny. Albo dlatego, że coś w niej żyje. Wolę pierwszą wersję.",
        "Jak duch mówi „proszę czekać”, to nie czeka. To cytuje regulamin.",
      ],
      wicek: [
        "Owce: dwanaście. Albo jedenaście. Jedna się eskaluje i nie chce wrócić do kolejki.",
        "To Przysiółek za Młynem. Droga w prawo nie kończy się na trawie: tam jest pastwisko, Hela i baran, który nie uznaje płotu.",
        "Nie jestem bohaterem. Jestem pasterzem. Bohaterka to ty, ja tylko liczę, co beczy.",
        "Owce nie schodzą pod ziemię. Ludzie tak. W katakumbach pod lasem leży ponoć pierścień, od którego support wreszcie milknie.",
      ],
      genowefa: [
        "Franek pożyczył garnek na zupę i od tamtej pory zupa jest w drodze. Status: duszona.",
        "Wioska ma kolejkę, my mamy płot. Płot przynajmniej stoi. Droga w prawo idzie na pastwisko, tam owce mają własny urząd.",
        "Kapliczka daje siłę, ale nie co chwilę. Jak ją nadeptujesz, to się obraża i każe poczekać.",
      ],
      franek: [
        "Zupa była z pokrzywy i jednego ticketu. Ticket był pikantny.",
        "Płot naprawiam od rana. Owca Wicka przechodzi górą. A droga w prawo i tak jest dziurawa.",
        "Genowefa mówi, że garnek jest rodzinny. Rodzina składa się z niej i garnka. Ja jestem intruzem.",
      ],
      hela: [
        "Pasterka Hela. Wicek liczy, ja ważę. Siano ma być po równo, a nigdy nie jest.",
        "Baran Support przeskoczył płot. Kłak został w kamiennej zagrodzie. Kamienie same nie wejdą na płyty.",
        "Waga siana: lewa w dół, środkowa śpi, prawa w dół. Jak się pomyli, Użyj jeszcze raz.",
        "Waga siana to nie waga popiołu. W katakumbach belki otwierają podłogę, a na dnie czeka archiwariusz.",
      ],
      roma: [
        "Archiwum Milczenia. Tu l\u0105duj\u0105 odpowiedzi, kt\xF3rych nikt nie chcia\u0142 us\u0142ysze\u0107.",
        "AUDYT-BOT sprawdza, czy root by\u0142 legalny. Nie by\u0142. Dlatego stoi tam i mruczy paragrafami.",
        "Jak go z\u0142o\u017Cysz do akt, podstempluj\u0119 koniec \u015Bwiata. W trzech egzemplarzach.",
        "Morok to nie mój urząd. On archiwizuje całe światy. Jak zamknie twoją teczkę, zostaje tylko sygnet.",
      ],
    }),
    (api._a = { x: 33, y: 9 }),
    (api.Pn = { x: 33, y: 16 }),
    (api.Qn = { zone: 0, x: 24, y: 18 }),
    (api.qe = api.hk()),
    api.buildCrypt(),
    (api.vp = [
      { z: 0, kind: "clock", tx: 42, ty: 17, w: 3, h: 3, solid: !0 },
      { z: 0, kind: "well", tx: 14, ty: 9, w: 2, h: 2, solid: !0 },
      { z: 1, kind: "mill", tx: 22, ty: 17, w: 3, h: 3, solid: !0 },
      { z: 2, kind: "hut", tx: 47, ty: 9, w: 3, h: 2, solid: !0 },
      { z: 2, kind: "oak", tx: 26, ty: 31, w: 3, h: 3, solid: !0 },
      { z: 3, kind: "fountain", tx: 27, ty: 15, w: 3, h: 3, solid: !0 },
      { z: 4, kind: "statue", tx: 31, ty: 35, w: 2, h: 2, solid: !0 },
      { z: 4, kind: "arch", tx: 26, ty: 38, w: 4, h: 2, solid: !1 },
      { z: 5, kind: "throne", tx: 32, ty: 3, w: 3, h: 2, solid: !0 },
      { z: 5, kind: "rack", tx: 24, ty: 7, w: 2, h: 2, solid: !0 },
      { z: 5, kind: "rack", tx: 40, ty: 7, w: 2, h: 2, solid: !0 },
      { z: 5, kind: "rack", tx: 24, ty: 23, w: 2, h: 2, solid: !0 },
      { z: 5, kind: "rack", tx: 40, ty: 23, w: 2, h: 2, solid: !0 },
      { z: 9, kind: "well", tx: 22, ty: 10, w: 2, h: 2, solid: !0 },
      { z: 10, kind: "statue", tx: 4, ty: 20, w: 2, h: 2, solid: !0 },
      { z: 11, kind: "oak", tx: 4, ty: 14, w: 3, h: 3, solid: !0 },
      { z: 13, kind: "throne", tx: 32, ty: 4, w: 3, h: 2, solid: !0 },
      { z: 15, kind: "arch", tx: 14, ty: 2, w: 4, h: 2, solid: !1 },
    ]),
    (api.zk = []));
  for (let e of api.vp)
    if (e.solid)
      for (let t = e.ty; t < e.ty + e.h; t++)
        for (let n = e.tx; n < e.tx + e.w; n++)
          (api.qe[e.z].t[t][n] === ":" && api.zk.push(e.z + ":" + e.kind + ":" + n + "," + t),
            (api.qe[e.z].t[t][n] = "M"));
  for (let [e, t, n, i] of [
    [1, 23, 24, 19],
    [2, 48, 49, 10],
    [2, 27, 28, 33],
    [11, 5, 6, 16],
    [0, 43, 44, 19],
  ])
    for (let a = t; a <= n; a++) api.qe[e].t[i] && (api.qe[e].t[i][a] = "d");
  api.wk = [];
  api.bk();
  ((api.xp = new Set(["b", "f", "x", "X"])),
    (api.Cs = new Set(["#", "t", "w", "r", "h", "L", "M", "T", "B", "C", "F", "K", "A", "O", "j", "J"])));
  api.gk();
  api.Sk();
  api.padPortals();
  api.placeClips();
  ((api.gp = ["Kok", "Kucyki", "Kr\xF3tkie", "Irokez", "Warkocz", "Bob", "Loki", "D\u0142ugie"]),
    (api.Of = [
      "#d9572b",
      "#2b2b33",
      "#f2d16b",
      "#c8c8d8",
      "#ff7eb6",
      "#7a4a2a",
      "#3a6ad8",
      "#4fb06a",
      "#8e5ad0",
      "#ece6d8",
    ]),
    (api.Mk = [
      "Ruda",
      "Czarna",
      "Blond",
      "Siwa",
      "R\xF3\u017Cowa",
      "Kasztan",
      "Niebieska",
      "Zielona",
      "Fioletowa",
      "Platyna",
    ]),
    (api.Sp = ["Tunika", "P\u0142aszcz", "Sukienka", "Zbroja", "Ogrodniczki", "Kurtka", "Kimono"]),
    (api.If = [
      "#2a9d8f",
      "#7b4fd1",
      "#c0392b",
      "#3d7a3a",
      "#d4a017",
      "#2b4a8a",
      "#d86a96",
      "#4a4a56",
      "#c87a3a",
    ]),
    (api.jk = [
      "Morski",
      "Fiolet",
      "Karmin",
      "Le\u015Bny",
      "Musztarda",
      "Granat",
      "R\xF3\u017C",
      "Grafit",
      "Rdza",
    ]),
    (api.Ts = ["#f1c7a0", "#e3ae84", "#c98e62", "#9a6440", "#6e4428", "#a8d8a0"]),
    (api.Pk = ["Jasna", "Brzoskwinia", "Oliwka", "Br\u0105z", "Heban", "Glutowa"]),
    (api.et = {
      war: {
        name: "Wojowniczka",
        desc: "Miecz z szerokim ci\u0119ciem, odbija tickety bossa. Najwi\u0119cej zdrowia.",
        base: { str: 3, vit: 3, dex: 1, mnd: 1 },
        start: "miecz",
      },
      ran: {
        name: "\u0141uczniczka",
        desc: "\u0141uk z wspomaganym celowaniem. Szybka, krytyki ze Zr\u0119czno\u015Bci.",
        base: { str: 2, vit: 2, dex: 3, mnd: 1 },
        start: "luk",
      },
      mag: {
        name: "Magini",
        desc: "Kostur Iskier z naprowadzaniem. Ta\u0144sze umiej\u0119tno\u015Bci, mniej zdrowia.",
        base: { str: 1, vit: 2, dex: 1, mnd: 4 },
        start: "iskry",
      },
    }),
    (api.jn = {
      miecz: {
        name: "Miecz",
        desc: "Szerokie ci\u0119cie wr\u0119cz. Odbija tickety.",
        aff: "war",
        cd: 0.36,
      },
      luk: { name: "\u0141uk", desc: "Szybkie strza\u0142y na dystans.", aff: "ran", cd: 0.4 },
      kusza: { name: "Kusza", desc: "Wolna, mocna, przebija 2 cele.", aff: "ran", cd: 0.85 },
      iskry: {
        name: "Kostur Iskier",
        desc: "Naprowadzane pociski many (1,5 many).",
        aff: "mag",
        cd: 0.42,
      },
      burza: {
        name: "Kostur Burzy",
        desc: "Piorun przeskakuj\u0105cy mi\u0119dzy wrogami (3 many).",
        aff: "mag",
        cd: 0.7,
      },
      eskalacja: {
        name: "Ostrze Eskalacji",
        desc: "Bro\u0144 z Krainy Nieumar\u0142ego Supportu. +35% obra\u017Ce\u0144, przebija tarcze.",
        aff: "war",
        cd: 0.34,
      },
      zaglada: {
        name: "Miecz Zag\u0142ady",
        desc: "Dwur\u0119czny miecz Moroka. Ci\u0119\u017Cki, g\u0142odny, nie pyta o numer sprawy.",
        aff: "war",
        cd: 0.5,
      },
      spinacz: {
        name: "Spinacz",
        desc: "Haczyk na gumce. Atak w stronę haka przyciąga. Nie rani i nie otwiera krat.",
        aff: "",
        cd: 0.45,
      },
    }),
    (api.Cf = ["miecz", "luk", "kusza", "iskry", "burza", "eskalacja", "zaglada", "spinacz"]),
    (api.gf = {
      war: [
        {
          id: "berserk",
          name: "Berserkerka",
          desc: "+30% obra\u017Ce\u0144 wr\u0119cz, szybsze ataki.",
        },
        {
          id: "straz",
          name: "Stra\u017Cniczka",
          desc: "+6 zdrowia, tarcza odnawia si\u0119 sama co 20 s.",
        },
      ],
      ran: [
        {
          id: "snajper",
          name: "Snajperka",
          desc: "+15% szansy na krytyk, +15% obra\u017Ce\u0144 pocisk\xF3w.",
        },
        {
          id: "trop",
          name: "Tropicielka",
          desc: "+15% szybko\u015Bci, doskok odnawia si\u0119 40% szybciej.",
        },
      ],
      mag: [
        {
          id: "piro",
          name: "Piromantka",
          desc: "Kula Ognia +50% obra\u017Ce\u0144 i 1 many taniej.",
        },
        {
          id: "burzowa",
          name: "Burzowa",
          desc: "Pociski i pioruny przeskakuj\u0105 na kolejny cel, +30% regeneracji many.",
        },
      ],
    }),
    (api.tp = {
      berserk:
        "Najlepsza, je\u015Bli grasz mieczem z bliska. Bonus nie dzia\u0142a na \u0142uk ani kostury. Mniej bezpieczna: brak dodatkowego zdrowia.",
      straz:
        "Najbezpieczniejsza: wi\u0119cej serc i darmowa tarcza co 20 s, idealna na bossa. Obra\u017Cenia bez zmian.",
      snajper:
        "Dla \u0142uku i kuszy: cz\u0119stsze krytyki i mocniejsze pociski. Miecz i magia nic nie zyskuj\u0105.",
      trop: "Mobilno\u015B\u0107: szybszy ruch i doskok prawie bez przerwy. \u0141atwiejsze zagadki na czas i unikanie ticket\xF3w.",
      piro: "Kula Ognia staje si\u0119 g\u0142\xF3wn\u0105 broni\u0105: +50% obra\u017Ce\u0144, ta\u0144sza. Bez nauczonej Kuli Ognia nic nie daje.",
      burzowa:
        "Dla Kostura Iskier i Burzy: pociski przeskakuj\u0105 dalej, mana wraca szybciej. S\u0142absza bez kostur\xF3w.",
    }),
    (api.Ck = [
      {
        k: "str",
        name: "Si\u0142a",
        desc: "obra\u017Cenia wr\u0119cz/\u0142uk, si\u0142a staggeru vs poise",
      },
      {
        k: "vit",
        name: "Witalno\u015B\u0107",
        desc: "+2 maks. zdrowia, mniej obra\u017Ce\u0144 od wrog\xF3w",
      },
      {
        k: "dex",
        name: "Zr\u0119czno\u015B\u0107",
        desc: "trafienie, krytyk, unik (tempo ataku z limitem)",
      },
      { k: "mnd", name: "Umys\u0142", desc: "mana, regeneracja, magia (INT)" },
    ]),
    (api.Pt = {
      dash: {
        name: "Doskok",
        trainer: "bogdan",
        costs: [18, 55],
        lvl: [1, 3],
        mp: 0,
        desc: "Szybki unik z nietykalno\u015Bci\u0105. Ranga 2: kr\xF3tsze odnowienie.",
      },
      spin: {
        name: "Wir Ostrzy",
        trainer: "bogdan",
        costs: [35, 70, 110],
        lvl: [2, 4, 6],
        mp: 3,
        desc: "Obr\xF3t: rani wszystko wok\xF3\u0142, odbija tickety, kruszy p\u0119kni\u0119te \u015Bciany.",
      },
      fury: {
        name: "Furia",
        trainer: "bogdan",
        costs: [60, 110],
        lvl: [3, 6],
        mp: 0,
        desc: "Przytrzymany ATAK atakuje seriami. Ranga 2: +8% obra\u017Ce\u0144 w serii.",
      },
      bash: {
        name: "Uderzenie Tarcz\u0105",
        trainer: "wanda",
        costs: [70, 125],
        lvl: [4, 7],
        mp: 2,
        desc: "Wojowniczka: og\u0142usza i pcha wroga. Ranga 2: wi\u0119kszy stagger.",
        cls: "war",
      },
      taunt: {
        name: "Prowokacja",
        trainer: "wanda",
        costs: [55, 100],
        lvl: [5, 8],
        mp: 2,
        desc: "Wojowniczka: wrogowie celuj\u0105 w Ciebie, Ty bierzesz mniej dmg na chwil\u0119.",
        cls: "war",
      },
      fire: {
        name: "Kula Ognia",
        trainer: "halina",
        costs: [40, 85, 130],
        lvl: [2, 4, 6],
        mp: 3,
        desc: "Wybuchowy pocisk. Jako jedyny pali kolczaste zaro\u015Bla.",
      },
      ward: {
        name: "Tarcza Cierpliwo\u015Bci",
        trainer: "halina",
        costs: [40, 85],
        lvl: [3, 5],
        mp: 4,
        desc: "Poch\u0142ania kolejne trafienie (ranga 2: dwa).",
      },
      seria: {
        name: "Seria",
        trainer: "halina",
        costs: [55, 100],
        lvl: [4, 7],
        mp: 0,
        desc: "\u0141uk/kusza/kostur: przytrzymanie strzela seriami. Ranga 2: -10% CD w serii.",
      },
      trap: {
        name: "Pu\u0142apka Ticketowa",
        trainer: "zenek",
        costs: [65, 115],
        lvl: [4, 7],
        mp: 3,
        desc: "\u0141uczniczka: stawia pu\u0142apk\u0119, kt\xF3ra rani i spowalnia.",
        cls: "ran",
      },
      multi: {
        name: "Salwa",
        trainer: "zenek",
        costs: [80, 140],
        lvl: [5, 8],
        mp: 4,
        desc: "\u0141uczniczka: 3 strza\u0142y w wachlarzu. Ranga 2: 5 strza\u0142.",
        cls: "ran",
      },
      roll: {
        name: "Przewr\xF3t",
        trainer: "zenek",
        costs: [50, 95],
        lvl: [3, 6],
        mp: 0,
        desc: "\u0141uczniczka: kr\xF3tki unik w bok z nietykalno\u015Bci\u0105 (jak Doskok, kr\xF3tszy).",
        cls: "ran",
      },
      blink: {
        name: "Migni\u0119cie",
        trainer: "ghost",
        costs: [75, 130],
        lvl: [6, 9],
        mp: 3,
        desc: "Magini: teleport w kierunku patrzenia. Ranga 2: dalej.",
        cls: "mag",
      },
      frost: {
        name: "Mr\xF3z SLA",
        trainer: "ghost",
        costs: [80, 135],
        lvl: [6, 9],
        mp: 4,
        desc: "Magini: spowalnia i rani wrog\xF3w w sto\u017Cku.",
        cls: "mag",
      },
      barrier: {
        name: "Bariera Kolejkowa",
        trainer: "ghost",
        costs: [65, 110],
        lvl: [5, 8],
        mp: 5,
        desc: "Magini: tarcza absorbuj\u0105ca + regeneracja many.",
        cls: "mag",
      },
    }),
    (api.pn = {
      kawa: [30, 60, 90, 150, 240],
      ekspres: [20, 40, 70, 120, 200],
      magnes: [30, 60, 90, 180, 300],
    }),
    (api.Sf = {
      kawa: [40, 80, 140, 220],
      ekspres: [50, 100, 170, 260],
      magnes: [45, 90, 150, 240],
    }),
    (api.Mp = { kawa: "kamila", ekspres: "halina", magnes: "zenek" }));
  ((api.vi = 4), (api.Tk = [18, 28, 42, 60, 85]), (api.Ek = [14, 22, 34, 50, 72]));
  ((api.Ui = [
    "dash",
    "spin",
    "fury",
    "bash",
    "taunt",
    "fire",
    "ward",
    "seria",
    "trap",
    "multi",
    "roll",
    "blink",
    "frost",
    "barrier",
  ]),
    (api.np = {
      bogdan: "Wioska",
      halina: "Las Szept\xF3w",
      wanda: "Ku\u017Ania w Wiosce",
      zenek: "\u0141\u0105ka Czekania",
      ghost: "Kraina Nieumar\u0142ych",
    }));
  api.Kk = ["arm1", "edge1", "edge2", "arm2", "edge3", "arm3", "edge4", "rootEdge"];
  ((api.Ik = [
    { title: "Podstawy", ids: ["dash", "spin", "fury", "fire", "ward", "seria"] },
    { title: "Wojowniczka", ids: ["bash", "taunt"] },
    { title: "\u0141uczniczka", ids: ["trap", "multi", "roll"] },
    { title: "Magini", ids: ["blink", "frost", "barrier"] },
  ]),
    (api.Zn = {
      bogdan: "Mistrz Bogdan",
      jadzia: "Babcia Jadzia",
      kamila: "Pani Kamila",
      zenek: "My\u015Bliwy Zenek",
      kot: "Mruczek",
      halina: "Wied\u017Ama Halina",
      mietek: "Karczmarz Mietek",
      zbyszek: "Bard Zbyszek",
      wanda: "Kowalka Wanda",
      piotr: "Naczelnik Piotr",
      basia: "Analityczka Basia",
      ghost: "Duch Helpdesku",
      lidia: "Lichwa Lidia",
      horacy: "Zegarmistrz Horacy",
      iga: "Alchemiczka Iga",
      zdzich: "Pan Zdzisiek",
      grazyna: "S\u0105siadka Gra\u017Cyna",
      filip: "Ma\u0142y Filip",
      darek: "Kurier Darek",
      ola: "Pasterka Ola",
      rysiek: "W\u0119dkarz Rysiek",
      edek: "Grzybiarz Edek",
      staszek: "Rolnik Staszek",
      mirek: "Pustelnik Mirek",
      henio: "Sta\u0142y Bywalec Henio",
      kuba: "Sta\u017Cysta Kuba",
      roma: "Archiwistka Roma",
      gienia: "Laborantka Gienia",
      wicek: "Pasterz Wicek",
      genowefa: "Sąsiadka Genowefa",
      franek: "Franek od Płota",
      hela: "Pasterka Hela",
    }),
    (api.Wk = 1),
    (api.vt = (e, t, n) => Math.max(t, Math.min(n, e))),
    (api.me = (e, t, n = 0) => {
      let i = (e * 374761393 + t * 668265263 + n * 1442695041) | 0;
      return ((i = Math.imul(i ^ (i >>> 13), 1274126177)), ((i ^ (i >>> 16)) >>> 0) / 4294967296);
    }),
    (api.Ze = (e) =>
      6 +
      e.st.vit * 2 +
      e.bonusHp +
      (e.spec === "straz" ? 6 : 0) +
      (e.f.arm1 ? 2 : 0) +
      (e.f.arm2 ? 3 : 0) +
      (e.f.arm3 ? 4 : 0)),
    (api.Dp = (e) =>
      (e.f.edge1 ? 1 : 0) +
      (e.f.edge2 ? 1 : 0) +
      (e.f.edge3 ? 1 : 0) +
      (e.f.edge4 ? 1 : 0) +
      (e.f.rootEdge ? 1 : 0)),
    (api.ut = (e) => 4 + e.st.mnd * 2 + e.bonusMp),
    (api.Rp = (e) =>
      (64 + e.st.dex * 3) * (e.buf.kawa > 0 ? 1.4 : 1) * (e.spec === "trop" ? 1.15 : 1)),
    (api.$o = (e) => 8 + e * 8 + Math.floor(e * e * 0.6)),
    (api.Wf = (e) => Math.min(0.5, e.st.dex * 0.03 + (e.spec === "snajper" ? 0.15 : 0))),
    (api.Tf = (e, t) =>
      Math.max(
        1,
        api.Pt[t].mp - (e.look.cls === "mag" ? 1 : 0) - (t === "fire" && e.spec === "piro" ? 1 : 0),
      )));
  ((api._k = (e) => {
    let t = api.jn[e.weapon].cd,
      n = Math.min(0.22, e.st.dex * 0.012),
      i = Math.max(0.28, t - n);
    return (
      e.spec === "berserk" &&
        (e.weapon === "miecz" || e.weapon === "eskalacja" || e.weapon === "zaglada") &&
        (i *= 0.9),
      i
    );
  }),
    (api.Y = (e) => e * api.T + 8),
    (api.Cn = (e) => api.qe[e.zone]));
  ((api._f = null), (api.ji = null));
  ((api.Fk = [
    1, 1.25, 1.55, 1.7, 2.1, 2.5, 1, 1, 1.35, 2.2, 2.6, 2.4, 2.9, 3.3, 3.6, 4, 1.1, 1.1, 1.1, 1.1,
    1.4, 1.6, 1.8, 2.4, 4.8, 5.4, 4.9, 5.1, 5.2, 5.5, 1.2, 1.15, 1.2, 1.5, 1.7, 1, 3.3, 5.8, 1.25,
    1.1, 1.1, 2.2, 2.8, 2.6, 1.8, 1.8, 3.2, 1.8, 2, 2.2, 2.5, 2.8, 3.1, 3.4, 3.8, 4.2, 4.6, 5, 5.5,
    6.2,
  ]),
    (api.Df = [
      1, 2, 4, 6, 8, 10, 1, 1, 2, 9, 11, 10, 13, 15, 16, 18, 2, 2, 2, 2, 3, 5, 6, 10, 20, 22, 20,
      21, 21, 22, 2, 2, 2, 3, 5, 1, 15, 24, 2, 2, 2, 8, 9, 8, 4, 4, 10, 4, 6, 8, 10, 12, 14, 16, 18,
      20, 22, 24, 26, 28,
    ]),
    (api.Uk = {
      slime: 0,
      gold: 1,
      bat: 0,
      spam: 1,
      nest: 2,
      ticket: 1,
      charger: 2,
      shield: 3,
      phone: 2,
      zombie: 2,
      king: 3,
      golem: 5,
      phantom: 5,
      lich: 6,
      spider: 3,
      rat: 0,
      snake: 1,
      audit: 6,
      morok: 0,
    }));
  ((api.Ip = new Set(["sp:1:10:10", "sp:1:25:20", "sp:2:5:20", "sp:9:8:8", "sp:11:6:18"])),
    (api.Yk = 180));
  api.eh = [
    { npc: "bogdan", topic: "seal", needs: ["bogdan"] },
    { npc: "bogdan", topic: "ruins", needs: ["seal"] },
    { npc: "bogdan", topic: "act2", needs: ["won"] },
    { npc: "bogdan", topic: "west", needs: ["act2"] },
    { npc: "bogdan", topic: "south", needs: ["act2"] },
    { npc: "bogdan", topic: "undead", needs: ["westKey", "southKey"] },
    { npc: "mietek", topic: "cellar", needs: ["bogdan"] },
    { npc: "mietek", topic: "gossip", needs: ["bogdan"] },
    { npc: "zbyszek", topic: "lute", needs: ["seal"] },
    { npc: "piotr", topic: "westjob", needs: ["act2"] },
    { npc: "piotr", topic: "depot", needs: ["westQ"] },
    { npc: "basia", topic: "southjob", needs: ["act2"] },
    { npc: "basia", topic: "swamp", needs: ["southQ"] },
    { npc: "ghost", topic: "lich", needs: ["undead"] },
    { npc: "ghost", topic: "how", needs: ["undead"] },
    { npc: "ghost", topic: "train", needs: ["undead"] },
    { npc: "wanda", topic: "tip2", needs: ["act2"] },
    { npc: "halina", topic: "dark", needs: ["westKey"] },
    { npc: "horacy", topic: "gears", needs: ["bogdan"] },
    { npc: "horacy", topic: "tick", needs: ["seal"] },
  ];
  api.az = new Set(Object.keys(api.bp));
  ((api.Os = (e) => api.Qi.find((t) => t.id === e)),
    (api.Hf = (e, t) => !!e.f["sq:" + t] && !e.f["sqd:" + t]));
  api.Aa = (e, t) => e.f["sqs:" + t.id] || 0;
  api.Wa = new Map();
  api.Is = {
    kamila: {
      body: "#2b4a7a",
      head: "#f1c7a0",
      hair: "#1e1a1a",
      style: 1,
      extra: "folder",
      legs: "#23233a",
      ombre: ["#1e1a1a", "#5a4632", "#8a6e48"],
    },
    zdzich: {
      body: "#e8762a",
      head: "#e8b890",
      hair: "#6a5a4a",
      style: 3,
      extra: "shovel",
      legs: "#3a4a6a",
    },
    grazyna: {
      body: "#b04a8a",
      head: "#f1c7a0",
      hair: "#c0392b",
      style: 2,
      extra: "pie",
      legs: "#4a2a3a",
    },
    filip: {
      body: "#3a8ad8",
      head: "#f1c7a0",
      hair: "#f2d16b",
      style: 0,
      extra: "cap",
      legs: "#2a3a5a",
      kid: !0,
    },
    darek: {
      body: "#d8b020",
      head: "#e8b890",
      hair: "#2b2b33",
      style: 0,
      extra: "box",
      legs: "#3a3a3a",
    },
    ola: {
      body: "#7aa83a",
      head: "#f1c7a0",
      hair: "#d9a03a",
      style: 1,
      extra: "crook",
      legs: "#5a3a20",
    },
    rysiek: {
      body: "#4a6a7a",
      head: "#e8b890",
      hair: "#8a8a8a",
      style: 0,
      extra: "rod",
      legs: "#3a3a2a",
    },
    edek: {
      body: "#8a6a3a",
      head: "#f1c7a0",
      hair: "#5a3a20",
      style: 0,
      extra: "hat",
      legs: "#3a2a1a",
    },
    staszek: {
      body: "#6a4a2a",
      head: "#e8b890",
      hair: "#c8c8d0",
      style: 0,
      extra: "straw",
      legs: "#3a4a6a",
    },
    mirek: {
      body: "#4a5a3a",
      head: "#d8c0a0",
      hair: "#e8e8f0",
      style: 1,
      extra: "beard",
      legs: "#2a2a1a",
    },
    henio: {
      body: "#7a3a3a",
      head: "#f1a090",
      hair: "#5a4a3a",
      style: 3,
      extra: "mug",
      legs: "#2a2a3a",
    },
    kuba: {
      body: "#5a6a8a",
      head: "#e0e8f0",
      hair: "#3a2418",
      style: 0,
      extra: "folder",
      legs: "#2a2a3a",
    },
    gienia: {
      body: "#1f4a55",
      head: "#f1c7a0",
      hair: "#2a2418",
      style: 2,
      extra: "box",
      legs: "#243038",
    },
    wicek: {
      body: "#6a8a3a",
      head: "#e8b890",
      hair: "#5a3a20",
      style: 0,
      extra: "crook",
      legs: "#3a4a2a",
    },
    genowefa: {
      body: "#a85a78",
      head: "#f1c7a0",
      hair: "#c8c8d0",
      style: 2,
      extra: "pie",
      legs: "#4a2a3a",
    },
    franek: {
      body: "#8a5a32",
      head: "#e8b890",
      hair: "#6a5a4a",
      style: 0,
      extra: "straw",
      legs: "#3a3a2a",
    },
    hela: {
      body: "#8a6a4a",
      head: "#f1c7a0",
      hair: "#6a3a28",
      style: 2,
      extra: "crook",
      legs: "#4a3a2a",
    },
  };
  api.cp = new Map();
  api.Ws = {
    grass: {
      g0: "#5a9e48",
      g1: "#4f8f3f",
      g2: "#78b85a",
      g3: "#3f7a34",
      d0: "#b08a5a",
      d1: "#8d6b43",
      d2: "#c9a676",
      can: ["#2e6b34", "#3f8a3f", "#5aa84d", "#7cc764"],
      trunk: "#6b4423",
    },
    garden: {
      g0: "#6cbf55",
      g1: "#5eae4a",
      g2: "#8ad86c",
      g3: "#4a9a3e",
      d0: "#d2b48c",
      d1: "#b0926a",
      d2: "#e8d0a8",
      can: ["#3a8a3e", "#4ea84a", "#6cc45c", "#9ae07a"],
      trunk: "#7a5230",
    },
    forest: {
      g0: "#3a6e3e",
      g1: "#335f36",
      g2: "#4f8a4c",
      g3: "#28502c",
      d0: "#6e5a3a",
      d1: "#55442a",
      d2: "#8a7450",
      can: ["#163c22", "#1f5530", "#2e7040", "#3f8a4c"],
      trunk: "#4a2e18",
    },
    ruins: {
      g0: "#7e7a68",
      g1: "#6e6a5a",
      g2: "#9a9580",
      g3: "#5a5648",
      d0: "#7e7a68",
      d1: "#6e6a5a",
      d2: "#9a9580",
      can: ["#2e6b34", "#3f8a3f", "#5aa84d", "#7cc764"],
      trunk: "#6b4423",
    },
    inn: {
      g0: "#8a5a32",
      g1: "#7a4c28",
      g2: "#a06a3c",
      g3: "#5e3a1e",
      d0: "#8a5a32",
      d1: "#7a4c28",
      d2: "#a06a3c",
      can: ["#2e6b34", "#3f8a3f", "#5aa84d", "#7cc764"],
      trunk: "#6b4423",
    },
    server: {
      g0: "#2e3350",
      g1: "#282c46",
      g2: "#3c4268",
      g3: "#1f2238",
      d0: "#2e3350",
      d1: "#282c46",
      d2: "#3c4268",
      can: ["#2e6b34", "#3f8a3f", "#5aa84d", "#7cc764"],
      trunk: "#6b4423",
    },
    swamp: {
      g0: "#3a6a48",
      g1: "#325a3e",
      g2: "#4a8060",
      g3: "#284830",
      d0: "#5a4a30",
      d1: "#463822",
      d2: "#6e5a3a",
      can: ["#1a3c28", "#245038", "#326848", "#3e7a55"],
      trunk: "#3a2818",
    },
    undead: {
      g0: "#2a3a2e",
      g1: "#243428",
      g2: "#3a4e40",
      g3: "#1a261c",
      d0: "#2a3a2e",
      d1: "#243428",
      d2: "#3a4e40",
      can: ["#1a3c28", "#245038", "#326848", "#3e7a55"],
      trunk: "#1a2818",
    },
    depot: {
      g0: "#6a5e4e",
      g1: "#5a5042",
      g2: "#7e7260",
      g3: "#4a4236",
      d0: "#6a5e4e",
      d1: "#5a5042",
      d2: "#7e7260",
      can: ["#2e6b34", "#3f8a3f", "#5aa84d", "#7cc764"],
      trunk: "#6b4423",
    },
  };
  api.Nf = class {
    constructor() {
      wn(this, "ctx", null);
      wn(this, "master", null);
      wn(this, "music", !0);
      wn(this, "sfx", !0);
      wn(this, "supported", !0);
      wn(this, "timer", 0);
      wn(this, "step", 0);
      wn(this, "theme", "grass");
      wn(this, "boss", !1);
    }
    init() {
      if (this.ctx) return (this.ctx.state === "suspended" && this.ctx.resume(), !0);
      try {
        let t = window.AudioContext || window.webkitAudioContext;
        return t
          ? ((this.ctx = new t()),
            (this.master = this.ctx.createGain()),
            (this.master.gain.value = 0.16),
            this.master.connect(this.ctx.destination),
            (this.timer = window.setInterval(() => this.tick(), 140)),
            !0)
          : ((this.supported = !1), !1);
      } catch {
        return ((this.supported = !1), !1);
      }
    }
    tone(t, n, i, a, r = 0, s = 0) {
      if (!this.ctx || !this.master) return;
      let u = this.ctx.currentTime + r,
        f = this.ctx.createOscillator(),
        c = this.ctx.createGain();
      ((f.type = i),
        f.frequency.setValueAtTime(t, u),
        s && f.frequency.exponentialRampToValueAtTime(Math.max(30, t + s), u + n),
        c.gain.setValueAtTime(a, u),
        c.gain.exponentialRampToValueAtTime(8e-4, u + n),
        f.connect(c),
        c.connect(this.master),
        f.start(u),
        f.stop(u + n + 0.02));
    }
    play(t) {
      if (t.indexOf("zone:") === 0) {
        this.theme = t.slice(5);
        return;
      }
      if ((t === "boss" && (this.boss = !0), !(!this.sfx || !this.ctx)))
        switch (t) {
          case "swing":
            this.tone(520, 0.08, "square", 0.12, 0, -300);
            break;
          case "hit":
            this.tone(180, 0.07, "square", 0.18, 0, -60);
            break;
          case "crit":
            this.tone(260, 0.1, "square", 0.2, 0, 300);
            break;
          case "kill":
            (this.tone(330, 0.06, "square", 0.15), this.tone(160, 0.12, "square", 0.15, 0.05, -80));
            break;
          case "coin":
            (this.tone(988, 0.06, "square", 0.1), this.tone(1319, 0.12, "square", 0.1, 0.06));
            break;
          case "hurt":
            this.tone(220, 0.25, "sawtooth", 0.2, 0, -150);
            break;
          case "level":
            [523, 659, 784, 1047].forEach((n, i) => this.tone(n, 0.18, "square", 0.12, i * 0.08));
            break;
          case "bow":
            this.tone(800, 0.08, "triangle", 0.15, 0, -400);
            break;
          case "xbow":
            this.tone(300, 0.12, "square", 0.18, 0, -150);
            break;
          case "magic":
            this.tone(500, 0.12, "sine", 0.18, 0, 500);
            break;
          case "spark":
            this.tone(700, 0.05, "sine", 0.1);
            break;
          case "zap":
            this.tone(1200, 0.15, "sawtooth", 0.12, 0, -900);
            break;
          case "fire":
            this.tone(200, 0.2, "sawtooth", 0.15, 0, 200);
            break;
          case "boom":
            this.tone(120, 0.3, "sawtooth", 0.22, 0, -80);
            break;
          case "thud":
            this.tone(90, 0.2, "square", 0.22, 0, -40);
            break;
          case "cut":
            this.tone(400, 0.05, "square", 0.08, 0, -200);
            break;
          case "lever":
            (this.tone(150, 0.15, "square", 0.18), this.tone(300, 0.25, "triangle", 0.15, 0.12));
            break;
          case "push":
            this.tone(110, 0.12, "triangle", 0.18);
            break;
          case "chime":
            this.tone(1047, 0.25, "triangle", 0.14);
            break;
          case "chest":
            [392, 523, 659, 784].forEach((n, i) => this.tone(n, 0.2, "triangle", 0.15, i * 0.07));
            break;
          case "item":
            [659, 784, 1047].forEach((n, i) => this.tone(n, 0.22, "square", 0.12, i * 0.09));
            break;
          case "power":
            this.tone(440, 0.3, "square", 0.12, 0, 440);
            break;
          case "heal":
            this.tone(660, 0.15, "sine", 0.15, 0, 220);
            break;
          case "shrine":
            [523, 784, 1047, 1568].forEach((n, i) => this.tone(n, 0.3, "sine", 0.12, i * 0.1));
            break;
          case "block":
            this.tone(900, 0.1, "triangle", 0.15);
            break;
          case "parry":
            this.tone(1400, 0.1, "square", 0.12, 0, -400);
            break;
          case "dash":
            this.tone(300, 0.1, "triangle", 0.12, 0, 300);
            break;
          case "spin":
            this.tone(400, 0.25, "sawtooth", 0.12, 0, 400);
            break;
          case "eshot":
            this.tone(260, 0.08, "square", 0.06, 0, 120);
            break;
          case "swap":
            this.tone(600, 0.05, "square", 0.08);
            break;
          case "boss":
            [110, 104, 98].forEach((n, i) => this.tone(n, 0.4, "sawtooth", 0.18, i * 0.35));
            break;
          case "win":
            [523, 659, 784, 1047, 1319].forEach((n, i) =>
              this.tone(n, 0.4, "square", 0.12, i * 0.12),
            );
            break;
        }
    }
    tick() {
      if (!this.ctx || !this.music || this.ctx.state !== "running") return;
      let t = {
          grass: [262, 294, 330, 392, 440, 523],
          garden: [294, 330, 370, 440, 494, 587],
          forest: [220, 262, 294, 330, 392, 440],
          ruins: [196, 220, 233, 294, 311, 392],
          server: [147, 165, 175, 220, 233, 294],
          inn: [262, 330, 392, 440, 523, 659],
          swamp: [196, 220, 247, 294, 330, 370],
          undead: [110, 131, 147, 165, 196, 220],
          depot: [175, 196, 220, 262, 294, 330],
        },
        n = t[this.boss && this.theme === "server" ? "server" : this.theme] || t.grass,
        i = this.step++,
        a = [0, 2, 4, 2, 3, 1, 4, 5, 3, 2, 0, 1, 2, 4, 3, 1],
        r = Math.floor(i / 16) % 4;
      (i % 2 === 0 &&
        this.tone(n[(a[((i / 2) % 16) | 0] + r) % n.length] * 2, 0.22, "triangle", 0.05),
        i % 8 === 0 && this.tone(n[r % 3] / 2, 0.6, "square", 0.035),
        (this.theme === "server" || this.theme === "undead") &&
          i % 2 === 1 &&
          this.tone(80, 0.05, "square", 0.03),
        this.theme === "swamp" && i % 4 === 1 && this.tone(90, 0.08, "triangle", 0.025));
    }
    stop() {
      (this.timer && window.clearInterval(this.timer),
        (this.timer = 0),
        this.ctx && this.ctx.close(),
        (this.ctx = null));
    }
  };
};
api.r2 = api.initData;
