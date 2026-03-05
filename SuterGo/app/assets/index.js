import { Image, View } from "react-native";
import assetsRives from "./stoneRives";
import Rive from "rive-react-native";

const images = {
    //misc
    user_pin: require("./Red_Pin.png"),
    rock_pin: require("./Suter_pin.png"),
    user: require("./user.png"),
    settings: require("./settings.png"),
    backpack: require("./backpack.png"),
    close: require("./close.png"),
    info: require("./info.png"),    
    cave: require("./cave.png"),
    go_back: require("./go_back.png"),
    back: require("./Back.png"),
    boss: require("./Boss_Sketch.png"),
    healthbar: require("./HealthBar.png"),
    next_arrow: require("./right.png"),
    main_page_stones: require("./menu_kamene.png"),
    main_page_backpack: require("./menu_batoh.png"),
    main_page_map: require("./menu_mapa.png"),
    main_page_machine: require("./menu_stroj.png"),
    user_icon: require("./user_icon.png"),
    logo: require("./logo_round.png"),
    play_btn: require("./play_btn.png"),

    //stones
    malachite: require("./malachite.webp"),
    kremen: require("./kremen.png"),
    hematite: require("./hematite.png"),
    kalcit: require("./kalcit.png"),
    dolomite: require("./dolomite.png"),
    gypsum: require("./gypsum.webp"),
    muscovit: require("./placeholder.png"),
    fluorite: require("./placeholder.png"),
    malachite: require("./malachite.webp"),
    azurite: require("./azurite.png"),
    biotite: require("./placeholder.png"),
    pyrite: require("./pyrite.png"),
    halit: require("./placeholder.png"),
    amfibol: require("./placeholder.png"),
    olivin: require("./placeholder.png"),
    serpentine: require("./placeholder.png"),
    turmaline: require("./placeholder.png"),
    opal: require("./placeholder.png"),
    feldspat: require("./placeholder.png"),
    garnet: require("./placeholder.png"),


    real_malachite: require("./realne_kamene/malachite.png"),
    real_kremen: require("./realne_kamene/kremen.png"),
    real_hematite: require("./realne_kamene/hematite.png"),
    real_kalcit: require("./realne_kamene/kalcit.png"),
    real_dolomite: require("./realne_kamene/dolomite.png"),
    real_gypsum: require("./realne_kamene/gypsum.png"),
    real_muscovit: require("./realne_kamene/muscovit.png"),
    real_fluorite: require("./realne_kamene/fluorite.png"),
    real_malachite: require("./realne_kamene/malachite.png"),
    real_azurite: require("./realne_kamene/azurite.png"),
    real_biotite: require("./realne_kamene/biotite.png"),
    real_pyrite: require("./realne_kamene/pyrite.png"),
    real_halit: require("./realne_kamene/halit.png"),
    real_amfibol: require("./realne_kamene/amfibol.png"),
    real_olivin: require("./realne_kamene/olivin.png"),
    real_serpentine: require("./realne_kamene/serpentine.png"),
    real_turmaline: require("./realne_kamene/turmaline.png"),
    real_opal: require("./realne_kamene/opal.png"),
    real_feldspat: require("./realne_kamene/feldspat.png"),
    real_garnet: require("./realne_kamene/garnet.png"),

    //resources
    voda: require("./voda.png"),
    lavovy_kamen: require("./lavovy_kamen.png"),
    kyslik: require("./kyslik.png"),
    piesok: require("./piesok.png"),
    bor: require("./bor.png"),
    fluor: require("./fluor.png"),
    hlinik: require("./hlinik.png"),
    horcik: require("./horcik.png"),
    kremik: require("./kremik.png"),
    med: require("./med.png"),
    oxid_uhlicity: require("./oxid_uhlicity.png"),
    sira: require("./sira.png"),
    sol: require("./sol.png"),
    vapenec: require("./vapenec.png"),
    zelezo: require("./zelezo.png"),
    
    
    //powers
    water: require("./kvapka.png"),
    cloud: require("./mrak.png"),
    fire: require("./fire.png"),
    nature: require("./neviem.png"),
    freeze: require("./vlocka.png"),
    heal: require("./heal.png"),


    placeholder: require("./placeholder.png")
}

export const getImage = (key, style, elementKey) => {
    const imageSource = images[key];
    if(elementKey){
        return <Image source={imageSource} style={style} key={elementKey} resizeMode="contain" />    
    }
    return <Image source={imageSource} style={style} resizeMode="contain" />
}

export default images;