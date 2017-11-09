const parseXlsx = require('excel');

const file = './Unenergized+Recipient+List+(Luzon+&+Mindanao)+as+of+March+2017.xlsx';

module.exports = function(callback) {
	parseXlsx(file, (err,data) => {
		if(err) throw err;

		let getKeys = data.splice(0,1);
		let keys = getKeys[0];
		keys = keys.map(name => {
			name = name.replace(/\./g,"");
			return name.split(" ").join("_").toLowerCase();
		});

		let values = data.map(content => {
			content[1] = content[1].toUpperCase();
			content[6] = content[6].toUpperCase();
			content[7] = content[7].toUpperCase();
			
			if(content[1] === 'CARAGA') { content[1] = 'Caraga' }
			else if(content[5] === 'Bubongaranao Primary school\\') { content[5] = 'Bubongaranao Primary school' }
			else if(content[6] === 'LANAO DEL SUR - I') { content[6] = 'LANAO DEL SUR' }
			else if(content[6] === 'CITY OF COTABATO') { content[6] = 'COTABATO CITY' }
			else if(content[6] === 'NORTH COTABATO') { content[6] = 'COTABATO (NORTH COTABATO)' }
			else if(content[7] === 'CITY OF KORONADAL (CAPITAL)') { content[7] = 'CITY OF KORONADAL (Capital)' }
			else if(content[7] === 'ALABEL (CAPITAL)') { content[7] = 'ALABEL (Capital)' }
			else if(content[7] === 'SHARelse ifF AGUAK (MAGANOY) (CAPITAL)') { content[7] = 'SHARelse ifF AGUAK (MAGANOY) (Capital)' }
			else if(content[7] === 'JOLO (CAPITAL)') { content[7] = 'JOLO (Capital)' }
			else if(content[7] === 'PANGLIMA SUGALA (BALIMBING) (CAPITAL)') { content[7] = 'PANGLIMA SUGALA (BALIMBING)' }
			else if(content[7] === 'KABUGAO (CAPITAL)') { content[7] = 'KABUGAO (Capital)' }
			else if(content[7] === 'PROSPERIDAD (CAPITAL)') { content[7] = 'PROSPERIDAD (Capital)' }
			else if(content[7] === 'SURIGAO CITY (CAPITAL)') { content[7] = 'SURIGAO CITY (Capital)' }
			else if(content[7] === 'SAN JOSE (CAPITAL)') { content[7] = 'SAN JOSE (Capital)' }
			else if(content[7] === 'CITY OF TANDAG (CAPITAL)') { content[7] = 'CITY OF TANDAG (Capital)' }
			else if(content[7] === 'BAYOMBONG (CAPITAL)') { content[7] = 'BAYOMBONG (Capital)' }
			else if(content[7] === 'CABARROGUIS (CAPITAL)') { content[7] = 'CABARROGUIS (Capital)' }
			else if(content[7] === 'CITY OF TARLAC (CAPITAL)') { content[7] = 'CITY OF TARLAC (Capital)' }
			else if(content[7] === 'CITY OF TARLAC (CAPITAL)') { content[7] = 'CITY OF TARLAC (Capital)' }
			else if(content[7] === 'BATANGAS CITY (CAPITAL)') { content[7] = 'BATANGAS CITY (Capital)' }
			else if(content[7] === 'MAMBURAO (CAPITAL)') { content[7] = 'MAMBURAO (Capital)' }
			else if(content[7] === 'PUERTO PRINCESA CITY (CAPITAL)') { content[7] = 'PUERTO PRINCESA CITY (Capital)' }
			else if(content[7] === 'DIPOLOG CITY (CAPITAL)') { content[7] = 'DIPOLOG CITY (Capital)' }
			else if(content[7] === 'CITY OF ISABELA (CAPITAL)') { content[7] = 'CITY OF ISABELA' }
			else if(content[7] === 'CITY OF MASBATE (CAPITAL)') { content[7] = 'CITY OF MASBATE (Capital)' }
			else if(content[7] === 'CITY MALAYBALAY (CAPITAL)') { content[7] = 'CITY OF MALAYBALAY (Capital)' }
			else if(content[7] === 'OROQUIETA CITY (CAPITAL)') { content[7] = 'OROQUIETA CITY (Capital)' }
			else if(content[7] === 'TUBOD (CAPITAL)') { content[7] = 'TUBOD (Capital)' }
			else if(content[7] === 'CITY OF MATI (CAPITAL)') { content[7] = 'CITY OF MATI (Capital)' }
			else if(content[7] === 'CITY OF DIGOS (CAPITAL)') { content[7] = 'CITY OF DIGOS (Capital)' }
			else if(content[7] === 'NABUNTURAN (CAPITAL)') { content[7] = 'NABUNTURAN (Capital)' }
			else if(content[7] === 'ISULAN (CAPITAL)') { content[7] = 'ISULAN (Capital)' }
			else if(content[7] === 'DATU BLAH SINSUAT') { content[7] = 'DATU BLAH T. SINSUAT' }
			else if(content[7] === 'BONGAO') { content[7] = 'BONGAO (Capital)' }
			else if(content[7] === 'MARAWI CITY') { content[7] = 'MARAWI CITY (Capital)' }
			else if(content[7] === 'BACUNGAN (LEON T. POSTIGO)') { content[7] = 'BACUNGAN (Leon T. Postigo)' }
			else if(content[7] === 'MABALACAT') { content[7] = 'MABALACAT CITY' }
			else if(content[7] === 'ALFONSO CASTAÑEDA') { content[7] = 'ALFONSO CASTANEDA' }
			else if(content[7] === 'DIVILICAN') { content[7] = 'DIVILACAN' }
			else if(content[7] === 'SULTAN GUMANDER (PICONG)') { content[7] = 'PICONG (SULTAN GUMANDER)' }
			return content;
		});

		let obj = values.map(value => {
			let result = {};
			keys.forEach((key,idx) => result[key] = value[idx]);
			return result;
		});
		callback(null, obj);
	})
}