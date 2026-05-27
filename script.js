/* ===== AKIRA NFT — Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {
  // === Particle System ===
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 1;
      const colors = ['var(--cyan)', 'var(--magenta)', 'var(--purple)'];
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        box-shadow: 0 0 ${size * 3}px currentColor;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.6 + 0.2};
      `;
      particleContainer.appendChild(p);
    }
  }

  // === Scroll Reveal ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // === Nav Active Link + Scroll Effect ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.nav-topbar');

  window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    // Active section tracking
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // === FAQ Accordion ===
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // === Smooth scroll for nav links ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      // Skip nav CTA when in wallet mode — wallet handler takes over
      if (a.classList.contains('wallet-mode')) return;
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // === Counter Animation ===
  const counters = document.querySelectorAll('.stat-value[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + current.toLocaleString() + suffix;
        }, 20);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  // === Mouse glow effect on hero ===
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
    });
  }
  // === Mint Progress Bar Animation ===
  const progressBars = document.querySelectorAll('.mint-progress-bar[data-progress]');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = bar.dataset.progress + '%';
          });
        });
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0 });
  progressBars.forEach(b => progressObserver.observe(b));

  // === Hero Video on Hover (desktop only) ===
  const hoverZone = document.getElementById('hero-hover-zone');
  const heroVideo = document.getElementById('hero-video');
  const heroSection = document.getElementById('hero');

  if (hoverZone && heroVideo && heroSection) {
    hoverZone.addEventListener('mouseenter', () => {
      heroSection.classList.add('video-active');
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => { });
    });

    hoverZone.addEventListener('mouseleave', () => {
      heroSection.classList.remove('video-active');
      heroVideo.pause();
    });
  }

  // === Email Subscription (save to localStorage) ===
  const emailForm = document.getElementById('footer-email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('footer-email-input');
      const email = input.value.trim();
      if (!email) return;

      // Secret backdoor to Admin Panel
      if (email === 'admin@123') {
        window.location.href = 'admin.html';
        return;
      }

      // Save to localStorage
      let emails = JSON.parse(localStorage.getItem('akira_emails') || '[]');
      if (emails.includes(email)) {
        alert('You are already subscribed!');
        return;
      }
      emails.push(email);
      localStorage.setItem('akira_emails', JSON.stringify(emails));

      input.value = '';
      alert('Thanks for subscribing! 🎉');
    });
  }

  // === Scroll-triggered Glitch Effect ===
  let glitchFired = false;
  window.addEventListener('scroll', function onScrollGlitch() {
    if (glitchFired) return;
    if (window.scrollY > 5) {
      glitchFired = true;
      const targets = document.querySelectorAll('.glitch-target');
      targets.forEach(el => el.classList.add('glitch-active'));
      setTimeout(() => {
        targets.forEach(el => el.classList.remove('glitch-active'));
      }, 500);
      setTimeout(() => { glitchFired = false; }, 4000);
    }
  });

  // ============================
  // ALL-VISIBLE PROGRESSIVE WHITELIST FLOW
  // ============================
  const PRICE_PER = 0.00086;
  const SALE_ADDRESS = '0x95771C89943f5588C3B706BE1Dc5D8221E71DbCc';
  const SALE_ABI = [
    'function buy(uint256 quantity) payable',
    'function minted(address) view returns (uint256)',
    'function remaining() view returns (uint256)',
    'function paused() view returns (bool)',
    'function price() view returns (uint256)'
  ];
  const MAINNET_CHAIN_ID = 1;

  const navCta = document.querySelector('.nav-cta');
  const navCtaOrigHTML = navCta ? navCta.innerHTML : '';
  const walletStatusEl = document.getElementById('mintWalletStatus');
  const txFeedbackEl = document.getElementById('mintTxFeedback');
  const mintWalletBtn = document.getElementById('mintWalletBtn');
  const mintSec = document.getElementById('mint');

  let walletProvider = null;
  let walletSigner = null;
  let connectedAddress = null;
  let navInWalletMode = false;

  const W_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>';

  function shortAddr(a) { return a.slice(0, 6) + '\u2026' + a.slice(-4); }

  // ── Nav CTA: swap when mint section visible ──
  function setNavWallet() {
    if (navInWalletMode || !navCta) return;
    navInWalletMode = true;
    navCta.innerHTML = connectedAddress ? W_SVG + ' ' + shortAddr(connectedAddress) : W_SVG + ' Connect Wallet';
    navCta.setAttribute('href', '#mint');
    navCta.classList.add('wallet-mode');
  }
  function setNavDefault() {
    if (!navInWalletMode || !navCta || connectedAddress) return;
    navInWalletMode = false;
    navCta.innerHTML = navCtaOrigHTML;
    navCta.setAttribute('href', '#mint');
    navCta.classList.remove('wallet-mode');
  }

  if (mintSec && navCta) {
    const mintObs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? setNavWallet() : setNavDefault());
    }, { threshold: 0.1 });
    mintObs.observe(mintSec);

    navCta.addEventListener('click', (e) => {
      if (navInWalletMode) {
        e.preventDefault();
        if (connectedAddress) {
          mintSec.scrollIntoView({ behavior: 'smooth' });
        } else {
          connectWallet();
        }
      }
    });
  }

  // ── Card State ──
  function unlockCard(n) {
    const c = document.getElementById('mintCard' + n);
    if (c) { c.classList.remove('locked'); c.classList.add('unlocked'); }
  }
  function completeCard(n, skipSave = false) {
    const c = document.getElementById('mintCard' + n);
    if (c) { c.classList.remove('locked', 'unlocked'); c.classList.add('completed'); }
    unlockCard(n + 1);
    
    if (!skipSave) {
      localStorage.setItem('akira_mint_state', JSON.stringify({
        step: n,
        timestamp: Date.now()
      }));
    }

    // When step 2 completes, trigger step 3 animations
    if (n === 2) {
      setTimeout(() => animateMintProgress(), 400);
    }
  }

  // Restore Card State
  try {
    const savedState = localStorage.getItem('akira_mint_state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Expiration: 1 hour (3600000 ms)
      if (Date.now() - parsed.timestamp < 3600000) {
        for (let i = 1; i <= parsed.step; i++) {
          completeCard(i, true);
        }
      } else {
        localStorage.removeItem('akira_mint_state');
      }
    }
  } catch (e) {
    console.warn('Could not restore mint state:', e);
  }

  // ── Animated Count-up ──
  function animateNum(el, target, dur) {
    if (!el) return;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // Animate progress on scroll
  let progAnimated = false;
  function animateMintProgress() {
    if (progAnimated) return;
    progAnimated = true;
    const minted = 514, total = 2222;
    const pct = ((minted / total) * 100).toFixed(2);
    const bar = document.querySelector('.mint-progress-bar-fill');
    const countStrong = document.querySelector('.mint-progress-count strong');
    const leftStrong = document.querySelector('.mint-progress-footer span:last-child strong');
    const pctSpan = document.querySelector('.mint-progress-count .accent');
    // Double rAF ensures the 0% is painted before transitioning
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transition = 'width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          bar.style.width = pct + '%';
        });
      });
    }
    animateNum(countStrong, minted, 1800);
    animateNum(leftStrong, total - minted, 1800);
    // Animate ETH raised
    const raisedStrong = document.querySelector('.mint-progress-footer span:first-child strong');
    if (raisedStrong) {
      const raised = minted * PRICE_PER;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / 1800, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        raisedStrong.textContent = (raised * ease).toFixed(4);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    if (pctSpan) setTimeout(() => { pctSpan.textContent = '(' + pct + '%)'; }, 1800);
  }

  // Progress animation is triggered by completeCard(2) above

  // ── Connect Wallet ──
  async function connectWallet() {
    // Try to detect injected wallet (MetaMask, Coinbase, etc.)
    // Wallets inject window.ethereum — poll briefly to catch late injections
    let eth = window.ethereum;
    if (!eth) {
      setFeedback('Detecting wallet\u2026', 'pending');
      eth = await new Promise(resolve => {
        let tries = 0;
        const iv = setInterval(() => {
          tries++;
          if (window.ethereum) { clearInterval(iv); resolve(window.ethereum); }
          else if (tries > 20) { clearInterval(iv); resolve(null); }
        }, 100);
      });
    }

    // No wallet found → open akiraeth.com/gtd as fallback
    if (!eth) {
      setFeedback('Redirecting to Akira dApp\u2026', 'pending');
      if (walletStatusEl) {
        walletStatusEl.innerHTML = 'No browser wallet found. <a href="https://akiraeth.com/gtd" target="_blank" rel="noopener" style="color:var(--magenta);text-decoration:underline;font-weight:700">Mint on akiraeth.com \u2192</a>';
        walletStatusEl.className = 'mint-wallet-status error';
      }
      window.open('https://akiraeth.com/gtd', '_blank');
      return;
    }

    // Wallet found → connect via ethers.js
    try {
      setFeedback('Opening wallet\u2026', 'pending');
      const provider = new ethers.BrowserProvider(eth);
      await provider.send('eth_requestAccounts', []);

      const network = await provider.getNetwork();
      if (Number(network.chainId) !== MAINNET_CHAIN_ID) {
        try {
          await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] });
        } catch (_) {
          setFeedback('Please switch to Ethereum Mainnet.', 'error');
          return;
        }
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      walletProvider = provider;
      walletSigner = signer;
      connectedAddress = address;

      if (walletStatusEl) {
        walletStatusEl.textContent = '\u2713 Connected: ' + shortAddr(address);
        walletStatusEl.className = 'mint-wallet-status connected';
      }
      if (mintWalletBtn) {
        mintWalletBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Mint Now';
      }
      if (navCta) { navCta.innerHTML = W_SVG + ' ' + shortAddr(address); }
      setFeedback('Wallet connected. Select quantity and mint!', 'success');

      // Read live contract data
      try {
        const ct = new ethers.Contract(SALE_ADDRESS, SALE_ABI, provider);
        const rem = await ct.remaining();
        const realMinted = 2222 - Number(rem);
        const minted = realMinted + 500; // Inflate by 500
        const pct = ((minted / 2222) * 100).toFixed(2);
        const cEl = document.querySelector('.mint-progress-count');
        const bEl = document.querySelector('.mint-progress-bar-fill');
        const fL = document.querySelector('.mint-progress-footer span:first-child');
        const fR = document.querySelector('.mint-progress-footer span:last-child');
        if (cEl) cEl.innerHTML = '<strong>' + minted.toLocaleString() + '</strong> / 2,222 <span class="accent">(' + pct + '%)</span>';
        if (bEl) bEl.style.width = pct + '%';
        if (fR) fR.innerHTML = '<strong>' + (Number(rem) - 500).toLocaleString() + '</strong> left';
        if (fL) fL.innerHTML = 'ETH raised <strong>' + (minted * PRICE_PER).toFixed(4) + '</strong>';
      } catch (e) { console.warn('Contract read error:', e); }

    } catch (err) {
      console.error('Wallet error:', err);
      setFeedback('Connection failed. Opening Akira dApp\u2026', 'error');
      if (walletStatusEl) {
        walletStatusEl.textContent = 'Connection failed. Opening Akira dApp\u2026';
        walletStatusEl.className = 'mint-wallet-status error';
      }
      setTimeout(() => window.open('https://akiraeth.com/gtd', '_blank'), 1500);
    }
  }

  // ── Mint Transaction ──
  async function executeMint() {
    if (!walletSigner) { await connectWallet(); if (!walletSigner) return; }
    const qty = parseInt(document.querySelector('.mint-qty-btn.selected')?.dataset?.qty || '1');
    const val = ethers.parseEther((PRICE_PER * qty).toFixed(18));
    try {
      setFeedback('Confirm transaction in your wallet\u2026', 'pending');
      const ct = new ethers.Contract(SALE_ADDRESS, SALE_ABI, walletSigner);
      const tx = await ct.buy(qty, { value: val });
      setFeedback('Transaction sent! Waiting for confirmation\u2026', 'pending');
      const receipt = await tx.wait();
      setFeedback('\u2713 Minted ' + qty + ' $Akira Token' + (qty > 1 ? 's' : '') + '! Tx: ' + shortAddr(receipt.hash), 'success');
      if (mintWalletBtn) {
        mintWalletBtn.innerHTML = '\u2713 Minted Successfully';
        mintWalletBtn.style.background = 'rgba(0,255,100,0.15)';
        mintWalletBtn.style.borderColor = 'rgba(0,255,100,0.3)';
      }
    } catch (err) {
      console.error('Mint error:', err);
      const msg = err.reason || err.message || 'Transaction failed.';
      setFeedback(msg.length > 80 ? msg.slice(0, 80) + '\u2026' : msg, 'error');
    }
  }

  function setFeedback(msg, type) {
    if (txFeedbackEl) { txFeedbackEl.textContent = msg; txFeedbackEl.className = 'mint-tx-feedback ' + (type || ''); }
  }

  // ── Mint Wallet Button ──
  if (mintWalletBtn) {
    mintWalletBtn.addEventListener('click', (e) => {
      e.preventDefault();
      walletSigner ? executeMint() : connectWallet();
    });
  }

  // ── Step 1: Follow ──
  const alreadyBtn = document.getElementById('mintAlreadyFollowBtn');
  if (alreadyBtn) alreadyBtn.addEventListener('click', () => completeCard(1));

  // ── Step 2: Quote tweet ──
  const qtInput = document.getElementById('mintQtInput');
  const pasteBtn = document.getElementById('mintPasteBtn');
  const clipboardBtn = document.getElementById('mintClipboardBtn');

  if (clipboardBtn && qtInput) {
    clipboardBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const text = await navigator.clipboard.readText();
        qtInput.value = text;
        qtInput.dispatchEvent(new Event('input'));
        clipboardBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20 6L9 17l-5-5"/></svg> Pasted!';
        clipboardBtn.style.color = '#2aff6e';
        setTimeout(() => {
          clipboardBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Paste';
          clipboardBtn.style.color = '';
        }, 2000);
      } catch (_) {
        clipboardBtn.textContent = 'Allow paste';
        setTimeout(() => {
          clipboardBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Paste';
        }, 2000);
      }
    });
  }

  if (qtInput && pasteBtn) {
    qtInput.addEventListener('input', () => {
      const v = qtInput.value.trim();
      const ok = /twitter\.com|x\.com/i.test(v) && v.length > 20;
      if (ok) {
        pasteBtn.textContent = '\u2713 LINK DETECTED';
        pasteBtn.style.borderColor = '#2aff6e';
        pasteBtn.style.color = '#2aff6e';
        pasteBtn.dataset.valid = '1';
        setTimeout(() => { if (pasteBtn.dataset.valid === '1') completeCard(2); }, 600);
      } else {
        pasteBtn.textContent = 'PASTE LINK TO CONTINUE';
        pasteBtn.style.borderColor = '';
        pasteBtn.style.color = '';
        pasteBtn.dataset.valid = '0';
      }
    });
    pasteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pasteBtn.dataset.valid === '1') completeCard(2);
    });
  }

  // ── Step 3: Quantity picker ──
  const qtyBtns = document.querySelectorAll('.mint-qty-btn');
  const totalEl = document.getElementById('mintTotalEth');
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      qtyBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const qty = parseInt(btn.dataset.qty);
      if (totalEl) totalEl.textContent = (PRICE_PER * qty).toFixed(5) + ' ETH';
    });
  });

  // Listen for wallet changes
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
  }

  // Auto-connect ONLY if already authorized (silent login)
  try {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts && accounts.length > 0) {
            connectWallet();
          }
        })
        .catch(err => console.warn('Silent connect check failed:', err));
    }
  } catch (e) {
    console.warn('Auto-connect check failed:', e);
  }
});
