import { useState, useEffect } from "react";

const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');`;

const CSS=`
*{box-sizing:border-box;margin:0;padding:0;}body{background:#080810;}
:root{--bg:#080810;--s:#0f0f1a;--s2:#161624;--b:#1f1f33;--b2:#2a2a44;--a:#c8a96e;--a2:#9b7fd4;--a3:#6ecfa8;--d:#e06b6b;--w:#e0a86b;--t:#e8e4dc;--m:#6a6880;--m2:#8a88a0;--fd:'Cormorant Garamond',serif;--fm:'JetBrains Mono',monospace;--fb:'Outfit',sans-serif;}
/* ── SIDEBAR LAYOUT ── */
.app{min-height:100vh;background:var(--bg);color:var(--t);font-family:var(--fb);font-weight:300;display:flex;}
.sidebar{width:220px;min-height:100vh;background:var(--s);border-right:1px solid var(--b);display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;bottom:0;z-index:50;overflow-y:auto;scrollbar-width:none;transition:transform 0.25s ease;}
.sidebar::-webkit-scrollbar{display:none;}
.sidebar.collapsed{transform:translateX(-220px);}
.sb-top{padding:16px 16px 12px;border-bottom:1px solid var(--b);flex-shrink:0;}
.logo{font-family:var(--fd);font-size:22px;font-weight:600;color:var(--a);letter-spacing:0.02em;display:block;margin-bottom:3px;}
.tline{font-family:var(--fm);font-size:9px;color:var(--m);letter-spacing:0.1em;text-transform:uppercase;}
.sb-tools{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;padding:8px 12px;border-bottom:1px solid var(--b);}
.sb-tool-btn{display:flex;align-items:center;justify-content:center;height:32px;border-radius:6px;border:1px solid var(--b2);background:transparent;cursor:pointer;font-size:13px;color:var(--m2);transition:all 0.15s;padding:0;}
.sb-tool-btn:hover{border-color:var(--a);color:var(--a);background:rgba(200,169,110,0.06);}
.sb-tool-btn.danger:hover{border-color:var(--d);color:var(--d);background:rgba(224,107,107,0.06);}
.sb-nav{flex:1;padding:8px 0;}
.sb-group{margin-bottom:2px;}
.sb-group-hdr{display:flex;align-items:center;justify-content:space-between;padding:7px 18px 4px;cursor:pointer;user-select:none;}
.sb-group-label{font-family:var(--fm);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);}
.sb-group-chev{font-size:9px;color:var(--m);transition:transform 0.2s;}
.sb-group-chev.open{transform:rotate(90deg);}
.sb-item{display:flex;align-items:center;gap:9px;padding:8px 18px 8px 24px;cursor:pointer;border-radius:0;transition:background 0.15s;position:relative;border:none;background:transparent;width:100%;text-align:left;}
.sb-item:hover{background:rgba(255,255,255,0.04);}
.sb-item.active{background:rgba(200,169,110,0.1);}
.sb-item.active::before{content:'';position:absolute;left:0;top:4px;bottom:4px;width:3px;background:var(--a);border-radius:0 2px 2px 0;}
.sb-icon{font-size:13px;flex-shrink:0;width:18px;text-align:center;}
.sb-label{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;color:var(--m2);flex:1;}
.sb-item.active .sb-label{color:var(--a);}
.sb-item:hover .sb-label{color:var(--t);}
.sb-badge{min-width:16px;height:16px;border-radius:8px;font-family:var(--fm);font-size:8px;font-weight:600;display:flex;align-items:center;justify-content:center;padding:0 4px;}
/* Main content area */
.main{margin-left:220px;flex:1;min-height:100vh;transition:margin-left 0.25s ease;display:flex;flex-direction:column;}
.main.full{margin-left:0;}
.main.full .con{margin:0 auto;}
.main.full .topbar{max-width:980px;margin:0 auto;width:100%;}
.topbar{display:flex;align-items:center;gap:8px;padding:14px 24px;border-bottom:1px solid var(--b);background:var(--bg);position:sticky;top:0;z-index:40;}
.burger{background:transparent;border:1px solid var(--b2);border-radius:6px;padding:6px 10px;cursor:pointer;color:var(--m);font-size:14px;line-height:1;flex-shrink:0;}
.burger:hover{border-color:var(--a);color:var(--a);}
.topbar-title{font-family:var(--fd);font-size:18px;font-weight:600;font-style:italic;color:var(--t);flex:1;}
.con{padding:24px;max-width:980px;margin:0 auto;width:100%;box-sizing:border-box;}
/* overlay for mobile */
.sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:49;}
@media(max-width:768px){
  .sidebar{transform:translateX(-220px);}
  .sidebar.open{transform:translateX(0);}
  .main{margin-left:0!important;}
  .sb-overlay{display:block;}
  .sidebar.collapsed{transform:translateX(-220px);}
}
.sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px;}
.st{font-family:var(--fd);font-size:22px;font-weight:600;color:var(--t);font-style:italic;}
.btn{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:7px 15px;border-radius:4px;cursor:pointer;border:none;transition:all 0.2s;}
.bp{background:var(--a);color:#080810;font-weight:500;}.bp:hover{background:#d4b87a;}
.bg{background:transparent;color:var(--m2);border:1px solid var(--b2);}.bg:hover{border-color:var(--a);color:var(--a);}
.bd{background:transparent;color:var(--d);border:1px solid transparent;padding:3px 7px;font-size:10px;cursor:pointer;transition:all 0.2s;font-family:var(--fm);}.bd:hover{border-color:var(--d);}
.ov{position:fixed;inset:0;background:rgba(8,8,16,0.9);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px;}
.md{background:var(--s2);border:1px solid var(--b2);border-radius:12px;padding:26px;width:100%;max-width:520px;box-shadow:0 40px 80px rgba(0,0,0,0.6);max-height:90vh;overflow-y:auto;}
.mdt{font-family:var(--fd);font-size:19px;font-weight:600;font-style:italic;color:var(--a);margin-bottom:20px;}
.f{margin-bottom:14px;}.f label{display:block;font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:6px;}
.f input,.f select,.f textarea{width:100%;background:var(--s);border:1px solid var(--b2);border-radius:6px;padding:8px 12px;color:var(--t);font-family:var(--fb);font-size:14px;font-weight:300;outline:none;transition:border-color 0.2s;}
.f input:focus,.f select:focus,.f textarea:focus{border-color:var(--a);}
.f select option{background:var(--s2);}
.f textarea{resize:vertical;min-height:80px;}
.ma{display:flex;gap:10px;justify-content:flex-end;margin-top:20px;}
.empty{text-align:center;padding:50px 0;color:var(--m);}
.ei{font-size:28px;margin-bottom:10px;opacity:0.35;}
.et{font-family:var(--fm);font-size:11px;letter-spacing:0.06em;}
.tag{font-family:var(--fm);font-size:10px;letter-spacing:0.05em;padding:2px 7px;border-radius:3px;text-transform:uppercase;}
.stabs{display:flex;gap:7px;margin-bottom:18px;flex-wrap:wrap;}
.stab{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:6px 14px;border-radius:4px;border:1px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.stab.act{background:rgba(200,169,110,0.1);border-color:var(--a);color:var(--a);}
.card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:16px 20px;margin-bottom:10px;}
.card:hover{border-color:var(--b2);}
.ar{display:flex;gap:7px;margin-top:8px;}
.inp{flex:1;background:var(--s2);border:1px solid var(--b);border-radius:6px;padding:7px 10px;color:var(--t);font-family:var(--fb);font-size:13px;font-weight:300;outline:none;}
.inp:focus{border-color:var(--b2);}
.ba{background:var(--s2);border:1px solid var(--b2);border-radius:6px;padding:6px 12px;color:var(--a);font-size:16px;cursor:pointer;line-height:1;}
.ba:hover{background:rgba(200,169,110,0.08);}

/* HOME */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
@keyframes pulseRing{0%,100%{opacity:1;}50%{opacity:0.6;}}
@keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.home-wrap{display:flex;flex-direction:column;gap:18px;animation:fadeUp 0.4s ease;}
/* Identity bar */
.id-bar{display:flex;align-items:center;gap:18px;background:linear-gradient(135deg,rgba(200,169,110,0.07) 0%,rgba(155,127,212,0.04) 100%);border:1px solid rgba(200,169,110,0.18);border-radius:14px;padding:20px 24px;position:relative;overflow:hidden;}
.id-bar::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 50%,rgba(155,127,212,0.08) 0%,transparent 60%);pointer-events:none;}
.avatar{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:22px;font-weight:600;color:#080810;flex-shrink:0;position:relative;cursor:pointer;transition:transform 0.15s;}
.avatar:hover{transform:scale(1.05);}
.avatar-edit-hint{position:absolute;bottom:-1px;right:-1px;width:18px;height:18px;border-radius:50%;background:var(--s2);border:1.5px solid var(--b2);display:flex;align-items:center;justify-content:center;font-size:9px;}
.emoji-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin-top:8px;}
.emoji-opt{font-size:20px;padding:6px;border-radius:6px;cursor:pointer;text-align:center;border:2px solid transparent;transition:all 0.15s;background:var(--s);}
.emoji-opt:hover{border-color:var(--b2);}
.emoji-opt.sel{border-color:var(--a);background:rgba(200,169,110,0.1);}
.color-grid{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;}
.color-swatch{width:28px;height:28px;border-radius:50%;cursor:pointer;transition:transform 0.15s;border:3px solid transparent;}
.color-swatch:hover{transform:scale(1.1);}
.color-swatch.sel{border-color:white;}
.avatar-ring{position:absolute;inset:-3px;border-radius:50%;border:2px solid transparent;background:linear-gradient(135deg,var(--a),var(--a2)) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:destination-out;mask-composite:exclude;}
.id-body{flex:1;}
.id-name{font-family:var(--fd);font-size:22px;font-weight:600;color:var(--t);line-height:1.2;}
.id-date{font-family:var(--fm);font-size:10px;color:var(--m);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:7px;}
.id-status-wrap{display:flex;align-items:center;gap:8px;}
.id-status{background:transparent;border:none;border-bottom:1px solid var(--b2);outline:none;color:var(--m2);font-family:var(--fm);font-size:11px;letter-spacing:0.04em;width:100%;max-width:380px;padding:3px 0;}
.id-status:focus{border-bottom-color:var(--a);color:var(--t);}
.id-streak{display:flex;align-items:center;gap:5px;font-family:var(--fm);font-size:11px;color:var(--a);background:rgba(200,169,110,0.1);padding:5px 11px;border-radius:20px;border:1px solid rgba(200,169,110,0.2);flex-shrink:0;}
/* Alert strip */
.alert-strip{display:flex;flex-direction:column;gap:7px;}
.alert-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-size:12px;}
.alert-warn{background:rgba(224,107,107,0.07);border:1px solid rgba(224,107,107,0.2);color:var(--d);}
.alert-info{background:rgba(224,168,107,0.07);border:1px solid rgba(224,168,107,0.2);color:var(--w);}
.alert-ok{background:rgba(110,207,168,0.07);border:1px solid rgba(110,207,168,0.2);color:var(--a3);}
.alert-icon{font-size:14px;flex-shrink:0;}
.alert-text{flex:1;font-family:var(--fm);font-size:10px;letter-spacing:0.04em;}
.alert-action{font-family:var(--fm);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:inherit;opacity:0.7;cursor:pointer;border:none;background:none;text-decoration:underline;}
/* Main grid */
.home-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;align-items:start;}
.home-col{display:flex;flex-direction:column;gap:14px;}
/* Quick add */
.quick-add{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.qa-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:9px;}
.qa-modes{display:flex;gap:6px;margin-bottom:10px;}
.qa-mode{font-family:var(--fm);font-size:9px;letter-spacing:0.07em;text-transform:uppercase;padding:4px 10px;border-radius:3px;border:1px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.15s;}
.qa-mode.act{background:rgba(200,169,110,0.12);border-color:var(--a);color:var(--a);}
/* Today card */
.today-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.tc-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:10px;}
.tc-focus-inp{width:100%;background:transparent;border:none;border-bottom:1px solid var(--b2);outline:none;color:var(--a);font-family:var(--fm);font-size:11px;padding:4px 0;margin-bottom:12px;letter-spacing:0.04em;}
.tc-focus-inp:focus{border-bottom-color:var(--a);}
.tc-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--b);}
.tc-row:last-child{border-bottom:none;}
.tc-cb{width:13px;height:13px;border:1.5px solid var(--b2);border-radius:3px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px;transition:all 0.15s;}
.tc-cb.ck{background:var(--a3);border-color:var(--a3);color:#080810;}
.tc-text{flex:1;font-size:12px;color:var(--t);}
.tc-text.dn{text-decoration:line-through;color:var(--m);}
/* Timer live badge */
.timer-live{display:flex;align-items:center;gap:10px;background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.2);border-radius:8px;padding:10px 13px;margin-top:4px;}
.tl-dot{width:7px;height:7px;border-radius:50%;background:var(--a);animation:pulseRing 1.2s infinite;}
.tl-label{flex:1;font-family:var(--fm);font-size:10px;color:var(--a);}
.tl-time{font-family:var(--fm);font-size:14px;color:var(--a);font-weight:500;}
.tl-stop{font-family:var(--fm);font-size:9px;color:var(--d);background:transparent;border:1px solid rgba(224,107,107,0.3);border-radius:3px;padding:3px 8px;cursor:pointer;}
/* Progress rings cluster */
.rings-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
.ring-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 10px;text-align:center;cursor:pointer;transition:all 0.15s;}
.ring-card:hover{border-color:var(--b2);transform:translateY(-1px);}
.ring-lbl{font-family:var(--fm);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);margin-top:6px;}
/* Sparklines */
.sparkline-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.sp-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.sp-title{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);}
.sp-val{font-family:var(--fm);font-size:13px;font-weight:500;}
.sp-chart{display:flex;align-items:flex-end;gap:3px;height:36px;}
.sp-bar{flex:1;border-radius:2px 2px 0 0;min-height:2px;transition:height 0.3s;}
.sp-days{display:flex;gap:3px;margin-top:4px;}
.sp-day{flex:1;font-family:var(--fm);font-size:8px;color:var(--m);text-align:center;}
/* Achievement feed */
.feed-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.feed-title{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:12px;}
.feed-tabs{display:flex;gap:6px;margin-bottom:12px;}
.feed-tab{font-family:var(--fm);font-size:9px;letter-spacing:0.07em;text-transform:uppercase;padding:3px 10px;border-radius:3px;border:1px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.15s;}
.feed-tab.act{background:rgba(200,169,110,0.1);border-color:var(--a);color:var(--a);}
.feed-item{display:flex;align-items:flex-start;gap:9px;padding:7px 0;border-bottom:1px solid var(--b);}
.feed-item:last-child{border-bottom:none;}
.feed-icon{font-size:13px;flex-shrink:0;margin-top:1px;}
.feed-body{flex:1;}
.feed-text{font-size:12px;color:var(--t);line-height:1.4;}
.feed-time{font-family:var(--fm);font-size:9px;color:var(--m);}
/* Quote */
.quote-card{background:linear-gradient(135deg,rgba(155,127,212,0.06) 0%,rgba(15,15,26,0) 100%);border:1px solid rgba(155,127,212,0.15);border-radius:10px;padding:16px 20px;}
.quote-text{font-family:var(--fd);font-size:16px;font-style:italic;color:var(--t);line-height:1.5;margin-bottom:7px;}
.quote-author{font-family:var(--fm);font-size:9px;color:var(--m);letter-spacing:0.1em;text-transform:uppercase;}
/* Exam banner */
.exam-banner{background:rgba(224,107,107,0.07);border:1px solid rgba(224,107,107,0.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px;}
.eb-days{font-family:var(--fd);font-size:28px;font-weight:600;color:var(--d);line-height:1;flex-shrink:0;}
.eb-body{flex:1;}
.eb-sub{font-size:13px;color:var(--t);}
.eb-date{font-family:var(--fm);font-size:10px;color:var(--m);}
/* Monthly summary */
.month-summary{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;}
.ms-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:10px;}
.ms-row{display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.ms-name{flex:1;font-size:12px;color:var(--m2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ms-bar{width:80px;height:4px;background:var(--b2);border-radius:2px;overflow:hidden;flex-shrink:0;}
.ms-fill{height:100%;border-radius:2px;transition:width 0.4s;}
.ms-pct{font-family:var(--fm);font-size:10px;color:var(--m2);min-width:28px;text-align:right;}
@media(max-width:720px){.home-grid{grid-template-columns:1fr!important;}.rings-grid{grid-template-columns:repeat(3,1fr)!important;}}
/* GOALS — bento grid */
.goals-view-toggle{display:flex;gap:7px;}
.gvt{font-family:var(--fm);font-size:10px;letter-spacing:0.07em;text-transform:uppercase;padding:5px 12px;border-radius:4px;border:1px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.gvt.act{background:rgba(200,169,110,0.1);border-color:var(--a);color:var(--a);}
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:start;}
.gc-hero{grid-column:span 2;}
.gc{border-radius:12px;padding:20px;position:relative;overflow:hidden;transition:transform 0.15s,box-shadow 0.15s;}
.gc:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.35);}
.gc-Project{background:linear-gradient(135deg,rgba(200,169,110,0.10) 0%,rgba(15,15,26,0) 60%);border:1px solid rgba(200,169,110,0.22);}
.gc-Learning{background:linear-gradient(135deg,rgba(155,127,212,0.10) 0%,rgba(15,15,26,0) 60%);border:1px solid rgba(155,127,212,0.22);}
.gc-Career{background:linear-gradient(135deg,rgba(110,207,168,0.10) 0%,rgba(15,15,26,0) 60%);border:1px solid rgba(110,207,168,0.22);}
.gc-Health{background:linear-gradient(135deg,rgba(224,107,107,0.10) 0%,rgba(15,15,26,0) 60%);border:1px solid rgba(224,107,107,0.22);}
.gc-Personal{background:linear-gradient(135deg,rgba(110,207,168,0.08) 0%,rgba(15,15,26,0) 60%);border:1px solid rgba(110,207,168,0.18);}
.gc-glow{position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;filter:blur(40px);opacity:0.18;pointer-events:none;}
.gc.completed{opacity:0.6;}.gc.completed .g-title{text-decoration:line-through;color:var(--m2);}
@keyframes burst{0%{opacity:1;transform:scale(0.5);}60%{opacity:1;transform:scale(1.3);}100%{opacity:0;transform:scale(1.8);}}
.burst{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:48px;animation:burst 0.7s ease-out forwards;pointer-events:none;z-index:10;}
.g-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;gap:10px;}
.g-title{font-family:var(--fd);font-size:18px;font-weight:600;color:var(--t);flex:1;line-height:1.3;}
.gc-hero .g-title{font-size:22px;}
.g-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;align-items:center;}
.g-context{font-family:var(--fm);font-size:10px;color:var(--m2);letter-spacing:0.04em;margin-bottom:12px;line-height:1.5;}
.g-context.warn{color:var(--d);}.g-context.ok{color:var(--a3);}
.sg-section{border-top:1px solid rgba(255,255,255,0.06);padding-top:10px;margin-top:8px;}
.sg-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:6px;}
.sg-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.sg-row{display:flex;align-items:center;gap:8px;padding:4px 0;}
.sg-cb{width:12px;height:12px;border:1.5px solid var(--b2);border-radius:3px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px;transition:all 0.15s;}
.sg-cb.ck{background:var(--a3);border-color:var(--a3);color:#080810;}
.sg-text{flex:1;font-size:12px;color:var(--m2);}.sg-text.dn{text-decoration:line-through;color:var(--m);}
.sg-add{font-family:var(--fm);font-size:9px;color:var(--m);background:none;border:1px dashed var(--b2);border-radius:3px;padding:2px 8px;cursor:pointer;margin-top:5px;transition:all 0.15s;width:100%;text-align:left;}
.sg-add:hover{border-color:var(--a);color:var(--a);}
.gtl-wrap{overflow-x:auto;padding-bottom:8px;}
.gtl{position:relative;min-width:600px;}
.gtl-axis{display:flex;border-bottom:1px solid var(--b);margin-bottom:16px;padding-bottom:6px;}
.gtl-month{flex:1;font-family:var(--fm);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);text-align:center;}
.gtl-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.gtl-name{font-size:12px;color:var(--m2);min-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:right;flex-shrink:0;}
.gtl-bar-wrap{flex:1;position:relative;height:22px;}
.gtl-bar{height:22px;border-radius:5px;position:absolute;display:flex;align-items:center;padding:0 8px;font-family:var(--fm);font-size:9px;color:#080810;font-weight:500;overflow:hidden;white-space:nowrap;}
.gtl-today{position:absolute;top:0;bottom:0;width:2px;background:var(--d);opacity:0.6;border-radius:1px;}
@media(max-width:720px){.bento{grid-template-columns:1fr!important;}.gc-hero{grid-column:span 1!important;}}

/* TASKS */
.ts{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.quad{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;min-height:140px;}
.qh{display:flex;align-items:center;gap:7px;margin-bottom:11px;}
.qdot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.ql{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;}
.qs{font-size:10px;color:var(--m);margin-left:auto;font-family:var(--fm);}
.ti{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--b);}
.ti:last-child{border-bottom:none;}
.tcb{width:14px;height:14px;border:1.5px solid var(--b2);border-radius:3px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;transition:all 0.15s;background:transparent;}
.tcb.ck{background:var(--a);border-color:var(--a);color:#080810;}
.tt{flex:1;font-size:13px;transition:all 0.2s;}
.tt.dn{text-decoration:line-through;color:var(--m);}

/* WEEK */
.wg{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;}
.dc{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:11px 9px;min-height:140px;}
.dc.td{border-color:rgba(200,169,110,0.4);background:rgba(200,169,110,0.04);}
.dname{font-family:var(--fm);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);}
.dnum{font-family:var(--fd);font-size:18px;font-weight:600;color:var(--t);line-height:1.1;margin-top:2px;margin-bottom:8px;}
.td .dnum{color:var(--a);}
.dev{font-size:11px;padding:3px 6px;border-radius:4px;margin-bottom:4px;background:rgba(155,127,212,0.1);color:var(--a2);border:1px solid rgba(155,127,212,0.15);display:flex;align-items:center;justify-content:space-between;gap:4px;}
.devd{opacity:0;font-size:10px;color:var(--m);cursor:pointer;flex-shrink:0;}.dev:hover .devd{opacity:1;}
.dadd{font-family:var(--fm);font-size:10px;color:var(--m);background:none;border:1px dashed var(--b);border-radius:4px;padding:3px 6px;cursor:pointer;width:100%;text-align:left;margin-top:4px;}
.dadd:hover{border-color:var(--b2);color:var(--m2);}
.dinp{width:100%;background:var(--s2);border:1px solid var(--b2);border-radius:4px;padding:4px 7px;color:var(--t);font-family:var(--fb);font-size:11px;outline:none;margin-top:4px;}

/* PROJECTS */
.ptabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
.ptab{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;padding:5px 12px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.ptab.act{color:#080810;font-weight:500;}
.kb{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.kcol{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:13px;min-height:270px;}
.kch{display:flex;align-items:center;gap:7px;margin-bottom:12px;}
.kcd{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.kcl{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;}
.kcc{font-family:var(--fm);font-size:10px;color:var(--m);margin-left:auto;background:var(--s2);padding:1px 7px;border-radius:10px;}
.kcard{background:var(--s2);border:1px solid var(--b);border-radius:7px;padding:9px 11px;margin-bottom:6px;}
.kct{font-size:13px;color:var(--t);margin-bottom:6px;line-height:1.4;}
.kcf{display:flex;justify-content:space-between;align-items:center;}
.kcas{display:flex;gap:3px;flex-wrap:wrap;}
.kmv{font-family:var(--fm);font-size:9px;padding:2px 6px;border-radius:3px;cursor:pointer;border:1px solid var(--b2);background:transparent;color:var(--m);transition:all 0.15s;}
.kmv:hover{color:var(--t);}
.kadd{width:100%;background:transparent;border:1px dashed var(--b);border-radius:7px;padding:7px;font-family:var(--fm);font-size:10px;color:var(--m);cursor:pointer;text-align:left;margin-top:3px;}
.kadd:hover{border-color:var(--b2);color:var(--m2);}
.ki{width:100%;background:var(--s);border:1px solid var(--a);border-radius:6px;padding:7px 10px;color:var(--t);font-family:var(--fb);font-size:13px;font-weight:300;outline:none;margin-bottom:5px;}

/* PLACEMENTS */
.pipe{display:flex;overflow-x:auto;gap:3px;margin-bottom:20px;}
.sp{flex-shrink:0;text-align:center;padding:6px 0;flex:1;min-width:72px;}
.spi{font-family:var(--fm);font-size:9px;letter-spacing:0.07em;text-transform:uppercase;padding:5px 8px;border-radius:4px;cursor:pointer;border:1px solid var(--b);background:var(--s);color:var(--m);transition:all 0.2s;}
.spi.act{color:#080810;font-weight:500;}
.sc{font-family:var(--fm);font-size:16px;font-weight:500;margin-top:3px;}
.acard{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 18px;margin-bottom:8px;display:flex;flex-direction:column;gap:0;}
.acard:hover{border-color:var(--b2);}
.asdot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.ab{flex:1;}
.aco{font-size:15px;font-weight:500;color:var(--t);margin-bottom:2px;}
.aro{font-size:12px;color:var(--m2);margin-bottom:6px;}
.am{display:flex;gap:6px;flex-wrap:wrap;align-items:center;}
.aact{display:flex;gap:6px;align-items:center;}
.gsel{background:var(--s2);border:1px solid var(--b2);border-radius:4px;padding:4px 8px;color:var(--t);font-family:var(--fm);font-size:11px;outline:none;cursor:pointer;}
.gsel:focus{border-color:var(--a);}

/* INTERVIEW PREP */
.ic{background:var(--s);border:1px solid var(--b);border-radius:10px;margin-bottom:10px;overflow:hidden;}
.ich{display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;}
.ich:hover{background:rgba(255,255,255,0.02);}
.icn{flex:1;font-size:14px;font-weight:500;color:var(--t);}
.icbody{border-top:1px solid var(--b);padding:16px 18px;background:var(--s2);}
.round-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--b);}
.round-row:last-child{border-bottom:none;}
.round-num{font-family:var(--fm);font-size:10px;color:var(--a);min-width:60px;}
.round-body{flex:1;font-size:13px;color:var(--m2);line-height:1.5;}
.round-status{font-family:var(--fm);font-size:10px;padding:2px 8px;border-radius:3px;}

/* RESUME VERSIONS */
.rv-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 18px;margin-bottom:8px;}
.rv-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
.rv-name{font-size:14px;font-weight:500;color:var(--t);}
.rv-date{font-family:var(--fm);font-size:10px;color:var(--m);}
.rv-companies{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:7px;}
.rv-changes{font-size:12px;color:var(--m2);line-height:1.5;}

/* PREP / CS CORE */
.csgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.cscard{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:15px;}
.csch{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
.csn{font-size:14px;font-weight:500;color:var(--t);}
.csp{font-family:var(--fm);font-size:12px;color:var(--a3);}
.trow{display:flex;align-items:center;gap:7px;padding:5px 0;border-bottom:1px solid var(--b);}
.trow:last-child{border-bottom:none;}
.tn{flex:1;font-size:12px;color:var(--m2);}
.topics-scroll{max-height:232px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--b2) transparent;border-radius:4px;}
.topics-scroll::-webkit-scrollbar{width:4px;}
.topics-scroll::-webkit-scrollbar-track{background:transparent;}
.topics-scroll::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px;}
.topics-scroll::-webkit-scrollbar-thumb:hover{background:var(--border2);}
.cbs{display:flex;gap:3px;}
.cb{font-family:var(--fm);font-size:9px;padding:2px 6px;border-radius:3px;cursor:pointer;border:1px solid transparent;transition:all 0.15s;}
.cb.not_started{background:rgba(106,104,128,0.15);color:var(--m);border-color:var(--b);}
.cb.shaky{background:rgba(224,168,107,0.15);color:var(--w);border-color:rgba(224,168,107,0.3);}
.cb.confident{background:rgba(110,207,168,0.15);color:var(--a3);border-color:rgba(110,207,168,0.3);}

/* DSA */
.dsa-toolbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:18px;}
.dfb{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:5px 11px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.dfb.act{background:rgba(155,127,212,0.12);border-color:var(--a2);color:var(--a2);}
.dsor{background:var(--s2);border:1px solid var(--b2);border-radius:6px;padding:5px 10px;color:var(--m2);font-family:var(--fm);font-size:10px;outline:none;cursor:pointer;margin-left:auto;}
.dtc{background:var(--s);border:1px solid var(--b);border-radius:10px;margin-bottom:9px;overflow:hidden;}
.dtc:hover{border-color:var(--b2);}
.dth{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer;}
.dtn{flex:1;font-size:14px;font-weight:500;color:var(--t);}
.dtcat{font-family:var(--fm);font-size:9px;letter-spacing:0.06em;text-transform:uppercase;padding:2px 7px;border-radius:3px;background:rgba(155,127,212,0.1);color:var(--a2);border:1px solid rgba(155,127,212,0.2);}
.dpw{display:flex;align-items:center;gap:7px;}
.dpb{width:60px;height:3px;background:var(--b2);border-radius:2px;overflow:hidden;}
.dpbf{height:100%;border-radius:2px;transition:width 0.3s;}
.dpt{font-family:var(--fm);font-size:10px;color:var(--m2);min-width:32px;}
.dcf{display:flex;gap:3px;}
.dcd{font-size:12px;cursor:pointer;opacity:0.25;transition:all 0.1s;}
.dcd.lit{opacity:1;}
.dchev{font-family:var(--fm);font-size:11px;color:var(--m);transition:transform 0.2s;flex-shrink:0;}
.dchev.open{transform:rotate(90deg);}
.dtbody{border-top:1px solid var(--b);padding:13px 15px;background:var(--s2);}
.dtmr{display:flex;gap:14px;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;}
.dtmf{display:flex;flex-direction:column;gap:4px;}
.dtml{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.dtni{background:var(--s);border:1px solid var(--b2);border-radius:5px;padding:5px 9px;color:var(--t);font-family:var(--fb);font-size:12px;font-weight:300;outline:none;width:200px;}
.dtni:focus{border-color:var(--a);}
.dtxi{background:var(--s);border:1px solid var(--b2);border-radius:5px;padding:5px 9px;color:var(--t);font-family:var(--fm);font-size:12px;outline:none;width:56px;text-align:center;}
.dtxi:focus{border-color:var(--a);}
.prob-list{display:flex;flex-direction:column;gap:5px;margin-bottom:9px;}
.prob-row{display:flex;align-items:center;gap:8px;padding:6px 9px;background:var(--s);border:1px solid var(--b);border-radius:7px;}
.prob-ck{width:13px;height:13px;border:1.5px solid var(--b2);border-radius:3px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;transition:all 0.15s;}
.prob-ck.done{background:var(--a3);border-color:var(--a3);color:#080810;}
.prob-name{flex:1;font-size:12px;color:var(--t);}
.prob-name.done{text-decoration:line-through;color:var(--m);}
.prob-diff{font-family:var(--fm);font-size:9px;padding:2px 6px;border-radius:3px;font-weight:500;}
.prob-link{font-family:var(--fm);font-size:10px;color:var(--a2);text-decoration:none;}
.prob-link:hover{text-decoration:underline;}
.prob-form{background:var(--s);border:1px solid var(--b2);border-radius:8px;padding:11px;display:flex;flex-direction:column;gap:7px;}
.pfr{display:flex;gap:7px;}
.pi2{flex:1;background:var(--s2);border:1px solid var(--b2);border-radius:5px;padding:5px 9px;color:var(--t);font-family:var(--fb);font-size:12px;font-weight:300;outline:none;}
.pi2:focus{border-color:var(--a);}
.pdsel{background:var(--s2);border:1px solid var(--b2);border-radius:5px;padding:5px 8px;color:var(--t);font-family:var(--fm);font-size:11px;outline:none;cursor:pointer;}
.apb{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:5px 12px;border-radius:5px;background:transparent;border:1px dashed var(--b2);color:var(--m);cursor:pointer;transition:all 0.15s;}
.apb:hover{border-color:var(--a3);color:var(--a3);}

/* ACADEMICS */
.exam-countdown{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:9px;margin-bottom:20px;}
.exam-card{background:var(--s);border:1px solid var(--b);border-radius:9px;padding:13px;text-align:center;}
.exam-days{font-family:var(--fm);font-size:28px;font-weight:500;line-height:1;margin-bottom:4px;}
.exam-sub{font-size:12px;color:var(--m2);margin-bottom:3px;}
.exam-date{font-family:var(--fm);font-size:10px;color:var(--m);}
.attbl{width:100%;border-collapse:collapse;}
.attbl th{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);padding:9px 12px;text-align:left;border-bottom:1px solid var(--b);}
.attbl td{padding:10px 12px;border-bottom:1px solid var(--b);font-size:13px;}
.attbl tr:last-child td{border-bottom:none;}
.ism{width:54px;background:var(--s2);border:1px solid var(--b2);border-radius:4px;padding:3px 7px;color:var(--t);font-family:var(--fm);font-size:12px;outline:none;text-align:center;}
.ism:focus{border-color:var(--a);}
.cgpad{background:var(--s);border:1px solid var(--b);border-radius:12px;padding:22px;text-align:center;margin-bottom:16px;}
.cgv{font-family:var(--fd);font-size:56px;font-weight:600;color:var(--a);line-height:1;}
.cgl{font-family:var(--fm);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);margin-top:5px;}
.gtbl{width:100%;border-collapse:collapse;}
.gtbl th{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);padding:9px 12px;text-align:left;border-bottom:1px solid var(--b);}
.gtbl td{padding:10px 12px;border-bottom:1px solid var(--b);font-size:13px;}
.gtbl tr:last-child td{border-bottom:none;}

/* SKILLS */
.scats{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px;}
.scf{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:5px 11px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.scf.act{background:rgba(155,127,212,0.12);border-color:var(--a2);color:var(--a2);}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
.skcard{background:var(--s);border:1px solid var(--b);border-radius:9px;padding:14px;transition:border-color 0.15s;}
.skcard:hover{border-color:var(--b2);}
.sktop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
.skn{font-size:14px;font-weight:500;color:var(--t);}
.skc{font-family:var(--fm);font-size:9px;color:var(--m);text-transform:uppercase;letter-spacing:0.06em;}
.skbr{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.skbar{flex:1;height:3px;background:var(--b2);border-radius:2px;overflow:hidden;}
.skbarf{height:100%;border-radius:2px;background:var(--a2);transition:width 0.3s;}
.skst{display:flex;gap:2px;}
.skstar{font-size:12px;cursor:pointer;opacity:0.25;transition:opacity 0.1s;}
.skstar.lit{opacity:1;}
.skl{font-family:var(--fm);font-size:9px;color:var(--m);}
.skl.stale{color:var(--d);}

/* LEARNING QUEUE */
.lq-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 18px;margin-bottom:8px;display:flex;gap:14px;align-items:flex-start;}
.lq-card:hover{border-color:var(--b2);}
.lq-status-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.lq-body{flex:1;}
.lq-title{font-size:14px;font-weight:500;color:var(--t);margin-bottom:3px;}
.lq-meta{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:5px;}
.lq-notes{font-size:12px;color:var(--m2);}

/* CERTIFICATIONS */
.cert-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 18px;margin-bottom:8px;}
.cert-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
.cert-name{font-size:14px;font-weight:500;color:var(--t);}
.cert-meta{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:8px;}
.cert-prog{display:flex;align-items:center;gap:10px;}
.cert-bar{flex:1;height:4px;background:var(--b2);border-radius:2px;overflow:hidden;}
.cert-barf{height:100%;border-radius:2px;background:var(--a2);transition:width 0.3s;}
.cert-pi{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;outline:none;cursor:pointer;border:none!important;padding:0!important;}
.cert-pi::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--a2);cursor:pointer;}

/* TIME TRACKER */
.thero{background:var(--s);border:1px solid var(--b);border-radius:14px;padding:28px 22px;text-align:center;margin-bottom:16px;position:relative;overflow:hidden;}
.thero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(200,169,110,0.06) 0%,transparent 65%);pointer-events:none;}
.tmodes{display:flex;justify-content:center;gap:7px;margin-bottom:20px;flex-wrap:wrap;}
.mdb{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:6px 13px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;transition:all 0.2s;color:var(--m2);}
.mdb.mw.act{background:rgba(200,169,110,0.12);border-color:var(--a);color:var(--a);}
.mdb.mb.act{background:rgba(110,207,168,0.12);border-color:var(--a3);color:var(--a3);}
.mdb.mv.act{background:rgba(224,107,107,0.12);border-color:var(--d);color:var(--d);}
.mdb.mp.act{background:rgba(155,127,212,0.12);border-color:var(--a2);color:var(--a2);}
.tdisp{font-family:var(--fm);font-size:62px;font-weight:500;letter-spacing:-2px;line-height:1;margin-bottom:5px;transition:color 0.3s;}
.tlbl{font-family:var(--fm);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);margin-bottom:20px;}
.pind{display:flex;gap:6px;justify-content:center;margin-bottom:10px;}
.pdot{width:8px;height:8px;border-radius:50%;border:1.5px solid var(--a2);transition:background 0.3s;}
.pdot.dn{background:var(--a2);}
.tctrl{display:flex;justify-content:center;gap:9px;margin-bottom:14px;flex-wrap:wrap;}
.tbtn{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:9px 20px;border-radius:6px;border:none;cursor:pointer;transition:all 0.2s;font-weight:500;}
.tbtn-s{background:var(--a);color:#080810;}.tbtn-s:hover{background:#d4b87a;}
.tbtn-p{background:var(--s2);color:var(--a);border:1px solid var(--a);}
.tbtn-x{background:var(--s2);color:var(--d);border:1px solid var(--b2);}.tbtn-x:hover{border-color:var(--d);}
.trow2{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;}
.tti{background:var(--s2);border:1px solid var(--b2);border-radius:6px;padding:6px 10px;color:var(--t);font-family:var(--fb);font-size:13px;font-weight:300;outline:none;width:180px;}
.tti:focus{border-color:var(--a);}
.tls{background:var(--s2);border:1px solid var(--b2);border-radius:6px;padding:6px 10px;color:var(--m2);font-family:var(--fm);font-size:11px;outline:none;cursor:pointer;}
.tls:focus{border-color:var(--a);}
.tsum{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:14px;}
.tscard{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px;text-align:center;}
.tsv{font-family:var(--fm);font-size:21px;font-weight:500;margin-bottom:3px;}
.tsl{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.rbar-w{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 16px;margin-bottom:16px;}
.rbar-l{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:7px;}
.rbar{height:8px;border-radius:4px;background:var(--b2);overflow:hidden;display:flex;}
.rs-w{background:var(--a);}.rs-b{background:var(--a3);}.rs-v{background:var(--d);}
.rleg{display:flex;gap:12px;margin-top:7px;flex-wrap:wrap;}
.rli{display:flex;align-items:center;gap:5px;font-family:var(--fm);font-size:10px;color:var(--m2);}
.rdot{width:6px;height:6px;border-radius:50%;}
.logs{display:flex;flex-direction:column;gap:6px;}
.litem{display:flex;align-items:center;gap:10px;padding:9px 13px;background:var(--s);border:1px solid var(--b);border-radius:8px;}
.litem:hover{border-color:var(--b2);}
.ltdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.llbl{flex:1;font-size:13px;color:var(--t);}
.llnk{font-family:var(--fm);font-size:10px;color:var(--a2);}
.ldur{font-family:var(--fm);font-size:11px;}
.ltm{font-family:var(--fm);font-size:10px;color:var(--m);min-width:40px;text-align:right;}
.ldel{background:none;border:none;color:var(--m);cursor:pointer;font-size:10px;opacity:0;padding:2px 4px;}
.litem:hover .ldel{opacity:1;}.ldel:hover{color:var(--d);}
/* Weekly report */
.wr-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:16px;}
.wr-day{background:var(--s);border:1px solid var(--b);border-radius:9px;padding:12px 8px;text-align:center;}
.wr-day.today{border-color:rgba(200,169,110,0.4);}
.wr-dname{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:6px;}
.wr-stk{display:flex;flex-direction:column;gap:3px;height:70px;justify-content:flex-end;}
.wr-seg{border-radius:3px;min-height:3px;transition:height 0.3s;}
.wr-total{font-family:var(--fm);font-size:11px;color:var(--m2);margin-top:5px;}

/* HABITS */
.hb-grid{display:grid;gap:10px;}
.hb-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:14px;}
.hb-card:hover{border-color:var(--b2);}
.hb-icon{font-size:22px;flex-shrink:0;}
.hb-body{flex:1;}
.hb-name{font-size:14px;font-weight:500;color:var(--t);margin-bottom:4px;}
.hb-streak{font-family:var(--fm);font-size:10px;color:var(--a);display:flex;align-items:center;gap:5px;}
.hb-dots{display:flex;gap:4px;margin-top:6px;}
.hb-dot{width:10px;height:10px;border-radius:3px;cursor:pointer;transition:all 0.15s;}
.hb-dot.on{border:none;}
.hb-dot.off{opacity:0.2;border:1px solid var(--b2);}
.hb-check{width:28px;height:28px;border:2px solid var(--b2);border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.15s;flex-shrink:0;}
.hb-check.done{background:var(--a3);border-color:var(--a3);}

/* NOTES */
.notes-grid{display:grid;grid-template-columns:240px 1fr;gap:16px;min-height:400px;}
.notes-list{display:flex;flex-direction:column;gap:7px;}
.note-item{background:var(--s);border:1px solid var(--b);border-radius:8px;padding:11px 13px;cursor:pointer;transition:border-color 0.15s;}
.note-item:hover{border-color:var(--b2);}
.note-item.active{border-color:var(--a);background:rgba(200,169,110,0.04);}
.note-item-title{font-size:13px;font-weight:500;color:var(--t);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.note-item-preview{font-size:11px;color:var(--m);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.note-item-date{font-family:var(--fm);font-size:9px;color:var(--m);margin-top:4px;}
.note-editor{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:18px;display:flex;flex-direction:column;gap:10px;}
.note-title-inp{background:transparent;border:none;outline:none;font-family:var(--fd);font-size:20px;font-weight:600;font-style:italic;color:var(--a);width:100%;padding:0;}
.note-title-inp::placeholder{color:var(--m);}
.note-body-inp{background:transparent;border:none;outline:none;font-family:var(--fb);font-size:14px;font-weight:300;color:var(--t);width:100%;resize:none;min-height:300px;line-height:1.7;}
.note-body-inp::placeholder{color:var(--m);}
.note-divider{height:1px;background:var(--b);}

/* ACCOUNTABILITY */
.sgrid-acc{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;}
.scard{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:16px;text-align:center;}
.sv{font-family:var(--fd);font-size:34px;font-weight:600;color:var(--a);line-height:1;margin-bottom:4px;}
.sl{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.ckin{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:18px;margin-bottom:18px;}
.ckt{font-family:var(--fd);font-size:17px;font-style:italic;color:var(--t);margin-bottom:12px;}
.mr{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.mb2{font-size:18px;background:var(--s2);border:2px solid var(--b);border-radius:7px;padding:6px 10px;cursor:pointer;transition:all 0.15s;}
.mb2:hover,.mb2.sel{border-color:var(--a);background:rgba(200,169,110,0.08);}
.wi{display:flex;align-items:center;gap:7px;font-size:13px;padding:6px 10px;background:rgba(110,207,168,0.06);border:1px solid rgba(110,207,168,0.15);border-radius:6px;color:var(--a3);margin-bottom:6px;}
.hist{display:flex;flex-direction:column;gap:6px;}
.hitem{display:flex;align-items:center;gap:10px;padding:9px 13px;background:var(--s);border:1px solid var(--b);border-radius:8px;}
.hdate{font-family:var(--fm);font-size:11px;color:var(--m);min-width:54px;}
.hmood{font-size:15px;}
.htxt{font-size:13px;color:var(--m2);flex:1;}

/* MONTHLY */
.month-nav{display:flex;align-items:center;gap:16px;margin-bottom:24px;background:var(--s);border:1px solid var(--b);border-radius:10px;padding:16px 22px;}
.month-name{font-family:var(--fd);font-size:28px;font-weight:600;color:var(--a);font-style:italic;flex:1;}
.month-year{font-family:var(--fm);font-size:12px;color:var(--m);letter-spacing:0.1em;}
.month-nav-btn{background:var(--s2);border:1px solid var(--b2);border-radius:6px;padding:6px 13px;color:var(--m2);font-family:var(--fm);font-size:12px;cursor:pointer;transition:all 0.15s;}
.month-nav-btn:hover{border-color:var(--a);color:var(--a);}
.month-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:22px;}
.mstat{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:15px;text-align:center;}
.mstat-v{font-family:var(--fd);font-size:34px;font-weight:600;color:var(--a);line-height:1;margin-bottom:4px;}
.mstat-l{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.month-focus{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:18px 20px;margin-bottom:22px;}
.month-focus-label{font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:10px;}
.month-focus-inp{width:100%;background:transparent;border:none;outline:none;font-family:var(--fb);font-size:14px;font-weight:300;color:var(--t);resize:none;line-height:1.7;min-height:60px;}
.month-focus-inp::placeholder{color:var(--m);}
.mg-cats{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px;}
.mg-cat-btn{font-family:var(--fm);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;padding:5px 12px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.2s;}
.mg-cat-btn.act{background:rgba(200,169,110,0.12);border-color:var(--a);color:var(--a);}
.mg-card{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:16px 20px;margin-bottom:10px;position:relative;overflow:hidden;transition:border-color 0.15s;}
.mg-card:hover{border-color:var(--b2);}
.mg-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:10px 0 0 10px;}
.mg-card.pH::before{background:var(--d);}.mg-card.pM::before{background:var(--a);}.mg-card.pL::before{background:var(--a3);}
.mg-card.done-card{opacity:0.55;}
.mg-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
.mg-title{font-size:15px;font-weight:500;color:var(--t);flex:1;padding-right:8px;line-height:1.4;}
.mg-title.done{text-decoration:line-through;color:var(--m);}
.mg-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;align-items:center;}
.mg-progress{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.mg-bar{flex:1;height:5px;background:var(--b2);border-radius:3px;overflow:hidden;}
.mg-bar-fill{height:100%;border-radius:3px;transition:width 0.3s;}
.mg-pct{font-family:var(--fm);font-size:11px;color:var(--m2);min-width:32px;text-align:right;}
.mg-milestones{border-top:1px solid var(--b);padding-top:10px;margin-top:4px;}
.mg-ms-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:7px;}
.mg-ms-row{display:flex;align-items:center;gap:8px;padding:4px 0;}
.mg-ms-cb{width:13px;height:13px;border:1.5px solid var(--b2);border-radius:3px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px;transition:all 0.15s;}
.mg-ms-cb.ck{background:var(--a3);border-color:var(--a3);color:#080810;}
.mg-ms-text{flex:1;font-size:12px;color:var(--m2);}
.mg-ms-text.done{text-decoration:line-through;color:var(--m);}
.mg-ms-add{font-family:var(--fm);font-size:10px;color:var(--m);background:none;border:1px dashed var(--b);border-radius:4px;padding:3px 8px;cursor:pointer;margin-top:5px;transition:all 0.15s;}
.mg-ms-add:hover{border-color:var(--b2);color:var(--m2);}
.month-retro{background:var(--s);border:1px solid var(--b);border-radius:10px;padding:18px 20px;margin-top:22px;}
.retro-title{font-family:var(--fd);font-size:17px;font-style:italic;color:var(--t);margin-bottom:14px;}
.retro-q{font-family:var(--fm);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);margin-bottom:6px;margin-top:14px;}
.retro-inp{width:100%;background:transparent;border:none;border-bottom:1px solid var(--b);outline:none;font-family:var(--fb);font-size:13px;font-weight:300;color:var(--t);padding:6px 2px;resize:none;min-height:40px;line-height:1.6;}
.retro-inp::placeholder{color:var(--m);}

@media(max-width:720px){
  .ts,.kb,.csgrid,.sgrid,.notes-grid{grid-template-columns:1fr!important;}
  .wg,.wr-grid{grid-template-columns:repeat(4,1fr)!important;}
  .sgrid-acc,.tsum{grid-template-columns:1fr 1fr!important;}
  .exam-countdown,.month-stats{grid-template-columns:repeat(2,1fr)!important;}
}
/* ── GLOBAL SEARCH ── */
@keyframes srchIn{from{opacity:0;transform:translateY(-16px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
.srch-wrap{position:fixed;inset:0;background:rgba(8,8,16,0.88);backdrop-filter:blur(8px);display:flex;align-items:flex-start;justify-content:center;z-index:200;padding:80px 16px 16px;}
.srch-box{background:var(--s2);border:1px solid var(--b2);border-radius:14px;width:100%;max-width:600px;box-shadow:0 40px 80px rgba(0,0,0,0.7);overflow:hidden;animation:srchIn 0.18s ease;}
.srch-inp-row{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--b);}
.srch-icon{font-size:16px;color:var(--m);flex-shrink:0;}
.srch-inp{flex:1;background:transparent;border:none;outline:none;font-family:var(--fb);font-size:16px;font-weight:300;color:var(--t);}
.srch-inp::placeholder{color:var(--m);}
.srch-kbd{font-family:var(--fm);font-size:10px;color:var(--m);background:var(--s);border:1px solid var(--b2);border-radius:4px;padding:3px 7px;flex-shrink:0;}
.srch-results{max-height:420px;overflow-y:auto;}
.srch-group-label{font-family:var(--fm);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);padding:10px 20px 5px;}
.srch-item{display:flex;align-items:center;gap:12px;padding:10px 20px;cursor:pointer;transition:background 0.1s;}
.srch-item:hover,.srch-item.active{background:rgba(200,169,110,0.08);}
.srch-item-icon{font-size:14px;flex-shrink:0;width:20px;text-align:center;}
.srch-item-main{flex:1;}
.srch-item-title{font-size:13px;color:var(--t);line-height:1.3;}
.srch-item-sub{font-family:var(--fm);font-size:10px;color:var(--m);margin-top:2px;}
.srch-item-badge{font-family:var(--fm);font-size:9px;padding:2px 7px;border-radius:3px;background:rgba(155,127,212,0.12);color:var(--a2);border:1px solid rgba(155,127,212,0.2);flex-shrink:0;}
.srch-empty{padding:32px 20px;text-align:center;font-family:var(--fm);font-size:11px;color:var(--m);}
.srch-footer{padding:10px 20px;border-top:1px solid var(--b);display:flex;gap:16px;}
.srch-hint{font-family:var(--fm);font-size:10px;color:var(--m);display:flex;align-items:center;gap:6px;}
.srch-hint kbd{background:var(--s);border:1px solid var(--b2);border-radius:3px;padding:1px 6px;font-size:10px;}
/* ── SHORTCUTS OVERLAY ── */
.sc-wrap{position:fixed;inset:0;background:rgba(8,8,16,0.88);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px;}
.sc-box{background:var(--s2);border:1px solid var(--b2);border-radius:14px;padding:28px;width:100%;max-width:480px;box-shadow:0 40px 80px rgba(0,0,0,0.7);}
.sc-title{font-family:var(--fd);font-size:20px;font-weight:600;font-style:italic;color:var(--a);margin-bottom:20px;}
.sc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sc-row{display:flex;align-items:center;gap:10px;padding:6px 0;}
.sc-key{font-family:var(--fm);font-size:11px;background:var(--s);border:1px solid var(--b2);border-radius:4px;padding:3px 9px;color:var(--t);min-width:32px;text-align:center;flex-shrink:0;}
.sc-desc{font-size:12px;color:var(--m2);}
/* search button in header */
.srch-btn{display:flex;align-items:center;gap:7px;background:var(--s);border:1px solid var(--b2);border-radius:7px;padding:6px 12px;cursor:pointer;margin-left:auto;transition:border-color 0.2s;}
.srch-btn:hover{border-color:var(--a);}
.srch-btn-text{font-family:var(--fm);font-size:10px;color:var(--m);letter-spacing:0.06em;}
.srch-btn-kbd{font-family:var(--fm);font-size:9px;color:var(--m);background:var(--s2);border:1px solid var(--b2);border-radius:3px;padding:1px 5px;}

/* TAB BADGES */
.tab-wrap{position:relative;display:inline-flex;}
.tab-badge{position:absolute;top:6px;right:2px;min-width:14px;height:14px;border-radius:7px;background:var(--d);color:#fff;font-family:var(--fm);font-size:8px;font-weight:600;display:flex;align-items:center;justify-content:center;padding:0 3px;pointer-events:none;}
.tab-badge.green{background:var(--a3);}
.tab-badge.gold{background:var(--a);}
/* READINESS SCORE */
.readiness-card{background:linear-gradient(135deg,rgba(200,169,110,0.08) 0%,rgba(155,127,212,0.06) 100%);border:1px solid rgba(200,169,110,0.2);border-radius:12px;padding:18px 20px;}
.readiness-top{display:flex;align-items:center;gap:16px;margin-bottom:14px;}
.readiness-score{font-family:var(--fd);font-size:52px;font-weight:600;line-height:1;}
.readiness-label{font-family:var(--fm);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--m);margin-top:4px;}
.readiness-grade{font-family:var(--fm);font-size:11px;padding:3px 10px;border-radius:4px;font-weight:600;}
.readiness-bars{display:flex;flex-direction:column;gap:7px;}
.rb-row{display:flex;align-items:center;gap:8px;}
.rb-label{font-family:var(--fm);font-size:9px;color:var(--m);width:80px;flex-shrink:0;}
.rb-bar{flex:1;height:4px;background:var(--b2);border-radius:2px;overflow:hidden;}
.rb-fill{height:100%;border-radius:2px;transition:width 0.5s ease;}
.rb-val{font-family:var(--fm);font-size:10px;color:var(--m2);width:28px;text-align:right;}
/* RESEARCH NOTES */
.research-section{border-top:1px solid var(--b);padding-top:12px;margin-top:10px;}
.research-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:0;}
.research-label{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);}
.research-body{padding-top:10px;display:flex;flex-direction:column;gap:8px;}
.research-field{display:flex;flex-direction:column;gap:4px;}
.research-field label{font-family:var(--fm);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:var(--m);}
.research-inp{background:var(--s2);border:1px solid var(--b2);border-radius:5px;padding:6px 10px;color:var(--t);font-family:var(--fb);font-size:12px;font-weight:300;outline:none;width:100%;}
.research-inp:focus{border-color:var(--a);}
.research-textarea{background:var(--s2);border:1px solid var(--b2);border-radius:5px;padding:6px 10px;color:var(--t);font-family:var(--fb);font-size:12px;font-weight:300;outline:none;width:100%;resize:none;min-height:56px;line-height:1.5;}
.research-textarea:focus{border-color:var(--a);}
.diff-pills{display:flex;gap:6px;}
.diff-pill{font-family:var(--fm);font-size:9px;padding:3px 10px;border-radius:20px;border:1.5px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.15s;}
.diff-pill.sel{font-weight:600;}
/* DSA STREAK */
.dsa-streak-badge{display:flex;align-items:center;gap:6px;background:rgba(200,169,110,0.08);border:1px solid rgba(200,169,110,0.2);border-radius:6px;padding:4px 11px;font-family:var(--fm);font-size:11px;color:var(--a);}

/* LIGHT THEME */
.app.light{--bg:#f5f3ee;--s:#ffffff;--s2:#f0ede8;--b:#e0dbd2;--b2:#ccc6bb;--t:#1a1814;--m:#7a7468;--m2:#4a4640;}
/* THEME TOGGLE */
.theme-btn{background:var(--s);border:1px solid var(--b2);border-radius:7px;padding:6px 11px;cursor:pointer;font-size:15px;transition:all 0.2s;line-height:1;}
.theme-btn:hover{border-color:var(--a);}
/* MARKDOWN PREVIEW */
.note-mode-toggle{display:flex;gap:6px;margin-bottom:8px;}
.nmt{font-family:var(--fm);font-size:9px;letter-spacing:0.07em;text-transform:uppercase;padding:4px 12px;border-radius:4px;border:1px solid var(--b2);background:transparent;cursor:pointer;color:var(--m2);transition:all 0.15s;}
.nmt.act{background:rgba(200,169,110,0.1);border-color:var(--a);color:var(--a);}
.md-preview{flex:1;overflow-y:auto;padding:4px 2px;color:var(--t);font-family:var(--fb);font-size:14px;font-weight:300;line-height:1.8;}
.md-preview h1{font-family:var(--fd);font-size:22px;font-weight:600;font-style:italic;color:var(--a);margin:0 0 10px;}
.md-preview h2{font-family:var(--fd);font-size:18px;font-weight:600;color:var(--t);margin:14px 0 6px;}
.md-preview h3{font-family:var(--fd);font-size:15px;font-weight:600;color:var(--m2);margin:10px 0 4px;}
.md-preview strong{color:var(--t);font-weight:600;}
.md-preview em{font-style:italic;color:var(--m2);}
.md-preview code{font-family:var(--fm);font-size:12px;background:var(--s2);border:1px solid var(--b);border-radius:3px;padding:1px 6px;color:var(--a3);}
.md-preview li{margin-left:18px;margin-bottom:4px;}
.md-preview hr{border:none;border-top:1px solid var(--b);margin:12px 0;}
/* EXPORT / IMPORT */
.export-btn{display:flex;align-items:center;gap:7px;background:var(--s);border:1px solid var(--b2);border-radius:7px;padding:6px 12px;cursor:pointer;transition:border-color 0.2s;font-family:var(--fm);font-size:10px;color:var(--m2);}
.export-btn:hover{border-color:var(--a3);color:var(--a3);}
/* WEEKLY REVIEW MODAL */
.wr-body{display:flex;flex-direction:column;gap:14px;}
.wr-q{font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:5px;}
.wr-inp{width:100%;background:var(--s);border:1px solid var(--b2);border-radius:6px;padding:8px 12px;color:var(--t);font-family:var(--fb);font-size:13px;font-weight:300;outline:none;resize:none;min-height:64px;line-height:1.6;}
.wr-inp:focus{border-color:var(--a);}
.wr-badge{display:inline-block;font-family:var(--fm);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;padding:3px 9px;border-radius:3px;background:rgba(155,127,212,0.12);color:var(--a2);border:1px solid rgba(155,127,212,0.25);margin-bottom:14px;}

/* ── AUTH ── */
.auth-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:24px;}
.auth-box{background:var(--s);border:1px solid var(--b2);border-radius:16px;padding:36px 40px;width:100%;max-width:400px;box-shadow:0 40px 80px rgba(0,0,0,0.5);}
.auth-logo{font-family:var(--fd);font-size:28px;font-weight:600;color:var(--a);margin-bottom:4px;}
.auth-sub{font-family:var(--fm);font-size:10px;color:var(--m);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:28px;}
.auth-title{font-family:var(--fd);font-size:20px;font-weight:600;font-style:italic;color:var(--t);margin-bottom:20px;}
.auth-field{margin-bottom:16px;}
.auth-label{display:block;font-family:var(--fm);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--m);margin-bottom:6px;}
.auth-inp{width:100%;background:var(--s2);border:1px solid var(--b2);border-radius:7px;padding:10px 14px;color:var(--t);font-family:var(--fb);font-size:14px;font-weight:300;outline:none;transition:border-color 0.2s;}
.auth-inp:focus{border-color:var(--a);}
.auth-btn{width:100%;background:var(--a);color:#080810;font-family:var(--fm);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;padding:12px;border-radius:7px;border:none;cursor:pointer;margin-top:4px;transition:background 0.2s;}
.auth-btn:hover{background:#d4b87a;}
.auth-btn:disabled{opacity:0.5;cursor:not-allowed;}
.auth-switch{text-align:center;margin-top:16px;font-family:var(--fm);font-size:11px;color:var(--m);}
.auth-switch button{background:none;border:none;color:var(--a);cursor:pointer;font-family:var(--fm);font-size:11px;text-decoration:underline;}
.auth-err{background:rgba(224,107,107,0.1);border:1px solid rgba(224,107,107,0.3);border-radius:7px;padding:10px 14px;font-family:var(--fm);font-size:11px;color:var(--d);margin-bottom:14px;}
.auth-ok{background:rgba(110,207,168,0.1);border:1px solid rgba(110,207,168,0.3);border-radius:7px;padding:10px 14px;font-family:var(--fm);font-size:11px;color:var(--a3);margin-bottom:14px;}
.sync-badge{display:flex;align-items:center;gap:4px;font-family:var(--fm);font-size:8px;color:var(--a3);border-radius:3px;padding:0;background:none;border:none;}
.sync-badge.err{color:var(--d);background:rgba(224,107,107,0.08);border-color:rgba(224,107,107,0.2);}
.sync-dot{width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0;}

`;

