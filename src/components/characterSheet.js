import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/Popover';
import {FcInfo} from 'react-icons/fc';
import {MdDelete} from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {handleSaveCharacter, handleDeleteCharacter, handleShareCharacter,handleGrabCharacterOptions} from '../actions/characters';
import BaseInformation from './Information';



function Information(props) {
    let temp = BaseInformation(props.name, props.info);
    return (<OverlayTrigger trigger="click" placement="right" overlay={
            <Popover id="popover-info" key={props.name}>
            <Popover.Title as="h3">{props.name}</Popover.Title>
            <Popover.Content style={{maxHeight: '80vh', overflow: 'auto'}}>{temp}</Popover.Content>
            </Popover>
            }>
        <FcInfo />
    </OverlayTrigger>)
}

class CharacterSheet extends Component {

    constructor(props){
		super(props);
        this.state = {uid: '',
                        showProf: false,
                        showLang: false,
                        showAttacks: false,
                        showFeat: false,
                        showTrait: false,
                        showSpell: [false, 0],
                        tempProf: '',
                        tempLang: '',
                        tempAttack: '',
                        tempFeat: '',
                        tempTrait: '',
                        tempSpell: '',
                        class: 'Barbarian',
                        level: '',
                        background: '',
                        race: 'Dragonborn',
                        subclass: '',
                        alignment: '',
                        player: '',
                        abilities: {CHA: 0, CON: 0, DEX: 0, INT: 0, STR: 0, WIS: 0},
                        savingsThrows: {CHA: false, CON: false, DEX: false, INT: false, STR: false, WIS: false},
                        proficiencyBonus: 0,
                        skills: {[`Animal Handling`]: false, Arcana: false, Athletics: false, Deception: false, History: false,
                            Insight: false, Intimidation: false, Investigation: false, Medicine: false, Nature: false, 
                            Perception: false, Performance: false, Persuasion: false, Religion: false, [`Sleight of Hand`]: false,
                            Stealth: false, Survival: false},
                        proficiencies: [],
                        languages: [],
                        AC: 0,
                        initiative: 0,
                        speed: 0,
                        currentHP: 0,
                        tempHP: 0,
                        hitDie: '',
                        deathSaves: [false,false,false,false,false,false],
                        customAttacks: {},
                        tempEquip: '',
                        tempEquipCat: '',
                        equipment: [],
                        personalityTraits: '',
                        ideals: '',
                        bonds: '',
                        flaws: '',
                        features: [],
                        traits: [],
                        mainNotes: '',
                        otherEquip: '',
                        spellClass: 'Bard',
                        spells: [[],[],[],[],[],[],[],[],[],[]],
                        extraNotes: '',
                        showDelete: false,
                        tempShare: ''
                        };
        this.classOptions = this.classOptions.bind(this);
        this.raceOptions = this.raceOptions.bind(this);
        this.subclassOptions = this.subclassOptions.bind(this);
        this.alignmentOptions = this.alignmentOptions.bind(this);
        this.abilities = this.abilities.bind(this);
        this.savingThrows = this.savingThrows.bind(this);
        this.passivePerception = this.passivePerception.bind(this);
        this.skills = this.skills.bind(this);
        this.addProficiencies = this.addProficiencies.bind(this);
        this.addLanguages = this.addLanguages.bind(this);
        this.delete = this.delete.bind(this);
        this.addAttack = this.addAttack.bind(this);
        this.addEquip = this.addEquip.bind(this);
        this.addFeat = this.addFeat.bind(this);
        this.addTrait = this.addTrait.bind(this);
        this.spellClassOptions = this.spellClassOptions.bind(this);
        this.spellModifier = this.spellModifier.bind(this);
        this.deleteSpell = this.deleteSpell.bind(this);
        this.saveCharacter = this.saveCharacter.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
        this.deathSaves = this.deathSaves.bind(this);
        this.deleteCharacter = this.deleteCharacter.bind(this);
	}

    componentDidMount(){
        
        setTimeout(() => {this.updateCharacter()}, 1000)
    }

