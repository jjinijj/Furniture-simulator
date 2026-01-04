import React, { useState, useEffect, useCallback } from "react";
import {Unity, useUnityContext} from 'react-unity-webgl';

interface FurnitureItem{
    furnitureId: string,
    furniture: string;
    position: {x : number, y: number, z: number};
    rotation: number;
    timestamp: number;
};

const UnityPlayer = () => {
    const{
        unityProvider,
        isLoaded, 
        loadingProgression, 
        sendMessage,
    } = useUnityContext({
        loaderUrl: '/unity-build/Build/FurnitureSimulator.loader.js',
        dataUrl: '/unity-build/Build/FurnitureSimulator.data',
        frameworkUrl: '/unity-build/Build/FurnitureSimulator.framework.js',
        codeUrl: '/unity-build/Build/FurnitureSimulator.wasm'
    });

    // 개구 배치 정보 저장
    const [placedFurniture, setPlacedFurniture] = useState<FurnitureItem[]>([]);
    const [lastMessage, setLastMessage] = useState<string>('');

    const furnitureList = [
        {id:0, name: 'bed', displayName: '침대'},
        {id:1, name: 'bookshelf', displayName: '책장'},
        {id:2, name: 'cabinet', displayName: '수납장'},
        {id:3, name: 'chair1', displayName: '의자1'},
        {id:4, name: 'table1', displayName: '테이블1'},
        {id:5, name: 'chair2', displayName: '의자2'},
        {id:6, name: 'table2', displayName: '테이블2'},
        {id:7, name: 'sofa', displayName: '소파'},
    ];

    const handleSelectFurniture = (furnitureIndex: number) => {
        if(isLoaded)
        {
            console.log('React -> Unity : 가구 선택 요청', furnitureIndex);
            sendMessage('WebCommunication', 'SelectFurnitureFromJS', furnitureIndex.toString());
        }
    };
    
    const handleFurniturePlaced = useCallback((event:any) => {
            console.log('Unity에서 받은 데이터: ', event.detail);
            
            const data : FurnitureItem = event.detail;
            setLastMessage(`가구 배치됨: ${data.furniture}`);
      
            // 배치된 가구 목록에 추가
            setPlacedFurniture(prev => [...prev, data]);

    },[])

    const handleDeleteFurniture = (furnitureId : string, index: number) => {
        if(isLoaded){
            console.log('React -> Unity: 가구 삭제 요청', furnitureId);

            sendMessage('WebCommunication', 'DeleteFurnitureFromJS', furnitureId.toString());

            setPlacedFurniture(prev => prev.filter((furniture, i) => furnitureId !== furniture.furnitureId));

            setLastMessage(`가구 삭제됨 : ${furnitureId}`);
        }
    };

    //  Unity -> React 통신
    useEffect(()=>{

        console.log('UseEffect');

        // Unity에서 "FurniturePlaced" 이벤트 수신
        //addEventListener('FurniturePlaced', handleFurniturePlaced);
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
            width: '100%',
            height: '100%',
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
        minWidth: '300px',
        flexShrink: 0,
        backgroundColor: '#1e1e1e',
        padding: '20px',
        color: 'white',
        overflowY: 'auto',
      }}>
        <h2 style={{ marginTop: 0 }}>React UI</h2>
        {/* 가구 선택 버튼 */}
        <div style={{
            backgroundColor:'#2d2d2d',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '20px',
        }}>
            <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '16px'
            }}> 가구 선택 </h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {furnitureList.map((furniture)=>(
                    <button 
                        key = {furniture.id}
                        onClick={()=>{handleSelectFurniture(furniture.id)}}
                        disabled = {!isLoaded}
                        style={{
                            padding: '10px',
                            background: isLoaded ? '#61dafb': '#444' ,
                            color: isLoaded ? '#000' :'#888',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoaded ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if(isLoaded){
                                e.currentTarget.style.backgroundColor = '#4fa8c5';
                            }
                        }}
                        onMouseLeave={(e)=>{
                            if(isLoaded){
                                e.currentTarget.style.backgroundColor = '#61dafb';
                            }
                        }}
                        >
                            {furniture.displayName}
                    </button>
                ))}
            </div>
        </div>
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
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {placedFurniture.map((item, index) => (
                <div
                    key={index}
                    style={{
                        padding: '12px',
                        backgroundColor: '#383838',
                        borderRadius: '6px',
                        fontSize: '13px',
                    }}
                >
                    {/*가구 고유 아이디*/}
                    <div style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#61dafb',
                        marginBottom: '6px',
                    }}>
                        {item.furnitureId}
                    </div>
                    {/*가구 이름*/}
                    <div style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#61dafb',
                        marginBottom: '6px',
                    }}>
                        {item.furniture}
                    </div>
                    
                    {/*위치*/}
                    <div style={{
                        color: '#ccc',
                        marginBottom: '3px',
                    }}>
                        위치 : ({item.position.x.toFixed(1)}, {item.position.y.toFixed(1)}, {item.position.z.toFixed(1)});
                    </div>

                    {/* 회전 */}
                    <div style={{ color: '#ccc', marginBottom: '3px' }}>
                      회전: {item.rotation.toFixed(0)}°
                    </div>

                    {/* 시간 */}
                    <div style={{ color: '#888', fontSize: '11px', marginBottom: '8px' }}>
                      {new Date(item.timestamp).toLocaleTimeString('ko-KR')}
                    </div>
                    {/* 삭제 버튼 */}
                    <button
                      style={{
                        width: '100%',
                        padding: '6px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#cc0000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ff4444';
                      }}
                      onClick={()=>handleDeleteFurniture(item.furnitureId, index)}
                    >
                      🗑️ 삭제
                    </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnityPlayer;
