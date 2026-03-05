import { ResourceName } from "../Models/Resource"
import { RockName } from "../Models/Rock"

type RocksDescription = {
    [key in (RockName)]: string;
}

type ResourceDescription = {
    [key in ResourceName]: string
}


export const ResourceDescriptions: ResourceDescription = {
    voda: "",
    lavovy_kamen: "",
    kyslik: "",
    piesok: "",
    bor: "",
    fluor: "",
    hlinik: "",
    horcik: "",
    kremik: "",
    med: "",
    oxid_uhlicity: "",
    sira: "",
    sol: "",
    vapenec: "",
    zelezo: "",
}

export const ItemDescriptions: RocksDescription = {
    "kremen":  "Predstav si kameň, ktorý by si pokojne mohol(a) použiť ako superhrdinský štít - taký je kremen! Je veľmi tvrdý, takmer nič ho nezničí (tvrdosť 7). Je priehľadný alebo mliečne biely, no existujú aj farebné verzie - napríklad ružový ruženín alebo fialový ametyst. Kremen je jedným z najbežnejších minerálov na Zemi a používa sa napríklad pri výrobe skla, elektroniky, ale aj v hodinárstve. V zapaľovačoch dokonca vytvára iskry! Ak nájdeš kameň, ktorý poškrabe sklo - možno držíš kremeň.",
    "fluorite": "Fluorit je minerál ako z rozprávky! Vie svietiť pod UV svetlom a má nádherné farby - fialovú, zelenú, žltú či modrú. Je však veľmi krehký (tvrdosť iba 4), takže ak by bol hrdina, určite by si musel dávať pozor na pády. Fluorit je dôležitý pri výrobe hliníka a používa sa aj v zubných pastách s fluoridmi. Ak ho pozoruješ pod lampou, uvidíš, ako krásne láme svetlo. Vedci ho majú radi aj preto, že má dokonale kockový tvar kryštálov.", 
    "pyrite": "Viem, na čo myslíš - vyzerá ako zlato! A práve preto mu hovoria „bláznovo zlato“. Pyrit má kovový lesk, zlatistú farbu a rastie v krásnych kockách alebo mnohostenoch. Hoci to nie je skutočné zlato, je veľmi zaujímavý - obsahuje síru a železo, a pri silnom údere môže iskrieť. V chémii je super príkladom minerálu s obsahom síry. Ak ho nájdeš, nezbohatneš, ale určite budeš mať krásny kúsok do zbierky!", 
    "hematite": "Tento minerál by si si možno na prvý pohľad nevšimol - je tmavý, sivý až čierny, ale keď ho šuchneš o papier, zanechá červenohnedú stopu! Je to, ako keby si mal farbičku skrytú v kameni. Hematit je bohatý na železo, a preto je veľmi dôležitý pre hutníctvo. Keď ho vezmeš do ruky, bude ťažší než iné minerály rovnakej veľkosti - vďaka tomu sa ľahko rozpoznáva. Často sa používa aj v šperkoch, lebo krásne leskne.", 
    "malachite": "Tento minerál je ako zelený vír, plný pruhov a vlniek. Názov dostal podľa gréckeho slova pre slez, rastlinu s podobnou farbou. Malachit je mäkký, no veľmi zaujímavý - tiež obsahuje meď a krásne reaguje s kyselinou. Kedysi sa z neho vyrábali pigmenty do zelenej farby a dnes sa často používa v šperkoch. Niekedy rastie spolu s azuritom, takže nájdeš zeleno-modrú kombináciu - ako z maľby!", 
    "azurite": "Modrý ako nebo počas letného dňa - to je azurit! Tento krásny minerál vzniká tam, kde je v horninách meď. Je dosť mäkký a pri dotyku sa môže ľahko poškodiť, takže si ho radšej len obdivuj. V minulosti sa z neho vyrábali modré farby pre maliarov, dokonca aj na staré obrazy! V chémii je zaujímavý tým, že obsahuje meď, a pri reakcii s kyselinou šumí a mení farbu. Niekedy ho nájdeš aj spolu s malachitom.", 
    "kalcit":  "Kalcit je ako kúzelný kryštál - keď ním pozeráš na písmenká, vidíš ich dvojmo! Volá sa to dvojlom. Tento minerál tvorí vápenec a je súčasťou mnohých hornín. Reaguje s kyselinou octovou alebo chlorovodíkovou tým, že šumí - to je reakcia, ktorú si môžeš ľahko zapamätať na chémiu. Kalcit sa vyskytuje v rôznych farbách a tvaroch - ako stalaktity, kvaple alebo kryštály v horách.",
    "dolomite": "Dolomit je kalcitov tichší brat. Vyzerá podobne, no šumí až po zahriatí alebo silnom narušení. Obsahuje vápnik aj horčík, takže je výživný pre rastliny a dôležitý pre poľnohospodárstvo. V horách často tvorí celé dolomity (napr. Dolomity v Taliansku). Na dotyk je jemný a má krásne kryštály s rombickým tvarom.", 
    "gypsum":  "Mäkký ako maslo - sadrovec si môžeš poškriabať aj nechtom. V prírode tvorí veľké priehľadné kryštály, ktoré sa nazývajú selenit. Používa sa na výrobu sadry, ktorú poznáš z obväzov na zlomeniny, ale aj v stavebníctve. Je veľmi citlivý na vodu - ak ho necháš dlhšie vlhký, rozpadne sa. V chémii je príkladom minerálu s obsahom síranu vápenatého.",
    "halit":  "Halit je obyčajne priehľadný alebo biely minerál, ktorý chutí slano - preto mu hovoríme kamenná soľ. Vzniká vysychaním morských jazier a používa sa ako klasická soľ v kuchyni. Má krásne kockové kryštály a veľmi dobre sa rozpúšťa vo vode. Ak si raz budeš chcieť urobiť jednoduchý chemický pokus, halit je ideálny - vieš s ním pozorovať rozpúšťanie aj kryštalizáciu!",
    "olivin":  "Olivín je minerál zo sopiek - má krásnu olivovozelenú farbu a vzniká hlboko v zemskej kôre. Je tvrdý, lesklý a niekedy sa používa ako drahokam (volá sa peridot). Je veľmi starý - vedci ho našli aj v meteoritickom prachu! V chémii je bohatý na horčík a železo, čo ho robí dôležitým aj pre výskum Zeme.",
    "serpentine": "Serpentín je ako dračia koža - zelený, šupinatý a zvláštne lesklý. Názov dostal podľa „hada“ (lat. serpens), pretože jeho povrch pripomína hadiu kožu. Je mäkký a klzký, často sa používa ako dekoračný kameň. Serpentín vzniká premenou ultrabázických hornín v hlbinách zemskej kôry a obsahuje veľa horčíka. Niektoré jeho druhy sa využívali aj ako stavebný materiál, ale pozor - niektoré obsahujú aj azbest, ktorý je dnes považovaný za škodlivý. V chemii si ho môžeš zapamätať ako minerál s horčíkom a zeleným sfarbením.", 
    "amfibol":  "Amfibol je čierny alebo tmavozelený minerál, ktorý vyzerá ako ostré ihličky alebo dlhé stĺpce. Jeho názov znie ako meno superzloducha, ale v skutočnosti je hrdinom medzi minerálmi v metamorfovaných horninách. Obsahuje vápnik, železo, horčík aj hliník. Je stredne tvrdý a má matný až sklený lesk. V chémii je zaujímavý tým, že je bohatý na rôzne prvky a tvorí zložité reťazcové štruktúry. Jeho najznámejší zástupca sa volá hornblend. V prírode ho nájdeš vo vulkanických a premenených horninách.",
    "biotite": "Biotit je tmavý slídový minerál - vyzerá ako čierny papier, ktorý sa dá odlupovať na tenké plátky. Je veľmi krehký a lesklý. Biotit obsahuje železo a horčík, preto má tmavú farbu. V prírode ho nájdeš v granitoch, sopečných horninách a rôznych premenených horninách. V chémii je dôležitý pre svoju štruktúru - vrstvičkovú mriežku, ktorá mu umožňuje ľahko sa deliť. Keď ho nájdeš v skale, bude sa lesknúť ako drobné čierne zrkadlá.", 
    "muscovit":  "Muskovit je svetlý brat biotitu - hovoríme mu aj 'okenná slída', pretože kedysi sa z jeho plátkov robili okenné tabuľky! Je priesvitný, veľmi lesklý a odlupuje sa na tenké lístky. Obsahuje draslík, hliník a kremík. Nájdeš ho v žulách aj v premenených horninách. Keďže je výborným izolantom, používal sa v elektronike. Deti si ho ľahko zapamätajú ako 'miniatúrne zrkadielka', ktoré sú v skale a dajú sa odlúpnuť.",
    "feldspat":  "Živec je veľmi bežný minerál - až 60 % zemskej kôry tvorí práve on! Môže byť ružový, biely, sivý alebo krémový. Tvrdosť má ako kremen, ale leskne sa menej a nemá iskrenie. Je dôležitý v keramike a sklárstve - bez živcov by neboli taniere, šálky ani obkladačky! V chémii je zaujímavý obsahom draslíka, sodíka a vápnika. Najznámejšie druhy sú ortoklas, plagioklas a mikroklin. Keď nabudúce uvidíš lesklú ružovú žulu - pozoruješ živce!",
    "garnet":  "Granát nie je len ovocie! Tento minerál má tmavočervenú až hnedú farbu a kryštály ako malé guličky alebo dvanásťstenné telieska. Je tvrdý a lesklý - preto sa používa v šperkoch aj ako brusivo. V chémii obsahuje rôzne prvky ako hliník, železo alebo vápnik, podľa toho, aký typ granátu to je. V prírode vzniká pri vysokých teplotách a tlakoch, takže ak nájdeš granát, držíš v ruke kúsok hlbinovej histórie Zeme.",
    "turmaline": "Turmalín je farebný kúzelník medzi minerálmi - môže byť ružový, zelený, čierny, modrý alebo dokonca dúhový! Má zvláštnu kryštalickú štruktúru, ktorá mu dáva schopnosť pri zahrievaní vytvárať elektrický náboj - to sa volá pyroelektricita. Je tvrdý a veľmi cenený v šperkárstve. V chémii má zloženie ako recept na lektvar - obsahuje bor, hliník, sodík, železo a ďalšie prvky. Turmalín je jednoducho čarovný minerál, ktorý má aj magnetické vlastnosti.", 
    "opal":  "Opál je ako mliečny drahokam, ktorý vie hrať všetkými farbami dúhy - tento jav sa volá opalizácia. V skutočnosti to nie je úplne kryštalický minerál, ale skôr tvrdý gél plný vody a kremíka. Preto je krehký a citlivý na sucho či teplo. V chémii si ho zapamätáš ako formu oxidu kremičitého s vodou. Vzniká pomaly v pôde alebo v dutinách hornín. Opál je obľúbený drahokam - ak máš šťastie, možno ho raz nájdeš v sopečnej oblasti!",
}

