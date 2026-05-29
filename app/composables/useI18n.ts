const translations = {
	ja: {
		heroDesc: ['誰ものにもなれなかった', 'ギタリストが作った曲を', 'ゆるりと公開していきます'],
		menu: {
			works: 'Works',
			about: 'About me',
			links: 'SNS Links',
		},
		back: '← Back',
		about: {
			sectionTitle: 'About',
			p1: 'はじめまして、jin doe です。日常の隙間で音楽を作っています。',
			p2: '高校入学と同時にギターを始めてはや10数年経ちました。元々はラウドなバンドでギタリストをしていてオリジナル曲を配信したりしていましたが、仕事の関係でしばらく音楽から離れていました。',
			p3: '最近仕事も落ち着いてきたので、再び音楽に取り組むことになりました。',
			p4: 'ジャンルとしては Lo-fi Hip Hop、Neo Soul、City Pop を中心にチルい感じの曲を作って行く予定ですが、気分でラウドな曲も制作していきます。',
			artistsTitle: 'My Favorite Artists',
		},
		works: {
			latest: '最新曲',
			lofi: 'Lo-fi Hip-Hop',
			neosoul: 'Neo Soul',
			citypop: 'City Pop',
			rock: 'Rock / Metal',
			other: 'Other',
			tbc: 'to be continued...',
		},
		footer: {
			copy: '© 2026 Studio Jin Doe',
		},
	},
	en: {
		heroDesc: ['A guitarist who never quite', 'made it — sharing music I make', 'at my own pace.'],
		menu: {
			works: 'Works',
			about: 'About me',
			links: 'SNS Links',
		},
		back: '← Back',
		about: {
			sectionTitle: 'About',
			p1: "Hi, I'm jin doe. I make music in the gaps of everyday life.",
			p2: 'I picked up a guitar when I started high school — over a decade ago now. I used to play in a loud band and released some original tracks, but stepped away from music for a while due to work.',
			p3: "Things have settled down lately, so I've started making music again.",
			p4: 'I mostly make chill stuff — Lo-fi Hip Hop, Neo Soul, City Pop — but I might throw in something loud when the mood hits.',
			artistsTitle: 'My Favorite Artists',
		},
		works: {
			latest: 'Latest',
			lofi: 'Lo-fi Hip-Hop',
			neosoul: 'Neo Soul',
			citypop: 'City Pop',
			rock: 'Rock / Metal',
			other: 'Other',
			tbc: 'to be continued...',
		},
		footer: {
			copy: '© 2026 Studio Jin Doe',
		},
	},
} as const;

export function useI18n() {
	const { lang } = useLang();
	const t = computed(() => translations[lang.value]);
	return { t };
}
