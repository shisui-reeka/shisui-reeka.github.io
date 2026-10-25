/* content.json (管理画面で更新される内容) を data.js の上に重ねる */
window.EDITABLE=['sub','about','chart','links','xposts','archive','gallery','commission','goods','talk','talkOver','fortunes'];
window.mergeContent=function(j){
  var S=window.SITE;
  Object.keys(j||{}).forEach(function(k){
    if(window.EDITABLE.indexOf(k)<0) return;
    if(k==='commission'&&j[k]&&typeof j[k]==='object') S.commission=Object.assign({},S.commission,j[k]);
    else S[k]=j[k];
  });
};
window.loadContent=function(){
  return new Promise(function(res){
    var done=false,fin=function(){if(!done){done=true;res()}};
    setTimeout(fin,2500);
    fetch('content.json?t='+Date.now(),{cache:'no-store'})
      .then(function(r){return r.ok?r.json():null})
      .then(function(j){if(j)window.mergeContent(j)})
      .catch(function(){}).then(fin);
  });
};
