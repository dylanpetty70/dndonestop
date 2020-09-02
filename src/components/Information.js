import React from 'react';

export default function BaseInformation(name, info){
    let temp = [];

    if(typeof info === "object"){
    temp.push(Object.keys(info).map((key) => {
        let temp1 = [];
        if(key !== '_id' && key !== 'school' && key !== 'references' && key !== 'full_name' && key !== 'subclass_levels' && key !== 'equipment_category' && key !== 'index' && key !== 'name' && key !== 'url' && key !== 'weapon_category' && key !== 'class_levels' && key !== 'spellcasting' && key !== 'starting_equipment'){
            if(key === 'desc'){
                temp1.push(<div key={key}><strong>Description</strong><br/></div>);
                if(Array.isArray(info[key])){
                    for(let i = 0; i < info[key].length; i++){
                        temp1.push(
                            <p key={key+'i'}>{info[key][i].toString()}<br/></p>
					    )
					}
				} else {
                    temp1.push(
                            <p key={key+'1'}>{info[key].toString()}<br/></p>
					    )
				}
            } else if(key === 'hit_die'){
                temp1.push(<div key={key}><strong>Hit Die</strong><br/></div>);
                temp1.push(
                    <p key={key+'1'}>{'d' + info[key].toString()}<br/></p>
				)
            } else if(key === 'proficiencies'){
                temp1.push(<div key={key}><strong>Proficiencies</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'proficiency_choices'){
                temp1.push(<div key={key}><strong>Proficiency Choices</strong><br/></div>);
                temp1.push(<em>{'Choose ' + info[key][0].choose}</em>)
                let temp2 = '';
                for(let i = 0; i < info[key][0].from.length; i++){
                    temp2 += info[key][0].from[i].name.toString().replace('Skill: ','') + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'saving_throws'){
                temp1.push(<div key={key}><strong>Saving Throw Proficiencies</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'subclasses'){
                temp1.push(<div key={key}><strong>Subclasses</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'ability_bonuses'){
                temp1.push(<div key={key}><strong>Ability Bonuses</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 = info[key][i].name.toString() + ': +' + info[key][i].bonus.toString();
                    temp1.push(<p key={key+'i'}>{temp2}</p>);
				}
            } else if(key === 'ability_bonus_options'){
                temp1.push(<div key={key}><strong>Ability Bonus Options</strong><br/></div>);
                temp1.push(<em>{'Choose ' + info[key].choose}</em>)
                let temp2 = '';
                for(let i = 0; i < info[key].from.length; i++){
                    temp2 += info[key].from[i].name.toString() + ': +' + info[key].from[i].bonus.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'language_options'){
                temp1.push(<div key={key}><strong>Language Options</strong><br/></div>);
                temp1.push(<em>{'Choose ' + info[key].choose}</em>)
                let temp2 = '';
                for(let i = 0; i < info[key].from.length; i++){
                    temp2 += info[key].from[i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'languages'){
                temp1.push(<div key={key}><strong>Languages</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'traits'){
                temp1.push(<div key={key}><strong>Traits</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'starting_proficiencies'){
                temp1.push(<div key={key}><strong>Starting Proficiencies</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'starting_proficiency_options'){
                temp1.push(<div key={key}><strong>Starting Proficiency Options</strong><br/></div>);
                temp1.push(<em>{'Choose ' + info[key].choose}</em>)
                let temp2 = '';
                for(let i = 0; i < info[key].from.length; i++){
                    temp2 += info[key].from[i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'subraces'){
                temp1.push(<div key={key}><strong>Subraces</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'class'){
                temp1.push(<div key={key}><strong>Class</strong><br/></div>);
                temp1.push(<p>{info[key].name}</p>)
            } else if(key === 'skills'){
                temp1.push(<div key={key}><strong>Skills</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'ability_score'){
                temp1.push(<div key={key}><strong>Ability Score</strong><br/></div>);
                temp1.push(<p key={key + '1'}>{info[key].name}</p>)
            } else if(key === 'races'){
                temp1.push(<div key={key}><strong>Races</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'classes'){
                temp1.push(<div key={key}><strong>Classes</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name.toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'typical_speakers'){
                temp1.push(<div key={key}><strong>Typical Speakers</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].toString() + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'contents'){
                temp1.push(<div key={key}><strong>Contents</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += '1 ' + info[key][i].item_url.toString().replace('/api/equipment/','').split("-").join(" ") + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'properties'){
                temp1.push(<div key={key}><strong>Properties</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i].name + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'range'){
                temp1.push(<div key={key}><strong>Range</strong><br/></div>);
                if(Array.isArray(info[key])){
                    for(let i = 0; i < info[key].length; i++){
                        temp1.push(
                            <p key={key+'i'}>{info[key][i].toString()}<br/></p>
					    )
					}
				} else {
                    temp1.push(
                            <p key={key+'1'}>{info[key].toString()}<br/></p>
					    )
				}
            } else if(key === 'throw_range'){
                temp1.push(<div key={key}><strong>Throw Range</strong><br/></div>);
                let temp2 = '';
                for(var key1 in info[key]){
                    temp2 += key1 + ': ' + info[key][key1] + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'higher_level'){
                temp1.push(<div key={key}><strong>Higher Level</strong><br/></div>);
                temp1.push(<p key={key+'1'}>{info[key][0]}</p>);
            } else if(key === 'area_of_effect'){
                temp1.push(<div key={key}><strong>Area of Effect</strong><br/></div>);
                temp1.push(<p key={key+'1'}>Size: {info[key].size}<br/>Type: {info[key].type}</p>);
            } else if(key === 'dc'){
                temp1.push(<div key={key}><strong>DC Save</strong><br/></div>);
                temp1.push(<p key={key+'1'}>On Success: {info[key].dc_success}<br/>DC Type: {info[key].dc_type.name}</p>);
            } else if(key === 'components'){
                temp1.push(<div key={key}><strong>Components</strong><br/></div>);
                let temp2 = '';
                for(let i = 0; i < info[key].length; i++){
                    temp2 += info[key][i] + ', ';
				}
                temp1.push(<p key={key+'1'}>{temp2}</p>);
            } else if(key === 'damage'){
                temp1.push(<div key={key}><strong>Damage</strong><br/></div>);
                temp1.push(<p key={key+'1'}>
                    {'Damage Dice: ' + info[key].damage_dice}<br/>
                    {'Damage Type: ' + info[key].damage_type.name}
                    </p>);
                if(info[key].damage_at_slot_level){
                    temp1.push(<em>Damage At Slot Level</em>);
                    let temp2 = '';
                    for(let i = 0; i < info[key].damage_at_slot_level.length; i++){
                        temp2 += 'Level ' + i + ': ' + info[key].damage_at_slot_level[i] + ', ';
					}
                    temp1.push(<p key={key+'1'}>{temp2}</p>);
				}
            } else if(key === 'armor_class'){
                temp1.push(<div key={key}><strong>Armor Class</strong><br/></div>);
                temp1.push(<p key={key+'1'}>{'Base: ' + info[key].base}<br/>{'DexBonus: ' + info[key].dex_bonus}</p>);
            } else if(key === 'cost'){
                temp1.push(<div key={key}><strong>Cost</strong><br/></div>);
                temp1.push(<p key={key+'1'}>{'Unit: ' + info[key].unit}<br/>{'Quantity: ' + info[key].quantity}</p>);
            } else if(typeof info[key] === "object"){
                temp1.push(<div key={key}><strong>{key}</strong><br/></div>);
                temp1.push(<p key={key+'1'}>{JSON.stringify(info[key])}</p>);
			} else if(typeof info[key] === "undefined"){
                temp1.push(<div key={key}><strong>{key}</strong><br/></div>);
                temp1.push(<p key={key+'1'}>Not Available</p>)
			} else{
                temp1.push(<div key={key}><strong>{key}</strong><br/></div>);
                temp1.push(<p key={key+'1'}>{info[key].toString()}</p>);     
			}
        } else {
            temp1.push(<></>);     
		}
        return temp1;
	}))
    }
        
    return temp;
}
