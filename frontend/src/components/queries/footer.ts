export const footerQuery = `{
    guillotine {
        footer {
            footerText
            linkCategory {
                title
                links {
                    href
                    linkText
                }
            }
        }
    }
}`
