"use client"
/// <reference types="@types/google.maps" />

import React, { useEffect, useState,useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';
import Altitude from './components/Altitude';
import Nicname from './components/Nicname';
import Point from './components/Point';
import Goback from './components/Goback';
import Avata from './components/Avata';
import FootPoinNickAlt from './components/FootPoinNickAlt';
import Footerbar from '../_components/footerbar/footerbar';



interface MessageData {
    lat:number;
    lng:number;
}

// global.d.ts
export {};
declare global {
interface Window {
    ReactNativeWebView?: {
    postMessage: (message: string) => void;
        };
    }
}



function Maps() {
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [initialLat, setInitialLat] = useState<number>(0); // 처음 GPS 위치 저장
    const [initialLng, setInitialLng] = useState<number>(0); // 처음 GPS 위치 저장
    const [initialZoom,setInitialZoom] = useState<number>(18); // 초기 줌 레벨
    const [high, setHigh] = useState<number>(0);
    const [prevHigh, setPrevHigh] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [nickname, setNickname] = useState<string>('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showReturnButton, setShowReturnButton] = useState<boolean>(false);
    const mapRef = useRef<google.maps.Map | null>(null);


    const loader = new Loader({
        apiKey: "", // 본인 Google Maps API KEY를 입력
        version: "weekly",
    });

    const mapOptions = {
        mapId: "",
        zoom: initialZoom,
        tilt: 90,
        disableDefaultUI:true, // 기본 UI 비활성화
    }



    const handleMessage= (e:MessageEvent<MessageData>)=>{
        const {lat,lng} = e.data;
        if(lat !== undefined && lng !== undefined && map){
            map.setCenter({lat,lng});
            mapRef.current?.setCenter({lat,lng})
            setLat(lat)
            setLng(lng)
        } else {
            console.error("Lat or Lng is undefined in the message data");
        }
    }



    useEffect(() => {
            const initializeMap = async () => {
                try {
                    // 유저 데이터 가져오기
                    //const userResponse = await axios.get('http://localhost:4000/user');
                    //setNickname(userResponse.data.nickname);
        
                    // 현재 위치 가져오기
                    navigator.geolocation.getCurrentPosition(async (data) => {
                        const userLat = data.coords.latitude;
                        const userLng = data.coords.longitude;

                        setLat(userLat);
                        setLng(userLng);
                        setInitialLat(userLat);  // 처음 위치 저장
                        setInitialLng(userLng);  // 처음 위치 저장
        
                        const loadedMap = await loader.load().then(() => {
                            const map = new google.maps.Map(
                                document.getElementById("map") as HTMLElement,
                                {
                                ...mapOptions,
                                center: { lat: userLat + 0.003, lng: userLng }, // 하단에 캐릭터를 고정하기 위해 중심을 위로 이동
                                zoom: initialZoom,
                                disableDefaultUI: true,
                            });
                            mapRef.current = map;
                            setMap(map);

                            // 지도 움직임을 감지하여 버튼 보이기
                            map.addListener("dragstart", () => {
                                setShowReturnButton(true); // 지도가 움직이면 버튼 보이기
                            });
                            return map;
                        });
        
                        // 고도 정보 가져오기
                        const response = await axios.get("http://localhost:4000/geolocation/elevation", {
                            params: { lat: userLat, lng: userLng }
                        });
        
                               // 응답 데이터 확인
                               console.log(response.data); // API 응답 로그

                        if (response.status === 200 && response.data.results && response.data.results.length > 0) {
                            const newHigh = response.data.results[0].elevation;
                            setHigh(newHigh);
        
                            if (newHigh > prevHigh) {
                                const pointIncrement = Math.floor(newHigh - prevHigh);
                                setPoints(prevPoints => prevPoints + pointIncrement);
                                setPrevHigh(newHigh);
                            }
                        }else {
                            console.error("고도 데이터를 가져오는 데 실패했습니다:", response.data);
                        }
                    });
                } catch (error) {
                    console.error("지도를 로드하는 중 문제가 발생했습니다:",error);
                }
            };
        
            // 메시지 이벤트 리스너 등록
            window.addEventListener('message', handleMessage);
        
            // ReactNativeWebView가 있을 경우 메시지 전송
            if (typeof window !== 'undefined' && window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage("Response from Next.js");
            } else {
            console.error("ReactNativeWebView is not available");
            }
            
            initializeMap();

            // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('message', handleMessage);
        };

        }, [prevHigh,map]);

        // 현재 위치로 돌아가는 함수
    const recenterMap = () => {
        if (mapRef.current) {
            const offsetLat = 0.003; // 캐릭터를 하단에 고정하기 위한 오프셋
            mapRef.current.setCenter({ lat: initialLat + offsetLat, lng:initialLng});
            mapRef.current.setZoom(initialZoom); // 초기 줌 레벨로 설정
            setShowReturnButton(false); // 위치로 돌아간 후 버튼 숨김
        }
    };
        

    return (
        <div style={{ position: "relative", width: '100vw', height: '100vh' }}>
            {/* FooterBar 컴포넌트를 하단에 추가 */}
            <FootPoinNickAlt elevation={high} nickname={nickname} points={points} />
            
            <div id='map' style={{ width: '100%', height: '100%' }}></div>

            {/* showReturnButton이 true일 때만 버튼 표시 */}
            {showReturnButton && <Goback onClick={recenterMap} />}
            {map && <Avata lat={lat} lng={lng} map={map} />}
            
            <Footerbar/>
        </div>
    );
}

export default Maps;
