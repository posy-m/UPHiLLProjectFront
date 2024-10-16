"use client"
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
import customAxios from '@/lib/customAxios';
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

    const getMessage = (e)=>{
        const { data: { lat, lng } } = e;
        setLat(lat);
        setLng(lng);
    }
    const initMap=async()=>{
        await loader.load().then(() => {
            maps= new google.maps.Map(
                document.getElementById("map") as HTMLElement,
                {
                ...mapOptions,
                center: { lat: initialLat + 0.003, lng: initialLng }, // 하단에 캐릭터를 고정하기 위해 중심을 위로 이동
                zoom: initialZoom,
                disableDefaultUI: true,
            });
        })
    }
    const initMaker = ()=>{
        // 아바타만들어어야할곳 
        // maker = new window.google.maps.Marker({
        //     // position: {0,0 },
        //      map:maps,
        //      // 추후 아바타로 변경
        //      icon: {
        //          url: "/welsh02.png",
        //          //scaledSize: new google.maps.Size(32, 32)
        //      }
        //  });
    }

    const setPostion = ()=>{
        if(maps!==null)
            maps.setCenter({lat,lng})
        if(maker!==null)
            maker.setPosition({lat,lng})
    }

    useEffect (()=>{
        window.onmessage=getMessage;
        initMap()
        initMaker()
        setInitialLat(lat);  // 처음 위치 저장
        setInitialLng(lng);  // 처음 위치 저장
    },[])

    useEffect(()=>{
        // 고도 정보 가져오기
        const fetchElevation = async () => {
            try {
                const response = await customAxios.get("http://localhost:4000/geolocation/elevation", {
                    params: { lat, lng }
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
            } else {
                console.error("고도 데이터를 가져오는 데 실패했습니다:", response.data);
            }
        } catch (error) {
            console.error("고도 정보를 가져오는 중 오류 발생:", error);
        }
    };
    fetchElevation();
    setPostion();
    },[lat,lng])

    useEffect(() => {
        // 포인트 적립 로직
        if (high > prevHigh) {
            const heightDifference = high - prevHigh;
            if (heightDifference >= 20) {
                const pointsToAdd = Math.floor(heightDifference / 20) * 10; // 20m마다 10포인트
                setPoints(prevPoints => prevPoints + pointsToAdd);
                setPrevHigh(high); // 현재 고도를 이전 고도로 업데이트
            }
        }
    }, [lat, lng, high, prevHigh]); // lat, lng, high, prevHigh가 변경될 때마다 실행

    
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
