using UnityEngine;
using UnityEngine.Audio;


public class AudioManager : MonoBehaviour
{
    [Header("------------- Audio Source -------------")]
    [SerializeField] AudioSource musicSource;
    [SerializeField] AudioSource SFXSource;
    [Header("------------- Audio Clip -------------")]
    public AudioClip background;
    public AudioClip thunderstorm;
    public AudioClip glass;
    public AudioClip inputError;
    public AudioClip publicTrustDown;
    public AudioClip publicTrustUp;
    public AudioMixer mixer;

    private void Start(){
        mixer.SetFloat("sfx", Mathf.Log10(PlayerPrefs.GetFloat("SFXVolume"))*20);

        mixer.SetFloat("music", Mathf.Log10(PlayerPrefs.GetFloat("musicVolume"))*20);
        /* musicSource.clip = background;
        musicSource.Play(); */
    }

    public void playThunder(){
        SFXSource.PlayOneShot(this.thunderstorm);
    }

    public void playGlass(){
        SFXSource.PlayOneShot(this.glass);
    }

    public void playInputError(){
        SFXSource.PlayOneShot(this.inputError);
    }

    public void playPublicTrustDown(){
        SFXSource.PlayOneShot(this.publicTrustDown);
    }

    public void playPublicTrustUp(){
        SFXSource.PlayOneShot(this.publicTrustUp);
    }
    
    [SerializeField] AudioClip clip;
    public void PlaySFX(AudioClip clip){
        SFXSource.PlayOneShot(clip);
    }


}