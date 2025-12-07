using Unity.VisualScripting;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [Header("Rotation Settings")]
    public float rotationSpeed = 100.0f;
    public float verticalRotationSpeed = 50.0f;


    [Header("Zoom Settings")]
    public float zoomSpeed = 10.0f;
    public float minZoom = 3.0f;
    public float maxZoom = 15.0f;
    public float minPitch = 5f;
    public float maxPitch = 85f;

    [Header("Target")]
    public Vector3 targetPosition = Vector3.zero;

    private float currentDistance = 8.0f;
    private float currentYaw = -45f;
    private float currentPitch = 30f;

    void Start()
    {
        UpdateCameraPosition(); 
    }

    void Update()
    {
        HandleZoom();
        HandleRotation();
        UpdateCameraPosition();
    }

    void HandleZoom()
    {
        // 마우스 휠로 줌
        float scroll = Input.GetAxis("Mouse ScrollWheel");
        currentDistance -= scroll * zoomSpeed;
        currentDistance = Mathf.Clamp(currentDistance, minZoom, maxZoom);
    }

    void HandleRotation()
    {
        //우클릭 드래그로 회전
        if (Input.GetMouseButton(1))
        {
            Debug.Log("Right Click");
            float h = Input.GetAxis("Mouse X") * rotationSpeed * Time.deltaTime;
            float v = Input.GetAxis("Mouse Y") * verticalRotationSpeed * Time.deltaTime;

            currentYaw += h;
            currentPitch -= v;

            currentPitch = Mathf.Clamp(currentPitch, minPitch, maxPitch);
        }
    }

    void UpdateCameraPosition()
    {
        // 구면 좌표계로 카메라 위치 계산
        float yawRad = currentYaw * Mathf.Deg2Rad;
        float pitchRad = currentPitch * Mathf.Deg2Rad;

        Vector3 offset = new Vector3(
            currentDistance * Mathf.Sin(pitchRad) * Mathf.Sin(yawRad),
            currentDistance * Mathf.Cos(pitchRad),
            currentDistance * Mathf.Sin(pitchRad) * Mathf.Cos(yawRad)
        );

        transform.position = targetPosition + offset;
        transform.LookAt(targetPosition);
    }
}
