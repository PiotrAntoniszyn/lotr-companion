// Static game data. Heroes, pools and rules come from github.com/je3yk/boardgame-setup (src/data, src/pages/zasady.astro).

export const STAT_NAMES = ['Siła', 'Mądrość', 'Zwinność', 'Duch', 'Spryt'];
export const STAT_SHORT = ['S', 'M', 'Z', 'D', 'Sp'];

export const EXPANSIONS = { base: 'Zestaw podstawowy', shadow: 'Cieniste ścieżki', war: 'Zarzewie wojny' };

export const ROLES = [
  { id: 'captain', pl: 'Kapitan', en: 'Captain' },
  { id: 'pathfinder', pl: 'Tropiciel', en: 'Pathfinder' },
  { id: 'burglar', pl: 'Włamywacz', en: 'Burglar' },
  { id: 'musician', pl: 'Muzyk', en: 'Musician' },
  { id: 'guardian', pl: 'Strażnik', en: 'Guardian' },
  { id: 'hunter', pl: 'Łowca', en: 'Hunter' },
  { id: 'herbalist', pl: 'Zielarz', en: 'Herbalist' },
  { id: 'delver', pl: 'Odkrywca', en: 'Delver' },
  { id: 'smith', pl: 'Kowal', en: 'Smith' },
  { id: 'traveller', pl: 'Podróżnik', en: 'Traveller' },
  { id: 'meddler', pl: 'Intrygant', en: 'Meddler' },
  { id: 'guide', pl: 'Przewodnik', en: 'Guide' },
  { id: 'soldier', pl: 'Żołnierz', en: 'Soldier' },
  { id: 'provisioner', pl: 'Zaopatrzeniowiec', en: 'Provisioner' },
  { id: 'lorekeeper', pl: 'Kronikarz', en: 'Lorekeeper' },
  { id: 'shieldmaiden', pl: 'Tarczowniczka', en: 'Shieldmaiden' },
  { id: 'trickster', pl: 'Sztukmistrz', en: 'Trickster' },
];

function hero(id, name, expansion, race, stats, damage, fear, inspiration, role, gear, ability, style, tip) {
  return { id, name, expansion, race, stats, damage, fear, inspiration, role, gear, ability, style, tip };
}

