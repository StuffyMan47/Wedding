/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import "../app/styles/index.css"
import '../app/styles/App.css';
import '../app/styles/table-css.css';
/*import { ResponsiveAppBar } from '../widgets/Header';*/
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useCurrentEvent } from '../shared/api/get-current-event-api';
import CountdownTimer from '../widgets/CountdownTimer';
import CircleLine from '../widgets/Colors';
import { EventModel } from '../entities/event/model/event-model';
import { PlaceModel } from '../entities/place/model/place-model';
import { useCurrentPlace } from '../shared/api/get-current-place-api';
//import { usePhoto } from '../shared/api/get-photo-api';
import EventForm from '../widgets/Questionnaire';
import { GuestModel } from '../entities/guest/model/guest-model';
import { useCurrentGuest } from '../shared/api/get-current-guest';
import { schedule } from '../entities/event/model/schedule-model';
import { useCurrentSchedule } from '../shared/api/get-schedule-api';
import { ScheduleList } from '../widgets/Schedule';
import { Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { messageType } from '../entities/enums/messageType';
//import Footer from '../widgets/footer';


interface inviteProps {
    id: number;
}

const App: React.FC<inviteProps> = ({ id }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [currentGuest, setCurrentGuest] = useState<GuestModel>();
    const [event, setEvent] = useState<EventModel>();
    const [place, setPlace] = useState<PlaceModel>();
    //const [photo, setPhoto] = useState<string | null>(null);
    const [scheduleList, setSheduleList] = useState<schedule[]>()
    const [isAllLoadingSuccess, setIsAllLoading] = useState<boolean>(false)

    const {
        data: guestInfo,
        isLoading: guestIsLoading,
    } = useCurrentGuest(Number(id));

    const {
        data: eventInfo,
        isLoading: eventIsLoading,
        //isError: isFailed,
        //error: err,
    } = useCurrentEvent(Number(id));   

    //const {
    //    data: photoInfo,
    //    isLoading: photoIsLoading,
    //} = usePhoto(Number(event?.id));

    const {
        data: placeInfo,
        isLoading: plaseIsLoading,
    } = useCurrentPlace(Number(id));

    const {
        data: scheduleInfo,
        isLoading: scheduleIsLoading,
    } = useCurrentSchedule(Number(id));

    useEffect(() => {
        if (isAllLoadingSuccess) {
            setCurrentGuest(guestInfo.data);
            setEvent(eventInfo.data);
            setPlace(placeInfo.data);
/*            setPhoto(photoInfo!);*/
            setSheduleList(scheduleInfo.data);
        }
    }, [isAllLoadingSuccess]);

    useEffect(() => {
        if (!(guestIsLoading || eventIsLoading || plaseIsLoading || scheduleIsLoading)) {
            setIsAllLoading(true);
        }
    }, [guestIsLoading, eventIsLoading, plaseIsLoading, scheduleIsLoading]);

    return (
        <Container disableGutters maxWidth="sm" className="border-0">
            {isAllLoadingSuccess ? (
                <div className="container mx-auto">
                    {/*<ResponsiveAppBar />*/}
                    <div>
                        {/*<img src={photo!} alt="Fetched Image" className="w-full h-auto object-cover" />*/}
                        <img src={"./public/main.png"} alt="Fetched Image" className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-10 mx-10">
                    <div className="my-10">
                            <Typography style={{ fontFamily: "Cormorant Infant" }} className="font-cormorantInfant" variant="h4" component="h2" gutterBottom>{currentGuest?.messageType === messageType.many ? `Дорогие ${currentGuest?.name} и ${currentGuest?.coupleName}!`.toLocaleUpperCase() : currentGuest?.messageType === messageType.male ? `Дорогой ${currentGuest?.name}!`.toLocaleUpperCase() : `Дорогая ${currentGuest?.name}!`.toLocaleUpperCase()}</Typography>
                        </div>
                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>{event?.description}</Typography>
                        <div className="mt-10">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Мы приглашаем вас разделить с нами этот особенный день!</Typography>
                        </div>
                        <div className="my-10">
                            <Typography fontSize={isSmallScreen ? '2.125rem' : isMediumScreen ? '2.5rem' : '2.5rem'} style={{ fontFamily: "Cormorant Infant Bold" }} variant="h4" component="h2" gutterBottom>{event?.date ? new Date(event?.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'загрузка'}</Typography>
                        </div>
                    </div>
                    <div className="bg-backgroundGreen border-6 border-backgroundGreen">
                        <div className="mt-10">
                            <Typography style={{ fontFamily: "Cormorant Infant" }} className="font-cormorantInfant" variant="h4" component="h2" gutterBottom>ВРЕМЯ И МЕСТО<br />ТОРЖЕСТВА</Typography>
                        </div>
                        <div className="mt-6 mx-8">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Мы будем ждать вас по адресу:<br />г. Нефтекамск, ул. Янаульская 12</Typography>
                        </div>
                        <div className="mt-6 mx-10">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>03 августа 2024 года в 16:30</Typography>
                        </div>
                        <div className="m-4">
                            <YMaps>
                            <Map
                                defaultState={{ center: [place?.width ?? 0, place?.longitude ?? 0], zoom: 15, controls: ["zoomControl", "fullscreenControl"] }}
                                style={{ width: '100%', height: '400px' }}
                                modules={["control.ZoomControl", "control.FullscreenControl"]}>
                                <Placemark modules={["geoObject.addon.balloon"]} geometry={[place?.width, place?.longitude]} properties={{ balloonContentBody: place?.name }} />
                            </Map>
                            </YMaps>
                        </div>
                    </div>
                    <div className="mt-10 mx-8">
                    {isAllLoadingSuccess ? (
                        <ScheduleList scheduleList={scheduleList} />
                        ) : (<p>laod</p>)}
                    </div>
                    <div>
                    </div>
                    <div className="mt-20">
                        <img src={"./public/tort.png"} alt="Fetched Image" className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-20 mx-10">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>ДРЕСС-КОД</Typography>
                        <div className="my-14 self-center">
                            <CircleLine colors={['#DDCEB1', '#D2B990', '#949B8B', '#455646', '#1D1D1B']} />
                        </div>
                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Для нас самое главное - ваше присутствие! Но мы будем очень благодарны, если поддержите цветовую гамму нашей свадбы.</Typography>
                    </div>
                    <div className="mt-20 mx-10">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>ДЕТАЛИ</Typography>
                        <div className="my-10">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman Bold" }} variant="h4" component="h2" gutterBottom>Цветы</Typography>
                        </div>
                        <div className="mx-10">
                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman", whiteSpace: "normal", overflowWrap: "break-word" }} variant="h4" component="h2" gutterBottom>Чтобы праздничное
                            настроение длилось дольше,
                            предлагаем не дарить нам
                            цветы в день торжества, а эти
                            средства перевести в копилку
                            цветочной подписки. После
                            свадьбы ваши цветы будут
                                радовать нас долгое время.</Typography>
                        </div>
                        <div className="mt-10">
                            <Button style={{ borderRadius: 20, backgroundColor: '#455646' }} variant="contained" href="https://www.tinkoff.ru/cf/2gJnwiqwbiL">Перейти в копилку</Button>
                        </div>
                    </div>
                    <div className="my-10">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>***</Typography>
                    </div>
                    <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman Bold" }} variant="h4" component="h2" gutterBottom>Дорогие дамы</Typography>
                    <div className="mt-8 mx-10">
                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman", whiteSpace: "normal", overflowWrap: "break-word" }} variant="h4" component="h2" gutterBottom>Учитывая, что часть
                            мероприятия будет
                            проходить на газоне, мы
                            рекомендуем дамам
                            выбрать удобную обувь
                            без тонких шпилек.</Typography>
                    </div>
                    <div className="my-10">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>***</Typography>
                    </div>
                    <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman Bold" }} variant="h4" component="h2" gutterBottom>Небольшая просьба</Typography>
                    <div className="my-8 mx-10">
                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>От всего сердца просим вас
                                воздержаться от криков
                                «Горько!» и сохранить
                                атмосферу уютного
                                семейного праздника.</Typography>
                        </div>
                    <div className="mt-10 bg-backgroundGreen border-6 border-backgroundGreen">
                    <div className="mt-8">
                            <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>АНКЕТА ГОСТЯ!</Typography>
                        </div>
                        <div className="my-8 mx-10">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Ваши ответы на вопросы
                                очень помогут нам при
                                организации свадьбы.
                            </Typography>
                        </div>
                        <div className="mb-8">
                            <Typography style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Будем ждать ответ<br/>
                                до 18.07.2024 г.
                            </Typography>
                        </div>
                        <EventForm guestId={id ?? 0} />
                    </div>
                    <div className="mt-20">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>ЧАТ ГОСТЕЙ</Typography>
                        <div className="my-10 mx-10">
                            <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Телеграм-канал с новостями свадьбы, а также будем рады вашим фото и видео с торжества.</Typography>
                        </div>
                        <Button style={{ borderRadius: 20, backgroundColor: '#455646' }} variant="contained" href="https://t.me/+EynO91eROJhiYWIy">Присоедениться</Button>
                    </div>
                    <div className="my-20">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>ДО СВАДЬБЫ ОСТАЛОСЬ</Typography>
                        {event ? (
                            <div className="my-10">
                                <CountdownTimer targetDate={event?.date} />
                            </div>
                        ) : (<p>load</p>) }
                    </div>
                    <div className="mb-20">
                        <Typography style={{ fontFamily: "Cormorant Infant" }} variant="h4" component="h2" gutterBottom>МЫ ЖДЕМ ВАС!<br/>
                            ВАШИ МАРСЕЛЬ И
                            ГУЗЕЛЬ!</Typography>
                    </div>
                {/*    <Footer/>*/}
                </div>
            ) : (<p>Loading...</p>)}
        </Container>
    );
}

export default App;