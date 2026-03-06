import { useState, useCallback } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff; }
  .app { font-family: 'Libre Baskerville', Georgia, serif; background: #fff; color: #0a0a0a; min-height: 100vh; display: flex; flex-direction: column; }
  .hdr { border-bottom: 2px solid #0a0a0a; padding: 14px 40px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: #fff; z-index: 200; }
  .brand { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: #0a0a0a; text-decoration: none; }
  .hdr-back { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #aaa; text-decoration: none; transition: color 0.2s; }
  .hdr-back:hover { color: #0a0a0a; }
  .prog { height: 3px; background: #ebebeb; }
  .prog-fill { height: 100%; background: #0a0a0a; transition: width 0.5s ease; }
  .main { flex: 1; max-width: 700px; margin: 0 auto; width: 100%; padding: 56px 40px 80px; }
  .ftr { background: #0a0a0a; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; }
  .ftr-l { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #fff; }
  .ftr-r { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: #fff; }
  .eyebrow { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: #888; display: block; margin-bottom: 20px; }
  .big-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 9vw, 80px); line-height: 0.92; color: #0a0a0a; letter-spacing: 1px; margin-bottom: 28px; }
  .outline-text { -webkit-text-stroke: 2px #0a0a0a; color: transparent; }
  .divider { width: 40px; height: 3px; background: #0a0a0a; margin-bottom: 28px; }
  .body-text { font-size: 14.5px; line-height: 1.85; color: #333; margin-bottom: 36px; }
  .meta-row { display: flex; gap: 32px; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid #e8e8e8; flex-wrap: wrap; }
  .meta-item { display: flex; flex-direction: column; gap: 4px; }
  .meta-num { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: #0a0a0a; line-height: 1; }
  .meta-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #aaa; }
  .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: #0a0a0a; color: #fff; font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; padding: 16px 32px; border: none; cursor: pointer; transition: background 0.2s; }
  .btn-primary:hover { background: #333; }
  .btn-primary:disabled { opacity: 0.35; cursor: default; }
  .btn-outline { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: #0a0a0a; font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; padding: 15px 31px; border: 1.5px solid #0a0a0a; cursor: pointer; transition: all 0.2s; }
  .btn-outline:hover { background: #0a0a0a; color: #fff; }
  .section-lbl { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #aaa; display: block; margin-bottom: 10px; }
  .counter { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; color: #ccc; display: block; margin-bottom: 28px; }
  .q-text { font-family: 'Libre Baskerville', serif; font-size: clamp(18px, 3vw, 26px); font-weight: 700; line-height: 1.35; color: #0a0a0a; margin-bottom: 10px; }
  .q-sub { font-family: 'Libre Baskerville', serif; font-size: 13.5px; line-height: 1.7; color: #777; margin-bottom: 32px; font-style: italic; }
  .options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 44px; }
  .option { display: flex; align-items: flex-start; gap: 16px; padding: 18px 22px; border: 1.5px solid #e0e0e0; background: #fff; cursor: pointer; text-align: left; width: 100%; transition: all 0.15s; }
  .option.sel { border-color: #0a0a0a; background: #0a0a0a; }
  .option:hover:not(.sel) { border-color: #0a0a0a; }
  .opt-marker { flex-shrink: 0; width: 22px; height: 22px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-family: 'DM Mono', monospace; font-size: 11px; color: #ccc; margin-top: 1px; }
  .option.sel .opt-marker { border-color: #fff; background: #fff; color: #0a0a0a; }
  .opt-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.6; color: #333; }
  .option.sel .opt-text { color: #fff; }
  .opt-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; color: #aaa; display: block; margin-top: 3px; }
  .option.sel .opt-sub { color: rgba(255,255,255,0.55); }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 44px; }
  .check-opt { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border: 1.5px solid #e0e0e0; background: #fff; cursor: pointer; text-align: left; width: 100%; transition: all 0.15s; }
  .check-opt.sel { border-color: #0a0a0a; background: #0a0a0a; }
  .check-opt:hover:not(.sel) { border-color: #0a0a0a; }
  .check-box { flex-shrink: 0; width: 18px; height: 18px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 11px; color: transparent; margin-top: 1px; }
  .check-opt.sel .check-box { border-color: #fff; background: #fff; color: #0a0a0a; }
  .check-text { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.5px; line-height: 1.55; color: #333; }
  .check-opt.sel .check-text { color: #fff; }
  .tools-note { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; color: #aaa; margin-bottom: 16px; display: block; }
  .blk-box { background: #0a0a0a; padding: 32px; margin-bottom: 32px; }
  .result-niche { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 7vw, 64px); line-height: 0.95; color: #fff; letter-spacing: 1px; margin-bottom: 16px; }
  .pill { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.25); padding: 5px 14px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; color: rgba(255,255,255,0.8); }
  .tool-tag { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 4px 10px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.5px; color: rgba(255,255,255,0.6); }
  .reason-item { display: flex; gap: 14px; margin-bottom: 14px; align-items: flex-start; }
  .reason-mark { flex-shrink: 0; font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.4); padding-top: 2px; }
  .reason-text { font-family: 'Libre Baskerville', serif; font-size: 13.5px; color: rgba(255,255,255,0.8); line-height: 1.6; }
  .brand-box { border: 1.5px solid #e0e0e0; padding: 28px; margin-bottom: 12px; }
  .brand-quote { font-family: 'Libre Baskerville', serif; font-size: 15px; line-height: 1.85; color: #0a0a0a; font-style: italic; border-left: 3px solid #0a0a0a; padding-left: 20px; margin-bottom: 20px; }
  .score-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .score-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
  .score-lbl { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.5px; color: #333; min-width: 200px; }
  .score-lbl.primary { color: #0a0a0a; font-weight: 500; }
  .score-track { flex: 1; height: 3px; background: #ebebeb; }
  .score-fill { height: 100%; background: #0a0a0a; transition: width 0.9s cubic-bezier(.4,0,.2,1); }
  .score-fill.secondary { background: #ccc; }
  .step-grid { display: grid; grid-template-columns: 32px 1fr; gap: 0 16px; margin-bottom: 32px; }
  .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #0a0a0a; line-height: 1; }
  .step-text { font-family: 'Libre Baskerville', serif; font-size: 13.5px; line-height: 1.7; color: #333; padding-top: 4px; padding-bottom: 20px; border-bottom: 1px solid #ebebeb; margin-bottom: 4px; }
  .rate-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-bottom: 1px solid #ebebeb; }
  .rate-row.highlight { background: #0a0a0a; border-color: #0a0a0a; }
  .rate-icon { font-size: 14px; flex-shrink: 0; }
  .rate-lbl { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.5px; color: #555; flex: 1; }
  .rate-row.highlight .rate-lbl { color: #fff; }
  .rate-php { font-family: 'DM Mono', monospace; font-size: 11px; color: #0a0a0a; font-weight: 500; }
  .rate-row.highlight .rate-php { color: #fff; }
  .rate-usd { font-family: 'DM Mono', monospace; font-size: 10px; color: #aaa; }
  .rate-row.highlight .rate-usd { color: rgba(255,255,255,0.5); }
  .secondary-card { border: 1.5px solid #e0e0e0; padding: 22px; display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
  .spin { display: inline-block; width: 28px; height: 28px; border: 2px solid #e0e0e0; border-top-color: #0a0a0a; animation: spin 0.8s linear infinite; }
  .gate-wrap { max-width: 540px; }
  .gate-teaser { background: #0a0a0a; padding: 28px 32px; margin-bottom: 32px; }
  .gate-teaser-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); display: block; margin-bottom: 10px; }
  .gate-teaser-text { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: rgba(255,255,255,0.15); letter-spacing: 1px; line-height: 1; filter: blur(6px); user-select: none; }
  .gate-teaser-hint { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.4); display: block; margin-top: 14px; }
  .gate-input-wrap { display: flex; gap: 2px; margin-bottom: 10px; }
  .gate-input { flex: 1; background: #fff; border: 1.5px solid #e0e0e0; color: #0a0a0a; font-family: 'Libre Baskerville', serif; font-size: 14px; padding: 14px 18px; outline: none; transition: border-color 0.2s; }
  .gate-input:focus { border-color: #0a0a0a; }
  .gate-input.err { border-color: #c00; }
  .gate-input::placeholder { color: #ccc; }
  .gate-note { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase; color: #bbb; display: block; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.4s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
  .fade-up-2 { animation: fadeUp 0.4s 0.1s ease both; }
  .fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
  .fade-up-4 { animation: fadeUp 0.4s 0.2s ease both; }
  @media (max-width: 640px) {
    .hdr { padding: 12px 20px; }
    .main { padding: 40px 20px 60px; }
    .ftr { padding: 14px 20px; flex-direction: column; gap: 6px; }
    .check-grid { grid-template-columns: 1fr; }
    .meta-row { gap: 20px; }
  }
`;

// ─────────────────────────────────────────────────────────
//  11 NICHES
// ─────────────────────────────────────────────────────────
const NICHES = {
  ecom:    { label:"eCommerce VA",             icon:"🛒", php:"₱25K–₱45K/mo", usd:"$8–$15/hr",  tier2:"₱35K–₱55K/mo", demand:"Very High", tools:["Shopify","Klaviyo","Gorgias","Google Sheets","Canva"] },
  social:  { label:"Social Media VA",          icon:"📱", php:"₱22K–₱40K/mo", usd:"$7–$14/hr",  tier2:"₱32K–₱52K/mo", demand:"Very High", tools:["Canva","Meta Business Suite","Buffer","Later","CapCut"] },
  exec:    { label:"Executive & Admin VA",     icon:"📋", php:"₱28K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱42K–₱65K/mo", demand:"High",      tools:["Google Workspace","Notion","Slack","Zoom","Calendly"] },
  content: { label:"Content Writing VA",       icon:"✍️", php:"₱20K–₱42K/mo", usd:"$8–$18/hr",  tier2:"₱32K–₱55K/mo", demand:"High",      tools:["Google Docs","Surfer SEO","WordPress","Hemingway","ChatGPT"] },
  realty:  { label:"Real Estate VA",           icon:"🏠", php:"₱28K–₱50K/mo", usd:"$9–$16/hr",  tier2:"₱40K–₱60K/mo", demand:"High",      tools:["Follow Up Boss","Zillow","DocuSign","MLS","Google Sheets"] },
  books:   { label:"Bookkeeping & Finance VA", icon:"📊", php:"₱30K–₱55K/mo", usd:"$10–$22/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",   tools:["QuickBooks","Xero","Excel","Gusto","Wave"] },
  cx:      { label:"Customer Service VA",      icon:"💬", php:"₱18K–₱35K/mo", usd:"$6–$12/hr",  tier2:"₱28K–₱45K/mo", demand:"Very High", tools:["Zendesk","Gorgias","Freshdesk","Intercom","Slack"] },
  health:  { label:"Healthcare VA",            icon:"🏥", php:"₱28K–₱50K/mo", usd:"$9–$18/hr",  tier2:"₱42K–₱65K/mo", demand:"Growing",   tools:["Kareo","SimplePractice","Google Calendar","Zoom","DrChrono"] },
  legal:   { label:"Legal VA",                 icon:"⚖️", php:"₱30K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",   tools:["Clio","MyCase","DocuSign","Google Docs","LawPay"] },
  edu:     { label:"Online Education VA",      icon:"🎓", php:"₱25K–₱48K/mo", usd:"$8–$16/hr",  tier2:"₱38K–₱60K/mo", demand:"High",      tools:["Kajabi","Teachable","Zoom","Notion","Circle"] },
  media:   { label:"Podcast & Media VA",       icon:"🎙️", php:"₱28K–₱52K/mo", usd:"$9–$18/hr",  tier2:"₱42K–₱65K/mo", demand:"High",      tools:["Descript","CapCut","Audacity","Riverside.fm","Canva"] },
  pm:      { label:"Project Management VA",    icon:"🗂️", php:"₱30K–₱55K/mo", usd:"$10–$20/hr", tier2:"₱45K–₱70K/mo", demand:"Growing",   tools:["Asana","ClickUp","Monday.com","Notion","Slack"] },
};

// ─────────────────────────────────────────────────────────
//  12 QUESTIONS
// ─────────────────────────────────────────────────────────
const QS = [
  {
    id:"q01", n:1, multi:false,
    text:"What is your educational background?",
    sub:"Your field of study reveals transferable skills — even if it seems unrelated to VA work.",
    opts:[
      { t:"Business, Commerce, or Management",           s:{exec:2,books:2,ecom:1} },
      { t:"Communications, Journalism, or Marketing",    s:{social:3,content:2,cx:1} },
      { t:"IT, Computer Science, or Engineering",        s:{ecom:2,exec:1,books:1,media:1} },
      { t:"Education, Humanities, or Liberal Arts",      s:{content:2,cx:2,social:1,edu:2} },
      { t:"Finance, Accounting, or Economics",           s:{books:3,realty:2,exec:1} },
      { t:"Real Estate, Law, or Property-related",       s:{realty:3,legal:2,exec:1} },
      { t:"Healthcare, Nursing, or Medical Sciences",    s:{health:3,cx:1} },
      { t:"Not yet finished / currently studying",       s:{cx:1,social:1,ecom:1} },
      { t:"Other or unrelated field",                    s:{} },
    ],
  },
  {
    id:"q02", n:2, multi:false,
    text:"What was your most recent job or experience?",
    sub:"Include internships, part-time work, school org roles — anything counts, even non-VA work.",
    opts:[
      { t:"Office admin, secretary, or executive support",      s:{exec:3,books:1} },
      { t:"Retail, sales, or online selling",                   s:{ecom:3,cx:2} },
      { t:"Social media, marketing, or advertising",            s:{social:3,content:2} },
      { t:"Writing, editing, blogging, or journalism",          s:{content:3,social:1,media:2} },
      { t:"Finance, accounting, or bookkeeping",                s:{books:3,realty:1} },
      { t:"Customer service or call center (BPO)",              s:{cx:3,exec:1} },
      { t:"Real estate, property, or banking",                  s:{realty:3,books:2} },
      { t:"Healthcare, clinic, or medical admin",               s:{health:3,exec:1} },
      { t:"Legal, paralegal, or law firm work",                 s:{legal:3,exec:1} },
      { t:"Teaching, tutoring, or training",                    s:{edu:3,content:2} },
      { t:"Video, podcast production, or media",                s:{media:3,social:1} },
      { t:"Fresh graduate — no work experience yet",            s:{} },
    ],
  },
  {
    id:"q03", n:3, multi:false,
    text:"Which tasks do you genuinely enjoy most?",
    sub:"Be honest — your natural enjoyment is a stronger signal than what you think you should pick.",
    opts:[
      { t:"Organizing calendars, inboxes, and schedules",          s:{exec:3,books:1} },
      { t:"Creating graphics, captions, and visual content",       s:{social:3,content:1} },
      { t:"Writing articles, blog posts, or persuasive copy",      s:{content:3,social:1,media:1} },
      { t:"Tracking numbers, formulas, and spreadsheets",          s:{books:3,realty:1,ecom:1} },
      { t:"Researching properties, leads, or market data",         s:{realty:3,legal:1,ecom:1} },
      { t:"Helping people and resolving complaints",               s:{cx:3,exec:1,health:1} },
      { t:"Managing online stores, listings, and product data",    s:{ecom:3,social:1} },
      { t:"Editing videos, audio, or multimedia content",          s:{media:3,social:2} },
      { t:"Supporting students or managing course content",        s:{edu:3,content:1} },
    ],
  },
  {
    id:"q04", n:4, multi:true,
    text:"Which tools have you used — even briefly?",
    sub:"Select all that apply. Any exposure counts — the practice kits will build the rest from scratch.",
    opts:[
      { t:"Google Workspace",           sub:"Docs, Sheets, Gmail, Calendar",                  s:{exec:2,books:1,content:1} },
      { t:"Canva or Adobe Photoshop",   sub:"Any design or image editing tool",               s:{social:3,content:2,media:1} },
      { t:"Shopify / Lazada / Shopee",  sub:"Any online store or marketplace platform",       s:{ecom:3,cx:1} },
      { t:"QuickBooks or Xero",         sub:"Any financial tracking or accounting tool",      s:{books:3,realty:1} },
      { t:"HubSpot / Salesforce / CRM", sub:"Any customer relationship management tool",     s:{realty:2,cx:2,exec:1} },
      { t:"Facebook / Instagram / TikTok", sub:"Managing brand pages or ad accounts",        s:{social:3,cx:1} },
      { t:"Notion / Trello / Asana",    sub:"Any project management or ops tool",            s:{exec:2,content:1,ecom:1,edu:1} },
      { t:"WordPress or Wix",           sub:"Any website builder or CMS",                    s:{content:3,social:1,media:1} },
      { t:"Zoom or Calendly",           sub:"Any scheduling or video conferencing tool",      s:{exec:2,health:2,edu:2} },
      { t:"Mailchimp / ActiveCampaign", sub:"Any email marketing or automation platform",    s:{social:2,ecom:2,content:1} },
      { t:"CapCut or Adobe Premiere",   sub:"Any video editing tool",                        s:{media:3,social:2} },
      { t:"Zendesk / Freshdesk / Gorgias", sub:"Any helpdesk or ticketing tool",            s:{cx:3,ecom:1} },
      { t:"LinkedIn",                   sub:"Recruiting, outreach, or personal branding",    s:{exec:2,legal:1,social:1} },
      { t:"EMR or medical scheduling",  sub:"Any electronic health records system",          s:{health:4} },
      { t:"Clio or MyCase",             sub:"Any legal case management tool",                s:{legal:4} },
      { t:"Kajabi / Teachable / Thinkific", sub:"Any online course or LMS platform",        s:{edu:4,content:1} },
      { t:"Airtable or Monday.com",     sub:"Any database or advanced ops tool",             s:{exec:2,books:1,ecom:1} },
      { t:"ChatGPT or Jasper",          sub:"Any AI writing or automation tool",             s:{content:2,social:1,media:1,edu:1} },
      { t:"Descript or Audacity",       sub:"Any podcast or audio editing tool",             s:{media:4} },
    ],
  },
  {
    id:"q05", n:5, multi:false,
    text:"How many hours per day can you work consistently?",
    sub:"This shapes which clients you can serve and what income is realistic in the next 3 months.",
    opts:[
      { t:"2–4 hours — side income, part-time",        s:{social:1,cx:1,content:1} },
      { t:"5–6 hours — half-day engagement",           s:{ecom:1,social:1,cx:1} },
      { t:"8 hours — full-time, single-client focus",  s:{exec:2,books:2,realty:1,health:1,legal:1} },
      { t:"Flexible — project-based, not fixed hours", s:{content:2,social:1,media:2} },
    ],
  },
  {
    id:"q06", n:6, multi:false,
    text:"Which work style describes you best?",
    sub:"There is no right answer — this is about what you can sustain for years, not just weeks.",
    opts:[
      { t:"Deep focus — best work on one task for hours",    s:{content:2,books:2,legal:2} },
      { t:"Multi-tasking — you thrive when juggling multiple priorities at once",  s:{exec:2,cx:2,health:1} },
      { t:"Creative output — making things people can see",  s:{social:2,ecom:1,content:1,media:2} },
      { t:"Systems thinking — building processes and SOPs",  s:{exec:2,books:1,realty:1,edu:1} },
      { t:"Research-driven — digging for data and insights", s:{realty:2,books:2,ecom:1,legal:2} },
    ],
  },
  {
    id:"q07", n:7, multi:false,
    text:"Which client market are you most interested in serving?",
    sub:"This affects your timezone overlap, communication style, and long-term income ceiling.",
    opts:[
      { t:"US clients — highest rates, EST/PST timezone",        s:{exec:2,realty:2,ecom:1,legal:1} },
      { t:"Australian clients — strong market, AEST zone",       s:{cx:2,ecom:1,social:1,health:1} },
      { t:"UK or European clients — growing VA demand",           s:{content:2,social:1,exec:1} },
      { t:"Canadian clients — healthcare and legal VA demand",    s:{health:2,legal:2} },
      { t:"Local Philippine businesses — easier comms",          s:{social:1,cx:1} },
      { t:"Any market — wherever the opportunity is best",       s:{} },
    ],
  },
  {
    id:"q08", n:8, multi:false,
    text:"How confident are you in your written English?",
    sub:"This directly determines which niches and clients are accessible right now.",
    opts:[
      { t:"Excellent — I've written reports, articles, or professional emails professionally", s:{content:3,exec:2,realty:1,legal:2} },
      { t:"Good — I write clear, professional English comfortably",               s:{cx:2,exec:2,social:1,ecom:1,health:1} },
      { t:"Average — I communicate fine but prefer less writing",                 s:{books:1,ecom:1} },
      { t:"Still improving — writing in English feels challenging",               s:{ecom:1,books:1} },
    ],
  },
  {
    id:"q09", n:9, multi:false,
    text:"How comfortable are you with numbers and financial data?",
    sub:"Honest self-assessment prevents landing in a niche that will frustrate you long-term.",
    opts:[
      { t:"Very comfortable — spreadsheets and formulas are satisfying",  s:{books:3,realty:2,ecom:1} },
      { t:"Comfortable — basic math and Excel formulas are no problem",   s:{ecom:2,realty:1,exec:1} },
      { t:"Neutral — I can do it, but it is not my preference",            s:{social:1,cx:1,media:1} },
      { t:"Prefer to avoid — numbers genuinely stress me out",            s:{content:1,social:1,edu:1} },
    ],
  },
  {
    id:"q10", n:10, multi:false,
    text:"Which industry would you most enjoy working in every day?",
    sub:"You will spend 40+ hours per week inside your client's world — alignment matters enormously.",
    opts:[
      { t:"Online retail, eCommerce, or consumer brands",                s:{ecom:4} },
      { t:"Digital marketing, social media, or personal brands",         s:{social:4} },
      { t:"Corporate, startups, or executive leadership teams",          s:{exec:4} },
      { t:"Publishing, wellness, lifestyle, or media brands",            s:{content:4} },
      { t:"Real estate, property investment, or home buying",            s:{realty:4} },
      { t:"Finance, accounting firms, or financial services",            s:{books:4} },
      { t:"Tech companies, SaaS products, or online communities",       s:{cx:4} },
      { t:"Healthcare, medical clinics, or telehealth providers",        s:{health:4} },
      { t:"Legal firms, law offices, or paralegal services",             s:{legal:4} },
      { t:"Online education, course creators, or coaching businesses",  s:{edu:4} },
      { t:"Podcasting, YouTube channels, or media production",           s:{media:4} },
      { t:"Beauty, fashion, or personal care brands",                    s:{social:2,content:2} },
      { t:"Fitness, wellness coaching, or nutrition brands",             s:{content:2,social:2} },
      { t:"Recruitment, HR, or staffing agencies",                      s:{exec:2,cx:2} },
      { t:"Insurance agencies or risk management firms",                 s:{books:2,exec:2} },
      { t:"Travel, tourism, or hospitality brands",                     s:{cx:2,social:2} },
      { t:"Events management, weddings, or entertainment",              s:{exec:2,social:2,media:1} },
      { t:"Non-profit organizations or NGOs",                           s:{exec:2,content:2} },
      { t:"Construction, architecture, or property development",        s:{realty:2,exec:2} },
      { t:"Logistics, supply chain, or freight forwarding",             s:{exec:2,books:2} },
    ],
  },
  {
    id:"q11", n:11, multi:false,
    text:"What is your most important income goal in the next 6 months?",
    sub:"This shapes both your starting niche and the growth trajectory that is realistic for you.",
    opts:[
      { t:"Get any income within 30 days — I need fast results",    s:{cx:2,social:2,ecom:1} },
      { t:"Reach ₱25,000–₱35,000/month within 3 months",          s:{social:2,ecom:2,cx:1} },
      { t:"Reach ₱35,000–₱50,000/month within 6 months",          s:{exec:2,content:2,realty:1,edu:1} },
      { t:"Build toward ₱50,000–₱100,000/month as a specialist",   s:{books:3,realty:2,exec:2,legal:2,health:2} },
      { t:"Scale beyond ₱100,000/month — senior specialist or team", s:{books:4,legal:3,health:3,realty:3,exec:2} },
    ],
  },
  {
    id:"q12", n:12, multi:false,
    text:"What is your single biggest strength right now?",
    sub:"This is your tiebreaker — the trait that separates you from other beginners applying to the same roles.",
    opts:[
      { t:"Highly organised — I never miss a deadline or detail",          s:{exec:3,books:2,legal:1} },
      { t:"Visually creative — I think in images and make beautiful work", s:{social:3,content:2,media:2} },
      { t:"Analytically sharp — I find patterns others miss",              s:{books:3,realty:2,legal:1} },
      { t:"People-focused — I genuinely love helping others",              s:{cx:3,exec:1,health:2,edu:1} },
      { t:"Fast learner — I absorb tools and systems quickly",             s:{ecom:2,social:1,exec:1,media:1} },
      { t:"Strong writer — ideas flow naturally when I write",             s:{content:3,social:1,legal:1} },
    ],
  },
];

const TOTAL = QS.length;

// ─────────────────────────────────────────────────────────
//  SCORING ENGINE — handles both single and multi-select
// ─────────────────────────────────────────────────────────
function computeScores(ans) {
  const s = { ecom:0,social:0,exec:0,content:0,realty:0,books:0,cx:0,health:0,legal:0,edu:0,media:0 };
  QS.forEach(q => {
    if (q.multi) {
      const selected = ans[q.id] || [];
      selected.forEach(i => {
        if (q.opts[i]?.s) Object.entries(q.opts[i].s).forEach(([k,v]) => { s[k] += v; });
      });
    } else {
      const a = ans[q.id];
      if (a !== undefined && q.opts[a]?.s) {
        Object.entries(q.opts[a].s).forEach(([k,v]) => { s[k] += v; });
      }
    }
  });
  const sorted = Object.entries(s).sort((a,b) => b[1]-a[1]);
  return { raw:s, sorted, primary:sorted[0][0], secondary:sorted[1][0] };
}

// ─────────────────────────────────────────────────────────
//  AI BRAND STATEMENT
// ─────────────────────────────────────────────────────────
async function fetchBrandStatement(ans, primary, secondary) {
  const get = (qIdx, key) => {
    const q = QS[qIdx];
    if (q.multi) {
      const sel = ans[key] || [];
      return sel.length > 0 ? sel.map(i => q.opts[i]?.t).filter(Boolean).join(", ") : "various tools";
    }
    const a = ans[key];
    return a !== undefined ? (q.opts[a]?.t ?? "varied background") : "varied background";
  };
  const n1 = NICHES[primary], n2 = NICHES[secondary];
  const prompt = `Write a professional VA Brand Statement for a Filipino Virtual Assistant. Output exactly 2 sentences — nothing more.

Their niche diagnostic results:
- Primary niche: ${n1.label}
- Secondary niche: ${n2.label}
- Educational background: ${get(0,"q01")}
- Most recent experience: ${get(1,"q02")}
- Enjoys most: ${get(2,"q03")}
- Tools used: ${get(3,"q04")}
- Work style: ${get(5,"q06")}
- Target market: ${get(6,"q07")}
- English confidence: ${get(7,"q08")}
- Biggest strength: ${get(11,"q12")}

Brand Statement rules:
1. Exactly 2 sentences. No more.
2. Sentence 1: Position as a ${n1.label} specialist. Name 1–2 specific deliverables or tools. State concrete client value.
3. Sentence 2: Reference one transferable strength from their background. Mention the target client market.
4. DO NOT start with "I". NO clichés: hardworking, passionate, detail-oriented, fast learner.
5. Sound like a real person — confident, specific, zero filler.
6. Output ONLY the brand statement. No preamble, no quotes, no explanation.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:200, messages:[{role:"user",content:prompt}] }),
  });
  const data = await res.json();
  if (data.content?.[0]?.text) return data.content[0].text.trim();
  throw new Error("No content");
}

// ─────────────────────────────────────────────────────────
//  WHY THIS NICHE
// ─────────────────────────────────────────────────────────
function buildReasons(ans, primary) {
  const n = NICHES[primary], r = [];
  const q03 = ans.q03 !== undefined ? QS[2].opts[ans.q03]?.t : null;
  const q02 = ans.q02 !== undefined ? QS[1].opts[ans.q02]?.t : null;
  const q10 = ans.q10 !== undefined ? QS[9].opts[ans.q10]?.t : null;
  const q12 = ans.q12 !== undefined ? QS[11].opts[ans.q12]?.t : null;
  const q06 = ans.q06 !== undefined ? QS[5].opts[ans.q06]?.t : null;
  const q04 = (ans.q04 || []).length > 0 ? `${(ans.q04 || []).length} relevant tool${(ans.q04||[]).length>1?"s":""}` : null;
  if (q10) r.push(`You chose "${q10.toLowerCase()}" as your preferred industry — a direct match for this niche.`);
  if (q03) r.push(`Your favorite tasks ("${q03.toLowerCase()}") are the core deliverables ${n.label}s are hired to do.`);
  if (q02 && !q02.includes("Fresh grad")) r.push(`Your background in "${q02.toLowerCase()}" gives you transferable credibility most beginners are still building.`);
  if (q12) r.push(`Your top strength — "${q12.toLowerCase()}" — is exactly what ${n.label} clients pay a premium for.`);
  if (q04 && r.length < 3) r.push(`You already have exposure to ${q04} in this space — a head start over most applicants.`);
  if (q06 && r.length < 3) r.push(`Your preferred work style ("${q06.toLowerCase()}") fits the daily rhythm of this niche.`);
  return r.slice(0,3);
}

// ─────────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────────
export default function NicheSelector() {
  const [phase, setPhase]   = useState("landing");
  const [qi, setQi]         = useState(0);
  const [ans, setAns]       = useState({});
  const [sel, setSel]       = useState(null);   // number | number[] | null
  const [result, setResult] = useState(null);
  const [brand, setBrand]   = useState("");
  const [bLoad, setBLoad]   = useState(false);
  const [bErr, setBErr]     = useState(false);
  const [copied, setCopied] = useState(false);
  const [aKey, setAKey]     = useState(0);
  const [email, setEmail]   = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const q = QS[qi];
  const pct = (qi / TOTAL) * 100;

  const start = () => { setAns({}); setQi(0); setSel(q?.multi ? [] : null); setAKey(k=>k+1); setPhase("quiz"); };

  const pick = (i) => {
    if (q.multi) {
      setSel(prev => {
        const arr = Array.isArray(prev) ? prev : [];
        return arr.includes(i) ? arr.filter(x => x !== i) : [...arr, i];
      });
    } else {
      setSel(i);
    }
  };

  const isSelected = (i) => q.multi ? (Array.isArray(sel) && sel.includes(i)) : sel === i;
  const canProceed = q?.multi ? true : sel !== null;

  const next = () => {
    if (!canProceed) return;
    const newAns = { ...ans, [q.id]: sel };
    setAns(newAns);
    if (qi < TOTAL - 1) {
      const nqi = qi + 1;
      const nq = QS[nqi];
      setQi(nqi);
      setSel(newAns[nq.id] ?? (nq.multi ? [] : null));
      setAKey(k=>k+1);
    } else {
      setPhase("calc");
      const r = computeScores(newAns);
      setTimeout(() => {
        setResult(r);
        setPhase("gate");
      }, 2200);
    }
  };

  const submitGate = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) { setEmailErr(true); return; }
    setEmailErr(false);
    try {
      const fd = new FormData();
      fd.append("email_address", email);
      fd.append("fields[source]", "niche-selector");
      await fetch("https://app.kit.com/forms/9147039/subscriptions", { method:"POST", body:fd });
    } catch(_) {}
    setPhase("results");
    if (result) {
      setBLoad(true); setBrand(""); setBErr(false);
      fetchBrandStatement(ans, result.primary, result.secondary)
        .then(s => { setBrand(s); setBLoad(false); })
        .catch(() => { setBErr(true); setBLoad(false); });
    }
  };

  const back = () => {
    if (qi === 0) { setPhase("landing"); return; }
    const pqi = qi - 1;
    const pq = QS[pqi];
    setQi(pqi);
    setSel(ans[pq.id] ?? (pq.multi ? [] : null));
    setAKey(k=>k+1);
  };

  const regen = () => {
    if (!result) return;
    setBLoad(true); setBrand(""); setBErr(false);
    fetchBrandStatement(ans, result.primary, result.secondary)
      .then(s => { setBrand(s); setBLoad(false); })
      .catch(() => { setBErr(true); setBLoad(false); });
  };

  const copy = () => {
    if (!brand) return;
    navigator.clipboard.writeText(brand).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const restart = () => { setPhase("landing"); setResult(null); setBrand(""); setAns({}); setQi(0); setSel(null); };

  const pn = result ? NICHES[result.primary] : null;
  const sn = result ? NICHES[result.secondary] : null;

  return (
    <div className="app">
      <style>{CSS}</style>

      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header className="hdr">
        <a className="brand" href="https://systems.marginmomentum.co">Margin &amp; Momentum™ · Niche Selector</a>
        {phase === "quiz" && (
          <span className="tag">{qi+1} / {TOTAL}</span>
        )}
        {phase === "results" && (
          <span className="tag">Diagnostic Complete</span>
        )}
      </header>

      {/* ══ PROGRESS ════════════════════════════════════════ */}
      {phase === "quiz" && (
        <div className="prog">
          <div className="prog-fill" style={{width:`${pct}%`}} />
        </div>
      )}

      {/* ══ LANDING ═════════════════════════════════════════ */}
      {phase === "landing" && (
        <main className="main">
          <span className="eyebrow fade-up">VA Launch System · Diagnostic Tool</span>
          <h1 className="big-title fade-up-1">
            Find Your<br/>
            <span className="outline-text">Perfect</span><br/>
            Niche.
          </h1>
          <div className="divider fade-up-2" />
          <p className="body-text fade-up-2">
            12 questions. A specific niche match from 12 high-demand VA specializations.
            An AI-written brand statement ready to paste into your resume and proposals.
          </p>

          <div className="meta-row fade-up-3">
            {[["12","Niches mapped"],["12","Questions"],["5 min","To complete"],["AI","Brand statement"]].map(([n,l]) => (
              <div className="meta-item" key={l}>
                <span className="meta-num">{n}</span>
                <span className="meta-lbl">{l}</span>
              </div>
            ))}
          </div>

          <div className="fade-up-4">
            <button className="btn-primary" onClick={start}>
              Start the Diagnostic →
            </button>
          </div>

          <div style={{marginTop:48, borderTop:"1px solid #ebebeb", paddingTop:32}}>
            <span className="section-lbl">12 niches covered</span>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {Object.values(NICHES).map(n => (
                <span key={n.label} style={{
                  fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.5px",
                  border:"1px solid #e0e0e0", padding:"5px 12px", color:"#555"
                }}>
                  {n.icon} {n.label}
                </span>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ══ QUIZ ════════════════════════════════════════════ */}
      {phase === "quiz" && (
        <main className="main" key={aKey}>
          <span className="eyebrow fade-up">{q.multi ? "Select all that apply" : `Question ${q.n} of ${TOTAL}`}</span>
          <h2 className="q-text fade-up-1">{q.text}</h2>
          <p className="q-sub fade-up-2">{q.sub}</p>

          {/* MULTI-SELECT (Q04 tools) */}
          {q.multi ? (
            <>
              {(Array.isArray(sel) && sel.length > 0) && (
                <span className="tools-note fade-up-2">
                  {sel.length} tool{sel.length > 1 ? "s" : ""} selected — click to deselect
                </span>
              )}
              {!(Array.isArray(sel) && sel.length > 0) && (
                <span className="tools-note fade-up-2">
                  No tools yet? That's fine — skip ahead and we'll build from scratch.
                </span>
              )}
              <div className="check-grid fade-up-3">
                {q.opts.map((opt, i) => (
                  <button
                    key={i}
                    className={`check-opt${isSelected(i) ? " sel" : ""}`}
                    onClick={() => pick(i)}
                  >
                    <span className="check-box">{isSelected(i) ? "✓" : ""}</span>
                    <span className="check-text">
                      {opt.t}
                      {opt.sub && <span style={{display:"block",opacity:0.6,fontSize:9,marginTop:2}}>{opt.sub}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* SINGLE SELECT */
            <div className="options fade-up-3">
              {q.opts.map((opt, i) => (
                <button
                  key={i}
                  className={`option${isSelected(i) ? " sel" : ""}`}
                  onClick={() => pick(i)}
                >
                  <span className="opt-marker">{isSelected(i) ? "✓" : (i+1)}</span>
                  <span className="opt-text">{opt.t}</span>
                </button>
              ))}
            </div>
          )}

          <div style={{display:"flex",gap:10,marginTop:4}} className="fade-up-4">
            <button className="btn-outline" onClick={back} style={{padding:"15px 24px"}}>← Back</button>
            <button
              className="btn-primary"
              onClick={next}
              disabled={!canProceed}
              style={{flex:1,justifyContent:"center"}}
            >
              {qi < TOTAL - 1 ? "Next →" : "See My Results →"}
            </button>
          </div>

          {q.multi && (
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"#ccc",letterSpacing:"1.5px",textAlign:"center",marginTop:14}}>
              Q{q.n} OF {TOTAL} · MULTI-SELECT
            </p>
          )}
        </main>
      )}

      {/* ══ CALCULATING ═════════════════════════════════════ */}
      {phase === "calc" && (
        <main className="main" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24,minHeight:"60vh"}}>
          <div className="spin" />
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:"1px",color:"#0a0a0a",textAlign:"center",marginBottom:8}}>
              Analyzing Your Profile
            </div>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"2px",color:"#aaa",textAlign:"center"}}>
              MAPPING SKILLS ACROSS 12 VA NICHES
            </p>
          </div>
        </main>
      )}

      {/* ══ RESULTS ═════════════════════════════════════════ */}
      {phase === "results" && result && pn && sn && (
        <main className="main">

          {/* Header */}
          <span className="eyebrow">Diagnostic Complete · Your Niche Match</span>
          <h1 className="big-title">
            You Are A<br/>
            <span className="outline-text">{pn.icon}</span><br/>
            {pn.label.split(" ").map((w,i) => <span key={i}>{w}<br/></span>)}
          </h1>
          <div className="divider" />
          <p className="body-text">
            Based on your background, skills, and goals — here is your full breakdown across all 12 niches.
          </p>

          {/* Primary niche card */}
          <div className="blk-box">
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"3px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",display:"block",marginBottom:14}}>
              Primary Recommendation
            </span>
            <div className="result-niche">{pn.label}</div>

            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              <span className="pill">🇵🇭 {pn.php}</span>
              <span className="pill">💵 {pn.usd}</span>
              <span className="pill">{pn.demand} Demand</span>
            </div>

            <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"1px",color:"rgba(255,255,255,0.45)",marginBottom:20}}>
              Mid-level target: <strong style={{color:"rgba(255,255,255,0.8)"}}>{pn.tier2}</strong>
            </p>

            {/* Why */}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:20,marginBottom:20}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"2.5px",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",display:"block",marginBottom:14}}>
                Why This Niche Fits Your Profile
              </span>
              {buildReasons(ans, result.primary).map((r,i) => (
                <div className="reason-item" key={i}>
                  <span className="reason-mark">✓</span>
                  <span className="reason-text">{r}</span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {pn.tools.map(t => <span className="tool-tag" key={t}>{t}</span>)}
            </div>
          </div>

          {/* AI Brand Statement */}
          <div className="brand-box">
            <span className="section-lbl" style={{marginBottom:16}}>
              ✦ AI-Generated · Your VA Brand Statement
            </span>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"1px",color:"#aaa",marginBottom:16}}>
              Paste directly into your resume, OnlineJobsPH profile, and proposals.
            </p>

            {bLoad && (
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0"}}>
                <div className="spin" style={{width:20,height:20,borderWidth:"1.5px"}} />
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"1.5px",color:"#aaa"}}>
                  GENERATING YOUR STATEMENT…
                </span>
              </div>
            )}

            {!bLoad && bErr && (
              <div style={{border:"1px solid #e0e0e0",padding:"14px 18px",marginBottom:16,background:"#fafafa"}}>
                <p style={{fontFamily:"'Libre Baskerville',serif",fontSize:13,color:"#666",lineHeight:1.6}}>
                  Couldn't reach the AI — check your connection and click Regenerate.
                </p>
              </div>
            )}

            {!bLoad && brand && (
              <>
                <div className="brand-quote">{brand}</div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn-primary" onClick={copy} style={{fontSize:9,padding:"12px 22px"}}>
                    {copied ? "✓ Copied!" : "Copy Statement"}
                  </button>
                  <button className="btn-outline" onClick={regen} style={{fontSize:9,padding:"11px 18px"}}>
                    ↺ Regenerate
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Secondary niche */}
          <div className="secondary-card">
            <span style={{fontSize:28,flexShrink:0}}>{sn.icon}</span>
            <div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"2.5px",color:"#aaa",textTransform:"uppercase",display:"block",marginBottom:6}}>
                Secondary Niche · Consider in 6–12 Months
              </span>
              <div style={{fontFamily:"'Libre Baskerville',serif",fontWeight:700,fontSize:18,color:"#0a0a0a",marginBottom:4}}>{sn.label}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#777"}}>{sn.php} · {sn.usd}</div>
            </div>
          </div>

          {/* Score bars */}
          <div style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #ebebeb"}}>
            <span className="section-lbl" style={{marginBottom:20}}>Full Compatibility Breakdown · All 12 Niches</span>
            {result.sorted.map(([id, sc]) => {
              const n = NICHES[id];
              const maxSc = result.sorted[0][1] || 1;
              const w = Math.round((sc / maxSc) * 100);
              const isPrimary = id === result.primary;
              return (
                <div className="score-row" key={id}>
                  <span className="score-icon">{n.icon}</span>
                  <span className={`score-lbl${isPrimary ? " primary" : ""}`}>{n.label}</span>
                  <div className="score-track">
                    <div className={`score-fill${isPrimary ? "" : " secondary"}`} style={{width:`${w}%`}} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next steps */}
          <div style={{marginBottom:40}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:"1px",color:"#0a0a0a",marginBottom:28}}>
              Your Next 3 Steps
            </h3>
            <div className="step-grid">
              {[
                `Copy your brand statement above and paste it into the Professional Summary section of your <strong>${pn.label}</strong> resume template in <strong>Module 1</strong>.`,
                `Open <strong>Module 2</strong> and complete the practice project kit for the <strong>${pn.label}</strong> niche. Do not send a single application before your portfolio is live.`,
                `Run the <strong>7-Day First Client Sprint</strong> (Module 3) using the proposal templates for the <strong>${pn.label}</strong> niche. Target: 5 applications per day from Day 1.`,
              ].map((txt, i) => (
                <>
                  <span className="step-num" key={`n-${i}`}>{String(i+1).padStart(2,"0")}</span>
                  <div className="step-text" key={`t-${i}`}
                    dangerouslySetInnerHTML={{__html: txt.replace(/<strong>/g,'<strong style="color:#0a0a0a">')}} />
                </>
              ))}
            </div>
          </div>

          {/* Rate reference */}
          <div style={{marginBottom:40}}>
            <span className="section-lbl" style={{marginBottom:0}}>All 12 Niche Rate Ranges · 2025–2026 Philippine VA Market</span>
            <div style={{border:"1.5px solid #0a0a0a",overflow:"hidden",marginTop:16}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr",background:"#0a0a0a",padding:"8px 12px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"2px",color:"rgba(255,255,255,0.4)",flex:1}}>NICHE</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"2px",color:"rgba(255,255,255,0.4)",width:160}}>PHILIPPINES</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"2px",color:"rgba(255,255,255,0.4)",width:80}}>USD/HR</span>
                </div>
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

          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="btn-outline" onClick={restart}>↺ Retake Diagnostic</button>
          </div>
        </main>
      )}

      {/* ══ GATE ════════════════════════════════════════════ */}
      {phase === "gate" && (
        <main className="main fade-up">
          <span className="eyebrow">Diagnostic Complete · Your Result Is Ready</span>
          <h2 className="q-text" style={{marginBottom:8}}>One last step.</h2>
          <p className="q-sub" style={{marginBottom:32}}>
            Your niche match and AI-written brand statement are ready. Enter your email to unlock them — we'll also send you the free tools built for your niche.
          </p>
          <div className="gate-wrap">
            <div className="gate-teaser">
              <span className="gate-teaser-label">Your Primary Niche</span>
              <div className="gate-teaser-text">████████ ██</div>
              <span className="gate-teaser-hint">↓ Enter your email to reveal</span>
            </div>
            <div className="gate-input-wrap">
              <input
                className={`gate-input${emailErr ? " err" : ""}`}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailErr(false); }}
                onKeyDown={e => e.key === "Enter" && submitGate()}
              />
              <button className="btn-primary" onClick={submitGate} style={{whiteSpace:"nowrap"}}>
                Reveal My Niche →
              </button>
            </div>
            {emailErr && (
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"1.5px",color:"#c00",textTransform:"uppercase",display:"block",marginBottom:8}}>
                Please enter a valid email address.
              </span>
            )}
            <span className="gate-note">No spam. No upsells. Just your result and the free tools.</span>
          </div>
        </main>
      )}


      <footer className="ftr">
        <span className="ftr-l">Margin &amp; Momentum™ · Systems Over Hustle™</span>
        <span className="ftr-r">Niche Selector Engine · 12 Niches · <a href="https://systems.marginmomentum.co" style={{color:"#fff",textDecoration:"none",letterSpacing:"2px"}}>← Back to Free Tools</a></span>
      </footer>
    </div>
  );
}
