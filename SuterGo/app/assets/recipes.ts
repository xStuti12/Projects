import { Recipe } from "../Models/Recipe";

/** !!!!! IMPORTANT !!!!!!!
    Ked pridavas recept, tak nech je poradie potrebnych surovin v polickach dany po riadkoch :D
    je to velmi podstatne pre fungovanie crafting benchu (look for monkey way comment)
    samozrejme ked na nejakom policku nema byt nic, tak to ani nespominaj v recepte
    keby si si nie si isty ako napisat recept, tak ho nakresli v skicari (ako by to malo byt v crafting benchi) a napis petovi
    popride dobry hint mozes najst v Models/Recipe.ts (je tam nakresleny crafting bench aj so suradnicami ktore maju jednotlive policka)
 */


export const recipes: Recipe[] =[ 
    {
        recipeFor: "kremen",
        recipesPart: [
            {
                xPos: 1,
                yPos: 0,
                resourceName: "piesok"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "piesok"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "piesok"
            },
            {
                xPos: 2,
                yPos: 0,
                resourceName: "piesok"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "piesok"
            }
        ]
    },
    {
        recipeFor: "fluorite",
        recipesPart: [
            {
                xPos: 1,
                yPos: 0,
                resourceName: "vapenec"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "vapenec"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "vapenec"
            },
            {
                xPos: 2,
                yPos: 0,
                resourceName: "fluor"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "fluor"
            },
        ]
    },
    {
        recipeFor: "pyrite",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "sira"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "sira"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "zelezo"
            }
        ]
    },
    {
        recipeFor: "hematite",
        recipesPart: [
            {
                xPos: 0,
                yPos: 0,
                resourceName: "kyslik"
            },
            {
                xPos: 0,
                yPos: 1,
                resourceName: "kyslik"
            },
            {
                xPos: 0,
                yPos: 2,
                resourceName: "kyslik"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "zelezo"
            },
            {
                xPos: 1, 
                yPos: 1, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "zelezo"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "zelezo"
            },
        ]
    }, 
    {
        recipeFor: "malachite",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "oxid_uhlicity"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "med"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "voda"
            }
        ]
    }, 
    {
        recipeFor: "azurite",
        recipesPart: [
             {
                xPos: 0,
                yPos: 1,
                resourceName: "oxid_uhlicity"
            },
             {
                xPos: 1,
                yPos: 0,
                resourceName: "med"
            },
             {
                xPos: 1,
                yPos: 2,
                resourceName: "med"
            },
           {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "voda"
            }
        ]
    },
    {
        recipeFor: "kalcit",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "oxid_uhlicity"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "vapenec"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "voda"
            }
        ]
    },
    {
        recipeFor: "dolomite",
        recipesPart: [
            {
                xPos: 0,
                yPos: 0,
                resourceName: "horcik"
            },
            {
                xPos: 0,
                yPos: 1,
                resourceName: "oxid_uhlicity"
            },
            {
                xPos: 0,
                yPos: 2,
                resourceName: "horcik"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "vapenec"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "voda"
            }
        ]
    },
    {
        recipeFor: "gypsum",
        recipesPart: [
            {
                xPos: 1,
                yPos: 1,
                resourceName: "sol"
            },
            {
                xPos: 2,
                yPos:0,
                resourceName: "sira"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "sira"
            }
        ]
    },
    {
        recipeFor: "halit",
        recipesPart: [
            {
                xPos: 1, 
                yPos: 0, 
                resourceName: "sol"
            },
            {
                xPos: 1, 
                yPos: 1, 
                resourceName: "sol"
            },
            {
                xPos: 1, 
                yPos: 2, 
                resourceName: "sol"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "voda"
            }
        ]
    },
    {
        recipeFor: "olivin",
        recipesPart: [
            {
                xPos: 1,
                yPos: 0,
                resourceName: "horcik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "horcik"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "serpentine",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "voda"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "horcik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "horcik"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 2, 
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "amfibol",
        recipesPart: [
            {
                xPos: 1,
                yPos: 0,
                resourceName: "voda"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "voda"
            },
            {
                xPos: 2,
                yPos: 0,
                resourceName: "horcik"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "horcik"
            }
        ]
    },
    {
        recipeFor: "biotite",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "kremik"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "kremik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "kremik"
            },
            {
                xPos: 2,
                yPos: 0,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2, 
                yPos: 1, 
                resourceName: "zelezo"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "muscovit",
        recipesPart: [
            {
                xPos: 0,
                yPos: 0,
                resourceName: "hlinik"
            },
            {
                xPos: 0,
                yPos: 2,
                resourceName: "hlinik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "kremik"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "voda"
            }
        ]
    },
    {
        recipeFor: "feldspat",
        recipesPart: [
            {
                xPos: 0,
                yPos: 0,
                resourceName: "hlinik"
            },
            {
                xPos: 0,
                yPos: 2,
                resourceName: "hlinik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "kremik"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "garnet",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "hlinik"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "hlinik"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "hlinik"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "zelezo"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "turmaline",
        recipesPart: [
            {
                xPos: 0,
                yPos: 1,
                resourceName: "kremik"
            },
            {
                xPos: 1,
                yPos: 0,
                resourceName: "bor"
            },
            {
                xPos: 1,
                yPos: 1,
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 1,
                yPos: 2,
                resourceName: "bor"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "lavovy_kamen"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "hlinik"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "lavovy_kamen"
            }
        ]
    },
    {
        recipeFor: "opal",
        recipesPart: [
            {
                xPos: 1,
                yPos: 1,
                resourceName: "voda"
            },
            {
                xPos: 2, 
                yPos: 0, 
                resourceName: "voda"
            },
            {
                xPos: 2,
                yPos: 1,
                resourceName: "kremik"
            },
            {
                xPos: 2,
                yPos: 2,
                resourceName: "voda"
            }
        ]
    }
]