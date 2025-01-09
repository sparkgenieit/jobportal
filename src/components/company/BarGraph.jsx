import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { getData } from '../../services/company/BarGraphData.service';

const BarGraph = ({ name, data }) => {
    const { years, graphData } = getData(data, name)

    return (

        <div style={{ fontSize: 11 }} className=' p-2  flex flex-col gap-3 rounded  relative '>
            <div className='font-bold text-lg text-center '>
                {name}
            </div>
            <BarChart
                width={370}
                height={220}
                data={graphData}
                margin={{
                    right: 30,
                }}
            >
                <XAxis textAnchor='end' angle={-90} dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={years[0]} fill="#999bff" />
                <Bar dataKey={years[1]} fill="#002db3" />
            </BarChart>
        </div>

    );
}

export default BarGraph;
