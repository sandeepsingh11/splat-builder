// using the json output, go to this site to get the sql insert 
// statements: https://www.convertjson.com/json-to-sql.htm

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const version = process.argv[2]; // get argument from cli command

const dataDir = `${__dirname}/data`;
const weaponInfoPath = `${dataDir}/WeaponInfoMain.json`;
const brandsPath = `${dataDir}/spl__BrandTraitsParam.spl__BrandTraitsParam.json`;

const weaponOutputPath = `${__dirname}/output/weapons.json`;
const gearOutputPath = `${__dirname}/output/gears.json`;
const brandOutputPath = `${__dirname}/output/brands.json`;

const translation_en = `${dataDir}/USen.json`;

let weapons = [];
let gears = [];
let brands = [];

const skillsCols = ["name", "is_main"];
const subsCols = ["name"];
const specialsCols = ["name"];
const weaponsCols = [
    "name", 
    "sub_id", 
    "special_id", 
    "weapon_class",
    "special_point",
    "season",
    "price",
    "shop_unlock_rank"
];
const gearsCols = [
    "name",
    "skill_id",
    "brand_id",
    "gear_type",
    "price",
    "season",
    "rarity",
    "how_to_get"
];
const brandsCols = [
    "name",
    "primary_skill_id",
    "secondary_skill_id"
];

const skillsMapping = [
    'Action_Up',
    'ComeBack',
    'DeathMarking',
    'Exorcist',
    'ExSkillDouble',
    'HumanMove_Up',
    'InkRecovery_Up',
    'JumpTime_Save',
    'MainInk_Save',
    'MinorityUp',
    'ObjectEffect_Up',
    'OpInkEffect_Reduction',
    'RespawnSpecialGauge_Save',
    'RespawnTime_Save',
    'SomersaultLanding',
    'SpecialIncrease_Up',
    'SpecialSpec_Up',
    'SquidMove_Up',
    'SquidMoveSpatter_Reduction',
    'StartAllUp',
    'SubEffect_Reduction',
    'SubInk_Save',
    'SubSpec_Up',
    'SuperJumpSign_Hide',
    'TermalInk',
    'Unknown',
];
const subsMapping = [
    'Beacon',
    'Bomb_Curling',
    'Bomb_Fizzy',
    'Bomb_Quick',
    'Bomb_Robot',
    'Bomb_Splash',
    'Bomb_Suction',
    'Bomb_Torpedo',
    'LineMarker',
    'PointSensor',
    'PoisonMist',
    'Shield',
    'Sprinkler',
    'Trap',
];
const specialsMapping = [
    'Blower',
    'Castle',
    'Chariot',
    'EnergyStand',
    'Firework',
    'GreatBarrier',
    'InkStorm',
    'Jetpack',
    'MicroLaser',
    'MultiMissile',
    'NiceBall',
    'ShockSonar',
    'Skewer',
    'SuperHook',
    'SuperLanding',
    'TripleTornado',
    'UltraShot',
    'UltraStamp',
];
const brandsMapping = [
    "B00",
    "B01",
    "B02",
    "B03",
    "B04",
    "B05",
    "B06",
    "B07",
    "B08",
    "B09",
    "B10",
    "B11",
    "B15",
    "B16",
    "B17",
    "B18",
    "B19",
    "B20",
    "B97",
    "B98",
    "B99",
];

main();

function main() {
    // check if a version was supplied in the cli
    if (!version) {
        console.error('Error: you must specify a version to run this script. Example: npm run params 210\n');
        return -1;
    }

    parseWeapons();
    parseGears();
    parseBrands();
}

