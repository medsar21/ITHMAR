'use client';

import { useEffect, useState } from 'react';
import { LAUNCH_AT } from './launch-config';

type Language = 'FR' | 'EN' | 'AR';
const copy = {
  FR: { status: 'SITE EN CONSTRUCTION', eyebrow: 'ITHMAR CAPITAL · MAROC', title: <>UNE NOUVELLE<br />EXPÉRIENCE DIGITALE<br /><em>SE PRÉPARE.</em></>, body: 'Ithmar Capital prépare le lancement de sa nouvelle plateforme digitale. Une nouvelle expérience pour découvrir nos activités, nos investissements et notre engagement pour le développement.', until: 'AVANT LE LANCEMENT', days: 'JOURS', hours: 'HEURES', minutes: 'MINUTES', seconds: 'SECONDES', soon: 'LANCEMENT IMMINENT', stay: 'Restez à l’écoute.', footer: 'Investir pour les générations futures.' },
  EN: { status: 'COMING SOON', eyebrow: 'ITHMAR CAPITAL · MOROCCO', title: <>A NEW DIGITAL<br />EXPERIENCE IS<br /><em>ON ITS WAY.</em></>, body: 'Ithmar Capital is preparing to launch its new digital platform. A new way to discover our activities, investments and commitment to development.', until: 'UNTIL LAUNCH', days: 'DAYS', hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS', soon: 'LAUNCHING SOON', stay: 'Stay tuned.', footer: 'Investing for future generations.' },
  AR: { status: 'قريباً', eyebrow: 'إثمار كابيتال · المغرب', title: <>تجربة رقمية<br />جديدة<br /><em>قريباً.</em></>, body: 'تستعد إثمار كابيتال لإطلاق منصتها الرقمية الجديدة. تجربة جديدة لاكتشاف أنشطتنا واستثماراتنا والتزامنا بالتنمية.', until: 'الوقت المتبقي للإطلاق', days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية', soon: 'الإطلاق قريباً', stay: 'ترقبوا الجديد.', footer: 'نستثمر من أجل الأجيال القادمة.' },
};

function getRemaining() {
  const distance = Math.max(0, new Date(LAUNCH_AT).getTime() - Date.now());
  return { days: Math.floor(distance / 86400000), hours: Math.floor((distance / 3600000) % 24), minutes: Math.floor((distance / 60000) % 60), seconds: Math.floor((distance / 1000) % 60), ended: distance === 0 };
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('FR');
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);
  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const t = copy[language];
  const rtl = language === 'AR';

  return (
    <main className={`landing ${rtl ? 'rtl' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <div className="backdrop" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="header">
        <a className="brand" href="https://www.ithmar.gov.ma/" aria-label="Ithmar Capital — site officiel">
          {/* Official logo from Ithmar Capital's public website; retain source proportions and colors. */}
          <img src="/ithmar-logo.png" alt="Ithmar Capital" />
        </a>
        <div className="header-right">
          <span className="status"><i />{t.status}</span>
          <nav className="languages" aria-label="Choose language">
            {(['FR', 'EN', 'AR'] as Language[]).map((lang, index) => <span key={lang} className="lang-wrap"><button onClick={() => setLanguage(lang)} aria-pressed={language === lang}>{lang}</button>{index < 2 && <b aria-hidden="true">/</b>}</span>)}
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1 id="hero-title">{t.title}</h1>
          <p className="description">{t.body}</p>
          <div className="countdown-block">
            <p className="countdown-label">{t.until}</p>
            {remaining?.ended ? <p className="launched">{t.soon}</p> : <div className="countdown" aria-label={remaining ? `${remaining.days} ${t.days}, ${remaining.hours} ${t.hours}, ${remaining.minutes} ${t.minutes}, ${remaining.seconds} ${t.seconds}` : undefined}>
              {([[remaining?.days ?? '--', t.days], [remaining?.hours ?? '--', t.hours], [remaining?.minutes ?? '--', t.minutes], [remaining?.seconds ?? '--', t.seconds]] as [number | string, string][]).map(([value, label], index) => <div className="time-unit" key={label}><span className="digit-card" key={`${label}-${value}`}><span className="digits">{typeof value === 'number' ? String(value).padStart(2, '0') : value}</span></span><span className="unit-label">{label}</span>{index < 3 && <span className="separator" aria-hidden="true">:</span>}</div>)}
            </div>}
          </div>
        </div>
        <div className="side-note"><span className="side-line" />RABAT&nbsp; — &nbsp;33°58′N&nbsp; 6°50′W</div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
      </section>

      <footer className="footer">
        <div className="footer-left"><span className="footer-mark">✳</span><span>{t.stay}</span><span className="footer-motto">{t.footer}</span></div>
        <a className="official-link" href="https://www.ithmar.gov.ma/">ITHMAR.GOV.MA <span aria-hidden="true">↗</span></a>
        <span className="copyright">© 2026 ITHMAR CAPITAL</span>
      </footer>
    </main>
  );
}
