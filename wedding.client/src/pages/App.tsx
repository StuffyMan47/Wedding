/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import '../app/styles/App.css';
import '../app/styles/table-css.css';
import { ResponsiveAppBar } from '../widgets/Header';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useCurrentEvent } from '../shared/api/get-current-event-api';
import CountdownTimer from '../widgets/CountdownTimer';
import CircleLine from '../widgets/Colors';
import { EventModel } from '../entities/event/model/event-model';
import { PlaceModel } from '../entities/place/model/place-model';
import { useCurrentPlace } from '../shared/api/get-current-place-api';
import { usePhoto } from '../shared/api/get-photo-api';
import EventForm from '../widgets/quest';
import { GuestModel } from '../entities/guest/model/guest-model';
import { useCurrentGuest } from '../shared/api/get-current-guest';

function App() {
    const [currentGuest, setCurrentGuest] = useState<GuestModel>();
    const [event, setEvent] = useState<EventModel>();
    const [place, setPlace] = useState<PlaceModel>();
    const [photo, setPhoto] = useState<string | null>(null);

    const {
        data: guestInfo,
        isLoading: guestIsLoading,
    } = useCurrentGuest(1);

    const {
        data: photoInfo,
        isLoading: photoIsLoading,
    } = usePhoto(1);

    const {
        data: placeInfo,
        isLoading: plaseIsLoading,
    } = useCurrentPlace(1);

    const {
        data: eventInfo,
        isLoading: eventIsLoading,
        //isError: isFailed,
        //error: err,
    } = useCurrentEvent(1);    

    useEffect(() => {
        if (guestInfo !== undefined) {
            setCurrentGuest(guestInfo.data)
        }
        if (eventInfo !== undefined) {
            setEvent(eventInfo.data)
        }
        if (placeInfo !== undefined) {
            setPlace(placeInfo.data)
        }
        if (photoInfo !== undefined) {
            setPhoto(photoInfo)
        }
    }, [guestIsLoading, eventIsLoading, plaseIsLoading, photoIsLoading]);

    useEffect(() => {
        console.log(event);
    }, [event]);

    return (
        <><div>
            <ResponsiveAppBar />
        </div>
            <div>
                {photo ? (
                    <img src={photo} alt="Fetched Image" className="main-image" />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div>
                {currentGuest && event ? (
                    <h1 className="centered-text">{currentGuest?.name}, {event.description}</h1>
                ) : (<p>Loading guest name...</p>)
            }
            </div>
            {place !== undefined ? (
                <YMaps>
                    <div>
                        <Map
                            defaultState={{ center: [place.width, place.longitude], zoom: 15, controls: ["zoomControl", "fullscreenControl"] }}
                            style={{ width: '100%', height: '400px' }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            <Placemark modules={["geoObject.addon.balloon"]} geometry={[place.width, place.longitude]} properties={{ balloonContentBody: place.name }} />
                        </Map>
                    </div>
                </YMaps>
            ) :
                <h1>загрузка</h1>
            }
            {event !== undefined && (
                <CountdownTimer targetDate={event.date} />
            )}
            <div>
                <a href="https://www.tinkoff.ru/cf/2gJnwiqwbiL">КопилОчка</a>
            </div>
            <div>
                <CircleLine colors={['#DDCEB1', '#D2B990', '#949B8B', '#455646', '#1D1D1B']} />
            </div>
            <div className="questionnaire">
                {currentGuest ? (
                    <EventForm guestId={currentGuest.id} />
                ) : (<p>Loading guest name...</p>)}
            </div>
        </>
    );
}

export default App;