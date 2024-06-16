/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import '../app/styles/App.css';
import '../app/styles/table-css.css';
import { ResponsiveAppBar } from '../widgets/Header';
//import MaterialTable from '../widgets/Table';
import { GuestListModel } from '../entities/guest/model/guest-model';
import { useGuestList } from '../entities/guest/api/guest-list-api';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
//import { useCurrentEvent } from '../entities/guest/api/get-current-event-api';
import CountdownTimer from '../widgets/CountdownTimer';
import CircleLine from '../widgets/Colors';



const fakeData: GuestListModel[] = [
    {
        id: 1,
        isCome: true,
        name: 'Давид',
        coupleName: 'Дима',
    },
    {
        id: 2,
        isCome: true,
        name: 'Айдар',
        coupleName: 'Камилла',
    },
    {
        id: 3,
        isCome: true,
        name: 'Костя',
    }
]

const date = new Date(2024, 7, 3, 16, 0);

function App() {
    const [guestList, setGuestList] = useState<GuestListModel[]>();
    const {
        data: guestListData,
        isLoading: isLoading,
        //isError: isFailed,
        //error: err,
    } = useGuestList();
    
    //const {
    //    data: eventInfo,
    //    //isLoading: isLoading,
    //    //isError: isFailed,
    //    //error: err,
    //} = useCurrentEvent(1);


    useEffect(() => {

        if (guestListData === undefined) {
            setGuestList(fakeData)
        }
        else {
            setGuestList(guestListData.data)
        }

    }, [guestList, isLoading]);



    return (
        <><div>
            <ResponsiveAppBar />
        </div>
            <div>
                <h1 className="centered-text">Один день в этом году будет для нас особенным и мы хотим провести
                    его в кругу близких и друзей. С большим удовольствием приглашаем вас на знаменательный праздник - нашу свадьбу!</h1>
            </div>
            <YMaps>
                <div>
                    <a href="https://vremenagodansk.ru/">Времена года</a>
                    <Map
                    
                        defaultState={{ center: [56.101230, 54.296862], zoom: 15, controls: ["zoomControl", "fullscreenControl"] }}
                        style={{ width: '100%', height: '400px' }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    >
                        <Placemark modules={["geoObject.addon.balloon"]} geometry={[56.101230, 54.296862]} properties={{ balloonContentBody: `Времена года` }} />
                    </Map>
                </div>
            </YMaps>
            <div>
                <CountdownTimer targetDate={date} />
            </div>
            <div>
                <CircleLine colors={['#DDCEB1', '#D2B990', '#949B8B', '#455646', '#1D1D1B']} />
            </div>
        </>
    );
}

export default App;