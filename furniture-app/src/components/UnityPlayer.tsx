import React, { useState, useEffect, useCallback } from "react";
import {Unity, useUnityContext} from 'react-unity-webgl';

const UnityPlayer = () => {
    const{
        unityProvider,
        isLoaded, 
        loadingProgression, 
        addEventListener: addUnityEventListener,
        removeEventListener: removeUnityEventListener} = useUnityContext({
        loaderUrl: '/unity-build/Build/FurnitureSimulator.loader.js',
        dataUrl: '/unity-build/Build/FurnitureSimulator.data',
        frameworkUrl: '/unity-build/Build/FurnitureSimulator.framework.js',
        codeUrl: '/unity-build/Build/FurnitureSimulator.wasm'
    });

    // 개구 배치 정보 저장
    const [placedFurniture, setPlacedFurniture] = useState<string[]>([]);
    const [lastMessage, setLastMessage] = useState<string>('');

    const handleFurniturePlaced = useCallback((data:any) => {
            console.log('Unity에서 받은 데이터: ', data);
            const furnitureInfo = typeof data === 'string' ? data : JSON.stringify(data);
            setLastMessage(`가구 배치됨: ${furnitureInfo}`);
      
            // 배치된 가구 목록에 추가
            setPlacedFurniture(prev => [...prev, furnitureInfo]);

        },[])

    //  Unity -> React 통신
    useEffect(()=>{

        console.log('UseEffect');

        
        // Unity에서 "FurniturePlaced" 이벤트 수신
        //addUnityEventListener('FurniturePlaced', handleFurniturePlaced);
        window.addEventListener('FurniturePlaced', handleFurniturePlaced)

        console.log(handleFurniturePlaced.call);
        // cleanup
        return () => {
            window.removeEventListener('FurniturePlaced', handleFurniturePlaced);
        };

    },[]);

    return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#282c34',
    }}>
      {/* 왼쪽: Unity */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {!isLoaded && (
          <div style={{
            color: 'white',
            fontSize: '24px',
            marginBottom: '20px',
          }}>
            <p>Loading... {Math.round(loadingProgression * 100)}%</p>
            <div style={{
              width: '300px',
              height: '30px',
              backgroundColor: '#444',
              borderRadius: '15px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${loadingProgression * 100}%`,
                height: '100%',
                backgroundColor: '#61dafb',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        )}
        
        <Unity
          unityProvider={unityProvider}
          style={{
            width: '960px',
            height: '600px',
            visibility: isLoaded ? 'visible' : 'hidden'
          }}
        />
        
        {isLoaded && (
          <p style={{
            color: '#888',
            marginTop: '20px',
            fontSize: '14px'
          }}>
            Unity 가구 배치 시뮬레이터 실행 중
          </p>
        )}
      </div>

      {/* 오른쪽: React UI */}
      <div style={{
        width: '300px',
        backgroundColor: '#1e1e1e',
        padding: '20px',
        color: 'white',
        overflowY: 'auto',
      }}>
        <h2 style={{ marginTop: 0 }}>React UI</h2>
        
        {/* 마지막 메시지 */}
        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
            마지막 이벤트
          </h3>
          <p style={{ margin: 0, color: '#61dafb' }}>
            {lastMessage || '대기 중...'}
          </p>
        </div>

        {/* 배치된 가구 목록 */}
        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '15px',
          borderRadius: '8px',
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
            배치된 가구 ({placedFurniture.length})
          </h3>
          {placedFurniture.length === 0 ? (
            <p style={{ color: '#888', margin: 0 }}>없음</p>
          ) : (
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {placedFurniture.map((item, index) => (
                <li key={index} style={{
                  padding: '8px',
                  backgroundColor: '#383838',
                  marginBottom: '5px',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}>
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnityPlayer;
