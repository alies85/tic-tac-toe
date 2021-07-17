// variables
let turn = "X"
let list = Array(9).fill(null)

const updateTurn = () => {
    let status_element = document.querySelector(".header__turn")
    turn = turn === "X" ? "O" : "X"
    status_element.innerHTML = `${turn}'s turn`
}

const isdone = () => {
    const strcmp = (i1, i2, i3) => {
        if (i1 === i2 && i1 === i3 && i2 === i3 && i1 !== null) {
            return true
        }
    }

    const won = (i1, i2, i3) => {
        document.querySelector(".header__status").innerHTML = `${turn} won the game!`
        let board_tile = Array.from(document.querySelector(".board").children)
        // disable the not clicked div
        board_tile.filter(div => div.innerHTML === "").forEach(div => {
            div.classList.add("disabled")
        })
        board_tile[i1].classList.add("board__tile--winner")
        board_tile[i2].classList.add("board__tile--winner")
        board_tile[i3].classList.add("board__tile--winner")
    }

    // check vertically
    for (let i = 0; i < 4; i++) {
        if (strcmp(list[i], list[i + 3], list[i + 6])) {
            won(i, i+3, i+6)
        }
    }
    // check horizontally
    for (let i = 0; i < 7; i += 3) {
        if (strcmp(list[i], list[i + 1], list[i + 2])) {
            won(i, i+1, i+2)
        }
    }
    // check diametrically
    if (strcmp(list[0], list[4], list[8])) {
        won(0, 4, 8)

    } else if (strcmp(list[2], list[4], list[6])) {
        won(2, 4, 6)

    // tie
    } else if (!list.includes(null)) {
        // disable all
        console.log("drawn")
        Array.from(document.querySelector(".board").children).forEach(div => {
            div.classList.add("disabled")
        })
        document.querySelector(".header__status").innerHTML = "It's a tie!"
    }
}

// Log on the board
document.querySelector(".board").addEventListener("click", e => {
    if (e.target.className.includes("board__tile") &&
        e.target.innerHTML.length == 0) {
        console.log(turn)
        let number = e.target.attributes["data-index"].value
        e.target.innerHTML = turn
        list[number-1] = turn
        isdone()
        updateTurn()
    }
})

// reload game
document.querySelector(".header__restart").addEventListener("click", e => {
    turn = "X"
    document.querySelector(".header__turn").innerHTML = "X's turn"
    document.querySelector(".header__status").innerHTML = "In Progress"
    Array.from(document.querySelector(".board").children).forEach(el => {
        el.innerHTML = ""
        el.classList.remove("disabled")
    })
    Array.from(document.querySelectorAll(".board__tile--winner")).forEach(el => {
        el.classList.remove("board__tile--winner")
    })
    list = Array(9).fill(null)
})