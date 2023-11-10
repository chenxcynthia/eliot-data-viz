let secondary_color = 180
let background_color = 250

let num_respondents = 37
let colors; 

function setup() {
	width = 3000;
	createCanvas(width, 64/25*width);
	background(background_color);
	noLoop();
	angleMode(DEGREES);
	roommate_line_color = color(93, 140, 217)
	class_colors = [85, 160, 225]
	class_map = [-70, 0, 50]
	concentration_colors = [color('#0651D5'), color('#F95F1C'), color('#9CBF2D'), 
													color('#07AAB8'), color('#CC53E4'), color('#C6E2FC'),
												  color('#F7C112'), color('#D1C2F2'), color('#06E1A6'),
												  color('#8B5A2B'), color('#e64992'), color('#FFE5B4'), 
												  color('#a80a2a'), color('#89CFF0'), color('#f02438'), 
												  color('#18A309'), color('#F18802'), color('#e08494'), 
												  color('#D1B399'), color('#a10584'), color('#5B31EA'), 
												  color('#fcef58'), color('#48763A'), color('#bbeb94'),]		
	
	concs = ['Government', 'Economics', 'Computer Science', 'Statistics', 'Psychology', 
						'Biomedical Engineering', 'Molecular and Cellular Biology', 
						'Applied Mathematics', 'Women, Gender, and Sexuality Studies', 
						'Mechanical Engineering', 'Physics', 'Philosophy', 'History and Literature',
						'Sociology', 'Integrative Biology', 'Music', 'History', 'English',
						'Art Film and Visual Studies', 'Mathematics', 'Global Health and Health Policy',
						'Social Studies', 'Energy and Environment', 'Neuroscience']
}

