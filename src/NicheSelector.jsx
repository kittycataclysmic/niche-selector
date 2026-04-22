import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  :root {
    --deep: #0F0D0B; --ink: #1A1714; --fog: #EDE9E3; --ash: #D9D4CE;
    --steel: #6B7280; --text-on-dark: #E8E4DF; --text-muted: #A09C96;
    --rule: rgba(237,233,227,0.12);
  }
  body { background: var(--deep); -webkit-font-smoothing: antialiased; }
  body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; opacity: 0.6; }

  /* NAV */
  .hdr { border-bottom: 1px solid var(--rule); padding: 0 48px; height: 65px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(15,13,11,0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 200; }
  .brand { font-family: 'Bebas Neue', sans-serif; font-size: 22px; font-weight: 400; letter-spacing: 0.08em; color: var(--fog); text-decoration: none; }
  .hdr-right { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); }

  /* PROGRESS */
  .prog { height: 2px; background: var(--rule); position: relative; z-index: 1; }
  .prog-fill { height: 100%; background: var(--fog); transition: width 0.5s ease; }

  /* LAYOUT */
  .mm-wrap { font-family: 'Libre Baskerville', Georgia, serif; color: var(--text-on-dark); min-height: 100vh; display: flex; flex-direction: column; position: relative; }
  .main { flex: 1; max-width: 720px; margin: 0 auto; width: 100%; padding: 56px 48px 96px; position: relative; z-index: 1; }

  /* FOOTER */
  .ftr { border-top: 1px solid var(--rule); padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; background: var(--ink); position: relative; z-index: 1; }
  .ftr-l { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 0.08em; color: var(--fog); }
  .ftr-r { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); }

  /* TYPOGRAPHY */
  .eyebrow { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--steel); display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .eyebrow::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--steel); flex-shrink: 0; }
  .big-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 9vw, 96px); line-height: 0.92; color: var(--fog); letter-spacing: 0.01em; margin-bottom: 28px; }
  .outline-text { -webkit-text-stroke: 1.5px var(--fog); color: transparent; }
  .divider { width: 40px; height: 2px; background: rgba(237,233,227,0.2); margin-bottom: 28px; }
  .body-text { font-size: 17px; line-height: 1.85; color: var(--text-muted); margin-bottom: 36px; }
  .section-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--steel); display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .section-lbl::before { content: ''; display: inline-block; width: 16px; height: 1px; background: var(--steel); flex-shrink: 0; }

  /* STATS */
  .meta-row { display: flex; gap: 40px; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid var(--rule); flex-wrap: wrap; }
  .meta-item { display: flex; flex-direction: column; gap: 6px; }
  .meta-num { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--fog); line-height: 1; }
  .meta-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); }

  /* BUTTONS */
  .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--fog); color: var(--deep); font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 32px; border: none; cursor: pointer; transition: background 0.2s; }
  .btn-primary:hover { background: var(--ash); }
  .btn-primary:disabled { opacity: 0.3; cursor: default; }
  .btn-outline { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: var(--fog); font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 15px 31px; border: 1px solid rgba(237,233,227,0.2); cursor: pointer; transition: all 0.2s; }
  .btn-outline:hover { background: var(--fog); color: var(--deep); border-color: var(--fog); }

  /* QUIZ */
  .q-text { font-family: 'Libre Baskerville', serif; font-size: clamp(18px, 3vw, 26px); font-weight: 700; line-height: 1.4; color: var(--fog); margin-bottom: 10px; }
  .q-sub { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.7; color: var(--text-muted); margin-bottom: 32px; font-style: italic; border-left: 2px solid var(--steel); padding-left: 20px; }
  .options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 44px; }
  .option { display: flex; align-items: flex-start; gap: 16px; padding: 18px 22px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; width: 100%; transition: all 0.15s; }
  .option:hover:not(.sel) { border-color: rgba(237,233,227,0.25); background: rgba(237,233,227,0.04); }
  .option.sel { border-color: var(--fog); background: var(--fog); }
  .opt-marker { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(237,233,227,0.2); display: flex; align-items: center; justify-content: center; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--steel); margin-top: 1px; transition: all 0.15s; }
  .option.sel .opt-marker { border-color: var(--deep); background: var(--deep); color: var(--fog); }
  .opt-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.65; color: var(--text-muted); }
  .option.sel .opt-text { color: var(--ink); }

  /* MULTI-SELECT */
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 44px; }
  .check-opt { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; width: 100%; transition: all 0.15s; }
  .check-opt:hover:not(.sel) { border-color: rgba(237,233,227,0.25); background: rgba(237,233,227,0.04); }
  .check-opt.sel { border-color: var(--fog); background: var(--fog); }
  .check-box { flex-shrink: 0; width: 18px; height: 18px; border: 1px solid rgba(237,233,227,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; color: transparent; margin-top: 2px; transition: all 0.15s; }
  .check-opt.sel .check-box { border-color: var(--ink); background: var(--ink); color: var(--fog); }
  .check-text { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.3px; line-height: 1.55; color: var(--text-muted); }
  .check-opt.sel .check-text { color: var(--ink); }
  .tools-note { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); margin-bottom: 16px; display: block; }

  /* RESULT BLOCKS */
  .blk-box { background: var(--fog); padding: 36px; margin-bottom: 32px; }
  .result-niche { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 7vw, 64px); line-height: 0.95; color: var(--ink); letter-spacing: 0.01em; margin-bottom: 16px; }
  .pill { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(26,23,20,0.2); padding: 5px 14px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: var(--ink); }
  .tool-tag { background: rgba(26,23,20,0.08); border: 1px solid rgba(26,23,20,0.15); padding: 4px 10px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.05px; color: var(--steel); }
  .reason-item { display: flex; gap: 14px; margin-bottom: 14px; align-items: flex-start; }
  .reason-mark { flex-shrink: 0; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--steel); padding-top: 2px; }
  .reason-text { font-family: 'Libre Baskerville', serif; font-size: 14px; color: var(--ink); line-height: 1.65; }

  /* BRAND BOX */
  .brand-box { border: 1px solid var(--rule); padding: 32px; margin-bottom: 32px; }
  .brand-quote { font-family: 'Libre Baskerville', serif; font-size: 15px; line-height: 1.85; color: var(--text-on-dark); font-style: italic; border-left: 2px solid var(--steel); padding-left: 20px; margin-bottom: 24px; }

  /* SCORE BARS */
  .score-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .score-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
  .score-lbl { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.3px; color: var(--text-muted); min-width: 200px; }
  .score-lbl.primary { color: var(--fog); font-weight: 500; }
  .score-track { flex: 1; height: 2px; background: var(--rule); }
  .score-fill { height: 100%; background: var(--fog); transition: width 0.9s cubic-bezier(.4,0,.2,1); }
  .score-fill.secondary { background: rgba(237,233,227,0.2); }

  /* STEPS */
  .step-grid { display: grid; grid-template-columns: 40px 1fr; gap: 0 16px; margin-bottom: 32px; }
  .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--fog); line-height: 1; }
  .step-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.75; color: var(--text-muted); padding-top: 4px; padding-bottom: 24px; border-bottom: 1px solid var(--rule); margin-bottom: 4px; }

  /* RATE TABLE */
  .rate-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--rule); }
  .rate-row.highlight { background: var(--fog); border-color: var(--fog); }
  .rate-icon { font-size: 13px; flex-shrink: 0; }
  .rate-lbl { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.3px; color: var(--text-muted); flex: 1; }
  .rate-row.highlight .rate-lbl { color: var(--ink); }
  .rate-php { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-on-dark); font-weight: 500; }
  .rate-row.highlight .rate-php { color: var(--ink); }
  .rate-usd { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--steel); }
  .rate-row.highlight .rate-usd { color: var(--steel); }

  /* GATE */
  .gate-wrap { max-width: 540px; }
  .gate-teaser { background: rgba(237,233,227,0.04); border: 1px solid var(--rule); padding: 28px 32px; margin-bottom: 32px; }
  .gate-teaser-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--steel); display: block; margin-bottom: 10px; }
  .gate-teaser-text { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: rgba(237,233,227,0.15); letter-spacing: 0.01em; line-height: 1; filter: blur(6px); user-select: none; }
  .gate-teaser-hint { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); display: block; margin-top: 14px; }
  .gate-input-wrap { display: flex; gap: 2px; margin-bottom: 12px; }
  .gate-input { flex: 1; background: rgba(237,233,227,0.04); border: 1px solid rgba(237,233,227,0.15); color: var(--fog); font-family: 'Libre Baskerville', serif; font-size: 14px; padding: 14px 18px; outline: none; transition: border-color 0.2s; }
  .gate-input:focus { border-color: rgba(237,233,227,0.35); }
  .gate-input.err { border-color: #c05050; }
  .gate-input::placeholder { color: var(--steel); }
  .gate-note { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--steel); display: block; }
  .gate-note.err-note { color: #c05050; }

  /* CALLOUT */
  .callout-dark { background: rgba(237,233,227,0.04); border: 1px solid var(--rule); padding: 32px 36px; margin-bottom: 32px; }
  .tier-flag { border-left: 2px solid var(--fog); padding: 16px 20px; background: rgba(237,233,227,0.04); margin-bottom: 24px; }
  .tier-flag-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--fog); display: block; margin-bottom: 8px; }
  .tier-flag-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.7; color: var(--text-muted); }
  .safety-note { background: rgba(237,233,227,0.04); border: 1px solid var(--rule); padding: 20px 24px; margin-bottom: 40px; }
  .safety-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.8; color: var(--text-muted); font-style: italic; }

  /* NICHE TAGS */
  .niche-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.05em; border: 1px solid var(--rule); padding: 6px 12px; color: var(--text-muted); }

  /* SPINNER */
  .spin { display: inline-block; width: 28px; height: 28px; border: 2px solid var(--rule); border-top-color: var(--fog); animation: spin 0.8s linear infinite; }

  /* ANIMATIONS */
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up   { animation: fadeUp 0.4s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
  .fade-up-2 { animation: fadeUp 0.4s 0.10s ease both; }
  .fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
  .fade-up-4 { animation: fadeUp 0.4s 0.20s ease both; }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .hdr { padding: 0 20px; }
    .main { padding: 40px 20px 72px; }
    .ftr { padding: 16px 20px; flex-direction: column; gap: 6px; }
    .check-grid { grid-template-columns: 1fr; }
    .meta-row { gap: 24px; }
  }
