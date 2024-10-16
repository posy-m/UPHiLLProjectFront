"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';
import Altitude from './components/Altitude';
import Nicname from './components/Nicname';
import Point from './components/Point';
import Goback from './components/Goback';
import Avata from './components/Avata';
import FootPoinNickAlt from './components/FootPoinNickAlt';
import Footerbar from '../_components/footerbar/footerbar';
import customAxios from '@/lib/customAxios';
interface MessageData {
    lat: number;
    lng: number;
}

// global.d.ts
export { };
declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
    }
}

function Maps() {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [initialLat, setInitialLat] = useState(0); // 처음 GPS 위치 저장
    const [initialLng, setInitialLng] = useState(0); // 처음 GPS 위치 저장
    const [initialZoom, setInitialZoom] = useState(18); // 초기 줌 레벨
    const [high, setHigh] = useState(0);
    const [prevHigh, setPrevHigh] = useState(0);
    const [points, setPoints] = useState(0);
    const [nickname, setNickname] = useState('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showReturnButton, setShowReturnButton] = useState<boolean>(false);
    const mapRef = useRef<google.maps.Map | null>(null);

    let maps = null;
    let maker = null;

    const loader = new Loader({
        apiKey: "", // 본인 Google Maps API KEY를 입력
        version: "weekly",
    });

    const mapOptions = {
        mapId: "",
        zoom: initialZoom,
        tilt: 90,
        // heading: 90,
        disableDefaultUI: true, // 기본 UI 비활성화
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
                                center: { lat: userLat + 0.002, lng: userLng }, // 하단에 캐릭터를 고정하기 위해 중심을 위로 이동
                                zoom: initialZoom,
                                disableDefaultUI: true,
                            });
                        mapRef.current = map;
                        setMap(map);

                        // 지도 움직임을 감지하여 버튼 보이기
                        map.addListener("dragstart", () => {
                            setShowReturnButton(true); // 지도가 움직이면 버튼 보이기
                        });
                        // 지도 위치가 변경될 때 버튼을 보이게 하는 이벤트 추가
                        map.addListener("center_changed", () => {
                            setShowReturnButton(true);
                        });
                        return map;
                    });

                    // 고도 정보 가져오기
                    const response = await axios.get("http://localhost:4000/geolocation/elevation", {
                        params: { lat: userLat, lng: userLng }
                    });

                    if (response.status === 200) {
                        const newHigh = response.data.results[0].elevation;
                        setHigh(newHigh);

                        if (newHigh > prevHigh) {
                            const pointIncrement = Math.floor(newHigh - prevHigh);
                            setPoints(prevPoints => prevPoints + pointIncrement);
                            setPrevHigh(newHigh);
                        }
                    }
                });
            } catch (error) {
                console.error("지도를 로드하는 중 문제가 발생했습니다:", error);
            }
        };

        initializeMap();
    }, [prevHigh]);

    // 현재 위치로 돌아가는 함수
    const recenterMap = () => {
        if (mapRef.current) {
            const offsetLat = 0.002; // 캐릭터를 하단에 고정하기 위한 오프셋
            mapRef.current.setCenter({ lat: initialLat + offsetLat, lng: initialLng });
            mapRef.current.setZoom(initialZoom); // 초기 줌 레벨로 설정
            setShowReturnButton(false); // 위치로 돌아간 후 버튼 숨김
        }
    };


    return (
        <div style={{ position: "relative", width: '100vw', height: '100vh' }}>
            {/* FooterBar 컴포넌트를 하단에 추가 */}
            <FootPoinNickAlt elevation={high} nickname={nickname} points={points} />

            {/* <Altitude elevation={high} /> */}
            {/* 닉네임과 포인트를 감싸는 div
            <div style={{
            position: 'absolute',
            top: '5px', // 상단에서 20px 떨어진 위치
            right: '15px', // 우측에서 20px 떨어진 위치
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 반투명 흰색 배경
            borderRadius: '8px', // 모서리 둥글게
            padding: '10px', // 안쪽 여백
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 효과
            display: 'flex', // 플렉스 박스 사용
            flexDirection: 'column', // 세로 방향 정렬
            alignItems: 'flex-start', // 왼쪽 정렬
            zIndex: 10 // zIndex 추가
        }}>
            <Nicname nickname={nickname} />
            <Point points={points} />
        </div> */}

            <div id='map' style={{ width: '100%', height: '100%' }}></div>

            {/* showReturnButton이 true일 때만 버튼 표시 */}
            {showReturnButton && <Goback onClick={recenterMap} />}
            {map && <Avata lat={lat} lng={lng} map={map} />}

            <Footerbar />
        </div>
    );
}

export default Maps;
