import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
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
