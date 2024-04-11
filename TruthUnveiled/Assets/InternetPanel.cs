using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEngine.UI;
using System.Linq;
using UnityEngine.SceneManagement;


[System.Serializable]
public class Article{
    public string title;
    public string publisher;
    public string category;
    public int difficulty;
}


[System.Serializable]
public class Articles{
    public Article[] articles;
}


public class InternetPanel : MonoBehaviour
{

    public TextAsset jsonFile;
    public GameObject articlePrefab;
    public Transform contentPanel;
    private int[] checked_article_indexes = new int[8];
    private int check_articles_idx = 0;

    private GameObject[] articles = new GameObject[4];
    private int articles_idx = 0;

    public Player player;

    private Articles articles_json;

    private bool firstRender = true;

    public UnityEngine.UI.Text finalText;

    private int articleCount;

    private int daysWithoutDebunking;
    private bool wasChecked;

    public AudioManager audioManager;
    
    void Start()
    {
        this.articles_json = JsonUtility.FromJson<Articles>(jsonFile.ToString());
        this.articleCount = this.articles_json.articles.Length;
        //this.firstRender = true;
        this.renderArticles();
        this.wasChecked = false;
    }

    public Player getPlayer(){
        return this.player;
    }

    public bool setArticleChecked(int articleIdx){
        if(this.player.getAvailableActionPoints() > 0){
        //   this.checked_article_indexes[this.check_articles_idx++] = articleIdx;
            this.player.decreaseAvailableActionPoints(1); 
            return true;
        }
        audioManager.playInputError();
        return false;
    }

    public int getRenderedArticleCount(){
        int count = 0;
        for(int i = 0; i < 4; i++){
            if(this.articles[i] != null && !this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().isChecked()){ //kontroluj aj ci su checked
                count++;
            }
        }
        return count;
    }

    private int[] getRenderedArticleIndexes(){
        int []indexes = new int[4];
        for(int i = 0; i < 4; i++){
            if(this.articles[i] != null){
                indexes[i] = this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().getArticleIdx();
            }
        }
        return indexes;
    }

    private int getAvailableArticleCount(){
        int count = 0;
        for(int i = 0; i < this.articleCount; i++){
            if(this.articles_json.articles[i] != null){
                count++;
            }
        }
        return count;
    }

    public void renderArticles(){
        if(this.articles_json != null){
            if(firstRender){
                firstRender = false;
                int []rendered_index = new int[4];
                for(int i = 0; i < 4; i++){
                    int random_index = Random.Range(0, this.articles_json.articles.Length);
                    int max_itter = 10;
                    int itter = 0;
                    bool notFound = false;
                    while(rendered_index.Contains(random_index)){
                        itter++;
                        if(itter >= max_itter){
                            notFound = true;
                            break;
                        }
                        random_index = Random.Range(0, this.articles_json.articles.Length);
                    }
                    rendered_index[i] = random_index;
                    this.generateArticle(i, random_index);
                }
            }
            else{
                for(int i = 0; i < 4; i++){
                    if(this.articles[i] != null && this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().isChecked()){
                        if(this.getAvailableArticleCount() != 0){
                            for(int j = 0; j < this.articleCount; j++){
                                if(this.articles_json.articles[j] != null){
                                    this.regenerateArticle(i, this.articles_json.articles[j]);
                                    this.articles_json.articles[j] = null;
                                    break;
                                }
                            }
                        }
                        else{
                            Destroy(this.articles[i]);
                            this.articles[i] = null;
                        }
                    }
                }
                int nullCount = 0;
                for(int i = 0; i < 4; i++){
                    if(this.articles[i] == null){
                        nullCount++;
                    }
                }
                if(nullCount > 0){
                    if(nullCount == 4){
                        if(this.player.getPublicTrustValue() >= 50){
                            SceneManager.LoadScene("AlmostWin");
                        }
                        else{
                            SceneManager.LoadScene("AlmostLose");
                        }
                        this.finalText.text = "End of early access\narticles";
                        return;
                    }
                    /* for(int i = 0; i < 3; i++){ // posun textu nehehhe
                        if(this.articles[i] == null && this.articles[i + 1] != null){
                            this.articles[i] = Instantiate(articlePrefab, gameObject.transform);
                            int y_pos;
                             if(i == 0){
                                y_pos = 18;
                            }
                            else{
                                y_pos = 18 - (18 * i);
                            }
                            
                            this.articles[i].transform.localPosition = new Vector3(0f, y_pos, 0f);

                            this.articles[i].GetComponentInChildren<Transform>().Find("Title").gameObject.GetComponent<UnityEngine.UI.Text>().text = this.articles[i + 1].GetComponentInChildren<Transform>().Find("Title").gameObject.GetComponent<UnityEngine.UI.Text>().text;
                            this.articles[i].GetComponentInChildren<Transform>().Find("Category").gameObject.GetComponent<UnityEngine.UI.Text>().text = this.articles[i + 1].GetComponentInChildren<Transform>().Find("Category").gameObject.GetComponent<UnityEngine.UI.Text>().text;
                            this.articles[i].GetComponentInChildren<Transform>().Find("Publisher").gameObject.GetComponent<UnityEngine.UI.Text>().text = this.articles[i + 1].GetComponentInChildren<Transform>().Find("Publisher").gameObject.GetComponent<UnityEngine.UI.Text>().text;
                            this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().setChecked(false);
                            this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().setInternetPanel(this);
                            this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().setArticleIdx(this.articles[i + 1].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().getArticleIdx());
                            
                            

                            this.articles[i + 1].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().setChecked(true);
                            this.articles[i + 1].GetComponentInChildren<Transform>().Find("Title").gameObject.GetComponent<UnityEngine.UI.Text>().text="";
                            this.articles[i + 1].GetComponentInChildren<Transform>().Find("Category").gameObject.GetComponent<UnityEngine.UI.Text>().text="";
                            this.articles[i + 1].GetComponentInChildren<Transform>().Find("Publisher").gameObject.GetComponent<UnityEngine.UI.Text>().text="";
                            

                        }
                    } */
                }
            }
        }


        /* if(this.getRenderedArticleCount() < 4){
            int max = check_articles_idx >= 4 ? (8 - check_articles_idx) : 4;
            int []rendered_index = this.getRenderedArticleCount() == 0 ? new int[4] : this.getRenderedArticleIndexes();

            for(int i = 0; i < max; i++){
                if(this.articles[i] == null || this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().isChecked()){
                    bool replacement = false;
                    if(this.articles[i] != null && this.articles[i].GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().isChecked()){
                        replacement = true;
                    }

                    int random_index = Random.Range(0, this.articles_json.articles.Length);
                    int max_itter = 10;
                    int itter = 0;
                    bool notFound = false;
                    while(checked_article_indexes.Contains(random_index) || rendered_index.Contains(random_index)){
                        itter++;
                        if(itter >= max_itter){
                            notFound = true;
                            break;
                        }
                        random_index = Random.Range(0, this.articles_json.articles.Length);
                    }

                    if(notFound){
                        Debug.Log("Nenasiel som :(");
                        continue;
                    }

                    rendered_index[i] = random_index;
                    this.generateArticle(i, random_index, replacement);
                }
            }
        } */
    }

