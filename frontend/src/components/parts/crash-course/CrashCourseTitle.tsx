import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { Part_Idebanken_Crash_Course_Title } from '~/types/generated'

export function CrashCourseTitle({
    common,
    part,
}: PartData<Part_Idebanken_Crash_Course_Title, { title: string | undefined }>) {
    const { prefix } = part?.config ?? {}
    const title = common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'
    return (
        <HeadingView level="1" size={'xlarge'} className={'mb-(--ax-space-8)'}>
            {prefix ? prefix.concat(' ') : ''}
            {title}
        </HeadingView>
    )
}
