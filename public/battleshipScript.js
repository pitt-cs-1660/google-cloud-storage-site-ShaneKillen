var loadGridButton = document.getElementById("loadGrid")
const lettersCol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]


const playerOneInfo = new Object()
playerOneInfo.isTurn = true
playerOneInfo.aircraftDest = false
playerOneInfo.battleshipDest = false
playerOneInfo.submarineDest = false
playerOneInfo.shipsDest = 0

const playerTwoInfo = new Object()
playerTwoInfo.aircraftDest = false
playerTwoInfo.battleshipDest = false
playerTwoInfo.submarineDest = false
playerTwoInfo.shipsDest = 0;
//sdsx
const aircraft = new Object()
aircraft.char = "A"
aircraft.size = 5
aircraft.oneHitCounter = 0;
aircraft.twoHitCounter = 0;
aircraft.name = "Aircraft Carrier"

const battleship = new Object()
battleship.char = "B"
battleship.size = 4
battleship.oneHitCounter = 0;
battleship.twoHitCounter = 0;
battleship.name = "Battleship"

const submarine = new Object()
submarine.char = "S"
submarine.size = 3
submarine.oneHitCounter = 0;
submarine.twoHitCounter = 0;
submarine.name = "Submarine"

var didPlayerWin = false

const player1Name = document.getElementById('player1Name')
const player2Name = document.getElementById('player2Name')

const reEnterText = document.getElementById('reenterText')
// function addPlayers(event){
    
//     addPlayer1(event)
   

//     addPlayer2()

//     playersInputValid()
   
//}

function addPlayer1(event){
    if(playerOneInfo.name === undefined || playerOneInfo.shipLoc === undefined){
        if(!isValidInputString(document.getElementById("playerShips").value)){
            reEnterText.hidden = false
            event.preventDefault()
            return
        }
        playerOneInfo.name = document.getElementById("playerName").value
        playerOneInfo.shipLoc = document.getElementById("playerShips").value
        console.log("user1Name = ", playerOneInfo.name)
        console.log("user1SHips = ", playerOneInfo.shipLoc)
        event.preventDefault()
    }
   showPlayer2Prompt()
}
function showPlayer2Prompt(){
    reEnterText.hidden = true
    var userInfoForm1 = document.getElementById('userInfoForm')
    userInfoForm1.hidden = true
    var form2 = document.getElementById('userInfoForm2')
    form2.hidden = false
  
    userInfoFormTitle.textContent = "Player 2"     


}
function addPlayer2(event){
    var startGame = false
    if(playerTwoInfo.name === undefined || playerTwoInfo.shipLoc === undefined){
        startGame = isValidInputString(document.getElementById("playerShips2").value)
        if(!startGame){
            reEnterText.hidden = false
            event.preventDefault()
            return
        }
        playerTwoInfo.name = document.getElementById("playerName2").value
        playerTwoInfo.shipLoc = document.getElementById("playerShips2").value
        console.log("user2Name = ", playerTwoInfo.name)
        console.log("user2Ships = ", playerTwoInfo.shipLoc)
    }
    if(startGame){
        reEnterText.hidden = false
        playersInputValid()
    }
}
function playersInputValid(){
    
    let removeForm = document.getElementById('presentForm')
    document.body.removeChild(removeForm)
    let removeTxt = document.getElementById('reenterText')
    document.body.removeChild(removeTxt)

    player1Name.textContent = playerOneInfo.name
    player2Name.textContent = playerTwoInfo.name

    turnIndicator()
    buildPlayArea()
    
}

function isValidInputString(playerStr){
    //A(A1-A5);B(B6-E6);S(H3-J3);
    console.log(playerStr)
    var shipArr = playerStr.split(';')

    for(let k = 0; k < 3; k++){

        var shipStrArr = shipArr[k];
        let firstLocationLet = shipStrArr[2]
        let secondLocationLet = shipStrArr[5]
        let firstLocationNum = shipStrArr[3]
        let secondLocationNum = shipStrArr[6]
        let thisShipLetter = shipStrArr[0]

        console.log(shipStrArr);
        if( thisShipLetter == 'A' || thisShipLetter == 'B' || thisShipLetter == 'S' ){
            console.log("95")
            if(firstLocationLet === secondLocationLet){
                console.log("97")
                if( ((parseInt(firstLocationNum) + 4 !== parseInt(secondLocationNum)) && (thisShipLetter === 'A')  ) 
                || ((parseInt(firstLocationNum) + 3 !== parseInt(secondLocationNum)) && (thisShipLetter === 'B')  )
                ||  ((parseInt(firstLocationNum) + 2 !== parseInt(secondLocationNum)) && (thisShipLetter === 'S')) ){
                    return false;
                }

            }else if(firstLocationNum === secondLocationNum){
                console.log("103")
                let j = 0
                for(let i = 0; i < lettersCol.length; i++){
                    if(lettersCol[i] == firstLocationLet){
                        j = i;
                        break;
                    }
                }
                console.log(j)

                while(secondLocationLet !== lettersCol[j]){
                    j += 1;
                    if(j >= lettersCol.length)
                        return false;
                    
                }
                if((j != 5 && thisShipLetter != 'A') 
                && (j != 4 && thisShipLetter != 'B') 
                && (j != 3 && thisShipLetter != 'S')){
                    console.log(j)
                    console.log(thisShipLetter)
                    return false;
                }

            }else{
                return false;
            }

        }else{
            
            return false;
        }
        
    }
    return true;
}

