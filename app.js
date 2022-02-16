/*
このプロジェクトで主に使用する機能
- for loops
- addEventListener
- setAttribute
- getAttribute
- data-name
- document.querySelector
- createElement
*/

document.addEventListener('DOMContentLoaded',() => {
    // カードの配列を作成
    const cardArray = [
        {
            name: 'amongus',
            img: 'img/amongus.png'
        },
        {
            name: 'creeper',
            img: 'img/creeper.png'
        },
        {
            name: 'eevee',
            img: 'img/eevee.png'
        },
        {
            name: 'kuribo',
            img: 'img/kuribo.png'
        },
        {
            name: 'mario',
            img: 'img/mario.png'
        },
        {
            name: 'sans',
            img: 'img/sans.png'
        },
        {
            name: 'amongus',
            img: 'img/amongus.png'
        },
        {
            name: 'creeper',
            img: 'img/creeper.png'
        },
        {
            name: 'eevee',
            img: 'img/eevee.png'
        },
        {
            name: 'kuribo',
            img: 'img/kuribo.png'
        },
        {
            name: 'mario',
            img: 'img/mario.png'
        },
        {
            name: 'sans',
            img: 'img/sans.png'
        },
    ]
    cardArray.sort(() => 0.5 - Math.random())

    // 定数
    const grid = document.querySelector(".grid")
    const resultDisplay = document.querySelector('#result')

    // 変数
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    // カードを並べるファンクション（関数）
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src','img/blank.png')
            card.setAttribute('data-id',i)
            grid.appendChild(card) // htmlのgridにcardを追加する
            card.addEventListener('click',flipCard) // クリックされたらflipCardファンクションを起動
        }
    }
    createBoard()

    // カードをフリップするファンクション（関数）
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src',cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch,500)
        }
    }

    // カードが揃ったかチェックするファンクション（関数）
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        // 同じカードを選んだ時
        if (optionOneId === optionTwoId) {
            cards[optionTwoId].setAttribute('src','img/blank.png')
            cards[optionTwoId].setAttribute('src','img/blank.png')
            alert('You have clicked the same image!')
        }
        // カードがマッチした時
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('Nice!')
            cards[optionOneId].setAttribute('src','img/white.png')
            cards[optionTwoId].setAttribute('src','img/white.png')
            cards[optionOneId].removeEventListener('click',flipCard)
            cards[optionTwoId].removeEventListener('click',flipCard)
            cardsWon.push(cardsChosen)
        }
        // カードがマッチしなかった時
        else {
            cards[optionOneId].setAttribute('src','img/blank.png')
            cards[optionTwoId].setAttribute('src','img/blank.png')
            alert('Sorry, try again')
        }

        // 配列を空にする
        cardsChosen = []
        cardsChosenId = []

        // スコア表示
        resultDisplay.textContent = cardsWon.length

        // ゲームクリア
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Great! You found them all!'
        }
    }
})

