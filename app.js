const getBook = async (book, chapter) => {

	const url = "https://bible-api.com/" + book + "_" + chapter + "?translation=kjv"
	const req = await fetch(url)
	const data = await req.json()
	printText(data.verses)
}


const printText = async (verses) => {
	const content = document.querySelector('#content')
	content.innerText = ""
	for(let verse of verses){
		const v = document.createElement('small')
		const text = document.createElement('span')
		v.innerText = verse.verse
		text.innerText = verse.text
		content.append(v)
		content.append(text)

	}
}


const numChapters = {
	'Genesis': 50,
	'Exodus': 40,
	'Leviticus': 27,
	'Numbers': 36,
	'Deuteronomy': 34,
	'Joshua': 24,
	'Judges': 21,
	'Ruth': 4,
	'1Samuel': 31,
	'2Samuel': 24,
	'1kings': 22,
	'2kings': 25,
	'1chronicles': 29,
	'2chronicles': 36,
	'Ezra': 10,
	'Nehemiah': 13,
	'Esther': 10,
	'Job': 42,
	'Psalms': 150,
	'Proverbs': 31,
	'Ecclesiastes': 12,
	'sng': 8,
	'Isaiah': 66,
	'Jeremiah': 52,
	'Lamentations': 5,
	'Ezekiel': 48,
	'Daniel': 12,
	'Hosea': 14,
	'Joel': 3,
	'Amos': 9,
	'Obadiah': 1,
	'Jonah': 4,
	'Micah': 7,
	'Nahum': 3,
	'Habakkuk': 3,
	'Zephaniah': 3,
	'Haggai': 2,
	'Zechariah': 14,
	'Malachi': 4,
	'Matthew': 28,
	'Mark': 16,
	'Luke': 24,
	'John': 21,
	'Acts': 28,
	'Romans': 16,
	'1Corinthians': 16,
	'2Corinthians': 13,
	'Galatians': 6,
	'Ephesians': 6,
	'Philippians': 4,
	'Colossians': 4,
	'1Thessalonians': 5,
	'2Thessalonians': 3,
	'1Timothy': 6,
	'2Timothy': 4,
	'Titus': 3,
	'Philemon': 1,
	'Hebrews': 13,
	'James': 5,
	'1Peter': 5,
	'2Peter': 3,
	'1John': 5,
	'2John': 1,
	'3John': 1,
	'Jude': 1,
	'Revelation': 22
}



const book = document.querySelector("#book")
const chapter = document.querySelector('#chapter')

book.addEventListener("change", (e) => {
	e.preventDefault()
	chapter.innerHTML = ''
	const numOfChapters = numChapters[book.value]

	for(let i = 1; i<=numOfChapters; i++){
		const option = document.createElement('option')
		option.value = i
		option.innerText = i
		chapter.append(option)
	}
	getBook(book.value, 1)

})

chapter.addEventListener("change", (e) => {
	e.preventDefault();
	getBook(book.value, chapter.value);
})



