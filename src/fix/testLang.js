import { franc, francAll } from 'franc'

// franc('Alle menslike wesens word vry') // => 'afr'
// franc('এটি একটি ভাষা একক IBM স্ক্রিপ্ট') // => 'ben'
// franc('Alle menneske er fødde til fridom') // => 'nno'

// franc('') // => 'und' (language code that stands for undetermined)

// You can change what’s too short (default: 10):
// franc('the') // => 'und'

// console.log(francAll('short', { only: ['eng'] }))