`;

// ─── 15 NICHES ───────────────────────────────────────────────────────────────
const NICHES = {
  ecom:    { label:"eCommerce VA",             icon:"🛒", php:"₱25K–₱45K/mo", usd:"$8–$15/hr",  tier2:"₱35K–₱55K/mo", demand:"Very High",    tools:["Shopify","Klaviyo","Gorgias","Google Sheets","Canva"] },
  social:  { label:"Social Media VA",          icon:"📱", php:"₱22K–₱40K/mo", usd:"$7–$14/hr",  tier2:"₱32K–₱52K/mo", demand:"Very High",    tools:["Canva","Meta Business Suite","Buffer","Later","CapCut"] },
  exec:    { label:"Executive & Admin VA",     icon:"📋", php:"₱28K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱42K–₱65K/mo", demand:"High",         tools:["Google Workspace","Notion","Slack","Zoom","Calendly"] },
  content: { label:"Content Writing VA",       icon:"✍️", php:"₱20K–₱42K/mo", usd:"$8–$18/hr",  tier2:"₱32K–₱55K/mo", demand:"High",         tools:["Google Docs","Surfer SEO","WordPress","Hemingway","ChatGPT"] },
  realty:  { label:"Real Estate VA",           icon:"🏠", php:"₱28K–₱50K/mo", usd:"$9–$16/hr",  tier2:"₱40K–₱60K/mo", demand:"High",         tools:["Follow Up Boss","Zillow","DocuSign","MLS","Google Sheets"] },
  books:   { label:"Bookkeeping & Finance VA", icon:"📊", php:"₱30K–₱55K/mo", usd:"$10–$22/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",      tools:["QuickBooks","Xero","Excel","Gusto","Wave"] },
  cx:      { label:"Customer Service VA",      icon:"💬", php:"₱18K–₱35K/mo", usd:"$6–$12/hr",  tier2:"₱28K–₱45K/mo", demand:"Very High",    tools:["Zendesk","Gorgias","Freshdesk","Intercom","Slack"] },
  health:  { label:"Medical VA",               icon:"🏥", php:"₱28K–₱50K/mo", usd:"$9–$18/hr",  tier2:"₱42K–₱65K/mo", demand:"Growing",      tools:["Kareo","SimplePractice","Google Calendar","Zoom","DrChrono"] },
  legal:   { label:"Legal VA",                 icon:"⚖️", php:"₱30K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",      tools:["Clio","MyCase","DocuSign","Google Docs","LawPay"] },
  edu:     { label:"Course Management VA",     icon:"🎓", php:"₱25K–₱48K/mo", usd:"$8–$16/hr",  tier2:"₱38K–₱60K/mo", demand:"High",         tools:["Kajabi","Teachable","Zoom","Notion","Circle"] },
  pm:      { label:"Project Management VA",    icon:"🗂️", php:"₱30K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",      tools:["Asana","ClickUp","Monday.com","Notion","Slack"] },
  tech:    { label:"Tech & Automation VA",     icon:"⚙️", php:"₱30K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱48K–₱75K/mo", demand:"High",         tools:["Zapier","Make","Airtable","Notion","API basics"] },
  ai_auto: { label:"AI Automation VA",         icon:"🤖", php:"₱35K–₱65K/mo", usd:"$12–$25/hr", tier2:"₱55K–₱90K/mo", demand:"Growing Fast", tools:["ChatGPT","Gemini","n8n","Make","Zapier"] },
  sales:   { label:"High-Ticket Sales VA",     icon:"💎", php:"₱30K–₱60K/mo", usd:"$10–$22/hr", tier2:"₱50K–₱80K/mo", demand:"Growing",      tools:["HubSpot","Close.io","LinkedIn","Apollo","Loom"] },
  mktg:    { label:"Digital Marketing VA",     icon:"📈", php:"₱28K–₱52K/mo", usd:"$9–$18/hr",  tier2:"₱42K–₱65K/mo", demand:"High",         tools:["Google Ads","Meta Ads","SEMrush","Mailchimp","HubSpot"] },
};

const TIER3_FLAGS = {
  health:  { label:"TIER 3 NICHE — PREREQUISITE REQUIRED", text:"Most clients require HIPAA compliance certification before you begin patient-facing administrative work. This is a non-negotiable baseline — not a barrier, just a certification course away." },
  legal:   { label:"TIER 3 NICHE — PREREQUISITE REQUIRED", text:"Legal VA clients require confidentiality protocol training and familiarity with legal terminology before client work begins. This protects both you and the firm you work with." },
  ai_auto: { label:"TIER 3 NICHE — PREREQUISITE REQUIRED", text:"Working proficiency in at least one automation platform (Make, Zapier, or n8n) is required before taking on client work. If you're starting from zero, complete Tech & Automation VA first to build the foundation." },
};

// ─── 12 QUESTIONS ────────────────────────────────────────────────────────────
const QS = [
  { id:"q01", n:1, multi:false, text:"What is your educational background?", sub:"Your field of study reveals transferable skills — even if it seems unrelated to VA work.",
    opts:[
      { t:"Business, Commerce, or Management",          s:{exec:2,books:2,ecom:1,sales:1,mktg:1} },
      { t:"Communications, Journalism, or Marketing",   s:{social:3,content:2,cx:1,mktg:2,sales:1} },
      { t:"IT, Computer Science, or Engineering",       s:{ecom:2,exec:1,books:1,tech:3,ai_auto:2} },
      { t:"Education, Humanities, or Liberal Arts",     s:{content:2,cx:2,social:1,edu:2} },
      { t:"Finance, Accounting, or Economics",          s:{books:3,realty:2,exec:1,sales:1} },
      { t:"Real Estate, Law, or Property-related",      s:{realty:3,legal:2,exec:1} },
      { t:"Healthcare, Nursing, or Medical Sciences",   s:{health:3,cx:1} },
      { t:"Not yet finished / currently studying",      s:{cx:1,social:1,ecom:1} },
      { t:"Other or unrelated field",                   s:{} },
    ]},
  { id:"q02", n:2, multi:false, text:"What was your most recent job or experience?", sub:"Include internships, part-time work, school org roles — anything counts, even non-VA work.",
    opts:[
      { t:"Office admin, secretary, or executive support",          s:{exec:3,books:1,pm:1} },
      { t:"Retail, sales, or online selling",                       s:{ecom:3,cx:2,sales:2} },
      { t:"Social media, marketing, or advertising",                s:{social:3,content:2,mktg:2} },
      { t:"Writing, editing, blogging, or journalism",              s:{content:3,social:1,mktg:1} },
      { t:"Finance, accounting, or bookkeeping",                    s:{books:3,realty:1} },
      { t:"Customer service or call center (BPO)",                  s:{cx:3,exec:1,sales:1} },
      { t:"Real estate, property, or banking",                      s:{realty:3,books:2} },
      { t:"Healthcare, clinic, or medical admin",                   s:{health:3,exec:1} },
      { t:"Legal, paralegal, or law firm work",                     s:{legal:3,exec:1} },
      { t:"Teaching, tutoring, or training",                        s:{edu:3,content:2} },
      { t:"Tech, software, or IT support",                          s:{tech:3,ai_auto:2,ecom:1} },
      { t:"Sales, lead generation, or outreach",                    s:{sales:3,cx:1,mktg:1} },
      { t:"Manual labor, trades, transport, or unrelated work",     s:{exec:1,cx:1} },
      { t:"Fresh graduate — no work experience yet",                s:{cx:1,social:1,exec:1} },
    ]},
  { id:"q03", n:3, multi:false, text:"Which tasks do you genuinely enjoy most?", sub:"Be honest — your natural enjoyment is a stronger signal than what you think you should pick.",
    opts:[
      { t:"Organising calendars, inboxes, and schedules",              s:{exec:3,books:1,pm:1} },
      { t:"Creating graphics, captions, and visual content",           s:{social:3,content:1,mktg:1} },
      { t:"Writing articles, blog posts, or persuasive copy",          s:{content:3,social:1,mktg:1} },
      { t:"Tracking numbers, formulas, and spreadsheets",              s:{books:3,realty:1,ecom:1} },
      { t:"Researching properties, leads, or market data",             s:{realty:3,legal:1,ecom:1,sales:1} },
      { t:"Helping people and resolving complaints",                   s:{cx:3,exec:1,health:1} },
      { t:"Managing online stores, listings, and product data",        s:{ecom:3,social:1} },
      { t:"Building workflows, automating systems, or connecting tools", s:{tech:3,ai_auto:2,pm:1} },
      { t:"Supporting students or managing course content",            s:{edu:3,content:1} },
      { t:"Selling, pitching, or following up with prospects",         s:{sales:3,cx:1,mktg:1} },
    ]},
  { id:"q04", n:4, multi:true, text:"Which tools have you used — even briefly?", sub:"Select all that apply. Any exposure counts — the practice kits will build the rest from scratch.",
    opts:[
      { t:"Google Workspace",              sub:"Docs, Sheets, Gmail, Calendar",                   s:{exec:2,books:1,content:1,pm:1} },
      { t:"Canva or Adobe Photoshop",      sub:"Any design or image editing tool",                s:{social:3,content:2,mktg:1} },
      { t:"Shopify / Lazada / Shopee",     sub:"Any online store or marketplace platform",        s:{ecom:3,cx:1} },
      { t:"QuickBooks or Xero",            sub:"Any financial tracking or accounting tool",       s:{books:3,realty:1} },
      { t:"HubSpot / Salesforce / CRM",   sub:"Any customer relationship management tool",      s:{realty:2,cx:2,exec:1,sales:2,mktg:1} },
      { t:"Facebook / Instagram / TikTok", sub:"Managing brand pages or ad accounts",            s:{social:3,cx:1,mktg:2} },
      { t:"Notion / Trello / Asana",       sub:"Any project management or ops tool",             s:{exec:2,content:1,ecom:1,edu:1,pm:3,tech:1} },
      { t:"WordPress or Wix",              sub:"Any website builder or CMS",                     s:{content:3,social:1,mktg:1} },
      { t:"Zoom or Calendly",              sub:"Any scheduling or video conferencing tool",       s:{exec:2,health:2,edu:2} },
      { t:"Mailchimp / ActiveCampaign",    sub:"Any email marketing or automation platform",     s:{social:2,ecom:2,content:1,mktg:2} },
      { t:"Zapier / Make / n8n",           sub:"Any workflow automation platform",               s:{tech:4,ai_auto:3} },
      { t:"Zendesk / Freshdesk / Gorgias", sub:"Any helpdesk or ticketing tool",                 s:{cx:3,ecom:1} },
      { t:"LinkedIn",                      sub:"Recruiting, outreach, or personal branding",     s:{exec:2,legal:1,social:1,sales:2} },
      { t:"EMR or medical scheduling",     sub:"Any electronic health records system",           s:{health:4} },
      { t:"Clio or MyCase",                sub:"Any legal case management tool",                 s:{legal:4} },
      { t:"Kajabi / Teachable / Thinkific", sub:"Any online course or LMS platform",             s:{edu:4,content:1} },
      { t:"Airtable or Monday.com",        sub:"Any database or advanced ops tool",              s:{exec:2,books:1,ecom:1,tech:2,pm:2} },
      { t:"ChatGPT or Gemini",             sub:"Any AI writing or reasoning tool",               s:{content:2,social:1,edu:1,ai_auto:3,tech:1} },
      { t:"Google Ads / Meta Ads Manager", sub:"Any paid advertising platform",                  s:{mktg:4,social:1} },
      { t:"SEMrush / Ahrefs / Ubersuggest", sub:"Any SEO or keyword research tool",              s:{mktg:3,content:2} },
      { t:"Apollo / Hunter / Sales Navigator", sub:"Any lead generation or prospecting tool",   s:{sales:4,exec:1} },
    ]},
  { id:"q05", n:5, multi:false, text:"How many hours per day can you work consistently?", sub:"This shapes which clients you can serve and what income is realistic in the next 3 months.",
    opts:[
      { t:"2–4 hours — side income, part-time",       s:{social:1,cx:1,content:1,mktg:1} },
      { t:"5–6 hours — half-day engagement",          s:{ecom:1,social:1,cx:1,mktg:1} },
      { t:"8 hours — full-time, single-client focus", s:{exec:2,books:2,realty:1,health:1,legal:1,pm:1,sales:1} },
      { t:"Flexible — project-based, not fixed hours", s:{content:2,social:1,tech:1,ai_auto:1} },
    ]},
  { id:"q06", n:6, multi:false, text:"Which work style describes you best?", sub:"There is no right answer — this is about what you can sustain for years, not just weeks.",
    opts:[
      { t:"Deep focus — best work on one task for hours",     s:{content:2,books:2,legal:2,ai_auto:1} },
      { t:"Multi-tasking — thriving while juggling things",   s:{exec:2,cx:2,health:1,pm:2} },
      { t:"Creative output — making things people can see",   s:{social:2,ecom:1,content:1,mktg:2} },
      { t:"Systems thinking — building processes and SOPs",   s:{exec:2,books:1,realty:1,edu:1,tech:2,pm:1} },
      { t:"Research-driven — digging for data and insights",  s:{realty:2,books:2,ecom:1,legal:2,mktg:1,sales:1} },
      { t:"People-facing — energy comes from human interaction", s:{sales:2,cx:2,health:1} },
    ]},
  { id:"q07", n:7, multi:false, text:"Which client market are you most interested in serving?", sub:"This affects your timezone overlap, communication style, and long-term income ceiling.",
    opts:[
      { t:"US clients — highest rates, EST/PST timezone",      s:{exec:2,realty:2,ecom:1,legal:1,sales:2,tech:1,mktg:1} },
      { t:"Australian clients — strong market, AEST zone",     s:{cx:2,ecom:1,social:1,health:1} },
      { t:"UK or European clients — growing VA demand",        s:{content:2,social:1,exec:1,mktg:1} },
      { t:"Canadian clients — healthcare and legal VA demand", s:{health:2,legal:2} },
      { t:"Local Philippine businesses — easier comms",        s:{social:1,cx:1} },
      { t:"Any market — wherever the opportunity is best",     s:{} },
    ]},
  { id:"q08", n:8, multi:false, text:"How confident are you in your written English?", sub:"This directly determines which niches and clients are accessible right now.",
    opts:[
      { t:"Excellent — written reports, articles, or professional emails before", s:{content:3,exec:2,realty:1,legal:2,sales:2,mktg:1} },
      { t:"Good — I write clear, professional English comfortably",              s:{cx:2,exec:2,social:1,ecom:1,health:1,pm:1} },
      { t:"Average — I communicate fine but prefer less writing",                s:{books:1,ecom:1,tech:1} },
      { t:"Still improving — writing in English feels challenging",              s:{ecom:1,books:1} },
    ]},
  { id:"q09", n:9, multi:false, text:"How comfortable are you with numbers and financial data?", sub:"Honest self-assessment prevents landing in a niche that will frustrate you long-term.",
    opts:[
      { t:"Very comfortable — spreadsheets and formulas are satisfying", s:{books:3,realty:2,ecom:1,tech:1} },
      { t:"Comfortable — basic math and Excel formulas are no problem",  s:{ecom:2,realty:1,exec:1,pm:1,mktg:1} },
      { t:"Neutral — I can do it but it is not my preference",           s:{social:1,cx:1,sales:1} },
      { t:"Prefer to avoid — numbers genuinely stress me out",           s:{content:1,social:1,edu:1} },
    ]},
  { id:"q10", n:10, multi:false, text:"Which industry would you most enjoy working in every day?", sub:"You will spend 40+ hours per week inside your client's world — alignment matters enormously.",
    opts:[
      { t:"Online retail, eCommerce, or consumer brands",                     s:{ecom:4} },
      { t:"Social media management, influencer brands, or content creation",  s:{social:4} },
      { t:"Corporate, startups, or executive leadership teams",               s:{exec:4} },
      { t:"Publishing, wellness, lifestyle, or media brands",                 s:{content:4} },
      { t:"Real estate, property investment, or home buying",                 s:{realty:4} },
      { t:"Finance, accounting firms, or financial services",                 s:{books:4} },
      { t:"Tech companies, SaaS products, or software development",          s:{tech:4,ai_auto:2} },
      { t:"Healthcare, medical clinics, or telehealth providers",             s:{health:4} },
      { t:"Legal firms, law offices, or paralegal services",                  s:{legal:4} },
      { t:"Online education, course creators, or coaching businesses",        s:{edu:4} },
      { t:"Digital marketing, advertising, or growth agencies",               s:{mktg:4,social:1} },
      { t:"Sales teams, lead generation, or high-ticket B2B businesses",     s:{sales:4,cx:1} },
      { t:"AI, automation, or no-code product companies",                     s:{ai_auto:4,tech:2} },
      { t:"Project management, operations, or consulting firms",              s:{pm:4,exec:1} },
      { t:"Beauty, fashion, or personal care brands",                         s:{social:2,content:2} },
      { t:"Fitness, wellness coaching, or nutrition brands",                  s:{content:2,social:2} },
      { t:"Recruitment, HR, or staffing agencies",                            s:{exec:2,cx:2} },
      { t:"Insurance agencies or risk management firms",                      s:{books:2,exec:2} },
      { t:"Travel, tourism, or hospitality brands",                           s:{cx:2,social:2} },
      { t:"Non-profit organizations or NGOs",                                 s:{exec:2,content:2} },
    ]},
  { id:"q11", n:11, multi:false, text:"What is your most important income goal in the next 6 months?", sub:"This shapes both your starting niche and the growth trajectory that is realistic for you.",
    opts:[
      { t:"Get any income within 30 days — I need fast results",              s:{cx:2,social:2,ecom:1} },
      { t:"Reach ₱25,000–₱35,000/month within 3 months",                    s:{social:2,ecom:2,cx:1,mktg:1} },
      { t:"Reach ₱35,000–₱50,000/month within 6 months",                    s:{exec:2,content:2,realty:1,edu:1,tech:1} },
      { t:"Build toward ₱50,000–₱100,000/month as a specialist",            s:{books:3,realty:2,exec:2,legal:2,health:2,tech:2,ai_auto:2,sales:2} },
      { t:"Scale beyond ₱100,000/month — senior specialist or team",        s:{books:4,legal:3,health:3,realty:3,exec:2,ai_auto:3,tech:2,sales:3} },
    ]},
  { id:"q12", n:12, multi:false, text:"What is your single biggest strength right now?", sub:"This is your tiebreaker — the trait that separates you from other beginners applying to the same roles.",
    opts:[
      { t:"Highly organised — I never miss a deadline or detail",          s:{exec:3,books:2,legal:1,pm:2} },
      { t:"Visually creative — I think in images and make beautiful work", s:{social:3,content:2,mktg:1} },
      { t:"Analytically sharp — I find patterns others miss",              s:{books:3,realty:2,legal:1,mktg:1,tech:1} },
      { t:"People-focused — I genuinely love helping others",              s:{cx:3,exec:1,health:2,edu:1,sales:1} },
      { t:"Fast learner — I absorb tools and systems quickly",             s:{ecom:2,social:1,exec:1,tech:2,ai_auto:2} },
      { t:"Strong writer — ideas flow naturally when I write",             s:{content:3,social:1,legal:1,mktg:1} },
      { t:"Persuasive communicator — I can sell ideas and close conversations", s:{sales:3,cx:1,mktg:1} },
    ]},
];

const TOTAL = QS.length;

// ─── SCORING ─────────────────────────────────────────────────────────────────
function computeScores(ans) {
  const s = { ecom:0,social:0,exec:0,content:0,realty:0,books:0,cx:0,health:0,legal:0,edu:0,pm:0,tech:0,ai_auto:0,sales:0,mktg:0 };
  QS.forEach(q => {
    if (q.multi) {
      const selected = ans[q.id] || [];
      selected.forEach(i => { if (q.opts[i]?.s) Object.entries(q.opts[i].s).forEach(([k,v]) => { if (s[k]!==undefined) s[k] += v; }); });
    } else {
      const a = ans[q.id];
      if (a !== undefined && q.opts[a]?.s) Object.entries(q.opts[a].s).forEach(([k,v]) => { if (s[k]!==undefined) s[k] += v; });
    }
  });
  const sorted = Object.entries(s).sort((a,b) => b[1]-a[1]);
  return { raw:s, sorted, primary:sorted[0][0] };
}

function getBackground(ans) {
  const eduMap = {"Business, Commerce, or Management":"A background in business","Communications, Journalism, or Marketing":"A background in communications","IT, Computer Science, or Engineering":"A technical background in IT","Education, Humanities, or Liberal Arts":"A background in education","Finance, Accounting, or Economics":"A background in finance","Real Estate, Law, or Property-related":"A background in real estate and law","Healthcare, Nursing, or Medical Sciences":"A background in healthcare","Not yet finished / currently studying":"An ongoing academic background","Other or unrelated field":"A cross-disciplinary background"};
  const expMap = {"Office admin, secretary, or executive support":"Years of admin and executive support experience","Retail, sales, or online selling":"Direct experience in sales and online retail","Social media, marketing, or advertising":"Hands-on experience in social media and marketing","Writing, editing, blogging, or journalism":"A writing and editorial background","Finance, accounting, or bookkeeping":"Direct experience in finance and bookkeeping","Customer service or call center (BPO)":"BPO and customer service experience","Real estate, property, or banking":"Direct experience in real estate and banking","Healthcare, clinic, or medical admin":"Clinical and medical admin experience","Legal, paralegal, or law firm work":"Paralegal and law firm experience","Teaching, tutoring, or training":"A background in teaching and instructional design","Tech, software, or IT support":"Direct experience in tech and IT operations","Sales, lead generation, or outreach":"Direct experience in sales and business development","Manual labor, trades, transport, or unrelated work":"A hands-on, results-driven professional background","Fresh graduate — no work experience yet":"An academic background now entering the professional world"};
  const edu = ans.q01 !== undefined ? QS[0].opts[ans.q01]?.t : null;
  const exp = ans.q02 !== undefined ? QS[1].opts[ans.q02]?.t : null;
  if (exp && expMap[exp] && !exp.includes("Fresh grad")) return expMap[exp];
  if (edu && eduMap[edu]) return eduMap[edu];
  return "A cross-functional background";
}

function getMarket(ans) {
  const marketMap = {"US clients — highest rates, EST/PST timezone":"US","Australian clients — strong market, AEST zone":"Australian","UK or European clients — growing VA demand":"UK and European","Canadian clients — healthcare and legal VA demand":"Canadian","Local Philippine businesses — easier comms":"local Philippine","Any market — wherever the opportunity is best":"international"};
  const opt = ans.q07 !== undefined ? QS[6].opts[ans.q07]?.t : null;
  return (opt && marketMap[opt]) ? marketMap[opt] : "international";
}

const NICHE_TOOL_PRIORITY = {
  ecom:["Shopify / Lazada / Shopee","Google Workspace","Mailchimp / ActiveCampaign","Notion / Trello / Asana"],
  social:["Canva or Adobe Photoshop","Facebook / Instagram / TikTok","Mailchimp / ActiveCampaign"],
  exec:["Google Workspace","Notion / Trello / Asana","Zoom or Calendly","LinkedIn"],
  content:["WordPress or Wix","ChatGPT or Gemini","Google Workspace","Canva or Adobe Photoshop"],
  realty:["HubSpot / Salesforce / CRM","Google Workspace","QuickBooks or Xero","Zoom or Calendly"],
  books:["QuickBooks or Xero","Google Workspace","Airtable or Monday.com","HubSpot / Salesforce / CRM"],
  cx:["Zendesk / Freshdesk / Gorgias","HubSpot / Salesforce / CRM","Google Workspace"],
  health:["EMR or medical scheduling","Zoom or Calendly","Google Workspace"],
  legal:["Clio or MyCase","Google Workspace","LinkedIn","DocuSign"],
  edu:["Kajabi / Teachable / Thinkific","Zoom or Calendly","Notion / Trello / Asana","ChatGPT or Gemini"],
  pm:["Notion / Trello / Asana","Airtable or Monday.com","Google Workspace","HubSpot / Salesforce / CRM"],
  tech:["Zapier / Make / n8n","Airtable or Monday.com","Notion / Trello / Asana","Google Workspace"],
  ai_auto:["ChatGPT or Gemini","Zapier / Make / n8n","Airtable or Monday.com"],
  sales:["Apollo / Hunter / Sales Navigator","HubSpot / Salesforce / CRM","LinkedIn"],
  mktg:["Google Ads / Meta Ads Manager","SEMrush / Ahrefs / Ubersuggest","Mailchimp / ActiveCampaign","HubSpot / Salesforce / CRM"],
};
const TOOL_CLEAN = {"Shopify / Lazada / Shopee":"Shopify","Google Workspace":"Google Workspace","Mailchimp / ActiveCampaign":"email automation tools","Notion / Trello / Asana":"Notion","Canva or Adobe Photoshop":"Canva","Facebook / Instagram / TikTok":"social platforms","Zoom or Calendly":"Calendly","WordPress or Wix":"WordPress","ChatGPT or Gemini":"AI tools","HubSpot / Salesforce / CRM":"CRM tools","QuickBooks or Xero":"QuickBooks","Airtable or Monday.com":"Airtable","Zendesk / Freshdesk / Gorgias":"Gorgias","EMR or medical scheduling":"medical scheduling systems","Clio or MyCase":"Clio","Kajabi / Teachable / Thinkific":"Kajabi","Zapier / Make / n8n":"Zapier","LinkedIn":"LinkedIn","Google Ads / Meta Ads Manager":"Google Ads","SEMrush / Ahrefs / Ubersuggest":"SEMrush","Apollo / Hunter / Sales Navigator":"Apollo"};

function getBestTool(ans, primary) {
  const selected = (ans.q04 || []).map(i => QS[3].opts[i]?.t).filter(Boolean);
  const priority = NICHE_TOOL_PRIORITY[primary] || [];
  for (const p of priority) { if (selected.includes(p)) return TOOL_CLEAN[p] || p; }
  const fb = { ecom:"Shopify",social:"Canva",exec:"Google Workspace",content:"WordPress",realty:"CRM tools",books:"QuickBooks",cx:"Gorgias",health:"medical scheduling systems",legal:"Clio",edu:"Kajabi",pm:"Notion",tech:"Zapier",ai_auto:"AI automation tools",sales:"Apollo",mktg:"Google Ads" };
  return fb[primary] || "industry-standard tools";
}

const DELIVERABLES = { ecom:"Managing product listings, order workflows, and customer data",social:"Creating and scheduling content across platforms",exec:"Managing calendars, inboxes, and executive workflows",content:"Researching, writing, and publishing SEO-optimised content",realty:"Managing listings, leads, and transaction coordination",books:"Reconciling accounts, categorising transactions, and producing reports",cx:"Handling tickets, resolving escalations, and managing customer communications",health:"Coordinating patient scheduling, records, and administrative workflows",legal:"Managing case files, deadlines, and client correspondence",edu:"Building course infrastructure, managing enrolments, and coordinating student support",pm:"Tracking deliverables, coordinating teams, and maintaining project documentation",tech:"Setting up and maintaining automation systems, integrations, and digital workflows",ai_auto:"Deploying AI tools and automation workflows that replace manual, repetitive operations",sales:"Qualifying leads, managing pipelines, and supporting close processes for high-ticket offers",mktg:"Managing ad campaigns, tracking performance, and optimising digital marketing funnels" };
const S1 = { ecom:(t,d)=>`${d} for eCommerce brands using ${t}, turning store operations into systems that convert browsers into repeat buyers.`,social:(t,d)=>`${d} for growing brands using ${t}, building content systems that drive consistent engagement without the chaos.`,exec:(t,d)=>`${d} for busy executives using ${t}, creating the operational clarity that lets founders focus on decisions that matter.`,content:(t,d)=>`${d} for online businesses using ${t}, producing content that ranks, converts, and positions clients as authorities in their space.`,realty:(t,d)=>`${d} for real estate teams using ${t}, keeping pipelines organised so agents spend more time closing and less time chasing leads.`,books:(t,d)=>`${d} for service-based businesses using ${t}, translating messy financial data into clean records that clients can actually act on.`,cx:(t,d)=>`${d} for online businesses using ${t}, resolving customer issues with the speed and consistency that builds long-term loyalty.`,health:(t,d)=>`${d} for healthcare providers using ${t}, keeping patient records and schedules running with zero room for administrative error.`,legal:(t,d)=>`${d} for law firms using ${t}, managing case files and client communications with the precision the legal industry demands.`,edu:(t,d)=>`${d} for course creators using ${t}, building the backend systems that keep students engaged and programmes running on schedule.`,pm:(t,d)=>`${d} for growing teams using ${t}, building the project infrastructure that keeps deliverables on track and stakeholders informed.`,tech:(t,d)=>`${d} for scaling businesses using ${t}, eliminating the manual bottlenecks that slow teams down and quietly cost them money.`,ai_auto:(t,d)=>`${d} for forward-thinking operators using ${t}, turning repetitive work into automated systems that run without constant supervision.`,sales:(t,d)=>`${d} for high-ticket businesses using ${t}, building the outreach infrastructure that keeps pipelines full and conversions predictable.`,mktg:(t,d)=>`${d} for growing brands using ${t}, running campaigns that track every peso and optimise toward results, not just reach.` };
const S2 = { exec:(bg,m)=>`${bg} built the organisational discipline that ${m} clients pay a premium for in a VA who never needs to be managed.`,books:(bg,m)=>`${bg} provided the analytical foundation that ${m} business owners rely on when they need numbers they can trust.`,social:(bg,m)=>`${bg} developed the communication instincts that ${m} brands need to stay visible in feeds built to forget them.`,content:(bg,m)=>`${bg} sharpened the writing discipline that ${m} businesses need to consistently produce content that earns authority over time.`,realty:(bg,m)=>`${bg} developed the research precision that ${m} real estate teams depend on to stay ahead of a market that moves fast.`,cx:(bg,m)=>`${bg} built the people skills that ${m} businesses rely on to turn difficult interactions into five-star reviews.`,health:(bg,m)=>`${bg} provided the accuracy habits that ${m} healthcare providers need when every scheduling error has real consequences.`,legal:(bg,m)=>`${bg} built the attention to detail that ${m} law firms require when no document can afford to be wrong.`,edu:(bg,m)=>`${bg} developed the instructional instincts that ${m} course creators need to build programmes students actually complete.`,pm:(bg,m)=>`${bg} developed the process discipline that ${m} teams need to deliver complex projects without the chaos of missed handoffs.`,tech:(bg,m)=>`${bg} built the systems thinking that ${m} businesses need when they're ready to stop doing manually what software should be doing automatically.`,ai_auto:(bg,m)=>`${bg} developed the technical curiosity that ${m} operators need when AI tools are available but no one on their team knows how to deploy them properly.`,sales:(bg,m)=>`${bg} built the persuasion and follow-through discipline that ${m} sales teams need when inconsistent outreach is the only thing standing between them and their revenue target.`,mktg:(bg,m)=>`${bg} developed the analytical and creative balance that ${m} brands need to run campaigns that actually convert, not just campaigns that look good in reports.`,ecom:(bg,m)=>`${bg} built the systems thinking that ${m} eCommerce brands need to scale operations without losing control of quality.` };

