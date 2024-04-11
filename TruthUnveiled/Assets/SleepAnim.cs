using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SleepAnim : MonoBehaviour
{
    [SerializeField] Animator transitionAnim;
    // Start is called before the first frame update

    public void Sleeping(){
        StartCoroutine(SleepAnimation());
    }
    
   IEnumerator SleepAnimation(){
        transitionAnim.SetTrigger("End");
        yield return new WaitForSeconds(1);
        transitionAnim.SetTrigger("Start");
    }
}
