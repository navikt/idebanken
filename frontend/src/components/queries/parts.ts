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

export const sectionGuidesLinkQuery = `{
	overrideSection {
    displayName
    _path
  }
  selectedGuides { _path }
}`

export const imageAndVectorFields = `
image {
  ... on media_Image {
    imageUrl(type:absolute scale:"height(800)")
    data { altText }
  }
  ... on media_Vector {
    mediaUrl(type:absolute)
    data { caption }
  }
}
`

export const imageAndVectorQuery = `{${imageAndVectorFields}}`

export const linkCardQuery = `{
    ${linkQuery.slice(1, -1)}
    ${imageAndVectorQuery.slice(1, -1)}
}`

export const sectionGuidesQuery = `query($section:String!, $selected:[String!], $limit:String){
  guillotine {
    guidesUnderSection(
      section:$section,
      selectedGuidePaths:$selected,
      limit:$limit
    ){
      _path
      displayName
      ... on idebanken_Guide {
        x {
          idebanken {
            category {
              categories
            }
            meta {
                iconName
                iconColor
                ${imageAndVectorFields}
            }
          }
        }
        data {
          title
          description
        }
      }
    }
  }
}`

export const tableOfContentsQuery = `{
    title
    sections(path: $path) {
        title
    }
}`

export const tableOfContentsSectionQuery = `{
    title
    sectionNumber(path: $path)
}`

export const linkCardListQuery = `{
    list {
        url
        title
        description
        imageUrl
        iconName
        iconColor
        categories
    }
}`