function generateBrandStatement(ans, primary) {
  const n1 = NICHES[primary]; const tool = getBestTool(ans,primary);
  const deliverable = DELIVERABLES[primary] || `Delivering specialist ${n1.label} services`;
  const background = getBackground(ans); const market = getMarket(ans);
  return `${(S1[primary]||S1.exec)(tool,deliverable)} ${(S2[primary]||S2.exec)(background,market)}`;
}

function buildReasons(ans, primary) {
  const n = NICHES[primary], r = [];
  const q03 = ans.q03!==undefined ? QS[2].opts[ans.q03]?.t : null;
  const q02 = ans.q02!==undefined ? QS[1].opts[ans.q02]?.t : null;
  const q10 = ans.q10!==undefined ? QS[9].opts[ans.q10]?.t : null;
  const q12 = ans.q12!==undefined ? QS[11].opts[ans.q12]?.t : null;
  const q06 = ans.q06!==undefined ? QS[5].opts[ans.q06]?.t : null;
  const q04cnt = (ans.q04||[]).length;
  if (q10) r.push(`You chose "${q10.toLowerCase()}" as your preferred industry — a direct match for this niche.`);
  if (q03) r.push(`Your favourite tasks ("${q03.toLowerCase()}") are the core deliverables ${n.label}s are hired to do.`);
  if (q02 && !q02.includes("Fresh grad") && !q02.includes("Manual labor")) r.push(`Your background in "${q02.toLowerCase()}" gives you transferable credibility most beginners are still building.`);
  if (q12) r.push(`Your top strength — "${q12.toLowerCase()}" — is exactly what ${n.label} clients pay a premium for.`);
  if (q04cnt > 0 && r.length < 3) r.push(`You already have exposure to ${q04cnt} relevant tool${q04cnt>1?"s":""} in this space — a head start over most applicants.`);
  if (q06 && r.length < 3) r.push(`Your preferred work style ("${q06.toLowerCase()}") fits the daily rhythm of this niche.`);
  return r.slice(0,3);
}

