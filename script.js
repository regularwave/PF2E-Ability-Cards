
const canvas = document.getElementById("pf2ecard");
const ctx = canvas.getContext("2d");

document.fonts.onloadingdone = () => {
    console.log("fonts loaded");

    var acradios = document.querySelectorAll('input[type="radio"]:checked');
    var acval = acradios.length > 0 ? acradios[0].value : null;
    console.log(acval);
    var acxloc = 661;

    var strAbilityName = document.getElementById('abilityname');

    ctx.strokeRect(66, 65, 684, 981);

    ctx.font = "600 50px Roboto";
    ctx.fillText(strAbilityName.value, 75, 120);
    ctx.font = '50px PathfinderIcons';
    ctx.fillText(acval, acxloc, 125);
}

document.getElementById('abilityname').addEventListener('keyup', renderCard);
document.querySelectorAll('input').forEach(e => {
    e.addEventListener('click', renderCard)
});


function renderCard() {
    strAbilityName = document.getElementById('abilityname').value;
    console.log(strAbilityName);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(66, 65, 684, 981);
    ctx.fillStyle = 'black';
    ctx.font = '600 50px Roboto';
    ctx.fillText(strAbilityName, 75, 120);
    var acradios = document.querySelectorAll('input[type="radio"]:checked');
    var acval = acradios.length > 0 ? acradios[0].value : null;

    switch (acval) {
        case "[one-action]":
        case "[reaction]":
        case "[free-action]":
            acxloc = 689;
            break;
        case "[two-actions]":
            acxloc = 661;
            break;
        case "[three-actions]":
            acxloc = 635;
            break;
        case "[varies]":
            acxloc = 635;
            break;
        default:
    }
    if (acval === "[varies]") {
        ctx.font = '50px PathfinderIcons';
        ctx.fillText("[one-action]", acxloc - 115, 125);
        ctx.font = '50px Roboto';
        ctx.fillText("to", acxloc - 55, 118);
        ctx.font = '50px PathfinderIcons';
        ctx.fillText("[three-actions]", acxloc, 125);

    } else {
        ctx.font = '50px PathfinderIcons';
        ctx.fillText(acval, acxloc, 125);
    }
}