// these comments are linked with sections in figma (info o kamenoch/+png page)
type Info = {
    steps: string //postup - prvky
    conditions: string //podmienky
    creationText: string //vznik
}

export const RockInfo: Record<RockName, Info> = {
    "kremen": {
        conditions: `Teplota: 100-600 °C. 
Tlak: mierny až vysoký.
Prostredie: vyplňovanie puklín v horninách alebo tvorba žil v horninách.`,
        creationText: "Keď sa nasýtený roztok kremíka a kyslíka ochladí → kryštalizuje sa kremeň.",
        steps: "kremík (Si) + kyslík (O)"
    },
    "fluorite": {
        conditions: `Teplota: 100-300 °C.
Prostredie: hydrotermálne žily, často spojené s vápencami.`,
        creationText: "Horúce fluórové roztoky, prúdiace cez pukliny hornín, reagujú s vápnikom → fluorit kryštalizuje.",
        steps: "vápnik (Ca) + fluór (F)"
    },
    "pyrite": {
        conditions: `Teplota: 200-500 °C.
Prostredie: sopečné a hydrotermálne oblasti.`,
        creationText: `Horúce plyny obsahujúce síru reagujú so železom v horninách → vzniká pyrit ("krištáľový kameň bláznov" - fool's gold)`,
        steps: "železo (Fe) + síra (S)"
    },
    "hematite": {
        conditions: `Teplota: rôzna (aj nižšia v povrchových podmienkach).
Prostredie: oxidujúce, často blízko povrchu Zeme.`,
        creationText: "Keď sa železo dostane do kontaktu s kyslíkom a vodou, oxiduje sa na hematit (červenohnedá farba).",
        steps: "železo (Fe) + kyslík (O)"
    },
    "malachite": {
        conditions: `Teplota: nízka (povrchové alebo blízko-povrchové podmienky).
Prostredie: zvetrávanie medených rúd v prítomnosti vody a oxidu uhličitého`,
        creationText: "Meď oxiduje a reaguje s CO₂ vo vode → vzniká malachit (zelený minerál).",
        steps: "meď (Cu) + karbonáty (CO₃) + voda (H₂O)"
    },
    "azurite": {
        conditions: `Teplota: nízka (povrchové podmienky).
Prostredie: oxidujúce, pri zvetrávaní medených rúd`,
        creationText: "Oxidácia medi v prítomnosti CO₂ a vody → kryštalizuje sa azurit (tmavomodrý minerál)",
        steps: "meď (Cu) + karbonáty (CO₃) + voda (H₂O)"
    },
    "kalcit": {
        conditions: `Teplota: široké rozpätie, často nízka.
Prostredie: sladkovodné a morské prostredie, jaskyne.`,
        creationText: "Keď je voda presýtená vápencom, vápnik sa vyzráža a vytvorí kalcit (napr. stalaktity, stalagmity).",
        steps: "vápnik (Ca) + karbonáty (CO₃)"
    },
    "dolomite": {
        conditions: `Teplota: nízka až mierna (50-200 °C).
Prostredie: morské sedimenty, podzemné vody.`,
        creationText: "Vápencové horniny sú neskôr preniknuté horčíkovými roztokmi → vytvára sa dolomit.",
        steps: "vápnik (Ca) + horčík (Mg) + karbonáty (CO₃)"
    },
    "gypsum": {
        conditions: `Teplota: nízka (v odparovacích oblastiach).
Prostredie: soľné jazerá, púštne oblasti.`,
        creationText: "Keď sa slané jazerá odparujú, zostáva za nimi sádrovec (často vo veľkých kryštáloch).",
        steps: "vápnik (Ca) + síran (SO₄) + voda (H₂O)"
    },
    "halit": {
        conditions: `Teplota: nízka (prírodné odparovanie).
Prostredie: soľné jazerá, lagúny.`,
        creationText: "Vysoká koncentrácia solí v odparujúcej sa vode → kryštalizuje sa halit (kuchynská soľ).",
        steps: "sodík (Na) + chlór (Cl)"
    },
    "olivin": {
        conditions: `Teplota: veľmi vysoká (1000-1200 °C).
Prostredie: hlboké magmatické horniny (peridotity, bazalty).`,
        creationText: "Ako magma chladne, olivín je jedným z prvých minerálov, ktorý sa kryštalizuje.",
        steps: "horčík (Mg) + železo (Fe) + kremík (Si)"
    },
    "serpentine": {
        conditions: `Teplota: 200-500 °C.
Prostredie: oceánska kôra, subdukčné zóny`,
        creationText: "Keď sa olivín dostane do kontaktu s vodou → vzniká serpentín (zelený minerál).",
        steps: "horčík (Mg) + kremík (Si) + voda (H₂O)"
    },
    "amfibol": {
        conditions: `Teplota: 500-900 °C.
Prostredie: hlboké magmatické horniny (diority, andezity)`,
        creationText: "Počas ochladzovania magmy vznikajú vláknité alebo ihličkovité kryštály amfib",
        steps: "horčík (Mg) + železo (Fe) + kremík (Si)"
    },
    "biotite": {
        conditions: `Teplota: 600-800 °C.
Prostredie: granity, metamorfované horniny.`,
        creationText: "Magma s dostatkom K a Mg → tvorba vrstvených šupiniek biotitu.",
        steps: "draslík (K) + horčík (Mg) + kremík (Si)"
    } ,
    "muscovit": {
        conditions: `Teplota: 300-700 °C.
Prostredie: granitické horniny, štruktúry vznikajúce pri nízkom stupni metamorfózy.`,
        creationText: "Hliníkaté minerály reagujú počas metamorfózy → vzniká muscovit (strieborné šupinky).",
        steps: "hliník (Al) + kremík (Si) + voda (H₂O)"
    },
    "feldspat": {
        conditions: `Teplota: 600-1100 °C.
Prostredie: plutonické horniny (napr. granit).`,
        creationText: "Pri pomalom ochladzovaní magmy vznikajú veľké kryštály feldspatu.",
        steps: "kremík (Si) + hliník (Al) + draslík (K) (alebo sodík, vápnik)."
    },
    "garnet": {
        conditions: `Teplota: 500-800 °C, vysoký tlak.
Prostredie: hlboké časti kontinentálnej kôry.`,
        creationText: "Pri vysokej teplote a tlaku dochádza k prestavbe minerálov → vzniká granát (červené, hnedé, zelené kryštály).",
        steps: "železo (Fe) + hliník (Al)"
    },
    "turmaline": {
        conditions: `Teplota: 400-700 °C.
Prostredie: pegmatity (veľké kryštály v magmatických žilách).`,
        creationText: "Pri ochladzovaní boritých fluíd vznikajú pestré kryštály turmalínu.",
        steps: "bór (B) + hliník (Al) + kremík (Si)"
    },
    "opal":{
        conditions: `Teplota: < 100 °C.
Prostredie: gejzíry, pramene, púštne oblasti.`,
        creationText: "Keď sa silikátové roztoky pomaly odparujú, vytvárajú opál (lesklý, farebný kameň)",
        steps: "kremík (Si) + voda (H₂O)"
    }
}