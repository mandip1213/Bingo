const computerPlayed = []
const humanPlayed = []
const winningCombinations = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25],
	[1, 6, 11, 16, 21,],
	[2, 7, 12, 17, 22,],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
	[5, 10, 15, 20, 25],
	[1, 7, 13, 19, 25],
	[5, 9, 13, 17, 21]
]

class Player {

	constructor(player) {
		this.player = player
		this.winningCombinations = [...winningCombinations];
		this.playedBoxes = []
		this.matchedCombinations = []
	}

	addCombination(value) {
		this.playedBoxes.push(value)
	}

	checkCombination() {
		const [matchedArray, remainingArray] = this.winningCombinations.reduce(([matchedArray, remainingArray], currentSubArray) => {
			const isWinningCombination = currentSubArray.every(boxId => this.playedBoxes.includes(boxId))
			if (isWinningCombination) {
				matchedArray.push(currentSubArray)
			} else {
				remainingArray.push(currentSubArray)
			}
			return [[...matchedArray], [...remainingArray]]

		}, [[], []])

		if (matchedArray.length !== 0) {
			this.matchedCombinations.push(...matchedArray);
			this.winningCombinations = remainingArray
		}

		if (this.matchedCombinations.length >= 1 && this.matchedCombinations.length <= 5) {
			this.handleStatus()
		}
	}
	handleStatus = () => {
		//RIP best practices
		const childStatuses = Array.from(document.querySelectorAll(`.${this.player}-status div`))
		for (let index = 1; index <= this.matchedCombinations.length; index++) {
			// console.log(index)
			childStatuses[index - 1].style.opacity = 1;
		}
		if (this.matchedCombinations.length === 5) {
			this.endGame()
		}
	}
	endGame() {
		const template = document.querySelector(".template");
		const clone = template.content.cloneNode(true)

		const message = this.player === "human" ? `Congrats ❤ You won ✔✔✔` : `Sorry 😢 You lose ✔✔✔`
		clone.querySelector(".message").innerText = message;
		const modal = document.createElement("div")
		modal.classList.add("modal")
		modal.append(clone)
		document.querySelector("body").append(modal)
		document.querySelector(".play-again").addEventListener("click", () => {
			console.log("vlick")
			document.querySelector(".modal").style.transform = "scale(0)"
			setUpGame()
		})


	}

}

const humanPlayer = new Player("human")
const computerPlayer = new Player("computer")



const renderPlayedValue = (playedBoxId, playedValue, player) => {
	//playedValue will be same but box id will be different for computer and human
	const humanTarget = human.querySelector(`[data-value="${playedValue}"]`)
	const computerTarget = computer.querySelector(`[data-value="${playedValue}"]`)

	if (player === "computer") {
		var humanBoxId = humanTarget.getAttribute("data-box-id");
		var computerBoxId = playedBoxId
	}
	else if (player === "human") {
		var computerBoxId = computerTarget.getAttribute("data-box-id")
		var humanBoxId = playedBoxId
	}

	humanPlayer.addCombination(Number(humanBoxId))
	computerPlayer.addCombination(Number(computerBoxId))
	humanTarget.classList.add("clicked")
	computerTarget.classList.add("clicked")
}

const handleUserPlay = ({ target }) => {
	if (!target.classList.contains("board")) {
		const humanPlayedId = target.getAttribute("data-box-id")
		const humanPlayedValue = target.getAttribute("data-value")

		renderPlayedValue(humanPlayedId, humanPlayedValue, "human")

		if (computerPlayer.playedBoxes.length === 25) {
			return
		}

		console.log("user played")
		humanPlayer.checkCombination()
		computerPlayer.checkCombination()

		handleComputerPlay()
	}
}

const handleComputerPlay = () => {
	while (true) {
		if (computerPlayer.playedBoxes.length === 25) {

		}
		const boxPlayedId = Math.floor(Math.random() * 25) + 1
		if (!(computerPlayer.playedBoxes.includes(boxPlayedId))) {
			const computerPlayedValue = computer.querySelector(`[data-box-id="${boxPlayedId}"]`).getAttribute("data-value")

			renderPlayedValue(boxPlayedId, computerPlayedValue, "computer")
			break;
		}
	}
	console.log("computer played")
	humanPlayer.checkCombination()
	computerPlayer.checkCombination()
}
human.addEventListener("click", handleUserPlay)