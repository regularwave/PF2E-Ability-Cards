
const canvas = document.getElementById("pf2ecard");
const ctx = canvas.getContext("2d");

document.fonts.onloadingdone = () => {
    console.log("fonts loaded");

    renderCard();
}

document.querySelectorAll('input').forEach(e => {
    e.addEventListener('click', renderCard)
});
document.querySelectorAll('input').forEach(e => {
    e.addEventListener('keyup', renderCard)
});
document.querySelectorAll('textarea').forEach(e => {
    e.addEventListener('keyup', renderCard)
});

function renderCard() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // white bg rectangle
    var showWhiteBG = document.getElementById('whitebg');
    if (showWhiteBG.checked) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // safe print area box
    var showMPCsafe = document.getElementById('mpcsafe');
    if (showMPCsafe.checked) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.setLineDash([6]);
        ctx.strokeRect(66, 65, 684, 981);
    }

    // ability name
    var strAbilityName = document.getElementById('abilityname').value;
    // console.log(strAbilityName);
    ctx.fillStyle = 'black';
    ctx.font = '600 50px Roboto';
    ctx.fillText(strAbilityName, 75, 120);

    // action cost symbols
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

    // line
    ctx.strokeStyle = 'black';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(75 + 10, 135);
    ctx.lineTo(684 + 66 - 9 - 10, 135);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();

    // traits
    var strTraitList = document.getElementById('traitlist').value;
    ctx.fillStyle = 'black';
    ctx.font = 'italic 300 20px Roboto';
    ctx.fillText(strTraitList, 75, 160);

    // range
    var strRange = document.getElementById('rangetext').value;
    ctx.fillStyle = 'black';
    ctx.font = '500 25px Roboto';
    ctx.fillText("Range", 75, 190);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strRange, 75, 215);

    // targets
    var strTarget = document.getElementById('targettext').value;
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.font = '500 25px Roboto';
    ctx.fillText("Targets", 408, 190);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strTarget, 408, 215);
    ctx.textAlign = "start";

    // defense
    var strDefense = document.getElementById('defensetext').value;
    ctx.fillStyle = 'black';
    ctx.textAlign = "end";
    ctx.font = '500 25px Roboto';
    ctx.fillText("Defense", 684 + 66 - 9, 190);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strDefense, 684 + 66 - 9, 215);
    ctx.textAlign = "start";

    // duration
    var strDuration = document.getElementById('durationtext').value;
    ctx.fillStyle = 'black';
    ctx.font = '500 25px Roboto';
    ctx.fillText("Duration", 75, 245);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strDuration, 75, 270);

    // frequency
    var strFrequency = document.getElementById('frequencytext').value;
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.font = '500 25px Roboto';
    ctx.fillText("Frequency", 408, 245);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strFrequency, 408, 270);
    ctx.textAlign = "start";

    // source and level
    var strSourceAndLevel = document.getElementById('sourceleveltext').value;
    ctx.fillStyle = 'black';
    ctx.textAlign = "end";
    ctx.font = '500 25px Roboto';
    ctx.fillText("Source & Level", 684 + 66 - 9, 245);
    ctx.font = 'italic 300 25px Roboto';
    ctx.fillText(strSourceAndLevel, 684 + 66 - 9, 270);
    ctx.textAlign = "start";

    // line
    ctx.strokeStyle = 'black';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(75 + 10, 280);
    ctx.lineTo(684 + 66 - 9 - 10, 280);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();

    // ability text
    // canvas does not do text wrapping natively
    // text wrapping from https://stackoverflow.com/a/11124580 modified to handle newlines
    var strAbilityText = document.getElementById('abilitytext').value;
    ctx.fillStyle = 'black';
    ctx.font = 'bold 30px PathfinderIcons';

    var lines = fragmentText(strAbilityText, 674);
    lines.forEach(function (line, i) {
        ctx.fillText(line, 75, 285 + (i + 1) * 30);
    });

    // results
    var resultsArray = Array.from(document.querySelectorAll('input[type="checkbox"][name="resenable"]:checked'), cb => cb.id.substring(0, 4)).reverse();
    resultsArray.forEach(function (restarget, i) {
        var resultNameText = document.getElementById(restarget + "name").value;
        var resultTextText = document.getElementById(restarget + "text").value;
        console.log(ctx.measureText(resultNameText).width);
        ctx.fillStyle = 'black';
        ctx.font = '500 25px Roboto';
        ctx.fillText(resultNameText, 75, 1020 - i * 25);
        ctx.font = '300 25px Roboto';
        ctx.fillText(resultTextText, 75 + ctx.measureText(resultNameText).width + 2, 1020 - i * 25);

    });
    console.log(resultsArray);

    // reference
    var strRef = document.getElementById('reftext').value;
    ctx.fillStyle = 'darkslategray';
    ctx.textAlign = "end";
    ctx.font = '200 15px Roboto';
    ctx.fillText(strRef, 684 + 66 - 9, 1035);
    ctx.textAlign = "start";

}

function fragmentText(text, maxWidth) {
    const paragraphs = text.split('\n');
    let lines = [];

    paragraphs.forEach(paragraph => {
        if (paragraph.trim() === "") {
            lines.push("");
            return;
        }

        let words = paragraph.split(' ');
        let currentLine = "";

        if (ctx.measureText(paragraph).width < maxWidth) {
            lines.push(paragraph);
            return;
        }

        while (words.length > 0) {
            let splitWord = false;
            while (words[0] && ctx.measureText(words[0]).width >= maxWidth) {
                let tmp = words[0];
                words[0] = tmp.slice(0, -1);
                if (!splitWord) {
                    splitWord = true;
                    words.splice(1, 0, tmp.slice(-1));
                } else {
                    words[1] = tmp.slice(-1) + words[1];
                }
            }

            if (ctx.measureText(currentLine + words[0]).width < maxWidth) {
                currentLine += words.shift() + " ";
            } else {
                lines.push(currentLine.trim());
                currentLine = "";
            }

            if (words.length === 0) {
                lines.push(currentLine.trim());
            }
        }
    });

    return lines;
}