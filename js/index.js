import {fetchAPIAllSummaryData, fetchAPIAllTimelineData} from './getapidata.js';

fetchAPIAllSummaryData().catch((error) => console.log(error));
fetchAPIAllTimelineData().catch((error) => console.log(error));
