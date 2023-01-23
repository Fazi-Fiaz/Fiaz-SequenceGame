// Single Deck Cards
var cards = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "JS", "JH", "JD", "JC", "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

// var cards = ["AS", "AH", "AD", "AC", "JS", "JH", "JD", "JC", "QS", "QH", "QD", "QC", "KS", "C3"];

// var boardDeck = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
//     "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
//     "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
//     "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

var boardDeck = ["AC", "KC", "QC", "C10", "C9", "C8", "C7", "C6",
    "AD", "S7", "S8", "S9", "S10", "QS", "KS", "AS", "C5", "S2",
    "KD", "S6", "C10", "C9", "C8", "C7", "C6", "D2", "C4", "S3",
    "QD", "S5", "QC", "H8", "H7", "H6", "C5", "D3", "C3", "S4",
    "D10", "S4", "KC", "H9", "H2", "H5", "C4", "D4", "C2", "S5",
    "D9", "S3", "AC", "H10", "H3", "H4", "C3", "D5", "AH", "S6",
    "D8", "S2", "AD", "QH", "KH", "AH", "C2", "D6", "KH", "S7",
    "D7", "H2", "KD", "QD", "D10", "D9", "D8", "D7", "QH", "S8",
    "D6", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "S9",
    "D5", "D4", "D3", "D2", "AS", "KS", "QS", "S10"];

// Double Decks
let doubleDeck = cards.concat(cards);
let boardDoubleDeck = boardDeck;
// let boardDoubleDeck = boardDeck.concat(boardDeck);

// BoardCards

let boardCards = document.getElementById('board-cards');
let currentPlayer = 0;
let currentTeam = 0;
let noOfTurns = 0;
let noOfTeams = 0;
let winNo = 5;
const maxPlayers = 2;
const maxPlayerCards = 6;
let winningcombinations = 2;
let color = ["red", "blue", "green"];
let playerName = ["Hadi", "Fazi", "Sheri", "Random2", "Random3", "Random4"];
let teamgroups = [];
for (let i = 0; i < noOfTeams; i++) {
    let innergroup = [];
    for (let x = 0; x < maxPlayers; x++) {
        let playerdivision = x % noOfTeams;
        if (playerdivision == i) {
            innergroup.push(playerName[x]);
        }
    }
    teamgroups.push(innergroup);
}

showBoardCards = () => {
    let concat = 0
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if ((x == 0 && y == 0) || (x == 9 && y == 0) || (x == 0 && y == 9) || (x == 9 && y == 9)) {
                let sli = document.createElement("li");
                sli.setAttribute('class', 'disabledelement');
                sli.setAttribute('data-x', x);
                sli.setAttribute('data-y', y);
                let div = document.createElement("div");
                div.setAttribute('class', 'empty-img');
                let simg = document.createElement("img");
                simg.setAttribute('src', `src/cards/giga${x}${y}.png`);
                div.appendChild(simg);
                sli.appendChild(div);
                boardCards.appendChild(sli);
            }
            else {
                let li = document.createElement("li");
                let img = document.createElement("img");
                li.setAttribute('class', 'disabledelement');
                li.setAttribute('data-x', x);
                li.setAttribute('data-y', y);
                li.setAttribute('id', concat);
                li.setAttribute('card', boardDoubleDeck[concat]);
                img.setAttribute('src', `src/cards/${boardDoubleDeck[concat]}.png`);
                li.appendChild(img);
                boardCards.appendChild(li);
                concat++
            }
        }
    }
}

// Shuffle
const shuffle = (doubleDeck) => {
    const arr_val = doubleDeck;
    for (let ar = 0; ar < arr_val.length; ar++) {
        let j = parseInt(Math.random() * arr_val.length);
        let temp = arr_val[ar];
        arr_val[ar] = arr_val[j];
        arr_val[j] = temp;
    }
    return arr_val;
}

let shuffled = shuffle(doubleDeck);
// let shuffled = doubleDeck;
console.log("Shuffled", shuffled)


let noOfPlayers = document.getElementById("no-of-player");
noOfPlayers.insertAdjacentHTML('afterbegin', `<div class="bold">Playing Players <div> ' ${maxPlayers} ' </div> </div>`);
let displayPlayers = document.getElementById("displayPlayer");

