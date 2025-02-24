/* eslint-disable @typescript-eslint/no-unused-vars */

function stripFormatting(number) {
	return parseInt(number.replace(/,/g, ""));
}

function createFormattedNumberArray(fnumber) {
	const numberArray = fnumber.toString().split("");
	return numberArray.map((x) => (x === "," ? "," : parseInt(x)));
}

async function animateNumber(numberArray, element, oldArray) {
	element.innerHTML = null;

	const ele = await createNumberHTML(numberArray, oldArray, element);
	if (!ele) return;

	const ticks = [...ele.querySelectorAll("span[data-counter]")];
	if (!ticks.length) return;
	return new Promise(async (resolve, reject) => {
		for (const tick of ticks) {
			await sleep(10);
			const dist = parseInt(tick.getAttribute("data-counter") - 1);
			tick.style.setProperty("transform", `translateY(-${dist * 100}%)`, "important");
			resolve(1);
		}
	});
}

async function createNumberHTML(numbers, old, element) {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < numbers.length; i++) {
			if (isNaN(numbers[i]) || isNaN(old[i])) {
				element.insertAdjacentHTML("beforeend", `<span data-counter="1">${numbers[i]}</span>`);
			} else {
				const datacounter = calcDeltaBetweenNumbers(old[i], numbers[i]).length;
				const number = calcDeltaBetweenNumbers(old[i], numbers[i]).join("");
				const dist = parseInt(datacounter - 1);
				const ret = element.insertAdjacentHTML(
					"beforeend",
					`<span data-counter="${datacounter}" style="transform: translateY(0%) !important;">
						${number}
					</span>`
				);
			}
		}
		resolve(element);
	});
}

function calcDeltaBetweenNumbers(oldNumber, newNumber) {
	const numberArray = [oldNumber];
	let notFound = true;
	if (oldNumber === newNumber) return numberArray.map((x) => `<span>${x}</span>`);
	while (notFound) {
		oldNumber++;
		if (oldNumber > 9) oldNumber = 0;
		numberArray.push(oldNumber);
		if (oldNumber === newNumber) notFound = false;
	}
	return numberArray.map((x) => `<span>${x}</span>`);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
