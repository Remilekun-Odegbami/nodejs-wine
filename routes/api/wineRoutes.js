const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/wines/reds')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All Wines
// localhost:3000/wines/ 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/wines/reds'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/wines', {
                title: 'All Wines',
                name: 'Wine List',
                data
            })
        })
})

// single-wine 
// localhost:3000/wines/:id 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/wines/reds/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-wine', {
                    title: `${data.winery}`,
                    name: `${data.winery}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// localhost:3000/wines/winery
router.get('/wines/:winery', (req, res)=> {
    const winery = req.params.winery 
    const URL = 'https://api.sampleapis.com/wines/reds'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.winery.length; i++) {
                if (winery == data.winery[i]) {
                    res.render('pages/wines', {
                        title: winery,
                        name: winery,
                        data
                    })
                }
            }
        })

})

module.exports = router