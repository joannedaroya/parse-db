const Parse = require('parse/node'),
	mod = require('./parse-module'),
	config = require('./config'),
	readExcel = require('./readExcel');

Parse.initialize(config.APP_ID,config.JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

readExcel((err,schools) => {
	if (err) throw err;

	let Project = Parse.Object.extend('Project'),
		queryProj = new Parse.Query(Project);

	queryProj.doesNotExist('location');
	queryProj.limit(schools.length);
	queryProj.find().then(proj => {
		proj.map(content => {
			let getName = content.get('name'),
				district = content.get('district');
			schools.map(school => {
				if(school.school_name === getName && school.district === district) {
					let name = mod.formatSchoolName(school.school_name),
					mncpName = mod.formatMncp(school.municipality),
					provName = mod.formatName(school.province),
					regName = mod.formatName(school.region),
					address = `${mncpName},${provName},${regName},PH`;

					mod.callLocation(name, address, data => {
						if(data === undefined) {
							school.location = undefined;
						} else {
							let coords = {latitude: data.lat, longitude: data.lng};
							school.location = new Parse.GeoPoint(coords);
						}
						let obj = {location: school.location};
						mod.update(content, obj);
					});
				}
			})
		})
	}, error => console.log(error))
})