const userInfoForm = document.getElementById('userInfoForm')
const userInfoFormTitle = document.getElementById('formTitle')
userInfoForm.addEventListener('submit', addPlayer1)


const userInfoForm2 = document.getElementById('userInfoForm2')
userInfoForm2.addEventListener('submit', addPlayer2)


//-----------End PlayerInfo------------------------

//-------turns-----------------
const turnBtn = document.getElementById('turnBtn');
const startTurnEle = document.getElementById('startTurnID')
const gridAreaEle = document.getElementById('gridArea')
const turnPara = document.getElementById('playersTurnText')

function hideTurnEles(){
    turnBtn.hidden = true
    startTurnEle.hidden = true
    turnPara.hidden = true
}
function showTurnEles(){
    turnBtn.hidden = false
    startTurnEle.hidden = false
    turnPara.hidden = false
}

function turnIndicator(){
    const turnText = document.getElementById('playersTurnText');
    endTurnBtn.hidden = true
    gridAreaEle.hidden = true;
    turnBtn.hidden = false;
    startTurnEle.hidden = false;

    if(playerOneInfo.isTurn){
        turnText.innerText = "Click OK to begin " + playerOneInfo.name + "'s turn"
        console.log("here")
        playerOneInfo.isTurn = false
    }else{
        turnText.innerText = "Click OK to begin " + playerTwoInfo.name + "'s turn"
        playerOneInfo.isTurn = true
    }
}
function showGrids(){
    startTurnEle.hidden = true;
    gridAreaEle.hidden = false;

}
turnBtn.addEventListener("click", function(){
    showGrids();
    hideTurnEles();
});
//--end turn----

