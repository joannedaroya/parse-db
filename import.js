const Parse = require('parse/node'),
	mod = require('./parse-module'),
	config = require('./config'),
	readExcel = require('./readExcel');

Parse.initialize(config.APP_ID,config.JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

readExcel((err,schools) => {
	if (err) throw err;

	let Region = Parse.Object.extend('Region'),
		queryRegion = new Parse.Query(Region),
		Province = Parse.Object.extend('Province'),
		queryProv = new Parse.Query(Province),
		Municipality = Parse.Object.extend('Municipality'),
		queryMncp = new Parse.Query(Municipality),
		Program = Parse.Object.extend('Program'),
		queryProg = new Parse.Query(Program);

	function setData(schools) {
		for(let i in schools) {
			(i => {
				setTimeout(() => {
					let getName = schools[i].school_name,
					name = mod.formatSchoolName(getName),
					mncpName = mod.formatMncp(schools[i].municipality),
					provName = mod.formatName(schools[i].province),
					regName = mod.formatName(schools[i].region),
					address = `${mncpName},${provName},${regName},PH`;

					mod.callLocation(name, address, data => {
						if(data === undefined) {
							schools[i].location = undefined;
						} else {
							let coords = {latitude: data.lat, longitude: data.lng};
							schools[i].location = new Parse.GeoPoint(coords);
						}

						queryRegion.equalTo('name', schools[i].region);
						queryRegion.find().then(reg => {
							schools[i].region = reg[0];

							queryProv.equalTo('name', schools[i].province);
							queryProv.find().then(prov => {
								schools[i].province = prov[0];

								queryMncp.equalTo('name', schools[i].municipality);
								queryMncp.find().then(mncp => {
									schools[i].municipality = mncp[0];

									queryProg.equalTo('name', 'K to 12 Computerisationm Programme');
									queryProg.find().then(prog => {
										schools[i].program = prog[0];

										let obj = {
											program: schools[i].program,
											name: schools[i].school_name,
											division: schools[i].division,
											province: schools[i].province,
											region: schools[i].region,
											location: schools[i].location,
											municipality: schools[i].municipality,
											district: schools[i].district
										}

										let Project = Parse.Object.extend('Project'),
											project = new Project();
										mod.update(project, obj);

									}, error => console.log(error))
								}, error => console.log(error))
							}, error => console.log(error))
						}, error => console.log(error))
					});

				}, 1000 * i);
			})(i);
		}
	}
	setData(schools);
})