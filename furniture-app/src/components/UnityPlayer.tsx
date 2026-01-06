import React, { useState, useEffect, useCallback } from "react";
import {Unity, useUnityContext} from 'react-unity-webgl';

interface FurnitureItem{
    furnitureId: string,
    furniture: string;
    position: {x : number, y: number, z: number};
    rotation: number;
    timestamp: number;
};

// 색상 테마 정의
const theme = {
    background : {
        main: '#282c34',
        dark: '#1e1e1e',
        surface: '#2d2d2d',
        elevated: '#383838',
    },
    text: {
        primary: '#ffffff',
        secondary: '#cccccc',
        tertiary: '#888888',
    },
    accent:{
        primary: '#61dafb',
        secondary: '#4fa8c5',
        danger: '#e74c3c',
        dangerHover: '#c0392b',
    },
        spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
    },
        fontSize: {
        large: '18px',
        medium: '14px',
        small: '12px',
    },
        borderRadius: {
        small: '4px',
        medium: '6px',
        large: '8px',
    },
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
      backgroundColor: theme.background.main,
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
            color: theme.text.primary,
            fontSize: '24px',
            marginBottom: theme.spacing.xl,
          }}>
            <p>Loading... {Math.round(loadingProgression * 100)}%</p>
            <div style={{
              width: '300px',
              height: '30px',
              backgroundColor: theme.background.surface,
              borderRadius: '15px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${loadingProgression * 100}%`,
                height: '100%',
                backgroundColor: theme.accent.primary,
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
            fontSize: theme.fontSize.medium
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
        backgroundColor: theme.background.dark,
        padding: theme.spacing.xl,
        color: theme.text.primary,
        overflowY: 'auto',
      }}>
        <h2 style={{ marginTop: 0 }}>React UI</h2>
        {/* 가구 선택 버튼 */}
        <div style={{
            backgroundColor:theme.background.surface,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.large,
            marginTop: theme.spacing.lg
        }}>
            <h3 style={{
                margin: '0 0 10px 0',
                marginBottom: theme.spacing.md,
                fontSize: theme.fontSize.large,
            }}> 가구 선택 </h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.sm,
            }}>
                {furnitureList.map((furniture)=>(
                    <button 
                        key = {furniture.id}
                        onClick={()=>{handleSelectFurniture(furniture.id)}}
                        disabled = {!isLoaded}
                        style={{
                            padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                            background: isLoaded ? theme.accent.primary: theme.background.elevated ,
                            color: isLoaded ? '#000' :theme.text.tertiary,
                            border: 'none',
                            borderRadius: theme.borderRadius.medium,
                            cursor: isLoaded ? 'pointer' : 'not-allowed',
                            fontSize: theme.fontSize.medium,
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if(isLoaded){
                                e.currentTarget.style.backgroundColor = theme.accent.secondary;
                            }
                        }}
                        onMouseLeave={(e)=>{
                            if(isLoaded){
                                e.currentTarget.style.backgroundColor = theme.accent.primary;
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
          backgroundColor: theme.background.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.large,
          marginBottom: theme.spacing.lg,
        }}>
          <h3 style={{
            margin: 0,
            marginTop: theme.spacing.md,
            fontSize: theme.fontSize.large,
             }}>
            마지막 이벤트
          </h3>
          <p style={{ 
            margin: 0, 
            color: theme.accent.primary,
            fontSize: theme.fontSize.medium,
           }}>
            {lastMessage || '대기 중...'}
          </p>
        </div>

        {/* 배치된 가구 목록 */}
        <div style={{
          backgroundColor: theme.background.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.large,
        }}>
          <h3 style={{ 
            margin: 0, 
            marginBottom: theme.spacing.md,
            fontSize: theme.fontSize.large
            }}>
            배치된 가구 ({placedFurniture.length})
          </h3>
          {placedFurniture.length === 0 ? (
            <p style={{ 
                color: theme.text.tertiary, 
                margin: 0,
                fontSize: theme.fontSize.medium, 
            }}>없음</p>
          ) : (
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
            }}>
              {placedFurniture.map((item, index) => (
                <div
                    key={index}
                    style={{
                        padding: theme.spacing.md,
                        backgroundColor: theme.background.elevated,
                        borderRadius: theme.borderRadius.medium,
                        fontSize: theme.fontSize.small,
                    }}
                >
                    {/*가구 고유 아이디*/}
                    <div style={{
                        fontSize: theme.spacing.md,
                        fontWeight: 'bold',
                        color: theme.accent.primary,
                        marginBottom: theme.spacing.sm,
                    }}>
                        {item.furnitureId}
                    </div>
                    {/*가구 이름*/}
                    <div style={{
                        fontSize: theme.spacing.md,
                        fontWeight: 'bold',
                        color: theme.accent.primary,
                        marginBottom: theme.spacing.sm,
                    }}>
                        {item.furniture}
                    </div>
                    
                    {/*위치*/}
                    <div style={{
                        color: theme.text.secondary,
                        marginBottom: theme.spacing.xs,
                        fontSize: theme.fontSize.small,
                    }}>
                        위치 : ({item.position.x.toFixed(1)}, {item.position.y.toFixed(1)}, {item.position.z.toFixed(1)});
                    </div>

                    {/* 회전 */}
                    <div style={{ 
                        color: theme.text.secondary,
                        marginBottom: theme.spacing.xs,
                        fontSize: theme.fontSize.small
                    }}>
                      회전: {item.rotation.toFixed(0)}°
                    </div>

                    {/* 시간 */}
                    <div style={{ 
                        color: theme.text.tertiary,
                        fontSize: theme.fontSize.small,
                        marginBottom: theme.spacing.md,
                    }}>
                      {new Date(item.timestamp).toLocaleTimeString('ko-KR')}
                    </div>
                    {/* 삭제 버튼 */}
                    <button
                      style={{
                        width: '100%',
                        padding: theme.spacing.md,
                        backgroundColor: theme.accent.danger,
                        color: theme.text.primary,
                        border: 'none',
                        borderRadius: theme.borderRadius.small,
                        cursor: 'pointer',
                        fontSize: theme.fontSize.medium,
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.accent.dangerHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.accent.dangerHover
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
