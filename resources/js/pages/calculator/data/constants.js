export const DRILL_MOUNT = 30;
export const TRANSITION_SIGNATURE = 70;
export const TRANSITION_XTRACTION = 70;
export const SUNSYNC_DRIVEXT = 70;
export const SUNSYNC_ELITE_XT = 70;
export const SENSITY_PHOTOCHROMIC = 70;
export const ZEISS_PHOTOFUSION = 70;
export const TRANSITION_VANTAGE = 123;
export const POLARIZED = 53;
export const SOLID_TINT = 13;
export const GRADIENT_TINT = 15;
export const SKI_TYPE_MIRROR = 50;
export const SOLID_SINGLE_GRADIENT = 44;
export const SHAMIR_GLACIER_PLUS_UV = 75;
export const TECHSHIELD_PLUS_UVR = 51;
export const CRIZAL_SUNSHIELD = 75;
export const PHOTOCHROMIC = 75;
export const POLYCARBONATE = 23;
export const PREMIUM_PROGRESSIVE = 65;
export const HIGH_INDEX = 51;
export const ANTI_REFLECTIVE_PROPERTIES = 37;
export const RIMLESS_DRILL = 86;
export const BLENDED_BIFOCAL = 20;
export const DAVIS_PHOTOCHROMIC = 65;
export const DAVIS_POLARIZED = 75;
export const DAVIS_SOLID_TINT = 0;
export const DAVIS_GRADIENT_TINT = 0;
export const DAVIS_SKY_MIRROR = 86;
export const DAVIS_GRADIENT_MIRROR = 86;
export const DAVIS_BLUE_LIGHT = 15;
export const DAVIS_SLAB_OFF = 186;
export const DAVIS_SPECIALITY_LENS = 206;

export const DAVIS_STANDARD_ANTIREFLECTIVE = 50;
export const DAVIS_PREMIUM_ANTIREFLECTIVE = 90;
export const DAVIS_ULTRA_ANTIREFLECTIVE = 140;
export const DAVIS_ULTIMATE_ANTIREFLECTIVE = 175;

export const DAVIS_EDGE_POLISH = 22;
export const DAVIS_HIGH_EDGH_POLISH = 70;
export const DAVIS_ROLL_AND_POLISH = 16;
export const DAVIS_ROLL_EDGE_POLISH = 24;

export const PriceConstants = {
    vba: {
        rimlessMounting: 8,
        drillRimlessMounting: 28,
        drillAndNotchRimlessMounting: 28,
        centerThickness: 10,
        photochromic: {
            photochromic: { sv: 62, pal: 70, nvf: 62, bifocal: 70 },
            photochromicPolarized: {
                sv: 118,
                pal: 136,
                nvf: 118,
                bifocal: 136,
            },
            photochromicMirror: { sv: 97, pal: 105, nvf: 97, bifocal: 105 },
        },
        polarized: {
            sv: 56,
            pal: 66,
            nvf: 56,
            bifocal: 66,
        },
        tint: {
            normalUse: 10,
            therapeuticUse: 0,
        },
        mirrorCoating: {
            glass: 23,
            solid: 35,
        },
        uvProtection: 12,
        antiReflective: {
            standardAR1: 31,
            standardAR2: 52,
            premiumAR1: 69,
            premiumAR2: 81,
            ultraAR: 94,
        },
        aspheric: {
            standardPlastic: { sv: 43, pal: 55, nvf: 43, bifocal: 55 },
            polycarbonate: { sv: 30, pal: 32, nvf: 30, bifocal: 32 },
            midIndexTrivax: { sv: 0, pal: 0, nvf: 0, bifocal: 0 },
            midIndexPlastic: { sv: 0, pal: 0, nvf: 0, bifocal: 0 },
            highIndexPlastic: { sv: 0, pal: 0, nvf: 0, bifocal: 0 },
        },
        blueProtection: {
            material1: 0,
            material2: 15,
        },
        rollAndPolish: {
            rollOrStandard: 10,
            rollAndStandard: 10,
            highLuster: 13,
            rollAndHignLuster: 13,
        },
        licensed: {
            color: 34,
            branding: 21,
        },
        scratchCoating: {
            scratchCoating: 0,
            coating1: 10,
            coating2: 30,
        },
    },
    spectra: {
        antireflective: {
            tier1: 30,
            tier2: 80,
            tier3: 80,
            tier4: 90,
        },
        scratchWarrenty: 10,
        polish: 13,
    },
};
