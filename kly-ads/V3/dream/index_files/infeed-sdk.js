function INFEED_SDK() 
{
    var win;
    
    var doc;
    
    var enableLog;
    
    var slotClass;
    
    var templateID;
    
    var params;
}
INFEED_SDK.prototype = 
{
    constructor: INFEED_SDK,
    
    init(arg)
    {
        /** INIT PARAMS **/
        this.params = {'seo_url':true};
        
        /** INPUT ARGUMENT **/
        this.setArg(arg);
        
        /** GET SLOTS **/
        this.getSlots();

        /** GET PUBLISHER ID **/
        this.checkParams();

        /** REQUEST **/
        this.requestAds();
    },
    
    /** SET ARGUMENTS INTO PARAMS **/
    setArg(arg)
    {
        for( var i in arg )
        {
            var a = arg[i];
            
            this.params[a[0]] = a[1];
        }
        
        if( !this.params.channel )
        {
            /*KMK SITE */
            if( typeof window.kmklabs != 'undefined' && window.kmklabs != null )
            {
                if( window.kmklabs.channel.full_slug )
                {
                    this.params.channel = window.kmklabs.channel.full_slug;
                }
            } 
            /* KLY SITE */
            else if( typeof window.kly != 'undefined' && window.kly != null )
            {
                if( window.kly.channel.full_slug )
                {
                    this.params.channel = window.kly.channel.full_slug;
                }
            }
        }
    },
    
    
    /** CHECKING PARAMS **/
    checkParams()
    {
        if( !this.params.publisher )
        {
            this.log('[INFEED] PUBLISHER ID NOT SET');
        }
        
        if( !this.params.templates )
        {
            this.log('[INFEED] TEMPLATES ID NOT SET');
        }

        if( !this.params.slots )
        {
            this.log('[INFEED] SLOTS NOT SET');
        }

        if( !this.params.wrapper )
        {
            this.log('[INFEED] SLOTS NOT SET');
        }
    },
    
    /** GET SLOT PARAMETERS **/
    getSlots()
    {
        var slotElement = document.getElementsByClassName(this.params.class);
        this.params.slots = [];
        this.params.templates = [];
        
        for(var i =0; i<=slotElement.length; i++)
        {
            var slotN = (i+1);
            var slotT = null;
            
            if( slotElement[i] )
            {            
                if( slotElement[i].hasAttribute('data-slot') )
                {
                    slotN = slotElement[i].getAttribute('data-slot') || (parseInt(i)+1);
                }
                
                if( slotElement[i].hasAttribute('data-template') )
                {
                    slotT = slotElement[i].getAttribute('data-template');
                }
                else
                {
                    this.log('[INFEED] element-'+i+' does not have an ID template');
                }
                
                this.params.templates.push(slotT);
                
                this.params.slots.push({
                   'slot': slotN,
                   'template': slotT,
                   'target': slotElement[i]
                });
            }
        }
        
        this.params.templates = this.params.templates.filter((v, i, a) => a.indexOf(v) === i);
    },
    
    requestAds()
    {   infJs = this.doc.createElement('script'); 
        infTag = this.doc.getElementsByTagName('script')[0]; 
        infJs.async = 1;
        infJs.src = 'https://d.infeed.id/wgt-v3&publisher='+ this.params.publisher+'&channel='+ this.params.channel+'&templates='+this.params.templates.join(',');
        infTag.parentNode.insertBefore(infJs,infTag);
        
        //send to global variable
        this.win.INFEED_SDK_PARAMS = this.params;
    },
    
    domain() 
    {
        var e, n = window.location.href;
        return e = n.indexOf("://") > -1 ? n.split("/")[2] : n.split("/")[0], e = e.split(":")[0]
    },
    
    log(msg)
    {
        if( this.enableLog ) console.log(msg);
    }
};

(function(win, doc, l) {
    var infSdk = new INFEED_SDK();
        infSdk.win = win;
        infSdk.doc = doc;
        infSdk.enableLog = l;
        infSdk.init(win[win.infeedConfig].q);
})(window, document, true);