function transform(a) {
	return (width / 1250 - 0.25) * a + width/20
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


function draw_arc(x1, y1, x2, y2) {
	x_midpoint = (x1+x2)/2
	y_midpoint = (y1+y2)/2
	x_slope = x2 - x1
	y_slope = y2 - y1
	multiplier = random(0.7, 2.5) * (random() < 0.5 ? -1 : 1);
	x_delta = -1 * y_slope * multiplier
	y_delta = x_slope * multiplier
	centerX = x_midpoint + x_delta
	centerY = y_midpoint + y_delta
	
	let radius = dist(x1, y1, centerX, centerY);
  let startAngle = atan2(y1 - centerY, x1 - centerX);
  let endAngle = atan2(y2 - centerY, x2 - centerX);
	if (endAngle < 0) endAngle = 360 + endAngle
	if (startAngle < 0) startAngle = 360 + startAngle
	delta = endAngle - startAngle
	if (delta < 0) delta = 360 + delta
	if (delta > 180) {
		temporary = startAngle
		startAngle = endAngle
		endAngle = temporary
	}
	noFill();
  arc(centerX, centerY, radius * 2, radius * 2, startAngle, endAngle);
}

function drawSecondaryConnections() {
	for (let i = 0; i < friendships_other.length; i++) {
		tuple = friendships_other[i]['arr']
		id_resp = int(tuple[0]) + 1
		id_other = int(tuple[1]) - num_respondents
		
		resp_indiv = resp[id_resp]['arr']
		other_indiv = other[id_other]['arr']
	
		x1 = transform(int(resp_indiv[2]))
		y1 = transform(int(resp_indiv[3]))
		x2 = transform(int(other_indiv[2]))
		y2 = transform(int(other_indiv[3]))
		stroke(0, 220)
		strokeWeight(width/3000)
		draw_arc(x1, y1, x2, y2)
	}
	
	for (let i = 0; i < roommates_other.length; i++) {
		tuple = roommates_other[i]['arr']
		id_resp = int(tuple[0]) + 1
		id_other = int(tuple[1]) - num_respondents
		
		resp_indiv = resp[id_resp]['arr']
		other_indiv = other[id_other]['arr']
	
		x1 = transform(int(resp_indiv[2]))
		y1 = transform(int(resp_indiv[3]))
		x2 = transform(int(other_indiv[2]))
		y2 = transform(int(other_indiv[3]))
		stroke(199, 2, 41, 130)
		strokeWeight(width/2200)
		draw_arc(x1, y1, x2, y2)
	}
}

function drawPrimaryConnections() {
	strokeWeight(width/930)
	for (let i = 0; i < friendships_respondents.length; i++) {
		tuple = friendships_respondents[i]['arr']
		id_1 = int(tuple[0]) + 1
		id_2 = int(tuple[1]) + 1
		
		indiv1 = resp[id_1]['arr']
		indiv2 = resp[id_2]['arr']
	
		x1 = transform(int(indiv1[2]))
		y1 = transform(int(indiv1[3]))
		x2 = transform(int(indiv2[2]))
		y2 = transform(int(indiv2[3]))
		stroke(30)
		draw_arc(x1, y1, x2, y2)
	}
	for (let i = 0; i < roommates_respondents.length; i++) {
		tuple = roommates_respondents[i]['arr']
		id_1 = int(tuple[0]) + 1
		id_2 = int(tuple[1]) + 1
		
		indiv1 = resp[id_1]['arr']
		indiv2 = resp[id_2]['arr']
	
		x1 = transform(int(indiv1[2]))
		y1 = transform(int(indiv1[3]))
		x2 = transform(int(indiv2[2]))
		y2 = transform(int(indiv2[3]))
		stroke(199, 2, 41)
		draw_arc(x1, y1, x2, y2)
	}
}

function drawOtherIndividuals() {
	for (let i = 1; i < other.length; i++) {
		other_indiv = other[i]['arr'];
		x = transform(int(other_indiv[2]));
		y = transform(int(other_indiv[3]));
		fill(18)
		stroke(250);
		strokeWeight(2);
		circle(int(x), int(y), width/135); // + int(other_indiv[4])*(width/1000)
	}
}

function drawRespondentIndviduals() {
	for (let i = 1; i < resp.length; i++) {
		resp_indiv = resp[i]['arr'];
		x = transform(int(resp_indiv[2]));
		y = transform(int(resp_indiv[3]));
		from = int(resp_indiv[4]);
		class_year = int(resp_indiv[5]) - 2023;
		concentration_str = resp_indiv[6]
		secondary = int(resp_indiv[7])
		radius = 160 // log(int(resp_indiv[8]))*width/80+width/155+50
		
		strokeWeight(4);
		stroke(background_color);
		
		if (secondary != -1) {
			fill(concentration_colors[secondary])
			strokeWeight(2.5);
			circle(int(x), int(y), radius*0.8);
			concentration_radius = radius*0.62
			class_radius = radius*0.34
		}
		else {
			concentration_radius = radius*0.8
			class_radius = radius*0.43
		}
		
    concentration_str = concentration_str.substring(1, concentration_str.length-1);
		concentration = split(concentration_str, ',');
		class_color = '#00000'
		if (concentration.length > 1) {
			// draw half circles
			color1 = concentration_colors[int(concentration[0])]
			color2 = concentration_colors[int(concentration[1])]
			fill(color1);
			arc(int(x), int(y), concentration_radius, concentration_radius, 0, 180);
			fill(color2);
			arc(int(x), int(y), concentration_radius, concentration_radius, 180, 360);
			cc = [(red(color1) + red(color2))/2, (green(color1) + green(color2))/2, (blue(color1) + blue(color2))/2]
		} else {
			// draw full circle
			color1 = concentration_colors[int(concentration_str)]
			fill(concentration_colors[int(concentration_str)]);
			circle(int(x), int(y), concentration_radius);
			cc = [red(color1), green(color1), blue(color1)]
		}
		stroke(background_color);
		strokeWeight(2.5);
			
		// draw class year circle
		cc_delta = class_map[class_year]
		fill(cc[0] + cc_delta, cc[1] + cc_delta, cc[2] + cc_delta)
		circle(int(x), int(y), class_radius);
	}
}

function drawSingular() {
	i = 7 // other good ones: 3, 6, 7, 12, 15, 19, 26, 27, 29, 35
	resp_indiv = resp[i]['arr'];
	x = width * 0.4
	y =  x
	from = int(resp_indiv[4]);
	class_year = int(resp_indiv[5]) - 2023;
	concentration_str = resp_indiv[6]
	secondary = int(resp_indiv[7])
	radius = 400 // 2*(log(int(resp_indiv[8]))*width/80+width/180+75)

	noStroke()
	// strokeWeight(4);
	stroke(background_color);

	if (secondary != -1) {
		fill(concentration_colors[secondary])
		strokeWeight(8);
		circle(int(x), int(y), radius);
	}

	concentration_str = concentration_str.substring(1, concentration_str.length-1);
	concentration = split(concentration_str, ',');
	concentration_radius = radius*0.78
	class_color = '#00000'
	if (concentration.length > 1) {
		// draw half circles
		color1 = concentration_colors[int(concentration[0])]
		color2 = concentration_colors[int(concentration[1])]
		fill(color1);
		arc(int(x), int(y), concentration_radius, concentration_radius, 0, 180);
		fill(color2);
		arc(int(x), int(y), concentration_radius, concentration_radius, 180, 360);
		cc = [(red(color1) + red(color2))/2, (green(color1) + green(color2))/2, (blue(color1) + blue(color2))/2]
	} else {
		// draw full circle
		color1 = concentration_colors[int(concentration_str)]
		fill(concentration_colors[int(concentration_str)]);
		circle(int(x), int(y), concentration_radius);
		cc = [red(color1), green(color1), blue(color1)]
	}
	stroke(background_color);
	strokeWeight(8);

	// draw class year circle
	cc_delta = class_map[class_year]
	fill(cc[0] + cc_delta, cc[1] + cc_delta, cc[2] + cc_delta)
	circle(int(x), int(y), radius*0.45);
}



function draw_legend() {
	num_conc = concentration_colors.length
	rect_width = (width-300)/num_conc
	rect_height = 80
	for (let i = 0; i < num_conc; i++) {
		fill(concentration_colors[i])
		stroke(background_color)
		strokeWeight(10)
		rect(i*rect_width+180, height-rect_height, rect_width, rect_height);
	}
}

function draw() {
	drawSecondaryConnections();
	drawPrimaryConnections();
	drawOtherIndividuals();
	drawRespondentIndviduals();
	// draw_legend();
	// drawSingular();
	// saveCanvas('eliot', 'png');
}
