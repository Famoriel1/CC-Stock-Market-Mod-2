(function(){
    if(typeof customStockMarketMod==="undefined"){
        customStockMarketMod={};
        customStockMarketMod.enabled=false;
        customStockMarketMod.interval=60000;
        customStockMarketMod.timer=null;
        customStockMarketMod.indicator=null;

        customStockMarketMod.updateIndicator=function(){
            if(!customStockMarketMod.indicator){
                customStockMarketMod.indicator=document.createElement("div");
                customStockMarketMod.indicator.style.position="fixed";
                customStockMarketMod.indicator.style.bottom="10px";
                customStockMarketMod.indicator.style.right="10px";
                customStockMarketMod.indicator.style.background="rgba(0,0,0,0.7)";
                customStockMarketMod.indicator.style.color="white";
                customStockMarketMod.indicator.style.padding="5px 10px";
                customStockMarketMod.indicator.style.borderRadius="5px";
                customStockMarketMod.indicator.style.zIndex="9999";
                document.body.appendChild(customStockMarketMod.indicator);
            }
            customStockMarketMod.indicator.textContent="StockMod: "+
                (customStockMarketMod.enabled?"ON":"OFF")+
                " | "+customStockMarketMod.interval+" ms";
        };

        customStockMarketMod.start=function(){
            if(customStockMarketMod.enabled) return;
            customStockMarketMod.enabled=true;
            customStockMarketMod.loop();
            customStockMarketMod.updateIndicator();
        };

        customStockMarketMod.stop=function(){
            customStockMarketMod.enabled=false;
            if(customStockMarketMod.timer) clearTimeout(customStockMarketMod.timer);
            customStockMarketMod.updateIndicator();
        };

        customStockMarketMod.loop=function(){
            if(!customStockMarketMod.enabled) return;
            if(Game.ObjectsById[5] && Game.ObjectsById[5].minigame){
                var mg=Game.ObjectsById[5].minigame;
                if(mg.tick) mg.tick();
            }
            customStockMarketMod.timer=setTimeout(customStockMarketMod.loop,customStockMarketMod.interval);
        };

        document.addEventListener("keydown",function(e){
            if(e.key===","){
                if(customStockMarketMod.enabled){customStockMarketMod.stop();}else{customStockMarketMod.start();}
            }
            if(e.key==="."){
                var val=parseInt(prompt("Milliseconds per stock market tick:",customStockMarketMod.interval));
                if(!isNaN(val) && val>0){
                    customStockMarketMod.interval=val;
                    if(customStockMarketMod.enabled){
                        clearTimeout(customStockMarketMod.timer);
                        customStockMarketMod.loop();
                    }
                    customStockMarketMod.updateIndicator();
                    Game.Notify("Custom Stock Market","Interval set to "+val+" ms",[16,5]);
                }
            }
        });

        customStockMarketMod.updateIndicator();
        Game.Notify("Custom Stock Market","Hotkeys loaded (, to toggle, . to set interval)",[16,5]);
    }
})();