    updateCharacter(){
        if(this.props.characters.character){
        if(this.props.characters.character.items){
            let root = this.props.characters.character.items;
            let spells1 = [[],[],[],[],[],[],[],[],[],[]];
            if(root.spells !== undefined){
                for(let i = 0; i < root.spells.length; i++){
                    if(root.spells[i] !== null){
                        spells1[i] = root.spells[i];
					}
			    }
			}


            this.setState({
                ...this.state,
                class: root.class,
                level: root.level,
                background: root.background,
                race: root.race,
                subclass: root.subclass,
                alignment: root.alignment,
                player: root.player,
                abilities: root.abilities,
                savingsThrows: root.savingsThrows,
                proficiencyBonus: root.proficiencyBonus,
                skills: root.skills,
                proficiencies: ((root.proficiencies !== undefined) ? root.proficiencies : []),
                languages: ((root.languages !== undefined) ? root.languages : []),
                AC: root.AC,
                initiative: root.initiative,
                speed: root.speed,
                currentHP: root.currentHP,
                tempHP: root.tempHP,
                hitDie: root.hitDie,
                deathSaves: root.deathSaves,
                customAttacks: ((root.customAttacks !== undefined) ? root.customAttacks : []),
                equipment: ((root.equipment !== undefined) ? root.equipment : []),
                personalityTraits: root.personalityTraits,
                ideals: root.ideals,
                bonds: root.bonds,
                flaws: root.flaws,
                features: ((root.features !== undefined) ? root.features : []),
                traits: ((root.traits !== undefined) ? root.traits : []),
                mainNotes: root.mainNotes,
                otherEquip: root.otherEquip,
                spells: spells1,
                spellClass: root.spellClass,
                extraNotes: root.extraNotes             
            })
        } else {
                this.setState({
                ...this.state,
                class: '',
                level: '',
                background: '',
                race:'',
                subclass: '',
                alignment: '',
                player: '',
                abilities: {CHA: 0, CON: 0, DEX: 0, INT: 0, STR: 0, WIS: 0},
                savingsThrows: {CHA: false, CON: false, DEX: false, INT: false, STR: false, WIS: false},
                proficiencyBonus: 0,
                skills: {[`Animal Handling`]: false, Arcana: false, Athletics: false, Deception: false, History: false,
                    Insight: false, Intimidation: false, Investigation: false, Medicine: false, Nature: false, 
                    Perception: false, Performance: false, Persuasion: false, Religion: false, [`Sleight of Hand`]: false,
                    Stealth: false, Survival: false},
                proficiencies: [],
                languages: [],
                AC: '',
                initiative: '',
                speed: '',
                currentHP: '',
                tempHP: '',
                hitDie: '',
                deathSaves: '',
                customAttacks: [],
                equipment: [],
                personalityTraits: '',
                ideals: '',
                bonds: '',
                flaws: '',
                features: [],
                traits: [],
                mainNotes: '',
                otherEquip: '',
                spells: [[],[],[],[],[],[],[],[],[],[]],
                spellClass: '',
                extraNotes: ''    })
		}
		} else {
              this.setState({
                ...this.state,
                class: '',
                level: '',
                background: '',
                race:'',
                subclass: '',
                alignment: '',
                player: '',
                abilities: {CHA: 0, CON: 0, DEX: 0, INT: 0, STR: 0, WIS: 0},
                savingsThrows: {CHA: false, CON: false, DEX: false, INT: false, STR: false, WIS: false},
                proficiencyBonus: 0,
                skills: {[`Animal Handling`]: false, Arcana: false, Athletics: false, Deception: false, History: false,
                    Insight: false, Intimidation: false, Investigation: false, Medicine: false, Nature: false, 
                    Perception: false, Performance: false, Persuasion: false, Religion: false, [`Sleight of Hand`]: false,
                    Stealth: false, Survival: false},
                proficiencies: [],
                languages: [],
                AC: '',
                initiative: '',
                speed: '',
                currentHP: '',
                tempHP: '',
                hitDie: '',
                deathSaves: '',
                customAttacks: [],
                equipment: [],
                personalityTraits: '',
                ideals: '',
                bonds: '',
                flaws: '',
                features: [],
                traits: [],
                mainNotes: '',
                otherEquip: '',
                spells: [[],[],[],[],[],[],[],[],[],[]],
                spellClass: '',
                extraNotes: ''             
            })
		}
	}

    saveCharacter(){
        let temp = {
            class: this.state.class,
            level: this.state.level,
            background: this.state.background,
            race: this.state.race,
            subclass: this.state.subclass,
            alignment: this.state.alignment,
            player: this.state.player,
            abilities: this.state.abilities,
            savingsThrows: this.state.savingsThrows,
            proficiencyBonus: this.state.proficiencyBonus,
            skills: this.state.skills,
            proficiencies: this.state.proficiencies,
            languages: this.state.languages,
            AC: this.state.AC,
            initiative: this.state.initiative,
            speed: this.state.speed,
            currentHP: this.state.currentHP,
            tempHP: this.state.tempHP,
            hitDie: this.state.hitDie,
            deathSaves: this.state.deathSaves,
            customAttacks: this.state.customAttacks,
            equipment: this.state.equipment,
            personalityTraits: this.state.personalityTraits,
            ideals: this.state.ideals,
            bonds: this.state.bonds,
            flaws: this.state.flaws,
            features: this.state.features,
            traits: this.state.traits,
            mainNotes: this.state.mainNotes,
            otherEquip: this.state.otherEquip,
            spellClass: this.state.spellClass,
            spells: this.state.spells,
            extraNotes: this.state.extraNotes
        };

        this.props.handleSaveCharacter(this.props.characters.key, temp);

	}

    delete(keyInState, i){
        return (<MdDelete  onClick={() => {let temp = this.state[keyInState]; temp.splice(i,1); this.setState({...this.state, [keyInState]: temp})}}/>);
	}

    deleteSpell(level, i){
        return (<MdDelete  onClick={() => {let temp = this.state.spells[level]; temp.splice(i,1); let temp1 = this.state.spells; temp1[level] = temp; this.setState({...this.state, spells: temp1})}}/>);
	}

    classOptions(){
        let temp = [];
        for(var key in this.props.dndInfo.generalInfo.specifics.classes){
            temp.push(<option value={key} key={key}>{key}</option>);
        }
        return temp;
	}

