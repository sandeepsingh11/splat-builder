import { getUserLoadouts } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

import _translations from "$lib/Leanny/translations.json";
import _weapons from "$lib/Leanny/latest/weapons.json";

interface loadoutObj {
    id: number,
    title: string | null,
    description: string | null,
    rm: boolean,
    cb: boolean,
    sz: boolean,
    tc: boolean,
    weaponName: string,
    weaponLocalName: string,
    subName: string,
    subLocalName: string,
    specialName: string,
    specialLocalName: string,
    createdAt: Date,
    updatedAt: Date,
    gears: {
        skill1: string | null,
        skill2: string | null,
        skill3: string | null,
        skill4: string | null,
        gear: string | null
    }[]
};

export const load: PageServerLoad = async ({locals}) => {
    const weaponLocal: {[key: string]: string} = _translations.USen.WeaponName_Main;
    const subLocal: {[key: string]: string} = _translations.USen.WeaponName_Sub;
    const specialLocal: {[key: string]: string} = _translations.USen.WeaponName_Special;
    
    const weapons = Object.entries(_weapons);
    const weaponNames = Object.keys(_weapons);

    const loadoutsWithGears = await getUserLoadouts(locals.id);

    // map out the loadout data
    let loadouts: loadoutObj[] = [];
    loadoutsWithGears.forEach(loadout => {
        const gears = [
            {
                skill1: loadout.h_skill1,
                skill2: loadout.h_skill2,
                skill3: loadout.h_skill3,
                skill4: loadout.h_skill4,
                gear: loadout.h_gear
            },
            {
                skill1: loadout.c_skill1,
                skill2: loadout.c_skill2,
                skill3: loadout.c_skill3,
                skill4: loadout.c_skill4,
                gear: loadout.c_gear
            },
            {
                skill1: loadout.s_skill1,
                skill2: loadout.s_skill2,
                skill3: loadout.s_skill3,
                skill4: loadout.s_skill4,
                gear: loadout.s_gear
            },
        ];        
        
        // get loadout's weapon data to map
        let weaponObj = {
            weaponName: loadout.l_weapon,
            weaponLocalName: '',
            subName: '',
            subLocalName: '',
            specialName: '',
            specialLocalName: '',
        };
        const weaponIndex = weaponNames.findIndex(weaponName => loadout.l_weapon === weaponName);
        if (weaponIndex !== -1) {
            weaponObj = {
                weaponName: loadout.l_weapon,
                weaponLocalName: weaponLocal[loadout.l_weapon],
                subName: weapons[weaponIndex][1].Sub,
                subLocalName: subLocal[weapons[weaponIndex][1].Sub],
                specialName: weapons[weaponIndex][1].Special,
                specialLocalName: specialLocal[weapons[weaponIndex][1].Special],
            }
        }

        // map loadout data
        loadouts.push({
            id: loadout.l_id,
            title: loadout.l_title,
            description: loadout.l_description,
            rm: loadout.l_rm,
            cb: loadout.l_cb,
            sz: loadout.l_sz,
            tc: loadout.l_tc,
            ...weaponObj,
            createdAt: loadout.l_created_at,
            updatedAt: loadout.l_updated_at,
            gears: gears
        });
    });


    return {
        locals,
        loadouts,
    }
};