//--grid area----
function buildPlayArea(){
    console.log("inside grid func")
    const gridAreaEle = document.getElementById('gridArea')
    const player1Grid = document.getElementById("player1Grid")
    const player2Grid = document.getElementById("player2Grid")
    gridAreaEle.hidden = true
    //add row/col labels
    for(let i = 0; i < 11; i++){
        if(i == 0){
            let rowLab = document.createElement('div')
            rowLab.textContent = " ";
            rowLab.classList = 'row/col'

            player1Grid.appendChild(rowLab)
            continue;
        }
        let rowLab = document.createElement('div')
        rowLab.classList = 'row/col'
        rowLab.textContent = i;
        rowLab.style.textAlign = 'center'
        player1Grid.appendChild(rowLab)
    }
    for(var i = 1; i < 11; i++){
        
       for(var j = 0; j < 11; j++){

            if(j == 0){
                
                let colLab = document.createElement('div')
                colLab.classList = 'row/col'
                colLab.textContent = lettersCol[i-1];
                colLab.style.textAlign = 'center'
                player1Grid.appendChild(colLab)
                continue;
            }

            let gridCell = document.createElement("div");
            let buttonCell = document.createElement('button')
            let coverCell = document.createElement('div')

            coverCell.classList.add("coverCells_player1")
            buttonCell.classList.add("buttons_player1")


           // gridCell.id = 'p1-' + lettersCol[j] + i;
            
            buttonCell.id = "1-" + lettersCol[j-1] + i;
            buttonCell.style.backgroundColor = "#ADD8E6"
            buttonCell.style.width = '25px'
            buttonCell.style.height = '25px'
            buttonCell.style.border = '0px'
            buttonCell.style.position = 'absolute'

            coverCell.id = "c1-" + lettersCol[j-1] + i;
            coverCell.style.backgroundColor = "#ADD8E6"
            coverCell.style.width = '25px'
            coverCell.style.height = '25px'
            coverCell.style.border = '0px'
            coverCell.style.position = 'absolute'
            coverCell.style.textAlign = 'center'


            coverCell.style.zIndex = 2;
            buttonCell.style.zIndex = 1;

            gridCell.appendChild(buttonCell);
            gridCell.appendChild(coverCell)
            player1Grid.appendChild(gridCell);
       }
   }
   for(let i = 0; i < 11; i++){
        if(i == 0){
            let rowLab = document.createElement('div')
            rowLab.textContent = " ";
            rowLab.classList = 'row/col'

            player2Grid.appendChild(rowLab)
            continue;
        }
        let rowLab = document.createElement('div')
        rowLab.classList = 'row/col'
        rowLab.textContent = i;
        rowLab.style.textAlign = 'center'
        //rowLab.style.left = '50%';
        player2Grid.appendChild(rowLab)
    }   
   for(var i = 1; i < 11; i++){
        for(var j = 0; j < 11; j++){
            if(j == 0){
                
                let colLab = document.createElement('div')
                colLab.textContent = lettersCol[i-1];
                colLab.classList = 'row/col'
                colLab.style.textAlign = 'center'
                player2Grid.appendChild(colLab)
                continue;
            }
            let gridCell = document.createElement("div");
            let buttonCell = document.createElement('button')
            let coverCell = document.createElement('div')

            coverCell.classList.add("coverCells_player2")
            buttonCell.classList.add("buttons_player2")
           // gridCell.id = 'p2-' + lettersCol[j] + i;

            buttonCell.id = "2-" + lettersCol[j-1] + i;
            buttonCell.style.backgroundColor = "#ADD8E6"
            buttonCell.style.width = '25px'
            buttonCell.style.height = '25px'
            buttonCell.style.border = '0px'
            buttonCell.style.position = 'absolute'

            coverCell.id = "c2-" + lettersCol[j-1] + i;
            coverCell.style.backgroundColor = "#ADD8E6"
            coverCell.style.width = '25px'
            coverCell.style.height = '25px'
            coverCell.style.border = '0px'
            coverCell.style.position = 'absolute'
            coverCell.style.textAlign = 'center'

            coverCell.style.zIndex = 1;
            buttonCell.style.zIndex = 2;
            
            gridCell.appendChild(buttonCell)
            gridCell.appendChild(coverCell)
            player2Grid.appendChild(gridCell);
        }
    }
    addPlayersShips(playerOneInfo, true)
    addPlayersShips(playerTwoInfo, false)
    for(btn1 of player1Buttons) {
        btn1.addEventListener('click', function(event) {
            playerGridClicked(event, true)
        });
    }   
    for(btn2 of player2Buttons) {
        btn2.addEventListener('click', function(event) {
            playerGridClicked(event, false)
        });
    }
    

}


function addPlayersShips(player, isPlayerOne){

    var playerShipStr = player.shipLoc.split(';')
    var aircraftLoc = ""
    var battleshipLoc = ""
    var submarineLoc = ""
    console.log(playerShipStr)
    for(var i = 0; i < 3; i++){
        let currStr = playerShipStr[i]
        if(currStr[0] == "A"){
            aircraftLoc = currStr.split('')
        }else
        if(currStr[0] == "B"){
            battleshipLoc = currStr.split('')
        }else{
            submarineLoc = currStr.split('')
        }
    }
    console.log(aircraftLoc)

    //true for playerOne
    addAShip(aircraftLoc, aircraft, isPlayerOne)
    addAShip(battleshipLoc, battleship, isPlayerOne)
    addAShip(submarineLoc, submarine, isPlayerOne)
    
}
function addAShip(shipStr, shipType, isPlayerOne){
    var firstPos = [shipStr[2], shipStr[3]]
    var lastPos = [shipStr[5], shipStr[6]]
    var idConcat = ""
    if(isPlayerOne){
        idConcat = "c1-"
    }else{
        idConcat = "c2-"
    }

    if(firstPos[0] !== lastPos[0]){
        horizontalPlacement(idConcat,firstPos, shipType)
    }else{
        verticalPlacement(idConcat, firstPos, shipType)
    }

}

function horizontalPlacement(idConcat,firstPos, shipType){
    var shipNum = parseInt(firstPos[1])
    var j = 0;
    while(firstPos[0] !== lettersCol[j]){
        j += 1;
    }
    for(var i = 0; i < shipType.size; i++){

        let currCell = document.getElementById(idConcat + lettersCol[j] + shipNum)
        currCell.textContent = shipType.char
        console.log(currCell.textContent)

        // console.log(idConcat + lettersCol[j] + shipNum)
        j += 1;

    }
}
//A(B5-B10);B(J1-J4);S(D7-D10);

