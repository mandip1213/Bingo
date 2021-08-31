const length = 5;


const board = document.querySelector(".playing-board")
const human = document.querySelector(".human-board")
const computer = document.querySelector(".computer-board")
const fillBoard = (element, [...array]) => {
	element.innerHTML = ""
	const boxes = document.createDocumentFragment()
	const __index = array.length
	for (let count = 1; count <= __index; count++) {
		const box = document.createElement("div")
		const index = Math.floor(Math.random() * array.length)
		const value = array[index];
		array.splice(index, 1)
		box.innerText = value
		box.setAttribute("data-value", value);
		box.setAttribute("data-box-id", count)
		boxes.appendChild(box)
	}
	element.appendChild(boxes)

}
const createBoard = (length) => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
	fillBoard(computer, array);
	fillBoard(human, array)
	board.classList.add("show");
}
const setUpGame = () => {
	createBoard(length)
}
setUpGame()
