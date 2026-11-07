'use strict';

// Keep the existing advertiser's tags on its own domain only. Local/private
// previews do not create visits or conversions in the live campaign.
const productionHost = window.location.hostname === 'bousouwrecker.com';
if (productionHost) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17867110219';
  document.head.appendChild(tag);
  window.gtag('js', new Date());
  window.gtag('config', 'AW-17867110219');

  window.ODBObject = 'odb';
  window.odb = function () { (window.odb.q = window.odb.q || []).push(arguments); };
  window.odb.src = 'https://assets.omni-databank.com/tracker.js';
  window.odb.l = Date.now();
  const tracker = document.createElement('script');
  tracker.async = true;
  tracker.src = window.odb.src;
  document.head.appendChild(tracker);
  window.odb('start', 2238);
  window.odb('web.pageview');
  window.odb('phone.trackingNumber', '070-7615-0960', undefined, { trigger: { mobile: 'tap' } });
}

// The actual tel: destination is passed through; tracking failure cannot
// suppress a call indefinitely.
window.gtag_report_conversion = function (url) {
  if (!productionHost || typeof window.gtag !== 'function') return true;
  let navigated = false;
  function call() {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  }
  window.gtag('event', 'conversion', {
    send_to: 'AW-17867110219/TdcGCIyikuobEMvu2cdC',
    event_callback: call,
    event_timeout: 800
  });
  window.setTimeout(call, 900);
  return false;
};

const sticky = document.querySelector('.fixed-tel');
const hero = document.querySelector('.fv');
if (sticky && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    sticky.classList.toggle('is-hidden', entry.isIntersecting);
    sticky.tabIndex = entry.isIntersecting ? -1 : 0;
    sticky.setAttribute('aria-hidden', String(entry.isIntersecting));
  }).observe(hero);
}
