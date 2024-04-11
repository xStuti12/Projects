using UnityEngine;

public class AudioManagerMainMenu : MonoBehaviour
{
 
    [SerializeField] AudioSource musicSource;
    [SerializeField] AudioSource SFXSource;

    public AudioClip background;
    public AudioClip click;

    private void Start(){
        musicSource.clip = background;
        musicSource.Play();
    }
    
    [SerializeField] AudioClip clip;
    public void PlaySFX(AudioClip clip){
        SFXSource.PlayOneShot(clip);
    }
}