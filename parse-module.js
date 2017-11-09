const fetch = require('node-fetch'),
config = require('./config');

function fetchLocation(url, callback) {
	fetch(url)
	.then(res => res.json())
	.then(data => callback(data))
	.catch(err => {
		callback(undefined);
		console.log(err);
	})
}

module.exports = {
	update: (parseObj, obj) => {
		parseObj.save(obj).then(obj => {
			console.log('\nObject saved:\n', obj);
		}, error => console.log(error))
	},
	formatSchoolName: (name) => {
		name = name.replace(/ ES/i, ' Elementary School');
		name = name.replace(/ PS/i, ' Primary School');
		name = name.replace(/ CES/i, ' Central Elementary School');
		name = name.replace(/ CS/i, ' Central School');
		name = name.replace(/ NHS/i, ' National High School');
		name = name.split(' ').join('%20');
		return name;
	},
	formatName: (name) => {
		return name.split(' ').join('%20');
	},
	formatMncp: (name) => {
		if (name === 'PUERTO PRINCESA CITY (Capital)') {
			name = 'PUERTO PRINCESA CITY';
		} else if (name === 'BONGAO (Capital)') {
			name = 'BONGAO';
		} else if (name === 'NABUNTURAN (Capital)') {
			name = 'NABUNTURAN';
		} else if (name === 'TUBOD (Capital)') {
			name = 'TUBOD';
		} else if (name === 'PIÑAN (NEW PIÑAN)') {
			name = 'PINAN';
		} else {
			name = name.replace(/Ñ/i, 'N');
		}
		return name.split(' ').join('%20');
	},
	callLocation: (name, address, callback) => {
		fetchLocation(`https://maps.googleapis.com/maps/api/geocode/json?address=${name},${address}&key=${config.API_KEY}`, data => {
			if(data === undefined) {
				callback(undefined);
			} else {
				if(data.status === 'OK') {
					callback(data.results[0].geometry.location);
				} else {
					fetchLocation(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.API_KEY}`, data2 => {
						if(data2 === undefined) {
							callback(undefined);
						} else {
							if(data2.status === 'OK') {
								callback(data2.results[0].geometry.location);
							}
						}
					})
				}
			}
		})
	}
}








