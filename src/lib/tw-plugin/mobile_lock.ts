import plugin from 'tailwindcss/plugin';

export default plugin(({ addBase }) => {
	addBase({
		'touch-action': 'pan-x pan-y',
		overflow: 'hidden',
		'-webkit-user-select': 'none' /* Safari */,
		'-ms-user-select': 'none' /* IE 10 and IE 11 */,
		'user-select': 'none' /* Standard syntax */
	});
});
