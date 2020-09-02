import api from './APIFactory';
import {sha256} from 'js-sha256';


//https://www.dnd5eapi.co/api/spells/acid-arrow/



export async function checkPassword(username, password){
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/users.json', {
			headers: {
			    "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
    let temp = {};
    if(result.data[username]){
        if(sha256(password) === result.data[username].password){
            temp['check'] = true;
            temp['userInfo'] = {...result.data[username].userInfo, username};
	    } else {
            temp['check'] = false;
            temp['userInfo'] = {};
	    }
	}else {
        temp['check'] = false;
        temp['userInfo'] = {};
	}
    return (temp);
}

export async function newUser(username1, firstName1, lastName1, password1) {
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/users/'+username1+'.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    if(result.data === null){
        let result = await api.put('https://dylan-s-database.firebaseio.com/dnd/users/'+username1+'.json',
        {password: sha256(password1), userInfo: {firstName: firstName1, lastName: lastName1, username: username1}}
        )
        return result.status;
	} else {
        return false;
	}
}

export async function grabNames() {
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/users.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    let temp = [];
	for(var key in result.data){
		temp.push(key);
	}
	return temp;
}


export async function addNewCharacter(name, user) {
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
		let result1 = {};
	if(!Object.keys(result.data).includes(name)){
		result1 = {...result.data, [name]: {creator: user, items: [], shared: []}}
	} else {
		result1 = result.data;
	}
	
    await api.put('https://dylan-s-database.firebaseio.com/dnd/characters.json',
        result1
        )
	
    let temp = {};
	for(var keys in result1.data){
		if(result1.data[keys].creator === user || result.data[keys].shared.includes(user)){
			if(result1.data[keys].items){
				temp[keys] = result1.data[keys].items
			} else{
				temp[keys] = ''
			}
		}
	}
	
    return temp;
}

export async function saveCharacter(name, data, user) {
	await api.put('https://dylan-s-database.firebaseio.com/dnd/characters/'+name+'/items.json', 
		data
	)
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp = {};
	for(var keys in result.data){
		if(result.data[keys].creator === user || result.data[keys].shared.includes(user)){
			if(result.data[keys].items){
				temp[keys] = result.data[keys].items
			} else{
				temp[keys] = ''
			}
		}
	}
	if(result.data === null || Object.keys(temp).length === 0){
		temp = {'Placeholder Character': ''};
	}
    return temp;
}

export async function shareCharacter(name, creator, user) {

    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters/' + name + '.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp = result.data;
	if(temp.creator === creator){
		if(temp.shared === undefined){
			temp.shared = [];
		}
		if(user !== creator && !temp.shared.includes(creator)){
			temp.shared.push(user)
		}
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/characters/'+name+ '.json', 
		temp
	)
}

export async function deleteCharacter(name, user) {
	let temp = {};
	let temp1 = {};
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	if(result.data !== null){
		temp = result.data;
		if(temp[name].creator === user){
			delete temp[name];
		}

		await api.put('https://dylan-s-database.firebaseio.com/dnd/characters.json', 
			temp
		)

		temp1 = {};
		for(var keys in temp){
			if(temp[keys].creator === user || result.data[keys].shared.includes(user)){
				if(temp[keys].items){
					temp1[keys] = temp[keys].items
				} else{
					temp1[keys] = ''
				}
			}
		}
	}
	if(temp === null){
		temp1 = {'Placeholder Character': ''};
	}
	
    return temp1;
}

export async function grabCharacters(user) {
    let result = await api('https://dylan-s-database.firebaseio.com/dnd/characters.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp = {};
	for(var keys in result.data){
		if(result.data[keys].creator === user || result.data[keys].shared.includes(user)){
			if(result.data[keys].items){
				temp[keys] = result.data[keys].items
			} else{
				temp[keys] = ''
			}
		}
	}
	if(result.data === null || Object.keys(temp).length === 0){
		temp = {'Placeholder Character': ''};
	}

    return temp;
}

export async function update5e(){
	let temp=['ability-scores','conditions', 'damage-types', 'equipment-categories', 'equipment', 'features', 'languages', 'magic-schools', 'monsters', 
	'proficiencies', 'races', 'skills', 'spellcasting', 'spells', 'starting-equipment', 'subclasses', 'subraces', 'traits', 'weapon-properties']
	for(let i = 0; i < temp.length; i++){
		let result = await api('https://www.dnd5eapi.co/api/ability-scores');
		await api.put('https://dylan-s-database.firebaseio.com/dnd/5e/ability-scores.json',
		result.data
		)
	}

	let result1 = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result1.data;
}

export async function grab5e(){
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result.data;
}

export async function update5eDetails(dndInfo){
	let temp=['ability-scores','conditions', 'classes', 'damage-types', 'equipment-categories', 'equipment', 'features', 'languages', 'magic-schools', 'monsters', 
	'proficiencies', 'races', 'skills', 'spellcasting', 'spells', 'starting-equipment', 'subclasses', 'subraces', 'traits', 'weapon-properties']
	for(let i = 0; i < temp.length; i++){
		for(let j = 0; j < dndInfo.generalInfo[temp[i]].count; j++){
			if(dndInfo.generalInfo[temp[i]].results[j].url){
				let result = await api('https://www.dnd5eapi.co' + dndInfo.generalInfo[temp[i]].results[j].url);
				await api.put('https://dylan-s-database.firebaseio.com/dnd/5e/specifics/'+temp[i]+'/'+result.data.name+'.json',
				result.data
			)
			}
		}
	}

	let result1 = await api('https://dylan-s-database.firebaseio.com/dnd/5e.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
    return result1.data;
}

export async function grabDraggable(environment, user){
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})
	let temp = {};
	if(result.data.options === undefined){
		temp['items'] = result.data.items;
		temp['current'] = [];
		temp['scale'] = '';
	} else if(result.data.options[environment] === undefined){
		temp['items'] = result.data.items;
		temp['current'] = [];
		temp['scale'] = '';
	} else {
		temp['items'] = result.data.items;
		if(result.data.options[environment].creator === user){
			temp['current'] = (result.data.options[environment].items !== undefined) ? result.data.options[environment].items : [];
			temp['scale'] = Number(result.data.options[environment].scale);
		} else if(result.data.options[environment].shared){
			if(result.data.options[environment].shared.includes(user)){
				temp['current'] = (result.data.options[environment].items !== undefined) ? result.data.options[environment].items : [];
				temp['scale'] = Number(result.data.options[environment].scale);
			} else {
				temp['current'] = [];
				temp['scale'] = '';
			}
		} else {
			temp['current'] = [];
			temp['scale'] = '';
		}
	}
	
    return temp;
}

export async function updateCurrent(environment, current, user){
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options/' + environment + '/items.json',
	current
	)
	let temp = await grabDraggable(environment, user);

	return temp;
}