waitingPlayers = (play) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let seconddiv = document.createElement("div");
    div.setAttribute("id", `player${play}`);
    div.setAttribute("class", "players");
    if (noOfTeams > 0) {
        div.classList.add("half");
        div.classList.add(`team${play % noOfTeams}`);
    }
    seconddiv.innerHTML = ` ${playerName[play]}`;
    img.setAttribute("src", "src/cards/player.png");
    div.appendChild(seconddiv);
    div.appendChild(img);
    displayPlayers.appendChild(div);
}

// Number of players and Cards distribution to each Player
let players = [];
let playerFunc = (maxPlayers, maxPlayerCards) => {
    for (let play = 0; play < maxPlayers; play++) {
        let playerCards = []
        let firstdiv = document.createElement("div");
        firstdiv.setAttribute('class', `positions`);
        firstdiv.setAttribute('id', `positions${play}`);
        let divs = document.createElement("div");
        divs.innerHTML += `${playerName[play]}`;
        let seconddiv = document.createElement("div");
        seconddiv.setAttribute('class', "hand-cards");
        let ul = document.createElement("ul");
        ul.setAttribute("id", `user${play}`);
        seconddiv.appendChild(ul)
        let user = document.getElementById(`playerCards`);
        firstdiv.appendChild(divs);
        firstdiv.appendChild(seconddiv);
        user.appendChild(firstdiv);

        for (let i = 0; i < maxPlayerCards; i++) {
            let li = document.createElement("li");
            li.setAttribute('id', shuffled[0]);
            li.setAttribute('class', 'handcard');
            let img = document.createElement("img");
            img.setAttribute('src', `src/cards/${shuffled[0]}.png`);
            playerCards.push(shuffled[0]);
            li.appendChild(img);
            ul.appendChild(li);
            shuffled.shift();
        }
        players.push(playerCards);
        waitingPlayers(play);
    }
}
let discardCards = [];
playerFunc(maxPlayers, maxPlayerCards);
let player = {
    turn: true,
    color: color[currentPlayer],
    cards: players[currentPlayer],
    playern: playerName[currentPlayer]
}

let remaingDeck = shuffled;
console.log("Remaining Deck", remaingDeck);

// Switch Players
switchPlayers = function () {
    currentPlayer = (noOfTurns % maxPlayers);
    currentTeam = currentPlayer % noOfTeams;
    if (noOfTeams > 0) {
        player = {
            turn: true,
            color: color[currentTeam],
            cards: players[currentPlayer],
            playern: playerName[currentPlayer],
            teamname: teamgroups[currentTeam]
        }
    }
    else {
        player = {
            turn: true,
            color: color[currentPlayer],
            cards: players[currentPlayer],
            playern: playerName[currentPlayer]
        }
    }
}

// Disable all Users Cards and Enable Active user
disableUsers = () => {
    let disables = document.querySelectorAll(".positions");
    disables.forEach(disablesall => {
        disablesall.classList.add("disable-user")
    })
    document.getElementById(`positions${currentPlayer}`).classList.remove("disable-user");
}

// Enable Board Cards According to Hand Cards
mappingFunction = (maped) => {
    let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${maped}]`);
    let count = 0;
    let playerlist = document.querySelectorAll(".players");
    playerlist.forEach(played => {
        played.classList.remove("active");
        let activeplayer = document.getElementById(`player${currentPlayer}`);
        activeplayer.classList.add("active");
    });
    boardCardCheck.forEach(selectedBoardCard => {
        if (selectedBoardCard.classList.contains('xhr') == false) {
            // Enabling Board Cards according to Handed Cards
            // selectedBoardCard.classList.add('enable');
        }
        // For Dead Cards
        else {
            count++;
        }
        let handcard = document.querySelector(`#user${currentPlayer} #${maped}`);
        if (count > 0) {
            if (handcard.classList.contains("dead")) {
                handcard.classList.remove("dead")
                handcard.removeChild(handcard.children[2]);
                handcard.removeChild(handcard.children[1]);
            }
        }
        if (count >= 2) {
            handcard.classList.add("dead");
            let div = document.createElement("div");
            let divs = document.createElement("div");
            divs.setAttribute("class", "deadcard-icon");
            div.setAttribute("class", "deadcard");
            div.innerHTML = "Dead Card";
            handcard.appendChild(divs);
            handcard.appendChild(div);
        }
    });
}

