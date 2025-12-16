using UnityEngine;
using System.Runtime.InteropServices;
using Unity.VisualScripting;
using Unity.Mathematics;

///<Summary>
/// Unity와 JavaScript 간 통신을 관리하는 클래스
/// </Summary>

public class WebCommunication : MonoBehaviour
{
    // Singleton패턴
    public static WebCommunication Instance
    {
        get;
        private set;
    }

    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    //==================================================
    // Unity -> JavaScript (C# -> JS)
    //==================================================
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void SendMessageToJS(string message);

    [DllImport("__Internal")]
    private static exten void SendFuniturePlaced(string furnitureName, float x, float y, float z);
#endif

///<Summary>
/// JsavaScript로 일반 메시지 전송
/// </Summary>

    public void SendToJavaScript(string message)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        SendMessageToJS(message);
        Debug.Log($"[Unity -> JS] {message}");
#else   
        Debug.Log($"[Unity -> JS(Editor) {message}]");
#endif
    }

    ///<summary>
    /// 가구 배치 정보를 JavaScript로 전송
    /// </summary>

    public void NotifyFurniturePlaced(string furnitureName, Vector3 position, Quaternion rotation)
    {
        float rotationY = rotation.eulerAngles.y;

#if UNITY_WEBGL && !UNITY_EDITOR
        SendFuniturePlaced(
            furnitureName, 
            position.x, position.y, position.z,
            rotationY);
        Debug.Log($"[Unity -> JS] Furniture Placed : {furnitureName} at {position}, rotation: {rotationY}");
#else
        Debug.Log($"[Unity -> JS (Editor)] Furniture Placed : {furnitureName} at {position}, rotation: {rotationY}");
#endif
    }

    //==============================================
    // JavaScript -> Unity(JS -> C#)
    // =============================================

    ///<summary>
    /// JavaScript에서 호출 : 일반 메시지 수신
    /// </summary>
    public void ReceiveMessageFromJS(string message)
    {
        Debug.Log($"[JS -> Unity] Received : {message}");

        // TODO : 메시지에 따른 처리
    }

    ///<summary>
    /// JavaScript에서 호출 : 가구 추가 요청
    /// </summary>

    public void AddFuniture(string furnitureIndex)
    {
        Debug.Log($"[JS -> Unity] Add Funiture Request: {furnitureIndex}");

        // TODO : FuniturePlacer를 통해 가구 추가
    }

    ///<summary>
    /// JavaScript에서 호출 : 씬 리셋 요청
    /// </summary>
    public void ResetScene()
    {
        Debug.Log($"[JS -> Unity] Reset Scene Request");

        // TODO : 모든 가구 삭제
    }

    // ============================================
    // 테스트용 메서드
    // ============================================

    void Update()
    {
        // 테스트: Space 키로 메시지 전송
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SendToJavaScript("Hello from Unity!");
        }

        // 테스트: T 키로 가구 배치 알림
        if (Input.GetKeyDown(KeyCode.T))
        {
            NotifyFurniturePlaced("TestSofa", new Vector3(1, 0, 1), Quaternion.Euler(0, 45, 0));
        }
    }

}