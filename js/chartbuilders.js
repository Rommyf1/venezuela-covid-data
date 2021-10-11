import {setRandomColor} from './getcolors.js';
import {summaryTitles, timelineTitles} from './charttitles.js';
import Chart from '../node_modules/chart.js/auto/auto.esm.js';

export const createGraphic = (
	element,
	title,
	[...labels],
	[...dataProvided],
	type = "bar",
	[backgroundColor, borderColor] = setRandomColor()
) => {
	const data = {
		labels,
		datasets: [
			{
				label: title,
				backgroundColor,
				borderColor,
				data: dataProvided
			}
		]
	};

	const config = {
		type,
		data
	};

	return new Chart(element, config);
};

export const createBarChart = (
	fieldToShow,
	data,
	[backgroundColor, borderColor] = setRandomColor()
) => {
	const actualData = data["Confirmed"][fieldToShow];
	const chartContainer = document.getElementById(fieldToShow);

	return createGraphic(
		chartContainer,
		summaryTitles[fieldToShow],
		Object.keys(actualData),
		Object.values(actualData),
		"bar",
		[backgroundColor,
			borderColor]
	);
};

export const createLineChart = (
	fieldToShow,
	data,
	[backgroundColor, borderColor] = setRandomColor()
) => {
	const filteredData = {
		date: [],
		fieldToShow: []
	};

	const chartContainer = document.getElementById(`timeline${fieldToShow}`);

	data.map((element) => {
		filteredData["date"].push(element["Date"]);
		filteredData["fieldToShow"].push(element[fieldToShow]["Count"]);
	});

	return createGraphic(
		chartContainer,
		timelineTitles[fieldToShow],
		filteredData["date"],
		filteredData["fieldToShow"],
		"line",
		backgroundColor,
		borderColor
	);
};

export const createAllTimelineCharts = (data) => {

	const totalConfirmedCasesTimeline = {
		date: [],
		fieldToShow: []
	};

	const newConfirmedCasesTimeline = {
		date: [],
		fieldToShow: []
	};

	const totalRecoveredCasesTimeline = {
		date: [],
		fieldToShow: []
	};

	const newRecoveredCasesTimeline = {
		date: [],
		fieldToShow: []
	};

	const totalDeathsTimeline = {
		date: [],
		fieldToShow: []
	};

	const newDeathsTimeline = {
		date: [],
		fieldToShow: []
	};

	const totalActiveCasesTimeline = {
		date: [],
		fieldToShow: []
	};

	const totalConfirmedCases = document.getElementById('timelineConfirmed');
	const newConfirmedCases = document.getElementById('timelineNewConfirmed');
	const totalRecoveredCases = document.getElementById('timelineRecovered');
	const newRecoveredCases = document.getElementById('timelineNewRecovered');
	const totalDeaths = document.getElementById('timelineDeaths');
	const newDeaths = document.getElementById('timelineNewDeaths');
	const totalActiveCases = document.getElementById('timelineActive');

	data.map((element) => {
		totalConfirmedCasesTimeline["date"].push(element["Date"]);
		totalConfirmedCasesTimeline["fieldToShow"].push(element["Confirmed"]["Count"]);
		newConfirmedCasesTimeline["date"].push(element["Date"]);
		newConfirmedCasesTimeline["fieldToShow"].push(element["Confirmed"]["New"]);
		totalRecoveredCasesTimeline["date"].push(element["Date"]);
		totalRecoveredCasesTimeline["fieldToShow"].push(element["Recovered"]["Count"]);
		newRecoveredCasesTimeline["date"].push(element["Date"]);
		newRecoveredCasesTimeline["fieldToShow"].push(element["Recovered"]["New"]);
		totalDeathsTimeline["date"].push(element["Date"]);
		totalDeathsTimeline["fieldToShow"].push(element["Deaths"]["Count"]);
		newDeathsTimeline["date"].push(element["Date"]);
		newDeathsTimeline["fieldToShow"].push(element["Deaths"]["New"]);
		totalActiveCasesTimeline["date"].push(element["Date"]);
		totalActiveCasesTimeline["fieldToShow"].push(element["Active"]["Count"]);
	});

	createGraphic(
		totalConfirmedCases,
		"Total de Casos Confirmados por día",
		totalConfirmedCasesTimeline["date"],
		totalConfirmedCasesTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newConfirmedCases,
		"Nuevos Casos Confirmados por Día",
		newConfirmedCasesTimeline["date"],
		newConfirmedCasesTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalRecoveredCases,
		"Total de Casos Recuperados por Día",
		totalRecoveredCasesTimeline["date"],
		totalRecoveredCasesTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newRecoveredCases,
		"Nuevos Casos Recuperados por Día",
		newRecoveredCasesTimeline["date"],
		newRecoveredCasesTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalDeaths,
		"Total de Personas fallecidas por Día",
		totalDeathsTimeline["date"],
		totalDeathsTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newDeaths,
		"Cantidad de Nuevos fallecidos por Día",
		newDeathsTimeline["date"],
		newDeathsTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalActiveCases,
		"Total de Casos Activos por Día",
		totalActiveCasesTimeline["date"],
		totalActiveCasesTimeline["fieldToShow"],
		"line"
	);

};
