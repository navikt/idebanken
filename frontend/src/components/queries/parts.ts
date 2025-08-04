export const imageQuery = `{
	image {
		... on media_Image {
			imageUrl(type: absolute, scale: "height(800)")
			data {
				altText
			}
		}
	}
	scale
    hideOnMobile
    styleActive
    width
    height
    borderRadius
    border
    borderDistance
    circles {
      size
      color
      bottom
      left
      opacity
    }
}`

<<<<<<< HEAD
export const linkQuery = `
    { 
        blockOptionSet {
            _selected
            externalLink {
                url
            }
            internalLink {
                ideBankContentSelector {
                    pageUrl(type: server)
                }
            }
        }   
    }
`
=======
export const linkQuery = `{
	blockOptionSet {
		_selected
		externalLink {
			url
		}
		internalLink {
			ideBankContentSelector {
				pageUrl(type: server)
			}
		}
	}
}`
>>>>>>> main
