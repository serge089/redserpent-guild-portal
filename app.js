var SUPABASE_URL = "https://ynhovpyzuwrgguwzvn.supabase.co";
var SUPABASE_KEY = "sb_publishable_d25qc3Bm1X1CHQmBzem5RA_3qkuhxD9";

var supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

function updateServerTime(){
  const el=document.getElementById('serverTime');
  if(!el)return;
  const now=new Date();
  el.textContent=now.toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit',hour12:true});
}
updateServerTime();
setInterval(updateServerTime,1000);

window.addEventListener("load",()=>{
  loadStoredMembers();
  mergeBulkRoster();
  restoreSession();
  const l=document.getElementById("loader");
  if(l){
    const fill=document.getElementById("loaderProgressFill"), pct=document.getElementById("loaderProgressText"), status=document.getElementById("loaderProgressStatus");
    const start=performance.now(), duration=3200;
    const tick=(now)=>{
      const progress=Math.min(100,Math.round(((now-start)/duration)*100));
      if(fill)fill.style.width=progress+"%";
      if(pct)pct.textContent=progress+"%";
      if(status)status.textContent=progress<35?"INITIALIZING...":progress<75?"LOADING MEMBER PORTAL...":"READY";
      if(progress<100)requestAnimationFrame(tick);
      else setTimeout(()=>l.classList.add("hide"),180);
    };
    requestAnimationFrame(tick);
  }
  updateRosterJobFilter();
  renderRoster();
  renderAdmin();
  renderPartySetup();
});
const players=[
{ign:"Shir0",role:"Carry",job:"Summoner",hp:158400,patk:42820,matk:0,basePdef:6830,baseMdef:5210,healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:0,mdmg:0,ignorePdef:4282,ignoreMdef:0,pvpReduction:0,pvpBonus:4800,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0},
{ign:"Puff",role:"Carry",job:"Lord Knight",hp:0,patk:11188,matk:5577,basePdef:5120,baseMdef:1579,healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:178.44,mdmg:90.2,ignorePdef:4100,ignoreMdef:0,pvpReduction:0,pvpBonus:3250,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0},
{ign:"Graydale",role:"Carry",job:"Summoner",hp:0,patk:10400,matk:6389,basePdef:4210,baseMdef:1450,healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:184.46,mdmg:95.81,ignorePdef:3500,ignoreMdef:0,pvpReduction:0,pvpBonus:3462,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0},
{ign:"Blanche",role:"Carry",job:"High Wizard",hp:0,patk:0,matk:11093,basePdef:4166,baseMdef:1419,healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:0,mdmg:171.25,ignorePdef:0,ignoreMdef:0,pvpReduction:0,pvpBonus:3175,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0},
{ign:"Aeri",role:"Support",job:"High Priest",hp:0,patk:4754,matk:9251,basePdef:5214,baseMdef:1675,healingDone:26,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:50.75,mdmg:208.96,ignorePdef:1450,ignoreMdef:0,pvpReduction:0,pvpBonus:2984,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0}];
const BULK_ROSTER_IMPORT = [{"ign":"Aedel","uid":"411088"},{"ign":"Alph","uid":"361476"},{"ign":"Ainu","uid":"200075"},{"ign":"AtongAng","uid":"232414"},{"ign":"Balagbag","uid":"198299"},{"ign":"ChadRicH","uid":"432662"},{"ign":"CoolPal","uid":"278163"},{"ign":"Crackkk","uid":"182939"},{"ign":"DarKSysTeM","uid":"389368"},{"ign":"HaplosBulacan","uid":"224784"},{"ign":"Fel29","uid":"926713"},{"ign":"Frenchie","uid":"1149002"},{"ign":"Hashira","uid":"207091"},{"ign":"cake","uid":"324403"},{"ign":"Indra","uid":"926724"},{"ign":"Ipis","uid":"838531"},{"ign":"JENG2","uid":"368864"},{"ign":"KepyasMalagkit","uid":"207079"},{"ign":"KingAel","uid":"264546"},{"ign":"GreyMamba","uid":"220918"},{"ign":"Lowlens","uid":"182932"},{"ign":"Lucien","uid":"195027"},{"ign":"Kronos","uid":"234889"},{"ign":"MrFk","uid":"401105"},{"ign":"Monti","uid":"203680"},{"ign":"Niffin","uid":"209767"},{"ign":"K9Tooth","uid":"200085"},{"ign":"PAPAGIBS","uid":"229341"},{"ign":"Quasi","uid":"215600"},{"ign":"Saake","uid":"339821"},{"ign":"Shinra","uid":"195296"},{"ign":"ShutDown","uid":"287336"},{"ign":"Skyee","uid":"251002"},{"ign":"Souma","uid":"430180"},{"ign":"Sunshineee","uid":"324414"},{"ign":"Syntheesia","uid":"226841"},{"ign":"Tanchoko","uid":"472851"},{"ign":"TashaStar","uid":"278071"},{"ign":"Timeless","uid":"203523"},{"ign":"Ukwi","uid":"203596"},{"ign":"UncleWise","uid":"301635"},{"ign":"Warrock","uid":"353142"},{"ign":"Whìs","uid":"238699"},{"ign":"Xephiroth","uid":"245942"},{"ign":"xpodx","uid":"220780"},{"ign":"Xynn","uid":"278026"},{"ign":"Yowaii","uid":"845249"},{"ign":"ZEGA","uid":"182847"},{"ign":"Akiiiii","uid":"278168"},{"ign":"Arcturus","uid":"389316"},{"ign":"Azariah","uid":"838916"},{"ign":"ItsMeBengBeng","uid":"192012"},{"ign":"ɓσҡ","uid":"956135"},{"ign":"BOYY","uid":"346150"},{"ign":"DEOZAI","uid":"192341"},{"ign":"djtianX","uid":"389252"},{"ign":"DongHae","uid":"339574"},{"ign":"DRiiCH","uid":"331624"},{"ign":"EdEd","uid":"382463"},{"ign":"Eiv015","uid":"415344"},{"ign":"Eurasia","uid":"207312"},{"ign":"Fanuc","uid":"238657"},{"ign":"IAmStick","uid":"278252"},{"ign":"iZeref","uid":"258747"},{"ign":"Karnas","uid":"632493"},{"ign":"Khaz","uid":"264862"},{"ign":"Khenol0gz","uid":"405879"},{"ign":"Kitsune","uid":"218199"},{"ign":"Luaaaaan","uid":"287243"},{"ign":"Neir","uid":"189761"},{"ign":"Prettyana","uid":"1030958"},{"ign":"Robynn","uid":"317707"},{"ign":"SaeWaru","uid":"430294"},{"ign":"Sunburn","uid":"182999"},{"ign":"Wafello","uid":"411111"},{"ign":"xFaith","uid":"220859"},{"ign":"xGray","uid":"198222"},{"ign":"XyborX","uid":"238606"}];

function mergeBulkRoster(){
  let changed=false;
  const byIgn=new Map(players.map(p=>[String(p.ign||'').trim().toLowerCase(),p]));
  BULK_ROSTER_IMPORT.forEach(u=>{
    const key=u.ign.toLowerCase();
    const existing=byIgn.get(key);
    if(existing){
      if(String(existing.uid||'').trim()!==u.uid){
        existing.uid=u.uid; changed=true;
      }
      if(!existing.status){existing.status='Active';changed=true;}
      if(!existing.accountType){existing.accountType='Member';changed=true;}
    }else{
      players.push({
        ign:u.ign, uid:u.uid, role:'Carry', job:'',
        status:'Active', accountType:'Member',
        memberSince:new Date().toISOString().slice(0,10),
        weeklySnapshots:[],
        hp:0,patk:0,matk:0,basePdef:0,baseMdef:0,
        healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,
        pdmgReduction:0,mdmgReduction:0,pdmg:0,mdmg:0,
        ignorePdef:0,ignoreMdef:0,pvpReduction:0,pvpBonus:0,
        equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,
        demiDmg:0,demiReduction:0
      });
      byIgn.set(key,players[players.length-1]);
      changed=true;
    }
  });
  ensureUniqueMemberIds();
  if(changed) persistMembers();
  return changed;
}


function calcRawDefense(baseValue, equipmentPercent){
 const base=Number(baseValue)||0;
 const pct=Number(equipmentPercent)||0;
 return pct ? base/(1+pct/100) : base;
}