    spellClassOptions(){
        let temp = [];
        for(var key in this.props.dndInfo.generalInfo.specifics.spellcasting){
            temp.push(<option value={this.props.dndInfo.generalInfo.specifics.spellcasting[key].class.name} key={this.props.dndInfo.generalInfo.specifics.spellcasting[key].class.name + '1'}>{this.props.dndInfo.generalInfo.specifics.spellcasting[key].class.name}</option>);
        }
        return temp;
	}
    
    raceOptions(){
        let temp = [];
        for(var key in this.props.dndInfo.generalInfo.specifics.races){
            temp.push(<option value={key} key={key}>{key}</option>);
        }
        return temp;
	}

    subclassOptions(){
        let temp = [];
        temp.push(<option value='Select One' key='Select One'>Select One</option>);
        for(var key in this.props.dndInfo.generalInfo.specifics.subclasses){
            temp.push(<option value={key} key={key}>{key}</option>);
        }
        return temp;
	}

    alignmentOptions(){
        let temp = [];
        let alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
            'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
        for(let i = 0; i < alignments.length; i++){
            temp.push(<option value={alignments[i]} key={alignments[i]}>{alignments[i]}</option>);
        }
        return temp;
	}

    abilities(){
        let temp = [];
        for(let i = 0; i < Object.keys(this.props.dndInfo.generalInfo.specifics[`ability-scores`]).length; i++){
            let key = Object.keys(this.props.dndInfo.generalInfo.specifics[`ability-scores`])[i];
            temp.push(<Card border="dark" key={key + 'abilities'} style={{textAlign: 'center', maxWidth: '100px', fontSize: '12px', marginBottom: '5px'}}>
                <Card.Header style={{padding: '0px'}}>
                {this.props.dndInfo.generalInfo.specifics[`ability-scores`][key].full_name}
                 <Information key={key+i} name={key} info={this.props.dndInfo.generalInfo.specifics[`ability-scores`][key]}/>
                </Card.Header>
                <Card.Body style={{padding: '5px'}}>
                    <Card.Title>
                        <Form.Group>
                            <Form.Control placeholder={this.state.abilities[key]} onChange={(text) =>{this.setState({...this.state, abilities: {...this.state.abilities, [key]: text.target.value}})}}/>
                        </Form.Group>
                    </Card.Title>
                </Card.Body>
                <Card.Footer>
                    {(!isNaN(this.state.abilities[key])) ? 
                        ((Number(this.state.abilities[key]) - 10 > 0) ? 
                            Math.floor((Number(this.state.abilities[key]) -  10)/2) : 
                            Math.ceil((Number(this.state.abilities[key]) -10)/2)) 
                        : 'N/A'}
                </Card.Footer>
            </Card>)
		}
        return temp;            
	}

    savingThrows(){
        let temp = [];
        for(let i = 0; i < Object.keys(this.props.dndInfo.generalInfo.specifics[`ability-scores`]).length; i++){
            let key = Object.keys(this.props.dndInfo.generalInfo.specifics[`ability-scores`])[i];
            temp.push(
            <Row key={key + 'savingsThrows'}>
                <Form.Check checked={this.state.savingsThrows[key]} style={{bottom: '3px'}} onChange={() => {this.setState({...this.state, savingsThrows: {...this.state.savingsThrows, [key]: (!this.state.savingsThrows[key])}})}}/>
                <Form.Label style={{border: '1px solid', borderColor: 'lightGray', marginLeft: '15px', paddingLeft: '3px', paddingRight: '3px'}}>
                    {(!isNaN(Number(this.state.abilities[key]))) ? 
                        ((Number(this.state.abilities[key]) - 10 > 0) ? 
                            (Math.floor((Number(this.state.abilities[key]) -  10)/2) + ((this.state.savingsThrows[key]) ? this.state.proficiencyBonus : 0)): 
                            (Math.ceil((Number(this.state.abilities[key]) - 10)/2) + ((this.state.savingsThrows[key]) ? this.state.proficiencyBonus : 0)))
                        : 'N/A'}
                </Form.Label>
                <Form.Label style={{paddingLeft: '5px'}}>{key}</Form.Label>
            </Row>);
		}
        return temp;
	}

    skills(){
        let temp = [];
        for(let i = 0; i < Object.keys(this.props.dndInfo.generalInfo.specifics.skills).length; i++){
            let key = Object.keys(this.props.dndInfo.generalInfo.specifics.skills)[i];
            let keySkill = this.props.dndInfo.generalInfo.specifics.skills[key].ability_score.name;
            let skill = 0;
            if(!isNaN(Number(this.state.abilities[keySkill]))){
                if(this.state.skills[key]){
                    skill = (Number(this.state.abilities[keySkill]) - 10 > 0) ? 
                            Math.floor((Number(this.state.abilities[keySkill]) -  10)/2) + this.state.proficiencyBonus: 
                            Math.ceil((Number(this.state.abilities[keySkill]) - 10)/2) + this.state.proficiencyBonus
			    } else {
                    skill = (Number(this.state.abilities[keySkill]) - 10 > 0) ? 
                            Math.floor((Number(this.state.abilities[keySkill]) -  10)/2): 
                            Math.ceil((Number(this.state.abilities[keySkill]) -10)/2)
			    }
			} else {
                skill = 'N/A';     
			}

            temp.push(
            <Row key={key + 'skill'}>
                <Form.Check checked={!!this.state.skills[key]} style={{bottom: '3px'}} onChange={() => {this.setState({...this.state, skills: {...this.state.skills, [key]: (!this.state.skills[key])}})}}/>
                <Form.Label style={{border: '1px solid', borderColor: 'lightGray', marginLeft: '15px', paddingLeft: '3px', paddingRight: '3px'}}>
                    {skill}
                </Form.Label>
                <Form.Label style={{paddingLeft: '5px'}}>{key}  <Information key={key+i} name={key} info={this.props.dndInfo.generalInfo.specifics.skills[key]}/></Form.Label>
            </Row>);
		}
        return temp;
	}
    
