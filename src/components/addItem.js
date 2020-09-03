   import api from './APIFactory';
   import ReactDOMServer from 'react-dom/server';

   const items = []
   //https://www.pinterest.com/amkuhns5/dd-map-assets/
   //https://drive.google.com/drive/folders/1c_8hDZKuZuu_NF76oq2fjcm4XaE1stkJ
   
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
              string = <img src={"/images/mattsTokens/" + items[i] + ".png"} alt={items[i]} width="32" height="32"/>
              temp[items[i].replace(/_/g, ' ').replace(/\[/g, '').replace(/\]/g, '')] = {title: ReactDOMServer.renderToString(string), tag: ['creature']};
		}
		console.log(temp);
		await api.put('https://dylan-s-database.firebaseio.com/dnd/environments/items.json',
			temp
		)
	}