// Disable All Cards
disableBoardCards = () => {
    let removeClass = document.querySelectorAll('#board-cards li');
    removeClass.forEach(removes => {
        removes.classList.remove('enable');
    });
}

// Enable Selected Cards 
enableSelectedCards = (id) => {
    if (id == "JD" || id == "JC") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
    else if (id == "JS" || id == "JH") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (selectedBoardCard.className.includes('xhr') || selectedBoardCard.className.includes('enable')) {
                if (!selectedBoardCard.hasAttribute('lock')) {
                    selectedBoardCard.classList.remove("xhr");
                    selectedBoardCard.classList.add("enable");
                }
            }
        });
    }
    else {
        let boardCardChecks = document.querySelectorAll(`#board-cards li`);
        boardCardChecks.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
        });
        let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
}

// Reassign Hand Cards 
reassignPlayerCards = (id) => {
    let remaininghandcard = document.querySelectorAll(`#user${currentPlayer} li`);
    let count = 0;
    remaininghandcard.forEach(remaing => {
        if (count == 0) {  //For Avoiding Remove Double Same ID Card from Hand Cards
            let remaingid = remaing.getAttribute("id");
            if (id == remaingid) {
                let user = document.getElementById(`user${currentPlayer}`);
                remaing.remove();
                if (remaingDeck.length > 0) {
                    let li = document.createElement("li");
                    li.setAttribute('id', remaingDeck[0]);
                    li.setAttribute('class', 'handcard');
                    let img = document.createElement("img");
                    img.setAttribute('src', `src/cards/${remaingDeck[0]}.png`);
                    player.cards.push(remaingDeck[0]);
                    remaingDeck.shift();
                    li.appendChild(img);
                    user.appendChild(li);
                }
                count++;
            }
        }
    });
}

// Discards Cards Function
discardCardsFunc = function () {
    let diss = discardCards[0];
    document.getElementById('disID').setAttribute("src", `src/cards/${diss}.png`);
}