    deathSaves(){
        let temp = [];
        let temp1 = this.state.deathSaves;
        for(let i = 0; i < 3; i++){
            temp.push(
                <Form.Check key={Math.random(100000)} style={{backgroundColor: 'red',  padding: '2px'}} checked={!!this.state.deathSaves[i]} onChange={() => {temp1[i] = !this.state.deathSaves[i]; this.setState({...this.state, deathSaves: temp1})}}/>
            )
		}
        for(let i = 3; i < 6; i++){
            temp.push(
                <Form.Check key={Math.random(100000)} style={{backgroundColor: 'green', padding: '2px'}} checked={!!this.state.deathSaves[i]} onChange={() => {temp1[i] = !this.state.deathSaves[i]; this.setState({...this.state, deathSaves: temp1})}}/>
            )
		}
        return temp;
	}

    passivePerception(){
        let skill = 0;
        if(this.state.skills['Perception']){
            skill = (Number(this.state.abilities['WIS']) - 10 > 0) ? 
                    10 + Math.floor((Number(this.state.abilities['WIS']) -  10)/2) + this.state.proficiencyBonus: 
                    10 + Math.ceil((Number(this.state.abilities['WIS']) - 10)/2) + this.state.proficiencyBonus
		} else {
            skill = (Number(this.state.abilities['WIS']) - 10 > 0) ? 
                    10 + Math.floor((Number(this.state.abilities['WIS']) -  10)/2): 
                    10 + Math.ceil((Number(this.state.abilities['WIS']) -10)/2)
		}
        return skill;
	}