// ── DATA ──────────────────────────────────────────────────────
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const SC={Researching:"#8a88a0",Applied:"#9b7fd4",OA:"#c8a96e",Interview:"#6ecfa8",Offer:"#6ecfa8",Rejected:"#e06b6b"};
const SL=["Researching","Applied","OA","Interview","Offer","Rejected"];
const SKILL_CATS=["All","Frontend","Backend","ML/AI","Database","Tools","Language"];
const GM={O:10,"A+":9,A:8,"B+":7,B:6,"C+":5,P:4,F:0};
const DC2={Easy:"#6ecfa8",Medium:"#c8a96e",Hard:"#e06b6b"};
const LQ_STATUS={todo:"#6a6880",inprogress:"#c8a96e",done:"#6ecfa8"};

const CORE_DATA=[
  {id:1,name:"DSA",topics:[{n:"Arrays & Strings",s:"confident"},{n:"Linked Lists",s:"confident"},{n:"Trees & BST",s:"shaky"},{n:"Graphs",s:"not_started"},{n:"Dynamic Programming",s:"not_started"},{n:"Heaps",s:"shaky"},{n:"Backtracking",s:"not_started"},{n:"Sliding Window",s:"confident"}]},
  {id:2,name:"Operating Systems",topics:[{n:"Processes & Threads",s:"shaky"},{n:"CPU Scheduling",s:"not_started"},{n:"Memory Management",s:"not_started"},{n:"Deadlocks",s:"not_started"},{n:"File Systems",s:"not_started"},{n:"Synchronization",s:"not_started"}]},
  {id:3,name:"DBMS",topics:[{n:"SQL Queries",s:"confident"},{n:"Normalization",s:"shaky"},{n:"Transactions & ACID",s:"shaky"},{n:"Indexing",s:"not_started"},{n:"ER Diagrams",s:"confident"},{n:"NoSQL basics",s:"not_started"}]},
  {id:4,name:"Computer Networks",topics:[{n:"OSI / TCP-IP Model",s:"not_started"},{n:"HTTP / HTTPS",s:"shaky"},{n:"DNS & DHCP",s:"not_started"},{n:"TCP vs UDP",s:"shaky"},{n:"Routing & Subnetting",s:"not_started"},{n:"Sockets",s:"not_started"}]},
  {id:5,name:"OOPs & System Design",topics:[{n:"Encapsulation & Polymorphism",s:"confident"},{n:"Abstract & Interface",s:"confident"},{n:"Design Patterns",s:"shaky"},{n:"SOLID Principles",s:"shaky"},{n:"Low-Level Design",s:"not_started"},{n:"High-Level Design",s:"not_started"}]},
];