export async function newEnvironment(name, user){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	if(result.data === null){temp = {}}
	temp[name] = { name: name, items: [], scale: 30, creator: user, shared: []};
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options.json',
		temp
		)
	
	let tempKeys = await grabOptions(user);
	let temp1 = await grabDraggable(name, user);
	return [temp1, tempKeys];
}

export async function deleteEnvironment(name, user){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	if(temp[name].creator === user){
		delete temp[name];
	} else {
		temp[name].shared.splice(temp[name].shared.indexOf(user),1)
	}

	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options.json',
		temp
		)
	
	let temp1 = {};
	for(var key in temp){
		if(temp[key].creator === user){
			temp1[key] = temp[key];
		} else if(temp[key].shared){
			if(temp[key].shared.includes(user)){
				temp1[key] = temp[key];
			}
		}
	}


	return temp1;
}

export async function grabOptions(user){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = [];
	for(var key in result.data){
		if(result.data[key].creator === user){
			temp.push(key);
		} else if(result.data[key].shared){
			if(result.data[key].shared.includes(user)){
				temp.push(key);
			}
		}
	}	
	return temp;
}

export async function changeScale(scale, environment, user){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp.scale = scale;
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json',
		temp
		)

	let temp1 = await grabDraggable(environment, user);
	return temp1;
}

export async function shareEnvironment(environment, creator, user){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	if(temp.creator === creator){
		if(temp.shared === undefined){
			temp.shared = [];
		}
		if(user !== creator && !temp.shared.includes(creator)){
			temp.shared.push(user)
		}
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/options/'+environment+'.json',
		temp
		)
	return temp;
}

export async function grabCampaigns(){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = Object.keys(result.data);
	return temp;
}

export async function changeCampaign(campaign){
	
	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp =  result.data[campaign];
	return temp;
}

export async function addCampaign(campaign){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp[campaign] = {[`First Tab`]: [{notes:[], subnotepad: "First Subtab"}]};
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns.json',
		temp
		)
	return temp[campaign];
}

export async function addNotepad(campaign, notepad){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	temp[notepad] = '';
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function addSubnotepad(campaign, notepad, subnotepad){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	if(temp[notepad] === ''){
		temp[notepad] = [{subnotepad: subnotepad, notes: []}]
	} else {
		temp[notepad].push({subnotepad: subnotepad, notes: []})
	}
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function addNote(campaign, notepad, subnotepad, object, size){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		if(temp[notepad][i].subnotepad === subnotepad){
			if(Object.keys(temp[notepad][i]).includes('notes')){
				temp[notepad][i].notes.push({object: String(object), pLeft: '200', pTop: '200', size: size});
			} else {
				temp[notepad][i]['notes'] = [{object: String(object), pLeft: '200', pTop: '200', size: size}];
			}
		}
	}
	
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function updateNote(campaign, notepad, subnotepad, notes){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		if(temp[notepad][i].subnotepad === subnotepad){
			temp[notepad][i].notes = notes;
		}
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}

export async function deleteNote(campaign, notepad, subnotepad, notes){

	let result = await api('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json', {
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
				"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
			}})
	let temp = result.data;
	for(let i = 0; i < temp[notepad].length; i++){
		temp[notepad][i].notes = notes;
	}
	await api.put('https://dylan-s-database.firebaseio.com/dnd/campaigns/' + campaign + '.json',
		temp
		)

	return temp;
}