export const Blur = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			viewBox='0 0 800 450'>
			<defs>
				<filter
					id='bbblurry-filter'
					x='-100%'
					y='-100%'
					width='400%'
					height='400%'
					filterUnits='objectBoundingBox'
					primitiveUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'>
					<feGaussianBlur
						stdDeviation='130'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='SourceGraphic'
						edgeMode='none'
						result='blur'></feGaussianBlur>
				</filter>
			</defs>
			<g filter='url(#bbblurry-filter)'>
				<ellipse
					rx='97'
					ry='79.5'
					cx='637.3092028233393'
					cy='350.7026969550168'
					fill='hsl(37, 99%, 67%)'></ellipse>
				<ellipse
					rx='97'
					ry='79.5'
					cx='171.25988729586777'
					cy='148.016200839537'
					fill='hsl(316, 73%, 52%)'></ellipse>
				<ellipse
					rx='97'
					ry='79.5'
					cx='166.90139450952017'
					cy='622.8585407996053'
					fill='hsl(185, 100%, 57%)'></ellipse>
			</g>
		</svg>
	)
}
