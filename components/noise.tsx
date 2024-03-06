const Noise = () => {
	return (
		<div
			style={{
				backgroundImage: `url(http://localhost:3000/noise.png)`,
			}}
			className={`
    -top-1/2 -left-1/2 -bottom-1/2 -right-1/2
    fixed bg-repeat bg-transparent w-[200%] h-[200vh] -z-[99999]
    pointer-events-none contrast-200 brightness-[0.4]
  `}></div>
	)
}

export default Noise