const BLOCKED_DOMAINS = ["mailinator.com","guerrillamail.com","tempmail.com","throwam.com","temp-mail.org","yopmail.com","sharklasers.com","guerrillamailblock.com","grr.la","dispostable.com","trashmail.com","mailnull.com","10minutemail.com","fakeinbox.com","maildrop.cc"];
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && !BLOCKED_DOMAINS.some(d => e.toLowerCase().endsWith("@"+d)); }

// ─────────────────────────────────────────────────────────────────────────────
export default function NicheSelector() {
  const [phase, setPhase]   = useState("landing");
  const [qi, setQi]         = useState(0);
  const [ans, setAns]       = useState({});
  const [sel, setSel]       = useState(null);
  const [result, setResult] = useState(null);
  const [brand, setBrand]   = useState("");
  const [copied, setCopied] = useState(false);
  const [aKey, setAKey]     = useState(0);
  const [email, setEmail]   = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const q   = QS[qi];
  const pct = (qi / TOTAL) * 100;

  const start = () => { setAns({}); setQi(0); setSel(q?.multi ? [] : null); setAKey(k=>k+1); setPhase("quiz"); };

  const pick = (i) => {
    if (q.multi) { setSel(prev => { const arr = Array.isArray(prev) ? prev : []; return arr.includes(i) ? arr.filter(x=>x!==i) : [...arr,i]; }); }
    else setSel(i);
  };

  const isSelected = (i) => q.multi ? (Array.isArray(sel) && sel.includes(i)) : sel === i;
  const canProceed = q?.multi ? true : sel !== null;

  const next = () => {
    if (!canProceed) return;
    const newAns = { ...ans, [q.id]: sel };
    setAns(newAns);
    if (qi < TOTAL - 1) {
      const nqi = qi+1; const nq = QS[nqi];
      setQi(nqi); setSel(newAns[nq.id] ?? (nq.multi ? [] : null)); setAKey(k=>k+1);
    } else {
      setPhase("calc");
      const r = computeScores(newAns);
      setTimeout(() => { const stmt = generateBrandStatement(newAns, r.primary); setResult(r); setBrand(stmt); setPhase("gate"); }, 2200);
    }
  };

  const back = () => {
    if (qi === 0) { setPhase("landing"); return; }
    const pqi = qi-1; const pq = QS[pqi];
    setQi(pqi); setSel(ans[pq.id] ?? (pq.multi ? [] : null)); setAKey(k=>k+1);
  };

  const submitEmail = async () => {
    if (!isValidEmail(email)) { setEmailErr(true); return; }
    setEmailErr(false);
    try {
      const fd = new FormData();
      fd.append("fields[first_name]", "");
      fd.append("email_address", email);
      fd.append("fields[niche]", result?.primary || "");
      fd.append("fields[source]", "niche-selector-v3");
      await fetch("https://app.kit.com/forms/9147039/subscriptions", { method:"POST", body:fd });
    } catch(_) {}
    setPhase("results");
  };

  const copy = () => { if (!brand) return; navigator.clipboard.writeText(brand).then(() => { setCopied(true); setTimeout(()=>setCopied(false), 2500); }); };

  const pn = result ? NICHES[result.primary] : null;
  const tierFlag = result ? TIER3_FLAGS[result.primary] : null;

  return (
    <div className="mm-wrap">
      <style>{CSS}</style>

      <header className="hdr">
        <a href="https://marginmomentum.co" className="brand">Margin &amp; Momentum™</a>
        <div style={{display:"flex", alignItems:"center", gap:28}}>
          <a href="https://systems.marginmomentum.co" style={{fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)", textDecoration:"none", transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color="var(--fog)"} onMouseLeave={e=>e.target.style.color="var(--steel)"}>← VA Systems Library</a>
          <span className="hdr-right">VA Niche Diagnostic</span>
        </div>
      </header>

      {phase === "quiz" && (
        <>
          <div className="prog"><div className="prog-fill" style={{width:`${pct}%`}} /></div>
          <div style={{borderBottom:"1px solid var(--rule)", padding:"8px 48px", display:"flex", justifyContent:"flex-end", position:"relative", zIndex:1}}>
            <span style={{fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)"}}>
              Diagnostic · {qi+1} / {TOTAL}
            </span>
          </div>
        </>
      )}

      {/* LANDING */}
      {phase === "landing" && (
        <main className="main">
          <div className="eyebrow fade-up">VA Launch System 2.0 · Diagnostic Tool</div>
          <h1 className="big-title fade-up-1">Find Your<br/><span className="outline-text">Perfect</span><br/>Niche.</h1>
          <div className="divider fade-up-2" />
          <p className="body-text fade-up-2">12 questions. A specific niche match from 15 high-demand VA specialisations. A personalised brand statement ready to paste into your resume and proposals.</p>
          <div className="safety-note fade-up-2">
            <p className="safety-text">This diagnostic works for everyone — career shifters with 20 years of experience and fresh graduates with none. Your background is the input. The system finds the strongest entry point available to you, wherever you are starting from.</p>
          </div>
          <div className="meta-row fade-up-3">
            {[["15","Niches mapped"],["12","Questions"],["5 min","To complete"],["Free","Brand statement"]].map(([n,l]) => (
              <div className="meta-item" key={l}><span className="meta-num">{n}</span><span className="meta-lbl">{l}</span></div>
            ))}
          </div>
          <div className="fade-up-4">
            <button className="btn-primary" onClick={start}>Start the Diagnostic →</button>
          </div>
          <div style={{marginTop:48, borderTop:"1px solid var(--rule)", paddingTop:32}}>
            <span className="section-lbl" style={{marginBottom:16}}>15 niches covered</span>
            <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
              {Object.values(NICHES).map(n => (
                <span key={n.label} className="niche-tag">{n.icon} {n.label}</span>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* QUIZ */}
      {phase === "quiz" && (
        <main className="main" key={aKey}>
          <div className="eyebrow fade-up">{q.multi ? "Select all that apply" : `Question ${q.n} of ${TOTAL}`}</div>
          <h2 className="q-text fade-up-1">{q.text}</h2>
          <p className="q-sub fade-up-2">{q.sub}</p>
          {q.multi ? (
            <>
              {(Array.isArray(sel) && sel.length > 0)
                ? <span className="tools-note fade-up-2">{sel.length} tool{sel.length > 1 ? "s" : ""} selected — click to deselect</span>
                : <span className="tools-note fade-up-2">No tools yet? That's fine — skip ahead and we'll build from scratch.</span>
              }
              <div className="check-grid fade-up-3">
                {q.opts.map((opt, i) => (
                  <button key={i} className={`check-opt${isSelected(i) ? " sel" : ""}`} onClick={() => pick(i)}>
                    <span className="check-box">{isSelected(i) ? "✓" : ""}</span>
                    <span className="check-text">
                      {opt.t}
                      {opt.sub && <span style={{display:"block", opacity:0.6, fontSize:9, marginTop:2}}>{opt.sub}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="options fade-up-3">
              {q.opts.map((opt, i) => (
                <button key={i} className={`option${isSelected(i) ? " sel" : ""}`} onClick={() => pick(i)}>
                  <span className="opt-marker">{isSelected(i) ? "✓" : (i+1)}</span>
                  <span className="opt-text">{opt.t}</span>
                </button>
              ))}
            </div>
          )}
          <div style={{display:"flex", gap:10, marginTop:4}} className="fade-up-4">
            <button className="btn-outline" onClick={back} style={{padding:"15px 24px"}}>← Back</button>
            <button className="btn-primary" onClick={next} disabled={!canProceed} style={{flex:1, justifyContent:"center"}}>
              {qi < TOTAL - 1 ? "Next →" : "See My Result →"}
            </button>
          </div>
          {q.multi && <p style={{fontFamily:"'DM Mono',monospace", fontSize:9, color:"var(--steel)", letterSpacing:"0.15em", textTransform:"uppercase", textAlign:"center", marginTop:14}}>Q{q.n} of {TOTAL} · Multi-Select</p>}
        </main>
      )}

      {/* CALCULATING */}
      {phase === "calc" && (
        <main className="main" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28, minHeight:"60vh"}}>
          <div className="spin" />
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:36, letterSpacing:"0.02em", color:"var(--fog)", marginBottom:8}}>Analysing Your Profile</div>
            <p style={{fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)"}}>Mapping skills across 15 VA niches</p>
          </div>
        </main>
      )}

      {/* EMAIL GATE */}
      {phase === "gate" && result && pn && (
        <main className="main">
          <div className="gate-wrap">
            <div className="eyebrow">Your result is ready.</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,6vw,64px)", lineHeight:0.95, color:"var(--fog)", marginBottom:24, letterSpacing:"0.01em"}}>
              Enter your email<br/>to unlock it.
            </h2>
            <div className="gate-teaser">
              <span className="gate-teaser-label">Your Top Niche Match</span>
              <div className="gate-teaser-text">{pn.label}</div>
              <span className="gate-teaser-hint">+ Your personalised brand statement</span>
            </div>
            <div className="gate-input-wrap">
              <input
                type="email"
                className={`gate-input${emailErr ? " err" : ""}`}
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailErr(false); }}
                onKeyDown={e => e.key === "Enter" && submitEmail()}
              />
              <button className="btn-primary" onClick={submitEmail}>Unlock →</button>
            </div>
            <span className={`gate-note${emailErr ? " err-note" : ""}`}>
              {emailErr ? "⚠ Please enter a valid email address." : "Your brand statement will be sent to this address."}
            </span>
          </div>
        </main>
      )}

      {/* RESULTS */}
      {phase === "results" && result && pn && (
        <main className="main">
          <div className="eyebrow">Diagnostic Complete · Your Niche Match</div>
          <h1 className="big-title">You Are A<br/>{pn.icon} {pn.label}</h1>
          <div className="divider" />
          <p className="body-text">Based on your background, skills, and goals — here is your full breakdown across all 15 niches.</p>

          {tierFlag && (
            <div className="tier-flag">
              <span className="tier-flag-label">⚠ {tierFlag.label}</span>
              <p className="tier-flag-text">{tierFlag.text}</p>
            </div>
          )}

          {/* PRIMARY RESULT */}
          <div className="blk-box">
            <span className="section-lbl" style={{marginBottom:14, color:"var(--steel)"}}>Primary Recommendation · Niche Match</span>
            <div className="result-niche">{pn.label}</div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:16}}>
              <span className="pill">🇵🇭 {pn.php}</span>
              <span className="pill">💵 {pn.usd}</span>
              <span className="pill">{pn.demand} Demand</span>
            </div>
            <p style={{fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.08em", color:"var(--steel)", marginBottom:20}}>
              Mid-level target: <strong style={{color:"var(--ink)"}}>{pn.tier2}</strong>
            </p>
            <div style={{borderTop:"1px solid rgba(26,23,20,0.15)", paddingTop:20, marginBottom:20}}>
              <span className="section-lbl" style={{marginBottom:14, color:"var(--steel)"}}>Why This Niche Fits Your Profile</span>
              {buildReasons(ans, result.primary).map((r,i) => (
                <div className="reason-item" key={i}>
                  <span className="reason-mark">✓</span>
                  <span className="reason-text">{r}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
              {pn.tools.map(t => <span className="tool-tag" key={t}>{t}</span>)}
            </div>
          </div>

          {/* BRAND STATEMENT */}
          <div className="brand-box">
            <span className="section-lbl" style={{marginBottom:16}}>✦ Your VA Brand Statement</span>
            <p style={{fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--steel)", marginBottom:16}}>
              Paste directly into your resume, OnlineJobsPH profile, and proposals.
            </p>
            {brand && (
              <>
                <div className="brand-quote">{brand}</div>
                <button className="btn-primary" onClick={copy} style={{fontSize:9, padding:"12px 22px"}}>
                  {copied ? "✓ Copied!" : "Copy Statement"}
                </button>
              </>
            )}
          </div>

          {/* SCORE BREAKDOWN */}
          <div style={{marginBottom:40, paddingBottom:40, borderBottom:"1px solid var(--rule)"}}>
            <span className="section-lbl" style={{marginBottom:20}}>Full Compatibility Breakdown · All 15 Niches</span>
            {result.sorted.map(([id, sc]) => {
              const n = NICHES[id]; if (!n) return null;
              const maxSc = result.sorted[0][1] || 1;
              const w = Math.round((sc/maxSc)*100);
              const isPrimary = id === result.primary;
              return (
                <div className="score-row" key={id}>
                  <span className="score-icon">{n.icon}</span>
                  <span className={`score-lbl${isPrimary ? " primary" : ""}`}>{n.label}</span>
                  <div className="score-track"><div className={`score-fill${isPrimary ? "" : " secondary"}`} style={{width:`${w}%`}} /></div>
                </div>
              );
            })}
          </div>

          {/* NEXT 3 STEPS */}
          <div style={{marginBottom:40}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:40, letterSpacing:"0.01em", color:"var(--fog)", marginBottom:32}}>Your Next 3 Steps</h3>
            <div className="step-grid">
              {[
                `Copy your brand statement and paste it into your resume's Professional Summary section. This is your opening line in every application you send.`,
                `Enrol free in the VA Launch System 2.0 at <strong>app.marginmomentum.co</strong>. Lab 02 through 07 build your resume, portfolio, presence, and proposal system for the <strong>${pn.label}</strong> niche.`,
                `Run the <strong>30-Day Client Acquisition Sprint</strong> in Lab 07. Target: 5 applications per day. Consistency over quality in the first 30 days.`,
              ].map((txt, i) => (
                <span key={i}>
                  <span className="step-num">{String(i+1).padStart(2,"0")}</span>
                  <div className="step-text" dangerouslySetInnerHTML={{__html: txt.replace(/<strong>/g,'<strong style="color:var(--fog)">') }} />
                </span>
              ))}
            </div>
          </div>

          {/* RATE TABLE */}
          <div style={{marginBottom:40}}>
            <span className="section-lbl" style={{marginBottom:16}}>All 15 Niche Rate Ranges · 2026 Philippine VA Market</span>
            <div style={{border:"1px solid var(--rule)", overflow:"hidden"}}>
              <div style={{background:"var(--ink)", padding:"10px 14px", display:"flex", alignItems:"center", gap:10}}>
                <span style={{fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)", flex:1}}>Niche</span>
                <span style={{fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)", width:160}}>Philippines</span>
                <span style={{fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)", width:80}}>USD/hr</span>
              </div>
              {Object.entries(NICHES).map(([id, n]) => (
                <div className={`rate-row${id===result.primary?" highlight":""}`} key={id}>
                  <span className="rate-icon">{n.icon}</span>
                  <span className="rate-lbl">{n.label}</span>
                  <span className="rate-php" style={{width:160}}>{n.php}</span>
                  <span className="rate-usd" style={{width:80}}>{n.usd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="callout-dark" style={{marginBottom:40}}>
            <span className="section-lbl" style={{marginBottom:16}}>Ready to build?</span>
            <p style={{fontFamily:"'Libre Baskerville',serif", fontSize:15, color:"var(--text-on-dark)", lineHeight:1.75, marginBottom:24}}>
              The VA Launch System 2.0 is free. 7 labs. 15 niches.
              Resume, portfolio, presence, proposals, and first-client sprint — all built for the <strong style={{color:"var(--fog)"}}>{pn.label}</strong> niche.
            </p>
            <a href="https://app.marginmomentum.co" target="_blank" rel="noreferrer" className="btn-primary">
              Access VLS 2.0 Free →
            </a>
          </div>

          <button className="btn-outline" onClick={() => { setPhase("landing"); setResult(null); setBrand(""); setAns({}); setQi(0); setSel(null); setEmail(""); }}>
            ↺ Retake Diagnostic
          </button>
          <a href="https://systems.marginmomentum.co" style={{display:"inline-flex", alignItems:"center", gap:10, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--steel)", textDecoration:"none", marginLeft:16, transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color="var(--fog)"} onMouseLeave={e=>e.target.style.color="var(--steel)"}>
            ← Back to VA Systems Library
          </a>
        </main>
      )}

      <footer className="ftr">
        <span className="ftr-l">Margin &amp; Momentum™</span>
        <span className="ftr-r">Systems Over Hustle™</span>
      </footer>
    </div>
  );
}
