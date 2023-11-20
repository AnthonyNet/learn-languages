export interface Data2 {
	readonly id: string;
	readonly word: string;
	readonly sentence: string;
	readonly cz_word: string;
	readonly cz_sentence: string;
}

export interface Irregular {
	readonly id: string;
	readonly cz_word: string;
	readonly word: string;
	readonly past_simple: string;
	readonly past_participle: string;
}

export interface Phrasal {
	readonly word: string;
	readonly sentence: string;
}
