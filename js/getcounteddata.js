import {summaryTitles} from './charttitles.js';

export const createCountedItem = (fieldToShow, data) => {
	const numberOfCases = data[fieldToShow]["Count"];
	const countContainer = document.getElementById(fieldToShow);
	const titleElement = document.createElement("h2");
	const casesElement = document.createElement("p");

	titleElement.textContent = summaryTitles[fieldToShow];
	casesElement.textContent = numberOfCases;

	countContainer.appendChild(titleElement);
	countContainer.appendChild(casesElement);
};