    private void regenerateArticle(int articleIdx, Article articleData){
        GameObject article = this.articles[articleIdx];

        GameObject articleTitle_obj = article.GetComponentInChildren<Transform>().Find("Title").gameObject; //max 21 znakov
        GameObject articleCat_obj = article.GetComponentInChildren<Transform>().Find("Category").gameObject; //max 21 znakov
        GameObject articlePublisher_obj = article.GetComponentInChildren<Transform>().Find("Publisher").gameObject; //max 10 znakov

        articleTitle_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = articleData.title;
        articlePublisher_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = articleData.publisher;
        articleCat_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = articleData.category;

        article.GetComponent<ArticleScript>().setDifficulty(articleData.difficulty);

        article.GetComponentInChildren<Transform>().Find("Button").gameObject.GetComponent<CheckArticleBtn>().setChecked(false);


        
    }

    private void generateArticle(int i, int random_index){
        GameObject article = Instantiate(articlePrefab, gameObject.transform);
        //GameObject articleTitle_obj = article.GetComponentInChildren<Transform>().Find("Title").gameObject; //max 21 znakov
       // GameObject articleCat_obj = article.GetComponentInChildren<Transform>().Find("Category").gameObject; //max 21 znakov
       // GameObject articlePublisher_obj = article.GetComponentInChildren<Transform>().Find("Publisher").gameObject; //max 10 znakov
        
        float y_pos;
        if(i == 0){
            y_pos = 18;
        }
        else{
            y_pos = 18 - (18 * i);
        }
        
        article.transform.localPosition = new Vector3(0f, y_pos, 0f);
        
        article.GetComponent<ArticleScript>().setTitleText(this.articles_json.articles[random_index].title);
        article.GetComponent<ArticleScript>().setPublisher(this.articles_json.articles[random_index].publisher);
        article.GetComponent<ArticleScript>().setCategory(this.articles_json.articles[random_index].category);
        article.GetComponent<ArticleScript>().setDifficulty(this.articles_json.articles[random_index].difficulty);
        //articleTitle_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = ;
        //articlePublisher_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = ;
        //articleCat_obj.gameObject.GetComponent<UnityEngine.UI.Text>().text = ;
        
        GameObject articleBtn = article.GetComponentInChildren<Transform>().Find("Button").gameObject;
        articleBtn.GetComponent<CheckArticleBtn>().setArticleIdx(random_index);
        articleBtn.GetComponent<CheckArticleBtn>().setInternetPanel(this);

        this.articles[this.articles_idx++] = article;
        this.articles_json.articles[random_index] = null;
        
    }

     public void manipulateProgressBar(){
        if(!wasChecked){
            daysWithoutDebunking++;
            if(daysWithoutDebunking > 1){
                this.player.setShowDebunk(false);
                this.player.setPublicTrustValue(((-2) * (daysWithoutDebunking - 1)));
            }
        }
    }

    public void resetDaysWithoutDebunking(){
        this.daysWithoutDebunking = 0;
    }

    public void setWasChecked(bool var){
        this.wasChecked = var;
        if(var){
            this.resetDaysWithoutDebunking();
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
