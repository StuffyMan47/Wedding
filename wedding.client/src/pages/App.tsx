/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import "../app/styles/index.css"
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
import { schedule } from '../entities/event/model/schedule-model';
import { useCurrentSchedule } from '../shared/api/get-schedule-api';
import { ScheduleList } from '../widgets/Schedule';
import { Container, Typography } from '@mui/material';

function App() {
    const [currentGuest, setCurrentGuest] = useState<GuestModel>();
    const [event, setEvent] = useState<EventModel>();
    const [place, setPlace] = useState<PlaceModel>();
    const [photo, setPhoto] = useState<string | null>(null);
    const [scheduleList, setSheduleList] = useState<schedule[]>()
    const [isAllLoadingSuccess, setIsAllLoading] = useState<boolean>(false)

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

    const {
        data: scheduleInfo,
        isLoading: scheduleIsLoading,
    } = useCurrentSchedule(1);

    useEffect(() => {
        if (isAllLoadingSuccess) {
            setCurrentGuest(guestInfo.data);
            setEvent(eventInfo.data);
            setPlace(placeInfo.data);
            setPhoto(photoInfo!);
            setSheduleList(scheduleInfo.data);
        }
    }, [isAllLoadingSuccess]);

    useEffect(() => {
        if (!(guestIsLoading || eventIsLoading || plaseIsLoading || photoIsLoading || scheduleIsLoading)) {
            setIsAllLoading(true);
        }
    }, [guestIsLoading, eventIsLoading, plaseIsLoading, photoIsLoading, scheduleIsLoading]);

    return (
        <Container maxWidth="sm">
            {isAllLoadingSuccess ? (
                <div className="container mx-auto">
                    <ResponsiveAppBar />
                    <div>
                        <img src={photo!} alt="Fetched Image" className="main-image" />
                    </div>
                    <div>
                        <h1 className="centered-text">{currentGuest?.name}, {event?.description}</h1>
                    </div>
                    <YMaps>
                        <div>
                            <Map
                                defaultState={{ center: [place?.width ?? 0, place?.longitude ?? 0], zoom: 15, controls: ["zoomControl", "fullscreenControl"] }}
                                style={{ width: '100%', height: '400px' }}
                                modules={["control.ZoomControl", "control.FullscreenControl"]}
                            >
                                <Placemark modules={["geoObject.addon.balloon"]} geometry={[place?.width, place?.longitude]} properties={{ balloonContentBody: place?.name }} />
                            </Map>
                        </div>
                    </YMaps>
                    {isAllLoadingSuccess ? (
                        <ScheduleList scheduleList={scheduleList} />
                    ) : (<p>laod</p>)}
                    <CountdownTimer targetDate={event?.date ?? new Date()} />
                    <div>
                        <a href="https://www.tinkoff.ru/cf/2gJnwiqwbiL">Перейти в копилку</a>
                    </div>
                    <div>
                        <Typography variant="h4" component="h2" gutterBottom>ДРЕСС-КОД</Typography>
                        <CircleLine colors={['#DDCEB1', '#D2B990', '#949B8B', '#455646', '#1D1D1B']} />
                        <Typography variant="h4" component="h2" gutterBottom>Для нас самое главное - ваше присутствие! Но мы будем очень благодарны, если поддержите цветовую гамму нашей свадбы.</Typography>
                    </div>
                    <div className="questionnaire">
                        <EventForm guestId={currentGuest?.id ?? 0} />
                    </div>
                </div>
            ) : (<p>Loading...</p>)}
        </Container>
    );
}

export default App;