const DSA_DATA=[
  {id:1,t:"Arrays",cat:"Linear",c:3,target:40,notes:"Focus on prefix sum & Kadane",problems:[
    {id:101,name:"Two Sum",diff:"Easy",link:"https://leetcode.com/problems/two-sum",done:true},
    {id:102,name:"Best Time to Buy & Sell Stock",diff:"Easy",link:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock",done:true},
    {id:103,name:"Maximum Subarray (Kadane)",diff:"Medium",link:"https://leetcode.com/problems/maximum-subarray",done:true},
    {id:104,name:"Product of Array Except Self",diff:"Medium",link:"https://leetcode.com/problems/product-of-array-except-self",done:false},
  ]},
  {id:2,t:"Strings",cat:"Linear",c:3,target:30,notes:"KMP & Rabin-Karp pending",problems:[
    {id:201,name:"Valid Anagram",diff:"Easy",link:"https://leetcode.com/problems/valid-anagram",done:true},
    {id:202,name:"Longest Palindromic Substring",diff:"Medium",link:"https://leetcode.com/problems/longest-palindromic-substring",done:true},
  ]},
  {id:3,t:"Linked List",cat:"Linear",c:3,target:20,notes:"Fast/slow pointer patterns",problems:[
    {id:301,name:"Reverse Linked List",diff:"Easy",link:"https://leetcode.com/problems/reverse-linked-list",done:true},
    {id:302,name:"Detect Cycle",diff:"Easy",link:"https://leetcode.com/problems/linked-list-cycle",done:true},
  ]},
  {id:4,t:"Stack & Queue",cat:"Linear",c:2,target:15,notes:"Monotonic stack is crucial",problems:[
    {id:401,name:"Valid Parentheses",diff:"Easy",link:"https://leetcode.com/problems/valid-parentheses",done:true},
    {id:402,name:"Next Greater Element",diff:"Medium",link:"https://leetcode.com/problems/next-greater-element-i",done:false},
  ]},
  {id:5,t:"Binary Search",cat:"Search",c:2,target:15,notes:"Always define search space clearly",problems:[
    {id:501,name:"Binary Search",diff:"Easy",link:"https://leetcode.com/problems/binary-search",done:true},
    {id:502,name:"Search in Rotated Array",diff:"Medium",link:"https://leetcode.com/problems/search-in-rotated-sorted-array",done:false},
  ]},
  {id:6,t:"Two Pointers",cat:"Search",c:2,target:12,notes:"",problems:[]},
  {id:7,t:"Sliding Window",cat:"Search",c:2,target:12,notes:"Revisit variable-size window",problems:[
    {id:701,name:"Longest Substring Without Repeating",diff:"Medium",link:"https://leetcode.com/problems/longest-substring-without-repeating-characters",done:true},
  ]},
  {id:8,t:"Trees",cat:"Tree/Graph",c:1,target:25,notes:"DFS recursion & BFS level order",problems:[
    {id:801,name:"Inorder Traversal",diff:"Easy",link:"https://leetcode.com/problems/binary-tree-inorder-traversal",done:true},
  ]},
  {id:9,t:"Graph BFS/DFS",cat:"Tree/Graph",c:1,target:20,notes:"",problems:[]},
  {id:10,t:"Dynamic Programming",cat:"DP",c:1,target:20,notes:"Start with 1D DP patterns",problems:[
    {id:1001,name:"Climbing Stairs",diff:"Easy",link:"https://leetcode.com/problems/climbing-stairs",done:true},
  ]},
  {id:11,t:"Backtracking",cat:"DP",c:1,target:12,notes:"",problems:[
    {id:1101,name:"Subsets",diff:"Medium",link:"https://leetcode.com/problems/subsets",done:true},
  ]},
  {id:12,t:"Heaps",cat:"Advanced",c:0,target:10,notes:"Min/max heap patterns",problems:[]},
  {id:13,t:"Tries",cat:"Advanced",c:0,target:8,notes:"",problems:[]},
  {id:14,t:"Greedy",cat:"Advanced",c:1,target:12,notes:"Interval scheduling is key",problems:[
    {id:1401,name:"Meeting Rooms",diff:"Easy",link:"https://leetcode.com/problems/meeting-rooms",done:true},
  ]},
];

const SKILLS_DATA=[
  {id:1,n:"React",cat:"Frontend",p:4,lp:1},{id:2,n:"HTML/CSS/JS",cat:"Frontend",p:4,lp:2},
  {id:3,n:"Spring Boot",cat:"Backend",p:3,lp:3},{id:4,n:"FastAPI",cat:"Backend",p:3,lp:5},
  {id:5,n:"Java",cat:"Language",p:3,lp:2},{id:6,n:"Python",cat:"Language",p:4,lp:1},
  {id:7,n:"YOLOv8/v9/11",cat:"ML/AI",p:3,lp:1},{id:8,n:"scikit-learn",cat:"ML/AI",p:3,lp:7},
  {id:9,n:"MySQL",cat:"Database",p:3,lp:4},{id:10,n:"PostgreSQL",cat:"Database",p:2,lp:14},
  {id:11,n:"Git / GitHub",cat:"Tools",p:3,lp:1},{id:12,n:"Google Colab",cat:"Tools",p:3,lp:2},
  {id:13,n:"Prompt Engineering",cat:"ML/AI",p:3,lp:3},
];

function getWD(){const t=new Date(),d=t.getDay();return Array.from({length:7},(_,i)=>{const x=new Date(t);x.setDate(t.getDate()-d+i);return x;});}
function fmtS(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;if(h>0)return`${h}:${String(m).padStart(2,"0")}:${String(sc).padStart(2,"0")}`;return`${String(m).padStart(2,"0")}:${String(sc).padStart(2,"0")}`;}
function fmtD(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60);if(h>0)return`${h}h ${m}m`;if(m>0)return`${m}m`;return`${s}s`;}
function dAgo(n){return n===0?"today":n===1?"yesterday":`${n}d ago`;}
function daysUntil(d){if(!d)return null;const diff=new Date(d)-new Date();return Math.ceil(diff/86400000);}

// ── APP ───────────────────────────────────────────────────────

// ── localStorage persistence ─────────────────────────────────
const STORE_KEY = "focusboard_v1";

// ── Supabase config ───────────────────────────────────────────
const SB_URL = "https://dbfupezdawtoqwionyrg.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiZnVwZXpkYXd0b3F3aW9ueXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTI1NDYsImV4cCI6MjA4OTY2ODU0Nn0.dwgk55nj_4_PMSCrcFKMrNSRbNpjitz9UXy8SG15LHc";