function dashboardStats(){
 const cards=[...document.querySelectorAll('#dashboard .stat-card')];
 const get=(label)=>{const c=cards.find(x=>x.dataset.stat===label)||cards.find(x=>(x.querySelector('label')?.textContent||'').trim()===label);return c?.querySelector('input')?.value ?? '0';};
 return {hp:get('HP'),patk:get('PATK'),matk:get('MATK'),basePdef:get('BASE PDEF'),baseMdef:get('BASE MDEF'),healingDone:get('HEALING DONE %'),healingTaken:get('HEALING TAKEN %'),critRes:get('CRIT RES'),critDmgRes:get('CRIT DMG RES %'),cri:get('CRI'),pdmgReduction:get('PDMG REDUCTION %'),mdmgReduction:get('MDMG REDUCTION %'),pdmg:get('PDMG %'),mdmg:get('MDMG %'),ignorePdef:get('IGNORE PDEF'),ignoreMdef:get('IGNORE MDEF'),pvpReduction:get('PVP DMG REDUCTION'),pvpBonus:get('PVP DMG BONUS'),equipPdef:get('EQUIPMENT PDEF %'),equipMdef:get('EQUIPMENT MDEF %'),mediumDmg:get('DMG VS MEDIUM %'),mediumReduction:get('DMG REDUCTION VS MEDIUM %'),demiDmg:get('DMG VS DEMI-HUMAN %'),demiReduction:get('DMG REDUCTION VS DEMI-HUMAN %')};
}
function setDashboardField(label, value){
 const cards=[...document.querySelectorAll('#dashboard .stat-card')];
 const c=cards.find(x=>x.dataset.stat===label)||cards.find(x=>(x.querySelector('label')?.textContent||'').trim()===label);
 if(c && c.querySelector('input')) c.querySelector('input').value=value ?? 0;
}
function formatStatsUpdated(value){
 if(!value)return 'Last Updated: —';
 const d=new Date(value);
 if(Number.isNaN(d.getTime()))return 'Last Updated: —';
 return `Last Updated: ${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
}
function syncCharacterStatDisplays(){
 const panel=document.querySelector('.character-stats-panel'); if(!panel)return;
 const cards=[...panel.querySelectorAll('.character-stat-card')];
 const values={};
 cards.forEach(c=>{const input=c.querySelector('input');if(!input)return;values[c.dataset.stat]=Number(input.value)||0;});
 const basePdef=values['BASE PDEF']||0, baseMdef=values['BASE MDEF']||0;
 const equipPdef=Number(dashboardValue('EQUIPMENT PDEF %'))||0, equipMdef=Number(dashboardValue('EQUIPMENT MDEF %'))||0;
 const rawPdef=calcRawDefense(basePdef,equipPdef), rawMdef=calcRawDefense(baseMdef,equipMdef);
 cards.forEach(c=>{
   const key=c.dataset.stat,display=c.querySelector('.stat-display'),change=c.querySelector('.stat-change');
   if(!display)return;
   let v=values[key]??0;
   if(key==='BASE PDEF')v=rawPdef;
   if(key==='BASE MDEF')v=rawMdef;
   display.textContent=Number(v).toLocaleString(undefined,{maximumFractionDigits:2});
   if(change)change.textContent='↑ +0';
 });
 const bp=document.getElementById('dashBasePdef'), ep=document.getElementById('dashEquipPdef');
 const bm=document.getElementById('dashBaseMdef'), em=document.getElementById('dashEquipMdef');
 if(bp)bp.textContent=basePdef.toLocaleString(undefined,{maximumFractionDigits:2});
 if(ep)ep.textContent=equipPdef.toLocaleString(undefined,{maximumFractionDigits:2})+'%';
 if(bm)bm.textContent=baseMdef.toLocaleString(undefined,{maximumFractionDigits:2});
 if(em)em.textContent=equipMdef.toLocaleString(undefined,{maximumFractionDigits:2})+'%';
}
function dashboardValue(label){
 const c=[...document.querySelectorAll('#dashboard .stat-card')].find(x=>(x.querySelector('label')?.textContent||'').trim()===label);
 return c?.querySelector('input')?.value ?? '0';
}
function toggleCharacterEdit(){
 const panel=document.querySelector('.character-stats-panel'), btn=document.getElementById('saveStatsBtn'); if(!panel||!btn)return;
 const editing=panel.classList.toggle('editing');
 btn.textContent=editing?'Save Changes':(statsDirty?'Save Changes *':'Update Stats');
 btn.classList.toggle('dirty',editing&&statsDirty);
 if(!editing)syncCharacterStatDisplays();
}
const MEMBER_STATS_KEY='redserpentMemberStatsV2';
const MEMBER_STAT_FIELDS=['hp','patk','matk','basePdef','baseMdef','healingDone','healingTaken','critRes','critDmgRes','cri','pdmgReduction','mdmgReduction','pdmg','mdmg','ignorePdef','ignoreMdef','pvpReduction','pvpBonus','equipPdef','equipMdef','mediumDmg','mediumReduction','demiDmg','demiReduction'];
function memberDataKey(p){
 // Character Stats are keyed by the actual login identity, not by a generated
 // member ID. Login requires BOTH UID and IGN, so this remains isolated even
 // if legacy/generated IDs are duplicated or repaired later.
 const uid=String(p?.uid||'').trim().toLowerCase();
 const ign=String(p?.ign||'').trim().toLowerCase();
 if(uid || ign) return `account:${uid}::${ign}`;
 const id=String(p?.id||'').trim();
 return id ? `member:${id}` : 'member:unknown';
}
function legacyMemberDataKeys(p){
 const keys=[];
 const id=String(p?.id||'').trim();
 const uid=String(p?.uid||'').trim().toLowerCase();
 const ign=String(p?.ign||'').trim().toLowerCase();
 if(id) keys.push(`member:${id}`);
 if(uid || ign) keys.push(`member:${uid}::${ign}`);
 if(uid && ign) keys.push(`${uid}::${ign}`);
 return [...new Set(keys)];
}
function readMemberStatsStore(){
 try{const raw=localStorage.getItem(MEMBER_STATS_KEY);const obj=raw?JSON.parse(raw):{};return obj&&typeof obj==='object'&&!Array.isArray(obj)?obj:{};}catch(e){return {};}
}
function writeMemberStatsStore(store){
 try{localStorage.setItem(MEMBER_STATS_KEY,JSON.stringify(store));return true;}catch(e){console.warn('Member stats store save failed.',e);return false;}
}
function captureMemberStats(p){
 const out={}; MEMBER_STAT_FIELDS.forEach(k=>out[k]=Number(p?.[k])||0);
 out.role=(String(p?.role||'Carry').toLowerCase()==='dps'?'Carry':p?.role)||'Carry'; out.job=p?.job||''; out.lastStatsUpdate=p?.lastStatsUpdate||null; out.statsRevision=Number(p?.statsRevision)||0;
 out.initialStatsSubmitted=!!p?.initialStatsSubmitted; out.initialStatsSubmittedAt=p?.initialStatsSubmittedAt||null;
 return out;
}
function saveMemberStatsSnapshot(p){
 if(!p)return false;
 const store=readMemberStatsStore();
 store[memberDataKey(p)]=captureMemberStats(p);
 return writeMemberStatsStore(store);
}
function applyMemberStatsSnapshot(p){
 if(!p)return p;
 const store=readMemberStatsStore();
 let snap=store[memberDataKey(p)];
 let migratedFrom=null;
 if(!snap){
   for(const key of legacyMemberDataKeys(p)){
     if(store[key]){
       snap=store[key];
       migratedFrom=key;
       break;
     }
   }
 }
 if(!snap)return p;
 MEMBER_STAT_FIELDS.forEach(k=>{if(Object.prototype.hasOwnProperty.call(snap,k))p[k]=Number(snap[k])||0;});
 if(snap.role)p.role=String(snap.role).toLowerCase()==='dps'?'Carry':snap.role; if(snap.job)p.job=snap.job;
 if(snap.lastStatsUpdate)p.lastStatsUpdate=snap.lastStatsUpdate; if(snap.statsRevision)p.statsRevision=snap.statsRevision;
 if(snap.initialStatsSubmitted)p.initialStatsSubmitted=true; if(snap.initialStatsSubmittedAt)p.initialStatsSubmittedAt=snap.initialStatsSubmittedAt;
 // One-time migration from V2/V9 keys to the identity-based key.
 if(migratedFrom && !store[memberDataKey(p)]){
   store[memberDataKey(p)]={...snap};
   try{writeMemberStatsStore(store);}catch(e){}
 }
 return p;
}
function clearLegacyMemberStatCollision(p){
 // No shared stat object is used. This helper intentionally does not delete old data;
 // per-member V2 snapshots take precedence when they exist.
 return p;
}

function loadDashboardFromPlayer(p){
 if(!p) return;
 applyMemberStatsSnapshot(p);
 currentPlayer=p;
 currentPlayerId=String(p.id||""); currentPlayerUid=String(p.uid||""); currentPlayerIgn=String(p.ign||"");
 // Always populate every dashboard field from the selected account; never retain the previous user.
 const dash=document.getElementById("dashboard");
 if(dash){
   // Clear editable numeric fields before applying the selected member snapshot.
   // This guarantees a logout/login transition cannot display the previous member's values.
   dash.querySelectorAll("input").forEach(i=>{
     if(i.type==='number' || i.closest(".stats-editor-extra")) i.value="0";
   });
 }
 const welcomeName=document.getElementById('welcomeName');
 if(welcomeName) welcomeName.textContent=p.ign||'';
 const memberName=document.getElementById('memberName');
 if(memberName) memberName.textContent=p.ign||'';
 const hn=document.getElementById('headerMemberName'); if(hn)hn.textContent=p.ign||'';
 const hr=document.getElementById('headerRoleBadge'); if(hr)hr.textContent='◆ Guild Member';
 const ha=document.getElementById('headerAvatar'); if(ha)ha.textContent=(p.ign||'S').charAt(0).toUpperCase();
 const memberMini=document.querySelector('.member-mini small');
 if(memberMini) memberMini.textContent='Member';
const dashId = document.getElementById('dashId');
if (dashId) dashId.textContent = p.uid || '—';
 const updated=document.getElementById('lastStatsUpdated'); if(updated)updated.textContent=formatStatsUpdated(p.lastStatsUpdate);
 const roleSelect=document.getElementById('roleSelect');
 if(roleSelect)roleSelect.value=p.role||'Carry';
 updateDashboardJobOptions(p.role||'Carry', p.job||'Summoner');
 const labels={HP:'hp',PATK:'patk',MATK:'matk','BASE PDEF':'basePdef','BASE MDEF':'baseMdef','HEALING DONE %':'healingDone','HEALING TAKEN %':'healingTaken','CRIT RES':'critRes','CRIT DMG RES %':'critDmgRes','CRI':'cri','PDMG REDUCTION %':'pdmgReduction','MDMG REDUCTION %':'mdmgReduction','PDMG %':'pdmg','MDMG %':'mdmg','IGNORE PDEF':'ignorePdef','IGNORE MDEF':'ignoreMdef','PVP DMG REDUCTION':'pvpReduction','PVP DMG BONUS':'pvpBonus','EQUIPMENT PDEF %':'equipPdef','EQUIPMENT MDEF %':'equipMdef','DMG VS MEDIUM %':'mediumDmg','DMG REDUCTION VS MEDIUM %':'mediumReduction','DMG VS DEMI-HUMAN %':'demiDmg','DMG REDUCTION VS DEMI-HUMAN %':'demiReduction'};
 Object.entries(labels).forEach(([label,key])=>setDashboardField(label,p[key] ?? 0));
 try{ syncCharacterStatDisplays(); }catch(e){ console.error('Character display sync failed:',e); }
 try{ renderDashboardProgression(); }catch(e){ console.error('Dashboard progression render failed:',e); }
 const panel=document.querySelector('.character-stats-panel'); if(panel)panel.classList.remove('editing');
 statsDirty=false; setSaveState();
}
function updateDashboardJobOptions(role, selected){
 const sel=document.getElementById('jobSelect'); if(!sel)return;
 const jobs=role==='Carry'?DPS_JOBS:role==='Support'?SUPPORT_JOBS:ALL_JOBS;
 sel.innerHTML=jobs.map(j=>`<option>${j}</option>`).join('');
 sel.value=jobs.includes(selected)?selected:jobs[0];
}
function dashboardStats(){
 const cards=[...document.querySelectorAll('#dashboard .stat-card')];
 const get=(label)=>{const c=cards.find(x=>x.dataset.stat===label)||cards.find(x=>(x.querySelector('label')?.textContent||'').trim()===label);return c?.querySelector('input')?.value ?? '0';};
 return {hp:get('HP'),patk:get('PATK'),matk:get('MATK'),basePdef:get('BASE PDEF'),baseMdef:get('BASE MDEF'),healingDone:get('HEALING DONE %'),healingTaken:get('HEALING TAKEN %'),critRes:get('CRIT RES'),critDmgRes:get('CRIT DMG RES %'),cri:get('CRI'),pdmgReduction:get('PDMG REDUCTION %'),mdmgReduction:get('MDMG REDUCTION %'),pdmg:get('PDMG %'),mdmg:get('MDMG %'),ignorePdef:get('IGNORE PDEF'),ignoreMdef:get('IGNORE MDEF'),pvpReduction:get('PVP DMG REDUCTION'),pvpBonus:get('PVP DMG BONUS'),equipPdef:get('EQUIPMENT PDEF %'),equipMdef:get('EQUIPMENT MDEF %'),mediumDmg:get('DMG VS MEDIUM %'),mediumReduction:get('DMG REDUCTION VS MEDIUM %'),demiDmg:get('DMG VS DEMI-HUMAN %'),demiReduction:get('DMG REDUCTION VS DEMI-HUMAN %')};
}
function setSaveState(){
 const b=document.getElementById('saveStatsBtn'); if(!b)return;
 const editing=document.querySelector('.character-stats-panel')?.classList.contains('editing');
 b.textContent=editing?(statsDirty?'Save Changes *':'Save Changes'):'Update Stats';
 b.classList.toggle('dirty',editing&&statsDirty);
}
function markStatsDirty(){statsDirty=true;setSaveState();}
function progressAvg(sub){
 const vals=ASTROCORE_NAMES.map(n=>Number(sub?.levels?.[n]||0)).filter(v=>v>0);
 return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;
}
function enchantAvg(sub){
 const vals=(Array.isArray(sub?.items)?sub.items:[]).map(x=>Number(x.level)||0).filter(v=>v>0);
 return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;
}
function medalAvg(sub){
 const vals=MEDAL_NAMES.map(n=>Number(sub?.levels?.[n])).filter(v=>Number.isFinite(v));
 return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;
}
function progressDelta(current, previous){
 if(current==null||previous==null)return null;
 return current-previous;
}
function progressDeltaHtml(delta, previousWeek){
 if(delta==null||!previousWeek)return '';
 const up=delta>=0;
 return `<small class="progress-delta ${up?'up':'down'}">${up?'↑ +':'↓ −'}${fmt(Math.abs(delta))} vs Week ${previousWeek}</small>`;
}
function dashboardProgressCell(value, delta, week, type, previousWeek){
 if(value==null)return `<div class="progression-cell progress-empty">—</div>`;
 const display=type==='astrocore'||type==='enchant'?Number(value).toFixed(1):fmt(value);
 return `<div class="progression-cell progress-data" role="button" tabindex="0" onclick="event.stopPropagation();openWeeklyProgressionHistory(${week})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();openWeeklyProgressionHistory(${week})}"><strong>${display}${type==='astrocore'||type==='enchant'?' <span class="avg-label">AVG</span>':''}</strong>${progressDeltaHtml(delta,previousWeek)}</div>`;
}
function renderDashboardProgression(){
 const host=document.getElementById('dashboardProgression'); if(!host)return;
 const p=players.find(x=>String(x.id||'')===currentPlayerId); if(!p){host.innerHTML='';return;}
 const current=seasonWeekInfo(), maxWeek=TEST_SUBMISSION_MODE?5:Math.max(1,current.week||1), weeks=[];
 for(let i=1;i<=5;i++){
   const start=new Date(SEASON_START); start.setDate(start.getDate()+(i-1)*7); const end=new Date(start); end.setDate(end.getDate()+6);
   const key=`S${i}`, snap=getWeekSnapshot(p,key), subs=getWeeklyProgressionSubmissions(p,key);
   weeks.push({week:i,start,end,snap,astro:subs.astrocore||null,enchant:subs.enchant||null,medal:subs.medal||null,available:i<=maxWeek});
 }
 const rows=[['Total Feather Count','feather'],['Astrocore Count','astrocore'],['Total Enchant','enchant'],['Medal Levels','medal']];
 let html='<div class="progression-grid"><div class="progression-cell head">PROGRESSION</div>';
 weeks.forEach(w=>{html+=`<div class="progression-cell head ${w.week===current.week?'current':''}"><strong>Week ${w.week}</strong><small>${w.start.toLocaleDateString(undefined,{month:'short',day:'numeric'})} – ${w.end.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</small></div>`;});
 rows.forEach(([label,type])=>{
   html+=`<div class="progression-cell label">${label}</div>`;
   weeks.forEach((w)=>{
     let value=null;
     if(type==='feather') value=w.snap?.totalFeatherCount!=null?Number(w.snap.totalFeatherCount):null;
     if(type==='astrocore') value=progressAvg(w.astro);
     if(type==='enchant') value=enchantAvg(w.enchant);
     if(type==='medal') value=medalAvg(w.medal);
     const prev=weeks.find(x=>x.week===w.week-1);
     let prevValue=null;
     if(prev){
       if(type==='feather')prevValue=prev.snap?.totalFeatherCount!=null?Number(prev.snap.totalFeatherCount):null;
       if(type==='astrocore')prevValue=progressAvg(prev.astro);
       if(type==='enchant')prevValue=enchantAvg(prev.enchant);
       if(type==='medal')prevValue=medalAvg(prev.medal);
     }
     html+=dashboardProgressCell(value,progressDelta(value,prevValue),w.week,type,prevValue!=null?w.week-1:null);
   });
 });
 html+='</div>';
 host.innerHTML=html;
}

const SEASON_START=new Date(2026,8,27,0,0,0,0); // September 27, 2026 — Week 1
const TEST_SUBMISSION_MODE=false;
let selectedSubmissionWeek=null;
function getSelectedSubmissionInfo(){
 const current=seasonWeekInfo();
 const week=Number(selectedSubmissionWeek)||Math.max(1,current.week||1);
 return weeklyHistoryWeekInfo(week);
}
function setSubmissionTestWeek(week){
 selectedSubmissionWeek=Number(week)||1;
 renderMemberWeekly();
}
function seasonWeekInfo(date=new Date()){
 const d=new Date(date); d.setHours(0,0,0,0);
 const start=new Date(SEASON_START); start.setHours(0,0,0,0);
 if(d<start)return {week:0,key:'PRE-SEASON',year:2026,start,end:new Date(start.getTime()-86400000)};
 const diff=Math.floor((d-start)/86400000), week=Math.floor(diff/7)+1;
 const ws=new Date(start); ws.setDate(ws.getDate()+(week-1)*7);
 const we=new Date(ws); we.setDate(we.getDate()+6); we.setHours(23,59,59,999);
 return {week,key:`S${week}`,year:ws.getFullYear(),start:ws,end:we};
}
function formatWeekRange(info){const opts={month:'long',day:'numeric',year:'numeric'};return `${info.start.toLocaleDateString(undefined,opts)} – ${info.end.toLocaleDateString(undefined,opts)}`;}
function isoWeekInfo(date=new Date()){return seasonWeekInfo(date);}
function isWeeklySubmissionWindow(date=new Date()){
 const d=new Date(date), info=seasonWeekInfo(d);
 // Weekly submissions are open for the entire Monday–Sunday week.
 // The window closes exactly at 12:00 AM when the next Monday begins.
 return info.week>0 && d>=info.start && d<=info.end;
}
function currentStatsSnapshot(p){
 const keys=['hp','patk','matk','basePdef','baseMdef','healingDone','healingTaken','critRes','critDmgRes','cri','pdmgReduction','mdmgReduction','pdmg','mdmg','ignorePdef','ignoreMdef','pvpReduction','pvpBonus','equipPdef','equipMdef','mediumDmg','mediumReduction','demiDmg','demiReduction'];
 const out={}; keys.forEach(k=>out[k]=Number(p[k])||0); out.rawPdef=calcRawDefense(p.basePdef,p.equipPdef); out.rawMdef=calcRawDefense(p.baseMdef,p.equipMdef); out.role=p.role; out.job=p.job; out.savedAt=new Date().toISOString(); return out;
}
function getWeekSnapshot(p,weekKey){return (p.weeklySnapshots||[]).find(s=>s.weekKey===weekKey);}
function getCurrentWeekSnapshot(p){const info=seasonWeekInfo();return getWeekSnapshot(p,info.key);}
function getWeeklyProgressionSubmissions(p,weekKey){
 if(!p.weeklyProgressionSubmissions||typeof p.weeklyProgressionSubmissions!=='object')p.weeklyProgressionSubmissions={};
 if(!p.weeklyProgressionSubmissions[weekKey])p.weeklyProgressionSubmissions[weekKey]={};
 return p.weeklyProgressionSubmissions[weekKey];
}
function getWeeklyProgressionSubmission(p,weekKey,type){return p?.weeklyProgressionSubmissions?.[weekKey]?.[type]||null;}
function recordWeeklySnapshot(p,info=seasonWeekInfo(),progression=null){
 if(info.week<1)return false;
 if(!Array.isArray(p.weeklySnapshots))p.weeklySnapshots=[];
 if(p.weeklySnapshots.some(s=>s.weekKey===info.key))return false;
 const snap=progression?{...progression}:{...currentStatsSnapshot(p)};
 snap.weekKey=info.key;snap.week=info.week;snap.year=info.year;snap.weekStart=info.start.toISOString();snap.weekEnd=info.end.toISOString();snap.savedAt=new Date().toISOString();
 p.weeklySnapshots.push(snap);p.lastWeeklySubmission=snap.savedAt;return true;
}
let weeklyHistoryWeek=null;
let weeklyHistoryType='feather';
function weeklyHistoryWeekInfo(week){
 const start=new Date(SEASON_START);start.setDate(start.getDate()+(Number(week)-1)*7);start.setHours(0,0,0,0);
 const end=new Date(start);end.setDate(end.getDate()+6);end.setHours(23,59,59,999);
 return {week:Number(week),key:`S${Number(week)}`,year:start.getFullYear(),start,end};
}
function openWeeklyProgressionHistory(week){
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;
 if(adminMode){alert('Weekly Progression history is available from a member account.');return;}
 const info=seasonWeekInfo(); weeklyHistoryWeek=Number(week)||weeklyHistoryWeek||Math.max(1,info.week); weeklyHistoryType='overview';
 document.getElementById('weeklyProgressionHistoryModal')?.classList.remove('hidden'); renderWeeklyHistory();
}
function closeWeeklyProgressionHistory(){document.getElementById('weeklyProgressionHistoryModal')?.classList.add('hidden');}
function selectWeeklyHistoryWeek(week){weeklyHistoryWeek=Number(week);renderWeeklyHistory();}
function historyChange(current,previous){return current!=null&&previous!=null?current-previous:null;}
function changeMarkup(delta,prevWeek){if(delta==null)return '<span class="history-no-change">—</span>';return `<span class="history-change ${delta>=0?'up':'down'}">${delta>=0?'↑ +':'↓ −'}${fmt(Math.abs(delta))} vs Week ${prevWeek}</span>`;}
function renderWeeklyHistory(){
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;
 const current=seasonWeekInfo(),maxWeek=TEST_SUBMISSION_MODE?5:Math.max(1,current.week||1); if(!weeklyHistoryWeek||weeklyHistoryWeek<1)weeklyHistoryWeek=Math.max(1,current.week||1);
 const wi=weeklyHistoryWeekInfo(weeklyHistoryWeek),snap=getWeekSnapshot(p,wi.key),subs=getWeeklyProgressionSubmissions(p,wi.key),prev=weeklyHistoryWeek>1?weeklyHistoryWeekInfo(weeklyHistoryWeek-1):null,prevSnap=prev?getWeekSnapshot(p,prev.key):null,prevSubs=prev?getWeeklyProgressionSubmissions(p,prev.key):{};
 const tabs=document.getElementById('weeklyHistoryWeekTabs');
 if(tabs)tabs.innerHTML=Array.from({length:5},(_,i)=>{const w=i+1,info=weeklyHistoryWeekInfo(w),future=w>maxWeek;return `<button type="button" class="weekly-history-week ${weeklyHistoryWeek===w?'active':''} ${future?'future':''}" ${future?'disabled':''} onclick="selectWeeklyHistoryWeek(${w})"><strong>Week ${w}</strong><small>${info.start.toLocaleDateString(undefined,{month:'short',day:'numeric'})} – ${info.end.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</small></button>`;}).join('');
 const range=document.getElementById('weeklyHistoryRange');if(range)range.textContent=formatWeekRange(wi)+(weeklyHistoryWeek===current.week?' • Current Week':'');
 const badge=document.getElementById('weeklyHistoryMemberBadge');if(badge)badge.textContent=p.ign||'HISTORY';
 const typeTabs=document.getElementById('weeklyHistoryTypeTabs');if(typeTabs)typeTabs.style.display='none';
 const host=document.getElementById('weeklyHistoryContent');if(!host)return;
 const feather=snap?.totalFeatherCount!=null?Number(snap.totalFeatherCount):null, prevFeather=prevSnap?.totalFeatherCount!=null?Number(prevSnap.totalFeatherCount):null;
 const astro=progressAvg(subs.astrocore), prevAstro=progressAvg(prevSubs.astrocore);
 const ench=enchantAvg(subs.enchant), prevEnch=enchantAvg(prevSubs.enchant), medal=medalAvg(subs.medal), prevMedal=medalAvg(prevSubs.medal);
 const featherCats=snap?.categoryTotals||{};
 const featherSection=snap?`<section class="history-detail-section"><div class="history-section-title"><span>🪶</span><div><h3>Feather Progression</h3><small>${Array.isArray(snap.rows)?snap.rows.length:0}/10 rows submitted</small></div><div class="history-section-value"><strong>${fmt(feather)}</strong>${changeMarkup(historyChange(feather,prevFeather),weeklyHistoryWeek-1)}</div></div><div class="history-category-grid">${[['Time / Space','Time / Space'],['Divine / Nature','Divine / Nature'],['Day / Night','Day / Night'],['Sky / Terra','Sky / Terra'],['Light / Dark','Light / Dark']].map(([a,k])=>`<div><label>${a}</label><strong>${fmt(featherCats[k]||0)}</strong></div>`).join('')}</div></section>`:`<section class="history-detail-section empty"><div class="history-section-title"><span>🪶</span><div><h3>Feather Progression</h3><small>No Feather submission for Week ${weeklyHistoryWeek}.</small></div></div></section>`;
 const astroSection=subs.astrocore?`<section class="history-detail-section"><div class="history-section-title"><span>🔮</span><div><h3>Astrocore Progression</h3><small>6 Astrocores • average level</small></div><div class="history-section-value"><strong>${astro.toFixed(1)}</strong>${changeMarkup(historyChange(astro,prevAstro),weeklyHistoryWeek-1)}</div></div><div class="history-value-grid">${ASTROCORE_NAMES.map(n=>{const v=Number(subs.astrocore.levels?.[n]||0),pv=Number(prevSubs.astrocore?.levels?.[n]||0)||null;return `<div><label>${n}</label><strong>Lv. ${fmt(v)}</strong>${changeMarkup(historyChange(v,pv),weeklyHistoryWeek-1)}</div>`;}).join('')}</div></section>`:`<section class="history-detail-section empty"><div class="history-section-title"><span>🔮</span><div><h3>Astrocore Progression</h3><small>No Astrocore submission for Week ${weeklyHistoryWeek}.</small></div></div></section>`;
 const enchSection=subs.enchant?`<section class="history-detail-section"><div class="history-section-title"><span>✨</span><div><h3>Enchant Progression</h3><small>12 enchant entries • average level</small></div><div class="history-section-value"><strong>${ench.toFixed(1)}</strong>${changeMarkup(historyChange(ench,prevEnch),weeklyHistoryWeek-1)}</div></div><div class="history-enchant-grid">${(subs.enchant.items||[]).map((x,i)=>{const pv=Number(prevSubs.enchant?.items?.[i]?.level||0)||null;return `<div><label>${x.slot}</label><strong>Lv. ${fmt(x.level)}</strong><span>${x.effect||'—'}</span>${changeMarkup(historyChange(Number(x.level)||0,pv),weeklyHistoryWeek-1)}</div>`;}).join('')}</div></section>`:`<section class="history-detail-section empty"><div class="history-section-title"><span>✨</span><div><h3>Enchant Progression</h3><small>No Enchant submission for Week ${weeklyHistoryWeek}.</small></div></div></section>`;
 const medalSection=subs.medal?`<section class="history-detail-section"><div class="history-section-title"><span>🏅</span><div><h3>Medal Progression</h3><small>8 Medals • average level</small></div><div class="history-section-value"><strong>${medal.toFixed(1)}</strong>${changeMarkup(historyChange(medal,prevMedal),weeklyHistoryWeek-1)}</div></div><div class="history-value-grid">${MEDAL_NAMES.map(n=>{const v=Number(subs.medal.levels?.[n]||0),pv=Number(prevSubs.medal?.levels?.[n]||0)||null;return `<div><label>${n}</label><strong>Lv. ${fmt(v)}</strong>${changeMarkup(historyChange(v,pv),weeklyHistoryWeek-1)}</div>`;}).join('')}</div></section>`:`<section class="history-detail-section empty"><div class="history-section-title"><span>🏅</span><div><h3>Medal Progression</h3><small>No Medal submission for Week ${weeklyHistoryWeek}.</small></div></div></section>`;
 host.innerHTML=`<div class="history-overview">${featherSection}${astroSection}${enchSection}${medalSection}</div>`;
}
function renderWeeklyHistoryFeather(snap){
 if(!snap)return `<div class="weekly-history-empty"><span>🪶</span><b>No Feather submission for Week ${weeklyHistoryWeek}.</b><small>Once the weekly Feather screenshots are submitted and confirmed, the snapshot will appear here.</small></div>`;
 const cats=snap.categoryTotals||{},total=Number(snap.totalFeatherCount||0),p=players.find(x=>String(x.id||'')===currentPlayerId),prev=weeklyHistoryWeek>1?getWeekSnapshot(p,`S${weeklyHistoryWeek-1}`):null,change=prev?total-Number(prev.totalFeatherCount||0):null;
 const cards=[['TOTAL FEATHER',total],['TIME / SPACE',cats['Time / Space']||0],['DIVINE / NATURE',cats['Divine / Nature']||0],['DAY / NIGHT',cats['Day / Night']||0],['SKY / TERRA',cats['Sky / Terra']||0],['LIGHT / DARK',cats['Light / Dark']||0]];
 return `<div class="weekly-history-summary">${cards.map((c,i)=>`<div class="weekly-history-stat ${i===0?'featured':''}"><label>${c[0]}</label><strong>${fmt(c[1])}</strong>${i===0&&change!==null?`<small class="${change>=0?'up':'down'}">${change>=0?'↑ +':'↓ −'}${fmt(Math.abs(change))} vs Week ${weeklyHistoryWeek-1}</small>`:''}</div>`).join('')}</div><div class="weekly-history-panel"><div class="weekly-history-panel-head"><h3>Feather Details</h3><span>${Array.isArray(snap.rows)?snap.rows.length:0} / 10 rows</span></div><div class="weekly-feather-rows">${(snap.rows||[]).map(r=>`<div class="weekly-feather-row"><div><b>${r.side} Row ${r.row}</b><small>${(r.feathers||[]).map(f=>`${f.name} T${f.tier}`).join(' • ')||'No detected feathers'}</small></div><strong>${fmt((r.feathers||[]).reduce((sum,f)=>sum+(Number(f.featherTotal)||0),0))}</strong></div>`).join('')||'<div class="weekly-history-empty compact"><small>No row details saved.</small></div>'}</div></div>`;
}
function renderWeeklyHistoryAstro(sub){
 if(!sub)return `<div class="weekly-history-empty"><span>🔮</span><b>No Astrocore submission for Week ${weeklyHistoryWeek}.</b><small>Submit all 6 Astrocore levels during the weekly submission window.</small></div>`;
 const names=ASTROCORE_NAMES,levels=sub.levels||{},vals=names.map(n=>Number(levels[n]||0)).filter(Boolean),avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;
 return `<div class="weekly-history-summary"><div class="weekly-history-stat featured"><label>AVERAGE LEVEL</label><strong>${avg.toFixed(1)}</strong><small>${vals.length}/6 Astrocores recorded</small></div>${names.slice(0,4).map(n=>`<div class="weekly-history-stat"><label>${n.toUpperCase()}</label><strong>Lv. ${fmt(levels[n]||0)}</strong></div>`).join('')}</div><div class="weekly-history-panel"><div class="weekly-history-panel-head"><h3>Astrocore Levels</h3><span>Saved ${sub.savedAt?new Date(sub.savedAt).toLocaleDateString():''}</span></div><div class="weekly-astro-grid">${names.map(n=>`<div class="weekly-astro-history-card"><span>${n}</span><strong>Lv. ${fmt(levels[n]||0)}</strong></div>`).join('')}</div></div>`;
}
function renderWeeklyHistoryEnchant(sub){
 if(!sub)return `<div class="weekly-history-empty"><span>✨</span><b>No Enchant submission for Week ${weeklyHistoryWeek}.</b><small>Submit all 12 equipment enchant entries during the weekly submission window.</small></div>`;
 const items=Array.isArray(sub.items)?sub.items:[],vals=items.map(x=>Number(x.level)||0),avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;
 return `<div class="weekly-history-summary"><div class="weekly-history-stat featured"><label>AVERAGE ENCHANT LEVEL</label><strong>${avg.toFixed(1)}</strong><small>${items.length}/12 equipment entries recorded</small></div><div class="weekly-history-stat"><label>HIGHEST</label><strong>Lv. ${fmt(Math.max(...vals,0))}</strong></div><div class="weekly-history-stat"><label>LOWEST</label><strong>Lv. ${fmt(Math.min(...vals,0))}</strong></div></div><div class="weekly-history-panel"><div class="weekly-history-panel-head"><h3>Enchant Details</h3><span>Saved ${sub.savedAt?new Date(sub.savedAt).toLocaleDateString():''}</span></div><div class="weekly-enchant-history">${items.map(x=>`<div class="weekly-enchant-history-row"><b>${x.slot}</b><strong>Lv. ${fmt(x.level)}</strong><span>${x.effect||'—'}</span></div>`).join('')}</div></div>`;
}

function openWeeklyChoice(){
 if(adminMode){alert('Admin accounts do not submit weekly progression.');return;}
 const p=players.find(x=>String(x.id||'')===currentPlayerId);
 if(!p)return;
 document.getElementById('weeklyChoiceModal')?.classList.remove('hidden');
}
function closeWeeklyChoice(){document.getElementById('weeklyChoiceModal')?.classList.add('hidden');}
function selectWeeklySubmission(type){
 if(type==='feather'){ closeWeeklyChoice(); openWeeklyOcr(); return; }
 if(type==='astrocore'){ closeWeeklyChoice(); openWeeklyAstrocore(); return; }
 if(type==='enchant'){ closeWeeklyChoice(); openWeeklyEnchant(); return; }
 if(type==='medal'){ closeWeeklyChoice(); openWeeklyMedal(); return; }
}

const ASTROCORE_NAMES=['Lumia','Serpenta','Sagitta','Felina','Divinia','Alvara'];
function openWeeklyAstrocore(){
 if(adminMode){alert('Admin accounts do not submit weekly progression.');return;}
 const m=document.getElementById('weeklyAstrocoreModal');if(!m)return; m.classList.remove('hidden');resetWeeklyAstrocore();
}
function closeWeeklyAstrocore(){document.getElementById('weeklyAstrocoreModal')?.classList.add('hidden');}
function resetWeeklyAstrocore(){
 const p=players.find(x=>String(x.id||'')===currentPlayerId),info=getSelectedSubmissionInfo(),existing=getWeeklyProgressionSubmission(p||{},info.key,'astrocore');
 window.weeklyAstrocoreData={levels:{...(existing?.levels||{})}}; renderAstrocoreLevels(window.weeklyAstrocoreData.levels);
 const count=ASTROCORE_NAMES.filter(n=>Number.isInteger(Number(window.weeklyAstrocoreData.levels[n]))&&Number(window.weeklyAstrocoreData.levels[n])>=1&&Number(window.weeklyAstrocoreData.levels[n])<=30).length;
 const save=document.getElementById('astroSaveBtn');if(save)save.disabled=count!==6;
 const text=document.getElementById('astroConfirmText');if(text)text.textContent=count===6?'Update your levels if needed, then confirm to save.':`Enter all 6 Astrocore levels to continue. ${count}/6 entered.`;
}
function renderAstrocoreLevels(levels={}){
 const host=document.getElementById('astroLevelsGrid');if(!host)return;
 host.innerHTML=ASTROCORE_NAMES.map(name=>{const v=Number(levels[name]);const ok=Number.isFinite(v)&&v>=1&&v<=30;return `<label class="astro-level-card manual ${ok?'detected':''}"><div class="astro-name">${name}<small>Current level</small></div><div class="astro-input-wrap"><span>Lv.</span><input type="number" min="1" max="30" step="1" inputmode="numeric" value="${ok?v:''}" aria-label="${name} level" oninput="updateAstrocoreLevel('${name}',this.value)"></div></label>`;}).join('');
}
function updateAstrocoreLevel(name,value){
 const v=String(value).trim()===''?null:Number(value); if(!window.weeklyAstrocoreData)window.weeklyAstrocoreData={levels:{}};
 if(v===null)delete window.weeklyAstrocoreData.levels[name]; else if(Number.isInteger(v)&&v>=1&&v<=30)window.weeklyAstrocoreData.levels[name]=v; else delete window.weeklyAstrocoreData.levels[name];
 const levels=window.weeklyAstrocoreData.levels||{};const count=ASTROCORE_NAMES.filter(n=>Number.isInteger(levels[n])&&levels[n]>=1&&levels[n]<=30).length;
 const save=document.getElementById('astroSaveBtn');if(save)save.disabled=count!==6; const text=document.getElementById('astroConfirmText');if(text)text.textContent=count===6?'All 6 Astrocore levels entered. Confirm before saving.':`${count}/6 entered. Please complete all 6 Astrocores.`;
}
function confirmWeeklyAstrocore(){
 const levels=window.weeklyAstrocoreData?.levels||{};if(ASTROCORE_NAMES.some(n=>!Number.isInteger(levels[n])||levels[n]<1||levels[n]>30)){alert('Please enter a valid level from 1 to 30 for all 6 Astrocores.');return;}
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;const info=getSelectedSubmissionInfo();
 if(!TEST_SUBMISSION_MODE && !isWeeklySubmissionWindow()){alert(`Week ${info.week} is currently closed. Astrocore values are entered, but final submission is only available during that Monday–Sunday week.`);return;}
 const subs=getWeeklyProgressionSubmissions(p,info.key);subs.astrocore={levels:{...levels},savedAt:new Date().toISOString()};
 persistMembers();closeWeeklyAstrocore();renderMemberWeekly();renderDashboardProgression();alert(`Week ${info.week} Astrocore progression saved.`);
}

const ENCHANT_SLOTS=['Headwear','Mouthwear','Facewear','Armor','Weapon','Shield','Boots','Cloak','Accessories 1','Accessories 2','Costume','Backwear'];
function openWeeklyEnchant(){
 if(adminMode){alert('Admin accounts do not submit weekly progression.');return;} const m=document.getElementById('weeklyEnchantModal');if(!m)return;renderEnchantForm();m.classList.remove('hidden');
}
function closeWeeklyEnchant(){document.getElementById('weeklyEnchantModal')?.classList.add('hidden');}
function renderEnchantForm(){
 const list=document.getElementById('enchantList');if(!list)return;
 const p=players.find(x=>String(x.id||'')===currentPlayerId),info=getSelectedSubmissionInfo(),existing=getWeeklyProgressionSubmission(p||{},info.key,'enchant'),items=Array.isArray(existing?.items)?existing.items:[];
 list.innerHTML=ENCHANT_SLOTS.map((slot,i)=>{const item=items[i]||{};return `<div class="enchant-row"><div class="enchant-slot"><strong>${slot}</strong><small>Enchantment level</small></div><input class="enchant-level" data-enchant-index="${i}" type="number" min="0" value="${item.level!=null?String(item.level).replace(/"/g,'&quot;'):''}" placeholder="Level"><span class="enchant-plus">+</span><input class="enchant-effect" data-enchant-index="${i}" type="text" value="${String(item.effect||'').replace(/"/g,'&quot;')}" placeholder="e.g. Lv.7 Superior ATK"></div>`;}).join('');
 list.querySelectorAll('input').forEach(el=>el.addEventListener('input',updateEnchantState));updateEnchantState();
}
function updateEnchantState(){
 const levels=[...document.querySelectorAll('.enchant-level')],effects=[...document.querySelectorAll('.enchant-effect')];const complete=levels.length===12&&levels.every(x=>String(x.value).trim()!=='')&&effects.every(x=>String(x.value).trim()!=='');
 const btn=document.getElementById('enchantSaveBtn');if(btn)btn.disabled=!complete;const text=document.getElementById('enchantConfirmText');if(text)text.textContent=complete?'All 12 enchant entries are complete. Confirm before saving.':`${levels.filter(x=>String(x.value).trim()!=='').length}/12 enchant levels entered.`;
}
function saveWeeklyEnchant(){
 const levels=[...document.querySelectorAll('.enchant-level')],effects=[...document.querySelectorAll('.enchant-effect')];if(levels.length!==12||!levels.every(x=>String(x.value).trim()!=='')||!effects.every(x=>String(x.value).trim()!==''))return;
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;const info=getSelectedSubmissionInfo();
 if(!TEST_SUBMISSION_MODE && !isWeeklySubmissionWindow()){alert(`Week ${info.week} is currently closed. Enchant values are entered, but final submission is only available during that Monday–Sunday week.`);return;}
 const subs=getWeeklyProgressionSubmissions(p,info.key);subs.enchant={items:ENCHANT_SLOTS.map((slot,i)=>({slot,level:Number(levels[i].value),effect:effects[i].value.trim()})),savedAt:new Date().toISOString()};
 persistMembers();closeWeeklyEnchant();renderMemberWeekly();renderDashboardProgression();alert(`Week ${info.week} Enchant progression saved.`);
}
const MEDAL_NAMES=['Bravery','Heroism','Wisdom','Charm','Tempest','Gratitude','Loyalty','Hope'];
function openWeeklyMedal(){
 if(adminMode){alert('Admin accounts do not submit weekly progression.');return;}
 const m=document.getElementById('weeklyMedalModal');if(!m)return;renderMedalForm();m.classList.remove('hidden');
}
function closeWeeklyMedal(){document.getElementById('weeklyMedalModal')?.classList.add('hidden');}
function renderMedalForm(){
 const p=players.find(x=>String(x.id||'')===currentPlayerId),info=getSelectedSubmissionInfo(),existing=getWeeklyProgressionSubmission(p||{},info.key,'medal');
 const preview=document.getElementById('medalPreview'),wrap=document.getElementById('medalPreviewWrap');
 if(preview){preview.src=existing?.image||'';preview.style.display=existing?.image?'block':'none';}
 if(wrap)wrap.classList.toggle('has-image',!!existing?.image);
 window.weeklyMedalData=existing?{levels:{...(existing.levels||{})},image:existing.image||null}:{levels:{},image:null};
 renderMedalLevels(window.weeklyMedalData.levels);
}
function renderMedalLevels(levels={}){
 const host=document.getElementById('medalLevelsGrid');if(!host)return;
 host.innerHTML=MEDAL_NAMES.map(name=>{
   const v=levels[name];
   const ok=Number.isInteger(Number(v))&&Number(v)>=0&&Number(v)<=99;
   return `<label class="medal-level-card ${ok?'detected':''}"><span class="medal-level-name">${name}</span><span class="medal-input-wrap"><span>Lv.</span><input class="medal-level-input" type="number" min="0" max="99" step="1" value="${ok?Number(v):''}" placeholder="0" data-medal="${name}" oninput="updateMedalLevel('${name}',this.value)"></span></label>`;
 }).join('');
 const count=MEDAL_NAMES.filter(n=>Number.isInteger(Number(levels[n]))&&Number(levels[n])>=0&&Number(levels[n])<=99).length;
 const badge=document.getElementById('medalDetectedBadge');if(badge){badge.textContent=count===8?'8/8 COMPLETE':`${count}/8 COMPLETE`;badge.classList.toggle('success',count===8);}
 const save=document.getElementById('medalSaveBtn');if(save)save.disabled=!(count===8&&window.weeklyMedalData?.image);
 const text=document.getElementById('medalConfirmText');if(text)text.textContent=count===8&&window.weeklyMedalData?.image?'All 8 Medal levels entered. Confirm before saving.':`Enter all 8 Medal levels. ${count}/8 complete.`;
}
function updateMedalLevel(name,value){
 if(!window.weeklyMedalData)window.weeklyMedalData={levels:{},image:null};
 const n=String(value).trim()===''?null:Number(value);
 if(n==null||!Number.isInteger(n)||n<0||n>99)delete window.weeklyMedalData.levels[name];else window.weeklyMedalData.levels[name]=n;
 renderMedalLevels(window.weeklyMedalData.levels);
 const input=document.querySelector(`.medal-level-input[data-medal="${CSS.escape(name)}"]`);if(input){input.focus();input.setSelectionRange?.(input.value.length,input.value.length);}
}
async function analyzeMedalScreenshot(file){
 if(!file)return;
 if(file.size>10*1024*1024){alert('Medal screenshot must be 10MB or smaller.');return;}
 try{
  const dataUrl=await medalImageDataUrl(file);const existingLevels=window.weeklyMedalData?.levels||{};window.weeklyMedalData={levels:{...existingLevels},image:dataUrl};
  const preview=document.getElementById('medalPreview'),wrap=document.getElementById('medalPreviewWrap');
  if(preview){preview.src=dataUrl;preview.style.display='block';} if(wrap)wrap.classList.add('has-image');
  renderMedalLevels(window.weeklyMedalData.levels);
 }catch(e){console.error(e);alert('Could not load this screenshot. Please upload again.');}
}
function confirmWeeklyMedal(){
 const levels=window.weeklyMedalData?.levels||{};
 if(MEDAL_NAMES.some(n=>!Number.isInteger(Number(levels[n]))||Number(levels[n])<0||Number(levels[n])>99)||!window.weeklyMedalData?.image){alert('Please upload the Medal screenshot and enter all 8 Medal levels.');return;}
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;const info=getSelectedSubmissionInfo();
 if(!TEST_SUBMISSION_MODE&&!isWeeklySubmissionWindow()){alert(`Week ${info.week} is currently closed. Medal values are entered, but final submission is only available during that Monday–Sunday week.`);return;}
 const subs=getWeeklyProgressionSubmissions(p,info.key);subs.medal={levels:{...levels},image:window.weeklyMedalData.image,savedAt:new Date().toISOString()};
 persistMembers();closeWeeklyMedal();renderMemberWeekly();renderDashboardProgression();renderWeeklyAdmin();alert(`Week ${info.week} Medal progression saved.`);
}

function openWeeklyOcr(){
 if(adminMode){alert('Admin accounts do not submit weekly progression.');return;}
 const m=document.getElementById('weeklyOcrModal'); if(!m)return;
 m.classList.remove('hidden'); resetWeeklyOcr();
}
function closeWeeklyOcr(){document.getElementById('weeklyOcrModal')?.classList.add('hidden');}
function resetWeeklyOcr(){
 const rows=[];
 for(let i=0;i<10;i++) rows.push({id:i+1,side:i<5?'Attack':'Defense',row:(i%5)+1,file:null,image:null,status:'Waiting for screenshot…',feathers:[],power:null,error:false});
 window.weeklyOcrRows=rows;
 window.weeklyOcrData=null;
 renderOcrRows();
 const total=document.getElementById('ocrTotal');if(total)total.textContent='—';
 const power=document.getElementById('ocrPower');if(power)power.textContent='—';
 const confirm=document.getElementById('ocrConfirmText');if(confirm)confirm.textContent='Upload all 10 row screenshots to continue.';
 const save=document.getElementById('ocrSaveBtn');if(save)save.disabled=true;
}
const FEATHER_TOTAL_TABLES={
  skyTerra:[1,5,11,18,27,37,49,62,77,99,124,149,174,199,224,254,284,314,344,374],
  dayNight:[1,5,11,18,27,37,49,62,77,99,124,149,174,199,224,254,284,314,344,374],
  timeSpace:[1,7,15,25,37,51,67,85,105,133,166,199,232,265,298,343,388,433,478,523],
  divineNature:[1,7,15,25,37,51,67,85,105,133,166,199,232,265,298,343,388,433,478,523],
  lightDark:[1,10,21,34,49,66,85,106,129,161,199,237,275,313,351,401,451,501,551,601],
  truthOrder:[1,3,6,10,15,21,28,40,56,84,116,148,180,212,244,284,324,364,404,444],
  purple:[1,3,6,10,15,21,28,40,56,84,116,148,180,212,244,284,324,364,404,444]
};
const FEATHER_CATEGORY={
  sky:'Sky / Terra',terra:'Sky / Terra',
  day:'Day / Night',night:'Day / Night',
  time:'Time / Space',space:'Time / Space',
  divine:'Divine / Nature',nature:'Divine / Nature',
  dark:'Light / Dark',light:'Light / Dark',
  truth:'Truth / Order',order:'Truth / Order',
  life:'Truth / Order',chaos:'Truth / Order',hope:'Truth / Order',void:'Truth / Order',
  justice:'Purple',glory:'Purple',valor:'Purple',faith:'Purple',soul:'Purple',virtue:'Purple',mercy:'Purple',grace:'Purple'
};
function normalizeFeatherName(name){return String(name||'').trim().toLowerCase();}
function featherCategory(name){return FEATHER_CATEGORY[normalizeFeatherName(name)]||'Other';}
function featherTotalFor(name,tier){
  const t=Math.max(1,Math.min(20,Number(tier)||1));
  const n=normalizeFeatherName(name);
  let key=null;
  if(['sky','terra'].includes(n))key='skyTerra';
  else if(['day','night'].includes(n))key='dayNight';
  else if(['time','space'].includes(n))key='timeSpace';
  else if(['divine','nature'].includes(n))key='divineNature';
  else if(['glory','valor','faith','soul','virtue','mercy','justice','grace'].includes(n))key='purple';
  else if(['light','dark'].includes(n))key='lightDark';
  else if(['truth','order','life','chaos','hope','void'].includes(n))key='truthOrder';
  return key?FEATHER_TOTAL_TABLES[key][t-1]:null;
}
function renderOcrRows(){
 const host=document.getElementById('ocrRowsList');if(!host)return;
 const rows=window.weeklyOcrRows||[];
 host.innerHTML=rows.map(r=>{
   const title=`${r.side} Row ${r.row}`;
   const count=r.feathers.length?`<b>${r.feathers.length} feather${r.feathers.length===1?'':'s'}</b>`:'<b>Not analyzed</b>';
   const rowTotal=r.feathers.length? r.feathers.reduce((sum,f)=>sum+(Number(f.featherTotal)||0),0):null;
   const status=r.error?'OCR failed — upload again':(r.feathers.length?(r.feathers.some(f=>f.featherTotal==null)?'Manual verification needed':'Analysis complete'):r.status);
   const thumb=r.image?`<img src="${r.image}" alt="${title}">`:'<span class="ocr-row-camera">📸</span>';
   const feathers=r.feathers.length?`<div class="ocr-row-feathers">${r.feathers.map(f=>`<span>${f.name} T${f.tier} → ${f.featherTotal==null?'—':f.featherTotal.toLocaleString()}</span>`).join('')}</div>`:'';
   return `<div class="ocr-row-card ${r.feathers.length?'done':''} ${r.error?'error':''}">
     <label class="ocr-row-upload">
       <input type="file" accept="image/png,image/jpeg,image/webp" data-row-id="${r.id}">
       <div class="ocr-row-thumb">${thumb}</div>
       <div class="ocr-row-main"><div class="ocr-row-title"><strong>${title}</strong><small>${r.side==='Attack'?'5 feathers visible':'5 feathers visible'}</small></div><div class="ocr-row-status">${status}</div>${feathers}</div>
     </label>
   </div>`;
 }).join('');
 host.querySelectorAll('input[data-row-id]').forEach(input=>input.addEventListener('change',e=>{
   const id=Number(e.target.dataset.rowId);const file=e.target.files?.[0];if(file)analyzeWeeklyRow(id,file);
 }));
}
function aggregateWeeklyOcr(){
 const rows=window.weeklyOcrRows||[];
 const all=rows.flatMap(r=>r.feathers.map(f=>({...f,rowId:r.id,side:r.side,row:r.row})));
 const totalFeatherCount=all.reduce((sum,f)=>{const cat=featherCategory(f.name); return ['Time / Space','Divine / Nature','Day / Night','Sky / Terra','Light / Dark'].includes(cat)?sum+(Number(f.featherTotal)||0):sum;},0);
 const categoryTotals={
   'Time / Space':0,
   'Divine / Nature':0,
   'Day / Night':0,
   'Sky / Terra':0,
   'Light / Dark':0
 };
 all.forEach(f=>{
   const cat=featherCategory(f.name);
   if(Object.prototype.hasOwnProperty.call(categoryTotals,cat)) categoryTotals[cat]+=Number(f.featherTotal)||0;
 });
 const powers=rows.map(r=>Number(r.power)||0).filter(n=>n>0);
 const featherPower=powers.length?powers.reduce((a,b)=>a+b,0):null;
 return {featherPower,totalFeatherCount,categoryTotals,feathers:all,rows:rows.map(r=>({id:r.id,side:r.side,row:r.row,feathers:r.feathers,power:r.power,image:r.image})),featherCount:all.length};
}
async function analyzeWeeklyRow(rowId,file){
 const row=(window.weeklyOcrRows||[]).find(r=>r.id===rowId);if(!row||!file)return;
 row.file=file;row.status='Reading screenshot…';row.error=false;renderOcrRows();
 const storeScreenshot=async()=>{
   try{
     const src=URL.createObjectURL(file);
     const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
     const maxW=720, scale=Math.min(1,maxW/img.naturalWidth);
     const canvas=document.createElement('canvas');
     canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));
     canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
     const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
     row.image=canvas.toDataURL('image/jpeg',0.58);
     URL.revokeObjectURL(src);
     renderOcrRows();
   }catch(e){ console.warn('Screenshot preview compression failed; keeping no stored preview.',e); row.image=null; renderOcrRows(); }
 };
 storeScreenshot();
 if(!window.Tesseract){row.status='OCR engine unavailable. Check internet access.';row.error=true;renderOcrRows();return;}
 try{
   // Run OCR on the original plus an enlarged/contrast-enhanced copy. The
   // in-game labels are small, and Sky/Day are especially easy to lose.
   const results=[];
   const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=URL.createObjectURL(file);});
   const canvas=document.createElement('canvas');
   const scale=Math.max(2,Math.min(3,2200/img.naturalWidth));
   canvas.width=Math.round(img.naturalWidth*scale);canvas.height=Math.round(img.naturalHeight*scale);
   const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.drawImage(img,0,0,canvas.width,canvas.height);
   const data=ctx.getImageData(0,0,canvas.width,canvas.height);
   for(let i=0;i<data.data.length;i+=4){
     const g=(data.data[i]*0.299)+(data.data[i+1]*0.587)+(data.data[i+2]*0.114);
     const c=Math.max(0,Math.min(255,(g-128)*1.35+128));
     data.data[i]=data.data[i+1]=data.data[i+2]=c;
   }
   ctx.putImageData(data,0,0);
   const enhanced=canvas.toDataURL('image/png');
   const sources=[file,enhanced];
   for(const source of sources){
     for(const psm of [6,11,12]){
       try{const r=await Tesseract.recognize(source,'eng',{logger:()=>{},config:{tessedit_pageseg_mode:String(psm)}});results.push(r?.data||{});}catch(e){console.warn('OCR pass failed',psm,e);}
     }
   }
   // Extra targeted OCR passes for the small center/bottom feather label.
   // Some Week 2 screenshots place Justice's text very close to the lower edge,
   // where the full-image OCR can miss the name or its tier.
   const cropSpecs=[
     [0.20,0.55,0.60,0.45],
     [0.35,0.60,0.30,0.40],
     [0.00,0.35,1.00,0.65]
   ];
   for(const [rx,ry,rw,rh] of cropSpecs){
     const c=document.createElement('canvas');
     c.width=Math.max(1,Math.round(canvas.width*rw)); c.height=Math.max(1,Math.round(canvas.height*rh));
     const cc=c.getContext('2d');
     cc.imageSmoothingEnabled=true;
     cc.drawImage(canvas,Math.round(canvas.width*rx),Math.round(canvas.height*ry),c.width,c.height,0,0,c.width,c.height);
     const cropUrl=c.toDataURL('image/png');
     for(const psm of [6,11,12]){
       try{const r=await Tesseract.recognize(cropUrl,'eng',{logger:()=>{},config:{tessedit_pageseg_mode:String(psm)}});results.push(r?.data||{});}catch(e){console.warn('Targeted OCR pass failed',psm,e);}
     }
   }
   URL.revokeObjectURL(img.src);
   const text=results.map(r=>r.text||'').join('\n');
   const powerMatches=[...text.matchAll(/Power\s*([0-9][0-9,]*)/ig)].map(m=>Number(m[1].replace(/,/g,''))).filter(n=>n>0);
   const power=powerMatches.length?Math.max(...powerMatches):null;
   const knownNames=['Space','Day','Time','Sky','Terra','Justice','Glory','Valor','Faith','Soul','Virtue','Mercy','Grace','Night','Divine','Nature','Dark','Light','Life','Chaos','Order','Hope','Void','Truth'];
   const aliases={
     space:['space','spaco','spoce','spase'], day:['day','dey','dav','doy','dayy'], time:['time','timo','timc','tlme'],
     sky:['sky','sly','skv','5ky','skv','sky'], terra:['terra','tcrra','terro'], justice:['justice','justlce','justicc','justlce'], glory:['glory','gl0ry','glorv'], valor:['valor','val0r','valar'], faith:['faith','fa1th','falth'],
     virtue:['virtue','virtuee','virtue'], mercy:['mercy','mercv','mercy'], grace:['grace','gracc','grace'], night:['night','n1ght','nignt'], divine:['divine','divinc'], nature:['nature','natura'], soul:['soul','s0ul'],
     dark:['dark','dork'], light:['light','l1ght'], life:['life'], chaos:['chaos','cha0s'], order:['order','0rder'],
     hope:['hope'], void:['void'], truth:['truth']
   };
   const canonicalByAlias={};
   for(const [canonical,vals] of Object.entries(aliases)) vals.forEach(v=>canonicalByAlias[v]=canonical);
   const levenshtein=(a,b)=>{
     a=String(a).toLowerCase();b=String(b).toLowerCase();const d=Array.from({length:b.length+1},(_,i)=>i);
     for(let i=1;i<=a.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const cur=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=cur;}}
     return d[b.length];
   };
   function canonicalName(raw){
     const clean=String(raw||'').toLowerCase().replace(/[^a-z0-9]/g,'');if(!clean)return null;
     if(canonicalByAlias[clean])return canonicalByAlias[clean];
     let best=null,bestDist=99;
     for(const name of knownNames){const n=name.toLowerCase();const dist=levenshtein(clean,n);const maxDist=n.length<=4?1:2;if(dist<=maxDist&&dist<bestDist){best=name;bestDist=dist;}}
     return best;
   }
   const featherMap=new Map();
   const addFeather=(group,rawName,tier)=>{
     const name=canonicalName(rawName);tier=Number(tier);if(!name||!Number.isFinite(tier)||tier<1||tier>20)return;
     // A single in-game row contains each feather type only once. Multiple OCR passes
     // can see the same label with different group tags (or see it again from
     // another OCR crop), so the feather name is the deduplication key.
     const key=name.toLowerCase();
     const item={group:(group||'OTHER').toUpperCase(),name,tier,category:featherCategory(name),featherTotal:featherTotalFor(name,tier)};
     const old=featherMap.get(key);if(!old||tier>old.tier)featherMap.set(key,item);
   };
   // Parse every line first, but also search the complete OCR text. This
   // catches cases where Tesseract puts [ATK], Day and Tier on separate lines.
   const lines=text.split(/\r?\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
   for(const line of lines){
     const direct=[...line.matchAll(/\[(ATK|DEF|MD|MIX)\]?\s*([A-Za-z0-9]{3,12})\s*(?:Tier|Tler|T1er|T)\s*([0-9]{1,2})/ig)];
     direct.forEach(m=>addFeather(m[1],m[2],m[3]));
     const flexible=[...line.matchAll(/\b([A-Za-z0-9]{3,12})\s*(?:Tier|Tler|T1er|T)\s*([0-9]{1,2})\b/ig)];
     flexible.forEach(m=>{
       const before=line.slice(0,m.index||0);const gm=(before.match(/\[(ATK|DEF|MD|MIX)\]/i)||[])[1]||'OTHER';addFeather(gm,m[1],m[2]);
     });
   }
   // Explicit whole-text pass for the known feather names. It is intentionally
   // independent of line breaks and OCR punctuation.
   const flat=text.replace(/\s+/g,' ');
   for(const name of knownNames){
     const variants=[name,...(aliases[name.toLowerCase()]||[])];
     for(const variant of variants){
       const re=new RegExp('\\b'+variant.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'\\b\\s*(?:Tier|Tler|T1er|T)\\s*([0-9]{1,2})','ig');
       let m;while((m=re.exec(flat))){
         const before=flat.slice(Math.max(0,m.index-25),m.index);const gm=(before.match(/\[(ATK|DEF|MD|MIX)\]/i)||[])[1]||'OTHER';addFeather(gm,variant,m[1]);
       }
     }
   }
   // Fallback: if OCR recognizes a feather name but separates or mangles the
   // 'Tier' token, look for the nearest plausible tier number in a short window.
   // This is especially useful for Justice at the center-bottom of the screenshot.
   for(const name of knownNames){
     const variants=[name,...(aliases[name.toLowerCase()]||[])];
     for(const variant of variants){
       const safe=variant.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
       const re=new RegExp('\\b'+safe+'\\b','ig');
       let m; while((m=re.exec(flat))){
         const windowText=flat.slice(m.index,m.index+90);
         const tm=windowText.match(/(?:Tier|Tler|T1er|T)\\s*[:#-]?\\s*([0-9]{1,2})/i);
         const near=tm?.[1] || windowText.match(/\\b(1[0-9]|20|[1-9])\\b/)?.[1];
         if(near){
           const before=flat.slice(Math.max(0,m.index-25),m.index);
           const gm=(before.match(/\[(ATK|DEF|MD|MIX)\]/i)||[])[1]||'OTHER';
           addFeather(gm,variant,near);
         }
       }
     }
   }
   row.feathers=[...featherMap.values()];row.power=power;
   row.status=row.feathers.length?`${row.feathers.length}/5 feathers detected`:'No feather tiers detected';row.error=false;
   renderOcrRows();updateWeeklyOcrSummary();
 }catch(err){console.error(err);row.status='Could not analyze screenshot. Try a clearer image.';row.error=true;renderOcrRows();updateWeeklyOcrSummary();}
}

function updateWeeklyOcrSummary(){
 const data=aggregateWeeklyOcr();
 const total=document.getElementById('ocrTotal');if(total)total.textContent=data.totalFeatherCount?data.totalFeatherCount.toLocaleString():'—';
 const categoryIds={'Time / Space':'ocrTimeSpace','Divine / Nature':'ocrDivineNature','Day / Night':'ocrDayNight','Sky / Terra':'ocrSkyTerra','Light / Dark':'ocrLightDark'};
 Object.entries(categoryIds).forEach(([cat,id])=>{const el=document.getElementById(id);if(el)el.textContent=(data.categoryTotals?.[cat]||0).toLocaleString();});
 const rows=window.weeklyOcrRows||[];const allComplete=rows.length===10&&rows.every(r=>r.feathers.length===5&&!r.error&&r.feathers.every(f=>Number.isFinite(Number(f.tier))&&Number(f.tier)>=1&&Number(f.tier)<=20));const unknown=data.feathers.some(f=>f.featherTotal==null);
 const confirm=document.getElementById('ocrConfirmText');if(confirm)confirm.textContent=allComplete?(unknown?'All 10 rows analyzed. Some feather names need manual verification.':'All 10 rows analyzed. Confirm the detected tiers and Feather Count before saving.'):`${rows.filter(r=>r.feathers.length>0).length}/10 rows analyzed.`;
 const save=document.getElementById('ocrSaveBtn');if(save)save.disabled=!allComplete;
 window.weeklyOcrData=data;
}
function analyzeWeeklyScreenshot(file){
 // Backward-compatible helper: treat a single uploaded screenshot as Attack Row 1.
 if(file)analyzeWeeklyRow(1,file);
}

function confirmWeeklyOcr(){
 const data=aggregateWeeklyOcr();
 const rows=window.weeklyOcrRows||[];
 const allComplete=rows.length===10&&rows.every(r=>r.feathers.length===5&&!r.error&&r.feathers.every(f=>Number.isFinite(Number(f.tier))&&Number(f.tier)>=1&&Number(f.tier)<=20));
 if(!allComplete){alert('Please complete all 10 Feather rows. Each row must have 5 detected feathers with valid tiers.');return;}
 rows.forEach(r=>r.feathers.forEach(f=>{ if(f.featherTotal==null) f.featherTotal=featherTotalFor(f.name,f.tier); }));
 const refreshed=aggregateWeeklyOcr();
 window.weeklyOcrData=refreshed;
 const p=players.find(x=>String(x.id||'')===currentPlayerId);if(!p)return;
 const info=getSelectedSubmissionInfo();
 if(!TEST_SUBMISSION_MODE && !isWeeklySubmissionWindow()){alert(`Week ${info.week} is currently closed. Screenshot analysis worked, but final submission is only available during that Monday–Sunday week.`);return;}
 const nextSnapshot={...window.weeklyOcrData,weekKey:info.key,week:info.week,year:info.year,weekStart:info.start.toISOString(),weekEnd:info.end.toISOString(),savedAt:new Date().toISOString()};
 if(!Array.isArray(p.weeklySnapshots))p.weeklySnapshots=[];
 const existingIndex=p.weeklySnapshots.findIndex(s=>s.weekKey===info.key);
 if(existingIndex>=0)p.weeklySnapshots[existingIndex]=nextSnapshot;else p.weeklySnapshots.push(nextSnapshot);
 p.lastWeeklySubmission=nextSnapshot.savedAt;
 persistMembers();closeWeeklyOcr();renderMemberWeekly();renderDashboardProgression();renderRoster();renderPartySetup();renderWeeklyAdmin();alert(`Week ${info.week} progression saved.`);
}
function renderMemberWeekly(){
 const p=players.find(x=>String(x.id||'')===currentPlayerId); if(!p)return;
 const current=seasonWeekInfo();
 if(selectedSubmissionWeek==null)selectedSubmissionWeek=Math.max(1,current.week||1);
 const info=getSelectedSubmissionInfo(), title=document.getElementById('memberWeekTitle'), status=document.getElementById('memberWeekStatus'), badge=document.getElementById('memberWeekBadge'), btn=document.getElementById('submitWeeklyBtn');
 if(!title||!status||!badge||!btn)return;
 if(info.week<1){title.textContent='Season has not started';status.textContent='Weekly submissions will begin September 27, 2026.';btn.disabled=true;return;}
 const selector=document.getElementById('submissionWeekSelect');
 if(selector)selector.value=String(info.week);
 title.textContent=`Week ${info.week}`;
 const rangeEl=document.getElementById('memberWeekRange'); if(rangeEl)rangeEl.textContent=formatWeekRange(info);
 const snap=getWeekSnapshot(p,info.key),subs=p.weeklyProgressionSubmissions?.[info.key]||{},hasProgression=!!snap||!!subs.astrocore||!!subs.enchant||!!subs.medal, open=TEST_SUBMISSION_MODE ? true : isWeeklySubmissionWindow();
 status.textContent=hasProgression?`Last updated ${new Date((snap?.savedAt||subs.enchant?.savedAt||subs.astrocore?.savedAt||subs.medal?.savedAt)).toLocaleString()}`:(TEST_SUBMISSION_MODE?'TEST MODE: choose any week for submission testing.':(open?'You can submit and edit your progression anytime during the current week.':'Submission is closed for this week. The next week opens on Monday.'));
 badge.textContent=hasProgression?'SUBMITTED':(TEST_SUBMISSION_MODE?'TEST OPEN':(open?'SUBMISSION OPEN':'SUBMISSION CLOSED')); badge.className=`submission-state ${hasProgression?'submitted':''}`;
 const latestTimes=[snap?.savedAt,subs.astrocore?.savedAt,subs.enchant?.savedAt,subs.medal?.savedAt].filter(Boolean).sort();
 const latest=latestTimes.length?latestTimes[latestTimes.length-1]:null;
 const ss=document.getElementById('memberSubmissionStatus'), sd=document.getElementById('memberSubmissionDate'), tr=document.getElementById('memberTimeRemaining');
 if(ss)ss.textContent=hasProgression?'Submitted':'Not Submitted'; if(sd)sd.textContent=latest?new Date(latest).toLocaleString():'—'; if(tr){const now=new Date(), ms=Math.max(0,info.end.getTime()-now.getTime()); tr.textContent=open?`${Math.ceil(ms/3600000)} hours`:'—';}
 btn.disabled=!open; btn.textContent=hasProgression?'✎  Edit Submission':'➤  Submit Weekly Stats';
}
function submitWeeklyStats(){ openWeeklyChoice(); }

const STATS_SUBMISSION_KEY='redserpentStatsSubmissionsV1';
const SUBMIT_STAT_LABELS={
 hp:'HP',patk:'PATK',matk:'MATK',basePdef:'BASE PDEF',baseMdef:'BASE MDEF',
 healingDone:'HEALING DONE %',healingTaken:'HEALING TAKEN %',critRes:'CRIT RES',
 critDmgRes:'CRIT DMG RES %',cri:'CRI',pdmgReduction:'PDMG REDUCTION %',
 mdmgReduction:'MDMG REDUCTION %',pdmg:'PDMG %',mdmg:'MDMG %',
 ignorePdef:'IGNORE PDEF',ignoreMdef:'IGNORE MDEF',pvpReduction:'PVP DMG REDUCTION',
 pvpBonus:'PVP DMG BONUS',equipPdef:'EQUIPMENT PDEF %',equipMdef:'EQUIPMENT MDEF %',
 mediumDmg:'DMG VS MEDIUM %',mediumReduction:'DMG REDUCTION VS MEDIUM %',
 demiDmg:'DMG VS DEMI-HUMAN %',demiReduction:'DMG REDUCTION VS DEMI-HUMAN %'
};
function readStatsSubmissions(){
 try{const v=JSON.parse(localStorage.getItem(STATS_SUBMISSION_KEY)||'{}');return v&&typeof v==='object'?v:{};}
 catch(e){return {};}
}
function writeStatsSubmissions(v){
 try{localStorage.setItem(STATS_SUBMISSION_KEY,JSON.stringify(v));return true;}
 catch(e){console.warn('Stats submission save failed.',e);return false;}
}
function statsSubmissionAccountKey(p){
 const uid=String(p?.uid||'').trim().toLowerCase();
 const ign=String(p?.ign||'').trim().toLowerCase();
 return `account:${uid}::${ign}`;
}
function latestStatsSubmission(p){
 if(!p)return null;
 const s=readStatsSubmissions()[statsSubmissionAccountKey(p)];
 return s&&typeof s==='object'?s:null;
}
function statsSubmissionHistory(p){
 const latest=latestStatsSubmission(p);
 if(!latest)return [];
 const history=Array.isArray(latest.history)?latest.history.slice():[];
 // Backward compatibility: the old single-submission record is also history.
 if(!history.length && latest.submittedAt) history.push({...latest});
 return history.sort((a,b)=>String(a.submittedAt||'').localeCompare(String(b.submittedAt||'')));
}
function openStatsSubmission(){
 if(adminMode||!currentPlayer)return;
 const modal=document.getElementById('statsSubmissionModal'); if(!modal)return;
 const p=currentPlayer;
 document.getElementById('statsSubmitMember').textContent=p.ign||'—';
 document.getElementById('statsSubmitUid').textContent=p.uid||'—';
 document.getElementById('statsSubmitRole').textContent=p.role||'Carry';
 document.getElementById('statsSubmitJob').textContent=p.job||'—';
 MEMBER_STAT_FIELDS.forEach(k=>{
   const el=document.getElementById(`submitStat_${k}`);
   if(el)el.value=Number(p[k])||0;
 });
 const file=document.getElementById('statsScreenshotFile'); if(file)file.value='';
 const preview=document.getElementById('statsScreenshotPreview');
 if(preview){preview.src='';preview.classList.add('hidden');}
 const existing=latestStatsSubmission(p);
 const note=document.getElementById('statsSubmissionExisting');
 if(note){
   note.textContent=existing?.submittedAt
     ? `Previous submission: ${new Date(existing.submittedAt).toLocaleString()}`
     : 'No previous character stats submission.';
 }
 modal.classList.remove('hidden');
}
function closeStatsSubmission(){
 document.getElementById('statsSubmissionModal')?.classList.add('hidden');
}
function previewStatsScreenshot(input){
 const file=input?.files?.[0];
 const preview=document.getElementById('statsScreenshotPreview');
 if(!file||!preview)return;
 if(!file.type.startsWith('image/')){alert('Please select an image screenshot.');input.value='';return;}
 const reader=new FileReader();
 reader.onload=()=>{preview.src=reader.result;preview.classList.remove('hidden');};
 reader.readAsDataURL(file);
}
function compressStatsScreenshot(file){
 return new Promise((resolve,reject)=>{
   const reader=new FileReader();
   reader.onerror=()=>reject(reader.error||new Error('Unable to read screenshot.'));
   reader.onload=()=>{
     const img=new Image();
     img.onload=()=>{
       const max=1600, scale=Math.min(1,max/Math.max(img.width,img.height));
       const canvas=document.createElement('canvas');
       canvas.width=Math.max(1,Math.round(img.width*scale));
       canvas.height=Math.max(1,Math.round(img.height*scale));
       const ctx=canvas.getContext('2d');
       ctx.drawImage(img,0,0,canvas.width,canvas.height);
       resolve(canvas.toDataURL('image/jpeg',.76));
     };
     img.onerror=()=>reject(new Error('Invalid image.'));
     img.src=reader.result;
   };
   reader.readAsDataURL(file);
 });
}
async function submitCharacterStats(){
 if(adminMode||!currentPlayer)return;
 const file=document.getElementById('statsScreenshotFile')?.files?.[0];
 if(!file){alert('Please attach a screenshot of your current character stats before submitting.');return;}
 if(!file.type.startsWith('image/')){alert('Please attach an image screenshot.');return;}
 const targetUid=String(currentPlayerUid||currentPlayer?.uid||'').trim().toLowerCase();
 const targetIgn=String(currentPlayerIgn||currentPlayer?.ign||'').trim().toLowerCase();
 const p=players.find(x=>String(x.uid||'').trim().toLowerCase()===targetUid && String(x.ign||'').trim().toLowerCase()===targetIgn);
 if(!p){alert('Current member account could not be found.');return;}
 const stats={};
 MEMBER_STAT_FIELDS.forEach(k=>{
   const el=document.getElementById(`submitStat_${k}`);
   stats[k]=Number(el?.value)||0;
 });
 const role=p.role||'Carry', job=p.job||'';
 const now=new Date().toISOString();
 const wasInitial=!p.initialStatsSubmitted;
 MEMBER_STAT_FIELDS.forEach(k=>p[k]=stats[k]);
 p.role=role;p.job=job;
 p.rawPdef=calcRawDefense(p.basePdef,p.equipPdef);
 p.rawMdef=calcRawDefense(p.baseMdef,p.equipMdef);
 p.lastStatsUpdate=now;p.statsRevision=Date.now();
 if(wasInitial){p.initialStatsSubmitted=true;p.initialStatsSubmittedAt=now;}
 let screenshot;
 try{screenshot=await compressStatsScreenshot(file);}
 catch(e){alert('Could not process the screenshot. Please try another image.');return;}
 const submissions=readStatsSubmissions();
 const submissionKey=statsSubmissionAccountKey(p);
 const previousSubmission=submissions[submissionKey];
 const priorHistory=Array.isArray(previousSubmission?.history)
   ? previousSubmission.history.slice()
   : (previousSubmission?.submittedAt?[{...previousSubmission}]:[]);
 const newSubmission={
   uid:p.uid,ign:p.ign,role:p.role,job:p.job,submittedAt:now,
   stats:{...stats},screenshot,screenshotName:file.name
 };
 priorHistory.push({...newSubmission});
 submissions[submissionKey]={...newSubmission,history:priorHistory};
 if(!writeStatsSubmissions(submissions)){alert('The submission could not be saved. Please try again.');return;}
 persistMembers();
 saveMemberStatsSnapshot(p);
 currentPlayer=p;currentPlayerId=String(p.id||'');currentPlayerUid=String(p.uid||'');currentPlayerIgn=String(p.ign||'');
 statsDirty=false;
 syncCharacterStatDisplays();renderDashboardProgression();renderRoster();renderMemberWeekly();renderAdmin();renderWeeklyAdmin();
 const updated=document.getElementById('lastStatsUpdated');if(updated)updated.textContent=formatStatsUpdated(now);
 const b=document.getElementById('saveStatsBtn');if(b)b.textContent='✓ Stats Submitted';
 closeStatsSubmission();
 alert('Character Stats submitted successfully.');
 setTimeout(()=>{if(b)b.textContent='Submit Stats';},1800);
}

function saveDashboardStats(){
 if(adminMode){alert('Admin accounts do not use Member Character Stats.');return;}
 // Prefer the actual selected object reference. This prevents a shared/legacy
 // ID from ever causing stats to be written to another member.
 const targetUid=String(currentPlayerUid||currentPlayer?.uid||'').trim().toLowerCase();
 const targetIgn=String(currentPlayerIgn||currentPlayer?.ign||'').trim().toLowerCase();
 const p=players.find(x=>String(x.uid||'').trim().toLowerCase()===targetUid && String(x.ign||'').trim().toLowerCase()===targetIgn);
 if(!p)return;
 currentPlayer=p; currentPlayerId=String(p.id||''); currentPlayerUid=String(p.uid||''); currentPlayerIgn=String(p.ign||'');
 const d=dashboardStats();
 Object.entries(d).forEach(([k,v])=>p[k]=Number(v)||0); p.role=document.getElementById('roleSelect').value; p.job=document.getElementById('jobSelect').value;
 p.rawPdef=calcRawDefense(p.basePdef,p.equipPdef);p.rawMdef=calcRawDefense(p.baseMdef,p.equipMdef);p.lastStatsUpdate=new Date().toISOString();p.statsRevision=Date.now();
 const wasInitial=!p.initialStatsSubmitted;
 if(wasInitial){p.initialStatsSubmitted=true;p.initialStatsSubmittedAt=p.lastStatsUpdate;}
 persistMembers(); saveMemberStatsSnapshot(p); statsDirty=false;
 const panel=document.querySelector('.character-stats-panel'); if(panel)panel.classList.remove('editing');
 syncCharacterStatDisplays(); renderDashboardProgression(); setSaveState();
 const updated=document.getElementById('lastStatsUpdated');if(updated)updated.textContent=formatStatsUpdated(p.lastStatsUpdate);
 renderRoster();renderPartySetup();renderAdmin();renderMemberWeekly();renderWeeklyAdmin();
 const b=document.getElementById('saveStatsBtn');if(b){b.textContent=wasInitial?'✓ Initial Stats Saved':'✓ Stats Updated';setTimeout(()=>{if(!statsDirty)b.textContent='Update Stats';},1600);}
}

function makePlayerId(p){
  // Stable per-member key. Never use Date.now()/Math.random() here: IDs must
  // remain identical across refreshes and must never be shared by members.
  const uid=String(p?.uid||'').trim().toLowerCase();
  const ign=String(p?.ign||'').trim().toLowerCase();
  const seed=`${uid}|${ign}`;
  let h=0; for(let i=0;i<seed.length;i++) h=((h<<5)-h+seed.charCodeAt(i))|0;
  return `rs-${Math.abs(h)}-${Array.from(seed).reduce((a,c)=>a+c.charCodeAt(0),0).toString(36)}`;
}
function normalizePlayer(p){
  // Migrate the previous DPS label to the new Carry role.
  if(String(p.role||'').trim().toLowerCase()==='dps') p.role='Carry';
  // Normalize the member record without trusting a legacy/shared ID.
  // The unique member key is rebuilt from the account credentials when needed.
  if(!p.id) p.id=makePlayerId(p);
  if(!p.status) p.status='Active';
  if(!Array.isArray(p.weeklySnapshots)) p.weeklySnapshots=[];
  if(!p.weeklyProgressionSubmissions||typeof p.weeklyProgressionSubmissions!=='object') p.weeklyProgressionSubmissions={};
  if(!p.accountType) p.accountType='Member';
  // Account type is authoritative. Never let a stale systemAdmin flag
  // turn a newly-created Member into an Admin.
  if(String(p.accountType).trim().toLowerCase()==='admin') p.systemAdmin=true;
  else delete p.systemAdmin;
  return p;
}
function ensureUniqueMemberIds(){
  const seen=new Set();
  players.forEach((p,index)=>{
    normalizePlayer(p);
    const candidate=String(p.id||'').trim();
    if(!candidate || seen.has(candidate)){
      // Re-key duplicate/legacy records from their actual account identity.
      // UID is preferred; IGN is the fallback for older seeded members.
      const base=makePlayerId(p);
      let id=base || `rs-member-${index+1}`;
      let n=2;
      while(seen.has(id)) id=`${base}-${n++}`;
      p.id=id;
    }
    seen.add(String(p.id));
  });
}

function compactMemberForStorage(player){
  // Keep all gameplay/stat data, but omit screenshot payloads and File objects.
  // Screenshots can consume localStorage quota and prevent even tiny session/data writes.
  try{
    return JSON.parse(JSON.stringify(player,(key,value)=>{
      if(key==='image'||key==='file') return undefined;
      return value;
    }));
  }catch(e){ return {...player}; }
}
function getCompactPlayers(){ return players.map(compactMemberForStorage); }
function persistMembers(){
  // Repair duplicate legacy identities before writing anything.
  ensureUniqueMemberIds();
  // Save the compact copy FIRST so it is always the newest recovery snapshot.
  // The full copy is then saved as the primary source (including screenshots).
  const core=JSON.stringify(getCompactPlayers());
  const full=JSON.stringify(players);
  let coreSaved=false, fullSaved=false;
  try{ localStorage.setItem('redserpentMembersCore',core); coreSaved=true; }catch(e){ console.warn('Compact member save failed.',e); }
  try{ localStorage.setItem('redserpentMembers',full); fullSaved=true; }catch(e){ console.warn('Full member save failed; compact recovery remains available.',e); }
  return fullSaved||coreSaved;
}
function memberStorageKey(p){
  // UID is the primary account identity. IGN is only the fallback for legacy
  // records that do not have a UID yet. Never use a shared/generated ID here.
  const uid=String(p?.uid||'').trim().toLowerCase();
  if(uid) return `uid:${uid}`;
  const ign=String(p?.ign||'').trim().toLowerCase();
  return `ign:${ign}`;
}
function readStoredPlayers(){
  // IMPORTANT: the full member list is the source of truth whenever it is
  // readable. The compact list is only a fallback for quota-recovery.
  // Never merge the compact copy over the full copy because an older compact
  // snapshot can overwrite another member's newer stats.
  let full=null, core=null;
  try{ full=JSON.parse(localStorage.getItem('redserpentMembers')||'null'); }catch(e){ full=null; }
  if(Array.isArray(full)) return full;
  try{ core=JSON.parse(localStorage.getItem('redserpentMembersCore')||'null'); }catch(e){ core=null; }
  return Array.isArray(core)?core:null;
}
function loadStoredMembers(){
  try{
    const saved=readStoredPlayers();
    if(Array.isArray(saved)&&saved.length){
      players.length=0; saved.forEach(p=>{normalizePlayer(p); players.push(p);});
      ensureUniqueMemberIds();
      players.forEach(p=>applyMemberStatsSnapshot(p));
      // Refresh the compact recovery copy without screenshots. If the full copy
      // is too large, this still succeeds and preserves the latest stats.
      try{ localStorage.setItem('redserpentMembersCore',JSON.stringify(getCompactPlayers())); }catch(e){}
    } else {
      players.forEach(p=>{normalizePlayer(p); applyMemberStatsSnapshot(p);});
      persistMembers();
    }
  }catch(e){ players.forEach(normalizePlayer); }
}

// Session state is tab-scoped on purpose. localStorage is shared by every tab,
// so storing the active login there caused an Admin tab to become the last member
// who logged in from another tab. sessionStorage survives refresh but stays isolated
// per browser tab/window, which is exactly what we need for concurrent testing.
function persistSession(type,id){
  const account=players.find(p=>String(p.id||'')===String(id||''))||currentPlayer;
  const value=JSON.stringify({type,id:String(account?.id||id||''),uid:String(account?.uid||''),ign:String(account?.ign||''),savedAt:Date.now()});
  try{ sessionStorage.setItem('redserpentSession',value); }catch(e){ console.warn('sessionStorage session unavailable.',e); }
}
function clearSession(){
  try{sessionStorage.removeItem('redserpentSession');}catch(e){}
}
function getStoredSession(){
  try{ const raw=sessionStorage.getItem('redserpentSession'); if(raw)return raw; }catch(e){}
  return null;
}

// Keep an Admin tab live when another tab submits/updates member data.
// The storage event fires only in *other* tabs, so it will not create a render loop.
let crossTabRefreshTimer=null;
window.addEventListener('storage',e=>{
  const watched=new Set([
    'redserpentMembers','redserpentMembersCore',
    'redserpentStatsSubmissions','redserpentPartySetup',
    'redserpentWeeklySubmissions','redserpentAnnouncements'
  ]);
  if(!watched.has(e.key)) return;
  clearTimeout(crossTabRefreshTimer);
  crossTabRefreshTimer=setTimeout(()=>{
    try{
      loadStoredMembers();
      if(adminMode){
        renderAdminDashboard();
        renderAdmin();
        renderRoster();
        renderPartySetup();
        try{renderWeeklyAdmin();}catch(err){}
      }
    }catch(err){ console.warn('Cross-tab refresh failed:',err); }
  },120);
});

// V36 — Admin roster/dashboard live sync fallback. The browser storage event is
// normally enough, but polling a lightweight signature also catches deployments
// or browser privacy modes that suppress/delay storage events. It never writes
// data and only re-renders while an Admin session is active.
let adminLiveSignature='';
function getMemberDataSignature(){
  try{
    const raw=localStorage.getItem('redserpentMembers')||localStorage.getItem('redserpentMembersCore')||'';
    return raw.length+':'+raw.slice(0,80)+':'+raw.slice(-80);
  }catch(e){return ''}
}
setInterval(()=>{
  if(!adminMode)return;
  const sig=getMemberDataSignature();
  if(!adminLiveSignature){adminLiveSignature=sig;return;}
  if(sig===adminLiveSignature)return;
  adminLiveSignature=sig;
  try{
    loadStoredMembers();
    renderAdminDashboard();
    renderAdmin();
    renderRoster();
    renderPartySetup();
    try{renderWeeklyAdmin();}catch(err){}
  }catch(err){console.warn('Admin live sync failed:',err);}
},1000);
function restoreSession(){
  try{
    const raw=getStoredSession(); if(!raw)return;
    const session=JSON.parse(raw);
    if(session.type==='master-admin' && session.id==='master-admin'){enterAdmin(true);return;}
    const sessionUid=String(session.uid||'').trim().toLowerCase();
    const sessionIgn=String(session.ign||'').trim().toLowerCase();
    const p=players.find(x=>
      (sessionUid && sessionIgn && String(x.uid||'').trim().toLowerCase()===sessionUid && String(x.ign||'').trim().toLowerCase()===sessionIgn) ||
      String(x.id||'')===String(session.id||'')
    );
    if(!p || String(p.status||'Active')==='Inactive'){clearSession();return;}
    activateAccount(p,false);
  }catch(e){clearSession();}
}
function activateAccount(account,writeSession=true){
  if(!account) return;
  currentPlayer=account;
  currentPlayerId=String(account.id||''); currentPlayerUid=String(account.uid||''); currentPlayerIgn=String(account.ign||'');
  adminMode=String(account.accountType||'Member').trim().toLowerCase()==='admin';
  if(writeSession)persistSession(adminMode?'admin':'member',account.id);
  document.getElementById('login').classList.add('hidden');
  document.getElementById('portal').classList.remove('hidden');
  if(adminMode){
    const rosterNav=document.getElementById('rosterNav');
    if(rosterNav){rosterNav.classList.remove('hidden');rosterNav.style.display='block';}
    document.getElementById('adminNav').classList.remove('hidden'); document.getElementById('partyNav')?.classList.remove('hidden'); document.getElementById('weeklyNav')?.classList.remove('hidden');
    document.getElementById('memberName').textContent='Administrator'; document.querySelector('.member-mini small').textContent='Admin'; syncHeaderIdentity();
    showPage('dashboard',document.querySelector('[data-page="dashboard"]')); renderAdminDashboard(); renderAdmin(); renderRoster(); renderPartySetup();
  }else{
    document.getElementById('adminNav').classList.add('hidden');
    document.getElementById('partyNav')?.classList.add('hidden');
    document.getElementById('weeklyNav')?.classList.add('hidden');
    // Members have Dashboard-only access. Roster/progression administration stays
    // completely out of the member navigation and is also route-guarded.
    const rosterNav=document.getElementById('rosterNav');
    if(rosterNav){rosterNav.classList.add('hidden');rosterNav.style.display='none';}

    // Reveal the Dashboard first, then hydrate this exact account.
    showPage('dashboard',document.querySelector('[data-page="dashboard"]'));
    try{ loadDashboardFromPlayer(account); }
    catch(e){ console.error('Dashboard hydration failed during login:',e); }
    try{ renderMemberWeekly(); }
    catch(e){ console.error('Member weekly render failed during login:',e); }
    requestAnimationFrame(()=>{ try{ syncCharacterStatDisplays(); }catch(e){ console.error('Dashboard display sync failed:',e); } });
  }
}

function login(){
  const ign=(document.getElementById("ign")?.value||"").trim();
  const uid=(document.getElementById("playerId")?.value||"").trim();
  if(!ign||!uid){alert("Please enter your IGN and Player ID.");return;}
  loadStoredMembers();
  const account=players.find(p=>String(p.ign||"").trim().toLowerCase()===ign.toLowerCase() && String(p.uid||"").trim()===uid);
  if(!account){alert("Account not found. Please check your IGN and Player ID.");return;}
  if(String(account.status||"Active")==='Inactive'){alert("This account is inactive. Please contact an Administrator.");return;}
  activateAccount(account,true);
}

function logout(){
  clearSession(); adminMode=false; currentPlayerIndex=0; currentPlayerId=""; currentPlayerUid=""; currentPlayerIgn=""; currentPlayer=null; statsDirty=false;
  document.getElementById("portal").classList.add("hidden"); document.getElementById("login").classList.remove("hidden");
  document.getElementById("adminNav").classList.add("hidden"); document.getElementById("partyNav")?.classList.add("hidden"); document.getElementById("weeklyNav")?.classList.add("hidden");
  const rosterNav=document.getElementById('rosterNav');
  if(rosterNav){rosterNav.classList.add('hidden');rosterNav.style.display='none';}
  document.getElementById("ign").value=""; document.getElementById("playerId").value="";
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
}

function syncHeaderIdentity(){
  const name=adminMode?'Administrator':(currentPlayer?.ign||currentPlayerIgn||'');
  const role=adminMode?'◆ Administrator':'◆ Guild Member';
  const avatar=adminMode?'A':(name||'S').charAt(0).toUpperCase();
  const hn=document.getElementById('headerMemberName'); if(hn)hn.textContent=name;
  const hr=document.getElementById('headerRoleBadge'); if(hr)hr.textContent=role;
  const ha=document.getElementById('headerAvatar'); if(ha)ha.textContent=avatar;
}

function isAdminSession(){
  try{
    const s=JSON.parse(getStoredSession()||'null');
    return !!(adminMode || s?.type==='master-admin' || s?.type==='admin' || String(currentPlayer?.accountType||'').trim().toLowerCase()==='admin');
  }catch(e){ return !!adminMode; }
}
function showPage(page,el){
  if((page==='admin'||page==='weekly'||page==='rosters')&&!adminMode){alert('Admin access required.');return;}
  if(page==='party'&&!adminMode){alert('Party Setup is available to Administrators only.');return;}
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  const t=document.getElementById(page);if(t)t.classList.remove('hidden');
  document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));if(el)el.classList.add('active');
  if(page==='dashboard'){
    const adminView=document.getElementById('adminDashboardContent'),memberView=document.getElementById('memberDashboardContent');
    if(isAdminSession()){
      adminMode=true;
      if(memberView){memberView.classList.add('hidden');memberView.style.display='none';}
      if(adminView){adminView.classList.remove('hidden');adminView.style.display='grid';}
      renderAdminDashboard();
    }else{
    if(adminView){
        adminView.classList.add('hidden');
        adminView.style.display='none';
    }

    if(memberView){
        memberView.classList.remove('hidden');
        memberView.style.display='block';
    }

    requestAnimationFrame(()=>{
        try{
            syncCharacterStatDisplays();
        }catch(e){
            console.error('Dashboard display sync failed:', e);
        }
    });
}
  }else if(page!=='dashboard'){
    const av=document.getElementById('adminDashboardContent'),mv=document.getElementById('memberDashboardContent');
    if(av){av.classList.add('hidden');av.style.display='none';}
    if(mv){mv.classList.add('hidden');mv.style.display='none';}
  }
  syncHeaderIdentity();
  const titles={dashboard:isAdminSession()?'Admin Dashboard':'Member Portal',rosters:'Rosters',party:'Party Setup',weekly:'Weekly Submissions',admin:'Admin Dashboard'};
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = titles[page];
  if(page==='rosters'){ if(!adminMode)return; const rosterNav=document.getElementById('rosterNav'); if(rosterNav){rosterNav.classList.remove('hidden');rosterNav.style.display='block';} renderRoster(); } if(page==='weekly')renderWeeklyAdmin();
}
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>showPage(a.dataset.page,a)));
document.getElementById("signInBtn")?.addEventListener("click",login);
document.querySelectorAll("#dashboard input").forEach(el=>{
  el.addEventListener("focus",()=>{ if(el.value === "0") el.value=""; });
  el.addEventListener("blur",()=>{ if(el.value.trim() === "") el.value="0"; });
  el.addEventListener("input",()=>{markStatsDirty();syncCharacterStatDisplays();});
});
document.getElementById('roleSelect')?.addEventListener('change',()=>{updateDashboardJobOptions(document.getElementById('roleSelect').value, document.getElementById('jobSelect').value);markStatsDirty();});
document.getElementById('jobSelect')?.addEventListener('change',markStatsDirty);
document.getElementById('saveStatsBtn')?.addEventListener('click',()=>{ if(adminMode){return;} openStatsSubmission(); });
document.getElementById('submitWeeklyBtn')?.addEventListener('click',submitWeeklyStats);
document.getElementById('updateIgnBtn')?.addEventListener('click',openProfileSettings);
function openProfileSettings(){
 const m=document.getElementById('profileSettingsModal'); if(!m)return;
 const memberBox=document.getElementById('memberProfileSettings'),adminBox=document.getElementById('adminProfileSettings');
 const avatar=document.getElementById('profileSettingsAvatar');
 if(adminMode){
   memberBox?.classList.add('hidden'); adminBox?.classList.remove('hidden');
   const master=isMasterAdminSession();
   const type=document.getElementById('profileAdminType'),username=document.getElementById('profileAdminUsername'),access=document.getElementById('profileAdminAccess');
   const masterBox=document.getElementById('masterAdminSecurity'),regularBox=document.getElementById('regularAdminSecurity');
   if(type)type.textContent=master?'Master Administrator':'Administrator';
   if(username)username.textContent=master?ADMIN_USERNAME:(currentPlayer?.ign||currentPlayerIgn||'Administrator');
   if(access)access.textContent=master?'FULL SYSTEM ACCESS':'ADMIN ACCESS';
   masterBox?.classList.toggle('hidden',!master); regularBox?.classList.toggle('hidden',master);
   ['profileCurrentPassword','profileNewPassword','profileConfirmPassword'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
   document.getElementById('profilePasswordError')?.classList.add('hidden');
   if(avatar)avatar.textContent='A';
 }else{
   adminBox?.classList.add('hidden'); memberBox?.classList.remove('hidden');
   const p=players.find(x=>String(x.id||'')===currentPlayerId)||currentPlayer;
   if(!p){alert('Current member account could not be found.');return;}
   const ign=document.getElementById('profileIgnInput'),uid=document.getElementById('profileUidInput'),role=document.getElementById('profileRoleInput'),job=document.getElementById('profileJobInput');
   if(ign)ign.value=p.ign||'';
   if(uid)uid.value=p.uid||'';
   if(role)role.value=p.role||'Carry';
   if(job){job.innerHTML=ALL_JOBS.map(j=>`<option value="${escHtml(j)}">${escHtml(j)}</option>`).join('');job.value=ALL_JOBS.includes(p.job)?p.job:'';}
   if(avatar)avatar.textContent=String(p.ign||'S').charAt(0).toUpperCase();
 }
 m.classList.remove('hidden');
 setTimeout(()=>{ if(adminMode){ if(isMasterAdminSession())document.getElementById('profileCurrentPassword')?.focus(); }else document.getElementById('profileIgnInput')?.focus(); },40);
}
function changeMasterPassword(){
 if(!isMasterAdminSession()){alert('Only the Master Admin can change this password.');return;}
 const current=document.getElementById('profileCurrentPassword')?.value||'';
 const next=document.getElementById('profileNewPassword')?.value||'';
 const confirmPw=document.getElementById('profileConfirmPassword')?.value||'';
 const error=document.getElementById('profilePasswordError');
 const showError=(msg)=>{if(error){error.textContent=msg;error.classList.remove('hidden');}};
 if(error)error.classList.add('hidden');
 if(current!==getMasterAdminPassword()){showError('Current password is incorrect.');return;}
 if(next.length<8){showError('New password must be at least 8 characters.');return;}
 if(next!==confirmPw){showError('New password and confirmation do not match.');return;}
 if(next===current){showError('New password must be different from the current password.');return;}
 localStorage.setItem(MASTER_PASSWORD_KEY,next);
 ['profileCurrentPassword','profileNewPassword','profileConfirmPassword'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
 alert('Master Admin password changed successfully.');
 closeProfileSettings();
}
function closeProfileSettings(){document.getElementById('profileSettingsModal')?.classList.add('hidden');}
function showProfileSaveToast(){
 const toast=document.getElementById('profileSaveToast');
 if(!toast)return;
 toast.classList.remove('show');
 void toast.offsetWidth;
 toast.classList.add('show');
 clearTimeout(window.__profileSaveToastTimer);
 window.__profileSaveToastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}
function saveProfileSettings(){
 if(adminMode){closeProfileSettings();return;}
 const p=players.find(x=>String(x.id||'')===currentPlayerId)||currentPlayer; if(!p)return;
 const old=String(p.ign||currentPlayerIgn||'').trim(); const newIgn=String(document.getElementById('profileIgnInput')?.value||'').trim();
 if(!newIgn){alert('IGN cannot be empty.');return;}
 if(newIgn.toLowerCase()!==old.toLowerCase()){
   const duplicate=players.some(x=>x!==p&&!isAdminAccount(x)&&String(x.ign||'').trim().toLowerCase()===newIgn.toLowerCase());
   if(duplicate){alert('That IGN is already in use. Please choose another IGN.');return;}
   p.ign=newIgn; currentPlayer=p; currentPlayerIgn=newIgn;
 }
 const newRole=String(document.getElementById('profileRoleInput')?.value||p.role||'Carry').trim();
 const newJob=String(document.getElementById('profileJobInput')?.value||p.job||'').trim();
 if(['Carry','Support','Utility'].includes(newRole)) p.role=newRole;
 if(ALL_JOBS.includes(newJob)) p.job=newJob;
 currentPlayer=p; currentPlayerIgn=String(p.ign||'');
 persistMembers();
 showProfileSaveToast();
 document.getElementById('welcomeName').textContent=p.ign||''; document.getElementById('memberName').textContent=p.ign||'';
 const hn=document.getElementById('headerMemberName'); if(hn)hn.textContent=p.ign||''; const ha=document.getElementById('headerAvatar'); if(ha)ha.textContent=String(p.ign||'S').charAt(0).toUpperCase();
 loadDashboardFromPlayer(p);
 renderRoster(); renderAdmin(); renderPartySetup();
 closeProfileSettings();
}
function updateIgn(){openProfileSettings();}

// V33 — keep Profile / Settings Save Changes clickable even when modal layers are present.
document.addEventListener("DOMContentLoaded",()=>{
  const save=document.querySelector('#profileSettingsModal .profile-settings-body:not(.hidden) .editor-actions .cyan');
  if(save && !save.dataset.profileSaveBound){
    save.dataset.profileSaveBound="1";
    save.addEventListener("click",(e)=>{e.stopPropagation(); saveProfileSettings();});
  }
});
const DPS_JOBS=["Lord Knight","High Wizard","Sniper","Gunslinger","Mastersmith","Stalker","Assassin","Professor","Summoner","Asura"];
const SUPPORT_JOBS=["Paladin","Biochemist","Bard","Gypsy","High Priest"];
const ALL_JOBS=[...DPS_JOBS,...SUPPORT_JOBS];
function updateRosterJobFilter(){
 const role=document.getElementById("roleFilter")?.value||"";
 const select=document.getElementById("jobFilter"); if(!select)return;
 const current=select.value;
 const jobs=role==="Carry"?DPS_JOBS:role==="Support"?SUPPORT_JOBS:ALL_JOBS;
 select.innerHTML='<option value="">All Jobs</option>'+jobs.map(j=>`<option value="${j}">${j}</option>`).join("");
 if(jobs.includes(current)) select.value=current;
}
function isAdminAccount(p){
 const type=String(p?.accountType||"Member").trim().toLowerCase();
 return type==="admin";
}

function rosterRecords(){
 const map=new Map();
 players.forEach((p,i)=>{
   if(isAdminAccount(p)) return;
   const ign=String(p?.ign||"").trim();
   if(!ign) return;
   const key=ign.toLowerCase();
   const existing=map.get(key);
   if(!existing || (existing.p.status==='Inactive' && p.status!=='Inactive')) map.set(key,{p,i});
 });
 return [...map.values()];
}

function renderRoster(){
 const b=document.getElementById("rosterBody");if(!b)return;
 const q=((document.getElementById("search")||{}).value||"").toLowerCase();
 const role=(document.getElementById("roleFilter")||{}).value||"";
 const job=(document.getElementById("jobFilter")||{}).value||"";
 const rosterPlayers=rosterRecords();
 b.innerHTML=rosterPlayers.filter(x=>String(x.p.ign||"").toLowerCase().includes(q)&&(!role||x.p.role===role)&&(!job||x.p.job===job)).map(x=>{
   const p=x.p,i=x.i;
   // Admin Roster displays the member's latest submitted Character Stats
   // directly in the table. No extra click is required.
   const sub=latestStatsSubmission(p);
   const s=sub?.stats||p;
   const n=k=>Number(s[k])||0;
   const rawPdef=calcRawDefense(n('basePdef'),n('equipPdef'));
   const rawMdef=calcRawDefense(n('baseMdef'),n('equipMdef'));
   const submitted=sub?'<span class="status-badge submitted">Submitted</span>':'<span class="status-badge missing">Not Submitted</span>';
   return `<tr onclick="showPlayer(${i})">
 <td><b>${escHtml(p.ign)}</b></td><td><span class="status-badge ${String(p.status||"Active").toLowerCase().replace(/\s+/g,"-")}">${escHtml(p.status||"Active")}</span></td><td class="role">${escHtml(p.role||s.role||"—")}</td><td>${escHtml(p.job||s.job||"—")}</td><td class="roster-hp">${fmt(n('hp'))}</td><td>${n('patk').toLocaleString()}</td><td>${n('matk').toLocaleString()}</td><td>${fmt(rawPdef)}</td><td>${fmt(rawMdef)}</td>
 <td>${n('healingDone')}</td><td>${n('healingTaken')}</td><td>${n('critRes')}</td><td>${n('critDmgRes')}</td><td>${n('cri')}</td><td>${n('pdmgReduction')}</td><td>${n('mdmgReduction')}</td><td>${n('pdmg')}</td><td>${n('mdmg')}</td><td>${n('ignorePdef').toLocaleString()}</td><td>${n('ignoreMdef').toLocaleString()}</td>
 <td>${n('pvpReduction')}</td><td>${n('pvpBonus').toLocaleString()}</td><td>${n('equipPdef')}</td><td>${n('equipMdef')}</td><td>${n('mediumDmg')}</td><td>${n('mediumReduction')}</td><td>${n('demiDmg')}</td><td>${n('demiReduction')}</td>
 <td>${submitted}</td></tr>`;
 }).join("");
}

function fmt(v){
 const n=Number(v);
 if(Number.isNaN(n)) return String(v ?? "0");
 return Number.isInteger(n)?n.toLocaleString():n.toLocaleString(undefined,{maximumFractionDigits:2});
}
function delta(v,d){
 const n=Number(v), x=Number(d);
 if(Number.isNaN(n)||Number.isNaN(x)) return `<span class="delta neutral">—</span>`;
 const sign=x>0?'+':x<0?'−':'±';
 const cls=x>0?'up':x<0?'down':'neutral';
 return `<span class="delta ${cls}">${sign} ${fmt(Math.abs(x))}</span>`;
}
function row(label,v,d,extraClass=''){return `<div class="progress-row ${extraClass}"><span>${label}</span><b>${fmt(v)}</b>${delta(v,d)}</div>`}

function statsSubmissionAdminHtml(p){
 const latest=latestStatsSubmission(p);
 if(!latest)return '<p class="hint">No character stats submission yet.</p>';
 const submitted=latest.submittedAt?new Date(latest.submittedAt).toLocaleString():'—';
 const history=statsSubmissionHistory(p);
 // The right-side gallery already shows the CURRENT/LATEST screenshot.
 // This card should show the PREVIOUS screenshot when one exists, so the
 // admin can compare the member's last image against the current submission.
 const previous=history.length>1 ? history[history.length-2] : null;
 const image=previous?.screenshot
   ? `<button type="button" class="latest-submission-image-button" onclick="openDetailImage(0,'${escHtml(previous.screenshot)}')"><img class="stats-submission-image" src="${escHtml(previous.screenshot)}" alt="Previous submitted character stats screenshot"><span>Click to zoom</span></button>`
   : '<div class="stats-submission-empty"><p class="hint">No previous screenshot.</p></div>';
 const historyHtml=history.length>1
   ? `<div class="submission-history"><b>SUBMISSION HISTORY</b>${history.slice().reverse().map((h,idx)=>`<div class="submission-history-row"><span>#${history.length-idx}</span><span>${h.submittedAt?new Date(h.submittedAt).toLocaleString():'—'}</span><span>${idx===0?'<em>Latest</em>':''}</span></div>`).join('')}</div>`
   : '';
 return `<div class="stats-submission-admin"><div class="submission-admin-meta"><b>Latest Submitted</b><span>${submitted}</span></div>${image}${historyHtml}</div>`;
}

function playerDetailGallery(p){
 const sub=latestStatsSubmission(p);
 const shot=sub?.screenshot||'';
 return `<div class="detail-photo-panel">
   <div class="detail-photo-title">SUBMITTED SCREENSHOT</div>
   ${shot
     ? `<button class="detail-photo single" type="button" onclick="openDetailImage(0,'${escHtml(shot)}')">
          <img src="${escHtml(shot)}" alt="Latest submitted character stats screenshot">
          <span>Click to zoom</span>
        </button>`
     : `<div class="detail-photo empty single"><span>No screenshot submitted</span></div>`}
 </div>`;
}
function openDetailImage(index,src){
 const modal=document.getElementById('detailImageModal'),img=document.getElementById('detailZoomImage');
 if(!modal||!img||!src)return;
 detailZoom=1;img.src=src;img.style.transform='scale(1)';
 img.dataset.sourceIndex=String(index);
 modal.classList.remove('hidden');
}
function closeDetailImage(){document.getElementById('detailImageModal')?.classList.add('hidden');}
function changeDetailZoom(delta){
 const img=document.getElementById('detailZoomImage');if(!img)return;
 detailZoom=Math.max(.5,Math.min(3,detailZoom+delta));
 img.style.transform=`scale(${detailZoom})`;
 document.getElementById('detailZoomValue').textContent=Math.round(detailZoom*100)+'%';
}
function resetDetailZoom(){
 const img=document.getElementById('detailZoomImage');if(!img)return;
 detailZoom=1;img.style.transform='scale(1)';
 const v=document.getElementById('detailZoomValue');if(v)v.textContent='100%';
}

function showPlayer(i){
 const p=players[i];
 const latest=(p.weeklySnapshots||[]).slice().sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||'')))[0];
 const previous=latest||{
  hp:p.hp?p.hp-1957:0,patk:p.patk?p.patk-99:0,matk:p.matk?p.matk-286:0,basePdef:p.basePdef?p.basePdef+40:0,baseMdef:p.baseMdef?p.baseMdef-21:0,healingDone:p.healingDone?p.healingDone-1.2:0,healingTaken:p.healingTaken?p.healingTaken-0.5:0,critRes:p.critRes?p.critRes-12:0,critDmgRes:p.critDmgRes?p.critDmgRes-1:0,cri:p.cri?p.cri-3:0,pdmgReduction:p.pdmgReduction?p.pdmgReduction-0.96:0,mdmgReduction:p.mdmgReduction?p.mdmgReduction+1.24:0,pdmg:p.pdmg?p.pdmg-1.79:0,mdmg:p.mdmg?p.mdmg-0.27:0,ignorePdef:p.ignorePdef?p.ignorePdef-99:0,ignoreMdef:p.ignoreMdef?p.ignoreMdef-21:0,pvpReduction:p.pvpReduction?p.pvpReduction+82:0,pvpBonus:p.pvpBonus?p.pvpBonus-24:0,equipPdef:p.equipPdef?p.equipPdef-1.1:0,equipMdef:p.equipMdef?p.equipMdef-0.7:0,mediumDmg:p.mediumDmg?p.mediumDmg-0.27:0,mediumReduction:p.mediumReduction?p.mediumReduction+2.27:0,demiDmg:p.demiDmg?p.demiDmg-0.6:0,demiReduction:p.demiReduction?p.demiReduction+0.7:0
 };
 const d=k=>Number(p[k]||0)-Number(previous[k]||0);
 document.getElementById("modalName").textContent=p.ign;
 const rawPdef=calcRawDefense(p.basePdef,p.equipPdef);
 const rawMdef=calcRawDefense(p.baseMdef,p.equipMdef);
 const trackedKeys=['hp','patk','matk','basePdef','baseMdef','healingDone','healingTaken','critRes','critDmgRes','cri','pdmgReduction','mdmgReduction','pdmg','mdmg','ignorePdef','ignoreMdef','pvpReduction','pvpBonus','equipPdef','equipMdef','mediumDmg','mediumReduction','demiDmg','demiReduction'];
 const improved=latest?trackedKeys.filter(k=>Number(p[k]||0)>Number(latest[k]||0)).length:0, declined=latest?trackedKeys.filter(k=>Number(p[k]||0)<Number(latest[k]||0)).length:0, unchanged=trackedKeys.length-improved-declined;
 const summary=latest?`<div class="progress-summary"><span>📈 Progress Summary</span><b>${improved} Improved</b><b class="down-text">${declined} Decreased</b><b class="neutral-text">${unchanged} Unchanged</b></div>`:`<div class="progress-summary"><span>📈 Progress Summary</span><b>Initial Stats</b><small>Submit again during the next weekly submission window for comparison.</small></div>`;
 document.getElementById("totalRawPdef").textContent=fmt(rawPdef);
 document.getElementById("totalRawMdef").textContent=fmt(rawMdef);
 document.getElementById("detailGrid").innerHTML=`${summary}
 <div class="progress-meta"><span>Weekly Progression</span><select id="progressCompare"><option>W37 2026 vs W36 2026</option><option>W36 2026 vs W35 2026</option></select></div>
 <div class="detail-section"><div class="detail-section-title">CLASS</div><div class="class-line"><span>Job Class <b>${p.job}</b></span><span>Role <b>${p.role}</b></span></div></div>
 <div class="detail-section"><div class="detail-section-title">OFFENSE</div><div class="progress-grid">
 ${row('PATK',p.patk,d('patk'))}${row('MATK',p.matk,d('matk'))}
 ${row('Ignore PDEF',p.ignorePdef,d('ignorePdef'))}${row('Ignore MDEF',p.ignoreMdef,d('ignoreMdef'))}
 ${row('DMG vs Demi-human %',p.demiDmg,d('demiDmg'))}${row('DMG vs Medium %',p.mediumDmg,d('mediumDmg'))}
 ${row('Physical DMG %',p.pdmg,d('pdmg'))}${row('Magic DMG %',p.mdmg,d('mdmg'))}
 ${row('PVP DMG',p.pvpBonus,d('pvpBonus'))}
 </div></div>
 <div class="detail-section"><div class="detail-section-title">DEFENSE</div><div class="progress-grid">
 ${row('HP',p.hp,d('hp'),'hp-stat-row')}${row('Raw PDEF',p.basePdef,d('basePdef'))}${row('Raw MDEF',p.baseMdef,d('baseMdef'))}
 ${row('Phys. DMG Reduc. %',p.pdmgReduction,d('pdmgReduction'))}${row('Magic DMG Reduc. %',p.mdmgReduction,d('mdmgReduction'))}
 ${row('Reduc. vs Demi-human %',p.demiReduction,d('demiReduction'))}${row('Reduc. vs Medium %',p.mediumReduction,d('mediumReduction'))}
 ${row('Healing Done %',p.healingDone,d('healingDone'))}${row('Healing Taken %',p.healingTaken,d('healingTaken'))}
 ${row('Crit Res',p.critRes,d('critRes'))}${row('Crit DMG Res %',p.critDmgRes,d('critDmgRes'))}${row('PVP Reduction',p.pvpReduction,d('pvpReduction'))}
 </div></div>
 <div class="detail-section"><div class="detail-section-title">SPECIAL STATS</div><div class="progress-grid">
 ${row('Equipment PDEF %',p.equipPdef,d('equipPdef'))}${row('Equipment MDEF %',p.equipMdef,d('equipMdef'))}${row('CRI',p.cri,d('cri'))}
 </div></div>
 <div class="detail-section"><div class="detail-section-title">LATEST STATS SUBMISSION</div>${statsSubmissionAdminHtml(p)}</div>
 ${playerDetailGallery(p)}
 <div class="detail-section"><div class="detail-section-title">WEEKLY HISTORY</div><div class="history-list">${(p.weeklySnapshots||[]).slice().sort((a,b)=>Number(b.week||0)-Number(a.week||0)).map((snap,idx,arr)=>{const prev=arr[idx+1];const patkDelta=prev?Number(snap.patk||0)-Number(prev.patk||0):0;return `<div class="history-row"><div><b>Week ${snap.week}</b><small>${snap.weekStart&&snap.weekEnd?formatWeekRange({start:new Date(snap.weekStart),end:new Date(snap.weekEnd)}):new Date(snap.savedAt).toLocaleDateString()}</small></div><div><span>PATK ${fmt(snap.patk)}</span><span>Raw PDEF ${fmt(snap.rawPdef)}</span><span>Raw MDEF ${fmt(snap.rawMdef)}</span></div><div class="history-deltas">${prev?delta(snap.patk,patkDelta):'<span class="delta neutral">Initial</span>'}</div></div>`}).join('')||'<p class="hint">No weekly submissions yet.</p>'}</div></div>`;
 document.getElementById("rosterListContent")?.classList.add("hidden");
 document.getElementById("modal").classList.remove("hidden");
}
function hideModal(){document.getElementById("modal").classList.add("hidden");document.getElementById("rosterListContent")?.classList.remove("hidden");}function closeModal(e){if(e.target.id==="modal")hideModal();}
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&!document.getElementById("login").classList.contains("hidden"))login();});

/* Party Setup / GL + WoE publisher */
const PARTY_JOBS=["Lord Knight","Paladin","Assassin","Stalker","Sniper","Bard","Gypsy","High Wizard","Professor","Biochemist","Mastersmith","High Priest","Asura","Gunslinger","Summoner"];
const PARTY_LAYOUTS={
 GL:{leftTitle:"MAIN",rightTitle:"SUB-FIELD",left:[['ALPHA',3],['BRAVO',3],['CHARLIE',2]],right:[['DELTA',3],['ECHO',3],['FOX',2]]},
 WOE:{leftTitle:"RAID PT1 - DEFEND",rightTitle:"RAID PT2",left:[['ALPHA',3],['BRAVO',3],['CHARLIE',2]],right:[['DELTA- BREAKER',4],['RAID PT 3 - ECHO',4]]}
};
function partyActivePlayers(){
 return players.filter(p=>String(p.accountType||'Member').toLowerCase()!=='admin' && String(p.status||'Active')==='Active');
}
function partyPlayerOptions(jobFilter='', current=''){
 const wanted=String(jobFilter||'').trim();
 const list=partyActivePlayers().filter(p=>!wanted || String(p.job||'').trim()===wanted);
 return '<option value="">Select member</option>'+list.map(p=>`<option value="${p.ign}" ${p.ign===current?'selected':''}>${p.ign}</option>`).join('');
}
function refreshPartyMemberOptions(changedSelect=null){
 const selects=[...document.querySelectorAll('#partyBoard .member-select')];
 const seen=new Set();
 // Remove any duplicates already present: first assignment wins.
 selects.forEach(sel=>{
   const current=sel.value;
   if(current && seen.has(current)){
     sel.value='';
     const job=sel.closest('.team-row')?.querySelector('.job-select');
     if(job){ job.innerHTML=partyJobOptions(); job.value=''; applyPartyJobColor(job); }
   } else if(current){
     seen.add(current);
   }
 });
 const chosen=new Set(selects.map(s=>s.value).filter(Boolean));
 selects.forEach(sel=>{
   const current=sel.value;
   const job=sel.closest('.team-row')?.querySelector('.job-select');
   const jobFilter=job?.value||'';
   sel.innerHTML=partyPlayerOptions(jobFilter,current);
   [...sel.options].forEach(opt=>{
     if(opt.value && opt.value!==current && chosen.has(opt.value)) opt.disabled=true;
   });
   // If the selected class no longer matches the selected member, clear the member.
   if(current && jobFilter){
     const player=partyActivePlayers().find(p=>p.ign===current);
     if(player && String(player.job||'').trim()!==String(jobFilter).trim()){
       sel.value='';
     }
   }
 });
 updatePartyCapacities();
}
function filterPartyMembersByJob(jobSelect){
 const row=jobSelect?.closest('.team-row');
 const member=row?.querySelector('.member-select');
 if(!member)return;
 const wanted=String(jobSelect.value||'').trim();
 const current=member.value;
 const player=current ? partyActivePlayers().find(p=>p.ign===current) : null;
 // If a class is chosen and the current member is not that class, clear the member.
 if(wanted && player && String(player.job||'').trim()!==wanted){
   member.value='';
 }
 refreshPartyMemberOptions(member);
}

function partyJobOptions(selected=''){return '<option value="">Job Class</option>'+PARTY_JOBS.map(j=>`<option ${j===selected?'selected':''} value="${j}">${j}</option>`).join('');}
function applyPartyJobColor(sel){
 const job=sel?.value||'';
 const colors={"Lord Knight":'#e9766b',"High Wizard":'#1474bf',"Sniper":'#4a3005',"Gunslinger":'#1474bf',"Mastersmith":'#ff8500',"Stalker":'#bda6dc',"Assassin":'#ef00a9',"Professor":'#13aee7',"Summoner":'#ef00c8',"Asura":'#ef00c8',"Paladin":'#ff9d39',"Biochemist":'#ffab36',"Bard":'#e0bd55',"Gypsy":'#00d9bf',"High Priest":'#087548'};
 const light=['High Wizard','Sniper','Gunslinger','Stalker','Assassin','Professor','Summoner','Asura','High Priest'];
 sel.style.backgroundColor=colors[job]||'#fff';
 sel.style.color=light.includes(job)?'#fff':'#111';
 sel.style.fontWeight=job?'700':'400';
}

const PARTY_SETUP_STORAGE_KEY='redserpentPublishedPartySetup';
function getPublishedPartySetup(){
 try{const raw=localStorage.getItem(PARTY_SETUP_STORAGE_KEY);const obj=raw?JSON.parse(raw):{};return obj&&typeof obj==='object'&&!Array.isArray(obj)?obj:{};}catch(e){return {};}
}
function savePublishedPartySetup(type,date,data){
 try{
   const store=getPublishedPartySetup();
   store[type]={type,date:date||'',publishedAt:new Date().toISOString(),sides:data};
   localStorage.setItem(PARTY_SETUP_STORAGE_KEY,JSON.stringify(store));
   return true;
 }catch(e){console.warn('Party setup save failed.',e);return false;}
}
function loadPublishedPartySetup(type){
 const store=getPublishedPartySetup();
 return store[type]||null;
}
function applyPublishedPartySetup(setup){
 if(!setup||!Array.isArray(setup.sides))return;
 const rows=[];
 setup.sides.forEach(side=>side.groups?.forEach(group=>group.teams?.forEach(team=>team.rows?.forEach(row=>rows.push(row)))));
 const domRows=[...document.querySelectorAll('#partyBoard .team-row')];
 domRows.forEach((row,i)=>{
   const saved=rows[i]||{};
   const member=row.querySelector('.member-select'), job=row.querySelector('.job-select');
   if(job){job.innerHTML=partyJobOptions(saved.job||'');job.value=saved.job||'';applyPartyJobColor(job);}
   if(member)member.value='';
 });
 refreshPartyMemberOptions();
 domRows.forEach((row,i)=>{
   const saved=rows[i]||{};
   const member=row.querySelector('.member-select');
   if(member && saved.ign){
     const opt=[...member.options].find(o=>o.value===saved.ign);
     if(opt)member.value=saved.ign;
   }
 });
 refreshPartyMemberOptions();
 updatePartyCapacities();
}
function renderPartySetup(){
 const board=document.getElementById('partyBoard'); if(!board)return;
 const type=document.getElementById('eventType')?.value||'GL', layout=PARTY_LAYOUTS[type];
 const side=(title,groups,kind)=>`<section class="event-side ${kind}"><h3>${title}</h3>${groups.map(([g,n])=>`<div class="group-block"><div class="group-title">${g}</div><div class="team-grid ${n===2?'teams2':''}">${Array.from({length:n},(_,ti)=>`<div class="team"><div class="team-name"><span class="team-name-label">TEAM ${ti+1}</span><span class="party-capacity">0/5</span></div>${Array.from({length:5},(_,ri)=>`<div class="team-row"><select class="member-select" data-group="${g}" data-team="${ti+1}" data-slot="${ri+1}" onchange="autoPartyJob(this); refreshPartyMemberOptions(this)">${partyPlayerOptions()}</select><select class="job-select" data-group="${g}" data-team="${ti+1}" data-slot="${ri+1}" onchange="applyPartyJobColor(this); filterPartyMembersByJob(this)">${partyJobOptions()}</select></div>`).join('')}</div>`).join('')}</div></div>`).join('')}</section>`;
 board.innerHTML=`<div class="event-board">${side(layout.leftTitle,layout.left,'main')}${side(layout.rightTitle,layout.right,'sub')}</div><div class="publish-hint"><b>Admin Only:</b> assign members and job classes here. <b>Publish Setup</b> generates the JPEG roster sheet.</div>`;
 board.querySelectorAll('.job-select').forEach(applyPartyJobColor);
 refreshPartyMemberOptions();
 applyPublishedPartySetup(loadPublishedPartySetup(type));
 updatePartyCapacities();
}
function updatePartyCapacities(){
 document.querySelectorAll('#partyBoard .team').forEach(team=>{
  const count=[...team.querySelectorAll('.member-select')].filter(s=>s.value).length;
  const badge=team.querySelector('.party-capacity');if(!badge)return;
  badge.textContent=`${count}/5`;badge.classList.toggle('full',count===5);badge.classList.toggle('empty',count===0);
 });
}
function autoPartyJob(sel){
 const row=sel.closest('.team-row'), job=row?.querySelector('.job-select'), p=players.find(x=>x.ign===sel.value);
 if(!job) return;
 const selectedJob=String(p?.job||'').trim();
 if(selectedJob){
   // Once a member is selected, only that member's class is available.
   job.innerHTML=`<option value="${selectedJob.replace(/\"/g,'&quot;')}">${selectedJob}</option>`;
   job.value=selectedJob;
 }else{
   job.innerHTML=partyJobOptions();
   job.value='';
 }
 applyPartyJobColor(job);
}

function jobColor(job){
 const colors={"Lord Knight":"#e9766b","High Wizard":"#1474bf","Sniper":"#4a3005","Gunslinger":"#1474bf","Mastersmith":"#ff8500","Stalker":"#bda6dc","Assassin":"#ef00a9","Professor":"#13aee7","Summoner":"#ef00c8","Asura":"#ef00c8","Paladin":"#ff9d39","Biochemist":"#ffab36","Bard":"#e0bd55","Gypsy":"#00d9bf","High Priest":"#087548"}; return colors[job]||'#dddddd';
}
function collectParty(){
 const result=[]; document.querySelectorAll('#partyBoard .team').forEach(team=>{const name=team.querySelector('.team-name-label')?.textContent||team.querySelector('.team-name')?.textContent||''; const rows=[...team.querySelectorAll('.team-row')].map(r=>({ign:r.querySelector('.member-select')?.value||'',job:r.querySelector('.job-select')?.value||''})); result.push({team:name,rows});}); return result;
}
function publishPartyJPEG(){
 if(!confirm('Publish this Party Setup as a JPEG?')) return;
 const type=document.getElementById('eventType')?.value||'GL', layout=PARTY_LAYOUTS[type], date=document.getElementById('partyDate')?.value||'';
 const board=document.getElementById('partyBoard'); if(!board)return;
 const sides=[...board.querySelectorAll('.event-side')];
 const data=sides.map(side=>({title:side.querySelector('h3')?.textContent||'',groups:[...side.querySelectorAll('.group-block')].map(g=>({name:g.querySelector('.group-title')?.textContent||'',teams:[...g.querySelectorAll('.team')].map(t=>({name:t.querySelector('.team-name-label')?.textContent||t.querySelector('.team-name')?.textContent||'',rows:[...t.querySelectorAll('.team-row')].map(r=>({ign:r.querySelector('.member-select')?.value||'',job:r.querySelector('.job-select')?.value||''}))}))}))}));
 if(!savePublishedPartySetup(type,date,data)){alert('Party Setup could not be saved. The JPEG will still be generated.');}
 const c=document.createElement('canvas'),ctx=c.getContext('2d'); c.width=1800;c.height=1050;
 ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.font='bold 30px Arial';ctx.fillStyle='#111';
 ctx.textAlign='center';ctx.fillText(type==='GL'?'GUILD LEAGUE':'WAR OF EMPERIUM',900,30);
 const pad=16, gap=70, sideW=(c.width-pad*2-gap)/2, top=45;
 function drawSide(side,x,headerColor){
   ctx.fillStyle=headerColor;ctx.fillRect(x,top,sideW,42);ctx.fillStyle='#fff';ctx.font='bold 25px Arial';ctx.fillText(side.title,x+sideW/2,top+29);
   let y=top+42;
   side.groups.forEach(group=>{
     const cols=group.teams.length, tw=sideW/cols, gh=32, rh=25; const h=gh+5*rh+26;
     ctx.fillStyle='#cfcfcf';ctx.fillRect(x,y,sideW,h);ctx.strokeStyle='#555';ctx.strokeRect(x,y,sideW,h);
     ctx.fillStyle='#111';ctx.font='bold 22px Georgia';ctx.fillText(group.name,x+sideW/2,y+23); y+=gh;
     group.teams.forEach((team,ti)=>{
       const tx=x+ti*tw;ctx.fillStyle='#e7d36b';ctx.fillRect(tx,y,tw,22);ctx.fillStyle='#111';ctx.font='bold 12px Georgia';ctx.fillText(team.name,tx+tw/2,y+16);
       team.rows.forEach((r,ri)=>{const yy=y+22+ri*rh;ctx.fillStyle=ri%2?'#e6eee2':'#eef3ec';ctx.fillRect(tx,yy,tw,rh);ctx.strokeStyle='#999';ctx.strokeRect(tx,yy,tw,rh);ctx.textAlign='left';ctx.fillStyle='#111';ctx.font='13px Arial';ctx.fillText(r.ign||'',tx+4,yy+17);ctx.textAlign='right';const pillW=Math.min(110,tw*.43);ctx.fillStyle=jobColor(r.job);ctx.beginPath();ctx.roundRect(tx+tw-pillW-5,yy+3,pillW,rh-6,8);ctx.fill();ctx.fillStyle=(r.job==='High Priest'||r.job==='High Wizard'||r.job==='Sniper'||r.job==='Gunslinger'||r.job==='Stalker'||r.job==='Assassin'||r.job==='Professor'||r.job==='Summoner'||r.job==='Asura')?'#fff':'#111';ctx.font='11px Arial';ctx.fillText(r.job||'',tx+tw-10,yy+17);});
       ctx.textAlign='center';
     });
     y+=22+5*rh;
     y+=8;
   });
 }
 drawSide(data[0],pad,type==='GL'?'#ff0808':'#4285e8'); drawSide(data[1],pad+sideW+gap,type==='GL'?'#62a34b':'#d60000');
 ctx.fillStyle='#111';ctx.font='bold 28px Arial';ctx.textAlign='center';ctx.fillText('PLEASE BE ONLINE @ 8:30 PM',900,1008);
 ctx.font='14px Arial';ctx.fillStyle='#555';ctx.fillText(date?`Published: ${date}`:'',900,1032);
 const link=document.createElement('a');link.download=`RedSerpent-${type==='GL'?'GL':'WoE'}-${date||'setup'}.jpg`;link.href=c.toDataURL('image/jpeg',0.94);link.click();
 document.getElementById('partyStatus').textContent='PUBLISHED';
}
window.addEventListener('DOMContentLoaded',()=>{renderPartySetup();document.getElementById('publishPartyBtn')?.addEventListener('click',publishPartyJPEG);});

/* Admin-only member management (prototype/localStorage). No public registration. */
const ADMIN_USERNAME='admin', DEFAULT_ADMIN_PASSWORD='redserpent123', MASTER_PASSWORD_KEY='redserpentMasterPassword';
function getMasterAdminPassword(){ return localStorage.getItem(MASTER_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD; }
function isMasterAdminSession(){
  try{ const s=JSON.parse(getStoredSession()||'null'); return !!(adminMode && s?.type==='master-admin' && s?.id==='master-admin'); }catch(e){ return !!(adminMode && currentPlayerId==='master-admin'); }
}
let adminMode=false, editIndex=null, currentPlayerIndex=0, currentPlayerId="", currentPlayerUid="", currentPlayerIgn="", currentPlayer=null, statsDirty=false;
function adminJobs(role){return role==='Carry'?DPS_JOBS:role==='Support'?SUPPORT_JOBS:ALL_JOBS;}
function refreshAdminJob(){const s=document.getElementById('newJob');if(!s)return;const role=document.getElementById('newRole').value,current=s.value;s.innerHTML=adminJobs(role).map(j=>`<option>${j}</option>`).join('');if(adminJobs(role).includes(current))s.value=current;}
/* === Guild Announcements === */
const DEFAULT_ANNOUNCEMENTS=[
  {id:'ann-1',title:'Weekly Submission Reminder',message:"Don't forget to submit your progression before the week closes on Sunday at midnight.",type:'reminder',createdAt:'2026-09-13T00:00:00'},
  {id:'ann-2',title:'Guild Meeting',message:'Meeting this Sunday 8:00 PM (Discord). Attendance is appreciated.',type:'event',createdAt:'2026-09-10T00:00:00'},
  {id:'ann-3',title:'Party Setup',message:'Check the latest published party configuration.',type:'party',createdAt:'2026-09-08T00:00:00'}
];
let editingAnnouncementId=null;
function getAnnouncements(){try{const raw=localStorage.getItem('redserpentAnnouncements');if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed))return parsed;}}catch(e){} localStorage.setItem('redserpentAnnouncements',JSON.stringify(DEFAULT_ANNOUNCEMENTS));return DEFAULT_ANNOUNCEMENTS.slice();}
function saveAnnouncements(list){localStorage.setItem('redserpentAnnouncements',JSON.stringify(list));}
function announcementIcon(type){return type==='event'?'▣':type==='party'?'▤':type==='info'?'ⓘ':'📢';}
function announcementClass(type){return type==='event'||type==='party'?'neutral':'';}
function formatAnnouncementDate(value){const d=new Date(value);if(Number.isNaN(d.getTime()))return '—';return d.toLocaleDateString(undefined,{month:'short',day:'2-digit',year:'numeric'});}
function renderMemberAnnouncements(){const root=document.getElementById('memberAnnouncementsList');if(!root)return;const list=getAnnouncements().slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);root.innerHTML=list.length?list.map(a=>`<button type="button" class="announcement-row announcement-clickable" onclick="openAnnouncementDetail('${a.id}')"><span class="announcement-icon ${announcementClass(a.type)}">${announcementIcon(a.type)}</span><span class="announcement-row-copy"><b>${escHtml(a.title)}</b><p>${escHtml(a.message)}</p></span><time>${formatAnnouncementDate(a.createdAt)}</time><i class="${a.type==='reminder'?'':'neutral'}"></i></button>`).join(''):'<div class="announcement-empty">No announcements yet.</div>'; }
function openAnnouncementEditor(id=null){if(!isAdminSession())return;editingAnnouncementId=id;const item=id?getAnnouncements().find(a=>a.id===id):null;document.getElementById('announcementEditorTitle').textContent=item?'Edit Announcement':'Add Announcement';document.getElementById('announcementTitleInput').value=item?.title||'';document.getElementById('announcementMessageInput').value=item?.message||'';document.getElementById('announcementTypeInput').value=item?.type||'reminder';document.getElementById('announcementEditorModal').classList.remove('hidden');}
function closeAnnouncementEditor(){document.getElementById('announcementEditorModal')?.classList.add('hidden');editingAnnouncementId=null;}
function saveAnnouncement(){const title=document.getElementById('announcementTitleInput').value.trim();const message=document.getElementById('announcementMessageInput').value.trim();const type=document.getElementById('announcementTypeInput').value;if(!title||!message){alert('Please enter a title and message.');return;}const list=getAnnouncements();if(editingAnnouncementId){const item=list.find(a=>a.id===editingAnnouncementId);if(item){item.title=title;item.message=message;item.type=type;}}else list.push({id:'ann-'+Date.now(),title,message,type,createdAt:new Date().toISOString()});saveAnnouncements(list);closeAnnouncementEditor();renderAdminDashboard();renderMemberAnnouncements();}
function deleteAnnouncement(id){if(!isAdminSession())return;const item=getAnnouncements().find(a=>a.id===id);if(!item)return;if(!confirm(`Delete “${item.title}”?`))return;saveAnnouncements(getAnnouncements().filter(a=>a.id!==id));renderAdminDashboard();renderMemberAnnouncements();}
let announcementListFilter='all';
function setAnnouncementFilter(filter){announcementListFilter=filter;document.querySelectorAll('.ann-filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));renderAnnouncementsListModal();}
function openAnnouncementsListModal(){if(!document.getElementById('announcementsListModal'))return;announcementListFilter='all';const admin=isAdminSession();const addBtn=document.querySelector('.ann-list-add');if(addBtn)addBtn.classList.toggle('hidden',!admin);document.querySelectorAll('.ann-filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));renderAnnouncementsListModal();document.getElementById('announcementsListModal').classList.remove('hidden');}
function closeAnnouncementsListModal(){document.getElementById('announcementsListModal')?.classList.add('hidden');}
function renderAnnouncementsListModal(){const root=document.getElementById('announcementsListContent');if(!root)return;const admin=isAdminSession();let list=getAnnouncements().slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));if(announcementListFilter!=='all')list=list.filter(a=>a.type===announcementListFilter);const count=document.getElementById('announcementsListCount');if(count)count.textContent=`${list.length} Announcement${list.length===1?'':'s'}`;root.innerHTML=list.length?list.map((a,i)=>{const actions=admin?`<div class="ann-list-actions"><button type="button" onclick="event.stopPropagation();closeAnnouncementsListModal();openAnnouncementEditor('${a.id}')">✎ Edit</button><button type="button" class="danger" onclick="event.stopPropagation();deleteAnnouncement('${a.id}');renderAnnouncementsListModal()">▣ Delete</button></div>`:`<div class="ann-list-read-more">Read full →</div>`;return `<article class="ann-list-item ${admin?'':'member-readable'}" onclick="openAnnouncementDetail('${a.id}')"><div class="ann-list-number">${i+1}</div><div class="ann-list-type-icon ${a.type}">${announcementIcon(a.type)}</div><div class="ann-list-copy"><div class="ann-list-title-row"><h3>${escHtml(a.title)}</h3><span class="ann-type-badge ${a.type}">${a.type==='party'?'Important':a.type==='info'?'Update':a.type.charAt(0).toUpperCase()+a.type.slice(1)}</span></div><p>${escHtml(a.message)}</p></div><div class="ann-list-date"><b>${formatAnnouncementDate(a.createdAt)}</b><small>${new Date(a.createdAt).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</small></div>${actions}</article>`;}).join(''):'<div class="announcement-empty large">No announcements in this category.</div>'; }

function openAnnouncementDetail(id){const item=getAnnouncements().find(a=>a.id===id);if(!item)return;const modal=document.getElementById('announcementDetailModal');if(!modal)return;document.getElementById('announcementDetailType').textContent=item.type==='party'?'Important':item.type==='info'?'Update':item.type.charAt(0).toUpperCase()+item.type.slice(1);document.getElementById('announcementDetailTitle').textContent=item.title;document.getElementById('announcementDetailMessage').textContent=item.message;document.getElementById('announcementDetailDate').textContent=formatAnnouncementDate(item.createdAt);document.getElementById('announcementDetailTime').textContent=new Date(item.createdAt).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});modal.classList.remove('hidden');}
function closeAnnouncementDetail(){document.getElementById('announcementDetailModal')?.classList.add('hidden');}
function viewAllAnnouncements(){openAnnouncementsListModal();}
function renderAdminAnnouncements(){const root=document.getElementById('adminAnnouncementsList');if(!root)return;const list=getAnnouncements().slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);root.innerHTML=list.length?list.map(a=>`<div class="admin-announcement-row"><span>${announcementIcon(a.type)}</span><div><b>${escHtml(a.title)}</b><small>${escHtml(a.message)}</small></div><time>${formatAnnouncementDate(a.createdAt)}</time><div class="admin-announcement-actions"><button type="button" onclick="openAnnouncementEditor('${a.id}')">Edit</button><button type="button" class="danger" onclick="deleteAnnouncement('${a.id}')">Delete</button></div></div>`).join(''):'<div class="announcement-empty">No announcements yet. Click + Add Announcement to create one.</div>'; }

function renderAdminDashboard(){
  adminLiveSignature=getMemberDataSignature();
  const root=document.getElementById('adminDashboardContent');
  if(!root)return;
  const memberView=document.getElementById('memberDashboardContent');
  if(memberView){memberView.classList.add('hidden');memberView.style.display='none';}
  root.classList.remove('hidden');
  root.style.display='grid';
  const current=seasonWeekInfo();
  const makeWeeks=()=>Array.from({length:5},(_,i)=>{const w=i+1,start=new Date(SEASON_START);start.setDate(start.getDate()+(w-1)*7);const end=new Date(start);end.setDate(end.getDate()+6);end.setHours(23,59,59,999);return {week:w,key:`S${w}`,start,end};});
  const weeks=TEST_SUBMISSION_MODE?makeWeeks():getAvailableSeasonWeeks();
  let selected=Number(localStorage.getItem('redserpentAdminDashboardWeek')||current.week||1);
  if(!weeks.some(w=>w.week===selected))selected=weeks[weeks.length-1]?.week||1;
  const info=weeks.find(w=>w.week===selected)||weeks[0];
  if(!info)return;
  const members=players.filter(p=>!isAdminAccount(p));
  const eligible=members.filter(p=>String(p.status||'Active')!=='Inactive');
  const submitted=eligible.filter(p=>getWeekSnapshot(p,info.key));
  const missing=eligible.filter(p=>!getWeekSnapshot(p,info.key));
  const percent=eligible.length?Math.round(submitted.length/eligible.length*100):0;
  const now=new Date(),open=isWeeklySubmissionWindow(now) && seasonWeekInfo(now).key===info.key;
  const weekOptions=weeks.map(w=>`<option value="${w.week}" ${w.week===info.week?'selected':''}>Week ${w.week} — ${formatWeekRange(w)}</option>`).join('');
  const missingNames=missing.slice(0,6).map(p=>escHtml(p.ign)).join(' • ')+(missing.length>6?` • +${missing.length-6} more`:'');
  const statusRows=members.map((p,idx)=>{const snap=getWeekSnapshot(p,info.key),inactive=String(p.status||'Active')==='Inactive',status=inactive?'Inactive':snap?'Submitted':'Missing';return `<tr><td>${idx+1}</td><td><b>${escHtml(p.ign)}</b></td><td>${escHtml(p.role||'—')}</td><td>${escHtml(p.job||'—')}</td><td><span class="status-badge ${status.toLowerCase()}">${status}</span></td><td>${snap?new Date(snap.savedAt).toLocaleString():'—'}</td><td>${snap?`<button class="admin-action" onclick="viewWeeklySubmission('${String(p.id)}','${info.key}')">View</button>`:'—'}</td></tr>`}).join('');
  root.innerHTML=`<div class="portal-banner admin-portal-banner"><div><p>ONE GUILD • ONE GOAL</p><strong>REDSERPENT</strong><span>MEMBER MANAGEMENT PORTAL</span></div></div>
  <section class="admin-alert ${missing.length?'has-missing':'all-clear'}"><div class="admin-alert-icon">${missing.length?'!':'✓'}</div><div class="admin-alert-copy"><span>WEEKLY SUBMISSION ALERT</span><b>${missing.length?`${missing.length} Member${missing.length===1?'':'s'} haven't submitted yet.`:'All eligible members have submitted.'}</b><small>${missing.length?missingNames:'No missing submissions for this week.'}</small></div>${missing.length?`<button class="admin-alert-btn" type="button" onclick="showPage('weekly',document.getElementById('weeklyNav'))">View Missing Members →</button>`:''}</section>
  <section class="admin-dash-panel"><div class="admin-dash-panel-head"><div><span class="admin-dash-icon">▣</span><h2>Submission Overview</h2></div><select class="top-select admin-dash-week" onchange="localStorage.setItem('redserpentAdminDashboardWeek',this.value);renderAdminDashboard()">${weekOptions}</select></div><div class="admin-overview-grid"><div class="admin-overview-card submitted"><strong>${submitted.length} / ${eligible.length}</strong><span>Submitted</span><small>${percent}% Complete</small><i><em style="width:${percent}%"></em></i></div><div class="admin-overview-card missing"><strong>${missing.length}</strong><span>Missing</span><small>${100-percent}% Remaining</small></div><div class="admin-overview-card remaining"><strong>${open?'OPEN':'CLOSED'}</strong><span>Submission Window</span><small>${open?'Monday – Sunday':'Week ended • Next week opens Monday'}</small></div><div class="admin-overview-card total"><strong>${eligible.length}</strong><span>Total Members</span><small>Active guild roster</small></div></div></section>
  <div class="admin-dash-two-col"><section class="admin-dash-panel admin-status-panel"><div class="admin-dash-panel-head"><div><span class="admin-dash-icon">▤</span><h2>Submission Status</h2></div><button class="text-link" type="button" onclick="showPage('weekly',document.getElementById('weeklyNav'))">View All →</button></div><div class="table-wrap admin-dash-table"><table><thead><tr><th>#</th><th>IGN</th><th>ROLE</th><th>JOB CLASS</th><th>STATUS</th><th>SUBMITTED</th><th>ACTION</th></tr></thead><tbody>${statusRows||'<tr><td colspan="7">No members found.</td></tr>'}</tbody></table></div></section>
  <section class="admin-dash-panel admin-announcements"><div class="admin-dash-panel-head"><div><span class="admin-dash-icon">⚑</span><h2>Announcements</h2></div><div class="admin-announcement-head-actions"><button class="text-link" type="button" onclick="viewAllAnnouncements()">View All →</button><button class="admin-add-announcement" type="button" onclick="openAnnouncementEditor()">＋ Add Announcement</button></div></div><div id="adminAnnouncementsList"></div></section></div>
  <section class="admin-dash-panel admin-quick-panel"><div class="admin-dash-panel-head"><div><span class="admin-dash-icon">⚡</span><h2>Quick Actions</h2></div></div><div class="admin-quick-grid"><button type="button" onclick="showPage('weekly',document.getElementById('weeklyNav'))"><b>▣ Weekly Submissions</b><small>View and manage submissions</small></button><button type="button" onclick="showPage('party',document.getElementById('partyNav'))"><b>♟ Party Setup</b><small>Manage party configurations</small></button><button type="button" onclick="showPage('rosters',document.querySelector('[data-page=rosters]'))"><b>♟ Roster</b><small>View and manage members</small></button><button type="button" onclick="showPage('admin',document.getElementById('adminNav'))"><b>＋ Member Management</b><small>Create and manage members</small></button></div></section>`;
  renderAdminAnnouncements();
}

function renderAdmin(){
 const b=document.getElementById('adminBody');if(!b)return;const q=(document.getElementById('adminSearch')?.value||'').toLowerCase();
 const rows=players.map((p,i)=>({p,i})).filter(x=>(x.p.ign||'').toLowerCase().includes(q)||(x.p.uid||'').toLowerCase().includes(q));
 b.innerHTML=rows.map(x=>`<tr><td><b>${x.p.ign}</b></td><td>${x.p.uid||'—'}</td><td class="role">${x.p.role}</td><td>${x.p.job}</td><td><span class="status-badge ${String(x.p.status||'Active').toLowerCase().replace(/\s+/g,'-')} ">${x.p.status||'Active'}</span></td><td>${x.p.memberSince||'—'}</td><td><button class="admin-action" onclick="openEditor(${x.i})">Edit</button><button class="admin-action" onclick="toggleStatus(${x.i})">${x.p.status==='Inactive'?'Activate':'Disable'}</button><button class="admin-action danger" onclick="removeMember(${x.i})">Remove</button></td></tr>`).join('');
 const members=players.filter(p=>!isAdminAccount(p));
 document.getElementById('adminTotal').textContent=members.length;document.getElementById('adminActive').textContent=members.filter(p=>String(p.status||'Active')==='Active').length;document.getElementById('adminInactive').textContent=members.filter(p=>String(p.status||'Active')==='Inactive').length;
 renderWeeklyAdmin();
}
function getAvailableSeasonWeeks(){
 const now=seasonWeekInfo(), max=Math.max(1,now.week||1), weeks=[];
 for(let w=max;w>=1;w--){const start=new Date(SEASON_START);start.setDate(start.getDate()+(w-1)*7);const end=new Date(start);end.setDate(end.getDate()+6);end.setHours(23,59,59,999);weeks.push({week:w,key:`S${w}`,start,end});}
 return weeks;
}
function renderWeeklyAdmin(){
 const sel=document.getElementById('weeklyAdminWeek'), body=document.getElementById('weeklyAdminBody'); if(!sel||!body)return;
 const weeks=getAvailableSeasonWeeks(), current=seasonWeekInfo();
 if(!sel.options.length || !weeks.some(w=>w.key===sel.value)){sel.innerHTML=weeks.map(w=>`<option value="${w.key}">Week ${w.week} — ${formatWeekRange(w)}</option>`).join('');sel.value=current.key;}
 const info=weeks.find(w=>w.key===sel.value)||weeks[0];
 const members=players.filter(p=>!isAdminAccount(p)), eligible=members.filter(p=>String(p.status||'Active')!=='Inactive');
 const submitted=eligible.filter(p=>getWeekSnapshot(p,info.key));
 document.getElementById('weeklyAdminTitle').textContent=`Week ${info.week}`;document.getElementById('weeklyAdminSubmitted').textContent=submitted.length;document.getElementById('weeklyAdminMissing').textContent=Math.max(0,eligible.length-submitted.length);document.getElementById('weeklyAdminRange').textContent=formatWeekRange(info);
 const now=new Date(), open=isWeeklySubmissionWindow(now) && seasonWeekInfo(now).key===info.key;document.getElementById('weeklyAdminWindow').textContent=open?'OPEN • MON–SUN':'CLOSED • WEEK ENDED';
 body.innerHTML=members.map(p=>{const snap=getWeekSnapshot(p,info.key), inactive=String(p.status||'Active')==='Inactive', status=inactive?'Inactive':snap?'Submitted':'Missing';return `<tr><td><b>${p.ign}</b></td><td>${p.role||'—'}</td><td>${p.job||'—'}</td><td><span class="status-badge ${status.toLowerCase()}">${status}</span></td><td>${snap?new Date(snap.savedAt).toLocaleString():'—'}</td><td>${snap?`<button class="admin-action" onclick="viewWeeklySubmission('${p.id}','${info.key}')">View</button>`:'—'}</td></tr>`}).join('');
}
let adminWeeklySubmissionPlayerId='';
let adminWeeklySubmissionWeekKey='';
let adminWeeklySubmissionTab='overview';
function escHtml(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function adminStatValue(snap,key){return snap&&snap[key]!=null?fmt(snap[key]):'—';}
function adminWeeklyWeekOptions(p,selected){
 const weeks=[];
 for(let i=1;i<=5;i++){
   const info=weeklyHistoryWeekInfo(i),snap=getWeekSnapshot(p,info.key),subs=p?.weeklyProgressionSubmissions?.[info.key]||{};
   if(snap||subs.astrocore||subs.enchant||subs.medal) weeks.push({week:i,key:info.key,label:`Week ${i} — ${formatWeekRange(info)}`});
 }
 if(!weeks.some(w=>w.key===selected)){const info=weeklyHistoryWeekInfo(Number(String(selected||'S1').replace('S',''))||1);weeks.push({week:info.week,key:info.key,label:`Week ${info.week} — ${formatWeekRange(info)}`});}
 weeks.sort((a,b)=>a.week-b.week);
 return weeks.map(w=>`<option value="${w.key}" ${w.key===selected?'selected':''}>${escHtml(w.label)}</option>`).join('');
}
function openAdminWeeklySubmission(id,weekKey){
 if(!adminMode)return;
 const p=players.find(x=>String(x.id)===String(id)); if(!p)return;
 adminWeeklySubmissionPlayerId=String(p.id);adminWeeklySubmissionWeekKey=weekKey||seasonWeekInfo().key;adminWeeklySubmissionTab='overview';
 const m=document.getElementById('adminWeeklySubmissionModal');if(!m)return;
 const sel=document.getElementById('adminWeeklyModalWeek');if(sel)sel.innerHTML=adminWeeklyWeekOptions(p,adminWeeklySubmissionWeekKey);
 m.classList.remove('hidden');renderAdminWeeklySubmission();
}
function closeAdminWeeklySubmission(){document.getElementById('adminWeeklySubmissionModal')?.classList.add('hidden');}
function selectAdminWeeklyTab(tab){adminWeeklySubmissionTab=tab;document.querySelectorAll('#adminWeeklyModalTabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));renderAdminWeeklySubmission();}
function adminWeeklySnapshot(p,key){return getWeekSnapshot(p,key);}
function adminWeeklySubmissionHasData(p,key){const snap=adminWeeklySnapshot(p,key),subs=p?.weeklyProgressionSubmissions?.[key]||{};return !!snap||!!subs.astrocore||!!subs.enchant||!!subs.medal;}
function renderAdminWeeklySubmission(){
 const p=players.find(x=>String(x.id)===String(adminWeeklySubmissionPlayerId));if(!p)return;
 const sel=document.getElementById('adminWeeklyModalWeek');if(sel&&sel.value)adminWeeklySubmissionWeekKey=sel.value;
 const key=adminWeeklySubmissionWeekKey,week=Number(String(key).replace(/^S/,''))||1,info=weeklyHistoryWeekInfo(week),snap=adminWeeklySnapshot(p,key),subs=p.weeklyProgressionSubmissions?.[key]||{};
 const member=document.getElementById('adminWeeklyModalMember');
 if(member)member.innerHTML=`<div class="admin-weekly-member-main"><div class="admin-weekly-avatar">${escHtml((p.ign||'M').charAt(0).toUpperCase())}</div><div><strong>${escHtml(p.ign||'—')}</strong><span>${escHtml(p.role||'—')} • ${escHtml(p.job||'—')}</span></div></div><div class="admin-weekly-member-meta"><div><label>SUBMISSION WEEK</label><strong>Week ${week}</strong><small>${escHtml(formatWeekRange(info))}</small></div><div><label>SUBMITTED</label><strong>${snap||subs.astrocore||subs.enchant?'Submitted':'No submission'}</strong><small>${escHtml(snap?.savedAt||subs.enchant?.savedAt||subs.astrocore?.savedAt||subs.medal?.savedAt?new Date(snap?.savedAt||subs.enchant?.savedAt||subs.astrocore?.savedAt||subs.medal?.savedAt).toLocaleString():'—')}</small></div></div>`;
 const status=document.getElementById('adminWeeklyModalStatus');if(status)status.textContent=adminWeeklySubmissionHasData(p,key)?'Historical snapshot • read only':'No saved submission for this week.';
 const host=document.getElementById('adminWeeklyModalContent');if(!host)return;
 if(adminWeeklySubmissionTab==='overview')host.innerHTML=adminWeeklyOverview(snap,subs,week,p);
 else if(adminWeeklySubmissionTab==='feather')host.innerHTML=adminWeeklyFeather(snap,week);
 else if(adminWeeklySubmissionTab==='astrocore')host.innerHTML=adminWeeklyAstro(subs.astrocore,week);
 else if(adminWeeklySubmissionTab==='enchant')host.innerHTML=adminWeeklyEnchant(subs.enchant,week);
 else if(adminWeeklySubmissionTab==='medal')host.innerHTML=adminWeeklyMedal(subs.medal,week);
 else host.innerHTML=adminWeeklyScreenshots(snap,subs);
}
function adminWeeklyEmpty(icon,title,text){return `<div class="admin-weekly-empty"><span>${icon}</span><strong>${escHtml(title)}</strong><small>${escHtml(text)}</small></div>`;}
function adminWeeklyStatGrid(snap){
 const fields=[['HP','hp'],['PATK','patk'],['MATK','matk'],['Raw PDEF','rawPdef'],['Raw MDEF','rawMdef'],['PVP Damage','pvpBonus'],['Ignore PDEF','ignorePdef'],['Ignore MDEF','ignoreMdef'],['PDMG %','pdmg'],['MDMG %','mdmg'],['PVP DMG Reduction','pvpReduction'],['CRI','cri']];
 return `<div class="admin-weekly-stats-grid">${fields.map(([label,key])=>`<div><label>${label}</label><strong>${adminStatValue(snap,key)}</strong></div>`).join('')}</div>`;
}
function adminWeeklyOverview(snap,subs,week,p){
 if(!snap&&!subs.astrocore&&!subs.enchant&&!subs.medal)return adminWeeklyEmpty('📭',`No submission for Week ${week}`,'This member has not saved a weekly progression snapshot for this week.');
 const feather=snap?.totalFeatherCount!=null?Number(snap.totalFeatherCount):null,astro=progressAvg(subs.astrocore),enchant=enchantAvg(subs.enchant),medal=medalAvg(subs.medal);
 return `<div class="admin-weekly-overview-grid"><section class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>CHARACTER STATS</span><h3>Saved Stats Snapshot</h3></div><small>${snap?.savedAt?escHtml(new Date(snap.savedAt).toLocaleString()):'Not submitted'}</small></div>${snap?adminWeeklyStatGrid(snap):adminWeeklyEmpty('📊','No stats snapshot','No Character Stats snapshot was saved for this week.')}</section><section class="admin-weekly-section admin-weekly-highlight"><div class="admin-weekly-section-head"><div><span>🪶 FEATHER</span><h3>Total Feather Count</h3></div><small>${snap?.rows?.length||0}/10 rows</small></div><strong class="admin-weekly-big-number">${feather!=null?fmt(feather):'—'}</strong>${snap?`<div class="admin-weekly-mini-grid">${[['Time / Space','Time / Space'],['Divine / Nature','Divine / Nature'],['Day / Night','Day / Night'],['Sky / Terra','Sky / Terra'],['Light / Dark','Light / Dark']].map(([l,k])=>`<div><label>${l}</label><strong>${fmt(snap.categoryTotals?.[k]||0)}</strong></div>`).join('')}</div>`:''}</section><section class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>🔮 ASTROCORE</span><h3>Average Level</h3></div><small>${subs.astrocore?'6/6 recorded':'Not submitted'}</small></div><strong class="admin-weekly-big-number">${subs.astrocore?astro.toFixed(1):'—'}</strong></section><section class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>✨ ENCHANT</span><h3>Average Level</h3></div><small>${subs.enchant?`${subs.enchant.items?.length||0}/12 recorded`:'Not submitted'}</small></div><strong class="admin-weekly-big-number">${subs.enchant?enchant.toFixed(1):'—'}</strong></section><section class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>🏅 MEDAL</span><h3>Average Level</h3></div><small>${subs.medal?'8/8 recorded':'Not submitted'}</small></div><strong class="admin-weekly-big-number">${subs.medal?medal.toFixed(1):'—'}</strong></section></div>`;
}
function adminWeeklyFeather(snap,week){
 if(!snap)return adminWeeklyEmpty('🪶',`No Feather submission for Week ${week}`,'The member has no saved Feather snapshot for this week.');
 const cats=snap.categoryTotals||{};
 return `<div class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>🪶 FEATHER PROGRESSION</span><h3>Week ${week} • ${snap.rows?.length||0}/10 rows</h3></div><strong class="admin-weekly-big-number small">${fmt(snap.totalFeatherCount||0)}</strong></div><div class="admin-weekly-mini-grid wide">${[['Time / Space','Time / Space'],['Divine / Nature','Divine / Nature'],['Day / Night','Day / Night'],['Sky / Terra','Sky / Terra'],['Light / Dark','Light / Dark']].map(([l,k])=>`<div><label>${l}</label><strong>${fmt(cats[k]||0)}</strong></div>`).join('')}</div><div class="admin-weekly-feather-rows">${(snap.rows||[]).map(r=>`<div class="admin-weekly-feather-row"><div><b>${escHtml(r.side)} Row ${r.row}</b><small>${(r.feathers||[]).map(f=>`${escHtml(f.name)} T${escHtml(f.tier)}`).join(' • ')||'No detected feathers'}</small></div><strong>${fmt((r.feathers||[]).reduce((sum,f)=>sum+(Number(f.featherTotal)||0),0))}</strong></div>`).join('')}</div></div>`;
}
function adminWeeklyAstro(sub,week){
 if(!sub)return adminWeeklyEmpty('🔮',`No Astrocore submission for Week ${week}`,'The member has not submitted Astrocore levels for this week.');
 const levels=sub.levels||{};
 return `<div class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>🔮 ASTROCORE PROGRESSION</span><h3>6 Astrocores</h3></div><strong class="admin-weekly-big-number small">${progressAvg(sub).toFixed(1)} AVG</strong></div><div class="admin-weekly-level-grid">${ASTROCORE_NAMES.map(n=>`<div><label>${escHtml(n)}</label><strong>Lv. ${fmt(levels[n]||0)}</strong></div>`).join('')}</div></div>`;
}
function adminWeeklyEnchant(sub,week){
 if(!sub)return adminWeeklyEmpty('✨',`No Enchant submission for Week ${week}`,'The member has not submitted Enchant levels for this week.');
 const items=Array.isArray(sub.items)?sub.items:[];
 return `<div class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>✨ ENCHANT PROGRESSION</span><h3>${items.length}/12 entries</h3></div><strong class="admin-weekly-big-number small">${enchantAvg(sub).toFixed(1)} AVG</strong></div><div class="admin-weekly-enchant-grid">${items.map(x=>`<div><b>${escHtml(x.slot)}</b><strong>Lv. ${fmt(x.level)}</strong><span>${escHtml(x.effect||'—')}</span></div>`).join('')}</div></div>`;
}
function adminWeeklyMedal(sub,week){
 if(!sub)return adminWeeklyEmpty('🏅',`No Medal submission for Week ${week}`,'The member has not submitted a Medal screenshot for this week.');
 const levels=sub.levels||{};
 return `<div class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>🏅 MEDAL PROGRESSION</span><h3>8 Medals</h3></div><strong class="admin-weekly-big-number small">${medalAvg(sub).toFixed(1)} AVG</strong></div><div class="admin-weekly-level-grid">${MEDAL_NAMES.map(n=>`<div><label>${escHtml(n)}</label><strong>Lv. ${fmt(levels[n]||0)}</strong></div>`).join('')}</div>${sub.image?`<div class="admin-medal-shot"><img src="${escHtml(sub.image)}" alt="Medal screenshot"></div>`:''}</div>`;
}
function adminWeeklyScreenshots(snap,subs={}){
 if(!snap&&!subs.medal)return adminWeeklyEmpty('🖼️','No screenshots','No Feather screenshots were saved for this week.');
 const rows=(snap?.rows||[]),imgs=[];
 rows.forEach(r=>{if(r.image)imgs.push({label:`${r.side} Row ${r.row}`,image:r.image});});
 if(subs.medal?.image)imgs.push({label:'Medal',image:subs.medal.image});
 if(!imgs.length)return adminWeeklyEmpty('🖼️','No screenshots available','No saved progression screenshots are available for this week.');
 return `<div class="admin-weekly-section"><div class="admin-weekly-section-head"><div><span>SUBMITTED SCREENSHOTS</span><h3>${imgs.length} saved image${imgs.length===1?'':'s'}</h3></div><small>Historical • read only</small></div><div class="admin-weekly-screenshot-grid">${imgs.map(x=>`<figure><img src="${escHtml(x.image)}" alt="${escHtml(x.label)}"><figcaption>${escHtml(x.label)}</figcaption></figure>`).join('')}</div></div>`;
}
function viewWeeklySubmission(id,weekKey){openAdminWeeklySubmission(id,weekKey);}

function openEditor(i=null){if(!adminMode){alert('Only Admin can edit member records from Member Management.');return;}editIndex=i;const p=i===null?{}:players[i];document.getElementById('editorTitle').textContent=i===null?'Add Member':'Edit Member';document.getElementById('newIgn').value=p.ign||'';document.getElementById('newUid').value=p.uid||'';document.getElementById('newRole').value=p.role||'Carry';refreshAdminJob();document.getElementById('newJob').value=p.job||document.getElementById('newJob').value;document.getElementById('newAccountType').value=p.accountType||'Member';document.getElementById('newStatus').value=p.status||'Active';document.getElementById('newSince').value=p.memberSince||new Date().toISOString().slice(0,10);document.getElementById('memberEditor').classList.remove('hidden');}
function closeEditor(){document.getElementById('memberEditor').classList.add('hidden');editIndex=null;}
function saveMember(){
 if(!adminMode){alert('Only Admin can save member-management changes.');return;}
 const ign=document.getElementById('newIgn').value.trim();
 const uid=document.getElementById('newUid').value.trim();
 const accountType=document.getElementById('newAccountType').value;
 if(!ign||!uid){alert('IGN and UID are required.');return;}
 const duplicate=players.some((m,i)=>i!==editIndex && (String(m.ign||'').trim().toLowerCase()===ign.toLowerCase() || String(m.uid||'').trim()===uid));
 if(duplicate){alert('A member with this IGN or UID already exists. Please use a unique IGN and UID.');return;}
 const old=editIndex===null?null:players[editIndex];
 const defaults={weeklySnapshots:[],hp:0,patk:0,matk:0,basePdef:0,baseMdef:0,healingDone:0,healingTaken:0,critRes:0,critDmgRes:0,cri:0,pdmgReduction:0,mdmgReduction:0,pdmg:0,mdmg:0,ignorePdef:0,ignoreMdef:0,pvpReduction:0,pvpBonus:0,equipPdef:0,equipMdef:0,mediumDmg:0,mediumReduction:0,demiDmg:0,demiReduction:0};
 const p={...defaults,...(old||{}),ign,uid,role:document.getElementById('newRole').value,job:document.getElementById('newJob').value,accountType,status:document.getElementById('newStatus').value,memberSince:document.getElementById('newSince').value||new Date().toISOString().slice(0,10)};
 if(!p.id) p.id=makePlayerId(p);
 // accountType is authoritative; never leave a stale admin flag behind.
 delete p.systemAdmin;
 if(accountType==='Admin') p.systemAdmin=true;
 if(editIndex===null){
   players.push(p);
 }else{
   players[editIndex]=p;
 }
 const wasNew=(editIndex===null);
 ensureUniqueMemberIds();
 persistMembers();
 saveMemberStatsSnapshot(p);
 renderAdmin(); renderRoster(); closeEditor();
 alert(wasNew?'Member account created successfully.':'Member account updated successfully.');
}

function toggleStatus(i){if(!adminMode){alert('Only Admin can change member status.');return;}const next=players[i].status==='Inactive'?'Active':'Inactive';if(!confirm(`${next==='Inactive'?'Disable':'Activate'} ${players[i].ign}?`))return;players[i].status=next;persistMembers();renderAdmin();renderRoster();renderPartySetup();}
function removeMember(i){if(!adminMode){alert('Only Admin can remove members.');return;}if(confirm('Remove '+players[i].ign+'?')){players.splice(i,1);persistMembers();renderAdmin();renderRoster();renderPartySetup();}}
function enterAdmin(fromRestore=false){
  loadStoredMembers(); adminMode=true; currentPlayerId='master-admin'; currentPlayerUid=''; currentPlayerIgn='Administrator';
  if(!fromRestore)persistSession('master-admin','master-admin');
  document.getElementById('login').classList.add('hidden'); document.getElementById('portal').classList.remove('hidden');
  // Master-admin entry can happen after a member logout. Restore every admin-only
  // navigation item explicitly, including Roster.
  const rosterNav=document.getElementById('rosterNav');
  if(rosterNav){rosterNav.classList.remove('hidden');rosterNav.style.display='block';}
  const adminNav = document.getElementById('adminNav');
  if(adminNav) adminNav.classList.remove('hidden');

  document.getElementById('partyNav')?.classList.remove('hidden');
  const memberName = document.getElementById('memberName');
  if(memberName) memberName.textContent = 'Administrator';

  const memberMini = document.querySelector('.member-mini small');
  if(memberMini) memberMini.textContent = 'Admin';
  showPage('dashboard',document.querySelector('[data-page="dashboard"]')); renderAdminDashboard(); renderAdmin(); renderRoster(); renderPartySetup();
}

function openAdminLogin(){
 const m=document.getElementById('adminLoginModal'); if(!m)return;
 const u=document.getElementById('adminUsernameInput'),pw=document.getElementById('adminPasswordInput'),err=document.getElementById('adminLoginError');
 if(u)u.value=''; if(pw)pw.value=''; if(err)err.classList.add('hidden');
 m.classList.remove('hidden');
 setTimeout(()=>u?.focus(),40);
}
function closeAdminLogin(){document.getElementById('adminLoginModal')?.classList.add('hidden');}
function submitAdminLogin(){
 const u=(document.getElementById('adminUsernameInput')?.value||'').trim();
 const pw=document.getElementById('adminPasswordInput')?.value||'';
 const err=document.getElementById('adminLoginError');
 if(u===ADMIN_USERNAME&&pw===getMasterAdminPassword()){closeAdminLogin();enterAdmin();return;}
 if(err)err.classList.remove('hidden');
 document.getElementById('adminPasswordInput')?.select();
}
function bindAdmin(){
 document.getElementById('adminAccessBtn')?.addEventListener('click',openAdminLogin);
 document.getElementById('adminLoginSubmit')?.addEventListener('click',submitAdminLogin);
 document.getElementById('adminPasswordInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')submitAdminLogin();});
 document.getElementById('adminUsernameInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('adminPasswordInput')?.focus();});
 document.getElementById('addMemberBtn')?.addEventListener('click',()=>openEditor());
 document.getElementById('adminSearch')?.addEventListener('input',renderAdmin);
 document.getElementById('newRole')?.addEventListener('change',refreshAdminJob);
}
window.addEventListener('DOMContentLoaded',bindAdmin);

// Character Stats submission UX: when a numeric field still contains the
// default zero, clear it on focus so members can type immediately. Existing
// non-zero values are left untouched, and an untouched zero still submits as 0.
window.addEventListener('DOMContentLoaded',()=>{
 document.addEventListener('focusin',e=>{
   const el=e.target;
   if(!(el instanceof HTMLInputElement))return;
   if(el.type!=='number' || !el.id.startsWith('submitStat_'))return;
   if(el.value==='0')el.value='';
 });
});
window.addEventListener('DOMContentLoaded',renderMemberAnnouncements);
window.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('ocrSaveBtn')?.addEventListener('click',confirmWeeklyOcr);
 document.getElementById('astroSaveBtn')?.addEventListener('click',confirmWeeklyAstrocore);
 document.getElementById('enchantSaveBtn')?.addEventListener('click',saveWeeklyEnchant);
 document.getElementById('medalSaveBtn')?.addEventListener('click',confirmWeeklyMedal);
 document.getElementById('medalFileInput')?.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)analyzeMedalScreenshot(f);});
});