    addProficiencies(){
        return(
            <Modal
                show={this.state.showProf}
                onHide={() => {this.setState({...this.state, showProf: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Proficiency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Proficiency</Form.Label>
                        <Form.Control defaultValue='Choose Proficiency' as="select" onChange={(text) => {this.setState({...this.state, tempProf: text.target.value})}}>
                          <option value='Choose Proficiency'>Choose Proficiency</option>
                          {Object.keys(this.props.dndInfo.generalInfo.specifics.proficiencies).map((p, idx) =>
                               (<option value={p} key={idx}>{p}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showProf: false, proficiencies: [...this.state.proficiencies, this.state.tempProf]})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showProf: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    addLanguages(){
        return(
            <Modal
                show={this.state.showLang}
                onHide={() => {this.setState({...this.state, showLang: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Language</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Control defaultValue='Choose Language' as="select" onChange={(text) => {this.setState({...this.state, tempLang: text.target.value})}}>
                          <option value='Choose Language'>Choose Language</option>
                          {Object.keys(this.props.dndInfo.generalInfo.specifics.languages).map((p, idx) =>
                               (<option value={p} key={idx}>{p}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showLang: false, languages: [...this.state.languages, this.state.tempLang]})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showLang: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    addAttack(){
        return(
            <Modal
                show={this.state.showAttacks}
                onHide={() => {this.setState({...this.state, showAttacks: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Custom Attack</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Custom Name</Form.Label>
                        <Form.Control onChange={(text) => {this.setState({...this.state, tempAttack: text.target.value})}} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAttacks: false, customAttacks: {...this.state.customAttacks, [this.state.tempAttack]: {}}})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAttacks: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    customAttacks(){
        let temp = [];
        temp.push(
              <Row key='top'>
                <Form.Label style={{width: '25%', marginRight: '20px'}}>Name</Form.Label>
                <Form.Label style={{width: '25%', marginRight: '20px'}}>Attack Modifier</Form.Label>
                <Form.Label style={{width: '25%'}}>Damage/Type</Form.Label>
              </Row>
		);

        for(let i = 0; i < Object.keys(this.state.customAttacks).length; i++){
              temp.push(
                 <Row key={Object.keys(this.state.customAttacks)[i]} style={{marginBottom: '20px'}}>
                    <Form inline='true'>
                        <Form.Control readOnly placeholder={Object.keys(this.state.customAttacks)[i]} style={{width: '25%', marginRight: '20px'}}/>
                        <Form.Control style={{width: '25%', marginRight: '20px'}} placeholder={this.state.customAttacks[Object.keys(this.state.customAttacks)[i]].attack} onChange={(text) =>{this.setState({...this.state, customAttacks: {...this.state.customAttacks, [Object.keys(this.state.customAttacks)[i]]: {...this.customAttacks[Object.keys(this.state.customAttacks)[i]], attack: text.target.value}}})}}/>
                        <Form.Control style={{width: '25%'}} placeholder={this.state.customAttacks[Object.keys(this.state.customAttacks)[i]].damage} onChange={(text) =>{this.setState({...this.state, customAttacks: {...this.state.customAttacks, [Object.keys(this.state.customAttacks)[i]]: {...this.state.customAttacks[Object.keys(this.state.customAttacks)[i]], damage: text.target.value}}})}}/>
                        <MdDelete size='1.5em' onClick={() => {let temp = this.state.customAttacks; delete temp[Object.keys(this.state.customAttacks)[i]]; this.setState({...this.state, customAttacks: temp})}}/>
                    </Form>
                 </Row>
			  )
		}
        return temp;
	}

    addEquip(){
        return(
            <Modal
                show={this.state.showEquip}
                onHide={() => {this.setState({...this.state, showEquip: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Equipment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Equipment Category</Form.Label>
                        <Form.Control defaultValue='Choose Equipment' as="select" onChange={(text) => {this.setState({...this.state, tempEquipCat: text.target.value})}}>
                          <option value='Choose Equipment Category'>Choose Equipment Category</option>
                          {Object.keys(this.props.dndInfo.generalInfo.specifics[`equipment-categories`]).map((e, idx) =>
                               (<option value={e} key={idx}>{e}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                    {(this.state.tempEquipCat !== '') ? <Form.Group>
                        <Form.Label>Select Equipment from {this.state.tempEquipCat}</Form.Label>
                        <Form.Control defaultValue='Choose Equipment' as="select" onChange={(text) => {this.setState({...this.state, tempEquip: text.target.value})}}>
                          <option value='Choose Equipment'>Choose Equipment</option>
                          {this.props.dndInfo.generalInfo.specifics[`equipment-categories`][this.state.tempEquipCat].equipment.map((e, idx) =>
                               (<option value={e.name} key={idx}>{e.name}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                    : <> </>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {(this.state.tempEquip !== '') ? this.setState({...this.state, showEquip: false, equipment: [...this.state.equipment, this.state.tempEquip]}) : this.setState({...this.state, showEquip: false})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showEquip: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    addFeat(){
        return(
            <Modal
                show={this.state.showFeat}
                onHide={() => {this.setState({...this.state, showFeat: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Feature</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Feature</Form.Label>
                        <Form.Control defaultValue='Choose Feature' as="select" onChange={(text) => {this.setState({...this.state, tempFeat: text.target.value})}}>
                          <option value='Choose Feature'>Choose Feature</option>
                          {Object.keys(this.props.dndInfo.generalInfo.specifics.features).map((e, idx) =>
                               (<option value={this.props.dndInfo.generalInfo.specifics.features[e].name} key={idx}>{this.props.dndInfo.generalInfo.specifics.features[e].name}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {(this.state.tempFeat !== '') ? this.setState({...this.state, showFeat: false, features: [...this.state.features, this.state.tempFeat]}) : this.setState({...this.state, showEquip: false})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showFeat: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    
    addTrait(){
        return(
            <Modal
                show={this.state.showTrait}
                onHide={() => {this.setState({...this.state, showTrait: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Trait</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Trait</Form.Label>
                        <Form.Control defaultValue='Choose Trait' as="select" onChange={(text) => {this.setState({...this.state, tempTrait: text.target.value})}}>
                          <option value='Choose Trait'>Choose Trait</option>
                          {Object.keys(this.props.dndInfo.generalInfo.specifics.traits).map((e, idx) =>
                               (<option value={this.props.dndInfo.generalInfo.specifics.traits[e].name} key={idx}>{this.props.dndInfo.generalInfo.specifics.traits[e].name}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {(this.state.tempTrait !== '') ? this.setState({...this.state, showTrait: false, traits: [...this.state.traits, this.state.tempTrait]}) : this.setState({...this.state, showTrait: false})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showTrait: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    addSpell(){
        let temp = [];
        for(var key in this.props.dndInfo.generalInfo.specifics.spells){
            if(this.props.dndInfo.generalInfo.specifics.spells[key].level === Number(this.state.showSpell[1])){
                temp.push(key);
			}
		}

        let temp1 = this.state.spells;
        
        return(
            <Modal
                show={this.state.showSpell[0]}
                onHide={() => {this.setState({...this.state, showSpell: [false, 0]})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Spell Level {this.state.showSpell[1]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Spell</Form.Label>
                        <Form.Control defaultValue='Choose Spell' as="select" onChange={(text) => {this.setState({...this.state, tempSpell: text.target.value})}}>
                          <option value='Choose Spell'>Choose Spell</option>
                          {temp.map((e, idx) =>
                               (<option value={this.props.dndInfo.generalInfo.specifics.spells[e].name} key={idx}>{this.props.dndInfo.generalInfo.specifics.spells[e].name}</option>)
						  )}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {temp1[this.state.showSpell[1]].push(this.state.tempSpell); (this.state.tempSpell !== '') ? this.setState({...this.state, showSpell: [false,0], spells: temp1}) : this.setState({...this.state, showSpell: [false,0]})}}>Continue</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showSpell: [false,0]})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

    spellModifier(){
        let ability = Number(this.state.abilities[this.props.dndInfo.generalInfo.specifics.spellcasting[this.state.spellClass.toLowerCase()][`spellcasting_ability`].name]);
        ability = ability - 10;
        let temp = 0;
        if(ability > 0){
              temp = Math.floor(ability/2);
		} else{
              temp = Math.ceil(ability/2);
		}
        temp = temp + Number(this.state.proficiencyBonus);
        return temp;
    }

    
    deleteCharacter(){
         return(
              <Modal
                show={this.state.showDelete}
                onHide={() => {this.setState({showDelete: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Delete Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Are you sure you want to delete {this.props.name}?</Form.Label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {this.setState({showDelete: false}); this.props.handleDeleteCharacter(this.props.characters.key); setTimeout(() => {this.props.handleGrabCharacterOptions()}, 1000)}}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => {this.setState({showDelete: false})}}>
                    Cancel
                    </Button>
                </Modal.Footer>
                </Modal>     
	     )
	}

	render(){
		return(
            <div style={{margin: '20px'}}>
                {this.addProficiencies()}
                {this.addLanguages()}
                {this.addAttack()}
                {this.addEquip()}
                {this.addFeat()}
                {this.addTrait()}
                {this.addSpell()}
                {this.deleteCharacter()}
                <Button variant="outline-success" style={{margin: '10px'}} onClick={() => {this.saveCharacter()}}>
                    Save Changes 
                </Button>
                <Button variant="outline-danger" style={{margin: '10px'}} onClick={() => {this.setState({...this.state, showDelete: true})}}>
                    Delete Character 
                </Button>
                <Form inline={true} style={{float: 'right'}}>
					<Form.Group>
						<Typeahead
							id="searchshare"
							labelKey="share"
							onChange={(value) => {this.setState({...this.state, tempShare: Object.keys(this.props.userNames)[Object.values(this.props.userNames).indexOf(value[0])]})}}
							options={Object.values(this.props.userNames)}
                            value={Object.keys(this.props.userNames)}
							placeholder={"Share with..."}
						/>
					</Form.Group>
                    <Button variant="outline-secondary" style={{margin: '10px'}} onClick={() => {this.props.handleShareCharacter(this.props.characters.key, this.state.tempShare)}}>
                        Share Character 
                    </Button>
				</Form>
				<Card body>
					<Container>
                      <Row style={{border: '1px solid', borderColor: 'lightGray', padding: '5px'}}>
                        <Col sm={5} style={{borderRightStyle: 'solid', borderWidth: '1px', borderColor: 'lightGray'}}>
                            <Row style={{marginLeft: '10px'}}>
                                <Form.Group>
                                <Form.Label>Character Name</Form.Label>
                                  <Form.Control size="lg" type="text" placeholder={this.props.name} readOnly/>
                                </Form.Group>
                            </Row>
                            <Row style={{marginLeft: '10px'}}>
                                <Form.Group>
                                <Form.Label>Player Name</Form.Label>
                                  <Form.Control type="text" value={this.state.player} onChange={(text) =>{this.setState({...this.state, player: text.target.value})}}/>
                                </Form.Group>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col sm={4}>
                                    <Form.Group>
                                    <Form.Label>Class <Information key={this.state.class} name={this.state.class} info={this.props.dndInfo.generalInfo.specifics.classes[this.state.class]}/></Form.Label>
                                      <Form.Control as="select" custom value={this.state.class} onChange={(text) =>{this.setState({...this.state, class: text.target.value})}}>
                                        {this.classOptions()}
                                      </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                    <Form.Group>
                                    <Form.Label>Level</Form.Label>
                                      <Form.Control value={this.state.level} onChange={(text) =>{this.setState({...this.state, level: text.target.value})}}/>
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Group>
                                    <Form.Label>Background</Form.Label>
                                      <Form.Control value={this.state.background} onChange={(text) =>{this.setState({...this.state, background: text.target.value})}}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Form.Group>
                                    <Form.Label>Race <Information key={this.state.race} name={this.state.race} info={this.props.dndInfo.generalInfo.specifics.races[this.state.race]}/></Form.Label>
                                      <Form.Control as="select" custom value={this.state.race} onChange={(text) =>{this.setState({...this.state, race: text.target.value})}}>
                                        {this.raceOptions()}
                                      </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Group>
                                    <Form.Label>Subclass {(this.state.subclass !== '' && this.state.subclass !== 'Select One') ? <Information key={this.state.subclass} name={this.state.subclass} info={this.props.dndInfo.generalInfo.specifics.subclasses[this.state.subclass]}/>: <></>}</Form.Label>
                                      <Form.Control as="select" custom value={this.state.subclass} onChange={(text) =>{this.setState({...this.state, subclass: text.target.value})}}>
                                        {this.subclassOptions()}
                                      </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Group>
                                    <Form.Label>Alignment</Form.Label>
                                      <Form.Control as="select" custom value={this.state.alignment} onChange={(text) =>{this.setState({...this.state, alignment: text.target.value})}}>
                                        {this.alignmentOptions()}
                                      </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm style={{border: '1px solid', borderColor: 'lightGray', padding: '5px'}}>
                            <Row>
                                <Col sm={4}>
                                    {this.abilities()}
                                </Col>
                                <Col sm={8}>
                                    <Row>
                                        <Form inline='true' style={{margin: '5px'}}>
                                        <Form.Group>
                                            <Form.Control size="sm" value={this.state.proficiencyBonus} style={{maxWidth: '40px'}} onChange={(text) =>{this.setState({...this.state, proficiencyBonus: Number(text.target.value)})}}/>
                                            <Form.Label style={{fontSize: '12px'}}>Proficiency Bonus</Form.Label>
                                        </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row>
                                        <Card border="dark" style={{textAlign: 'center', fontSize: '12px', marginBottom: '5px'}}>
                                            <Card.Body style={{marginBottom: '0'}}>
                                                <Card.Title>
                                                    <Form.Group style={{fontSize:'12px'}}>
                                                            {this.savingThrows()}
                                                    </Form.Group>
                                                </Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                Savings Throws
                                            </Card.Footer>
                                        </Card>
                                    </Row>
                                    <Row>
                                        <Card border="dark" style={{textAlign: 'center', fontSize: '12px', marginBottom: '5px'}}>
                                            <Card.Body style={{marginBottom: '0'}}>
                                                <Card.Title>
                                                    <Form.Group style={{fontSize:'12px'}}>
                                                        {this.skills()}
                                                    </Form.Group>
                                                </Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                Skills
                                            </Card.Footer>
                                        </Card>
                                    </Row>
                                    <Row>
                                        <Form inline='true' style={{margin: '5px'}}>
                                        <Form.Group>
                                            <Form.Control readOnly size="sm" placeholder={this.passivePerception()} style={{maxWidth: '40px'}} />
                                            <Form.Label style={{fontSize: '12px'}}>Passive Perception</Form.Label>
                                        </Form.Group>
                                        </Form>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Proficiencies <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showProf: true})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.proficiencies.map((p, idx) => (<h6 key={idx}>{p} 
                                            <Information key={p} name={p} info={this.props.dndInfo.generalInfo.specifics.proficiencies[p]}/> {this.delete('proficiencies', idx)}
                                            </h6>
                                            ))}
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Languages <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showLang: true})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.languages.map((l, idx) => (<h6 key={idx}>{l} <Information key={l} name={l} info={this.props.dndInfo.generalInfo.specifics.languages[l]}/>  {this.delete('languages', idx)}</h6>))}
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                        <Col sm style={{border: '1px solid', borderColor: 'lightGray', padding: '5px'}}>
                            <Card body>
                            <Row>
                                <Row style={{margin: '5px'}}>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Armor Class</Form.Label>
                                          <Form.Control value={this.state.AC} onChange={(text) =>{this.setState({...this.state, AC: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Initiative</Form.Label>
                                          <Form.Control value={this.state.initiative} onChange={(text) =>{this.setState({...this.state, initiative: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Speed</Form.Label>
                                          <Form.Control value={this.state.speed} onChange={(text) =>{this.setState({...this.state, speed: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{margin: '5px'}}>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Current HP</Form.Label>
                                          <Form.Control value={this.state.currentHP} onChange={(text) =>{this.setState({...this.state, currentHP: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Temp HP</Form.Label>
                                          <Form.Control value={this.state.tempHP} onChange={(text) =>{this.setState({...this.state, tempHP: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{margin: '5px'}}>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Hit Dice</Form.Label>
                                          <Form.Control value={this.state.hitDie} onChange={(text) =>{this.setState({...this.state, hitDie: text.target.value})}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                        <Form.Label>Death Saves</Form.Label>
                                          <Form inline="true">
                                            {this.deathSaves()}
                                          </Form>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Row>
                            </Card>
                            <Row style={{margin: '5px'}}>
                                <Card border="dark" style={{width: '100%', fontSize: '12px'}}>
                                    <Card.Header style={{fontSize: '18px'}}>
                                        Custom Main Attacks  <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showAttacks: true})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        {this.customAttacks()}
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row style={{margin: '5px'}}>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%'}}>
                                    <Card.Header>
                                        Equipment <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showEquip: true})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.equipment.map((e, idx) => (<h6 key={idx}>{e} <Information key={e} name={e} info={this.props.dndInfo.generalInfo.specifics.equipment[e]}/>  {this.delete('equipment', idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Card body  style={{width: '100%'}}>
                                <Form.Group>
                                <Form.Label>Other Equipment</Form.Label>
                                    <Form.Control style={{fontSize: '12px'}} value={this.state.otherEquip} as="textarea" rows="5" onChange={(text) =>{this.setState({...this.state, otherEquip: text.target.value})}}/>
                                </Form.Group>
                            </Card>
                        </Col>
                        <Col sm style={{border: '1px solid', borderColor: 'lightGray', padding: '5px'}}>
                            <Card body  style={{width: '100%'}}>
                                <Form.Group>
                                <Form.Label>Personality Traits</Form.Label>
                                    <Form.Control style={{fontSize: '12px'}} value={this.state.personalityTraits} as="textarea" rows="3" onChange={(text) =>{this.setState({...this.state, personalityTraits: text.target.value})}}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Ideals</Form.Label>
                                    <Form.Control style={{fontSize: '12px'}} value={this.state.ideals} as="textarea" rows="3" onChange={(text) =>{this.setState({...this.state, ideals: text.target.value})}}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Bonds</Form.Label>
                                    <Form.Control style={{fontSize: '12px'}} value={this.state.bonds} as="textarea" rows="3" onChange={(text) =>{this.setState({...this.state, bonds: text.target.value})}}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Flaws</Form.Label>
                                    <Form.Control style={{fontSize: '12px'}} value={this.state.flaws} as="textarea" rows="3" onChange={(text) =>{this.setState({...this.state, flaws: text.target.value})}}/>
                                </Form.Group>
                            </Card>
                                <Row>
                                    <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                        <Card.Header>
                                            Features <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showFeat: true})}}>Add</Button>
                                        </Card.Header>
                                        <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                            {this.state.features.map((f, idx) => (<h6 key={idx}>{f} <Information key={f} name={f} info={this.props.dndInfo.generalInfo.specifics.features[f]}/>  {this.delete('features', idx)} </h6>))}
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                        <Card.Header>
                                            Traits <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showTrait: true})}}>Add</Button>
                                        </Card.Header>
                                        <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                            {this.state.traits.map((t, idx) => (<h6 key={idx}>{t} <Information key={t} name={t} info={this.props.dndInfo.generalInfo.specifics.traits[t]}/>  {this.delete('traits', idx)} </h6>))}
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Card body  style={{width: '100%'}}>
                                    <Form.Group>
                                    <Form.Label>Other Main Notes</Form.Label>
                                        <Form.Control style={{fontSize: '12px'}} value={this.state.mainNotes} as="textarea" rows="5" onChange={(text) =>{this.setState({...this.state, mainNotes: text.target.value})}}/>
                                    </Form.Group>
                                </Card>
                        </Col>
                      </Row>
                    </Container>
				</Card>

                <Card body>
					<Container>
                        <Row>
                            <Col sm={5} style={{borderRightStyle: 'solid', borderWidth: '1px', borderColor: 'lightGray'}}>
                                <Row style={{marginLeft: '10px'}}>
                                    <Form.Group>
                                    <Form.Label>
                                    {(this.state.spellClass.length > 0) ? <>
                                    Spellcasting Class 
                                    <Information key={this.state.spellClass} name={this.state.spellClass} info={this.props.dndInfo.generalInfo.specifics.spellcasting[this.state.spellClass.toLowerCase()].info}/> 
                                    </>
                                    : <></>} </Form.Label>
                                        <Form.Control as="select" custom onChange={(text) =>{this.setState({...this.state, spellClass: text.target.value})}}>
                                        {this.spellClassOptions()}
                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col sm>
                                        <Form.Group>
                                        <Form.Label>Spellcasting Ability</Form.Label>
                                          {(this.state.spellClass.length > 0) ? 
                                          <Form.Control readOnly value={this.props.dndInfo.generalInfo.specifics.spellcasting[this.state.spellClass.toLowerCase()][`spellcasting_ability`].name} />
                                          : <></>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group>
                                        <Form.Label>Spell Save DC</Form.Label>
                                        {(this.state.spellClass.length > 0) ? 
                                          <Form.Control readOnly value={this.spellModifier() + 8} />
                                        : <></>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Group>
                                        <Form.Label>Spell Attack Bonus</Form.Label>
                                        {(this.state.spellClass.length > 0) ? 
                                          <Form.Control readOnly value={this.spellModifier()} />
                                         : <></>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Cantrips <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 0]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[0].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(0, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        First Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 1]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[1].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(1, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Second Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 2]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[2].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(2, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                            </Col>
                             <Col>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Third Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 3]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[3].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(3, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Fourth Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 4]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[4].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(4, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Fifth Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 5]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[5].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(5, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                            </Col>
                             <Col>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Sixth Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 6]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[6].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(6, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Seventh Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 7]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[7].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(7, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Eighth Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 8]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[8].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(8, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                                <Card border="dark" style={{textAlign: 'center', fontSize: '16px', marginBottom: '5px', width: '100%', margin: '20px'}}>
                                    <Card.Header>
                                        Ninth Level Spells <Button style={{float: 'right'}} variant='outline-success' onClick={() => {this.setState({...this.state, showSpell: [true, 9]})}}>Add</Button>
                                    </Card.Header>
                                    <Card.Body style={{marginBottom: '0', fontSize: '14px', padding: '1px', margin: '0'}}>
                                        {this.state.spells[9].map((f, idx) => (<h6 key={idx}>{f} <Information name={f} info={this.props.dndInfo.generalInfo.specifics.spells[f]}/>  {this.deleteSpell(9, idx)} </h6>))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
				</Card>

                <Card body>
					<Container>
                        <Card body  style={{width: '100%'}}>
                            <Form.Group>
                            <Form.Label>Extra Notes</Form.Label>
                                <Form.Control style={{fontSize: '14px'}} value={this.state.extraNotes} as="textarea" rows="20" onChange={(text) =>{this.setState({...this.state, extraNotes: text.target.value})}}/>
                            </Form.Group>
                        </Card>
                    </Container>
				</Card>

            </div>
		)
	}
}


const mapStateToProps = state => {
	return{
        dndInfo: state.dndInfo,
        characters: state.characters,
        userNames: state.userNames
	}
}

export default connect(mapStateToProps, {
	handleSaveCharacter,
    handleDeleteCharacter,
    handleShareCharacter,
    handleGrabCharacterOptions
})(CharacterSheet);