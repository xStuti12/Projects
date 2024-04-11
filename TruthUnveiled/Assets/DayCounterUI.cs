using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DayCounterUI : MonoBehaviour
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
        string text = "Days passed: " + player.getDaysPassed();
        this.text.text = text;
    }
}
