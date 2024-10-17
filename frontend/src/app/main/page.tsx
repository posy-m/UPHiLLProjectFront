"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
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
    const mapRef = useRef<google.maps.Map | null>(null); // 지도 참조
    const [maker, setMaker] = useState(null); //마커
    // 아바타 상태 관리
    const [avatarImage, setAvatarImage] = useState("/skyHatFront.png"); // 정면 이미지
    const [isMoving, setIsMoving] = useState(false); // 움직임 상태
    // 애니메이션 프레임
    let animationFrameId: number;

    // let maps: google.maps.Map | null = null;
    // let maker: google.maps.Marker | null = null;

    const mapOptions = {
        mapId: process.env.NEXT_PUBLIC_GOOGLE_API_MAP_ID,
        zoom: initialZoom,
        tilt: 90,
        disableDefaultUI: true, // 기본 UI 비활성화
        gestureHandling: 'greedy' // 한 손으로도 맵을 조작할 수 있도록 설정
    }

    const handleMessage = (e: MessageEvent<MessageData>) => {
        const { lat, lng } = e.data;
        if (lat !== undefined && lng !== undefined && map) {
            map.setCenter({ lat, lng });
            mapRef.current?.setCenter({ lat, lng })
            setLat(lat)
            setLng(lng)
        } else {
            console.error("Lat or Lng is undefined in the message data");
        }
    }

    const getPosition = () => {
        navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLng(longitude);
        })
    }

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY || "", // 본인 Google Maps API KEY를 입력
            version: "weekly",
        });

        const load = await loader.load();
        const googleMap = new load.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                ...mapOptions,
                center: { lat: lat + 0.002, lng: lng },
                zoom: initialZoom,
                disableDefaultUI: true,
            })
        setMap(googleMap)
        mapRef.current = googleMap;
    };

    // 아바타 이미지 배열
    const animateAvatar = () => {
        const avatarImages = {
            front: "/skyHatFront.png",
            left: ["/skyHatFrontLeft.png", "/skyHatFrontRight.png"],
            right: ["/skyHatFrontRight.png", "/skyHatFrontLeft.png"],
        };

        const animationCycle = () => {
            if (isMoving) {
                const currentImage = avatarImages.left[Math.floor(Math.random() * avatarImages.left.length)];
                setAvatarImage(currentImage);
            }
            animationFrameId = requestAnimationFrame(animationCycle);
        };
        animationCycle();
    }

    const setPostion = () => {
        if (map !== null) {
            console.log(lat, lng)
            map.setCenter({ lat, lng })
        }
        if (maker !== null)
            maker.setPosition({ lat, lng })
    }

    useEffect(() => {
        // 사용자의 움직임 감지 캐릭터 움직임
        const detectMovement = () => {
            if (lat !== initialLat || lng !== initialLng) {
                setIsMoving(true); // 캐릭터가 움직이는 상태로 변경
                animateAvatar(); // 아바타 에니메이션 함수 실행
            } else {
                setIsMoving(false); // 캐릭터가 멈춰있는 상태로 변경
                setAvatarImage(avatarImage); // 정면 이미지로 설정
            }
        };

        detectMovement();

        return () => cancelAnimationFrame(animationFrameId); // 컴포넌트 언마운트 시 애니메이션 중지
    }, [lat, lng]);

    useEffect(() => {
        window.onmessage = (e: MessageEvent<MessageData>) => {
            const { lat, lng } = e.data;
            if (lat && lng && map) {
                map.setCenter({ lat, lng });
                setLat(lat);
                setLng(lng);
            }
        };
        getPosition();
        initMap()
        setInitialLat(lat);  // 처음 위치 저장
        setInitialLng(lng);  // 처음 위치 저장
    }, [])

    useEffect(() => {
        // 고도 정보 가져오기
        const fetchElevation = async () => {
            try {
                console.log("요청")
                const response = await customAxios.get("/geolocation/elevation", {
                    params: { lat, lng }
                });

                if (response.status === 200) {
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
        //fetchElevation();
        setPostion();
    }, [lat, lng])

    useEffect(() => {
        // 포인트 적립 로직
        if (high > prevHigh + 20) {
            const pointsToAdd = Math.floor((prevHigh + 20) / 20) * 10; // 20m마다 10포인트
            setPoints(prevPoints => prevPoints + pointsToAdd);
            setPrevHigh(high); // 현재 고도를 이전 고도로 업데이트
        }
    }, [lat, lng, high, prevHigh]); // lat, lng, high, prevHigh가 변경될 때마다 실행

    // 맵 드래그할때 현재위치로 돌아가는버튼 보이게하기
    useEffect(() => {
        if (map) {
            // 지도를 드래그할 때 버튼을 보이도록 설정
            map.addListener("dragstart", () => {
                setShowReturnButton(true);
            });
        }
    }, [map]);

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
        <>
            <div style={{ position: "relative", width: '100vw', height: '100vh' }}>
                {/* FooterBar 컴포넌트를 하단에 추가 */}

                <div id='map' style={{ width: '100%', height: '100%' }}></div>

                {/* showReturnButton이 true일 때만 버튼 표시 */}
                {showReturnButton && <Goback onClick={recenterMap} />}
                {map && <Avata lat={lat} lng={lng} map={map} />}

                <FootPoinNickAlt elevation={high} nickname={nickname} points={points} />
            </div>
            <Footerbar />
        </>
    );
}

export default Maps;
