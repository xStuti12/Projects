using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEngine.UI;
using System.Linq;

[System.Serializable]
public class Event{

    public string eventText;
    public string eventEffectText;
    public string eventEffect;
    public string soundEffect;

}

[System.Serializable]
public class Events{
    public Event[] positive;
    public Event[] negative;
    public Event[] nothing;
}

[System.Serializable]
public class EventsJSON{
    public Events events;
}

public class AfterSleepPanel : MonoBehaviour
{

    public TextAsset jsonFile;
    private EventsJSON events;
    public UnityEngine.UI.Text eventText;
    public UnityEngine.UI.Text eventEffectText;
    public AudioManager audio;
    public UnityEngine.UI.Text days_text;
    public UnityEngine.UI.Text ap_text;
    public UnityEngine.UI.Button modeBtn;
    public UnityEngine.UI.Text modeBtn_text;

    // Start is called before the first frame update
    void Start()
    {
        if(this.events == null)
            this.events = JsonUtility.FromJson<EventsJSON>(jsonFile.ToString());    
    }

    private bool eventTriggered(int daysCount){
        if(daysCount <= 2) return false;
        int r = Random.Range(0,101);
        return r > 50;
    }

    private bool positiveEventTriggered(int daysCount, float publicityTrustValue){
        if(publicityTrustValue >= 80){
            Debug.Log("neni sanca na pozit. event");
            return false;
        }
        else if(publicityTrustValue <= 30){
            Debug.Log("100% pozit event");
            return true;
        }
        else{
            int r = Random.Range(0,101);
            return r > 50;
        }
    }

    public string triggerEvent(int daysPassed, float publicityTrustValue){
        if(this.events == null){
            this.events = JsonUtility.FromJson<EventsJSON>(jsonFile.ToString());    
        }
        // roll ci sa stal event
        if(this.eventTriggered(daysPassed)){
            // vypocitat ci bol pozitivny alebo negativny
            if(this.positiveEventTriggered(daysPassed, publicityTrustValue)){
                int idx = Random.Range(0, this.events.events.positive.Length);
                this.renderPanelText(this.events.events.positive[idx]);
                return this.events.events.positive[idx].eventEffect;
            }
            else{
                int idx = Random.Range(0, this.events.events.negative.Length);
                this.renderPanelText(this.events.events.negative[idx]);
                this.handleSoundEffect(this.events.events.negative[idx].soundEffect);
                return this.events.events.negative[idx].eventEffect;
            }
            // dopad eventu
        }
        else{ //Events.nothing
            int idx = Random.Range(0, this.events.events.nothing.Length);
            this.renderPanelText(this.events.events.nothing[idx]);
            return "";
        }
    }

    private void handleSoundEffect(string soundEffect){
        if(soundEffect == "thunder"){
            audio.playThunder();
        }
        else if(soundEffect == "glass"){
            audio.playGlass();
        }
    }

    private void renderPanelText(Event ev){
        this.eventText.text = ev.eventText;
        this.eventEffectText.text = ev.eventEffectText;

    }

    public void makeActive(){
        this.gameObject.SetActive(true);
        
        this.gameObject.GetComponent<Image>().color = new Color(1f,1f,1f, 0f);
        UnityEngine.UI.Text []children = this.gameObject.GetComponentsInChildren<UnityEngine.UI.Text>();
        foreach (UnityEngine.UI.Text text in children){
                text.color = new Color(0f,0f,0f,0f);
        }
        this.gameObject.GetComponent<Transform>().Find("Button").gameObject.GetComponent<Image>().color = new Color(1f,1f,1f,0f);
        
        days_text.color = new Color(0f,0f,0f,0f);
        ap_text.color = new Color(0f,0f,0f,0f);
        modeBtn.GetComponent<Image>().color = new Color(0f,0f,0f,0f);
        modeBtn_text.color = new Color(1f,1f,1f,0f);
        StartCoroutine(makeActiveHandler());
    }

    public IEnumerator makeActiveHandler(){
        yield return new WaitForSeconds(1);
        this.gameObject.GetComponent<Image>().color = new Color(1f,1f,1f, 1f);
        UnityEngine.UI.Text []children = this.gameObject.GetComponentsInChildren<UnityEngine.UI.Text>();
        foreach (UnityEngine.UI.Text text in children){
                text.color = new Color(0f,0f,0f,1f);
        }
        this.gameObject.GetComponent<Transform>().Find("Button").gameObject.GetComponent<Image>().color = new Color(1f,1f,1f,1f);
        days_text.color = new Color(0f,0f,0f,1f);
        ap_text.color = new Color(0f,0f,0f,1f);
        modeBtn.GetComponent<Image>().color = new Color(1f,1f,1f,1f);
        modeBtn_text.color = new Color(1f,1f,1f,1f);
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
