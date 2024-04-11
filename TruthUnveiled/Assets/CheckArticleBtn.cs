using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CheckArticleBtn : MonoBehaviour
{

    private InternetPanel internetPanel;
    private int articleIdx;
    private bool wtf;
    private Player player;

    void Start(){}

    void Update(){}

    public void setArticleIdx(int idx){
        this.articleIdx = idx;
        this.wtf = false;
    }

    public void setInternetPanel(InternetPanel panel){
        this.internetPanel = panel;
    }

    public void checkArticle(){
        bool remove = this.internetPanel.setArticleChecked(this.articleIdx);
        if(remove){
            this.internetPanel.setWasChecked(true);
            this.player = this.internetPanel.getPlayer();
            this.player.setShowDebunk(true);
            float skillPoints = 0f;
            
            skillPoints += this.player.getEducation().getBoostFromStats(this.player.getEducation().getWriting());
            float articleBV = gameObject.GetComponentInParent<ArticleScript>().getDifficulty();
            string category = gameObject.GetComponentInParent<ArticleScript>().getCategory();

           switch(category){
                case "medicine":
                    skillPoints += this.player.getMedicinePoints();
                    this.player.setPublicTrustValue(this.calculateWeight(skillPoints, articleBV));
                    break;
                case "politics":
                    skillPoints += this.player.getPoliticsPoints();
                    this.player.setPublicTrustValue(this.calculateWeight(skillPoints, articleBV));
                    break;
                case "enviromental":
                    skillPoints += this.player.getEnviromentalPoints();
                    this.player.setPublicTrustValue(this.calculateWeight(skillPoints, articleBV));
                    break;
                case "technology":
                    skillPoints += this.player.getTechnologyPoints();
                    this.player.setPublicTrustValue(this.calculateWeight(skillPoints, articleBV));
                    break;
                case "economics":
                    skillPoints += this.player.getEconomicsPoints();
                    this.player.setPublicTrustValue(this.calculateWeight(skillPoints, articleBV));
                    break; 
            }
            
            this.gameObject.SetActive(false);
            this.wtf = true;
        }
    }

    private float calculateWeight(float skillPoints, float articleBV)
    {
        // konverzia na bod vahy pre skill
        float skillBV = skillPoints / 10f;

        float points = 0;
        // USPESNY DEBUNK 
        if (skillBV > articleBV + 1)
        {
            points += 8; 
        }
        //NEUSPESNY DEBUNK - MALO BODOV
        else if(articleBV > skillBV + 1){
            points -= 10;
        }
        //FIFTY-FIFTY SANCA NA DEBUNK
        else if (skillBV >= articleBV - 1 && skillBV <= articleBV + 1)
        {
            if (Random.Range(0, 2) == 0) {
                points += 8; 
            }
            else{
                points -= 10; 
            }
        }
        //FALLBACK OPTION - NEMAL BY NASTAT :D
        else
        {
            points -= 10; 
        }

        //mathF clamp = points nebude pod minPoints ani nad maxPoints
        return points;
        
    }



    public bool isChecked(){
        return this.wtf;
    }

    public int getArticleIdx(){
        return this.articleIdx;
    }

    public void setChecked(bool wtf2){
        this.wtf = wtf2;
        if(!wtf2){
            this.gameObject.SetActive(true);
        }
        else{
            this.gameObject.SetActive(false);
        }
        
    }
}
