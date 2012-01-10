var Masks = {

	straights: [
		parseInt("1111100000000", 2),
		parseInt("0111110000000", 2),
		parseInt("0011111000000", 2),
		parseInt("0001111100000", 2),
		parseInt("0000111110000", 2),
		parseInt("0000011111000", 2),
		parseInt("0000001111100", 2),
		parseInt("0000000111110", 2),
		parseInt("0000000011111", 2)
	],

	flushes: [
		"1000100010001000100000000",
		"0000100010001000100010000"
	]



}

module.exports = Masks;
