import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getData } from './BarGraphData.service';

const mydata = [
    {
        name: 'Jan',
        2023: 4000,
        2024: 2400,

    },
    {
        name: 'Feb',
        2023: 3000,
        2024: 1398,

    },
    {
        name: 'Mar',
        2023: 2000,
        2024: 9800,

    },
    {
        name: 'Apr',
        2023: 2780,
        2024: 3908,

    },
    {
        name: 'May',
        2023: 1890,
        2024: 4800,

    },
    {
        name: 'Jun',
        2023: 2390,
        2024: 3800,

    },
    {
        name: 'Jul',
        2023: 3490,
        2024: 4300,

    },
    {
        name: 'Aug',
        2023: 3490,
        2024: 4300,

    },
    {
        name: 'Sep',
        2023: 3490,
        2024: 4300,

    },
    {
        name: 'Oct',
        2023: 3490,
        2024: 4300,

    },
    {
        name: 'Nov',
        2023: 3490,
        2024: 4300,

    },
    {
        name: 'Dec',
        2023: 3490,
        2024: 4300,
    },
];

const BarGraph = ({ name, data }) => {

    const { years, graphData } = getData(data, name)



    return (

        <div style={{ fontSize: 11 }} className='border p-2  d-flex flex-column gap-3 rounded  position-relative '>
            <div className='fw-bold fs-5 text-center '>
                {name}
            </div>
            <BarChart
                width={450}
                height={200}
                data={graphData}
                margin={{
                    right: 30,
                }}
            >
                <XAxis textAnchor='end' angle={-90} dataKey="name" />
                <YAxis />

                <Legend />
                <Bar dataKey={years[0]} fill="#999bff" />
                <Bar dataKey={years[1]} fill="#002db3" />
            </BarChart>
        </div>

    );
}

export default BarGraph;
