let secondary_color = 180
let background_color = 250

let num_respondents = 37
let colors; 

function setup() {
	width = 1250;
	createCanvas(width, 64/25*width);
	background(background_color-5);
	noLoop();
	// roommate_line_color = color(93, 140, 217)
	// class_colors = [color(237, 166, 174), color(245, 214, 176), color(245, 233, 176)]
	class_colors = [85, 160, 225]
	concentration_colors = [color('#0b3887'), color('#0e9cb5'), color('#007FFF'),
												  color('#bbeb94'), color('#06b876'), color('#326336'),
												  color('#603ade'), color('#b657c9'), color('#cdbdf0'),
												  color('#8B5A2B'), color('#D1B399'), color('#FFE5B4'), 
												  color('#ff5d17'), color('#89CFF0'), color('#f02438'), 
												  color('#a80a2a'), color('#FF8F00'), color('#e08494'), 
												  color('#e64992'), color('#a10584'), color('#edbc1c'), 
												  color('#fcef58'), color('#91b007'), color('#cfe6fc')]									
}

function preload() {
	resp = loadTable('respondent_data.csv', 'csv').getRows();
	other = loadTable('other_data.csv', 'csv').getRows();
	
	friendships_respondents = loadTable('friendships_respondents.csv', 'csv', 'header').getRows();
	roommates_respondents = loadTable('roommates_respondents.csv', 'csv', 'header').getRows();
	
	friendships_other = loadTable('friendships_other.csv', 'csv', 'header').getRows();
	roommates_other = loadTable('roommates_other.csv', 'csv', 'header').getRows();
	
	outfit = loadFont('outfit.ttf');
}

function drawSecondaryConnections() {
	for (let i = 0; i < friendships_other.length; i++) {
		tuple = friendships_other[i]['arr']
		id_resp = int(tuple[0]) + 1
		id_other = int(tuple[1]) - num_respondents
		
		resp_indiv = resp[id_resp]['arr']
		other_indiv = other[id_other]['arr']
	
		x1 = int(resp_indiv[2])
		y1 = int(resp_indiv[3])
		x2 = int(other_indiv[2])
		y2 = int(other_indiv[3])
		stroke(secondary_color, secondary_color, secondary_color, 180)
		strokeWeight(0.6)
		line(x1, y1, x2, y2)
	}
	
	for (let i = 0; i < roommates_other.length; i++) {
		tuple = roommates_other[i]['arr']
		id_resp = int(tuple[0]) + 1
		id_other = int(tuple[1]) - num_respondents
		
		resp_indiv = resp[id_resp]['arr']
		other_indiv = other[id_other]['arr']
	
		x1 = int(resp_indiv[2])
		y1 = int(resp_indiv[3])
		x2 = int(other_indiv[2])
		y2 = int(other_indiv[3])
		stroke(93, 140, 217, 130)
		strokeWeight(1)
		line(x1, y1, x2, y2)
	}
}

function drawPrimaryConnections() {
	for (let i = 0; i < friendships_respondents.length; i++) {
		tuple = friendships_respondents[i]['arr']
		id_1 = int(tuple[0]) + 1
		id_2 = int(tuple[1]) + 1
		
		indiv1 = resp[id_1]['arr']
		indiv2 = resp[id_2]['arr']
	
		x1 = int(indiv1[2])
		y1 = int(indiv1[3])
		x2 = int(indiv2[2])
		y2 = int(indiv2[3])
		stroke(color(140, 140, 140, 70))
		strokeWeight(5)
		line(x1, y1, x2, y2)
	}
	for (let i = 0; i < roommates_respondents.length; i++) {
		tuple = roommates_respondents[i]['arr']
		id_1 = int(tuple[0]) + 1
		id_2 = int(tuple[1]) + 1
		
		indiv1 = resp[id_1]['arr']
		indiv2 = resp[id_2]['arr']
	
		x1 = int(indiv1[2])
		y1 = int(indiv1[3])
		x2 = int(indiv2[2])
		y2 = int(indiv2[3])
		stroke(93, 140, 217, 70)
		strokeWeight(8)
		line(x1, y1, x2, y2)
	}
}

function drawOtherIndividuals() {
	for (let i = 1; i < other.length; i++) {
		other_indiv = other[i]['arr'];
		x = int(other_indiv[2]);
		y = int(other_indiv[3]);
		fill(secondary_color+10, secondary_color+10, secondary_color+10, 180);
		stroke(255, 255, 255, 150);
		strokeWeight(2.5);
		circle(int(x), int(y), 14+int(other_indiv[4])*2.8);
	}
}

function drawRespondentIndviduals() {
	for (let i = 1; i < resp.length; i++) {
		resp_indiv = resp[i]['arr'];
		x = int(resp_indiv[2]);
		y = int(resp_indiv[3]);
		from = int(resp_indiv[4]);
		class_year = int(resp_indiv[5]) - 2023;
		concentration_str = resp_indiv[6]
		secondary = int(resp_indiv[7])
		radius = log(int(resp_indiv[8]))*15+35
		
		stroke(background_color, background_color, background_color, 120);
		strokeWeight(radius/7);
		
		if (secondary != -1) {
			// draw secondary ring
			fill(concentration_colors[secondary])
			noStroke();
			circle(int(x), int(y), radius);
			
			fill(background_color, background_color, background_color, 0)
			stroke(background_color, background_color, background_color, 120);
			strokeWeight(radius/7);
			circle(int(x), int(y), radius*8/7);
		} else {
			fill(background_color, background_color, background_color, 0)
			stroke(background_color, background_color, background_color, 120);
			strokeWeight(radius/7);
			circle(int(x), int(y), radius*9/10);
		}
		
		strokeWeight(1);
		stroke(background_color);
		
		
		// concentration ring
    concentration_str = concentration_str.substring(1, concentration_str.length-1);
		concentration = split(concentration_str, ',');
		concentration_radius = radius*0.85
		if (concentration.length > 1) {
			// draw half circles
			fill(concentration_colors[int(concentration[0])]);
			arc(int(x), int(y), concentration_radius, concentration_radius, 0, PI);
			fill(concentration_colors[int(concentration[1])]);
			arc(int(x), int(y), concentration_radius, concentration_radius, PI, 2*PI);
		} else {
			// draw full circle
			fill(concentration_colors[int(concentration_str)]);
			circle(int(x), int(y), concentration_radius);
		}
		stroke(background_color);
		strokeWeight(1);
		
		// draw class year circle
		fill(class_colors[class_year]);
		circle(int(x), int(y), radius*0.55);
	}
}

function draw_legend() {
	// draw concentration rectangles
	num_conc = concentration_colors.length
	rect_width = (width-300)/num_conc
	rect_height = 80
	for (let i = 0; i < num_conc; i++) {
		fill(concentration_colors[i])
		stroke(background_color)
		strokeWeight(4)
		// rotate(0);
		rect(i*rect_width+180, height-rect_height, rect_width, rect_height);
		// rotate(radians(45));
		// textSize(18);
		// text(concs[i], i*rect_width+180, height-rect_height)
	}
	
	for (let i = 0; i < 3; i++) {
		fill(class_colors[i])
		stroke(background_color)
		strokeWeight(4)
		rect(0, height-(3-i)*rect_width-180, rect_height, rect_width);
	}
}

function draw() {
	drawSecondaryConnections();
	drawOtherIndividuals();
	drawPrimaryConnections();
	drawRespondentIndviduals();
	
	// saveCanvas('eliot_v2', 'png');
}
