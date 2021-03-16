const getBook = async (book, chapter) => {
	const singleChapterBooks = {
		'Obadiah': 21,
		'Philemon': 25,
		'2John': 13,
		'3John': 14,
		'Jude': 25 
	}
	let url = "https://bible-api.com/" + book + "+"
	if(book in singleChapterBooks){
		url += "1:1-" + singleChapterBooks[book] + "?translation=kjv"; 
	} 
	else {
		url += chapter + "?translation=kjv";	
	}
	
	const req = await fetch(url)
	const data = await req.json()
	printText(data.verses)
}


const printText = async (verses) => {
	const content = document.querySelector('#content')
	content.innerHTML = ""
	const verseText = document.createElement('div')
	verseText.setAttribute("id", "verses")
	content.append(verseText)
	
	for(let verse of verses){
		const v = document.createElement('small')
		const text = document.createElement('span')
		v.innerHTML = verse.verse
		text.innerHTML = verse.text
		verseText.append(v)
		verseText.append(text)
		verseText.append(document.createElement('br'))

	}

}

const populateChapters = () => {
	chapter.innerHTML = ''
	const numOfChapters = numChapters[book.value]
	bookIndex = allBooks.indexOf(book.value)
	for(let i = 1; i<=numOfChapters; i++){
		const option = document.createElement('option')
		option.value = i
		option.innerText = i
		chapter.append(option)
	}
}

const otBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
'1Samuel', '2Samuel', '1kings', '2kings', '1chronicles', '2chronicles', 'Ezra', 'Nehemiah', 'Esther',
'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'sng', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
'Zechariah', 'Malachi']

const ntBooks = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1Corinthians', '2Corinthians',
'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1Thessalonians', '2Thessalonians',
'1Timothy', '2Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1Peter', '2Peter', '1John',
'2John', '3John', 'Jude', 'Revelation']

const allBooks = otBooks.concat(ntBooks)
let bookIndex = 0

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
const nextChapter = document.querySelector('#nextChapter')
const prevChapter = document.querySelector('#prevChapter')
const nextBook = document.querySelector('#nextBook')
const prevBook = document.querySelector('#prevBook')



book.addEventListener("change", (e) => {
	e.preventDefault()
	populateChapters()
	getBook(book.value, 1)

})


chapter.addEventListener("change", (e) => {
	e.preventDefault();
	getBook(book.value, chapter.value);
})


nextChapter.addEventListener("click", (e) => {
	e.preventDefault();
	if(book.value){
		if(chapter.value < numChapters[book.value]){
			chapter.value ++
			getBook(book.value, chapter.value)
		} else{
			if(bookIndex<66){
				bookIndex ++
				book.value = allBooks[bookIndex]
				populateChapters()
				chapter.value = 1
				getBook(book.value, 1)
			}
		}
	}
})

nextBook.addEventListener("click", (e) => {
	e.preventDefault();
	if(bookIndex<66){
		bookIndex ++
		book.value = allBooks[bookIndex]
		populateChapters()
		chapter.value = 1
		getBook(book.value, 1)
	}
})


prevChapter.addEventListener("click", (e) => {
	e.preventDefault();
	if(book.value){
		if(chapter.value > 1){
			chapter.value -= 1
			getBook(book.value, chapter.value)
		} else{
			if(bookIndex>0){
				bookIndex -= 1
				book.value = allBooks[bookIndex] 
				populateChapters()
				chapter.value = numChapters[book.value]
				getBook(book.value, chapter.value)
	
			}
		}
	}
})

prevBook.addEventListener("click", (e) => {
	e.preventDefault();
	if(bookIndex>0 && chapter.value==1){
		bookIndex -= 1
		book.value = allBooks[bookIndex] 
		populateChapters()
		getBook(book.value, 1)
	} else {
		chapter.value = 1
		getBook(book.value, 1)
	}
})


