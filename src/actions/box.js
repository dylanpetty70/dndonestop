export const UPDATE_BOX = 'UPDATE_BOX';

export function handleUpdateBox(data){
	return{
		type: UPDATE_BOX,
		data
	}
}
