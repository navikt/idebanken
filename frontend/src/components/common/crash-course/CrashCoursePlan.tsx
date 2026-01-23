import { Part_Idebanken_Crash_Course_Plan } from '~/types/generated'
import { PartData } from '~/types/graphql-types'

export function CrashCoursePlan({
    common,
    meta,
    part,
}: PartData<Part_Idebanken_Crash_Course_Plan>) {
    console.log({ common, meta, part })
    return <div>CrashCoursePlan data: {JSON.stringify(part.config)}</div>
}
