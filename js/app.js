function Point( x, y ) {

	this.x = x;
	this.y = y;

	this.scolor = "#000";
	this.fcolor = "#aaa";

}

function AppClass( canvasSelector, initR, scale ) {

	this.canvasSelector = canvasSelector;
	this.R = initR;
	this.scale = scale;

	this.gridSize = 25;

	this.pixelPerUnit = 5;

	this.points = [];

	this.redPoint;

	this.nearestPoint;
	this.farthestPoint;

	this.run = function () {

		alert("this will refresh data");

	};

	this.setR = function ( newR ) {

		this.R = newR;

	};

	this.loadData = function () {

		var url = "data/Data.csv";

		this.loadDataFromUrl( url );

	};

	this.loadDataFromUrl = function ( url ){

		mApp.loadingOverlayAction().show();

		mApp.callAjaxText( url, {} , "get", this, 'dataLoaded' );

		
	};

	this.dataLoaded = function( data ) {

		//mApp.loadingOverlayAction().hide();
		//alert(data);

		var lines = data.split("\n");
		var coords;

		var minDistance = Number.MAX_VALUE;
		var maxDistance = Number.MIN_VALUE;

		var sq;
		var root;

		var point;

		var curX;
		var curY;

		for ( var i = 0; i < lines.length; ++i ) {

			if ( lines[i].trim() == "" )
				continue;
			//console.log( lines[i] );
			coords = lines[i].split(",");
			//console.log( coords );

			if ( i == 0 )
				this.scaleAndAddRedPoint( Number( coords[0].trim() ), Number( coords[1].trim() ) );
			else {

				curX = Number(coords[0].trim());
				curY = Number(coords[1].trim());

				point = this.scaleAndAddPoint( curX, curY );

				sq = ( this.redPoint.x - curX ) * ( this.redPoint.x - curX ) + ( this.redPoint.y - curY ) * ( this.redPoint.y - curY );

				root = Math.sqrt( sq );


				console.log( root );

				if ( minDistance >= root ) {

					minDistance = root;

					this.nearestPoint = point;
				}

				if ( maxDistance <= root ) {

					maxDistance = root;

					this.farthestPoint = point;

				}


			}

		}

		console.log( minDistance );
		console.log( maxDistance );

		this.drawPoint( this.redPoint );


		this.drawNearestAndFarthestPoint();
		console.log( this.points );

	};

	this.drawNearestAndFarthestPoint = function() {

		this.nearestPoint.scolor = "#0000aa";
		this.nearestPoint.fcolor = "#0000ff";
		this.farthestPoint.scolor = "#00aa00";
		this.farthestPoint.fcolor = "#00ff00";

		this.drawPoint( this.nearestPoint );
		this.drawPoint( this.farthestPoint );


	};

	this.scaleAndAddRedPoint = function( x, y ) {

		var point = new Point( x * this.scale, y * this.scale );

		point.scolor = '#990000';
		point.fcolor = '#ff0000';

		this.points.push( point );

		this.redPoint = point;

		//this.drawPoint( point );
	};
	this.scaleAndAddPoint = function( x, y ) {

		var point = new Point( x * this.scale, y * this.scale );

		this.points.push( point );

		this.drawPoint( point );

		return point;
	};

	this.drawPoint = function( point ) {


		this.drawPointCircle( point.x, point.y, point.scolor, point.fcolor );

	}


	this.drawPointCircle = function ( xPos, xPos, scolor, fcolor ) {

		//console.log(  xPos, xPos, scolor, scolor );
		this.canvasSelector.drawArc({
		  strokeStyle: scolor,
		  strokeWidth: 1,

  		  fillStyle: fcolor,
		  x: xPos * this.pixelPerUnit, y: - xPos * this.pixelPerUnit,
		  radius: this.R,
		  // start and end angles in degrees
		  start: 0, end: 360
		});

	};

	this.drawAxes = function ( idName ) {

		var grid_size = this.gridSize;
		var x_axis_distance_grid_lines = 22;
		var y_axis_distance_grid_lines = 2;
		var x_axis_starting_point = { number: this.pixelPerUnit, suffix: '' };
		var y_axis_starting_point = { number: this.pixelPerUnit, suffix: '' };

		var canvas = document.getElementById(idName);
		var ctx = canvas.getContext("2d");

		// canvas width
		var canvas_width = canvas.width;

		// canvas height
		var canvas_height = canvas.height;

		// no of vertical grid lines
		var num_lines_x = Math.floor(canvas_height/grid_size);

		// no of horizontal grid lines
		var num_lines_y = Math.floor(canvas_width/grid_size);

		// Draw grid lines along X-axis
		for(var i=0; i<=num_lines_x; i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    
		    // If line represents X-axis draw in different color
		    if(i == x_axis_distance_grid_lines) 
		        ctx.strokeStyle = "#000000";
		    else
		        ctx.strokeStyle = "#e9e9e9";
		    
		    if(i == num_lines_x) {
		        ctx.moveTo(0, grid_size*i);
		        ctx.lineTo(canvas_width, grid_size*i);
		    }
		    else {
		        ctx.moveTo(0, grid_size*i+0.5);
		        ctx.lineTo(canvas_width, grid_size*i+0.5);
		    }
		    ctx.stroke();
		}

		// Draw grid lines along Y-axis
		for(i=0; i<=num_lines_y; i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    
		    // If line represents Y-axis draw in different color
		    if(i == y_axis_distance_grid_lines) 
		        ctx.strokeStyle = "#000000";
		    else
		        ctx.strokeStyle = "#e9e9e9";
		    
		    if(i == num_lines_y) {
		        ctx.moveTo(grid_size*i, 0);
		        ctx.lineTo(grid_size*i, canvas_height);
		    }
		    else {
		        ctx.moveTo(grid_size*i+0.5, 0);
		        ctx.lineTo(grid_size*i+0.5, canvas_height);
		    }
		    ctx.stroke();
		}

		ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

		// Ticks marks along the positive X-axis
		for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = "#000000";

		    // Draw a tick mark 6px long (-3 to 3)
		    ctx.moveTo(grid_size*i+0.5, -3);
		    ctx.lineTo(grid_size*i+0.5, 3);
		    ctx.stroke();

		    // Text value at that point
		    ctx.font = '9px Arial';
		    ctx.textAlign = 'start';
		    ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
		}

		// Ticks marks along the negative X-axis
		for(i=1; i<y_axis_distance_grid_lines; i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = "#000000";

		    // Draw a tick mark 6px long (-3 to 3)
		    ctx.moveTo(-grid_size*i+0.5, -3);
		    ctx.lineTo(-grid_size*i+0.5, 3);
		    ctx.stroke();

		    // Text value at that point
		    ctx.font = '9px Arial';
		    ctx.textAlign = 'end';
		    ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
		}

		// Ticks marks along the positive Y-axis
		// Positive Y-axis of graph is negative Y-axis of the canvas
		for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = "#000000";

		    // Draw a tick mark 6px long (-3 to 3)
		    ctx.moveTo(-3, grid_size*i+0.5);
		    ctx.lineTo(3, grid_size*i+0.5);
		    ctx.stroke();

		    // Text value at that point
		    ctx.font = '9px Arial';
		    ctx.textAlign = 'start';
		    ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
		}

		// Ticks marks along the negative Y-axis
		// Negative Y-axis of graph is positive Y-axis of the canvas
		for(i=1; i<x_axis_distance_grid_lines; i++) {
		    ctx.beginPath();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = "#000000";

		    // Draw a tick mark 6px long (-3 to 3)
		    ctx.moveTo(-3, -grid_size*i+0.5);
		    ctx.lineTo(3, -grid_size*i+0.5);
		    ctx.stroke();

		    // Text value at that point
		    ctx.font = '9px Arial';
		    ctx.textAlign = 'start';
		    ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
		}

	}
}
