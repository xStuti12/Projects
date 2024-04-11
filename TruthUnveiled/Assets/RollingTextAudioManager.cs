using UnityEngine;
using UnityEngine.Audio;

public class RollingTextAudioManager : MonoBehaviour
{

    [Header("------------- Audio Source -------------")]
    [SerializeField] AudioSource musicSource;
    [Header("------------- Audio Clip -------------")]
    public AudioClip background;
    public AudioMixer mixer;

    private void Start(){
        mixer.SetFloat("music", Mathf.Log10(PlayerPrefs.GetFloat("musicVolume"))*20);
       
        musicSource.clip = background;
        musicSource.Play(); 
    }

    /* public void playMusic(){
        musicSource.clip = background;
        musicSource.Play();
    } */

}
