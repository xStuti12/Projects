using UnityEngine.SceneManagement;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneController : MonoBehaviour
{
    public string sceneName;
    [SerializeField] Animator transitionAnim;
    // Start is called before the first frame update

    public void NextScene(){
        StartCoroutine(changeScene());
    }
    
   IEnumerator changeScene(){
        transitionAnim.SetTrigger("End");
        yield return new WaitForSeconds(1);
        SceneManager.LoadScene(sceneName);
        transitionAnim.SetTrigger("Start");
    }
}