// Check Winning Combinations
winningCombination = (cardinfo) => {
    let horizontal = cardinfo.getAttribute("data-x");
    let vertical = cardinfo.getAttribute("data-y");
    let firstCombination = [];

    secondCombination = () => {
        if (noOfTeams > 0) {
            let teamattr = document.querySelectorAll(`.team${currentTeam}`);
            teamattr.forEach(check => {
                check.setAttribute("wincombination", "1");
            });
        }
        else {
            document.getElementById(`player${currentPlayer}`).setAttribute("wincombination", "1");
        }
        cardinfo.setAttribute("lock", "first");
        firstCombination.forEach(check => {
            check.setAttribute("lock", "first");
        });
        firstCombination = [];
    }

    horizontalCombination = () => {
        let win = 1;
        if (vertical < 9) {
            let count = 0; // Second Combination
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(vertical) + i;
                if (checkIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-y="${checkIndex}"][data-x="${horizontal}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color) && (forward.getAttribute("data-x") == horizontal)) {

                        // Second Combination
                        if (forward.getAttribute('lock')) {
                            count++;
                            if (count > 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockInd = parseInt(checkIndex) + x;
                                    if (lockInd <= 9) {
                                        let lockcount = document.querySelector(`.disabledelement[data-y="${lockInd}"][data-x="${horizontal}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color) && (lockcount.getAttribute("data-x") == horizontal)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(forward);
                            // End Second Combination

                            win++;
                            console.log("Forward Cards Check", win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (vertical > 0) {
            let count = 0; // Second Combination
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(vertical) - i;
                if (checkIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-y="${checkIndex}"][data-x="${horizontal}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color) && (previous.getAttribute("data-x") == horizontal)) {

                        // Second Combination
                        if (previous.getAttribute('lock')) {
                            count++;
                            if (count > 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockInd = parseInt(checkIndex) - x;
                                    if (lockInd >= 0) {
                                        let lockcount = document.querySelector(`.disabledelement[data-y="${lockInd}"][data-x="${horizontal}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color) && (lockcount.getAttribute("data-x") == horizontal)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(previous);
                            // End Second Combination

                            win++;
                            console.log("Previous Cards Check", win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (win >= winNo) {
            if (winningcombinations == 2) {
                if (!document.querySelector(".players.active").hasAttribute("wincombination")) {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) Completed First Combination`);
                    }
                    else {
                        alert(` ${player.playern} Completed First Combination`);
                    }
                }
                else {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) WON`);
                    }
                    else {
                        alert(`Player ${player.playern} WON`);
                    }
                }
                secondCombination();
            }
            else if (winningcombinations == 1) {
                if (noOfTeams > 0) {
                    alert(`Team (${player.teamname}) WON`);
                }
                else {
                    alert(`Player ${player.playern} WON`);
                }
                return true;
            }
        }
        else {
            firstCombination = [];
            if (winningcombinations == 1) {
                return false;
            }
        }
    }

    verticalCombination = () => {
        let win = 1;
        let count = 0; // Second Combination
        if (horizontal > 0) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(horizontal) - i;
                if (checkIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-x="${checkIndex}"][data-y="${vertical}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color) && (previous.getAttribute("data-y") == vertical)) {

                        // Second Combination
                        if (previous.getAttribute('lock')) {
                            count++;
                            if (count > 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockInd = parseInt(checkIndex) - x;
                                    if (lockInd >= 0) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockInd}"][data-y="${vertical}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color) && (lockcount.getAttribute("data-y") == vertical)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States VERTICAL", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(previous);
                            // End Second Combination

                            win++;
                            console.log("Horizontal Previous Cards Check", win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (horizontal < 9) {
            for (let i = 1; i < 5; i++) {
                let checkIndex = parseInt(horizontal) + i;
                if (checkIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-x="${checkIndex}"][data-y="${vertical}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color) && (forward.getAttribute("data-y") == vertical)) {

                        // Second Combination
                        if (forward.getAttribute('lock')) {
                            count++;
                            if (count > 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockInd = parseInt(checkIndex) + x;
                                    if (lockInd <= 9) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockInd}"][data-y="${vertical}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color) && (lockcount.getAttribute("data-y") == vertical)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States VERTICAL", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(forward);
                            // End Second Combination

                            win++;
                            console.log("Horizontal Forward Cards Check", win)
                        }
                    }
                    else { break; }
                }
            }
        }
        if (win >= winNo) {
            if (winningcombinations == 2) {
                if (!document.querySelector(".players.active").hasAttribute("wincombination")) {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) Completed First Combination`);
                    }
                    else {
                        alert(` ${player.playern} Completed First Combination`);
                    }
                }
                else {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) WON`);
                    }
                    else {
                        alert(`Player ${player.playern} WON`);
                    }
                }
                secondCombination();
            }
            else if (winningcombinations == 1) {
                if (noOfTeams > 0) {
                    alert(`Team (${player.teamname}) WON`);
                }
                else {
                    alert(`Player ${player.playern} WON`);
                }
                return true;
            }
        }
        else {
            firstCombination = [];
            if (winningcombinations == 1) {
                return false;
            }
        }
    }

    diagonalCombination = () => {
        let win = 1;
        let count = 0; // Second Combination
        if (horizontal > 0 && vertical > 0) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) - i;
                let checkYIndex = parseInt(vertical) - i;
                if (checkXIndex >= 0 && checkYIndex >= 0) {
                    let previous = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color)) {

                        // Second Combination
                        if (previous.getAttribute('lock')) {
                            count++;
                            if (count >= 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockXInd = parseInt(horizontal) - x;
                                    let lockYInd = parseInt(vertical) - x;
                                    if (lockXInd >= 0 && lockYInd >= 0) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockXInd}"][data-y="${lockYInd}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States VERTICAL", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(previous);
                            // End Second Combination

                            win++;
                            console.log("Diagonal Combination Previous Cards Check", win)
                        }
                    } else { break; }
                } else { break; }
            }
        }

        if (horizontal < 9 && vertical < 9) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) + i;
                let checkYIndex = parseInt(vertical) + i;
                if (checkXIndex <= 9 && checkYIndex <= 9) {
                    let forward = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color)) {

                        // Second Combination
                        if (forward.getAttribute('lock')) {
                            count++;
                            if (count >= 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockXInd = parseInt(horizontal) + x;
                                    let lockYInd = parseInt(vertical) + x;
                                    if (lockXInd <= 9 && lockYInd <= 9) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockXInd}"][data-y="${lockYInd}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States Diagnola", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(forward);
                            // End Second Combination

                            win++;
                            console.log("Diagonal Combination Forward Cards Check", forward, win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (win >= winNo) {
            if (winningcombinations == 2) {
                if (!document.querySelector(".players.active").hasAttribute("wincombination")) {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) Completed First Combination`);
                    }
                    else {
                        alert(` ${player.playern} Completed First Combination`);
                    }
                }
                else {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) WON`);
                    }
                    else {
                        alert(`Player ${player.playern} WON`);
                    }
                }
                secondCombination();
            }
            else if (winningcombinations == 1) {
                if (noOfTeams > 0) {
                    alert(`Team (${player.teamname}) WON`);
                }
                else {
                    alert(`Player ${player.playern} WON`);
                }
                return true;
            }
        }
        else {
            firstCombination = [];
            if (winningcombinations == 1) {
                return false;
            }
        }
    }

    SeconddiagonalCombination = () => {
        let win = 1;
        let count = 0; // Second Combination
        if (horizontal > 0 && vertical < 9) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) - i;
                let checkYIndex = parseInt(vertical) + i;
                if (checkXIndex >= 0 && checkYIndex <= 9) {
                    let previous = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((previous.getAttribute('color')) && (previous.getAttribute("color") == player.color)) {

                        console.log("Team Colors cehck", player.color)

                        // Second Combination
                        if (previous.getAttribute('lock')) {
                            count++;
                            if (count >= 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockXInd = parseInt(horizontal) - x;
                                    let lockYInd = parseInt(vertical) + x;
                                    if (lockXInd >= 0 && lockYInd <= 9) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockXInd}"][data-y="${lockYInd}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States VERTICAL", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(previous);
                            // End Second Combination

                            win++;
                            console.log("Diagonal Combination Previous Cards Check", win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }

        if (horizontal < 9 && vertical > 0) {
            for (let i = 1; i < 5; i++) {
                let checkXIndex = parseInt(horizontal) + i;
                let checkYIndex = parseInt(vertical) - i;
                if (checkXIndex <= 9 && checkYIndex >= 0) {
                    let forward = document.querySelector(`.disabledelement[data-x="${checkXIndex}"][data-y="${checkYIndex}"]`);
                    if ((forward.getAttribute('color')) && (forward.getAttribute("color") == player.color)) {

                        // Second Combination
                        if (forward.getAttribute('lock')) {
                            count++;
                            if (count >= 1) {
                                for (let x = 0; x <= 7; x++) {
                                    let lockXInd = parseInt(horizontal) + x;
                                    let lockYInd = parseInt(vertical) - x;
                                    if (lockXInd <= 9 && lockYInd >= 0) {
                                        let lockcount = document.querySelector(`.disabledelement[data-x="${lockXInd}"][data-y="${lockYInd}"]`);
                                        if ((lockcount.getAttribute('color')) && (lockcount.getAttribute("color") == player.color)) {
                                            if (x >= winNo - 1) {
                                                console.log("Second Combination Winning States Diagnola", lockcount);
                                                win++;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            win++;
                        }
                        else {
                            firstCombination.push(forward);
                            // End Second Combination

                            win++;
                            console.log("Second Diagonal Combination Forward Cards Check", forward, win)
                        }
                    }
                    else { break; }
                }
                else { break; }
            }
        }
        if (win >= winNo) {
            if (winningcombinations == 2) {
                if (!document.querySelector(".players.active").hasAttribute("wincombination")) {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) Completed First Combination`);
                    }
                    else {
                        alert(` ${player.playern} Completed First Combination`);
                    }
                }
                else {
                    if (noOfTeams > 0) {
                        alert(`Team (${player.teamname}) WON`);
                    }
                    else {
                        alert(`Player ${player.playern} WON`);
                    }
                }
                secondCombination();
            }
            else if (winningcombinations == 1) {
                if (noOfTeams > 0) {
                    alert(`Team (${player.teamname}) WON`);
                }
                else {
                    alert(`Player ${player.playern} WON`);
                }
                return true;
            }
        }
        else {
            firstCombination = [];
        }
    }

    if (winningcombinations == 1) {
        if (!horizontalCombination()) {
            if (!verticalCombination()) {
                if (!diagonalCombination()) {
                    SeconddiagonalCombination();
                }
            }
        }
    }
    else if (winningcombinations == 2) {
        horizontalCombination();
        verticalCombination();
        diagonalCombination();
        SeconddiagonalCombination();
    }
}

// Discard Cards
pushCard = (cardinfo, id) => {
    for (let i = 0; i <= player.cards.length; i++) {
        if (id == player.cards[i]) {
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(id);
            break;
        }
    }
    winningCombination(cardinfo);
    noOfTurns++;
    discardCardsFunc();
    switchPlayers();
    matchHandWithBoardCards();
}
DeadpushCard = (id) => {
    for (let i = 0; i <= player.cards.length; i++) {
        if (id == player.cards[i]) {
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(id);
            break;
        }
    }
    discardCardsFunc();
    matchHandWithBoardCards();
}

// Match Clicked Hand Card with board Cards
clickHandwithBoard = () => {
    let handcardClickRemover = document.querySelectorAll(`.handcard`);
    for (var i = 0; i < handcardClickRemover.length; i++) {
        handcardClickRemover[i].removeEventListener('click', handcardClickFunction);
    }
    let handcardClick = document.querySelectorAll(`#user${currentPlayer} .handcard`);
    for (var i = 0; i < handcardClick.length; i++) {
        handcardClick[i].addEventListener('click', handcardClickFunction);
    }
}
let cardid = '';
handcardClickFunction = function () {
    cardid = this.getAttribute("id");
    id = cardid;
    let deadcard = this.classList.contains("dead");
    if (deadcard) {
        DeadpushCard(id);
    }
    else {
        clickHandwithBoard();
        this.removeEventListener('click', handcardClickFunction);

        //Disable All Cards
        disableBoardCards();

        // Enable Selected Cards 
        enableSelectedCards(id);

        // Board Cards Click
        let enableCards = document.querySelectorAll('#board-cards .enable');
        let enableCardsRemove = document.querySelectorAll('#board-cards li');

        for (var i = 0; i < enableCardsRemove.length; i++) {
            enableCardsRemove[i].removeEventListener('click', boadCardClick);
        }

        for (var i = 0; i < enableCards.length; i++) {
            enableCards[i].addEventListener('click', boadCardClick);
        }
    }

}
boadCardClick = function () {
    let cardinfo = this;
    let id = cardid;
    let enableCards = document.querySelectorAll('#board-cards .enable');
    let enableCardsRemove = document.querySelectorAll('#board-cards li');
    enableCards.forEach(enables => {
        enables.classList.remove('enable');
    });

    // For Single Eyed Jack Cards
    if (id == "JS" || id == "JH") {
        this.classList.remove(color[0], color[1], color[2], "xhr");
        this.removeAttribute('color', player.color);
        enableCardsRemove.forEach(adding => {
            let a = adding.hasAttribute("color");
            if (a === true) { adding.classList.add("xhr"); }
        });
    }
    else {
        this.classList.add(player.color, "xhr");
        this.setAttribute('color', player.color);
    }
    this.removeEventListener('click', handcardClickFunction);
    pushCard(cardinfo, id);
}

// Draw Game
drawGame = () => {
    if (remaingDeck.length == 0) {
        document.querySelector('.remianing-deck').style.display = "none";
        let count = 0;
        for (i = 0; i < maxPlayers; i++) {
            let userHandCards = document.querySelectorAll(`#user${i} li`);
            if (userHandCards.length == 0) {
                count++;
            }
            if (count == maxPlayers) {
                alert("Game Draw");
            }
        }
    }
}

// Match Hand Cards with Board Cards
matchHandWithBoardCards = function () {
    disableUsers();
    drawGame();
    player.cards.map(mappingFunction);
    clickHandwithBoard();
}

function start() {
    showBoardCards();
    matchHandWithBoardCards();
}

window.onload = start();

