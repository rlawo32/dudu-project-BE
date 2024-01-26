import {useEffect} from "react";

declare global {
    interface Window {
        kakao: any;
    }
}
const BranchInfoMap = (props : {mapPosition:string; mapName:string;}) => {
    const apiKey:string|undefined = process.env.REACT_APP_KAKAO_KEY;
    const script:HTMLScriptElement = document.createElement("script");

    // useEffect(() => {
    //     script.async = true;
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    //     document.head.appendChild(script);
    // }, [])

    useEffect(() => {
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() => {
                // 주소-좌표 변환 객체를 생성합니다
                const geocoder = new window.kakao.maps.services.Geocoder();

                if(props.mapPosition.length > 0) {
                    // 주소로 좌표를 검색합니다
                    geocoder.addressSearch(props.mapPosition, function(result:any, status:any) {

                        // 정상적으로 검색이 완료됐으면
                        if (status === window.kakao.maps.services.Status.OK) {
                            // 결과값 위치 좌표
                            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                            // 지도를 담을 영역의 DOM 레퍼런스
                            let container = document.getElementById('map');
                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            let options = { // 지도를 생성할 때 필요한 기본 옵션
                                center: coords, // 지도의 중심좌표
                                level: 1 // 지도의 레벨(확대, 축소 정도)
                            };
                            let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            let marker = new window.kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            let infowindow = new window.kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;color:black;">'+ props.mapName +'</div>'
                            });
                            infowindow.open(map, marker);

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            // map.setCenter(coords);
                        }
                    });
                }
            })
        })
        // let infowindow = new window.kakao.maps.InfoWindow({
        //     zIndex: 1,
        //     position: new window.kakao.maps.LatLng(37.586272, 127.029005),
        //     content: `<div class="inactive infowindow"><span>여기?</span></div>`,
        //     disableAutoPan: false,
        //     map: map //map에 해당 인포윈도우를 적용한다.
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    return (
        <div id="map" style={{height: "500px", width: "100%"}}>

        </div>
    )
}

export default BranchInfoMap;