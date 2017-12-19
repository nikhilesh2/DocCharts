var charts = [
	{
		id: 'chart_div',
		chartType: 'ColumnChart',
		doctor_ids: ['1518929637'],
		options: {
			title: 'doctors',
			width: '100%',
            height: 300,

		},
		yAxis: {
			type: 'number',
			data: 'average_medicare_payment_amt',
			label: 'medicare payment'
		},
		xAxis: {
			type: 'string',
			data: 'hcpcs_code',
			label: 'code'
		}
	},

	{
		id: 'chart_div2',
		chartType: 'LineChart',
		doctor_ids: ['1518929637'],
		options: {
			title: 'doctors',
			width: '100%',
            height:'100%',
		},
		yAxis: {
			type: 'number',
			data: 'average_medicare_payment_amt',
			label: 'medicare payment'
		},
		xAxis: {
			type: 'string',
			data: 'hcpcs_code',
			label: 'code'
		}
	},
	{
		id: 'chart_div3',
		chartType: 'PieChart',
		doctor_ids: ['1518929637'],
		options: {
			title: [],
			width: '100%',
            height:'100%',
		},
		yAxis: {
			type: 'number',
			data: 'average_medicare_payment_amt',
			label: 'medicare payment'
		},
		xAxis: {
			type: 'string',
			data: 'hcpcs_code',
			label: 'code'
		}
	},
	{
		id: 'chart_div_max',
		chartType: 'ColumnChart',
		
		options: {
			title: [],
			hAxis: {
				textStyle : {
            		fontSize: 13
        		}
			}
		},
		yAxis: {
			type: 'number',
			format: 'dollar',
			data: 'average_medicare_payment_amt',
			label: 'medicare payment'
		},
		xAxis: {
			type: 'string',
			data: 'hcpcs_code',
			label: 'hcpcs description'
		}
	},
	
]