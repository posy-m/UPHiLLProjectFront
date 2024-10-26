'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import Goback from './components/Goback';
import Avata from './components/Avata';
import FootPoinNickAlt from './components/FootPoinNickAlt';
import Footerbar from '../_components/footerbar/footerbar';
import customAxios from '@/lib/customAxios';
import getUserInfo from '@/lib/getUserInfo';
import { userInfo, isLoginAtom } from '../(jotai)/atom';
import { useAtom } from 'jotai';

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
    const [isLogin, setIsLogin] = useAtom(isLoginAtom);
    const [user, setUser] = useAtom(userInfo);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [initialLat, setInitialLat] = useState<number>(0); // 처음 GPS 위치 저장
    const [initialLng, setInitialLng] = useState<number>(0); // 처음 GPS 위치 저장
    const [initialZoom, setInitialZoom] = useState<number>(18); // 초기 줌 레벨
    const [high, setHigh] = useState<number>(0);
    const [prevHigh, setPrevHigh] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [prevLat, setPrevLat] = useState(lat);
    const [prevLng, setPrevLng] = useState(lng);
    const [nickname, setNickname] = useState<string>('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showReturnButton, setShowReturnButton] = useState<boolean>(false);
    const mapRef = useRef<google.maps.Map | null>(null); // 지도 참조
    const [maker, setMaker] = useState<google.maps.Marker | null>(null); //마커
    // 아바타 상태 관리
    const [avatarImage, setAvatarImage] = useState("/skyHatFront.png"); // 정면 이미지
    const [isMoving, setIsMoving] = useState(false); // 움직임 상태
    // 애니메이션 프레임
    let animationFrameId: number;

    // let maps: google.maps.Map | null = null;
    // let maker: google.maps.Marker | null = null;

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user.email !== '') {
                const info = await getUserInfo();
                setUser(info); // 유저 정보를 아톰에 저장
                setIsLogin(true); // 로그인 상태 업데이트
            }
        };

        fetchUserInfo();
    }, []);


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

    // GPS 위치 가져오깅
    const getPosition = () => {
        navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLng(longitude);

            // 지도 초기화 후 첫 위치 설정 시에만 지도 중심 설정
            // 초기 위치 설정과 지도 중심 설정을 분리하여 더 효율적이고 깔끔하게 위치 변경과 고도 데이터를 처리
            if (map && initialLat === 0 && initialLng === 0) {
                setInitialLat(latitude);
                setInitialLng(longitude);
                map.setCenter({ lat: latitude, lng: longitude });
            }
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

    const setPosition = () => {
        if (map !== null) {
            console.log(lat, lng)
            map.setCenter({ lat, lng })
        }
        if (maker !== null) {
            maker.setPosition({ lat, lng })
        }
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
            setLat(lat);
            setLng(lng);
        };
        // getPosition();
        initMap()
        setInitialLat(lat);  // 처음 위치 저장
        setInitialLng(lng);  // 처음 위치 저장
    }, [])

    useEffect(() => {
        // 고도 정보 가져오기
        const fetchElevation = async () => {
            try {
                if (Math.abs(lat - prevLat) > 0.002 || Math.abs(lng - prevLng) > 0.002) {
                    console.log("요청")
                    const response = await customAxios.post("/geolocation/elevation", {
                        lat, lng
                    });

                    if (response.status === 201) {
                        // alert(response.data)
                        const newHigh = response.data
                        setHigh(newHigh);

                        // 고도가 이전 고도보다 높을 경우 포인트 추가
                        if (newHigh >= (prevHigh + 5)) {
                            setPrevHigh(newHigh); // 이전 고도 값 갱신

                            const pointsToAdd = Math.floor((newHigh - prevHigh) / 5) * 10; // 20m마다 10포인트

                            await customAxios.post("/user/pointStack", { points: pointsToAdd });
                            //await updatePoints(pointsToAdd); // 서버 요청 호출
                            setPoints(prevPoints => prevPoints + pointsToAdd); // 업데이트된 포인트 설정,누적 포인트 업데이트

                        }
                    } else {
                        console.error("고도 데이터를 가져오는 데 실패했습니다:", response.data);
                    }
                }
            } catch (error) {
                console.error("고도 정보를 가져오는 중 오류 발생:", error);
            }
        };
        // 고도 정보만 가져오고 지도 위치를 설정하는 부분은 분리
        if (Math.abs(lat - initialLat) > 0.002 || Math.abs(lng - initialLng) > 0.002) {
            // 일정한 위치 변화가 있는 경우에만 고도 요청
            fetchElevation();
        }

        // lat, lng 업데이트 시 한 번만 지도 위치 설정 
        // 지도 위치가 초기화되지 않거나 큰 변화가 있을 때만 setPosition()**을 호출
        // 불필요한 지도의 중심 변경을 방지
        if (map && (lat !== 0 && lng !== 0)) {
            setPosition();
        }
    }, [lat, lng, prevHigh])

    // useEffect(() => {
    //     // 포인트 적립 로직
    //     if (high >= prevHigh + 20) {
    //         const pointsToAdd = Math.floor((high - prevHigh) / 20) * 10; // 20m마다 10포인트
    //         setPoints(prevPoints => prevPoints + pointsToAdd);
    //         setPrevHigh(high); // 현재 고도를 이전 고도로 업데이트
    //     }
    // }, [lat, lng, high, prevHigh]); // lat, lng, high, prevHigh가 변경될 때마다 실행



    const updatePoints = async (pointsToAdd: number) => {

        try {
            await customAxios.post("/user/pointStack", { points: pointsToAdd });
        } catch (error) {
            console.error("포인트 저장 중 오류 발생:", error);
        }
    };
    useEffect(() => {
        // 포인트 적립 로직
        const pointStack = async () => {
            if (high >= (prevHigh + 5)) {
                const pointsToAdd = Math.floor((high - prevHigh) / 5) * 10; // 20m마다 10포인트
                await updatePoints(pointsToAdd); // 서버 요청 호출
                setPoints(prevPoints => prevPoints + pointsToAdd); // 업데이트된 포인트 설정,누적 포인트 업데이트
                setUser({ ...user, point: (parseInt(user.point) + pointsToAdd) + "" })
            }
        }
        pointStack();
    }, [high, prevHigh]); // lat, lng, high, prevHigh가 변경될 때마다 실행




    // useEffect(() => {
    //     // 포인트 적립 로직
    //     if (high >= prevHigh + 20) {
    //         const pointsToAdd = Math.floor((high - prevHigh) / 20) * 10; // 20m마다 10포인트
    //         setPoints(prevPoints => prevPoints + pointsToAdd); // 포인트 업데이트
    //         setPrevHigh(high); // 현재 고도를 이전 고도로 업데이트

    //         // 서버에 포인트 적립 요청
    //         const updatePoints = async () => {
    //             try {
    //                 await customAxios.post("user/pointStack", { points: pointsToAdd });
    //             } catch (error) {
    //                 console.error("포인트 적립 요청 중 오류 발생:", error);
    //             }
    //         };

    //         updatePoints();
    //     }
    // }, [lat, lng, high, prevHigh]);




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
                <FootPoinNickAlt elevation={high} nickname={user.nickName || 'Loading...'} points={points} />
            </div>
            <Footerbar />
        </>
    );
}

export default Maps;
