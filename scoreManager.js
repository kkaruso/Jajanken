const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-comp-score')
const yourScoreSpan = document.querySelector('[data-your-score')
const randButton = document.getElementById('randombutton')
console.log(randButton)
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

randButton.addEventListener('click', function () {
    const randomIndex = randomSelection();
    makeSelection(randomIndex)
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan) {
    if (document.getElementById('5winsCB').checked) {
        if (scoreSpan.innerText < 5) {
            console.log('its in if')
            scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
        }
        else {
            console.log('its in else')
            window.alert('5 points reached!')
        }
    }
    else if (!document.getElementById('5winsCB').checked) {
        scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    }
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}