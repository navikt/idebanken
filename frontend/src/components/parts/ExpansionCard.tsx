import {
    ExpansionCard,
    ExpansionCardDescription,
    ExpansionCardHeader,
    ExpansionCardTitle,
    ExpansionCardContent,
} from '@navikt/ds-react/ExpansionCard'

export const ExpansionCardView = () => {
    return (
        <ExpansionCard aria-label="Example expansion card">
            <ExpansionCardHeader>
                <ExpansionCardTitle as="h2" size="medium">
                    Title
                </ExpansionCardTitle>
                <ExpansionCardDescription>Description</ExpansionCardDescription>
            </ExpansionCardHeader>
            <ExpansionCardContent>
                <p>Some content</p>
            </ExpansionCardContent>
        </ExpansionCard>
    )
}
