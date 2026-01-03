import React from "react";
import {Unity, useUnityContext} from 'react-unity-webgl';

const UnityPlayer = () => {
    const{unityProvider, isLoaded, loadingProgression} = useUnityContext({
        loaderUrl: '/unity-build/Build/FurnitureSimulator.loader.js',
        dataUrl: '/unity-build/Build/FurnitureSimulator.data',
        frameworkUrl: '/unity-build/Build/FurnitureSimulator.framework.js',
        codeUrl: '/unity-build/Build/FurnitureSimulator.wasm'
    });

    return(
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#282c34',
        }}>
            {!isLoaded &&(
                <div style={{
                    color: 'white',
                    fontSize: '24px',
                    marginBottom: '20px',
                }}>
                    <p>
                        Loading...{Math.round(loadingProgression)}
                    </p>
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
                            background: '#61dafb',
                            transition: 'width 0.3s'
                        }}/>
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

            {isLoaded &&(
                <p style={{
                    color: '#888',
                    marginTop: '20px',
                    fontSize: '14px'
                }}>
                    Unity 가구 배치 시뮬레이터 실행 중
                </p>
            )}
        </div>
    );
}

export default UnityPlayer;