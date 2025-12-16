// ============================================
// WebBridge.jslib
// Unity와 JavaScript를 연결하는 브릿지 파일
// 위치: Assets/Plugins/WebGL/WebBridge.jslib
// ============================================

mergeInto(LibraryManager.library, {

    // ============================================
    // Unity → JavaScript 함수들
    // ============================================

    /**
     * Unity에서 JavaScript로 일반 메시지 전송
     * @param {string} message - 전송할 메시지
     */
    SendMessageToJS: function(message) {
        // C 문자열을 JavaScript 문자열로 변환
        var msg = UTF8ToString(message);
        
        console.log('[Unity → JS] Message:', msg);
        
        // 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent('UnityMessage', {
            detail: { message: msg }
        }));
        
        // 또는 직접 함수 호출 (HTML에 정의된 함수)
        if (typeof window.onUnityMessage === 'function') {
            window.onUnityMessage(msg);
        }
    },

    /**
     * Unity에서 JavaScript로 가구 배치 정보 전송
     * @param {string} furnitureName - 가구 이름
     * @param {float} x - X 좌표
     * @param {float} y - Y 좌표
     * @param {float} z - Z 좌표
     * @param {float} rotationY - 회전 Y 각도
     */
    SendFurniturePlaced: function(furnitureName, x, y, z, rotationY) {
        var name = UTF8ToString(furnitureName);
        
        var data = {
            type: 'furniturePlaced',
            furniture: name,
            position: { x: x, y: y, z: z }
            rotation: rotationY,
            timestamp: Date.now()
        };
        
        console.log('[Unity → JS] Furniture Placed:', data);
        
        // 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent('FurniturePlaced', {
            detail: data
        }));
        
        // 또는 직접 함수 호출
        if (typeof window.onFurniturePlaced === 'function') {
            window.onFurniturePlaced(data);
        }
    }

    // ============================================
    // 필요한 경우 추가 함수들
    // ============================================
    
    // 예: 브라우저 정보 가져오기
    // GetBrowserInfo: function() {
    //     var info = navigator.userAgent;
    //     var bufferSize = lengthBytesUTF8(info) + 1;
    //     var buffer = _malloc(bufferSize);
    //     stringToUTF8(info, buffer, bufferSize);
    //     return buffer;