function verticalPlacement(idConcat, firstPos, shipType){
    idConcat += firstPos[0]
    var shipNum = parseInt(firstPos[1])
    console.log("inside vertical placement")
    for(var i = 0; i < shipType.size; i++){
        console.log(idConcat + shipNum)
        let currCell = document.getElementById(idConcat + shipNum)
        currCell.textContent = shipType.char
        shipNum += 1;
    }
}
//-----end grid ----

//----- userPlaying ----
const gridPlayer2 = document.getElementById('player2Grid')
const player2Buttons = gridPlayer2.getElementsByClassName('buttons_player2')
const gridPlayer1 = document.getElementById('player1Grid')
const player1Buttons = gridPlayer1.getElementsByClassName('buttons_player1')
const shotIndicator = document.getElementById("shotIndicator")
const endTurnBtn = document.getElementById('endTurnBtn')
const player1Area = document.getElementById('player1Area')
const player2Area = document.getElementById('player2Area')
const player2DestShips = document.getElementById('player2DestroyedShips')
const player1DestShips = document.getElementById('player1DestroyedShips')
function endTurn(){
    
    turnIndicator();
    shotIndicator.hidden = true
    swapZindex();
    swapGrids()
    showTurnEles();
    disableOrEnableButtons(player1Buttons, false)
    disableOrEnableButtons(player2Buttons, false)
}
endTurnBtn.addEventListener("click", function(){
    endTurn();
});
//only hide turnOK button, show players turn whole time below grid
//after fire, show hit or miss, then hide grids and re appear OK button
//enable buttons. 
const fsttShipDestPOne = document.getElementById('1stShip1Dest')
const secShipDestPOne = document.getElementById('2ndShip1Dest')
const thrdShipDestPOne = document.getElementById('3rdShip1Dest')
const fstShipDestPTwo = document.getElementById('1stShip2Dest')
const secShipDestPTwo = document.getElementById('2ndShip2Dest')
const thrdShipDestPTwo = document.getElementById('3rdShip2Dest')

function playerGridClicked(e, isPlayerOne){

    let btn = e.target
    let coverCell = document.getElementById('c' + btn.id)
    let cellTxt = coverCell.textContent
    console.log(cellTxt)
    if(isSpaceAlreadyClicked(btn, isPlayerOne)){
        shotIndicator.hidden = false;
        return;
    }
    btn.value = "beenClicked";
    var shipClickedOn = getShipType(cellTxt)
    var isShipDest = wasShipDestroyed(shipClickedOn, isPlayerOne);
    if(isShipDest){
        var displayDestShip = document.createElement('div')
        displayDestShip.textContent = shipClickedOn.name
        if(isPlayerOne){
            player1DestShips.hidden = false
            player1DestShips.appendChild(displayDestShip)
            
        }else{
            player2DestShips.hidden = false
            player2DestShips.appendChild(displayDestShip)
        }
    }
    console.log("gridClicked: playerOne? ", isPlayerOne, " cellTxt ", cellTxt )
    if(cellTxt == "A"|| cellTxt == "B" || cellTxt == "S"){
        console.log("hit")
        coverCell.style.backgroundColor = "#FF0000"
        btn.style.backgroundColor = "#FF0000" 
        if(isShipDest){
            shotIndicator.textContent = shipClickedOn.name + " Destroyed!"
        }else{
            shotIndicator.textContent = "Shot Hit"

        }
    }else{
        console.log("miss")

        coverCell.style.backgroundColor = "#ffffff"
        btn.style.backgroundColor = "#ffffff" 
        shotIndicator.textContent = "Shot Missed"
    }
    shotIndicator.hidden = false
    

}
// NEED TO SWAP GRIDS
function swapGridStyles(leftGrid,rightGrid){
    leftGrid.style.float = 'right'
    leftGrid.style.paddingLeft = '0%'
    leftGrid.style.paddingRight = '10%'

    rightGrid.style.float = 'left'
    rightGrid.style.paddingLeft = '10%'
    rightGrid.style.paddingRight = '0'
}
function swapGrids(){
    console.log(gridAreaEle.firstChild.id)
    if(gridAreaEle.firstElementChild == player1Area){
        //console.log("first")
        player2Area.parentNode.insertBefore(player2Area, player2Area.parentNode.firstChild)
        swapGridStyles(player1Area, player2Area)
    }else{
        player1Area.parentNode.insertBefore(player1Area, player1Area.parentNode.firstChild)
        swapGridStyles(player2Area, player1Area)
    }
}
function swapZindex(){
    //loop all buttons
    const gridPlayer1 = document.getElementById("player1Grid")
    const gridPlayer2 = document.getElementById("player2Grid")
    for(const child1 of gridPlayer1.childNodes){
        if(child1.classList == 'row/col'){
            continue;
        }
        for(const child of child1.childNodes){
            
            if(child.style.zIndex == 1){
                child.style.zIndex = 2
            }else{
                child.style.zIndex = 1
            }
        }
    }

    for(const child1 of gridPlayer2.childNodes){
        if(child1.classList == 'row/col'){
            continue;
        }
        for(const child of child1.childNodes){
            
            if(child.style.zIndex == 1){
                child.style.zIndex = 2
            }else{
                child.style.zIndex = 1
            }
        }  
    }
}

