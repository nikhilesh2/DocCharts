      // 1477556579 - name undefined

      const map = {};
      const xDataMap = {};
      var theData = "";
      // Load the Visualization API and the piechart package.
      // google.charts.load('current', {'packages':['corechart']});
      google.charts.load('current', {'packages':['bar']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(createCharts);

      // 1518929637
      function createCharts(id) {
        for(var i = 0; i < charts.length; i++) {
        
          if ($('#' + charts[i].id).length) {
            var url = window.location.href 
            var a = $('<a>', { href:url } )[0];
            
            var id = a.search
            
            charts[i].doctor_ids = id.substring(5, id.length).split(',');


            const dataObj = retrieveAggregateData(charts[i]);
           
            // charts[i].options.title = dataObj.data[0].nppes_provider_first_name + " " + dataObj.data[0].nppes_provider_last_org_name;
            drawChart(charts[i], dataObj.rows);
          }
        }
      }


      // Using multiple ids requires different input structure
      function retrieveAggregateData(chart) {
        var rows = [];

        const result = {};
        const ids = chart.doctor_ids;

        const xAxis = chart.xAxis;
        const yAxis = chart.yAxis;

        const dataEntities = [];
        var xAxisLabels = [];
        xAxisLabels.push([yAxis.label]); // leave space doctor list
        ids.forEach(function(id) {
          if(map[id] != null) {
            data = map[id];
            rows = loopData(data, xAxis, yAxis);
          }
          else {
            $.ajax({url: "https://data.cms.gov/resource/4hzz-sw77.json?npi=" + id,  async: false, success: function(data){
              dataEntities.push(getFirstName(data) + " " + getLastName(data));
              xAxisLabels = addXAxisLabels(xAxisLabels, data, xAxis);
             console.log(data);
              map[id] = data;
              result.data = data;
            }});

          }
        });
        rows.push(dataEntities);

        // add data for doctors to labels
        ids.forEach(function(id) {
          const theData = map[id];
          const name = getFirstName(theData) + " " + getLastName(theData);
          
          chart.options.title.push(name);
          xAxisLabels[0].push(name);
          
          var found = false;
          for(var i = 1; i < xAxisLabels.length; i++) {
            var count = 0;
            theData.forEach(function(dataPoint) {
          

              if(xAxisLabels[i][0] == dataPoint[xAxis.data] && count == 0)  {
                const yData = yAxis.type === 'number' ? parseInt(dataPoint[yAxis.data]) : dataPoint[yAxis.data];

                xAxisLabels[i].push(yData);
                count++;
                found = true;
                
              } 
            });
            if(!found)  xAxisLabels[i].push(0);
            found = false;
            count = 0;
     
          } 
        });
        console.log("sdfsdf " + JSON.stringify(xAxisLabels));
        result.rows = xAxisLabels;
        
        return result;
       
      }

     function addXAxisLabels(xAxisLabels, data, xAxis) {
         for(var i = 0; i < data.length; i++) {
          const xData = xAxis.type === 'number' ? parseInt(data[i][xAxis.data]) : data[i][xAxis.data];

          var text = xData.split(',');

          if(!contains(xData, xAxisLabels))  xAxisLabels.push([xData]);

          }

        return xAxisLabels;
      }

      function contains(entry, data) {
        var contains = false;
        data.forEach(function(dataPoint) {
          if(entry == dataPoint) contains = true;
        });
        return contains;
      }
      function retrieveData(chart) {
        var rows = [];
        const result = {};
        const id = chart.doctor_ids[0];
        const xAxis = chart.xAxis;
        const yAxis = chart.yAxis;

        if(map[id] != null) {
          data = map[id];
          rows = loopData(data, xAxis, yAxis);
        }
        else {
          $.ajax({url: "https://data.cms.gov/resource/4hzz-sw77.json?npi=" + id,  async: false, success: function(data){
            rows = loopData(data, xAxis, yAxis);
            map[id] = data;
            result.data = data;
            
            
          }});

        }
        result.rows = rows;
       
        return result;
       
      }

      function loopData(data, xAxis, yAxis) {

        var rows = [];
        for(var i = 0; i < data.length; i++) {

          const yData = yAxis.type === 'number' ? parseInt(data[i][yAxis.data]) : data[i][yAxis.data];
          const xData = xAxis.type === 'number' ? parseInt(data[i][xAxis.data]) : data[i][xAxis.data];

          var text = xData.split(',');
          rows.push([text[0], yData]);
        }
        rows = sort2D(rows);

        return rows;
      }

      
      // "width": $(window).width() * 1,
      function drawChart(chart, rows) {
        // Create the data table.
        // var data = new google.visualization.DataTable();
        // data.addColumn(chart.xAxis.type, chart.xAxis.label); // y
        // data.addColumn(chart.yAxis.type, chart.yAxis.label);  // x
        // data.addRows(rows);

        // Set chart options
        const options = { 
          "title": titleToString(chart.options.title),
          'backgroundColor': 'transparent',
          "height": chart.options.height,
          "legend": 'none', 
          "colors": ['#2EBCD2', '#FD797E', '#FECD61', '#3EA3E8', '#FEE5AF', '#51C0BF'],
          vAxis: {
            title: chart.yAxis.label
          },
          hAxis: {
            title: chart.xAxis.label,
            textStyle: chart.options.hAxis.textStyle
          }
        }

        var data = google.visualization.arrayToDataTable(rows);

        // Instantiate and draw our chart, passing in some options.
        // var chart = new google.visualization[chart.chartType](document.getElementById(chart.id));

        var chart =  new google.charts.Bar(document.getElementById(chart.id));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

      function getFirstName(data) {
        var firstName = '';
        for(var i = 0; i < data.length; i++) {
          if(data[i].nppes_provider_first_name != null) {
            firstName = data[i].nppes_provider_first_name;
            break;
          }
        }
        if(firstName == '') {
          firstName = "N/A";
        }
        return firstName;
      }

      function getLastName(data) {
        var lastName = '';
        for(var i = 0; i < data.length; i++) {
          if(data[i].nppes_provider_last_org_name != null) {
            lastName = data[i].nppes_provider_last_org_name;
            break;
          }
        }

        return lastName;
      }
      function titleToString(title) {
        var finalTitle = "";

        for(var i = 0; i < title.length; i++) {
         
          finalTitle += title[i] + ", ";

        }

        return finalTitle.substring(0, finalTitle.length - 2);
      }
      function sort2D(arr) {
        arr.sort(function(a, b) {
          var x = a[1];
          var y = b[1];
          return y - x;
        });
        return arr;
      }