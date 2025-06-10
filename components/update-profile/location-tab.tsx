import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NEARBY_RANGES } from "./constants"
import { DogLocation } from "./types"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    naver: any;
  }
}

interface LocationTabProps {
  locationData: {
    nearbyRange: string
    selectedLocation: DogLocation | null
    latitude: number
    longitude: number
    accuracy: number
    isMapLoaded: boolean
    zoom: number
  }
  onLocationDataChange: (data: any) => void
  onMapLoad: () => void
}

export function LocationTab({ locationData, onLocationDataChange, onMapLoad }: LocationTabProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(locationData.latitude || 37.3595704, locationData.longitude || 127.105399),
          zoom: locationData.zoom || 10,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT
          }
        };

        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);

        window.naver.maps.Event.addListener(mapInstanceRef.current, 'click', (e: any) => {
          const lat = e.coord.lat();
          const lng = e.coord.lng();

          if (markerRef.current) {
            markerRef.current.setPosition(e.coord);
          } else {
            markerRef.current = new window.naver.maps.Marker({
              position: e.coord,
              map: mapInstanceRef.current
            });
          }

          // Update location data
          onLocationDataChange({
            ...locationData,
            selectedLocation: { latitude: lat, longitude: lng },
            latitude: lat,
            longitude: lng
          });
        });

        onMapLoad();
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="px-6 py-8 pb-24">
      <h2 className="text-2xl font-bold text-black mb-8">위치정보 등록</h2>

      <div className="space-y-6">
        {/* 근처 범위 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">근처 범위</label>
          <Select
            value={locationData.nearbyRange}
            onValueChange={(value) => onLocationDataChange({ ...locationData, nearbyRange: value })}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="근처 범위를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {NEARBY_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {locationData.nearbyRange === "" && <p className="text-red-500 text-sm mt-1">근처 범위를 선택해주세요.</p>}
        </div>

        {/* 지도 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">위치</label>
          <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <div ref={mapRef} className="w-full h-full" />
            {locationData.selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm text-gray-600">
                  선택된 위치: {locationData.selectedLocation.latitude.toFixed(6)}, {locationData.selectedLocation.longitude.toFixed(6)}
                </p>
              </div>
            )}
          </div>
          {!locationData.selectedLocation && (
            <p className="text-red-500 text-sm mt-1">지도에서 위치를 선택해주세요.</p>
          )}
        </div>
      </div>
    </div>
  )
} 
