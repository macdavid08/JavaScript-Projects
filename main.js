let counter = document.querySelector('.counter')
let save = document.querySelector('.save-btn')
let saveEL = document.querySelector('.saveEL');
let dlt = document.querySelector('.del-btn')
let remove = document.querySelector('.dltEL')

let count = 0
let btn = document.querySelector('.increase-btn')
btn.addEventListener ('click', ()=>{
    count+=1
    counter.textContent = count
    // console.log(count)
    // console.log('button clicked')
})

save.addEventListener('click', ()=> {
    let countStr = count + '' + ' - ';
    saveEL.textContent += countStr
    counter.textContent = 0
    count = 0
   
})

// dlt.addEventListener ('click', ()=> {
//     count = count * 0
//     let countStr = count + '' + ' - ';
//     // remove.textContent += countStr
//     counter.textContent = count
// })

let score = document.querySelector('.score');

let guestScore = document.querySelector('.score1');

let add1 = document.querySelector('.add1')
let add2 = document.querySelector('.add2')
let add3 = document.querySelector('.add3')

let add1g = document.querySelector('.add1g')
let add2g = document.querySelector('.add2g')
let add3g = document.querySelector('.add3g')


let value = 0;

add1.addEventListener('click', ()=> {
    value += 1
    score.textContent = value
})

add2.addEventListener('click', ()=> {
    value += 2
    score.textContent = value
})

add3.addEventListener('click', ()=> {
    value += 3
    score.textContent = value
})

let guestValue = 0

add1g.addEventListener('click', ()=> {
    guestValue += 1
    guestScore.textContent = guestValue
})

add2g.addEventListener('click', ()=> {
    guestValue += 2
    guestScore.textContent = guestValue
})

add3g.addEventListener('click', ()=> {
    guestValue += 3
    guestScore.textContent = guestValue
})


let start = document.querySelector('.start')



let getRandomCard = ()=> {
    let randomNumber = Math.floor((Math.random() * 13) + 1)

    if (randomNumber > 10) {
        return 10
    }else if (randomNumber === 1) {
        return 11
    }else {
        return randomNumber
    }
}

let firstCard = getRandomCard();
let secondCard = getRandomCard();
let cards = [firstCard , secondCard]
let sum = firstCard + secondCard;
let intro = document.querySelector('.message')
let sumOfCard = document.querySelector('.sum')
let card = document.querySelector('.card')
let draw = document.querySelector('.draw')
let result = document.querySelector('.result')

let jackpot = false;

let isAlive = true;

let message = "";

let playerDetails = {
    name : "David",
    chip : 100
}

let player = document.querySelector('.player');
// player.textContent = `${playerDetails.name} $${playerDetails.chip}`


startGame = ()=> {
    start.addEventListener('click', ()=> {
        card.textContent = "Cards: " 
        for( i=0; i < cards.length; i ++) {
            card.textContent += cards[i] + " "
        }
        sumOfCard.textContent = 'Sum: ' + sum
        if (sum < 21) {
            message = "Draw another card"
        }else if (sum === 21) {
            message = "Wohoo! you've got BlackJack"
            jackpot=true;
        }else {
            message = "You are out of the game"
            isAlive = false;
        }
        result.textContent = message
        start.textContent = "Play";

        console.log (message)
    
    })
    
}

startGame()

 let drawCard = ()=> {

    draw.addEventListener('click', ()=> {
        if ( isAlive === true && jackpot === false) {
            let newCard = getRandomCard();
            cards.push(newCard)
            card.textContent = `Cards: ${firstCard} ${secondCard} ${newCard}`;
            sum += newCard;
    
            startGame()
        }

    })
    
 }

 drawCard()


 let myLeads = [];
 const saveInput = document.querySelector('.saveInput');
 const input = document.querySelector('.input');
 const unList = document.querySelector('.list')
 const deleteAll = document.querySelector('.delAll')

 const tab = document.querySelector('.tab')

 const leadsLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

 let render = (leads)=> {
    let listItems = ""
    for (i = 0; i < leads.length; i++) {
    listItems += ` <li> <a target = _blank href = "${leads[i]}">${leads[i]}</a> </li> `
    // const li = document.createElement("li");
    // li.textContent = myLeads [i];
    // unList.append(li)
 }

 unList.innerHTML = listItems

 }

 if (leadsLocalStorage) {
    myLeads = leadsLocalStorage;
    render(myLeads)
 }

 let tabs = [
    {url:"https://www.google.com"}
 ]

 tab.addEventListener ('click', ()=> {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
 })

 

 saveInput.addEventListener ('click', ()=> {
    myLeads.push(input.value)
    input.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
 })

 

 deleteAll.addEventListener('dblclick', ()=> {
    localStorage.clear()
    myLeads = []
    render(myLeads)

 })
 