export const HEROES = [
  hero('aragorn', 'Aragorn', 'base', 'Człowiek', [3, 4, 2, 2, 3], 5, 5, 4, 'captain', 'Miecz, sztandar, strój podróżny', 'Podczas zwiadu w fazie przegrupowania ty i pobliscy bohaterowie odkrywacie po 1 dodatkowej karcie.', 'Dowodzenie', 'Dla gracza, który lubi planować wspólną turę i poprawiać przygotowanie drużyny.'),
  hero('beravor', 'Beravora', 'base', 'Człowiek', [3, 3, 3, 3, 2], 5, 5, 4, 'pathfinder', 'Kostur, strój podróżny', 'Raz na rundę, po użyciu sprintu, ukrycia lub uderzenia, możesz wykonać zwiad 1.', 'Eksploracja', 'Wszechstronna podróżniczka. Dobry wybór, jeśli chcesz odkrywać mapę i elastycznie reagować.'),
  hero('bilbo', 'Bilbo', 'base', 'Hobbit', [2, 2, 3, 3, 4], 3, 7, 6, 'burglar', 'Sztylet, płaszcz', 'Przed interakcją podejrzyj wierzchnią kartę talii. Jeśli ma symbol losu, zyskaj 1 natchnienie. Możesz zajmować ekwipunkiem tylko 1 rękę.', 'Spryt i interakcje', 'Świetny w sprytnych rozwiązaniach, ale uważaj na niski próg obrażeń.'),
  hero('elena', 'Elena', 'base', 'Elf', [2, 3, 2, 4, 3], 4, 6, 5, 'musician', 'Sztylet, harfa, płaszcz', 'Raz na test, po wydaniu przez ciebie 1 natchnienia, pobliski bohater zyskuje 1 natchnienie.', 'Wsparcie', 'Graj blisko kompanów i zamieniaj własne wydatki natchnienia w korzyści dla drużyny.'),
  hero('gimli', 'Gimli', 'base', 'Krasnolud', [4, 2, 2, 4, 2], 6, 4, 3, 'guardian', 'Topór bojowy, kolczuga', 'Po ataku możesz odłożyć 1 kartę z tego testu na wierzch swojej talii.', 'Walka i obrona', 'Mocna pierwsza linia. Zachowuj dobre karty na następny test, a strach traktuj poważnie.'),
  hero('legolas', 'Legolas', 'base', 'Elf', [2, 3, 4, 2, 3], 4, 6, 5, 'hunter', 'Wielki łuk, płaszcz', 'Raz na rundę w swojej turze możesz wydać 1 natchnienie, aby poruszyć się o 1 obszar bez prowokowania ataków.', 'Walka dystansowa', 'Mobilny łucznik dla gracza, który lubi dobierać pozycję i atakować z dystansu.'),
  hero('arwen', 'Arwena', 'shadow', 'Elf', [2, 4, 3, 3, 2], 4, 6, 5, 'herbalist', 'Nóż, proca, płaszcz', 'Raz w swojej turze ty lub pobliski bohater możecie zakryć 1 obrażenie albo strach, lub odrzucić 1 zakryte obrażenie albo strach.', 'Leczenie', 'Naturalne wsparcie drużyny. Wybierz ją, jeśli lubisz utrzymywać kompanów w dobrej formie.'),
  hero('balin', 'Balin', 'shadow', 'Krasnolud', [3, 3, 2, 4, 2], 6, 4, 4, 'delver', 'Toporek, tarcza, strój podróżny', 'Raz na rundę, po rozpatrzeniu wszystkich obrażeń z jednego źródła, możesz przygotować 1 umiejętność ze swojego stosu odrzuconych kart.', 'Wytrwałość', 'Obrażenia mogą przywrócić przydatną umiejętność. To taktyczna korzyść, nie powód, by szukać kłopotów.'),
  hero('dis', 'Dís', 'shadow', 'Krasnolud', [4, 2, 2, 3, 3], 5, 5, 3, 'smith', 'Młot, kolczuga', 'Po teście możesz wydać 1 symbol losu, aby odłożyć 1 kartę z tego testu na wierzch talii.', 'Walka i planowanie', 'Dla osoby, która lubi mocne ataki i kontrolowanie tego, co dobierze w kolejnym teście.'),
  hero('eleanor', 'Eleonora', 'shadow', 'Człowiek', [3, 2, 3, 3, 3], 5, 5, 4, 'traveller', 'Miecz, róg, strój podróżny', 'Raz na fazę bohater na twoim obszarze może wydać 1 natchnienie, aby zamienić 2 symbole losu na 2 sukcesy.', 'Wsparcie testów', 'Wspólny obszar daje lepszą wydajność natchnienia. Dobra do współpracy przy ważnych testach.'),
  hero('gandalf', 'Gandalf', 'shadow', 'Istari', [2, 4, 2, 4, 2], 6, 6, 5, 'meddler', 'Laska podróżna, miecz, płaszcz', 'Raz na rundę, po odrzuceniu przygotowanej umiejętności z symbolem losu, możesz zyskać 1 natchnienie i wykonać zwiad 1.', 'Kontrola talii', 'Dla gracza, który lubi łączyć efekty kart. Wysokie Mądrość i Duch pomagają poza walką.'),
  hero('beorn', 'Beorn', 'war', 'Beorning', [3, 3, 3, 2, 3], 6, 6, 3, 'guide', 'Topór bojowy, strój podróżny', 'Przed interakcją, jeśli nie ma pobliskich bohaterów, możesz wykonać zwiad 1. Karty Beorna umożliwiają przemianę w Wielkiego Niedźwiedzia.', 'Samodzielność', 'Lubi działać z dala od grupy. Niedźwiedź to alternatywna forma tego samego bohatera, nie osobny wybór; przemianę rozpatrz według kart.'),
  hero('boromir', 'Boromir', 'war', 'Człowiek', [4, 2, 3, 3, 3], 7, 3, 4, 'soldier', 'Miecz, róg, zbroja płytowa', 'Raz podczas testu ostatniej szansy możesz przyjąć 1 obrażenie albo strach, aby dodać do tego testu 1 sukces.', 'Pierwsza linia', 'Duży próg obrażeń, ale mały próg strachu. Zadbaj o wsparcie przy psychicznych zagrożeniach.'),
  hero('calaminth-took', 'Calaminth Tuk', 'war', 'Hobbit', [3, 2, 4, 2, 3], 3, 7, 6, 'provisioner', 'Buława, płaszcz', 'Po przygotowaniu umiejętności pomocy, pożywienia lub męstwa ty albo pobliski bohater możecie zyskać 1 natchnienie. Ekwipunek może zajmować tylko 1 rękę.', 'Zaopatrzenie', 'Wspiera grupę przygotowanymi umiejętnościami. Bardzo zwinna, lecz podatna na obrażenia.'),
  hero('dwalin', 'Dwalin', 'war', 'Krasnolud', [2, 3, 3, 3, 3], 5, 5, 4, 'lorekeeper', 'Włócznia, płaszcz', 'Po interakcji możesz wydać 1 natchnienie, aby przygotować 1 kartę ze swojego stosu odrzuconych kart. Limit: raz na interakcję.', 'Interakcje i karty', 'Łączy wykonywanie zadań z odzyskiwaniem umiejętności. Sprawdzi się u taktyka zarządzającego talią.'),
  hero('freahild', 'Fréahild', 'war', 'Człowiek', [3, 3, 2, 3, 3], 6, 4, 4, 'shieldmaiden', 'Włócznia, tarcza, pikowana zbroja', 'Możesz używać jednocześnie przedmiotu jednoręcznego i dwuręcznego. Podczas przygotowania możesz wybrać swojego wierzchowca Snowbright zamiast innego wierzchowca.', 'Obrona i mobilność', 'Dla osoby, która chce ochraniać grupę. Wierzchowce rozpatruj zgodnie z kampanią i aplikacją.'),
  hero('renerien', 'Rénëríen', 'war', 'Elf', [3, 2, 2, 3, 4], 5, 5, 4, 'trickster', 'Krótki łuk, pikowana zbroja', 'Akcja: wykonaj zwiad 2. Jeśli przygotujesz kartę z sukcesem, odrzuć 1 zakryte obrażenie albo strach. Jeśli z losem — zyskaj 1 natchnienie.', 'Spryt i elastyczność', 'Dużo decyzji przy przygotowywaniu kart. Pamiętaj, że jej zdolność zużywa akcję.'),
];

