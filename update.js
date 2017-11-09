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
		Region = Parse.Object.extend('Region'),
		queryRegion = new Parse.Query(Region),
		Province = Parse.Object.extend('Province'),
		queryProv = new Parse.Query(Province),
		Municipality = Parse.Object.extend('Municipality'),
		queryMncp = new Parse.Query(Municipality),
		Program = Parse.Object.extend('Program'),
		queryProg = new Parse.Query(Program);

	queryProj.exists('name');
	queryProj.limit(schools.length);
	queryProj.find().then(proj => {
		let projObj = proj.map(content => {
			return {name: content.get('name'), district: content.get('district')}
		});
		let schObj = schools.map(school => {
			return {
				name: school.school_name,
				division: school.division,
				province: school.province,
				region: school.region,
				municipality: school.municipality,
				district: school.district
			};
		});
		let result = schObj.filter(obj1 => {
		    return !projObj.some(obj2 => {
		        return obj1.name === obj2.name && obj1.district === obj2.district;
		      });
		});

		result.map(res => {
			let name = mod.formatSchoolName(res.name),
				mncpName = mod.formatName(res.municipality),
				provName = mod.formatName(res.province),
				regName = mod.formatName(res.region),
				address = `${mncpName},${provName},${regName},PH`;

			mod.callLocation(name, address, data => {
				if(data === undefined) {
					res.location = undefined;
				} else {
					let coords = {latitude: data.lat, longitude: data.lng};
					res.location = new Parse.GeoPoint(coords);
				}

				queryRegion.equalTo('name', res.region);
				queryRegion.find().then(reg => {
					res.region = reg[0];

					queryProv.equalTo('name', res.province);
					queryProv.find().then(prov => {
						res.province = prov[0];
						
						queryMncp.equalTo('name', res.municipality);
						queryMncp.find().then(mncp => {
							res.municipality = mncp[0];

							queryProg.equalTo('name', 'K to 12 Computerisationm Programme');
							queryProg.find().then(prog => {
								res.program = prog[0];

								let project = new Project();
								mod.update(project, res);

							}, error => console.log(error))
						}, error => console.log(error))
					}, error => console.log(error))
				}, error => console.log(error))
			})
		})

	}, error => console.log(error))
})