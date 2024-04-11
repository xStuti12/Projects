using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArticleScript : MonoBehaviour
{

    public UnityEngine.UI.Text title;
    public UnityEngine.UI.Text publisher;
    public UnityEngine.UI.Text category;
    public UnityEngine.UI.Text diffText;

    private int difficulty;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void setTitleText(string text){
        this.title.text = text;
    }

    public void setPublisher(string text){
        this.publisher.text = text;
    }

    public void setCategory(string category){
        this.category.text = category;
    }

    public void setDifficulty(int diff){
        this.setDiffText(diff);
        this.difficulty = diff;
    }

    private void setDiffText(int diff){
        if(diff <= 3){
            diffText.text = "Easy";
            diffText.color = new Color(0.21115f,0.6132f,0.3670f,1f);
        }
        else if(diff <= 6){
            diffText.text = "Medium";
             diffText.color = new Color(0.7830f, 0.7206f, 0f, 1f);
        }
        else{
            diffText.text = "Hard";
            diffText.color = new Color(1f,0f,0.2077f,1f);
        }
    }

    public int getDifficulty(){
        return this.difficulty;    
    }

    public string getCategory(){
        return this.category.text;
    }

    public bool successfullDebunk(){
        Debug.Log(this.difficulty);
        return true;
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
