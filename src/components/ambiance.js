import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Typeahead } from 'react-bootstrap-typeahead';

let songs = [
			'3 am West End','A Good Bass for Gambling','A Surprising Encounter','A Very Brady Special','A Waltz For Naseem','Abstract Anxiety',
			'Action Strike','Adding the Sun','Adventure','Adventures of Flying Jack','Advertime','After the End','Alien Invasion',
			'Alien Spaceship Atmosphere','Alternative Clock Dimension','Amazing Grace','Ambient Bongos','Ambush in Rattlesnake Gulch','Ancient Rite',
			'Ancient Winds','And Here We Go','Apex','Aquarium','Arpent','Asking Questions','Assassin','Attic Secrets','Awkward Apocalyptic Pickup',
			'Backbeat','Baltic Levity','Barnville','Barroom Ballet','Bass Meant Jazz','Bavarian Seascape','BeBop for Joey','Be Chillin','Be Jammin',
			'Beat One','Beat Thee','Beginning of Conflict','Behind Enemy Lines','Behind the Sword','Beyond - part 2','Big Eyes','Bit Bit Loop',
			'Black Knight','Blacksmith','Bleu','Blippy Trance','Blood Eagle','Bollywood Groove','Bonfire','Bouchedag','Brandenburg Concerto III, Allegro I',
			'Breaking Bollywood','Brewing Potions','Brothers Unite','Burning Trapezoid of Fire',"Burt's Requiem",'Celebration','Cha-Cha Ender',
			'Champ de tournesol','Chronos','Circuit','Circus of Freaks','City Run','City Sunshine','Cockroaches','Cold Journey','Comic Game Loop - Mischief',
			'Compy Jazz','Connecting Rainbows','Consecrated Ground','Construction','Cornfield Chase','Coy Koi','Creepy Comedy','Creepy Hallow','Cumbish',
			'Cursed Intro','Dance of the Tuba Plum Fairy','Dancing at the Inn','Dark Hallway','Dawn of the Apocalypse','Deck the Halls','Deep Relaxation',
			'Deep Tones','Del Rio Bravo','Desert Conflict','Desert Fox','Desert Fox Underscore','Dreams of Vain','Driving Concern','Drunken Party',
			'Ebbs and Flows','Elf Meditation','Emotional Blockbuster 2','Energizing','Epic Blockbuster 2','Epic Boss Battle','Evil Incoming',
			'Experimental Test Subject','Eye of Forgiveness','Fake It Til You Fake It','Fancy Family','Fanfare X','Favorite',"Fenster's Explanation",
			'Final Step','Find Them','Fireworks','Flutey Jazz','Foam Rubber','Footsteps in the Attic','Forest Frolic Loop','Forest Night','Frogs Legs Rag',
			'Funkeriffic','Funky Energy Loop','Funshine','Ghost Town','Goldcrest','Goodnightmare','Gothamlicious','Groovin','Guerilla Tactics',
			'Halloween Theme 1','Happy Whistling Ukulele','Hear What They Say','Hello! Ma Baby','Heroic Adventure','Hidden Truth','Hillbilly Swing',
			'Hippety Hop','Hit n Smash','Holiday Weasel','Hopeful','Hor Hor','Horizon Flare','Horns','Horror Mytery','Horror Suspense','Horroriffic',
			'Ice and Snow','Icicles Melting','Improved Ice Cream Truck','Improv for Evil','Infinite Peace','Infinite Wonder','Inspiration',
			'Jack The Lumberer','Jethro on the Run',"Joey's Song",'Jokull','Journey of Hope','Jungle Mission','Kalimba Relaxation Music','Kings Trailer',
			"Krampus's Workshop",'La Citadelle','Land of Pirates',"Landra's Dream",'Le Baguette','Limit 70','Llama in Pajama','Lonely Mountain',
			'Lovely Piano Song','Lukewarm Banjo','Lurking Sloth','Madness of Linda','Magical Transition','Magic in the Garden','Mana Two - Part 1',
			'Mana Two - Part 2','Mana Two - Part 3','Maple 100','Maple Leaf Rag','Marked','Martini Sunset','Meditating Beat','Midnight in the Green House',
			'Mind Chaos','Monsters in Hotel','Mothership','Motions','New Hero in Town','Night Attack','Night Vigil','Night in Venice','Night in the Castle',
			'Nightmare','Nomadic Sunset','Nomadic Sunset MMXIX','Nordic Wist','Northur','Nostalgic Piano','Novus Initium','One Destination - Two Journeys',
			'One Step Closer','Opener Comedy','Organ Filler','Overture','Painful Disorientation','Painting Room','Pantscrapper','Parhelion','Patience Party',
			'Piano Magic Motive','Pickled Pink','Pina Colada','Pond','Pump up your Graduation',"Putin's Lullaby",'Quick Metal Riff 1','Relaxing Ballad',
			'River Meditation','Romantic Inspiration','Royal Coupling','Rulers of Our Lands','Rural Industry','Rush','Sad Drunken Party','Satin Danger',
			'Sciencenet Theme','Screen Saver','Shenzhen Nightlife','Shining Stars','Silent Night (Unholy Night)','Silly Boy','Silly Intro','Space Ambience',
			'Spec Ops','Spring Chicken','Stereotype News','Still Pickin','Strength of the Titans','Study and Relax','Sunday Dub','Sunny Rasta',
			'Take the Sting Out - Jazz Fi','The Abyss','The Britons','The Celebrated Minuet','The Celebrated Minuet for Piano','The Crown','The Desert',
			'The Drama','The Enemy','The Entertainer','The Ice Giants','The Lagoon','The Land of the Dead','The Range','The Story','The Vikings',
			'Travelers Notebook','USSR','Uberpunch','Ukulele Song','Video Game Blockbuster','Village Tarantella','Vintage Party','Wakka Wakka',
			'We Wish You a Merry Christmas','Wind of the Rainforest','Windy Old Weather - thin','Windy Old Weather','Winter','Wisdom in the Sun',
			'Witch Waltz'];

class Ambiance extends Component {

	constructor(props){
		super(props);
        this.state = {url: '', close: true};
		this.audio = this.audio.bind(this);
	}

	audio(){
		if(this.state.url !== '' && this.state.url !== "Choose song to play..."){
			return(<audio id="music">
				<source src={"https://freepd.com/music/" + encodeURI(this.state.url) + ".mp3"}></source>
			</audio>)
		}		
	}


	render(){
		return(
			<div style={{marginTop: '25px', width: '100%', height: '100%', paddingBottom: '25px'}}>
				<Card style={{height: '100%', overflowY: 'scroll'}}>
				{this.audio()}
					{(this.state.close) ? <Typeahead
							id="song"
							labelKey="song"
							onChange={(text) => {if(text !== []) {this.setState({...this.state, url: text[0], close: false})}}}
							options={songs}
							placeholder={"Choose song to play..."}
					/>
					: <><h4>Song Selected</h4>
						<p>Close to reselect</p></>}
					<Button onClick={() => {if(this.state.url !== ''){let audio = document.getElementById("music");audio.play();}}}>Play</Button>
					<Button onClick={() => {if(this.state.url !== ''){let audio = document.getElementById("music"); audio.pause();}}}>Pause</Button>
				</Card>
			</div>
		)
	}
}
//encodeURI()
const mapStateToProps = state => {
	return{
	}
}

export default connect(mapStateToProps, {})(Ambiance);