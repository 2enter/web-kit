import plugin from 'tailwindcss/plugin';

const utils = plugin(({ addUtilities }) => {
	addUtilities({
		'.full-screen': {
			width: '100vw',
			height: '100vh',
			position: 'fixed',
			top: '0',
			left: '0'
		},
		'.center-content': {
			display: 'flex',
			'justify-content': 'center',
			'align-items': 'center'
		},
		'.font-dot-gothic': {
			'font-family': "'DotGothic16', sans-serif"
		},
		'.font-fira-code': {
			'font-family': "'Fira Code', monospace"
		}
	});
});

const mobileLock = plugin(({ addBase }) => {
	addBase({
		'touch-action': 'pan-x pan-y',
		overflow: 'hidden',
		'-webkit-user-select': 'none' /* Safari */,
		'-ms-user-select': 'none' /* IE 10 and IE 11 */,
		'user-select': 'none' /* Standard syntax */
	});
});

export { utils, mobileLock };
