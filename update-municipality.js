const Parse = require('parse/node'),
	mod = require('./parse-module'),
	config = require('./config'),
	readExcel = require('./readExcel');

Parse.initialize(config.APP_ID,config.JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

readExcel((err,schools) => {
	if (err) throw err;

	let Project = Parse.Object.extend('Project'),
		queryProj = new Parse.Query(Project),
		Municipality = Parse.Object.extend('Municipality'),
		queryMncp = new Parse.Query(Municipality);

	queryProj.doesNotExist('municipality');
	queryProj.limit(schools.length);
	queryProj.find().then(proj => {

		proj.map(content => {
			let getName = content.get('name'),
				district = content.get('district');
			schools.map(school => {
				if(school.school_name === getName && school.district === district) {
					queryMncp.equalTo('name', school.municipality);
					queryMncp.find().then(mncp => {
						let obj = {municipality: mncp[0]};
						mod.update(content, obj);
					})
				}
			})
		})

	}, error => console.log(error))
})