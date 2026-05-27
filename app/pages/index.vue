<template>
	<div>
		<section ref="linksSection" class="hero" :class="{ 'links-visible': linksVisible }">
			<div class="hero-deco" aria-hidden="true">
				<span class="deco-blob deco-blob--1" />
				<span class="deco-blob deco-blob--2" />
				<span class="deco-blob deco-blob--3" />
			</div>
			<div class="container hero-layout fade-in" :class="{ 'panel-active': activePanel }">
				<!-- 左：タイトルペイン（常に表示） -->
				<div class="hero-content">
					<h1 class="hero-title">
						Studio<br />
						<span class="hero-title-accent">Jin Doe</span>
					</h1>
					<p class="hero-desc">
						{{ t.heroDesc[0] }}<span class="sp-br"></span>{{ t.heroDesc[1] }}<br class="pc-br" />{{ t.heroDesc[2] }}
					</p>
				</div>

				<!-- 右：メニュー or パネルコンテンツ -->
				<div class="right-col">
					<!-- メニュー -->
					<Transition name="panel">
						<nav v-if="!activePanel" ref="scrollContainer" class="links-scroll" key="menu">
							<template v-for="copyIdx in 3" :key="copyIdx">
								<template v-for="i in 4" :key="`${copyIdx}-${i}`">
									<button class="links-item" @click="openPanel('works')">{{ t.menu.works }}</button>
									<button class="links-item" @click="openPanel('about')">{{ t.menu.about }}</button>
									<button class="links-item" @click="openPanel('links')">{{ t.menu.links }}</button>
								</template>
							</template>
						</nav>
					</Transition>

					<!-- パネルコンテンツ -->
					<Transition name="panel">
						<div v-if="activePanel" class="panel-wrapper" key="panel">
							<button class="panel-back" @click="closePanel">{{ t.back }}</button>
							<nav v-if="activePanel === 'works'" class="works-section-nav">
								<button
									v-for="s in worksSections"
									:key="s.key"
									class="works-section-btn"
									@click="scrollToSection(s.key)"
								>{{ s.label }}</button>
							</nav>
							<div ref="panelContent" class="panel-content">
								<PanelsWorksPanel v-if="activePanel === 'works'" />
								<PanelsAboutPanel v-if="activePanel === 'about'" />
								<PanelsLinksPanel v-if="activePanel === 'links'" />
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
useSeoMeta({
	title: 'studio jin doe — DTM Portfolio',
	description: 'Lo-fi / Ambient / Chill beats を中心に制作するDTMプロデューサーのポートフォリオ',
});

const { t } = useI18n()

type Panel = 'works' | 'about' | 'links' | null

const linksSection = ref<HTMLElement | null>(null);
const linksVisible = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);
const panelContent = ref<HTMLElement | null>(null);
const activePanel = ref<Panel>(null);

// 現在スクロール対象のコンテナ
const currentScroll = computed(() =>
	activePanel.value ? panelContent.value : scrollContainer.value
);

const sectionKeys = ['latest', 'lofi', 'neosoul', 'citypop', 'rock', 'other'] as const
const worksSections = computed(() =>
	sectionKeys.map(key => ({ key, label: t.value.works[key] }))
)

function scrollToSection(key: string) {
	const el = panelContent.value?.querySelector(`#section-${key}`) as HTMLElement | null
	if (el && panelContent.value) {
		panelContent.value.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
	}
}

function openPanel(panel: Panel) {
	activePanel.value = panel;
}

function closePanel() {
	activePanel.value = null;
	// メニューに戻ったら無限スクロール初期位置を再設定
	nextTick(() => {
		if (scrollContainer.value) {
			scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight / 3;
		}
	});
}

onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => { if (entries[0]?.isIntersecting) linksVisible.value = true; },
		{ threshold: 0.1 },
	);
	if (linksSection.value) observer.observe(linksSection.value);

	// メニュー初期位置
	nextTick(() => {
		if (scrollContainer.value) {
			scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight / 3;
		}
	});

	// 無限ループ維持
	const onMenuScroll = () => {
		const el = scrollContainer.value;
		if (!el) return;
		const { scrollTop, scrollHeight } = el;
		const unit = scrollHeight / 3;
		if (scrollTop < unit) el.scrollTop = scrollTop + unit;
		else if (scrollTop >= unit * 2) el.scrollTop = scrollTop - unit;
	};

	// scroll イベントは対象要素に直接バインドできないので watch で対応
	watch(scrollContainer, (el) => {
		if (el) el.addEventListener('scroll', onMenuScroll, { passive: true });
	}, { immediate: true });

	// 画面全体のホイールを現在のコンテナに転送
	const onWheel = (e: WheelEvent) => {
		e.preventDefault();
		const el = currentScroll.value;
		if (el) el.scrollTop += e.deltaY;
	};
	window.addEventListener('wheel', onWheel, { passive: false });
	onUnmounted(() => window.removeEventListener('wheel', onWheel));
});
</script>

<style scoped>
.hero {
	position: relative;
	height: 100vh;
	display: flex;
	align-items: center;
	overflow: hidden;
	padding-top: 64px;
	padding-bottom: 12vh;
}

