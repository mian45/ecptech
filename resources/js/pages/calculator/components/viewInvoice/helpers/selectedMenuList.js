export const GetSelectionDetails = (receipt) => {
    const result = [];
    //materials
    const lensMaterial = receipt?.values?.lensMaterial;

    if (lensMaterial === "Polycarbonate") {
        result.push(
            "Polycarbonate lenses are thinner, lighter weight, and impact resistant space-age lenses."
        );
    }

    if (lensMaterial === "Hi Index 1.67") {
        result.push(
            "1.67 high index lens material makes your lenses thinner and lighter in weight. These lenses can be up to 50% thinner than traditional plastic lenses."
        );
    }
    if (lensMaterial === "Hi index 1.70 and above") {
        result.push(
            "1.74 High Index Lenses are the thinnest, lightest-weight lenses on the market today. Depending on your prescription a 1.74 High Index Lens can be more than 50% thinner than traditional plastic lenses."
        );
    }
    //lenses
    const lensType = receipt?.values?.lensType?.type;
    if (lensType === "Single Vision") {
        result.push("Single Vision");
    }
    if (lensType === "PAL") {
        result.push(
            "Progressive lenses (no-line bifocals) provide precise vision at all ranges of distance, intermediate and near."
        );
    }

    if (lensType === "Bifocal") {
        result.push(
            "Bifocal lenses will have a line and focus distant images in the top half of the glasses and focus near images in the bottom half of the glasses."
        );
    }
    if (lensType === "Trifocal") {
        result.push(
            "Bifocal lenses will have a line and focus distant images in the top half of the glasses and focus near images in the bottom half of the glasses."
        );
    }
    //Antireflective
    const antireflective = receipt?.values?.antiReflectiveProperties?.type;
    if (antireflective === "Crizal Sapphire 360 UV") {
        result.push(
            "Viso Pro is the most sophisticated no-glare technology on the market today. It allows for superior cleaning, resists smudges, and provides superior no-glare protection."
        );
    }
    if (antireflective === "Crizal Avance UV") {
        result.push(
            "Viso XC+UV no-glare technology provides dust and dirt repellence for clearer vision and less cleaning. They reduce glare, resist scratching, repel water, resist smudges and provide UV protection."
        );
    }
    if (antireflective === "Crizal Easy UV") {
        result.push(
            "Crizal Easy no-glare technology makes your lenses easier to clean than ordinary lenses. They reduce glare, resist scratching, repel water, resist smudges and provide UV protection."
        );
    }
    //photochromic
    const photochromic = receipt?.values?.photochromics?.type;
    if (photochromic === "Transition Signature") {
        result.push(
            "The newest generation of transitions lenses darken well in UV light and lighten completely indoors. Transitions options come in grey, brown, or green."
        );
    }
    if (photochromic === "Transition XTRActive") {
        result.push(
            "Transitions XTRA Active darken more than any other Transitions lens. They always has a slight tint indoors and darken slightly behind a windshield."
        );
    }
    //sunglasses
    if (receipt?.values?.sunGlassesLens?.lensType === "Polarized") {
        result.push(
            "Polarized lenses are top-of-the line sunglasses that remove glare and light from reflected surfaces. Polarization is an excellent option for driving and outdoor use."
        );
    }
    if (receipt?.values?.sunGlassesLens?.lensType === "Tint") {
        result.push(
            "Tinted lenses provide relief from light sensitivity and come in a variety of colors and darkness levels"
        );
    }
    if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
        result.push(
            "Mirrored sunglasses have a reflective optical coating on the outside of the lenses to make them appear like small mirrors. They come in a variety of colors and can add a flashy appearance to your sunglasses."
        );
    }
    return result;
};
