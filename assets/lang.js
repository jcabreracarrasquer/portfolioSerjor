/* ── PORTFOLIO LANGUAGE SYSTEM ── */
(function() {
  var $ = function(s){ return document.querySelector(s); };
  var $$ = function(s){ return Array.from(document.querySelectorAll(s)); };

  window._lang = {
    apply: function(lang, t) {
      if (!t) return;

      /* nav back — replace last text node inside .nav-back */
      var a = $('.nav-back');
      if (a && t.navBack) {
        var tn = Array.from(a.childNodes).filter(function(n){ return n.nodeType===3 && n.nodeValue.trim(); });
        if (tn.length) tn[tn.length-1].nodeValue = ' ' + t.navBack;
      }

      /* hero */
      var cat=$('.hero-cat'); if(cat&&t.heroCat) cat.textContent=t.heroCat;
      if(t.heroTags) $$('.hero-tag').forEach(function(el,i){ if(t.heroTags[i]!=null) el.textContent=t.heroTags[i]; });

      /* overview */
      if(t.ovLabels) $$('.ov-label').forEach(function(el,i){ if(t.ovLabels[i]!=null) el.textContent=t.ovLabels[i]; });
      if(t.ovValues) $$('.ov-value').forEach(function(el,i){ if(t.ovValues[i]!=null) el.textContent=t.ovValues[i]; });

      /* section labels & titles */
      if(t.sLabels) $$('.s-label').forEach(function(el,i){ if(t.sLabels[i]!=null) el.textContent=t.sLabels[i]; });
      if(t.sTitles) $$('.s-title').forEach(function(el,i){ if(t.sTitles[i]!=null) el.innerHTML=t.sTitles[i]; });

      /* description */
      if(t.descPs) $$('.desc-main p').forEach(function(el,i){ if(t.descPs[i]!=null) el.innerHTML=t.descPs[i]; });
      if(t.asideLabels) $$('.aside-label').forEach(function(el,i){ if(t.asideLabels[i]!=null) el.textContent=t.asideLabels[i]; });
      if(t.asideValues) $$('.aside-value').forEach(function(el,i){ if(t.asideValues[i]!=null) el.innerHTML=t.asideValues[i]; });

      /* AI banner — portfolio page */
      var bl=$('.ai-banner-label'); if(bl&&t.aiBannerLabel) bl.textContent=t.aiBannerLabel;
      var bt=$('.ai-banner-title'); if(bt&&t.aiBannerTitle) bt.innerHTML=t.aiBannerTitle;
      if(t.aiSteps) $$('.ai-step-text').forEach(function(el,i){ if(t.aiSteps[i]!=null) el.innerHTML=t.aiSteps[i]; });

      /* asset cards — beyond page */
      if(t.assetLabels) $$('.asset-card-label').forEach(function(el,i){ if(t.assetLabels[i]!=null) el.textContent=t.assetLabels[i]; });

      /* project navigation */
      var dirs=$$('.proj-nav-dir');
      if(dirs[0]&&t.prevLabel) dirs[0].textContent=t.prevLabel;
      if(dirs[1]&&t.nextLabel) dirs[1].textContent=t.nextLabel;

      /* switcher state */
      $$('.lang-btn').forEach(function(btn){ btn.classList.toggle('lang-active', btn.dataset.lang===lang); });
      document.documentElement.lang=lang;
      localStorage.setItem('portfolio-lang', lang);
    },

    init: function(pageTrans) {
      var self=this;
      $$('.lang-btn').forEach(function(btn){
        btn.addEventListener('click', function(){ self.apply(btn.dataset.lang, pageTrans[btn.dataset.lang]); });
      });
      var saved=localStorage.getItem('portfolio-lang')||'es';
      this.apply(saved, pageTrans[saved]);
    }
  };
})();
