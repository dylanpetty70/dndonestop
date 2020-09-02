   import api from './APIFactory';
   import ReactDOMServer from 'react-dom/server';

   const items = ['Adventurer', 'Caster', 'Caster2', 'Caster3', 'Caster4', 'Caster5', 'Crossbowman', 'Dwarf Archer', 'Dwarf Caster', 'Dwarf Fighter', 'Dwarf Paladin', 'Dwarf Warrior', 'Elf Archer', 'Elf Archer2', 'Elf Archer3', 'Elf Archer4', 'Elf Caster', 'Elf Figher3', 'Elf Fighter', 'Elf Fighter2', 'Elf Fighter3', 'Elf Warrior', 'Female Caster', 'Female Caster2', 'Female Knight', 'Fencer', 'Fencer2', 'Fighter', 'Fighter2', 'Gnome Warrior', 'Half-Orc Swordman', 'Half-Orc Warrior', 'Human Archer', 'Human Warrior', 'Human Warrior2', 'Knight', 'Knight2', 'Knight3', 'Knight4', 'Male Rouge', 'Male Rouge2', 'Paladin', 'Pikeman', 'Rouge2', 'Shirtless Adventurer', 'Spearman', 'Striker', 'Ugly Warrior', 'Ugly Warrior2', 'Warrior', 'Warrior2'];

   async componentDidMount(){
		let string = '';
   	    let result = await api('https://dylan-s-database.firebaseio.com/dnd/environments.json', {
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
			"Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
		}})

        let temp = result.data.items;
		for(let i = 0; i < items.length; i++){
              string = <img src={"/images/players/" + items[i] + ".png"} alt={items[i]} width="32" height="32"/>
              temp[items[i]] = {title: ReactDOMServer.renderToString(string), tag: 'players'};
		}
		await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/items.json',
			temp
		)
        
        
	}