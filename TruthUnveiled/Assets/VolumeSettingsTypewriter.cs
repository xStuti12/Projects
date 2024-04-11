using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

public class VolumeSettingsTypewriter : MonoBehaviour
{
    [SerializeField] private AudioMixer myMixer;

    private void Start(){
        myMixer.SetFloat("music", Mathf.Log10(PlayerPrefs.GetFloat("SFXVolume"))*20);
        myMixer.SetFloat("sfx", Mathf.Log10(PlayerPrefs.GetFloat("MusicVolume"))*20);
    }
}