function isSpaceAlreadyClicked(btn, isPlayerOne){
    if(btn.value == "beenClicked"){//set value to button?
        console.log("click again")
        shotIndicator.textContent = "That location has already beem shot at. Choose another one"
        //show click again div 
        return true;
    }else{
        console.log(btn.value)
        if(isPlayerOne){// playerOnes turn so disbale grid 2
            disableOrEnableButtons(player1Buttons, true)
        }else{
            disableOrEnableButtons(player2Buttons, true)
        }
        endTurnBtn.hidden = false
        
        return false;
    }
}
function disableOrEnableButtons(player, toDisbale){
    for(btns of player){//check if this works
        btns.disabled = toDisbale;
        // console.log(btns.id)
    }
}

function wasShipDestroyed(shipType, isPlayerOne){
    if(shipType == "noShip"){
        return false;
    }  //swap this logic
    if(isPlayerOne){
        shipType.twoHitCounter += 1;
        if(shipType.twoHitCounter === shipType.size){
            setShipDestrotyed(shipType, playerTwoInfo)
            return true;
        }
        return false;
    }
    console.log(shipType.size)
    shipType.oneHitCounter += 1;
    if(shipType.oneHitCounter === shipType.size){
        console.log(shipType.oneHitCounter)
        setShipDestrotyed(shipType, playerOneInfo)
        return true;
    }

    return false;
}

function setShipDestrotyed(shipType, player){
    //add message its destroyed//scoreboard  letters back?
    if(shipType === aircraft){
        player.aircraftDest = true
    }
    if(shipType === battleship){
        player.battleshipDest = true
    }
    if(shipType === submarine){
        player.submarineDest = true
    }
    isGameOver(player, shipType)
}

function isGameOver(player, shipType){
    console.log("one ", playerOneInfo.name)
    console.log(player.aircraftDest)
    console.log(player.battleshipDest)
    console.log(player.submarineDest)
    console.log("two ", playerTwoInfo.name)
    if(player.battleshipDest && player.aircraftDest && player.submarineDest){
        //player won div
        isGameOver = true
        disableOrEnableButtons(player1Buttons, true)
        disableOrEnableButtons(player2Buttons, true)
        // var winner = player
        // if(player == playerOneInfo){
        //     winner = playerTwoInfo
        // }
        //show both z index
        let gameOverDiv = document.getElementById('gameOver')
        let gameOverText = document.createElement("div")
        let shipDestTxt = document.createElement("div")
        gameOverText.textContent = player.name + " Won!"
        shipDestTxt.textContent = shipType.name +" Destroyed!"
        //gameOverDiv.appendChild(gameOverText)

        let player1Score = document.createElement("div")
        let player2Score = document.createElement("div")
        var calc1Score = (aircraft.oneHitCounter + battleship.oneHitCounter + submarine.oneHitCounter) * 2
        var calc2Score = (aircraft.twoHitCounter + battleship.twoHitCounter + submarine.twoHitCounter) * 2
        player1Score.textContent = playerOneInfo.name + "'s Score is " + calc1Score
        player2Score.textContent = playerTwoInfo.name + "'s Score is " + calc2Score
        const endTurnPar = document.getElementById('endTurnParent');
        //endTurn
        endTurnPar.removeChild(shotIndicator)
        endTurnPar.removeChild(endTurnBtn)
        endTurnPar.append(shipDestTxt)
        endTurnPar.append(gameOverText)

        if(calc1Score > calc2Score){
            endTurnPar.appendChild(player1Score)
            endTurnPar.appendChild(player2Score)
        }else{
            endTurnPar.appendChild(player2Score)
            endTurnPar.appendChild(player1Score)
        }
        endTurnPar.hidden = false
    }
}

function getShipType(cellTxt){
    console.log(cellTxt)
    if(cellTxt == "A"){
        return aircraft
    }else
    if(cellTxt == "B"){
        return battleship
    }else
    if(cellTxt == "S"){
        return submarine
    }

    return "noShip"
}

//dont let ships go on the same spot.

