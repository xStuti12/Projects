using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class ProgressBar : MonoBehaviour
{

    [SerializeField] private Slider slider;

    [SerializeField] private int maxPoints = 100;

    [SerializeField] private int minPoints = 0;


    public void UpdateProgressBar(float currentVal, float maxVal)
    {
        float sliderValue = currentVal/maxVal;
        if( sliderValue >= 0 && sliderValue <= maxPoints)
        {
            slider.value = sliderValue;
        }
    }
    // Update is called once per frame
    void Update()
    {

        
    }
}
