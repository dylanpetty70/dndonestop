export const EDIT_TOKENS = 'EDIT_TOKENS';


export function editTokens(data){
	return {
		type: EDIT_TOKENS,
		data
	}
}