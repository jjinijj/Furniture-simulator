using UnityEngine;

public class CameraController : MonoBehaviour
{
    public float rotationSpeed = 50.0f;
    public float zoomSpeed = 10.0f;

    public float minZoom = 3.0f;
    public float maxZoom = 15.0f;

    private float currentZoom = 10f;

    void Start()
    {
        transform.position = new Vector3(0, currentZoom, -currentZoom);
        transform.LookAt(Vector3.zero); 
        
    }

    void Update()
    {
        float scroll = Input.GetAxis("Mouse ScrollWheel");
        currentZoom -= scroll * zoomSpeed;
        currentZoom = Mathf.Clamp(currentZoom, minZoom, maxZoom);

        transform.position = new Vector3(0, currentZoom, -currentZoom);
        transform.LookAt(Vector3.zero);

        if (Input.GetMouseButton(1))
        {
            float h = Input.GetAxis("Mouse X") * rotationSpeed * Time.deltaTime;
            transform.RotateAround(Vector3.zero, Vector3.up, h);
        }
    }
}
