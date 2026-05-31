<template>
	<footer class="footer">
		<div class="container footer-inner">
			<p class="footer-copy">© 2026 Studio Jin Doe</p>
			<button class="lang-toggle" @click="toggle" :aria-label="`Switch to ${lang === 'ja' ? 'English' : '日本語'}`">
				<span :class="{ active: lang === 'ja' }">JA</span>
				<span class="divider">/</span>
				<span :class="{ active: lang === 'en' }">EN</span>
			</button>
		</div>
	</footer>
</template>

<script setup lang="ts">
const { lang, toggle } = useLang()
</script>

<style scoped>
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 16px 0;
	border-top: 1px solid rgba(123, 140, 222, 0.15);
	background: rgba(13, 15, 20, 0.85);
	z-index: 50;
}

.footer-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.footer-copy {
	font-size: 0.85rem;
	color: var(--text-muted);
}

.lang-toggle {
	display: flex;
	align-items: center;
	gap: 4px;
	background: none;
	border: 1px solid rgba(123, 140, 222, 0.2);
	border-radius: 999px;
	padding: 4px 12px;
	cursor: pointer;
	font-family: inherit;
	font-size: 0.78rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	color: var(--text-muted);
	transition: all 0.2s;
}

.lang-toggle:hover {
	border-color: rgba(123, 140, 222, 0.5);
	color: var(--text-secondary);
}

.lang-toggle span.active {
	color: var(--text-primary);
}

.divider {
	opacity: 0.3;
}
</style>