function parseWeapons() {
    // parse through weapons
    try {
        let weaponTypeData = readFileSync(weaponInfoPath);
        weaponTypeData = JSON.parse(weaponTypeData.toString());
        weaponTypeData.forEach(weapon => {
            if (weapon.Type === 'Versus') {
                let weaponObj = {};

                let subName = weapon['SubWeapon'].split('.')[0];
                subName = subName.split('/')[2];
                let specialName = weapon['SpecialWeapon'].split('.')[0];
                specialName = specialName.split('/')[2].slice(2);

                weaponObj["name"] = weapon["__RowId"];
                weaponObj["sub_id"] = parseInt(subsMapping.indexOf(subName)) + 1;
                weaponObj["special_id"] = parseInt(specialsMapping.indexOf(specialName)) + 1;
                weaponObj["weapon_class"] = weapon["DefaultHitEffectorType"];
                weaponObj["special_point"] = weapon["SpecialPoint"];
                weaponObj["season"] = weapon["Season"];
                weaponObj["price"] = weapon["ShopPrice"];
                weaponObj["shop_unlock_rank"] = weapon["ShopUnlockRank"];
            
                weapons.push(weaponObj);
            }
        });

        writeFile(weaponOutputPath, weapons);
    }
    catch (error) {
        console.error(`Got an error trying to read ${weaponInfoPath}: ${error.message}\n`);
    }
}

function parseGears() {
    // parse through gears
    const gearTypes = ['Head', 'Clothes', 'Shoes'];

    try {
        // get gear translations
        let enData = readFileSync(translation_en);
        enData = JSON.parse(enData.toString());
        const headGearEn = enData["CommonMsg/Gear/GearName_Head"];
        const clothesGearEn = enData["CommonMsg/Gear/GearName_Clothes"];
        const shoesGearEn = enData["CommonMsg/Gear/GearName_Shoes"];

        // go through each gear type
        gearTypes.forEach(gearType => {
            let gearEn;
            if (gearType === "Head") gearEn = headGearEn;
            else if (gearType === "Clothes") gearEn = clothesGearEn;
            else gearEn = shoesGearEn;

            try {
                let gearTypeData = readFileSync(`${dataDir}/GearInfo${gearType}.json`);
                gearTypeData = JSON.parse(gearTypeData.toString());
                gearTypeData.forEach(gear => {
                    let gearObj = {};
    
                    gearObj["name"] = gear["__RowId"];
                    gearObj["name_en"] = gearEn[gear["__RowId"].slice(4)];
                    gearObj["skill_id"] = parseInt(skillsMapping.indexOf(gear["Skill"])) + 1;
                    gearObj["brand_id"] = parseInt(brandsMapping.indexOf(gear["Brand"])) + 1;;
                    gearObj["gear_type"] = gearType[0];
                    gearObj["price"] = gear["Price"];
                    gearObj["season"] = gear["Season"];
                    gearObj["rarity"] = gear["Rarity"];
                    gearObj["how_to_get"] = gear["HowToGet"];

                    gears.push(gearObj);
                });
            }
            catch (error) {
                console.error(`Got an error trying to read ${dataDir}/GearInfo${gearType}.json: ${error.message}\n`);
            }
        });
    } catch (error) {
        console.error(`Error when reading ${translation_en}: ${error}`);
    }

    writeFile(gearOutputPath, gears);
}

function parseBrands() {
    // parse through brands
    try {
        let brandTypeData = readFileSync(brandsPath);
        brandTypeData = JSON.parse(brandTypeData.toString());
        Object.entries(brandTypeData["Traits"]).forEach(brandArr => {
            let brandObj = {};
            const primaryIndex = parseInt(skillsMapping.indexOf(brandArr[1]["UsualGearSkill"]));
            const secondaryIndex = parseInt(skillsMapping.indexOf(brandArr[1]["UnusualGearSkill"]));

            brandObj["name"] = brandArr[0];
            brandObj["primary_skill_id"] = (primaryIndex >= 0) ? primaryIndex + 1 : null;
            brandObj["secondary_skill_id"] = (secondaryIndex >= 0) ? secondaryIndex + 1 : null;

            brands.push(brandObj);
        });

        writeFile(brandOutputPath, brands);
    }
    catch (error) {
        console.error(`Got an error trying to read ${brandsPath}: ${error.message}\n`);
    }
}

function writeFile(path, data) {
    // write parsed json file
    writeFileSync(path, JSON.stringify(data));
    console.log(`Successfully wrote to ${path}\n`);
}
