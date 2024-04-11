using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ActionPointsUI : MonoBehaviour
{
    public Player player;
    private UnityEngine.UI.Text text;
    // Start is called before the first frame update
    void Start()
    {
         this.text = gameObject.GetComponent<UnityEngine.UI.Text>();
    }

    // Update is called once per frame
    void Update()
    {
        string text = "AP: " + player.getAvailableActionPoints();
        this.text.text = text;
        if(player.getAvailableActionPoints() == 0){
            this.text.color = new Color(1f,0f,0.2077f,1f);
        }
    }
}
