/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import '../app/styles/App.css';
import '../app/styles/table-css.css';
import { ResponsiveAppBar } from '../widgets/Header';
import MaterialTable from '../widgets/Table';
import { GuestListModel } from '../entities/guest/model/guest-model';
import { useGuestList } from '../entities/guest/api/guest-list-api';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
//import { useCurrentEvent } from '../entities/guest/api/get-current-event-api';
import CountdownTimer from '../widgets/CountdownTimer';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

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
    const [forecasts, setForecasts] = useState<Forecast[]>();
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
        populateWeatherData();
    }, []);

    useEffect(() => {

        if (guestListData === undefined) {
            setGuestList(fakeData)
        }
        else {
            setGuestList(guestListData.data)
        }

    }, [guestList, isLoading]);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>;

    return (
        <><div>
            <ResponsiveAppBar />
        </div>
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
            <div>
                <MaterialTable data={!(guestList === undefined) ? guestList! : fakeData}/>
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
        </>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;