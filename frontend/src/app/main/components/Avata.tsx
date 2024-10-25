
"use client"
import { userInfo } from '@/app/(jotai)/atom';
import { useAtom } from 'jotai';
/// <reference types="@types/google.maps" />
import React, { useEffect, useRef, useState } from 'react';

interface AvataProps {
    lat: number;
    lng: number;
    map: google.maps.Map | null;
}

const Avata: React.FC<AvataProps> = ({ lat, lng, map }) => {
    const characterFrames = ["/skyHatFront.png", "/skyHatFrontLeft.png", "/skyHatFrontRight.png"];
    const [characterIndex, setCharacterIndex] = useState(0);
    const [prevLat, setPrevLat] = useState(lat); // 이전 위도 저장
    const [prevLng, setPrevLng] = useState(lng); // 이전 경도 저장
    const [isMoving, setIsMoving] = useState(false); // 캐릭터 움직임 상태
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [user, setUser] = useAtom(userInfo);
    //console.log(user)
    useEffect(() => {
        if (!map) return;

        const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            icon: {
                //url: characterFrames[0],
                url: `https://uphillmountain.store/back${user.image}`,
                scaledSize: new google.maps.Size(64, 64),
            },
        });
        markerRef.current = marker;

        const interval = setInterval(() => {
            if (isMoving) {
                setCharacterIndex((prevIndex) => (prevIndex + 1) % characterFrames.length);
            }
        }, 300); // 모션 프레임 변경 주기

        return () => {
            clearInterval(interval);
            marker.setMap(null); // 컴포넌트 unmount 시 마커 제거
        };
    }, [map, isMoving]);

    useEffect(() => {
        if (lat !== prevLat || lng !== prevLng) {
            // 위치가 변경되면
            setIsMoving(true); // 이동 상태로 설정
            setPrevLat(lat);
            setPrevLng(lng);
            markerRef.current?.setPosition({ lat, lng }); // 마커 위치 업데이트
        } else {
            // 위치가 변경되지 않으면
            setIsMoving(false); // 정지 상태로 설정
        }
    }, [lat, lng, prevLat, prevLng]);

    // useEffect(() => {
    //     if (markerRef.current) {
    //         markerRef.current.setIcon({
    //             url: isMoving ? characterFrames[characterIndex] : characterFrames[0], // 움직일 때와 정지할 때의 아이콘 설정
    //             scaledSize: new google.maps.Size(64, 64),
    //         });
    //     }
    // }, [isMoving, characterIndex]);

    return null;
};

export default Avata;
