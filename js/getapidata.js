import {createBarChart, createAllTimelineCharts} from './chartbuilders.js';
import {createCountedItem} from './getcounteddata.js';

const APIRoute = "https://covid19.patria.org.ve/api/v1/";

export const fetchAPIAllSummaryData = async () => {
	const response = await fetch(`${APIRoute}summary`);
	const data = await response.json();

	createCountedItem("Confirmed", data);
	createCountedItem("Recovered", data);
	createCountedItem("Deaths", data);
	createCountedItem("Active", data);
	createBarChart("ByGender", data);
	createBarChart("ByAgeRange", data);
	createBarChart("ByState", data);
};

export const fetchAPISingleSummaryIndicator = async (fieldToShow) => {
	const response = await fetch(`${APIRoute}summary`);
	const data = await response.json();

	data.hasOwnProperty(fieldToShow)
		? createCountedItem(fieldToShow, data)
		: createBarChart(fieldToShow, data);
};

export const fetchAPIAllTimelineData = async () => {
	const response = await fetch(`${APIRoute}timeline`);
	const data = await response.json();

	createAllTimelineCharts(data);
};
