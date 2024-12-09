

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getData = (data, name) => {
    switch (name) {
        case "Job Posted":
            return getPostedJobsData(data)
        case "Average Views Per Job":
            return getViewsData(data)
        case "Average Applications Per Job":
            return getApplicationData(data)
    }
}

const getYears = (data) => {
    const years = data.reduce((acc, item) => {
        if (!acc.includes(item.year)) {
            acc.push(item.year);
        }
        return acc;
    }, []).sort((a, b) => a - b)

    return years
}


const getPostedJobsData = (data) => {
    const years = getYears(data)

    const getPostedGraphData = (year, month) => {
        const item = data.find(item => item.year === year && item.month === month)
        return Math.ceil(item?.count) || 0
    }

    const graphData = months.map((month, index) => {

        return {
            [years[0]]: getPostedGraphData(years[0], index + 1),
            [years[1]]: getPostedGraphData(years[1], index + 1),
            name: month
        }
    })

    return { years, graphData }
}

const getViewsData = (data) => {
    return getPostedJobsData(data)
}

export const getApplicationCountPerMonth = (data, month, year) => {
    const application = data?.find(item => item.year === year && item.month === month)
    return application?.totalApplications || 0
}

export const getApplicationCountPerYear = (data, year) => {
    const applications = data?.filter(item => item.year === year)

    let totalApplications = 0

    applications?.forEach(element => {
        totalApplications += element.totalApplications
    });

    return totalApplications
}


const getApplicationData = (data) => {

    const years = getYears(data)

    const getPostedGraphData = (year, month) => {
        const item = data.find(item => item.year === year && item.month === month)
        return Math.ceil(item?.totalApplications / item?.count) || 0
    }

    const graphData = months.map((month, index) => {

        return {
            [years[0]]: getPostedGraphData(years[0], index + 1),
            [years[1]]: getPostedGraphData(years[1], index + 1),
            name: month
        }
    })

    return { years, graphData }
}