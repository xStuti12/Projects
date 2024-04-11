using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Education{

    // percentage of each field
    private int technology; 
    private int politics;
    private int medicine;
    private int economics;
    private int enviromental;

    private int writing;
    private int researchSkill;

    public Education(int baseTechnology, int basePolitics, int baseEconomics, int baseMedicine, int baseEnviromental, int baseWriting, int researchSkill){
        this.technology = baseTechnology;
        this.writing = baseWriting;
        this.politics = basePolitics;
        this.economics = baseEconomics;
        this.medicine = baseMedicine;
        this.enviromental = baseEnviromental;
        this.researchSkill = researchSkill;
    }


    public int getTechnology(){
        return this.technology;
    }

    public int getPolitics(){
        return this.politics;
    }

    public int getMedicine(){
        return this.medicine;
    }

    public int getEconomics(){
        return this.economics;
    }

    public int getEnviromental(){
        return this.enviromental;
    }

     public void updateTechnology(int updateRate){
        this.technology += updateRate + this.getBoostFromStats(this.getResearchSkill());
    }

    public void updatePolitics(int updateRate){
        this.politics += updateRate + this.getBoostFromStats(this.getResearchSkill());
    }

    public void updateMedicine(int updateRate){
        this.medicine += updateRate + this.getBoostFromStats(this.getResearchSkill());
    }

    public void updateEconomics(int updateRate){
        this.economics += updateRate + this.getBoostFromStats(this.getResearchSkill());
    }

    public void updateEnviromental(int updateRate){
        this.enviromental += updateRate + this.getBoostFromStats(this.getResearchSkill());
    }

    // GETTERS STATS
    public int getWriting(){
        return this.writing;
    }

    public int getResearchSkill(){
        return this.researchSkill;
    }
    // SETTERS STATS
    public void updateWriting(int updateRate){
        this.writing += updateRate;
    }

    public void updateResearchSkill(int updateRate){
        this.researchSkill += updateRate;
    }
 
    public int getBoostFromStats(int currentSkillPoints){
        if(currentSkillPoints <= 33){
            return 0;
        }
        else if(currentSkillPoints > 33 && currentSkillPoints <= 66)
        {
            return 1;
        }
        else if(currentSkillPoints > 66 && currentSkillPoints <= 95)
        {
            return 2;
        }
        else{
            return 3;
        }
    }

    
}

public class Player : MonoBehaviour
{
    private int availableActionPoints;
    private int maxActionPoints;
    private Education education;
    private int daysPassed;
    public Slider publicityTrustValue;

    public AudioManager manager;

    public GameObject debunkPanel;
    public UnityEngine.UI.Text debunkText;
    public UnityEngine.UI.Text debunkTipText;
    

    private bool showDebunk;

    public SceneController sceneControll;

    // Start is called before the first frame update
    void Start()
    {
        this.availableActionPoints = 3;
        this.maxActionPoints = 3;
        this.education = new Education(this.getRandomStatValue(), this.getRandomStatValue(), this.getRandomStatValue(), this.getRandomStatValue(), this.getRandomStatValue(), 30, 20);
        this.daysPassed = 0;
    }

    private int getRandomStatValue(){
        int r = Random.Range(1, 4); // 1 - 3
        if(r == 1){
            return 30;
        }
        else if(r == 2){
            return 40;
        }
        else{
            return 45;
        }
    }

    public void addDaysPassed(){
        this.daysPassed++;
    }

    public int getDaysPassed(){
        return this.daysPassed;
    }

    public void resetActionPoints(){
        this.availableActionPoints = this.maxActionPoints;
    }

    public void setActionPointsForToday(int ap){
        this.availableActionPoints = ap;
    }

    public void increaseMaxActionPoints(int add){
        this.maxActionPoints += add;
    }

    public void decreaseAvailableActionPoints(int sub){
        this.availableActionPoints -= sub;
    }

    public int getMaxActionPoints(){
        return this.maxActionPoints;
    }

    public int getAvailableActionPoints(){
        return this.availableActionPoints;
    }

    public float getPoliticsPoints(){
        return this.education.getPolitics();
    }

    public void setShowDebunk(bool val){
        this.showDebunk = val;
    }

    public void increasePoliticsPoints(int add){
        if(availableActionPoints > 0 && this.education.getPolitics() < 100){
            this.education.updatePolitics(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    public float getTechnologyPoints(){
        return this.education.getTechnology();
    }

    public void increaseTechnologyPoints(int add){
        if(availableActionPoints > 0 && this.education.getTechnology() < 100){
            this.education.updateTechnology(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    public float getMedicinePoints(){
        return this.education.getMedicine();
    }

    public void increaseMedicinePoints(int add){
        if(availableActionPoints > 0 && this.education.getMedicine() < 100){
            this.education.updateMedicine(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    public float getEconomicsPoints(){
        return this.education.getEconomics();
    }

    public void increaseEconomicsPoints(int add){
        if(availableActionPoints > 0 && this.education.getEconomics() < 100){
            this.education.updateEconomics(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        } 
    }

    public float getEnviromentalPoints(){
        return this.education.getEnviromental();
    }

    public void increaseEnviromentalPoints(int add){
        if(availableActionPoints > 0 && this.education.getEnviromental() < 100){
            this.education.updateEnviromental(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    private void showDebunkPanel(string text, bool success){
        this.debunkPanel.SetActive(true);
        this.debunkText.text = text;
        if(success){
            this.debunkText.color = new Color(0.2111f, 0.6132f, 0.3670f, 1f);
            this.debunkTipText.text = "";
        }
        else{
            this.debunkText.color = new Color(1f,0f,0.2077f,1f);
            this.debunkTipText.text = "TIP: Upgrade skill in article category";
        }
    }

    public void setPublicTrustValue(float valueToAdd){
        if(valueToAdd < 0){
            manager.playPublicTrustDown();
            if(this.showDebunk)
                this.showDebunkPanel("Debunk unsuccessful", false);
        }
        else if(valueToAdd > 0){
            manager.playPublicTrustUp();
            if(this.showDebunk)
                this.showDebunkPanel("Debunk successful", true);
        }
        this.publicityTrustValue.value += valueToAdd;
        if(this.publicityTrustValue.value >= 100){
            SceneManager.LoadScene("WinScreen");
        }
        else if(this.publicityTrustValue.value <= 0){
            SceneManager.LoadScene("LoseScreen");
        }
    }

    public float getPublicTrustValue(){
        return this.publicityTrustValue.value;
    }

    //STATS
    public int getWritingPoints(){
        return this.education.getWriting();
    }

    public void increaseWritingPoints(int add){
        if(availableActionPoints > 0 && this.education.getWriting() < 100){
            this.education.updateWriting(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    public int getResearchSkillPoints(){
        return this.education.getResearchSkill();
    }

    public void increaseResearchSkillPoints(int add){
        if(availableActionPoints > 0 && this.education.getResearchSkill() < 100){
            this.education.updateResearchSkill(add);
            this.decreaseAvailableActionPoints(1);
        }
        else{
            manager.playInputError();
        }
    }

    public Education getEducation(){
        return this.education;
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
