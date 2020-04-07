(function(doc) {

    //default variable
    var default_args = {
        'publisherId': false, 
        'wrapperPage': false,
        'seoUrl': false,
        'channel': 'homepage',
        'bodyClass': '',
        'slots' : [],
        'templateID' : false
	};
    
    //if not set config, define with default variable
    for(var index in default_args) 
        if(typeof infInitCfg[index] == "undefined") infInitCfg[index] = default_args[index];
        
    //KMK SITE
    if( typeof window.kmklabs != 'undefined' && window.kmklabs != null )
    {
        if( window.kmklabs.channel.full_slug )
        {
            infInitCfg.channel = window.kmklabs.channel.full_slug;
        }
    }
    else if( typeof window.kly != 'undefined' && window.kly != null )
    {
        if( window.kly.channel.full_slug )
        {
            infInitCfg.channel = window.kly.channel.full_slug;
        }
    }
        
    var infParams = new Array();

    for (key in infInitCfg) 
    {
        if ( key=='wrapperPage' || key=='impTracker' || key=='clickTracker' || key=='channel')
        {
            infInitCfg[key] = encodeURIComponent(infInitCfg[key]);
        }
        infParams.push(key + '=' + encodeURIComponent(infInitCfg[key]));
    }
    
    //set domain
    infParams.push('domain=' + encodeURIComponent(extractDomain()));
    
    //create JS loader
    infJs = doc.createElement('script'); 
    infTag = doc.getElementsByTagName('script')[0]; 
    infJs.async = 1;
    infJs.src = 'https://d.infeed.id/wgt-v2&'+ infParams.join('&');
    infTag.parentNode.insertBefore(infJs,infTag);
    
    //create CSS loader
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://d.infeed.id/resources/css/v0.0.2/infeed-init.css';
    link.media = 'all';
    head.appendChild(link);
    
    function extractDomain() 
    {
        var e, n = window.location.href;
        return e = n.indexOf("://") > -1 ? n.split("/")[2] : n.split("/")[0], e = e.split(":")[0]
    }
    
})(document);