export type Lang = 'ja' | 'en'

export function useLang() {
  const lang = useState<Lang>('lang', () => 'ja')
  const toggle = () => { lang.value = lang.value === 'ja' ? 'en' : 'ja' }
  return { lang, toggle }
}
