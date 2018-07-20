# Alapozó képzés, gyakorlati záróvizsga

## Indulás
Futtasd le a _sql/datas.sql_ fileod tartamát az általad használt adatbázis kezelőben.
Ezzel létrejön egy starwars nevű adatbázis, és benne egy transport table.
Ez a tábla starwars-os űrhajók adatait tartalmazza.
Tanulmányozd át a táblát. Nézd meg melyik kötelező adat, és milyen egyéb megszorítások vannak. Nézd meg a tárolt adatokat.

Az img mappákban találhatók az űrhajók képei. Az adatbázisban az _image_
oszlop tartalmazza az űrhajó képének nevét.

## SQL
Az alábbi lekérdezéseket írd meg mySQL-ben, és a lekérdezéseket a
_sql/queries.txt_ fileba mentsd el.

1. Kérdezd le, hogy melyik gyártóhoz hány model tartozik. (Tehát a gyártó neve, és mellé a darabszám.)

2. Kérdezd le, a három legnagyobb teherbírással (cargo_capacity) rendelkező hajó model (model) nevét, gyártóját(manufacturer), és képét (image)

3. Kérdezd le azon hajók model nevét(model), mint Típus (tehát alias name-el), 
* melyeknél a gyártó neve(manufacturer) A-val, B-vel, vagy C-vel kezdődik és
* melyeknél mind a cargo_capacity, a passengers, a max_atmospheric_speed, és a crew értéke is 1,

4. Kérdezd le azon hajók minden adatát, 
* melynek gyártójának(manufacturer) nevében szerepel a Corporation szó, 
* az utasok száma(passangers) nagyobb, mint 0, 
* az ár(cost_in_creadits) pedig 10000, és 200000 közötti.

5. Kérdezd le az első három hajó nevét(model), mint Megnevezés, és gyártóját(manufacturer), mint Gyártó a legénység száma(crew) szerint csoportosítva
* melyeknél a legénység(crew) száma 1 és 5 közötti, és
* meg van adva (nem NULL), és nem 0 a passengers, és a cargo_capacity értéke

6. Exportáld ki egy _spaceships.json_ nevű JSON fileba a teljes adatbázis táblád, és másold ezt a filet a json mappába.

## Alapkövetelmények
__Az index.html file-ba nem szabad beleírnod manuálisan semmit. Csak javascript segítségével manipulálhatod a DOM-ot.__

__A style.css__ file-t szabd testre, hogy egyedi legyen az oldalad.

JSON content-et stringifyolva ne írj a html-be.

A végső javaScriptel módosított html file tartalma legyen valid.

Az javaScript kódnak 100%-ban meg kell felelnie a beállított ESlint szabályoknak.

### Feladatok
1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe.
2. Töröld az összes olyan adatot, ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra
4. A spaceship-list class-ű divbe jelenítsd meg az így kapott hajók adatait, beleérve a képét is.
5. Készítened kell egy statisztikát, mely a spaceship-list class-ű div aljára a következő adatokat fogja beleírni:
* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
* Az összes hajó utasainak (passengers) összesített száma
* A leghosszabb(lengthiness) hajó képe

6. A jobb oldalon található keresősáv segítségével legyen lehetőség a hajókra rákeresni _model_ szerint. 
* A keresés kattintásra induljon
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, nem foglalkozunk velük, az első találat eredményét (tehát az első megfelelő névvel rendelkező hajó adatait) adjuk vissza.
* Az adott hajó adatait a one-spaceship class-ű div-be kell megjeleníteni rendezett formában, képpel együtt.

## Git
Az ekészült munkádat tedd fel egy git repo-ba githubra. A repo neve az alábbi formátum szerint legyen megadva: vezeteknev-keresztnev-zarogyakorlo.
Értelemszerűen a saját vezeték és keresztneved add meg.
Ha kész vagy a github repo linkjét küld el az oktató email címére.
