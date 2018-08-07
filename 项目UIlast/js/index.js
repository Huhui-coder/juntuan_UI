var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
var dataAxis = ['正常短假', '特殊短假', '正常长假', '特殊长假', '婚假', '产假', '丧假'];
var data = [41,29,21,30,23,31,47];

var yMax = 50;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

option = {
	grid:{
                   x:25,
                    y:10,
                    x2:0,
                    y2:40,
                    borderWidth:1
                },
 
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#0b6da9'
            },
             show: true,
             position:'top',
                                        interval:0,
                                        formatter:function(params) {
                                            var newParamsName = "";
                                            var paramsNameNumber = params.length;
                                            var provideNumber = 2;  //一行显示几个字
                                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                            if (paramsNameNumber > provideNumber) {
                                                for (var p = 0; p < rowNumber; p++) {
                                                    var tempStr = "";
                                                    var start = p * provideNumber;
                                                    var end = start + provideNumber;
                                                    if (p == rowNumber - 1) {
                                                        tempStr = params.substring(start, paramsNameNumber);
                                                    } else {
                                                        tempStr = params.substring(start, end) + "\n";
                                                    }
                                                    newParamsName += tempStr;
                                                }

                                            } else {
                                                newParamsName = params;
                                            }
                                            return newParamsName
                                        }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#10dafc'
            },

        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: true
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 6;
myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}