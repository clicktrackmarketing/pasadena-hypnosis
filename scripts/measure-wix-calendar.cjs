// Re-measure the crop offsets in components/WixCalendar.tsx (LAYOUT).
// Frames a Wix booking calendar at three desktop widths and prints where the
// "Select a Date and Time" heading lands. Needs puppeteer (not a dependency:
// `npm i --no-save puppeteer`) and a local Chrome:
//   node scripts/measure-wix-calendar.cjs discovery-call
// The phone layout needs a mobile UA; see the note in WixCalendar.tsx.
const puppeteer = require('puppeteer');
const http = require('http');
const slug = process.argv[2] || 'discovery-call';
const srv = http.createServer((q, r) => { const w = new URL(q.url,'http://x').searchParams.get('w'); r.setHeader('content-type','text/html'); r.end(`<!doctype html><meta name=viewport content="width=device-width"><body style="margin:0"><iframe src="https://www.pasadenahypnosis.com/booking-calendar/${slug}" style="width:${w}px;height:1600px;border:0"></iframe></body>`); }).listen(4721);
(async () => {
  const b = await puppeteer.launch({ headless: 'new', executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  for (const [w, mobile] of [[1100,false],[860,false],[700,false]]) {
    const p = await b.newPage();
    if (mobile) { await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'); await p.setViewport({ width: 375, height: 800, isMobile: true, hasTouch: true }); }
    else await p.setViewport({ width: w + 40, height: 1600 });
    await p.goto('http://localhost:4721/?w=' + w, { waitUntil: 'networkidle2', timeout: 90000 });
    const f = p.frames().find(f => f.url().includes('booking-calendar'));
    await f.waitForFunction(() => /Availability for/.test(document.body.innerText), { timeout: 60000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 3000));
    const m = await f.evaluate(() => {
      const find = (re) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (re.test(n.textContent)) return n.parentElement.getBoundingClientRect(); return null; };
      const r = (x) => x && Math.round(x.top);
      return { schedule: r(find(/Schedule your service/)), select: r(find(/Select a Date and Time/)), next: r(find(/^\s*Next\s*$/)), footer: r(find(/^\s*MENU\s*$/)), sw: document.documentElement.scrollWidth, cw: innerWidth, docH: document.documentElement.scrollHeight };
    });
    console.log(w, mobile ? 'mobileUA' : 'desktop', JSON.stringify(m));
    await p.screenshot({ path: `D:/projects/claude/_ph_work/m-${w}.png`, fullPage: false });
    await p.close();
  }
  await b.close(); srv.close();
})();
