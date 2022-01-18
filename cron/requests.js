exports.collectingCarsHost = () => {
   return "https://aw6hhyue7l-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.8.6)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.4.4)%3B%20react%20(17.0.2)%3B%20react-instantsearch%20(6.10.3)&x-algolia-api-key=8df66ea319225363c53678284a0ecc5e&x-algolia-application-id=AW6HHYUE7L"
}

exports.collectingCarsBody = (page) => {
   return `
      {
         "requests": [
            {
               "indexName": "production_cars",
               "params": "highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&filters=(stage%3Alive%20OR%20stage%3Acomingsoon%20OR%20stage%3Asold%20OR%20stage%3Abuynow)&hitsPerPage=23&query=&maxValuesPerFacet=20&page=${page}&facets=%5B%22auctionId%22%2C%22stage%22%2C%22lotType%22%2C%22vehicleMake%22%2C%22vendorType%22%2C%22countryCode%22%2C%22driveSide%22%2C%22regionCode%22%5D&tagFilters=&facetFilters=%5B%5B%22stage%3Asold%22%5D%2C%5B%22lotType%3Acar%22%5D%2C%5B%22regionCode%3AUK%22%5D%5D"
            },
            {
               "indexName": "production_cars",
               "params": "highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&filters=(stage%3Alive%20OR%20stage%3Acomingsoon%20OR%20stage%3Asold%20OR%20stage%3Abuynow)&hitsPerPage=1&query=&maxValuesPerFacet=20&page=${page}&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=stage&facetFilters=%5B%5B%22lotType%3Acar%22%5D%2C%5B%22regionCode%3AUK%22%5D%5D"
            },
            {
               "indexName": "production_cars",
               "params": "highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&filters=(stage%3Alive%20OR%20stage%3Acomingsoon%20OR%20stage%3Asold%20OR%20stage%3Abuynow)&hitsPerPage=1&query=&maxValuesPerFacet=20&page=${page}&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=lotType&facetFilters=%5B%5B%22stage%3Asold%22%5D%2C%5B%22regionCode%3AUK%22%5D%5D"
            },
            {
               "indexName": "production_cars",
               "params": "highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&filters=(stage%3Alive%20OR%20stage%3Acomingsoon%20OR%20stage%3Asold%20OR%20stage%3Abuynow)&hitsPerPage=1&query=&maxValuesPerFacet=20&page=${page}&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=regionCode&facetFilters=%5B%5B%22stage%3Asold%22%5D%2C%5B%22lotType%3Acar%22%5D%5D"
            }
         ]
      }
   `
}