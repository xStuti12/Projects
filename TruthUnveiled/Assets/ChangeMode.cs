using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChangeMode : MonoBehaviour
{

    public UnityEngine.UI.Text btnText;
    public UnityEngine.UI.Image background;

    public Sprite windows;
    public Sprite kali;

    private bool isKali;
    // Start is called before the first frame update
    void Start()
    {
        isKali = false;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void changeImage(){
        background.sprite = isKali ? windows : kali;
        btnText.text = isKali ? "Pro mode" : "Noob mode";
        isKali = !isKali;
    }
}
