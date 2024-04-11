using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Text.RegularExpressions;

public class SleepScript : MonoBehaviour
{

    public Player player;
    public InternetPanel panel;
    public AfterSleepPanel sleepPanel;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void playerSleep(){
        player.addDaysPassed();
        string eventEffect = sleepPanel.triggerEvent(player.getDaysPassed(), player.getPublicTrustValue());
        player.resetActionPoints();
        this.handleEventEffect(eventEffect);
        panel.renderArticles();
        panel.manipulateProgressBar();
        panel.setWasChecked(false);
    }

    private void handleEventEffect(string eventEffect){
        if(eventEffect.Contains("AP")){
            int plusCount = new Regex(Regex.Escape("+")).Matches(eventEffect).Count;
            if(plusCount > 0){
                player.setActionPointsForToday(player.getMaxActionPoints() + plusCount);
                
            }
            else{
                int minusCount = new Regex(Regex.Escape("-")).Matches(eventEffect).Count;
                if(minusCount > 0 && (player.getMaxActionPoints() - minusCount > 0)){
                    player.setActionPointsForToday(player.getMaxActionPoints() - minusCount);
                }
            }
        }
        
    }
}