.hero-deco {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
}

.deco-blob {
	position: absolute;
	border-radius: 50%;
	filter: blur(60px);
	opacity: 0.35;
}
.deco-blob--1 { width: 320px; height: 320px; background: var(--pastel-purple); top: -80px; right: -60px; animation: float 6s ease-in-out infinite; }
.deco-blob--2 { width: 240px; height: 240px; background: var(--pastel-pink); bottom: -40px; left: 10%; animation: float 8s ease-in-out infinite 1s; }
.deco-blob--3 { width: 180px; height: 180px; background: var(--pastel-blue); top: 30%; left: 40%; animation: float 7s ease-in-out infinite 2s; }

.hero-layout {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 40px;
	width: 100%;
}

.hero-title {
	font-family: 'Cormorant Garamond', serif;
	font-size: clamp(3.5rem, 9vw, 6rem);
	font-weight: 300;
	line-height: 1.05;
	letter-spacing: 0.02em;
	color: var(--text-primary);
	margin-bottom: 20px;
}
.hero-title-accent {
	background: linear-gradient(135deg, var(--pastel-purple), var(--pastel-pink));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}
.hero-desc {
	font-size: 1.05rem;
	color: var(--text-secondary);
	line-height: 1.9;
}

.sp-br {
	display: none;
}

.pc-br {
	display: block;
}

/* 右カラム */
.right-col {
	position: relative;
	width: 340px;
	flex-shrink: 0;
	height: 70vh;
}

/* メニュースクロール */
.links-scroll {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 14vh;
	overflow-y: scroll;
	overscroll-behavior: contain;
	padding-right: 8px;
	scrollbar-width: none;
	background: none;
	border: none;
	mask-image: linear-gradient(to bottom, transparent 0%, black 50%, black 50%, transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%, black 50%, transparent 100%);
}
.links-scroll::-webkit-scrollbar { display: none; }

.links-item {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.8rem;
	font-weight: 600;
	color: var(--text-secondary);
	letter-spacing: 0.04em;
	white-space: nowrap;
	transition: color 0.2s;
	line-height: 1.4;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
}
.links-item:hover { color: var(--text-primary); }

/* パネルラッパー（戻るボタン＋スクロール領域） */
.panel-wrapper {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.panel-back {
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 0.82rem;
	font-weight: 700;
	color: var(--text-primary);
	padding: 0;
	transition: color 0.2s;
	font-family: inherit;
	letter-spacing: 0.04em;
	align-self: flex-end;
}
.panel-back:hover { color: var(--accent-mauve); }

/* パネルコンテンツ（スクロール領域） */
.panel-content {
	flex: 1;
	overflow-y: auto;
	overscroll-behavior: contain;
	scrollbar-width: thin;
	scrollbar-color: rgba(123, 140, 222, 0.3) transparent;
	padding: 20px 12px 20px 12px;
	mask-image: linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%);
}

/* Worksセクションナビ */
.works-section-nav {
	flex-shrink: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 8px 12px 20px;
	background: linear-gradient(to bottom, var(--bg-base) 60%, transparent 100%);
}

.works-section-btn {
	padding: 4px 12px;
	border-radius: 999px;
	font-size: 0.78rem;
	font-weight: 700;
	font-family: inherit;
	border: 1px solid rgba(123, 140, 222, 0.25);
	background: transparent;
	color: var(--text-secondary);
	cursor: pointer;
	transition: all 0.2s;
	white-space: nowrap;
}
.works-section-btn:hover {
	background: rgba(123, 140, 222, 0.12);
	color: var(--text-primary);
	border-color: rgba(123, 140, 222, 0.4);
}

/* トランジション */
.panel-enter-active,
.panel-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.panel-enter-from { opacity: 0; transform: translateX(16px); }
.panel-leave-to   { opacity: 0; transform: translateX(-16px); }

/* iPhone 15（393px）以上：横並びを維持しつつコンパクトに */
@media (max-width: 480px) {
	.hero-layout {
		gap: 12px;
	}
	.hero-content {
		flex: 1;
		min-width: 0;
		transition: width 0.4s ease, flex 0.4s ease;
		overflow: hidden;
	}
	.hero-title {
		margin-bottom: 12px;
		transition: font-size 0.4s ease, margin-bottom 0.3s ease;
	}
	.hero-desc {
		font-size: 0.82rem;
		opacity: 1;
		max-height: 80px;
		transition: opacity 0.25s ease, max-height 0.35s ease;
	}
	.sp-br {
		display: block;
	}
	.pc-br {
		display: none;
	}
	.right-col {
		width: 150px;
		flex-shrink: 0;
	}
	.links-item {
		font-size: 1.2rem;
	}

	/* パネルを開いたときにタイトルペインを縮小 */
	.panel-active .hero-content {
		flex: 0 0 72px;
		width: 72px;
	}
	.panel-active .hero-title {
		font-size: 1rem;
		margin-bottom: 0;
		white-space: nowrap;
	}
	.panel-active .hero-desc {
		opacity: 0;
		max-height: 0;
	}
	.panel-active .right-col {
		flex: 1;
		width: auto;
	}
}
</style>
