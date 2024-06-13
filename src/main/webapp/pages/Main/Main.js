Prefab.onPropertyChange = function(key, newVal, oldVal) {
    Prefab.render3DPieandDonutChart();
}

Prefab.onReady = function() {
    Prefab.render3DPieandDonutChart();
}

Prefab.render3DPieandDonutChart = function() {
    let {
        inputdataset,
        charttype,
        title,
        subtitle,
        showlegend,
        legendposition,
        legendalingment,
        height,
        width,
        exporting
    } = Prefab;
    let titleConfig = Prefab.getTitleSubTitleConfiguration(title);
    let subtitleConfig = Prefab.getTitleSubTitleConfiguration(subtitle);
    let legendConfig = Prefab.getLegendConfiguration(legendalingment, legendposition);
    Highcharts.chart('chartContainer', {
        title: titleConfig,
        subtitle: subtitleConfig,
        legend: legendConfig,
        credits: {
            enabled: false
        },
        exporting: {
            enabled: exporting === "True" ? true : false
        },
        chart: {
            type: 'pie',
            height: (height && height.length) ? (+height.replace("px", "") ? +height.replace("px", "") : undefined) : undefined,
            width: (width && width.length) ? (+width.replace("px", "") ? +width.replace("px", "") : undefined) : undefined,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{point.options.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: charttype === "Pie" ? 0 : 100,
                depth: 45,
                showInLegend: showlegend === "True" ? true : false,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                states: {
                    inactive: {
                        opacity: 1
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Share',
            data: typeof inputdataset === "string" ? (inputdataset.length ? JSON.parse(inputdataset) : []) : inputdataset
        }]
    });
}

Prefab.getTitleSubTitleConfiguration = function(title) {
    return {
        text: title,
        align: 'center'
    };
}

Prefab.getLegendConfiguration = function(legendalingment, legendposition) {
    return {
        align: legendalingment,
        verticalAlign: legendposition,
    };
}

// Prefab.setAggregationFieldData = function() {
//     if (Prefab.aggregationcolumn && Prefab.groupby) {
//         newDataArray = Prefab.getChartAggregationFieldsData();
//         newDataArray.length && newDataArray.forEach((newDataItemObj, index) => {
//             let {
//                 sumCount,
//                 totalCount
//             } = newDataArray[index];
//             switch (Prefab.aggregation) {
//                 case "sum":
//                     newDataArray[index].y = sumCount;
//                     break;
//                 case "count":
//                     newDataArray[index].y = totalCount;
//                     break;
//                 case "average":
//                     newDataArray[index].y = (sumCount / totalCount);
//                     break;
//             }
//         });
//     }
// }
//
// Prefab.getChartAggregationFieldsData = function() {
//     let {
//         aggregationcolumn,
//         groupby,
//         inputdataset
//     } = Prefab;
//     inputdataset = JSON.parse(inputdataset);
//     let groupByBufferFieldsArray = [];
//     if (groupby && !!groupby && aggregationcolumn && !!aggregationcolumn) {
//         inputdataset && inputdataset.length && inputdataset.forEach((dataItemObj) => {
//             if (Object.keys(dataItemObj).includes(groupby)) {
//                 let isGroupAdded = groupByBufferFieldsArray.includes(dataItemObj[groupby]) ? true : false;
//                 if (!isGroupAdded) {
//                     groupByBufferFieldsArray.push(dataItemObj[groupby]);
//                     newDataArray.push({
//                         name: dataItemObj[groupby],
//                         totalCount: 1,
//                         sumCount: dataItemObj[Prefab.aggregationcolumn]
//                     })
//                 } else if (isGroupAdded) {
//                     newDataArray.forEach((newDataItemObj, index) => {
//                         if (newDataItemObj.name === dataItemObj[groupby]) {
//                             newDataArray[index].totalCount = newDataItemObj.totalCount + 1;
//                             newDataArray[index].sumCount = newDataItemObj.sumCount + dataItemObj[Prefab.aggregationcolumn];
//                         }
//                     });
//                 }
//             }
//         });
//     }
//     return newDataArray.length ? newDataArray : [];
// }