const sbFetch = async (path, opts={}) => {
  const token = localStorage.getItem("sb_token");
  const res = await fetch(SB_URL + path, {
    ...opts,
    headers: {
      "apikey": SB_KEY,
      "Authorization": `Bearer ${token || SB_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(opts.headers||{}),
    },
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const msg = body.message || body.error_description || body.error || body.msg || `HTTP ${res.status}: ${res.statusText}`;
    console.error("Supabase error:", res.status, body);
    throw new Error(msg);
  }
  return body;
};

const sbSignUp = (email, password) =>
  sbFetch("/auth/v1/signup", {method:"POST", body:JSON.stringify({email,password})});

const sbSignIn = (email, password) =>
  sbFetch("/auth/v1/token?grant_type=password", {method:"POST", body:JSON.stringify({email,password})});

const sbSignOut = () =>
  sbFetch("/auth/v1/logout", {method:"POST"});

const sbPush = async (data) => {
  const token = localStorage.getItem("sb_token");
  const userId = localStorage.getItem("sb_uid");
  if (!token || !userId) return;
  // upsert row
  await sbFetch("/rest/v1/focusboard", {
    method:"POST",
    headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},
    body:JSON.stringify({user_id:userId, data, updated_at:new Date().toISOString()}),
  });
};

const sbPull = async () => {
  const userId = localStorage.getItem("sb_uid");
  if (!userId) return null;
  const rows = await sbFetch(`/rest/v1/focusboard?user_id=eq.${userId}&select=data&limit=1`);
  return rows && rows.length > 0 ? rows[0].data : null;
};
function sv(key, fallback) {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return (key in parsed) ? parsed[key] : fallback;
  } catch(e) { return fallback; }
}

export default function App(){
  const [tab,setTab]=useState("home");
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [collapsedGroups,setCollapsedGroups]=useState({});
  const toggleGroup=(g)=>setCollapsedGroups(x=>({...x,[g]:!x[g]}));

  // ── AUTH STATE ────────────────────────────────────────────────
  const [authUser,setAuthUser]=useState(()=>{
    const uid=localStorage.getItem("sb_uid");
    const email=localStorage.getItem("sb_email");
    return uid?{id:uid,email}:null;
  });
  const [authMode,setAuthMode]=useState("signin"); // signin | signup
  const [authEmail,setAuthEmail]=useState("");
  const [authPw,setAuthPw]=useState("");
  const [authLoading,setAuthLoading]=useState(false);
  const [authErr,setAuthErr]=useState("");
  const [authOk,setAuthOk]=useState("");
  const [syncStatus,setSyncStatus]=useState("idle"); // idle | syncing | ok | err
  const [lastSync,setLastSync]=useState("");

  const handleAuth=async()=>{
    if(!authEmail.trim()||!authPw.trim()){setAuthErr("Email and password required.");return;}
    setAuthLoading(true);setAuthErr("");setAuthOk("");
    try{
      const res=authMode==="signup"?await sbSignUp(authEmail,authPw):await sbSignIn(authEmail,authPw);
      if(res?.access_token){
        localStorage.setItem("sb_token",res.access_token);
        localStorage.setItem("sb_uid",res.user.id);
        localStorage.setItem("sb_email",res.user.email);
        // Try to pull existing cloud data
        const cloudData=await sbPull();
        if(cloudData){
          localStorage.setItem(STORE_KEY,JSON.stringify(cloudData));
          setAuthUser({id:res.user.id,email:res.user.email});
          window.location.reload(); // reload to hydrate all state from cloud data
        } else {
          setAuthUser({id:res.user.id,email:res.user.email});
        }
      } else if(authMode==="signup"){
        setAuthOk("Account created! Check your email to confirm, then sign in.");
        setAuthMode("signin");
      }
    }catch(e){
      setAuthErr(e.message||"Something went wrong. Check console for details.");
      console.error("Auth error:",e);
    }
    setAuthLoading(false);
  };

  const handleSignOut=async()=>{
    try{await sbSignOut();}catch{}
    localStorage.removeItem("sb_token");
    localStorage.removeItem("sb_uid");
    localStorage.removeItem("sb_email");
    setAuthUser(null);
  };
  const [theme,setTheme]=useState(()=>sv("theme","dark"));
  const [noteMode,setNoteMode]=useState("edit"); // edit | preview
  const [showWeeklyReview,setShowWeeklyReview]=useState(false);
  const [wrDone,setWrDone]=useState(()=>sv("wrDone","")); // ISO date of last completed review
  const [wrWent,setWrWent]=useState("");
  const [wrImprove,setWrImprove]=useState("");
  const [wrPriorities,setWrPriorities]=useState("");

  // HOME STATE
  const [userName,setUserName]=useState(()=>sv("userName","Ritobrata"));
  const [avatarEmoji,setAvatarEmoji]=useState(()=>sv("avatarEmoji",""));  // empty = use initials
  const [avatarColor,setAvatarColor]=useState(()=>sv("avatarColor","#c8a96e"));
  const [showProfileEdit,setShowProfileEdit]=useState(false);
  const [editName,setEditName]=useState("");
  const [editEmoji,setEditEmoji]=useState("");
  const AVATAR_COLORS=["#c8a96e","#9b7fd4","#6ecfa8","#e06b6b","#6baae0","#e06bb5","#6ecfc8","#e0c86b"];
  const AVATAR_EMOJIS=["","👨‍💻","🧑‍💻","👨‍🎓","🧑‍🎓","🦁","🐉","🚀","⚡","🔥","🎯","💎","🌟","🦊","🐺","🤖"];
  const [dayStatus,setDayStatus]=useState(()=>sv("dayStatus","Day 1 of placement prep · let's make it count"));
  const [focusToday,setFocusToday]=useState(()=>sv("focusToday","Complete the YOLO mAP comparison run"));
  const [qaMode,setQaMode]=useState("task"); // task | win | note
  const [qaText,setQaText]=useState("");
  const [feedTab,setFeedTab]=useState("today");
  const [achievements,setAchievements]=useState(()=>sv("achievements",[
    {id:1,icon:"✓",text:"Finished net melon dataset training",time:"2h ago",day:"today"},
    {id:2,icon:"🔥",text:"4-day check-in streak maintained",time:"today",day:"today"},
    {id:3,icon:"💡",text:"Arrays marked Confident in DSA",time:"yesterday",day:"week"},
    {id:4,icon:"📌",text:"Applied to Sparsa AI — Full Stack AI Intern",time:"Mar 18",day:"week"},
    {id:5,icon:"⏱",text:"2h 14m focused session — News Dashboard",time:"Mar 18",day:"week"},
    {id:6,icon:"✓",text:"Frontend connected to Spring Boot backend",time:"Mar 17",day:"week"},
    {id:7,icon:"📚",text:"Read Attention Is All You Need paper",time:"Mar 16",day:"month"},
    {id:8,icon:"🚀",text:"Resume Analyzer project created",time:"Mar 15",day:"month"},
    {id:9,icon:"💼",text:"Applied to Google via campus portal",time:"Mar 14",day:"month"},
  ]));

  const QUOTES=[
    {text:"First, solve the problem. Then, write the code.",author:"John Johnson"},
    {text:"The best way to predict the future is to invent it.",author:"Alan Kay"},
    {text:"Simplicity is a great virtue but it requires hard work to achieve it.",author:"Edsger Dijkstra"},
    {text:"Programs must be written for people to read, and only incidentally for machines to execute.",author:"Harold Abelson"},
    {text:"The most important property of a program is whether it accomplishes the intention of its user.",author:"C.A.R. Hoare"},
    {text:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",author:"Martin Fowler"},
    {text:"In theory, theory and practice are the same. In practice, they are not.",author:"Yogi Berra"},
    {text:"The function of good software is to make the complex appear to be simple.",author:"Grady Booch"},
    {text:"Make it work, make it right, make it fast.",author:"Kent Beck"},
    {text:"An expert is a person who has made all the mistakes that can be made in a very narrow field.",author:"Niels Bohr"},
    {text:"The only way to learn a new programming language is by writing programs in it.",author:"Dennis Ritchie"},
    {text:"Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work.",author:"Stephen King"},
    {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
    {text:"The secret of getting ahead is getting started.",author:"Mark Twain"},
    {text:"You don't have to be great to start, but you have to start to be great.",author:"Zig Ziglar"},
  ];
  const todayQuote=QUOTES[new Date().getDate()%QUOTES.length];

  // GOALS
  const [goals,setGoals]=useState(()=>sv("goals",[
    {id:1,title:"Complete YOLO plant disease detection project",cat:"Project",priority:"High",deadline:"2025-04-30",progress:55,subGoals:[
      {id:101,text:"Finish net melon dataset training",done:true},
      {id:102,text:"Run YOLOv9 vs YOLOv8 comparison",done:false},
      {id:103,text:"Write final evaluation report",done:false},
    ],sgExpanded:true,linkedProject:"YOLO Disease Detection",linkedDSA:false,dsaTarget:0,monthPinned:true},
    {id:2,title:"Build Smart Resume Analyzer MVP",cat:"Project",priority:"Med",deadline:"2025-05-15",progress:20,subGoals:[
      {id:201,text:"Set up FastAPI backend",done:false},
      {id:202,text:"PDF parsing module",done:false},
      {id:203,text:"Score UI in React",done:false},
    ],sgExpanded:false,linkedProject:"Resume Analyzer",linkedDSA:false,dsaTarget:0,monthPinned:true},
    {id:3,title:"Solve 100 DSA problems total",cat:"Learning",priority:"Med",deadline:"",progress:40,subGoals:[],sgExpanded:false,linkedProject:"",linkedDSA:true,dsaTarget:100,monthPinned:false},
    {id:4,title:"Revise OS & CN for placements",cat:"Career",priority:"High",deadline:"2025-05-01",progress:20,subGoals:[
      {id:401,text:"OS: Processes, scheduling, deadlocks",done:false},
      {id:402,text:"CN: OSI, TCP/UDP, HTTP",done:false},
    ],sgExpanded:false,linkedProject:"",linkedDSA:false,dsaTarget:0,monthPinned:true},
  ]));
  const [sgm,setSgm]=useState(false);
  const [ng,setNg]=useState({title:"",cat:"Project",priority:"Med",deadline:"",linkedProject:"",progress:0});
  const [goalView,setGoalView]=useState("bento");
  const [celebrating,setCelebrating]=useState(null);
  const [sgInputs,setSgInputs]=useState({});

  const CAT_COLORS={Project:"#c8a96e",Learning:"#9b7fd4",Career:"#6ecfa8",Health:"#e06b6b",Personal:"#6ecfa8"};
  const catColor=cat=>CAT_COLORS[cat]||"#9b7fd4";

  const toggleSubGoal=(gid,sgid)=>{
    setGoals(gs=>gs.map(g=>{
      if(g.id!==gid)return g;
      const subs=g.subGoals.map(s=>s.id===sgid?{...s,done:!s.done}:s);
      const prog=subs.length>0?Math.round(subs.filter(s=>s.done).length/subs.length*100):g.progress;
      if(prog===100&&g.progress!==100){setCelebrating(gid);setTimeout(()=>setCelebrating(null),800);}
      // push to feed when a sub-goal is completed
      const sg=subs.find(s=>s.id===sgid);
      if(sg&&sg.done){
        setAchievements(a=>[{id:Date.now(),icon:"✓",text:`${sg.text}`,time:"just now",day:"today"},...a]);
      }
      return{...g,subGoals:subs,progress:prog};
    }));
  };
  const addSubGoal=(gid)=>{
    const text=(sgInputs[gid]||"").trim();
    if(!text)return;
    setGoals(gs=>gs.map(g=>g.id===gid?{...g,subGoals:[...g.subGoals,{id:Date.now(),text,done:false}]}:g));
    setSgInputs(s=>({...s,[gid]:""}));
  };
  const delSubGoal=(gid,sgid)=>{
    setGoals(gs=>gs.map(g=>{
      if(g.id!==gid)return g;
      const subs=g.subGoals.filter(s=>s.id!==sgid);
      const prog=subs.length>0?Math.round(subs.filter(s=>s.done).length/subs.length*100):g.progress;
      return{...g,subGoals:subs,progress:prog};
    }));
  };
  const goalContext=(g)=>{
    const days=g.deadline?daysUntil(g.deadline):null;
    if(g.progress===100)return{text:"\u2713 Completed",cls:"ok"};
    if(days===null)return{text:`${g.progress}% complete · no deadline`,cls:""};
    if(days<0)return{text:`Deadline passed · ${g.progress}% done`,cls:"warn"};
    if(days===0)return{text:`Due today · ${g.progress}% done`,cls:"warn"};
    const cls=days<=5&&g.progress<70?"warn":g.progress>=70?"ok":"";
    return{text:`${days} days left · ${g.progress}% done${days<=7&&g.progress<50?" — needs attention":""}`,cls};
  };

  // TASKS
  const [tasks,setTasks]=useState(()=>sv("tasks",{
    do:[{id:1,text:"Push latest YOLO training results",done:false}],
    plan:[{id:2,text:"Design Resume Analyzer architecture",done:false}],
    delegate:[],drop:[{id:3,text:"Reorganize Downloads folder",done:false}],
  }));
  const [tInp,setTInp]=useState({do:"",plan:"",delegate:"",drop:""});

  // WEEK
  const [wev,setWev]=useState(()=>sv("wev",{}));
  const [di2,setDi2]=useState({});
  const wd=getWD();
  const tdi=new Date().getDay();

  // PROJECTS
  const [projs,setProjs]=useState(()=>sv("projs",[
    {id:1,name:"YOLO Disease Detection",stack:["Python","YOLOv8","Colab"],color:"#c8a96e",tasks:{backlog:["Try YOLOv9 on dragon fruit dataset","Write evaluation script"],inprogress:["Net melon training run","Tune hyperparameters"],review:["mAP comparison table"],done:["Dataset preprocessing","YOLOv8 baseline"]}},
    {id:2,name:"News Dashboard",stack:["React","Spring Boot","MySQL"],color:"#9b7fd4",tasks:{backlog:["Add dark mode toggle","Write unit tests"],inprogress:["YouTube IFrame integration"],review:["CORS config review"],done:["MySQL schema setup","Backend API routes","Frontend connected"]}},
    {id:3,name:"Resume Analyzer",stack:["FastAPI","React","LLM"],color:"#6ecfa8",tasks:{backlog:["PDF parsing module","Prompt engineering","Score UI"],inprogress:["Project setup"],review:[],done:[]}},
  ]));
  const [ap,setAp]=useState(0);
  const [ki,setKi]=useState({});
  const [spm,setSpm]=useState(false);
  const [np,setNp]=useState({name:"",stack:"",color:"#9b7fd4"});
  const proj=projs[ap]||projs[0];
  const COLS=[["backlog","Backlog","#6a6880"],["inprogress","In Progress","#c8a96e"],["review","Review","#9b7fd4"],["done","Done","#6ecfa8"]];

  // PLACEMENTS
  const [plTab,setPlTab]=useState("pipeline");
  const [apps,setApps]=useState(()=>sv("apps",[
    {id:1,company:"Google",role:"SWE Intern",stage:"Applied",deadline:"2025-03-30",notes:"Via campus portal"},
    {id:2,company:"Microsoft",role:"SDE Intern",stage:"OA",deadline:"2025-04-05",notes:"OA link received"},
    {id:3,company:"Flipkart",role:"SDE",stage:"Researching",deadline:"",notes:"Check campus drive"},
    {id:4,company:"Infosys",role:"Systems Engineer",stage:"Interview",deadline:"2025-04-12",notes:"Round 1 done"},
    {id:5,company:"Sparsa AI",role:"Full Stack AI Intern",stage:"Applied",deadline:"2025-04-01",notes:"Cover letter sent"},
  ]));
  const [af,setAf]=useState("All");
  const [sam,setSam]=useState(false);
  const [na,setNa]=useState({company:"",role:"",stage:"Researching",deadline:"",notes:""});

  // INTERVIEW PREP
  const [iprep,setIprep]=useState(()=>sv("iprep",[
    {id:1,company:"Microsoft",expanded:false,rounds:[
      {num:"Round 1",type:"OA",notes:"LeetCode-style, 2 medium problems",status:"done"},
      {num:"Round 2",type:"Technical",notes:"Arrays & System Design basics — pending",status:"pending"},
    ]},
    {id:2,company:"Infosys",expanded:true,rounds:[
      {num:"Round 1",type:"Aptitude + Coding",notes:"Solved both coding Qs. Aptitude was straightforward",status:"done"},
      {num:"Round 2",type:"HR",notes:"Scheduled for Apr 15",status:"pending"},
    ]},
  ]));
  const [sipm,setSipm]=useState(false);
  const [nip,setNip]=useState({company:"",rounds:[{num:"Round 1",type:"OA",notes:"",status:"pending"}]});

  // RESUME VERSIONS
  const [resumes,setResumes]=useState(()=>sv("resumes",[
    {id:1,version:"v1.0",date:"2025-02-10",companies:["Infosys","TCS","Wipro"],changes:"Initial version — added YOLO project"},
    {id:2,version:"v1.1",date:"2025-03-01",companies:["Google","Microsoft","Flipkart"],changes:"Quantified metrics, added News Dashboard project, restructured skills section"},
    {id:3,version:"v1.2",date:"2025-03-18",companies:["Sparsa AI"],changes:"Tailored for Full Stack AI role — led with ML projects, added prompt engineering"},
  ]));
  const [srm,setSrm]=useState(false);
  const [nr,setNr]=useState({version:"",date:"",companies:"",changes:""});

  // PREP / CORE
  const [core,setCore]=useState(()=>sv("core",CORE_DATA));
  const [editSid,setEditSid]=useState(null);
  const [editSName,setEditSName]=useState("");
  const [editTKey,setEditTKey]=useState(null);
  const [editTName,setEditTName]=useState("");
  const [ntInps,setNtInps]=useState({});
  const [nsInp,setNsInp]=useState(false);
  const [nsName,setNsName]=useState("");
  const updCore=(sid,ti,s)=>setCore(c=>c.map(x=>x.id===sid?{...x,topics:x.topics.map((t,i)=>i===ti?{...t,s}:t)}:x));
  const addSubj=()=>{if(!nsName.trim())return;setCore(c=>[...c,{id:Date.now(),name:nsName.trim(),topics:[]}]);setNsName("");setNsInp(false);};
  const delSubj=(id)=>setCore(c=>c.filter(x=>x.id!==id));
  const renSubj=(id,n)=>{if(n.trim())setCore(c=>c.map(x=>x.id===id?{...x,name:n.trim()}:x));setEditSid(null);};
  const addTopic=(sid)=>{const t=(ntInps[sid]||"").trim();if(!t)return;setCore(c=>c.map(x=>x.id===sid?{...x,topics:[...x.topics,{n:t,s:"not_started"}]}:x));setNtInps(m=>({...m,[sid]:""}) );};
  const delTopic=(sid,ti)=>setCore(c=>c.map(x=>x.id===sid?{...x,topics:x.topics.filter((_,i)=>i!==ti)}:x));
  const renTopic=(sid,ti,n)=>{if(n.trim())setCore(c=>c.map(x=>x.id===sid?{...x,topics:x.topics.map((t,i)=>i===ti?{...t,n:n.trim()}:t)}:x));setEditTKey(null);};
  const cLabel=s=>({confident:"✓",shaky:"~",not_started:"–"}[s]);

  // DSA
  const [dsa,setDsa]=useState(()=>sv("dsa",DSA_DATA));
  const [dsaFil,setDsaFil]=useState("All");
  const [dsaSort,setDsaSort]=useState("default");
  const [dsaExp,setDsaExp]=useState({});
  const [dsaTM,setDsaTM]=useState(false);
  const [ndt,setNdt]=useState({t:"",cat:"Linear",target:10,notes:""});
  const [pInps,setPInps]=useState({});
  const [spf,setSpf]=useState({});
  const DSA_CATS2=["Linear","Search","Tree/Graph","DP","Advanced"];
  const updDsaC=(id,c)=>setDsa(d=>d.map(x=>x.id===id?{...x,c}:x));
  const updDsaF=(id,f,v)=>setDsa(d=>d.map(x=>x.id===id?{...x,[f]:v}:x));
  const addDsaT=()=>{if(!ndt.t.trim())return;setDsa(d=>[...d,{...ndt,id:Date.now(),c:0,problems:[]}]);setNdt({t:"",cat:"Linear",target:10,notes:""});setDsaTM(false);};
  const addProb=(tid)=>{const p=pInps[tid]||{};if(!p.name?.trim())return;setDsa(d=>d.map(x=>x.id===tid?{...x,problems:[...x.problems,{id:Date.now(),name:p.name,diff:p.diff||"Medium",link:p.link||"",done:false}]}:x));setPInps(pi=>({...pi,[tid]:{name:"",diff:"Medium",link:""}}));setSpf(s=>({...s,[tid]:false}));};
  const toggleProb=(tid,pid)=>{
    setDsa(d=>d.map(x=>{
      if(x.id!==tid)return x;
      const problems=x.problems.map(p=>p.id===pid?{...p,done:!p.done}:p);
      const prob=problems.find(p=>p.id===pid);
      if(prob&&prob.done){
        setAchievements(a=>[{id:Date.now(),icon:"💡",text:`Solved: ${prob.name} (${prob.diff})`,time:"just now",day:"today"},...a]);
      }
      return{...x,problems};
    }));
  };
  const delProb=(tid,pid)=>setDsa(d=>d.map(x=>x.id===tid?{...x,problems:x.problems.filter(p=>p.id!==pid)}:x));
  let dsaView=[...dsa];
  if(dsaFil!=="All"&&!["0","1","2","3"].includes(dsaFil))dsaView=dsaView.filter(x=>x.cat===dsaFil);
  if(["0","1","2","3"].includes(dsaFil))dsaView=dsaView.filter(x=>x.c===+dsaFil);
  if(dsaSort==="solved")dsaView.sort((a,b)=>b.problems.filter(p=>p.done).length-a.problems.filter(p=>p.done).length);
  if(dsaSort==="conf")dsaView.sort((a,b)=>b.c-a.c);

  // ACADEMICS
  const [aTab,setATab]=useState("countdown");
  const [subs,setSubs]=useState(()=>sv("subs",[
    {id:1,name:"Machine Learning",att:38,tot:45,exam:"2025-05-10",grade:"O",topics:[
      {n:"Supervised Learning",s:"confident"},{n:"Unsupervised Learning",s:"confident"},
      {n:"Neural Networks",s:"shaky"},{n:"CNNs & RNNs",s:"shaky"},
      {n:"Evaluation Metrics",s:"confident"},{n:"Feature Engineering",s:"not_started"},
    ]},
    {id:2,name:"Software Engineering",att:28,tot:40,exam:"2025-05-14",grade:"A+",topics:[]},
    {id:3,name:"Database Systems",att:35,tot:44,exam:"2025-05-12",grade:"A",topics:[
      {n:"ER Diagrams & Schema",s:"confident"},{n:"SQL Joins & Queries",s:"confident"},
      {n:"Normalization",s:"shaky"},{n:"Transactions",s:"not_started"},
      {n:"Indexing & Query Opt.",s:"not_started"},
    ]},
    {id:4,name:"Computer Networks",att:22,tot:38,exam:"2025-05-16",grade:"B+",topics:[
      {n:"OSI & TCP/IP Model",s:"not_started"},{n:"Application Layer (HTTP/DNS)",s:"shaky"},
      {n:"Transport Layer (TCP/UDP)",s:"shaky"},{n:"Network Layer (IP/Routing)",s:"not_started"},
      {n:"Data Link & Physical",s:"not_started"},
    ]},
    {id:5,name:"Theory of Computation",att:18,tot:36,exam:"2025-05-18",grade:"B",topics:[]},
    {id:6,name:"Deep Learning (Elective)",att:30,tot:34,exam:"2025-05-20",grade:"O",topics:[]},
  ]));
  const [newSubName,setNewSubName]=useState("");
  const [showNewSub,setShowNewSub]=useState(false);
  const updSub=(id,f,v)=>setSubs(s=>s.map(x=>x.id===id?{...x,[f]:v}:x));
  const addSub=()=>{if(!newSubName.trim())return;setSubs(s=>[...s,{id:Date.now(),name:newSubName.trim(),att:0,tot:0,exam:"",grade:"B",topics:[]}]);setNewSubName("");setShowNewSub(false);};
  const delSub=(id)=>setSubs(s=>s.filter(x=>x.id!==id));
  const cgpa=(()=>{const tot=subs.reduce((a,s)=>a+(GM[s.grade]??0)*3,0);const cr=subs.length*3;return cr>0?(tot/cr).toFixed(2):"-";})();
  const upcomingExams=[...subs].filter(s=>s.exam).map(s=>({...s,days:daysUntil(s.exam)})).sort((a,b)=>a.days-b.days);

  // ACADEMICS — Subject notes/topics — now shares subs array (single source of truth)
  const [acEditSid,setAcEditSid]=useState(null);
  const [acEditSName,setAcEditSName]=useState("");
  const [acEditTKey,setAcEditTKey]=useState(null);
  const [acEditTName,setAcEditTName]=useState("");
  const [acNtInps,setAcNtInps]=useState({});
  const [acNsInp,setAcNsInp]=useState(false);
  const [acNsName,setAcNsName]=useState("");
  // All subject-notes helpers now operate on subs directly
  const updAcSubj=(sid,ti,s)=>setSubs(c=>c.map(x=>x.id===sid?{...x,topics:(x.topics||[]).map((t,i)=>i===ti?{...t,s}:t)}:x));
  const addAcSubj=()=>{if(!acNsName.trim())return;setSubs(c=>[...c,{id:Date.now(),name:acNsName.trim(),att:0,tot:0,exam:"",grade:"B",topics:[]}]);setAcNsName("");setAcNsInp(false);};
  const delAcSubj=(id)=>setSubs(c=>c.filter(x=>x.id!==id));
  const renAcSubj=(id,n)=>{if(n.trim())setSubs(c=>c.map(x=>x.id===id?{...x,name:n.trim()}:x));setAcEditSid(null);};
  const addAcTopic=(sid)=>{const t=(acNtInps[sid]||"").trim();if(!t)return;setSubs(c=>c.map(x=>x.id===sid?{...x,topics:[...(x.topics||[]),{n:t,s:"not_started"}]}:x));setAcNtInps(m=>({...m,[sid]:""}));};
  const delAcTopic=(sid,ti)=>setSubs(c=>c.map(x=>x.id===sid?{...x,topics:(x.topics||[]).filter((_,i)=>i!==ti)}:x));
  const renAcTopic=(sid,ti,n)=>{if(n.trim())setSubs(c=>c.map(x=>x.id===sid?{...x,topics:(x.topics||[]).map((t,i)=>i===ti?{...t,n:n.trim()}:t)}:x));setAcEditTKey(null);};

  // SKILLS
  const [skillsTab,setSkillsTab]=useState("tree");
  const [skills,setSkills]=useState(()=>sv("skills",SKILLS_DATA));
  const [scat,setScat]=useState("All");
  const [sskm,setSskm]=useState(false);
  const [nsk,setNsk]=useState({n:"",cat:"Frontend",p:3,lp:0});
  const fskills=skills.filter(s=>scat==="All"||s.cat===scat);

  // LEARNING QUEUE
  const [lqueue,setLqueue]=useState(()=>sv("lqueue",[
    {id:1,title:"System Design Interview – Alex Xu",type:"Book",hrs:10,status:"inprogress",notes:"Chapter 4 done"},
    {id:2,title:"CS50 AI with Python",type:"Course",hrs:20,status:"todo",notes:"Harvard OCW free course"},
    {id:3,title:"FastAPI docs – advanced",type:"Docs",hrs:3,status:"todo",notes:"OAuth2 & background tasks"},
    {id:4,title:"Attention Is All You Need (paper)",type:"Paper",hrs:2,status:"done",notes:"Read once — re-read for transformers impl"},
  ]));
  const [slqm,setSlqm]=useState(false);
  const [nlq,setNlq]=useState({title:"",type:"Course",hrs:5,status:"todo",notes:""});
  const LQ_TYPES=["Course","Book","Paper","Docs","Video","Other"];

  // CERTIFICATIONS
  const [certs,setCerts]=useState(()=>sv("certs",[
    {id:1,name:"Google Cloud Associate",platform:"Coursera",targetDate:"2025-06-30",status:"inprogress",progress:35,notes:"GCP fundamentals done"},
    {id:2,name:"AWS Solutions Architect",platform:"A Cloud Guru",targetDate:"2025-08-15",status:"todo",progress:0,notes:""},
    {id:3,name:"TensorFlow Developer Certificate",platform:"Google",targetDate:"2025-07-01",status:"inprogress",progress:60,notes:"Model building module done"},
  ]));
  const [scm,setScm]=useState(false);
  const [nc,setNc]=useState({name:"",platform:"",targetDate:"",status:"todo",progress:0,notes:""});
  const CERT_STATUS={todo:"#6a6880",inprogress:"#c8a96e",done:"#6ecfa8"};

  // TIME
  const [tmode,setTmode]=useState("work");
  const [trun,setTrun]=useState(false);
  const [tsec,setTsec]=useState(0);
  const [tlbl,setTlbl]=useState("");
  const [tlnk,setTlnk]=useState("");
  const [tlogs,setTlogs]=useState(()=>sv("tlogs",[
    {id:1,type:"work",label:"YOLO model training run",link:"YOLO Disease Detection",duration:3720,startedAt:"09:14",day:tdi},
    {id:2,type:"waste",label:"Scrolling YouTube",link:"",duration:1260,startedAt:"10:15",day:tdi},
    {id:3,type:"work",label:"Spring Boot CORS debugging",link:"News Dashboard",duration:2880,startedAt:"11:00",day:tdi},
    {id:4,type:"break",label:"Lunch",link:"",duration:1800,startedAt:"13:00",day:tdi},
    {id:5,type:"work",label:"DSA practice",link:"",duration:3600,startedAt:"09:00",day:(tdi+6)%7},
    {id:6,type:"work",label:"React components",link:"News Dashboard",duration:5400,startedAt:"14:00",day:(tdi+5)%7},
  ]));
  const [pcount,setPcount]=useState(0);
  const [pphase,setPphase]=useState("work");
  const PW=25*60,PB=5*60;

  useEffect(()=>{
    if(!trun)return;
    const id=setInterval(()=>setTsec(s=>{
      if(tmode==="pomo"){
        const lim=pphase==="work"?PW:PB;
        if(s+1>=lim){
          if(pphase==="work"){
            // auto-save the completed focus session
            const now=new Date();
            const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
            setTlogs(l=>[{id:Date.now(),type:"work",label:"Pomodoro session",link:"",duration:PW,startedAt:hm,day:tdi},...l]);
            setPcount(c=>c+1);setPphase("break");return 0;
          } else {
            setPphase("work");setTrun(false);return 0;
          }
        }
      }
      return s+1;
    }),1000);
    return()=>clearInterval(id);
  },[trun,tmode,pphase]);

  const stopTimer=()=>{
    if(tsec<3){setTrun(false);setTsec(0);return;}
    const now=new Date();
    const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setTlogs(l=>[{id:Date.now(),type:tmode==="pomo"?"work":tmode,label:tlbl||(tmode==="pomo"?"Pomodoro session":"Session"),link:tlnk,duration:tsec,startedAt:hm,day:tdi},...l]);
    setTrun(false);setTsec(0);setTlbl("");setTlnk("");
  };
  const tByType=t=>tlogs.filter(l=>l.type===t).reduce((a,l)=>a+l.duration,0);
  const tByDay=(d,type)=>tlogs.filter(l=>l.day===d&&(type?l.type===type:true)).reduce((a,l)=>a+l.duration,0);
  const tw=tByType("work"),tb=tByType("break"),tv=tByType("waste"),gt=tw+tb+tv||1;
  const tc={work:"var(--a)",break:"var(--a3)",waste:"var(--d)",pomo:"var(--a2)"}[tmode];
  const tyc=t=>({work:"var(--a)",break:"var(--a3)",waste:"var(--d)"}[t]||"var(--m)");

  // HABITS
  const [habits,setHabits]=useState(()=>sv("habits",[
    {id:1,name:"Solve 1 DSA problem",icon:"🧩",color:"#9b7fd4",days:[true,true,false,true,true,false,false],streak:4},
    {id:2,name:"30 min reading / learning",icon:"📚",color:"#c8a96e",days:[true,true,true,true,false,false,false],streak:4},
    {id:3,name:"No phone before 10am",icon:"📵",color:"#6ecfa8",days:[true,false,true,true,true,false,false],streak:2},
    {id:4,name:"Push code to GitHub",icon:"💻",color:"#e06b6b",days:[false,true,false,true,true,false,false],streak:2},
    {id:5,name:"10 min walk / exercise",icon:"🏃",color:"#6ecfa8",days:[true,true,true,false,true,false,false],streak:3},
  ]));
  const [shm,setShm]=useState(false);
  const [nh,setNh]=useState({name:"",icon:"✅",color:"#9b7fd4"});
  const toggleHabitDay=(hid,di)=>{
    setHabits(hs=>hs.map(h=>{
      if(h.id!==hid)return h;
      const days=[...h.days];days[di]=!days[di];
      let streak=0;for(let i=tdi;i>=0&&days[i];i--)streak++;
      // push to feed when habit checked today
      if(di===tdi&&days[di]){
        setAchievements(a=>[{id:Date.now(),icon:h.icon,text:`${h.name}`,time:"just now",day:"today"},...a]);
      }
      return{...h,days,streak};
    }));
  };
  const addHabit=()=>{if(!nh.name.trim())return;setHabits(hs=>[...hs,{...nh,id:Date.now(),days:Array(7).fill(false),streak:0}]);setNh({name:"",icon:"✅",color:"#9b7fd4"});setShm(false);};

  // NOTES
  const [notes,setNotes]=useState(()=>sv("notes",[
    {id:1,title:"System Design Notes",body:"# Load Balancer\n- Distributes traffic across servers\n- Round robin vs least connections\n\n# CDN\n- Edge caching for static assets\n- Reduces latency significantly",updatedAt:"Mar 18"},
    {id:2,title:"Interview Tips",body:"- Clarify problem before jumping to code\n- Think aloud — interviewers want to see process\n- Always ask about edge cases\n- Practice explaining O(n) complexity",updatedAt:"Mar 17"},
    {id:3,title:"Project Ideas Backlog",body:"- Browser extension for DSA hints\n- CLI tool for resume formatting\n- Telegram bot for daily DSA problems\n- RAG system over college notes",updatedAt:"Mar 15"},
  ]));
  const [activeNote,setActiveNote]=useState(1);
  const [snnm,setSnnm]=useState(false);
  const curNote=notes.find(n=>n.id===activeNote);
  const updNote=(id,f,v)=>setNotes(ns=>ns.map(n=>n.id===id?{...n,[f]:v,updatedAt:"Today"}:n));
  const addNote=()=>{const id=Date.now();setNotes(ns=>[{id,title:"Untitled",body:"",updatedAt:"Today"},...ns]);setActiveNote(id);};
  const delNote=(id)=>{const ns=notes.filter(n=>n.id!==id);setNotes(ns);if(activeNote===id&&ns.length>0)setActiveNote(ns[0].id);};

  // ACCOUNTABILITY
  const [mood,setMood]=useState(null);
  const [wt,setWt]=useState("");
  const [wins,setWins]=useState([]);
  const [ckins,setCkins]=useState(()=>sv("ckins",[
    {date:"Mar 18",mood:"🔥",summary:"Pushed YOLO training run, solved 2 LC problems"},
    {date:"Mar 17",mood:"😊",summary:"Frontend connected to Spring Boot backend"},
  ]));
  const totT=Object.values(tasks).flat().length;
  const doneT=Object.values(tasks).flat().filter(t=>t.done).length;
  const avgProg=goals.length?Math.round(goals.reduce((a,g)=>a+g.progress,0)/goals.length):0;
  const submitCkin=()=>{
    if(!mood&&wins.length===0)return;
    const today=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
    setCkins(c=>[{date:today,mood:mood||"🙂",summary:wins.join("; ")||"Checked in"},...c]);
    setMood(null);setWins([]);setWt("");
  };

  // MONTHLY GOALS
  const MONTH_NAMES=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const now2=new Date();
  const [viewMonth,setViewMonth]=useState(now2.getMonth());
  const [viewYear,setViewYear]=useState(now2.getFullYear());
  const [mgCatFil,setMgCatFil]=useState("All");
  const [monthGoals,setMonthGoals]=useState(()=>sv("monthGoals",{
    [`${now2.getFullYear()}-${now2.getMonth()}`]:{
      focus:"Ship the YOLO disease detection project to 90%+ mAP. Hit 100 DSA problems total. Apply to at least 5 placement companies.",
      goals:[
        {id:1,title:"Reach 90% mAP on YOLO plant disease model",cat:"Project",priority:"High",progress:55,done:false,milestones:[
          {id:11,text:"Finish net melon dataset training",done:true},
          {id:12,text:"Run YOLOv9 comparison",done:false},
          {id:13,text:"Write evaluation report",done:false},
        ]},
        {id:2,title:"Solve 50 DSA problems this month",cat:"Learning",priority:"High",progress:40,done:false,milestones:[
          {id:21,text:"Complete Arrays & Strings (10 problems)",done:true},
          {id:22,text:"Complete Trees (8 problems)",done:false},
          {id:23,text:"Complete DP basics (5 problems)",done:false},
        ]},
        {id:3,title:"Apply to 5 placement companies",cat:"Placements",priority:"High",progress:60,done:false,milestones:[
          {id:31,text:"Apply to Google",done:true},
          {id:32,text:"Apply to Microsoft",done:true},
          {id:33,text:"Apply to 3 more companies",done:false},
        ]},
        {id:4,title:"Build Resume Analyzer MVP",cat:"Project",priority:"Med",progress:15,done:false,milestones:[
          {id:41,text:"Set up FastAPI backend",done:false},
          {id:42,text:"PDF parsing module",done:false},
          {id:43,text:"Basic scoring UI",done:false},
        ]},
        {id:5,title:"Revise OS and CN for placements",cat:"Academic",priority:"Med",progress:20,done:false,milestones:[
          {id:51,text:"OS: Processes, scheduling, memory",done:false},
          {id:52,text:"CN: OSI model, TCP/UDP, HTTP",done:false},
        ]},
      ],
      retro:{went_well:"",improve:"",next_month:""},
    }
  }));
  const [smgm,setSmgm]=useState(false);
  const [nmg,setNmg]=useState({title:"",cat:"Project",priority:"Med",progress:0});
  const monthKey=`${viewYear}-${viewMonth}`;
  const curMonthData=monthGoals[monthKey]||{focus:"",goals:[],retro:{went_well:"",improve:"",next_month:""}};
  const updMonthData=(patch)=>setMonthGoals(mg=>({...mg,[monthKey]:{...curMonthData,...patch}}));
  const updMonthRetro=(f,v)=>updMonthData({retro:{...curMonthData.retro,[f]:v}});
  const mgGoals=curMonthData.goals||[];
  const filteredMG=mgCatFil==="All"?mgGoals:mgGoals.filter(g=>g.cat===mgCatFil);
  const addMG=()=>{
    if(!nmg.title.trim())return;
    updMonthData({goals:[...mgGoals,{...nmg,id:Date.now(),done:false,milestones:[]}]});
    setNmg({title:"",cat:"Project",priority:"Med",progress:0});setSmgm(false);
  };
  const updMG=(id,patch)=>updMonthData({goals:mgGoals.map(g=>g.id===id?{...g,...patch}:g)});
  const delMG=(id)=>updMonthData({goals:mgGoals.filter(g=>g.id!==id)});
  const toggleMGDone=(id)=>updMonthData({goals:mgGoals.map(g=>g.id===id?{...g,done:!g.done,progress:!g.done?100:g.progress}:g)});
  const toggleMS=(gid,msid)=>updMonthData({goals:mgGoals.map(g=>{
    if(g.id!==gid)return g;
    const milestones=g.milestones.map(m=>m.id===msid?{...m,done:!m.done}:m);
    const progress=milestones.length>0?Math.round(milestones.filter(m=>m.done).length/milestones.length*100):g.progress;
    return{...g,milestones,progress};
  })});
  const addMS=(gid,text)=>{
    if(!text.trim())return;
    updMonthData({goals:mgGoals.map(g=>g.id===gid?{...g,milestones:[...g.milestones,{id:Date.now(),text:text.trim(),done:false}]}:g)});
  };
  const delMS=(gid,msid)=>updMonthData({goals:mgGoals.map(g=>g.id===gid?{...g,milestones:g.milestones.filter(m=>m.id!==msid)}:g)});
  const [msInputs,setMsInputs]=useState({});
  const MG_CATS=["All","Project","Learning","Placements","Academic","Health","Personal"];
  const mgDone=mgGoals.filter(g=>g.done).length;
  const mgInProg=mgGoals.filter(g=>!g.done&&g.progress>0).length;
  const mgAvgProg=mgGoals.length?Math.round(mgGoals.reduce((a,g)=>a+g.progress,0)/mgGoals.length):0;
  const mgPriorityColor=p=>({High:"#e06b6b",Med:"#c8a96e",Low:"#6ecfa8"}[p]||"#6a6880");

  // CROSS-TAB COMPUTED VALUES
  // DSA total solved (for DSA-linked goals)
  const dsaTotalSolved=dsa.reduce((a,t)=>a+t.problems.filter(p=>p.done).length,0);
  // Project kanban completion % (for project-linked goals)
  const projProgress=(projName)=>{
    const p=projs.find(x=>x.name===projName);
    if(!p)return null;
    const all=Object.values(p.tasks).flat().length;
    if(all===0)return 0;
    return Math.round(p.tasks.done.length/all*100);
  };
  // Compute effective goal progress (live, respects linked source)
  const effectiveProgress=(g)=>{
    if(g.linkedDSA&&g.dsaTarget>0)return Math.min(100,Math.round(dsaTotalSolved/g.dsaTarget*100));
    if(g.linkedProject){const pp=projProgress(g.linkedProject);if(pp!==null)return pp;}
    return g.progress;
  };
  // Habits today completion %
  const habitsToday=habits.length>0?Math.round(habits.filter(h=>h.days[tdi]).length/habits.length*100):0;
  // Time spent on a project this week (seconds)
  const projTimeThisWeek=(projName)=>tlogs.filter(l=>l.link===projName).reduce((a,l)=>a+l.duration,0);

  // Pin/unpin goal to current month — defined here because mgGoals + updMonthData are ready
  const toggleMonthPin=(gid)=>{
    // Use functional updaters throughout to avoid stale closures
    setGoals(gs=>{
      const g=gs.find(x=>x.id===gid);
      if(!g)return gs;
      const willPin=!g.monthPinned;
      if(willPin){
        // Add to monthly goals using functional updater on monthGoals
        setMonthGoals(mg=>{
          const key=`${viewYear}-${viewMonth}`;
          const cur=mg[key]||{focus:"",goals:[],retro:{went_well:"",improve:"",next_month:""}};
          const exists=(cur.goals||[]).find(m=>m.linkedGoalId===gid);
          if(exists)return mg;
          const newEntry={id:Date.now(),title:g.title,cat:g.cat,priority:g.priority,progress:g.progress,done:false,milestones:[],linkedGoalId:gid};
          return{...mg,[key]:{...cur,goals:[...(cur.goals||[]),newEntry]}};
        });
      }
      return gs.map(x=>x.id===gid?{...x,monthPinned:willPin}:x);
    });
  };
  // Sync pinned goals into monthly display (derived — not stored separately)
  const syncedMgGoals=mgGoals.map(mg=>{
    if(!mg.linkedGoalId)return mg;
    const linked=goals.find(g=>g.id===mg.linkedGoalId);
    if(!linked)return mg;
    return{...mg,progress:effectiveProgress(linked),title:linked.title};
  });

  // QUICK ADD
  const handleQuickAdd=()=>{
    if(!qaText.trim())return;
    if(qaMode==="task"){setTasks(ts=>({...ts,do:[...ts.do,{id:Date.now(),text:qaText.trim(),done:false}]}));}
    else if(qaMode==="win"){setWins(w=>[...w,qaText.trim()]);}
    else if(qaMode==="note"){const id=Date.now();setNotes(ns=>[{id,title:qaText.trim(),body:"",updatedAt:"Today"},...ns]);setActiveNote(id);}
    setAchievements(a=>[{id:Date.now(),icon:qaMode==="task"?"📝":qaMode==="win"?"🏆":"📓",text:qaText.trim(),time:"just now",day:"today"},...a]);
    setQaText("");
  };

  const addGoal=()=>{if(!ng.title.trim())return;setGoals(g=>[...g,{...ng,id:Date.now(),subGoals:[],sgExpanded:true,linkedProject:ng.linkedProject||"" ,linkedDSA:false,dsaTarget:0,monthPinned:false}]);setNg({title:"",cat:"Project",priority:"Med",deadline:"",linkedProject:"",progress:0});setSgm(false);};
  const addTask=(q)=>{const t=tInp[q].trim();if(!t)return;setTasks(ts=>({...ts,[q]:[...ts[q],{id:Date.now(),text:t,done:false}]}));setTInp(x=>({...x,[q]:""}));};
  const addWev=(i)=>{const t=(di2[i]||"").trim();if(!t)return;setWev(e=>({...e,[i]:[...(e[i]||[]),{id:Date.now(),text:t}]}));setDi2(d=>({...d,[i]:""}));};
  const addKCard=(pid,col)=>{const t=(ki[`${pid}-${col}`]||"").trim();if(!t)return;setProjs(ps=>ps.map(p=>p.id===pid?{...p,tasks:{...p.tasks,[col]:[...p.tasks[col],t]}}:p));setKi(k=>({...k,[`${pid}-${col}`]:""}));};
  const moveCard=(pid,from,toIdx,ci)=>{const to=COLS[toIdx][0];if(from===to)return;setProjs(ps=>ps.map(p=>{if(p.id!==pid)return p;const card=p.tasks[from][ci];return{...p,tasks:{...p.tasks,[from]:p.tasks[from].filter((_,i)=>i!==ci),[to]:[...p.tasks[to],card]}};}));};
  const delKCard=(pid,col,ci)=>setProjs(ps=>ps.map(p=>p.id===pid?{...p,tasks:{...p.tasks,[col]:p.tasks[col].filter((_,i)=>i!==ci)}}:p));
  const addProj=()=>{if(!np.name.trim())return;const stack=np.stack.split(",").map(s=>s.trim()).filter(Boolean);setProjs(ps=>[...ps,{id:Date.now(),name:np.name,stack,color:np.color,tasks:{backlog:[],inprogress:[],review:[],done:[]}}]);setNp({name:"",stack:"",color:"#9b7fd4"});setSpm(false);};
  const addApp=()=>{if(!na.company.trim())return;setApps(a=>[...a,{...na,id:Date.now()}]);setNa({company:"",role:"",stage:"Researching",deadline:"",notes:""});setSam(false);};
  const addLQ=()=>{if(!nlq.title.trim())return;setLqueue(l=>[...l,{...nlq,id:Date.now()}]);setNlq({title:"",type:"Course",hrs:5,status:"todo",notes:""});setSlqm(false);};
  const addCert=()=>{if(!nc.name.trim())return;setCerts(c=>[...c,{...nc,id:Date.now()}]);setNc({name:"",platform:"",targetDate:"",status:"todo",progress:0,notes:""});setScm(false);};
  const addIP=()=>{if(!nip.company.trim())return;setIprep(p=>[...p,{...nip,id:Date.now(),expanded:true}]);setNip({company:"",rounds:[{num:"Round 1",type:"OA",notes:"",status:"pending"}]});setSipm(false);};
  const addResume=()=>{if(!nr.version.trim())return;const companies=(nr.companies||"").split(",").map(s=>s.trim()).filter(Boolean);setResumes(r=>[...r,{...nr,id:Date.now(),companies}]);setNr({version:"",date:"",companies:"",changes:""});setSrm(false);};

  // Research notes — declared here so save useEffect can reference it
  const [appResearch,setAppResearch]=useState(()=>sv("appResearch",{}));
  const [expandedResearch,setExpandedResearch]=useState({});
  const updResearch=(id,field,val)=>setAppResearch(r=>({...r,[id]:{...(r[id]||{}), [field]:val}}));

  // ── Save all data to localStorage ────────────────────────────
  useEffect(()=>{
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        userName, avatarEmoji, avatarColor, dayStatus, focusToday,
        theme, wrDone,
        theme, wrDone,
    achievements, goals, tasks, wev, projs, apps, iprep, resumes,
        core, dsa, subs, skills, lqueue, certs, tlogs,
        habits, notes, ckins, monthGoals, appResearch,
      }));
    } catch(e) { /* quota exceeded */ }
  },[
    userName, avatarEmoji, avatarColor, dayStatus, focusToday,
    achievements, goals, tasks, wev, projs, apps, iprep, resumes,
    core, dsa, subs, skills, lqueue, certs, tlogs,
    habits, notes, ckins, monthGoals, appResearch,
  ]);

  // ── Cloud sync — push to Supabase whenever data changes ─────
  useEffect(()=>{
    if(!authUser)return;
    const timer=setTimeout(async()=>{
      setSyncStatus("syncing");
      try{
        const data=JSON.parse(localStorage.getItem(STORE_KEY)||"{}");
        await sbPush(data);
        setSyncStatus("ok");
        setLastSync(new Date().toLocaleTimeString());
      }catch(e){
        setSyncStatus("err");
        console.warn("Sync failed:",e.message);
      }
    },1500); // debounce 1.5s after last change
    return()=>clearTimeout(timer);
  },[
    userName,avatarEmoji,avatarColor,dayStatus,focusToday,
    achievements,goals,tasks,wev,projs,apps,iprep,resumes,
    core,dsa,subs,skills,lqueue,certs,tlogs,
    habits,notes,ckins,monthGoals,appResearch,authUser,
  ]);

  // ── GLOBAL SEARCH & SHORTCUTS ─────────────────────────────
  const [showSearch,setShowSearch]=useState(false);
  const [showShortcuts,setShowShortcuts]=useState(false);
  const [searchQ,setSearchQ]=useState("");
  const [searchIdx,setSearchIdx]=useState(0);

  // Build search index from all live data
  const buildIndex=()=>{
    const results=[];
    // Goals
    goals.forEach(g=>results.push({icon:"🎯",title:g.title,sub:`${g.cat} · ${g.priority} priority · ${g.progress}%`,tab:"goals",badge:"Goal"}));
    // DSA problems
    dsa.forEach(t=>t.problems.forEach(p=>results.push({icon:p.done?"✓":"○",title:p.name,sub:`${t.t} · ${p.diff}`,tab:"dsa",badge:"DSA"})));
    // Notes
    notes.forEach(n=>results.push({icon:"📓",title:n.title,sub:n.body.substring(0,60).replace(/\n/g," "),tab:"notes",badge:"Note"}));
    // Placements
    apps.forEach(a=>results.push({icon:"💼",title:a.company,sub:`${a.role} · ${a.stage}`,tab:"placements",badge:"App"}));
    // Projects
    projs.forEach(p=>results.push({icon:"🏗️",title:p.name,sub:p.stack.join(", "),tab:"projects",badge:"Project"}));
    // Habits
    habits.forEach(h=>results.push({icon:h.icon,title:h.name,sub:`Streak: ${h.streak} days`,tab:"habits",badge:"Habit"}));
    // Skills
    skills.forEach(s=>results.push({icon:"⚡",title:s.n,sub:`${s.cat} · ${"★".repeat(s.p)}${"☆".repeat(5-s.p)}`,tab:"skills",badge:"Skill"}));
    // Core subjects
    core.forEach(c=>results.push({icon:"📚",title:c.name,sub:`${c.topics.filter(t=>t.s==="confident").length}/${c.topics.length} topics confident`,tab:"core",badge:"Prep"}));
    return results;
  };

  const searchResults=searchQ.trim().length<1?[]:buildIndex().filter(r=>
    r.title.toLowerCase().includes(searchQ.toLowerCase())||
    r.sub.toLowerCase().includes(searchQ.toLowerCase())
  ).slice(0,12);


  // Weekly review — prompt on Sunday if not done this week
  useEffect(()=>{
    const today=new Date();
    if(today.getDay()===0){ // Sunday
      const todayStr=today.toISOString().split("T")[0];
      if(wrDone!==todayStr) setShowWeeklyReview(true);
    }
  },[]);

  // Keyboard shortcuts useEffect
  useEffect(()=>{
    const handler=(e)=>{
      const tag=document.activeElement?.tagName?.toLowerCase();
      const inInput=tag==="input"||tag==="textarea"||tag==="select";
      // Cmd/Ctrl+K → search
      if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setShowSearch(s=>!s);setSearchQ("");setSearchIdx(0);return;}
      // Escape → close any overlay
      if(e.key==="Escape"){setShowSearch(false);setShowShortcuts(false);return;}
      // ? → shortcuts
      if(e.key==="?"&&!inInput){setShowShortcuts(s=>!s);return;}
      // Arrow keys in search
      if(showSearch&&e.key==="ArrowDown"){e.preventDefault();setSearchIdx(i=>Math.min(i+1,searchResults.length-1));return;}
      if(showSearch&&e.key==="ArrowUp"){e.preventDefault();setSearchIdx(i=>Math.max(i-1,0));return;}
      if(showSearch&&e.key==="Enter"&&searchResults[searchIdx]){
        setTab(searchResults[searchIdx].tab);
        setShowSearch(false);setSearchQ("");return;
      }
      // Single-key tab navigation (not in input)
      if(inInput||showSearch||showShortcuts)return;
      const map={h:"home",g:"goals",t:"tasks",w:"week",m:"month",p:"projects",d:"dsa",a:"academics",s:"skills",n:"notes"};
      if(map[e.key.toLowerCase()]){e.preventDefault();setTab(map[e.key.toLowerCase()]);}
    };
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  },[showSearch,showShortcuts,searchResults,searchIdx]);

  // ── PHASE 4 COMPUTED VALUES ──────────────────────────────────

  // Tab badges
  const badgeApps=apps.filter(a=>["Applied","OA","Interview"].includes(a.stage)).length;
  const badgeAcademics=subs.filter(s=>s.tot>0&&Math.round((s.att/s.tot)*100)<75).length;
  const badgeDSA=tlogs.filter(l=>l.day===tdi&&l.type==="work"&&(l.label.toLowerCase().includes("dsa")||l.label.toLowerCase().includes("problem")||l.label.toLowerCase().includes("leetcode"))).length;

  // DSA streak: consecutive days with a DSA-tagged work session
  const dsaStreak=(()=>{
    let streak=0;
    for(let i=tdi;i>=0;i--){
      const hasSession=tlogs.some(l=>l.day===i&&l.type==="work"&&(l.label.toLowerCase().includes("dsa")||l.label.toLowerCase().includes("problem")||l.label.toLowerCase().includes("leetcode")));
      if(hasSession)streak++;
      else break;
    }
    return streak;
  })();

  // Placement readiness score (0-100)
  const readinessScore=(()=>{
    const dsaConf=dsa.length>0?Math.round(dsa.reduce((a,t)=>a+t.c,0)/dsa.length/3*100):0;          // 25pts
    const coreConf=core.length>0?(()=>{const allTopics=core.flatMap(c=>c.topics);return allTopics.length>0?Math.round(allTopics.filter(t=>t.s==="confident").length/allTopics.length*100):0;})():0; // 25pts
    const appsScore=Math.min(100,apps.filter(a=>a.stage!=="Researching").length/10*100);             // 20pts
    const resumeScore=Math.min(100,resumes.length/3*100);                                            // 10pts
    const projectsScore=Math.min(100,projs.filter(p=>p.tasks.done.length>0).length/3*100);          // 10pts
    const skillsScore=skills.length>0?Math.round(skills.reduce((a,s)=>a+s.p,0)/skills.length/5*100):0; // 10pts
    return Math.round(dsaConf*0.25+coreConf*0.25+appsScore*0.20+resumeScore*0.10+projectsScore*0.10+skillsScore*0.10);
  })();
  const readinessGrade=readinessScore>=80?"A":readinessScore>=65?"B":readinessScore>=50?"C":readinessScore>=35?"D":"F";
  const readinessColor=readinessScore>=80?"var(--a3)":readinessScore>=65?"var(--a)":readinessScore>=50?"var(--w)":"var(--d)";
  const readinessLabel=readinessScore>=80?"Placement Ready":readinessScore>=65?"Good Progress":readinessScore>=50?"On Track":"Needs Work";

  // Goal deadlines falling in current week (for Week tab)
  const goalDeadlinesThisWeek=goals.reduce((acc,g)=>{
    if(!g.deadline)return acc;
    const dl=new Date(g.deadline);
    for(let i=0;i<7;i++){
      if(wd[i]&&dl.toDateString()===wd[i].toDateString()){
        if(!acc[i])acc[i]=[];
        acc[i].push(g);
      }
    }
    return acc;
  },{});

  // Research notes state - stored per app id
  // Markdown renderer for notes preview
  const renderMd=(text)=>{
    if(!text)return"";
    return text
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/^### (.+)$/gm,"<h3>$1</h3>")
      .replace(/^## (.+)$/gm,"<h2>$1</h2>")
      .replace(/^# (.+)$/gm,"<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
      .replace(/\*(.+?)\*/g,"<em>$1</em>")
      .replace(/`(.+?)`/g,"<code>$1</code>")
      .replace(/^---$/gm,"<hr>")
      .replace(/^[-*] (.+)$/gm,"<li>$1</li>")
      .replace(/\n/g,"<br>");
  };

  const TABS=[["home","Home"],["goals","Goals"],["tasks","Today"],["week","Week"],["month","Month"],["projects","Projects"],["placements","Placements"],["core","Prep"],["dsa","DSA"],["academics","Academics"],["skills","Skills"],["time","Time"],["habits","Habits"],["notes","Notes"],["account","Track"]];

  // ── AUTH SCREEN ───────────────────────────────────────────────
  if(!authUser){
    return(
      <>
        <style>{FONTS+CSS}</style>
        <div className={`auth-screen${theme==="light"?" light":""}`}>
          <div className="auth-box">
            <div className="auth-logo">Focusboard</div>
            <div className="auth-sub">// B.Tech placement tracker</div>
            <div className="auth-title">{authMode==="signin"?"Welcome back":"Create account"}</div>
            {authErr&&<div className="auth-err">{authErr}</div>}
            {authOk&&<div className="auth-ok">{authOk}</div>}
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input className="auth-inp" type="email" value={authEmail}
                onChange={e=>setAuthEmail(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleAuth()}
                placeholder="you@email.com"/>
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input className="auth-inp" type="password" value={authPw}
                onChange={e=>setAuthPw(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleAuth()}
                placeholder="••••••••"/>
            </div>
            <button className="auth-btn" disabled={authLoading} onClick={handleAuth}>
              {authLoading?"Please wait...":(authMode==="signin"?"Sign In":"Create Account")}
            </button>
            <div className="auth-switch">
              {authMode==="signin"?(
                <>No account? <button onClick={()=>{setAuthMode("signup");setAuthErr("");setAuthOk("");}}>Sign up</button></>
              ):(
                <>Already have one? <button onClick={()=>{setAuthMode("signin");setAuthErr("");setAuthOk("");}}>Sign in</button></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return(
    <>
      <style>{FONTS+CSS}</style>
      <div className={`app${theme==="light"?" light":""}`}>
        {/* ── SIDEBAR ── */}
        {!sidebarOpen&&<div className="sb-overlay" onClick={()=>setSidebarOpen(false)}/>}
        <div className={`sidebar${sidebarOpen?"":" collapsed"}`}>
          {/* Logo */}
          <div className="sb-top">
            <span className="logo">Focusboard</span>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:4}}>
              <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,marginRight:6}}>{authUser.email}</span>
              <div className={`sync-badge${syncStatus==="err"?" err":""}`} title={syncStatus==="ok"?`Last synced ${lastSync}`:""}>
                <div className="sync-dot"/>
                <span>{syncStatus==="syncing"?"↻":syncStatus==="ok"?"✓":syncStatus==="err"?"✗":"–"}</span>
              </div>
            </div>
          </div>
          {/* Tools row */}
          <div className="sb-tools">
            <button className="sb-tool-btn" title="Search (⌘K)"
              onClick={()=>{setShowSearch(true);setSearchQ("");setSearchIdx(0);}}>🔍</button>
            <button className="sb-tool-btn" title="Keyboard shortcuts"
              onClick={()=>setShowShortcuts(true)}>⌨</button>
            <button className="sb-tool-btn" title="Toggle theme"
              onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}>
              {theme==="dark"?"☀️":"🌙"}</button>
            <button className="sb-tool-btn" title="Export data"
              onClick={()=>{
                const data=JSON.parse(localStorage.getItem(STORE_KEY)||"{}");
                const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
                const url=URL.createObjectURL(blob);
                const a=document.createElement("a");
                a.href=url;a.download=`focusboard-backup-${new Date().toISOString().split("T")[0]}.json`;
                a.click();URL.revokeObjectURL(url);
              }}>⬆</button>
            <label className="sb-tool-btn" title="Import data" style={{cursor:"pointer"}}>
              ⬇
              <input type="file" accept=".json" style={{display:"none"}} onChange={e=>{
                const file=e.target.files[0];if(!file)return;
                const reader=new FileReader();
                reader.onload=ev=>{
                  try{const data=JSON.parse(ev.target.result);localStorage.setItem(STORE_KEY,JSON.stringify(data));window.location.reload();}
                  catch{alert("Invalid backup file.");}
                };
                reader.readAsText(file);
              }}/>
            </label>
            <button className="sb-tool-btn danger" title="Sign out"
              onClick={handleSignOut}>⏻</button>
          </div>
          {/* Nav groups */}
          <nav className="sb-nav">
            {[
              {group:"Dashboard",icon:"📊",items:[
                {id:"home",lbl:"Home",icon:"🏠"},
              ]},
              {group:"Goals & Planning",icon:"🎯",items:[
                {id:"goals",lbl:"Goals",icon:"🎯"},
                {id:"tasks",lbl:"Today",icon:"✅"},
                {id:"week",lbl:"Week",icon:"📅"},
                {id:"month",lbl:"Month",icon:"🗓"},
              ]},
              {group:"Placement",icon:"💼",items:[
                {id:"projects",lbl:"Projects",icon:"🏗️"},
                {id:"placements",lbl:"Placements",icon:"💼"},
                {id:"core",lbl:"Prep",icon:"📚"},
                {id:"dsa",lbl:"DSA",icon:"💡"},
              ]},
              {group:"Academics",icon:"🎓",items:[
                {id:"academics",lbl:"Academics",icon:"🎓"},
                {id:"skills",lbl:"Skills",icon:"⚡"},
              ]},
              {group:"Personal",icon:"⏱",items:[
                {id:"time",lbl:"Time",icon:"⏱"},
                {id:"habits",lbl:"Habits",icon:"🔥"},
                {id:"notes",lbl:"Notes",icon:"📓"},
                {id:"account",lbl:"Track",icon:"📊"},
              ]},
            ].map(({group,items})=>{
              const isCollapsed=collapsedGroups[group];
              return(
                <div key={group} className="sb-group">
                  <div className="sb-group-hdr" onClick={()=>toggleGroup(group)}>
                    <span className="sb-group-label">{group}</span>
                    <span className={`sb-group-chev${isCollapsed?"":" open"}`}>▶</span>
                  </div>
                  {!isCollapsed&&items.map(({id,lbl,icon})=>{
                    const badge=id==="placements"?badgeApps:id==="academics"?badgeAcademics:id==="dsa"?badgeDSA:0;
                    const badgeColor=id==="placements"?"#c8a96e":id==="academics"?"#e06b6b":id==="dsa"?"#6ecfa8":"";
                    return(
                      <button key={id} className={`sb-item${tab===id?" active":""}`}
                        onClick={()=>{setTab(id);if(window.innerWidth<=768)setSidebarOpen(false);}}>
                        <span className="sb-icon">{icon}</span>
                        <span className="sb-label">{lbl}</span>
                        {badge>0&&(
                          <span className="sb-badge" style={{background:badgeColor+"33",color:badgeColor,border:`1px solid ${badgeColor}66`}}>{badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className={`main${sidebarOpen?"":" full"}`}>
          <div className="topbar">
            <button className="burger" onClick={()=>setSidebarOpen(s=>!s)}>☰</button>
            <span className="topbar-title">
              {TABS.find(([id])=>id===tab)?.[1]||"Focusboard"}
            </span>
          </div>
          <div className="con">

{/* ── HOME ── */}
{tab==="home"&&(()=>{
  const now=new Date();
  const dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dateStr=`${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const initials=userName.split(" ").map(w=>w[0]).join("").substring(0,2).toUpperCase();

  // Sparkline data — time tracker by day
  const sparkFocus=Array.from({length:7},(_,i)=>tByDay(i,"work"));
  // DSA sparkline: use time logs tagged to DSA sessions per day as a proxy
  // (problems solved per day would need per-problem timestamps - future enhancement)
  const sparkDSA=Array.from({length:7},(_,i)=>{
    const dayLogs=tlogs.filter(l=>l.day===i&&l.type==="work"&&(l.label.toLowerCase().includes("dsa")||l.label.toLowerCase().includes("leetcode")||l.label.toLowerCase().includes("problem")));
    return dayLogs.length;
  });
  const sparkHabits=Array.from({length:7},(_,i)=>
    habits.length>0?Math.round(habits.filter(h=>h.days[i]).length/habits.length*100):0
  );
  const maxFocus=Math.max(...sparkFocus,1);

  // Progress rings data
  const avgGoalProg=goals.length?Math.round(goals.reduce((a,g)=>a+effectiveProgress(g),0)/goals.length):0;
  const dsaLinked=goals.find(g=>g.linkedDSA);
  const dsaRingProg=dsaLinked?effectiveProgress(dsaLinked):Math.min(100,Math.round(dsaTotalSolved/100*100));
  const appsActive=apps.filter(a=>["Applied","OA","Interview"].includes(a.stage)).length;
  const appTarget=10;
  const curMonthProg=mgGoals.length?Math.round(mgGoals.reduce((a,g)=>a+g.progress,0)/mgGoals.length):0;
  const habitsWeekPct=habits.length>0?Math.round(habits.reduce((a,h)=>a+h.days.filter(Boolean).length,0)/(habits.length*7)*100):0;

  // Alerts
  const alerts=[];
  upcomingExams.slice(0,1).forEach(e=>{
    if(e.days<=7&&e.days>=0)alerts.push({type:"warn",icon:"📅",text:`${e.name} exam in ${e.days} day${e.days!==1?"s":""} — prep now`});
  });
  goals.forEach(g=>{
    const days=g.deadline?daysUntil(g.deadline):null;
    if(days!==null&&days<=10&&days>=0&&effectiveProgress(g)<50)
      alerts.push({type:"warn",icon:"⚠️",text:`${g.title.substring(0,35)}… is ${effectiveProgress(g)}% done with ${days} days left`});
  });
  skills.filter(s=>s.lp>14).slice(0,1).forEach(s=>{
    alerts.push({type:"info",icon:"💡",text:`${s.n} hasn't been practiced in ${s.lp} days — getting rusty`});
  });
  if(habitsToday===100)alerts.push({type:"ok",icon:"🔥",text:"All habits done for today — great consistency!"});
  else if(habitsToday>0)alerts.push({type:"info",icon:"🌱",text:`${habitsToday}% habits done today — ${habits.filter(h=>!h.days[tdi]).length} left`});
  if(alerts.length===0)alerts.push({type:"ok",icon:"✓",text:"Everything looks on track today. Keep it up."});

  // Today tasks
  const todayTasks=[...tasks.do,...tasks.plan].slice(0,4);

  // Feed
  const feedItems=achievements.filter(a=>feedTab==="today"?a.day==="today":feedTab==="week"?a.day==="today"||a.day==="week":true);

  const Ring=({pct,color,size=52,stroke=5,label,value,onClick})=>{
    const r=(size-stroke*2)/2;const circ=2*Math.PI*r;const dash=circ*(pct/100);
    return(
      <div className="ring-card" onClick={onClick} style={{padding:"12px 8px"}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--b2)" strokeWidth={stroke}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{transition:"stroke-dasharray 0.5s ease"}}/>
          <text x={size/2} y={size/2+4} textAnchor="middle" fill={color}
            style={{fontFamily:"var(--fm)",fontSize:"11px",fontWeight:500,transform:"rotate(90deg)",transformOrigin:`${size/2}px ${size/2}px`}}>
            {value||pct+"%"}
          </text>
        </svg>
        <div className="ring-lbl">{label}</div>
      </div>
    );
  };

  const Sparkline=({data,color,title,value,unit})=>{
    const max=Math.max(...data,1);
    return(
      <div className="sparkline-card">
        <div className="sp-header">
          <span className="sp-title">{title}</span>
          <span className="sp-val" style={{color}}>{value}{unit}</span>
        </div>
        <div className="sp-chart">
          {data.map((v,i)=>(
            <div key={i} className="sp-bar"
              style={{height:`${Math.max(4,(v/max)*36)}px`,background:i===tdi?color:color+"55"}}/>
          ))}
        </div>
        <div className="sp-days">
          {["S","M","T","W","T","F","S"].map((d,i)=>(
            <div key={i} className="sp-day" style={{color:i===tdi?"var(--a)":"var(--m)"}}>{d}</div>
          ))}
        </div>
      </div>
    );
  };

  return(
    <div className="home-wrap">

      {/* Identity Bar */}
      {/* Profile Edit Modal */}
      {showProfileEdit&&(
        <div className="ov" onClick={e=>e.target===e.currentTarget&&setShowProfileEdit(false)}>
          <div className="md">
            <div className="mdt">Edit Profile</div>
            <div className="f">
              <label>Name</label>
              <input value={editName} onChange={e=>setEditName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&(setUserName(editName||userName),setAvatarEmoji(editEmoji),setShowProfileEdit(false))}
                placeholder="Your name"/>
            </div>
            <div className="f">
              <label>Avatar — choose an emoji (or leave blank for initials)</label>
              <div className="emoji-grid">
                {AVATAR_EMOJIS.map((em,i)=>(
                  <div key={i} className={`emoji-opt${editEmoji===em?" sel":""}`}
                    onClick={()=>setEditEmoji(em)}>
                    {em||<span style={{fontFamily:"var(--fd)",fontSize:14,fontWeight:600,color:avatarColor}}>{(editName||userName).split(" ").map(w=>w[0]).join("").substring(0,2).toUpperCase()}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="f">
              <label>Avatar colour</label>
              <div className="color-grid">
                {AVATAR_COLORS.map(c=>(
                  <div key={c} className={`color-swatch${avatarColor===c?" sel":""}`}
                    style={{background:c}}
                    onClick={()=>setAvatarColor(c)}/>
                ))}
              </div>
            </div>
            {/* Preview */}
            <div style={{display:"flex",justifyContent:"center",margin:"16px 0"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:avatarColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontFamily:"var(--fd)",fontWeight:600,color:"#080810"}}>
                {editEmoji||(editName||userName).split(" ").map(w=>w[0]).join("").substring(0,2).toUpperCase()}
              </div>
            </div>
            <div className="ma">
              <button className="btn bg" onClick={()=>setShowProfileEdit(false)}>Cancel</button>
              <button className="btn bp" onClick={()=>{setUserName(editName||userName);setAvatarEmoji(editEmoji);setShowProfileEdit(false);}}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="id-bar">
        <div className="avatar"
          style={{background:avatarColor,fontSize:avatarEmoji?28:22}}
          onClick={()=>{setEditName(userName);setEditEmoji(avatarEmoji);setShowProfileEdit(true);}}>
          <div className="avatar-ring"/>
          {avatarEmoji||initials}
          <div className="avatar-edit-hint">✎</div>
        </div>
        <div className="id-body">
          <div className="id-date">{dateStr}</div>
          <div className="id-name" style={{cursor:"pointer"}} onClick={()=>{setEditName(userName);setEditEmoji(avatarEmoji);setShowProfileEdit(true);}}>{userName}</div>
          <div className="id-status-wrap">
            <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>↳</span>
            <input className="id-status" value={dayStatus}
              onChange={e=>setDayStatus(e.target.value)}
              placeholder="Set your status for today..."/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",flexShrink:0}}>
          <div className="id-streak">🔥 {ckins.length} day streak</div>
          <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>
            {apps.filter(a=>a.stage==="Offer").length} offer{apps.filter(a=>a.stage==="Offer").length!==1?"s":""} · {apps.length} applied
          </div>
        </div>
      </div>

      {/* Alert strip */}
      {alerts.length>0&&(
        <div className="alert-strip">
          {alerts.slice(0,3).map((a,i)=>(
            <div key={i} className={`alert-item alert-${a.type}`}>
              <span className="alert-icon">{a.icon}</span>
              <span className="alert-text">{a.text}</span>
              {a.type==="warn"&&<button className="alert-action" onClick={()=>setTab("academics")}>→ Go</button>}
            </div>
          ))}
        </div>
      )}

      {/* Main 3-column grid */}
      <div className="home-grid">

        {/* ── LEFT COLUMN ── */}
        <div className="home-col">

          {/* Quick add */}
          <div className="quick-add">
            <div className="qa-label">Quick add</div>
            <div className="qa-modes">
              {[["task","📝 Task"],["win","🏆 Win"],["note","📓 Note"]].map(([m,l])=>(
                <button key={m} className={`qa-mode${qaMode===m?" act":""}`} onClick={()=>setQaMode(m)}>{l}</button>
              ))}
            </div>
            <div className="ar" style={{marginTop:0}}>
              <input className="inp" style={{fontSize:12}}
                placeholder={qaMode==="task"?"Add a task to Do Now...":qaMode==="win"?"Log a win...":"Note title..."}
                value={qaText}
                onChange={e=>setQaText(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleQuickAdd()}/>
              <button className="ba" onClick={handleQuickAdd}>+</button>
            </div>
          </div>

          {/* Today card */}
          <div className="today-card">
            <div className="tc-label">Today's focus</div>
            <input className="tc-focus-inp" value={focusToday}
              onChange={e=>setFocusToday(e.target.value)}
              placeholder="What's the one thing you must do today?"/>
            <div className="tc-label" style={{marginBottom:8}}>Tasks</div>
            {todayTasks.length===0&&<div style={{fontSize:12,color:"var(--m)"}}>No tasks yet. Use quick add above.</div>}
            {todayTasks.map(t=>(
              <div key={t.id} className="tc-row">
                <div className={`tc-cb${t.done?" ck":""}`}
                  onClick={()=>setTasks(ts=>({...ts,do:ts.do.map(x=>x.id===t.id?{...x,done:!x.done}:x),plan:ts.plan.map(x=>x.id===t.id?{...x,done:!x.done}:x)}))}>
                  {t.done&&"✓"}
                </div>
                <span className={`tc-text${t.done?" dn":""}`}>{t.text}</span>
              </div>
            ))}
            {todayTasks.length<Object.values(tasks).flat().length&&(
              <div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginTop:7,cursor:"pointer"}} onClick={()=>setTab("tasks")}>
                +{Object.values(tasks).flat().length-todayTasks.length} more → open Today tab
              </div>
            )}
            {/* Live timer badge */}
            {trun&&(
              <div className="timer-live" style={{marginTop:10}}>
                <div className="tl-dot"/>
                <span className="tl-label">{tlbl||"Session running"}</span>
                <span className="tl-time">{fmtS(tsec)}</span>
                <button className="tl-stop" onClick={stopTimer}>stop</button>
              </div>
            )}
            {/* Next exam banner */}
            {upcomingExams.length>0&&upcomingExams[0].days<=14&&upcomingExams[0].days>=0&&(
              <div className="exam-banner" style={{marginTop:10}}>
                <div className="eb-days">{upcomingExams[0].days}</div>
                <div className="eb-body">
                  <div className="eb-sub">{upcomingExams[0].name}</div>
                  <div className="eb-date">Exam: {upcomingExams[0].exam}</div>
                </div>
              </div>
            )}
          </div>

          {/* Today's habits */}
          <div className="today-card">
            <div className="tc-label" style={{marginBottom:9}}>Habits today · {habitsToday}%</div>
            {habits.slice(0,5).map(h=>(
              <div key={h.id} className="tc-row">
                <span style={{fontSize:14,flexShrink:0}}>{h.icon}</span>
                <div className={`tc-cb${h.days[tdi]?" ck":""}`} style={{borderColor:h.color+"66"}}
                  onClick={()=>toggleHabitDay(h.id,tdi)}>
                  {h.days[tdi]&&"✓"}
                </div>
                <span className={`tc-text${h.days[tdi]?" dn":""}`}>{h.name}</span>
                <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--a)",flexShrink:0}}>🔥{h.streak}</span>
              </div>
            ))}
            {habits.length>5&&<div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginTop:7,cursor:"pointer"}} onClick={()=>setTab("habits")}>+{habits.length-5} more</div>}
          </div>
        </div>

        {/* ── MIDDLE COLUMN ── */}
        <div className="home-col">

          {/* Progress rings */}
          <div className="today-card">
            <div className="tc-label" style={{marginBottom:12}}>Progress overview</div>
            <div className="rings-grid">
              <Ring pct={avgGoalProg} color="var(--a)" label="Goals" onClick={()=>setTab("goals")}/>
              <Ring pct={dsaRingProg} color="var(--a2)" label="DSA" value={dsaTotalSolved} onClick={()=>setTab("dsa")}/>
              <Ring pct={Math.min(100,Math.round(appsActive/appTarget*100))} color="var(--a3)" label="Apps" value={appsActive} onClick={()=>setTab("placements")}/>
              <Ring pct={curMonthProg} color="var(--w)" label="Month" onClick={()=>setTab("month")}/>
              <Ring pct={Math.min(100,Math.round(parseFloat(cgpa)/10*100))} color="var(--a2)" label="CGPA" value={cgpa} onClick={()=>setTab("academics")}/>
              <Ring pct={habitsWeekPct} color="var(--a3)" label="Habits" onClick={()=>setTab("habits")}/>
            </div>
          </div>

          {/* Monthly goal summary */}
          <div className="month-summary">
            <div className="ms-label">{monthNames[viewMonth]} goals · {mgGoals.filter(g=>g.done).length}/{mgGoals.length} done</div>
            {mgGoals.slice(0,4).map(g=>{
              const ep=syncedMgGoals.find(x=>x.id===g.id)?.progress??g.progress;
              const col=g.priority==="High"?"var(--d)":g.priority==="Med"?"var(--a)":"var(--a3)";
              return(
                <div key={g.id} className="ms-row">
                  <div className="ms-name" title={g.title}>{g.title}</div>
                  <div className="ms-bar"><div className="ms-fill" style={{width:`${ep}%`,background:col}}/></div>
                  <div className="ms-pct">{ep}%</div>
                </div>
              );
            })}
            {mgGoals.length===0&&<div style={{fontSize:12,color:"var(--m)"}}>No monthly goals set yet.</div>}
            {mgGoals.length>4&&<div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginTop:6,cursor:"pointer"}} onClick={()=>setTab("month")}>+{mgGoals.length-4} more</div>}
          </div>

          {/* Placement Readiness Score */}
          <div className="readiness-card">
            <div className="readiness-top">
              <div>
                <div className="readiness-score" style={{color:readinessColor}}>{readinessScore}</div>
                <div className="readiness-label">Placement Readiness</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span className="readiness-grade" style={{background:readinessColor+"22",color:readinessColor,border:`1px solid ${readinessColor}44`}}>{readinessGrade}</span>
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m2)"}}>{readinessLabel}</span>
                </div>
                <div className="readiness-bars">
                  {[["DSA",Math.round(dsa.reduce((a,t)=>a+t.c,0)/Math.max(dsa.length,1)/3*100),"var(--a2)"],
                    ["Core CS",(()=>{const t=core.flatMap(c=>c.topics);return t.length?Math.round(t.filter(x=>x.s==="confident").length/t.length*100):0;})(),"var(--a3)"],
                    ["Applied",Math.min(100,apps.filter(a=>a.stage!=="Researching").length/10*100),"var(--a)"],
                    ["Projects",Math.min(100,projs.filter(p=>p.tasks.done.length>0).length/3*100),"var(--w)"],
                  ].map(([lbl,pct,col])=>(
                    <div key={lbl} className="rb-row">
                      <span className="rb-label">{lbl}</span>
                      <div className="rb-bar"><div className="rb-fill" style={{width:`${pct}%`,background:col}}/></div>
                      <span className="rb-val">{Math.round(pct)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {dsaStreak>0&&(
              <div className="dsa-streak-badge" style={{marginTop:4}}>
                🔥 {dsaStreak}-day DSA streak
              </div>
            )}
          </div>

          {/* Quote */}
          <div className="quote-card">
            <div className="quote-text">"{todayQuote.text}"</div>
            <div className="quote-author">— {todayQuote.author}</div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="home-col">

          {/* Sparklines */}
          <Sparkline data={sparkFocus.map(s=>Math.round(s/60))} color="var(--a)" title="Focus time" value={fmtD(tByType("work"))} unit=""/>
          <Sparkline data={sparkHabits} color="var(--a3)" title="Habits done" value={habitsToday} unit="%"/>

          {/* Achievement feed */}
          <div className="feed-card">
            <div className="feed-title">Achievement feed</div>
            <div className="feed-tabs">
              {[["today","Today"],["week","This Week"],["month","Month"]].map(([id,lbl])=>(
                <button key={id} className={`feed-tab${feedTab===id?" act":""}`} onClick={()=>setFeedTab(id)}>{lbl}</button>
              ))}
            </div>
            {feedItems.length===0&&<div style={{fontSize:12,color:"var(--m)"}}>Nothing logged yet for this period.</div>}
            {feedItems.slice(0,6).map(a=>(
              <div key={a.id} className="feed-item">
                <span className="feed-icon">{a.icon}</span>
                <div className="feed-body">
                  <div className="feed-text">{a.text}</div>
                  <div className="feed-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
})()}

{/* ── GOALS ── */}
{tab==="goals"&&(<>
  <div className="sh">
    <h2 className="st">Your Goals</h2>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <div className="goals-view-toggle">
        <button className={`gvt${goalView==="bento"?" act":""}`} onClick={()=>setGoalView("bento")}>⊞ Board</button>
        <button className={`gvt${goalView==="timeline"?" act":""}`} onClick={()=>setGoalView("timeline")}>⟶ Timeline</button>
      </div>
      <button className="btn bp" onClick={()=>setSgm(true)}>+ New Goal</button>
    </div>
  </div>

  {goals.length===0&&<div className="empty"><div className="ei">🎯</div><div className="et">No goals yet.</div></div>}

  {/* ── BENTO VIEW ── */}
  {goalView==="bento"&&goals.length>0&&(
    <div className="bento">
      {goals.map(g=>{
        const isHero=g.priority==="High";
        const cc=catColor(g.cat);
        const ctx=goalContext(g);
        const prog=effectiveProgress(g);
        const r=32,circ=2*Math.PI*r;
        const dash=circ*(prog/100);
        return(
          <div key={g.id} className={`gc gc-${g.cat}${isHero?" gc-hero":""}${prog===100?" completed":""}`}>
            {/* ambient glow */}
            <div className="gc-glow" style={{background:cc}}/>
            {/* celebration burst */}
            {celebrating===g.id&&<div className="burst">🎉</div>}

            <div className="g-top">
              <div style={{flex:1}}>
                {/* category pill */}
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:cc,flexShrink:0}}/>
                  <span style={{fontFamily:"var(--fm)",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:cc}}>{g.cat}</span>
                  <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginLeft:4}}>{g.priority} priority</span>
                </div>
                <div className="g-title">{g.title}</div>
              </div>
              {/* SVG ring */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <svg width="72" height="72" style={{flexShrink:0,transform:"rotate(-90deg)"}}>
                  <circle cx="36" cy="36" r={r} fill="none" stroke="var(--b2)" strokeWidth="5"/>
                  <circle cx="36" cy="36" r={r} fill="none" stroke={cc} strokeWidth="5"
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                    style={{transition:"stroke-dasharray 0.4s ease"}}/>
                  <text x="36" y="40" textAnchor="middle" fill={cc}
                    style={{fontFamily:"var(--fm)",fontSize:"12px",fontWeight:500,transform:"rotate(90deg)",transformOrigin:"36px 36px"}}>
                    {prog}%
                  </text>
                </svg>
                {/* source badge */}
                {g.linkedDSA&&<span style={{fontFamily:"var(--fm)",fontSize:8,color:"var(--a2)",letterSpacing:"0.06em",textTransform:"uppercase",background:"rgba(155,127,212,0.12)",padding:"2px 6px",borderRadius:3,border:"1px solid rgba(155,127,212,0.25)"}}>DSA</span>}
                {g.linkedProject&&!g.linkedDSA&&<span style={{fontFamily:"var(--fm)",fontSize:8,color:"var(--a)",letterSpacing:"0.06em",textTransform:"uppercase",background:"rgba(200,169,110,0.1)",padding:"2px 6px",borderRadius:3,border:"1px solid rgba(200,169,110,0.2)"}}>{g.linkedProject.split(" ")[0]}</span>}
              </div>
            </div>

            {/* context line */}
            <div className={`g-context${ctx.cls?" "+ctx.cls:""}`}>{ctx.text}</div>

            {/* deadline tag */}
            {g.deadline&&prog<100&&(
              <div className="g-meta">
                <span className="tag" style={{background:"rgba(255,255,255,0.04)",color:"var(--m2)",border:"1px solid var(--b)"}}>⏰ {g.deadline}</span>
              </div>
            )}

            {/* sub-goals */}
            <div className="sg-section">
              <div className="sg-header" onClick={()=>setGoals(gs=>gs.map(x=>x.id===g.id?{...x,sgExpanded:!x.sgExpanded}:x))}>
                <span className="sg-label">
                  Sub-goals · {g.subGoals.filter(s=>s.done).length}/{g.subGoals.length}
                </span>
                <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",transition:"transform 0.2s",display:"inline-block",transform:g.sgExpanded?"rotate(90deg)":"rotate(0deg)"}}>▶</span>
              </div>
              {g.sgExpanded&&(<>
                {g.subGoals.map(s=>(
                  <div key={s.id} className="sg-row">
                    <div className={`sg-cb${s.done?" ck":""}`} onClick={()=>toggleSubGoal(g.id,s.id)}>{s.done&&"✓"}</div>
                    <span className={`sg-text${s.done?" dn":""}`}>{s.text}</span>
                    <button className="bd" style={{opacity:0.3,fontSize:9,padding:"1px 5px"}}
                      onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.3}
                      onClick={()=>delSubGoal(g.id,s.id)}>✕</button>
                  </div>
                ))}
                {sgInputs[g.id]!==undefined?(
                  <div className="ar" style={{marginTop:6}}>
                    <input autoFocus className="inp" placeholder="Add sub-goal..." value={sgInputs[g.id]||""}
                      style={{fontSize:12}}
                      onChange={e=>setSgInputs(x=>({...x,[g.id]:e.target.value}))}
                      onKeyDown={e=>{if(e.key==="Enter"){addSubGoal(g.id);setSgInputs(x=>{const n={...x};delete n[g.id];return n;});}if(e.key==="Escape")setSgInputs(x=>{const n={...x};delete n[g.id];return n;});}}
                      onBlur={()=>{addSubGoal(g.id);setSgInputs(x=>{const n={...x};delete n[g.id];return n;});}}/>
                    <button className="ba" onClick={()=>{addSubGoal(g.id);setSgInputs(x=>{const n={...x};delete n[g.id];return n;});}}>+</button>
                  </div>
                ):(
                  <button className="sg-add" onClick={()=>setSgInputs(x=>({...x,[g.id]:""}))}>+ add sub-goal</button>
                )}
              </>)}
            </div>

            {/* pin + delete */}
            <div style={{position:"absolute",top:10,right:10,display:"flex",gap:5,alignItems:"center"}}>
              <button title={g.monthPinned?"Unpin from Month":"Pin to this Month"}
                onClick={()=>toggleMonthPin(g.id)}
                style={{background:g.monthPinned?"rgba(200,169,110,0.15)":"transparent",border:`1px solid ${g.monthPinned?"rgba(200,169,110,0.4)":"var(--b2)"}`,borderRadius:4,padding:"3px 7px",cursor:"pointer",fontSize:11,color:g.monthPinned?"var(--a)":"var(--m)",transition:"all 0.15s"}}>
                {g.monthPinned?"📌":"📍"}
              </button>
              <button className="bd" style={{opacity:0.4,fontSize:10,padding:"3px 7px"}}
                onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.4}
                onClick={()=>setGoals(gs=>gs.filter(x=>x.id!==g.id))}>✕</button>
            </div>
          </div>
        );
      })}
    </div>
  )}

  {/* ── TIMELINE VIEW ── */}
  {goalView==="timeline"&&goals.length>0&&(()=>{
    const today=new Date();
    const months=[];
    for(let i=-1;i<=5;i++){const d=new Date(today.getFullYear(),today.getMonth()+i,1);months.push({label:d.toLocaleDateString("en-US",{month:"short",year:"2-digit"}),date:d});}
    const timeStart=months[0].date;
    const timeEnd=new Date(months[months.length-1].date);
    timeEnd.setMonth(timeEnd.getMonth()+1);
    const totalMs=timeEnd-timeStart;
    const pct=d=>Math.max(0,Math.min(100,(d-timeStart)/totalMs*100));
    const todayPct=pct(today);
    return(
      <div className="gtl-wrap">
        <div className="gtl">
          <div className="gtl-axis">
            {months.map(m=><div key={m.label} className="gtl-month">{m.label}</div>)}
          </div>
          {goals.map(g=>{
            const cc=catColor(g.cat);
            const dl=g.deadline?new Date(g.deadline):null;
            const start=new Date(today);start.setDate(start.getDate()-7);
            const end=dl||new Date(today.getFullYear(),today.getMonth()+2,1);
            const left=pct(start);
            const width=Math.max(2,pct(end)-left);
            return(
              <div key={g.id} className="gtl-row">
                <div className="gtl-name" title={g.title}>{g.title}</div>
                <div className="gtl-bar-wrap">
                  <div className="gtl-today" style={{left:`${todayPct}%`}}/>
                  <div className="gtl-bar" title={`${g.progress}% · ${g.deadline||"no deadline"}`}
                    style={{left:`${left}%`,width:`${width}%`,background:cc,opacity:g.progress===100?0.5:1}}>
                    {width>8&&`${g.progress}%`}
                  </div>
                  {/* progress fill overlay */}
                  <div style={{position:"absolute",left:`${left}%`,width:`${width*g.progress/100}%`,height:22,borderRadius:"5px 0 0 5px",background:"rgba(255,255,255,0.15)",pointerEvents:"none"}}/>
                </div>
              </div>
            );
          })}
          <div style={{display:"flex",gap:6,marginTop:12,alignItems:"center"}}>
            <div style={{width:2,height:12,background:"var(--d)",borderRadius:1}}/>
            <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)"}}>Today</span>
          </div>
        </div>
      </div>
    );
  })()}

  {/* modal */}
  {sgm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSgm(false)}><div className="md">
    <div className="mdt">New Goal</div>
    <div className="f"><label>Title</label><input value={ng.title} placeholder="What do you want to achieve?" onChange={e=>setNg(x=>({...x,title:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addGoal()}/></div>
    <div className="f"><label>Category</label><select value={ng.cat} onChange={e=>setNg(x=>({...x,cat:e.target.value}))}>{["Project","Learning","Career","Health","Personal"].map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="f"><label>Priority</label><select value={ng.priority} onChange={e=>setNg(x=>({...x,priority:e.target.value}))}>{["High","Med","Low"].map(p=><option key={p}>{p}</option>)}</select></div>
    <div className="f"><label>Deadline</label><input type="date" value={ng.deadline} onChange={e=>setNg(x=>({...x,deadline:e.target.value}))}/></div>
    <div className="f"><label>Link to Project (auto-syncs progress)</label>
      <select value={ng.linkedProject} onChange={e=>setNg(x=>({...x,linkedProject:e.target.value}))}>
        <option value="">None</option>
        {projs.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
    </div>
    <div className="ma"><button className="btn bg" onClick={()=>setSgm(false)}>Cancel</button><button className="btn bp" onClick={addGoal}>Add</button></div>
  </div></div>}
</>)}

{/* ── TODAY ── */}
{tab==="tasks"&&(<>
  <div className="sh"><h2 className="st">Priority Matrix</h2><span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m)"}}>{doneT}/{totT} done</span></div>
  <div className="ts">
    {[["do","Do Now","Urgent & Important","#e06b6b"],["plan","Schedule","Important, Not Urgent","#c8a96e"],
      ["delegate","Delegate","Urgent, Not Important","#9b7fd4"],["drop","Drop / Later","Neither","#6a6880"]].map(([q,lbl,sub,col])=>(
      <div key={q} className="quad">
        <div className="qh"><div className="qdot" style={{background:col}}/><span className="ql" style={{color:col}}>{lbl}</span><span className="qs">{sub}</span></div>
        {tasks[q].map(t=>(
          <div key={t.id} className="ti">
            <div className={`tcb${t.done?" ck":""}`} onClick={()=>setTasks(ts=>({...ts,[q]:ts[q].map(x=>x.id===t.id?{...x,done:!x.done}:x)}))}>
              {t.done&&"✓"}
            </div>
            <span className={`tt${t.done?" dn":""}`}>{t.text}</span>
            <button className="bd" onClick={()=>setTasks(ts=>({...ts,[q]:ts[q].filter(x=>x.id!==t.id)}))}>✕</button>
          </div>
        ))}
        <div className="ar">
          <input className="inp" placeholder="Add task..." value={tInp[q]} onChange={e=>setTInp(x=>({...x,[q]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTask(q)}/>
          <button className="ba" onClick={()=>addTask(q)}>+</button>
        </div>
      </div>
    ))}
  </div>
</>)}

{/* ── WEEK ── */}
{tab==="week"&&(<>
  <div className="sh"><h2 className="st">This Week</h2><span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m)"}}>{wd[0].toLocaleDateString("en-US",{month:"short",day:"numeric"})} – {wd[6].toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span></div>
  <div className="wg">
    {wd.map((d,i)=>(
      <div key={i} className={`dc${i===tdi?" td":""}`}>
        <div className="dname">{DAYS[i]}</div>
        <div className="dnum">{d.getDate()}</div>
        {(goalDeadlinesThisWeek[i]||[]).map(g=>(
          <div key={g.id} className="dev" style={{background:"rgba(200,169,110,0.1)",color:"var(--a)",borderColor:"rgba(200,169,110,0.25)",cursor:"pointer"}} onClick={()=>setTab("goals")}>
            <span>🎯 {g.title.substring(0,18)}{g.title.length>18?"…":""}</span>
          </div>
        ))}
        {(wev[i]||[]).map(ev=>(
          <div key={ev.id} className="dev">
            <span>{ev.text}</span>
            <span className="devd" onClick={()=>setWev(e=>({...e,[i]:(e[i]||[]).filter(x=>x.id!==ev.id)}))}>✕</span>
          </div>
        ))}
        {di2[i]!==undefined?
          <input autoFocus className="dinp" value={di2[i]||""} placeholder="Event..."
            onChange={e=>setDi2(x=>({...x,[i]:e.target.value}))}
            onKeyDown={e=>{if(e.key==="Enter"){addWev(i);setDi2(x=>{const n={...x};delete n[i];return n;});}if(e.key==="Escape")setDi2(x=>{const n={...x};delete n[i];return n;});}}
            onBlur={()=>{addWev(i);setDi2(x=>{const n={...x};delete n[i];return n;});}}/>
          :<button className="dadd" onClick={()=>setDi2(x=>({...x,[i]:""}))}>+ add</button>}
      </div>
    ))}
  </div>
</>)}

{/* ── PROJECTS ── */}
{tab==="projects"&&(<>
  <div className="sh"><h2 className="st">Project Board</h2><button className="btn bp" onClick={()=>setSpm(true)}>+ New Project</button></div>
  <div className="ptabs">
    {projs.map((p,i)=>(
      <button key={p.id} className={`ptab${ap===i?" act":""}`} style={ap===i?{background:p.color,borderColor:p.color}:{}} onClick={()=>setAp(i)}>{p.name}</button>
    ))}
  </div>
  {proj&&(<>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
      {proj.stack.map(s=><span key={s} className="tag" style={{background:"rgba(155,127,212,0.1)",color:"var(--a2)",border:"1px solid rgba(155,127,212,0.2)"}}>{s}</span>)}
      <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",marginLeft:"auto"}}>
        ⏱ {fmtD(projTimeThisWeek(proj.name))} this week
      </span>
      {(()=>{const linked=goals.find(g=>g.linkedProject===proj.name);return linked?(
        <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--a)",background:"rgba(200,169,110,0.1)",padding:"3px 9px",borderRadius:4,border:"1px solid rgba(200,169,110,0.25)"}}>
          Goal: {linked.title.substring(0,28)}{linked.title.length>28?"…":""} · {effectiveProgress(linked)}%
        </span>
      ):null;})()}
    </div>
    <div className="kb">
      {COLS.map(([col,lbl,color])=>(
        <div key={col} className="kcol">
          <div className="kch"><div className="kcd" style={{background:color}}/><span className="kcl" style={{color}}>{lbl}</span><span className="kcc">{proj.tasks[col].length}</span></div>
          {proj.tasks[col].map((card,ci)=>(
            <div key={ci} className="kcard">
              <div className="kct">{card}</div>
              <div className="kcf">
                <div className="kcas">{COLS.map(([c2,l2],ci2)=>c2!==col&&<button key={c2} className="kmv" onClick={()=>moveCard(proj.id,col,ci2,ci)}>→{l2.split(" ")[0]}</button>)}</div>
                <button className="bd" onClick={()=>delKCard(proj.id,col,ci)}>✕</button>
              </div>
            </div>
          ))}
          {ki[`${proj.id}-${col}`]!==undefined?
            <input autoFocus className="ki" value={ki[`${proj.id}-${col}`]||""} placeholder="Task name..."
              onChange={e=>setKi(k=>({...k,[`${proj.id}-${col}`]:e.target.value}))}
              onKeyDown={e=>{if(e.key==="Enter"){addKCard(proj.id,col);setKi(k=>{const n={...k};delete n[`${proj.id}-${col}`];return n;});}if(e.key==="Escape")setKi(k=>{const n={...k};delete n[`${proj.id}-${col}`];return n;});}}
              onBlur={()=>{addKCard(proj.id,col);setKi(k=>{const n={...k};delete n[`${proj.id}-${col}`];return n;});}}/>
            :<button className="kadd" onClick={()=>setKi(k=>({...k,[`${proj.id}-${col}`]:""}))}>+ add card</button>}
        </div>
      ))}
    </div>
  </>)}
  {spm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSpm(false)}><div className="md">
    <div className="mdt">New Project</div>
    <div className="f"><label>Name</label><input value={np.name} onChange={e=>setNp(x=>({...x,name:e.target.value}))}/></div>
    <div className="f"><label>Tech Stack (comma separated)</label><input value={np.stack} placeholder="React, FastAPI, MySQL" onChange={e=>setNp(x=>({...x,stack:e.target.value}))}/></div>
    <div className="f"><label>Color</label>
      <div style={{display:"flex",gap:8,marginTop:4}}>{["#c8a96e","#9b7fd4","#6ecfa8","#e06b6b","#6baae0","#e06bb5"].map(c=><div key={c} onClick={()=>setNp(x=>({...x,color:c}))} style={{width:24,height:24,borderRadius:"50%",background:c,cursor:"pointer",border:np.color===c?"3px solid white":"3px solid transparent"}}/>)}</div>
    </div>
    <div className="ma"><button className="btn bg" onClick={()=>setSpm(false)}>Cancel</button><button className="btn bp" onClick={addProj}>Add</button></div>
  </div></div>}
</>)}

{/* ── PLACEMENTS ── */}
{tab==="placements"&&(<>
  <div className="sh"><h2 className="st">Placements</h2>
    {plTab==="pipeline"&&<button className="btn bp" onClick={()=>setSam(true)}>+ Add Application</button>}
    {plTab==="interview"&&<button className="btn bp" onClick={()=>setSipm(true)}>+ Add Company</button>}
    {plTab==="resume"&&<button className="btn bp" onClick={()=>setSrm(true)}>+ Add Version</button>}
  </div>
  <div className="stabs">
    {[["pipeline","Pipeline"],["interview","Interview Prep"],["resume","Resume Versions"]].map(([id,lbl])=>(
      <button key={id} className={`stab${plTab===id?" act":""}`} onClick={()=>setPlTab(id)}>{lbl}</button>
    ))}
  </div>

  {plTab==="pipeline"&&(<>
    <div className="pipe">
      {["All",...SL].map(s=>{
        const cnt=s==="All"?apps.length:apps.filter(a=>a.stage===s).length;
        return(<div key={s} className="sp" onClick={()=>setAf(s)}>
          <div className="spi" style={af===s?{background:SC[s]||"var(--a)",borderColor:SC[s]||"var(--a)",color:"#080810",fontWeight:500}:{}}>{s}</div>
          <div className="sc" style={{color:SC[s]||"var(--m2)"}}>{cnt}</div>
        </div>);
      })}
    </div>
    {apps.filter(a=>af==="All"||a.stage===af).map(a=>(
      <div key={a.id} className="acard">
        {/* Top row */}
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div className="asdot" style={{background:SC[a.stage],marginTop:4}}/>
          <div className="ab">
            <div className="aco">{a.company}</div>
            <div className="aro">{a.role}</div>
            <div className="am">
              <span className="tag" style={{background:`${SC[a.stage]}22`,color:SC[a.stage],border:`1px solid ${SC[a.stage]}44`}}>{a.stage}</span>
              {a.deadline&&<span className="tag" style={{background:"rgba(255,255,255,0.04)",color:"var(--m2)",border:"1px solid var(--b)"}}>⏰ {a.deadline}</span>}
              {a.notes&&<span style={{fontSize:12,color:"var(--m2)"}}>{a.notes}</span>}
            </div>
          </div>
          <div className="aact" style={{marginLeft:"auto",flexShrink:0}}>
            <select className="gsel" value={a.stage} onChange={e=>{
              const newStage=e.target.value;
              setApps(as=>as.map(x=>x.id===a.id?{...x,stage:newStage}:x));
              if(newStage!==a.stage){
                setAchievements(ac=>[{id:Date.now(),icon:"📌",text:`${a.company} → ${newStage}`,time:"just now",day:"today"},...ac]);
              }
            }}>{SL.map(s=><option key={s}>{s}</option>)}</select>
            <button className="bd" onClick={()=>setApps(as=>as.filter(x=>x.id!==a.id))}>✕</button>
          </div>
        </div>
        {/* Research notes — sits cleanly below the top row */}
        <div className="research-section">
          <div className="research-header" onClick={()=>setExpandedResearch(r=>({...r,[a.id]:!r[a.id]}))}>
            <span className="research-label">📋 Research Notes {expandedResearch[a.id]?"▲":"▼"}</span>
          </div>
          {expandedResearch[a.id]&&(
            <div className="research-body">
              <div className="research-field">
                <label>Tech Stack Used</label>
                <input className="research-inp" placeholder="e.g. Java, Spring Boot, AWS..." value={(appResearch[a.id]||{}).techStack||""} onChange={e=>updResearch(a.id,"techStack",e.target.value)}/>
              </div>
              <div className="research-field">
                <label>Interview Format</label>
                <input className="research-inp" placeholder="e.g. 2 OA rounds, 3 technical, 1 HR..." value={(appResearch[a.id]||{}).format||""} onChange={e=>updResearch(a.id,"format",e.target.value)}/>
              </div>
              <div className="research-field">
                <label>Difficulty</label>
                <div className="diff-pills">
                  {["Easy","Medium","Hard","Very Hard"].map(d=>(
                    <button key={d} className={`diff-pill${(appResearch[a.id]||{}).difficulty===d?" sel":""}`}
                      style={(appResearch[a.id]||{}).difficulty===d?{borderColor:"var(--a)",color:"var(--a)",background:"rgba(200,169,110,0.1)"}:{}}
                      onClick={()=>updResearch(a.id,"difficulty",d)}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="research-field">
                <label>Notes & Past Questions</label>
                <textarea className="research-textarea" placeholder="Paste past interview questions, Glassdoor tips, things to prepare..." value={(appResearch[a.id]||{}).notes||""} onChange={e=>updResearch(a.id,"notes",e.target.value)}/>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
    {apps.filter(a=>af==="All"||a.stage===af).length===0&&<div className="empty"><div className="ei">💼</div><div className="et">No applications in this stage.</div></div>}
  </>)}

  {plTab==="interview"&&(<>
    {iprep.map(ip=>(
      <div key={ip.id} className="ic">
        <div className="ich" onClick={()=>setIprep(ps=>ps.map(x=>x.id===ip.id?{...x,expanded:!x.expanded}:x))}>
          <div className="asdot" style={{background:"var(--a2)"}}/>
          <div className="icn">{ip.company}</div>
          <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>{ip.rounds.length} rounds</span>
          <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m)",marginLeft:8}}>{ip.expanded?"▲":"▼"}</span>
          <button className="bd" onClick={e=>{e.stopPropagation();setIprep(ps=>ps.filter(x=>x.id!==ip.id));}}>✕</button>
        </div>
        {ip.expanded&&(
          <div className="icbody">
            {ip.rounds.map((r,ri)=>(
              <div key={ri} className="round-row">
                <div className="round-num">{r.num}</div>
                <div className="round-body">
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--a2)",marginRight:8}}>{r.type}</span>
                  {r.notes}
                </div>
                <select className="gsel" value={r.status}
                  onChange={e=>setIprep(ps=>ps.map(x=>x.id===ip.id?{...x,rounds:x.rounds.map((rr,i)=>i===ri?{...rr,status:e.target.value}:rr)}:x))}>
                  <option value="pending">Pending</option>
                  <option value="done">Done ✓</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            ))}
            <button className="apb" style={{marginTop:10}} onClick={()=>setIprep(ps=>ps.map(x=>x.id===ip.id?{...x,rounds:[...x.rounds,{num:`Round ${x.rounds.length+1}`,type:"Technical",notes:"",status:"pending"}]}:x))}>+ add round</button>
          </div>
        )}
      </div>
    ))}
    {iprep.length===0&&<div className="empty"><div className="ei">🎯</div><div className="et">No interview prep added yet.</div></div>}
  </>)}

  {plTab==="resume"&&(<>
    {resumes.map(r=>(
      <div key={r.id} className="rv-card">
        <div className="rv-top">
          <div>
            <div className="rv-name">{r.version}</div>
            <div className="rv-date">{r.date}</div>
          </div>
          <button className="bd" onClick={()=>setResumes(rs=>rs.filter(x=>x.id!==r.id))}>✕</button>
        </div>
        <div className="rv-companies">
          {r.companies.map(c=><span key={c} className="tag" style={{background:"rgba(155,127,212,0.1)",color:"var(--a2)",border:"1px solid rgba(155,127,212,0.2)"}}>{c}</span>)}
        </div>
        <div className="rv-changes">{r.changes}</div>
      </div>
    ))}
    {resumes.length===0&&<div className="empty"><div className="ei">📄</div><div className="et">No resume versions tracked yet.</div></div>}
  </>)}

  {/* Modals */}
  {sam&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSam(false)}><div className="md">
    <div className="mdt">New Application</div>
    <div className="f"><label>Company</label><input value={na.company} onChange={e=>setNa(x=>({...x,company:e.target.value}))}/></div>
    <div className="f"><label>Role</label><input value={na.role} onChange={e=>setNa(x=>({...x,role:e.target.value}))}/></div>
    <div className="f"><label>Stage</label><select value={na.stage} onChange={e=>setNa(x=>({...x,stage:e.target.value}))}>{SL.map(s=><option key={s}>{s}</option>)}</select></div>
    <div className="f"><label>Deadline</label><input type="date" value={na.deadline} onChange={e=>setNa(x=>({...x,deadline:e.target.value}))}/></div>
    <div className="f"><label>Notes</label><input value={na.notes} onChange={e=>setNa(x=>({...x,notes:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setSam(false)}>Cancel</button><button className="btn bp" onClick={addApp}>Add</button></div>
  </div></div>}
  {sipm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSipm(false)}><div className="md">
    <div className="mdt">Add Interview Prep</div>
    <div className="f"><label>Company</label><input value={nip.company} onChange={e=>setNip(x=>({...x,company:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setSipm(false)}>Cancel</button><button className="btn bp" onClick={addIP}>Add</button></div>
  </div></div>}
  {srm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSrm(false)}><div className="md">
    <div className="mdt">New Resume Version</div>
    <div className="f"><label>Version Name</label><input value={nr.version} placeholder="v1.3" onChange={e=>setNr(x=>({...x,version:e.target.value}))}/></div>
    <div className="f"><label>Date</label><input type="date" value={nr.date} onChange={e=>setNr(x=>({...x,date:e.target.value}))}/></div>
    <div className="f"><label>Companies Sent To (comma separated)</label><input value={nr.companies} placeholder="Google, Amazon" onChange={e=>setNr(x=>({...x,companies:e.target.value}))}/></div>
    <div className="f"><label>Key Changes</label><textarea value={nr.changes} placeholder="What changed from last version?" onChange={e=>setNr(x=>({...x,changes:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setSrm(false)}>Cancel</button><button className="btn bp" onClick={addResume}>Add</button></div>
  </div></div>}
</>)}

{/* ── PREP ── */}
{tab==="core"&&(<>
  <div className="sh">
    <h2 className="st">Placement Preparation</h2>
    <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
      {[["✓","confident","var(--a3)"],["~","shaky","var(--w)"],["–","not started","var(--m)"]].map(([sym,s,c])=>(
        <span key={s} style={{fontFamily:"var(--fm)",fontSize:10,color:c,letterSpacing:"0.06em",textTransform:"uppercase"}}>{sym} {s}</span>
      ))}
      <button className="btn bp" style={{marginLeft:6}} onClick={()=>{setNsInp(true);setNsName("");}}>+ Add Subject</button>
    </div>
  </div>
  {nsInp&&(
    <div style={{background:"var(--s)",border:"1px dashed var(--a)",borderRadius:10,padding:"14px 18px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
      <input autoFocus className="inp" placeholder="Subject name..." value={nsName} style={{flex:1,background:"var(--s2)"}}
        onChange={e=>setNsName(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter")addSubj();if(e.key==="Escape"){setNsInp(false);setNsName("");}}}/>
      <button className="btn bp" onClick={addSubj}>Add</button>
      <button className="btn bg" onClick={()=>{setNsInp(false);setNsName("");}}>Cancel</button>
    </div>
  )}
  <div className="csgrid">
    {core.map(subj=>{
      const conf=subj.topics.filter(t=>t.s==="confident").length;
      const tot=subj.topics.length;
      return(<div key={subj.id} className="cscard">
        <div className="csch" style={{marginBottom:5}}>
          {editSid===subj.id?(
            <input autoFocus className="inp" value={editSName} style={{flex:1,fontSize:14,fontWeight:500,background:"var(--s2)",marginRight:8}}
              onChange={e=>setEditSName(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")renSubj(subj.id,editSName);if(e.key==="Escape")setEditSid(null);}}
              onBlur={()=>renSubj(subj.id,editSName)}/>
          ):(
            <div className="csn" style={{cursor:"pointer",flex:1}} onClick={()=>{setEditSid(subj.id);setEditSName(subj.name);}}>
              {subj.name} <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginLeft:4}}>✎</span>
            </div>
          )}
          <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
            <div className="csp">{conf}/{tot}</div>
            <button className="bd" onClick={()=>delSubj(subj.id)}>✕</button>
          </div>
        </div>
        <div style={{height:3,background:"var(--b2)",borderRadius:2,marginBottom:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${tot>0?(conf/tot)*100:0}%`,background:"var(--a3)",borderRadius:2,transition:"width 0.3s"}}/>
        </div>
        <div className="topics-scroll">
        {subj.topics.map((t,ti)=>(
          <div key={ti} className="trow" style={{gap:5}}>
            {editTKey===`${subj.id}-${ti}`?(
              <input autoFocus className="inp" value={editTName} style={{flex:1,fontSize:12,background:"var(--s2)"}}
                onChange={e=>setEditTName(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")renTopic(subj.id,ti,editTName);if(e.key==="Escape")setEditTKey(null);}}
                onBlur={()=>renTopic(subj.id,ti,editTName)}/>
            ):(
              <span className="tn" style={{cursor:"pointer"}} onClick={()=>{setEditTKey(`${subj.id}-${ti}`);setEditTName(t.n);}}>{t.n}</span>
            )}
            <div className="cbs">
              {["not_started","shaky","confident"].map(s=>(
                <button key={s} className={`cb${t.s===s?" "+s:""}`}
                  style={t.s!==s?{background:"transparent",color:"var(--m)",borderColor:"var(--b)"}:{}}
                  onClick={()=>updCore(subj.id,ti,s)}>{cLabel(s)}</button>
              ))}
            </div>
            <button className="bd" style={{opacity:0.4,fontSize:9,padding:"2px 5px"}}
              onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.4}
              onClick={()=>delTopic(subj.id,ti)}>✕</button>
          </div>
        ))}
        </div>
        {ntInps[subj.id]!==undefined?(
          <div className="ar" style={{marginTop:9}}>
            <input autoFocus className="inp" placeholder="New topic..." value={ntInps[subj.id]||""}
              onChange={e=>setNtInps(m=>({...m,[subj.id]:e.target.value}))}
              onKeyDown={e=>{if(e.key==="Enter"){addTopic(subj.id);setNtInps(m=>{const n={...m};delete n[subj.id];return n;});}if(e.key==="Escape")setNtInps(m=>{const n={...m};delete n[subj.id];return n;});}}
              onBlur={()=>{addTopic(subj.id);setNtInps(m=>{const n={...m};delete n[subj.id];return n;});}}/>
            <button className="ba" onClick={()=>{addTopic(subj.id);setNtInps(m=>{const n={...m};delete n[subj.id];return n;});}}>+</button>
          </div>
        ):(
          <button className="dadd" style={{marginTop:9,borderRadius:6}} onClick={()=>setNtInps(m=>({...m,[subj.id]:""}))}>+ add topic</button>
        )}
      </div>);
    })}
    {core.length===0&&<div className="empty" style={{gridColumn:"1/-1"}}><div className="ei">📚</div><div className="et">No subjects yet. Click "+ Add Subject" to start.</div></div>}
  </div>
</>)}

{/* ── DSA ── */}
{tab==="dsa"&&(<>
  <div className="sh">
    <h2 className="st">DSA Progress</h2>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m)"}}>{dsaTotalSolved} solved</span>
      {dsaStreak>0&&<span className="dsa-streak-badge">🔥 {dsaStreak}-day streak</span>}
      {(()=>{const dg=goals.find(g=>g.linkedDSA);return dg?(
        <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--a)",background:"rgba(200,169,110,0.08)",padding:"3px 9px",borderRadius:4,border:"1px solid rgba(200,169,110,0.2)"}}>
          → {dg.title.substring(0,30)}{dg.title.length>30?"…":""}: {effectiveProgress(dg)}%
        </span>
      ):null;})()}
      <button className="btn bp" onClick={()=>setDsaTM(true)}>+ Add Topic</button>
    </div>
  </div>
  <div style={{background:"var(--s)",border:"1px solid var(--b)",borderRadius:10,padding:"14px 18px",marginBottom:18}}>
    <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>confidence map</div>
    <div style={{display:"flex",gap:8}}>
      {[["Not started","#6a6880"],["Aware","#e0a86b"],["Practiced","#c8a96e"],["Confident","#6ecfa8"]].map(([lbl,c],i)=>{
        const cnt=dsa.filter(t=>t.c===i).length;
        return(<div key={lbl} style={{flex:1,background:c+"22",border:`1px solid ${c}44`,borderRadius:8,padding:"11px",textAlign:"center"}}>
          <div style={{fontFamily:"var(--fm)",fontSize:20,fontWeight:500,color:c}}>{cnt}</div>
          <div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",textTransform:"uppercase",marginTop:3,letterSpacing:"0.06em"}}>{lbl}</div>
        </div>);
      })}
    </div>
  </div>
  <div className="dsa-toolbar">
    {["All",...DSA_CATS2,"0","1","2","3"].map(f=>(
      <button key={f} className={`dfb${dsaFil===f?" act":""}`}
        onClick={()=>setDsaFil(f)}
        style={["0","1","2","3"].includes(f)?{display:"none"}:{}}>
        {f}
      </button>
    ))}
    <div style={{display:"flex",gap:6}}>
      {[["0","●","#6a6880"],["1","●","#e0a86b"],["2","●","#c8a96e"],["3","●","#6ecfa8"]].map(([f,sym,c])=>(
        <button key={f} className={`dfb${dsaFil===f?" act":""}`} onClick={()=>setDsaFil(f)}
          style={{color:dsaFil===f?c:"var(--m2)",borderColor:dsaFil===f?c:"var(--b2)",background:dsaFil===f?c+"22":"transparent"}}>
          {sym} {["Not started","Aware","Practiced","Confident"][+f]}
        </button>
      ))}
    </div>
    <select className="dsor" value={dsaSort} onChange={e=>setDsaSort(e.target.value)}>
      <option value="default">Default order</option>
      <option value="solved">Most solved</option>
      <option value="conf">By confidence</option>
    </select>
  </div>
  {dsaView.map(t=>{
    const solved=t.problems.filter(p=>p.done).length;
    const pct=t.target>0?Math.min(100,(solved/t.target)*100):0;
    const confColors=["#6a6880","#e0a86b","#c8a96e","#6ecfa8"];
    return(<div key={t.id} className="dtc">
      <div className="dth" onClick={()=>setDsaExp(e=>({...e,[t.id]:!e[t.id]}))}>
        <div className="dtn">{t.t}</div>
        <span className="dtcat">{t.cat}</span>
        <div className="dpw">
          <div className="dpb"><div className="dpbf" style={{width:`${pct}%`,background:confColors[t.c]}}/></div>
          <span className="dpt">{solved}/{t.target}</span>
        </div>
        <div className="dcf">{[0,1,2,3].map(i=><span key={i} className={`dcd${t.c>i?" lit":""}`} onClick={e=>{e.stopPropagation();updDsaC(t.id,t.c===i+1?i:i+1);}} style={{color:confColors[i]}}>●</span>)}</div>
        <span className={`dchev${dsaExp[t.id]?" open":""}`}>▶</span>
      </div>
      {dsaExp[t.id]&&(
        <div className="dtbody">
          <div className="dtmr">
            <div className="dtmf"><div className="dtml">Notes</div><input className="dtni" value={t.notes} placeholder="Key patterns, tips..." onChange={e=>updDsaF(t.id,"notes",e.target.value)}/></div>
            <div className="dtmf"><div className="dtml">Target</div><input className="dtxi" value={t.target} type="number" onChange={e=>updDsaF(t.id,"target",+e.target.value)}/></div>
            <button className="bd" style={{marginTop:"auto"}} onClick={()=>setDsa(d=>d.filter(x=>x.id!==t.id))}>Delete topic</button>
          </div>
          <div className="prob-list">
            {t.problems.map(p=>(
              <div key={p.id} className="prob-row">
                <div className={`prob-ck${p.done?" done":""}`} onClick={()=>toggleProb(t.id,p.id)}>{p.done&&"✓"}</div>
                <span className={`prob-name${p.done?" done":""}`}>{p.name}</span>
                <span className="prob-diff" style={{background:`${DC2[p.diff]}22`,color:DC2[p.diff],border:`1px solid ${DC2[p.diff]}44`}}>{p.diff}</span>
                {p.link&&<a className="prob-link" href={p.link} target="_blank" rel="noreferrer">↗</a>}
                <button className="bd" onClick={()=>delProb(t.id,p.id)}>✕</button>
              </div>
            ))}
          </div>
          {spf[t.id]?(
            <div className="prob-form">
              <div className="pfr">
                <input className="pi2" placeholder="Problem name..." value={pInps[t.id]?.name||""} onChange={e=>setPInps(pi=>({...pi,[t.id]:{...pi[t.id],name:e.target.value}}))}/>
                <select className="pdsel" value={pInps[t.id]?.diff||"Medium"} onChange={e=>setPInps(pi=>({...pi,[t.id]:{...pi[t.id],diff:e.target.value}}))}><option>Easy</option><option>Medium</option><option>Hard</option></select>
              </div>
              <input className="pi2" placeholder="LeetCode/GFG URL (optional)" value={pInps[t.id]?.link||""} onChange={e=>setPInps(pi=>({...pi,[t.id]:{...pi[t.id],link:e.target.value}}))}/>
              <div style={{display:"flex",gap:8}}>
                <button className="btn bp" onClick={()=>addProb(t.id)}>Add Problem</button>
                <button className="btn bg" onClick={()=>setSpf(s=>({...s,[t.id]:false}))}>Cancel</button>
              </div>
            </div>
          ):(
            <button className="apb" onClick={()=>setSpf(s=>({...s,[t.id]:true}))}>+ add problem</button>
          )}
        </div>
      )}
    </div>);
  })}
  {dsaTM&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setDsaTM(false)}><div className="md">
    <div className="mdt">Add DSA Topic</div>
    <div className="f"><label>Topic Name</label><input value={ndt.t} onChange={e=>setNdt(x=>({...x,t:e.target.value}))}/></div>
    <div className="f"><label>Category</label><select value={ndt.cat} onChange={e=>setNdt(x=>({...x,cat:e.target.value}))}>{DSA_CATS2.map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="f"><label>Target Problems</label><input type="number" value={ndt.target} onChange={e=>setNdt(x=>({...x,target:+e.target.value}))}/></div>
    <div className="f"><label>Notes</label><input value={ndt.notes} placeholder="Key patterns, tips..." onChange={e=>setNdt(x=>({...x,notes:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setDsaTM(false)}>Cancel</button><button className="btn bp" onClick={addDsaT}>Add</button></div>
  </div></div>}
</>)}

{/* ── ACADEMICS ── */}
{tab==="academics"&&(<>
  <div className="sh">
    <h2 className="st">Academics</h2>
    {aTab==="attendance"&&<button className="btn bp" onClick={()=>setShowNewSub(true)}>+ Add Subject</button>}
    {aTab==="subjects"&&<button className="btn bp" onClick={()=>{setAcNsInp(true);setAcNsName("");}}>+ Add Subject</button>}
  </div>
  <div className="stabs">
    {[["countdown","Exam Countdown"],["attendance","Attendance"],["grades","CGPA & Grades"],["subjects","Subject Topics"]].map(([id,lbl])=>(
      <button key={id} className={`stab${aTab===id?" act":""}`} onClick={()=>setATab(id)}>{lbl}</button>
    ))}
  </div>

  {/* ── COUNTDOWN ── */}
  {aTab==="countdown"&&(<>
    <div className="exam-countdown">
      {upcomingExams.map(s=>{
        const urgent=s.days<=7;const near=s.days<=14;
        const col=urgent?"var(--d)":near?"var(--w)":"var(--a3)";
        return(<div key={s.id} className="exam-card" style={{borderColor:`${col}44`,background:`${col}08`}}>
          <div className="exam-days" style={{color:col}}>{s.days<0?"PAST":s.days===0?"TODAY":s.days}</div>
          <div style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",textTransform:"uppercase",marginBottom:4}}>{s.days>0?"days left":""}</div>
          <div className="exam-sub">{s.name}</div>
          <div className="exam-date">{s.exam}</div>
        </div>);
      })}
    </div>
    {upcomingExams.length===0&&<div className="empty"><div className="ei">📅</div><div className="et">No exam dates set. Add subjects in the Attendance tab.</div></div>}
    <div style={{background:"var(--s)",border:"1px solid var(--b)",borderRadius:10,padding:"14px 18px"}}>
      <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>colour legend</div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[["var(--d)","≤7 days — urgent"],["var(--w)","≤14 days — near"],["var(--a3)","15+ days — comfortable"]].map(([c,lbl])=>(
          <span key={lbl} style={{display:"flex",alignItems:"center",gap:6,fontFamily:"var(--fm)",fontSize:10,color:"var(--m2)"}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>{lbl}
          </span>
        ))}
      </div>
    </div>
  </>)}

  {/* ── ATTENDANCE ── */}
  {aTab==="attendance"&&(<>
    {showNewSub&&(
      <div style={{background:"var(--s)",border:"1px dashed var(--a)",borderRadius:10,padding:"14px 18px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
        <input autoFocus className="inp" placeholder="Subject name..." value={newSubName}
          style={{flex:1,background:"var(--s2)"}}
          onChange={e=>setNewSubName(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")addSub();if(e.key==="Escape"){setShowNewSub(false);setNewSubName("");}}}/>
        <button className="btn bp" onClick={addSub}>Add</button>
        <button className="btn bg" onClick={()=>{setShowNewSub(false);setNewSubName("");}}>Cancel</button>
      </div>
    )}
    <div style={{background:"var(--s)",border:"1px solid var(--b)",borderRadius:12,overflow:"hidden"}}>
      <table className="attbl">
        <thead><tr><th>Subject</th><th>Attended</th><th>Total</th><th>Remaining</th><th>%</th><th>Status</th><th>Exam Date</th><th></th></tr></thead>
        <tbody>
          {subs.map(s=>{
            const pct=s.tot>0?Math.round((s.att/s.tot)*100):0;
            const rem=s.rem||0; // remaining classes in semester
            const projPct=rem>0?Math.round(((s.att+rem)/(s.tot+rem))*100):pct;
            const need=pct>=75?0:Math.ceil((0.75*s.tot-s.att)/(1-0.75));
            const canMiss=pct>=75?Math.floor((s.att-0.75*s.tot)/0.75):0;
            // With remaining classes: can they recover?
            const canRecover=pct<75&&rem>0&&projPct>=75;
            const impossible=pct<75&&rem>0&&projPct<75;
            const cl=pct>=75?"var(--a3)":pct>=70?"var(--w)":"var(--d)";
            let statusText,statusColor;
            if(pct>=75){statusText=canMiss>0?`Can skip ${canMiss}`:"Safe ✓";statusColor="var(--a3)";}
            else if(impossible){statusText="Cannot recover";statusColor="var(--d)";}
            else if(canRecover){statusText=`Need ${need} of ${rem} left`;statusColor="var(--w)";}
            else{statusText=`${need} more needed`;statusColor="var(--d)";}
            return(<tr key={s.id}>
              <td style={{fontWeight:400}}>{s.name}</td>
              <td><input className="ism" value={s.att} onChange={e=>updSub(s.id,"att",+e.target.value)}/></td>
              <td><input className="ism" value={s.tot} onChange={e=>updSub(s.id,"tot",+e.target.value)}/></td>
              <td><input className="ism" value={s.rem||0} placeholder="0" title="Remaining classes this semester" onChange={e=>updSub(s.id,"rem",+e.target.value)}/></td>
              <td><span style={{fontFamily:"var(--fm)",fontSize:13,fontWeight:500,color:cl}}>{pct}%{rem>0&&<span style={{fontSize:10,color:"var(--m)",marginLeft:4}}>→{projPct}%</span>}</span></td>
              <td style={{fontFamily:"var(--fm)",fontSize:11,color:statusColor}}>{statusText}</td>
              <td><input className="ism" style={{width:100}} value={s.exam} onChange={e=>updSub(s.id,"exam",e.target.value)}/></td>
              <td><button className="bd" onClick={()=>delSub(s.id)}>✕</button></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
    {subs.length===0&&<div className="empty"><div className="ei">📋</div><div className="et">No subjects yet. Click "+ Add Subject" to start.</div></div>}
  </>)}

  {/* ── GRADES ── */}
  {aTab==="grades"&&(<>
    <div className="cgpad"><div className="cgv">{cgpa}</div><div className="cgl">Current CGPA (estimate)</div></div>
    <div style={{background:"var(--s)",border:"1px solid var(--b)",borderRadius:12,overflow:"hidden"}}>
      <table className="gtbl">
        <thead><tr><th>Subject</th><th>Grade</th><th>Points</th><th>Credits</th></tr></thead>
        <tbody>
          {subs.map(s=>(
            <tr key={s.id}>
              <td>{s.name}</td>
              <td><select className="gsel" value={s.grade} onChange={e=>updSub(s.id,"grade",e.target.value)}>{Object.keys(GM).map(g=><option key={g}>{g}</option>)}</select></td>
              <td style={{fontFamily:"var(--fm)",color:"var(--a)"}}>{GM[s.grade]??0}</td>
              <td style={{fontFamily:"var(--fm)",color:"var(--m)"}}>3</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {subs.length===0&&<div className="empty" style={{marginTop:16}}><div className="ei">📊</div><div className="et">Add subjects in the Attendance tab first.</div></div>}
  </>)}

  {/* ── SUBJECT NOTES ── */}
  {aTab==="subjects"&&(<>
    <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",letterSpacing:"0.08em",marginBottom:10,padding:"8px 12px",background:"rgba(110,207,168,0.05)",border:"1px solid rgba(110,207,168,0.15)",borderRadius:7}}>
      ✓ Synced with Attendance — adding a subject here also adds it to the attendance & grades tables.
    </div>
    <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
      {[["✓","confident","var(--a3)"],["~","shaky","var(--w)"],["–","not started","var(--m)"]].map(([sym,s,c])=>(
        <span key={s} style={{color:c}}>{sym} {s}</span>
      ))}
    </div>

    {acNsInp&&(
      <div style={{background:"var(--s)",border:"1px dashed var(--a)",borderRadius:10,padding:"14px 18px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
        <input autoFocus className="inp" placeholder="Subject name..." value={acNsName}
          style={{flex:1,background:"var(--s2)"}}
          onChange={e=>setAcNsName(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")addAcSubj();if(e.key==="Escape"){setAcNsInp(false);setAcNsName("");}}}/>
        <button className="btn bp" onClick={addAcSubj}>Add</button>
        <button className="btn bg" onClick={()=>{setAcNsInp(false);setAcNsName("");}}>Cancel</button>
      </div>
    )}

    <div className="csgrid">
      {subs.map(subj=>{
        const conf=(subj.topics||[]).filter(t=>t.s==="confident").length;
        const tot=(subj.topics||[]).length;
        return(<div key={subj.id} className="cscard">
          {/* Header */}
          <div className="csch" style={{marginBottom:5}}>
            {acEditSid===subj.id?(
              <input autoFocus className="inp" value={acEditSName}
                style={{flex:1,fontSize:14,fontWeight:500,background:"var(--s2)",marginRight:8}}
                onChange={e=>setAcEditSName(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")renAcSubj(subj.id,acEditSName);if(e.key==="Escape")setAcEditSid(null);}}
                onBlur={()=>renAcSubj(subj.id,acEditSName)}/>
            ):(
              <div className="csn" style={{cursor:"pointer",flex:1}} title="Click to rename"
                onClick={()=>{setAcEditSid(subj.id);setAcEditSName(subj.name);}}>
                {subj.name} <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",marginLeft:4}}>✎</span>
              </div>
            )}
            <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
              <div className="csp">{conf}/{tot}</div>
              <button className="bd" onClick={()=>delAcSubj(subj.id)}>✕</button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{height:3,background:"var(--b2)",borderRadius:2,marginBottom:12,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${tot>0?(conf/tot)*100:0}%`,background:"var(--a3)",borderRadius:2,transition:"width 0.3s"}}/>
          </div>

          {/* Topics */}
          <div className="topics-scroll">
          {(subj.topics||[]).map((t,ti)=>(
            <div key={ti} className="trow" style={{gap:5}}>
              {acEditTKey===`${subj.id}-${ti}`?(
                <input autoFocus className="inp" value={acEditTName}
                  style={{flex:1,fontSize:12,background:"var(--s2)"}}
                  onChange={e=>setAcEditTName(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter")renAcTopic(subj.id,ti,acEditTName);if(e.key==="Escape")setAcEditTKey(null);}}
                  onBlur={()=>renAcTopic(subj.id,ti,acEditTName)}/>
              ):(
                <span className="tn" style={{cursor:"pointer"}} title="Click to rename"
                  onClick={()=>{setAcEditTKey(`${subj.id}-${ti}`);setAcEditTName(t.n);}}>
                  {t.n}
                </span>
              )}
              <div className="cbs">
                {["not_started","shaky","confident"].map(s=>(
                  <button key={s} className={`cb${t.s===s?" "+s:""}`}
                    style={t.s!==s?{background:"transparent",color:"var(--m)",borderColor:"var(--b)"}:{}}
                    onClick={()=>updAcSubj(subj.id,ti,s)}>{cLabel(s)}</button>
                ))}
              </div>
              <button className="bd" style={{opacity:0.4,fontSize:9,padding:"2px 5px"}}
                onMouseEnter={e=>e.target.style.opacity=1}
                onMouseLeave={e=>e.target.style.opacity=0.4}
                onClick={()=>delAcTopic(subj.id,ti)}>✕</button>
            </div>
          ))}
          </div>

          {/* Add topic */}
          {acNtInps[subj.id]!==undefined?(
            <div className="ar" style={{marginTop:9}}>
              <input autoFocus className="inp" placeholder="New topic..." value={acNtInps[subj.id]||""}
                onChange={e=>setAcNtInps(m=>({...m,[subj.id]:e.target.value}))}
                onKeyDown={e=>{
                  if(e.key==="Enter"){addAcTopic(subj.id);setAcNtInps(m=>{const n={...m};delete n[subj.id];return n;});}
                  if(e.key==="Escape")setAcNtInps(m=>{const n={...m};delete n[subj.id];return n;});
                }}
                onBlur={()=>{addAcTopic(subj.id);setAcNtInps(m=>{const n={...m};delete n[subj.id];return n;});}}/>
              <button className="ba" onClick={()=>{addAcTopic(subj.id);setAcNtInps(m=>{const n={...m};delete n[subj.id];return n;});}}>+</button>
            </div>
          ):(
            <button className="dadd" style={{marginTop:9,borderRadius:6}}
              onClick={()=>setAcNtInps(m=>({...m,[subj.id]:""}))}>+ add topic</button>
          )}
        </div>);
      })}
      {subs.length===0&&(
        <div className="empty" style={{gridColumn:"1/-1"}}>
          <div className="ei">📚</div>
          <div className="et">No subjects yet. Click "+ Add Subject" to start.</div>
        </div>
      )}
    </div>
  </>)}
</>)}

{/* ── SKILLS ── */}
{tab==="skills"&&(<>
  <div className="sh">
    <h2 className="st">Skills</h2>
    {skillsTab==="tree"&&<button className="btn bp" onClick={()=>setSskm(true)}>+ Add Skill</button>}
    {skillsTab==="queue"&&<button className="btn bp" onClick={()=>setSlqm(true)}>+ Add Resource</button>}
    {skillsTab==="certs"&&<button className="btn bp" onClick={()=>setScm(true)}>+ Add Cert</button>}
  </div>
  <div className="stabs">
    {[["tree","Skill Tree"],["queue","Learning Queue"],["certs","Certifications"]].map(([id,lbl])=>(
      <button key={id} className={`stab${skillsTab===id?" act":""}`} onClick={()=>setSkillsTab(id)}>{lbl}</button>
    ))}
  </div>

  {skillsTab==="tree"&&(<>
    <div className="scats">
      {SKILL_CATS.map(c=><button key={c} className={`scf${scat===c?" act":""}`} onClick={()=>setScat(c)}>{c}</button>)}
    </div>
    <div className="sgrid">
      {fskills.map(s=>(
        <div key={s.id} className="skcard">
          <div className="sktop">
            <div><div className="skn">{s.n}</div><div className="skc">{s.cat}</div></div>
            <button className="bd" onClick={()=>setSkills(sk=>sk.filter(x=>x.id!==s.id))}>✕</button>
          </div>
          <div className="skbr">
            <div className="skbar"><div className="skbarf" style={{width:`${s.p/5*100}%`}}/></div>
            <div className="skst">
              {[1,2,3,4,5].map(i=><span key={i} className={`skstar${s.p>=i?" lit":""}`} style={{color:s.p>=i?"var(--a2)":"var(--m)"}} onClick={()=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,p:i,lp:0}:x))}>★</span>)}
            </div>
          </div>
          <div className={`skl${s.lp>14?" stale":""}`}>{dAgo(s.lp)}{s.lp>14?" · getting rusty":""}</div>
        </div>
      ))}
    </div>
  </>)}

  {skillsTab==="queue"&&(<>
    {lqueue.map(r=>(
      <div key={r.id} className="lq-card">
        <div className="lq-status-dot" style={{background:LQ_STATUS[r.status]}}/>
        <div className="lq-body">
          <div className="lq-title">{r.title}</div>
          <div className="lq-meta">
            <span className="tag" style={{background:"rgba(155,127,212,0.1)",color:"var(--a2)",border:"1px solid rgba(155,127,212,0.2)"}}>{r.type}</span>
            <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>{r.hrs}h est.</span>
            {r.notes&&<span style={{fontSize:12,color:"var(--m2)"}}>{r.notes}</span>}
          </div>
        </div>
        <select className="gsel" value={r.status} onChange={e=>setLqueue(l=>l.map(x=>x.id===r.id?{...x,status:e.target.value}:x))}>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done ✓</option>
        </select>
        <button className="bd" onClick={()=>setLqueue(l=>l.filter(x=>x.id!==r.id))}>✕</button>
      </div>
    ))}
    {lqueue.length===0&&<div className="empty"><div className="ei">📖</div><div className="et">Nothing in the queue yet.</div></div>}
  </>)}

  {skillsTab==="certs"&&(<>
    {certs.map(c=>(
      <div key={c.id} className="cert-card">
        <div className="cert-top">
          <div>
            <div className="cert-name">{c.name}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <select className="gsel" value={c.status} onChange={e=>setCerts(cs=>cs.map(x=>x.id===c.id?{...x,status:e.target.value}:x))}>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done ✓</option>
            </select>
            <button className="bd" onClick={()=>setCerts(cs=>cs.filter(x=>x.id!==c.id))}>✕</button>
          </div>
        </div>
        <div className="cert-meta">
          <span className="tag" style={{background:`${CERT_STATUS[c.status]}22`,color:CERT_STATUS[c.status],border:`1px solid ${CERT_STATUS[c.status]}44`}}>{c.status}</span>
          <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>{c.platform}</span>
          {c.targetDate&&<span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)"}}>🎯 {c.targetDate}</span>}
          {c.notes&&<span style={{fontSize:12,color:"var(--m2)"}}>{c.notes}</span>}
        </div>
        <div className="cert-prog">
          <input type="range" min="0" max="100" value={c.progress} className="cert-pi"
            style={{background:`linear-gradient(to right,var(--a2) ${c.progress}%,#1f1f33 ${c.progress}%)`}}
            onChange={e=>setCerts(cs=>cs.map(x=>x.id===c.id?{...x,progress:+e.target.value}:x))}/>
          <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m2)",minWidth:32,textAlign:"right"}}>{c.progress}%</span>
        </div>
      </div>
    ))}
    {certs.length===0&&<div className="empty"><div className="ei">🏅</div><div className="et">No certifications tracked yet.</div></div>}
  </>)}

  {sskm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSskm(false)}><div className="md">
    <div className="mdt">Add Skill</div>
    <div className="f"><label>Name</label><input value={nsk.n} onChange={e=>setNsk(x=>({...x,n:e.target.value}))}/></div>
    <div className="f"><label>Category</label><select value={nsk.cat} onChange={e=>setNsk(x=>({...x,cat:e.target.value}))}>{SKILL_CATS.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="f"><label>Proficiency (1–5)</label>
      <div style={{display:"flex",gap:8,marginTop:4}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:22,cursor:"pointer",color:nsk.p>=i?"var(--a2)":"var(--m)",opacity:nsk.p>=i?1:0.3}} onClick={()=>setNsk(x=>({...x,p:i}))}>★</span>)}</div>
    </div>
    <div className="ma"><button className="btn bg" onClick={()=>setSskm(false)}>Cancel</button><button className="btn bp" onClick={()=>{if(!nsk.n.trim())return;setSkills(s=>[...s,{...nsk,id:Date.now()}]);setNsk({n:"",cat:"Frontend",p:3,lp:0});setSskm(false);}}>Add</button></div>
  </div></div>}
  {slqm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSlqm(false)}><div className="md">
    <div className="mdt">Add to Learning Queue</div>
    <div className="f"><label>Title</label><input value={nlq.title} placeholder="Course / book / paper name" onChange={e=>setNlq(x=>({...x,title:e.target.value}))}/></div>
    <div className="f"><label>Type</label><select value={nlq.type} onChange={e=>setNlq(x=>({...x,type:e.target.value}))}>{LQ_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
    <div className="f"><label>Estimated Hours</label><input type="number" value={nlq.hrs} onChange={e=>setNlq(x=>({...x,hrs:+e.target.value}))}/></div>
    <div className="f"><label>Notes</label><input value={nlq.notes} placeholder="Link, why this is useful..." onChange={e=>setNlq(x=>({...x,notes:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setSlqm(false)}>Cancel</button><button className="btn bp" onClick={addLQ}>Add</button></div>
  </div></div>}
  {scm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setScm(false)}><div className="md">
    <div className="mdt">Add Certification</div>
    <div className="f"><label>Certification Name</label><input value={nc.name} onChange={e=>setNc(x=>({...x,name:e.target.value}))}/></div>
    <div className="f"><label>Platform</label><input value={nc.platform} placeholder="Coursera, Google, AWS..." onChange={e=>setNc(x=>({...x,platform:e.target.value}))}/></div>
    <div className="f"><label>Target Date</label><input type="date" value={nc.targetDate} onChange={e=>setNc(x=>({...x,targetDate:e.target.value}))}/></div>
    <div className="f"><label>Notes</label><input value={nc.notes} onChange={e=>setNc(x=>({...x,notes:e.target.value}))}/></div>
    <div className="ma"><button className="btn bg" onClick={()=>setScm(false)}>Cancel</button><button className="btn bp" onClick={addCert}>Add</button></div>
  </div></div>}
</>)}

{/* ── TIME ── */}
{tab==="time"&&(<>
  <div className="sh"><h2 className="st">Time Tracker</h2><span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m)"}}>today's sessions</span></div>
  <div className="thero">
    <div className="tmodes">
      {[["work","mw","Focus"],["break","mb","Break"],["waste","mv","Wasted"],["pomo","mp","🍅 Pomodoro"]].map(([m,mc,lbl])=>(
        <button key={m} className={`mdb ${mc}${tmode===m?" act":""}`}
          onClick={()=>{if(!trun){setTmode(m);setTsec(0);if(m==="pomo")setPphase("work");}}}
          style={{cursor:trun?"not-allowed":"pointer"}}>{lbl}</button>
      ))}
    </div>
    {tmode==="pomo"&&(
      <div className="pind">
        {[0,1,2,3].map(i=><div key={i} className={`pdot${pcount%4>i?" dn":""}`}/>)}
        <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",marginLeft:8}}>{pphase==="work"?"focus":"break"} · #{pcount+1}</span>
      </div>
    )}
    <div className="tdisp" style={{color:tc}}>
      {tmode==="pomo"?fmtS((pphase==="work"?PW:PB)-tsec):fmtS(tsec)}
    </div>
    <div className="tlbl">
      {trun?(tmode==="pomo"?`🍅 ${pphase==="work"?"deep focus — 25 min":"rest — 5 min"}...`:`recording ${tmode}...`):"ready to track"}
    </div>
    <div className="tctrl">
      {!trun?<button className="tbtn tbtn-s" onClick={()=>setTrun(true)}>▶ Start</button>:<>
        <button className="tbtn tbtn-p" onClick={()=>setTrun(false)}>⏸ Pause</button>
        <button className="tbtn tbtn-x" onClick={stopTimer}>⏹ Stop & Save</button>
      </>}
    </div>
    <div className="trow2">
      <input className="tti" placeholder="Label this session..." value={tlbl} onChange={e=>setTlbl(e.target.value)}/>
      <select className="tls" value={tlnk} onChange={e=>setTlnk(e.target.value)}>
        <option value="">Link to project...</option>
        {projs.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
    </div>
  </div>
  <div className="tsum">
    <div className="tscard"><div className="tsv" style={{color:"var(--a)"}}>{fmtD(tw)}</div><div className="tsl">Focused</div></div>
    <div className="tscard"><div className="tsv" style={{color:"var(--a3)"}}>{fmtD(tb)}</div><div className="tsl">Breaks</div></div>
    <div className="tscard"><div className="tsv" style={{color:"var(--d)"}}>{fmtD(tv)}</div><div className="tsl">Wasted</div></div>
    <div className="tscard"><div className="tsv" style={{color:"var(--a2)"}}>{pcount}</div><div className="tsl">Pomodoros</div></div>
  </div>
  <div className="rbar-w">
    <div className="rbar-l">today's breakdown</div>
    <div className="rbar">
      <div className="rs-w" style={{width:`${tw/gt*100}%`}}/><div className="rs-b" style={{width:`${tb/gt*100}%`}}/><div className="rs-v" style={{width:`${tv/gt*100}%`}}/>
    </div>
    <div className="rleg">
      {[["work","Focused","var(--a)"],["break","Breaks","var(--a3)"],["waste","Wasted","var(--d)"]].map(([t,lbl,c])=>(
        <div key={t} className="rli"><div className="rdot" style={{background:c}}/>{lbl} · {Math.round(tByType(t)/gt*100)}%</div>
      ))}
    </div>
  </div>

  {/* Weekly Report */}
  <div className="sh" style={{marginBottom:12}}><h2 className="st" style={{fontSize:17}}>Weekly Report</h2></div>
  <div className="wr-grid">
    {wd.map((d,i)=>{
      const dayWork=tByDay(i,"work");const dayBreak=tByDay(i,"break");const dayWaste=tByDay(i,"waste");
      const dayTotal=dayWork+dayBreak+dayWaste;
      const maxDay=7200;
      return(<div key={i} className={`wr-day${i===tdi?" today":""}`}>
        <div className="wr-dname">{DAYS[i]}</div>
        <div className="wr-stk">
          {dayWaste>0&&<div className="wr-seg" style={{background:"var(--d)",height:`${Math.max(4,(dayWaste/maxDay)*70)}px`}}/>}
          {dayBreak>0&&<div className="wr-seg" style={{background:"var(--a3)",height:`${Math.max(4,(dayBreak/maxDay)*70)}px`}}/>}
          {dayWork>0&&<div className="wr-seg" style={{background:"var(--a)",height:`${Math.max(4,(dayWork/maxDay)*70)}px`}}/>}
        </div>
        <div className="wr-total">{dayTotal>0?fmtD(dayTotal):"—"}</div>
      </div>);
    })}
  </div>
  <div style={{display:"flex",gap:12,marginBottom:20}}>
    {[["work","Work","var(--a)"],["break","Break","var(--a3)"],["waste","Wasted","var(--d)"]].map(([t,lbl,c])=>(
      <div key={t} className="rli"><div className="rdot" style={{background:c}}/>{lbl}</div>
    ))}
  </div>

  <div className="sh" style={{marginBottom:12}}>
    <h2 className="st" style={{fontSize:17}}>Session Log</h2>
    {tlogs.length>0&&<button className="btn bg" style={{fontSize:10}} onClick={()=>setTlogs([])}>Clear all</button>}
  </div>
  {tlogs.filter(l=>l.day===tdi).length===0?<div className="empty"><div className="ei">⏱</div><div className="et">No sessions today yet.</div></div>:(
    <div className="logs">
      {tlogs.filter(l=>l.day===tdi).map(log=>(
        <div key={log.id} className="litem">
          <div className="ltdot" style={{background:tyc(log.type)}}/>
          <span className="llbl">{log.label}</span>
          {log.link&&<span className="llnk">{log.link}</span>}
          <span className="ldur" style={{color:tyc(log.type)}}>{fmtD(log.duration)}</span>
          <span className="ltm">{log.startedAt}</span>
          <button className="ldel" onClick={()=>setTlogs(l=>l.filter(x=>x.id!==log.id))}>✕</button>
        </div>
      ))}
    </div>
  )}
</>)}

{/* ── HABITS ── */}
{tab==="habits"&&(<>
  <div className="sh"><h2 className="st">Habit Tracker</h2><button className="btn bp" onClick={()=>setShm(true)}>+ New Habit</button></div>
  <div style={{display:"flex",gap:0,background:"var(--s)",border:"1px solid var(--b)",borderRadius:10,padding:"12px 16px",marginBottom:18,overflow:"auto"}}>
    <div style={{width:200,flex:"0 0 200px",fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",textTransform:"uppercase",letterSpacing:"0.08em",paddingTop:2}}>Habit</div>
    {wd.map((d,i)=>(
      <div key={i} style={{flex:1,minWidth:40,textAlign:"center",fontFamily:"var(--fm)",fontSize:10,color:i===tdi?"var(--a)":"var(--m)",textTransform:"uppercase",letterSpacing:"0.08em"}}>
        {DAYS[i].slice(0,2)}<br/><span style={{fontSize:13,fontWeight:600,fontFamily:"var(--fd)"}}>{d.getDate()}</span>
      </div>
    ))}
    <div style={{width:60,flex:"0 0 60px",textAlign:"center",fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Streak</div>
  </div>
  <div style={{display:"flex",flexDirection:"column",gap:8}}>
    {habits.map(h=>(
      <div key={h.id} style={{display:"flex",alignItems:"center",background:"var(--s)",border:"1px solid var(--b)",borderRadius:10,padding:"13px 16px",gap:0}}>
        <div style={{width:200,flex:"0 0 200px",display:"flex",alignItems:"center",gap:9}}>
          <span style={{fontSize:18}}>{h.icon}</span>
          <span style={{fontSize:13,fontWeight:500,color:"var(--t)"}}>{h.name}</span>
          <button className="bd" style={{marginLeft:"auto",opacity:0.4,fontSize:9}} onClick={()=>setHabits(hs=>hs.filter(x=>x.id!==h.id))}>✕</button>
        </div>
        {wd.map((d,i)=>(
          <div key={i} style={{flex:1,minWidth:40,display:"flex",justifyContent:"center"}}>
            <div onClick={()=>toggleHabitDay(h.id,i)}
              style={{width:22,height:22,borderRadius:5,background:h.days[i]?h.color:"transparent",border:`2px solid ${h.days[i]?h.color:"var(--b2)"}`,cursor:"pointer",transition:"all 0.15s",opacity:i>tdi?0.35:1}}>
            </div>
          </div>
        ))}
        <div style={{width:60,flex:"0 0 60px",textAlign:"center"}}>
          <span style={{fontFamily:"var(--fm)",fontSize:13,fontWeight:500,color:"var(--a)"}}>🔥{h.streak}</span>
        </div>
      </div>
    ))}
    {habits.length===0&&<div className="empty"><div className="ei">🔥</div><div className="et">No habits yet. Add one to start tracking.</div></div>}
  </div>
  {shm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setShm(false)}><div className="md">
    <div className="mdt">New Habit</div>
    <div className="f"><label>Habit Name</label><input value={nh.name} placeholder="e.g. Solve 1 DSA problem" onChange={e=>setNh(x=>({...x,name:e.target.value}))}/></div>
    <div className="f"><label>Icon (emoji)</label><input value={nh.icon} style={{maxWidth:80}} onChange={e=>setNh(x=>({...x,icon:e.target.value}))}/></div>
    <div className="f"><label>Color</label>
      <div style={{display:"flex",gap:8,marginTop:4}}>{["#c8a96e","#9b7fd4","#6ecfa8","#e06b6b","#6baae0","#e06bb5"].map(c=><div key={c} onClick={()=>setNh(x=>({...x,color:c}))} style={{width:24,height:24,borderRadius:"50%",background:c,cursor:"pointer",border:nh.color===c?"3px solid white":"3px solid transparent"}}/>)}</div>
    </div>
    <div className="ma"><button className="btn bg" onClick={()=>setShm(false)}>Cancel</button><button className="btn bp" onClick={addHabit}>Add</button></div>
  </div></div>}
</>)}

{/* ── NOTES ── */}
{tab==="notes"&&(<>
  <div className="sh">
    <h2 className="st">Notes</h2>
    <button className="btn bp" onClick={addNote}>+ New Note</button>
  </div>
  <div className="notes-grid">
    <div>
      <div className="notes-list">
        {notes.map(n=>(
          <div key={n.id} className={`note-item${activeNote===n.id?" active":""}`} onClick={()=>setActiveNote(n.id)}>
            <div className="note-item-title">{n.title||"Untitled"}</div>
            <div className="note-item-preview">{n.body.replace(/\n/g," ")||"Empty note"}</div>
            <div className="note-item-date">{n.updatedAt}</div>
          </div>
        ))}
        {notes.length===0&&<div className="empty" style={{padding:"30px 0"}}><div className="ei">📝</div><div className="et">No notes.</div></div>}
      </div>
    </div>
    {curNote?(
      <div className="note-editor">
        <input className="note-title-inp" value={curNote.title} placeholder="Note title..."
          onChange={e=>updNote(curNote.id,"title",e.target.value)}/>
        <div className="note-divider"/>
        <div className="note-mode-toggle">
          <button className={`nmt${noteMode==="edit"?" act":""}`} onClick={()=>setNoteMode("edit")}>✎ Edit</button>
          <button className={`nmt${noteMode==="preview"?" act":""}`} onClick={()=>setNoteMode("preview")}>👁 Preview</button>
        </div>
        {noteMode==="edit"?(
          <textarea className="note-body-inp" value={curNote.body} placeholder={"Start writing...\n\nMarkdown supported:\n# Heading  **bold**  *italic*  `code`  - list item"}
            onChange={e=>updNote(curNote.id,"body",e.target.value)}/>
        ):(
          <div className="md-preview"
            dangerouslySetInnerHTML={{__html:renderMd(curNote.body)||"<span style='color:var(--m)'>Nothing to preview</span>"}}/>
        )}
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:4}}>
          <button className="bd" onClick={()=>delNote(curNote.id)}>Delete note</button>
        </div>
      </div>
    ):(
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",color:"var(--m)",fontFamily:"var(--fm)",fontSize:12}}>Select a note or create one</div>
    )}
  </div>
</>)}

{/* ── MONTHLY ── */}
{tab==="month"&&(<>
  {/* Month navigator */}
  <div className="month-nav">
    <button className="month-nav-btn" onClick={()=>{
      if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}
      else setViewMonth(m=>m-1);
    }}>◀ Prev</button>
    <div style={{flex:1}}>
      <div className="month-name">{MONTH_NAMES[viewMonth]}</div>
      <div className="month-year">{viewYear}</div>
    </div>
    <button className="month-nav-btn" onClick={()=>{
      if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}
      else setViewMonth(m=>m+1);
    }}>Next ▶</button>
    <button className="btn bp" onClick={()=>setSmgm(true)}>+ Add Goal</button>
  </div>

  {/* Stats */}
  <div className="month-stats">
    <div className="mstat"><div className="mstat-v">{mgGoals.length}</div><div className="mstat-l">Total Goals</div></div>
    <div className="mstat"><div className="mstat-v" style={{color:"var(--a3)"}}>{mgDone}</div><div className="mstat-l">Completed</div></div>
    <div className="mstat"><div className="mstat-v" style={{color:"var(--a)"}}>{mgInProg}</div><div className="mstat-l">In Progress</div></div>
    <div className="mstat"><div className="mstat-v">{mgAvgProg}%</div><div className="mstat-l">Avg Progress</div></div>
  </div>

  {/* Monthly focus */}
  <div className="month-focus">
    <div className="month-focus-label">🎯 Monthly Focus & Intention</div>
    <textarea className="month-focus-inp"
      placeholder={`What is ${MONTH_NAMES[viewMonth]} about? Set your intention for the month...`}
      value={curMonthData.focus||""}
      onChange={e=>updMonthData({focus:e.target.value})}
    />
  </div>

  {/* Category filters */}
  <div className="mg-cats">
    {MG_CATS.map(c=>(
      <button key={c} className={`mg-cat-btn${mgCatFil===c?" act":""}`} onClick={()=>setMgCatFil(c)}>{c}</button>
    ))}
  </div>

  {/* Pinned goals from Goals tab */}
  {goals.filter(g=>g.monthPinned).length>0&&(
    <div style={{background:"rgba(200,169,110,0.04)",border:"1px solid rgba(200,169,110,0.15)",borderRadius:10,padding:"14px 18px",marginBottom:18}}>
      <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--a)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>📌 Pinned from Goals</div>
      {goals.filter(g=>g.monthPinned).map(g=>{
        const ep=effectiveProgress(g);
        const col=g.priority==="High"?"var(--d)":g.priority==="Med"?"var(--a)":"var(--a3)";
        return(<div key={g.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid var(--b)"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:col,flexShrink:0}}/>
          <span style={{flex:1,fontSize:13,color:"var(--t)"}}>{g.title}</span>
          <div style={{width:80,height:4,background:"var(--b2)",borderRadius:2,overflow:"hidden",flexShrink:0}}>
            <div style={{height:"100%",width:`${ep}%`,background:col,borderRadius:2,transition:"width 0.3s"}}/>
          </div>
          <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--m2)",minWidth:32,textAlign:"right"}}>{ep}%</span>
          <button style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--m)",background:"transparent",border:"none",cursor:"pointer"}}
            onClick={()=>toggleMonthPin(g.id)}>unpin</button>
        </div>);
      })}
    </div>
  )}

  {/* Monthly-specific goal cards */}
  {filteredMG.length===0&&(
    <div className="empty"><div className="ei">📅</div><div className="et">{mgGoals.length===0?"No goals set for this month yet. Click '+ Add Goal' to start.":"No goals in this category."}</div></div>
  )}
  {filteredMG.map(g=>(
    <div key={g.id} className={`mg-card p${g.priority[0]}${g.done?" done-card":""}`}>
      <div className="mg-top">
        <div style={{display:"flex",alignItems:"flex-start",gap:10,flex:1}}>
          {/* Done checkbox */}
          <div style={{width:18,height:18,border:`2px solid ${g.done?"var(--a3)":"var(--b2)"}`,borderRadius:4,cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,background:g.done?"var(--a3)":"transparent",color:"#080810",transition:"all 0.15s"}}
            onClick={()=>toggleMGDone(g.id)}>{g.done&&"✓"}</div>
          <div className={`mg-title${g.done?" done":""}`}>{g.title}</div>
        </div>
        <button className="bd" onClick={()=>delMG(g.id)}>✕</button>
      </div>

      {/* Tags */}
      <div className="mg-meta">
        <span className="tag" style={{background:"rgba(155,127,212,0.12)",color:"var(--a2)",border:"1px solid rgba(155,127,212,0.25)"}}>{g.cat}</span>
        <span className="tag" style={{background:`${mgPriorityColor(g.priority)}18`,color:mgPriorityColor(g.priority),border:`1px solid ${mgPriorityColor(g.priority)}33`}}>{g.priority}</span>
        {g.done&&<span className="tag" style={{background:"rgba(110,207,168,0.12)",color:"var(--a3)",border:"1px solid rgba(110,207,168,0.25)"}}>✓ Done</span>}
      </div>

      {/* Progress — driven by milestones, read-only */}
      <div className="mg-progress" style={{marginBottom:10}}>
        <div className="mg-bar">
          <div className="mg-bar-fill" style={{width:`${g.progress}%`,background:g.done?"var(--a3)":mgPriorityColor(g.priority)}}/>
        </div>
        <span className="mg-pct">{g.progress}%</span>
      </div>

      {/* Milestones */}
      {(g.milestones.length>0||msInputs[g.id]!==undefined)&&(
        <div className="mg-milestones">
          <div className="mg-ms-label">Milestones · {g.milestones.filter(m=>m.done).length}/{g.milestones.length}</div>
          {g.milestones.map(m=>(
            <div key={m.id} className="mg-ms-row">
              <div className={`mg-ms-cb${m.done?" ck":""}`} onClick={()=>toggleMS(g.id,m.id)}>{m.done&&"✓"}</div>
              <span className={`mg-ms-text${m.done?" done":""}`}>{m.text}</span>
              <button className="bd" style={{opacity:0.3,fontSize:9,padding:"1px 5px"}}
                onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.3}
                onClick={()=>delMS(g.id,m.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Add milestone */}
      {msInputs[g.id]!==undefined?(
        <div className="ar" style={{marginTop:8}}>
          <input autoFocus className="inp" placeholder="Milestone..." value={msInputs[g.id]||""}
            onChange={e=>setMsInputs(m=>({...m,[g.id]:e.target.value}))}
            onKeyDown={e=>{
              if(e.key==="Enter"){addMS(g.id,msInputs[g.id]||"");setMsInputs(m=>{const n={...m};delete n[g.id];return n;});}
              if(e.key==="Escape")setMsInputs(m=>{const n={...m};delete n[g.id];return n;});
            }}
            onBlur={()=>{addMS(g.id,msInputs[g.id]||"");setMsInputs(m=>{const n={...m};delete n[g.id];return n;});}}/>
          <button className="ba" onClick={()=>{addMS(g.id,msInputs[g.id]||"");setMsInputs(m=>{const n={...m};delete n[g.id];return n;});}}>+</button>
        </div>
      ):(
        <button className="mg-ms-add" onClick={()=>setMsInputs(m=>({...m,[g.id]:""}))}>+ add milestone</button>
      )}
    </div>
  ))}

  {/* Monthly Retrospective */}
  <div className="month-retro">
    <div className="retro-title">Month Retrospective</div>
    <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--m)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>
      Reflect on {MONTH_NAMES[viewMonth]} {viewYear}
    </div>
    <div className="retro-q">✅ What went well?</div>
    <textarea className="retro-inp" placeholder="Wins, progress, proud moments..."
      value={curMonthData.retro?.went_well||""} onChange={e=>updMonthRetro("went_well",e.target.value)}/>
    <div className="retro-q">🔧 What can I improve?</div>
    <textarea className="retro-inp" placeholder="Bottlenecks, bad habits, missed goals..."
      value={curMonthData.retro?.improve||""} onChange={e=>updMonthRetro("improve",e.target.value)}/>
    <div className="retro-q">🚀 Focus for next month</div>
    <textarea className="retro-inp" placeholder="Top 3 things to carry forward or start..."
      value={curMonthData.retro?.next_month||""} onChange={e=>updMonthRetro("next_month",e.target.value)}/>
  </div>

  {/* Add goal modal */}
  {smgm&&<div className="ov" onClick={e=>e.target===e.currentTarget&&setSmgm(false)}><div className="md">
    <div className="mdt">New Monthly Goal</div>
    <div className="f"><label>Goal</label><input value={nmg.title} placeholder="What do you want to achieve this month?" onChange={e=>setNmg(x=>({...x,title:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addMG()}/></div>
    <div className="f"><label>Category</label><select value={nmg.cat} onChange={e=>setNmg(x=>({...x,cat:e.target.value}))}>{MG_CATS.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="f"><label>Priority</label><select value={nmg.priority} onChange={e=>setNmg(x=>({...x,priority:e.target.value}))}>{["High","Med","Low"].map(p=><option key={p}>{p}</option>)}</select></div>
    <div className="ma"><button className="btn bg" onClick={()=>setSmgm(false)}>Cancel</button><button className="btn bp" onClick={addMG}>Add Goal</button></div>
  </div></div>}
</>)}


{tab==="account"&&(<>
  <div className="sh"><h2 className="st">Accountability</h2></div>
  <div className="sgrid-acc" style={{gridTemplateColumns:"repeat(6,1fr)"}}>
    <div className="scard"><div className="sv">{ckins.length}</div><div className="sl">Day Streak</div></div>
    <div className="scard"><div className="sv">{avgProg}%</div><div className="sl">Goal Progress</div></div>
    <div className="scard"><div className="sv">{totT>0?Math.round(doneT/totT*100):0}%</div><div className="sl">Tasks Done</div></div>
    <div className="scard"><div className="sv" style={{color:"var(--a3)"}}>{apps.filter(a=>["Applied","OA","Interview","Offer"].includes(a.stage)).length}</div><div className="sl">Active Apps</div></div>
    <div className="scard"><div className="sv" style={{color:"var(--a2)"}}>{habitsToday}%</div><div className="sl">Habits Today</div></div>
    <div className="scard"><div className="sv" style={{color:"var(--a)"}}>{dsaTotalSolved}</div><div className="sl">DSA Solved</div></div>
  </div>
  <div className="ckin">
    <div className="ckt">Daily Check-In</div>
    <div className="mr">{["🔥","😊","😐","😓","💀"].map(m=><button key={m} className={`mb2${mood===m?" sel":""}`} onClick={()=>setMood(mood===m?null:m)}>{m}</button>)}</div>
    {wins.map((w,i)=><div key={i} className="wi">✦ {w}</div>)}
    <div className="ar">
      <input className="inp" placeholder="Log a win..." value={wt} onChange={e=>setWt(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter"&&wt.trim()){setWins(w=>[...w,wt.trim()]);setWt("");}}}/>
      <button className="ba" onClick={()=>{if(wt.trim()){setWins(w=>[...w,wt.trim()]);setWt("");}}}>+</button>
    </div>
    <div style={{marginTop:14}}><button className="btn bp" onClick={submitCkin} style={{opacity:(!mood&&wins.length===0)?0.4:1}}>Submit Check-In</button></div>
  </div>
  <div className="sh" style={{marginTop:8,marginBottom:12}}><h2 className="st" style={{fontSize:16}}>Recent History</h2></div>
  <div className="hist">
    {ckins.map((c,i)=>(
      <div key={i} className="hitem"><span className="hdate">{c.date}</span><span className="hmood">{c.mood}</span><span className="htxt">{c.summary}</span></div>
    ))}
  </div>
</>)}

{/* ── WEEKLY REVIEW MODAL ── */}
{showWeeklyReview&&(
  <div className="ov" onClick={e=>e.target===e.currentTarget&&setShowWeeklyReview(false)}>
    <div className="md">
      <div className="mdt">Weekly Review 🗓</div>
      <span className="wr-badge">Sunday Check-In</span>
      <div className="wr-body">
        <div>
          <div className="wr-q">What went well this week?</div>
          <textarea className="wr-inp" value={wrWent} onChange={e=>setWrWent(e.target.value)}
            placeholder="Wins, progress made, things that clicked..."/>
        </div>
        <div>
          <div className="wr-q">What could have gone better?</div>
          <textarea className="wr-inp" value={wrImprove} onChange={e=>setWrImprove(e.target.value)}
            placeholder="Blockers, distractions, things to improve..."/>
        </div>
        <div>
          <div className="wr-q">3 priorities for next week</div>
          <textarea className="wr-inp" value={wrPriorities} onChange={e=>setWrPriorities(e.target.value)}
            placeholder="1. ...
2. ...
3. ..."/>
        </div>
      </div>
      <div className="ma">
        <button className="btn bg" onClick={()=>setShowWeeklyReview(false)}>Skip</button>
        <button className="btn bp" onClick={()=>{
          const today=new Date().toISOString().split("T")[0];
          const summary=`Week review — Went well: ${wrWent||"—"} | Improve: ${wrImprove||"—"} | Next week: ${wrPriorities||"—"}`;
          setCkins(c=>[{date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),mood:"📋",summary},...c]);
          setWrDone(today);
          setShowWeeklyReview(false);setWrWent("");setWrImprove("");setWrPriorities("");
        }}>Save Review</button>
      </div>
    </div>
  </div>
)}

{/* ── GLOBAL SEARCH MODAL ── */}
{showSearch&&(
  <div className="srch-wrap" onClick={e=>e.target===e.currentTarget&&setShowSearch(false)}>
    <div className="srch-box">
      <div className="srch-inp-row">
        <span className="srch-icon">🔍</span>
        <input
          autoFocus
          className="srch-inp"
          placeholder="Search goals, problems, notes, companies..."
          value={searchQ}
          onChange={e=>{setSearchQ(e.target.value);setSearchIdx(0);}}
        />
        <span className="srch-kbd">ESC</span>
      </div>
      <div className="srch-results">
        {searchQ.trim().length===0&&(
          <div className="srch-empty">
            Start typing to search across all your data
          </div>
        )}
        {searchQ.trim().length>0&&searchResults.length===0&&(
          <div className="srch-empty">No results for "{searchQ}"</div>
        )}
        {searchResults.length>0&&(()=>{
          // Group results by badge
          const groups={};
          searchResults.forEach((r,i)=>{
            if(!groups[r.badge])groups[r.badge]=[];
            groups[r.badge].push({...r,_idx:i});
          });
          return Object.entries(groups).map(([badge,items])=>(
            <div key={badge}>
              <div className="srch-group-label">{badge}s</div>
              {items.map(r=>(
                <div
                  key={r._idx}
                  className={`srch-item${searchIdx===r._idx?" active":""}`}
                  onMouseEnter={()=>setSearchIdx(r._idx)}
                  onClick={()=>{setTab(r.tab);setShowSearch(false);setSearchQ("");}}
                >
                  <span className="srch-item-icon">{r.icon}</span>
                  <div className="srch-item-main">
                    <div className="srch-item-title">{r.title}</div>
                    {r.sub&&<div className="srch-item-sub">{r.sub}</div>}
                  </div>
                  <span className="srch-item-badge">{r.badge}</span>
                </div>
              ))}
            </div>
          ));
        })()}
      </div>
      <div className="srch-footer">
        <span className="srch-hint"><kbd>↑↓</kbd> navigate</span>
        <span className="srch-hint"><kbd>↵</kbd> open</span>
        <span className="srch-hint"><kbd>ESC</kbd> close</span>
      </div>
    </div>
  </div>
)}

{/* ── KEYBOARD SHORTCUTS OVERLAY ── */}
{showShortcuts&&(
  <div className="sc-wrap" onClick={e=>e.target===e.currentTarget&&setShowShortcuts(false)}>
    <div className="sc-box">
      <div className="sc-title">Keyboard Shortcuts</div>
      <div className="sc-grid">
        {[
          ["⌘K","Open search"],
          ["?","This overlay"],
          ["H","Home"],
          ["G","Goals"],
          ["T","Today"],
          ["W","Week"],
          ["M","Month"],
          ["P","Projects"],
          ["D","DSA"],
          ["A","Academics"],
          ["S","Skills"],
          ["N","Notes"],
          ["ESC","Close any overlay"],
        ].map(([k,d])=>(
          <div key={k} className="sc-row">
            <span className="sc-key">{k}</span>
            <span className="sc-desc">{d}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:20,textAlign:"right"}}>
        <button className="btn bg" onClick={()=>setShowShortcuts(false)}>Close</button>
      </div>
    </div>
  </div>
)}

          </div>{/* .con */}
        </div>{/* .main */}
      </div>{/* .app */}
    </>
  );
}