<template>
	<header class="header">
		<div class="container header-inner">
			<NuxtLink to="/" class="logo">
				<span class="logo-text">Studio Jin Doe</span>
			</NuxtLink>
		</div>
	</header>
</template>

<style scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: rgba(13, 15, 20, 0.55);
	backdrop-filter: blur(28px) saturate(1.4);
	-webkit-backdrop-filter: blur(28px) saturate(1.4);
	border-bottom: 1px solid rgba(123, 140, 222, 0.12);
}

.header-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
}

.logo {
	display: flex;
	align-items: center;
	gap: 8px;
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: var(--text-primary);
	transition: opacity 0.2s;
}

.logo:hover {
	opacity: 0.75;
}

.logo-icon {
	font-size: 1.4rem;
	animation: float 3s ease-in-out infinite;
}

.logo-text {
	background: linear-gradient(135deg, var(--pastel-purple), var(--pastel-pink));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}
</style>
