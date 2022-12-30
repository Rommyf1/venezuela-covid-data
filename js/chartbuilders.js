import {setRandomColor} from './getcolors.js';
import {summaryTitles, timelineTitles} from './charttitles.js';
import {Chart, registerables} from '../node_modules/chart.js/dist/chart.esm.js';

Chart.register(...registerables);

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
		
		//Solución de Datos Errados en la API (Casos Confirmados)
		newConfirmedCasesTimeline.fieldToShow[958] = 36;
		totalConfirmedCasesTimeline.fieldToShow[958] = totalConfirmedCasesTimeline.fieldToShow[957] + newConfirmedCasesTimeline.fieldToShow[958]; 
		newConfirmedCasesTimeline.fieldToShow[959] = 21;
		totalConfirmedCasesTimeline.fieldToShow[959] = totalConfirmedCasesTimeline.fieldToShow[958] + newConfirmedCasesTimeline.fieldToShow[959]; 
		newConfirmedCasesTimeline.fieldToShow[979] = 67;
		totalConfirmedCasesTimeline.fieldToShow[979] = totalConfirmedCasesTimeline.fieldToShow[978] + newConfirmedCasesTimeline.fieldToShow[979];
		newConfirmedCasesTimeline.fieldToShow[980] = 39;
		totalConfirmedCasesTimeline.fieldToShow[980] = totalConfirmedCasesTimeline.fieldToShow[979] + newConfirmedCasesTimeline.fieldToShow[980];
		newConfirmedCasesTimeline.fieldToShow[981] = 51;
		totalConfirmedCasesTimeline.fieldToShow[981] = totalConfirmedCasesTimeline.fieldToShow[980] + newConfirmedCasesTimeline.fieldToShow[981];

		//Solución de Datos Errados en la API (Casos Recuperados)
		newRecoveredCasesTimeline.fieldToShow[958] = 92;
		totalRecoveredCasesTimeline.fieldToShow[958] = totalRecoveredCasesTimeline.fieldToShow[957] + newRecoveredCasesTimeline.fieldToShow[958]; 
		newRecoveredCasesTimeline.fieldToShow[959] = 54;
		totalRecoveredCasesTimeline.fieldToShow[959] = totalRecoveredCasesTimeline.fieldToShow[958] + newRecoveredCasesTimeline.fieldToShow[959]; 
		newRecoveredCasesTimeline.fieldToShow[963] = 17;
		totalRecoveredCasesTimeline.fieldToShow[963] = totalRecoveredCasesTimeline.fieldToShow[962] + newRecoveredCasesTimeline[963];
		//Solución de Datos Errados en la API (Casos Activos)
		totalActiveCasesTimeline.fieldToShow[958] = 634;
		totalActiveCasesTimeline.fieldToShow[979] = 801;
		totalActiveCasesTimeline.fieldToShow[980] = 826;

	createGraphic(
		totalConfirmedCases,
		timelineTitles["totalConfirmedCases"],
		totalConfirmedCasesTimeline["date"],
		totalConfirmedCasesTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newConfirmedCases,
		timelineTitles["newConfirmedCases"],
		newConfirmedCasesTimeline["date"],
		newConfirmedCasesTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalRecoveredCases,
		timelineTitles["totalRecoveredCases"],
		totalRecoveredCasesTimeline["date"],
		totalRecoveredCasesTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newRecoveredCases,
		timelineTitles["newRecoveredCases"],
		newRecoveredCasesTimeline["date"],
		newRecoveredCasesTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalDeaths,
		timelineTitles["totalDeaths"],
		totalDeathsTimeline["date"],
		totalDeathsTimeline["fieldToShow"],
		"line"
	);

	createGraphic(
		newDeaths,
		timelineTitles["newDeaths"],
		newDeathsTimeline["date"],
		newDeathsTimeline["fieldToShow"],
		"bar"
	);

	createGraphic(
		totalActiveCases,
		timelineTitles["totalActiveCases"],
		totalActiveCasesTimeline["date"],
		totalActiveCasesTimeline["fieldToShow"],
		"line"
	);

};
