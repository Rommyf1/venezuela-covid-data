const availableColors = [
	"rgba(255, 99, 132, 0.2)",
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 206, 86, 0.2)",
	"rgba(75, 192, 192, 0.2)",
	"rgba(153, 102, 255, 0.2)",
	"rgba(255, 159, 64, 0.2)"
];

export const setRandomColor = () => {
	const colorIndex = Math.floor(Math.random() * availableColors.length);
	const backgroundColor = availableColors[colorIndex];
	const borderColor = backgroundColor.replace("0.2", "1");

	return [backgroundColor, borderColor];
};
