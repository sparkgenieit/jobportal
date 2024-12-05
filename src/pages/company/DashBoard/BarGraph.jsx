import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function BarGraph({ name }) {
    return (

        <div style={{ fontSize: 11 }} className='border p-2  d-flex flex-column gap-3 rounded  position-relative '>
            <div className='fw-bold fs-5 text-center '>
                {name}
            </div>
            <BarChart
                width={350}
                height={200}
                data={data}
                margin={{
                    right: 30,
                }}
            >
                <XAxis textAnchor='end' angle={-90} dataKey="name" />
                <YAxis />

                <Legend />
                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </div>

    );
}
