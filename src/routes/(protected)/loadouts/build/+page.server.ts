import type { Actions, PageServerLoad } from "./$types";
import _weapons from "$lib/Leanny/latest/weapons.json";
import _translations from "$lib/Leanny/translations.json";
import { createLoadout, getUserGears, getWeaponByName } from "$lib/server/database";
import { fail, redirect } from "@sveltejs/kit";

type userGear = {
    id: string,
    name: string,
    localizedName: string,
    skill1: skill,
    skill2: skill,
    skill3: skill,
    skill4: skill,
}

type skill = {
    name: string,
    localizedName: string
}

type skillBubble = {
    number: number,
    id: string,
    name: string,
    isMain: boolean
}

type searchSelectObj = {
    id: string,
    name: string
}

type weapon = {
    id: string, 
    name: string,
    subId: string,
    subName: string, 
    specialId: string,
    specialName: string, 
}

export const load: PageServerLoad = async ({ locals }) => {
    const localization = _translations['USen'];
    const headLocalization: {[key: string]: string} = localization.GearName_Head;
    const clothesLocalization: {[key: string]: string} = localization.GearName_Clothes;
    const shoesLocalization: {[key: string]: string} = localization.GearName_Shoes;
    const skillLocalization: {[key: string]: string} = localization.GearPowerName;

    const userGearsDb = await getUserGears(locals.id);
    let userGears: userGear[] = []; // modified userGearsDb
    let headGears: searchSelectObj[] = [];
    let clothesGears: searchSelectObj[] = [];
    let shoesGears: searchSelectObj[] = [];

    userGearsDb.forEach(gear => {
        userGears.push({
            id: gear.ug_id,
            name: gear.g_name,
            localizedName: gear.g_name_en,
            skill1: {name: gear.s1_name, localizedName: skillLocalization[gear.skill1]},
            skill2: {name: gear.s2_name, localizedName: skillLocalization[gear.skill2]},
            skill3: {name: gear.s3_name, localizedName: skillLocalization[gear.skill3]},
            skill4: {name: gear.s4_name, localizedName: skillLocalization[gear.skill4]},
        });

        if (gear.g_name.includes('Hed_')) {
            headGears.push({
                id: gear.ug_id,
                name: gear.ug_title ?? '(no title)'
            });
        }
        else if (gear.g_name.includes('Clt_')) {
            clothesGears.push({
                id: gear.ug_id,
                name: gear.ug_title ?? '(no title)'
            });
        }
        else {
            shoesGears.push({
                id: gear.ug_id,
                name: gear.ug_title ?? '(no title)'
            });
        }
    });

    const userGearsSorted = [
        headGears,
        clothesGears,
        shoesGears
    ];

    const selectedHeadGear = (userGearsSorted[0].length > 0)
        ? userGears.find(headGear => headGear.id === userGearsSorted[0][0].id)
        : null;
    const selectedClothesGear = (userGearsSorted[1].length > 0)
        ? userGears.find(clothesGear => clothesGear.id === userGearsSorted[1][0].id)
        : null;
    const selectedShoesGear = (userGearsSorted[2].length > 0)
        ? userGears.find(shoesGear => shoesGear.id === userGearsSorted[2][0].id)
        : null;

    let weapons: weapon[] = [];
    const localizedWeapons: {[key: string]: string} = localization.WeaponName_Main;
    const localizedSubs: {[key: string]: string} = localization.WeaponName_Sub;
    const localizedSpecials: {[key: string]: string} = localization.WeaponName_Special;
    const weaponObjs = Object.entries(_weapons);
    weaponObjs.forEach(weaponObj => {
        weapons.push({
            id: weaponObj[0],
            name: localizedWeapons[weaponObj[0]],
            subId: weaponObj[1].Sub,
            subName: localizedSubs[weaponObj[1].Sub],
            specialId: weaponObj[1].Special,
            specialName: localizedSpecials[weaponObj[1].Special],
        })
    });

    const selectedWeapon: weapon = weapons[0];

    let skillBubbles: skillBubble[] = [];
    for (let i = 0; i < 12; i++) {
        const r = i % 4;
        const skillIndex = (r === 0) ? 'skill1' : (r === 1) ? 'skill2' : (r === 3) ? 'skill3' : 'skill4';

        if (i < 4) {
            if (selectedHeadGear) {
                skillBubbles[i] = {
                    number: i + 1,
                    id: selectedHeadGear[skillIndex].name,
                    name: selectedHeadGear[skillIndex].localizedName,
                    isMain: (r === 0) ? true : false
                }
            }
            else {
                skillBubbles[i] = {
                    number: i + 1,
                    id: 'Unknown',
                    name: 'Unknown',
                    isMain: (r === 0) ? true : false
                }
            }
        }
        else if (i >= 4 && i < 8) {
            if (selectedClothesGear) {
                skillBubbles[i] = {
                    number: i + 1,
                    id: selectedClothesGear[skillIndex].name,
                    name: selectedClothesGear[skillIndex].localizedName,
                    isMain: (r === 0) ? true : false
                }
            }
            else {
                skillBubbles[i] = {
                    number: i + 1,
                    id: 'Unknown',
                    name: 'Unknown',
                    isMain: (r === 0) ? true : false
                }
            }
        }
        else {
            if (selectedShoesGear) {
                skillBubbles[i] = {
                    number: i + 1,
                    id: selectedShoesGear[skillIndex].name,
                    name: selectedShoesGear[skillIndex].localizedName,
                    isMain: (r === 0) ? true : false
                }
            }
            else {
                skillBubbles[i] = {
                    number: i + 1,
                    id: 'Unknown',
                    name: 'Unknown',
                    isMain: (r === 0) ? true : false
                }
            }
        }
    }
    

    return {
        userGears,
        userGearsSorted,
        selectedHeadGear,
        selectedClothesGear,
        selectedShoesGear,
        weapons,
        selectedWeapon,
        skillBubbles
    };
};

export const actions: Actions = {
    default: async ({request, locals}) => {
        const formData = await request.formData();
        const title = formData.get('loadout-title');
        const desc = formData.get('loadout-desc');
        let rm = formData.get('loadout-mode-rm') || false;
        let cb = formData.get('loadout-mode-cb') || false;
        let sz = formData.get('loadout-mode-sz') || false;
        let tc = formData.get('loadout-mode-tc') || false;
        let hGear = formData.get('select-head');
        let cGear = formData.get('select-clothes');
        let sGear = formData.get('select-shoes');
        const weapon = formData.get('select-weapon');
        
        // convert string to boolean
        rm = !!rm;
        cb = !!cb;
        sz = !!sz;
        tc = !!tc;
        
        if (
            !weapon ||
            typeof weapon !== 'string' ||
            typeof title !== 'string' ||
            typeof desc !== 'string'
        )
        {
            return fail(400, { invalid: true });
        }

        const weaponRow = await getWeaponByName(weapon);

        await createLoadout(
            locals.id,
            title,
            desc,
            rm,
            cb,
            sz,
            tc,
            hGear as number | null,
            cGear as number | null,
            sGear as number | null,
            weaponRow["id"]
        );
        
        
        // redirect the user
        throw redirect(302, '/loadouts')
    }
};
