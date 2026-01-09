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
        var msg = UTF8ToString(message);
        
        console.log('[Unity → JS] Message:', msg);
        
        window.dispatchEvent(new CustomEvent('UnityMessage', {
            detail: { message: msg }
        }));
        
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
     * @param {float} rotationY - Y축 회전값
     */
    SendFurniturePlaced: function(id, typdId, furnitureName,price, x, y, z, rotationY) {
        var name = UTF8ToString(furnitureName);
        var funitureId = UTF8ToString(id);
        var furnitureTypeId = UTF8ToString(typdId);
        
        var data = {
            type: 'furniturePlaced',
            furnitureId: funitureId,
            typeId : furnitureTypeId,
            furniture: name,
            price: price,
            position: { x: x, y: y, z: z },
            rotation: rotationY,
            timestamp: Date.now()
        };
        
        console.log('[Unity → JS] Furniture Placed:', data);
        
        window.dispatchEvent(new CustomEvent('FurniturePlaced', {
            detail: data
        }));
        
        if (typeof window.onFurniturePlaced === 'function') {
            window.onFurniturePlaced(data);
    }
  },

    /**
     * Unity에서 JavaScript로 JSON 데이터 전송 (새로 추가!)
     * @param {string} json - JSON 문자열
     */
    SendJSONToJS: function(json) {
        var jsonString = UTF8ToString(json);
        
        try {
            // JSON 파싱
            var data = JSON.parse(jsonString);
            
            console.log('[Unity → JS] JSON Data:', data);
            
            // 타입별 처리
            if (data.type === 'furnitureList') {
                console.log('📦 Furniture List:');
                console.log('  - Count:', data.furnitureCount);
                console.log('  - Total Cost:', data.totalCost.toLocaleString(), '원');
                console.log('  - Furniture:', data.furniture);
                
                // 각 가구 정보 출력
                data.furniture.forEach(function(item, index) {
                    console.log(`  [${index}] ${item.name}: (${item.position.x.toFixed(1)}, ${item.position.y.toFixed(1)}, ${item.position.z.toFixed(1)}) ${item.rotation}° - ${item.price.toLocaleString()}원`);
                });
            }
            
            // 커스텀 이벤트 발생
            window.dispatchEvent(new CustomEvent('UnityJSON', {
                detail: data
            }));
            
            // 콜백 함수 호출
            if (typeof window.onUnityJSON === 'function') {
                window.onUnityJSON(data);
            }
            
        } catch (e) {
            console.error('[Unity → JS] JSON Parse Error:', e);
            console.error('Raw JSON:', jsonString);
        }
    }

});
