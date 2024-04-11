using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

public class VolumeSettings : MonoBehaviour
{
    [SerializeField] private AudioMixer myMixer;
    [SerializeField] private Slider musicSlider;
    [SerializeField] private Slider SFXSlider;

    private void Start(){
        if (PlayerPrefs.HasKey("musicVolume")){
            LoadMusicVolume();
        }
        else{
            SetMusicVolume();
        }

        if (PlayerPrefs.HasKey("SFXVolume")){
            LoadSFXVolume();
        }
        else{
            SetSFXVolume();
        }
    }

    public void SetSFXVolume(){
        float volume = SFXSlider.value;
        myMixer.SetFloat("sfx", Mathf.Log10(volume)*20);
        PlayerPrefs.SetFloat("SFXVolume", volume);
    }

    public void SetMusicVolume(){
        float volume = musicSlider.value;
        myMixer.SetFloat("music", Mathf.Log10(volume)*20);
        PlayerPrefs.SetFloat("musicVolume", volume);
    }

     private void LoadSFXVolume(){
        SFXSlider.value = PlayerPrefs.GetFloat("SFXVolume");
        SetSFXVolume();
    }

    private void LoadMusicVolume(){
        musicSlider.value = PlayerPrefs.GetFloat("musicVolume");
        SetMusicVolume();
    }
}