// Fixed pools drawn once on 2026-11-04 (assignments.json).
export const PLAYERS = [
  { id: 'jedrzej', name: 'Jędrzej', heroes: ['arwen', 'balin', 'gimli', 'gandalf', 'calaminth-took'] },
  { id: 'piotr', name: 'Piotr', heroes: ['boromir', 'aragorn', 'beorn', 'freahild'] },
  { id: 'michal', name: 'Michał', heroes: ['eleanor', 'elena', 'beravor', 'dwalin'] },
  { id: 'milosz', name: 'Miłosz', heroes: ['dis', 'renerien', 'legolas', 'bilbo'] },
];

export const TURN_RULES = [
  { title: 'Dwie akcje w turze', text: 'Podróż, atak lub interakcja — tę samą akcję możesz powtórzyć. Podróż = ruch do 2 obszarów; pomiędzy ruchami wolno wykonać drugą akcję. Każdy rozgrywa całą turę, zanim zacznie następny; kolejność bohaterów wybieracie.' },
  { title: 'Test = karty, nie kości', text: 'Odkryj tyle kart z talii, ile wynosi testowana cecha. Licz symbole sukcesu. Każde wydane natchnienie zamienia 1 symbol losu w 1 sukces. Pusta karta nic nie daje. Testowaną cechę wskazuje aplikacja, karta lub efekt.' },
  { title: 'Atak', text: 'Cechę wskazuje broń, nie automatycznie Siła. Sukcesy wydajesz na efekty broni, a trafienia i modyfikatory wpisujesz w aplikacji.' },
  { title: 'Prowokacja', text: 'Opuszczenie obszaru z wrogiem albo interakcja na takim obszarze może wywołać atak. Rozpatrz go w aplikacji przed wykonaniem czynności. Ukrycie i efekty kart mogą to zmienić.' },
  { title: 'Obrażenia i strach', text: 'Odkryte rozpatrujesz od razu, zakryte nadal liczą się do progu. Po osiągnięciu progu: test ostatniej szansy w aplikacji — to nie automatyczna porażka.' },
];

export const ROUND_PHASES = [
  { label: '01 · Faza akcji', title: 'Wasza kolej', text: 'Każdy bohater rozgrywa turę z dwiema akcjami.' },
  { label: '02 · Faza cienia', title: 'Śródziemie odpowiada', text: 'Aplikacja prowadzi aktywacje wrogów, ciemność i zagrożenie.' },
  { label: '03 · Przegrupowanie', title: 'Następny krok', text: 'Wtasuj odrzucone karty do talii, wykonaj zwiad 2: przygotuj maks. 1 z odkrytych kart, resztę połóż na wierzch lub spód talii.' },
];

export const QUICK_FACTS = [
  { term: 'Pobliski', text: 'Ten sam lub sąsiedni obszar. To nie to samo co „na twoim obszarze”.' },
  { term: 'Przygotowane karty', text: 'Leżą poza talią i dają efekty. Standardowo maks. 4.' },
  { term: 'Zwiad X', text: 'Odkryj X kart z wierzchu talii, przygotuj maks. 1, resztę połóż na wierzch lub spód.' },
  { term: 'Bohater ≠ rola', text: 'Bohater jest na całą kampanię. Rolę można zmienić między przygodami.' },
  { term: 'Wielki Niedźwiedź', text: 'Alternatywna forma Beorna, nie osobny bohater.' },
];

export const SOURCES = [
  { label: 'Learn to Play (PDF)', url: 'https://cdn.svc.asmodee.net/production-asmodeeca/uploads/2024/09/journeys_in_middle-earth_learn_to_play.pdf' },
  { label: 'Rules Reference (PDF)', url: 'https://images-cdn.fantasyflightgames.com/filer_public/01/a0/01a0c9f7-4427-4113-9406-f53d6bde2ff5/journeys_in_middle-earth_rules_reference.pdf' },
  { label: 'Drużyna Śródziemia (strona Jędrzeja)', url: 'https://je3yk.github.io/boardgame-setup/' },
  { label: 'JIME Companion (źródło tekstów kart)', url: 'https://jime-companion.therealbarenziah.com/' },
];
