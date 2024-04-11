using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Bar : MonoBehaviour
{

    [SerializeField] private Slider politics;

    [SerializeField] private Slider technology;

    [SerializeField] private Slider medicine;

    [SerializeField] private Slider economics;

    [SerializeField] private Slider enviromental;

    [SerializeField] Player player;

    [SerializeField] private Slider writing;

    [SerializeField] private Slider researchSkill;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(player != null){
            if(politics != null){
                politics.value = player.getPoliticsPoints();
            }
            if(technology != null){
                technology.value = player.getTechnologyPoints();
            }
            if(medicine != null){
                medicine.value = player.getMedicinePoints();
            }
            if(economics != null){
                economics.value = player.getEconomicsPoints();
            }
            if(enviromental != null){
                enviromental.value = player.getEnviromentalPoints();
            }
            if(writing != null){
                writing.value = player.getWritingPoints();
            }
            if(researchSkill != null){
                researchSkill.value = player.getResearchSkillPoints();
            }
        }
    }
}